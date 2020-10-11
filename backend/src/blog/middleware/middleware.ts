import {Headers, Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response} from 'express';
const jwt = require("jsonwebtoken");

@Injectable()
export class LoggerMiddleware implements NestMiddleware{

        constructor(){}
        async use(req: Request, res:Response, next:Function){
            try{
                
                const header = req.headers["authorization"];
                // console.log(req.headers);
                console.log("yes calls token waiting");
                if(header==undefined) throw "Frobidden";
                if(typeof header !== "undefined"){
                const bearer= (header as string).split(" ");
                const token = bearer[1];
                let decode = jwt.verify(token, "secret");
                console.log("check token here", decode);
                req.body.decodeToken = decode;
            }
            next();
        }catch(e){
            console.log("check error row token problem", e);
            res.status(403).send({
                ResponseCode:403,
                ResponseMessage: "Forbidden",
                result:"session expired",
            });
        }
    }
}
