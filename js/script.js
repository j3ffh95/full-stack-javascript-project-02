/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const studentList = document.querySelectorAll(".student-item");
const itemsOnEachPage = 10;

const showPage = (list, page) => {
  // formulas to get the starting and end index
  const startIndex = page * itemsOnEachPage - itemsOnEachPage;
  const endIndex = page * itemsOnEachPage;
  // Iterate through the list array
  for (let i = 0; i < list.length; i++) {
    // Set li to the current li element
    const li = list[i];
    // If the index is more than or equal to the startIndex and less than the endIndex then set its display to block, otherwise hide it by setting it to none;
    if (i >= startIndex && i < endIndex) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  }
};

const appendPageLinks = (list) => {
  // Set pagesNeeded to the length of the list divided by how many items in each page and rounded up using Math.ceil method
  const pagesNeeded = Math.ceil(list.length / itemsOnEachPage);
  // Set a div by creating a div element
  const div = document.createElement("div");
  // Set a ul by creating a ul element
  const ul = document.createElement("ul");
  // give the new div a class of pagination
  div.className = "pagination";
  // append the ul element to the div
  div.appendChild(ul);
  // append the div to the parent element which has the class page
  document.querySelector(".page").appendChild(div);
  // Set up anchorList to all the anchor elements in the doc
  const anchorList = document.getElementsByTagName("A");
  // Making a loop using the pagesNeeded to create the li and a needed
  for (let i = 0; i < pagesNeeded; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    // Set pageNum to the current index plus one
    const pageNum = i + 1;
    // Appends the new li element to the new ul element
    ul.appendChild(li);
    // Gives anchor variable a # url attribute
    a.href = "#";
    // Set the text content in each anchor element to the pageNum
    a.textContent = pageNum;
    // Append the a element to the li
    li.appendChild(a);
    // Add an event listener to each anchor element
    a.addEventListener("click", (e) => {
      // Iterate over the anchorList
      for (let i = 0; i < anchorList.length; i++) {
        // Clear the anchor class
        anchorList[i].className = "";
        // Set the anchor that was clicked class to active
        e.target.className = "active";
      }
      // Call the showPage function to show the page that was clicked
      showPage(studentList, pageNum);
    });
  }
  // Set the first anchor element class to active
  anchorList[0].className = "active";
};

// Call the functions
showPage(studentList, 1);
appendPageLinks(studentList);

// Add Search Component
const searchDiv = document.createElement("div"),
  searchInput = document.createElement("input"),
  searchBtn = document.createElement("button"),
  parent = document.querySelector(".page-header");

searchDiv.className = "student-search";
searchInput.placeholder = "Search for students...";
searchBtn.innerText = "Search";

searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchBtn);

parent.appendChild(searchDiv);

const search = (e) => {
  e.preventDefault();
  const value = searchInput.value.toLowerCase();
  let studentArray = [];
  for (let i = 0; i < studentList.length; i++) {
    let studentLi = studentList[i];
    let name = studentLi.querySelector("h3").textContent;
    if (name.includes(value)) {
      studentArray.push(studentLi);
    } else {
      studentLi.style.display = "none";
    }
  }
  if (document.contains(document.querySelector(".pagination"))) {
    document.querySelector(".pagination").remove();
  }
  showPage(studentArray, 1);
  appendPageLinks(studentArray);
  console.log(studentArray);
};

searchBtn.addEventListener("click", search);

searchInput.addEventListener("keyup", search);
