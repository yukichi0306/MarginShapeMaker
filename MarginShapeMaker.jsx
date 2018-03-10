/* 
==============================================================================================
MarginShapeMaker
Last Update:2017/03/07
==============================================================================================
*/
// 単位を px に変更
preferences.rulerUnits = Units.PIXELS;
//実行フラグ
flag = 1;

//ピクセルのある範囲 [left,top,right,bottom]
layObj = activeDocument.activeLayer.bounds;
x1 = layObj[0];
y1 = layObj[1];
x2 = layObj[2];
y2 = layObj[3];
selectW = x2 - x1;
selectH = y2 - y1;

//ダイアログを表示=================================================================================
uDlg = new Window('dialog','MarginShapeMaker',[0,0,280,200]);
uDlg.center();
uDlg.infoPnl = uDlg.add("panel",[30,6,250,6+60], "選択中のレイヤープロパティ");
uDlg.infoPnl.Text = uDlg.infoPnl.add("statictext",[0,16,220,16+24], "W:"+selectW+"   H:"+selectH);
uDlg.infoPnl.justify = "center";
uDlg.infoPnl.Text.justify = "center";
uDlg.sText = uDlg.add("statictext",[36,84,36+56,84+24], "余白サイズ");
uDlg.sText = uDlg.add("statictext",[98,84,98+24,84+24], "X :");
uDlg.eText1 = uDlg.add("edittext",[124,84,124+30,84+24],　8);
uDlg.sText = uDlg.add("statictext",[156,84,156+24,84+24], "px");
uDlg.cBox = uDlg.add("checkbox",[188,98,188+24,98+24],"入力同期");
uDlg.sText = uDlg.add("statictext",[98,114,98+24,114+24], "Y :");
uDlg.eText2 = uDlg.add("edittext",[124,114,124+30,114+24],　8);
uDlg.sText = uDlg.add("statictext",[156,114,156+24,114+24], "px");
uDlg.cancelBtn = uDlg.add("button", [48,160,48+60,160+24], "キャンセル", {name: "cancel"});
uDlg.okBtn = uDlg.add("button",[168,160,168+60,160+24], "作成", { name:"ok"});

//チェックボックスをクリックした時
uDlg.cBox.onClick = function()
{
    if(uDlg.cBox.value == true)
    {
        uDlg.eText2.text = uDlg.eText1.text;
    }
}

//サイズ入力時の処理
uDlg.eText1.onChanging = function()
{
    if(uDlg.cBox.value == true)
    {
        uDlg.eText2.text = uDlg.eText1.text;
    }
}

uDlg.eText2.onChanging = function()
{
    if(uDlg.cBox.value == true)
    {
        uDlg.eText1.text = uDlg.eText2.text;
    }
}

//キャンセルボタンを押す時の処理
uDlg.cancelBtn.onClick = function ()
{
    flag = 0;
    uDlg.close();
}

uDlg.show();
//==============================================================================================

//半角整数かの判断
numVal1 = uDlg.eText1.text;
numVal2 = uDlg.eText2.text;
function isNumber (numVal1)
{
    const pattern = /^[+,-]?([1-9]\d*|0)$/;
    return pattern.test(numVal1);
}

function isNumber (numVal2)
{
    const pattern = /^[+,-]?([1-9]\d*|0)$/;
    return pattern.test(numVal2);
}

//入力された余白を元に、切抜き用シェイプの座標を計算
posL = x1 - parseInt(numVal1);
posT = y1 - parseInt(numVal2);
posR = x2 + parseInt(numVal1);
posB = y2 + parseInt(numVal2);

if ((flag == 1) && (isNumber (numVal1) == true) && (isNumber (numVal2) == true))
{
    createShape();
    moveLayer ();
}
else if ((isNumber (numVal1) == false) || (isNumber (numVal2) == false))
{
    alert ("半角整数を入力してください。");
}

