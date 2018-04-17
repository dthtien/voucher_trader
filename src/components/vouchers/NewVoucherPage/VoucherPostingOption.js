import React, {Component} from 'react';

export default class VoucherPostingOption extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: []
    }
  }

  render(){
    return(
      <div className="mt-2">
        <h4>Posting options</h4>
      </div>
    );
  }
}
