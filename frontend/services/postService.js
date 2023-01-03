import localStoragePostRepository from "../repositories/posts/localStoragePostRepository";
import remotePostRepository from "../repositories/posts/remotePostRepository";
import forceDelay from "../utils/forceDelay";


const getAllPosts = async ({token, board, page, pageSize}) => {

    await forceDelay();

    if (!token) {
        return await localStoragePostRepository.getAllPosts({
            page, pageSize, board
        });
    }

    return await remotePostRepository.getAllPosts({token, page, pageSize, board});
}

const createPost = async ({token, post}) => {
    await forceDelay();


    if (!token) {
        return await localStoragePostRepository.createPost(post);
    }

    return await remotePostRepository.createPost(token, post);
}


const removePost = async ({token, id}) => {


    if (!token) {
        return await localStoragePostRepository.removePost(id);
    }

    return await remotePostRepository.removePost(token, id);
}

const postService = {
    getAllPosts,
    createPost,
    removePost
}

export default postService;