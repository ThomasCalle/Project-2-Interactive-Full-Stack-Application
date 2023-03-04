// login handler - verifes user credentials and logs in the user
const loginPageFormHandler = async (event) => {
  event.preventDefault();
  $('#loginPageMessage').remove();
  const email = $('#loginPageEmail').val().trim();
  const password = $('#loginPagePassword').val().trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();

      $('#loginPageForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "loginMessage",
        html: `<span>${data.message}</span>`
      }));

    }
  }
};
$('#loginPageForm').on('submit', loginPageFormHandler);


// registration form handler
const registerPageFormHandler = async (event) => {
  event.preventDefault();
  $('#registerPageMessage').remove();
  const firstName = $('#registerPageFirstName').val().trim();
  const lastName = $('#registerPageLastName').val().trim();
  const email = $('#registerPageEmail').val().trim();
  const password = $('#registerPagePassword').val().trim();
  const confirmPassword = $('#registerPageConfirmPassword').val().trim();

  if (password !== confirmPassword) {
    $('#registerPageForm').prepend($('<div>', {
      class: "alert alert-danger",
      id: "registerMessage",
      html: "<span>The passwords do not match. Please try again!</span>"
    }));
    return;
  }

  if (!/.{8,}/.test(password)) {
    $('#registerPageForm').prepend($('<div>', {
      class: "alert alert-danger",
      id: "registerMessage",
      html: "<span>The password must be minimum 8 characters long. Please try again!</span>"
    }));
    return;
  }


  if (firstName && lastName && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();

      $('#registerPageForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "registerMessage",
        html: "<span>Could not register new user. Please try again!</span>"
      }));

    }
  }
};
$('#registerPageForm').on('submit', registerPageFormHandler);


