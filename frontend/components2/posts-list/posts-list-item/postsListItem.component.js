import styles from './postsListItem.module.css';
import {useRouter} from "next/router";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import postService from "../../../services/postService";
import {useSession} from "next-auth/react";
import PopupActivator from "../../popup/popup.component";

export default function PostsListItem(props) {

    const router = useRouter();
    const session = useSession();

    const randomAngle = {min: -2, max: 2}

    function getTailwindColor(color) {
        switch (color) {
            case 'red':
                return 'bg-red-400';
            case 'blue':
                return 'bg-blue-400';
            case 'green':
                return 'bg-green-400';
            case 'yellow':
                return 'bg-amber-400';
            default:
                return 'bg-amber-400';
        }
    }

    const getRandomAngle = () => {
        return randomAngle.min + Math.floor(Math.random() * (randomAngle.max - randomAngle.min))
    }

    const handleRemove = () => {

        const request = {id: props.item.id}

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        postService.removePost(request).then(() => {
            router.reload();
        });
    }


    return <div className={[styles.item, getTailwindColor(props.item.color)].join(' ')}
                style={
                    {
                        transform: `rotate(${getRandomAngle()}deg)`
                    }
                }>

        <div className={styles.close}>

            <PopupActivator
                onAction={handleRemove}
                CallerComponent={(props) => <div {...props}><CloseIcon/></div>}
                heading={"Are you sure?"}
                description={"This action cannot be undone!"}
                actionName={"Delete Post"}/>

        </div>
        <div className={styles.content}>
            <p>{props.item.content}</p>
        </div>

    </div>

}
