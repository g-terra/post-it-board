import {useRouter} from "next/router";
import * as Yup from "yup";
import {FormTemplate} from "../../../components/utils/generic-form/formTemplate";
import React from "react";
import postService from "../../../services/postService";
import {useSession} from "next-auth/react";
import {useAlertProvider} from "../../../components/utils/alerts/AlertProvider";
import {error} from "next/dist/build/output/log";

export default function newPost() {

    const router = useRouter()

    const session = useSession();


    const {pid} = router.query


    const formDef = {
        title: 'New Post',
        fields: [
            {
                name: 'content',
                label: 'Content',
                placeholder: 'add here the content of your posts',
                initialValue: '',
                type: 'text-area',
                minHeight: '140px',
            },
            {
                name: 'color',
                label: 'Color',
                placeholder: '',
                initialValue: 'red',
                type: 'select',
                options: [
                    {value: 'red', label: 'Red'},
                    {value: 'blue', label: 'Blue'},
                    {value: 'green', label: 'Green'},
                    {value: 'yellow', label: 'Yellow'}
                ]
            },
        ],
        submit: {
            text: 'Create',
            handleSubmit: async (post) => {
                await handleSubmit(post)
            }
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Post cannot be empty').max(250, 'content is too long'),
            color: Yup.string().required('Color is required'),
        }),

    }

    const handleSubmit = async (post) => {

        const request = {post}

        request.post.board = pid

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        await postService.createPost(request)

        return router.push("/boards/" + pid)
    }

    return (
        <div className={'form-width m-5'}>
            <FormTemplate {...formDef}/>
        </div>
    )


}
