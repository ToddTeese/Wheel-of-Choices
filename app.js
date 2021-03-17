console.log('App connected Bro!');

const wheelHolder = document.querySelector('.wheelHolder');
const ctx = wheelHolder.getContext('2d');
const options = {width: 600, height: 600, numberOfSegments: 3}; // allow user input on options

wheelHolder.width = options.width;
wheelHolder.height = options.height;
wheelHolder.style.border = 'solid 1px black';

function convertToRadians(degrees) {
    return (Math.PI/180) * degrees;
}

let formInput = document.querySelector('form');
formInput.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Form Event');

    const segments = document.querySelector('#segmentInput').value;
    console.log(segments);
    if(segments) {
        options.numberOfSegments = segments;
        wheelObj.setNumberOfSegments(options.numberOfSegments);
    }
})

let outputText = document.querySelector('#outputText');

let wheelObj = new Wheel();
wheelObj.setNumberOfSegments(options.numberOfSegments);
wheelObj.centerX = options.width / 2;
wheelObj.centerY = options.height / 2;
wheelObj.radius = options.width / 3;

let offset = 0;

wheelObj.draw(ctx, offset);
console.log({wheel: wheelObj});

let start;
let previousTimeStamp;

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

    outputText.innerText = wheelObj.getSelectedSegment(offset);

    offset += 0.05 * delta;
    offset = offset < 360 ? offset :offset % 360;
  
    // if (elapsed < 6000) { // Stop the animation after 2 seconds
      window.requestAnimationFrame(step);
    // }
  }

  window.requestAnimationFrame(step);