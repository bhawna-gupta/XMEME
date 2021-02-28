import React, { Component } from "react";
import MemeDataService from "../services/service";

 class CreateMeme extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.saveMeme = this.saveMeme.bind(this);
    this.newMeme = this.newMeme.bind(this);

    this.state = {
      id: null,
      name: "",
      caption: "", 
      url: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeCaption(e) {
    this.setState({
      caption: e.target.value
    });
  }
  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
}
  saveMeme =(e)=> {
    e.preventDefault();
    var data = {
      name: this.state.name,
      caption: this.state.caption,
      url: this.state.url
    };

    MemeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          caption: response.data.caption,
          url: response.data.url,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMeme() {
    this.setState({
      id: null,
      name: "",
      caption: "", 
      url: "",

      submitted: false
    });
}
    render() {
        return (
          <div className="submit-form" className="addform">
            {this.state.submitted ? (
              <div>
                <h1>Meme Submitted Successfully!! ✔ </h1>
                <button className="btn btn-success" onClick={this.newMeme}>
                  Add More
                </button>
              </div>
            ) : (
              <div >  
                <form onSubmit={this.saveMeme}> 
                <div className="form-group" >
                  <b><label htmlFor="name">Meme Owner</label></b><span style={{color:"#df1b1be3"}}>*</span>
                  <input 
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    placeholder="Enter your full name"
                    value={this.state.name}
                    onChange={this.onChangeName}  
                    name="name"  
                  />
                </div>
                
                <div className="form-group">
                  <b><label htmlFor="caption">Caption</label></b><span style={{color:"#df1b1be3"}}>*</span>
                  <input 
                    type="text"
                    className="form-control"
                    id="caption"
                    required
                    placeholder="Be creative with the caption"
                    value={this.state.caption}
                    onChange={this.onChangeCaption}
                    name="caption"
                  />
                </div>
             
                <div className="form-group">
                  <b><label htmlFor="url">Meme URL</label></b><span style={{color:"#df1b1be3"}}>*</span>
                  <input 
                    type="url"
                    className="form-control"
                    placeholder="Enter URL of your meme here"
                    id="url"
                    required
                    value={this.state.url}
                    onChange={this.onChangeUrl} 
                    name="url"
                  />
                </div> 
                <button type="submit" className="btn ">
                  Submit
                </button>
                </form>
              </div>
              
            )}
          </div>
       );
    }
}
export default CreateMeme