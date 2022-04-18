// ? Import NPM
import { Request, Response, NextFunction } from 'express';

import * as sanitizer from 'sanitizer';

/**
 * @description Sanitize datas if req.body.content is not empty
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const sanitizeReq =(req: Request, res: Response, next: NextFunction) => { 
    /* if(req.body){
        for (const key in req.body) {
                req.body[key] = sanitizer.escape(req.body[key]);
        }
    } */
    next();
}

export default sanitizeReq;