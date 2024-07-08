document.addEventListener('DOMContentLoaded', ()=> {
const list = document.querySelector('#list');

fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            data.seance.forEach(seance => {
                let listExercises = "";
                let listQuickExercises = "";
                seance.exercise.forEach(exercise => {
                    const checkboxId = `checkbox-${seance.id}-${exercise.id + 1}`;
                    listExercises += `
                        <li>
                            <h4 class="title">
                                <input type="checkbox" class="checkbox-input" id="${checkboxId}">
                                <label for="${checkboxId}">
                                    <span class="checkbox"></span>
                                </label>
                                <a href="https://www.google.com/search?q=${exercise.name.split(' ').join('+')}&source=lnms&tbm=isch" target="_blank">${exercise.name}</a>
                            </h4>
                            ${exercise.serie ? `<p class="rep">${exercise.serie}x | ${exercise.repetition}</p>` : ""}
                            ${exercise.pause ? `<p class="rep">Pause : ${exercise.pause}s` : ""}
                        </li>
                        ${exercise.interval ? `<hr><p>${Math.floor(exercise.interval / 60) + "m"}</p><hr>` : ""}
                    `;
                });
                seance.quick.exercise.forEach(exercise => {
                    const checkboxId = `checkbox-${seance.id}-${exercise.id + 10000}`;
                    listQuickExercises += `
                        <li>
                            <h4 class="title">
                                <input type="checkbox" class="checkbox-input" id="${checkboxId }">
                                <label for="${checkboxId}">
                                    <span class="checkbox"></span>
                                </label>
                                <a href="https://www.google.com/search?q=${exercise.name.split(' ').join('+')}&source=lnms&tbm=isch" target="_blank">${exercise.name}</a>
                            </h4>
                            ${exercise.serie ? `<p class="rep">${exercise.serie}x | ${exercise.repetition}</p>` : ""}
                            ${exercise.pause ? `<p class="rep">Pause : ${exercise.pause}s` : ""}
                        </li>
                        ${exercise.interval ? `<hr><p>${Math.floor(exercise.interval / 60) + "m"}</p><hr>` : ""}
                    `;
                });
                list.innerHTML += `
                    <li>
                        <details>
                            <summary>
                                <h3>${seance.name}</h3>
                                <div class="duration">${Math.floor(seance.duration / 60) + "h" + seance.duration % 60}</div>
                            </summary>
                            <h5 class="quick-input">
                                <input type="checkbox" class="checkbox-input quick-checkbox" id="${seance.id}">
                                <label for="${seance.id}">
                                    <span class="checkbox"></span>
                                </label>
                                <p>Quick Session</p>
                            </h5>
                            <ol class="quick hidden">
                                ${listQuickExercises}
                            </ol>
                            <ol class="normal">
                                ${listExercises}
                            </ol>
                        </details>
                    </li>
                `
            });
            const checkboxes = document.querySelectorAll('.quick-checkbox');
            const quick = document.querySelectorAll('.quick');
            for(let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].addEventListener('change', ()=>{
                    if(checkboxes[i].checked) {
                        quick[i].classList.remove('hidden');
                    } else {
                        quick[i].classList.add('hidden');
                    }
                })
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

// TIMER

let interval,
    run = false,
    allDiv,
    timers

function startTimer(time, index) {
    allDiv[index].classList.add('run');
    run = true;
    let timer = time;
    timer--
    updateProgress(time, timer, index);
    timers[index].textContent = timer + "s"
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
})