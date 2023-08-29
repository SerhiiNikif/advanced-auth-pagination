const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Advanced auth with pagination",
            version: "1.0.0",
            description: "Rest API with auth and pagination",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "https://advanced-auth-pagination-blue.vercel.app/",
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