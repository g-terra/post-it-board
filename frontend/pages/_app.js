import '../styles/globals.css'
import Root from "../components/layout/Root";
import AlertProvider from "../components/utils/alerts/AlertProvider";
import {SessionProvider} from "next-auth/react";

export default function App({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <Root>
                <AlertProvider>
                    <Component {...pageProps} />
                </AlertProvider>
            </Root>
        </SessionProvider>
    )

}
