import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
// import {BadRequestError} from "../errors/index.js";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}


const register = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
throw new CustomAPIError("Please enter all fields");
  }

  const userAlreadyExists = await User.findOne({ email });
  if(userAlreadyExists) {
    throw new BadRequestError("User already exists!");
  }
    const user = await User.create({name, email, password});
    const token = user.createJWT();
    // console.log(req.body);
    res.status(StatusCodes.CREATED).json({ user:{email: user.email, lastName: user.lastName, location: user.location, name: user.name}, token, location: user.location });
  
};

const login = async (req, res) => {
  res.send("Login");
};

const updateUser = async (req, res) => {
  res.send("Update User");
};

export { register, login, updateUser };
