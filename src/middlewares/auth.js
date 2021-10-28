import authService from '../services/auth.service.js';
import utils from '../utils.js';

function authenticateToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).send({ message: 'Access token missing in headers' });
    }

    const jwt = utils.getJwtToken(accessToken);
    authService.verifyAccessToken(jwt);
    next();
  } catch (error) {
    res.status(401).send({ message: 'Access token expired or not valid' });
  }
}

export default { authenticateToken };
