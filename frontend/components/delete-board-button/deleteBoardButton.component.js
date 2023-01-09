import PopupActivator from "../popup/popup.component";
import boardService from "../../services/boardService";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useAlertProvider} from "../alerts/alertProvider";
import styles from "./deleteBoardButton.module.css";

export default function DeleteBoardButton({boardId}) {

    const router = useRouter();

    const session = useSession();

    const alertProvider = useAlertProvider();

    const handleDelete = () => {

        const request = {
            id: boardId,
        }

        if (session.status === "authenticated") {
            request.token = session.data.jwt;
        }

        boardService.removeBoard(request).then(() => {
            alertProvider.pushAlert({
                severity: 'success',
                message: 'Board deleted'
            })
            return router.push('/boards')
        }).catch((error) => {
            console.log(error);
            alertProvider.pushAlert({
                severity: 'error',
                message: 'Error deleting board'
            })
        })

    }

    function ActualButton(props) {
        return <button className={styles.deleteBoardButton} onClick={props.onClick}>Delete this board</button>;
    }

    return (
        <PopupActivator
            onAction={handleDelete}
            CallerComponent={ActualButton}
            heading={"Are you sure?"}
            description={"This action cannot be undone!"}
            actionName={"Delete Board"}/>
    )
}