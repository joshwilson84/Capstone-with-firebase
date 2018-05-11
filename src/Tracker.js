import React, { Component } from 'react';
import TrackerItems from  './TrackerItems';


class Tracker extends Component {
  deletetrackedItem(id){
    this.props.onDelete(id)

  }

  render() {
    let trackerItems;
    if (this.props.trackedItems) {
      trackerItems = this.props.trackedItems.map(trackedItem =>{
          console.log(trackedItem);
          return(
            <TrackerItems onDelete={this.deletetrackedItem.bind(this)} key={trackedItem.id} trackedItem={trackedItem} />
          )
      });

    }



    return (
      <div className="Tracker">
      <h3>Things to keep track of</h3>
        {trackerItems}

      </div>
    );
  }
}




export default Tracker;
