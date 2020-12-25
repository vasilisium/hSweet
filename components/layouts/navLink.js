import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

const NavLink = (props) => {
  const { isActive, label, rout, onClick } = props;

  return (
    <Link href={rout}>
      <Button className={`${isActive && ' active'}`} color="inherit" 
      // onClick={onClick}
      >
        {/* <a className="nav-link" onClick={(e)=>{e.target.blur()}}>  */}
        {label}
        {isActive && <Typography variant="srOnly">(current)</Typography>}
        {/* </a> */}
      </Button>
    </Link>
  )
}

export default NavLink;