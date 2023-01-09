import React, {useEffect, useState} from 'react';
import DefaultItemGrid from "../../items-viewer/default-item-grid/defaultItemGrid.component";


const BoardsListGrid = ({children, onPageSizeChange}) => {
    return <DefaultItemGrid onPageSizeChange={onPageSizeChange}>{children}</DefaultItemGrid>;
};

export default BoardsListGrid;