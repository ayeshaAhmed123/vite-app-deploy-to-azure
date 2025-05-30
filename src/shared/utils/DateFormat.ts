
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


export function IndiciDateFormat(dt) {
    // Moment.locale("en");
    // var date = Moment.utc(dt).format("DD-MM-YYYY");
    // var date = Moment.utc(dt).local().format("DD-MM-YYYY");
    // var date = dayjs.utc(dt).local().format("DD-MM-YYYY");

    var date = dayjs(dt).local().format('DD-MMM-YYYY');    
return date;
}

export function IndiciDateFormatStart(dt) {
    // var date = dayjs.utc(dt).startOf('day').local().format("DD-MM-YYYY");

    var date = dayjs(dt)?.local()?.format('DD-MM-YYYY');    

    return date;
}

export function IndiciTimeFormat(dt) {
    // var dateTime = Moment.utc(dt).local().format('DD-MM-YYYY HH:mm:ss');
    // var dateTime = moment(new Date(dt)).format('DD-MM-YYYY HH:mm')
    var dateTime =dayjs(dt).format('DD-MM-YYYY h:mm A');
    // var dateTime = dayjs(dt).startOf('minute').format('DD-MM-YYYY h:mm:ss A');
    return dateTime;
}
export function IndiciTimeFormatForGrid(time) {
    var dateTime = dayjs(time).format('H:mm A');
    return dateTime;
}

export function IndiciDateFormatforAPI(dt) {
    // var date = dayjs.utc(dt).local().format("YYYY-MM-DD");
    
    var date = dayjs(dt).local().format("YYYY-MM-DD");    

    return date;
}
export function IndiciOnlyTime24HoursFormatforAPI(time) {
    var dateTime = dayjs(time).format("HH:mm:ss");
    // Moment.locale("en");
    // var dateTime = moment(new Date(time)).format("HH:mm:ss A");
    return dateTime;
}
export function IndiciTimeFormatforAPI(dt) {
    // var dateTime = dayjs.utc(dt).local().format('YYYY-MM-DD HH:mm:ss');

    var dateTime = dayjs(dt).local().format('YYYY-MM-DD HH:mm:ss');    

    return dateTime;
}

export function IndiciTimeFormatWithoutDate(dt) {
    // var dateTime = dayjs.utc(dt).local().format('HH:mm');

    var dateTime = dayjs(dt).local().format('HH:mm');    

    return dateTime;
}

export function IndiciDateFormatWithoutTime(dt) {
    // var dateTime = dayjs.utc(dt).local().format('DD-MM-YYYY HH:mm:ss');
    // var dateTime = dayjs.utc(dt).local().format('DD-MM-YYYY');

    var dateTime = dayjs(dt).local().format('DD-MM-YYYY');    

    return dateTime;
}

export function IndiciDateFormatWithMontName(dt) {
    // var dateTime = dayjs.utc(dt).local().format('DD-MM-YYYY HH:mm:ss');
    // var dateTime = dayjs.utc(dt).local().format('DD-MMM-YYYY');

    var dateTime = dayjs(dt).local().format('DD-MMM-YYYY');    

    return dateTime;
}

// var fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export const formatDate = (someDateTimeStamp) => {
    var dt = new Date(someDateTimeStamp),
        date = dt.getDate(),
        // month = months[dt.getMonth()],
        // timeDiff = someDateTimeStamp - Date.now(),
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
        return "Today";
    } else if (diffYears === 0 && diffDays === 1) {
        return "Yesterday";
    } else {
        return null;
    }
    // else{
    //      return IndiciDateFormatWithoutTime(someDateTimeStamp)+ IndiciTimeFormatWithoutDate(someDateTimeStamp)
    // }

    // else if(diffYears === 0 && diffDays === -1) {
    //   return "Tomorrow";
    // }else if(diffYears === 0 && (diffDays < -1 && diffDays > -7)) {
    //   return fulldays[dt.getDay()];
    // }else if(diffYears >= 1){
    //   return month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear();
    //   }else {
    //     return month + " " + date;
    //   }
}


export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};