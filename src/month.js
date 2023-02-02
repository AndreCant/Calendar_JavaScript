import Cell from "./cell";
import { isDivisibleBySeven, addDays, CONTENT, generateDateKey } from "../main";

const WEEK_LENGTH = 7; 
const MONTH_NAMES = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];
const WEEK_NAMES = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export default class Month {

    constructor(month, year){
        this.date = new Date(year, month, 1);
        this.weeks = [];
        this.buildMonth();
    }

    buildMonth(){
        const lastDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        const numberOfDaysInMonth = lastDayOfMonth.getDate();
        
        const firstDayOfWeekOfMonth = this.date.getUTCDay();
        const lastDayOfWeekOfMonth = lastDayOfMonth.getUTCDay();

        const startShift = firstDayOfWeekOfMonth;
        const endShift = ((WEEK_LENGTH - 1) - lastDayOfWeekOfMonth);
        const daysWithSurplus = startShift + numberOfDaysInMonth + endShift;

        const firstDayOfCalendarMonth = addDays(this.date, -startShift);

        if (isDivisibleBySeven(daysWithSurplus)) {
            for (let day = 0; day < daysWithSurplus; day++) {
                const cDay = addDays(firstDayOfCalendarMonth, day);
                const key = generateDateKey(cDay);
                let cell;

                if (CONTENT[key]) {
                    cell = new Cell(10, 10, cDay, CONTENT[key].content, CONTENT[key].color)
                }else{
                    cell = new Cell(10, 10, cDay, [], '')
                }

                if (!day || isDivisibleBySeven(day)) {
                    this.weeks.push([cell])
                }else{
                    this.weeks[this.getWeek(day)].push(cell)
                }
            }
        }else{
            console.error(daysWithSurplus)
        }    
    }

    getWeek(day){
        return (day / WEEK_LENGTH) | 0;
    }

    display(){
        const container = document.createElement('div');
        container.style.pageBreakAfter = 'always';
        const header = document.createElement('h1');
        header.innerText = `${MONTH_NAMES[this.date.getMonth()]} ${this.date.getFullYear()}`;
        
        const table = document.createElement('table');

        container.append(header);
        container.append(table);

        const dayNamesRow = document.createElement('tr');
        for (let index = 0; index < WEEK_LENGTH; index++) {
            const col = document.createElement('td');
            col.classList.add('week')
            const label = document.createElement('span');
            label.innerText = WEEK_NAMES[index];
            col.appendChild(label);
            dayNamesRow.appendChild(col);
        }

        table.appendChild(dayNamesRow);

        this.weeks.forEach(week => {
            const row = document.createElement('tr');

            week.forEach(day => {
                const col = document.createElement('td');
                col.classList.add('cell')

                const label = document.createElement('label');
                label.innerText = day.day;
                col.appendChild(label);

                if (this.date.getMonth() === day.date.getMonth()) {
                    const body = document.createElement('ul');

                    if (day.content.length) {
                        day.content.forEach(content => {
                            const item = document.createElement('li');
                            item.innerText = content;
                            item.style.backgroundColor = day.color;
                            body.appendChild(item);
                        })
                    }
                    col.appendChild(body);
                }else{
                    col.classList.add('disabled')
                }

                row.appendChild(col);
            });

            table.appendChild(row);
        })

        const br = document.createElement('br');
        table.appendChild(br);

        return container;
    }

}