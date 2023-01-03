import userRepository from "../repositories/users/userRepository";
import forceDelay from "../utils/forceDelay";

const authenticate = async ({email, password}) => {

    return await userRepository.authenticate({
        identifier: email,
        password
    })
}

const register = async ({firstName, lastName, email, password}) => {

    return await userRepository.register({
        firstName, lastName, email, password
    });

}


const userService = {
    authenticate, register
}

export default userService