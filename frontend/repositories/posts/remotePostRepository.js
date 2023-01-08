import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL
const getAllPosts = async ({token, page, pageSize, board , search=''}) => {
    try {
        const {data} = await axios.get(baseUrl + "posts", {
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
        const {data} = await axios.post(baseUrl + "posts", post, {
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

        return await axios.delete(baseUrl + "posts?postId=" + id, {
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