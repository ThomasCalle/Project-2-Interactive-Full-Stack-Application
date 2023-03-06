const subNewBtn = document.getElementById("sub-new-event");
const addNewBtn = document.getElementById("update-modal-btn-event");
const subNewForm = document.getElementById("newEvent");
const subCatForm = document.getElementById("sub-cat-form");
const catListSel = document.getElementById("cat-select");
const manageEvent = document.getElementById("buttons");
const editEvent = document.getElementById("editEvent");
var postOrPut = '';
var putId = '';
// Arrays for cascading dropdown (didn't end up working in time)

// var months = [];
// var weeks = [];
// var days = [];
// for (let i = 1; i < 13; i++) {
//   months.push(`<option value="${i}">${i}</option>`)
// };
// for (let i = 1; i < 53; i++) {
//   weeks.push(`<option value="${i}">${i}</option>`)
// };
// for (let i = 1; i < 30; i++) {
//   days.push(`<option value="${i}">${i}</option>`)

// };

//event listener for modal
addNewBtn.addEventListener('click', async (event) => {
  document.getElementById('entryModalLabel').innerHTML = "New Event";
  subNewBtn.innerHTML = "Add Event";
  postOrPut = "POST";
  catFetcher();});

manageEvent.addEventListener('click', async (event) => {
  console.log(event.target.dataset.id)

  if(event.target.id == "deleteEvent") {
    
    fetch(`/api/events/${event.target.dataset.id}`, {
      method: "DELETE"
    }).then(res => res.text())
    .then(res => console.log(res))
    .finally(() => {document.location.reload()})
  
  } else if (event.target.id == "editEvent") {
    const eventFetch = await fetch(`/event/${event.target.dataset.id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    document.getElementById('entryModalLabel').innerHTML = "Update Event";
    subNewBtn.innerHTML = "Update Event";

    var eventData = await eventFetch.json();
    var eventId = eventData.category.id;
    
    console.log(eventData)
    
    $('#eventName').val(eventData.name);
    $('#eventDesc').val(eventData.description);
    $('#eventDD').val(eventData.due_date);
    $('#cat-select').val(catFetcher(eventId))
    
    postOrPut = "PUT";
    putId = event.target.dataset.id;

  }
)


async function catFetcher(eventId) {
  const catFetch = await fetch('/category/', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  })
  const catList = await catFetch.json();

  catListSel.innerHTML = "";
  var catListBreakdown = [`<option value="0">New Category</option>`]
  catList.forEach((cat) => {
    if(cat.id == eventId) {
      catListBreakdown.push(`<option value="${cat.id}" selected>${cat.name}</option>`)
    } else {
    catListBreakdown.push(`<option value="${cat.id}">${cat.name}</option>`);
    }});
    console.log(catListBreakdown.join(""));
    catListSel.innerHTML = catListBreakdown.join("");


  catListSel.value = "";
};

$(document).ready(() => {
  $("#catFormFields").hide();
  categorySelects();
});

const toggleCategoryForm = () => {
  if ($("#cat-select").val() === "0") {
    $("#catFormFields").show();
  } else {
    $("#catFormFields").hide();
  }
}

$("#cat-select").change(toggleCategoryForm);


async function catPost() {
  var catData = {};
  var catForm = new FormData(subCatForm);
  catForm.forEach((value, key) => (catData[key] = value));

  var catBody =
  {
    "name": catData.catName,
    "type": catData.catType,
    "t1": catData.t1int + " " + catData.t1dur,
    "t2": catData.t2int + " " + catData.t2dur,
    "t3": catData.t3int + " " + catData.t3dur
  }
  catBody = JSON.stringify(catBody);
  await fetch('/api/categories', {
    method: "POST",

    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: catBody
  })
    .then((data) => data.json())
    .then(catData => {

      return catData
    })
    .then(catData => {

      var formData = {};
      var form = new FormData(subNewForm);
      form.forEach((value, key) => (formData[key] = value));

      var formBody = {
        "name": formData.name,
        "description": formData.description,
        "due_date": formData.due_date,
        "location": "",
        "category_id": catData.id,
        // "user_id": req.session.id
      }
      formBody = JSON.stringify(formBody);
      console.log(formBody)
      fetch(`/api/events/${putId}`, {
        method: postOrPut,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: formBody,
      })
    })
    .finally(() => {document.location.reload()});
}

async function eventPost() {
  var formData = {};

    var form = new FormData(subNewForm);
    form.forEach((value, key) => (formData[key] = value));
    console.log(formData)
    var formBody = {
      "name": formData.name,
      "description": formData.description,
      "due_date": formData.due_date,
      "location": "",
      "category_id": newCategory.id ? newCategory.id : formData.category,
      // "user_id": req.session.id
    }
    console.log(formData.id);
    formBody = JSON.stringify(formBody);
    fetch(`/api/events/${putId}`, {
      method: postOrPut,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: formBody
    })
    document.location.reload();
}

// event listener for new Event.
subNewBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if ($("#cat-select").val() === "0") {
    catPost();
    return;

  } else {
    eventPost();
  }

});

function categorySelects() {
  for (let i = 0; i < 3; i++) {
    let j = i + 1
    const catNums = document.getElementById(`t${j}`);
    catNums.innerHTML = 
    `<div class="input-group mb-2">
    <span for="threshold${j}" class="input-group-text">Threshold ${j}:</span>
    <input type="text" name="t${j}int" class="form-control">
    <select name="t${j}dur" class="form-select">
    <option value="day">days</option>
    <option value="week" selected="selected">weeks</option>
    <option value="month">months</option>
    </select>`    
  }
};

const resetFields = () => {
  $('input[name="id"]').val('');
  $('input[name="name"]').val('');
  $('input[name="description"]').val('');
  $('input[name="due_date"]').val('');
  $(`select[name="category"]`).val('')

}

$("#closeBtnFooter").click(() => { resetFields()});
$("#closeBtnHeader").click(() => { resetFields()});


$("#editEvent").click(async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let eventData = await fetch(`/event/${event.target.dataset.id}`, {
      method: "GET", 
      headers: { 'Content-Type': 'application/json' },
  });
  eventData = await eventData.json();

  $('input[name="id"]').val(eventData.id);
  $('input[name="name"]').val(eventData.name);
  $('input[name="description"]').val(eventData.description);
  $('input[name="due_date"]').val(eventData.due_date);
  $(`select[name="category"] option[value=${eventData.category.id}]`).attr('selected','selected');

});