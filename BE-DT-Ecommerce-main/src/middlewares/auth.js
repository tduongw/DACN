const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log('body',req.body, req.headers)
  const token =
    req.headers.authorization|| req.body.token || req.query.token || req.headers["x-access-token"];
    console.log('ssssssssss',token)
  if (!token) {
     return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'shhhhh'/* config.TOKEN_KEY */);
    req.body.idUser = decoded.id;
    next()
  } catch (err) {
    console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll')
    return res.status(401).send("Invalid Token");
  }

};
const verifyToken2 = (req, res, next) => {
  console.log('body',req.body, req.headers)
  const token =
    req.headers.authorization|| req.body.token || req.query.token || req.headers["x-access-token"];
    console.log('ssssssssss',token)
  if (!token) {
     return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'shhhhh'/* config.TOKEN_KEY */);
    req.body.idUser = decoded.id;
    req.body.name = decoded.firstName+decoded.lastName;
    next()
  } catch (err) {
    console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll')
    return res.status(401).send("Invalid Token");
  }

};
const createToken = (dataUser) =>
{
  const token = jwt.sign(dataUser, 'shhhhh');
  console.log(token)
 return token
}
export const auth={
  verifyToken,
  createToken,
  verifyToken2
}


