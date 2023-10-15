let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let renderAmount = 1000; // number of renders to perform

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
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

    // Convert colour to HSL - store hue, saturation and ligtness in variables
    colorMode(RGB, 255);
    let pix = sourceImg.get(x, y);
    let col = color(pix);
    let h = hue(col);
    let s = saturation(col);
    let l = lightness(col);
    colorMode(HSL, 360, 100, 100);
    
    const holdColour = color(h, s*1.5, l); // colour for wall holds, the same but with increased saturation
    const wallColour = color(h, 0, l/2);   // wall colour, no saturation and half as light

    let mask = maskImg.get(x, y);

    let gradientHue = map(y, 0, sourceImg.height, 0, 360); // maps hue to the height of the image, creating a full rainbow from top to bottom
    let gradientColour = color(gradientHue, 100, 30);      // create a colour using the hue
    

    if(mask[0] > 128) {

      // once the first half of the rendering is complete, render the holds using points with the hold colour.

      if(renderCounter>renderAmount*0.5){ 
        push();
        
        translate(x, y);
        strokeWeight(5);
        stroke(holdColour);
        point(0,0)

        pop();
      }

      // between 4/10 and 5/10 through the render, fill the hold spaces with randomly rotated crosses (creates a fuzzy effect)
      // perform this twice, first shifted down to the right, then shifted up to the left, creating an outline effect
      // hues closer to red will have black crosses, hues closer to green will have white crosses
      // if the saturation is too low or the lightness is too extreme, use grey crosses

      if(renderCounter<renderAmount*0.5 && renderCounter > renderAmount*0.4){ // 
        
        if(((h > 270 && h < 360) || (h > 0 && h < 45)) && s > 5 && l > 10 && l < 90) {
          stroke(0, 0, 0);
        } else if (h > 45 && h < 270 && s > 5 && l > 10 && l < 90) {
          stroke(0, 0, 100);
        } else {
          stroke(0, 0, 50);
        }

        push();

        angleMode(DEGREES);
        translate(x+5, y+5);
        rotate(random(360));
        strokeWeight(1);

        line(-5, 0, 5, 0);
        line(0, -5, 0, 5);

        pop();

        push();

        angleMode(DEGREES);
        translate(x-5, y-5);
        rotate(random(360));
        strokeWeight(1);

        line(-5, 0, 5, 0);
        line(0, -5, 0, 5);

        pop();
      }

      // between 3/10 and 4/10 through the render, fill the hold spaces with randomly rotated crosses (creates a fuzzy effect)
      // perform this twice, first shifted down to the right, then shifted up to the left, creating an outline effect
      // use the rainbow gradient colour

      if(renderCounter<renderAmount*0.4 && renderCounter > renderAmount*0.3){ 
        
        stroke(gradientColour);

        push();

        angleMode(DEGREES);
        translate(x+5, y+5);
        rotate(random(360));
        strokeWeight(1);

        line(-10, 0, 10, 0);
        line(0, -10, 0, 10);

        pop();

        push();

        angleMode(DEGREES);
        translate(x-5, y-5);
        rotate(random(360));
        strokeWeight(2);

        line(-10, 0, 10, 0);
        line(0, -10, 0, 10);

        pop();
      }

    }    
    // for the first 3/10 of the render draw the background with randomly rotated crosses (creates a fuzzy effect)
    else {
      if(renderCounter<renderAmount*0.3){ 
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
  if(renderCounter > renderAmount) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    //saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
