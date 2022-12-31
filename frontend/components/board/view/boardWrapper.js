export function BoardWrapper(props) {

    return <div className={'w-full h-full flex flex-col justify-center items-center mt-4'}>
        {props.children}
    </div>
}