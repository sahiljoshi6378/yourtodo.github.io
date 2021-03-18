showNotes()
// Getting the refersnces
let addNoteBtn = document.getElementById('addNoteBtn');
let alltodos =document.getElementById('alltodos');


// Add note Function
addNoteBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let inputNote = document.getElementById('inputNote');
    let capInputNote = inputNote.value.charAt(0).toUpperCase() + inputNote.value.slice(1);
    if(capInputNote =='' || capInputNote.length <5 || capInputNote.length >25){
        alertBox('Can\'t add this note')

    }
    else{
        let newNote =capInputNote;
        // adding and getting the notes to the LocalStorage
        let notesFromLS = localStorage.getItem('notes');
        if (notesFromLS === null) {
            allNotes = [];
        } else {
            allNotes = JSON.parse(notesFromLS);
        }
        allNotes.push(newNote);
        localStorage.setItem('notes',JSON.stringify(allNotes));
        inputNote.value ='';
        showNotes()
        alertBox('Added a note')

    }
});


// Show notes function
function showNotes(){
    let alltodos =document.getElementById('alltodos');
    let notesFromLS = localStorage.getItem('notes');
    if(notesFromLS === null){
        allNotes =[];
    }
    else{
        allNotes =JSON.parse(notesFromLS);
    }
    noteStr ='';
    allNotes.forEach((text,index) => {
        noteStr +=`<div style="margin-top: 2px; padding: 5px;" class="col-13" >
                        <div style="border-radius: 10px;box-shadow:none;" class="input-group">
                            <div class="noteTextarea form-control" id="inlineFormInputGroupUsername"><p style="margin: 0px 0px 0px 0px;">${text}</p></div>
                            <button style="background-color: #293745;cursor: pointer;" id="${index}" onclick="dltnote(this.id)" class="input-group-text"><i style="font-size:16px;color: white;" class="fa fa-minus-circle" id="delbtn"></i></button>
                        </div>
                    </div>`
    });
    if(allNotes != null){
        alltodos.innerHTML =noteStr;
    }
    else if(allNotes === null){
        alltodos.innerHTML =`<h5 style="margin:6px;color: #293745;font-weight: 800;font-size: 18px;font-family: 'Alegreya Sans SC', sans-serif;text-shadow: none;">Nothing to show Here!</h5>`;
    }
}


// Dlete note Function
function dltnote(index){
    let notesFromLS = localStorage.getItem('notes');
    if(notesFromLS === null){
        allNotes = [];
    }
    else{
        allNotes = JSON.parse(notesFromLS);
    }
    allNotes.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(allNotes));
    showNotes()
    alertBox('delete single note')
}


// Audio Box function
var audio = new Audio("https://www.soundjay.com/button/sounds/beep-03.mp3" ) ;
let soundbox =document.getElementById('soundbox');
const soundState = localStorage.getItem('sounds');
if(soundState ==='Sound Enabled'){
    soundbox.checked = true;
    audio.muted =false;
}
else if(soundState ==='Sound Disabled'){
    soundbox.checked =false;
    audio.muted =true;
}

soundbox.addEventListener('click',()=>{
    if(soundbox.checked == true){
        console.clear();
        audio.muted = false;
        localStorage.setItem('sounds','Sound Enabled');
        alertBox('Modes','Sound ON');
        console.clear();
    }
    else{
        console.clear();
        audio.muted =true;
        localStorage.setItem('sounds','Sound Disabled');
        alertBox('Modes','Sound OFF');
        console.clear();
    }
})

let flip1 = document.getElementById('menu1');
// Flip Front & Flip back functions
flip1.addEventListener('click',function(){
    
    flip1.animate([
        // keyframes
        { transform: 'rotate(0deg)'},
        { transform: 'rotate(360deg)' }
      ], {
        // timing options
        easing :'linear',
        duration: 400,
      });
      setTimeout(() => {
        document.getElementById('seattingsBoard').style.display = "block";
    }, 450);
})
let flip2 = document.getElementById('menu2');
flip2.addEventListener('click',function(){
    
    flip2.animate([
        // keyframes
        { transform: 'rotate(0deg)'},
        { transform: 'rotate(-360deg)' }
      ], {
        // timing options
        easing :'linear',
        duration: 400,
      });
      setTimeout(() => {
        document.getElementById('seattingsBoard').style.display = "none";
    }, 450);
    
})

