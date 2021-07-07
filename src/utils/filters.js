
export const paginateFunc = (data, start, end) => {
    let filteredData = Object.values(Object.fromEntries(Object.entries(data).filter((v, i) => i >= start && i < end)));
    return filteredData;
}

export const filterFunc = (data, filterStr) => {
    let weekDifference = 1;
    function findWeekDifference(date) {
        let currentDate = new Date();
        var diff = (new Date(date).getTime() - currentDate.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        return Math.abs(Math.round(diff));
    }

    switch (filterStr) {
        case "1Week":
            weekDifference = 1;
            break;
        case "2Weeks":
            weekDifference = 2;
            break;
        case "1Month":
            weekDifference = 4;
            break;
        default:
            weekDifference = 1;
    }

    let filteredData = Object.values(Object.fromEntries(Object.entries(data).filter((value) => {
        let flag = false;
        value.forEach((val) => {
            if (findWeekDifference(val.created_date) === weekDifference) {
                flag = true;
                return;
            }
        });
        if (flag) return value;
        return null;
    })))
    return filteredData;
}