import DashBoard from "./DashBoard";
import Navi from "../navi/Navi";
import {Container} from 'reactstrap'
import {Switch, Route} from 'react-router-dom'
import CartList from '../carts/CartList'
import NotFound from '../commons/NotFound'
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";


function App() {
  return (
    <Container>
      <Navi/>
      <Switch>
        <Route exact path = '/' component = {DashBoard}/>
        <Route path = '/cart' component = {CartList}/>
        <Route path = '/saveProduct/:productId' component = {AddOrUpdateProduct}/>
        <Route path = '/saveProduct' component = {AddOrUpdateProduct}/>
        <Route component = {NotFound}/>
      </Switch>
    </Container>
  );
}

export default App;
