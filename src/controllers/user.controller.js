const catchError = require("../utils/catchError");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = catchError(async (req, res) => {
  const results = await User.findAll();
  return res.json(results);
});

const register = catchError(async (req, res) => {
  const { username, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    username,
    password: hashedPassword,
    rol,
  });
  return res.status(201).json(result);
});

const login = catchError(async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } })
    if(!user) return res.status(401).json({ message: "Invalid credentials" });
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
		{ user },
		process.env.TOKEN_SECRET,
		{ expiresIn: '1d' }
)
    return res.json({user, token});
})

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  register,
  getOne,
  remove,
  update,
  login,
};
