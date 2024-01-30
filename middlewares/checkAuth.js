import ApiError from "../exceptions/api-error.js";
import TokenService from "../service/token.js";

function checkAuthMiddlewares(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader){
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken){
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validationAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

export default checkAuthMiddlewares;