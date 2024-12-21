const env = require("dotenv");
const schema = require("../model/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
env.config();

//user regitration handler
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if all fields are provided
    const userexist = await schema.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    //check if user already exist
    if (userexist) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create an new user to database
    const user = schema({
      name,
      email,
      password: hashedPassword,
    });
    user.save();
    //generate jwd token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    //send signup succcess
    return res.status(201).json({
      message: "signup successfully",
      token,
    });
  } catch (err) {
    console.log(err, "error");
  }
};
//user login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //finding user by email
    const users = await schema.findOne({ email });
    if (!users) {
      return res.status(404).json({
        message: "user not find",
      });
    }
    //checking if the password is matches or not
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "wrong password",
      });
    }
    //generating a jwt token
    const token = jwt.sign(
      { id: users._id, email: users.email, role: users.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    //checking if user is admin or not
    if (users.role === "admin") {
      return res.status(200).json({
        message: "to admin page",
        token,
      });
    }
    //regular user login success
    res.status(200).json({
      message: "login success",
      token,
    });
  } catch (err) {
    //catching the error
    console.log(err, "error");
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

// Generate a unique token
const generatetoken = crypto.randomBytes(32).toString("hex");

//sending email process
const sendemail = async (email, baseUrl) => {
  try {
    // Construct the reset password link
    const link = `${process.env.RESET_LINK}${baseUrl}`;

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${link}">${link}</a>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Internal Server Error");
  }
};
//for forget password
const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    //email id is required
    if (!email) {
      return res.status(404).json({
        message: "needed required email",
      });
    }
    //finding an email id of existing one
    const user = await schema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not find ",
      });
    }
    //saving the generating token to database
    const token = generatetoken;
    user.link = token;
    //expiry time of the link
    user.resettokenexpire = Date.now() + 20 * 60 * 1000;
    await user.save();
    //invoke function of the send email
    await sendemail(email, token);
    res.status(200).json({
      message: "otp successfully sent to your email",
    });
  } catch (err) {
    res.status(500).json({
      message: "inrternal server error",
    });
    console.log(err, "error");
  }
};
//the route of reset password
const resetpassword = async (req, res) => {
  try {
    //giving the request params id of the route
    const token = req.params.id;
    const { newpassword, confirmpassword } = req.body;
    //condition of the all fiels are empty
    if (!newpassword || !confirmpassword) {
      return res.status(400).json({
        message: " new password and confirm password is required",
      });
    }
    //comparing the given token of database
    const user = await schema.findOne({
      link: token,
      resettokenexpire: { $gt: Date.now() },
    });
    //invalid token
    if (!user) {
      return res.status(400).json({
        message: "invalid or expired token",
      });
    }
    //comparing the confirm password
    if (newpassword !== confirmpassword) {
      returnres.status(400).json({
        message: "confirm password is different ",
      });
    }
    //hashing the new password
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    //update the new password
    user.password = hashedpassword;
    //expiring the link after changing the password
    user.link = undefined;
    //expiring the link given time
    user.resettokenexpire = undefined;
    //saving the new password
    await user.save();
    res.status(200).json({
      message: "password has reset  successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = { register, login, forgetpassword, resetpassword };
