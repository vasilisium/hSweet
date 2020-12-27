import Button from '@material-ui/core/Button';

import { useBinaryState } from 'hooks/useBinaryState';
import SideDrawer from 'components/sideDrawer/sideDrawer';

import { SideLinksList } from 'components/layouts/LinksList'

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

const About = (props) => {
  const { currentRout } = props;

  const { isShowing, toggle, show, hide } = useBinaryState()

  return (
    <>
      <Button onClick={show}>Open</Button>
      <SideDrawer isOpen={isShowing} closeHandler={hide}>
        <SideLinksList linksList={linksList} currentRout={currentRout}/>
      </SideDrawer>
    </>
  );

}

export default About;