import React, {Component} from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './App.css';

// const state = {
//     Robots: Robots,
//     searchField: ''
// }
class App extends Component{
    constructor() {
        super()
        this.state = {
            Robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {this.setState({Robots:users})});
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
        // console.log(event.target.value);
    }

    render(){
        const { Robots,searchField} = this.state;
        const filteredRobots = Robots.filter(Robot => {
            return Robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if(!Robots.length){
            return <h1>Loading...</h1>
        }
        else{
            return(
                <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList Robots={filteredRobots}/>
                </Scroll>
                </div>
            );
        }
    }
}

export default App;