import { object, string } from 'yup';

export default object().shape({
  name: string().required()
})
