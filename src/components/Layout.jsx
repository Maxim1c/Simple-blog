import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from '../pages/Footer';

const Layout = () => {
    return (
        <>
            <header>
                <nav>
                    <NavLink exact to='/'>Home</NavLink>
                    <NavLink exact to='/posts'>Blog</NavLink>
                    <NavLink exact to='/about'>About</NavLink>
                    <NavLink exact to='/loginPage'>Login</NavLink>
                </nav>
            </header>

            <main className='container'>

                <Outlet />

            </main>

            <Footer year={new Date().getFullYear()} />
        </>
    )
}

export { Layout }