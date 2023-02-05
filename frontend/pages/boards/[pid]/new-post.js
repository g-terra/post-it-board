import {useRouter} from "next/router";
import * as Yup from "yup";
import React from "react";
import postService from "../../../services/postService";
import {useSession} from "next-auth/react";
import {useAlertProvider} from "../../../components/alerts/alertProvider";
import FormBuilderComponent, {FieldTypes} from "../../../components/form-builder/FormBuilder.component";
import Head from "next/head";

export default function NewPost() {


    const session = useSession();
    const router = useRouter();
    const alertProvider = useAlertProvider();
    const {pid} = router.query

    const fields = [
        {
            type: FieldTypes.textArea,
            name: "content",
            label: "Content",
            minLines:8,
        },
        {
            name: 'color',
            label: 'Color',
            type: FieldTypes.select,
            options: [
                'red',
                'blue',
                'green',
                'yellow',
            ]
        }
    ];


    const schema = Yup.object({
        content: Yup.string().required('Post cannot be empty').max(250, 'content is too long'),
        color: Yup.string().required('Color is required'),
    });


    const handleSubmit = (values) => {

        const request = {post: values}

        request.post.board = pid

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        postService.createPost(request).then((res) => {
                return router.push('/boards/' + pid)
            }
        ).catch((error) => {
            alertProvider.pushAlert({
                severity: 'error',
                message: error.message
            })
        })

    }

    return (



        <div className={'flex flex-col w-[85%] p-3 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/3'}>

            <Head>
                <title>New Post| Post It!</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <FormBuilderComponent title={"New Post"} fields={fields} onSubmit={handleSubmit} schema={schema}
                                  submitText={"Create"}/>
        </div>

    )




}
