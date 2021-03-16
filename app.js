console.log('App connected Bro!');

const wheelHolder = document.querySelector('.wheelHolder');

console.log(wheelHolder);

// so, what's the idea of this?
// it's basically creation of options based on some form of delimiters
//
// also, how do I make a segmented circle easily?
// I think..... canvas?
// with canvas I can use the radial method and build up segments
// 

wheelHolder.width = 600;
wheelHolder.height = 600;
wheelHolder.style.border = 'solid 1px black';

// yeah this is going to be a job for arcs

// arcTo (x1, y1, x2, y2, radius)
//