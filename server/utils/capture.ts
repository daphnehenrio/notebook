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
      if (error.message.includes('not foud')) {
        res.status(404).json({
          message: error.message,
          details: error,
        });
      }
      else if (error.message.includes('already exists')) {
        res.status(409).json({
          message: error.message,
          details: error,
        });
      }
      else if (error.message.includes('not allowed')) {
        res.status(405).json({
          message: error.message,
          details: error,
        });
      } else {
        res.status(500).json({
          message: error.message,
          details: error,
        });
      }
    }
  };

// ? Export
export default capture;
