import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';

const About = () => {
    function debounce(func, wait) {
        let timeout;
      
        return function executedFunction() {
          const context = this;
          const args = arguments;
      
          const later = function() {
            timeout = null;
            func.apply(context, args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
    };
    

    return (
        <div>
            <KeyboardEventHandler handleKeys={['all']} onKeyEvent={debounce((...args)=>{console.log(args)}, 1000)} />
            {/* <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={handlerEsc} /> */}

            <div>
                {/* {divText} */}
            </div>
        </div>
    )
}

export default About;