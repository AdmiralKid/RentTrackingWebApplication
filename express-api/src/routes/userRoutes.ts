import { Request, Response, NextFunction, Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { ValidationMiddleware } from "../middleware/validationMiddleware";

import { InputCredentials, User } from "../models/userModel";
import { Middlewares } from "../server/middlewares";
import { Services } from "../server/services";
import { ITokenService } from "../services/tokenService";
import { IUserService } from "../services/userService";

export class UserRoutes {
  private _router: Router;

  private _userService: IUserService;
  private _tokenService: ITokenService;

  private _authMiddleware: AuthMiddleware;
  private _validationMiddleware: ValidationMiddleware;
  /**
   *
   */
  constructor(
    { userService, tokenService }: Services,
    { authMiddleware, validationMiddleware }: Middlewares
  ) {
    this._userService = userService;
    this._tokenService = tokenService;
    this._authMiddleware = authMiddleware;
    this._validationMiddleware = validationMiddleware;
    this._router = Router();
  }

  get routes() {
    const { _router, _validationMiddleware, _authMiddleware } = this;
    const { validateCredentials, validatePassword, validateUser } =
      _validationMiddleware;
    const { verifyToken } = _authMiddleware;

    _router.post(
      "/register",
      validateUser,
      validatePassword,
      (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user as User;
        const password = res.locals.password as string;

        this._userService
          .createUser(user, password)
          .then(() => {
            res.json({ message: "User created" });
          })
          .catch(next);
      }
    );

    _router.post(
      "/signin",
      validateCredentials,
      (req: Request, res: Response, next: NextFunction) => {
        const credentials = res.locals.credentials as InputCredentials;
        this._userService
          .authenticateUser(credentials)
          .then((user) => {
            this._tokenService
              .getAccessToken(user)
              .then((token) => {
                res.json({ token });
              })
              .catch(next);
          })
          .catch(next);
      }
    );

    _router.get(
      "/",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        const { user } = res.locals;
        res.json(user);
      }
    );

    _router.delete(
      "/",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.user as User;
        this._userService
          .deleteUser(userId)
          .then(() => {
            res.json({ message: "User Deleted" });
          })
          .catch(next);
      }
    );

    return _router;
  }
}
