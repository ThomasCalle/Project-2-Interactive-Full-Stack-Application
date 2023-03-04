const dayjs = require('dayjs');

module.exports = {
    calculateThresholds: (eventData) => {

         let dueDate = dayjs(eventData.due_date)

        let t1 = eventData.category.t1.split(" ");
        let t2 = eventData.category.t2.split(" ");
        let t3 = eventData.category.t3.split(" ");
        t1 = dueDate.subtract(t1[0], t1[1]);
        t2 = dueDate.subtract(t2[0], t2[1]);
        t3 = dueDate.subtract(t3[0], t3[1]);

        eventData.t1 = dayjs(t1).format("YYYY-MM-DD");
        eventData.t2 = dayjs(t2).format("YYYY-MM-DD");
        eventData.t3 = dayjs(t3).format("YYYY-MM-DD");
        return eventData;
    }
}
