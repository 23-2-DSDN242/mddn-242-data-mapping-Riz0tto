let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile   = "mask_3.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

function draw () {
  for(let i=0;i<4000;i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));

    colorMode(RGB, 255);
    let pix = sourceImg.get(x, y);
    let col = color(pix);
    let h = hue(col);
    let s = saturation(col);
    let l = lightness(col);
    colorMode(HSL, 360, 100, 100);
    
    const holdColour = color(h, s*1.5, l);
    const wallColour = color(h, 0, l/2);

    let mask = maskImg.get(x, y);

    let gradientHue = map(y, 0, sourceImg.height, 0, 360);
    let gradientColour = color(gradientHue, 100, 30, 0.1); 
    

    if(mask[0] > 128) {

      if(renderCounter>200){
        push();
        
        translate(x, y);
        strokeWeight(3);
        stroke(holdColour);
        point(0,0)

        pop();
      }


      if(renderCounter<200 && renderCounter > 100){
        push();

        angleMode(DEGREES);
        translate(x+10, y+10);
        rotate(random(360));
        strokeWeight(1);
        stroke(gradientColour);
        line(-10, 0, 10, 0);
        line(0, -10, 0, 10);

        pop();

        push();

        angleMode(DEGREES);
        translate(x-10, y-10);
        rotate(random(360));
        strokeWeight(1);
        stroke(gradientColour);
        line(-10, 0, 10, 0);
        line(0, -10, 0, 10);

        pop();
      }

    }
    else {
      if(renderCounter<100){
        push();
        angleMode(DEGREES);
        translate(x, y);
        rotate(random(360));
        strokeWeight(1);
        stroke(wallColour);
        line(-5, 0, 5, 0);
        line(0, -5, 0, 5);
        pop();
      }
    }
  }
  renderCounter = renderCounter + 1;
  if(renderCounter > 400) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
