import { jwtDecodeInterface } from "../../src/middlewares/verifyJwtToken";

declare global {
  namespace Express {
    interface Request {
      jwtDecode: jwtDecodeInterface;
    }
  }
}
