import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setField_Action, resetForm_Action } from 'redux/formsData-Reducer';

import { postData } from 'functions/apiCallFunctions';
import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';
import { debounce } from 'functions/functions';
import { length as vLength } from 'components/validator/inspectors';
import useForm from 'hooks/useForm';

import styles from './createGroup.module.css'

const formType = 'createGroup';
const urlPart = 'groups'

const CreateGroup = ({ formData, setFieldValue, resetForm, onCancle, onOk }) => {

  const getInput = (id) => document.getElementById(id)
  const inputsData = () => ({
    name: getInput('name')?.value,
    description: getInput('description')?.value
  })
  const validators = {
    name: vLength(5,7), 
    description: vLength(undefined, 5)
  };

  useEffect(() => {
    getInput('name').focus();
    if (!formData) return;
    Object.keys(formData).forEach((key) => {
      const input = getInput(key);
      if (input) input.value = formData[key];
    })

  }, [])

  const { 
    handleSubmit, handleChange, handleBlur, 
    values, errors, touched, valid 
  } = useForm({
    initialValues: inputsData(), 
    validate: (data) => {
      let vRes = {}
      // const data = inputsData()
      Object.keys(data)
        .forEach(fieldName=> {
          if (validators[fieldName]) {
            const vr = validators[fieldName](data[fieldName]);
            if(vr) vRes[fieldName] = vr;
          }
        })

      console.log(vRes)
      return vRes;
    }
  });

  const debouncedInputHandler = debounce((e) => { setFieldValue(e.target.id, e.target.value) }, 1000)
  const inputChangeHandler = (e) =>{
    debouncedInputHandler(e)
    handleChange(e);
    // console.log(validators.lengthValidator(e))
  }
  const okHandler = async (e) => {
    let promise, result, noErrors = true;

    try {
      promise = postData(urlPart, inputsData());
      result = await promise.then(r => r.json())

    } catch (error) {
      result = await promise.catch(e => e)
      noErrors = false;
      console.log(error);
      console.log('-----------------------')
      console.log(result);
    }

    if (noErrors) {
      resetForm(formType);
      if (onOk) onOk(e);
    }
  }
  const cancleHandler = (e) => {
    resetForm(formType);
    if (onCancle) onCancle(e)
  }
  const keyboardHandler = (key, e) => {
    switch (key) {
      case 'esc':
        cancleHandler(e)
      break;

      case 'ctrl+return':
        if (okHandler) okHandler(e);
      break;
    }
  }

  return (
    <div className={styles.wrapper}>
      <KeyboardEventHandler
        handleKeys={['ctrl+return', 'esc']}
        onKeyEvent={keyboardHandler}
        isExclusive={true}
        handleFocusableElements={true}
      />

      <form className={styles.form}>
        <div className={styles.formBody}>
          <input className="form-control" type='text' placeholder='Name'
            id='name' 
            onChange={inputChangeHandler}
            onBlur={handleBlur}
          />
          <textarea className="form-control" placeholder='Description'
            id='description'
            onChange={inputChangeHandler}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.formFooter}>
          {/* <div /> */}
          <button className={`btn btn-success`} 
            disabled={!valid}
            onClick={(e) => (e.preventDefault(), okHandler(e))}
          >
            Ok
          </button>
          <button className={`btn btn-outline-secondary`}
            onClick={(e) => (e.preventDefault(), cancleHandler(e))}
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ formData: state.formsData.forms[formType] })
const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (fieldName, value) => dispatch(setField_Action(formType, fieldName, value)),
  resetForm: () => dispatch(resetForm_Action(formType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
