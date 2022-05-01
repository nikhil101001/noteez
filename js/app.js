// console.log("this is tutorial 22, Project 1 - NotePad app");
showNotes();
// if user adds a note then add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes"); // notes is an array

  //Convert into object literal to push into local storage and then covert into an array by using array.from() func and retrieve title and text easily
  let containerObj = {
    title: addTitle.value,
    description: addTxt.value,
  };

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(containerObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
  // console.log(notesObj);
  showNotes();
});

// functiom to show elements from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${element["title"]}</h5>
                <p class="card-text">${element["description"]}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
  }); // in onclick="this.id" is refers to the id of the elemment where i insert onclick and select the id with the hlep of this we can manipulate the element
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = ` Nothing to show! Use "Add a Note" section above to add a Note.`;
  }
}

// function to delete a note
function deleteNote(index) {
  // console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function for filtered search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log("Input event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p", "h5")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*
Further feature to be added:
1. add title
2. mark notes as important
3. seperate notes by user
*/
