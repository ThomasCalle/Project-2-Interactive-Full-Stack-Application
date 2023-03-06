const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      // document.location.replace('/');
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  
  $("#logout").on("click", logout);