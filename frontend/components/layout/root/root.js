import styles from './root.module.css';
import Navbar from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import Content from "../content/content.component";
import Head from "next/head";
import React from "react";

export default function Root({children}) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Post It!</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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



