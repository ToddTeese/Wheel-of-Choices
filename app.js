const wheelHolder = document.querySelector('.wheelHolder');
const outputText = document.querySelector('#outputText');
const ctx = wheelHolder.getContext('2d');
const options = {width: 600, height: 600, numberOfSegments: 2}; // allow user input on options

wheelHolder.width = options.width;
wheelHolder.height = options.height;
wheelHolder.style.border = 'solid 1px black';

const minimumTimeFrame = 4000;
let randomTimeFrame = ((Math.random() * 5) * 1000) + minimumTimeFrame;

let wheelObj = new Wheel();
wheelObj.setNumberOfSegments(options.numberOfSegments);
wheelObj.centerX = options.width / 2;
wheelObj.centerY = options.height / 2;
wheelObj.radius = options.width / 3;


let offset = 0;
let offsetDelta = 0.3;

let start;
let previousTimeStamp;

function convertToRadians(degrees) {
    return (Math.PI/180) * degrees;
}

function spinWheel() {
    console.log('Spin the Wheel!');
    start = undefined;
    previousTimeStamp = undefined;
    randomTimeFrame = ((Math.random() * 5) * 1000) + minimumTimeFrame;
    offset = 0;
    window.requestAnimationFrame(step);
}

let formInput = document.querySelector('form');
// formInput
// colorPicker - Output from that
// segmentInput - Name
// add button
// remove button
class SegmentInput {
    constructor() {
        this.id = 0;
        this.color = `#${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
        this.name = '';
    }
}
let segmentInputs = [new SegmentInput(), new SegmentInput()];


function indexInputs(segmentInputs) {
    for(let i = 0; i < segmentInputs.length; i++) {
        segmentInputs[i].id = i;
    }
    return segmentInputs;
}
function displayInputs(segmentInputs, target) {
    target.innerHTML = '';
    for(let i = 0; i < segmentInputs.length; i++) {
        // div
        let container = document.createElement('div');
        // inside div, color
        let colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = segmentInputs[i].color;
        colorPicker.dataset.index = segmentInputs[i].id;
        colorPicker.onchange = (event) => {
            colorChanged(event);
        }
        container.appendChild(colorPicker);
        // inside div, text
        let textInput = document.createElement('input');
        textInput.dataset.index = segmentInputs[i].id;
        textInput.value = segmentInputs[i].name;
        textInput.onchange = (event) => {
            textChanged(event);
        }
        container.appendChild(textInput);
        // inside div button +
        let addButton = document.createElement('button');
        addButton.dataset.index = segmentInputs[i].id;
        addButton.innerText = '+';
        
        addButton.onclick = (event) => {
            addSegment(event);
        }
        container.appendChild(addButton);
        // inside div button -
        let deleteButton = document.createElement('button');
        deleteButton.dataset.index = segmentInputs[i].id;
        deleteButton.onclick = (event) => {
            removeSegment(event);
        }
        deleteButton.innerText = '-';
        container.appendChild(deleteButton);

        target.appendChild(container);
    }
}
function addSegment(event) {
    console.log(event.target);
    segmentInputs.push(new SegmentInput());
    indexInputs(segmentInputs);
    displayInputs(segmentInputs, formInput);
}
function removeSegment(event) {
    console.log(event.target);
    const index = event.target.dataset.index;
    segmentInputs.splice(index, 1);
    if(segmentInputs.length == 0) {
        segmentInputs.push(new SegmentInput());
    }
    indexInputs(segmentInputs);
    displayInputs(segmentInputs, formInput);
}
function colorChanged(event) {
    const index = event.target.dataset.index;
    const value = event.target.value;
    segmentInputs[index].color = value;
    wheelObj.setSegmentsUsingSegmentInput(segmentInputs);
    wheelObj.draw(ctx, offset);
}
function textChanged(event) {
    // change the text in the segment
    const index = event.target.dataset.index;
    const value = event.target.value;
    segmentInputs[index].name = value;
    wheelObj.setSegmentsUsingSegmentInput(segmentInputs);
    wheelObj.draw(ctx, offset);
}


indexInputs(segmentInputs);
displayInputs(segmentInputs, formInput);
wheelObj.setSegmentsUsingSegmentInput(segmentInputs);
wheelObj.draw(ctx, offset);


wheelObj.draw(ctx, offset);
console.log({wheel: wheelObj});

function step(timestamp) {

    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;

    let delta = 0;
    // delta is currentTimeStamp - previousTimeStamp;
    if(previousTimeStamp) {
        delta = timestamp - previousTimeStamp;
    }
    previousTimeStamp = timestamp;

    wheelObj.draw(ctx,offset);

    outputText.innerText = "Selected Option : " + wheelObj.getSelectedSegment(offset);

    offset += offsetDelta * delta;
    offset = offset < 360 ? offset :offset % 360;

    // offset change should be reduced as elapsed comes closer to the end of the randomTimeFrame;

    const timeDelta = randomTimeFrame - elapsed;

    if(timeDelta < 3000) {
        offsetDelta = (timeDelta / 10000);
    } else {
        offsetDelta = 0.3; // default accel
    }

  
    if (elapsed < randomTimeFrame) { // Stop the animation after 2 seconds
      window.requestAnimationFrame(step);
    }
  }

window.requestAnimationFrame(step);