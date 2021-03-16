console.log('App connected Bro!');

const wheelHolder = document.querySelector('.wheelHolder');
const ctx = wheelHolder.getContext('2d');
const options = {width: 600, height: 600, numberOfSegments: 10}; // allow user input on options
let colors = ['blue', 'green', 'yellow', 'red', 'cyan', 'seagreen']; // TODO More Colours!

wheelHolder.width = options.width;
wheelHolder.height = options.height;
wheelHolder.style.border = 'solid 1px black';

function convertToRadians(degrees) {
    return (Math.PI/180) * degrees;
}

function drawWheel(ctx, options, colors, offset) {
    const centerX = options.width / 2;
    const centerY = options.height / 2;
    const segmentSize = 360 / options.numberOfSegments;

    for(let i = 0; i < options.numberOfSegments; i++) {
        let start = (segmentSize * i) + offset;
        let end = (start + segmentSize);
        let color = colors[i % colors.length];

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, options.width / 3, convertToRadians(start), convertToRadians(end), false);
        ctx.moveTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
    }
}


let offset = 0;

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

    drawWheel(ctx, options, colors, offset);

    offset += 0.05 * delta;
    offset = offset < 360 ? offset :offset % 360;
  
    if (elapsed < 6000) { // Stop the animation after 2 seconds
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);