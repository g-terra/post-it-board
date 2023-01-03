import {PostIt2} from "../../components/post/postIt2";
import {useRouter} from "next/router";
import {Board} from "../../components/board/view/board";
import postService from "../../services/postService";
import React, {useEffect} from "react";
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

    const [posts, setPosts] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(1);

    const [hasNextPage, setHasNextPage] = React.useState(false);

    const [hasPreviousPage, setHasPreviousPage] = React.useState(false);

    const [postsPerPage, setPostsPerPage] = React.useState(10);

    const [refresh, setRefresh] = React.useState(false);

    const [screenWidth, setScreenWidth] = React.useState(2000);

    const [loading, setLoading] = React.useState(false);

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

        if (session.status === 'authenticated') {
            request.token = session.data.jwt;
        }

        postService.getAllPosts(request).then(rest => {
            setPosts(rest.posts);
            setHasNextPage(rest.totalPages > currentPage)
            setHasPreviousPage(currentPage > 1)
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            alertProvider.pushAlert({type: 'error', message: error.message});
            console.log(error);
            return router.push('/boards');
        }) ;
    }, [currentPage, refresh, postsPerPage, session, router.isReady]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const disableNextPage = () => {
        return !hasNextPage;
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
                    disabled={!hasPreviousPage}>Prev</button>,
            <p>
                {currentPage} / {hasNextPage ? currentPage + 1 : currentPage}
            </p>,
            <button className={'btn-secondary'} onClick={handleNextPage}
                    disabled={!hasNextPage}>Next</button>
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

