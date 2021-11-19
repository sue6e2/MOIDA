import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Page/LandingPage/LandingPage';
import SignIn from './Page/SignIn/SignIn';
import SignUp from './Page/SignUp/SignUp';
import Main from './Page/Main/Main';
import MakeGroup from './Page/MakeGroup/MakeGroup';
import GroupPage from './Page/Group/Group';
import CongratulationPage from './Page/CongratulationPage/CongratulationPage';

import ChallengeSearch from './Page/ChallengeSearch/ChallengeSearch';
import CryptoJS from 'crypto-js';

const Root = () => {

  let needSignIn = false;

  if (sessionStorage.getItem('userData') == null) {
    needSignIn = true;
  }


  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/SignIn" component={needSignIn == true ? SignIn : Main}></Route>
          <Route exact path="/SignUp" component={SignUp}></Route>
          <Route exact path="/Congratulation" component={CongratulationPage}></Route>
          <Route exact path="/ChallengeSearch" component={ChallengeSearch}></Route>
          <Route exact path="/Main" component={needSignIn == true ? SignIn : Main}></Route>
          {/* <Route exact path="/MakeGroup" component={MakeGroup}></Route>
          <Route exact path="/Group" component={GroupPage}></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

