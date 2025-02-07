/**
 * all about auth routes
 * for only unauthorized users
 * @type {string[]}
 */
export const authRoutes = ["/signup", "/signin", "/forget-password"];

/**
 * The prefix for api authentication routes
 * @type {string}
 */
export const apiAuthRoutePrefix = "/api";

/**
 * public routes
 * can be access without login or with login
 * @type {string[]}
 */
export const publicRoutes = ["/", "/verify"];

/**
 * defalut writer signin redirect
 * @type {string}
 */
export const DEFAULT_WRITER_SIGNIN_REDIRECT = "/my-wallet";

/**
 * defalut user signin redirect
 * @type {string}
 */
export const DEFAULT_USER_SIGNIN_REDIRECT = "/wallet";

/**
 * defalut admin signin redirect
 * @type {string}
 */
export const DEFAULT_ADMIN_SIGNIN_REDIRECT = "/admin/dashboard";

/**
 * email verification route
 * @type {string}
 */
export const EMAIL_VERIFY = "/verify";

/**
 * all admin routes common profix
 * @type {string}
 */
export const ADMIN_ROUTE_PREFIX = "/admin";

/**
 * only admin routes
 * @type {string[]}
 */
export const ADMIN_ROUTE_ONLY = ["/admin/users", "/admin/site-setting", "/admin/gateway"];
