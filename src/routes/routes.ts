import express, { Request, Response } from 'express';
const router = express.Router();

router.get("/", function (req: Request, res: Response) {
    res.render('pages/main');
});

export default router;