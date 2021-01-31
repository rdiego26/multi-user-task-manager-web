import { memo, MemoExoticComponent } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { getToken } from '../../core/services/auth'

type Props = RouteProps & {
  component: MemoExoticComponent<any>
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => (
  <Route {...rest} render={props =>
    getToken()
      ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
  />
)

export default memo(PrivateRoute);