import EDT from "./components/EDT/EDT";
import Affectation from "./components/Affectation/Affectation";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Admin from "./components/Profil/Admin/Admin";
//import AdminLand from "./components/Profil/AdminLand/AdminLand";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
  return (
    <div className="App">
       <Router> 
          <Switch>
            <Route exact path='/' exact component={Login} />
            <Route exact path='/prof:id' exact component={EDT} />
            <Route exact path='/etudiant:id' exact component={EDT} />
            <Route exact path='/signup' exact component={Signup} />
            <Route exact path='/admin:id' exact component={Admin} />
            <Route exact path='/admin:id/affectation:class' exact component={Affectation} />
            <Route exact path='/admin:id/niveaux' exact component={Admin} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
