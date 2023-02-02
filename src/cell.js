export default class Cell {

    constructor(width, height, date, content, color){
        this._width = width;
        this._height = height;
        this.content = content || [];
        this.date = date;
        this.color = color;
        this.configDate(date);
    }

    get isHoliday(){
        return this.dayOfWeek === 0;
    }

    configDate(date){
        this.day = date.getDate();
        this.dayOfWeek = date.getUTCDay();
    }
}