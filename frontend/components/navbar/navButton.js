import {useRouter} from "next/router";

export function NavButton({link, text}) {

    const {push} = useRouter()

    const handleClick = () => {
        push(link).then(() => window.scrollTo(0, 0));
    }

    return <p className={'btn-primary'} onClick={handleClick}>{text}</p>;
}