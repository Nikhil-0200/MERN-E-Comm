const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

exports.createUser = async (req, res) => {
  const { email, password, role, addresses, name } = req.body;

  try {
    const check = await userModel.findOne({ email }).exec();

    if (check) {
      res.status(400).json({ msg: `Email already exists` });
    }

    if (!check) {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (err) {
          res
            .status(404)
            .json({ msg: `Error occurred while hashing password ${err}` });
        } else {
          const user = new userModel({
            email,
            password: hash,
            role,
            addresses,
            name,
          });
          await user.save();
          res.status(201).json(user);
        }
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ msg: `Error occurred while creating user ${error}` });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email }).exec();

    if (!findUser) {
      res.status(404).json({ msg: `Invalid Credentials` });
    }

    bcrypt.compare(password, findUser.password, function (err, result) {
      if (result) {
        const accessToken = jwt.sign(
          { id: findUser._id, role: findUser.role },
          process.env.JWT_SCERETKEY_1,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { id: findUser._id, role: findUser.role },
          process.env.JWT_SCERETKEY_2,
          { expiresIn: "1day" }
        );

        const cookieOptions = {
          httpOnly: true,
          secure: false, // Change to true in production (HTTPS)
          sameSite: "lax", // Use "none" for cross-origin
          maxAge: 900000, // 15 minutes
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 86400000,
        }); // 1 day

        res
          .status(201)
          .json({
            msg: `Login successful`,
            accessToken,
            refreshToken,
            // id: findUser._id,
            // role: findUser.role,
          });
      } else {
        res.status(404).json({ msg: `Invalid Password` });
      }
    });
  } catch (error) {
    res.status(404).json({ msg: `Error occurred, ${error}` });
  }
};

exports.checkUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email }).exec();

    if (!findUser) {
      res.status(404).json({ msg: `Invalid Credentials` });
    }

    res.json({ status: "success", user: findUser });
  } catch (error) {}
};
