import { Link } from "react-router-dom"

const Notfoundpage = () => {
    return (
        <div className="homepage">
            Вы вернулись на главную страницу <Link to="/">Home</Link>
        </div>
    )
}

export {Notfoundpage}