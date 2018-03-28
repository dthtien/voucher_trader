import React, {Component} from 'react';
import ActionCable from 'actioncable';

export default class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMessage: ''
    }
  }

  componentDidMount(){
    const cable = ActionCable.createConsumer('ws://localhost:6060/cable');

    this.sub = cable.subscriptions.create({
      channel: 'MessagesChannel'
      }, {
        connected: () => {},
        received: data => {
          console.log(data);
      }, 
      create: function(chatContent){
        console.log(this);
        this.perform('create', {
          body: chatContent
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      currentMessage: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.sub.create(this.state.currentMessage)

    this.setState({
      currentMessage: ''
    });
  }

  render(){
    return(
      <div className="container">
        <h1 className="text-center m-3">
          Show Voucher
        </h1>
        <div className="container">
          <h1>Chat</h1>
          <div className='chat-logs'>
          </div>
          <input
            onChange={this.handleChange.bind(this)}
            type='text'
            value={this.state.currentMessage}
            placeholder='Enter your message...'
            className='form-control'/>
          <button className='btn btn-primary' 
            onClick={this.handleSubmit.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  } 
}