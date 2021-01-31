import { number, object, string } from 'yup'

export default object().shape({
  isSignup: number(),
  name: string().when('isSignup', {
    is: 1,
    then: string().required(),
    otherwise: string(),
  }),
  email: string().email().required(),
  password: string().required()
});
