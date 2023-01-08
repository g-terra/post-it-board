function Card(props) {

    return <div className={"w-96 h-96 shadow-sm shadow-gray-600 flex p-3 flex-col justify-center items-center hover:scale-105 transition-all ease-out duration-75 " + props.color}>
        <img src={props.image} alt='note' className='w-48 h-48 '/>
        <h1 className="text-4xl font-bold text-white">{props.title}</h1>
        <p className="text-lg font-bold text-white pt-3 text-center">
            {props.description}
        </p>
    </div>;
}

export default function Home() {

    return (
        <div className="flex flex-col xl:flex-row gap-10 justify-center items-center xl:mt-24">
            <Card image='/blackboard.png' title='Create A Board' description=' unlimited boards!!' color={'bg-blue-400 dark:bg-Indigo-400'}/>
            <Card image='/note.png' title='Create A Note' description='Or many as you need' color={'bg-green-400 dark:bg-emerald-400'}/>
            <Card image='/cloud.png' title='Have It Everywhere' description='create an account and never lose your posts :)' color={'bg-yellow-400 dark:bg-fuchsia-500'}/>
        </div>

    )
}