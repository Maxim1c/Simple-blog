import './LoginPage.css'
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {    

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("../", { replace: true });
        props.setLoggedIn(true);
    }

    return (
        <h1>
            <form className="loginForm" onSubmit={handleLogin}>
                <h2>Авторизация</h2>
                <div>
                    <input className='loginFormInput' type="text" placeholder="Логин"
                        required
                    />
                </div>
                <div>
                    <input className='loginFormInput' type="password" placeholder="Пароль"
                        required
                    />
                </div>
                <div><button className="blackBtn" type="submit">Войти</button></div>
            </form>
        </h1>
    )
}

export { LoginPage }