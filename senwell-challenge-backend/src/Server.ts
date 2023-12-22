import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import EmployeeRouter from '@src/routes/EmployeeRouter';
import helmet from 'helmet';
import HttpStatus from 'http-status';
import logger from '@shared/Logger';
import morgan from 'morgan';
import swaggerDocument from '@resources/SwaggerDocument';
import { ErrorHandler, handleError } from '@shared/ErrorHandler';
import 'express-async-errors';


var uuid = require("uuid");
var { createNamespace, getNamespace } = require("cls-hooked");

// swagger
const swaggerUi = require("swagger-ui-express");

// Init express
const app = express();

/**
 * Request tracking middleware settings
 */
const NameSpace = createNamespace(process.env.CLS_NAMESPACE); // create namespace to store data related request context

/* This is a middleware that is used to track the request. */
app.use(function (req, res, next) {
    NameSpace.bindEmitter(req);
    NameSpace.bindEmitter(res);
    NameSpace.run(function () {
        var traceId = uuid.v4();
        getNamespace(process.env.CLS_NAMESPACE).set("traceId", traceId); // assign traceId
        next();
    });
});

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

app.use("/api/employee", EmployeeRouter);

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

app.use(express.static(__dirname + '/public')); // serving static files
app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/index.html");
});

/* This is a middleware that is used to handle the error. */
app.use(
    (error: any, request: Request, response: Response, next: NextFunction) => {
        /* A function that is used to handle the error. */
        handleError(error, response);
    }
);

/* This is a middleware that is used to handle the error. */
app.use((request, response, next) => {
    logger.error(
        `name - ${HttpStatus[404]}, message - ${HttpStatus["404_MESSAGE"]}, route - ${request.method} ${request.url}`
    );
    /* Creating a new instance of the ErrorHandler class. */
    let err = {
        status: 404,
    };
    const res = new ErrorHandler(err);
    response.status(err.status).send(res);
    next();
});

// Export express instance
export default app;
