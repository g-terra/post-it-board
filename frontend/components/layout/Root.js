import Navbar from "../navbar/navbar";
import {Head} from "next/document";
import Footer from "../footer/footer";

export default function Root({children}) {
    return (
        <div className='background-light relative h-screen flex flex-col justify-center'>
            <main
                className=""
            >
                <Navbar/>
                <div className="flex flex-col justify-center items-start self-center">
                    {children}
                </div>
                <Footer/>
            </main>
        </div>
    )
}

