// const catListSel = document.getElementById("catList");

// function onLoad() {
//   catListicle();
//   userDetailicles();
// }


// async function catListicle() {
//   const catFetch = await fetch('/category', {
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' },
//   });
//     catData = await catFetch.json(); 
//     catListSel.innerHTML = "";
//     catData.forEach((cat) => {
//       catListSel.innerHTML += `<li class="list-group-item" value="${cat.id}">${cat.name}</li>`;
//     });
//     catListSel.value = "";
//   };

// async function userDetailicles() {
//   const userFetch = await fetch('/user/' + req.session.userId, {
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' 
//   },
//   })
//     userData = await userFetch.json();


// }

// onLoad();