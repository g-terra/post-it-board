import axios from "axios";
import getApiUrl from "../utils/apiUrlProvider";


const getAllPosts = async ({token, page, pageSize, board , search=''}) => {
    try {
        const {data} = await axios.get(getApiUrl() + "posts", {
                params: {
                    page: page === 0 ? 0 : page - 1,
                    pageSize,
                    search: search,
                    boardId: board
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(data);

        return data

    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

const createPost = async ({token, post}) => {

    try {
        const {data} = await axios.post(getApiUrl() + "posts", post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return data

    } catch (error) {
        throw new Error(error.response.data.causes[0].message)
    }
}

const removePost = async ({token, id}) => {
    try {
        console.log("removing post: " + id)

        return await axios.delete(getApiUrl() + "posts?postId=" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data.message)
    }
};
const remotePostRepository = {
    getAllPosts,
    createPost,
    removePost
}
export default remotePostRepository;