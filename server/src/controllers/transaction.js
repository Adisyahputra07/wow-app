const { User, Transactions } = require("../../models");

// add Transaction
exports.addTransaction = async (req, res) => {
  try {
    data = {
      userId: req.idUser,
      transferProof: req.file.filename,
      remainingActive: "0",
      userStatus: "not Active",
      paymentStatus: "panding",
    };

    const dataTransaction = await Transactions.create(data);

    res.send({
      status: "success",
      data: { dataTransaction },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const data = await Transactions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "roleId",
              "gender",
              "phone",
              "address",
              "image",
            ],
          },
        },
      ],
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// get Transaction
exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Transactions.findAll({
      where: { userId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "email",
              "roleId",
              "gender",
              "phone",
              "address",
              "image",
            ],
          },
        },
      ],
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    let data;

    if (req.body.paymentStatus === "Cancel") {
      data = {
        remainingActive: "0",
        userStatus: "not Active",
        paymentStatus: req.body.paymentStatus,
      };
    }

    if (req.body.paymentStatus === "Approve") {
      data = {
        remainingActive: "30",
        userStatus: "Active",
        paymentStatus: req.body.paymentStatus,
      };
    }

    await Transactions.update(data, {
      where: { id },
    });

    //todo
    const updatedData = await Transactions.findOne({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Update Transaction id: ${id} success`,
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transactions.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete Transaction with id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
