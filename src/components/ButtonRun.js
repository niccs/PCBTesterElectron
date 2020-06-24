import React, {Component}from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';


class ButtonRun extends Component {

  onRun = () => {
    //this.setState({selectedOption: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""});
   // this.props.onSelectVariant(e.target.value);
//fire an action
  this.props.runDiagnosticSchedule("Lets run now");

  }
   
 
  render() {

    // console.log("variants are",this.props.variants);
    //const { selectedOption } = this.state.selectedOption;

    return (
      
        <button
        
        onClick={this.onRun}>RUN</button>
    );
  }

}
function mapStateToProps(state) {
    const serialData = (state.serialData);
    return { serialData };
  }
export default connect(mapStateToProps, actions)(ButtonRun);


