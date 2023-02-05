import ItemController from "../../components/items-viewer/controller/itemController.component";
import boardService from "../../services/boardService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useAlertProvider} from "../../components/alerts/alertProvider";
import PostsListGrid from "../../components/posts-list/posts-list-grid/postsListGrid.component";
import PostsListItem from "../../components/posts-list/posts-list-item/postsListItem.component";
import postService from "../../services/postService";

import DeleteBoardButton from "../../components/delete-board-button/deleteBoardButton.component";
import {useEffect, useMemo, useState} from "react";

export default function Board() {

    const session = useSession();
    const router = useRouter();
    const alertProvider = useAlertProvider();

    const {pid} = router.query


    const [title, setTitle] = useState("title");

    useEffect(() => {

        const params = {
            id: pid,
        }

        if (session.status === "authenticated") {
            params.token = session.data.jwt;
        }

        if (pid) {
            boardService.getBoard(params).then((res) => {
                console.log("board",JSON.stringify(res));
                setTitle(res.name);
            }).catch((error) => {
                alertProvider.pushAlert({
                    type: 'error',
                    message: error.message
                })
            })
        }
    }, [pid, session.status])


    const fetchItems = async (query, page, pageSize) => {

        try {
            const params = {
                board: pid,
                search: query,
                page: page,
                pageSize: pageSize
            }

            if (session.status === "authenticated") {
                params.token = session.data.jwt;
            }

            const results = await postService.getAllPosts(params)

            return {
                items: results.posts || [],
                totalPages: results.totalPages || 1
            }

        } catch (error) {
            alertProvider.pushAlert({
                severity: 'error',
                message: error.message
            })
            return router.push('/boards')
        }
    };

    const createItem = () => {
        return router.push('/boards/' + pid + '/new-post')
    }


    return (<div className={'w-3/4'}>

        <ItemController
            createText={"Create Post"}
            fetchItems={fetchItems}
            createItem={createItem}
            ListWrapper={PostsListGrid}
            itemComponent={PostsListItem}
            title={title}
            additionalControls={
                <DeleteBoardButton boardId={pid}/>
            }
        />
    </div>)

}

