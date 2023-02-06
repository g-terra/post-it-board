import React, {useEffect, useState} from 'react';
import styles from './defaultItemGrid.module.css';


let defaultBreakPoints = [
    {width: 640, columns: 1, rows: 10},
    {width: 768, columns: 3, rows: 5},
    {width: 1024, columns: 3, rows: 5},
    {width: 1440, columns: 5, rows: 3},
];
export default function DefaultItemGrid({children, onPageSizeChange, breakpoints = defaultBreakPoints , gridStyle}){

    const getBreakPointConfig = () => {
        let config = breakpoints[0];
        breakpoints.forEach((breakpoint) => {
            if (windowWidth >= breakpoint.width) {
                config = breakpoint;
            }
        });
        return config;
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [numberOfColumns, setNumberOfColumns] = useState(getBreakPointConfig().columns);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        const config = getBreakPointConfig();
        setNumberOfColumns(config.columns);
        onPageSizeChange(config.rows * config.columns);
    }, [windowWidth]);


    const defaultStyles =[
        styles.defaultItemGrid
    ]

    const getStyles = () => {
        const all = [...defaultStyles];
        all.push(gridStyle);
        return all.join(' ');
    }

    return <div className={getStyles()} style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
    }}>{children}</div>;
};
