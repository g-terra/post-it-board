import Navbar from "./navbar/navbar";
import {Head} from "next/document";
import Footer from "./footer/footer";

export default function Root({children}) {
    return (
        <div className='body'>
            <div className="page-container">
                <Navbar/>
                <div className="content-wrap">
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
    )
}

