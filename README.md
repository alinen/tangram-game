# Tangram-game

![Tangram Game Demo](Tangram-demo.gif "Tangram Demo")

# How to run

You will need to run a webserver to preview the game locally. I recommend using python's built in web server. Launch it from the main directory of this repository like so:

`python -m http.server 8000`

Then go to `http://127.0.0.1:8000/` in your browser and select `http://127.0.0.1:8000/tangram-jspsych.html`

# Development notes
To generate favicon.ico: 

`convert -background transparent "tangram.png" -define icon:auto-resize=16,24,32,48,64,72,96,128,256 "favicon.ico"`
