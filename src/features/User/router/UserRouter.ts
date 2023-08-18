import BaseRoutes from "../../../router/base/BaseRouter";
import UserController from '../controller/UserController';

class UserRouter extends BaseRoutes {
    public routes(): void {
        this.router.post('/', UserController.saveUser);
    }

}

export default new UserRouter().router