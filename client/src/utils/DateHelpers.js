export function getNth(number){
    if(number < 1){ throw new Error(); }
    if(number >= 4 && number <= 20){ return "th"; }
    switch(number % 10){
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export function parseDate(dateString){
    const date = new Date(dateString);
    if(date.toString() === "Invalid Date"){ throw new Error(); }
    let dateDisplay = "";

    const daysDifference = () => {
        const difference = Math.abs(new Date(Date.now()).getTime() - date.getTime());
        return difference / (1000 * 60 * 60 * 24);
    }

    if(daysDifference() > 7){
        const month = Intl.DateTimeFormat('en-US', { month : 'long' }).format(date);
        dateDisplay = `${month} ${date.getDate()}${getNth(date.getDate())}`
    } else {
        dateDisplay = new Intl.DateTimeFormat('en-US', {weekday : 'long'}).format(date);
    }

    let hours = date.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ?  12 : hours; 

    return `${dateDisplay} at ${hours}${amOrPm}`;
}