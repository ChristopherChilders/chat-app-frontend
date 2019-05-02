import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ChatList from './ChatList';
import ChatForm from './ChatForm';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      text: ''
    };
  }

  componentDidMount(){

    setInterval(async () => {
      const {data} = await axios.get('/api');
      // console.log(data);
      // this is the same, just not fancy
      // const response = await axios.get('/api');
      // console.log(response.data);
      this.setState({
        messages:data
      });
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <ChatList messages={this.state.messages}/>
        <ChatForm text={this.state.text} handleChange={this._setText} handleSend={this._sendMessage}/>
      </div>
    );
  }

  _setText = () => {
    console.log('app _setText got called');
  }

  _sendMessage = () => {
    console.log('app _sendMessage got called');
  }
}

export default App;
