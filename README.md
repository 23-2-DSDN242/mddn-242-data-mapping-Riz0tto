[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fhdOjw6q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11955001&assignment_repo_type=AssignmentRepo)
## Creative Coding 2: Custom Pixel

The images above are photos of Wellington CBD algorithmically processed with a lightly modified version of the [p5.js Pointillism example](https://p5js.org/examples/image-pointillism.html). The masks for each photo highlight various objects. Replace this text with your own which explains the source of your photos, masking, and applied algorithm.


Ideas:

My initial idea for this project was simply to mask out people and create a sort of hologram effect. This was inspired by the lack of real contact we had during the Covid lockdowns, where I attended courses online through Zoom. I had a couple problems with this first idea. It wasn't a very creative approach to the assignment and getting the AI to find people in my images didn't seem very unique. So I started looking for other options. I considered using shadows of people as the mask instead, which is a little more interesting but could be a struggle for the AI. Shadows are very non-uniform and the angle of the sun, pose of the person, angle of the camera, and position of the shadow in the image, could all vary greatly. Next I considered doing footprints in sand, which would be more uniform and would stand out against the background. This however seemed too simple and I was worried all the images would look roughly the same. Finally, I decided to take pictures of indoor climbing walls. While the holds on these walls vary in shape and colour, they all stand out from the wall clearly. This made me think that the AI would be able to mask them out by at the very least identifying that the wall was separate.

Training Images:

I took photos of various climbing walls at Fergs Kayaks in Wellington. It was difficult, as there were other climbers in the gym at the time, so I had to avoid getting anyone in frame. This meant that the images I took were mostly close ups of the walls. The quality of my phone camera also had an impact. The photos are fairly low contrast and not very sharp, which means that some holds almost blend into the wall. For the training images, I chose three photos that had a range of hold sizes, colours, and shapes. My hope was to prevent the AI from missing holds because they didn't fit a certain shape, colour or arrangement. In one of the training images the wall itself has a few different colours and there is another wall in the background. Which I figured would help the AI not associate my mask purely with colour or depth.

AI Results:

To my surprise the AI did an almost perfect job with the first new mask it created. It missed a few smaller holds but crucially it didn't highlight the coloured tape that was also on the wall, and for most of the holds it was very accurate. I continued to process a few more images through the AI, all of which came out very well, except that one had missed a lot of holds on the wall. This image was unique in that it was taken relatively far away from the wall, so compared to my training images some of the holds were extremely small. I decided to experiment further with this image by cropping it down into four sections and processing each separately. This allowed the AI to find much more of the holds and I recombined the image in Photoshop to see the difference. If the images had recombined cleaner I would have used it as one of my outputs but the edges didn't align cleanly.

Developing the Filter:

Now that I had my masks, I started work on the pixel filter. To start with I created the background by drawing small crosses with random rotations in a grayscale version of the background colour. Using small crosses like this creates a sort of fuzzy effect that I ended up using for other elements as well. Next I filled in the holds using points with their actual colour. I wanted them to stand out more by giving them an outline. This was the first challenge as I wasn't sure if I'd need to find the edges of the mask somehow, or how I'd get everything to layer correctly. My solution was to draw each element in layers by creating conditions around them being at certain points through the render. To create the outline effect, I fill in the holds with a rainbow gradient twice, shifted diagonally in opposite directions. Then the holds would be drawn over the top. 

This gave me the idea for an actual application for my filter - separating colours by using different outlines to help differentiate them for colour blind people. My friend that I climb with has red-green colour blindness and sometimes struggles to tell which holds they can use on certain climbs. I investigated which colours would be the most difficult to differentiate with different types of colour blindness. Then by checking the hue of a pixel in a hold I could change the outline effect. Unfortunately due to the poor colour, contrast, saturation, and lighting of my photos this didn't work very well unless I used broad ranges in the hue to separate the colours. In the end I separated just the colours closer to red from the colours closer to green. This works well enough as a proof of concept. These are separated into either having a black outline (redder), white outline (greener), or a grey outline (too low saturation). 

Overall, the effect works well enough in my opinion to create some useful differentiation. In particular separating yellow from a slightly greener 'fluoro yellow', which my friend personally struggles with. If this filter, in combination with AI, could run in realtime it could have real application in something like a mixed reality device to allow someone with colour blindness to differentiate holds. It could also easily be generalised to any type of colour blindness and applied to other scenarios.

Final Result:

I wasn't expecting to create something with an actual application but I'm so glad that I did. While the actual result could be cleaner I believe that the AI did a great job of identifying the holds, it was mostly the low quality of the images that complicated things. With better images and more accurate colour separation I think this would be a much better filter.




