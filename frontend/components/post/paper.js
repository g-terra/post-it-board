import {useEffect, useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";


export default function Paper({height = '100%', width = '100%', color, angle = 0, children, props}) {

    const classes = [
        'shadow-black', 'shadow-sm', 'p-2'
    ]

    const getClasses = (color) => {
        classes.push(getTailwindColor(color));
        return classes.join(" ");
    }

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

    return (
        <div className={getClasses(color)} style={
            {
                height: height,
                width: width,
                transform: `rotate(${angle}deg)`
            }
        } {...props}>
            <div className={'flex flex-col h-full'}>
                {children}
            </div>
        </div>
    )
}


export function PaperText({text, color = 'black', size = '1em', weight = 'normal', props , children}) {
    return (
        <div className={'flex flex-col h-full break-words'} {...props}>
            <p className={`text-${color} text-${size} font-${weight}`}>{text}</p>
            {children}
        </div>
    )
}

export function PaperFooter({text, color = 'black', size = '1em', weight = 'normal',  props , children}) {
    return (
        <div className={'flex justify-between'} {...props}>
            <p className={`text-${color} text-${size} font-${weight}`}>{text}</p>
            {children}
        </div>
    )
}

export function PaperClose({onClose, color = 'black', size = '1em', weight = 'normal' }) {
    return (
        <div className={'flex justify-end'}>
            <button className={`text-${color} hover:scale-125`} onClick={onClose}>
                <CloseIcon className={`text-${size} font-${weight} `}/>
            </button>
        </div>
    )
}


