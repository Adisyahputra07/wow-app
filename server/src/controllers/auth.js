const { User } = require("../../models");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { body } = req;
    console.log("ini adalahbody", req.body);

    const schema = joi.object({
      fullName: joi.string().min(4).required(),
      email: joi.string().email().min(4).required(),
      password: joi.string().min(8).required(),
      roleId: joi.number(),
      accountNumber: joi.number(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    const { email, password } = body;
    const emailCheck = await User.findOne({ where: { email: email } });

    if (emailCheck) {
      return res.status(400).send({
        message: "email already registered",
      });
    }

    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const items = await User.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: items.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      message: "resource successfully create account",
      items: {
        data: items,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Register Failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(userData);

    if (error) {
      return res.status(400).send({
        status: "failed",
        message: error.details[0].message,
        // plus create
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.status(400).send({
        status: "failed",
        message: "Email Or Password Don't Match",
      });
    }
    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.status(400).send({
        status: "failed",
        message: "Email Or Password Don't Match",
      });
    }
    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      status: "success",
      message: "resource successfully login",
      items: {
        profile: checkEmail,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot Sign In",
    });
  }
};
