$(document).ready(function(){

    var duration = ""
    duration = (location.pathname)? location.pathname.substr(1) : "";
    var parsed = duration.split(/(\d+.)?/)
    var end_time = moment();
    $.each(parsed,function(i,item){
        if (item == "") return;
        timestamp = item.split(/(\d+)?/);
        timestamp.shift()
        console.log(timestamp);
        end_time.add(timestamp[1],parseInt(timestamp[0]))
    })
    console.log(end_time.fromNow());

//    setInterval(function(){
//        real_now = moment()
//        diff = now.diff(real_now,'seconds')
//        console.log(diff);
//    },1000)


    // the date when the countdown has to end yyyy, mm(starting from 0 not from 1), dd, hh, mm, ss
    // for months 0 == january, 1 == february
    var countdown = $('#countdown'),
        days = countdown.find('.days span'),
        hours = countdown.find('.hours span'),
        minutes = countdown.find('.minutes span'),
        seconds = countdown.find('.seconds span'),
        set_count_down, time_loop;

    set_count_down = function () {

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