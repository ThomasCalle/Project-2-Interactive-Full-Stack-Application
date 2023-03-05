const dayjs = require('dayjs');

module.exports = {
    calculateThresholdsDates: (eventData) => {

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
    },



    calculateThresholdBarPlots: (eventData) => {
        
        for(let i = 0; i < eventData.length; i++) {

            // get Due Date and convert to unix time.
            let dueDate = dayjs(eventData[i].due_date);
            let dueDay = dayjs(dueDate).unix();
            let nowDay = dayjs().unix();

            // Get the array of the thresholds
            let t1 = eventData[i].category.t1.split(" ");
            let t2 = eventData[i].category.t2.split(" ");
            let t3 = eventData[i].category.t3.split(" ");
    
            // Get date of thresholds as UNIX time
            t1date = dueDate.subtract(t1[0], t1[1]).unix();
            t2date = dueDate.subtract(t2[0], t2[1]).unix();
            t3date = dueDate.subtract(t3[0], t3[1]).unix();
            // Get the duration in unix code
            t1 = dueDay - t1date;
            t2 = dueDay - t2date;
            t3 = dueDay - t3date;
            const total = t1+t2+t3;


            let nowDate = dueDay - nowDay;

            // calculate timeFrame with t3 as outer field, divide by nine for unix duration of each threshold.
            const bargraphLength = 9;
            let timeFrame = t3;
            timeFrame = timeFrame / bargraphLength;
            // Add unix dates of thresholds back to array., along with threshold marker
            eventData[i].t1Date = t1date;
            eventData[i].t2Date = t2date;
            eventData[i].t3Date = t3date;
            eventData[i].t1pct = t1 / total * bargraphLength;
            eventData[i].t2pct = t2 / total * bargraphLength;
            eventData[i].t3pct = t3 / total * bargraphLength;
            eventData[i].nowTime = Math.ceil(nowDate / timeFrame);
        }
        return eventData;
    }
}
