import React from "react";
import "./style.css";

class Airlines extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.lab9models.airlinesModel()",
      window.lab9models.airlinesModel()
    );
    this.state={substr : "", linesToDisplay: []}; 
    this.handleChangeSubstr = (event) => this.handleChange(event);
  }
handleChange(event) {
 //  Insert your code here
    const substr = event.target.value.toLowerCase();
    const linesToDisplay = window.lab9models
      .airlinesModel()
      .filter(line => line.toLowerCase().includes(substr))
      .sort();

    this.setState({
      substr,
      linesToDisplay
    });
  } 
  render() {
    return (
	<div>
           <div className="state-search">
            {			  
            this.state.substr
            }
           </div>
           <div className="lab9-example-output"><span id='IInfo'>
            {(this.state.linesToDisplay.length > 0 && this.state.substr != "") ? (
              <p>
                {this.state.linesToDisplay.map(line => (
                  <li key={line}>{line}</li>
                ))}
              </p>
            ) : (
              "No matching airlines."
            )}
            </span></div> 
          <label htmlFor="substrId">Enter substring to search:</label>
          <input
            id="substrId"
            type="text"
            value={this.state.substr}
            onChange={this.handleChangeSubstr}
          />
              
    </div>
    );
  }
}

export default Airlines;
