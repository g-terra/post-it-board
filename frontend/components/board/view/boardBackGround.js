export function BoardBackGround(props) {

    return (
        <div className={'bg-repeat rounded-3xl w-full h-full'} style={
            {
                backgroundImage: `url('${props.bg}')`,
                backgroundSize: '40%',
                backgroundPosition: 'center',
            }
        }>
            {props.children}
        </div>
    );
}