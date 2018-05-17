import React, {Component} from 'react';
import ActionCable from 'actioncable';

export default class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMessage: '',
      chatLogs: []
    }
  }

  componentWillMount(){
    const cable = ActionCable
      .createConsumer('ws://localhost:6060/cable');

    this.sub = cable.subscriptions.create({
      channel: 'MessengerChannel'
      }, {
        connected: () => {},
        received: data => {
          console.log(data);
          let chatLogs = this.state.chatLogs;
          chatLogs.push(data)
          this.setState({
            chatLogs: chatLogs
          });
        }, 
        create: function(chatContent){
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

  renderChatlog = () =>{
    return this.state.chatLogs.map((log) => {
      return (
        <li key={`chat_${log.id}`}>
          <span className='chat-message'>{ log.body }</span>
        </li>
      );
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.sub.create(this.state.currentMessage)

    this.setState({
      currentMessage: ''
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render(){
    return(
      <div className="container">
        <h1 className="text-center m-3">
          Show Voucher
        </h1>
        <div className="container">
          <h1>Chat</h1>
          <ul className='chat-logs'>
            {this.renderChatlog()}
          </ul>
          <input
            onKeyPress={this.handleKeyPress.bind(this)}
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