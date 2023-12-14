import {useToken} from "../useToken";
import {useEffect, useState} from "react";
import {useQueryParams} from "../useQueryParams";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [, setToken] = useToken();

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const history = useNavigate();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            history('/');
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/api/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
            }
        }

        loadOauthUrl();
    }, []);
    return (
        <div>
            <h1>Log In!</h1><br/><br/>
            <button className="login-with-google-btn"
                disabled={!googleOauthUrl}
                onClick={() => { window.location.href = googleOauthUrl }}
            >Sign in with Google</button>
        </div>
    );
}
export default LoginPage;