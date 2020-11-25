import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'


function Header() {
    return (
        <header id='main-header'>
            <div className='header-content'>
                <Link to='/'>Pagina Programador</Link>

                <Link to='/Login'>Entrar</Link>
            </div>
        </header>
    )
}

export default Header;