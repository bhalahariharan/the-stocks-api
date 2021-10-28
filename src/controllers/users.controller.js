import userService from '../services/users.service.js';

async function getCurrentUser(req, res) {
  const user = userService.getUser();
  return res.json(user);
}

export default { getCurrentUser };
