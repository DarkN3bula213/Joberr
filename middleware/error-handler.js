import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong",
    }



    
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // defaultError.message = err.message;
        defaultError.message = Object.values(err.errors).map((item) => item.message).join(", ");
    }
    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = `${Object.keys(err.keyValue)} already exists`;
    }
    // res.status(defaultError.statusCode).json({ msg: err.message });
    res.status(defaultError.statusCode).json({ msg: defaultError.message});
}

export default errorHandlerMiddleware;