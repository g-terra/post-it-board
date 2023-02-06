import styles from './alert.module.css';
export function Alert({message = '', severity = 'error'}) {

    const alertType = {
        info: styles.alertInfo,
        error: styles.alertError,
        success: styles.alertSuccess
    }

    return (
        <div className={alertType[severity]} role="alert">
            <p> {message}</p>
        </div>
    )
}