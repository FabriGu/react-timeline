import React from 'react'
import { InteractionModeType, Timeline } from '../../timeline'

// ------------------------------ DATASET
//import dataSet from '../data/smallDataset.json'
import dataSet from '../data/blankDataset.json'

// ------------------------------ ADDED
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// ------------------------------ CODE STARTS

export const App = () => {
  // React state change of lanes displayed
  const [lanes, setLanes] = React.useState(dataSet.lanes)


  function handleBinInput() {

  }

  // function to add new lane displayed 
  function handleAddLane() {
    // What is the last lane added, or if no lane returns undefined
    const currentLaneNo = lanes.at(lanes.length-1);

    // if undefined returned by currentLaneNo then just add a default first lane
    if (currentLaneNo == undefined) {
      const newLane: {laneId: string; label: string;} = {laneId:'Participant-0', label:"Participant-0"};
      setLanes(lanes.concat(newLane));
    }
    // if there is already a lane present and displayed
    else{
      // get last lane informations
      const lane = lanes.at(lanes.length-1);
      
      // convert just the lane Id (not what is displayed to the user but what the system reads to recognize it) to a String object
      const laneId = new String(lane.laneId);

      // slice string from the dash (get the number of the lane), and adds one for the new lane to be added 
      const newLaneIdNo = parseInt(laneId.slice(laneId.indexOf('-')+1, )) + 1;
     
      // convert new lane No. to a String so it can be concatenated to the rest of the label
      const newLaneIdNoS = new String(newLaneIdNo);
      const newLane: {laneId: string; label: string;} = {laneId:'Participant-'+(newLaneIdNoS), label:'Participant-'+(newLaneIdNoS)};

      // concatenate the new lane to the array of other lanes
      const newListLanes = lanes.concat(newLane);

      // push the new lane using React set state
      setLanes(newListLanes);
    }
  };

  function handleRemoveLane() {
    const newListLanes = lanes.slice(lanes[1],lanes.length-1)

    setLanes(newListLanes);
    
  };

  return (
    <div>
      <h1>Timeline</h1>
      <div> 
        <div>
          <Button type='button' onClick={handleAddLane} variant="outline-primary">Add Participant</Button>
          <Button type='button' onClick={handleRemoveLane} variant="outline-primary">Remove Participant</Button>
        </div>
        <Timeline
          events={dataSet.events}
          lanes={lanes}
          dateFormat={(date) => `${date}`}
          width={1400}
          height={300}
          enabledInteractions={[
            InteractionModeType.Hover,
            InteractionModeType.Zoom,
            InteractionModeType.Pan,
            InteractionModeType.RubberBand,
            InteractionModeType.Trim,
          ]}
        />
      </div>
    </div>
  )
}
