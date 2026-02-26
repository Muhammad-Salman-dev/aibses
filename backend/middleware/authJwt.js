const jwt = require("jsonwebtoken");
const JWT_SECRET = "ises-secret-key"; // Jo aapne controller mein rakha tha

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized! Login again." });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = { verifyToken };