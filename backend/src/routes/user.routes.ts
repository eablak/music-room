import { Router } from "express";
import { changePassword, createUser, getUsers, verifyEmail, savePassword, googleCallback } from "../controllers/UserController";
import passport from "../services/GoogleService";


const router = Router();

/**
 * @openapi
 * paths:
 *  /users:
 *    post:
 *      summary: Adds a new user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema: # Request body contents
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                surname:
 *                  type: string
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                birth_date:
 *                  type: date
 *              example: # Sample object
 *                name: Esra
 *                surname: Ablak
 *                username: eablak
 *                email: esrablk9@gmail.com
 *                password: pass1234
 *                birth_date: 1999-12-30
 *      responses:
 *        "200":
 *          description: OK
 */
router.post("/users", createUser);


/**
 * @openapi
 * paths:
 *   /verify:
 *     get:
 *       summary: Verify user email
 *       parameters:
 *         - in: query
 *           name: token
 *           required: true
 *           description: Token that you will get in your email box.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Email verified successfully.
 *         400:
 *           description: Email verification failed.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     examples:
 *                       missing:
 *                         value: Token is required.
 *                       invalid:
 *                         value: Invalid token.
 *                       expired:
 *                         value: Token has expired.
 */
router.get("/verify", verifyEmail);


/**
 * @openapi
 * paths:
 *   /users/reset-password:
 *     post:
 *       summary: Request a password reset email
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *               example:
 *                 email: esrablk9@gmail.com
 *       responses:
 *         "200":
 *           description: Reset email sent successfully.
 *         "400":
 *           description: Invalid email address.
 *         "500":
 *           description: Reset password failed.
 */
router.post("/users/reset-password", changePassword);


/**
 * @openapi
 * paths:
 *   /reset:
 *     post:
 *       summary: Save new password using reset token
 *       parameters:
 *         - in: query
 *           name: token
 *           required: true
 *           description: Token received in the password reset email.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 new_password:
 *                   type: string
 *               example:
 *                 new_password: newPass1234
 *       responses:
 *         "200":
 *           description: Password successfully changed.
 *         "400":
 *           description: Password reset failed.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     examples:
 *                       missing:
 *                         value: Token and new password are required.
 *                       invalid:
 *                         value: Invalid token.
 *                       expired:
 *                         value: Token has expired.
 */
router.post("/reset", savePassword);


router.get("/auth/google", passport.authenticate("google", { session: false, scope: ["email", "profile"], }));

router.get("/auth/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failed"}), googleCallback);

router.get("/auth/google/failed", (req, res) => { res.status(401).json({message: "Google login failed"}); });




/**
 * @openapi
 * paths:
 *  /users:
 *    get:
 *      summary: Get all users
 *      responses:
 *        200:
 *          description: Numeric ID of the user to get
 */
router.get("/users", getUsers);



export default router;