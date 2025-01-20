const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { sendMail } = require("../services/common");
const blacklistedToken = require("../blacklist");

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
          { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
          { id: findUser._id, role: findUser.role },
          process.env.JWT_SCERETKEY_2,
          { expiresIn: "7d" }
        );

        res.status(201).json({
          msg: `Login successful`,
          accessToken,
          refreshToken,
          id: findUser._id,
          role: findUser.role,
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
  const { userId, role } = req.body; // Extract userId and role from the request body

  try {
    // Check if both userId and role are provided
    if (!userId || !role) {
      return res.status(400).json({ msg: "User ID and role are required." }); // Bad request if either is missing
    }

    // If both are present, send them back in the response
    return res.status(200).json({ userId, role }); // Return userId and role
  } catch (error) {
    // Catch any other errors and respond with a generic error message
    return res
      .status(500)
      .json({ msg: `Error occurred, please try again later.`, error });
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;

  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user) {
    bcrypt.hash(email, 10, async function (err, hash) {
      if (err) {
        res
          .status(404)
          .json({ msg: `Error generating reset password token ${err}` });
      } else {
        const user = new userModel({
          resetPasswordToken: hash,
        });

        await user.save();

        const resetPage = `http://localhost:8080/resetPassword?token=${hash}&email=${email}`;
        const subject = "reset password for e-commerce";
        const html = `<p>Click <a href="${resetPage}">here <a> to Reset Password</p>`;

        // lets send email and resetToken in the mail body so that we can verify that the user has clicked right link

        if (email) {
          const response = await sendMail({
            to: email,
            subject,
            html,
          });
          res.json(response);
        }
      }
    });
  }
};

exports.blacklistToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ msg: "Token is required." });
  }

  // Add the token to the blacklist
  blacklistedToken.push(token);

  res.status(200).json({ msg: "Token blacklisted successfully" });
};
