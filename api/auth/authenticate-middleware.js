module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //figure out how to put in env file
  const secret = process.env.JWT_SECRET || "keep it secrect";
  console.log(token) //for troubleshooting delete later
  
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        console.log(err),
        res.status(401).json({ message: 'There was an error with your token.' });
      } else {
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Your credentials are not valid." })
  }
};