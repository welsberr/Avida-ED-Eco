
  //Now that structure exists, use that data to update values in the user interface. 
  //--------------------------------------------------------------------------------------- av.frd.nutrientStruct2dom --
  av.frd.nutrientStruct2dom = function(from) {
    //console.log(from, 'called av.frd.nutrientStruct2dom --------------------');
    var sugarLength = av.sgr.logicNames.length;  //
    var numTsk, tsk, tskose;
    var subNum = 1;                   //Will need to loop throughh all subNum later
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface. 
    var xdiffuse = -1;
    var ydiffuse = -1;
    var area = 1;  // area of the world or subsection
    var cols = Number(av.nut.wrldCols);
    var rows = Number(av.nut.wrldRows);
    var wrldSize = cols * rows;
    //if (av.dbg.flg.nut) { console.log('Nut: ', from, ' called av.frd.nutrientStruct2dom: cols = ', cols, '; rows = ', rows, '; wrldSize = ', wrldSize); }
    
    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];

      document.getElementById(tsk+'0regionLayout').value = av.nut[numTsk].uiAll.regionLayout;
      //console.log('av.nut['+numTsk+'].uiAll.regionLayout', av.nut[numTsk].uiAll.regionLayout);
      document.getElementById(tsk+'0geometry').value = av.nut[numTsk].uiAll.geometry;

      if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        document.getElementById(tsk+'0supplyType').value = av.nut[numTsk].uiAll.supplyType;
        //console.log('av.nut['+numTsk+']=', av.nut[numTsk]);
      }
      else if ('grid' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        subsections = av.nut[numTsk].resrc.name.length;
        //console.log('subsections=', subsections,'; av.nut['+numTsk+']=', av.nut[numTsk]);
        
        //Loop through each subsection. 
        for (subNum = 1; subNum < subsections; subNum++) {

          // regionCode will need to be converted to regionName or need to get regionName from xy cooredinates
          //console.log('numTsk=', numTsk, 'av.nut[numTsk].uiSub=', av.nut[numTsk].uiSub);
          //document.getElementById(tsk+subNum+'regionName').value = av.nut[numTsk].uiSub.regionName[subNum];

          // console.log('document.getElementById('+tsk+subNum+'supplyType)',document.getElementById(tsk+subNum+'supplyType') );
          // var tmpstr = JSON.stringify(av.nut[numTsk].uiSub.supplyType);
          // console.log('av.nut['+numTsk+'].uiSub.supplyType['+subNum+'] =',av.nut[numTsk].uiSub.supplyType[subNum], '; supplyType=', tmpstr);
          document.getElementById(tsk+subNum+'supplyType').value = av.nut[numTsk].uiSub.supplyType[subNum]; 

          //console.log('numTsk=',numTsk,'; subNum=',subNum,'; resrc.xdiffuse=',av.nut[numTsk].resrc.xdiffuse[subNum], '; resrc.ydiffuse=',av.nut[numTsk].resrc.ydiffuse[subNum]);
          if (av.nut[numTsk].resrc.xdiffuse[subNum]) {
            if (!isNaN(parseFloat(av.nut[numTsk].resrc.xdiffuse[subNum]))) {
              xdiffuse = parseFloat(av.nut[numTsk].resrc.xdiffuse[subNum]);
            }
            else {xdiffuse = 1;}
          } 
          else {xdiffuse = 1;}
          if (av.nut[numTsk].resrc.ydiffuse[subNum]) {
            if (!isNaN(parseFloat(av.nut[numTsk].resrc.ydiffuse[subNum]))) {
              ydiffuse = parseFloat(av.nut[numTsk].resrc.ydiffuse[subNum]);
            }
            else {ydiffuse = 1;}
          }
          else {ydiffuse = 1;}
          diffuse = Math.round((xdiffuse+ydiffuse)/2);
          //console.log(tsk+subNum+'.xdiffuse=', xdiffuse, '; ydiffuse', ydiffuse, '; diffuse=', diffuse);
          if (0 < diffuse) {
            document.getElementById(tsk+subNum+'diffuseCheck').checked = true;
            av.nut[numTsk].uiSub.diffuseCheck[subNum] = true;
          }
          else { 
            document.getElementById(tsk+subNum+'diffuseCheck').checked = false;
            av.nut[numTsk].uiSub.diffuseCheck[subNum] = false;
          }

          //------------------------------------------------------------------------- 
          // Find area of region or whole dish as needed for inflow  Not sure this statement is needed, as there should alway be an area for dish 1.
          if ("1All" == av.nut[numTsk].uiAll.regionLayout) {
            area = wrldSize;
            if (!isNaN(parseFloat(av.nut[numTsk].cell.initial[subNum]))) {
              console.log('av.nut['+numTsk+'].cell.initial['+subNum+']=', parseFloat(av.nut[numTsk].cell.initial[subNum]));
              console.log('av.nut['+numTsk+'].uiSub.initialHiNp['+subNum+']=', av.nut[numTsk].uiSub.initialHiNp[subNum]);
              av.nut[numTsk].uiSub.initialHiNp[subNum] = parseFloat(av.nut[numTsk].cell.initial[subNum]);
            }
            else if (!isNaN(parseFloat(av.nut[numTsk].resrc.initial[subNum])) ) {
              //console.log('reSrc=', av.nut[numTsk].resrc.initial[subNum], '; wrldSize=', av.nut.wrldSize, 'Num(wrldSize=', parseFloat(av.nut.wrldSize) );
              av.nut[numTsk].uiSub.initialHiNp[subNum] = parseFloat(av.nut[numTsk].resrc.initial[subNum])/
                                                         parseFloat(av.nut.wrldSize);
              //console.log( 'tsk='+numTsk, 'reSrc=' , parseFloat(av.nut[numTsk].resrc.initial[subNum]) );
            }
            if (!isNaN(parseFloat(av.nut[numTsk].uiSub.initialHiNp[subNum]))) {
              //console.log('; uiSub=', av.nut[numTsk].uiSub.initialHiNp[subNum]);
              document.getElementById(tsk+subNum+'initialHiNp').value = av.nut[numTsk].uiSub.initialHiNp[subNum];
            }          
          } 
          else {
            //console.log('numTsk=', numTsk, '; subNum=', subNum, '; cell.initial=', parseFloat(av.nut[numTsk].cell.initial[subNum]), 'reSrc=', av.nut[numTsk].resrc.initial[subNum], '; uiSub=', av.nut[numTsk].uiSub.initialHiNp[subNum]);
            area = av.nut[numTsk].uiSub.area[subNum];
            //console.log('av.nut['+numTsk+'].uiSub.area['+subNum+']=', av.nut[numTsk].uiSub.area[subNum]);
          };

          //------------------------------------------------------------------------- 
          // This only works for whole dish until I start parsing cells. 
          // if initial is defined in RESOURCE, use that value, else use the default value from globals.          
          rValue = parseFloat(av.nut[numTsk].resrc.initial[subNum]);
          var rflag = true;
          //console.log(numTsk+'.resrc.initial=', av.nut[numTsk].resrc.initial[subNum], 'uiSub.initialHi.'+subNum+'=', av.nut[numTsk].uiSubinitialHiNp);
          if ( isNaN(rValue) ) {rflag = false;}
          else {
          // resrc.initial contains a number
            if ( 0 >rValue ) {rflag = false;}
            else {
              // resrc.initial is postive: now test area;
              if ( !isNaN(parseFloat(av.nut[numTsk].uiSub.area[subNum])) && 
                     0 != parseFloat(av.nut[numTsk].uiSub.area[subNum]) ) {
                rValue = rValue / parseFloat(av.nut[numTsk].uiSub.area[subNum]);
              }
              else if ( !isNaN(parseFloat(av.nut.wrldSize)) &&  0 != parseFloat(av.nut.wrldSize) ){
                rValue = rValue / parseFloat(av.nut.wrldSize);
                //console.log('Initial for '+tsk+' subNum='+subNum+'based on WrldSize, subNum size missing or = 0');
              }
            }
          }
          if (!rflag) {
            // inital value not assigned in config file for this task;
            av.nut[numTsk].uiSub.initialHiNp[subNum] = null;
            //if ( isNaN(parseFloat(document.getElementById(tsk+subNum+'initialHiNp').value))) {
            //    document.getElementById(tsk+subNum+'initialHiNp').value = av.sgr.nutdft.uiSub.initialHi;
            //}
          }

          //------------------------------------------------------------------------- 
          // if inflow is defined in RESOURCE, use that value, else use the default value from globals.
          //console.log('av.nut['+numTsk+'].resrc.inflow['+subNum+']=', av.nut[numTsk].resrc.inflow[subNum]);
          rValue = parseFloat(av.nut[numTsk].resrc.inflow[subNum]);
          if ( !isNaN(rValue) ) {
            if ( 0 <= parseFloat(av.nut[numTsk].resrc.inflow[subNum]) ) {
              //dom and nut contain inflow value per cell; 
              //RESOURCE contains inflow amount for all cells defined (whole world or subsection)
              if (0 < area) { rValue = rValue / area; }
              else { console.log('ERROR: area must be greater than zero'); }
            }
            else {
              rValue = av.sgr.nutdft.uiSub.inflowHi;
            }
          }
          else {
              rValue = av.sgr.nutdft.uiSub.inflowHi;           
          };
          //console.log('id=', tsk+subNum+'inflowHiNp');
          document.getElementById(tsk+subNum+'inflowHiNp').value = rValue;
          av.nut[numTsk].uiSub.inflowHiNp[subNum] = rValue;

          //------------------------------------------------------------------------- 
          // if outflow is defined in RESOURCE, use that value, else use the default value from globals.
          rValue = parseFloat(av.nut[numTsk].resrc.outflow[subNum]);
          if ( !isNaN(rValue) ) {
            if ( 0 <= rValue && rValue <= 1 ) {
              //console.log('av.nut['+numTsk+'].uiSub.outflowHiNp['+subNum+']=', tsk+subNum+'outflowHiNp).value=', rValue);
              document.getElementById(tsk+subNum+'outflowHiNp').value = rValue;
              av.nut[numTsk].uiSub.outflowHiNp[subNum] = rValue;
            };
          };
        
          // this is all that is being set now; I'll set more later
        }  //loop thru subsections
      }
      else {
        console.log('Error: geometry unrecognized');
      }
      // must be called outside the subsections loop
      //console.log('av.nut['+numTsk+']', av.nut[numTsk]);
      av.sgr.changeDetailsLayout(tsk, 1, 'av.frd.nutrientStruct2dom');  //the one in this case is for subsection, but it is not used. 
    }
    /*
    var debuglen = av.sgr.logicNames.length;
    for (var ii=0; ii<debuglen;ii++) { 
      tsk = av.sgr.logicNames[ii];
      for (subNum = 1; subNum <= av.nut.numRegionsinHTML; subNum++) {
        console.log('av.dom.'+tsk+subNum+'diffuseChecked=', document.getElementById(tsk+subNum+'diffuseCheck').checked, 
                                  '; period=', document.getElementById(tsk+subNum+'periodCheck').checked, 
                                  '; gradient=',document.getElementById(tsk+subNum+'gradientCheck').checked);
      } 
    }
    */
        //if (av.dbg.flg.nut) { 
    if (av.dbg.flg.nut) { 
      av.nutdom = {};
      av.nutdom = JSON.parse(JSON.stringify(av.nut));
      console.log('end of av.frd.nutrientStruct2dom');
      console.log('av.nutDom = ', av.nutdom); 
    }
    if (av.dbg.flg.nut) { console.log('Nut: ================================================================== end of av.frd.nutrientStruct2dom =='); }
  };
  //----------------------------------------------------------------------------------- end av.frd.nutrientStruct2dom --


