function calc_WBGT(T,RH,SR=0,Vrm=0) {
  WBGT = 0.735 * T + 0.0374 * RH + 0.00292 * T * RH + 7.619 * SR - 4.557 * SR * SR - 0.0572 * Vrm - 4.064
  WBGT = Math.round(WBGT * 100)/100
  return WBGT
}

function update_WBGT(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const data = sheet.getSheetByName("new");
  const lastRow = data.getLastRow();
  
  values = data.getRange(1,1,lastRow,6).getValues()
  
  for(let row = 1 ; row < lastRow ; row++){
    values[row][5] = calc_WBGT(values[row][2],values[row][3])
  }
  
  data.getRange(1,1,lastRow,6).setValues(values)
}