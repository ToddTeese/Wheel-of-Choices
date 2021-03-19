class WheelSegment {
    constructor() {
        this.startDegree = 0;
        this.degreeSize = 0;
        this.endDegree = 0;
        this.color = 'blue';
        this.segmentId = 0;
    }

    setArcDegrees(start, degreeSize) {
        this.startDegree = start;
        this.degreeSize = degreeSize;
        this.endDegree = this.startDegree + degreeSize;
    }

    draw(ctx, centerX, centerY, radius, offset) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        // ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, convertToRadians(this.startDegree + offset), convertToRadians(this.startDegree + offset+ this.degreeSize), true);
        // ctx.moveTo(centerX, centerY);
        // ctx.closePath();
        ctx.fill();
    }
}

class Wheel {
    constructor() {
        this.segments = [];
        this.numberOfSegments = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;
        this.colors = ['blue', 'green'];
    }

    setNumberOfSegments(value) {
        this.numberOfSegments = value;
        this.segmentSize = 360 / this.numberOfSegments;

        for(let i = 0; i < value; i++) {
            let newSegment = new WheelSegment();
            newSegment.setArcDegrees((this.segmentSize * i), this.segmentSize);
            let red = Math.floor(Math.random() * 255);
            let blue = Math.floor(Math.random() * 255);
            let green = Math.floor(Math.random() * 255);
            newSegment.color = `rgb(${red},${blue},${green})`;
            newSegment.segmentId = i;
            this.segments.push(newSegment);
        }
    }

    setSegmentsUsingSegmentInput(segmentInputs) {
        this.numberOfSegments = segmentInputs.length;
        this.segmentSize = 360 / this.numberOfSegments;
        this.segments = [];

        for(let i = 0; i < segmentInputs.length; i++) {
            let newSegment = new WheelSegment();
            newSegment.setArcDegrees((this.segmentSize * i), this.segmentSize);
            newSegment.color = segmentInputs[i].color;
            newSegment.segmentId = segmentInputs[i].name;
            this.segments.push(newSegment);
        }
    }

    draw(ctx, offset) {
        for(let i = 0; i< this.segments.length; i++) {
            this.segments[i].draw(ctx, this.centerX, this.centerY, this.radius, offset);
        }


        // draw the ticker above
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        // instead of a rect, draw a polygon triangle
        ctx.moveTo(this.centerX, this.centerY);
        ctx.arc(this.centerX, this.centerY, this.radius + 5, convertToRadians(0), convertToRadians(2), false);
        ctx.moveTo(this.centerX, this.centerY);
        // ctx.closePath();
        ctx.fill();
    }

    getSelectedSegment(offset) {
        let selectedSegmentId = 'None Found';

        for(let i = 0; i < this.segments.length; i++) {

            const selectionStart = (this.segments[i].startDegree);
            const selectionEnd = (this.segments[i].startDegree + this.segments[i].degreeSize);

            if(offset > selectionStart && offset < selectionEnd) {
                selectedSegmentId = this.segments[i].segmentId;
            }
            
        }

        return selectedSegmentId;
    }
}