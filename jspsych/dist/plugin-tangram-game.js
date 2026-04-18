class TimeBar{constructor(t,i,s){this.svg=t,this.el=i,this.timeLeft=s??99999,this.duration=s,this.etime=0}elapsedTime(){return this.etime}tick(t){if(this.etime+=t,this.duration!=null){this.timeLeft=Math.max(0,this.timeLeft-t);var i=this.timeLeft/this.duration,s=i*this.svg.viewBox.baseVal.width;this.el.setAttribute("width",s)}}}function safeset(r,t){if(typeof r!=typeof t)console.warn("Tangram Puzzle: Invalid input type ",r);else if(r!=null)return r;return t}function client2svg(r,t,i,s){var e=i.viewBox.baseVal,a=e.height/e.width*s.width,n=r/s.width*e.width,h=(t-(s.height-a)/2)/a*e.height;return{x:n,y:h}}function easeInOutSine(r){return-(Math.cos(Math.PI*r)-1)/2}function svgComputePath(r){var t=[],i=0,s="\0";const e=["m","M","l","L","h","H","v","V","z","Z"],n=r.getAttribute("d").replaceAll(","," ").split(" ");for(;i<n.length;)if(e.includes(n[i]))s=n[i++];else if(["m","M","l","L"].includes(s)){var h=Number(n[i++]),d=Number(n[i++]);if(t.length==0||s=="M"||s=="L")t.push({x:h,y:d});else if(s=="m"||s=="l"){var o=t[t.length-1];t.push({x:o.x+h,y:o.y+d})}}else{var o=t[t.length-1],c=Number(n[i++]);s=="h"?t.push({x:o.x+c,y:o.y}):s=="H"?t.push({x:c,y:o.y}):s=="v"?t.push({x:o.x,y:o.y+c}):s=="V"&&t.push({x:o.x,y:c})}return t}const jsPsychTangramDefaultPuzzleSVG=`
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
`;class TangramPiece{static threshold=20;static duration=1;static NONE=0;static DRAG=1;static ANIMATE=2;static ResetPieces=!0;constructor(t){this.el=t,this.el.transform.baseVal.numberOfItems!=0&&console.error("ERROR: Unsuppported transform type in puzzle piece."),this.points=svgComputePath(this.el);var s="M ";this.x=this.el.getBBox().x,this.y=this.el.getBBox().y;for(var e=0;e<this.points.length;e++)this.points[e].x-=this.x,this.points[e].y-=this.y,s+=`${this.points[e].x} ${this.points[e].y} `;s+="Z",this.el.setAttribute("d",s),this.width=this.el.getBBox().width,this.height=this.el.getBBox().height,this.targetx=this.x,this.targety=this.y,this.isAtTarget=!1,this.selectedOffsetX=-1,this.selectedOffsetY=-1,this.state=TangramPiece.NONE,this.translate(this.x,this.y)}initPosition(t,i){this.startx=t,this.starty=i,this.translate(t,i)}translate(t,i){this.x=t,this.y=i;var s=`translate(${t} ${i})`;this.el.setAttribute("transform",s)}closeTo(t,i,s){var e=(t.x-i)*(t.x-i)+(t.y-s)*(t.y-s);return e<TangramPiece.threshold*TangramPiece.threshold}transformPoint(t){return{x:t.x+this.x,y:t.y+this.y}}drop(t){this.state==TangramPiece.DRAG&&(this.closeTo(t,this.targetx,this.targety)?(this.translate(this.targetx,this.targety),this.el.removeAttribute("filter"),this.isAtTarget=!0):(this.isAtTarget=!1,TangramPiece.ResetPieces?this.animate(t):(this.translate(t.x,t.y),this.el.removeAttribute("filter"))))}drag(t){this.state==TangramPiece.DRAG&&this.translate(t.x+this.selectedOffsetX,t.y+this.selectedOffsetY)}pickup(t){this.state==TangramPiece.NONE&&(this.el.setAttribute("filter","drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"),this.selectedOffsetX=this.x-t.x,this.selectedOffsetY=this.y-t.y,this.state=TangramPiece.DRAG)}checkTriangleIntersection(t,i,s,e){var a=(s.y-e.y)*(t.x-e.x)+(e.x-s.x)*(t.y-e.y),n=(s.y-e.y)*(i.x-e.x)+(e.x-s.x)*(i.y-e.y),h=a/n;if(h<0||h>1)return!1;var d=(e.y-i.y)*(t.x-e.x)+(i.x-e.x)*(t.y-e.y),o=(s.y-e.y)*(i.x-e.x)+(e.x-s.x)*(i.y-e.y),c=d/n;if(c<0||c>1)return!1;var l=1-h-c;return!(l<0||l>1)}intersects(t){const i=this.points.length;for(var s=this.transformPoint(this.points[0]),e=1;e<i-1;e++){var a=this.transformPoint(this.points[e+0]),n=this.transformPoint(this.points[e+1]);if(this.checkTriangleIntersection(t,s,a,n))return!0}return!1}tick(t){if(this.state==TangramPiece.ANIMATE)if(this.elapsedTime+=t,this.elapsedTime<TangramPiece.duration){var i=this.elapsedTime/TangramPiece.duration,s=easeInOutSine(i),e=this.dropx*(1-s)+this.startx*s,a=this.dropy*(1-s)+this.starty*s;this.translate(e,a)}else this.translate(this.startx,this.starty),this.el.removeAttribute("filter"),this.state=TangramPiece.NONE}animate(t){this.dropx=t.x,this.dropy=t.y,this.elapsedTime=0,this.state=TangramPiece.ANIMATE}}class TangramGame{constructor(){this.canvas=document.getElementById("overlay"),this.ctx=this.canvas.getContext("2d"),this.svg=null,this.duration=null,this.successMessage="You won!",this.failureMessage="You lost!",this.gameOverMessage="",this.gameOver=!1,this.finished=!1,this.initialized=!1,this.clickCount=0,this.timeToFirstClick=-1,this.missDropCount=0,this.percentComplete=0,this.piecesSolved="",this.selectedPiece=null,this.puzzlePieces=[],this.timeBar=null,this.lastTime=-1,this.interactionSound="",this.successSound="",this.failureSound="",this.endGameDelay=3,this.overlayImage="",this.overlayImagePosition="",this.overlayImageWidth=30,this.overlayIcon=null,window.addEventListener("resize",t=>{this.resize(t)}),this.resize()}mouseClick(t){if(!this.gameOver){if(this.timeToFirstClick===-1&&(this.timeToFirstClick=this.timeBar.elapsedTime()),this.clickCount++,this.selectedPiece!=null){var i=this.selectedPiece.el.getBoundingClientRect(),s=client2svg(i.x,i.y,this.svg,this.canvas);this.selectedPiece.drop(s),this.selectedPiece.isAtTarget||this.missDropCount++,this.soundEffect!==null&&this.soundEffect.play(),this.selectedPiece=null;return}var e=client2svg(t.clientX,t.clientY,this.svg,this.canvas);this.selectedPiece=null;for(var a=this.puzzlePieces.length-1;a>=0;a--){const n=this.puzzlePieces[a];if(n.intersects(e)){this.selectedPiece=n,this.selectedPiece.pickup(e),this.soundEffect!==null&&this.soundEffect.play();break}}}}mouseMove(t){if(this.selectedPiece!=null){var i=client2svg(t.clientX,t.clientY,this.svg,this.canvas);this.selectedPiece.drag(i)}}start(){const t=document.getElementById("svgObject");var i=t.contentDocument;if(i||(console.warn("Error: No SVG document loaded. Reverting to default puzzle."),t.removeAttribute("id"),t.removeAttribute("data"),t.removeAttribute("preserveAspectRatio"),t.innerHTML=jsPsychTangramDefaultPuzzleSVG,i=document),this.svg=i.querySelector("svg"),this.svg===null){console.error("Cannot load SVG.");return}this.svg.addEventListener("mousemove",l=>{this.mouseMove(l)}),this.svg.addEventListener("click",l=>{this.mouseClick(l)});var s=0,e=275,a=25,n=0;const h=i.getElementById("PuzzleLayer");h.getAttribute("transform")!=null&&console.error("ERROR: Transform on puzzle layer is not supported");for(const l of h.children){var o=new TangramPiece(l);e+o.width>600&&(a=a+n+10,e=275,n=0),console.log(i.width,e,a,o.width),o.initPosition(e,a),this.puzzlePieces.push(o),e=e+o.width+10,n<o.height&&(n=o.height),s=s+1}this.initialized=!0,this.soundEffect=null,this.interactionSound!==""&&(this.soundEffect=new Audio(this.interactionSound)),this.winSound=null,this.successSound!==""&&(this.winSound=new Audio(this.successSound),this.winSound.addEventListener("ended",l=>{this.finished=!0})),this.loseSound=null,this.failureSound!==""&&(this.loseSound=new Audio(this.failureSound),this.loseSound.addEventListener("ended",l=>{this.finished=!0})),this.overlayIcon=null,this.overlayImage!==""&&(this.overlayIcon=new Image,this.overlayIcon.src=this.overlayImage);const c=i.getElementById("TimebarInterior");this.timeBar=new TimeBar(this.svg,c,this.duration),this.lastTime=document.timeline.currentTime,window.requestAnimationFrame(l=>{this.tick(l)})}puzzleSolved(){for(const t of this.puzzlePieces)if(!t.isAtTarget)return!1;return!0}computePuzzleCompletionStats(){var t=0,i="",s="";for(const e of this.puzzlePieces)e.isAtTarget&&(t++,i+=s+e.el.id,s=",");this.percentComplete=t/this.puzzlePieces.length,this.piecesSolved=i}tick(t){const i=(t-this.lastTime)/1e3;this.lastTime=t;for(var s of this.puzzlePieces)s.tick(i);if(this.timeBar.tick(i),this.timeBar.timeLeft<=0){if(this.selectedPiece){var e=this.selectedPiece.el.getBoundingClientRect(),a=client2svg(e.x,e.y,this.svg,this.canvas);this.selectedPiece.drop(a),this.selectedPiece=null}this.gameOver=!0,this.gameOverMessage=this.failureMessage,this.loseSound!==null?this.loseSound.play():setTimeout(()=>{this.finished=!0},this.endGameDelay*1e3),this.computePuzzleCompletionStats()}this.puzzleSolved()&&(this.gameOver=!0,this.gameOverMessage=this.successMessage,this.winSound!==null?this.winSound.play():setTimeout(()=>{this.finished=!0},this.endGameDelay*1e3),this.computePuzzleCompletionStats()),this.draw(),this.gameOver||window.requestAnimationFrame(n=>{this.tick(n)})}resize(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.draw()}draw(){if(this.initialized?this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height):(this.ctx.fillStyle="#ffffff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)),this.overlayIcon){var t=this.overlayIcon.width,i=this.overlayIcon.height,s=i/t,e=5,a=5;this.overlayImagePosition==="TOP_RIGHT"&&(e=this.canvas.width-this.overlayImageWidth-5),this.ctx.drawImage(this.overlayIcon,e,a,this.overlayImageWidth,this.overlayImageWidth*s)}if(this.gameOver){this.ctx.font="64px Arial",this.ctx.textAlign="center",this.ctx.lineWidth=2;var n=Math.abs(this.percentComplete-1);console.log(n,this.percentComplete),n<.001?(this.ctx.fillStyle="#00AA00",this.ctx.strokeStyle="black"):(this.ctx.fillStyle="red",this.ctx.strokeStyle="black");var h=this.canvas.width*.5,d=this.canvas.height*.5;this.ctx.fillText(this.gameOverMessage,h,d),this.ctx.strokeText(this.gameOverMessage,h,d)}}}var jsPsychTangram=function(r){"use strict";const t={name:"tangram",version:"0.1.0",parameters:{svg:{type:r.ParameterType.STRING,default:""},interactionSound:{type:r.ParameterType.STRING,default:""},successSound:{type:r.ParameterType.STRING,default:""},failureSound:{type:r.ParameterType.STRING,default:""},successMessage:{type:r.ParameterType.STRING,default:"You won!"},failureMessage:{type:r.ParameterType.STRING,default:"You lose."},resetPieces:{type:r.ParameterType.BOOLEAN,default:!0},resetPieceDuration:{type:r.ParameterType.Float,default:1},dropThreshold:{type:r.ParameterType.INT,default:9},duration:{type:r.ParameterType.INT,default:60},overlayImage:{type:r.ParameterType.STRING,default:""},overlayImagePosition:{type:r.ParameterType.STRING,default:"TOP_RIGHT"}},data:{solve_duration:{type:r.ParameterType.FLOAT},puzzle_solved:{type:r.ParameterType.FLOAT},pieces_solved:{type:r.ParameterType.FLOAT},num_total_clicks:{type:r.ParameterType.INT},num_piece_drops:{type:r.ParameterType.INT},first_click_time:{type:r.ParameterType.FLOAT}},citations:{}};class i{constructor(e){this.jsPsych=e,this.tangram=null}trial(e,a,n){if(this.display=e,this.params=a,this.add_css(),this.add_html(),TangramPiece.duration=safeset(a.resetPieceDuration,1),TangramPiece.ResetPieces=safeset(a.resetPieces,!0),TangramPiece.threshold=safeset(a.dropThreshold,20),this.tangram=new TangramGame,this.tangram.duration=safeset(a.duration,60),this.tangram.successMessage=safeset(a.successMessage,"You won!"),this.tangram.failureMessage=safeset(a.failureMessage,"You lose."),this.tangram.interactionSound=safeset(a.interactionSound,""),this.tangram.successSound=safeset(a.successSound,""),this.tangram.failureSound=safeset(a.failureSound,""),this.tangram.overlayImage=safeset(a.overlayImage,""),this.tangram.overlayImagePosition=safeset(a.overlayImagePosition,"TOP_RIGHT"),this.tangram.overlayImageWidth=safeset(a.overlayImageWidth,30),a.svg!==""){const o=document.getElementById("svgObject");o.onload=()=>{this.tangram.start()}}else this.tangram.start();const h=()=>{typeof keyboardListener<"u"&&this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener),document.querySelector("#tangram-styles").remove(),document.querySelector("#container").remove();var o={solve_duration:this.tangram.timeBar.elapsedTime(),puzzle_solved:this.tangram.percentComplete,pieces_solved:this.tangram.piecesSolved,num_total_clicks:this.tangram.clickCount,num_piece_drops:this.tangram.missDropCount,first_click_time:this.tangram.timeToFirstClick};this.jsPsych.finishTrial(o)};var d=setInterval(()=>{this.tangram.finished&&(h(),clearInterval(d))},3e3)}add_css(){document.querySelector("head").insertAdjacentHTML("beforeend",`<style id="tangram-styles">
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
        </div> `),document.querySelector("#container").insertAdjacentHTML("beforeend",'<canvas id="overlay"></canvas>')}}return i.info=t,i}(jsPsychModule);
//# sourceMappingURL=plugin-tangram-game.js.map
