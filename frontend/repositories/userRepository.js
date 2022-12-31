import axios from "axios";

const userRepository = {

    authenticate: async ({identifier, password}) => {
        return {
            "jwt":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiam9obi5kb2VAZG9lZG9tYWluLmNvbSIsInByb3ZpZGVyIjoibG9jYWwiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTA4VDA5OjQ0OjAxLjcwOVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTA4VDA5OjQ0OjAxLjcwOVoifQ.BpvfM1QcXfooOckliafuXfCXj2sUB4wh_J90-yEcv5E",
            "user": {
                "id": 40,
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@doedomain.com",
                "provider": "local",
                "createdAt": "2022-11-08T09:44:01.709Z",
                "updatedAt": "2022-11-08T09:44:01.709Z"
            }
        }
    }


}

export default userRepository