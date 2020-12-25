import { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';

const SideDrawer = ({ children, isOpen, closeHandler}) => {

  return (
    <Drawer anchor='right' open={isOpen} onClose={closeHandler}>
      {children}
    </Drawer>
  );
}

export default SideDrawer;

