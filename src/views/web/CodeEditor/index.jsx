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
