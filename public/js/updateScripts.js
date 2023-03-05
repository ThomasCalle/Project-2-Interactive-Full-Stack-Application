var subNewBtn = document.getElementById("sub-new-event");
var subNewForm = document.getElementById("newEvent");
var addNewCat = document.getElementById("add-new-cat");
var subCatForm = document.getElementById("sub-cat-form");

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

async function catFetcher (catList) {
      const catFetch = await fetch('/category/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      catList = await catFetch.json();
      const catListSel = document.getElementById("cat-select");
      catListSel.innerHTML = "";
      catList.forEach((cat) => {
        catListSel.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
      });
    };


//event listener for modal
subNewBtn.addEventListener('click', catFetcher())

  // $(addNewCat).on('click', (event) => {})

  // $(document.getElementById(t1-dur)).on('change', () => {

  // })

async function catPost() {
  var catData = {};
  var catForm = new FormData(subCatForm);
  catForm.forEach((value, key) => (catData[key] = value));
  
  var catBody =
    {
      "name": catData.name,
      "type": catData.type,
      "t1": catData.t1int + " " + catData.t1dur,
      "t2": catData.t2int + " " + catData.t2dur,
      "t3": catData.t3int + " " + catData.t3dur
  }
  catBody = JSON.stringify(catBody);
  await fetch('/api/categories', {
    method: 'POST',
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
    fetch('/api/events/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: formBody,
    })
  })
}

// event listener for new Event.
subNewBtn.addEventListener("click", (event) => {
  event.preventDefault();
    console.log(addNewCat.ariaPressed);
  if(addNewCat.ariaPressed === 'true') {
    catPost();
    return;

  } else if(addNewCat.ariaPressed === 'false') {
    var formData = {};
    var form = new FormData(subNewForm);
    form.forEach((value, key) => (formData[key] = value));
    console.log(formData)
    var formBody = {
      "name": formData.name,
      "description": formData.description,
      "due_date": formData.due_date,
      "location": "",
      "category_id": formData.category,
      // "user_id": req.session.id
    }
    formBody = JSON.stringify(formBody);
    fetch('/api/events/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: formBody
    })
  }
});

function categorySelects() {
for (let i = 0; i < 3; i++) {
  let j = i + 1
  const catNums = document.getElementById(`t${j}`);
  catNums.innerHTML = `<label for="text" class="form-label">Threshold ${j}</label><input type="text" name="t${j}int">
  <select name="t${j}dur">
  <option value="day">days</option>
  <option value="week" selected="selected">weeks</option>
  <option value="month">months</option>
  </select>`  
}
};

categorySelects();