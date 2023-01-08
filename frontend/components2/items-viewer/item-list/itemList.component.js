import React from 'react';
import styles from './itemList.module.css';
import TappedPaper from "../../misc/tapped-paper/tappedPaper.component";

const ItemList = ({items, ItemComponent, ListWrapper}) => {
    return (
        <ListWrapper>
            {items.length > 0 ? items.map((item) => <ItemComponent key={item.id} item={item}/>) :
                <div className={styles.notFound}><TappedPaper text={'No Items Found'}/></div>}
        </ListWrapper>
    );
};

export default ItemList;
