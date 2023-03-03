const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // optional, logs the response JSON data

      } else {
        const data = await response.json();
        console.log(data); // optional, logs the error JSON data
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  