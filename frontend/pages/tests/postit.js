import {PostIt2} from "../../components/post/postIt2";


function ListContainer({children, props}) {

    let base = 'grid justify-evenly justify-items-center align-middle items-center'
    let cols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    let width = 'w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]'

    const classes = `${base} ${cols} ${width} `

    return <div className={classes} {...props}>
        {children}
    </div>;
}

export default function Home() {

    const posts = []

    for (let i = 0; i < 15; i++) {
        posts.push(
            {
                id: i,
                content: "Post " + i,
                color: 'red',
                createdAT: '2021-01-01',
                creator: 'Guilherme Terra'
            }
        )
    }

    return (
        <>
            <ListContainer columns={''}>
                {posts.map((post, index) => {
                    return (
                        <div className={'my-4'}>
                            <PostIt2
                                key={index}
                                content={post.content}
                                footer={`${post.createdAT} - ${post.creator}`}
                                paperColor={post.color}
                                textColor={'white'}
                                width={'200px'}
                                height={'200px'}
                                randomAngle={true}
                                onClose={() => {
                                    alert('remove post ' + post.id)
                                }}
                            />
                        </div>
                    )
                })}
            </ListContainer>
        </>
    )
}