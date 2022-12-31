import {useSession} from "next-auth/react";
import Redirect from "../utils/redirect/redirect";

export default function AuthOnly({children , redirect}) {

    const {  status } = useSession()


    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
       return <Redirect to={redirect}/>
    }


    return (<>{children} </>)
}