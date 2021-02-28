import React, { Component } from "react";
import MemeDataService from "../services/service";

 class AllMemes extends Component {
    constructor(props) {
        super(props);
        this.retrieveMemes = this.retrieveMemes.bind(this);
    
        this.state = {
          memes: []
        };
    }
        componentDidMount() {
            this.retrieveMemes();
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
        render()
        {
            const {  memes } = this.state;
            return (
            <div className="col-md-6" className="AllMemes" >
              <h1><i>Have a Look!!</i>😃 </h1>
              <ul className="list-group"  >
                {memes &&memes.map((meme) => (
                    <div class="box" >
                        <li  className="list-group-item "><b><h2> {meme.name}</h2></b></li>
                        <li  className="list-group-item ">{meme.caption}</li>
                        <li className="list-group-item "><img src={meme.url} alt = "Image not Found ,Invalid Url ☠️" ></img></li>
                    </div>
                  ))}
              </ul>
              </div>
            );
}
 }
export default AllMemes