import localStoragePostRepository from "../repositories/localStoragePostRepository";
import remotePostRepository from "../repositories/remotePostRepository";


const getAllPosts = async ({token, board='local', page, pageSize}) => {
    if (board === 'local') {
        return localStoragePostRepository.getAllPosts(page, pageSize);
    }

    return remotePostRepository.getAllPosts(token, board, page, pageSize);
}

const createPost = async ({token, board, post}) => {

    console.log(board)

    if (board === 'local') {
        return localStoragePostRepository.createPost(post);
    }

    return remotePostRepository.createPost(token, post);
}


const removePost = async ({token, id}) => {

    if (!token) {
        return localStoragePostRepository.removePost(id);
    }

    return remotePostRepository.removePost(token, id);
}

const postService = {
    getAllPosts,
    createPost,
    removePost
}

export default postService;