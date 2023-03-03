module.exports = {
    calculateThresholds: (events) => {
    for(let i = 0; i < events.length; i++) {

        let dueDate = dayjs(events.due_date, "MM-DD-YYYY")
        console.log(dueDate);

        let t1 = events[i].category.t1.split(" ");
        let t2 = events[i].category.t2.split(" ");
        let t3 = events[i].category.t3.split(" ");
        t1 = dueDate.subtract(t1[0], t1[1]);
        t2 = dueDate.subtract(t2[0], t2[1]);
        t3 = dueDate.subtract(t3[0], t3[1]);

        events[i].t1 = dayjs(t1).format("YYYY-MM-DD");
        events[i].t2 = dayjs(t2).format("YYYY-MM-DD");
        events[i].t3 = dayjs(t3).format("YYYY-MM-DD");
    }    
    return events;
}
}
