import { useState } from 'react';

const useForm = ({ initialValues = {}, validate }) => {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { type, id } = e.target;
    
        const getValue = () => {
            if (type === 'checkbox') {
                return e.target.checked;
            }
            else if (type === 'select-multiple') {
                return Array.from(e.target.selectedOptions)
                    .map(o => o.value);
            }
            return e.target.value;
        }
    
        const value = getValue();
        setValues(prevValues => ({ ...prevValues, [id]: value }));
        if (validate) setErrors(()=>{
            const valRes = validate({...values, [id]: value});
            let err = {};
            Object.keys(valRes).forEach(f=>{if(touched[f]) err[f]=valRes[f]})
            return err;
        })

        setTouched({...touched, [id]: true})
    };

    const handleBlur = (e) => {
        const { id } = e.target;
        setTouched(prevTouched => ({...prevTouched, [id]: true}));
    };

    const handleSubmit = (onSubmit) => {
        return (e) => {
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            if(valid) onSubmit(values, e);
        }
    };

    const isValid = () => {
        if(Object.keys(touched).length === 0) return false;
        const keys = Object.keys(errors);
        if(keys) return keys.length === 0;
        return true;
    };

    return { values, setValues, handleChange, handleSubmit, handleBlur, errors, valid:isValid(), touched}
};

export default useForm;