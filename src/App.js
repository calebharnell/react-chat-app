import React, { Component } from 'react';
import './App.css';
import { Input, Button } from 'reactbulma'

class App extends Component {
  state = {
    posts: [{
      id: 1,
      username: "John",
      content: "Heyooooooo"
    }]
  }

  render() {
    return (
      <div className="App">
        <form>
            <label htmlFor="username"></label><br />
            <Input id="normal" placeholder="username" /><br /><br />
            <label htmlFor="message"></label>
            <Input large id="large" placeholder="your message" /><br /> <br />
          <Button primary>Submit</Button>
        </form><br /><br />
        {
          this.state.posts.map(post => <p>{post.username}: {post.content}</p>)
        }

      </div>
    );
  }
}

export default App;
