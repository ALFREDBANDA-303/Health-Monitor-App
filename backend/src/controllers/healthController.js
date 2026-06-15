const getDashboard = (req, res) => {
  res.status(200).json({
    weight: 70,
    heartRate: 72,
    waterIntake: 2.5,
    bloodPressure: "120/80",
  });
};

module.exports = {
  getDashboard,
};