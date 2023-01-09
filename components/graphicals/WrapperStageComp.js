import React from 'react'
import StageComp from "./StageComp"
import { getDatabase, ref, onValue } from 'firebase/database';
import { getCameraData, getCamName, getActiveCamNodeIds, getNodeToId, getStageProp } from "../databaseConnection"

// A wrapper for StageComp, where a selectedID is passed, and the data is pulled from the database and passed to the StageComp
// and everytime there is an update in the camera data, using OnValue, the data in the wrapper is updated and passed to the StageComp
// This is done to prevent the StageComp from re-rendering everytime the data is updated, which would make the page slow

export class Wrapper extends React.Component{
    // Constructor of the wrapper where the xbegin, xeind, ybegin and yend are being stored for every camera
    constructor(selectedId){
        super()
        this.state = {
            selectedId: selectedId['selectedId'],       // get the id from the state of the parent component            
            ids: [],                                    // The ids of every ACTIVE camera
            xbegin: [],                                 // The xbegin of every camera
            xend: [],                                   // The xend of every camera
            ybegin: [],                                 // The ybegin of every camera
            yend: [],                                   // The yend of every camera
            sameHeight: [],                             // The sameHeight of every camera
            active: [],                                 // The active of every camera
            names: [],                                  // The names of every camera, independent whether they're active or not
            depth: 1                                    // The depth of the stage
        }
    }

    // Fill all the camera data from the database and get the proportions of the stage
    getCameraData(){
        let activeIds = getActiveCamNodeIds();
        let stageDepth = getStageProp();
        let ids_temp = [];
        activeIds.forEach(id => {
            ids_temp.push(getNodeToId(id));
        });

        // For the other data, we need to loop through all the active cameras
        let xbegin = [];
        let xend = [];
        let ybegin = [];
        let yend = [];
        let sameHeight = [];
        let active = [];
        let names = [];
        
        // Loop through all the active cameras
        for (let i = 1; i <= ids_temp.length; i++){
            let data = getCameraData(i);
            xbegin.push(data[0]);
            xend.push(data[1]);
            ybegin.push(data[2]);
            yend.push(data[3]);
            sameHeight.push(data[4]);
            active.push(data[5]);

            // Get the name of the camera
            let name = getCamName(i);
            names.push(name);
        }

        // Set the state to the new values
        this.setState({
            ids: ids_temp,
            xbegin: xbegin,
            xend: xend,
            ybegin: ybegin,
            yend: yend,
            sameHeight: sameHeight,
            active: active,
            names: names,
            depth: stageDepth
        });   
    }

    // When there is an update in the camera, name or stage database, the data is updated
    componentDidMount(){
        onValue(ref(getDatabase(), 'cameras'), (snapshot) => {
            this.getCameraData();
        });
        onValue(ref(getDatabase(), 'names'), (snapshot) => {
            this.getCameraData();
        });
        onValue(ref(getDatabase(), 'stage'), (snapshot) => {
            this.getCameraData();
        });

        // Update the data when the window is resized
        window.addEventListener('resize', this.getCameraData.bind(this));
    }

    // Render the StageComp with the data from the database
    render(){
        return(
            <div className=''>
                <StageComp currentId={this.state.selectedId} ids={this.state.ids} names={this.state.names} 
                beginCoordinates={[this.state.xbegin, this.state.ybegin]} endCoordinates={[this.state.xend, this.state.yend]} 
                sameHeight={this.state.sameHeight} stageDepth={this.state.depth} />
            </div>
        )
    }
}
