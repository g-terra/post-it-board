import styles from './tappedPaper.module.css'
export default function TappedPaper(props) {
    return (
        <div className={[
            styles.paper, styles.blue
        ].join(' ')}>
            <div className={
                styles.topTape
            }></div>
            <p>{props.text}</p>
        </div>
    )
}