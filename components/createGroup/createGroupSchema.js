import * as Yup from 'yup';

const 
  nameMinLen = 5, 
  nameMaxLen = 25;

export const schema = Yup.object().shape({
  name: Yup.string()
    .min(nameMinLen, `The minimal name length of group is ${nameMinLen}`)
    .max(nameMaxLen, `The maximal name length of group is ${nameMaxLen}`)
    .required('The name is required'),
  description: Yup.string(),
});