import Button from '@material-ui/core/Button';

import { useBinaryState } from 'hooks/useBinaryState';
import SideDrawer from 'components/sideDrawer/sideDrawer';

const About = () => {

  const { isShowing, toggle, show, hide } = useBinaryState()

  return (
    <>
      <Button>Open</Button>
      <SideDrawer isOpen={isShowing} closeHandler={hide}>
        <div>
          drawer content
        </div>
      </SideDrawer>
    </>
  );

}

export default About;