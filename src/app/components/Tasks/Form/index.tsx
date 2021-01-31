import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useBehavior from "./useBehavior";
import validationSchema from "./validationSchema";
import * as S from './styled';
import { memo } from "react";

type Props = {
  projectId: string
}

const Form = ({ projectId }: Props) => {
  const { actions } = useBehavior({ projectId })
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  })

  return (
    <S.Form onSubmit={handleSubmit(actions.handleSubmit)}>
      <S.InputForm type="text" name="description" ref={register} placeholder="New task..."/>
    </S.Form>
  )
}

export default memo(Form);
