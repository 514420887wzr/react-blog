import React, { useState } from "react";
import "./About.scss";
import { Timeline } from "antd";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx"; // jsx模式的包
import "ace-builds/src-noconflict/theme-monokai"; // monokai的主题样式
import "ace-builds/src-noconflict/ext-language_tools"; // 代码联想

export default function About() {
  const [selectId, setSelectId] = useState(1);
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
<title>箭头射击小游戏HTML5源码 - 站长素材</title>

<style>
*{margin:0;padding:0;}

body {background:#000000;overflow:hidden;}

canvas {background:#ecf0f1;}
</style>

</head>
<body>

<canvas id='canvas' width="80%" height="80%"></canvas>

<script>
"use strict"
		var stage = {
			w:1280,
			h:720
		}

		var _pexcanvas = document.getElementById("canvas");
		_pexcanvas.width = stage.w;
		_pexcanvas.height = stage.h;
		var ctx = _pexcanvas.getContext("2d");




		var pointer = {
			x:0,
			y:0
		}

		var scale = 1;
		var portrait = true;
		var loffset = 0;
		var toffset = 0;
		var mxpos = 0;
		var mypos = 0;


// ------------------------------------------------------------------------------- Gamy
function drawArrow(fromx, fromy, tox, toy,lw,hlen,color) {
	var dx = tox - fromx;
	var dy = toy - fromy;
	var angle = Math.atan2(dy, dx);
	ctx.fillStyle=color;
	ctx.strokeStyle=color;
	ctx.lineCap = "round";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(fromx, fromy);
	ctx.lineTo(tox, toy);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(tox, toy);
	ctx.lineTo(tox - hlen * Math.cos(angle - Math.PI / 6), toy - hlen * Math.sin(angle - Math.PI / 6));
	ctx.lineTo(tox - hlen * Math.cos(angle)/2, toy - hlen * Math.sin(angle)/2);
	ctx.lineTo(tox - hlen * Math.cos(angle + Math.PI / 6), toy - hlen * Math.sin(angle + Math.PI / 6));
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}




var colors = ['#1abc9c','#1abc9c','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d'];


ctx.clearRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	var angle = Math.random()*Math.PI*2;
	var length = Math.random()*250+50;
	var myx=360+Math.sin(angle)*length;
	var myy=360-Math.cos(angle)*length;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#c0392b');
}
var explode = new Image();
explode.src = canvas.toDataURL("image/png");

ctx.clearRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	var angle = Math.random()*Math.PI-Math.PI/2;
	var length = Math.random()*480+50;
	var myx=stage.w/2+Math.sin(angle)*length;
	var myy=stage.h-Math.cos(angle)*length;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#2c3e50');
}
var explodeb = new Image();
explodeb.src = canvas.toDataURL("image/png");


ctx.clearRect(0,0,stage.w,stage.h);
ctx.fillStyle = "rgba(236,240,241,1)";
ctx.fillRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	var angle = Math.random()*Math.PI/Math.PI*180;
	var length = Math.random()*250+50;
	var myx=Math.random()*stage.w;
	var myy=Math.random()*stage.h;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,colors[Math.floor(Math.random()*colors.length)]);
}

ctx.fillStyle = "rgba(236,240,241,0.9)";
ctx.fillRect(0,0,stage.w,stage.h);
var back = new Image();
back.src = canvas.toDataURL("image/png");

var angle=0;
var ai = true;
var ait = 0;
var btm=0;
var bullets = [];

function Bullet() {
	this.x=stage.w/2-Math.sin(angle)*150;
	this.y=stage.h-Math.cos(angle)*150;
	this.r=angle;
}

var enemies = [];
function Enemy() {
	this.r = Math.random()*Math.PI/(2.5/2)-Math.PI/2.5;
	this.dis = Math.random()*1280+720;
	this.x=stage.w/2-Math.sin(this.r)*this.dis;
	this.y=stage.h-Math.cos(this.r)*this.dis;
}
for(var i=0;i<10;i++) {
	enemies.push(new Enemy());

	enemies[i].x += Math.sin(enemies[i].r)*300;
	enemies[i].y += Math.cos(enemies[i].r)*300;
}



var explosions = [];
function Explosion(x,y,ty) {
	this.x=x;
	this.y=y;
	this.t=30;
	this.ty=ty;
}

var eturn = 0;
var cold = [];
function enginestep() {

	ctx.drawImage(back,0,0);
	if (!ai&&ait<Date.now()-3000) {
		ai = true;
	}
	btm++;
	if(btm>8){
		btm=0;
		bullets.push(new Bullet());
	}

	for (var i=0;i<bullets.length;i++) {
		bullets[i].x -= Math.sin(bullets[i].r)*20;
		bullets[i].y -= Math.cos(bullets[i].r)*20;
		drawArrow(bullets[i].x+Math.sin(bullets[i].r)*50,bullets[i].y+Math.cos(bullets[i].r)*50,bullets[i].x,bullets[i].y,8,8,'#2980b9');
		if(bullets[i].x<-100||bullets[i].x>stage.w+100){
			bullets.splice(i,1);
		}
		if(bullets[i].y<-100||bullets[i].y>stage.h+100){
			bullets.splice(i,1);
		}

	}


	for(var i=0;i<enemies.length;i++) {
		enemies[i].x += Math.sin(enemies[i].r)*3;
		enemies[i].y += Math.cos(enemies[i].r)*3;
		drawArrow(enemies[i].x-Math.sin(enemies[i].r)*100,enemies[i].y-Math.cos(enemies[i].r)*100,enemies[i].x,enemies[i].y,15,15,"#c0392b");
		if (enemies[i].y>stage.h) {
			enemies[i] = new Enemy();
			explosions.push(new Explosion(stage.w/2,stage.h,2));
				shake = true;
				shaket=0;
		}
		for (var b=0;b<bullets.length;b++) {
			var dx = enemies[i].x-bullets[b].x;
			var dy = enemies[i].y-bullets[b].y;
			var dis = dx*dx+dy*dy;
			if (dis<20*20) {
				explosions.push(new Explosion(enemies[i].x,enemies[i].y,1));
				enemies[i] = new Enemy();
				bullets.splice(b,1);
			}
		}
	}

	if (ai) {
		for(var l=0;l<enemies.length;l++) {
			var dx = enemies[l].x-stage.w/2;
			var dy = enemies[l].y-stage.h;
			var dis = Math.floor(Math.sqrt(dx*dx+dy*dy));
			var val1 = 100000+dis;
			var val2 = 1000+l;
			cold[l]=val1+'x'+val2;
		}



		cold.sort();
		eturn = parseInt(cold[0].slice(8,11));
		if (parseInt(cold[0].slice(1,6))<800) {
			angle += (enemies[eturn].r-angle)/8;
		}
	} else {

		var dx = pointer.x-stage.w/2;
		var dy = pointer.y-stage.h;
		angle = Math.atan(dx/dy);
	}

	drawArrow(stage.w/2,stage.h,stage.w/2-Math.sin(angle)*150,stage.h-Math.cos(angle)*150,30,20,'#2c3e50');



	for(var e=0;e<explosions.length;e++) {

		if (explosions[e].ty==1) {
			var myimg = explode;
			ctx.globalAlpha=1-(explosions[e].t/stage.h);
			ctx.drawImage(myimg,explosions[e].x-explosions[e].t/2,explosions[e].y-explosions[e].t/2,explosions[e].t*stage.w/stage.h,explosions[e].t);
			ctx.globalAlpha=1;
		} else {
			var myimg = explodeb;
			ctx.globalAlpha=1-(explosions[e].t/stage.h);
			ctx.drawImage(myimg,explosions[e].x-explosions[e].t*stage.w/stage.h/2,stage.h-explosions[e].t,explosions[e].t*stage.w/stage.h,explosions[e].t);
			ctx.globalAlpha=1;
		}

	}


	for(var e=0;e<explosions.length;e++) {
		explosions[e].t += 20;
		if (explosions[e].t>stage.h) {
			explosions.splice(e,1);
		}
	}
}


// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);

	}
	else {
		cancelFullScreen.call(doc);

	}
}


function motchstart(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;




}

function motchmove(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;
	pointer.x = mxpos;
	pointer.y = mypos;
	ai = false;
	ait = Date.now();
}

function motchend(e) {

}






window.addEventListener('mousedown', function(e) {
	motchstart(e);
}, false);
window.addEventListener('mousemove', function(e) {
	motchmove(e);
}, false);
window.addEventListener('mouseup', function(e) {
	motchend(e);
}, false);
window.addEventListener('touchstart', function(e) {
	e.preventDefault();
	motchstart(e.touches[0]);
}, false);
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
	motchmove(e.touches[0]);
}, false);
window.addEventListener('touchend', function(e) {
	e.preventDefault();
	motchend(e.touches[0]);
}, false);



// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
function _pexresize() {
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	if (cw<=ch*stage.w/stage.h) {
		portrait = true;
		scale = stage.w/cw;
		loffset = 0;
		toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
		_pexcanvas.style.width = cw + "px";
		_pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
		_pexcanvas.style.marginLeft = loffset +"px";
		_pexcanvas.style.marginTop = toffset +"px";
	} else {
		scale = stage.h/ch;
		portrait = false;
		loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
		toffset = 0;
		_pexcanvas.style.height = ch + "px";
		_pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
		_pexcanvas.style.marginLeft = loffset +"px";
		_pexcanvas.style.marginTop = toffset +"px";
	}
}


window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};})();



	function sfps(iny) {
		return(Math.floor(smoothfps)/60*iny);
	}



	var timebomb=0;
	var lastCalledTime;
	var fpcount = 0;
	var fpall = 0;
	var smoothfps = 60;
	var thisfps = 60;
	function fpscounter() {
		timebomb ++;
		if (!lastCalledTime) {
			lastCalledTime = Date.now();
			return;
		}
		var delta = (Date.now()-lastCalledTime)/1000;
		lastCalledTime = Date.now();
		var fps = 1/delta;
		fpcount ++;
		fpall += fps;
		if (timebomb>30) {
			thisfps = parseInt(fpall/fpcount*10)/10;
			fpcount = 0;
			fpall = 0;
			timebomb = 0;
		}
	}

	var shake = false;
	var shaket = 0;
	function animated() {
		requestAnimFrame(animated);
		if (shake) {
			var trax = Math.random()*60-30;
			var tray = Math.random()*60-30;
			ctx.translate(trax,tray);
		}
		// fpscounter();
    //ctx.clearRect(0,0,_pexcanvas.width,_pexcanvas.height);
    enginestep()
    // ctx.fillStyle='#8e44ad';
    // ctx.font = "24px arial";

    // ctx.textAlign = "left";
    // ctx.fillText(thisfps,20,50);
    // smoothfps += (thisfps-smoothfps)/100;
    // ctx.fillText(cold[0].slice(1,6),20,80);
   //  ctx.beginPath();
   //  ctx.arc(pointer.x, pointer.y, 50, 0, Math.PI*2,false);
   // ctx.closePath();
   // ctx.fill();
   if (shake) {
   	ctx.translate(-trax,-tray);
   	shaket ++;
   	if (shaket>20) {
   		shaket=0;
   		shake=false;
   	}
   }
}

_pexresize();
animated();
</script>

