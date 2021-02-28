import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import CreateMeme from "./components/CreateMeme";
import EditMeme from "./components/EditMeme";
import ListMemes from "./components/ListMemes";
import AllMemes from "./components/AllMemes";
class App extends Component {
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top" >
                <h1>XMEME</h1>
          
          <div className="navbar-nav ml-auto" >
                      <li className="nav-item">
                          <Link to={"/"} className="nav-link">
                            Meme List
                          </Link>
                      </li>               
                      <li className="nav-item">
                          <Link to={"/memes"} className="nav-link">
                          Edit Meme
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/add"} className="nav-link">
                            Create Meme
                          </Link>
                      </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/"} component={AllMemes} />
            <Route exact path={"/memes"} component={ListMemes} />
            <Route exact path="/add" component={CreateMeme} />
            <Route path="/memes/:id" component={EditMeme} />
          </Switch>
        </div>


      </div>
    );
  }
}

export default App;
