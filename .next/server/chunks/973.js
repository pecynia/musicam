"use strict";
exports.id = 973;
exports.ids = [973];
exports.modules = {

/***/ 6205:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const scale = (windowObj, container, x, y, depth)=>{
    if (windowObj) {
        console.log(depth);
        // Get the window size
        const windowWidth = windowObj.innerWidth;
        const windowHeight = windowObj.innerHeight;
        // Get the container size
        const containerWidth = container?.clientWidth;
        const containerHeight = container ? container?.clientWidth * depth < container?.clientHeight ? container?.clientWidth * depth : container?.clientHeight : undefined;
        // Calculate the x and y coordinates for the container size based on the window size
        let xCoord = windowWidth * x;
        let yCoord = windowHeight * y;
        if (containerWidth && containerHeight) {
            xCoord = Math.round(containerWidth * x);
            yCoord = Math.round(containerHeight * y);
        }
        // Return the coordinates
        return [
            xCoord,
            yCoord
        ];
    }
    return [
        x,
        y
    ];
};
// Function component to create a circle for each name, 
const StageComp = (props)=>{
    // Define container and window using useEffect and useState
    const { 0: container , 1: setContainer  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: windowObj , 1: setWindowObj  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setContainer(document.getElementById("container"));
        setWindowObj(window);
    }, [
        document,
        window
    ]);
    const getJSX = ()=>{
        let arr = [];
        props.names.map((name, index)=>{
            // name can either be a string itself, or an object in the shape: {name: string}
            let nameString = typeof name === "string" ? name : name["name"];
            let stageDepth = Math.abs(props.stageDepth) > 1 ? 1 : Math.abs(props.stageDepth);
            // Get the x and y coordinates based on x and y percentages and the size of the container
            const [xBegin, yBegin] = scale(windowObj, container, props.beginCoordinates[0][index], props.beginCoordinates[1][index], stageDepth);
            const [xEnd, yEnd] = scale(windowObj, container, props.endCoordinates[0][index], props.endCoordinates[1][index], stageDepth);
            // Get the x and y coordinates of the top left corner of the container
            const containerX = container?.offsetLeft;
            const containerY = container?.offsetTop;
            // Get the width and height of the container
            const containerWidth = container?.clientWidth;
            const containerHeight = container ? container?.clientWidth * stageDepth < container?.clientHeight ? container?.clientWidth * stageDepth : container?.clientHeight : undefined;
            // Draw a line, connecting the begin and end coordinates, have a circle at the end with a name in it
            arr.push(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute border-2 border-blue-800",
                style: {
                    top: containerY,
                    left: containerX,
                    width: containerWidth,
                    height: containerHeight
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            className: "absolute",
                            style: {
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                    x1: xBegin,
                                    y1: yBegin,
                                    x2: xEnd,
                                    y2: yEnd,
                                    stroke: props.currentId === props.ids[index] ? "tomato" : "darkblue",
                                    strokeWidth: "7"
                                }),
                                props.sameHeight[index] ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                    cx: xEnd,
                                    cy: yEnd,
                                    r: "30",
                                    fill: props.currentId === props.ids[index] ? "tomato" : "violet"
                                }),
                                props.sameHeight[index] ? // This is for when the camera is on the same height as the stage, so the name is displayed in the field of view line with a square around it
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                            x: (xBegin + xEnd) / 2 - 35,
                                            y: (yBegin + yEnd) / 2 - 15,
                                            width: "70",
                                            height: "30",
                                            transform: `rotate(${Math.atan((yEnd - yBegin) / (xEnd - xBegin)) * 180 / Math.PI}, ${(xBegin + xEnd) / 2}, ${(yBegin + yEnd) / 2})`,
                                            fill: props.currentId === props.ids[index] ? "tomato" : "darkblue",
                                            rx: "25",
                                            ry: "100"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                            x: (xBegin + xEnd) / 2,
                                            y: (yBegin + yEnd) / 2,
                                            textAnchor: "middle",
                                            alignmentBaseline: "middle",
                                            fontSize: "15",
                                            transform: `rotate(${Math.atan((yEnd - yBegin) / (xEnd - xBegin)) * 180 / Math.PI}, ${(xBegin + xEnd) / 2}, ${(yBegin + yEnd) / 2})`,
                                            fill: props.currentId === props.ids[index] ? "darkblue" : "violet",
                                            children: props.currentId === props.ids[index] ? "You" : nameString
                                        })
                                    ]
                                }) : // This is for when the camera is not on the same height as the stage, the name is displayed in a circle
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                            cx: xEnd,
                                            cy: yEnd,
                                            r: "30",
                                            fill: props.currentId === props.ids[index] ? "tomato" : "violet"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                            x: xEnd,
                                            y: yEnd,
                                            textAnchor: "middle",
                                            alignmentBaseline: "middle",
                                            fontSize: "15",
                                            fill: props.currentId === props.ids[index] ? "darkblue" : "darkblue",
                                            children: props.currentId === props.ids[index] ? "You" : nameString
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: containerWidth && containerHeight && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                className: "absolute",
                                style: {
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                        x: containerWidth / 2,
                                        y: 0 + 20,
                                        textAnchor: "middle",
                                        alignmentBaseline: "middle",
                                        fontSize: "15",
                                        fill: "darkblue",
                                        children: "Back of Stage"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                        x: 0,
                                        y: 0,
                                        width: "20",
                                        height: "20",
                                        fill: "darkblue"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                        x: containerWidth - 20,
                                        y: 0,
                                        width: "20",
                                        height: "20",
                                        fill: "darkblue"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                        x: 0,
                                        y: containerHeight - 20,
                                        width: "20",
                                        height: "20",
                                        fill: "darkblue"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                        x: containerWidth - 20,
                                        y: containerHeight - 20,
                                        width: "20",
                                        height: "20",
                                        fill: "darkblue"
                                    })
                                ]
                            })
                        })
                    })
                ]
            }, index));
        });
        return arr;
    };
    // Return component as an JSX.Element array, to prevent the render children error 
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "",
        children: getJSX()
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StageComp);


