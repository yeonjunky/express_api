const logger = (req, res, next) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  next();
};

const auth = (req, res, next) => {
  const user = req.query.user;

  if (user === "admin") {
    req.query.user = { name: "admin", id: 1 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const logBody = (req, res, next) => {
  console.log(req.body);
  next();
}

export { logger, auth, logBody };
