import {Logo} from "../logo/logo.component";
import styles from './footer.module.css';
import Link from "next/link";

function FooterSection(props) {
    return <div className={styles.footerSection}>
        <h1 className={styles.footerSectionTitle}>{props.title}</h1>
        {props.children}
    </div>;
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <FooterSection>
                <Logo/>
            </FooterSection>
            <FooterSection title={"Tech stack"}>
                <div className={"flex gap-2"}>
                    <Link href="https://tailwindcss.com/" className="text-light hover:text-gray-400">Tailwind</Link>
                    <Link href="https://nextjs.org/" className="text-light hover:text-gray-400">Next.js</Link>
                    <Link href="https://spring.io/" className="text-light hover:text-gray-400">Spring</Link>
                </div>
            </FooterSection>
            <FooterSection title={"© Copyright 2023"}>
                <Link href="/" className="text-light hover:text-gray-400">MIT License</Link>
            </FooterSection>
        </footer>
    )



}