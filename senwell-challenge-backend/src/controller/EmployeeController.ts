import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import EmployeeService from '@src/services/EmployeeService';

class EmployeeController {
    /* The `createEmployee` method in the `EmployeeController` class is an asynchronous function that handles the
   creation of a employee. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createEmployee = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createEmployee in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.createEmployee(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getEmployeeById` method in the `EmployeeController` class is an asynchronous function that handles
    the retrieval of a employee by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getEmployeeById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getEmployeeById in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.getEmployeeById(
                req.params.employeeId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getEmployeeByDepartment` method in the `EmployeeController` class is an asynchronous function that handles
    the retrieval of a employee by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getEmployeeByDepartment = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getEmployeeByDepartment in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.getEmployeeByDepartment(
                req.params.employeeDepartment,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updateEmployee` method in the `EmployeeController` class is an asynchronous function that handles the
    updating of a employee. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updateEmployee = async (req: any, res: any, next: any) => {
        logger.info('Inside updateEmployee in EmployeeController');

        try {

            const response: ResponseStructure = await EmployeeService.updateEmployee(
                req.params.employeeId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllEmployees` method in the `EmployeeController` class is an asynchronous function that handles
    the retrieval of all employees. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllEmployees = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllEmployees in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.getAllEmployees(
                req.query.SearchString,
                req.query.PageSize,
                req.query.PageNumber,
                req.query.OrderBy,
                req.query.Ordering,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getSortedEmployees` method in the `EmployeeController` class is an asynchronous function
    that handles the retrieval of all employees sorted by a specific order. */
    public getSortedEmployees = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getSortedEmployees in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.getSortedEmployees(
                req.query.OrderBy,
                req.query.Ordering,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `deleteEmployee` method in the `EmployeeController` class is an asynchronous function that handles the
    deletion of a employee. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deleteEmployee = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deleteEmployee in EmployeeController');
        try {
            const response: ResponseStructure = await EmployeeService.deleteEmployee(
                req.params.employeeId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new EmployeeController();