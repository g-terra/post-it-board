import * as Yup from "yup";
import {useRouter} from "next/router";
import {FormTemplate} from "../../components/utils/generic-form/formTemplate";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import boardService from "../../services/boardService";
import Spinner from "../../components/utils/spinner/spinner";

export default function CreateBoard() {

    const session = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const formDef = {
        title: 'New Board',
        fields: [
            {
                name: 'name',
                label: 'Name',
                placeholder: 'Best Board Ever',
                initialValue: '',
                type: 'text',
                minHeight: '140px',
            },
        ],
        submit: {
            text: 'Create',
            handleSubmit: (post) => {
                handleSubmit(post)
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required')
        }),

    }


    const handleSubmit = (group) => {

        setLoading(true);

        const request = {
            group
        }

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        boardService.createBoard(request).then((res) => {
            setLoading(false);
            return router.push('/boards/'+ res.id )
        }).catch((error) => {
            console.log(error);
        })

    };

    function Content() {
        return (
            <div className={'form-width'}>
                <FormTemplate {...formDef}/>
            </div>
        )
    }


    return (


        <div className={'m-3 w-full flex flex-col justify-center items-center'}>
            {
                loading ? <Spinner/> : <Content/>
            }
        </div>

    )
}