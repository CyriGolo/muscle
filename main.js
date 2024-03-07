let interval;
let run = false;
let allDiv;
let timers;

function startTimer(time, index) {
    allDiv[index].classList.add('run');
    run = true;
    let timer = time;
    interval = setInterval(() => {
        timer--;
        updateProgress(time, timer, index);
        timers[index].textContent = timer + "s"
        if(timer <= 0) {
            alert(`Timer de ${time}s terminé`);
            endTimer(time, index);
        };
    }, 1000);
}

function endTimer(time, index){
    allDiv[index].classList.remove('run');
    allDiv[index].style.background = `radial-gradient(closest-side, #1c1c1d 90%, transparent 80% 100%),conic-gradient(#fff 0%, #353535 0)`
    clearInterval(interval);
    timers[index].textContent = time + "s";
    run = false;
};

function updateProgress(time, timer, index){
    const progressPercentage = ((timer / time) * 100).toFixed(2);
    allDiv[index].style.background = `radial-gradient(closest-side, #1c1c1d 90%, transparent 80% 100%),conic-gradient(#353535 ${progressPercentage}%, #fff 0)`
}

window.addEventListener("load", ()=>{
    allDiv = document.querySelectorAll('.progress-bar');
    timers = document.querySelectorAll('.timer');
    for(let i = 0; i<allDiv.length; i++) {
        allDiv[i].addEventListener('click',()=>{
            if(!allDiv[i].classList.contains('run')){
                if(!run) {
                    startTimer(timers[i].dataset.duration, i);
                } else {
                    alert("Un timer est déjà en cours d'utilisation")
                }
            } else {
                endTimer(timers[i].dataset.duration, i);
            };
        });
    };
});