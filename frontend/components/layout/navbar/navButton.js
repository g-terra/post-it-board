import {useRouter} from "next/router";

export function NavButton({link, text , onClick}) {

    const {push} = useRouter()

    const handleClickToLink = () => {
        push(link).then(() => window.scrollTo(0, 0));
    }

    const handle = () => {
        onClick ? onClick() : handleClickToLink()
    };
    return <p className={'btn-primary'} onClick={()=> handle() }>{text}</p>;
}