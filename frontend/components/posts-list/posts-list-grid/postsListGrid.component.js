import React from 'react';
import DefaultItemGrid from "../../items-viewer/default-item-grid/defaultItemGrid.component";
import styles from './postsListGrid.module.css';
const PostsListGrid = ({children, onPageSizeChange}) => {
    return <DefaultItemGrid onPageSizeChange={onPageSizeChange} gridStyle={styles.pinBoard} breakpoints={
        [
            {width: 640, columns: 1, rows: 10},
            {width: 768, columns: 3, rows: 5},
            {width: 1024, columns: 3, rows: 5},
            {width: 1440, columns: 5, rows: 2},
        ]
    }>{children}</DefaultItemGrid>;
};

export default PostsListGrid;