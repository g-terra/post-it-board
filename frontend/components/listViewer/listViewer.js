import {useEffect, useState} from "react";
import styles from './listViewer.module.css';
import {useSession} from "next-auth/react";

export function ListViewer({
                               totalPages,
                               children,
                               onChange = ({page, search, token}) => {
                               }
                           }) {

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(totalPages > 0 ? 1 : 0);
    const [refresh, setRefresh] = useState(false);
    const session = useSession();

    useEffect(() => {

        console.log("refreshing...requesting page", currentPage);

        const params = {
            page: currentPage,
            search: search
        }

        if (session.status === 'authenticated') {
            params.token = session.data.jwt;
        }

        onChange(params)


    }, [refresh])


    const handleNextPage = () => {
        const newPage = currentPage + 1;
        console.log("new page:", newPage);
        setCurrentPage(newPage);
        setRefresh(!refresh);
    }

    const handlePreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        setRefresh(!refresh);
    }


    const disableNext = () => {
        return currentPage === totalPages;
    }


    const disablePrev = () => {
        return currentPage === 1;
    }

    const handleSearch = () => {
        setCurrentPage(1);
        setRefresh(!refresh);
    }

    const handleReset = () => {
        setCurrentPage(1);
        setSearch('');
        setRefresh(!refresh);
    }


    return (
        <div className={styles.wrapper}>
            <div className={'h-full w-full flex justify-around gap-2 w-2/3'}>
                <input type="text" className={'text-input '} placeholder={'Search'} value={search}
                       onChange={(e) => {
                           setSearch(e.target.value)
                       }}/>
                <button className={'btn-primary'} onClick={handleSearch}>Search</button>
                <button className={'btn-primary'} onClick={handleReset}>Reset</button>

            </div>
            <div className={'w-full min-h-[55vh] flex flex-col items-center justify-start pt-4'}>
                {children.length > 0 ?
                    <div className={styles.viewGrid}>
                        {children}
                    </div>
                    :
                    <div className={'w-full h-full flex justify-center items-center'}>
                        <p className={'text-2xl text-secondary font-bold'}>No results found</p>
                    </div>
                }
            </div>
            <div className={'w-full flex justify-evenly items-center pt-1'}>
                <button className={'btn-primary'} onClick={handlePreviousPage} disabled={disablePrev()}>
                    prev
                </button>
                <p className={'text-secondary font-bold'}>
                    {currentPage} / {totalPages}
                </p>
                <button className={'btn-primary'} onClick={handleNextPage} disabled={disableNext()}> next
                </button>
            </div>
        </div>
    );
}

export function ListItem({
                             name = 'No name',
                             content = 'No content',
                             action = () => {
                             }
                         }) {


    const handleItemAction = () => {
        action();
    }

    return (
        <div className={styles.listItem}>
            <div className={'w-full h-full flex flex-col justify-start items-start p-4'}>
                <div className={'w-full flex justify-between items-center'}>
                    <p className={'font-bold'}>{name}</p>
                </div>
                <div className={'h-full font-bold mt-5'}>
                    {content}
                </div>
                <div className={'w-full flex justify-end'}>
                    <button className={'btn-primary'} onClick={handleItemAction}>check it out</button>
                </div>
            </div>
        </div>
    )
}