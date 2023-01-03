import '../styles/globals.css'
import Root from "../components/layout/Root";
import {SessionProvider, useSession} from "next-auth/react";
import Spinner from "../components/utils/spinner/spinner";
import AlertProvider from "../components/utils/alerts/AlertProvider";


export default function App({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <SessionCheck>

                <Root>
                    <AlertProvider>
                        <Component {...pageProps} />
                    </AlertProvider>

                </Root>

            </SessionCheck>
        </SessionProvider>
    )
}

export function SessionCheck({children}) {

    const session = useSession()

    return session.status === 'loading' ? <Spinner/> : children
}