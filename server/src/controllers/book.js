const { Book } = require("../../models");
const redisClient = require("../modules/redis");
const key = "books";

// get allbooks
exports.getBooks = async (req, res) => {
  try {
    const dataRedis = await redisClient.get(key);

    if (dataRedis !== null) {
      res.status(200).send({
        status: "success",
        masssage: "data redis",
        books: JSON.parse(dataRedis),
      });
    } else {
      const books = await Book.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });

      res.status(200).send({
        status: "success",
        masssage: "data database",
        books: books,
      });

      await redisClient.set(key, JSON.stringify(books));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get book
exports.getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { book },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// add Book
exports.addBook = async (req, res) => {
  const data = req.body;
  data.bookFile = req.files.bookFile[0].filename;
  data.image = req.files.image[0].filename;

  try {
    await Book.create(data);

    await redisClient.del(key, () => {
      console.log("sukses delete key");
    });

    res.status(200).send({
      book: { data },
      status: "success",
      message: "Add Book success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// update Book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { body } = req;

    if (req.file) {
      body.image = req.file.filename;
    }

    await Book.update(req.body, {
      where: { id },
    });

    res.status(200).send({
      status: "success",
      message: `Update Book id: ${id} success`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Delet Book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({
      where: { id },
    });

    res.status(200).send({
      status: "success",
      message: `Delete Book with id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
