    var variable;
    var stopper=0;
    var minute = 01;
    var sec;
    var btn2click=0;
    // console.log("started here");
    const btn = document.getElementById('btn');
    // console.log(btn);

    btn.addEventListener('click', function () {
        // console.log("in btn");
        sec = 1;
        btn2click=0;
        btn.disabled = true;
        let val = document.getElementById('no');
        // console.log("here: " + val.value);

        minute = val.value;
        document.getElementById("no").value = "";
        counter();
    });

    const btn2 = document.getElementById('btn2');
    console.log(btn2);
    btn2.addEventListener('click', () => {
        btn.disabled = false;
        minute = -1; 
        btn2click=1;
        document.querySelector("#minchng").innerText = "00";
        document.querySelector("#secchng").innerText = "00";
    });

    function counter() {

        sec--;
        if (minute >= 0) {
            let a = document.querySelector("#minchng");
            let min; let s;
            min = minute; s = sec;
            if (minute < 10) { min = "0" + minute; }
            if (sec < 10) { s = "0" + sec; }
            a.innerText = min;
            document.querySelector("#secchng").innerText = s;
        }
        // console.log("workngg", minute, sec);
        if (sec == 00) {
            minute--;
            sec = 60;
        }
        if (minute >= 0) {
            var t = setTimeout(counter, 1000);

        }
        else {
            console.log("loop ended");
            if(btn2click==0){
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
               });
            countdowntimerend = 1;
            btn.disabled = false;
            }
        }
    }