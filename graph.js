function SaveGraph(sheetname,outputname){
  const gdrivepath="" //GoogleドライブのフォルダID
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const graphs = sheet.getSheetByName(sheetname).getCharts()
  const folder = DriveApp.getFolderById(gdrivepath)
  var files = folder.getFilesByName(outputname)

  var image = graphs[0].getAs('image/png').setName(outputname)
  
  if (files.hasNext()) {
    Drive.Files.update({}, files.next().getId(), image)
  } else {
    folder.createFile(image);
  }
}

function make_graph(sheetname,title,bgcolor){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname)
  const range = sheet.getRange("B1:E100")
  var chart  = sheet.newChart()
                    .addRange(range)
                    //全般の書式設定
                    .setChartType(Charts.ChartType.LINE)
                    .setOption("backgroundColor.fill",bgcolor)
                    .setOption("chartArea",{width:'90%',height:'70%'})
                    //タイトルの設定
                    .setOption('title',title)
                    .setOption('titleTextStyle' ,{color: 'Green', fontSize: 20})
                    //凡例の設定
                    .setOption('legend', {position: 'top', textStyle: {color: 'green', fontSize: 16}})
                    //系列の書式設定
                    .setOption('series.0.color', 'red')
                    .setOption('series.1.color', "darkblue")
                    .setOption('series.2.color', "darkgray")
                    //画像の構築
                    .build()
  
  return chart
}
