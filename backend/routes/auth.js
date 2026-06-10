const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1 : Create a user using : POST "/api/auth/createuser" . Doesnt require Auth/ No login required
router.post(
  "/createuser",
  [
    body("name", 'Enter a valid name').isLength({ min: 3 }),
    body("email", 'Enter the valid Email').isEmail(),
    body("password", 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });

      //catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2 : Authenticate a User using : POST "/api/auth/login" . No login Requierd
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there is any errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const playload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(playload, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Get loggedin user details : POST "/api/auth/getuser" . Login Requierd

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 4: Forgot Password - Generate Token & Send Email
// POST "/api/auth/forgot-password"
// ==========================================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist" });
    }

    // Generate a secure, one-time secret
    const secret = process.env.JWT_SECRET + user.password;
    
    // Generate a 15-minute token
    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    // Create the reset link pointing to your React frontend
    const link = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5173'}/reset-password/${user.id}/${token}`;

    // Setup Nodemailer to send the email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "iNotebook - Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>Password Reset</h2>
          <p>You requested a password reset for your iNotebook account.</p>
          <p>Click the button below to set a new password. This link is valid for 15 minutes.</p>
          <a href="${link}" style="background-color: #38bdf8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">Reset My Password</a>
          <p style="color: #777; font-size: 12px; margin-top: 30px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        return res.json({ success: "Password reset link sent to your email!" });
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ==========================================
// ROUTE 5: Reset Password - Verify Token & Update DB
// POST "/api/auth/reset-password/:id/:token"
// ==========================================
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Invalid user" });
    }

    const secret = process.env.JWT_SECRET + user.password;

    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(400).json({ error: "Reset link has expired or is invalid." });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(id, { password: secPass });

    res.json({ success: "Password has been successfully reset. You can now login." });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
