import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports";

import './App.css';
import AppBar from './components/AppBar';
import SignIn from './pages/auth/SignInForm';
import SignUp from './pages/auth/SignUpForm';
import AdminMain from './pages/admin/Main';
import City from './pages/admin/City';
import Doctor from './pages/admin/Doctor';
import Medical from './pages/admin/Medical';
import Calender from './pages/admin/Calender';
import PatientMain from './pages/patient/Main';
import SearchVisit from './pages/patient/SearchVisit';
import RegisterVisit from './pages/patient/RegisterVisit';
import Visit from './pages/patient/Visit';


Amplify.configure(awsExports);

function App() {

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const [usrEmail, setUsrEmail] = useState('');
  const [authState, setAuthState] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let onLoad = async authState => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      // console.log(Auth.currentSession());
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  useEffect(() => {
    console.log('mounting App...');
    onLoad();
    // window.LOG_LEVEL = 'DEBUG'

    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      setAuthState('signedIn');
      setUsrEmail(Auth.userPool.getCurrentUser().username);
    }).catch(e => {
      console.log(e);
      setAuthState('signIn');
    });

  }, [onLoad]);

  return (
    <div>
      <AppBar isAuthenticated={isAuthenticated} authState={authState}></AppBar>
      <Switch>
        <Route path="/" exact={true} component={SignIn} />
        <Route path="/signup" component={SignUp} />
        {/* admin */}
        <Route path="/admin" component={AdminMain} />
        <Route path="/admin_city" component={City} />
        <Route path="/admin_doctor" component={Doctor} />
        <Route path="/admin_medical" component={Medical} />
        <Route path="/admin_calender" component={Calender} />
        {/* patient */}
        <Route path="/patient" component={PatientMain} />
        <Route path="/patient_searchVisit" component={SearchVisit} />
        <Route path="/patient_registerVisit" component={RegisterVisit} />
        <Route path="/patient_visit" component={Visit} />
        <Route
            render={({ location }) => (
              <div>
                <h2>404 Not found</h2>
                <p>{location.pathname}</p>
              </div>
            )}
          />
      </Switch>
    </div>
  );
}

export default App;
