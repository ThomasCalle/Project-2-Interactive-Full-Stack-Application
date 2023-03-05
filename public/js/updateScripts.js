var subNewBtn = document.getElementById("sub-new-event");
var subNewForm = document.getElementById("newEvent");

async function catFetcher (catList) {
      const catFetch = await fetch('/category/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      catList = await catFetch.json();
      console.log(catList);
      const catListSel = document.getElementById("cat-select");
      catList.forEach((cat) => {
        const catListItem = document.createElement("option");
        catListItem.innerHTML = cat.name;
        catListSel.appendChild(catListItem);
      });
    };
//event listener for modal
  $("#update-modal-btn").on('click', catFetcher);


// event listener for new Event.
subNewBtn.addEventListener("click", (event) => {
  event.preventDefault();
  var formData = {};
  var form = new FormData(subNewForm);
  form.forEach((value, key) => (formData[key] = value));
  console.log(formData);
  

  fetch('/api/events/', {
    method: 'POST',
    body: formData
  })
})
