import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'

import NavLink from 'components/layouts/navLink';
import styles from './nav.module.css';

const Nav = (props) => {
    const { currentRout } = props;
    
    const linksList = [
        {
            label: 'Home',
            rout: '/'
        },
        {
            label: 'Groups',
            rout: '/groups'
        },
        {
            label: 'About',
            rout: '/about'
        },
    ]

    return (
        <nav className={"navbar navbar-expand-lg navbar-dark py-1 px-0 " + styles.border_bottom}>
            <Link href='/'>
                <a className="navbar-brand">
                    <FontAwesomeIcon icon={faHome}/>
                    <span className='ml-2 font-weight-bold'>SHome</span>
                </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    {linksList.map((link, index)=>(
                        <NavLink 
                            label={link.label}
                            rout={link.rout}
                            isActive={currentRout === link.rout}
                            key={index}
                        />
                    ))}
                </ul>

            </div>
        </nav>
    )
}

export default Nav
