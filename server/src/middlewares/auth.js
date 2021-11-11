const jwt = require("jsonwebtoken");
const { User } = require("../../models");

// Auth user
exports.auth = async (req, res, next) => {
  try {
    let header = req.header("Authorization");

    if (!header) {
      return res.status(400).send({
        message: "Access Failed",
      });
    }
    const token = header.replace("Bearer ", "");
    const secretKey = process.env.SECRET_KEY;
    const verifed = jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.status(400).send({
          message: "user not verified",
        });
      } else {
        return decoded;
      }
    });

    req.idUser = verifed.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
      location: "Middleware",
    });
  }
};

exports.admin = async (req, res, next) => {
  try {
    const id = req.idUser;

    const profile = await User.findOne({ where: { id: id } });
    if (profile.roleId === 1) {
      return res.status(401).send({
        status: "Response fail",
        error: {
          message: "Access Denied",
        },
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Response fail",
      error: {
        message: "Invalid Access",
      },
    });
  }
};
