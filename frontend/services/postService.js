import localStoragePostRepository from "../repositories/localStoragePostRepository";

const postRepository = localStoragePostRepository

const getAllPosts = async (page,pageSize) => {
  return postRepository.getAllPosts(page,pageSize);
}

const createPost = async (post) => {
  return postRepository.createPost(post);
}

const removePost = async (id) => {
    console.log("removing post with id: " + id);
    return postRepository.removePost(id);
}

const postService = {
    getAllPosts,
    createPost,
    removePost
}

export default postService;