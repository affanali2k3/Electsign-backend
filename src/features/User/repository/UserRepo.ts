import { User } from "../model/UserModel";

interface IUserRepo {
    saveUser({ email }: { email: string }): Promise<void>
}

class UserRepo implements IUserRepo {
    async saveUser({ email }: { email: string }) {
        try {
            const user = new User();
            user.email = email;

            await user.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new UserRepo;