import React, { Component } from "react";
import MemeDataService from "../services/service";

 class EditMeme extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.getMeme = this.getMeme.bind(this);
    this.updateMeme = this.updateMeme.bind(this);
    this.deleteMeme = this.deleteMeme.bind(this);

    this.state = {
      currentMeme: {
        id: null,
        name: "",
        caption: "", 
        url: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMeme(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMeme: {
              ...prevState.currentMeme,
            name: name
        }
      };
    });
  }

  onChangeCaption(e) {
    const caption = e.target.value;
    
    this.setState(prevState => ({
      currentMeme: {
        ...prevState.currentMeme,
        caption: caption
      }
    }));
  }

  onChangeUrl(e) {
    const url = e.target.value;
    
    this.setState(prevState => ({
      currentMeme: {
        ...prevState.currentMeme,
        url: url
      }
    }));
  }

  getMeme(id) {
    MemeDataService.get(id)
      .then(response => {
        this.setState({
          currentMeme: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  newMeme() {
    this.setState ({
      currentMeme: {
        id: null,
        name: "",
        caption: "", 
        url: "",
      }
    });
  }

  updateMeme() {
    MemeDataService.update(
      this.state.currentMeme.id,
      this.state.currentMeme
    )
      .then(response => {
        this.setState({
          message: "Meme Updated Successfully! ✔  ✔ Search By Name"
        });
        this.newMeme();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMeme() {    
    MemeDataService.delete(this.state.currentMeme.id)
      .then(response => {
        this.setState({
          message: "Meme Deleted Successfully! ✔"
        });
        this.newMeme();
      })
      .catch(e => {
        console.log(e);
      });
    }
      render() {
        const { currentMeme } = this.state;
    
        return (
          <div>
            {currentMeme ? (
              <div className="edit-form" className="addform">
                <h2>Edit Meme</h2>
                <form>
                  <div className="form-group">
                    <b><label htmlFor="caption">Caption</label></b>
                    <input autoComplete="off"
                      type="text"
                      className="form-control"
                      id="caption"
                      value={currentMeme.caption}
                      onChange={this.onChangeCaption}
                    />
                  </div>
                  <div className="form-group">
                    <b><label htmlFor="url">Meme URL</label></b>
                    <input 
                      type="url"
                      className="form-control"
                      id="url"
                      value={currentMeme.url}
                      onChange={this.onChangeUrl}
                    />
                  </div>
                </form>
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteMeme}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateMeme}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
               <h1 ><em>Please click on a Meme to Edit...</em> 😄 </h1>
              </div>
            )}
          </div>
        );
}
}
export default EditMeme