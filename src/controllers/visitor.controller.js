const catchError = require("../utils/catchError");
const visitorController = require("../models/Visitor");

const getAll = catchError(async (req, res) => {
  const results = await visitorController.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  if (req.user.rol !== "RECEPCION")
    return res.status(203).json("Unauthorizate by rol");
  const result = await visitorController.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await visitorController.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await visitorController.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  if (req.user.rol !== "RECEPCION")
    return res.status(203).json("Unauthorizate by rol");
  const { id } = req.params;
  const result = await visitorController.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const addNote = catchError(async (req, res) => {
  const { id } = req.params;
  if (req.user.rol !== "SUPERVISOR")
    return res.status(203).json("Unauthorizate by rol");
  const result = await visitorController.update({note:req.body.note}, {
    where: { id },
    returning: true,
  });
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  addNote,
};
