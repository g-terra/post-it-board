import {useRouter} from "next/router";
import * as Yup from "yup";
import {FormTemplate} from "../../../components/utils/generic-form/formTemplate";
import React from "react";
import postService from "../../../services/postService";

export default function newPost() {


    const formDef = {
        title: 'New Post',
        fields: [
            {
                name: 'content',
                label: 'Content',
                placeholder: 'add here the content of your post',
                initialValue: '',
                type: 'text-area',
                minHeight: '140px',
            },
            {
                name: 'color',
                label: 'Color',
                placeholder: '',
                initialValue: 'Red',
                type: 'select',
                options: [
                    {value: 'red', label: 'Red' },
                    {value: 'blue', label: 'Blue'},
                    {value: 'green', label: 'Green'},
                    {value: 'yellow', label: 'Yellow'}
                ]
            },
        ],
        submit: {
            text: 'Create',
            handleSubmit: (post) => {
                handleSubmit(post)
            }
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Description is required').max(250, 'content is too long'),
            color: Yup.string().required('Color is required'),
        }),

    }

    const router = useRouter();
    const {pid} = router.query
    const handleSubmit = (post) => {
        postService.createPost({board: pid, post}).then((response) => {
            router.push('/').then(() => window.location.reload())
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div className={'form-width m-5'}>
            <FormTemplate {...formDef}/>
        </div>
    )


}
