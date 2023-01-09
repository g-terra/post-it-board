import React, {useState} from 'react';
import styles from './searchAnCreate.module.css';

const SearchAndCreateBar = ({search, createItem , createText , additionalControls}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        search(query);
    };

    const handleCreate = () => {
        createItem();
    };

    return (
        <div className={styles.searchAndCreate}>
            <div className={styles.search}>
                <input className={styles.searchInput} type="text" value={query} onChange={(event) => setQuery(event.target.value)}/>
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
            <div className={'flex justify-center items-center'}>
                {additionalControls}
                <button className={styles.createButton} onClick={handleCreate}>{createText}</button>
            </div>
        </div>
    );
};

export default SearchAndCreateBar;
