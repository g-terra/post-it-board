import ItemController from "../../components/items-viewer/controller/itemController.component";
import BoardsGrid from "../../components/boards-list/boards-list-grid/boardsGrid.component";
import boardService from "../../services/boardService";
import {useSession} from "next-auth/react";
import BoardsListItem from "../../components/boards-list/boards-list-item/boardsListItem.component";
import {useRouter} from "next/router";
import {useAlertProvider} from "../../components/alerts/alertProvider";
import Head from "next/head";
import React from "react";

export default function Boards() {

    const session = useSession();
    const router = useRouter();
    const alertProvider = useAlertProvider();

    const fetchItems = async (query, page, pageSize) => {

        try {
            const params = {
                search: query,
                page: page,
                pageSize: pageSize
            }

            if (session.status === "authenticated") {
                params.token = session.data.jwt;
            }

            const results = await boardService.getAllBoards(params)


            return {
                items: results.boards,
                totalPages: results.totalPages
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
        return router.push('/boards/create')
    }

    return (<div>

        <Head>
            <title>Boards | Post It!</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <ItemController
            createText={"Create Board"}
            fetchItems={fetchItems}
            createItem={createItem}
            ListWrapper={BoardsGrid}
            itemComponent={BoardsListItem}
        />
    </div>)
}