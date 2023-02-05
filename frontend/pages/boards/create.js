import React from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useAlertProvider} from "../../components/alerts/alertProvider";
import * as yup from "yup";
import FormBuilderComponent, {FieldTypes} from "../../components/form-builder/FormBuilder.component";
import boardService from "../../services/boardService";
import Head from "next/head";

export default function CreateBoard() {
    const session = useSession();
    const router = useRouter();
    const alertProvider = useAlertProvider();

    const fields = [
        {
            type: FieldTypes.text,
            name: "name",
            label: "Board Name",
            placeholder: "Enter your email e.g. The best board ever",
        },
    ];


    const schema = yup.object().shape({
        name: yup.string().required("Board name is required"),
    });


    const handleSubmit = (values) => {

        const request = {
            group: values
        }

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        boardService.createBoard(request).then((res) => {
            return router.push('/boards/' + res.id)
        }).catch((error) => {
            alertProvider.pushAlert({
                type: 'error',
                message: error.message
            })
        })
    }

    return (
        <div className={'flex flex-col w-[85%] p-3 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/3'}>

            <Head>
                <title>New Board | Post It!</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <FormBuilderComponent title={"New Board"} fields={fields} onSubmit={handleSubmit} schema={schema} submitText={"Create Board"}/>
        </div>

    )


}