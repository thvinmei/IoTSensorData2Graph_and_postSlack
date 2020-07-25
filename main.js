//データが更新されたときに実行されるmain関数
function main() {
  //WBGT温度の計算を実行
  update_WBGT()
  
  //過去データの別シートへの転換
  pop2old()
}