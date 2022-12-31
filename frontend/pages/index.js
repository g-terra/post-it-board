import Redirect from "../components/utils/redirect/redirect";
import AuthOnly from "../components/layout/authOnly";

export default function Home() {

    return (
        <AuthOnly redirect={'/boards/local'}>
            <Redirect to={'/boards'}/>
        </AuthOnly>
    )
}