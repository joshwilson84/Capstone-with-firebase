import React, { Component } from 'react';
import fire from './config/Fire';
import './App.css';
import Tracker from './Tracker';
import AddItem from './AddItem';
import uuid from 'uuid';
import $ from 'jquery';
import firebase from 'firebase';











class Home extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.state = {
            trackedItems: []




        }
    }

    logout() {
        fire.auth().signOut();
    }



    getTrackedItems() {
        this.setState({
            trackedItems: [
            ]
        });
    }

    componentWillMount() {
        this.getTrackedItems();


    }

   /* componentWillMount(){
        this.firebaseRef = {
            apiKey: "AIzaSyAQs3MIjAvMwivDGhBJKpnaPbEsWZJeo1Q",
            authDomain: "home-tracker-927d1.firebaseapp.com",
            databaseURL: "https://home-tracker-927d1.firebaseio.com/trackedItem"
        }
        firebase.initializeApp(this.firebaseRef, 'other1');
    }*/




    handleAddItem(trackedItem) {
        let trackedItems = this.state.trackedItems;
        trackedItems.push(trackedItem);
        this.setState({ trackedItems: trackedItems });
        
        //this.firebaseRef.push(trackedItem);

    

        
    }
    handleDeleteItem(id) {
        let trackedItems = this.state.trackedItems;
        let index = trackedItems.findIndex(x => x.id === id);
        trackedItems.splice(index, 1);
        this.setState({ trackedItems: trackedItems });
    }



    render() {
        return (
            <div className="App">
                <AddItem addItem={this.handleAddItem.bind(this)} />
                <Tracker trackedItems={this.state.trackedItems} onDelete={this.handleDeleteItem.bind(this)} />
                < hr/ >
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Home;