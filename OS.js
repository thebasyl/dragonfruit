/*
    dragonfruit OS by NoelNim
    release: 1.0.0
    OS name: dOS I
    next release: 1.0.1
    next OS name: dOS II
    developed and maintained by Noel Nimstad
*/
window.onload = function()
{
    const sidebutton = document.getElementById('sidebutton');
    const screen = document.getElementById('screen');
    screen.classList.remove('background');
    const app_welcome = document.getElementById('app_welcome');
    const lock_screen = document.getElementById('lock_screen');
    const app_welcome_button_continue = document.getElementById('continue_button');
    sidebutton.addEventListener('click', togglescreen);
    var alertopen = false;
    const alert = document.getElementById('alert');
    const alerttitle = document.getElementById('alerttitle');
    const alertmessage = document.getElementById('alertmessage');
    const dismiss = document.getElementById('dismiss');
    const screenstopper = document.getElementById('screenstopper');
    const volumeslider = document.getElementById('volumeslider');
    const time = document.getElementById('time');
    const touchid = document.getElementById('touchid');
    const home_screen = document.getElementById('home_screen');
    const appsizeslider = document.getElementById('appsizeslider');
    const gridtightnessslider = document.getElementById('gridtightnessslider');
    const approundessslider = document.getElementById('approundessslider');
    var tid = 0;
    var speed;
    volumeslider.value = localStorage.getItem('volume');
    if(!localStorage.getItem('dyskord'))
    {
        localStorage.setItem('dyskord', 0);
    }
    if(!localStorage.getItem('dogelet'))
    {
        localStorage.setItem('dogelet', 0);
    }
    function togglescreen()
    {
        if(screen.classList.contains('on'))
        {
            screen.classList.remove('on');
            screen.classList.remove('background');
            screen.classList.add('off');
            return;
        }
        screen.classList.remove('off');
        screen.classList.add('on');
        screen.classList.add('background');
        if(!localStorage.getItem('activated')) { lock_screen.remove(); screen.classList.remove('background') }
        var dyskord = localStorage.getItem('dyskord');
        var dogelet = localStorage.getItem('dogelet');
        document.querySelectorAll('.dyskord .alerts').forEach(item =>
        {
            if(dyskord == 0)
            {
                item.remove();
            } else item.innerHTML = dyskord;
        });
        document.querySelectorAll('.dogelet .alerts').forEach(item =>
        {
            if(dogelet == 0)
            {
                item.remove();
            } else item.innerHTML = dogelet;
        });
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var tz = (d.getTimezoneOffset() / -60).toString();
        if(!tz.includes('-'))
        {
            if(m.toString().length === 1)
            {
                time.innerHTML = h + ':0' + m + '<h4>UTC+' + tz + '</h4>';
            } else
            {
                time.innerHTML = h + ':' + m + '<h4>UTC+' + tz + '</h4>';
            }
        } else
        {
            if(m.toString().length === 1)
            {
                time.innerHTML = h + ':0' + m + '<h4>UTC' + tz + '</h4>';
            } else
            {
                time.innerHTML = h + ':' + m + '<h4>UTC' + tz + '</h4>';
            }
        }
        speed = Math.floor(Math.random() * 2000) + 200;
    }
    if(localStorage.getItem('activated'))
    {
        app_welcome.remove();
    } else { lock_screen.remove(); screen.classList.remove('background') }
    app_welcome_button_continue.addEventListener('click', continue_button)
    function continue_button()
    {
        app_welcome.remove();
        localStorage.setItem('activated', 0);
        window.location.reload();
    }
    document.querySelectorAll('.openapp').forEach(item =>
    {
        item.addEventListener('click', function()
        {
            if(alertopen == false)
            {
                alert.classList.add('shown');
                screenstopper.classList.remove('hidden');
                alerttitle.innerHTML = 'could not open ' + item.innerHTML;
                alertmessage.innerHTML = 'couldnt open ' + item.innerHTML + ' because phone is locked, please unlock before proceeding.'
                alertopen = true;
            } else return;
        })
    });
    dismiss.addEventListener('click', function()
    {
        if(alertopen == true)
        {
            alert.classList.remove('shown');
            screenstopper.classList.add('hidden');
            alerttitle.innerHTML = '';
            alertmessage.innerHTML = '';
            alertopen = false;
        } else return;
    });
    if(!localStorage.getItem('volume'))
    {
        localStorage.setItem('volume', 25);
    }
    volumeslider.addEventListener('change', function()
    {
        var volume = volumeslider.value;
        localStorage.setItem('volume', volume);
    });
    function toggleOn()
    {
        if(tid == 0)
        {
            return tid = setInterval(unlock, speed);
        }
    }
    function toggleOff()
    {
        if(tid != 0)
        {
            clearInterval(tid);
            return tid = 0;
        }
    }
    function unlock()
    {
        lock_screen.style.opacity = 0 + '%';
        home_screen.style.opacity = 100 + '%';
        setTimeout(function()
        {
            lock_screen.remove();
        }, 100);
    }
    touchid.addEventListener('mousedown', toggleOn);
    touchid.addEventListener('mouseup', toggleOff);
    appsizeslider.addEventListener('change', appsize);
    gridtightnessslider.addEventListener('change', gridtightness);
    approundessslider.addEventListener('change', approundess);
    function appsize()
    {
        $(':root').css('--app-size', appsizeslider.value + 'px');
    }
    function gridtightness()
    {
        $(':root').css('--grid-tightness', gridtightnessslider.value + 'px');
    }
    function approundess()
    {
        $(':root').css('--app-roundness', approundessslider.value + 'px');
    }
}
