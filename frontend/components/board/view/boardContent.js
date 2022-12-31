export function BoardContent(props) {

    return <div className={'board-grid'} >
        {props.children ? props.children : <div className={'w-[200px] h-[200px]'}></div>}
    </div>;
}