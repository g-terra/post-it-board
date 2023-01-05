import {Logo} from "../navbar/logo";

export default function Footer() {
    return (


        <footer className="footer">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full md:w-1/3 text-center md:text-left">
                    <div className={'flex justify-center items-center gap-4 order-first sm:order-2'}>
                        <h1 className={'text-4xl text-white font-brand whitespace-nowrap'}>Post it!</h1>
                        <Logo></Logo>
                    </div>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-left">
                    <h3 className=" font-bold mb-4 text-white">Tech stack</h3>
                    <ul className="list-reset leading-normal">
                        <li className="inline-block mr-2 mb-2">
                            <a href="https://tailwindcss.com/" className="text-light hover:text-gray-400">Tailwind</a>
                        </li>
                        <li className="inline-block mr-2 mb-2">
                            <a href="https://nextjs.org/" className="text-light hover:text-gray-400">Next.js</a>
                        </li>
                        <li className="inline-block mr-2 mb-2">
                            <a href="https://spring.io/" className="text-light hover:text-gray-400">Spring</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <p className="text-sm mb-4 text-light">&copy; Copyright 2023</p>
                    <a href="frontend/components/layout/footer#" className="text-light hover:text-gray-400">MIT License</a>
                </div>
            </div>
        </footer>


    )
}