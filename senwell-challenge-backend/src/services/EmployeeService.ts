import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Employee from '@src/models/Employee';
const { getNamespace } = require("cls-hooked");

class EmployeeService {
    /* The `createEmployee` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that takes an argument `newEmployee` of type `any`. */
    public createEmployee = async (newEmployee: any) => {
        logger.info('Inside createEmployee in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const employeeExist: any = await Employee.findOne(newEmployee);

            if (employeeExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Employee already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const employee = new Employee(newEmployee);

            await employee.save();

            return new ResponseStructure(
                true,
                200,
                'Employee Record Created Successfully.',
                employee,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `getEmployeeById` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that takes an argument `employeeId` of type `string`. */
    public getEmployeeById = async (employeeId: string) => {
        logger.info('Inside getEmployeeById in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const employee: any = await Employee.findOne({ employee_id: employeeId });

            if (!employee) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Employee does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Employee Record Retrieved Successfully.',
                employee,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `getEmployeeByDepartment` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that takes an argument `employeeDepartment` of type `string`. */
    public getEmployeeByDepartment = async (employeeDepartment: string) => {
        logger.info('Inside getEmployeeByDepartment in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const employee: any = await Employee.findOne({ department: employeeDepartment });

            if (!employee) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Employee does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Employee Record Retrieved Successfully.',
                employee,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `updateEmployee` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that takes two arguments: `employeeId` of type `string` and `newEmployee` of type `any`. */
    public updateEmployee = async (employeeId: string, newEmployee: any) => {
        logger.info('Inside updateEmployee in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const employee: any = await Employee.findOne({ employee_id: employeeId });

            if (!employee) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Employee does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Employee.updateOne({ employee_id: employeeId }, newEmployee);

            return new ResponseStructure(
                true,
                200,
                'Employee Record Updated Successfully.',
                {},
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `getAllEmployees` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that retrieves a list of employees based on the provided search criteria and pagination
    parameters. */
    public getAllEmployees = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllEmployees in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            employee_id: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            first_name: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            last_name: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            department: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                    ],
                };
            }

            PageNumber = Math.max(0, PageNumber - 1);

            const order: any = {};
            if (OrderBy && Ordering) {
                if (OrderBy == 'employee_id') order.employee_id = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'first_name') order.first_name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'last_name') order.last_name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'department') order.department = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'dob') order.dob = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'salary') order.salary = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'Address') order.Address = Ordering == 'ASC' ? 1 : -1;
            } else order.createdAt = 1;

            const pagination = {
                $facet: {
                    page: [
                        { $sort: order },
                        { $skip: PageSize * PageNumber },
                        { $limit: Number(PageSize) },
                    ],
                    total: [{ $count: 'totalItems' }],
                },
            };
            let employees: any = await Employee.aggregate([
                searchMatch,
                pagination,
            ]);

            employees = {
                page: employees[0].page,
                totalItems: employees[0].total[0] ? employees[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Employees Documents Retrieved Successfully.',
                employees,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `deleteEmployee` method is a public method of the `EmployeeService` class. It is an asynchronous
    function that takes an argument `employeeId` of type `string`. */
    public deleteEmployee = async (employeeId: string) => {
        logger.info('Inside deleteEmployee in EmployeeService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const employee: any = await Employee.findOne({ employee_id: employeeId });

            if (!employee) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Employee does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Employee.deleteOne({ employee_id: employeeId });

            return new ResponseStructure(
                true,
                200,
                'Employee Record Deleted Successfully.',
                {},
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };
}

export default new EmployeeService();