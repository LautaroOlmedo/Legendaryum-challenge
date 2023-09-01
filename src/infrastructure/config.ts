export const config = {
    server: {
        port: process.env.PORT || 8000,
    },
    redis: {
        url: process.env.REDIS_URL || "http://localhost:8000"
    }
};