import Slide from '@material-ui/core/Slide';

export const SlideInGroup = ({ children, on, interval, direction = 'right' }) => {

  return children.map((el, index) => (
    <Slide mountOnEnter unmountOnExit
      direction={direction}
      in={on}
      style={{ transitionDelay: interval * index }}
      key={index}
    >
      <div> {el} </div>
    </Slide>
  ))
}
