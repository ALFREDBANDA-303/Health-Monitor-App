const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
  };

  users.push(user);

  res.status(201).json({
    message: "User registered successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({
    token,
  });
};

module.exports = {
  register,
  login,
};