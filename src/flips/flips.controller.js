const flips = require('../data/flips-data');

function list(req, res) {
  res.json({ data: flips });
}

const counts = require('../data/counts-data');

let lastFlipId = flips.reduce((maxId, flip) => Math.max(maxId, flip.id), 0);

function bodyHasResultProperty(req, res, next) {
  const { data: { result } = {} } = req.body;
  if (result) {
    return next();
  }
  next({
    status: 400,
    message: "A 'result' property is required.",
  });
}

function create(req, res) {
  const { data: { result } = {} } = req.body;
  const newFlip = {
    id: ++lastFlipId, // Increment last id then assign as the current ID
    result,
  };
  flips.push(newFlip);
  counts[result] = counts[result] + 1;
  res.status(201).json({ data: newFlip });
}

function resultPropertyIsValid(req, res, next) {
  const { data: { result } = {} } = req.body;
  const validResult = ['heads', 'tails', 'edge'];
  if (validResult.includes(result)) {
    return next();
  }
  next({
    status: 400,
    message: `Value of the 'result' property must be one of ${validResult}. Received: ${result}`,
  });
}

module.exports = {
  create: [bodyHasResultProperty, create],
  list,
};

module.exports = {
  create: [bodyHasResultProperty, resultPropertyIsValid, create],
  read,
  list,
};
