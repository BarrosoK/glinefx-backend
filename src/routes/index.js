import express from 'express'
import courseRoutes from "./course.route.js";
import authRoutes from "./auth.route.js";

const router = express.Router();

const routes = [
    {
        path: '/course',
        route: courseRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router
