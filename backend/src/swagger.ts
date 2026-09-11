import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: "Music Room API Documentation",
            version: "1.0.0",
            description: "This is a sample API documentation using Swagger.",
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
