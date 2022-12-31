import * as Yup from "yup";
import React, {useEffect, useState} from "react";
import {Alert} from "../alerts/Alert";
import {v4 as uuidv4} from "uuid";
import {Field} from "formik";

const defaultDef = {
    title: '',
    fields: [],
    submit: {
        text: '',
        handleSubmit: () => {
        }
    },
    validationSchema: Yup.object({}),
    footerControls: [],
}


function TextField({field, fieldValue, handleChange}) {


    return (
        <input
            type={field.type}
            className="text-input"
            name={field.name}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleChange(field.name, e.target.value)}
        />
    )
}

function TextArea({field, fieldValue, handleChange}) {


    return (
        <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{minHeight: field.minHeight}}
            name={field.name} placeholder="Content"
            value={fieldValue}
            onChange={(e) => handleChange(field.name, e.target.value)}
        />

    )
}


function Dropbox({field, fieldValue, handleChange}) {
    return (
        <select
            className="text-input"
            name={field.name}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleChange(field.name, e.target.value)}
        >
            {field.options.map((option) => {
                return (
                    <option value={option.value}>{option.label}</option>
                )
            })}
        </select>
    )
}


function FormField({field, handleChange}) {

    const [state, setState] = useState(field.initialValue);

    const handleStateChange = (name, value) => {
        setState(value);
        handleChange(name, value);
    }

    if (['text', 'password'].includes(field.type)) {
        return <TextField field={field} fieldValue={state} handleChange={handleStateChange}/>
    }

    if (['text-area'].includes(field.type)) {
        return <TextArea field={field} fieldValue={state} handleChange={handleStateChange}/>
    }

    if (['select'].includes(field.type)) {
        return <Dropbox field={field} fieldValue={state} handleChange={handleStateChange}/>
    }

    return null
}

export function FormTemplate({
                                 title = defaultDef.title,
                                 fields = defaultDef.fields,
                                 submit = defaultDef.submit,
                                 validationSchema = defaultDef.validationSchema,
                                 footerControls = defaultDef.footerControls,
                             }) {


    const [formState, setFormState] = useState({})

    const [errors, setErrors] = useState([])


    const handleChange = (name, value) => {
        setFormState({...formState, [name]: value})
    }

    const handleErrors = (newErrors) => {

        const uuid = uuidv4()

        console.log("newErrors:", newErrors)

        const taggedErrors = newErrors.map((error) => {
            return {
                message: error,
                uuid
            }
        })

        setErrors([...taggedErrors])
    }

    useEffect(() => {
        if (errors.length > 0) {
            setTimeout(() => {

                const uuid = errors[0].uuid
                setErrors(errors.filter((error) => error.uuid !== uuid))

            }, 4000)
        }
    }, [errors])

    const handleSubmit = (e) => {

        console.log("fieldValues:", formState)

        e.preventDefault()

        validationSchema.validate(formState, {abortEarly: false}).catch((err) => {
            handleErrors(err.errors)
        })

        validationSchema.isValid(formState).then((valid) => {
            if (valid) {
                submit.handleSubmit(formState)
            }
        })

    }

    return (
        <div className={'w-full'}>
            <form className="form-paper" onSubmit={handleSubmit}>

                <div className="flex justify-center pb-4">
                    <h3 className={"form-title"}>{title}</h3>
                </div>

                {errors.map((error, index) => (
                    <Alert key={index} severity={'error'} message={error.message}/>
                ))}

                {fields.map((field, index) => (
                    <div className="mb-6" key={index}>
                        <label className="form-label" htmlFor={field.name}>
                            {field.label}
                        </label>
                        <FormField field={field} handleChange={handleChange}/>
                    </div>
                ))}

                <div className=" w-full flex items-center px-6">
                    <input name="submit" type="submit" value={submit.text}
                           className="btn-primary  w-full"/>
                </div>

                {/*{footerControls.map((control) => (control))}*/}

            </form>
        </div>
    );
}