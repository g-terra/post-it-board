export default function Home() {

    return (

        // three divs in the shape of cards in the same row (flex) in the middle of the page (justify-center) with a gap of 10px (gap-10) and a padding of 10px (p-10)
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center m-32">
            <div className="w-96 h-96 bg-sky-300 color-primary shadow-sm shadow-gray-600 flex flex-col justify-center items-center hover:scale-105 transition-all ease-out duration-75">
                <img src='/blackboard.png' alt='blackboard' className='w-48 h-48 '/>
                <h1 className="text-4xl font-bold text-primary">Create A Board</h1>
            </div>
            <div className="w-96 h-96 bg-red-400 color-primary shadow-sm shadow-gray-600 flex flex-col justify-center items-center hover:scale-105 transition-all ease-out duration-75">
                <img src='/note.png' alt='note' className='w-48 h-48 '/>
                <h1 className="text-4xl font-bold text-primary">Make A Post</h1>
            </div>
            <div className="w-96 h-96 bg-green-300 color-primary shadow-sm shadow-gray-600 flex flex-col justify-center items-center hover:scale-105 transition-all ease-out duration-75">
                <img src='/cloud.png' alt='cloud' className='w-48 h-48 '/>
                <h1 className="text-4xl font-bold text-primary">Have It Everywhere</h1>
            </div>
        </div>


    )
}