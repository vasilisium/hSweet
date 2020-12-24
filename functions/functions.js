export const getRandomFloat = ({min, max, precision=2}) => {
    // console.log(`min: ${min} max: ${max}, precision: ${precision}`)
    let minV = !min ? 0 : min, maxV = !max ? 1 : max, precisionV = precision >= 0 ? precision : 2;
    // console.log(`minV: ${minV} maxV: ${maxV}, precision: ${precisionV}`)
    if (maxV<minV) {
        maxV = minV + 1;
        console.log(`Warning: min value is greater then maxvalue, so max gonna be set to ${min+1} (min + 1).`)
    };


    let res = Math.random() * (maxV - minV) + minV;

    if(precision<0) console.log("Warning: precision is set to negative, which is not correct value, so it's gonna be set to default 2.")
    if(precisionV === 0){
        return Math.round(res);
    }
    else return parseFloat(res.toFixed(precisionV));
}

export const getRandomInt = ({min, max}) => {
    let minV = min || 0, maxV = max || 0, precision = 0;
    if (maxV<minV) {
        [maxV, minV] = [minV, maxV];
        console.log(`Warning: min value is greater then max value, so they gonna be swaped.`)
    };

    return getRandomFloat({ min:minV, max:maxV, precision});
}

export const formatDateTime = (date) => {
    const dateObj = new Date(date);
    const pad = (x) => String(x).padStart(2, '0');

    // const day = String(dateObj.getDate()).padStart(2, '0');
    const day = pad(dateObj.getDate());
    const mon = pad(dateObj.getMonth());
    const year = String(dateObj.getFullYear());

    const min = pad(dateObj.getMinutes());
    const hou = pad(dateObj.getHours());
    const sec = pad(dateObj.getSeconds());

    return `${day}.${mon}.${year} ${min}:${hou}:${sec}`;
}
export const excludeKeyFromObject = (obj, key) => (
    Object.keys(obj)
        .filter( k => k!==key )
        .reduce( (o, fn) => (o[fn] = obj[fn], o), {} )
);

export function debounce(func, wait) {
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