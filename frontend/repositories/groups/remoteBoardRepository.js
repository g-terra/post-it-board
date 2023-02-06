import axios from "axios";
import getApiUrl from "../utils/apiUrlProvider";


async function getAllBoards(token, page, pageSize, search) {
    try {

        console.log("base url for boards: " + getApiUrl());

        const params = {
            page: page === 0 ? 0 : page - 1,
            pageSize,
            search
        }

        const {data} = await axios.get(getApiUrl() + 'boards', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return data;
    } catch (e) {
        throw e;
    }
}


async function createBoard(token, group) {

    console.log("creating group", group);
    console.log("token", token);

    try {
        const {data} = await axios.post(getApiUrl() + 'boards', group, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    } catch (e) {
        throw e;
    }

}

async function removeBoard(token, id) {
    try {
        console.log("removing board: " + id)

        return await axios.delete(getApiUrl() + "boards?boardId=" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data.message)
    }
}


async function getBoard(token, id) {
    try {
        const {data} = await axios.get(getApiUrl() + 'boards/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    } catch (e) {
        throw e;
    }
}


const remoteBoardRepository = {
    getAllBoards,
    createBoard,
    removeBoard,
    getBoard
}

export default remoteBoardRepository;