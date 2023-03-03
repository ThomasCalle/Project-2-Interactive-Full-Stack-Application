var dayjs = require('dayjs');
async function fetchEvents() {
    const response =  await fetch('./event', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    let eventFetch = await response.json();

    for(let i = 0; i < eventFetch.length; i++) {

        let dueDate = dayjs(eventFetch.due_date, "MM-DD-YYYY")
        console.log(dueDate);

        let t1 = eventFetch[i].category.t1.split(" ");
        let t2 = eventFetch[i].category.t2.split(" ");
        let t3 = eventFetch[i].category.t3.split(" ");
        t1 = dueDate.subtract(t1[0], t1[1]);
        t2 = dueDate.subtract(t2[0], t2[1]);
        t3 = dueDate.subtract(t3[0], t3[1]);

        eventFetch[i].t1 = t1;
        eventFetch[i].t2 = t2;
        eventFetch[i].t3 = t3;
    }
    console.log(eventFetch);
    
    return eventFetch;
}

fetchEvents();