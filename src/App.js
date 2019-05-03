import React from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import qs from 'qs';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      text: ''
    };
  }

  async componentDidMount(){
                                                // stands for Create React App
    const url = 'ws://localhost:31337/chat'; // can't use the CRA proxy because of a bug
    this.connection = new WebSocket(url);

    this.connection.onmessage = (e) => {
      console.log(e.data);
      if (this.state.messages.length === 0){
        this.setState({
          messages: JSON.parse(e.data)
        });
      } else {
        this.setState({
          messages: [...this.state.messages, JSON.parse(e.data)]
        });
      }
    };

    // setInterval(async () => {
    //   const {data} = await axios.get('/api');
    //   // console.log(data);
    //   // this is the same, just not fancy
    //   // const response = await axios.get('/api');
    //   // console.log(response.data);
    //   this.setState({
    //     messages: data
    //   });
    // }, 2000)
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

  _setText = (text) => {
    console.log('app _setText got called');
    this.setState({
      // text: text
      text
    })
    console.log(this.state)
  }

  _sendMessage = async () => {
    console.log('app _sendMessage got called');
    await axios({
      method: 'post',
      url: '/api',
      data: qs.stringify({
        message: this.state.text
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    this.setState({
      text: ''
    })
  }
}

export default App;
