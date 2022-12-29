import {useState} from "react";
import {PropTypes} from "prop-types";
import {NavButton} from "./navButton";
import {Avatar} from "./avatar";
import {Logo} from "./logo";

NavButton.prop = {
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default function Navbar() {

    const [isLogged, setIsLogged] = useState(false);

    return (
       <>
           <div className={'header'}>

               <div className={'flex justify-center items-center w-full order-1'}>
                   <NavButton link={'/'} text={'Home'}/>
               </div>

               <div className={'flex justify-center items-center w-full gap-4 order-first sm:order-2'}>
                   <h1 className={'text-4xl text-white font-title whitespace-nowrap'}>Post it!</h1>
                   <Logo></Logo>
               </div>

               <div className={'flex justify-center items-center gap-4 w-full order-3'}>
                   {
                       isLogged ?
                           <>
                               <NavButton text={"logoff"} link={"/logoff"}/>
                               <Avatar/>
                           </>
                           :
                           <>
                               <NavButton text={"Register"} link={"/register"}/>
                               <NavButton text={"Login"} link={"/login"}/>
                           </>
                   }
               </div>
           </div>
       </>
    )
}