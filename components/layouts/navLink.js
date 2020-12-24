import Link from 'next/link';

const NavLink = (props) => {
    const { isActive, label, rout } = props;

    return (
        <li className={`nav-item${ isActive && ' active'}`}>
            <Link href={rout}>
                <a className="nav-link" onClick={(e)=>{e.target.blur()}}> 
                    { label }
                    { isActive && <span className="sr-only">(current)</span> }
                </a>
            </Link>
        </li>
    )
}

export default NavLink;