//-------------------------------------------------------------------------------------------- $(function slidePopmute() --
   $(function slidePopMute_() {
    // because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED 
    // the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, 
    // so I multiplied by 200 to get 100.000% to get a reasonable number of values for the pixils in the slide
    //console.log('before defaultslide value');
    var muteSlideDefault = 95.4242509439325;
    // results in 2% as a default 
    var muteDefault = (Math.pow(10, (muteSlideDefault / 200)) - 1).toFixed(3);
    var slides = $('#mutePopSlide').slider({
      // range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 400,
      theme: 'summer',
      slide: function (event, ui) {
        var tmpVal = (Math.pow(10, (ui.value / 200)) - 1);
        if (1 <= tmpVal ) {tmpVal = tmpVal.toFixed(0); }
        else if (0.1 <= tmpVal ) {tmpVal = tmpVal.toFixed(1); }
        else if (0.01 <= tmpVal ) {tmpVal = tmpVal.toFixed(2); }
        else {tmpVal = tmpVal.toFixed(3); }
        //put the value in the text box 
        console.log('input', tmpVal, '; slide=', ui.value);
        $('#mutePopInput').val(tmpVal); //put slider value in the text near slider 
      }
    });
    // initialize
     $('#mutePopInput').val(muteDefault);
    
    /*update slide based on textbox */
    $('#mutePopInput').change(function () {
      var value = this.value;
      var muteNum = parseFloat(value);
      //if (av.debug.uil) { console.log('ui: muteNum=', muteNum); }
      if (muteNum >= 0 && muteNum <= 100) {
        av.ptd.validMuteInuput = true;
        av.dom.mutePopError.style.color = 'black';
        av.dom.mutePopError.innerHTML = '';
        //update slide value
        slides.slider('value', 200 * av.utl.log(10,1 + (muteNum)));
        console.log('value=', muteNum, '; slide=', 200 * av.utl.log(10,1 + (muteNum) ) );
        
        //av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('Mute changed', av.ind.settingsChanged); };
        av.post.addUser('mutePopInput =' + document.getElementById('mutePopInput').value,  '1add ? 949');
      } 
      else {
        av.ptd.validMuteInuput = false;
        av.dom.mutePopError.style.color = 'red';
        av.dom.mutePopError.innerHTML = '';
        av.dom.userMsgLabel.innerHTML = '';
        if (muteNum <= 0) {
          av.dom.mutePopError.innerHTML += 'Mutation rate must be >= than zero percent. ';
          if (av.debug.popCon) { console.log('<0'); }
        }
        if (muteNum >= 100) {
          av.dom.mutePopError.innerHTML += 'Mutation rate must be 100% or less. ';
          if (av.debug.popCon) { console.log('>0'); }
        }
        if (isNaN(muteNum)) {
          av.dom.mutePopError.innerHTML += 'Mutation rate must be a valid number. ';
          if (av.debug.popCon) { console.log('==NaN'); }
        }
      };
    });
  });
  
  
  /*            <div class="grid-currentSugarAmount-container">
                  <div class="grid-currentSugarAmount-item">resource<br />highest<br />cell value</div>  
                  <div class="grid-currentSugarAmount-item">NOT<br /><label id="mxNot"> </label><br /><label id="cellNot" </label></div>
                  <div class="grid-currentSugarAmount-item">NAN<br /><label id="mxNan"> </label><br /><label id="cellNan"></label></div>
                  <div class="grid-currentSugarAmount-item">AND<br /><label id="mxAnd"> </label><br /><label id="cellAnd"></label></div>  
                  <div class="grid-currentSugarAmount-item">ORN<br /><label id="mxOrn"> </label><br /><label id="cellOrn"></label></div>
                  <div class="grid-currentSugarAmount-item">ORO<br /><label id="mxOro"> </label><br /><label id="cellOro"></label></div>
                  <div class="grid-currentSugarAmount-item">ANT<br /><label id="mxAnt"> </label><br /><label id="cellAnt"></label></div>  
                  <div class="grid-currentSugarAmount-item">NOR<br /><label id="mxNor"> </label><br /><label id="cellNor"></label></div>
                  <div class="grid-currentSugarAmount-item">XOR<br /><label id="mxXor"> </label><br /><label id="cellXor"></label></div>
                  <div class="grid-currentSugarAmount-item">EQU<br /><label id="mxEqu"> </label><br /><label id="cellEqu"></label></div>  
                </div>
*/  



