import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Registration from "../containers/Registration/registration";
import Login from "../containers/Login/login";
import Photos from "../containers/Photos/photos";
import Layout from '../components/UI/Layout/layout';
import './App.css';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ?
    <Route {...props} /> :
    <Redirect to={redirectTo} />
};

function App(props) {

  const user = useSelector(state => state.users.user);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={props => <Photos {...props} />} />
          {/* 
          <Route path="/users/:id" exact component={props => <UserPhotos {...props} />} />
          <ProtectedRoute
           isAllowed={user !== null}
           redirectTo={"/login"}
           path="/add_photo" 
           exact component={AddPhotoForm} /> */}

          <ProtectedRoute
            isAllowed={!user}
            redirectTo={"/"}
            path="/register"
            exact component={Registration} />
          <ProtectedRoute
            isAllowed={!user}
            redirectTo={"/"}
            path="/login"
            exact component={Login} />
          <Route render={() => {
            return <h1>Page not found</h1>;
          }} />
        </Switch>

      </Layout >
    </div >
  );
}

export default App;



