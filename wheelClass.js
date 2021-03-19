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
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, convertToRadians(this.startDegree + offset), convertToRadians(this.startDegree + offset + this.degreeSize), false);
        ctx.moveTo(centerX, centerY);
        ctx.closePath();
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

    draw(ctx, offset) {
        for(let i = 0; i< this.segments.length; i++) {
            this.segments[i].draw(ctx, this.centerX, this.centerY, this.radius, offset);
        }


        // draw the ticker above
        ctx.fillStyle = 'black';
        ctx.fillRect(this.centerX - (this.radius / 2), this.centerY - this.radius + 10, 20, 20);
        // instead of a rect, draw a polygon triangle
    }

    getSelectedSegment(offset) {
        let selectedSegmentId;

        for(let i = 0; i < this.segments.length; i++) {
            if((offset) >= this.segments[i].startDegree && (offset) < this.segments[i].endDegree) {
                selectedSegmentId = this.segments[i].segmentId;
            }
        }

        return selectedSegmentId;
    }
}