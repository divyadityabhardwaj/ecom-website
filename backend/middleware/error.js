import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    console.error(err);

    // wrong mongodb error 
    if(err.name=="CastError"){
        const message = `Resources not found . Invalid:${err.path} `;
        err = new ErrorHandler(message , 400 );
    }

    // Send the error response
    res.status(err.statusCode).json({
        success: false,
        message: err.message 
    });
};
