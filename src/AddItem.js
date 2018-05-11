import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import axios from 'axios';
import { stat } from 'fs';

class AddItem extends Component {
    constructor() {
        super();
        this.state = {
            newItem: {}

        }
    }
    static defaultProps = {
        categories: ["UPC code", "Note/Reminder", "Other"]
    }










    handleSubmit(e) {
        e.preventDefault();

        var upc = $('#upc').val();

        if (this.refs.note.value === '') {
            alert("Submission cannot be blank")

        } else if (this.refs.date.value === '') {
            alert("Submission cannot be blank")
        } else if (this.refs.upccode.value === '') {
            this.setState({
                newItem: {
                    id: uuid.v4(),
                    category: this.refs.category.value,
                    date: this.refs.date.value,
                    note: this.refs.note.value,
                    upccode: this.refs.upccode.value
                }
            }, function () {
                this.props.addItem(this.state.newItem);

            });


        } else {
            $.ajax({
                url: 'https://api.walmartlabs.com/v1/items?apiKey=kck6cj86my363fghv43rfd7u&upc=' + upc,
                dataType: 'jsonp',
                cache: false,
                //crossDomain: true,
                headers: (
                    'Access-Control-Allow-Headers: x-requested-with'
                ),
                success: function (data) {
                    console.log(data);
                    if (data.errors) {
                        this.setState({
                            newItem: {
                                id: uuid.v4(),
                                category: this.refs.category.value,
                                date: this.refs.date.value,
                                note: this.refs.note.value,
                                upccode: "Sorry UPC couldn't be found",
                            }
                        }, function () {
                            this.props.addItem(this.state.newItem);

                        });

                    } else {
                        let parData = data.items
                        parData.push(this.state.newItem);
                        var newItem = parData.reduce(function (result, currentObject) {
                            for (var key in currentObject) {
                                if (currentObject.hasOwnProperty(key)) {
                                    result[key] = currentObject[key];
                                }
                            }
                            return result;
                        }, {});
                        this.setState({ newItem: newItem })
                        this.props.addItem(this.state.newItem);

                        console.log(newItem);
                        //let addItem = resultObject.props


                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                },
            })

            this.setState({
                newItem: {
                    id: uuid.v4(),
                    category: this.refs.category.value,
                    date: this.refs.date.value,
                    note: this.refs.note.value,
                    upccode: this.refs.upccode.value

                }
            })










        }

    };




    imageHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    imageUploadHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        axios.post('https://us-central1-home-tracker-927d1.cloudfunctions.net/uploadFile', fd)
            .then(res => {
                console.log(res);
            });
    }


    render() {
        $("input[type=text]").val('');

        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });
        return (
            <div>
                <h3>Add a new item</h3>
                <form ref='subform' id="submitForm" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>UPC code</label><br />
                        <input type="text" ref="upccode" id="upc" />
                    </div>
                    <div>
                        <label>Date</label><br />
                        <input type="text" ref="date" id='date' />
                    </div>
                    <div>
                        <label>Note</label><br />
                        <input type="text" ref="note" id='note' />
                    </div>

                    <div>
                        <label>Category</label><br />
                        <select ref="category">
                            {categoryOptions}
                        </select>
                    </div>
                    <input type="submit" value="Submit" onClick={this.handleClick} />

                </form>
                
                <form id='imageform'>
                    <div>
                        <label>Image</label><br />
                        <input id='image' type="file" ref='image' onChange={this.imageHandler} onSubmit={this.imageUploadHandler} />
                        <button onClick={this.imageUploadHandler}>Upload</button>
                    </div>
                </form>
                

            </div>
        );


    }
}



export default AddItem;
