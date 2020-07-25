//データが更新されたときに実行されるmain関数
function main() {
  //WBGT温度の計算を実行
  update_WBGT()
  
  //過去データの別シートへの転換
  pop2old()
}

function graph(){
  //最近3日間のデータを抽出
  Load3DaysData() 
  
  //グラフを書き出し
  //SaveGraph("室温グラフ","室温.png")
  //SaveGraph("WBGTグラフ","WBGT.png")  
  
  //Slackに投稿
  Slack_postGraph(make_graph("最近の室温","最近の室温","#FFFFCC"),"室温")
  Slack_postGraph(make_graph("最近のWBGT","最近の熱中症指数（WBGT）","azure"),"WBGT")
}