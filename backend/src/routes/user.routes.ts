import { Router } from "express";
import { createUser, getUsers } from "../controllers/UserController";

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
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *              example: # Sample object
 *                name: Jessica Smith
 *                email: jessica@gmail.com
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

export default router;