import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from "formik";
import postService from "../../services/postService";
import {useRouter} from "next/router";


export default function NewPostForm() {


    const {push} = useRouter();

    const validationSchema = Yup.object({
        content: Yup.string().required('Description is required').max(250, 'content is too long'),
        color: Yup.string().required('Color is required'),
    })


    const handleSubmit = (values) => {
        console.log(values)
        postService.createPost(values).then((response) => {
            push('/').then(() => window.location.reload())
        }).catch((error) => {
            console.log(error);
        })

    };

    const Alert = ({children}) => {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 m-2 rounded relative" role="alert">
                <span className="block sm:inline">{children}</span>
            </div>
        )
    };

    return (
        <div className={''}>
            <Formik initialValues={
                {
                    title: '',
                    content: '',
                    color: 'yellow',
                }
            } onSubmit={
                (values,) => {
                    handleSubmit(values)
                }
            } validationSchema={validationSchema}>

                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

                    <div className="mb-4">
                        <ErrorMessage name="content" component={Alert}/>
                        <ErrorMessage name="color" component={Alert}/>
                        <ErrorMessage name="submit" component={Alert}/>
                    </div>


                    <div className="flex justify-center pb-4">
                        <h3 className={"text-2xl font-semibold"}>Create a new post</h3>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <Field component="textarea"
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[200px]"
                               name="content" type="text" placeholder="Content"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                            Color
                        </label>
                        <Field component="select"
                               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               name="color" placeholder="Color">
                            <option value={'red'}>Red</option>
                            <option value={'green'}>Green</option>
                            <option value={'blue'}>Blue</option>
                            <option value={'yellow'}>Yellow</option>
                        </Field>
                    </div>

                    <div className="flex items-center justify-end">
                        <Field name="submit" type="submit" value="Post it!"
                               className="btn-primary"/>
                    </div>
                </Form>

            </Formik>
        </div>
    );

}