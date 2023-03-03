const dayjs = require('dayjs');


async function fetchEvents() {
    const response =  await fetch('./event', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    let eventFetch = await response.json();
    for(let i = 0; i < eventFetch.length; i++) {

        // get Due Date and convert to unix time.
        let dueDate = dayjs(eventFetch[i].due_date);
        let dueDay = dayjs(dueDate).unix();


        // Get the array of the thresholds
        let t1 = eventFetch[i].category.t1.split(" ");
        let t2 = eventFetch[i].category.t2.split(" ");
        let t3 = eventFetch[i].category.t3.split(" ");
        
        // Get date of thresholds as UNIX time
        t1date = dueDate.subtract(t1[0], t1[1]).unix();
        t2date = dueDate.subtract(t2[0], t2[1]).unix();
        t3date = dueDate.subtract(t3[0], t3[1]).unix();

        // Get the duration in unix code
        t1 = dueDay - t1date;
        t2 = dueDay - t2date;
        t3 = dueDay - t3date;

        // calculate timeFrame with t3 as outer field, divide by nine for unix duration of each threshold.
        let timeFrame = t3;
        timeFrame = Math.floor(timeFrame / 9);
        
        // Add unix dates of thresholds back to array., along with threshold marker
        eventFetch[i].t1Date = t1date;
        eventFetch[i].t2Date = t2date;
        eventFetch[i].t3Date = t3date;
        eventFetch[i].t1 = Math.floor(t1 / timeFrame );
        eventFetch[i].t2 = Math.floor(t2 / timeFrame );
        eventFetch[i].t3 = Math.floor(t3 / timeFrame );
    }
    
    return eventFetch;
}

// fetchEvents();