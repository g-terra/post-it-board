import {useEffect, useState} from "react";
import Paper, {PaperClose, PaperFooter, PaperText} from "./paper";

export function PostIt2({
                            content = '',
                            footer = '',
                            paperColor = 'yellow',
                            textColor = 'black',
                            angle = 0,
                            height = '100%',
                            width = '100%',
                            onClose = () => {
                            },
                            randomAngle = {min: -0, max: 0},
                        }) {


    const [angleState, setAngleState] = useState(angle)

    const [classes, setClasses] = useState('transition-all');


    const getRandomAngle = () => {
        return randomAngle.min + Math.floor(Math.random() * (randomAngle.max - randomAngle.min))
    }


    useEffect(() => {
        if (randomAngle) {
            setAngleState(getRandomAngle())
        }
    }, [angleState])


    return (
        <div className={classes} style={
            {
                transform: `rotate(${angleState}deg)`
            }}>
            <Paper height={height} width={width} color={paperColor} angle={angle}>
                <PaperClose onClose={onClose} color={textColor}/>
                <PaperText text={content} color={textColor}/>
                <PaperFooter text={footer} color={textColor}/>
            </Paper>
        </div>
    )
}