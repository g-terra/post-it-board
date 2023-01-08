import {Logo} from "../logo/logo.component";
import styles from './footer.module.css';

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
                    <a href="https://tailwindcss.com/" className="text-light hover:text-gray-400">Tailwind</a>
                    <a href="https://nextjs.org/" className="text-light hover:text-gray-400">Next.js</a>
                    <a href="https://spring.io/" className="text-light hover:text-gray-400">Spring</a>
                </div>
            </FooterSection>
            <FooterSection title={"© Copyright 2023"}>
                <a href="/" className="text-light hover:text-gray-400">MIT License</a>
            </FooterSection>
        </footer>
    )



}