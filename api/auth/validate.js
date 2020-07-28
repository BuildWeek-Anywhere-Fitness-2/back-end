module.exports = {
  isUserValid,
  isTrainerValid
};

function isUserValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

function isTrainerValid(trainer) {
  return Boolean(
    trainer.name && trainer.password && typeof trainer.password === "string"
  );
}