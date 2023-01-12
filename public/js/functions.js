/**
 * 引数のDateが第何週かを返す
 * @param {Date} date 
 * @return {Number}
 */
function getWeek(date) {
    // 時差吸収済みDateオブジェクト作成
    const localAdjustDate = new Date(+date - date.getTimezoneOffset() * 6e4);
  
    const
      d = new Date(Math.floor((+localAdjustDate + 2592e5) / 6048e5) * 6048e5),
      y = d.getUTCFullYear(),
      w = 1 + Math.floor((d - new Date(y + '-01-01T00:00:00Z')) / 6048e5);
  
    return `${y}-W${('0' + w).slice(-2)}`;
}

/**
 * 0 月
 * 1 火
 * 2 水
 * 5 土
 * 6 日
 * @param {string} week 
 */
function weekToDate(week, key) {
    const OneDayTime  = 864e5;
    const OneWeekTime = OneDayTime * 7;

    const week_array = week.split('-W');
    const y = week_array[0];
    const w_ = week_array[1];
    
    const firstDay = new Date(y + '-01-01T00:00:00Z');

    key = 6 - key;
    const weekDay  = new Date(firstDay.getTime() + (w_ * OneWeekTime) - (key *  OneDayTime));
    
    return weekDay;
}

function numberToDate(start_hours, base_minutes, number, year, math, day) {
    
    const all_m = base_minutes * number;
    const h = Math.trunc(all_m / 60) + start_hours;
    const m = all_m % 60;
    
    return new Date(`${year}/${math}/${day} ${h}:${m}`);
}