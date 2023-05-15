let plusBtn = document.getElementById("plusId");

let titlesContainer = document.querySelector(".titles");
let title = document.getElementById("title-note");
let changeBtnContainer = document.querySelector(".change-btn");
let svg = document.getElementById("svg");
let typingArea = document.getElementById("typing-area");
let textContent = document.getElementById("note-content");
let mood = "create";
let tmp;

plusBtn.onclick = function (){
    svg.classList.add("heddin-show-area");
    typingArea.classList.remove("heddin-text-typing-area");
    title.style.display = "block";
    changeBtnContainer.style.display = "block";
    changeBtnContainer.innerHTML = `<button id="save" onclick="save()" ><i class="fa-sharp fa-solid fa-floppy-disk"></i></button>`;
    title.value = '';
    textContent.value = '';

}

let noteData;
if(localStorage.note != null){
     noteData = JSON.parse(localStorage.note);
}else{
    noteData =[];
}

function save(){
    
   if(title.value == ''){
    title.value = "Untitled";    
   }
   let newNote = {
    title:title.value,
    note:textContent.value,
   }

   if(mood == "create"){
    noteData.push(newNote);
    localStorage.setItem("note",JSON.stringify(noteData));
   }else{
    noteData[tmp] = newNote;
    mood = "create"
   }

   title.value = '';
   textContent.value = '';

   svg.classList.remove("heddin-show-area");
   typingArea.classList.add("heddin-text-typing-area");
   title.style.display = "none";
   changeBtnContainer.style.display = "none";

   showNoteMenu();
}

function showNoteMenu(){
    let allTiles = '';
    for(let i = 0 ; i < noteData.length ; i++ ){
         allTiles +=`
         <div class="head-note-title">
           <button onclick="openNote(${i})"><p>${noteData[i].title}</p></button> 
         </div>`
    }
    titlesContainer.innerHTML = allTiles;
}

showNoteMenu();

function openNote(i){
    svg.classList.add("heddin-show-area");
    typingArea.classList.remove("heddin-text-typing-area");
    title.style.display = "block";
    changeBtnContainer.style.display = "block";
    changeBtnContainer.innerHTML = `<button id="edite" onclick="editeNote(${i})"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
    <button id="delete" onclick="deleteNote(${i})" ><i class="fa-sharp fa-solid fa-trash-can"></i></button>`;
    
    title.value = noteData[i].title;
    textContent.value = noteData[i].note;
}

function editeNote(i){
    mood = "edite"
    tmp = i;
    save();
    localStorage.setItem('note',JSON.stringify(noteData));
}

function deleteNote(i){
    noteData.splice(i, 1);
    localStorage.note = JSON.stringify(noteData);
    title.value = '';
    textContent.value = '';
    svg.classList.remove("heddin-show-area");
    typingArea.classList.add("heddin-text-typing-area");
    title.style.display = "none";
    changeBtnContainer.style.display = "none";
    showNoteMenu();
}