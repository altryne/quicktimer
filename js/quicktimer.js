$(document).ready(function(){

    var duration = ""
    duration = (location.pathname)? location.pathname.substr(1) : "";
    var parsed = duration.split(/(\d+[\D]+)/)
    var end_time = moment();
    $.each(parsed,function(i,item){
        if (item == "") return;
        timestamp = item.split(/(\d+)?/);
        timestamp.shift()
        console.log(timestamp);
        end_time.add(timestamp[1],parseInt(timestamp[0]))
    })
    console.log(end_time.fromNow());

    // the date when the countdown has to end yyyy, mm(starting from 0 not from 1), dd, hh, mm, ss
    // for months 0 == january, 1 == february
    var countdown = $('#countdown'),
        days = countdown.find('.days span'),
        hours = countdown.find('.hours span'),
        minutes = countdown.find('.minutes span'),
        seconds = countdown.find('.seconds span'),
        set_count_down, time_loop;


    /* prepare canvas */
    canvas=document.getElementById('mycanvas');
    ctx=canvas.getContext('2d');
    cWidth=canvas.width;
    cHeight=canvas.height;

    countTo = Math.ceil(end_time.diff(moment()) / 1000);

    min=Math.floor(countTo/60);
    sec=countTo-(min*60);
    counter=0;
    angle=270;
    inc=360/countTo;

    drawScreen()
    set_count_down = function () {
        drawScreen()
        var now = moment(),
            time_left = end_time.diff(now) / 1000,
            d, h, m;

        // any call back you want to put when the countdown finishes
        if(time_left <= 0) {
            clearInterval(time_loop);
            alert('yay!')


            return;
        }

        d = Math.floor(time_left/86400);
        time_left -= d*86400;

        h = Math.floor(time_left/3600);
        time_left -= h*3600;

        m = Math.floor(time_left/60);
        time_left -= m*60;

        days.html(d);
        hours.html(h);
        minutes.html(m);
        seconds.html(Math.floor(time_left));
    };
    set_count_down()
    time_loop = setInterval(set_count_down, 1000);
})

/*===============================

Countdown.
Based on Kerem Suer dribble shot:
http://dribbble.com/shots/560534

change value of the variable --countTo-- to set the timer.
Would love to see someone adding a UI to this one.

=================================*/

  function drawScreen() {



    //======= reset canvas

    ctx.fillStyle="#2e3032";
    ctx.fillRect(0,0,cWidth,cHeight);

    //========== base arc

    ctx.beginPath();
    ctx.strokeStyle="#252424";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();

    //========== dynamic arc

    ctx.beginPath();
    ctx.strokeStyle="#df8209";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*270,(Math.PI/180)*angle,false);
    ctx.stroke();
    ctx.closePath();

    //======== inner shadow arc

    grad=ctx.createRadialGradient(cWidth/2,cHeight/2,80,cWidth/2,cHeight/2,115);
    grad.addColorStop(0.0,'rgba(0,0,0,.4)');
    grad.addColorStop(0.5,'rgba(0,0,0,0)');
    grad.addColorStop(1.0,'rgba(0,0,0,0.4)');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();

    //======== bevel arc

    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'#6c6f72');
    grad.addColorStop(0.5,'#252424');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,93,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();

    //====== emboss arc

    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'transparent');
    grad.addColorStop(0.98,'#6c6f72');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,107,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();

    //====== Labels

    var textColor='#646464';
    var textSize="12";
    var fontFace="helvetica, arial, sans-serif";

    ctx.fillStyle=textColor;
    ctx.font=textSize+"px "+fontFace;
    ctx.fillText('MIN',cWidth/2-46,cHeight/2-40);
    ctx.fillText('SEC',cWidth/2+25,cHeight/2-15);

    //====== Values



    ctx.fillStyle='#6292ae';

    if (min>9) {
      ctx.font='84px '+fontFace;
      ctx.fillText('9' ,cWidth/2-55,cHeight/2+35);

      ctx.font='24px '+fontFace;
      ctx.fillText('+' ,cWidth/2-72,cHeight/2-5);
    }
    else {
      ctx.font='84px '+fontFace;
      ctx.fillText(min ,cWidth/2-60,cHeight/2+35);
    }

    ctx.font='50px '+fontFace;
    if (sec<10) {
      ctx.fillText('0'+sec,cWidth/2+10,cHeight/2+35);
    }
    else {
      ctx.fillText(sec,cWidth/2+10,cHeight/2+35);
    }


    if (sec<=0 && counter<countTo) {
      min--;
      sec=59;
    } else
      if (counter>=countTo) {
        sec=0;
        min=0;
        angle=-90;
      } else {
        angle+=inc;
        counter++;
        sec--;
      }
  }