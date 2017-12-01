import React, { Component } from 'react';
import './App.css';
import { Input, Button } from 'reactbulma'
import axios from 'axios';

let currentKey = 2;
const genKey = () => ++currentKey;

class App extends Component {
  state = {
    posts: [],
    usernameInput: '',
    messageInput: ''
  }

  onChangeQueryUsername = (event) => {
    // update the state with our username
    this.setState({
      usernameInput: event.target.value
    })
  }

  onChangeQueryMessage = (event) => {
    // update the state with our message
    this.setState({
      messageInput: event.target.value
    })
  }

  addPost = (event) => {
    // stop the browser from submitting the form
    event.preventDefault();
    // make a copy of the current tasks
    const currentPosts = [...this.state.posts];
    axios.post('/api/chat', {
      key: genKey(),
      content: this.state.messageInput,
      username: this.state.usernameInput,
    })
    .then((response) => {
      console.log(response);
      // add the new post to out post array
      currentPosts.unshift(response.data);
      this.setState({
        // Update the state with the new post and return inputs to empty
        posts: currentPosts,
        usernameInput: '',
        messageInput: ''
      })
    })
    .catch((error) =>   {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={ this.addPost } >
          <label htmlFor="username"></label><br />
          <Input autoFocus id="normal" placeholder="username" value={this.state.usernameInput} onChange={ this.onChangeQueryUsername } /><br /><br />
          <label htmlFor="message"></label>
          <Input large id="large" placeholder="your message" value={this.state.messageInput} onChange={ this.onChangeQueryMessage } /><br /> <br />
          <Button primary>Submit</Button>
        </form><br /><br />
        {
          this.state.posts.map(post => <p key={post.key}>{post.username}: {post.content}</p>)
        }
      </div>
    );
  }

  componentDidMount() {
    // Grab our posts from the API
    axios.get('/api/chat')
      .then((response) => {
        console.log('Success!')
        console.log(response.data);
        // Set state to array of posts from API
        this.setState({
          posts: response.data,
        })
      })
      .catch((error) => {
        console.log('Whoops!')
        console.log(error);
      });
  }

}

export default App;
