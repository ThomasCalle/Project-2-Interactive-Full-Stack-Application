const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
    } catch (error) {
      console.error(error);
    }
  };
  
  $("#logout").on("click", logout);