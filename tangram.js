class TangramGame {

  constructor(duration) {
    this.canvas = document.getElementById("overlay");
    this.ctx = this.canvas.getContext("2d");
    this.svg = null;

    this.gameOverMessage = "You win!";
    this.gameOver = false;

    this.selectedPiece = null;
    this.selectedOffsetX = -1;
    this.selectedOffsetY = -1;
    this.puzzlePieces = [];

    this.timeBar = null;
    this.duration = 59; // seconds
    this.lastTime = -1;
  }

  mouseClick(e) {
    if (this.selectedPiece != null) { // drop it
      var pos = this.selectedPiece.el.getBoundingClientRect();
      var svgpos = client2svg(pos.x, pos.y, this.svg, this.canvas);
      this.selectedPiece.anchor(svgpos);
      this.selectedPiece = null;
      return;
    }

    // pickup
    var clickPos = client2svg(e.clientX, e.clientY, this.svg, this.canvas);
    var selected = null;
    // reverse order because later items display on top of earlier ones
    for (var i = this.puzzlePieces.length-1; i >= 0; i--) {
      const piece = this.puzzlePieces[i];
      if (piece.intersects(clickPos)) {
        this.selectedOffsetX = piece.x - clickPos.x;
        this.selectedOffsetY = piece.y - clickPos.y;
        selected = piece;
        break;
      }
    }

    this.selectedPiece = selected; 
  }

  mouseMove(e) {
    if (this.selectedPiece == null) return;

    // convert from client coordinates to SVG viewport coordinates
    var svgpos = client2svg(e.clientX, e.clientY, this.svg, this.canvas);
    this.selectedPiece.translate(svgpos.x + this.selectedOffsetX, svgpos.y + this.selectedOffsetY); 
  }

  start() {
    const obj = document.getElementById("svgObject");
    const svgDoc = obj.contentDocument;
    if (!svgDoc) {
      console.error("Error: No SVG document found.");
      return;
    }

    this.svg = svgDoc.querySelector("svg");
    this.svg.addEventListener("mousemove", e => { this.mouseMove(e); });
    this.svg.addEventListener("click", e => { this.mouseClick(e); });

    var idx = 0; 
    var x = 200;
    var y = 25;
    var maxsize = 0;
    const puzzleLayer = svgDoc.getElementById("PuzzleLayer");
    
    // assert that puzzle layer does not have a transform on it
    const transform = puzzleLayer.getAttribute("transform");
    if (transform != undefined) console.error("ERROR: Transform on puzzle layer is not supported");

    for (const el of puzzleLayer.children) {
      var piece = new PuzzlePiece(el);
      piece.translate(x, y);
      this.puzzlePieces.push(piece);
      //console.log(`${el.id} ${x} ${y}`);

      x = x + piece.width + 10;
      if (maxsize < piece.height) maxsize = piece.height;

      idx = idx + 1;
      if (idx % 4 == 0) {
        y = y + maxsize + 10;
        x = 200;
      }
    }
    
    // initialize time bar
    const barElement = svgDoc.getElementById("TimebarInterior");
    this.timeBar = new TimeBar(this.svg, barElement, this.duration);
    
    // start puzzle
    this.lastTime = document.timeline.currentTime;
    window.requestAnimationFrame((t) => { this.tick(t); });

    // Initialize canvas for drawing text
    window.addEventListener("resize", (e) => { this.resize(e); } );
    this.resize();
  }

  puzzleSolved() {
    for (const piece of this.puzzlePieces) {
      if (!piece.isHome) return false;
    }
    return true;
  }

  tick(timestamp) {
    const dt = (timestamp - this.lastTime) / 1000.0; // convert from milliseconds to seconds 
    this.lastTime = timestamp;
    
    this.timeBar.tick(dt);
    if (this.timeBar.timeLeft <= 0) {
      this.gameOver = true;
      this.gameOverMessage = "You Lost :(";
      this.draw();
    }

    if (this.puzzleSolved()) {
      this.gameOver = true;
      this.gameOverMessage = "You won! :)";
      this.draw();
    }

    if (!this.gameOver) window.requestAnimationFrame((t) => {this.tick(t); });
  }

  resize() {
    this.canvas.width  = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameOver)
    {
      this.ctx.font = "64px Arial";
      this.ctx.textAlign = "center";
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = "red";
      this.ctx.strokeStyle = "black";
      var halfx = this.canvas.width * 0.5;
      var halfy = this.canvas.height * 0.5;
      this.ctx.fillText(this.gameOverMessage, halfx, halfy);
      this.ctx.strokeText(this.gameOverMessage, halfx, halfy);
    }
  }
}