import React, { Component } from "react";
import MemeDataService from "../services/service";
import { Link } from "react-router-dom";

 class ListMemes extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveMemes = this.retrieveMemes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeme = this.setActiveMeme.bind(this);
    this.removeAllMemes = this.removeAllMemes.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      memes: [],
      currentMeme: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveMemes();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveMemes() {
    MemeDataService.getAll()
      .then(response => {
        this.setState({
          memes: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMemes();
    this.setState({
      currentMeme: null,
      currentIndex: -1
    });
  }

  setActiveMeme(meme, index) {
    this.setState({
      currentMeme: meme,
      currentIndex: index
    });
  }

  removeAllMemes() {
    MemeDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    MemeDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
           memes: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
    }
      render() {
        const { searchName, memes, currentMeme, currentIndex } = this.state;
    
        return (
          <div>
          <h1>Search By Meme Owner</h1>
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
            
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  value={searchName}
                  onChange={this.onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h1>Meme Owner</h1>
    
              <ul className="list-group">
                {memes &&
                  memes.map((meme, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveMeme(meme, index)}
                      key={index}
                    >
                      {meme.name}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllMemes}
              >
                Remove All
              </button>
            </div>
            <div className="col-md-6">
              {currentMeme ? (
                <div>
                  <h4>Posted Meme</h4>
                  <div>
                    <label>
                      <strong>Caption:</strong>
                    </label>{" "}
                    {currentMeme.caption}
                  </div>
                  <div>
                    <label>
                      <strong>Meme :</strong>
                    </label>{" "}
                    <img src={currentMeme.url} alt="Image not Found ,Invalid Url ☠️"></img>
                  </div>
                  <Link
                    to={"/memes/" + currentMeme.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <h1 ><em>Please click on a Meme Owner....</em> 😄 </h1>
                </div>
              )}
            </div>
          </div>
          </div>
        );
      }
    }
export default ListMemes