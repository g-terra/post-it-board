import localStoragePostRepository from "../repositories/posts/localStoragePostRepository";
import remotePostRepository from "../repositories/posts/remotePostRepository";
import forceDelay from "../utils/forceDelay";
import {error} from "next/dist/build/output/log";


const getAllPosts = async ({token, board, page, pageSize ,search}) => {

    if (!token) {
        return await localStoragePostRepository.getAllPosts({
            page, pageSize, board , search
        });
    }

    return await remotePostRepository.getAllPosts({token, page, pageSize, board , search});
}

const createPost = async ({token, post}) => {

    if (!token) {
        return await localStoragePostRepository.createPost(post);
    }

    return await remotePostRepository.createPost({token, post});
}


const removePost = async ({token, id}) => {

    if (!token) {
        return await localStoragePostRepository.removePost(id);
    }

    return await remotePostRepository.removePost({token, id});


}

const postService = {
    getAllPosts,
    createPost,
    removePost
}

export default postService;