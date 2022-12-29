export function BoardWrapper(props) {

    return <div className={'flex flex-col justify-center items-center mt-4 w-full h-full '}>
        {props.children}
    </div>
}