import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import userService from "../../../services/userService";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Post It!',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                try {

                    console.log("trying to authenticate user", JSON.stringify(credentials));


                    const {user, jwt} = await userService.authenticate(
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    )

                    return ({user, jwt})

                } catch (error) {
                    throw new Error(error)
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/',
    },
    callbacks: {
        session: ({session, token}) => {
            session.id = token.id;
            session.jwt = token.jwt;
            return token;
        },
        jwt: ({token, user}) => {
            if (Boolean(user)) {
                token.id = user.id;
                token.jwt = user.jwt;
                token.user = user.user
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt'
    },

    debug: true
});