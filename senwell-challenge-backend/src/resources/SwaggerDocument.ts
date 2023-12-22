import swaggerJsdoc from "swagger-jsdoc";
const Package = require("../../package.json");

const options = {
    failOnErrors: true,
    /* This is the information that is going to be displayed on the swagger page. */
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Senwell Challenge API's",
            version: Package.version,
            description: Package.description,
            contact: {
                name: Package.author,
            },
        },
        host:
            process.env.NODE_ENV === "production"
                ? "https://senwell-challenge.onrender.com"
                : "http://localhost:4000",
        schemes: ["http"],
        basePath: "/api-docs",
        tags: [
            {
                name: "Employee",
                description: "API's regarding employee's operations.",
            },
        ],
        components: {
            schemas: {
                PageSize: {
                    type: "number",
                    minimum: 10,
                    default: 20,
                    description: "Number of items in a Page.",
                },
                PageNumber: {
                    type: "number",
                    minimum: 1,
                    default: 1,
                    description: "Page Number for Entries.",
                },
                SearchString: {
                    type: "string",
                    description: "String to search items in Entries.",
                },
                Ordering: {
                    type: "string",
                    enum: ["ASC", "DESC"],
                    description: "Ordering Fields by Ascending or Descending Order.",
                },
                Employee: {
                    type: "object",
                    properties: {
                        first_name: { type: "string" },
                        last_name: { type: "string" },
                        department: { type: "string" },
                        Address: { type: "string" },
                        dob: { type: "string" },
                        salary: { type: "string" },
                    },
                    required: ["first_name", "dob", "Address", "salary"],
                },
            },
        },
        servers: [
            process.env.NODE_ENV === "production"
                ? {
                    url: "https://senwell-challenge.onrender.com/api",
                    description: "Production Server.",
                }
                : {
                    url: "http://localhost:4000/api",
                    description: "Development Server.",
                },
        ],
    },
    /* Looking for all the files in the routes folder and then it is going to parse them. */
    apis: ["./src/routes/*.{ts,js}"],
};

/* Parsing the files in the routes folder and then it is going to create the swagger documentation. */
const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;
