import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Name of group minimal length is 5')
    .required('Required'),
  description: Yup.string(),
});