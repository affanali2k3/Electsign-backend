import { Request, Response } from "express";
import UserRepo from "../repository/UserRepo";
class UserController {

    async saveUser(req: Request, res: Response) {
        try {
            const email: string = req.body.email;
            await UserRepo.saveUser({ email: email })

            res.status(200).json({
                message: `User saved succesfully`
            })
        } catch (err) {
            res.status(500).json({
                message: `Could not save user ${err}`
            })
        }
    }
}

export default new UserController;