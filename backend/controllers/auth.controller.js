const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("749408941967-nta3ofbshftjqmd6h4knetc6798c5d46.apps.googleusercontent.com");
const JWT_SECRET = "ises-secret-key";

// --- SIGN UP ---
exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      FullName: req.body.fullName,
      Email: req.body.email,
      PasswordHash: bcrypt.hashSync(req.body.password, 8),
      RoleID: req.body.roleId,
      Phone: req.body.phone || "",
      AuthProvider: 'Local'
    });

    res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// --- SIGN IN (LOGIN) ---
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { Email: req.body.email }
    });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    if (!user.PasswordHash && user.AuthProvider === 'Google') {
      return res.status(401).send({ message: "Please login with Google." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.PasswordHash);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }
    const token = jwt.sign({ id: user.RecID }, JWT_SECRET, { expiresIn: 86400 });

    res.status(200).send({
      id: user.RecID,
      fullName: user.FullName,
      email: user.Email,
      roleId: user.RoleID,
      accessToken: token,
      message: "Login Successful"
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.googleSignin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "749408941967-nta3ofbshftjqmd6h4knetc6798c5d46.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;
    let user = await User.findOne({ where: { Email: email } });

    if (!user) {
      user = await User.create({
        FullName: name,
        Email: email,
        PasswordHash: null,
        RoleID: 1,
        Phone: "",
        AuthProvider: 'Google',
        SocialID: sub
      });
    }

    // Login successful, token generate
    const sessionToken = jwt.sign({ id: user.RecID }, JWT_SECRET, { expiresIn: 86400 });

    res.status(200).send({
      id: user.RecID,
      fullName: user.FullName,
      email: user.Email,
      roleId: user.RoleID,
      accessToken: sessionToken,
      message: "Google Login Successful"
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).send({ message: "Google Login Failed" });
  }
};