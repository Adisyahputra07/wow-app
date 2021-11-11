const { User } = require("../../models");

// get users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "updatedAt", "createdAt"],
      },
    });

    res.send({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get user
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "updatedAt", "createdAt"],
      },
    });

    res.send({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// add User
exports.addUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);

    res.send({
      data: { user },
      status: "success",
      message: "Add user success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// update User
exports.updateUser = async (req, res) => {
  try {
    const userId = req.idUser;

    const { body } = req;

    if (req.file) {
      body.image = req.file.filename;
    }

    await User.update(req.body, {
      where: { id: userId },
    });

    const updatedData = await User.findOne({
      where: { id: userId },
    });

    res.send({
      status: "success",
      message: `Update profile success`,
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

// Delet user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete user id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// getProfile
exports.getProfile = async (req, res) => {
  const id = req.idUser;

  try {
    const users = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "updatedAt", "createdAt"],
      },
    });
    res.send({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
