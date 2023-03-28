import jwt from "jsonwebtoken";

// this middleware is used to check if the user is authenticated or not and if authenticated then we will add user id in to created by field of tour.
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    const secret = process.env.JWT_SECRET_KEY;
    if (token) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;

// comment added.
