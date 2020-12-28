import Menu from '@material-ui/core/Menu';

export const ContextMenu = ({ children, openOn, closeCallback, position }) => {
  return (
    <Menu
      keepMounted
      open={openOn}
      onClose={closeCallback}
      anchorReference="anchorPosition"
      anchorPosition={
        position.y !== null && position.x !== null
          ? { top: position.y, left: position.x }
          : undefined
      }
    >
      {children}
    </Menu>
  )
}