const jwt = require('jsonwebtoken');

const checkRoleAuth = (roles) => async (req, res, next) => {
  // console.log(req.headers.authorization)
  console.log(req.cookies)
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ').pop(); // obtain token from headers
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }

  if (token === undefined) {
    return res.status(403).send({ error: 'Unauthorized: No token provided' });
  }

  try {
    // to verify the token
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenData || !tokenData.roleId) {
      return res.status(401).send({ error: 'Unauthorized: Invalid token payload' });
    }

    // To obtain the user role of the token
    const userRoleId = tokenData.roleId;
    const requireRole = roles;

    // checks if the user's role has permission to access the endpoint
    if (requireRole.some(role => role <= userRoleId)) {
      // Allow access if any required role is less than or equal to the user's role
      next();
    } else {
      return res.status(403).send({ error: 'Forbidden: Insufficient permissions' });
    }
  } catch (error) {
    console.error('JWT validation error:', error.message); // Log a user-friendly error message
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ error: 'Unauthorized: Invalid token format' });
    }

    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = checkRoleAuth;
