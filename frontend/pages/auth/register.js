import * as Yup from "yup";
import Link from "next/link";
import {FormTemplate} from "../../components/utils/generic-form/formTemplate";
import React from "react";

export default function Register() {

    const formDef = {
        title: 'Register',
        fields: [
            {
                name: 'firstName',
                label: 'First Name',
                placeholder: 'John',
                initialValue: '',
                type: 'text',
            },
            {
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Doe',
                initialValue: '',
                type: 'text',
            },
            {
                name: 'email',
                label: 'Email',
                placeholder: 'e.g. user@domain.com',
                initialValue: '',
                type: 'text',
            },
            {
                name: 'password',
                label: 'Password',
                placeholder: '************',
                initialValue: '',
                type: 'password',
            },
            {
                name: 'passwordConfirmation',
                label: 'Confirm Password',
                placeholder: '************',
                initialValue: '',
                type: 'password',
            },
        ],
        submit: {
            text: 'Create Account',
            handleSubmit: (values) => {
                console.log("Registering:", values)
            }
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().required('Email is required').email('Must be a valid email'),
            password: Yup.string().required('Password is required'),
            passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        footerControls: [
            <div className={'mt-5 text-primary font-bold'}>
                <Link href={'/auth/login'}>Already have an account?</Link>
            </div>
        ],
    }

    return (
        <div className={'form-width m-5'}>
            <FormTemplate {...formDef}/>
        </div>
    )
}