const userModel = require("../model/user.model");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new userModel({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        await user.save();

        req.login(sanitizeUser(user), (error) => { // this also calls serializer and adds to session
          if (error) {
            res.status(400).json(error);
          } else {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  res.json({status: "success", user:req.user});
};
