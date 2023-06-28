import React from 'react'

import { InteractionModeType, Timeline } from '../../timeline'

import dataSet from '../data/smallDataset.json'

// ------------------------------ MINE
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const [lanes, setLanes] = React.useState(dataSet.lanes)

  function handleAddLane() {
    const currentLaneNo = lanes.at(lanes.length-1);
    var laneId = new String(currentLaneNo?.laneId);
    var laneIdNo = new String(parseInt(laneId.slice(laneId.length-2, )) + 1);
    const newLane: {laneId: string; label: string;} = {laneId:'lane-0'+(laneIdNo), label:'lane-0'+(laneIdNo)};

    const newListLanes = lanes.concat(newLane);

    setLanes(newListLanes);
    
  };

  function handleRemoveLane() {
    const newListLanes = lanes.slice(lanes[1],lanes.length-1)

    setLanes(newListLanes);
    
  };

  return (
    <div>
      <h1>Timeline</h1>
      <div> 
        <Button type='button' onClick={handleAddLane} variant="outline-primary">Add Participant</Button>
        <Button type='button' onClick={handleRemoveLane} variant="outline-primary">Remove Participant</Button>
        <Timeline
          events={dataSet.events}
          lanes={lanes}
          dateFormat={(date) => `${date}`}
          width={1000}
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
