import axios from "axios";
import getApiUrl from "../utils/apiUrlProvider";



const userRepository = {

    authenticate: async ({identifier, password}) => {

        console.log("using base url: " + getApiUrl())

        try {
            const {data} = await axios.post(getApiUrl() + 'auth/token', {email: identifier, password});

            return data;
        } catch (e) {

            console.log(e.response.data);

            throw e
        }

    },

    register: async ({firstName, lastName, email, password}) => {


        try {

            const request = {
                firstName, lastName, email, password
            }

            const url = getApiUrl() + 'auth/register'

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