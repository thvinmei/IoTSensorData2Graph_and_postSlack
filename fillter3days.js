//3日前までのデータを抽出する
function Load3DaysData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const newsheet = sheet.getSheetByName("new")
  const oldsheet = sheet.getSheetByName("old")
  const lastRowNew = newsheet.getLastRow()
  const lastRowOld = oldsheet.getLastRow()

  //日付の設定
  var day0 = new Date()
  day0.setDate(day0.getDate())
  day0 = Utilities.formatDate(day0, 'Asia/Tokyo', 'yyyy/MM/dd')
  var day1 = new Date()
  day1.setDate(day1.getDate()-1)
  day1 = Utilities.formatDate(day1, 'Asia/Tokyo', 'yyyy/MM/dd')
  var day2 = new Date()
  day2.setDate(day2.getDate()-2)
  day2 = Utilities.formatDate(day2, 'Asia/Tokyo', 'yyyy/MM/dd')
  
  //抽出用シートのデータを初期化する
  const tsheet = sheet.getSheetByName("最近の室温")
  tsheet.getRange(2,1,tsheet.getLastRow(),5).clear()
  var tvalue = tsheet.getRange(1,1,1,5).getValues()
   
  const wsheet = sheet.getSheetByName("最近のWBGT")
  wsheet.getRange(2,1,wsheet.getLastRow(),5).clear()
  var wvalue = wsheet.getRange(1,1,1,5).getValues()
  
  //newとoldのデータを結合する
  var valuesn = newsheet.getRange(2,1,lastRowNew-1,6).getValues()
  var valueso = oldsheet.getRange(2,1,lastRowOld-1,6).getValues()
  var values  = valueso.concat(valuesn)
  
  //データについてループし、抽出日付と一致するものだけを取り出す
  var trow = 0
  for(let row = values.length-1 ; row >= 0 ; --row){
    var date = Utilities.formatDate(values[row][0], 'Asia/Tokyo', 'yyyy/MM/dd')
    if(date == day0){
      tvalue.push([values[row][0],values[row][1],values[row][2],"",""])
      wvalue.push([values[row][0],values[row][1],values[row][5],"",""])
    }
    else if(date == day1){
      tvalue.push([values[row][0],values[row][1],"",values[row][2],""])
      wvalue.push([values[row][0],values[row][1],"",values[row][5],""])
    }
    else if(date == day2){
      tvalue.push([values[row][0],values[row][1],"","",values[row][2]])
      wvalue.push([values[row][0],values[row][1],"","",values[row][5]])
    }
    else{
      break
    }
  }
  console.log(tvalue)
  
  //抽出したデータを書き出し→スプレッドシート上でグラフ化
  tsheet.getRange(1,1,tvalue.length,tvalue[0].length).setValues(tvalue)
  wsheet.getRange(1,1,wvalue.length,wvalue[0].length).setValues(wvalue)
}