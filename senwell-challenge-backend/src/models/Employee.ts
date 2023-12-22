import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

/* The code is defining a Mongoose schema for a employee. */
const employeeSchema = new Schema({
    employee_id: {
        type: Number,
        unique: true
    },
    first_name: { type: String },
    last_name: { type: String },
    department: { type: String },
    Address: { type: String },
    dob: { type: String },
    salary: { type: String },
}, { timestamps: true });

export interface IEmployee extends Document {
    employee_id: number
    first_name: string,
    last_name: string,
    department: string,
    Address: string,
    dob: string,
    salary: string
}


employeeSchema.plugin(AutoIncrement, {inc_field: 'employee_id'});
export default mongoose.model<IEmployee>(
    'Employee',
    employeeSchema,
);