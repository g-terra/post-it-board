import {useEffect, useState} from "react";
import {PropTypes} from "prop-types";
import {NavButton} from "./navButton";
import {Avatar} from "./avatar";
import {Logo} from "./logo";
import {signOut, useSession} from "next-auth/react";

NavButton.prop = {
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
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
        <>
            <div className={'header'}>

                <div className={'flex justify-center items-center'}>
                    <NavButton link={'/'} text={'Home'}/>
                    <NavButton link={'/boards'} text={'Boards'}/>
                </div>

                <div className={'flex justify-center items-center gap-4 order-first sm:order-2'}>
                    <h1 className={'text-4xl font-brand whitespace-nowrap'}>Post it!</h1>
                    <Logo></Logo>
                </div>

                <div className={'flex justify-center items-center gap-4 order-3'}>
                    {
                        isLogged ?
                            <>
                                <p>Hi {session.data.user.firstName}!</p>
                                <NavButton text={"Logout"} onClick={signOut}/>
                                {/*<Avatar/>*/}
                            </>
                            :
                            <>
                                <NavButton text={"Register"} link={"/auth/register"}/>
                                <NavButton text={"Login"} link={"/auth/login"}/>
                            </>
                    }
                </div>
            </div>
        </>
    )
}