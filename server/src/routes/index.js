const express = require("express");
const { auth, admin } = require("../middlewares/auth");
const { uploadFiles } = require("../middlewares/uploadFile1");
const { uploadFile } = require("../middlewares/uploadFile");

const router = express.Router();

//Controller user
const { getUsers, getUser, updateUser, deleteUser, getProfile } = require("../controllers/user");
const { login, register } = require("../controllers/auth");

//Controller Books
const { getBooks, getBook, addBook, updateBook, deleteBook } = require("../controllers/book");

//Controller Transaction
const {
  addTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transaction");

// controller Mylist
const { addMyList, getMyList, getMyListByUserId, deleteMylist } = require("../controllers/mylist");

// Router User
router.post("/login", login);
router.post("/register", register);
router.get("/user", auth, admin, getUsers);
router.get("/user/:id", auth, admin, getUser);
//
router.get("/profile", auth, getProfile);
router.patch("/profile/:id", auth, uploadFile("image"), updateUser);
router.delete("/user/:id", auth, admin, deleteUser);

//init route controller Book
router.get("/books", getBooks);
router.get("/book/:id", auth, getBook);
router.patch("/book/:id", auth, admin, uploadFiles("image"), updateBook);
router.post("/book", auth, admin, uploadFiles("image", "bookFile"), addBook);
router.delete("/book/:id", auth, admin, deleteBook);

//init route  Transaction
router.post("/transaction", auth, uploadFile("image"), addTransaction);
router.get("/transactions", auth, admin, getTransactions);
//
router.get("/transaction/:id", auth, getTransaction);
router.delete("/transaction/:id", auth, admin, deleteTransaction);
router.patch("/transaction/:id", auth, admin, updateTransaction);

router.post("/mylist", auth, addMyList);
router.get("/mylist", auth, getMyListByUserId);
router.get("/mylists", auth, getMyList);
router.delete("/mylist/:id", auth, deleteMylist);

module.exports = router;
