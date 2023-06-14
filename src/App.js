import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { useEffect,useContext } from 'react';


import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Create from './Components/Create/Create';
import View from './Components/View/View';
import Post from './store/PostContext';
import Search from './assets/Search';
import SearchCont from './store/SearchContext';




function App() {
  const {setUser}= useContext(AuthContext)
  const {firebase}= useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
        <SearchCont>
      <Router>
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path= "/signup">
          <Signup   />
        </Route>
        <Route path= "/login">
          <Login   />
        </Route>
        <Route path= "/create">
          <Create   />
        </Route>
        <Route path= "/view">
          <View   />
        </Route>
        </Switch>
      </Router>
      </SearchCont>
      </Post>
    </div>
  );
}

export default App;
