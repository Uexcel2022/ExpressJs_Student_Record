module.exports = (func) => {
  return (req, resp, next) => {
    func(req, resp, next).catch((err) => next(err));
  };
};
