import logout from './logout'; 
// Imports the logout function from the logout.js file

const newFormHandler = async (event) => {
  event.preventDefault();

  // Get the values of the form inputs from the following:
  const name = document.querySelector('#event-name').value.trim();
  const date = document.querySelector('#event-date').value.trim();
  const description = document.querySelector('#event-description').value.trim();

  if (name && date && description) {
    // Send a POST request to the API endpoint with the form data
    const response = await fetch(`/api/events
    `, {
      method: 'POST',
      body: JSON.stringify({ name, date, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If the request is successful, redirect the user to their profile page
      document.location.replace('/profile');
    } else {
      // If the request has failed, display an error message to the user
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    // Get the ID of the project to delete from the button data attribute
    const id = event.target.getAttribute('data-id');

    // Send a DELETE request to the API endpoint with the project ID
    const response = await fetch(`/api/events
    /${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If the request was successful, redirect the user to their profile page
      document.location.replace('/profile');
    } else {
      // If the request failed, display an error message to the user
      alert('Failed to delete project');
    }
  }
};

// Add event listeners to the form and the event list
document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);
document.querySelector('.event-list').addEventListener('click', delButtonHandler);
document.querySelector('#logout').addEventListener('click', logout);

// Hey guys the code above creates and deletes the events of 'accesscal'
// includes the login.js and logout.js 