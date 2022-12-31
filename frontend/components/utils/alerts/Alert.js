import {useEffect, useState} from "react";

export function Alert({message = '', severity = 'error'}) {

    const alertType = {
        info: 'alert-info',
        error: 'alert-error',
        success: 'alert-success',
    }

    return (
        <div className={"px-4 py-2 m-2 rounded " + alertType[severity]} role="alert">
            <p> {message}</p>
        </div>
    )
}