import './LoginPage.css'

const LoginPage = (props) => {    

    const handleLogin = (e) => {
        e.preventDefault()
        props.history.push('/')
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