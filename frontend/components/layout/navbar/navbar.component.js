import {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import styles from './navbar.module.css'
import {Logo} from "../logo/logo.component";

function Button(props) {

    const router = useRouter();

    const handleClick = () => {
        return router.push(props.link).then(() => window.scrollTo(0, 0));
    }

    return <button className={styles.navButton} onClick={props.onClick? props.onClick : handleClick}>{props.text}</button>
}

export default function Navbar() {

    const [isLogged, setIsLogged] = useState(false);

    const session = useSession();

    useEffect(() => {
        if (session.status === "authenticated") {
            setIsLogged(true);
        }
    }, [session]);


    return (

        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Button link={'/'} text={'Home'}/>
                <Button link={'/boards'} text={'Boards'}/>
            </div>
            <div className={styles.navbarCenter}>
                <Logo></Logo>
            </div>
            <div className={styles.navbarRight}>
                {
                    isLogged ?
                        <>
                            <p>Hi {session.data.user.firstName}!</p>
                            <Button text={"Logout"} onClick={async () =>
                                await signOut({callbackUrl: "/"})}/>
                        </>
                        :
                        <>
                            <Button text={"Register"} link={"/register"}/>
                            <Button text={"Login"} link={"/login"}/>
                        </>
                }

            </div>
        </div>

    )
}