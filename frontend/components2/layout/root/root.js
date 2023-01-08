import styles from './root.module.css';
import Navbar from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import Content from "../content/content.component";

export default function Root({children}) {

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Navbar/>
            </header>
            <main className={styles.main}>
                <Content>
                    {children}
                </Content>
            </main>
            <footer className={styles.footer}>
                <Footer/>
            </footer>
        </div>
    )
}



