import {v4 as uuidv4} from 'uuid';
import localStoragePostRepository from "../posts/localStoragePostRepository";

async function getAllBoards(page, pageSize, search='') {
    if (typeof window === "undefined") throw new Error("not on the browser");
    const all = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];

    const filtered = all.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach(board => {
        localStoragePostRepository.getAllPosts({
            board: board.id
        }).then(posts => {
            board.postsCount = posts.length;
        });
    })

    if (page && pageSize) {
        return {
            totalItems: filtered.length,
            totalPages: Math.ceil(filtered.length / pageSize),
            currentPage: page,
            pageSize: pageSize,
            boards: filtered.slice((page - 1) * pageSize, page * pageSize)
        };
    }

    return filtered;
}


async function createBoard(board) {

    if (typeof window === "undefined") throw new Error("not on the browser");
    if (!localStorage.getItem('boards')) localStorage.setItem('boards', JSON.stringify([]));

    const groups = JSON.parse(localStorage.getItem('boards'));

    const newGroup = {
        id: uuidv4(),
        name: board.name,
    }

    console.log("creating boards:", newGroup);

    localStorage.setItem('boards', JSON.stringify([...groups, newGroup]));

    return newGroup;

}

async function removeBoard(id) {

    if (typeof window === "undefined") throw new Error("not on the browser");
    const groups = await getAllBoards();
    const index = groups.findIndex(group => group.id === id);

    await localStoragePostRepository.removePostsByBoard(id);

    groups.splice(index, 1);
    localStorage.setItem('boards', JSON.stringify(groups));

}


const localStorageBoardRepository = {
    getAllBoards,
    createBoard,
    removeBoard
}


export default localStorageBoardRepository