</body>
</html>
  `);

  const list = [
    {
      id: 1,
      title: "箭头射击小游戏",
      code: `<!DOCTYPE html>
      <html lang="en" >
      <head>
      <meta charset="UTF-8">
      <title>箭头射击小游戏HTML5源码 - 站长素材</title>

      <style>
      *{margin:0;padding:0;}

      body {background:#000000;overflow:hidden;}

      canvas {background:#ecf0f1;}
      </style>

      </head>
      <body>

      <canvas id='canvas' width="80%" height="80%"></canvas>

      <script>
      "use strict"
          var stage = {
            w:1280,
            h:720
          }

          var _pexcanvas = document.getElementById("canvas");
          _pexcanvas.width = stage.w;
          _pexcanvas.height = stage.h;
          var ctx = _pexcanvas.getContext("2d");




          var pointer = {
            x:0,
            y:0
          }

          var scale = 1;
          var portrait = true;
          var loffset = 0;
          var toffset = 0;
          var mxpos = 0;
          var mypos = 0;


      // ------------------------------------------------------------------------------- Gamy
      function drawArrow(fromx, fromy, tox, toy,lw,hlen,color) {
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineCap = "round";
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - hlen * Math.cos(angle - Math.PI / 6), toy - hlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(tox - hlen * Math.cos(angle)/2, toy - hlen * Math.sin(angle)/2);
        ctx.lineTo(tox - hlen * Math.cos(angle + Math.PI / 6), toy - hlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }




      var colors = ['#1abc9c','#1abc9c','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d'];


      ctx.clearRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI*2;
        var length = Math.random()*250+50;
        var myx=360+Math.sin(angle)*length;
        var myy=360-Math.cos(angle)*length;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#c0392b');
      }
      var explode = new Image();
      explode.src = canvas.toDataURL("image/png");

      ctx.clearRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI-Math.PI/2;
        var length = Math.random()*480+50;
        var myx=stage.w/2+Math.sin(angle)*length;
        var myy=stage.h-Math.cos(angle)*length;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#2c3e50');
      }
      var explodeb = new Image();
      explodeb.src = canvas.toDataURL("image/png");


      ctx.clearRect(0,0,stage.w,stage.h);
      ctx.fillStyle = "rgba(236,240,241,1)";
      ctx.fillRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI/Math.PI*180;
        var length = Math.random()*250+50;
        var myx=Math.random()*stage.w;
        var myy=Math.random()*stage.h;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,colors[Math.floor(Math.random()*colors.length)]);
      }

      ctx.fillStyle = "rgba(236,240,241,0.9)";
      ctx.fillRect(0,0,stage.w,stage.h);
      var back = new Image();
      back.src = canvas.toDataURL("image/png");

      var angle=0;
      var ai = true;
      var ait = 0;
      var btm=0;
      var bullets = [];

      function Bullet() {
        this.x=stage.w/2-Math.sin(angle)*150;
        this.y=stage.h-Math.cos(angle)*150;
        this.r=angle;
      }

      var enemies = [];
      function Enemy() {
        this.r = Math.random()*Math.PI/(2.5/2)-Math.PI/2.5;
        this.dis = Math.random()*1280+720;
        this.x=stage.w/2-Math.sin(this.r)*this.dis;
        this.y=stage.h-Math.cos(this.r)*this.dis;
      }
      for(var i=0;i<10;i++) {
        enemies.push(new Enemy());

        enemies[i].x += Math.sin(enemies[i].r)*300;
        enemies[i].y += Math.cos(enemies[i].r)*300;
      }



      var explosions = [];
      function Explosion(x,y,ty) {
        this.x=x;
        this.y=y;
        this.t=30;
        this.ty=ty;
      }

      var eturn = 0;
      var cold = [];
      function enginestep() {

        ctx.drawImage(back,0,0);
        if (!ai&&ait<Date.now()-3000) {
          ai = true;
        }
        btm++;
        if(btm>8){
          btm=0;
          bullets.push(new Bullet());
        }

        for (var i=0;i<bullets.length;i++) {
          bullets[i].x -= Math.sin(bullets[i].r)*20;
          bullets[i].y -= Math.cos(bullets[i].r)*20;
          drawArrow(bullets[i].x+Math.sin(bullets[i].r)*50,bullets[i].y+Math.cos(bullets[i].r)*50,bullets[i].x,bullets[i].y,8,8,'#2980b9');
          if(bullets[i].x<-100||bullets[i].x>stage.w+100){
            bullets.splice(i,1);
          }
          if(bullets[i].y<-100||bullets[i].y>stage.h+100){
            bullets.splice(i,1);
          }

        }


        for(var i=0;i<enemies.length;i++) {
          enemies[i].x += Math.sin(enemies[i].r)*3;
          enemies[i].y += Math.cos(enemies[i].r)*3;
          drawArrow(enemies[i].x-Math.sin(enemies[i].r)*100,enemies[i].y-Math.cos(enemies[i].r)*100,enemies[i].x,enemies[i].y,15,15,"#c0392b");
          if (enemies[i].y>stage.h) {
            enemies[i] = new Enemy();
            explosions.push(new Explosion(stage.w/2,stage.h,2));
              shake = true;
              shaket=0;
          }
          for (var b=0;b<bullets.length;b++) {
            var dx = enemies[i].x-bullets[b].x;
            var dy = enemies[i].y-bullets[b].y;
            var dis = dx*dx+dy*dy;
            if (dis<20*20) {
              explosions.push(new Explosion(enemies[i].x,enemies[i].y,1));
              enemies[i] = new Enemy();
              bullets.splice(b,1);
            }
          }
        }

        if (ai) {
          for(var l=0;l<enemies.length;l++) {
            var dx = enemies[l].x-stage.w/2;
            var dy = enemies[l].y-stage.h;
            var dis = Math.floor(Math.sqrt(dx*dx+dy*dy));
            var val1 = 100000+dis;
            var val2 = 1000+l;
            cold[l]=val1+'x'+val2;
          }



          cold.sort();
          eturn = parseInt(cold[0].slice(8,11));
          if (parseInt(cold[0].slice(1,6))<800) {
            angle += (enemies[eturn].r-angle)/8;
          }
        } else {

          var dx = pointer.x-stage.w/2;
          var dy = pointer.y-stage.h;
          angle = Math.atan(dx/dy);
        }

        drawArrow(stage.w/2,stage.h,stage.w/2-Math.sin(angle)*150,stage.h-Math.cos(angle)*150,30,20,'#2c3e50');



        for(var e=0;e<explosions.length;e++) {

          if (explosions[e].ty==1) {
            var myimg = explode;
            ctx.globalAlpha=1-(explosions[e].t/stage.h);
            ctx.drawImage(myimg,explosions[e].x-explosions[e].t/2,explosions[e].y-explosions[e].t/2,explosions[e].t*stage.w/stage.h,explosions[e].t);
            ctx.globalAlpha=1;
          } else {
            var myimg = explodeb;
            ctx.globalAlpha=1-(explosions[e].t/stage.h);
            ctx.drawImage(myimg,explosions[e].x-explosions[e].t*stage.w/stage.h/2,stage.h-explosions[e].t,explosions[e].t*stage.w/stage.h,explosions[e].t);
            ctx.globalAlpha=1;
          }

        }


        for(var e=0;e<explosions.length;e++) {
          explosions[e].t += 20;
          if (explosions[e].t>stage.h) {
            explosions.splice(e,1);
          }
        }
      }


      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events

      function toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);

        }
        else {
          cancelFullScreen.call(doc);

        }
      }


      function motchstart(e) {
        mxpos = (e.pageX-loffset)*scale;
        mypos = (e.pageY-toffset)*scale;




      }

      function motchmove(e) {
        mxpos = (e.pageX-loffset)*scale;
        mypos = (e.pageY-toffset)*scale;
        pointer.x = mxpos;
        pointer.y = mypos;
        ai = false;
        ait = Date.now();
      }

      function motchend(e) {

      }






      window.addEventListener('mousedown', function(e) {
        motchstart(e);
      }, false);
      window.addEventListener('mousemove', function(e) {
        motchmove(e);
      }, false);
      window.addEventListener('mouseup', function(e) {
        motchend(e);
      }, false);
      window.addEventListener('touchstart', function(e) {
        e.preventDefault();
        motchstart(e.touches[0]);
      }, false);
      window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        motchmove(e.touches[0]);
      }, false);
      window.addEventListener('touchend', function(e) {
        e.preventDefault();
        motchend(e.touches[0]);
      }, false);



      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      function _pexresize() {
        var cw = window.innerWidth;
        var ch = window.innerHeight;
        if (cw<=ch*stage.w/stage.h) {
          portrait = true;
          scale = stage.w/cw;
          loffset = 0;
          toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
          _pexcanvas.style.width = cw + "px";
          _pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
          _pexcanvas.style.marginLeft = loffset +"px";
          _pexcanvas.style.marginTop = toffset +"px";
        } else {
          scale = stage.h/ch;
          portrait = false;
          loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
          toffset = 0;
          _pexcanvas.style.height = ch + "px";
          _pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
          _pexcanvas.style.marginLeft = loffset +"px";
          _pexcanvas.style.marginTop = toffset +"px";
        }
      }


      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };})();



        function sfps(iny) {
          return(Math.floor(smoothfps)/60*iny);
        }



        var timebomb=0;
        var lastCalledTime;
        var fpcount = 0;
        var fpall = 0;
        var smoothfps = 60;
        var thisfps = 60;
        function fpscounter() {
          timebomb ++;
          if (!lastCalledTime) {
            lastCalledTime = Date.now();
            return;
          }
          var delta = (Date.now()-lastCalledTime)/1000;
          lastCalledTime = Date.now();
          var fps = 1/delta;
          fpcount ++;
          fpall += fps;
          if (timebomb>30) {
            thisfps = parseInt(fpall/fpcount*10)/10;
            fpcount = 0;
            fpall = 0;
            timebomb = 0;
          }
        }

        var shake = false;
        var shaket = 0;
        function animated() {
          requestAnimFrame(animated);
          if (shake) {
            var trax = Math.random()*60-30;
            var tray = Math.random()*60-30;
            ctx.translate(trax,tray);
          }
          // fpscounter();
          //ctx.clearRect(0,0,_pexcanvas.width,_pexcanvas.height);
          enginestep()
          // ctx.fillStyle='#8e44ad';
          // ctx.font = "24px arial";

          // ctx.textAlign = "left";
          // ctx.fillText(thisfps,20,50);
          // smoothfps += (thisfps-smoothfps)/100;
          // ctx.fillText(cold[0].slice(1,6),20,80);
         //  ctx.beginPath();
         //  ctx.arc(pointer.x, pointer.y, 50, 0, Math.PI*2,false);
         // ctx.closePath();
         // ctx.fill();
         if (shake) {
           ctx.translate(-trax,-tray);
           shaket ++;
           if (shaket>20) {
             shaket=0;
             shake=false;
           }
         }
      }

      _pexresize();
      animated();
      </script>

      </body>
      </html>`,
    },
    {
      id: 2,
      title: "3D彩色纸片",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html,
            body {
              height: 100%;
            }
            body {
              display: grid;
              place-items: center;
              background-color: black;
              overflow: hidden;
            }
            .container {
              perspective: 1000px;
            }
            .inner {
              --x-deg: -45deg;
              --y-deg: 3deg;
              transform-style: preserve-3d;
              position: relative;
              display: grid;
              place-items: center;
              transform: rotateX(var(--x-deg)) rotateY(var(--y-deg));
            }
            .element {
              width: 200px;
              height: 150px;
              background-color: hsl(40, 80%, 50%);
              position: absolute;
              box-shadow: inset 0 0 50px hsl(0, 0%, 0%);
              transform-origin: center;
              transition: 350ms ease;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="inner">
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
            </div>
          </div>
        </body>
        <script>
          console.clear();
          const elements = document.querySelectorAll(".element");
          const inner = document.querySelector(".inner");

          let deg = 0;
          let col = 0;
          elements.forEach((element, index) => {
            element.style.transform = "rotateY("+deg+"deg) translateX(220px)";

            element.style.backgroundColor = "hsl("+deg+", 70%, 50%)";
            deg += 5;
          });

          onmousemove = (e) => {
            let midPoint = window.innerWidth / 2;
            let midTopPoint = window.innerHeight / 2;

            inner.style.transform = "rotateY("+
              (e.clientX / midPoint - 1) * 50
            +"deg) rotateX("+(e.clientY / midTopPoint - 1) * 50+"deg)";
          };
        </script>
      </html>
      `,
    },
    {
      id: 3,
      title: "会动的大嘴鸟",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            /* 大嘴鸟*/
            .dong {
              z-index: 9999;
              position: fixed;
              top: -40px;
              right: -80px;
              transform: scale(0.24);
              -webkit-transform: scale(0.24);
              -moz-transform: scale(0.24);
            }
            .monster {
              transform: rotate(-50deg);
              -ms-transform: rotate(-50deg);
              /* IE 9 */
              -moz-transform: rotate(-50deg);
              /* Firefox */
              -webkit-transform: rotate(-50deg);
              /* Safari 和 Chrome */
              -o-transform: rotate(-50deg);
              /* Opera */
              display: flex;
              justify-content: center;
              position: relative;
              width: 170px;
              height: 400px;
              border-top-left-radius: 200px;
              border-top-right-radius: 200px;
              background-color: #3c47d7;
              box-shadow: 20px 20px 60px #4650e5;
            }
            .monster__face {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: absolute;
              top: 14%;
              width: 75%;
              height: 160px;
            }
            .monster__noses {
              top: 50%;
              display: flex;
              justify-content: space-between;
              width: 28%;
              height: auto;
              margin-bottom: 10px;
            }
            .monster__nose {
              width: 8px;
              height: 12px;
              border-radius: 20px;
              background: rgba(0, 0, 0, 0.5);
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
            }
            .monster__mouth {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              width: 100%;
              height: 0%;
              overflow: hidden;
              border: 25px solid #ffc333;
              border-radius: 100px;
              background-color: #810332;
              animation: mouth 1.75s infinite;
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
              box-sizing: border-box;
            }
            .monster__mouth::before {
              content: "";
              position: absolute;
              width: 150px;
              height: 80px;
              border-radius: 100px;
              background-color: #400018;
            }
            .monster__mouth::after {
              content: "";
              position: absolute;
              bottom: -80px;
              width: 160px;
              height: 80px;
              border-top-left-radius: 50%;
              border-top-right-radius: 50%;
              background-color: #dc1b50;
              animation: tongue 1.75s infinite;
            }
            .monster__top {
              position: absolute;
              top: -30px;
              width: 170px;
              height: 30px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
              background-color: #ffffff;
              z-index: 100;
              animation: t 1.75s infinite;
            }
            .monster__bottom {
              position: absolute;
              bottom: 0;
              width: 100px;
              height: 30px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              background-color: #ffffff;
              z-index: 100;
              animation: b 1.75s infinite;
            }
            .avatar-eye {
              position: absolute;
              top: -10%;
              width: 65px;
              height: 65px;
              background: linear-gradient(105deg, white, #cb87f4);
              border-radius: 100%;
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
              margin: 3px;
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
            }
            .avatar-eye--green {
              background: linear-gradient(to bottom, #fdfdfd, #c3efea);
            }
            .avatar-eye--violet {
              background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
            }
            .eye--left {
              left: 10%;
            }
            .eye--right {
              left: 85%;
            }
            .eye--center {
              left: 45%;
              top: 10%;
            }
            .avatar-eye-pupil {
              position: absolute;
              width: 55%;
              height: 55%;
              left: 50%;
              top: 25%;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              z-index: 100;
              border-radius: 100%;
            }
            .pupil--green {
              background: linear-gradient(
                135deg,
                rgba(188, 248, 177, 0.7),
                #2fa38c 75%
              );
            }
            .pupil--pink {
              background: linear-gradient(135deg, #f1a183, #8535cd);
            }
            .avatar-eye-pupil-blackThing {
              position: absolute;
              width: 55%;
              height: 55%;
              left: 50%;
              top: 25%;
              background: #2c2f32;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              border-radius: 100%;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
            .avatar-eye-pupil-lightReflection {
              position: absolute;
              width: 7px;
              height: 7px;
              left: 25%;
              top: 10%;
              background: #ebebeb;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              border-radius: 100%;
              box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
            }
            /*大嘴动起来*/
            @keyframes t {
              0%,
              10%,
              80%,
              100% {
                top: -30px;
              }
              20% {
                top: 0px;
              }
              30% {
                top: -20px;
              }
              40% {
                top: -0px;
              }
              50% {
                top: -25px;
              }
              70% {
                top: 0px;
              }
            }
            @keyframes b {
              0%,
              10%,
              80%,
              100% {
                bottom: -30px;
              }
              20% {
                bottom: 0px;
              }
              30% {
                bottom: -20px;
              }
              40% {
                bottom: -0px;
              }
              50% {
                bottom: -25px;
              }
              70% {
                bottom: 0px;
              }
            }
            @keyframes mouth {
              0%,
              10%,
              100% {
                width: 100%;
                height: 0%;
              }
              15% {
                width: 90%;
                height: 30%;
              }
              20% {
                width: 50%;
                height: 70%;
              }
              25% {
                width: 70%;
                height: 70%;
              }
              30% {
                width: 80%;
                height: 60%;
              }
              35% {
                width: 60%;
                height: 70%;
              }
              40% {
                width: 55%;
                height: 75%;
              }
              45% {
                width: 50%;
                height: 90%;
              }
              50% {
                width: 40%;
                height: 70%;
              }
              55% {
                width: 70%;
                height: 95%;
              }
              60% {
                width: 40%;
                height: 50%;
              }
              65% {
                width: 100%;
                height: 60%;
              }
              70% {
                width: 100%;
                height: 70%;
              }
              75% {
                width: 90%;
                height: 70%;
              }
              80% {
                width: 50%;
                height: 70%;
              }
              85% {
                width: 90%;
                height: 50%;
              }
              85% {
                width: 40%;
                height: 70%;
              }
              90% {
                width: 90%;
                height: 30%;
              }
              95% {
                width: 100%;
                height: 10%;
              }
            }
            @keyframes tongue {
              0%,
              20%,
              100% {
                bottom: -80px;
              }
              30%,
              90% {
                bottom: -40px;
              }
              40% {
                bottom: -45px;
              }
              50% {
                bottom: -50px;
              }
              70% {
                bottom: -80px;
              }
              90% {
                bottom: -40px;
              }
            }
          </style>
        </head>
        <body>
          <div class="dong">
            <div class="monster">
              <div class="monster__face">
                <div class="monster__eye avatar-eye avatar-eye--green eye--left">
                  <div class="avatar-eye-pupil pupil--green">
                    <span class="avatar-eye-pupil-blackThing"
                      ><span class="avatar-eye-pupil-lightReflection"></span
                    ></span>
                  </div>
                </div>
                <div class="monster__eye avatar-eye avatar-eye--violet eye--right">
                  <div class="avatar-eye-pupil pupil--pink">
                    <span class="avatar-eye-pupil-blackThing"
                      ><span class="avatar-eye-pupil-lightReflection"></span
                    ></span>
                  </div>
                </div>
                <div class="monster__noses">
                  <div class="monster__nose"></div>
                  <div class="monster__nose"></div>
                </div>
                <div class="monster__mouth">
                  <div class="monster__top"></div>
                  <div class="monster__bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    },
    {
      id: 4,
      title: "有趣的文字跳动",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              box-sizing: border-box;
            }
            body {
              --hue: 60;
              font-family: Montserrat, sans-serif;
              margin: 0;
              padding: 1rem;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: hsl(var(--hue) 100% 75%);
            }
            h1 {
              margin: 0;
              font-size: clamp(2rem, 3vw, 5rem);
              display: flex;
            }
            span {
              --stagger: -200ms;
              --delay: calc(var(--i) * var(--stagger, 200ms));
            }
            span > span {
              display: block;
              animation: bounce 2000ms var(--delay, 0ms) infinite;
              transform-origin: center bottom;
              z-index: 1;
            }
            span:not(span > span)::after {
              content: "";
              display: block;
              width: 100%;
              aspect-ratio: 1;
              background: hsl(var(--hue) 50% 45% / 0.1);
              transform: translate3d(0, 3.8em, 0) scaleY(0.3) scaleX(0.8);
              transform-origin: center top;
              border-radius: 100%;
              filter: blur(0.08em);
              animation: shadow 2000ms var(--delay, 0ms) infinite;
            }
            @keyframes bounce {
              0% {
                transform: translate3d(0, 0, 0) rotateY(0deg) scaleY(1);
                animation-timing-function: ease-in;
              }
              45% {
                transform: translate3d(0, 4em, 0) rotateY(180deg) scaleY(1);
                animation-timing-function: ease-in;
              }
              50% {
                transform: translate3d(0, 4em, 0) rotateY(180deg) scaleY(0.2);
                animation-timing-function: ease-out, ease-out, linear;
              }
              100% {
                transform: translate3d(0, 0, 0) rotateY(0) scaleY(1);
                animation-timing-function: ease-out;
              }
            }
            @keyframes shadow {
              0% {
                transform: translate3d(0, 3.8em, 0) scale3d(1.5, 0.3, 1);
                opacity: 0;
                animation-timing-function: ease-in;
              }
              45% {
                transform: translate3d(0, 3.8em, 0) scale3d(0.8, 0.2, 1);
                opacity: 1;
                animation-timing-function: ease-in;
              }
              50% {
                transform: translate3d(0, 3.8em, 0) scale3d(0.8, 0.2, 1);
                opacity: 1;
                animation-timing-function: linear;
              }
              100% {
                transform: translate3d(0, 3.8em, 0) scale3d(1.5, 0.3, 1);
                opacity: 0;
                animation-timing-function: ease-out;
              }
            }
          </style>
        </head>
        <body>
          <h1 aria-label="bouncing">
            <span style="--i: 0" aria-hidden="true"><span>W</span></span>
            <span style="--i: 1" aria-hidden="true"><span>Z</span></span>
            <span style="--i: 2" aria-hidden="true"><span>R</span></span>
            <span style="--i: 3" aria-hidden="true"
              ><span style="color: red">💖 </span></span
            >
            <span style="--i: 3" aria-hidden="true"
              ><span style="color: red">💖 </span></span
            >
            <span style="--i: 0" aria-hidden="true"><span>W</span></span>
            <span style="--i: 1" aria-hidden="true"><span>P</span></span>
          </h1>
        </body>
        <script>
          function clickEffect() {
            let balls = [];
            let longPressed = false;
            let longPress;
            let multiplier = 0;
            let width, height;
            let origin;
            let normal;
            let ctx;
            const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
            const canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            canvas.setAttribute(
              "style",
              "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
            );
            const pointer = document.createElement("span");
            pointer.classList.add("pointer");
            document.body.appendChild(pointer);

            if (canvas.getContext && window.addEventListener) {
              ctx = canvas.getContext("2d");
              updateSize();
              window.addEventListener("resize", updateSize, false);
              loop();
              window.addEventListener(
                "mousedown",
                function (e) {
                  pushBalls(randBetween(10, 20), e.clientX, e.clientY);
                  document.body.classList.add("is-pressed");
                  longPress = setTimeout(function () {
                    document.body.classList.add("is-longpress");
                    longPressed = true;
                  }, 500);
                },
                false
              );
              window.addEventListener(
                "mouseup",
                function (e) {
                  clearInterval(longPress);
                  if (longPressed == true) {
                    document.body.classList.remove("is-longpress");
                    pushBalls(
                      randBetween(
                        50 + Math.ceil(multiplier),
                        100 + Math.ceil(multiplier)
                      ),
                      e.clientX,
                      e.clientY
                    );
                    longPressed = false;
                  }
                  document.body.classList.remove("is-pressed");
                },
                false
              );
              window.addEventListener(
                "mousemove",
                function (e) {
                  let x = e.clientX;
                  let y = e.clientY;
                  pointer.style.top = y + "px";
                  pointer.style.left = x + "px";
                },
                false
              );
            } else {
              // console.log("canvas or addEventListener is unsupported!");
            }

            function updateSize() {
              canvas.width = window.innerWidth * 2;
              canvas.height = window.innerHeight * 2;
              canvas.style.width = window.innerWidth + "px";
              canvas.style.height = window.innerHeight + "px";
              ctx.scale(2, 2);
              width = canvas.width = window.innerWidth;
              height = canvas.height = window.innerHeight;
              origin = {
                x: width / 2,
                y: height / 2,
              };
              normal = {
                x: width / 2,
                y: height / 2,
              };
            }
            class Ball {
              constructor(x = origin.x, y = origin.y) {
                this.x = x;
                this.y = y;
                this.angle = Math.PI * 2 * Math.random();
                if (longPressed == true) {
                  this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
                } else {
                  this.multiplier = randBetween(6, 12);
                }
                this.vx =
                  (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
                this.vy =
                  (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
                this.r = randBetween(8, 12) + 3 * Math.random();
                this.color = colours[Math.floor(Math.random() * colours.length)];
              }
              update() {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
                normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
                normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
                this.r -= 0.3;
                this.vx *= 0.9;
                this.vy *= 0.9;
              }
            }

            function pushBalls(count = 1, x = origin.x, y = origin.y) {
              for (let i = 0; i < count; i++) {
                balls.push(new Ball(x, y));
              }
            }

            function randBetween(min, max) {
              return Math.floor(Math.random() * max) + min;
            }

            function loop() {
              ctx.fillStyle = "rgba(255, 255, 255, 0)";
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (b.r < 0) continue;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                ctx.fill();
                b.update();
              }
              if (longPressed == true) {
                multiplier += 0.2;
              } else if (!longPressed && multiplier >= 0) {
                multiplier -= 0.4;
              }
              removeBall();
              requestAnimationFrame(loop);
            }

            function removeBall() {
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (
                  b.x + b.r < 0 ||
                  b.x - b.r > width ||
                  b.y + b.r < 0 ||
                  b.y - b.r > height ||
                  b.r < 0
                ) {
                  balls.splice(i, 1);
                }
              }
            }
          }
          clickEffect(); //调用
        </script>
      </html>
      `
    },
    {
      id: 5,
      title: "圣诞老人过悬崖小游戏",
      code: `<!DOCTYPE html>
      <html lang="en" >
      <head>
      <meta charset="UTF-8">
      <title>HTML5圣诞老人过悬崖游戏</title>
      <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      body {
        font-family: Arial, Verdana, sans-serif;
        cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: #1e1a33;
      }

      div,
      i {
        user-select: none;
        pointer-events: none;
      }

      i {
        position: fixed;
        color: white;
        top: -10%;
        z-index: 9999;
        animation-name: snowflakes-fall, snowflakes-shake;
        animation-duration: 10s, 3s;
        animation-timing-function: linear, ease-in-out;
        animation-iteration-count: infinite, infinite;
        animation-play-state: running, running;
      }

      @keyframes snowflakes-fall {
        0% {
          top: -10%;
        }
        100% {
          top: 100%;
        }
      }

      @keyframes snowflakes-shake {
        0% {
          transform: translateX(0px);
        }
        50% {
          transform: translateX(80px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      </style>
      </head>
      <body>
      <script>
        let status = "waiting";
        let lastTimestamp;
        let santaX;
        let santaY;
        let sceneOffset;
        let score = 0;
        let platforms = [];
        let sticks = [];
        let trees = [];
        let clouds = [];

        const config = {
          canvasWidth: 375,
          canvasHeight: 375,
          platformHeight: 100,
          santaDistanceFromEdge: 10,
          paddingX: 100,
          perfectAreaSize: 10,
          backgroundSpeedMultiplier: 0.2,
          speed: 4,
          santaWidth: 17,
          santaHeight: 30
        };

        const colours = {
          lightBg: "#62AFB9",
          medBg: "#182757",
          darkBg: "#0D5B66",
          lightHill: "#E9E9E9",
          medHill: "#34A65F",
          darkHill: "#07133A",
          platform: "#9B4546",
          platformTop: "#620E0E",
          em: "#CC231E",
          skin: "#CF6D60"
        };

        const hills = [
          {
            baseHeight: 120,
            amplitude: 20,
            stretch: 0.5,
            colour: colours.lightHill
          },
          {
            baseHeight: 100,
            amplitude: 10,
            stretch: 1,
            colour: colours.medHill
          },
          {
            baseHeight: 70,
            amplitude: 20,
            stretch: 0.5,
            colour: colours.darkHill
          }
        ];

        const scoreElement = createElementStyle(
          "div",
          "position:absolute;top:1.5em;font-size:5em;font-weight:900;text-shadow:"+addShadow(
            colours.darkHill,
            7
          )
        );
        const canvas = createElementStyle("canvas");
        const introductionElement = createElementStyle(
          "div",
          "font-size:1.2em;position:absolute;text-align:center;transition:opacity 2s;width:250px",
          "Press and hold anywhere to stretch out a sugar cane, it has to be the exact length or Santa will fall down"
        );
        const perfectElement = createElementStyle(
          "div",
          "position:absolute;opacity:0;transition:opacity 2s",
          "Double Score"
        );
        const restartButton = createElementStyle(
          "button",
          "width:120px;height:120px;position:absolute;border-radius:50%;color:white;background-color:"+colours.em+";border:none;font-weight:700;font-size:1.2em;display:none;cursor:pointer",
          "RESTART"
        );

        for (let i = 0; i <= 30; i++) {
          createElementStyle(
            "i",
            "font-size: "+3 * Math.random()+"em;left: "+
              100 * Math.random()
            +"%; animation-delay: "+10 * Math.random()+"s, "+2 * Math.random()+"s",
            "."
          );
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");

        Array.prototype.last = function () {
          return this[this.length - 1];
        };

        Math.sinus = function (degree) {
          return Math.sin((degree / 180) * Math.PI);
        };

        window.addEventListener("keydown", function (event) {
          if (event.key == " ") {
            event.preventDefault();
            resetGame();
            return;
          }
        });

        ["mousedown", "touchstart"].forEach(function (evt) {
          window.addEventListener(evt, function (event) {
            if (status == "waiting") {
              lastTimestamp = undefined;
              introductionElement.style.opacity = 0;
              status = "stretching";
              window.requestAnimationFrame(animate);
            }
          });
        });

        ["mouseup", "touchend"].forEach(function (evt) {
          window.addEventListener(evt, function (event) {
            if (status == "stretching") {
              status = "turning";
            }
          });
        });

        window.addEventListener("resize", function (event) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          draw();
        });

        restartButton.addEventListener("click", function (event) {
          event.preventDefault();
          resetGame();
          restartButton.style.display = "none";
        });

        window.requestAnimationFrame(animate);

        resetGame();

        function resetGame() {
          status = "waiting";
          lastTimestamp = undefined;
          sceneOffset = 0;
          score = 0;
          introductionElement.style.opacity = 1;
          perfectElement.style.opacity = 0;
          restartButton.style.display = "none";
          scoreElement.innerText = score;
          platforms = [{ x: 50, w: 50 }];
          santaX = platforms[0].x + platforms[0].w - config.santaDistanceFromEdge;
          santaY = 0;
          sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];
          trees = [];
          clouds = [];

          for (let i = 0; i <= 20; i++) {
            if (i <= 3) generatePlatform();
            generateTree();
            generateCloud();
          }

          draw();
        }

        function generateCloud() {
          const minimumGap = 60;
          const maximumGap = 300;

          const lastCloud = clouds[clouds.length - 1];
          let furthestX = lastCloud ? lastCloud.x : 0;

          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));

          const y =
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap)) -
            window.innerHeight / 1.2;

          const w = Math.floor(Math.random() * 15 + 15);
          clouds.push({ x, y, w });
        }

        function generateTree() {
          const minimumGap = 30;
          const maximumGap = 150;

          const lastTree = trees[trees.length - 1];
          let furthestX = lastTree ? lastTree.x : 0;

          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));

          const treeColors = [colours.lightHill, colours.medBg, colours.medHill];
          const color = treeColors[Math.floor(Math.random() * 3)];

          trees.push({ x, color });
        }

        function generatePlatform() {
          const minimumGap = 40;
          const maximumGap = 200;
          const minimumWidth = 20;
          const maximumWidth = 100;

          const lastPlatform = platforms[platforms.length - 1];
          let furthestX = lastPlatform.x + lastPlatform.w;

          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));
          const w =
            minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

          platforms.push({ x, w });
        }

        function animate(timestamp) {
          if (!lastTimestamp) {
            lastTimestamp = timestamp;
            window.requestAnimationFrame(animate);
            return;
          }

          switch (status) {
            case "waiting":
              return;
            case "stretching": {
              sticks.last().length += (timestamp - lastTimestamp) / config.speed;
              break;
            }
            case "turning": {
              sticks.last().rotation += (timestamp - lastTimestamp) / config.speed;

              if (sticks.last().rotation > 90) {
                sticks.last().rotation = 90;

                const [nextPlatform, perfectHit] = thePlatformTheStickHits();
                if (nextPlatform) {
                  score += perfectHit ? 2 : 1;
                  scoreElement.innerText = score;

                  if (perfectHit) {
                    perfectElement.style.opacity = 1;
                    setTimeout(() => (perfectElement.style.opacity = 0), 1000);
                  }

                  generatePlatform();
                  generateTree();
                  generateTree();

                  generateCloud();
                  generateCloud();
                }

                status = "walking";
              }
              break;
            }
            case "walking": {
              santaX += (timestamp - lastTimestamp) / config.speed;

              const [nextPlatform] = thePlatformTheStickHits();
              if (nextPlatform) {
                const maxSantaX =
                  nextPlatform.x + nextPlatform.w - config.santaDistanceFromEdge;
                if (santaX > maxSantaX) {
                  santaX = maxSantaX;
                  status = "transitioning";
                }
              } else {
                const maxSantaX =
                  sticks.last().x + sticks.last().length + config.santaWidth;
                if (santaX > maxSantaX) {
                  santaX = maxSantaX;
                  status = "falling";
                }
              }
              break;
            }
            case "transitioning": {
              sceneOffset += (timestamp - lastTimestamp) / (config.speed / 2);

              const [nextPlatform] = thePlatformTheStickHits();
              if (sceneOffset > nextPlatform.x + nextPlatform.w - config.paddingX) {
                sticks.push({
                  x: nextPlatform.x + nextPlatform.w,
                  length: 0,
                  rotation: 0
                });
                status = "waiting";
              }
              break;
            }
            case "falling": {
              if (sticks.last().rotation < 180)
                sticks.last().rotation += (timestamp - lastTimestamp) / config.speed;

              santaY += (timestamp - lastTimestamp) / (config.speed / 2);
              const maxSantaY =
                config.platformHeight +
                100 +
                (window.innerHeight - config.canvasHeight) / 2;
              if (santaY > maxSantaY) {
                restartButton.style.display = "block";
                return;
              }
              break;
            }
            default:
              throw Error("Wrong status");
          }

          draw();
          window.requestAnimationFrame(animate);

          lastTimestamp = timestamp;
        }

        function thePlatformTheStickHits() {
          if (sticks.last().rotation != 90)
            throw Error("Stick is "+sticks.last().rotation+"°");
          const stickFarX = sticks.last().x + sticks.last().length;

          const platformTheStickHits = platforms.find(
            (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
          );

          if (
            platformTheStickHits &&
            platformTheStickHits.x +
              platformTheStickHits.w / 2 -
              config.perfectAreaSize / 2 <
              stickFarX &&
            stickFarX <
              platformTheStickHits.x +
                platformTheStickHits.w / 2 +
                config.perfectAreaSize / 2
          )
            return [platformTheStickHits, true];

          return [platformTheStickHits, false];
        }

        function draw() {
          ctx.save();
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          drawBackground();
          ctx.translate(
            (window.innerWidth - config.canvasWidth) / 2 - sceneOffset,
            (window.innerHeight - config.canvasHeight) / 2
          );

          drawPlatforms();
          drawSanta();
          drawSticks();

          ctx.restore();
        }

        function drawPlatforms() {
          platforms.forEach(({ x, w }) => {
            let newX = x + 3;
            let newW = w - 6;
            let platformHeight =
              config.platformHeight + (window.innerHeight - config.canvasHeight) / 2;
            ctx.fillStyle = colours.platform;
            ctx.fillRect(
              newX,
              config.canvasHeight - config.platformHeight,
              newW,
              platformHeight
            );

            for (let i = 1; i <= platformHeight / 10; ++i) {
              let yGap = config.canvasHeight - config.platformHeight + i * 10;
              ctx.moveTo(newX, yGap);
              ctx.lineTo(newX + newW, yGap);
              let xGap = i % 2 ? 0 : 10;
              for (let j = 1; j < newW / 30; ++j) {
                let x = j * 20 + xGap;
                ctx.moveTo(newX + x, yGap);
                ctx.lineTo(newX + x, yGap + 10);
              }
              ctx.strokeStyle = colours.platformTop;
              ctx.stroke();
            }

            ctx.fillStyle = colours.platformTop;
            ctx.fillRect(x, config.canvasHeight - config.platformHeight, w, 10);

            if (sticks.last().x < x) {
              ctx.fillStyle = "white";
              ctx.fillRect(
                x + w / 2 - config.perfectAreaSize / 2,
                config.canvasHeight - config.platformHeight,
                config.perfectAreaSize,
                config.perfectAreaSize
              );
            }
          });
        }

        function drawSanta() {
          ctx.save();
          ctx.fillStyle = "red";
          ctx.translate(
            santaX - config.santaWidth / 2,
            santaY +
              config.canvasHeight -
              config.platformHeight -
              config.santaHeight / 2
          );

          ctx.fillRect(
            -config.santaWidth / 2,
            -config.santaHeight / 2,
            config.santaWidth,
            config.santaHeight - 4
          );

          const legDistance = 5;
          ctx.beginPath();
          ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = colours.skin;
          ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(7, -2, 3, 0, Math.PI * 2, false);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.moveTo(-8, -13.5);
          ctx.lineTo(-15, -3.5);
          ctx.lineTo(-5, -7);
          ctx.fill();

          ctx.fillStyle = "white";
          ctx.fillRect(-config.santaWidth / 2, -12, config.santaWidth, 3);

          ctx.fillStyle = "black";
          ctx.fillRect(-config.santaWidth / 2, 2, config.santaWidth, 2);
          ctx.fillStyle = "white";
          ctx.fillRect(-config.santaWidth / 2, 4, config.santaWidth, 4.5);

          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(-17, -2, 3, 0, Math.PI * 2, false);
          ctx.fill();

          ctx.restore();
        }

        function drawSticks() {
          sticks.forEach((stick) => {
            ctx.save();

            ctx.translate(stick.x, config.canvasHeight - config.platformHeight);
            ctx.rotate((Math.PI / 180) * stick.rotation);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -stick.length);

            ctx.strokeStyle = ctx.createPattern(createCandyPattern(), "repeat");
            ctx.stroke();

            ctx.restore();
          });
        }

        function drawBackground() {
          var gradient = ctx.createRadialGradient(
            window.innerWidth / 2,
            window.innerHeight / 2,
            0,
            window.innerHeight / 2,
            window.innerWidth / 2,
            window.innerWidth
          );
          gradient.addColorStop(0, colours.lightBg);
          gradient.addColorStop(1, colours.darkBg);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

          hills.forEach((hill) =>
            drawHill(hill.baseHeight, hill.amplitude, hill.stretch, hill.colour)
          );
          trees.forEach((tree) => drawTree(tree.x, tree.color));
          clouds.forEach((cloud) => drawCloud(cloud.x, cloud.y, cloud.w));
        }

        function drawHill(baseHeight, amplitude, stretch, color) {
          ctx.beginPath();
          ctx.moveTo(0, window.innerHeight);
          ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
          for (let i = 0; i < window.innerWidth; i++) {
            ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
          }
          ctx.lineTo(window.innerWidth, window.innerHeight);
          ctx.fillStyle = color;
          ctx.fill();
        }

        function drawTree(x, color) {
          ctx.save();
          ctx.translate(
            (-sceneOffset * config.backgroundSpeedMultiplier + x) * hills[1].stretch,
            getTreeY(x, hills[1].baseHeight, hills[1].amplitude)
          );

          const treeTrunkHeight = 15;
          const treeTrunkWidth = 10;
          const treeCrownHeight = 60;
          const treeCrownWidth = 30;

          // Draw trunk
          ctx.fillStyle = colours.darkHill;
          ctx.fillRect(
            -treeTrunkWidth / 2,
            -treeTrunkHeight,
            treeTrunkWidth,
            treeTrunkHeight
          );

          // Draw crown
          ctx.beginPath();

          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight * 3);
          ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight * 3);

          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight * 2);
          ctx.lineTo(0, -(treeTrunkHeight / 2 + treeCrownHeight));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight * 2);

          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
          ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight / 2));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);

          ctx.fillStyle = color;
          ctx.fill();

          ctx.restore();
        }

        function drawCloud(x, y, width) {
          ctx.save();
          ctx.translate(
            (-sceneOffset * config.backgroundSpeedMultiplier + x) * hills[1].stretch,
            getTreeY(x, hills[1].baseHeight, hills[1].amplitude)
          );

          height = width * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, width, Math.PI * 0.5, Math.PI * 1.5);
          ctx.arc(x + height, y - width, height, Math.PI * 1, Math.PI * 2);
          ctx.arc(x + height * 2, y - width, height, Math.PI * 1.2, Math.PI);
          ctx.arc(x + width * 3, y, width, Math.PI * 1.5, Math.PI * 0.5);
          ctx.moveTo(x + width * 3, y + width);
          ctx.lineTo(x, y + width);
          ctx.fillStyle = "rgba(255, 255, 255, .3)";
          ctx.fill();

          ctx.restore();
        }

        function createCandyPattern() {
          const patternCanvas = document.createElement("canvas");
          const pctx = patternCanvas.getContext("2d");

          const max = 15;
          let i = 0;
          let x = 0;
          let z = 90;

          while (i < max) {
            pctx.beginPath();
            pctx.moveTo(0, x);
            pctx.lineTo(0, z);
            pctx.lineWidth = 24;
            pctx.strokeStyle = "red";
            pctx.stroke();

            pctx.beginPath();
            pctx.moveTo(0, x + 24);
            pctx.lineTo(0, z + 24);
            pctx.lineWidth = 24;
            pctx.strokeStyle = "white";
            pctx.stroke();

            x += 48;
            z += 48;
            i++;
          }

          return patternCanvas;
        }

        function getHillY(windowX, baseHeight, amplitude, stretch) {
          const sineBaseY = window.innerHeight - baseHeight;
          return (
            Math.sinus(
              (sceneOffset * config.backgroundSpeedMultiplier + windowX) * stretch
            ) *
              amplitude +
            sineBaseY
          );
        }

        function getTreeY(x, baseHeight, amplitude) {
          const sineBaseY = window.innerHeight - baseHeight;
          return Math.sinus(x) * amplitude + sineBaseY;
        }

        function createElementStyle(element, cssStyles = null, inner = null) {
          const g = document.createElement(element);
          if (cssStyles) g.style.cssText = cssStyles;
          if (inner) g.innerHTML = inner;
          document.body.appendChild(g);
          return g;
        }

        function addShadow(colour, depth) {
          let shadow = "";
          for (let i = 0; i <= depth; i++) {
            shadow += i+"px "+i+"px 0 "+"colour";
            shadow += i < depth ? ", " : "";
          }
          return shadow;
        }
      </script>
      </body>
      </html>
      `
    },
    {
      id: 6,
      title: "卡通人物奔跑控制",
      code: `<!DOCTYPE html>
      <html>
        <head>
          <title>js控制人物各个方向奔跑动画</title>
          <meta charset="utf-8" />
          <style type="text/css">
            table {
              position: absolute;
              top: 100px;
              left: 100px;
              width: 150px;
              height: 150px;
            }
            input {
              width: 40px;
              height: 30px;
              background: orange;
              color: white;
              font-weight: bold;
              border: none;
              border-radius: 5px;
            }
            img {
              position: absolute;
              top: 300px;
              left: 500px;
            }
          </style>
        </head>
        <body>
          <img id="im" src="https://cos-1316467447.cos.ap-beijing.myqcloud.com/down-0.png" />
          <table>
            <tr>
              <td><input id="leftUp" type="button" value="左上" /></td>
              <td><input id="goUp" type="button" value="向上" /></td>
              <td><input id="rightUp" type="button" value="右上" /></td>
            </tr>
            <tr>
              <td><input id="goLeft" type="button" value="左" /></td>
              <td><input id="stop" type="button" value="停止" /></td>
              <td><input id="goRight" type="button" value="右" /></td>
            </tr>
            <tr>
              <td><input id="leftDown" type="button" value="左下" /></td>
              <td><input id="goDown" type="button" value="向下" /></td>
              <td><input id="rightDown" type="button" value="右下" /></td>
            </tr>
          </table>
          <script type="text/javascript">
            var i = 0,
              clc = null,
              flage;
            var images = document.getElementById("im");

            var oGoUp = document.getElementById("goUp");
            var oGoDown = document.getElementById("goDown");
            var oGoLeft = document.getElementById("goLeft");
            var oGoRight = document.getElementById("goRight");
            var oLeftUp = document.getElementById("leftUp");
            var oLeftDown = document.getElementById("leftDown");
            var oRightUp = document.getElementById("rightUp");
            var oRightDown = document.getElementById("rightDown");
            var oStop = document.getElementById("stop");

            images.style.top = "300px";
            images.style.left = "500px";

            //停止
            oStop.onclick = function () {
              switch (flage) {
                case 1:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/up-0.png";
                  break;
                case 2:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/down-0.png";
                  break;
                case 3:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/left-0.png";
                  break;
                case 4:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/right-0.png";
                  break;
                case 5:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/rightUp-0.png";
                  break;
                case 6:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/rd-0.png";
                  break;
                case 7:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/ld-0.png";
                  break;
                case 8:
                  images.src = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/lu-0.png";
                  break;
              }
              clearInterval(clc);
            };
            //向上
            oGoUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goUp(i++);", 100);
            };
            function goUp() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/up-" + i + "." + "png";
              images.src = name;
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 1;
            }
            //向下
            oGoDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goDown(i++);", 100);
            };
            function goDown() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/down-" + i + "." + "png";
              images.src = name;
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 2;
            }
            //向左
            oGoLeft.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeft(i++);", 100);
            };
            function goLeft() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/left-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              flage = 3;
            }
            //向右
            oGoRight.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRight(i++);", 100);
            };
            function goRight() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/right-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              flage = 4;
            }
            //向右上
            oRightUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRightUp(i++);", 100);
            };
            function goRightUp() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/rightUp-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 5;
            }
            //向右下
            oRightDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRightDown(i++);", 100);
            };
            function goRightDown() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/rd-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 6;
            }
            //向左下
            oLeftDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeftDown(i++);", 100);
            };
            function goLeftDown() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/ld-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 7;
            }
            //向左上
            oLeftUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeftUp(i++);", 100);
            };
            function goLeftUp() {
              i = i % 4;
              var name = "https://cos-1316467447.cos.ap-beijing.myqcloud.com/lu-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 8;
            }
          </script>
        </body>
      </html>
      `
    },
    {
      id: 7,
      title: "宇宙星空",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .bg-gray-dark-mktg {
              background-image: radial-gradient(#04255b, #020a1d);
            }
            .d-flex {
              display: flex !important;
            }
            .overflow-hidden {
              overflow: hidden !important;
            }
            .position-relative {
              position: relative !important;
            }
            .flex-auto {
              flex: auto !important;
            }
            .flex-column {
              flex-direction: column !important;
            }
            .sky-space-bg {
              position: absolute;
              top: 36vh;
              left: 42vw;
              height: 16vw;
              width: 16vw;
            }
            .sky-bg-stars {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              overflow: hidden;
              background-image: radial-gradient(
                  1px 2px at 50px 50px,
                  #eee,
                  rgba(0, 0, 0, 0)
                ),
                radial-gradient(2px 3px at 20px 35px, #fff, rgba(0, 0, 0, 0)),
                radial-gradient(3px 3px at 60px 20px, #ddd, rgba(0, 0, 0, 0));
              background-repeat: repeat;
              background-size: 200px 200px;
              opacity: 0.2;
              animation: opacity 8s infinite;
            }
            .sky-bg-stars:nth-child(1) {
              background-position: 0% 90%;
              animation-delay: 0s;
            }
            .sky-bg-stars:nth-child(2) {
              background-position: 50% 10%;
              animation-delay: 0.6s;
            }
            .sky-bg-stars:nth-child(3) {
              background-position: 40% -80%;
              background-size: 120px 200px;
              animation-delay: 1.8s;
            }
            .sky-bg-stars:nth-child(4) {
              background-position: 150% -80%;
              background-size: 220px 100px;
              animation-delay: 3.2s;
            }
            .sky-space,
            .sky-stars {
              position: absolute;
              top: 0;
              right: 5vw;
              bottom: 0;
              left: 5vw;
              overflow: hidden;
            }
            .sky-stars {
              background-image: radial-gradient(
                  2px 2px at 50px 200px,
                  #eee,
                  rgba(0, 0, 0, 0)
                ),
                radial-gradient(3px 3px at 40px 60px, #fff, rgba(0, 0, 0, 0)),
                radial-gradient(4px 5px at 100px 30px, #ddd, rgba(0, 0, 0, 0));
              background-repeat: repeat;
              background-size: 380px 380px;
              opacity: 0;
              animation-name: zoom;
              animation-delay: 0s;
              animation-duration: 10s;
              animation-timing-function: ease-out;
              animation-iteration-count: infinite;
            }
            .sky-stars:nth-child(1) {
              top: 20vh;
              bottom: 20vh;
              left: 10vw;
              right: 10vw;
              background-size: 120px 120px;
              background-position: 10% 90%;
            }
            .sky-stars:nth-child(2) {
              background-position: 20% 50%;
              animation-delay: 0.3s;
            }
            .sky-stars:nth-child(3) {
              background-position: 40% 20%;
              animation-delay: 1.3s;
            }
            .sky-stars:nth-child(4) {
              background-position: 50% 10%;
              background-size: 200px 200px;
              transform: rotate(60deg);
              animation-delay: 2.1s;
            }
            .sky-stars:nth-child(5) {
              background-position: 30% 30%;
              background-size: 120px 270px;
              animation-delay: 3s;
            }
            .sky-stars:nth-child(6) {
              background-position: 50% 20%;
              animation-delay: 5.5s;
            }
            @keyframes opacity {
              0% {
                opacity: 0.2;
                transform: rotate(-5deg);
                animation-timing-function: ease-in;
              }
              50% {
                opacity: 0.8;
                transform: rotate(-13deg);
                animation-timing-function: ease-in;
              }
              100% {
                opacity: 0.1;
                transform: rotate(-20deg);
                animation-timing-function: ease-in;
              }
            }
            @keyframes zoom {
              0% {
                opacity: 0.02;
                transform: scale(0.1);
                transform: rotate(-20deg);
                animation-timing-function: ease-in;
              }
              5% {
                opacity: 0.05;
              }
              50% {
                opacity: 0.6;
              }
              75% {
                opacity: 0.3;
                transform: scale(1.8);
              }
              100% {
                opacity: 0.1;
                transform: scale(2.2);
              }
            }
          </style>
        </head>
        <body>
          <div
            class="js-warp-hide bg-gray-dark-mktg d-flex flex-auto flex-column overflow-hidden position-relative"
            style="width: 100vw; height: 100vh"
          >
            <div class="sky-space">
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
            </div>
            <div class="sky-space-bg">
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
            </div>
          </div>
        </body>
        <script>
          function clickEffect() {
            let balls = [];
            let longPressed = false;
            let longPress;
            let multiplier = 0;
            let width, height;
            let origin;
            let normal;
            let ctx;
            const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
            const canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            canvas.setAttribute(
              "style",
              "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
            );
            const pointer = document.createElement("span");
            pointer.classList.add("pointer");
            document.body.appendChild(pointer);

            if (canvas.getContext && window.addEventListener) {
              ctx = canvas.getContext("2d");
              updateSize();
              window.addEventListener("resize", updateSize, false);
              loop();
              window.addEventListener(
                "mousedown",
                function (e) {
                  pushBalls(randBetween(10, 20), e.clientX, e.clientY);
                  document.body.classList.add("is-pressed");
                  longPress = setTimeout(function () {
                    document.body.classList.add("is-longpress");
                    longPressed = true;
                  }, 500);
                },
                false
              );
              window.addEventListener(
                "mouseup",
                function (e) {
                  clearInterval(longPress);
                  if (longPressed == true) {
                    document.body.classList.remove("is-longpress");
                    pushBalls(
                      randBetween(
                        50 + Math.ceil(multiplier),
                        100 + Math.ceil(multiplier)
                      ),
                      e.clientX,
                      e.clientY
                    );
                    longPressed = false;
                  }
                  document.body.classList.remove("is-pressed");
                },
                false
              );
              window.addEventListener(
                "mousemove",
                function (e) {
                  let x = e.clientX;
                  let y = e.clientY;
                  pointer.style.top = y + "px";
                  pointer.style.left = x + "px";
                },
                false
              );
            } else {
              // console.log("canvas or addEventListener is unsupported!");
            }

            function updateSize() {
              canvas.width = window.innerWidth * 2;
              canvas.height = window.innerHeight * 2;
              canvas.style.width = window.innerWidth + "px";
              canvas.style.height = window.innerHeight + "px";
              ctx.scale(2, 2);
              width = canvas.width = window.innerWidth;
              height = canvas.height = window.innerHeight;
              origin = {
                x: width / 2,
                y: height / 2,
              };
              normal = {
                x: width / 2,
                y: height / 2,
              };
            }
            class Ball {
              constructor(x = origin.x, y = origin.y) {
                this.x = x;
                this.y = y;
                this.angle = Math.PI * 2 * Math.random();
                if (longPressed == true) {
                  this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
                } else {
                  this.multiplier = randBetween(6, 12);
                }
                this.vx =
                  (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
                this.vy =
                  (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
                this.r = randBetween(8, 12) + 3 * Math.random();
                this.color = colours[Math.floor(Math.random() * colours.length)];
              }
              update() {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
                normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
                normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
                this.r -= 0.3;
                this.vx *= 0.9;
                this.vy *= 0.9;
              }
            }

            function pushBalls(count = 1, x = origin.x, y = origin.y) {
              for (let i = 0; i < count; i++) {
                balls.push(new Ball(x, y));
              }
            }

            function randBetween(min, max) {
              return Math.floor(Math.random() * max) + min;
            }

            function loop() {
              ctx.fillStyle = "rgba(255, 255, 255, 0)";
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (b.r < 0) continue;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                ctx.fill();
                b.update();
              }
              if (longPressed == true) {
                multiplier += 0.2;
              } else if (!longPressed && multiplier >= 0) {
                multiplier -= 0.4;
              }
              removeBall();
              requestAnimationFrame(loop);
            }

            function removeBall() {
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (
                  b.x + b.r < 0 ||
                  b.x - b.r > width ||
                  b.y + b.r < 0 ||
                  b.y - b.r > height ||
                  b.r < 0
                ) {
                  balls.splice(i, 1);
                }
              }
            }
          }
          clickEffect(); //调用
        </script>
      </html>
      `
    },
    {
      id: 8,
      title: "canvas画板",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            html,
            body {
              margin: 0;
              padding: 0;
            }
            .saveimg {
              text-align: center;
            }
            .saveimgs span {
              display: inline-block;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div align="center">
            <canvas
              id="myCanvas"
              width="500"
              height="300"
              style="border: 1px solid #6699cc"
            ></canvas>
            <div class="control-ops control">
              <button
                type="button"
                class="btn btn-primary"
                onclick="javascript:clearArea();return false;"
              >
                清空画板
              </button>
              Line width :
              <select id="selWidth" onchange="aaa()">
                <option value="1">1</option>
                <option value="3" selected="selected">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="11">11</option>
              </select>
              Color :
              <select id="selColor" onchange="aaa2()">
                <option value="black" selected="selected">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
              </select>
              <button
                type="button"
                class="saveimg"
                onclick="javascript:saveImageInfo();return false;"
              >
                保存
              </button>
            </div>
            <div class="saveimgs"></div>
          </div>
        </body>
        <script>
          var mousePressed = false;
          var lastX, lastY;
          var ctx = document.getElementById("myCanvas").getContext("2d");
          var c = document.getElementById("myCanvas");
          var control = document.getElementsByClassName("control")[0];
          var saveimgs = document.getElementsByClassName("saveimgs")[0];

          window.onload = function () {
            InitThis();
          };

          function saveImageInfo() {
            var image = c.toDataURL("image/png");
            var ctximg = document.createElement("span");
            ctximg.innerHTML = "<img src='" + image + "' alt='from canvas'/>";
            if (saveimgs.getElementsByTagName("span").length >= 1) {
              var span_old = saveimgs.getElementsByTagName("span")[0];
              saveimgs.replaceChild(ctximg, span_old);
            } else {
              saveimgs.appendChild(ctximg);
            }
          }

          var selected1, selected2;

          function aaa() {
            var sel = document.getElementById("selWidth");
            var value = sel.selectedIndex;
            return (selected1 = sel[value].value);
          }

          function aaa2() {
            var sel2 = document.getElementById("selColor");
            var value = sel2.selectedIndex;
            return (selected2 = sel2[value].value);
          }

          function InitThis() {
            //          触摸屏
            c.addEventListener(
              "touchstart",
              function (event) {
                // console.log(1);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，重要
                  var touch = event.targetTouches[0];
                  mousePressed = true;
                  Draw(
                    touch.pageX - this.offsetLeft,
                    touch.pageY - this.offsetTop,
                    false
                  );
                }
              },
              false
            );

            c.addEventListener(
              "touchmove",
              function (event) {
                // console.log(2);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，重要
                  var touch = event.targetTouches[0];
                  if (mousePressed) {
                    Draw(
                      touch.pageX - this.offsetLeft,
                      touch.pageY - this.offsetTop,
                      true
                    );
                  }
                }
              },
              false
            );

            c.addEventListener(
              "touchend",
              function (event) {
                // console.log(3);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
                  //                  var touch = event.targetTouches[0];
                  mousePressed = false;
                }
              },
              false
            );

            //         鼠标
            c.onmousedown = function (event) {
              mousePressed = true;
              Draw(
                event.pageX - this.offsetLeft,
                event.pageY - this.offsetTop,
                false
              );
            };

            c.onmousemove = function (event) {
              if (mousePressed) {
                Draw(
                  event.pageX - this.offsetLeft,
                  event.pageY - this.offsetTop,
                  true
                );
              }
            };

            c.onmouseup = function (event) {
              mousePressed = false;
            };
          }

          function Draw(x, y, isDown) {
            if (isDown) {
              ctx.beginPath();
              ctx.strokeStyle = selected2;
              ctx.lineWidth = selected1;
              ctx.lineJoin = "round";
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(x, y);
              ctx.closePath();
              ctx.stroke();
            }
            lastX = x;
            lastY = y;
          }

          function clearArea() {
            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // 清除签名图片
            if (saveimgs.getElementsByTagName("span").length >= 1) {
              var clearImg = saveimgs.getElementsByTagName("span")[0];
              saveimgs.removeChild(clearImg);
            }
          }
        </script>
      </html>
      `
    },
    {
      id: 9,
      title: "canvas画饼图",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <canvas id="canvas"></canvas>
        </body>
        <script>
          var canvas = document.getElementById("canvas");
          canvas.width = "600";
          canvas.height = "400";
          var ctx = canvas.getContext("2d");
          var sum = 0; // 总和
          var arr = []; //存储每一个扇形的值
          var colors = []; //存储每一个扇形的颜色
          var start = 0; //每一个扇形的开始π值
          var end = 0; //每一个扇形的结束数π值
          var r = 150; //半径
          var lineX = (lineY = 0);
          ctx.translate(300, 200);


          function init() {
            for (var i = 0; i < 6; i++) {
              var color = "#" + Math.random().toString(16).substr(2, 6).toUpperCase(); //随机颜色
              colors.push(color);

              var value = Math.round(Math.random() * 100 + 20); //在一定范围内随机数值
              arr.push(value);

              sum += value; //累加总和
            }
          }
          init();
          function draw() {
            for (var i = 0; i < arr.length; i++) {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              //计算画圆的结束位置
              end = start + (arr[i] / sum) * 2 * Math.PI;
              // console.log('end',end)
              //画圆
              ctx.arc(0, 0, r, start, end);
              ctx.fillStyle = colors[i]; //设置填充颜色
              ctx.fill();
              //画边 白色，用来隔开
              ctx.strokeStyle = "white";
              ctx.stroke();
              ctx.closePath();

              //画指示线和显示比例
              var dis = 0;
              ctx.beginPath();
              ctx.strokeStyle = "black";
              //计算每个圆弧的中间位置的坐标
              lineX = Math.cos(start + (end - start) / 2) * r;
              lineY = Math.sin(start + (end - start) / 2) * r;

              ctx.moveTo(lineX, lineY);
              //坐标的正负来确定线绘制的方向
              if (lineX > 0 && lineY > 0) {
                dis = 70;
              } else if (lineX < 0 && lineY < 0) {
                dis = -70;
              } else if (lineX < 0) {
                dis = -70;
              } else if (lineY < 0) {
                dis = 70;
              }

              ctx.lineTo(lineX + dis, lineY);
              ctx.stroke();
              //绘制百分比
              var text = Math.round((arr[i] / sum) * 100) + "%";
              ctx.fillText(text, lineX + dis, lineY);
              ctx.closePath();
              start = end;
            }
          }
          draw();
        </script>
      </html>
      `
    },
    {
      id: 10,
      title: "js原生实现录屏",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body></body>
        <script>
          const streamPromise = navigator.mediaDevices.getDisplayMedia(); // 请求屏幕捕获
          streamPromise.then((stream) => {
            var recordedChunks = []; // 录制的视频数据
            // console.log(stream);
            var options = { mimeType: "video/webm; codecs=vp9" }; // 设置编码格式
            var mediaRecorder = new MediaRecorder(stream, options); // 初始化MediaRecorder实例
            mediaRecorder.ondataavailable = handleDataAvailable; // 设置数据可用（录屏结束）时的回调
            mediaRecorder.start();

            function handleDataAvailable(event) {
              // console.log("data-available");
              if (event.data.size > 0) {
                recordedChunks.push(event.data); // 添加数据，event.data是一个BLOB对象
                // console.log(recordedChunks);
                download(); // 封装成BLOB对象并下载
              } else {
                // ...
              }
            }

            function download() {
              var blob = new Blob(recordedChunks, {
                type: "video/webm",
              });
              var url = URL.createObjectURL(blob);
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";
              a.href = url;
              a.download = "test.webm";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          });
        </script>
      </html>
      `
    },
    {
      id: 11,
      title: "卡片翻转功能",
      code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              background-image: radial-gradient(
                circle 588px at 31.7% 40.2%,
                rgba(225, 200, 239, 1) 21.4%,
                rgba(163, 225, 233, 1) 57.1%
              );
              padding: 25px;
            }
            .container {
              width: 150px;
              height: 200px;
              position: relative;
              perspective: 1000px;
            }
            .just,
            .back {
              width: 100%;
              height: 100%;
              position: absolute;
              backface-visibility: hidden;
              transition: transform 0.25s ease-in-out;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
            }
            .just {
              transform: rotateY(0deg);
              background-image: linear-gradient(
                109.6deg,
                rgba(245, 56, 56, 1) 11.2%,
                rgba(234, 192, 117, 1) 78%
              );
            }
            .container:hover .just {
              transform: rotateY(180deg);
            }
            .back {
              transform: rotateY(-180deg);
              background-image: linear-gradient(
                117deg,
                rgba(123, 216, 96, 1) 39.2%,
                rgba(255, 255, 255, 1) 156.2%
              );
            }
            .container:hover .back {
              transform: rotateY(0deg);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="just">我在前</div>
            <div class="back">我在后</div>
          </div>
        </body>
      </html>
      `
    },
    {
      id: 12,
      title: "高德地图轨迹回放",
      code: `<!doctype html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
          <title>轨迹回放</title>
          <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
          <style>
              html, body, #container {
                  height: 100%;
                  width: 100%;
              }

              .input-card .btn{
                  margin-right: 1.2rem;
                  width: 9rem;
              }

              .input-card .btn:last-child{
                  margin-right: 0;
              }
          </style>
      </head>
      <body>
      <div id="container"></div>
      <div class="input-card">
          <h4>轨迹回放控制</h4>
          <div class="input-item">
              <input type="button" class="btn" value="开始动画" id="start" onclick="startAnimation()"/>
              <input type="button" class="btn" value="暂停动画" id="pause" onclick="pauseAnimation()"/>
          </div>
          <div class="input-item">
              <input type="button" class="btn" value="继续动画" id="resume" onclick="resumeAnimation()"/>
              <input type="button" class="btn" value="停止动画" id="stop" onclick="stopAnimation()"/>
          </div>
      </div>
      <!-- <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=您申请的key值"></script> -->
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=b3fdfdfa194f0e9259fe6403aceff876&plugin=AMap.MouseTool"></script>
      <script>
          // JSAPI2.0 使用覆盖物动画必须先加载动画插件
          AMap.plugin('AMap.MoveAnimation', function(){
              var marker, lineArr = [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]];

              var map = new AMap.Map("container", {
                  resizeEnable: true,
                  center: [116.397428, 39.90923],
                  zoom: 17
              });

              marker = new AMap.Marker({
                  map: map,
                  position: [116.478935,39.997761],
                  icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                  offset: new AMap.Pixel(-13, -26),
              });

              // 绘制轨迹
              var polyline = new AMap.Polyline({
                  map: map,
                  path: lineArr,
                  showDir:true,
                  strokeColor: "#28F",  //线颜色
                  // strokeOpacity: 1,     //线透明度
                  strokeWeight: 6,      //线宽
                  // strokeStyle: "solid"  //线样式
              });

              var passedPolyline = new AMap.Polyline({
                  map: map,
                  strokeColor: "#AF5",  //线颜色
                  strokeWeight: 6,      //线宽
              });


              marker.on('moving', function (e) {
                  passedPolyline.setPath(e.passedPath);
                  map.setCenter(e.target.getPosition(),true)
              });

              map.setFitView();

              window.startAnimation = function startAnimation () {
                  marker.moveAlong(lineArr, {
                      // 每一段的时长
                      duration: 500,//可根据实际采集时间间隔设置
                      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                      autoRotation: true,
                  });
              };

              window.pauseAnimation = function () {
                  marker.pauseMove();
              };

              window.resumeAnimation = function () {
                  marker.resumeMove();
              };

              window.stopAnimation = function () {
                  marker.stopMove();
              };
          });
      </script>
      </body>
      </html>`
    },
    {
      id: 13,
      title: "css实现整屏滑动",
      code: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>H5 整屏滑动</title>
          <style>
              *{
                  padding: 0;
                  margin: 0;
              }
              .container{
                  height: 100vh;
                  overflow-y: auto;
                  scroll-snap-type: y mandatory;
              }
              .box1{
                  height: 100vh;
                  background-color: paleturquoise;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
              .box2{
                  height: 100vh;
                  background-color: aqua;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
              .box3{
                  height: 100vh;
                  background-color: aquamarine;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="box1">box1</div>
              <div class="box2">box2</div>
              <div class="box3">box3</div>
          </div>
      </body>
      </html>`
    },
    {
      id: 14,
      title: "炫酷白天黑夜按钮",
      code: `<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5和CSS3炫酷黑夜和白天切换开关按钮</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet">
    <!--CSS RESET-->
    <style>
        @font-face {
	font-family: 'icomoon';
	src:url('../fonts/icomoon.eot?rretjt');
	src:url('../fonts/icomoon.eot?#iefixrretjt') format('embedded-opentype'),
		url('../fonts/icomoon.woff?rretjt') format('woff'),
		url('../fonts/icomoon.ttf?rretjt') format('truetype'),
		url('../fonts/icomoon.svg?rretjt#icomoon') format('svg');
	font-weight: normal;
	font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
	font-family: 'icomoon';
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;

	/* Better Font Rendering =========== */
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body, html { font-size: 100%; 	padding: 0; margin: 0;}

/* Reset */
*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

/* Clearfix hack by Nicolas Gallagher: http://nicolasgallagher.com/micro-clearfix-hack/ */
.clearfix:before,
.clearfix:after {
	content: " ";
	display: table;
}

.clearfix:after {
	clear: both;
}

body{
	background: rgb(87,89,102);
	color: #D5D6E2;
	font-weight: 500;
	font-size: 1.05em;
	font-family: "Microsoft YaHei","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif;
}
.htmleaf-links a{ color: rgba(255, 255, 255, 0.6);outline: none;text-decoration: none;-webkit-transition: 0.2s;transition: 0.2s;}
.htmleaf-links a:hover,.htmleaf-links a:focus{color:#74777b;text-decoration: none;}
.htmleaf-container{
	margin: 0 auto;
}

.bgcolor-1 { background: #f0efee; }
.bgcolor-2 { background: #f9f9f9; }
.bgcolor-3 { background: #e8e8e8; }/*light grey*/
.bgcolor-4 { background: #2f3238; color: #fff; }/*Dark grey*/
.bgcolor-5 { background: #df6659; color: #521e18; }/*pink1*/
.bgcolor-6 { background: #2fa8ec; }/*sky blue*/
.bgcolor-7 { background: #d0d6d6; }/*White tea*/
.bgcolor-8 { background: #3d4444; color: #fff; }/*Dark grey2*/
.bgcolor-9 { background: #ef3f52; color: #fff;}/*pink2*/
.bgcolor-10{ background: #64448f; color: #fff;}/*Violet*/
.bgcolor-11{ background: #3755ad; color: #fff;}/*dark blue*/
.bgcolor-12{ background: #3498DB; color: #fff;}/*light blue*/
.bgcolor-20{ background: #494A5F;color: #D5D6E2;}
/* Header */
.htmleaf-header{
	padding: 1em 190px 1em;
	letter-spacing: -1px;
	text-align: center;
}
.htmleaf-header h1 {
	color: #D5D6E2;
	font-weight: 600;
	font-size: 24px;
	line-height: 1;
	margin-bottom: 25px;
}
.htmleaf-header h1 span {
	display: block;
	font-size: 60%;
	font-weight: 400;
	padding: 0.8em 0 0.5em 0;
	color: #c3c8cd;
}
/*nav*/
.htmleaf-demo a{color: #fff;text-decoration: none;}
.htmleaf-demo{width: 100%;padding-bottom: 1.2em;}
.htmleaf-demo a{display: inline-block;margin: 0.5em;padding: 0.6em 1em;border: 3px solid #fff;font-weight: 700;}
.htmleaf-demo a:hover{opacity: 0.6;}
.htmleaf-demo a.current{background:#1d7db1;color: #fff; }
/* Top Navigation Style */
.htmleaf-links {
	position: relative;
	display: inline-block;
	white-space: nowrap;
	font-size: 1em;
	text-align: center;
}

.htmleaf-links::after {
	position: absolute;
	top: 20%;
	left: 60%;
	margin-left: -1px;
	width: 1px;
	height: 50%;
	background: #dbdbdb;
	content: '';
	-webkit-transform: rotate3d(0,0,1,22.5deg);
	transform: rotate3d(0,0,1,22.5deg);
}

.htmleaf-icon {
	display: inline-block;
	margin: 0.5em;
	padding: 0em 0;
	width: 1em;
	text-decoration: none;
}

.htmleaf-icon span {
	display: none;
}

.htmleaf-icon:before {
	margin: 0 5px;
	text-transform: none;
	font-weight: normal;
	font-style: normal;
	font-variant: normal;
	font-family: 'icomoon';
	line-height: 1;
	speak: none;
	-webkit-font-smoothing: antialiased;
}
/* footer */
.htmleaf-footer{width: 100%;padding-top: 10px;}
.htmleaf-small{font-size: 0.8em;}
.center{text-align: center;}
/****/
.related {
	color: #fff;
/*	background: #494A5F;*/
	text-align: center;
	font-size: 1em;
	padding: 0.5em 0;
	overflow: hidden;
}

.related > a {
	vertical-align: top;
	width: calc(100% - 20px);
	max-width: 340px;
	display: inline-block;
	text-align: center;
	margin: 20px 10px;
	padding: 25px;
	font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;
}
.related a {
	display: inline-block;
	text-align: left;
	margin: 10px auto;
	padding: 10px 20px;
	opacity: 0.8;
	-webkit-transition: opacity 0.3s;
	transition: opacity 0.3s;
	-webkit-backface-visibility: hidden;
	text-decoration: none;
}

.related a:hover,
.related a:active {
	opacity: 1;
}

.related a img {
	max-width: 100%;
	opacity: 0.8;
	border-radius: 4px;
}
.related a:hover img,
.related a:active img {
	opacity: 1;
}
.related h3{font-family: "Microsoft YaHei", sans-serif;font-size: 1em}
.related a h3 {
	font-size: 0.85em;
	font-weight: 300;
	margin-top: 0.15em;
	color: #fff;
}
/* icomoon */
.icon-htmleaf-home-outline:before {
	content: "\e5000";
}

.icon-htmleaf-arrow-forward-outline:before {
	content: "\e5001";
}

@media screen and (max-width: 1024px) {
	.htmleaf-header {
		padding: 2em 10% 2em;
	}
	.htmleaf-header h1 {
        font-size:1.4em;
    }
    .htmleaf-links{font-size: 1.4em}
}

@media screen and (max-width: 960px) {
	.htmleaf-header {
		padding: 2em 10% 2em;
	}
	.htmleaf-header h1 {
        font-size:1.2em;
    }
    .htmleaf-links{font-size: 1.2em}
    .related h3{font-size: 1em;}
	.related a h3 {
		font-size: 0.8em;
	}
}

@media screen and (max-width: 766px) {
	.htmleaf-header h1 {
        font-size:1.3em;
    }
    .htmleaf-links{font-size: 1.3em}
}

@media screen and (max-width: 640px) {
	.htmleaf-header {
		padding: 2em 10% 2em;
	}
	.htmleaf-header h1 {
        font-size:1em;
    }
    .htmleaf-links{font-size: 1em}
    .related h3{font-size: 0.8em;}
	.related a h3 {
		font-size: 0.6em;
	}
}
    </style>
    <style>
        *,
        *:after,
        *:before {
            box-sizing: border-box;
        }

        :root {
            --slide-ease: cubic-bezier(.4, -0.3, .6, 1.3);
            /*   --slide-ease: cubic-bezier(.8,-0.3,.2,1.3); */
            --easing: var(--slide-ease);
            --speed: 0.5s;
            --width: clamp(200px, 45vmin, 500px);
            --ar: 8 / 3;
            --ray: hsl(0 0% 100% / 0.5);
            --sun: hsl(47, 91%, 58%);
            --moon: hsl(212, 13%, 82%);
            --crater: hsl(221, 16%, 68%);
            --bg: hsl(219, 30%, 88%);
            --bear-speed: 10s;
            --color: hsl(219 30% 20%);
        }

        [data-dark-mode=true] {
            --bg: hsl(219, 30%, 12%);
            --color: hsl(219 30% 98%);
        }

        .container {
            display: grid;
            place-items: center;
            min-height: 500px;
            overflow: hidden;
            background: var(--bg);
            transition: background var(--speed) var(--easing);
            font-family: sans-serif, system-ui;
        }

        .toggle__backdrop:first-of-type .clouds path:first-of-type {
            fill: var(--ray);
        }

        .toggle {
            -webkit-tap-highlight-color: transparent;
            width: var(--width);
            /* random attempts at tackling the overflow iOS issue */
            z-index: 10;
            will-change: transform;
            isolation: isolate;
            transform: translate3d(0, 0, 0);
            /* End of workaround city   */
            aspect-ratio: var(--ar);
            border-radius: 100vh;
            border: 0;
            position: relative;
            padding: 0;
            overflow: hidden;
            cursor: pointer;
            transition: background var(--speed) var(--easing);
            --sky: hsl(204, 53%, 47%);
            --night: hsl(229, 25%, 16%);
            outline-color: transparent;
            background: hsl(calc(204 + (var(--dark, 0) * 25)) calc((53 - (var(--dark, 0) * 28)) * 1%) calc((47 - (var(--dark, 0) * 31)) * 1%));
            box-shadow:
                calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 100% / 0.95),
                calc(var(--width) * 0) calc(var(--width) * -0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 10% / 0.2),
                calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.5) 0 hsl(210 10% 100% / 0.15);
        }

        .toggle:after {
            content: "";
            position: absolute;
            inset: 0;
            box-shadow:
                calc(var(--width) * 0) calc(var(--width) * -0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.15) inset,
                calc(var(--width) * 0) calc(var(--width) * 0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.65) inset;
            border-radius: 100vh;
        }

        .toggle__content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            border-radius: 100vh;
            display: block;
            clip-path: inset(0 0 0 0 round 100vh);
        }

        .toggle__backdrop {
            overflow: visible !important;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            transition: translate var(--speed) var(--easing);
            translate: 0 calc(var(--dark, 0) * (100% - (3 / 8 * var(--width))));
        }

        [aria-pressed=false] .toggle__backdrop:last-of-type {
            transition-timing-function: cubic-bezier(.2, -0.6, .7, 1.6);
        }

        [aria-pressed=false] .stars path {
            transition-delay: 0s;
        }

        .stars path {
            transform-box: fill-box;
            transform-origin: 25% 50%;
            scale: calc(0.25 + (var(--dark, 0) * 0.75));
            transition: scale var(--speed) calc(var(--speed) * 0.5) var(--easing);
        }

        .toggle__indicator {
            height: 100%;
            aspect-ratio: 1;
            border-radius: 0%;
            display: grid;
            place-items: center;
            padding: 3%;
        }

        .pilot-bear {
            position: absolute;
            width: 25%;
        }

        .toggle__star {
            height: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            position: relative;
            transition: translate var(--speed) var(--easing);
            translate: calc((var(--dark, 0) * -10%) + 5%) 0;
            /* 	translate: calc((var(--dark, 0) * -18%) + 5%) 0; */
        }

        .sun {
            background: var(--sun);
            position: absolute;
            inset: 0;
            border-radius: 50%;
            overflow: hidden;
            box-shadow:
                calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 100% / 0.95) inset,
                calc(var(--width) * -0.01) calc(var(--width) * -0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 20% / 0.5) inset;
        }

        .moon {
            position: absolute;
            inset: -1%;
            border-radius: 50%;
            background: var(--moon);
            transition: translate var(--speed) ease-in-out;
            translate: calc((100 - (var(--dark, 0) * 100)) * 1%) 0%;
            box-shadow:
                calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 100% / 0.95) inset,
                calc(var(--width) * -0.01) calc(var(--width) * -0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 10% / 0.95) inset;
        }

        .moon__crater {
            position: absolute;
            background: var(--crater);
            border-radius: 50%;
            width: calc(var(--size, 10) * 1%);
            aspect-ratio: 1;
            left: calc(var(--x) * 1%);
            top: calc(var(--y) * 1%);
            box-shadow:
                calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.01) 0 hsl(210 10% 6% / 0.25) inset,
                0 calc(var(--width) * 0.005) calc(var(--width) * 0.01) 0 hsl(210 10% 100% / 0.25);
        }

        .moon__crater:nth-of-type(1) {
            --size: 18;
            --x: 40;
            --y: 15;
        }

        .moon__crater:nth-of-type(2) {
            --size: 20;
            --x: 65;
            --y: 58;
        }

        .moon__crater:nth-of-type(3) {
            --size: 34;
            --x: 18;
            --y: 40;
        }

        .toggle__star:before {
            content: "";
            z-index: -1;
            width: 356%;
            background:
                radial-gradient(hsl(0 0% 100% / 0.25) 40%, transparent 40.5%),
                radial-gradient(hsl(0 0% 100% / 0.25) 56%, transparent 56.5%) hsl(0 0% 100% / 0.25);
            border-radius: 50%;
            aspect-ratio: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transition: translate var(--speed) var(--easing);
            translate: calc((50 - (var(--dark, 0) * 4)) * -1%) -50%;
        }

        .toggle__star:after {
            content: "";
            position: absolute;
            inset: 0;
            display: block;
            background: hsl(0 0% 0% / 0.5);
            filter: blur(4px);
            translate: 2% 4%;
            border-radius: 50%;
            z-index: -1;
        }

        .toggle__indicator-wrapper {
            position: absolute;
            inset: 0;
            transition: translate var(--speed) var(--slide-ease);
            translate: calc(var(--dark, 0) * (var(--width) - (3 / 8 * var(--width)))) 0;
        }

        [aria-pressed=true] {
            --dark: 1;
        }

        /* Fun stuff! */

        /* We have 11 stars */

        .stars g {
            transform-box: fill-box;
            transform-origin: 50% 50%;
        }

        .stars g:nth-of-type(3) {
            animation: twinkle 4s -2s infinite;
        }

        .stars g:nth-of-type(11) {
            animation: twinkle 6s -2s infinite;
        }

        .stars g:nth-of-type(9) {
            animation: twinkle 4s -1s infinite;
        }

        @keyframes twinkle {

            0%,
            40%,
            60%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(0);
            }
        }

        .astrobear {
            width: 12%;
            position: absolute;
            top: 100%;
            left: 0%;
            transition: translate calc(var(--speed) + (var(--dark, 0) * (var(--bear-speed) - var(--speed)))) calc(var(--bear-speed) * (0.4 * var(--dark, 0))) linear;
            translate: calc(var(--dark, 0) * 400%) calc(var(--dark, 0) * -350%);
        }

        .astrobear svg {
            transform-origin: 50% 75%;
            scale: var(--dark, 0);
            rotate: calc(var(--dark, 0) * 360deg);
            transition: rotate calc(var(--speed) + (var(--dark, 0) * (var(--bear-speed) - var(--speed)))) calc(var(--bear-speed) * 0.4) linear, scale var(--speed) ease-in-out;
        }


        .astrobear__container {
            position: absolute;
            overflow: hidden;
            inset: 0;
            clip-path: inset(0 0 0 0);
            opacity: var(--dark, 0);
            translate: 0 calc(-200% + (var(--dark, 0) * 200%));
            transition: opacity var(--speed) var(--easing), translate var(--speed) var(--easing);
        }

        .pilot__container {
            position: absolute;
            overflow: hidden;
            inset: 0;
            clip-path: inset(0 0 0 0);
            opacity: calc(1 - var(--dark, 0));
            translate: 0 calc(var(--dark, 0) * 200%);
            transition: opacity var(--speed) var(--easing), translate var(--speed) var(--easing);
        }

        .pilot-bear {
            width: 18%;
            position: absolute;
            top: 70%;
            left: 100%;
            transition:
                translate calc(var(--speed) + ((1 - var(--dark, 0)) * ((var(--bear-speed) * 0.5) - var(--speed)))) calc((var(--bear-speed) * 0.5) * ((1 - var(--dark, 0)) * 0.4)) linear;
            translate:
                calc((0 - (1 - var(--dark, 0))) * (var(--width) + 100%)) calc((0 - (1 - var(--dark, 0))) * (200%));
        }

        .pilot {
            rotate: 12deg;
            animation: fly 4s infinite ease-in-out;
        }

        @keyframes fly {
            50% {
                translate: 0 -25%;
            }
        }

        .controls {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: sans-serif;
            color: var(--color);
            transition: color var(--speed) var(--easing);
        }

        [type=checkbox] {
            accent-color: var(--color);
            transition: accent-color var(--speed) var(--easing);
        }
    </style>
</head>

<body>
    <div class="htmleaf-container">
        <header class="htmleaf-header">
            <h1></h1>
            <div class="htmleaf-links">

            </div>
        </header>
        <div class="container">
            <div class="controls">
                <label for="sync">Sync &lt;body&gt;</label>
                <input id="sync" type="checkbox" />
            </div>
            <button class="toggle" aria-pressed="false" title="Toggle Dark Mode">
                <span class="toggle__content">
                    <svg aria-hidden=true class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 290 228">
                        <g class="clouds">
                            <path fill="#D9D9D9"
                                d="M335 147.5c0 27.89-22.61 50.5-50.5 50.5a50.78 50.78 0 0 1-9.29-.853c-2.478 12.606-10.595 23.188-21.615 29.011C245.699 243.749 228.03 256 207.5 256a50.433 50.433 0 0 1-16.034-2.599A41.811 41.811 0 0 1 166 262a41.798 41.798 0 0 1-22.893-6.782A42.21 42.21 0 0 1 135 256a41.82 41.82 0 0 1-19.115-4.592A41.84 41.84 0 0 1 88 262c-1.827 0-3.626-.117-5.391-.343C74.911 270.448 63.604 276 51 276c-23.196 0-42-18.804-42-42s18.804-42 42-42c1.827 0 3.626.117 5.391.343C64.089 183.552 75.396 178 88 178a41.819 41.819 0 0 1 19.115 4.592C114.532 176.002 124.298 172 135 172a41.798 41.798 0 0 1 22.893 6.782 42.066 42.066 0 0 1 7.239-.773C174.137 164.159 189.749 155 207.5 155c.601 0 1.199.01 1.794.031A41.813 41.813 0 0 1 234 147h.002c.269-27.66 22.774-50 50.498-50 27.89 0 50.5 22.61 50.5 50.5Z" />
                        </g>
                    </svg>
                    <span aria-hidden=true class="pilot__container">
                        <span class="pilot-bear">
                            <img src="https://assets.codepen.io/605876/pilot-bear.svg" alt="pilot-bear" class="pilot" />
                        </span>
                    </span>
                    <svg aria-hidden=true class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 290 228">
                        <g class="clouds">
                            <path fill="#fff"
                                d="M328 167.5c0 15.214-7.994 28.56-20.01 36.068.007.31.01.621.01.932 0 23.472-19.028 42.5-42.5 42.5-3.789 0-7.461-.496-10.957-1.426C249.671 263.676 233.141 277 213.5 277a42.77 42.77 0 0 1-7.702-.696C198.089 284.141 187.362 289 175.5 289a42.338 42.338 0 0 1-27.864-10.408A42.411 42.411 0 0 1 133.5 281c-4.36 0-8.566-.656-12.526-1.876C113.252 287.066 102.452 292 90.5 292a42.388 42.388 0 0 1-15.8-3.034A42.316 42.316 0 0 1 48.5 298C25.028 298 6 278.972 6 255.5S25.028 213 48.5 213a42.388 42.388 0 0 1 15.8 3.034A42.316 42.316 0 0 1 90.5 207c4.36 0 8.566.656 12.526 1.876C110.748 200.934 121.548 196 133.5 196a42.338 42.338 0 0 1 27.864 10.408A42.411 42.411 0 0 1 175.5 204c2.63 0 5.204.239 7.702.696C190.911 196.859 201.638 192 213.5 192c3.789 0 7.461.496 10.957 1.426 2.824-10.491 9.562-19.377 18.553-24.994-.007-.31-.01-.621-.01-.932 0-23.472 19.028-42.5 42.5-42.5s42.5 19.028 42.5 42.5Z" />
                        </g>
                    </svg>
                    <span class="toggle__indicator-wrapper">
                        <span class="toggle__indicator">
                            <span class="toggle__star">
                                <span class="sun">
                                    <span class="moon">
                                        <span class="moon__crater"></span>
                                        <span class="moon__crater"></span>
                                        <span class="moon__crater"></span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                    <svg aria-hidden=true class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 290 228">
                        <g>
                            <g class="stars">
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M61 11.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.749 3.749 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.749 3.749 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.749 3.749 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 61 11.5Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M62.5 45.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M32 31.188a.28.28 0 0 1 .27.204l.305 1.067a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.067-.305a.28.28 0 0 1 0-.54l1.067-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.203Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M41.5 74.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M34 83.188a.28.28 0 0 1 .27.203l.305 1.068a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.068-.305a.28.28 0 0 1 0-.54l1.068-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.204Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M63 89.25a.375.375 0 0 1 .36.272l.407 1.423a1.874 1.874 0 0 0 1.288 1.288l1.423.406a.374.374 0 0 1 0 .722l-1.423.406a1.874 1.874 0 0 0-1.288 1.288l-.407 1.423a.374.374 0 0 1-.72 0l-.407-1.423a1.874 1.874 0 0 0-1.288-1.288l-1.423-.406a.374.374 0 0 1 0-.722l1.423-.406a1.874 1.874 0 0 0 1.288-1.288l.407-1.423a.376.376 0 0 1 .36-.272Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M110.5 53.156a.236.236 0 0 1 .225.17l.254.89a1.174 1.174 0 0 0 .805.805l.89.254a.23.23 0 0 1 .122.084.233.233 0 0 1-.122.366l-.89.254a1.167 1.167 0 0 0-.805.805l-.254.89a.232.232 0 0 1-.225.17.235.235 0 0 1-.225-.17l-.254-.89a1.174 1.174 0 0 0-.805-.805l-.89-.254a.23.23 0 0 1-.122-.084.233.233 0 0 1 .122-.366l.89-.254a1.167 1.167 0 0 0 .805-.805l.254-.89a.232.232 0 0 1 .225-.17Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M120 27.188a.279.279 0 0 1 .27.204l.305 1.067a1.41 1.41 0 0 0 .966.966l1.067.305a.283.283 0 0 1 .148.1.286.286 0 0 1 0 .34.283.283 0 0 1-.148.1l-1.067.305a1.403 1.403 0 0 0-.966.966l-.305 1.067a.279.279 0 0 1-.439.147.275.275 0 0 1-.101-.147l-.305-1.067a1.41 1.41 0 0 0-.966-.966l-1.068-.305a.284.284 0 0 1-.147-.1.286.286 0 0 1 0-.34.284.284 0 0 1 .147-.1l1.068-.305a1.405 1.405 0 0 0 .966-.966l.305-1.067a.279.279 0 0 1 .27-.204Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M155 28.5a.753.753 0 0 1 .721.544l.813 2.846a3.746 3.746 0 0 0 2.576 2.576l2.846.813a.747.747 0 0 1 .543.721.75.75 0 0 1-.543.721l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.747.747 0 0 1-.721.543.749.749 0 0 1-.721-.543l-.813-2.846a3.746 3.746 0 0 0-2.576-2.576l-2.846-.813a.747.747 0 0 1-.543-.721.75.75 0 0 1 .543-.721l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.751.751 0 0 1 155 28.5Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M147 60.25a.377.377 0 0 1 .36.272l.407 1.423a1.883 1.883 0 0 0 1.288 1.288l1.423.407a.375.375 0 0 1 0 .72l-1.423.407a1.875 1.875 0 0 0-1.288 1.288l-.407 1.423a.371.371 0 0 1-.36.272.377.377 0 0 1-.36-.272l-.407-1.423a1.883 1.883 0 0 0-1.288-1.288l-1.423-.406a.375.375 0 0 1 0-.722l1.423-.406a1.875 1.875 0 0 0 1.288-1.288l.407-1.423a.372.372 0 0 1 .36-.272Z"
                                        clip-rule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fill-rule="evenodd"
                                        d="M125.5 76.344a.513.513 0 0 1 .496.374l.559 1.956a2.574 2.574 0 0 0 1.771 1.771l1.956.56a.514.514 0 0 1 .27.805.514.514 0 0 1-.27.186l-1.956.559a2.57 2.57 0 0 0-1.771 1.77l-.559 1.957a.514.514 0 0 1-.806.27.514.514 0 0 1-.186-.27l-.559-1.956a2.574 2.574 0 0 0-1.771-1.771l-1.956-.56a.514.514 0 0 1-.27-.805.514.514 0 0 1 .27-.186l1.956-.559a2.57 2.57 0 0 0 1.771-1.77l.559-1.957a.515.515 0 0 1 .496-.374Z"
                                        clip-rule="evenodd" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span class="astrobear__container">
                        <span class="astrobear">

                            <svg aria-hidden=true xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 316 432">
                                <circle cx="158" cy="143" r="140" fill="#444" />
                                <circle cx="158" cy="143" r="140" fill="url(#a)" fill-opacity=".2" />
                                <circle cx="158" cy="143" r="140" stroke="#000" stroke-width="6" />
                                <path fill="#AF7128" fill-rule="evenodd"
                                    d="M65.98 159.61C49.913 155.643 38 141.134 38 123.842 38 103.495 54.495 87 74.842 87c14.337 0 26.761 8.19 32.85 20.146C119.687 100.674 133.414 97 148 97h20c14.52 0 28.19 3.641 40.146 10.059C214.251 95.15 226.65 87 240.952 87c20.347 0 36.842 16.495 36.842 36.842 0 17.222-11.818 31.685-27.787 35.72A85.104 85.104 0 0 1 253 182v66.56l10.054-10.054c11.325-11.325 29.687-11.325 41.012 0s11.325 29.687 0 41.012l-44.548 44.548a29.004 29.004 0 0 1-6.518 4.906V407c0 12.15-9.85 22-22 22h-44c-12.15 0-22-9.85-22-22v-28.69a41.072 41.072 0 0 1-14 .174V407c0 12.15-9.85 22-22 22H85c-12.15 0-22-9.85-22-22v-77.797a28.99 28.99 0 0 1-6.946-5.137l-44.548-44.548c-11.325-11.325-11.325-29.687 0-41.012 11.326-11.325 29.687-11.325 41.013 0L63 248.988V182a85.106 85.106 0 0 1 2.98-22.39Z"
                                    clip-rule="evenodd" />
                                <path fill="#000"
                                    d="m65.98 159.61 2.894.789a3.002 3.002 0 0 0-2.175-3.701l-.72 2.912Zm41.712-52.464-2.673 1.362a3 3 0 0 0 4.098 1.279l-1.425-2.641Zm100.454-.087-1.419 2.643a3 3 0 0 0 4.089-1.274l-2.67-1.369Zm41.861 52.503-.735-2.908a2.997 2.997 0 0 0-2.159 3.698l2.894-.79ZM253 248.56h-3a3 3 0 0 0 5.121 2.121L253 248.56Zm10.054-10.054-2.121-2.121 2.121 2.121Zm41.012 0-2.121 2.122 2.121-2.122Zm0 41.012 2.121 2.122-2.121-2.122ZM253 328.972l-1.448-2.627a3 3 0 0 0-1.552 2.627h3Zm-88 49.338h3a3 3 0 0 0-3.548-2.949l.548 2.949Zm-14 .174.475-2.963a3 3 0 0 0-3.475 2.963h3Zm-88-49.281h3a3 3 0 0 0-1.597-2.651L63 329.203Zm-6.946-5.137-2.121 2.121 2.121-2.121Zm-44.548-44.548-2.121 2.122 2.121-2.122Zm0-41.012 2.122 2.122-2.122-2.122Zm41.013 0-2.122 2.122 2.122-2.122ZM63 248.988l-2.121 2.121A2.999 2.999 0 0 0 66 248.988h-3ZM35 123.842c0 18.704 12.886 34.391 30.26 38.681l1.439-5.825C51.941 153.054 41 139.721 41 123.842h-6ZM74.842 84C52.838 84 35 101.838 35 123.842h6C41 105.151 56.151 90 74.842 90v-6Zm35.524 21.785C103.785 92.862 90.351 84 74.842 84v6c13.165 0 24.58 7.517 30.177 18.508l5.347-2.723ZM148 94c-15.095 0-29.311 3.803-41.733 10.506l2.85 5.281C120.685 103.544 133.924 100 148 100v-6Zm20 0h-20v6h20v-6Zm41.565 10.416C197.183 97.769 183.027 94 168 94v6c14.013 0 27.196 3.512 38.727 9.702l2.838-5.286ZM240.952 84c-15.471 0-28.878 8.82-35.476 21.691l5.34 2.737C216.427 97.481 227.819 90 240.952 90v-6Zm39.842 39.842c0-22.004-17.838-39.842-39.842-39.842v6c18.69 0 33.842 15.151 33.842 33.842h6Zm-30.052 38.629c17.269-4.364 30.052-20 30.052-38.629h-6c0 15.816-10.853 29.104-25.522 32.812l1.47 5.817ZM256 182a88.09 88.09 0 0 0-3.099-23.228l-5.788 1.58A82.082 82.082 0 0 1 250 182h6Zm0 66.56V182h-6v66.56h6Zm-.879 2.121 10.054-10.053-4.242-4.243-10.054 10.054 4.242 4.242Zm10.054-10.053c10.154-10.154 26.616-10.154 36.77 0l4.242-4.243c-12.496-12.497-32.758-12.497-45.254 0l4.242 4.243Zm36.77 0c10.153 10.153 10.153 26.615 0 36.769l4.242 4.243c12.497-12.497 12.497-32.758 0-45.255l-4.242 4.243Zm0 36.769-44.548 44.548 4.243 4.242 44.547-44.547-4.242-4.243Zm-44.548 44.548a26.013 26.013 0 0 1-5.845 4.4l2.896 5.255a32.006 32.006 0 0 0 7.192-5.413l-4.243-4.242ZM256 360v-31.028h-6V360h6Zm0 47v-47h-6v47h6Zm-25 25c13.807 0 25-11.193 25-25h-6c0 10.493-8.506 19-19 19v6Zm-44 0h44v-6h-44v6Zm-25-25c0 13.807 11.193 25 25 25v-6c-10.493 0-19-8.507-19-19h-6Zm0-28.69V407h6v-28.69h-6Zm-4.5 3.69c2.74 0 5.429-.253 8.048-.74l-1.096-5.899c-2.261.42-4.583.639-6.952.639v6Zm-6.975-.554c2.279.365 4.608.554 6.975.554v-6c-2.047 0-4.058-.163-6.025-.479l-.95 5.925ZM154 407v-28.516h-6V407h6Zm-25 25c13.807 0 25-11.193 25-25h-6c0 10.493-8.506 19-19 19v6Zm-44 0h44v-6H85v6Zm-25-25c0 13.807 11.193 25 25 25v-6c-10.493 0-19-8.507-19-19h-6Zm0-47v47h6v-47h-6Zm0-30.797V360h6v-30.797h-6Zm-6.067-3.016a32.008 32.008 0 0 0 7.664 5.668l2.806-5.303a26.002 26.002 0 0 1-6.228-4.607l-4.242 4.242ZM9.385 281.64l44.548 44.547 4.242-4.242-44.547-44.548-4.243 4.243Zm0-45.255c-12.497 12.497-12.497 32.758 0 45.255l4.243-4.243c-10.154-10.154-10.154-26.616 0-36.769l-4.243-4.243Zm45.255 0c-12.497-12.497-32.758-12.497-45.255 0l4.243 4.243c10.153-10.154 26.616-10.154 36.77 0l4.242-4.243Zm10.481 10.481L54.64 236.385l-4.243 4.243 10.482 10.481 4.242-4.243ZM60.001 182v66.988h6V182h-6Zm3.084-23.178A88.1 88.1 0 0 0 60 182h6c0-7.48 1.001-14.722 2.874-21.601l-5.789-1.577Z" />
                                <path fill="#fff" fill-rule="evenodd"
                                    d="M267.721 234.712C241.49 266.061 202.073 286 158 286c-43.749 0-82.91-19.647-109.141-50.598-11.328-8.104-27.18-7.069-37.353 3.104-11.325 11.325-11.325 29.687 0 41.012l44.548 44.548A28.99 28.99 0 0 0 63 329.203V407c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-28.517c2.123.341 4.293.517 6.5.517 2.555 0 5.06-.236 7.5-.69V407c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22V328.972a29.004 29.004 0 0 0 6.518-4.906l44.548-44.548c11.325-11.325 11.325-29.687 0-41.012-9.875-9.875-25.099-11.139-36.345-3.794Z"
                                    clip-rule="evenodd" />
                                <path fill="url(#b)" fill-opacity=".5" fill-rule="evenodd"
                                    d="M267.721 234.712C241.49 266.061 202.073 286 158 286c-43.749 0-82.91-19.647-109.141-50.598-11.328-8.104-27.18-7.069-37.353 3.104-11.325 11.325-11.325 29.687 0 41.012l44.548 44.548A28.99 28.99 0 0 0 63 329.203V407c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-28.517c2.123.341 4.293.517 6.5.517 2.555 0 5.06-.236 7.5-.69V407c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22V328.972a29.004 29.004 0 0 0 6.518-4.906l44.548-44.548c11.325-11.325 11.325-29.687 0-41.012-9.875-9.875-25.099-11.139-36.345-3.794Z"
                                    clip-rule="evenodd" />
                                <path fill="#000"
                                    d="m267.721 234.712-1.64-2.511c-.248.162-.47.359-.66.586l2.3 1.925Zm-218.862.69 2.289-1.94a3.026 3.026 0 0 0-.544-.5l-1.745 2.44Zm-37.353 3.104 2.122 2.121-2.122-2.121Zm0 41.012-2.121 2.122 2.121-2.122Zm44.548 44.548-2.121 2.121 2.121-2.121ZM63 329.203h3a2.999 2.999 0 0 0-1.597-2.651L63 329.203Zm88 49.28.475-2.962a3 3 0 0 0-3.475 2.962h3Zm14-.173h3a3 3 0 0 0-3.548-2.949l.548 2.949Zm88-49.338-1.448-2.627a3 3 0 0 0-1.552 2.627h3Zm51.066-49.454 2.121 2.122-2.121-2.122Zm0-41.012-2.121 2.121 2.121-2.121Zm-38.645-5.719C239.735 263.484 201.148 283 158 283v6c44.999 0 85.245-20.361 112.022-52.362l-4.601-3.851ZM158 283c-42.831 0-81.167-19.23-106.852-49.538l-4.578 3.879C73.347 268.937 113.332 289 158 289v-6ZM13.628 240.627c9.118-9.118 23.331-10.049 33.486-2.785l3.49-4.88c-12.502-8.944-29.991-7.805-41.219 3.423l4.243 4.242Zm0 36.77c-10.154-10.154-10.154-26.616 0-36.77l-4.243-4.242c-12.497 12.497-12.497 32.758 0 45.255l4.243-4.243Zm44.547 44.548-44.547-44.548-4.243 4.243 44.548 44.547 4.242-4.242Zm6.228 4.607a26.002 26.002 0 0 1-6.228-4.607l-4.242 4.242a32.008 32.008 0 0 0 7.664 5.668l2.806-5.303ZM66 360v-30.797h-6V360h6Zm0 47v-47h-6v47h6Zm19 19c-10.493 0-19-8.507-19-19h-6c0 13.807 11.193 25 25 25v-6Zm44 0H85v6h44v-6Zm19-19c0 10.493-8.506 19-19 19v6c13.807 0 25-11.193 25-25h-6Zm0-28.517V407h6v-28.517h-6Zm9.5-2.483c-2.047 0-4.058-.163-6.025-.479l-.95 5.925c2.279.365 4.608.554 6.975.554v-6Zm6.952-.639c-2.261.42-4.583.639-6.952.639v6c2.74 0 5.429-.253 8.048-.74l-1.096-5.899ZM168 407v-28.69h-6V407h6Zm19 19c-10.493 0-19-8.507-19-19h-6c0 13.807 11.193 25 25 25v-6Zm44 0h-44v6h44v-6Zm19-19c0 10.493-8.506 19-19 19v6c13.807 0 25-11.193 25-25h-6Zm0-47v47h6v-47h-6Zm0-31.028V360h6v-31.028h-6Zm7.397-7.027a26.043 26.043 0 0 1-5.845 4.4l2.896 5.255a32.036 32.036 0 0 0 7.192-5.413l-4.243-4.242Zm44.548-44.548-44.548 44.548 4.243 4.242 44.547-44.547-4.242-4.243Zm0-36.77c10.153 10.154 10.153 26.616 0 36.77l4.242 4.243c12.497-12.497 12.497-32.758 0-45.255l-4.242 4.242Zm-32.583-3.403c10.081-6.585 23.732-5.447 32.583 3.403l4.242-4.242c-10.898-10.899-27.697-12.29-40.106-4.184l3.281 5.023Z" />
                                <path fill="#000"
                                    d="M292.654 245.606a3 3 0 1 1-4.243-4.242l4.243 4.242Zm8.485-8.485-8.485 8.485-4.243-4.242 8.485-8.486 4.243 4.243ZM301.208 254.161a3 3 0 1 1-4.242-4.243l4.242 4.243Zm8.486-8.485-8.486 8.485-4.242-4.243 8.485-8.485 4.243 4.243ZM21.919 246.606a3 3 0 1 0 4.242-4.242l-4.242 4.242Zm-8.486-8.485 8.486 8.485 4.242-4.242-8.485-8.486-4.243 4.243ZM13.364 255.161a3 3 0 1 0 4.243-4.243l-4.243 4.243Zm-8.485-8.485 8.485 8.485 4.243-4.243-8.486-8.485-4.242 4.243Z" />
                                <path fill="#FF1E1E" d="M113.322 154.665h88.371v13.25h-88.371z" />
                                <path fill="#000" fill-rule="evenodd"
                                    d="M225.3 113.481c17.939 14.394 28.018 37.148 28.018 57.504H191.67c-.087-13.669-11.194-24.723-24.883-24.723h-18.56c-13.689 0-24.796 11.054-24.883 24.723H62c0-20.356 10.078-43.11 28.018-57.504C107.957 99.087 132.289 91 157.659 91c25.37 0 49.701 8.087 67.641 22.481Z"
                                    clip-rule="evenodd" />
                                <circle cx="212.665" cy="197.079" r="8.079" fill="#000" />
                                <circle cx="104.079" cy="197.079" r="8.079" fill="#000" />
                                <path fill="#000"
                                    d="M179.165 211.683c0 8.21-9.868 17.451-20.845 17.451-10.977 0-20.845-9.241-20.845-17.451 0-8.211 9.868-12.281 20.845-12.281 10.977 0 20.845 4.07 20.845 12.281Z" />
                                <path stroke="#000" stroke-linecap="round" stroke-width="6"
                                    d="M198 417v12M222 417v12M95 417v12M119 417v12" />
                                <circle cx="158" cy="143" r="140" fill="url(#c)" stroke="#000" stroke-width="6" />
                                <g clip-path="url(#d)">
                                    <path fill="#F5D949" stroke="#000" stroke-width="6"
                                        d="m217.543 305.943.704 1.692 1.826.146 12.818 1.027h.001a.17.17 0 0 1 .059.011l.002.001a.147.147 0 0 1 .037.065.15.15 0 0 1 .008.075l-.001.002c0 .001-.01.017-.041.044h-.001l-9.765 8.365-1.391 1.192.425 1.782 2.981 12.506h.001c.009.04.008.058.008.06l-.001.002a.148.148 0 0 1-.05.056.146.146 0 0 1-.069.031h-.002c-.002-.001-.02-.005-.054-.026l-10.974-6.702-1.564-.955-1.564.955-10.974 6.702a.177.177 0 0 1-.053.025l-.002.001c-.004-.001-.032-.005-.069-.032a.146.146 0 0 1-.051-.056l-.001-.002s-.001-.018.008-.058l.001-.001 2.981-12.506.425-1.782-1.391-1.192-9.765-8.365h-.001c-.031-.027-.04-.043-.041-.044l-.001-.002a.15.15 0 0 1 .008-.075.147.147 0 0 1 .037-.065l.002-.001a.17.17 0 0 1 .059-.011h.001l12.818-1.027 1.826-.146.704-1.692 4.938-11.875a.161.161 0 0 1 .028-.051l.001-.001a.146.146 0 0 1 .076-.016c.047 0 .072.013.076.016l.001.001c.001 0 .012.013.028.051l4.938 11.875Z" />
                                </g>
                                <path stroke="#000" stroke-linecap="round" stroke-width="16"
                                    d="M56.884 247.116A143.01 143.01 0 0 0 158 289a143.002 143.002 0 0 0 101.116-41.884" />
                                <path stroke="#000" stroke-width="6"
                                    d="M65.035 404s25.382-6.618 41.965-6.5c17.059.121 43.035 7.5 43.035 7.5M164.012 403.977s25.961-5.606 42.932-5.472C224.402 398.642 251 405 251 405M25 290l7.769-4.072a57.001 57.001 0 0 0 25.067-26.121L62 251M254.363 252l3.867 7.873a57.002 57.002 0 0 0 25.452 25.746l8.694 4.394" />
                                <defs>
                                    <linearGradient id="a" x1="158" x2="158" y1="0" y2="286"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset=".219" />
                                        <stop offset="1" stop-color="#fff" />
                                    </linearGradient>
                                    <linearGradient id="b" x1="254" x2="100" y1="419" y2="325"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-opacity=".98" />
                                        <stop offset="1" stop-opacity="0" />
                                    </linearGradient>
                                    <radialGradient id="c" cx="0" cy="0" r="1"
                                        gradientTransform="matrix(165.9998 58.9999 -60.6938 170.7657 210 171)"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset=".771" stop-color="#D9D9D9" stop-opacity="0" />
                                        <stop offset="1" stop-color="#fff" stop-opacity=".63" />
                                    </radialGradient>
                                    <clipPath id="d">
                                        <path fill="#fff" d="M189 291h47v45h-47z" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </span>
                </span>
            </button>
        </div>
        <script>
            const BUTTON = document.querySelector("button");
            const SYNC = document.querySelector("#sync")

            const TOGGLE = () => {
                const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
                if (SYNC.checked)
                    document.body.setAttribute("data-dark-mode", IS_PRESSED ? false : true);
                BUTTON.setAttribute("aria-pressed", IS_PRESSED ? false : true);
            };

            BUTTON.addEventListener("click", TOGGLE);

        </script>
</body>

</html>`
    },
    {
      id: 15,
      title: "炫酷进度条",
      code: `<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基于HTML5 SVG的炫酷进度条插件</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet">
    <!--CSS RESET-->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Bitter');

        * {
            /* border: 1px solid red; */
        }

        :root {
            --font: 'Bitter', serif;
            --title-size: 36px;
            --sub-size: 18px;
        }

        body {
            background: #E5E5E5;
        }

        .title h1 {
            margin: 4px;
            font-family: var(--font);
            font-size: var(--title-size);
            color: #333;
        }

        .title p {
            margin: 4px;
            padding-bottom: 25px;
            font-family: var(--font);
            font-size: var(--sub-size);
            color: #888;
        }

        .container {
            text-align: center;
        }

        .github {
            margin: 40px;
        }

        .progress {
            display: inline-block;
            width: 400px;
            height: 50px;
            margin: 35px;
            border-radius: 20px;
            background: #f9f9f9;
        }

        .bar {
            border-radius: 20px;
            width: 0%;
            height: 100%;
            transition: width;
            transition-duration: 1s;
            transition-timing-function: cubic-bezier(.36, .55, .63, .48);
        }

        .mobile {
            display: none;
        }

        .shadow {
            /* 25 50 */
            box-shadow: 0px 45px 50px rgba(0, 0, 0, 0.25);
        }

        .crosses {
            background-color: #DFDBE5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .jupiter {
            background-color: #f395a5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%23e6cca5' fill-opacity='0.4' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
        }

        .piano {
            background-color: #cccccc;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='46' viewBox='0 0 70 46'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.4'%3E%3Cpolygon points='68 44 62 44 62 46 56 46 56 44 52 44 52 46 46 46 46 44 40 44 40 46 38 46 38 44 32 44 32 46 26 46 26 44 22 44 22 46 16 46 16 44 12 44 12 46 6 46 6 44 0 44 0 42 8 42 8 28 6 28 6 0 12 0 12 28 10 28 10 42 18 42 18 28 16 28 16 0 22 0 22 28 20 28 20 42 28 42 28 28 26 28 26 0 32 0 32 28 30 28 30 42 38 42 38 0 40 0 40 42 48 42 48 28 46 28 46 0 52 0 52 28 50 28 50 42 58 42 58 28 56 28 56 0 62 0 62 28 60 28 60 42 68 42 68 0 70 0 70 46 68 46'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .dominos {
            background-color: #fff6bd;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='84' viewBox='0 0 126 84'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.4'%3E%3Cpath d='M126 83v1H0v-2h40V42H0v-2h40V0h2v40h40V0h2v40h40V0h2v83zm-2-1V42H84v40h40zM82 42H42v40h40V42zm-50-6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm96 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-42 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm30-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM20 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 24a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24-42a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .pie {
            background-color: #faaca8;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f55b53' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M29 58.58l7.38-7.39A30.95 30.95 0 0 1 29 37.84a30.95 30.95 0 0 1-7.38 13.36l7.37 7.38zm1.4 1.41l.01.01h-2.84l-7.37-7.38A30.95 30.95 0 0 1 6.84 60H0v-1.02a28.9 28.9 0 0 0 18.79-7.78L0 32.41v-4.84L18.78 8.79A28.9 28.9 0 0 0 0 1.02V0h6.84a30.95 30.95 0 0 1 13.35 7.38L27.57 0h2.84l7.39 7.38A30.95 30.95 0 0 1 51.16 0H60v27.58-.01V60h-8.84a30.95 30.95 0 0 1-13.37-7.4L30.4 60zM29 1.41l-7.4 7.38A30.95 30.95 0 0 1 29 22.16 30.95 30.95 0 0 1 36.38 8.8L29 1.4zM58 1A28.9 28.9 0 0 0 39.2 8.8L58 27.58V1.02zm-20.2 9.2A28.9 28.9 0 0 0 30.02 29h26.56L37.8 10.21zM30.02 31a28.9 28.9 0 0 0 7.77 18.79l18.79-18.79H30.02zm9.18 20.2A28.9 28.9 0 0 0 58 59V32.4L39.2 51.19zm-19-1.4a28.9 28.9 0 0 0 7.78-18.8H1.41l18.8 18.8zm7.78-20.8A28.9 28.9 0 0 0 20.2 10.2L1.41 29h26.57z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .bees {
            background-color: #fcc846;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%237a4948' fill-opacity='0.83' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .food {
            background-color: #ffcb05;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 260 260'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ec008c' fill-opacity='0.83'%3E%3Cpath d='M24.37 16c.2.65.39 1.32.54 2H21.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06A5 5 0 0 1-17.45 28v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H-20a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1L.9 19.22a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0L2.26 23h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM-13.82 27l16.37 4.91L18.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H-13.1z'/%3E%3Cpath id='path6_fill-copy' d='M284.37 16c.2.65.39 1.32.54 2H281.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06a5 5 0 0 1-2.24-8.94v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H240a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM246.18 27l16.37 4.91L278.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H246.9z'/%3E%3Cpath d='M159.5 21.02A9 9 0 0 0 151 15h-42a9 9 0 0 0-8.5 6.02 6 6 0 0 0 .02 11.96A8.99 8.99 0 0 0 109 45h42a9 9 0 0 0 8.48-12.02 6 6 0 0 0 .02-11.96zM151 17h-42a7 7 0 0 0-6.33 4h54.66a7 7 0 0 0-6.33-4zm-9.34 26a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-7a7 7 0 1 1 0-14h42a7 7 0 1 1 0 14h-9.34zM109 27a9 9 0 0 0-7.48 4H101a4 4 0 1 1 0-8h58a4 4 0 0 1 0 8h-.52a9 9 0 0 0-7.48-4h-42z'/%3E%3Cpath d='M39 115a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm6-8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-3-29v-2h8v-6H40a4 4 0 0 0-4 4v10H22l-1.33 4-.67 2h2.19L26 130h26l3.81-40H58l-.67-2L56 84H42v-6zm-4-4v10h2V74h8v-2h-8a2 2 0 0 0-2 2zm2 12h14.56l.67 2H22.77l.67-2H40zm13.8 4H24.2l3.62 38h22.36l3.62-38z'/%3E%3Cpath d='M129 92h-6v4h-6v4h-6v14h-3l.24 2 3.76 32h36l3.76-32 .24-2h-3v-14h-6v-4h-6v-4h-8zm18 22v-12h-4v4h3v8h1zm-3 0v-6h-4v6h4zm-6 6v-16h-4v19.17c1.6-.7 2.97-1.8 4-3.17zm-6 3.8V100h-4v23.8a10.04 10.04 0 0 0 4 0zm-6-.63V104h-4v16a10.04 10.04 0 0 0 4 3.17zm-6-9.17v-6h-4v6h4zm-6 0v-8h3v-4h-4v12h1zm27-12v-4h-4v4h3v4h1v-4zm-6 0v-8h-4v4h3v4h1zm-6-4v-4h-4v8h1v-4h3zm-6 4v-4h-4v8h1v-4h3zm7 24a12 12 0 0 0 11.83-10h7.92l-3.53 30h-32.44l-3.53-30h7.92A12 12 0 0 0 130 126z'/%3E%3Cpath d='M212 86v2h-4v-2h4zm4 0h-2v2h2v-2zm-20 0v.1a5 5 0 0 0-.56 9.65l.06.25 1.12 4.48a2 2 0 0 0 1.94 1.52h.01l7.02 24.55a2 2 0 0 0 1.92 1.45h4.98a2 2 0 0 0 1.92-1.45l7.02-24.55a2 2 0 0 0 1.95-1.52L224.5 96l.06-.25a5 5 0 0 0-.56-9.65V86a14 14 0 0 0-28 0zm4 0h6v2h-9a3 3 0 1 0 0 6H223a3 3 0 1 0 0-6H220v-2h2a12 12 0 1 0-24 0h2zm-1.44 14l-1-4h24.88l-1 4h-22.88zm8.95 26l-6.86-24h18.7l-6.86 24h-4.98zM150 242a22 22 0 1 0 0-44 22 22 0 0 0 0 44zm24-22a24 24 0 1 1-48 0 24 24 0 0 1 48 0zm-28.38 17.73l2.04-.87a6 6 0 0 1 4.68 0l2.04.87a2 2 0 0 0 2.5-.82l1.14-1.9a6 6 0 0 1 3.79-2.75l2.15-.5a2 2 0 0 0 1.54-2.12l-.19-2.2a6 6 0 0 1 1.45-4.46l1.45-1.67a2 2 0 0 0 0-2.62l-1.45-1.67a6 6 0 0 1-1.45-4.46l.2-2.2a2 2 0 0 0-1.55-2.13l-2.15-.5a6 6 0 0 1-3.8-2.75l-1.13-1.9a2 2 0 0 0-2.5-.8l-2.04.86a6 6 0 0 1-4.68 0l-2.04-.87a2 2 0 0 0-2.5.82l-1.14 1.9a6 6 0 0 1-3.79 2.75l-2.15.5a2 2 0 0 0-1.54 2.12l.19 2.2a6 6 0 0 1-1.45 4.46l-1.45 1.67a2 2 0 0 0 0 2.62l1.45 1.67a6 6 0 0 1 1.45 4.46l-.2 2.2a2 2 0 0 0 1.55 2.13l2.15.5a6 6 0 0 1 3.8 2.75l1.13 1.9a2 2 0 0 0 2.5.8zm2.82.97a4 4 0 0 1 3.12 0l2.04.87a4 4 0 0 0 4.99-1.62l1.14-1.9a4 4 0 0 1 2.53-1.84l2.15-.5a4 4 0 0 0 3.09-4.24l-.2-2.2a4 4 0 0 1 .97-2.98l1.45-1.67a4 4 0 0 0 0-5.24l-1.45-1.67a4 4 0 0 1-.97-2.97l.2-2.2a4 4 0 0 0-3.09-4.25l-2.15-.5a4 4 0 0 1-2.53-1.84l-1.14-1.9a4 4 0 0 0-5-1.62l-2.03.87a4 4 0 0 1-3.12 0l-2.04-.87a4 4 0 0 0-4.99 1.62l-1.14 1.9a4 4 0 0 1-2.53 1.84l-2.15.5a4 4 0 0 0-3.09 4.24l.2 2.2a4 4 0 0 1-.97 2.98l-1.45 1.67a4 4 0 0 0 0 5.24l1.45 1.67a4 4 0 0 1 .97 2.97l-.2 2.2a4 4 0 0 0 3.09 4.25l2.15.5a4 4 0 0 1 2.53 1.84l1.14 1.9a4 4 0 0 0 5 1.62l2.03-.87zM152 207a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-11 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3-5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-8 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5-2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-5-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-24 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm16 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zm86-29a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1 246 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM275 214a29 29 0 0 0-57.97 0h57.96zM72.33 198.12c-.21-.32-.34-.7-.34-1.12v-12h-2v12a4.01 4.01 0 0 0 7.09 2.54c.57-.69.91-1.57.91-2.54v-12h-2v12a1.99 1.99 0 0 1-2 2 2 2 0 0 1-1.66-.88zM75 176c.38 0 .74-.04 1.1-.12a4 4 0 0 0 6.19 2.4A13.94 13.94 0 0 1 84 185v24a6 6 0 0 1-6 6h-3v9a5 5 0 1 1-10 0v-9h-3a6 6 0 0 1-6-6v-24a14 14 0 0 1 14-14 5 5 0 0 0 5 5zm-17 15v12a1.99 1.99 0 0 0 1.22 1.84 2 2 0 0 0 2.44-.72c.21-.32.34-.7.34-1.12v-12h2v12a3.98 3.98 0 0 1-5.35 3.77 3.98 3.98 0 0 1-.65-.3V209a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-24c.01-1.53-.23-2.88-.72-4.17-.43.1-.87.16-1.28.17a6 6 0 0 1-5.2-3 7 7 0 0 1-6.47-4.88A12 12 0 0 0 58 185v6zm9 24v9a3 3 0 1 0 6 0v-9h-6z'/%3E%3Cpath d='M-17 191a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H4zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1-14 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM15 214a29 29 0 0 0-57.97 0h57.96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .floor {
            background-color: #00b9f2;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 80 80'%3E%3Cg fill='%2392278f' fill-opacity='0.71'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E");
        }

        .wiggle {
            background-color: #dbbef9;
            background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff7c7c' fill-opacity='1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .bars {
            background-color: #ffe67c;
            background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238fe1e7' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
        }

        .bubbles {
            background-color: #beffc2;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e6afff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .ticTac {
            background-color: #ffefaa;
            background-image: url("data:image/svg+xml,%3Csvg width='76' height='76' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ffadad' fill-opacity='0.84' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .zigZag {
            background-color: #00dac3;
            background-image: url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='%23008386' fill-opacity='0.7' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .stripes {
            background-color: #ffffff;
            background-image: url("data:image/svg+xml,%3Csvg width='25' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%23d09af3' fill-opacity='0.54' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .clouds {
            background-color: #959bb5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23f0d519' fill-opacity='0.89' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
        }

        .aztec {
            background-color: #d59242;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%230d37c2' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .circuit {
            background-color: #00b497;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='150' height='150'%3E%3Cpath fill='%23333333' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E");
        }

        .dots {
            background-color: #ffcb05;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300a99d' fill-opacity='0.71' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
        }

        .lines {
            background-color: #efefef;
            background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23efb4a3' fill-opacity='0.84' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .leaf {
            background-color: #b5ccbf;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='60' height='30'%3E%3Cpath fill='%2340584a' fill-opacity='0.47' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
        }

        .overlap {
            background-color: #ffadff;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232e78ff' fill-opacity='0.82'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        @media screen and (max-width: 500px) {
            .progress {
                width: calc(100vw * 0.7);
                /* height: calc(100vw * 0.7 * 0.145); */
                height: 40px;
                margin: 25px;
            }

            .github {
                margin: 20px;
            }

            .desktop {
                display: none;
            }

            .mobile {
                display: inherit;
            }
        }
    </style>
</head>

<body>
    <div class="htmleaf-container">

        <div class="container">
            <div class="progress">
                <div class="bar shadow overlap"></div>
            </div>
            <div class="progress">
                <div class="bar shadow leaf"></div>
            </div>
            <div class="progress">
                <div class="bar shadow bars"></div>
            </div>
            <div class="progress">
                <div class="bar shadow lines"></div>
            </div>
            <div class="progress">
                <div class="bar shadow wiggle"></div>
            </div>
            <div class="progress">
                <div class="bar shadow dots"></div>
            </div>
            <div class="progress">
                <div class="bar shadow circuit"></div>
            </div>
            <div class="progress">
                <div class="bar shadow aztec"></div>
            </div>
            <div class="progress">
                <div class="bar shadow bees"></div>
            </div>
            <div class="progress">
                <div class="bar shadow food"></div>
            </div>
            <div class="progress">
                <div class="bar shadow clouds"></div>
            </div>
            <div class="progress">
                <div class="bar shadow stripes"></div>
            </div>
            <div class="progress">
                <div class="bar shadow crosses"></div>
            </div>
            <div class="progress">
                <div class="bar shadow jupiter"></div>
            </div>
            <div class="progress">
                <div class="bar shadow piano"></div>
            </div>
            <div class="progress">
                <div class="bar shadow dominos"></div>
            </div>
            <div class="progress">
                <div class="bar shadow pie"></div>
            </div>
            <div class="progress">
                <div class="bar shadow floor"></div>
            </div>
            <div class="progress">
                <div class="bar shadow bubbles"></div>
            </div>
            <div class="progress">
                <div class="bar shadow ticTac"></div>
            </div>
            <div class="progress">
                <div class="bar shadow zigZag"></div>
            </div>
        </div>
    </div>

    <script>
        const bars = document.querySelectorAll('.bar');
        const progress = document.querySelectorAll('.progress');

        bars.forEach((bar, index) => {
            const randomWidth = Math.floor((Math.random() * 65) + 10);
            bar.style.width = randomWidth+ '%';

            progress[index].addEventListener('mouseover', () => {
                const randomTiming = Math.floor((Math.random() * 2) + 2);
                console.log(randomTiming);
                bar.style.transitionDuration = randomWidth+ 's';
                bar.style.width = '100%';
            });
        })

    </script>
</body>

</html>`
    },
    {
      id: 16,
      title: "飞机大战",
      code: `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>简易飞机大战</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: "Microsoft yahei", serif;
        }

        li {
            list-style-type: none;
        }

        body {
            overflow: hidden;
            user-select: none;
            -moz-user-select: -moz-none;
            -ms-user-select: none;
        }

        #box {
            position: relative;
            width: 512px;
            height: 768px;
            margin: 20px auto;
        }

        #map {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("http://39.106.132.8:6060/feijidazhan/bg_1.png");
            background-size: 100% 100%;
        }

        #level {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
        }

        #level h1 {
            font-size: 40px;
            padding-top: 60px;
            padding-bottom: 150px;
            line-height: 60px;
            text-align: center;
            color: #fff;
        }

        #level p {
            margin: 130px auto;
            width: 200px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #fff;
            font-weight: bolder;
            cursor: pointer;
        }

        #level p:hover {
            background: #ffa80c;
            color: #fff;
        }

        #map .plane,
        #map .biu,
        #map .enemy,
        #map .boom,
        #map .boom2 {
            position: absolute;
        }

        #map .plane {
            z-index: 8;
        }

        #map .biu {
            z-index: 10;
        }

        #map .boom2 {
            z-index: 11;
            animation: bling 2s 1;
            animation-fill-mode: forwards;
        }

        #map .enemy {
            z-index: 9;
        }

        #map .boom {
            z-index: 7;
            animation: fade .8s 1;
            animation-fill-mode: forwards;
        }

        @keyframes fade {
            from {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }

        @keyframes bling {
            0% {
                opacity: 1;
            }

            20% {
                opacity: 0;
            }

            40% {
                opacity: 1;
            }

            60% {
                opacity: 0;
            }

            80% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }

        #score {
            display: none;
            position: absolute;
            top: 10px;
            left: 10px;
            color: #fff;
            line-height: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 20;
        }

        #restart {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 30;
        }

        #restart p {
            width: 300px;
            height: 40px;
            line-height: 20px;
            margin: 140px auto;
            color: #fff;
            text-align: center;
        }

        #restart p span {
            font-weight: bolder;
            font-size: 22px;
            text-align: center;
        }

        #restart .p1 span {
            color: red;
            font-size: 30px;
        }

        #restart .p2 span {
            color: #ffa80c;
        }

        #restart .p3 {
            font-size: 20px;
            width: 100px;
            height: 35px;
            background: rgb(255, 255, 255);
            background: rgba(255, 255, 255, .8);
            color: #000;
            font-weight: bolder;
            line-height: 35px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
        }

        #restart .p3:hover {
            background: white;
        }
    </style>
