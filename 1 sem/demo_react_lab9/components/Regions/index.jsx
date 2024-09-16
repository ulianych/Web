import React from "react";
import "./styles.css";

/**
 * Define Regions, a React component of Lab9. The model
 * data for this view (the regions names) is available at
 * window.regionsModel.regionsModel().
 */
class Regions extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.lab9models.regionsModel()",
      window.lab9models.regionsModel()
    );
    this.state={substr : "", citiesToDisplay: []}; 
    this.handleChangeSubstr = (event) => this.handleChange(event);
  }
handleChange(event) {
 //  Insert your code here
    const substr = event.target.value.toLowerCase();
    const citiesToDisplay = window.lab9models
      .regionsModel()
      .filter(region => region.toLowerCase().includes(substr))
      .sort();

    this.setState({
      substr,
      citiesToDisplay
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
            {(this.state.citiesToDisplay.length > 0 && this.state.substr != "") ? (
              <p>
                {this.state.citiesToDisplay.map(region => (
                  <li key={region}>{region}</li>
                ))}
              </p>
            ) : (
              "No matching regions."
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

export default Regions;
