import {useState} from "react";

export function Tooltip({content, children}) {
    const [hover, setHover] = useState(false);

    const handleMouseIn = () => {
        setHover(true);

    };
    const handleMouseOut = () => {
        setHover(false);
    };

    return <div onMouseOver={handleMouseIn.bind(this)} onMouseOut={handleMouseOut.bind(this)}>
        {children}
        {
            (hover) && <div className={'absolute z-10 bg-gray-100 rounded-md p-2'}>
                {content}
            </div>
        }
    </div>
}