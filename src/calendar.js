import Month from "./month";

export default class Calendar {

    constructor(month, year, numberOfMonths){
        this.startMonth = month;
        this.startYear = year;
        this.numberOfMonths = numberOfMonths;
    }

    get startDay(){
        return new Date(this.startYear, this.startMonth - 1, 1);
    }

    display(){
        const calendar = document.createElement('div');
        calendar.setAttribute('id', 'calendar');
        calendar.classList.add('calendar')

        for (let index = 0; index < this.numberOfMonths; index++) {
            const date = new Date(this.startDay.setMonth(this.startDay.getMonth() + index));
            const month = new Month(date.getMonth(), date.getFullYear());
            calendar.appendChild(month.display());
        }

        return calendar;
    }
}