function getJwtToken(authorizationHeader) {
  return authorizationHeader.split(' ')[1];
}

export default { getJwtToken };
