const jwt = require("jsonwebtoken");

function roleMiddleware(requiredRole) {
  const secretKey = `mySecretKeyIsMyDogsName`;
  return (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Authentication Failed, token not found",
      });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Authentication failed, no valid token found",
        });
      }

      if (!requiredRole.includes(decoded.role)) {
        return res.status(401).json({
          message: "Authentication Failed, role not valid",
        });
      }

      req.user = decoded;
      next();
    });
  };
}

module.exports = roleMiddleware;
