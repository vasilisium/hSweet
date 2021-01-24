import { useEffect } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';

import { schema } from './createGroupSchema'

import { setField_Action, resetForm_Action } from 'redux/formsData-Reducer';

import { postData } from 'functions/apiCallFunctions';
import { debounce } from 'functions/functions';

const formType = 'createGroup';
const urlPart = 'groups';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
}));

const CreateGroup = ({ openOn, formData, setFieldValue, resetForm, onCancle, onOk, onClose }) => {

  const classes = useStyles();

  const getInput = (id) => document.getElementById(id);
  const inputsData = () => ({
    name: getInput('name')?.value,
    description: getInput('description')?.value
  });


  const debouncedInputHandler = debounce((e) => { setFieldValue(e.target.id, e.target.value) }, 1000)
  const inputChangeHandler = (e) => {
    debouncedInputHandler(e)
    // handleChange(e);
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

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: () =>{
      alert(JSON.stringify(inputsData(), null, 4))
    }
  })

  return (

    <Dialog
      open={openOn}
      disableBackdropClick
      onEscapeKeyDown={onClose}
      aria-labelledby="dialog-title"
    // onEntered={fillForm}
    >
      <DialogTitle id="dialog-title">{'Create new group dialog'}</DialogTitle>
      <DialogContent className={classes.form}>
        
        <TextField
          id="name"
          name="name"
          autoFocus
          label="Group name"
          variant="outlined"
          onChange={inputChangeHandler}
          defaultValue={formData ? formData['name'] : ''}
          // value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="description"
          name="description"
          label="Group description"
          variant="outlined"
          onChange={inputChangeHandler}
          defaultValue={formData ? formData['description'] : ''}
        // helperText="Text on error" //on error
        // error //on error
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancleHandler}
          color="primary"
        >
          Cancel
          </Button>
        <Button
          // onClick={handleClose} 
          color="primary"
          disabled
          variant='contained'
        >
          Ok
          </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({ formData: state.formsData.forms[formType] })
const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (fieldName, value) => dispatch(setField_Action(formType, fieldName, value)),
  resetForm: () => dispatch(resetForm_Action(formType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
