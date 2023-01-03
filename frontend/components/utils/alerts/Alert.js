
export function Alert({message = '', severity = 'error'}) {

    const alertType = {
        info: 'alert-info',
        error: 'alert-error',
        success: 'alert-success',
    }

    return (
        <div className={"w-3/4 flex flex-col justify-center items-center px-4 py-2 mt-3 mx-12 rounded " + alertType[severity]} role="alert">
            <p> {message}</p>
        </div>
    )
}