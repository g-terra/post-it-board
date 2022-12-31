import userRepository from "../repositories/userRepository";

const authenticate = async ({email, password}) => {

    return await userRepository.authenticate({
        identifier: email,
        password
    })
}

const register = async ({firstName, LastName, email, password}) => {

    return await userRepository.register({
        firstName, LastName, email, password
    });

}


const userService = {
    authenticate, register
}

export default userService