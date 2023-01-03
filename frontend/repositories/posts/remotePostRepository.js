import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL
const getAllPosts = async ({token, page, pageSize, board}) => {
    try {
        const {data} = await axios.get(baseUrl + "posts", {
                params: {
                    page,
                    pageSize,
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

const createPost = async (post) => {
    throw new Error("create posts not implemented at remotePostRepository");
}

const removePost = async (id) => {
    throw new Error("remove posts not implemented at remotePostRepository");
};
const remotePostRepository = {
    getAllPosts,
    createPost,
    removePost
}
export default remotePostRepository;