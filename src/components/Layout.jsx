import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from '../pages/Footer';

const Layout = () => {
    return (
        <>
            <header>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/posts'>Blog</NavLink>
                    <NavLink to='/about'>About</NavLink>
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