import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
          <Game />
        <div> 
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: 0,
      cells: Array(840).fill(false),
    };
    this.incrementTick = this.incrementTick.bind(this)
    this.toggleValue = this.toggleValue.bind(this)
  }
  
  incrementTick() {
    this.setState({tick: this.state.tick + 1});
    this.evolve();
  }

  toggleValue(i) {
    const cells= this.state.cells.slice();
    cells[i] = !cells[i];
    this.setState({cells: cells})
  }

  evolve() {
    const cells = this.state.cells.slice();
    for (let i = 0; i < this.state.cells.length; i++) {
      if (this.checkNeighbours(i) < 2 || this.checkNeighbours(i) > 3) {
        cells[i] = false;
      }
      if (cells[i] === false && this.checkNeighbours(i) === 3) {
        cells[i] = true;
      }
    }
    this.setState({cells: cells})
  }

  checkNeighbours(i) {
    const y = 40;
    const neighbors = [y-1, y+1, y, 1, -1, -y, -y-1, -y+1]
    return neighbors.map((x) => (this.state.cells[i + x]))
      .filter(function(x){return x===true}).length
  }
  
  render () {
    return (
      <div> 
        <div className='tick-count'>
          Tick count: {this.state.tick}
        </div>
        <div>
          <button className="step-button" onClick={this.incrementTick}>Step</button><br/>
        </div>
        <div className='grid'>
          <div className='cell-container'>
          {this.state.cells.map((cell, index) => (
            <button
              key={index} 
              className={cell ? "alive" : "dead"} 
              value={cell} 
              onClick={() => this.toggleValue(index)}>
            </button>
          ))}      
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
