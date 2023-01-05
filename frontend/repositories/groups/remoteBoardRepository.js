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
    try {
        console.log("removing board: " + id)

        return await axios.delete(baseUrl + "boards?boardId=" + id, {
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


const remoteBoardRepository = {
    getAllBoards,
    createBoard,
    removeBoard
}

export default remoteBoardRepository;