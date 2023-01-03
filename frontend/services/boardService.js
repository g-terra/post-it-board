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
    await forceDelay();

    if (!token) {
        return await localStorageBoardRepository.createBoard(group);
    }

    return await remoteBoardRepository.createBoard(token, group);
}

async function removeBoard({token, id}) {
    await forceDelay();

    if (!token) {
        return await localStorageBoardRepository.removeBoard(id);
    }

    return await remoteBoardRepository.removeBoard(token, id);
}

const boardService = {
    getAllBoards,
    createBoard,
    removeBoard
}

export default boardService;