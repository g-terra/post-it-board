import AuthOnly from "../../components/layout/authOnly";
import {func} from "prop-types";
import {useState} from "react";

function Tooltip({content, children}) {
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

function Owner({avatar, name, surname}) {

    const initials = (name.charAt(0) + surname.charAt(0)).toUpperCase();

    return (
        <Tooltip content={name + ' ' + surname}>
            <div className={'grid h-10 w-10 rounded-full bg-red-400 align-middle items-center justify-center'}>
                <Tooltip content={name + ' ' + surname}/>
                <div className={
                    'grid h-10 w-10 rounded-full bg-red-400 align-middle items-center justify-center'
                }>
                    {
                        avatar ?
                            <img src={avatar} alt={name} className={'h-full w-full rounded-full'}/> :
                            <p className={'text-primary font-bold text-center'}>
                                {initials}
                            </p>
                    }
                </div>
            </div>
        </Tooltip>
    );
}

function BoardView({
                       title = 'No Title', posts = 0, id = -1, owner = {
        name: 'name',
        surname: 'surname',
        avatar: ''
    }, onclick
                   }) {
    const handleClick = () => {
        onclick(id)
    };
    return (
        <div className={'w-[200px] h-[200px] bg-sky-300 rounded-2xl shadow shadow-red-100'}>
            <div className={'w-full h-full flex flex-col justify-start items-start p-4'}>
                <div className={'w-full flex justify-between items-center'}>
                    <p className={'text-primary font-bold'}>{title}</p>
                    <Owner avatar={owner.avatar} name={owner.name} surname={owner.surname}></Owner>
                </div>
                <div className={'h-full text-primary font-bold mt-5'}>
                    Posts: {posts}
                </div>
                <div className={'w-full flex justify-end'}>
                    <button className={'btn-primary'} onClick={handleClick}>check it out</button>
                </div>
            </div>
        </div>
    );
}

function BoardList({
                       boards
                   }) {
    return <div className='items-list'>
        {
            boards.map((board, index) => {
                return <BoardView key={index} {...board}></BoardView>
            })
        }

    </div>;
}

export default function Boards() {


    const boards = [
        {
            title: 'title',
            posts: 0,
            id: 0,
            owner: {
                name: 'name',
                surname: 'surname',
                avatar: ''
            }
        },
    ];
    return (
        <AuthOnly redirect='/boards/local'>
            <BoardList boards={boards}/>
        </AuthOnly>
    )
}