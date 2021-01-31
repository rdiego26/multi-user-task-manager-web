/* eslint-disable */

import { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MODES } from "./types";
import useBehavior from "./useBehavior"
import validationSchema from "./validationSchema";
import * as S from './styled';

const Login = () => {
  const { state, actions } = useBehavior();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <S.Form onSubmit={handleSubmit(actions.handleSubmit)}>
      <input type="hidden" name="isSignup" ref={register} value={Number(state.mode === MODES.signup)} />

      {state.mode === MODES.signup &&
      <>
        <S.InputForm type="text" placeholder="Name" name="name" ref={register} />
        <p>{errors.name?.message}</p>
      </>
      }
      <S.InputForm type="email" placeholder="Email" name="email" ref={register} />
      <p>{errors.email?.message}</p>

      <S.InputForm type="password" placeholder="****" name="password" ref={register} />
      <p>{errors.password?.message}</p>

      <S.ButtonForm type="submit">
        Send
      </S.ButtonForm>

      <S.ButtonForm type="button" onClick={actions.changeMode}>
        {state.mode === MODES.login ? 'Signup' : 'Back to login'}
      </S.ButtonForm>
    </S.Form>
  )
}

export default memo(Login);
