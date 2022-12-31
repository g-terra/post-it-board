import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Redirect({to}) {

    const router = useRouter();
    useEffect(() => {
        router.push(to).then(r => console.log(r));
    }, [to]);

    return null;

}