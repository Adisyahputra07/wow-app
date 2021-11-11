const { User, Book, myList } = require("../../models");

// add mylist
exports.addMyList = async (req, res) => {
  try {
    let userId = req.idUser;

    // Create MyList
    await myList.create({
      userId: userId,
      bookId: req.body.bookId,
    });

    res.send({
      status: "success",
      message: "Add my list created",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Get All List
exports.getMyList = async (req, res) => {
  try {
    const myLists = await myList.findAll({
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullName"],
        },
        {
          model: Book,
          as: "Books",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
      ],
    });

    res.status(200).send({
      status: 200,
      message: "Success get all List",
      data: myLists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Get MyList Failed",
    });
  }
};

exports.getMyListByUserId = async (req, res) => {
  try {
    const getMyList = await myList.findAll({
      where: {
        userId: req.idUser,
      },
      include: [
        {
          model: Book,
          as: "Books",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "Users",
          attributes: ["fullName", "id"],
        },
      ],
      attributes: ["id"],
    });

    res.status(200).send({
      status: 200,
      message: "Success get myList by user id",
      data: getMyList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, get myList Failed",
    });
  }
};

// delete mylist
exports.deleteMylist = async (req, res) => {
  try {
    const { id } = req.params;
    await myList.destroy({
      where: {
        userId: req.idUser,
        bookId: req.params.id,
      },
    });

    res.send({
      status: "success",
      message: `Delete mylist with id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