</head>

<body>
    <div id="box">
        <div id="level">
            <h1>星空飞机大战</h1>
            <p>开始</p>
        </div>
        <div id="map">
            <div id="BiuAll"></div>
        </div>
        <div id="score">0</div>
        <div id="restart">
            <p class="p1">得分：<span>0</span></p>
            <p class="p3">再来一局</p>
        </div>
    </div>
    <script>
        //全局变量
        var oBox = document.getElementById("box"),
            oScore = document.getElementById("score"),
            oRe = document.getElementById("restart"),
            oLevel = document.getElementById("level"),
            oMap = document.getElementById("map"),
            oBiuAll = document.getElementById("BiuAll"),
            allBiu = oBiuAll.children,
            allReChild = oRe.children,
            boxOffsetTop = oBox.offsetTop,
            boxOffsetLeft = oBox.offsetLeft;
        //启动
        exe();
        //初始选择难度界面的点击事件
        function exe() {
            //难度选择
            var aP = oLevel.getElementsByTagName("p");
            for (var i = 0, length = aP.length; i < length; i++) {
                (function (i) {
                    aP[i].onclick = function (e) {
                        e = e || window.event;
                        startGame(i, {
                            x: e.clientX - boxOffsetLeft,
                            y: e.clientY - boxOffsetTop
                        });//第一个实参为序号 ，第二个实参为存储着鼠标距离map边缘距离的json
                    }
                })(i);
            }

            //restart按钮
            console.log(allReChild)
            allReChild[1].onclick = function (ev) {
                cancelAnimationFrame(oMap.bgTimer);//停止背景滚动
                oRe.style.display = "none";
                oLevel.style.display = "block";
                oScore.innerHTML = 0;
                oMap.innerHTML = "<div id='BiuAll'></div>";
                oBiuAll = document.getElementById("BiuAll");
                allBiu = oBiuAll.children;
            };
        }

        //开始游戏
        function startGame(level, pos) {
            clearMap(); //执行 隐藏和清理
            MapBg(level); //执行 Map背景相关操作
            var p = plane(level, pos); //执行 创建我军
            enemy(level, p); //执行 创建敌军
            //enemy(level , plane(level , pos));
            oBox.score = 0;//得分清零
        }

        //隐藏和清理
        function clearMap() {
            oScore.style.display = "block";
            oLevel.style.display = "none";//隐藏关卡选择框
        }

        //Map背景选择与运动
        function MapBg(level) {
            oMap.style.backgroundImage = "url('http://39.106.132.8:6060/feijidazhan/bg_" + (level + 1) + ".png')";

            (function m() {
                oMap.bgPosY = oMap.bgPosY || 0;
                oMap.bgPosY++;
                oMap.style.backgroundPositionY = oMap.bgPosY + 'px';
                oMap.bgTimer = requestAnimationFrame(m);
            })();
        }

        //创建我军
        function plane(level, pos) {
            //创建我军图片
            var oImg = new Image();//document.createElement("img");
            oImg.src = "http://39.106.132.8:6060/feijidazhan/myplane.png";
            oImg.width = 70;
            oImg.height = 70;
            oImg.className = "plane";
            oImg.style.left = pos.x - oImg.width / 2 + 'px';
            oImg.style.top = pos.y - oImg.height / 2 + 'px';
            oMap.appendChild(oImg);

            //边界值
            var leftMin = -oImg.width / 2,
                leftMax = oMap.clientWidth - oImg.width / 2,
                topMin = 0,
                topMax = oMap.clientHeight - oImg.height / 2;

            //加入mousemove事件
            document.onmousemove = function (ev) {
                ev = ev || window.event;
                //获取飞机实时坐标，并限制边界值
                var left = ev.clientX - boxOffsetLeft - oImg.width / 2;
                var top = ev.clientY - boxOffsetTop - oImg.height / 2;
                left = Math.max(leftMin, left);
                left = Math.min(leftMax, left);
                top = Math.max(topMin, top);
                top = Math.min(topMax, top);
                //赋值
                oImg.style.left = left + 'px';
                oImg.style.top = top + 'px';
            };

            //调用子弹函数
            fire(oImg, level);

            return oImg;
        }

        //我军子弹
        function fire(oImg, level) {
            oBox.biuInterval = setInterval(function () {
                if (oBox.score >= 500) {
                    createBiu(true, -1);
                    createBiu(true, 1);
                } else {
                    createBiu();
                }
            }, [100, 200, 200, 15][level]);

            function createBiu(index, d) {
                //创建子弹
                var oBiu = new Image();
                oBiu.src = "http://39.106.132.8:6060/feijidazhan/fire.png";
                oBiu.width = 30;
                oBiu.height = 30;
                oBiu.className = "biu";

                var left = oImg.offsetLeft + oImg.width / 2 - oBiu.width / 2;
                var top = oImg.offsetTop - oBiu.height + 5;

                if (index) {
                    left += oBiu.width * d
                }

                oBiu.style.left = left + "px";
                oBiu.style.top = top + 'px';


                oBiuAll.appendChild(oBiu);

                //子弹运动
                function m() {
                    if (oBiu.parentNode) {
                        var top = oBiu.offsetTop - 20;
                        if (top < -oBiu.height) {
                            oBiuAll.removeChild(oBiu);
                        } else {
                            oBiu.style.top = top + 'px';
                            requestAnimationFrame(m);
                        }
                    }
                }
                //将运动执行队列放后面，不然子弹会直接初始就在 top-50 的位置
                setTimeout(function () {
                    requestAnimationFrame(m);
                }, 50);
            }
        }

        //创建敌军
        function enemy(level, oPlane) {
            var w = oMap.clientWidth,
                h = oMap.clientHeight;

            var speed = [5, 6, 8, 8][level]; //敌军下落速度

            var num = 1;
            oBox.enemyIntetval = setInterval(function () {
                var index = num % 30 ? 1 : 0;

                //生成敌军
                var oEnemy = new Image();
                oEnemy.index = index;
                oEnemy.HP = [20, 1][index];
                oEnemy.speed = speed + (Math.random() * 0.6 - 0.3) * speed;
                oEnemy.speed *= index ? 1 : 0.5;
                oEnemy.src = "http://39.106.132.8:6060/feijidazhan/enemy_" + ["big", "small"][index] + ".png";
                oEnemy.className = "enemy";
                oEnemy.width = [104, 54][index];
                oEnemy.height = [80, 40][index];
                oEnemy.style.left = Math.random() * w - oEnemy.width / 2 + 'px';
                oEnemy.style.top = -oEnemy.height + 'px';
                oMap.appendChild(oEnemy);
                num++;

                //敌军运动
                function m() {
                    if (oEnemy.parentNode) {
                        var top = oEnemy.offsetTop;
                        top += oEnemy.speed;
                        if (top >= h) {
                            oBox.score--; //漏掉飞机减分
                            oScore.innerHTML = oBox.score;
                            oMap.removeChild(oEnemy);
                        } else {
                            oEnemy.style.top = top + 'px';
                            //子弹碰撞检测
                            for (var i = allBiu.length - 1; i >= 0; i--) {
                                var objBiu = allBiu[i];
                                if (coll(oEnemy, objBiu)) {
                                    oBiuAll.removeChild(objBiu);//移除子弹
                                    oEnemy.HP--;
                                    if (!oEnemy.HP) {
                                        oBox.score += oEnemy.index ? 2 : 20; //打掉飞机加分
                                        oScore.innerHTML = oBox.score;
                                        boom(oEnemy.offsetLeft, oEnemy.offsetTop, oEnemy.width, oEnemy.height, index ? 0 : 2);//敌军爆炸图
                                        oMap.removeChild(oEnemy);//移除敌军
                                        return;
                                    }
                                }
                            }
                            //我军碰撞检测
                            if (oPlane.parentNode && coll(oEnemy, oPlane)) {
                                boom(oEnemy.offsetLeft, oEnemy.offsetTop, oEnemy.width, oEnemy.height, index ? 0 : 2);//敌军爆炸图
                                boom(oPlane.offsetLeft, oPlane.offsetTop, oPlane.width, oPlane.height, 1);//我军爆炸图
                                oMap.removeChild(oEnemy);//移除敌军
                                oMap.removeChild(oPlane);//移除我军
                                GameOver();
                                return;
                            }
                            requestAnimationFrame(m);
                        }
                    }
                }
                requestAnimationFrame(m);
            }, [350, 150, 120, 40][level]);
        }

        //爆炸函数
        function boom(l, t, w, h, i) {
            var oBoom = new Image();
            oBoom.src = "http://39.106.132.8:6060/feijidazhan/" + ["boom_small", "myplane", "boom_big"][i] + ".png";
            oBoom.className = 'boom' + ["", "2", ""][i];
            oBoom.width = w;
            oBoom.height = h;
            oBoom.style.left = l + "px";
            oBoom.style.top = t + 'px';
            oMap.appendChild(oBoom);
            setTimeout(function () {
                oBoom.parentNode && oMap.removeChild(oBoom);
            }, [1200, 2500, 1200][i]);
        }

        //两个物体 碰撞检测
        function coll(obj1, obj2) {
            var T1 = obj1.offsetTop,
                B1 = T1 + obj1.clientHeight,
                L1 = obj1.offsetLeft,
                R1 = L1 + obj1.clientWidth;

            var T2 = obj2.offsetTop,
                B2 = T2 + obj2.clientHeight,
                L2 = obj2.offsetLeft,
                R2 = L2 + obj2.clientWidth;

            return !(B1 < T2 || R1 < L2 || T1 > B2 || L1 > R2);
        }

        //游戏结束
        function GameOver() {
            document.onmousemove = null; //清除移动事件
            clearInterval(oBox.biuInterval);//不再产生新子弹
            clearInterval(oBox.enemyIntetval);//不再产生新敌军
            restart();
        }

        //结算+重新开始
        function restart() {
            oScore.style.display = "none";
            var s = oBox.score;
            oRe.style.display = "block";
            allReChild[0].children[0].innerHTML = s;

        }
    </script>
