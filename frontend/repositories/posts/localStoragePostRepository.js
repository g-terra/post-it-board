import {v4 as uuidv4} from 'uuid';
import boardService from "../../services/boardService";
import localStorageBoardRepository from "../groups/localStorageBoardRepository";

function validateWindow() {
    if (typeof window === "undefined") throw new Error("not on the browser");
}
const getAllPosts = async ({page, pageSize, board}) => {

    validateWindow()

    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    const boardExists = boards.find(b => b.id === board);


    if (!boardExists) {

        throw new Error( "Board not found. board:" + board);
    }

    const all = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];

    const filtered = all.filter(post => post.board === board);

    if (page && pageSize) {
        return {
            totalItems: filtered.length,
            totalPages: Math.ceil(all.length / pageSize),
            currentPage: page,
            pageSize: pageSize,
            posts: filtered.slice((page - 1) * pageSize, page * pageSize)
        };
    }

    return filtered;
}

const createPost = async (post) => {

    validateWindow();

    if (!localStorage.getItem('posts')) localStorage.setItem('posts', JSON.stringify([]));

    const posts = JSON.parse(localStorage.getItem('posts'));

    const newPost = {
        id: uuidv4(),
        content: post.content,
        color: post.color,
        createdAt: new Date().toLocaleString(),
        creator: 'Anonymous',
        board: post.board
    }

    return localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
}

const removePost = async (id) => {
    validateWindow();

    const posts = JSON.parse(localStorage.getItem('posts'));

    const index = posts.findIndex(post => post.id === id);
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
};



const removePostsByBoard = async (board) => {
    validateWindow();

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const filtered = posts.filter(post => post.board !== board);
    localStorage.setItem('posts', JSON.stringify(filtered));
}


const localStoragePostRepository = {
    getAllPosts,
    createPost,
    removePost,
    removePostsByBoard
}
export default localStoragePostRepository;