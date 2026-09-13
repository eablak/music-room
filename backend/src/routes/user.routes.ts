import { Router } from "express";
import { createUser, getUsers, verifyEmail } from "../controllers/UserController";

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
 *  /users:
 *    get:
 *      summary: Get all users
 *      responses:
 *        200:
 *          description: Numeric ID of the user to get
 */
router.get("/users", getUsers);

router.get("/verify", verifyEmail);


export default router;