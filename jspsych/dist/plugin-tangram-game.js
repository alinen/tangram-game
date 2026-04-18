class TimeBar{constructor(t,s,i){this.svg=t,this.el=s,this.timeLeft=i??99999,this.duration=i,this.etime=0}elapsedTime(){return this.etime}tick(t){if(this.etime+=t,this.duration!=null){this.timeLeft=Math.max(0,this.timeLeft-t);var s=this.timeLeft/this.duration,i=s*this.svg.viewBox.baseVal.width;this.el.setAttribute("width",i)}}}function safeset(a,t){if(typeof a!=typeof t)console.warn("Tangram Puzzle: Invalid input type ",a);else if(a!=null)return a;return t}function client2svg(a,t,s,i){var e=s.viewBox.baseVal;if(i.height<e.height)var r=e.width/e.height*i.height,n=t/i.height*e.height,h=(a-(i.width-r)/2)/r*e.width;else var l=e.height/e.width*i.width,h=a/i.width*e.width,n=(t-(i.height-l)/2)/l*e.height;return{x:h,y:n}}function easeInOutSine(a){return-(Math.cos(Math.PI*a)-1)/2}function svgComputePath(a){var t=[],s=0,i="\0";const e=["m","M","l","L","h","H","v","V","z","Z"],n=a.getAttribute("d").replaceAll(","," ").split(" ");for(;s<n.length;)if(e.includes(n[s]))i=n[s++];else if(["m","M","l","L"].includes(i)){var h=Number(n[s++]),l=Number(n[s++]);if(t.length==0||i=="M"||i=="L")t.push({x:h,y:l});else if(i=="m"||i=="l"){var o=t[t.length-1];t.push({x:o.x+h,y:o.y+l})}}else{var o=t[t.length-1],c=Number(n[s++]);i=="h"?t.push({x:o.x+c,y:o.y}):i=="H"?t.push({x:c,y:o.y}):i=="v"?t.push({x:o.x,y:o.y+c}):i=="V"&&t.push({x:o.x,y:c})}return t}const jsPsychTangramDefaultPuzzleSVG=`
  <svg
    id="svgObject"
    preserveAspectRatio="xMidYMid meet"
    width="600"
    height="300"
    viewBox="-1 0 600 300"
    version="0.1"
    id="svg5"
    xmlns="http://www.w2.org/2000/svg"
    xmlns:svg="http://www.w2.org/2000/svg">
    <g id="PuzzleLayer" >
      <path
        style="opacity:1;fill:#ff7676;fill-opacity:1;stroke:none;stroke-width:1.36277"
        d="M 90.226414,119.66329 159.36499,51.524708 H 23.087838 Z"
        id="T0"
        />
      <path
        style="opacity:1;fill:#6265ff;fill-opacity:1;stroke:none;stroke-width:1.36277"
        d="m 90.670314,119.87647 -68.138566,-68.138572 -2e-5,136.277162 z"
        id="T1"
        />
      <path
        style="opacity:1;fill:#ffcc4d;fill-opacity:1;stroke:none;stroke-width:1.36277"
        d="m 88.815574,188.0532 68.138596,-68.1386 v 68.1386 z"
        id="T2"
        />
      <path
        style="opacity:1;fill:#ff49e1;fill-opacity:1;stroke:none;stroke-width:2.72554;stroke-linecap:butt;stroke-opacity:1"
        d="m 91.128774,119.77587 -34.069285,34.06929 68.138571,1e-5 z"
        id="T3"
        />
      <path
        style="opacity:1;fill:#66fff4;fill-opacity:1;stroke:none;stroke-width:1.36277"
        d="M 57.163263,153.52636 H 126.30185 L 92.232554,187.59565 H 24.093973 Z"
        id="P"
        />
      <path
        style="opacity:1;fill:#ad54ff;fill-opacity:1;stroke:none;stroke-width:1.36277"
        d="m 123.11366,86.437446 34.0693,34.069304 V 52.368146 Z"
        id="T4"
        />
      <path
        style="opacity:1;fill:#66ff43;fill-opacity:1;stroke:none;stroke-width:2.72554;stroke-linecap:butt;stroke-opacity:1"
        d="m 89.799844,119.61315 34.069296,-34.069304 34.0693,34.069304 -34.0693,34.06929 z"
        id="S"
        />
    </g>
    <g
      id="OutlineLayer"
      transform="translate(0,0)">
      <path
        style="fill:none;stroke:#000000;stroke-opacity:1;stroke-width:2;stroke-dasharray:none"
        d="M 21.964458,49.973559 H 157.43098 V 187.87035 H 22.278404 Z"
        id="path4008" />
    </g>
    <g
      id="TimebarLayer"
      style="image-rendering:auto">
      <rect
        style="fill:#00b500;fill-opacity:1;stroke:none;stroke-width:2.90695;stroke-dasharray:none;stroke-opacity:1"
        id="TimebarInterior"
        width="599"
        height="9"
        x="-1"
        y="289"
        />
      <rect
        style="fill:none;fill-opacity:0;stroke:#000000;stroke-width:1.45347;stroke-dasharray:none;stroke-opacity:1"
        id="TimebarOutline"
        width="599"
        height="9"
        x="-1"
        y="289"
        />
    </g>
  </svg>
`;class TangramPiece{static threshold=20;static duration=1;static NONE=0;static DRAG=1;static ANIMATE=2;static ResetPieces=!0;constructor(t){this.el=t,this.el.transform.baseVal.numberOfItems!=0&&console.error("ERROR: Unsuppported transform type in puzzle piece."),this.points=svgComputePath(this.el);var i="M ";this.x=this.el.getBBox().x,this.y=this.el.getBBox().y;for(var e=0;e<this.points.length;e++)this.points[e].x-=this.x,this.points[e].y-=this.y,i+=`${this.points[e].x} ${this.points[e].y} `;i+="Z",this.el.setAttribute("d",i),this.width=this.el.getBBox().width,this.height=this.el.getBBox().height,this.targetx=this.x,this.targety=this.y,this.isAtTarget=!1,this.selectedOffsetX=-1,this.selectedOffsetY=-1,this.state=TangramPiece.NONE,this.translate(this.x,this.y)}initPosition(t,s){this.startx=t,this.starty=s,this.translate(t,s)}translate(t,s){this.x=t,this.y=s;var i=`translate(${t} ${s})`;this.el.setAttribute("transform",i)}closeTo(t,s,i){var e=(t.x-s)*(t.x-s)+(t.y-i)*(t.y-i);return e<TangramPiece.threshold*TangramPiece.threshold}transformPoint(t){return{x:t.x+this.x,y:t.y+this.y}}drop(t){this.state==TangramPiece.DRAG&&(this.closeTo(t,this.targetx,this.targety)?(this.translate(this.targetx,this.targety),this.el.removeAttribute("filter"),this.isAtTarget=!0):(this.isAtTarget=!1,TangramPiece.ResetPieces?this.animate(t):(this.translate(t.x,t.y),this.el.removeAttribute("filter"))))}drag(t){this.state==TangramPiece.DRAG&&this.translate(t.x+this.selectedOffsetX,t.y+this.selectedOffsetY)}pickup(t){this.state==TangramPiece.NONE&&(this.el.setAttribute("filter","drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"),this.selectedOffsetX=this.x-t.x,this.selectedOffsetY=this.y-t.y,this.state=TangramPiece.DRAG)}checkTriangleIntersection(t,s,i,e){var r=(i.y-e.y)*(t.x-e.x)+(e.x-i.x)*(t.y-e.y),n=(i.y-e.y)*(s.x-e.x)+(e.x-i.x)*(s.y-e.y),h=r/n;if(h<0||h>1)return!1;var l=(e.y-s.y)*(t.x-e.x)+(s.x-e.x)*(t.y-e.y),o=(i.y-e.y)*(s.x-e.x)+(e.x-i.x)*(s.y-e.y),c=l/n;if(c<0||c>1)return!1;var d=1-h-c;return!(d<0||d>1)}intersects(t){const s=this.points.length;for(var i=this.transformPoint(this.points[0]),e=1;e<s-1;e++){var r=this.transformPoint(this.points[e+0]),n=this.transformPoint(this.points[e+1]);if(this.checkTriangleIntersection(t,i,r,n))return!0}return!1}tick(t){if(this.state==TangramPiece.ANIMATE)if(this.elapsedTime+=t,this.elapsedTime<TangramPiece.duration){var s=this.elapsedTime/TangramPiece.duration,i=easeInOutSine(s),e=this.dropx*(1-i)+this.startx*i,r=this.dropy*(1-i)+this.starty*i;this.translate(e,r)}else this.translate(this.startx,this.starty),this.el.removeAttribute("filter"),this.state=TangramPiece.NONE}animate(t){this.dropx=t.x,this.dropy=t.y,this.elapsedTime=0,this.state=TangramPiece.ANIMATE}}class TangramGame{constructor(){this.canvas=document.getElementById("overlay"),this.ctx=this.canvas.getContext("2d"),this.svg=null,this.duration=null,this.successMessage="You won!",this.failureMessage="You lost!",this.gameOverMessage="",this.gameOver=!1,this.finished=!1,this.initialized=!1,this.clickCount=0,this.timeToFirstClick=-1,this.missDropCount=0,this.percentComplete=0,this.piecesSolved="",this.selectedPiece=null,this.puzzlePieces=[],this.timeBar=null,this.lastTime=-1,this.interactionSound="",this.successSound="",this.failureSound="",this.endGameDelay=3,this.overlayImage="",this.overlayImagePosition="",this.overlayImageWidth=30,this.overlayIcon=null,window.addEventListener("resize",t=>{this.resize(t)}),this.resize()}mouseClick(t){if(!this.gameOver){if(this.timeToFirstClick===-1&&(this.timeToFirstClick=this.timeBar.elapsedTime()),this.clickCount++,this.selectedPiece!=null){var s=this.selectedPiece.el.getBoundingClientRect(),i=client2svg(s.x,s.y,this.svg,this.canvas);this.selectedPiece.drop(i),this.selectedPiece.isAtTarget||this.missDropCount++,this.soundEffect!==null&&this.soundEffect.play(),this.selectedPiece=null;return}var e=client2svg(t.clientX,t.clientY,this.svg,this.canvas);this.selectedPiece=null;for(var r=this.puzzlePieces.length-1;r>=0;r--){const n=this.puzzlePieces[r];if(n.intersects(e)){this.selectedPiece=n,this.selectedPiece.pickup(e),this.soundEffect!==null&&this.soundEffect.play();break}}}}mouseMove(t){if(this.selectedPiece!=null){var s=client2svg(t.clientX,t.clientY,this.svg,this.canvas);this.selectedPiece.drag(s)}}start(){const t=document.getElementById("svgObject");var s=t.contentDocument;if(s||(console.warn("Error: No SVG document loaded. Reverting to default puzzle."),t.removeAttribute("id"),t.removeAttribute("data"),t.removeAttribute("preserveAspectRatio"),t.innerHTML=jsPsychTangramDefaultPuzzleSVG,s=document),this.svg=s.querySelector("svg"),this.svg===null){console.error("Cannot load SVG.");return}this.svg.addEventListener("mousemove",d=>{this.mouseMove(d)}),this.svg.addEventListener("click",d=>{this.mouseClick(d)});var i=0,e=275,r=25,n=0;const h=s.getElementById("PuzzleLayer");h.getAttribute("transform")!=null&&console.error("ERROR: Transform on puzzle layer is not supported");for(const d of h.children){var o=new TangramPiece(d);e+o.width>600&&(r=r+n+10,e=275,n=0),o.initPosition(e,r),this.puzzlePieces.push(o),e=e+o.width+10,n<o.height&&(n=o.height),i=i+1}this.initialized=!0,this.soundEffect=null,this.interactionSound!==""&&(this.soundEffect=new Audio(this.interactionSound)),this.winSound=null,this.successSound!==""&&(this.winSound=new Audio(this.successSound),this.winSound.addEventListener("ended",d=>{this.finished=!0})),this.loseSound=null,this.failureSound!==""&&(this.loseSound=new Audio(this.failureSound),this.loseSound.addEventListener("ended",d=>{this.finished=!0})),this.overlayIcon=null,this.overlayImage!==""&&(this.overlayIcon=new Image,this.overlayIcon.src=this.overlayImage);const c=s.getElementById("TimebarInterior");this.timeBar=new TimeBar(this.svg,c,this.duration),this.lastTime=document.timeline.currentTime,window.requestAnimationFrame(d=>{this.tick(d)})}puzzleSolved(){for(const t of this.puzzlePieces)if(!t.isAtTarget)return!1;return!0}computePuzzleCompletionStats(){var t=0,s="",i="";for(const e of this.puzzlePieces)e.isAtTarget&&(t++,s+=i+e.el.id,i=",");this.percentComplete=t/this.puzzlePieces.length,this.piecesSolved=s}tick(t){const s=(t-this.lastTime)/1e3;this.lastTime=t;for(var i of this.puzzlePieces)i.tick(s);if(this.timeBar.tick(s),this.timeBar.timeLeft<=0){if(this.selectedPiece){var e=this.selectedPiece.el.getBoundingClientRect(),r=client2svg(e.x,e.y,this.svg,this.canvas);this.selectedPiece.drop(r),this.selectedPiece=null}this.gameOver=!0,this.gameOverMessage=this.failureMessage,this.loseSound!==null?this.loseSound.play():setTimeout(()=>{this.finished=!0},this.endGameDelay*1e3),this.computePuzzleCompletionStats()}this.puzzleSolved()&&(this.gameOver=!0,this.gameOverMessage=this.successMessage,this.winSound!==null?this.winSound.play():setTimeout(()=>{this.finished=!0},this.endGameDelay*1e3),this.computePuzzleCompletionStats()),this.draw(),this.gameOver||window.requestAnimationFrame(n=>{this.tick(n)})}resize(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.draw()}draw(){if(this.initialized?this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height):(this.ctx.fillStyle="#ffffff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)),this.overlayIcon){var t=this.overlayIcon.width,s=this.overlayIcon.height,i=s/t,e=5,r=5;this.overlayImagePosition==="TOP_RIGHT"&&(e=this.canvas.width-this.overlayImageWidth-5),this.ctx.drawImage(this.overlayIcon,e,r,this.overlayImageWidth,this.overlayImageWidth*i)}if(this.gameOver){this.ctx.font="64px Arial",this.ctx.textAlign="center",this.ctx.lineWidth=2;var n=Math.abs(this.percentComplete-1);n<.001?(this.ctx.fillStyle="#00AA00",this.ctx.strokeStyle="black"):(this.ctx.fillStyle="red",this.ctx.strokeStyle="black");var h=this.canvas.width*.5,l=this.canvas.height*.5;this.ctx.fillText(this.gameOverMessage,h,l),this.ctx.strokeText(this.gameOverMessage,h,l)}}}var jsPsychTangram=function(a){"use strict";const t={name:"tangram",version:"0.1.0",parameters:{svg:{type:a.ParameterType.STRING,default:""},interactionSound:{type:a.ParameterType.STRING,default:""},successSound:{type:a.ParameterType.STRING,default:""},failureSound:{type:a.ParameterType.STRING,default:""},successMessage:{type:a.ParameterType.STRING,default:"You won!"},failureMessage:{type:a.ParameterType.STRING,default:"You lose."},resetPieces:{type:a.ParameterType.BOOLEAN,default:!0},resetPieceDuration:{type:a.ParameterType.Float,default:1},dropThreshold:{type:a.ParameterType.INT,default:9},duration:{type:a.ParameterType.INT,default:60},overlayImage:{type:a.ParameterType.STRING,default:""},overlayImagePosition:{type:a.ParameterType.STRING,default:"TOP_RIGHT"}},data:{solve_duration:{type:a.ParameterType.FLOAT},puzzle_solved:{type:a.ParameterType.FLOAT},pieces_solved:{type:a.ParameterType.FLOAT},num_total_clicks:{type:a.ParameterType.INT},num_piece_drops:{type:a.ParameterType.INT},first_click_time:{type:a.ParameterType.FLOAT}},citations:{}};class s{constructor(e){this.jsPsych=e,this.tangram=null}trial(e,r,n){if(this.display=e,this.params=r,this.add_css(),this.add_html(),TangramPiece.duration=safeset(r.resetPieceDuration,1),TangramPiece.ResetPieces=safeset(r.resetPieces,!0),TangramPiece.threshold=safeset(r.dropThreshold,20),this.tangram=new TangramGame,this.tangram.duration=safeset(r.duration,60),this.tangram.successMessage=safeset(r.successMessage,"You won!"),this.tangram.failureMessage=safeset(r.failureMessage,"You lose."),this.tangram.interactionSound=safeset(r.interactionSound,""),this.tangram.successSound=safeset(r.successSound,""),this.tangram.failureSound=safeset(r.failureSound,""),this.tangram.overlayImage=safeset(r.overlayImage,""),this.tangram.overlayImagePosition=safeset(r.overlayImagePosition,"TOP_RIGHT"),this.tangram.overlayImageWidth=safeset(r.overlayImageWidth,30),r.svg!==""){const o=document.getElementById("svgObject");o.onload=()=>{this.tangram.start()}}else this.tangram.start();const h=()=>{typeof keyboardListener<"u"&&this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener),document.querySelector("#tangram-styles").remove(),document.querySelector("#container").remove();var o={solve_duration:this.tangram.timeBar.elapsedTime(),puzzle_solved:this.tangram.percentComplete,pieces_solved:this.tangram.piecesSolved,num_total_clicks:this.tangram.clickCount,num_piece_drops:this.tangram.missDropCount,first_click_time:this.tangram.timeToFirstClick};this.jsPsych.finishTrial(o)};var l=setInterval(()=>{this.tangram.finished&&(h(),clearInterval(l))},3e3)}add_css(){document.querySelector("head").insertAdjacentHTML("beforeend",`<style id="tangram-styles">
          html, body {
            margin: 0;
            width: 100%;
            height: 100%;
          }

          #container {
            position: absolute;
            width: 100vw;
            height: 100vh;
          }

          #svgObject, #overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          #overlay {
            pointer-events: none; /* clicks go to SVG */
          }
        </style>`)}add_html(){document.querySelector("body").insertAdjacentHTML("beforeend",`<div id="container">
          <object id="svgObject"
                  type="image/svg+xml"
                  data="${this.params.svg}"
                  preserveAspectRatio="xMidYMid meet">
          </object>
        </div> `),document.querySelector("#container").insertAdjacentHTML("beforeend",'<canvas id="overlay"></canvas>')}}return s.info=t,s}(jsPsychModule);
//# sourceMappingURL=plugin-tangram-game.js.map
