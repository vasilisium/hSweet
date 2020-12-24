export const length = (minLength=5, maxLength=undefined) => (value) =>{
    const minLengthErrorMessage = `Minimum length required is ${minLength}`;

    if (minLength && !value) return minLengthErrorMessage;
    if(value.length < minLength ) return minLengthErrorMessage;
    
    if(minLength && value.length > maxLength ) return `Maximum length required is ${maxLength}`;
    return;
}