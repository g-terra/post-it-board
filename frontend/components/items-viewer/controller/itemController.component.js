import React, {useState, useEffect} from 'react';
import SearchAndCreateBar from "../search-and-create/searchAnCreate.component";
import Pagination from "../pagination/pagination.component";
import ItemList from "../item-list/itemList.component";
import styles from './itemController.module.css';
import Spinner from "../../misc/spinner/spinner.component";

const ItemController = ({
                            fetchItems,
                            createItem,
                            itemComponent,
                            ListWrapper,
                            createText,
                            additionalControls,
                            title = ""
                        }) => {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setLoading(true);
        fetchItems(query, page, pageSize).then((results) => {
            setItems(results.items || []);
            setTotalPages(results.totalPages);
        }).finally(() => {
            setLoading(false);
        });
    }, [query, page, pageSize]);

    return (
        <div className={styles.grid}>
            <div className={styles.title}>{title}</div>

            <div className={styles.searchBar}>
                <SearchAndCreateBar search={handleSearch} createItem={createItem} createText={createText}
                                    additionalControls={additionalControls}/>
            </div>
            <div className={styles.content}>
                {
                    loading ? <Spinner/> :
                        <ItemList items={items} ListWrapper={
                            (props) => <ListWrapper {...props} onPageSizeChange={setPageSize}/>
                        } ItemComponent={itemComponent}/>
                }
            </div>
            <div className={styles.pagination}>
                <Pagination fetchPage={handlePageChange} totalPages={totalPages} currentPage={page}/>
            </div>
        </div>
    );
};

export default ItemController;