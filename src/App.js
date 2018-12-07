import React, { Component } from 'react';
import './App.css';
import { Button } from 'bootstrap';

class App extends Component {


  constructor(...args){
    super(...args);
    this.state = {
      countries:[],
      randomCountry: {},
      randomChoices: [],
      userWin: '',
      correctGuess: 0,
      disableFieldset: false,
      bgColor: {backgroundColor: '#81ecec'} //Light Blue (Background Colour)
    }
    this.getRandomCountry = this.getRandomCountry.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }
  componentDidMount() {
    const apiUrl = "https://restcountries.eu/rest/v2/all";
    fetch(apiUrl)
    .then(data => data.json())
    .then(countries => this.setState({countries}))
    .then(this.getRandomCountry)
}

  getRandomCountry() {
    const random = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
    let randomChoices = [random.name];
    while(randomChoices.length < 4){
      const randomOpt = this.state.countries[Math.floor(Math.random()*this.state.countries.length)]
      if(!randomChoices.includes(randomOpt.name)){
        randomChoices.push(randomOpt.name);
      }
    }
    randomChoices.sort(() => { return 0.5 - Math.random() });
    this.setState({
        randomCountry: random,
        randomChoices: randomChoices,
        userWin: '',
        disableFieldset: false
    })
}

  checkWin(e){
    this.setState({
      disableFieldset: true
    })
    const winCountry = this.state.randomCountry.name;
    const userGuess = e.target.value;
    if(winCountry == userGuess){
      this.setState({
        userWin: 'Win',
        correctGuess: this.state.correctGuess + 1,
        bgColor: {backgroundColor: '#55efc4'} //Light Green (Correct Colour)
      })
    }else{
      this.setState({
        userWin: 'Lose',
        bgColor: {backgroundColor: '#ff7675'} //Light Pink (Wrong Colour)
      })
    }

    setTimeout(()=>{
      this.getRandomCountry();
      this.setState({
        userWin: '',
        disableFieldset: false,
        bgColor: {backgroundColor: '#81ecec'} //Light Blue (Background Colour)
      })
      console.log(e.target)
    }, 2000)
  }

  render() {
    return (

      <div className="App">
        <div className="container">
          <h1>Guess The Country</h1>
          <button type="button" id="buttonRandom" className="btn btn-info" onClick={this.getRandomCountry}>Random</button>
          <div className="img-container">
            <img className="flag" src={this.state.randomCountry.flag} alt="Country flag"/>
          </div>

          <h2>{this.state.userWin == 'Win'? 'You guessed correctly! ' : ''}
                 {this.state.userWin == 'Lose'? 'You guessed incorrectly! ' : ''}
                 Score: {this.state.correctGuess}</h2>

                 <fieldset disabled={this.state.disableFieldset}>
                   <form onClick={e => this.checkWin(e)}>
                     <button className="btn btn-info" value={this.state.randomChoices[0]}>{this.state.randomChoices[0]}</button>
                     <button className="btn btn-info" value={this.state.randomChoices[1]}>{this.state.randomChoices[1]}</button>
                     <button className="btn btn-info" value={this.state.randomChoices[2]}>{this.state.randomChoices[2]}</button>
                     <button className="btn btn-info" value={this.state.randomChoices[3]}>{this.state.randomChoices[3]}</button>
                   </form>
                 </fieldset>
                 <div className="backgroundFix" style={this.state.bgColor}> </div>
        </div>
  </div>
    );
  }
}

export default App;
