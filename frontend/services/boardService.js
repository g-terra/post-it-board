import localStorageBoardRepository from "../repositories/groups/localStorageBoardRepository";
import remoteBoardRepository from "../repositories/groups/remoteBoardRepository";
import forceDelay from "../utils/forceDelay";


async function getAllBoards({token, page, pageSize , search =''}) {

    await forceDelay();

    if (!token) {
        return await localStorageBoardRepository.getAllBoards(page, pageSize , search);
    }

    return await remoteBoardRepository.getAllBoards(token, page, pageSize , search);
}

async function createBoard({token, group}) {

    if (!token) {
        return await localStorageBoardRepository.createBoard(group);
    }

    return await remoteBoardRepository.createBoard(token, group);
}

async function removeBoard({token, id}) {

    if (!token) {
        return await localStorageBoardRepository.removeBoard(id);
    }

    return await remoteBoardRepository.removeBoard(token, id);
}

async function getBoard({token, id}) {


    if (!token) {
        return await localStorageBoardRepository.getBoard(id);
    }

    return await remoteBoardRepository.getBoard(token, id);
}

const boardService = {
    getAllBoards,
    createBoard,
    removeBoard,
    getBoard
}

export default boardService;