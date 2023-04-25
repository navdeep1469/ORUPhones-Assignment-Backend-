const User = require("../model/User");

// exports.name = async (req, res) => {
//   console.log("Hello");
//   const user = await User.findById("64456285bb36f14b2a35b3d9");
//   res.json(user);
// };

exports.getBmwMercedes = async (req, res) => {
  try {
    // console.log("Hello");
    const users = await User.find({
      $and: [
        { income: { $lt: "$5.00" } },
        { car: { $in: ["BMW", "Mercedes"] } },
      ],
    });

    // console.log(users);
    res.send(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getPhonePrice = async (req, res) => {
  try {
    const users = await User.find({
      $and: [{ gender: "Male" }, { phone_price: { $gt: "10000" } }],
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getLastName = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { last_name: /^M/ },

        { $expr: { $gt: [{ $strLenCP: "$quote" }, 15] } },

        { email: { $regex: /^([^@]+)@(.+)\.(M\w+)$/i } },
      ],
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getCarAndEmail = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { car: { $in: ["BMW", "Mercedes", "Audi"] } },
        { email: { $not: /.*\d.*/ } },
      ],
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getTop10Cities = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: "$city",
          totalIncome: { $sum: "$income" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.send(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
