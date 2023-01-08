import '../styles/globals.css'
import Root from "../components2/layout/root/root";
import {SessionProvider, useSession} from "next-auth/react";
import Spinner from "../components2/misc/spinner/spinner.component";
import AlertProvider from "../components2/alerts/AlertProvider";


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