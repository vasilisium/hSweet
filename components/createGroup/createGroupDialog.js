import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';
import { schema } from './createGroupSchema'

import { setField_Action, resetForm_Action } from 'redux/formsData-Reducer';
// import { fetchGroupsList } from 'redux/groups-Reducer';
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

const actions = {
  create: 'CREATE',
  modify: 'MODIFY',
  delete: 'DELETE',
}

const defaultDialogProps = {
  header: 'Create new group',
  text: 'just some basics rules...',
  action: actions.create,
};

const createAction = async (values) => {
  let promise, result

    try {
      promise = postData(urlPart, values);
      result = await promise.then(r => r.json())

    } catch (error) {
      result = await promise.catch(err => err)
      console.log(error);
      console.log('-----------------------')
      console.log(result);

      return false
    }
    return true;
}

const CreateGroup = ({ 
  openOn,
  formData,
  onCancle,
  onClose,
  onOk,

  setFieldValue,
  resetForm,
  // fetchGroups,
  ...other
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: formData ? formData : {
      name: 'group6',
      description:'The group 6',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      okHandler(values)
    },
  });

  const debouncedInputHandler = debounce((e) => { setFieldValue(e.target.id, e.target.value) }, 1000)
  const inputChangeHandler = (e) => {
    debouncedInputHandler(e);
    formik.handleChange(e);
  }
  const okHandler = async (values) => {
    let cb = createAction;
    switch (other.action) {
      case actions.modify:
        cb = () => console.log('modify dialog action')
        break;
    }

    if (await cb(values)){
      onOk()
      resetForm()
    }
    else alert('ALARM!!!')
  }
  const cancleHandler = (e) => {
    resetForm(formType);
    formik.resetForm();
    if (onCancle) onCancle(e)
  }

  return (

    <Dialog
      open={openOn}
      disableBackdropClick
      onEscapeKeyDown={onClose}
      aria-labelledby="dialog-title"
      onClose={cancleHandler}
    >
      <DialogTitle id="dialog-title" onClose={cancleHandler}>
        {other.header ? other.header : defaultDialogProps.header}
      </DialogTitle>
      <DialogContent className={classes.form}>
        <Typography variant='caption'>
          {other.text ? other.text : defaultDialogProps.text}
        </Typography>
        
        <TextField
          id="name"
          name="name"
          autoFocus
          label="Group name"
          variant="outlined"
          onChange={inputChangeHandler}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onBlur={()=>{
            formik.setFieldTouched('name', true, true)
          }}
        />
        <TextField
          multiline
          id="description"
          name="description"
          label="Group description"
          variant="outlined"
          onChange={inputChangeHandler}
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
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
          color="primary"
          onClick={formik.handleSubmit}
          variant='contained'
          disabled={!formik.isValid}
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
  fetchGroups: () => dispatch(fetchGroupsList())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
