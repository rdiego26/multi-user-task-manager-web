import { object, string } from 'yup';

export default object().shape({
  description: string().required()
})
