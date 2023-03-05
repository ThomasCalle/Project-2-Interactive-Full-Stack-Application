var subNewBtn = document.getElementById("sub-new-event");
var subNewForm = document.getElementById("newEvent");
var subNewCat = document.getElementById("sub-new-cat");
var subCatForm = document.getElementById("")

async function catFetcher (catList) {
      const catFetch = await fetch('/category/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      catList = await catFetch.json();
      console.log(catList);
      const catListSel = document.getElementById("cat-select");
      catList.forEach((cat) => {
        catListSel.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
      });
    };


//event listener for modal
  $("#update-modal-btn-event").on('click', function() {
    window.means = "event";
    catFetcher();
  })

  $("#update-modal-btn-cat").on('click', function() {
    window.means = "category";
  })


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