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

      console.log(w);
  
    return `${y}-W${('0' + w).slice(-2)}`;
  }