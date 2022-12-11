"use strict";
exports.id = 840;
exports.ids = [840];
exports.modules = {

/***/ 6840:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cg": () => (/* binding */ getActiveCamNodeIds),
/* harmony export */   "Dm": () => (/* binding */ writeAdminData),
/* harmony export */   "Fd": () => (/* binding */ writeCamName),
/* harmony export */   "Hv": () => (/* binding */ writeMessage),
/* harmony export */   "MJ": () => (/* binding */ getCameraData),
/* harmony export */   "Oe": () => (/* binding */ resetCamData),
/* harmony export */   "_b": () => (/* binding */ getActiveCamNames),
/* harmony export */   "dd": () => (/* binding */ handleStageJSON),
/* harmony export */   "eX": () => (/* binding */ getStageProp),
/* harmony export */   "i1": () => (/* binding */ getAdminActive),
/* harmony export */   "uo": () => (/* binding */ getCamName),
/* harmony export */   "xi": () => (/* binding */ getNodeToId),
/* harmony export */   "yF": () => (/* binding */ handleCamJSON)
/* harmony export */ });
/* unused harmony exports writeCameraData, writeStageProp, readMessage */
/* harmony import */ var _initFirebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2074);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_initFirebase__WEBPACK_IMPORTED_MODULE_0__, firebase_database__WEBPACK_IMPORTED_MODULE_1__]);
([_initFirebase__WEBPACK_IMPORTED_MODULE_0__, firebase_database__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// Mapping of node id to camera id
function getNodeToId(node_id) {
    if (node_id === 316501395) {
        return 1;
    } else if (node_id === 316503283) {
        return 2;
    } else {
        return 3; // 3 is the bin camera, since in testing we will use 2 camera's max
    }
}
// Handling JSON object
function handleCamJSON(data) {
    // data is an array of strings that need to be converted to JSON objects
    for(let i = 0; i < data.length; i++){
        try {
            const cam_data = JSON.parse(data[i]);
            const node_id = cam_data["nodeId"];
            // upload the information that belongs to the given nodeId to the database using WriteCameraData
            const cam_id = getNodeToId(node_id);
            const [xend, yend, xbegin, ybegin] = cam_data["aimPos"];
            const sameHeight = cam_data["sameHeight"];
            // Write to database
            writeCameraData(cam_id, node_id, xbegin, ybegin, xend, yend, sameHeight, true);
        } catch (e) {
            continue;
        }
    }
}
// Writing camera data
function writeCameraData(cam_id, node_id, xbegin, ybegin, xend, yend, sameHeight, active) {
    // Could still add messages here
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_initFirebase__WEBPACK_IMPORTED_MODULE_0__.db, "cameras/" + cam_id), {
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
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    let xbegin = 0;
    let xend = 0;
    let ybegin = 0;
    let yend = 0;
    let sameHeight = false;
    let active = false;
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "cameras/" + cam_id), (snapshot)=>{
        xbegin = snapshot.val().xbegin;
        xend = snapshot.val().xend;
        ybegin = snapshot.val().ybegin;
        yend = snapshot.val().yend;
        sameHeight = snapshot.val().sameHeight;
        active = snapshot.val().active;
    });
    return [
        xbegin,
        xend,
        ybegin,
        yend,
        sameHeight,
        active
    ];
}
// Handle stage data 
function handleStageJSON(data) {
    try {
        const obj = JSON.parse(data);
        const depth = obj["stageDepth"];
        writeStageProp(depth);
    } catch (e) {
        return;
    }
}
// Writing admin data
function writeAdminData(bool) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "admin"), {
        active: bool
    });
}
// Resetting camera data
function resetCamData() {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    for(let i = 1; i < 5; i++){
        // Reset camera data
        writeCameraData(i, 0, 0, 0, 0, 0, false, false);
        // Reset camera names
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "names/" + i), {
            name: i.toString()
        });
        // Reset messages
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "messages/" + i), {
            message: ""
        });
    }
    ;
}
// Get all active cam ids
function getActiveCamNodeIds() {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    const dbref = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "cameras");
    let activeCamNodeIds = [];
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)(dbref, (snapshot)=>{
        snapshot.forEach((child)=>{
            if (child.val().active === true) {
                activeCamNodeIds.push(child.val().node_id);
            }
        });
    });
    return activeCamNodeIds;
}
// Get active camera names
function getActiveCamNames() {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    const dbref = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "cameras");
    let activeCamNames = [];
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)(dbref, (snapshot)=>{
        snapshot.forEach((child)=>{
            if (child.val().active === true) {
                activeCamNames.push(getCamName(child.key));
            }
        });
    });
    return activeCamNames;
}
// Get whether the admin is active
function getAdminActive() {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    let active = false;
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "admin/active"), (snapshot)=>{
        active = snapshot.val();
    });
    return active;
}
;
// Write name to camera id in names/ folder
function writeCamName(name, camId) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "names/" + camId), {
        name: name
    });
}
// Get name of camera id in names/ folder
function getCamName(camId) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    let name = camId.toString();
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "names/" + camId), (snapshot)=>{
        name = snapshot.val();
    });
    return name;
}
// Write stage proportion to database
function writeStageProp(depth) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "stage/"), {
        depth: depth
    });
}
// Get stage proportion from database
function getStageProp() {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    let depth = 0;
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "stage/"), (snapshot)=>{
        depth = snapshot.val().depth;
    });
    return depth;
}
// Map name to id (only used internally)
function nameToId(name) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    let id = 1;
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "names/"), (snapshot)=>{
        snapshot.forEach((child)=>{
            if (child.val().name === name) {
                id = child.key;
            }
        });
    });
    return id;
}
// write a message to database based on a given id
function writeMessage(id, message) {
    const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)();
    // If id is a string, convert to id
    if (typeof id === "string") {
        id = nameToId(id);
    }
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(db, "messages/" + id), {
        message: message
    });
}
// read a message from database based on a given id
function readMessage(id) {
    const db = getDatabase();
    let message = "";
    onValue(ref(db, "messages/" + id), (snapshot)=>{
        message = snapshot.val();
    });
    return message;
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2074:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "db": () => (/* binding */ db)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_database__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_database__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXAD2r8_uwUpwYati-mcc00AyzI6XNGgk",
    authDomain: "musicam-data.firebaseapp.com",
    databaseURL: "https://musicam-data-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "musicam-data",
    storageBucket: "musicam-data.appspot.com",
    messagingSenderId: "1031964669501",
    appId: "1:1031964669501:web:de0fdc24b205ff6367dc54"
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)(app);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;