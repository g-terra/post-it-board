import FormBuilder, {FieldTypes} from "../components2/form-builder/FormBuilder";
import * as yup from "yup";
import Link from "next/link";
import userRepository from "../repositories/users/userRepository";
import {useAlertProvider} from "../components/utils/alerts/AlertProvider";
import {useRouter} from "next/router";
import {getCsrfToken, signIn} from "next-auth/react";

export default function Login({csrfToken}) {
    const fields = [

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

    ];

    const link = {
        text: "Don't have an account?",
        href: "/register"
    }

    const schema = yup.object().shape({
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const alertProvider = useAlertProvider();

    const router = useRouter();
    const handleSubmit = (values) => {

        signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            csrfToken: csrfToken,
            callbackUrl: `${window.location.origin}`,
        }).then(({ok}) => {
            if (ok) {
                alertProvider.pushAlert({severity: 'success', message: 'Login successful!'});
                return router.push('/boards');
            } else {
                alertProvider.pushAlert({
                    type: 'error',
                    message: 'Invalid credentials'
                })
            }
        }).catch(e => {
            alertProvider.pushAlert({
                type: 'error',
                message: 'Something went wrong' + e
            })
        });
    }

    return (
        <div className={'flex flex-col w-[85%] p-3 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/3'}>
            <FormBuilder fields={fields} onSubmit={handleSubmit} schema={schema} submitText={"Login"} link={link}/>
        </div>

    )

}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}