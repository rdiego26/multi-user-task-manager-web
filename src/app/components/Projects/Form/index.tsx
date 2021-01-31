import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useBehavior from "./useBehavior";
import validationSchema from "./validationSchema";
import * as S from './styled';


const Form = () => {
  const { state, actions } = useBehavior()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema)
  })

  return (
    <S.Form onSubmit={handleSubmit(actions.handleSubmit)}>
      <h3>New Project</h3>
      <S.InputForm type="text" name="name" ref={register} placeholder="Name"/>
      <p>{errors.name?.message}</p>

      <S.ButtonForm type="submit" disabled={state.loading}>{
        state.loading ? 'Loading...' : 'Create'
      }
      </S.ButtonForm>

      {!state.loading && (
        <S.ButtonForm type="reset">Clear</S.ButtonForm>
      )}
    </S.Form>
  )
}

export default Form;
