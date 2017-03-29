import React, {Component} from 'react';
import Status from './components/status';
import "./App.scss";



class App extends Component {
    state = {
        count: 0
    }

    handleClick(){
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div className="status-lists">
                <button onClick={this.handleClick.bind(this)}>CLick</button>
                <Status status="ádas" like={3} count={this.state.count}/>
                <Status status="ádas" like={3} count={this.state.count}/>
                <Status status="ádas" like={3} count={this.state.count}/>
                {/*<Status status="Anh nhớ em" time="20:32"/>*/}
            </div>
        );
    }
}

export default App;
