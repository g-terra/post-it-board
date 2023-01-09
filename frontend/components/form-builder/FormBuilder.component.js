import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {v4} from "uuid";
import styles from './FormBuilder.module.css';
import Link from "next/link";


export const FieldTypes = {
    text: "text",
    select: "select",
    textArea: "text-area",
    radio: "radio",
    password: "password",
}

function TextField(field, register, password = false) {
    return <input type={password ? "password" : "text"}
                  className={styles.formFieldText}
                  name={field.name}
                  placeholder={field.placeholder}
                  {...register(field.name)}/>;
}

function TextArea(field, register) {
    return <textarea name={field.name}
                     className={styles.formFieldTextarea}
                     style={{minHeight: `${field.minLines * 1.5}rem`}}
                     placeholder={field.placeholder}
                     {...register(field.name)}/>;
}

function Select(field, register) {
    return <select name={field.name}
                   className={styles.formFieldSelect}
                   {...register(field.name)}>
        {
            field.options.map((option, index) => <option key={index} value={option}>{option}</option>)
        }
    </select>;
}


export default function FormBuilderComponent(props) {

    const options = {}

    const {register, handleSubmit} = useForm(options);

    const [errors, setErrors] = useState([]);

    function handleError(id, err) {

        const newError = {
            id: id,
            message: err
        }

        //check if error already exists
        const errorIndex = errors.findIndex((error) => error.message === err);

        if (errorIndex === -1) {
            setErrors(prev => [...prev, newError]);
        }
    }

    //pop the last error after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            const lastError = errors[errors.length - 1];
            const filteredErrors = errors.filter((err) => err.id !== lastError.id);
            setErrors(filteredErrors);
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors]);

    const submitWrapper = (data) => {

        const submitId = v4();

        props.schema.validate(data, {abortEarly: false}).catch((error) => {

            error.errors.forEach((err) => {
                handleError(submitId, err);
            });
        });

        props.schema.isValid(data).then(async (valid) => {
                if (!valid) return;

                try {
                    await props.onSubmit(data)
                } catch (error) {
                    console.log(error);
                    handleError(submitId, error.message);
                }
            }
        )
    }


    return (
        <form className={styles.form}
              onSubmit={handleSubmit(submitWrapper)}>

            {
                errors.map((error, index) => <divn key={index} className={styles.formAlert}>
                    <p>{error.message}</p>
                </divn>)
            }

            <p className={styles.formTitle}>
                {props.title}
            </p>

            {
                props.fields.map((field, index) =>
                    <div key={index} className={styles.formInput}>
                        <label className={styles.formFieldLabel} htmlFor={field.name}>{field.label}</label>
                        {field.type === FieldTypes.text && TextField(field, register)}
                        {field.type === FieldTypes.password && TextField(field, register, true)}
                        {field.type === FieldTypes.textArea && TextArea(field, register)}
                        {field.type === FieldTypes.select && Select(field, register)}
                    </div>
                )
            }

            <input className={styles.formSubmit} type="submit" value={props.submitText}/>

            {
                props.link && <div className={styles.formLink}>
                    <Link href={props.link.href}>
                        <p>{props.link.text}</p>
                    </Link>
                </div>
            }

        </form>
    )

}

