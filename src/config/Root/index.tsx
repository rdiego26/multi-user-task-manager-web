import { Provider } from "../Context";
import Router from "../Router"
import "./index.css";

const Root = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  )
}

export default Root;