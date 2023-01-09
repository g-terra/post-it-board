import styles from './logo.module.css';

export function Logo() {
    return (
        <div className={styles.logo}>
            <h1 className={styles.logoText}>Post it!</h1>
            <img src={'/logo.svg'} alt={'logo'} className={styles.logoImage}/>
        </div>
    )
}

