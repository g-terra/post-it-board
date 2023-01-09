import {useEffect, useState} from "react";
import styles from './popup.module.css';


function Popup({
    heading,
    description,
    onCancel,
    onAction,
    actionName,
               }) {
    return (
        <div className={styles.popup}
             id="modal-id">
            <div className={styles.popupSurroundings} onClick={onCancel}></div>
            <div className={styles.content}>

                <h2 className={
                    styles.heading
                }>{heading}</h2>
                <p className={
                    styles.description
                }>{description}</p>
                <div>
                    <button
                        onClick={onCancel}
                        className={styles.cancel}>
                        Cancel
                    </button>
                    <button
                        onClick={onAction}
                        className={styles.action}>
                        {actionName}
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}

export default function PopupActivator({CallerComponent, ...props}) {

    const [showModal, setShowModal] = useState(false);

    const handleAction = () => {
        setShowModal(false);
        props.onAction();
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        });
    }, []);


    return (
        <div>
            <CallerComponent onClick={() => {
                setShowModal(true);
            }}>
                Delete this board
            </CallerComponent>
            {showModal ?
                <Popup onAction={handleAction} heading={props.heading} description={props.description} onCancel={handleCancel} actionName={props.actionName}/> : null}
        </div>
    )
}

