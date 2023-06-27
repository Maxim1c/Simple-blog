import { NavLink } from 'react-router-dom';

const Header = ({ isLoggedI, setLoggedIn }) => {

    const handleLogOut = () => {
        setLoggedIn(false);
    }

    return (

        <header>
            
            <nav>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink exact to='/posts'>Blog</NavLink>
                <NavLink onClick={handleLogOut} exact to='/loginPage'>Login</NavLink>
            </nav>
        </header>
    );
}

export { Header }