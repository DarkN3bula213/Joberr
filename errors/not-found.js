import { StatusCodes } from "http-status-codes.js";
import CustomAPIError from "./custom-error.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;