//シェイプの作成========================================================================================
function createShape()
{
var idMk = charIDToTypeID( "Mk  " );
    var desc12 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        ref2.putClass( idcontentLayer );
    desc12.putReference( idnull, ref2 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc13 = new ActionDescriptor();
        var idType = charIDToTypeID( "Type" );
            var desc14 = new ActionDescriptor();
            var idClr = charIDToTypeID( "Clr " );
            //作成シェイプの色指定+++++++++++++++++++++++++++++
                var desc15 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc15.putDouble( idRd, 128 );
                var idGrn = charIDToTypeID( "Grn " );
                desc15.putDouble( idGrn, 128 );
                var idBl = charIDToTypeID( "Bl  " );
                desc15.putDouble( idBl, 128 );
                //+++++++++++++++++++++++++++++++++++++++++
            var idRGBC = charIDToTypeID( "RGBC" );
            desc14.putObject( idClr, idRGBC, desc15 );
        var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
        desc13.putObject( idType, idsolidColorLayer, desc14 );
        var idShp = charIDToTypeID( "Shp " );
            var desc16 = new ActionDescriptor();
            var idunitValueQuadVersion = stringIDToTypeID( "unitValueQuadVersion" );
            desc16.putInteger( idunitValueQuadVersion, 1 );
            var idTop = charIDToTypeID( "Top " );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idTop, idPxl, posT );//posT
            var idLeft = charIDToTypeID( "Left" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idLeft, idPxl, posL );//posL
            var idBtom = charIDToTypeID( "Btom" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idBtom, idPxl, posB );//posB
            var idRght = charIDToTypeID( "Rght" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idRght, idPxl, posR );//posR
            var idtopRight = stringIDToTypeID( "topRight" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idtopRight, idPxl, 0.000000 );
            var idtopLeft = stringIDToTypeID( "topLeft" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idtopLeft, idPxl, 0.000000 );
            var idbottomLeft = stringIDToTypeID( "bottomLeft" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idbottomLeft, idPxl, 0.000000 );
            var idbottomRight = stringIDToTypeID( "bottomRight" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc16.putUnitDouble( idbottomRight, idPxl, 0.000000 );
        var idRctn = charIDToTypeID( "Rctn" );
        desc13.putObject( idShp, idRctn, desc16 );
        var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            var desc17 = new ActionDescriptor();
            var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
            desc17.putInteger( idstrokeStyleVersion, 2 );
            var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
            desc17.putBoolean( idstrokeEnabled, false );
            var idfillEnabled = stringIDToTypeID( "fillEnabled" );
            desc17.putBoolean( idfillEnabled, true );
            var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
            var idPnt = charIDToTypeID( "#Pnt" );
            desc17.putUnitDouble( idstrokeStyleLineWidth, idPnt, 4.000000 );
            var idstrokeStyleLineDashOffset = stringIDToTypeID( "strokeStyleLineDashOffset" );
            var idPnt = charIDToTypeID( "#Pnt" );
            desc17.putUnitDouble( idstrokeStyleLineDashOffset, idPnt, 0.000000 );
            var idstrokeStyleMiterLimit = stringIDToTypeID( "strokeStyleMiterLimit" );
            desc17.putDouble( idstrokeStyleMiterLimit, 100.000000 );
            var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
            var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
            var idstrokeStyleButtCap = stringIDToTypeID( "strokeStyleButtCap" );
            desc17.putEnumerated( idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap );
            var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
            var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
            var idstrokeStyleMiterJoin = stringIDToTypeID( "strokeStyleMiterJoin" );
            desc17.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin );
            var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
            var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
            var idstrokeStyleAlignInside = stringIDToTypeID( "strokeStyleAlignInside" );
            desc17.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside );
            var idstrokeStyleScaleLock = stringIDToTypeID( "strokeStyleScaleLock" );
            desc17.putBoolean( idstrokeStyleScaleLock, false );
            var idstrokeStyleStrokeAdjust = stringIDToTypeID( "strokeStyleStrokeAdjust" );
            desc17.putBoolean( idstrokeStyleStrokeAdjust, false );
            var idstrokeStyleLineDashSet = stringIDToTypeID( "strokeStyleLineDashSet" );
                var list2 = new ActionList();
            desc17.putList( idstrokeStyleLineDashSet, list2 );
            var idstrokeStyleBlendMode = stringIDToTypeID( "strokeStyleBlendMode" );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idNrml = charIDToTypeID( "Nrml" );
            desc17.putEnumerated( idstrokeStyleBlendMode, idBlnM, idNrml );
            var idstrokeStyleOpacity = stringIDToTypeID( "strokeStyleOpacity" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc17.putUnitDouble( idstrokeStyleOpacity, idPrc, 100.000000 );
            var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
                var desc18 = new ActionDescriptor();
                var idClr = charIDToTypeID( "Clr " );
                    var desc19 = new ActionDescriptor();
                    var idRd = charIDToTypeID( "Rd  " );
                    desc19.putDouble( idRd, 0.000000 );
                    var idGrn = charIDToTypeID( "Grn " );
                    desc19.putDouble( idGrn, 0.000000 );
                    var idBl = charIDToTypeID( "Bl  " );
                    desc19.putDouble( idBl, 0.000000 );
                var idRGBC = charIDToTypeID( "RGBC" );
                desc18.putObject( idClr, idRGBC, desc19 );
            var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
            desc17.putObject( idstrokeStyleContent, idsolidColorLayer, desc18 );
            var idstrokeStyleResolution = stringIDToTypeID( "strokeStyleResolution" );
            desc17.putDouble( idstrokeStyleResolution, 72.000000 );
        var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
        desc13.putObject( idstrokeStyle, idstrokeStyle, desc17 );
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    desc12.putObject( idUsng, idcontentLayer, desc13 );
    var idLyrI = charIDToTypeID( "LyrI" );
    desc12.putInteger( idLyrI, 15 );
executeAction( idMk, desc12, DialogModes.NO );
}

//==========================================================================================================

//レイヤー順を選択レイヤーの一つ下に移動==============================================================================
function moveLayer()
{
var idmove = charIDToTypeID( "move" );
    var desc6 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref3.putEnumerated( idLyr, idOrdn, idTrgt );
    desc6.putReference( idnull, ref3 );
    var idT = charIDToTypeID( "T   " );
        var ref4 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idPrvs = charIDToTypeID( "Prvs" );
        ref4.putEnumerated( idLyr, idOrdn, idPrvs );
    desc6.putReference( idT, ref4 );
executeAction( idmove, desc6, DialogModes.NO );
}
//==========================================================================================================
