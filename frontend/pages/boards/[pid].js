import ItemController from "../../components2/items-viewer/controller/itemController.component";
import boardService from "../../services/boardService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useAlertProvider} from "../../components2/alerts/AlertProvider";
import PostsListGrid from "../../components2/posts-list/posts-list-grid/postsListGrid.component";
import PostsListItem from "../../components2/posts-list/posts-list-item/postsListItem.component";
import postService from "../../services/postService";

import DeleteBoardButton from "../../components2/delete-board/deleteBoardButton.component";

export default function Board() {

    const session = useSession();
    const router = useRouter();
    const alertProvider = useAlertProvider();

    const {pid} = router.query

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
            console.log(error);
            alertProvider.pushAlert({
                severity: 'error',
                message: 'Error fetching boards'
            })
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
            additionalControls={
                <DeleteBoardButton boardId={pid}/>
            }
        />
    </div>)
}