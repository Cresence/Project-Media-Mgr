import React from 'react';
import logo from './logo.svg';
import './App.css';

const styles = {
  videoStyle: {
    padding:"2px 0px 4px", 
    display:"block", 
    width:"345px", 
    fontWeight:"normal", 
    fontSize:"10px", 
    textDecoration:"underline"
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/>
        <iframe id="video" src="https://player.twitch.tv/?autoplay=false&video=v503767319" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe><a href="https://www.twitch.tv/videos/503767319?tt_content=text_link&tt_medium=vod_embed" style={styles.videoStyle}
      ></a>
      </header>
    </div>
  );
}

export default App;
