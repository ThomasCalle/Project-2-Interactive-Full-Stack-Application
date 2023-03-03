
async function fetchEvents() {
    const response =  await fetch('./event', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    let eventFetch = await response.json();
    for(let i = 0; i < eventFetch.length; i++) {

        // get Due Date and today, determine day of the year
        // NOTE WE HAVE TO ADD FUNCTION FOR YEAR CHANGE
        let dueDate = dayjs(eventFetch[i].due_date);
        let dueDay = dueDate.dayOfYear();
        let toDay = dayjs().dayOfYear();

        let timeFrame = dueDay - toDay;
        console.log(timeFrame);
        timeFrame = Math.floor(timeFrame / 9);
        console.log(timeFrame);

        // Get the array of the thresholds
        let t1 = eventFetch[i].category.t1.split(" ");
        let t2 = eventFetch[i].category.t2.split(" ");
        let t3 = eventFetch[i].category.t3.split(" ");

        // Get date of thresholds
        t1 = dueDate.subtract(t1[0], t1[1]);
        t2 = dueDate.subtract(t2[0], t2[1]);
        t3 = dueDate.subtract(t3[0], t3[1]);

        // Get date of year for thresholds
        let t3Day = t3.dayOfYear();
        let t2Day = t2.dayOfYear();
        let t1Day = t1.dayOfYear();

        // get number of days from now to due date

        eventFetch[i].t1 = Math.floor(t1Day / timeFrame );
        eventFetch[i].t2 = Math.floor(t2Day / timeFrame );
        eventFetch[i].t3 = Math.floor(t3Day / timeFrame );
    }
    console.log(eventFetch);
    
    return eventFetch;
}

fetchEvents();