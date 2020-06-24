import React, {Component}from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../styles/style.css';



class SelectBox extends Component {
 
  handleChange = (e) => {
    // console.log("nixxxx",e.target.value)
    //this.setState({selectedOption: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""});
   // this.props.onSelectVariant(e.target.value);
//fire an action
  this.props.selectVariant(e.target.value);

  }
   
 
  render() {

   // console.log("variants are",this.props.selectedVariant);
    //const { selectedOption } = this.state.selectedOption;

    return (
      
      <select className="selectBox" value={this.props.selectedVariant} 
                onChange={this.handleChange} selectedvalue={this.props.selectedVariant} >
          {this.props.variants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}
        </select>
    );
  }

}
function mapStateToProps(state) {
    const selectedVariant = (state.selectedVariant);
    //console.log("selectedVariant",selectedVariant);
    return { selectedVariant };
  }
export default connect(mapStateToProps, actions)(SelectBox);


