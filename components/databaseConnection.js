import { db } from './initFirebase';
import { getDatabase, ref, set, onValue} from 'firebase/database';

// Mapping of node id to camera id
function getNodeToId(node_id) {
    if (node_id === 316501395){
        return 1;
    } 
    else if (node_id === 316503283){
        return 2;
    }	
    else {
        return 3; // 3 is the bin camera, since in testing we will use 2 camera's max
    }
}


// Handling JSON object
function handleCamJSON(data) {
    // data is an array of strings that need to be converted to JSON objects
    for (let i = 0; i < data.length; i++){ // data length can max be 2, because there are only two cameras for now
        try {
            const cam_data = JSON.parse(data[i])
            const node_id = cam_data['nodeId']
            
            // upload the information that belongs to the given nodeId to the database using WriteCameraData
            const cam_id = getNodeToId(node_id);

            const [xend, yend, xbegin, ybegin] = cam_data['aimPos']
            const sameHeight = cam_data['sameHeight']

            // Write to database
            writeCameraData(cam_id, node_id, xbegin, ybegin, xend, yend, sameHeight, true);
        } catch (e) {
            continue
        }
    }
}

// Writing camera data
function writeCameraData(cam_id, node_id, xbegin, ybegin, xend, yend, sameHeight, active) {
    // Could still add messages here
    set(ref(db, 'cameras/' + cam_id), {
        node_id: node_id,
        xbegin: xbegin,
        ybegin: ybegin,
        xend: xend,
        yend: yend,
        sameHeight: sameHeight,
        active: active
    });
}

// Get camera data given a camera id
function getCameraData(cam_id) {
    const db = getDatabase();
    let xbegin = 0;
    let xend = 0;
    let ybegin = 0;
    let yend = 0;
    let sameHeight = false;
    let active = false;
    onValue(ref(db, 'cameras/' + cam_id), (snapshot) => {
        xbegin = snapshot.val().xbegin;
        xend = snapshot.val().xend;
        ybegin = snapshot.val().ybegin;
        yend = snapshot.val().yend;
        sameHeight = snapshot.val().sameHeight;
        active = snapshot.val().active;
    });
    return [xbegin, xend, ybegin, yend, sameHeight, active];
}

// Handle stage data 
function handleStageJSON(data) {
    try {
        const obj = JSON.parse(data);
        const depth = obj['stageDepth'];
        writeStageProp(depth);
    } catch (e) {
        return;
    }
}

// Writing admin data
function writeAdminData(bool) {
    const db = getDatabase();
    set(ref(db, 'admin'), {
        active: bool
    });
}

// Resetting camera data
function resetCamData(){
    const db = getDatabase();
    for (let i = 1; i < 5; i++){
        // Reset camera data
        writeCameraData(i, 0, 0, 0, 0, 0, false, false);
        
        // Reset camera names
        set(ref(db, 'names/' + i), {
            name: i.toString()
        });

        // Reset messages
        set(ref(db, 'messages/' + i), {
            message: ""
        });
    };
}

// Get all active cam ids
function getActiveCamNodeIds() {
    const db = getDatabase();
    const dbref = ref(db, 'cameras');
    let activeCamNodeIds = [];
    onValue(dbref, (snapshot) => {
        snapshot.forEach(child => {
            if (child.val().active === true){
                activeCamNodeIds.push(child.val().node_id);
            }
        });
    });
    return activeCamNodeIds;
}

// Get active camera names
function getActiveCamNames() {
    const db = getDatabase();
    const dbref = ref(db, 'cameras');
    let activeCamNames = [];
    onValue(dbref, (snapshot) => {
        snapshot.forEach(child => {
            if (child.val().active === true){
                activeCamNames.push(getCamName(child.key));
            }
        });
    });
    return activeCamNames;
}


// Get whether the admin is active
function getAdminActive() {
    const db = getDatabase();
    let active = false;
    onValue(ref(db, 'admin/active'), (snapshot) => {
        active = snapshot.val();
    });
    return active;
};

// Write name to camera id in names/ folder
function writeCamName(name, camId) {
    const db = getDatabase();
    set(ref(db, 'names/' + camId), {
        name: name
    });
}

// Get name of camera id in names/ folder
function getCamName(camId) {
    const db = getDatabase();
    let name = camId.toString();
    onValue(ref(db, 'names/' + camId), (snapshot) => {
        name = snapshot.val();
    });
    return name;
}

// Write stage proportion to database
function writeStageProp(depth) {
    const db = getDatabase();
    set(ref(db, 'stage/'), {
        depth: depth
    });
}

// Get stage proportion from database
function getStageProp() {
    const db = getDatabase();
    let depth = 0;
    onValue(ref(db, 'stage/'), (snapshot) => {
        depth = snapshot.val().depth;
    });
    return depth;
}

// Map name to id (only used internally)
function nameToId(name) {
    const db = getDatabase();
    let id = 1;
    onValue(ref(db, 'names/'), (snapshot) => {
        snapshot.forEach(child => {
            if (child.val().name === name){
                id = child.key;
            }
        });
    });
    return id;
}

// write a message to database based on a given id
function writeMessage(id, message) {
    const db = getDatabase();

    // If id is a string, convert to id
    if (typeof id === "string"){
        id = nameToId(id);
    }

    set(ref(db, 'messages/' + id), {
        message: message
    });
}

// read a message from database based on a given id
function readMessage(id) {
    const db = getDatabase();
    let message = "";
    onValue(ref(db, 'messages/' + id), (snapshot) => {
        message = snapshot.val();
    });
    return message;
}
    

export { writeCameraData, writeAdminData, handleCamJSON, resetCamData, writeCamName, getAdminActive, 
    handleStageJSON, getNodeToId, writeStageProp, writeMessage, readMessage, getCamName, 
    getActiveCamNodeIds, getCameraData, getActiveCamNames, getStageProp };
