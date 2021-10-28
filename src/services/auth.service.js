import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKEY = fs.readFileSync('src/keys/rsa_private.pem', 'utf8');
const publicKEY = fs.readFileSync('src/keys/rsa_public.pem', 'utf8');

function generateAccessToken() {
  return jwt.sign(
    { sub: 'guest', iss: 'the-stocks', nbf: Math.floor(Date.now() / 1000) },
    privateKEY,
    {
      expiresIn: 60 * 60,
      algorithm: 'RS256',
    }
  );
}

function verifyAccessToken(accessToken) {
  return jwt.verify(accessToken, publicKEY, { algorithms: ['RS256'] });
}

export default { generateAccessToken, verifyAccessToken };