/***/ }),

/***/ 5973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _StageComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6205);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1208);
/* harmony import */ var _databaseConnection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6840);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_database__WEBPACK_IMPORTED_MODULE_3__, _databaseConnection__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_database__WEBPACK_IMPORTED_MODULE_3__, _databaseConnection__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





// Create a wrapper for StageComp, where a selectedID is passed, and the data is pulled from the database and passed to the StageComp
// and everytime there is an update in the camera data, using OnValue, the data in the wrapper is updated and passed to the StageComp
// This is done to prevent the StageComp from re-rendering everytime the data is updated, which would cause the StageComp to re-render
// and the camera to be reset to the default position
class Wrapper extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    // Constructor of the wrapper where the xbegin, xeind, ybegin and yend are being stored for every camera
    constructor(selectedId){
        super();
        this.state = {
            selectedId: selectedId["selectedId"],
            ids: [],
            xbegin: [],
            xend: [],
            ybegin: [],
            yend: [],
            sameHeight: [],
            active: [],
            names: [],
            depth: 1 // The depth of the stage
        };
    }
    // Fill all the camera data from the database and get the proportions of the stage
    getCameraData() {
        let activeIds = (0,_databaseConnection__WEBPACK_IMPORTED_MODULE_4__/* .getActiveCamNodeIds */ .Cg)();
        let stageDepth = (0,_databaseConnection__WEBPACK_IMPORTED_MODULE_4__/* .getStageProp */ .eX)();
        let ids_temp = [];
        activeIds.forEach((id)=>{
            ids_temp.push((0,_databaseConnection__WEBPACK_IMPORTED_MODULE_4__/* .getNodeToId */ .xi)(id));
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
        for(let i = 1; i <= ids_temp.length; i++){
            let data = (0,_databaseConnection__WEBPACK_IMPORTED_MODULE_4__/* .getCameraData */ .MJ)(i);
            xbegin.push(data[0]);
            xend.push(data[1]);
            ybegin.push(data[2]);
            yend.push(data[3]);
            sameHeight.push(data[4]);
            active.push(data[5]);
            // Get the name of the camera
            let name = (0,_databaseConnection__WEBPACK_IMPORTED_MODULE_4__/* .getCamName */ .uo)(i);
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
    componentDidMount() {
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.ref)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.getDatabase)(), "cameras"), (snapshot)=>{
            this.getCameraData();
        });
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.ref)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.getDatabase)(), "names"), (snapshot)=>{
            this.getCameraData();
        });
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.ref)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__.getDatabase)(), "stage"), (snapshot)=>{
            this.getCameraData();
        });
        // Update the data when the window is resized
        window.addEventListener("resize", this.getCameraData.bind(this));
    }
    render() {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                console.log(this.state),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_StageComp__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    currentId: this.state.selectedId,
                    ids: this.state.ids,
                    names: this.state.names,
                    beginCoordinates: [
                        this.state.xbegin,
                        this.state.ybegin
                    ],
                    endCoordinates: [
                        this.state.xend,
                        this.state.yend
                    ],
                    sameHeight: this.state.sameHeight,
                    stageDepth: this.state.depth
                })
            ]
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;