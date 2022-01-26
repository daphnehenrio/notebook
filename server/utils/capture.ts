// ? Import NPM
import { Request, Response, NextFunction } from 'express';

// ? Function Declaration
/**
 * @description Englobe functions in try catch
 * @param myfunction Function to encapsulate in a try catch
 * @returns Returns a function that will be executed in a try catch block (result or error)
 */
const capture = (myfunction: Function) =>
  // we return a new function, which calls the first one in a try catch
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await myfunction(req, res, next);
    }
    catch (error) {
      console.error(error);
      // console.trace(error);
      res.status(500).send({
        message: error.message,
        details: error,
      });
    }
  };

// ? Export
export default capture;
