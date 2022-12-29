import {PostIt2} from "../components/post/postIt2";
import {useRouter} from "next/router";
import {Board} from "../components/board/board";
import postService from "../services/postService";
import React, {useEffect} from "react";


export default function Home() {

    const {push} = useRouter()

    const [posts, setPosts] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(1);

    const [hasNextPage, setHasNextPage] = React.useState(false);

    const [hasPreviousPage, setHasPreviousPage] = React.useState(false);

    const [postsPerPage, setPostsPerPage] = React.useState(10);

    const [refresh, setRefresh] = React.useState(false);

    const [dimensions, setDimensions] = React.useState({
        width: 0,
    });
    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
        });
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    // define how many posts per page based on the screen size
    const getPageSizes = () => {
        if (dimensions.width < 400) return 5;
        if (dimensions.width < 1280) return 12;
        return 10;
    }


    useEffect(() => {
        const newPageSize = getPageSizes();
        if (newPageSize !== postsPerPage) {
            setPostsPerPage(newPageSize);
        }
    }, [dimensions]);


    useEffect(() => {
        postService.getAllPosts(currentPage, postsPerPage).then(posts => {
            setPosts(posts.items);
            setHasNextPage(posts.totalPages > currentPage)
            setHasPreviousPage(currentPage > 1)
        });
    }, [currentPage, refresh, postsPerPage]);


    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleRemove = (id) => {
        postService.removePost(id).then(() => {
            setRefresh(!refresh);
        });
    }

    const handleNewPost = () => {
        push('/new').then(() => window.scrollTo(0, 0));
    };


    return (<>
        <Board frameColor={'bg-gray-600'} bg={'/pinboard-bg.jpg'}
               topControls={[
                   <button className={'btn-primary'} onClick={handleNewPost}>New Post</button>,
               ]}
               bottomControls={[
                   <button className={'btn-primary'} onClick={handlePreviousPage}
                           disabled={!hasPreviousPage}>Prev</button>,
                   <p>
                       {currentPage} / {hasNextPage ? currentPage + 1 : currentPage}
                   </p>,
                   <button className={'btn-primary'} onClick={handleNextPage}
                           disabled={!hasNextPage}>Next</button>
               ]}
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
    </>)
}

