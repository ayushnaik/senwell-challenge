import express from 'express';
import EmployeeController from '@src/controller/EmployeeController';

const EmployeeRouter = express.Router();


/**
 * @openapi
 * /employee/create:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Create Employee Record.
 *     description: API used to Create Employee Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee Record Created Successfully.
 *       409:
 *         description: This Employee already Exist.
 */
EmployeeRouter.post('/create', EmployeeController.createEmployee);

/**
 * @openapi
 * /employee/getAllEmployees:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get All Employees.
 *     description: API used to Get All Employees...
 *     parameters:
 *       - in: query
 *         name: SearchString
 *         schema:
 *           $ref: '#/components/schemas/SearchString'
 *       - in: query
 *         name: PageSize
 *         schema:
 *           $ref: '#/components/schemas/PageSize'
 *         default: 20
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           $ref: '#/components/schemas/PageNumber'
 *       - in: query
 *         name: OrderBy
 *         schema:
 *           type: string
 *           enum:
 *             - employee_id
 *             - first_name
 *             - last_name
 *             - department
 *             - dob
 *             - salary
 *             - Address
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Employees Retrieved Successfully.
 *       409:
 *         description: No Employees Exist in the Database.
 */
EmployeeRouter.get('/getAllEmployees', EmployeeController.getAllEmployees);

/**
 * @openapi
 * /employee/getEmployeeById/{employeeId}:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get Employee By Id.
 *     description: API used to get Employee By Id...
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Employee Retrieved Successfully By Id.
 *       409:
 *         description: This Employee does not Exist.
 */
EmployeeRouter.get('/getEmployeeById/:employeeId', EmployeeController.getEmployeeById);

/**
 * @openapi
 * /employee/getEmployeeByDepartment/{employeeDepartment}:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get Employee By Department.
 *     description: API used to get Employee ByDepartment Id...
 *     parameters:
 *       - in: path
 *         name: employeeDepartment
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Employee Retrieved Successfully By Department.
 *       409:
 *         description: This Employee does not Exist.
 */
EmployeeRouter.get('/getEmployeeByDepartment/:employeeDepartment', EmployeeController.getEmployeeByDepartment);

/**
 * @openapi
 * /employee/update/{employeeId}:
 *   put:
 *     tags:
 *       - Employee
 *     summary: Update Employee Record.
 *     description: API used to update Employee Record...
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee Record Updated Successfully.
 *       409:
 *         description: This Employee does not Exist.
 */
EmployeeRouter.put('/update/:employeeId', EmployeeController.updateEmployee);

/**
 * @openapi
 * /employee/delete/{employeeId}:
 *   delete:
 *     tags:
 *       - Employee
 *     summary: Delete Employee Record.
 *     description: API used to delete Employee Record...
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Employee Record Deleted Successfully.
 *       409:
 *         description: This Employee does not Exist.
 */
EmployeeRouter.delete('/delete/:employeeId', EmployeeController.deleteEmployee);

export default EmployeeRouter;