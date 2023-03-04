$("#update-modal-btn").click(async (catList) => {
      const catFetch = await fetch('/category/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      var catList = await catFetch.json();
      console.log(catList);
      
      return catList;
    });
