import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Page/LandingPage/LandingPage';
import SignIn from './Page/SignIn/SignIn';
import PopupDom from './Page/MakeGroup/PopupDom';
import Main from './Components/Popup/Popup';
import MakeGroupPopupContent from './Page/MakeGroup/MakeGroupPopup';


const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/SignIn" component={SignIn}></Route>
          <Route exact path="/SignIn" component={SignIn}></Route>
          <Route exact path="/Main" component={Main}></Route>
          
          <Route exact path="/MakeGroupPopupContent" component={MakeGroupPopupContent}></Route>

        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

