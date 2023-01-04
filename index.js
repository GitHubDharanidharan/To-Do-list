const listInput = document.querySelector(".input");
//save button
const saveBtn = document.querySelector(".button-save");
//clear button
const clearBtn = document.querySelector(".button-clear");
//close mark button
const closeBtn = document.querySelector(".list-input span i");
//ollist(parent) - The child list are stored here;
const olList = document.querySelector(".ol-list");
//h1spanList to display the number of lists
const h1List = document.querySelector(".h1-list span");

//checking the local storage if any list is stored and excecuting the function
document.addEventListener("DOMContentLoaded", function () {
  const myListItems = [...JSON.parse(localStorage.getItem("myLists"))];
  myListItems.forEach((item) => {
    const liTag = document.createElement("li");
    liTag.classList.add("li-list");
    liTag.textContent = item.list;
    liTag.innerHTML += `<span><i class="fa-solid fa-circle-xmark"></i></span>`;
    olList.appendChild(liTag);
    let olListLength = olList.children.length;
    listInput.setAttribute("autofocus", "true");
    h1List.textContent = olListLength;
    quotes(olListLength);
  });
});

//To-do list quotes
const h1Quotes = document.querySelector(".to-do-list-quotes");
console.log(h1Quotes);

//function for removing the list items in Ol parent by clicking the close mark
//Event delegation
olList.addEventListener("click", function (e) {
  const iTag = e.target.tagName;
  const elementLen = e.target.parentElement.parentElement;
  if (iTag === "I") {
    elementLen.remove();
    const myListItems = [...JSON.parse(localStorage.getItem("myLists"))];
    myListItems.forEach((item) => {
      if (item.list === elementLen.innerText) {
        myListItems.splice(myListItems.indexOf(item), 1);
      }
    });
    localStorage.setItem("myLists", JSON.stringify(myListItems));
    const olListLength = olList.children.length;
    h1List.textContent = olListLength;
    quotes(olListLength);
    if (olListLength === 0) {
      h1List.textContent = `No`;
      olList.style.display = "none";
    }
  }
});

//Function for removing the clearing the input field;
function clearList() {
  listInput.value = " ";
}

// Event listener for clearing the input field by button and closemark
clearBtn.addEventListener("click", clearList);
closeBtn.addEventListener("click", clearList);

//function for adding the list in the parent Ol list
function addList() {
  const result = listInput.value.toUpperCase();
  if (listInput.value == false) return;
  const liTag = document.createElement("li");
  liTag.classList.add("li-list");
  liTag.textContent = result;
  liTag.innerHTML += `<span><i class="fa-solid fa-circle-xmark"></i></span>`;
  olList.appendChild(liTag);
  let olListLength = olList.children.length;
  listInput.setAttribute("autofocus", "true");
  h1List.textContent = olListLength;
  quotes(olListLength);
  //setlocalstorage
  localStorage.setItem(
    "myLists",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("myLists") || "[]"),
      { list: listInput.value.toUpperCase() },
    ])
  );
  listInput.value = " ";
}

//function for adding the quotes in the list body
function quotes(len) {
  if (len === 0) {
    h1Quotes.style.display = "block";
  } else if (len > 0) {
    h1Quotes.style.display = "none";
    olList.style.display = "block";
  }
}

//Eventlistener for adding the input value inside the Ol list by button and enter button
saveBtn.addEventListener("click", addList);

listInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addList();
  }
});
