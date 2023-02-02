import './style.css'
import Calendar from './src/calendar';

/** Script **/
let numberOfMonths = 0;
const startDate = new Date(2023, 1, 1);
export const CONTENT = contentGeneration();

const calendar = new Calendar(startDate.getMonth() + 1, startDate.getFullYear(), numberOfMonths);

document.querySelector('#app').appendChild(calendar.display());
/************/

function contentGeneration(){
    const M = 'Mattina';
    const S = 'Sera';
    let START_M = 8;
    let START_S = 8;
    let date = startDate;
    let result = {};

    do {
        let startWeek = true;
        if (START_M > START_S) {
            START_M--;
        }else{
            START_S--;
        }

        let weekColor = getRandomColor();

        while(date.getUTCDay() !== 0 || startWeek) {
            result[generateDateKey(date)] = {
                content: [
                    `${M}: ${START_M}`,
                    `${S}: ${START_S}`
                ],
                color: weekColor
            }
            date = addDays(date, 1);
            startWeek = false;
        }
        
    } while (START_M && START_S);

    numberOfMonths = monthDiff(startDate, date) + 1;
    return result;
}

export function generateDateKey(date){
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function isDivisibleBySeven(num){
    if (num) return num % 7 === 0;
    return false;
}

function getRandomColor(){
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";;
}

export function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}