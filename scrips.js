let page = 1;
// we don't want the user to load more than once whe he is at the bottom of the page
// so we prevent to do simultaneous fetch requests
let loading = false;
// we there is no data left to show
let endOfData = false;

// for the beside menu
str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// the function  fetch the nemes (data) from FastAPI backend and display it to HTML page
function loadNames() {
  if (!loading && !endOfData) {
    loading = true;

    // the link from fastAPI
    const URL = `http://127.0.0.1:8000/names/?limit=${page}`;

    // fetch the data
    fetch(URL)
      .then((res) => res.json())
      .then((names) => {
        // there is no more data to fetch
        if (names.length === 0) {
          endOfData = true;
          return;
        }

        // go through the names
        // put every name in list elment and give it an ID with the first letter
        // when we click on a letter in beside menu we go to names start with that letter
        names.forEach((name) => {
          const element = document.createElement("li");
          element.textContent = name;
          element.id = name[0];
          // add the li to ul that already exist in HTML
          document.querySelector(`.names`).append(element);
        });

        // next load of names
        page++;
        loading = false;
      }) // catch unexpected error
      .catch((error) => {
        console.error("there is an error fetching  names:", error);
        loading = false;
      });
  }
}

// first load
loadNames();

// Listen for scroll event
window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loading &&
    !endOfData
  ) {
    loadNames();
  }
});

// Create the menu
// so the user can browse names through letters
// a slight problem is that the user can't go to the

for (let i = 0; i < str.length; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = str[i];
  a.href = `#${str[i]}`;
  li.append(a);
  document.querySelector(".menu").append(li);
}
