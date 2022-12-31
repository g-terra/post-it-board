
const getAllPosts = async (page, pageSize) => {
    throw new Error("get all posts not implemented at remotePostRepository");
}

const createPost = async (post) => {
    throw new Error("create post not implemented at remotePostRepository");
}

const removePost = async (id) => {
    throw new Error("remove post not implemented at remotePostRepository");
};
const remotePostRepository = {
    getAllPosts,
    createPost,
    removePost
}
export default remotePostRepository;