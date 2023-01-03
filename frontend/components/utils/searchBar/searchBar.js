import {useState} from "react";

export function SearchBar({onSearch}) {

    const [search, setSearch] = useState("");
    const handleClick = () => {
        onSearch(search);
    }

    return <div className={'w-full h-full flex gap-1'}>
        <input
            type={'text'}
            className="text-input"
            name={'search'}
            placeholder={'Search'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className={'btn-primary'} onClick={handleClick}>Find</button>
    </div>;
}