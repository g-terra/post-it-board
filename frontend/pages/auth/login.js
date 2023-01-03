import * as Yup from "yup";
import React from "react";
import {FormTemplate} from "../../components/utils/generic-form/formTemplate";
import Link from "next/link";
import {getCsrfToken, signIn} from "next-auth/react";
import {useRouter} from "next/router";


export default function Login({ csrfToken }) {

    const [token, setToken] = React.useState(null)

    const router = useRouter();

    const formDef = {
        title: 'Login',
        fields: [
            {
                name: 'email',
                label: 'Email',
                placeholder: 'e.g. users@domain.com',
                initialValue: '',
                type: 'text',
            },
            {
                name: 'password',
                label: 'Password',
                placeholder: 'Password',
                initialValue: '',
                type: 'password',
            },
        ],
        submit: {
            text: 'Login',
            handleSubmit: async (values) => {
                await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    csrfToken: token,
                    callbackUrl: `${window.location.origin}`,
                }).then(({ok}) => {
                    if (ok) {
                        router.push('/')
                    } else {
                        alert(`Credentials do not match!`);
                    }
                }).catch(e => {
                    alert(e);
                });
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        footerControls: [
            <div className={'mt-5 text-primary font-bold'}>
                <Link href={'/auth/register'}>Don't have an account?</Link>
            </div>
        ],
    }

    return (
        <div className={'form-width m-5'}>
            <FormTemplate {...formDef}/>
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