import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const userRepository = {

    authenticate: async ({identifier, password}) => {

        try {
            const {data} = await axios.post(baseUrl + 'auth/token', {email: identifier, password});

            return data;
        } catch (e) {
            throw e
        }

    },

    register: async ({firstName, lastName, email, password}) => {


        try {

            const request = {
                firstName, lastName, email, password
            }

            const url = baseUrl + 'auth/register'

            console.log("trying to register user", JSON.stringify(request));

            console.log("url", url);

            const {data} = await axios.post(url, request);

            return data;

        } catch (e) {
            console.error(e);
            throw e;
        }
    }


}

export default userRepository