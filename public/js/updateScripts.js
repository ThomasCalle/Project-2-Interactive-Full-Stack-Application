const subNewBtn = document.getElementById("sub-new-event");
const subNewForm = document.getElementById("newEvent");
const subCatForm = document.getElementById("sub-cat-form");
const catListSel = document.getElementById("cat-select");
const manageEvent = document.getElementById("buttons");
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

$("#update-modal-btn-event").click(() => {  $('#entryModalLabel').html('New Event');});

async function catFetcher(catList) {
  const catFetch = await fetch('/category/', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  });
  catList = await catFetch.json();

  catListSel.innerHTML = "";
  catListSel.innerHTML += `<option value="0">New Category</option>`;
  catList.forEach((cat) => {
    catListSel.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
  });
  catListSel.value = "";
};



//event listener for modal
subNewBtn.addEventListener('click', catFetcher());


$("#deleteEvent").on('click', async (event) => {
  const deletedEvent = await fetch(`/api/events/${event.target.dataset.id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  });
  document.location.replace('/');
}
)


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


// $(addNewCat).on('click', (event) => {})

// $(document.getElementById(t1-dur)).on('change', () => {

// })

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
  const newCategory = await fetch('/api/categories', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: catBody
  });
  const categoryData = await newCategory.json();
  return categoryData;
}

// event listener for new Event.
subNewBtn.addEventListener("click", async (event) => {

  let newCategory = {};
  event.preventDefault();
  if ($("#cat-select").val() === "0") {
    newCategory = await catPost();

  }
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
  formBody = JSON.stringify(formBody);
  let API = "/api/events/"
  let METHOD = "POST"
  if ($('input[name="id"]').val().trim() !== "") {
    API += $('input[name="id"]').val().trim();
    METHOD = "PUT"
  }
  fetch(API, {
    method: METHOD,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: formBody
  })
  resetFields();
  document.location.reload();

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

$("#closeBtnFooter").click(() => { resetFields() });
$("#closeBtnHeader").click(() => { resetFields() });


$("#editEvent").click(async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let eventData = await fetch(`/event/${event.target.dataset.id}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  });
  eventData = await eventData.json();
  $('#entryModalLabel').html('Edit Event');
  $('input[name="id"]').val(eventData.id);
  $('input[name="name"]').val(eventData.name);
  $('input[name="description"]').val(eventData.description);
  $('input[name="due_date"]').val(eventData.due_date);
  $(`select[name="category"] option[value=${eventData.category.id}]`).attr('selected', 'selected');

});