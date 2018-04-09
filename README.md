# Margin Shape Maker
Photoshopのスクリプト。人呼んで余白つくるんです。  
選択したレイヤーの背面に、四角形の余白シェイプレイヤーを作成します。  

![MSMimg01](/MSMimg01.png "参考画像")

### 導入手順

1. MarginShapeMaker.jsxをダウンロード、または作成します。

2. \Program Files\Adobe\Adobe Photoshop（使用バージョン）\Presets\Script　に(１)のjsxファイルを追加します。

3. Photoshopを起動します。

4. ファイル -> スクリプト -> MarginShapeMaker



### 備考
・余白は半角整数を入力してください。  
・半角整数なので、-（マイナス）の入力も可能です。  
・入力同期にチェックを入れると、X=Yとなります。  
・レイヤーグループを選択してもシェイプ作成できます。※1  
・作成されるシェイプの色は#808080のグレーになります。※2  
・繰り返し使用する場合は、アクションに設定すると楽になります。  
・Photoshop CC 2017/2018で、動作確認済み。  
(上記以外のバージョンも問題ないと思いますが、保証は出来ません)


※1-レイヤーグループはグループ内全てのものでサイズ算出をします。  
クリッピングマスクが含まれている場合、可視状態からシェイプを作ると、  
予想外のサイズのシェイプが出来上がるので注意してください。  

※2-作成されるシェイプの色を変えたい場合は、ソースコードの  
//作成シェイプの色指定++++という部分にある、128という数値を  
好きな値に変更してください。

### その他
不具合や要望などありましたらIssuesか、下記までお願いいたします。  
（要望は応えられない可能性が高いです。）  
<https://twitter.com/yukichi0306>
