import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
  apiKey: '6bb875f3da56456f9fbb9e0a4ebdb78f'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state= {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  } 

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.COLOR_MODEL,
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles'
            params={particlesOptions}
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />    
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
};

export default App;
