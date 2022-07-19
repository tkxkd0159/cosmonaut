import express from 'express';
import {join} from 'path';
import authRoute from './auth.route';
import conf from '@d3lab/config'

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(join(conf.reactPath, "index.html"));
})

const subRoutes = [
    {
        path: '/auth',
        route: authRoute
    }
];

subRoutes.forEach((r) => {
    router.use(r.path, r.route);
});

export default router