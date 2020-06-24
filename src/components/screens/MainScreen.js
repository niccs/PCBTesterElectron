import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class MainScreen extends Component { 
    render(){
        return (
            <div className={this.props.small ? "video-select-screen-small" : "video-select-screen"}>
              <Dropzone
                onDrop={this.onDrop}
                multiple
                accept="video/*"
                className="dropzone"
                activeClassName="dropzone-active"
                rejectClassName="dropzone-reject"
              >
                {this.renderChildren}
              </Dropzone>
            </div>
          );
    }
}

export default connect(null, actions)(VideoSelectScreen);