</body>

</html>`
    },
    {
      id: 17,
      title: "",
      code: ``
    },
    {
      id: 18,
      title: "",
      code: ``
    },
    {
      id: 19,
      title: "",
      code: ``
    },
    {
      id: 20,
      title: "",
      code: ``
    }
  ];

  const selectTime = (item) => {
    setSelectId(item.id);
    setCode(item.code);
  };
  return (
    <div className="about">
      <div className="aside">
        <Timeline>
          {list.map((item) => (
            <Timeline.Item
              key={item.id}
              style={{ background: "transparent", color: "#35393d" }}
              color={selectId === item.id ? "green" : "blue"}
            >
              <div
                className="year"
                onClick={() => {
                  selectTime(item);
                }}
              >
                {item.title}
              </div>
              <br />
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <div className="main">
        <AceEditor
          mode="jsx"
          theme="monokai"
          name="app_code_editor"
          fontSize={14}
          showPrintMargin
          height="100%"
          width="40%"
          showGutter
          onChange={(value) => {
            setCode(value); // 输出代码编辑器内值改变后的值
          }}
          value={code}
          wrapEnabled
          highlightActiveLine //突出活动线
          enableSnippets //启用代码段
          setOptions={{
            enableBasicAutocompletion: true, //启用基本自动完成功能
            enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
            enableSnippets: true, //启用代码段
            showLineNumbers: true,
            tabSize: 2,
          }}
          annotations={[
            { row: 0, column: 2, type: "error", text: "Some error." },
          ]} // 错误，警告
        />
        <iframe srcDoc={code} title="result" style={{ height: "100%", width: "60%" }}></iframe>
      </div>
    </div>
  );
}
