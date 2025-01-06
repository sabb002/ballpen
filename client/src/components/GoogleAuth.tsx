import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { setError, setUser } from "../store/AuthSlice";
import { jwtDecode } from "jwt-decode";
import { useGetAllUsersQuery, useSaveUserInfoMutation } from "../store/UsersApi";

type GoogleJwtPayload = {
    aud: string,
    azp: string,
    email: string;
    emain_verified: boolean,
    exp: number;
    family_name: string,
    given_name: string;
    iat: number,
    iss: string,
    jti: string,
    name: string;
    nbf: number,
    picture: string;
    sub: number,
}

function GoogleAuth() {
    const dispatch = useDispatch();
    const {data: Users, refetch} = useGetAllUsersQuery({});
    const [saveUserInfo] = useSaveUserInfoMutation();

    async function onSuccessHandler(res) {
        const decoded = jwtDecode<GoogleJwtPayload>(res.credential)

        const user = {
            full_name: decoded.name,    
            given_name: decoded.given_name,
            email: decoded.email,
            picture: decoded.picture,
            exp: decoded.exp,
            createdAt: new Date().toISOString(),
        }

        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user));
        console.log(Users, Users.some(u => u.email === user.email));
        
        if(!Users.some(u => u.email === user.email)){
            await saveUserInfo(user);
            console.log('Hi '+ user.given_name);
        }
        await refetch();
    }

    return (
        <GoogleLogin
            onSuccess={onSuccessHandler}
            onError={() => dispatch(setError({ error: "Error", msg: "Google login Failed!" }))}
            useOneTap
            cancel_on_tap_outside
        />
    )
}
export default GoogleAuth