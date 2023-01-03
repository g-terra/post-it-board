import Navbar from "./navbar/navbar";
import {Head} from "next/document";
import Footer from "./footer/footer";
import {useSession} from "next-auth/react";
import Spinner from "../utils/spinner/spinner";

export default function Root({children}) {

    return (
        <div className="page-container">
            <Navbar/>
            <div className="content-wrap">
                {children}
            </div>
            <Footer/>
        </div>
    )
}



