function pop2old() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const newsheet = sheet.getSheetByName("new")
  const oldsheet = sheet.getSheetByName("old")
  const lastRowNew = newsheet.getLastRow()
  const lastRowOld = oldsheet.getLastRow()
  var uprow = 900
  
  //指定の行数を超えていた場合のみ処理を行う
  if(lastRowNew>uprow){
    //データを保存用シートに転記する
    values = newsheet.getRange(2,1,lastRowNew,6).getValues()
    oldsheet.getRange(lastRowOld+1,1,lastRowNew,6).setValues(values)
    
    //元ファイルのデータをクリアする
    newsheet.getRange(2,1,lastRowNew,6).clear()
  }
}