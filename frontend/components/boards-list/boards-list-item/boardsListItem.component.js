import styles from './boardsListItem.module.css';
import {useRouter} from "next/router";

export default function BoardsListItem(props) {

    const router = useRouter();

    return <div className={styles.item}>

        <p className={styles.title}>{props.item.name}</p>
        <p className={styles.content}>
            {props.item.postsCount + " posts"}
        </p>
        <button className={styles.actionButton} onClick={
            () => router.push('/boards/' + props.item.id)
        }>check it out</button>

    </div>

}
