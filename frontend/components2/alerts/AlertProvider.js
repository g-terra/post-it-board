import React, {useEffect, useState} from 'react'
import {Alert} from "./alert.component";

export const AlertContext = React.createContext(
    {
        pushAlert: null,
        pushAlerts: null,
    },
)


const AlertProvider = (props) => {
    const {children} = props
    const [alerts, _setAlerts] = useState([])

    const contextValue = {
        pushAlert: (alert) => {
            handleNewAlert(alert)
        }
    }

    const handleNewAlert = (newAlert) => {
        _setAlerts([...alerts, newAlert])
    }

    useEffect(() => {
        if (alerts.length > 0) {
            setTimeout(() => {
                _setAlerts(alerts.slice(1))
            }, 2000)
        }
    }, [alerts])

    return (
        <AlertContext.Provider value={contextValue}>
            {
                alerts.map((alert, index) => (
                    <Alert key={index} severity={alert.severity} message={alert.message}/>
                ))
            }
            {children}
        </AlertContext.Provider>
    )
}

//hook to use the context
export const useAlertProvider = () => {

    const context = React.useContext(AlertContext)

    if (context === undefined) {
        throw new Error('useAlert must be used within a AlertProvider')
    }
    return context
}

export default AlertProvider

