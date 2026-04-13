# Tangram-game

A child-friendly tangram game with click-and-click interface and potential for custom puzzles.

![Tangram Game Demo](Tangram-demo.gif "Tangram Demo")

This game has been written to be a [jsPsych plugin](https://github.com/jspsych/jspsych-contrib). The documentation is [here](plugin-tangram-game.md).

# How to run

You will need to run a webserver to preview the game locally. 
If you're using VSCode you can install the Live Server extension. This will
also act as a web server for running. Otherwise, you can launch a server from the 
command line.

## With Python

`python -m http.server 8000`

Then go to `http://127.0.0.1:8000/` in your browser and select `http://127.0.0.1:8000/tangram-jspsych.html`

## With Node.js

`http-server -c10`

# Development notes

To generate the favicon.ico: 

`convert -background transparent "tangram.png" -define icon:auto-resize=16,24,32,48,64,72,96,128,256 "favicon.ico"`


