import { memo } from 'react';
import * as S from './styled';

type Props = {
  readonly name?: string
}

const Header = ({ name = '' }: Props) => {
  return (
    <S.Header>
      {name}
      <S.HeaderLinkAction>
        Logout
      </S.HeaderLinkAction>
    </S.Header>
  )
}

export default memo(Header)