// Dark & Light mode function
let lightBox =document.getElementById('lightBox');
const darkmode = localStorage.getItem('darkmode');
function dark_mode_disable(){
    document.getElementById('containor').style.backgroundColor  ='#C8C3C3';
    document.getElementById('fullFront').style.backgroundColor  ='#C8C3C3';
    document.getElementById('seattingsBoard').style.backgroundColor  ='#C8C3C3';
    document.getElementById('fullFront').style.border  ='none';
    document.getElementById('seattingsBoard').style.border  ='none';
}


function dark_mode_enable(){
    document.getElementById('containor').style.backgroundColor  ='black';
    document.getElementById('fullFront').style.backgroundColor  ='black';
    document.getElementById('seattingsBoard').style.backgroundColor  ='black';
    document.getElementById('fullFront').style.border  ='2px solid white';
    document.getElementById('seattingsBoard').style.border  ='2px solid white';
}

if(darkmode ==='Disabled'){
    lightBox.checked = false;
    dark_mode_disable();
}

else if(darkmode ==='Enabled'){
    lightBox.checked =true;
    dark_mode_enable();
}

lightBox.addEventListener('click',()=>{
    if(lightBox.checked != true){
        
        localStorage.setItem('darkmode','Disabled');
        dark_mode_disable();
        alertBox('Modes','LightMode')
    }
    else{
        localStorage.setItem('darkmode','Enabled');
        dark_mode_enable();
        alertBox('Modes','DarkMode')
    }
})



// Delete all notes function
document.getElementById('dltAll').addEventListener('click',()=>{
    let notesFromLS = localStorage.getItem('notes');
    if(notesFromLS === null){
        allNotes = [];
    }
    else{
        allNotes = JSON.parse(notesFromLS);
    }
    if(allNotes != ''){
        localStorage.removeItem('notes');
        showNotes()
        alertBox('deleting the all notes')
    }
    else{
        document.getElementById('seattingsBoard').style.display = "none";
    }
})


// alert box function -------------------------[START]------------------------------------------------ //
const alertBox =((situaTion,type)=>{
    if (situaTion === 'Added a note'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Success! :</strong> Your note has been added.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
        console.clear()
    }
    else if(situaTion === 'Can\'t add this note'){
        document.getElementById('validatorBox').style.boxShadow ="0 0px 10px rgba(224, 14, 14, 0.644), 0 0px 10px rgba(224, 14, 14, 0.644), 0 0px 0px rgba(224, 14, 14, 0.644), 0 1px 1px rgba(224, 14, 14, 0.644),0 5px 30px rgba(224, 14, 14, 0.644)";
        setTimeout(() => {
            document.getElementById('validatorBox').style.boxShadow ="0 1px 2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1),0 16px 32px rgba(0,0,0,0.1), 0 32px 64px rgba(0,0,0,0.1)";
            audio.play()
            document.getElementById('validatorBox').animate([
                // keyframes
                { transform: 'translateX(-3px)' },
                { transform: 'translateX(3px)' }
              ], {
                // timing options
                duration: 200,
              });
        }, 10);
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error!</strong> You should have cheeck the feildes.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 3200);
        console.clear()
    }
    else if(situaTion === 'delete single note'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Deleted!</strong> Note has been removed.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
        console.clear()
    }
    else if(situaTion === 'deleting the all notes'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Deleted:</strong> Removed all notes.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
        console.clear()
    }
    else if(situaTion === 'Modes'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>${type }</strong> : is Enabled
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
        console.clear()
    }

})
// alert box function -------------------------------[END]---------------------------------------------------//