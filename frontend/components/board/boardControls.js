export function BoardControls(props) {
    return <div className={'w-full flex flex-row justify-evenly p-3'}>
        {
            props.controls.map((control, index) => {
                return <div key={index}>
                    {control}
                </div>
            })
        }
    </div>
}