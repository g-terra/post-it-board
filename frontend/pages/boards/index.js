import {ListItem, ListViewer} from "../../components/listViewer/listViewer";
import {useEffect, useState} from "react";
import boardService from "../../services/boardService";
import {useSession} from "next-auth/react";
import Spinner from "../../components/utils/spinner/spinner";
import {useRouter} from "next/router";
import styles from "../../components/listViewer/listViewer.module.css";

export default function Home() {

    const router = useRouter();

    const [displayed, setDisplayed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);


    const handleChange = ({page, search, token}) => {

        const request = {
            page: page,
            pageSize: 15,
            search: search
        }

        if (token) {
            request.token = token;
        }

        boardService.getAllBoards(request).then((res) => {
            setLoading(false);
            setDisplayed(res.boards);
            setTotalPages(res.totalPages);
        }).catch((error) => {
            console.log(error);
        })

    }


    const handleItemAction = (id) => {
        return router.push('/boards/' + id)
    }


    const handleCreate = () => {
        return router.push("/boards/create");
    };


    return <div className={'h-full w-4/5'}>
        {
            loading ?
                <Spinner/> :
                <>
                    <div className={'flex justify-center items-center w-full pt-16'}>
                        <button className={'btn-primary w-1/3'} onClick={handleCreate}>create new board</button>
                    </div>
                    <ListViewer
                        items={displayed}
                        totalPages={totalPages}
                        onChange={handleChange}
                    >
                        {
                            displayed.map((item, index) =>
                                <ListItem key={index} {...item} content={item.postsCount + " posts"}
                                          action={() => handleItemAction(item.id)}></ListItem>
                            )
                        }

                    </ListViewer>

                </>
        }
    </div>
}