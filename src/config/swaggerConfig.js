const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Advanced auth with pagination",
            version: "1.0.0",
            description: "Rest API with auth and pagination",
            termsOfService: "https://en.wikipedia.org/wiki/Terms_of_service",
            contact: {
                name: "API Support",
                url: "https://developer.mozilla.org/en-US/docs/Web/API",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "https://advanced-auth-pagination.vercel.app/",
                description: "Vercel host",
            },
            {
                url: "http://localhost:4000/",
                description: "Local host",
            },
        ],
    },
    apis: ["src/**/*.js"],
};

export { swaggerOptions };