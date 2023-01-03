import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getAllBoards(token, page, pageSize, search) {
    try {

        const params = {
            page: page === 0 ? 0 : page - 1,
            pageSize,
            search
        }

        const {data} = await axios.get(baseUrl + 'boards', {
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
        const {data} = await axios.post(baseUrl + 'boards', group, {
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
    throw new Error("remove groups not implemented at remoteGroupRepository");
}


const remoteBoardRepository = {
    getAllBoards,
    createBoard,
    removeBoard
}

export default remoteBoardRepository;