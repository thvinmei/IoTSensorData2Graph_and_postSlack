function Slack_postGraph(chart,valuename) {
  var now = new Date()
  var today = Utilities.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()),"JST", "yyyyMMdd")
  
  var slack = {
    postUrl:'https://slack.com/api/files.upload',
    token:"Slack Token", // Slackのtoken
    channelId:"Channel ID", // SlackのチャネルのID
    fileName:"IoTセンサー観測データ_"+valuename + today +".png" //ファイルの名前
  }

  var uploadFile = function(data){
    UrlFetchApp.fetch(slack["postUrl"], {
      "method" : "post",
      "payload" : {
        token: slack["token"],
        file: data,
        filename: slack["fileName"],
        channels: slack["channelId"]
      }
    });
  }

  uploadFile(chart.getAs("image/png"));
}