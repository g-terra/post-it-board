import { v4 as uuidv4 } from 'uuid';


const getAllPosts = async (page, pageSize) => {
    if (typeof window === "undefined") throw new Error("not on the browser");
    const all = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];

    if (page && pageSize) {
        return {
            totalItems: all.length,
            totalPages: Math.ceil(all.length / pageSize),
            currentPage: page,
            pageSize: pageSize,
            items: all.slice((page - 1) * pageSize, page * pageSize)
        };
    }

    return all;
}

const createPost = async (post) => {

    if (typeof window === "undefined") throw new Error("not on the browser");
    if (!localStorage.getItem('posts')) localStorage.setItem('posts', JSON.stringify([]));

    const posts = JSON.parse(localStorage.getItem('posts'));

    const newPost = {
        id: uuidv4(),
        content: post.content,
        color: post.color,
        createdAt: new Date().toLocaleString(),
        creator: 'Anonymous'
    }

    return localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
}

const removePost = async (id) => {
    if (typeof window === "undefined") throw new Error("not on the browser");
    const posts = await getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
};
const localStoragePostRepository = {
    getAllPosts,
    createPost,
    removePost
}
export default localStoragePostRepository;