<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Numbers</h2>

<p>Numbers can be written with or without decimals:</p>

<p id="demo"></p>

<script>

isNumber = function(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

var x = 3.14;
var y = 3;
var e1 = (undefined == null);
var e2 = (undefined == NaN);
var e3 = (undefined == '');
var e4 = (null == NaN);
var e5 = (null == '');
var e6 = (NaN == '');

var n1 = (undefined != null);
var n2 = (undefined != NaN);
var n3 = (undefined != '');
var n4 = (null != NaN);
var n5 = (null != '');
var n6 = (NaN != '');

var x1 = parseInt('6 dog');
var notdef;
var nothing = null;
var notde = undefined;
var notNum = NaN;


document.getElementById("demo").innerHTML = 
 "(undefined == null) = " + e1 + "<br>" 
+ "(undefined == NaN) = " + e2 + "<br>" 
+ "(undefined == '') = " + e3 + "<br>" 
+ "(null == NaN) = " + e4 + "<br>" 
+ "(Nan == '') = " + e5 + "<br>" 
+ "(undefined != null) = " + n1 + "<br>" 
+ "(undefined != NaN) = " + n2 + "<br>" 
+ "(undefined != '') = " + n3 + "<br>" 
+ "(null != NaN) = " + n4 + "<br>" 
+ "(Nan != '') = " + n5 + "<br>" 
+ "isNumber(notdef) = " + isNumber(notdef) + "<br>" 
+ "isNumber(nothing) = " + isNumber(nothing) + "<br>" 
+ "isNumber(notde) = " + isNumber(notde) + "<br>" 
+ "isNumber(notNum) = " + isNumber(notNum) + "<br>" 
+ "isNumber(parseInt'6 dog')) = " + isNumber(x1) + "<br>" 
;
</script>

</body>
</html>

Results below:

JavaScript Numbers
Numbers can be written with or without decimals:

(undefined == null) = true
(undefined == NaN) = false
(undefined == '') = false
(null == NaN) = false
(Nan == '') = false
(undefined != null) = false
(undefined != NaN) = true
(undefined != '') = true
(null != NaN) = true
(Nan != '') = true
isNumber(notdef) = false
isNumber(nothing) = false
isNumber(notde) = false
isNumber(notNum) = false
isNumber(parseInt'6 dog')) = true