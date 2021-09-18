import { Request, Response, NextFunction, Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { Middlewares } from "../server/middlewares";
import { Services } from "../server/services";
import { IAdminService } from "../services/adminService";

export class AdminRoutes {
	private _adminService: IAdminService;
	private _authMiddleware: AuthMiddleware;

	private _router: Router;

	/**
	 *
	 */
	constructor({ adminService }: Services, { authMiddleware }: Middlewares) {
		this._adminService = adminService;
		this._authMiddleware = authMiddleware;

		this._router = Router();
	}

	get routes(): Router {
		const { _router, _authMiddleware, _adminService } = this;
		const { verifyAdmin, verifyToken } = _authMiddleware;
		const { getUserRequests, approveUserRequest, rejectUserRequest } =
			_adminService;

		_router.use(verifyToken);
		_router.use(verifyAdmin);

		_router.get(
			"/getRequests",
			(req: Request, res: Response, next: NextFunction) => {
				getUserRequests()
					.then((userRequests) => {
						res.json({ userRequests });
					})
					.catch(next);
			}
		);

		_router.post("/approveRequest", (req, res, next) => {
			const { userId } = req.body;
			approveUserRequest(userId as string)
				.then(() => {
					res.json({ message: "User is approved" });
				})
				.catch(next);
		});

		_router.post("/rejectRequest", (req, res, next) => {
			const { userId } = req.body;

			rejectUserRequest(userId as string)
				.then(() => {
					res.json({ message: "User is rejected" });
				})
				.catch(next);
		});

		return _router;
	}
}
