import {useRouter} from "next/router";


function BoardListItem({name = 'No Title', posts = 0, id = -1}) {

    const router = useRouter();
    const handleBoardClick = () => {
        router.push(`/boards/${id}`).then(() => window.scrollTo(0, 0));
    }

    return (
        <div className={'w-[200px] h-[200px] bg-sky-300 rounded-2xl shadow shadow-red-100'}>
            <div className={'w-full h-full flex flex-col justify-start items-start p-4'}>
                <div className={'w-full flex justify-between items-center'}>
                    <p className={'text-primary font-bold'}>{name}</p>
                </div>
                <div className={'h-full text-primary font-bold mt-5'}>
                    Posts: {posts}
                </div>
                <div className={'w-full flex justify-end'}>
                    <button className={'btn-primary'} onClick={handleBoardClick}>check it out</button>
                </div>
            </div>
        </div>
    );
}

export function BoardList({boards}) {
    return <div className='items-list'>
        {
            boards.map((board, index) => {
                return <BoardListItem key={index} {...board}></BoardListItem>
            })
        }

    </div>;
}