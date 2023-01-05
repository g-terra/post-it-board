import {PostIt2} from "../../components/post/postIt2";
import {useRouter} from "next/router";
import {Board} from "../../components/board/view/board";
import postService from "../../services/postService";
import React, {useEffect, useState} from "react";
import {func} from "prop-types";
import BoardDelete from "../../components/board/view/boardDelete";
import {useSession} from "next-auth/react";
import Spinner from "../../components/utils/spinner/spinner";
import boardService from "../../services/boardService";
import {useAlertProvider} from "../../components/utils/alerts/AlertProvider";


export default function Index() {

    const router = useRouter()

    const session = useSession();

    const {pid} = router.query

    const [posts, setPosts] = useState([]);

    const [postsPerPage, setPostsPerPage] = useState(10);

    const [totalPages, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const [refresh, setRefresh] = useState(false);

    const [screenWidth, setScreenWidth] = useState(2000);

    const [loading, setLoading] = useState(false);

    const alertProvider = useAlertProvider();


    const handleResize = () => {
        setScreenWidth(window.innerWidth)
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    // define how many posts per page based on the screen size
    const getPageSizes = () => {
        if (screenWidth < 400) return 5;
        if (screenWidth < 1280) return 12;
        return 10;
    }

    useEffect(() => {
        const newPageSize = getPageSizes();
        if (newPageSize !== postsPerPage) {
            setPostsPerPage(newPageSize);
        }
    }, [screenWidth]);

    useEffect(() => {


        setLoading(true);

        const request = {page: currentPage, pageSize: postsPerPage, board: pid}

        console.log("request: " + JSON.stringify(request));

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        postService.getAllPosts(request).then(rest => {

            setPosts(rest.posts);

            if (rest.totalPages === 0) {
                setTotalPages(1);
                setCurrentPage(1);
            }

            if (rest.totalPages !== totalPages) {
                setTotalPages(rest.totalPages);
                setCurrentPage(1);
            }


            setLoading(false);

        }).catch(error => {
            setLoading(false);
            alertProvider.pushAlert({type: 'error', message: error.message});
            console.log(error);
            return router.push('/boards');
        });
    }, [refresh]);


    const handleNextPage = () => {
        const newPage = currentPage + 1;
        console.log("new page:", newPage);
        setCurrentPage(newPage);
        setRefresh(!refresh);
    }

    const handlePreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        setRefresh(!refresh);
    }


    const disableNext = () => {
        return currentPage === totalPages || totalPages === 0;
    }


    const disablePrev = () => {
        return currentPage === 1;
    }


    const handleRemove = (id) => {

        const request = {id: id}

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        postService.removePost(request).then(() => {
            setRefresh(!refresh);
        });

    }

    const handleNewPost = () => {
        router.push(`/boards/${pid}/new-post`).then(() => window.scrollTo(0, 0));
    };

    const handleDeleteBoard = () => {

        const request = {id: pid}

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        boardService.removeBoard(request).then(() => {
            return router.push('/boards');
        });

    }


    function getTopControls() {
        return [
            <button className={'btn-primary'} onClick={handleNewPost}>New Post</button>,
            <BoardDelete onDelete={handleDeleteBoard}></BoardDelete>
        ];
    }

    function getBottomControls() {
        return [
            <button className={'btn-secondary'} onClick={handlePreviousPage}
                    disabled={disablePrev()}>Prev</button>,
            <p>
                {totalPages === 0 ? 0 : currentPage} / {totalPages}
            </p>,
            <button className={'btn-secondary'} onClick={handleNextPage}
                    disabled={disableNext()}>Next</button>
        ];
    }


    function Content() {
        return (
            <div>
                <Board frameColor={'bg-gray-600'} bg={'/pinboard-bg.jpg'}
                       topControls={getTopControls()}
                       bottomControls={getBottomControls()}
                >
                    {posts.map((post, index) => {
                        return <PostIt2
                            key={index}
                            height={'300px'}
                            width={'250px'}
                            randomAngle={{min: -2, max: 2}}
                            content={post.content}
                            paperColor={post.color}
                            onClose={() => handleRemove(post.id)}
                            footer={`${post.createdAt}   ${post.creator}`}
                        />
                    })}
                </Board>
            </div>
        )
    }


    return (
        loading ? <Spinner/> : <Content/>
    )
}

