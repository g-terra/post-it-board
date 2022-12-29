export function BoardFrame(props) {
    return (
        <div className={'rounded-3xl p-1 w-full h-full ' + props.color}>
            {props.children}
        </div>
    );
}