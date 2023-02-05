import FormBuilderComponent, {FieldTypes} from "../components/form-builder/FormBuilder.component";
import * as yup from "yup";
import Link from "next/link";
import userRepository from "../repositories/users/userRepository";
import {useAlertProvider} from "../components/alerts/alertProvider";
import {useRouter} from "next/router";
import Head from "next/head";
import React from "react";

export default function Register() {
    const fields = [
        {
            type: FieldTypes.text,
            name: "firstName",
            label: "First Name",
            placeholder: "Enter your first name",
        },
        {
            type: FieldTypes.text,
            name: "lastName",
            label: "Last Name",
            placeholder: "Enter your last name",
        },
        {
            type: FieldTypes.text,
            name: "email",
            label: "Email",
            placeholder: "Enter your email e.g. john.doe@domain.com",
        },
        {
            type: FieldTypes.password,
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
        },
        {
            type: FieldTypes.password,
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm your password",
        }
    ];

    const link ={
        text: "Already have an account?",
        href: "/login"
    }

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().required("You must confirm your password").oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const alertProvider = useAlertProvider();

    const router = useRouter();

    const handleSubmit = async (data) => {

        await userRepository.register(data);
        alertProvider.pushAlert({
            severity: 'success', message: "Account created!"
        })
        return router.push('/login');
    }

    return (
        <div className={'flex flex-col w-[85%] p-3 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/3'}>
            <Head>
                <title>Register | Post It!</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <FormBuilderComponent title={"Register Now!"} fields={fields} onSubmit={handleSubmit} schema={schema} submitText={"Create Account"} link={link}/>
        </div>

    )

}