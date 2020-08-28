  av.frd.reActLineParse = function(lnArray, from) {
    'use strict';
    if (av.debug.fio) { console.log('____', from, ' called av.frd.reActLineParse _____'); }
    var lnError = 'chemostat';     //was it a valid line wihtout errors
    //console.log('lnArray = ', lnArray);
    var pear = [];
    var reSrcNameAry; var reSrcName;
    var nn;
    var mm;

    //if (av.dbg.flg.nut) { console.log('reActLineParse: lnArray=', lnArray); }

    //console.log('task = lnArray[2]=',lnArray[2]);
    var logicindex = av.sgr.logicVnames.indexOf( lnArray[2] );   //task name length is variable so must fined in taht array
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var reActObj = av.nut[numTsk].react;   //objec based on logic type and reaction;
      //console.log('numTsk=', numTsk,'; lnArray', lnArray);
      //console.log('av.nut.'+numTsk+'.uiAll.geometry = ');

      if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll = ',av.nut[numTsk].uiAll); }

      var ndx = av.frd.findNameIndex(reActObj, lnArray[1], av.nut[numTsk].uiAll.geometry);

      reActObj.name[ndx] = lnArray[1];   //assin the name of the resource. 

      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with constants for Avida-ED
      reActObj.depletable[ndx] = 1;   //This is the default value for Avida
      reActObj.value[ndx] = 1;      //Avida default = 1; v<0 --> poison; v = 0 --> "None";  v > 0 --> rewarded; this should always be in cfg file
      reActObj.min[ndx] = 0.99;     //Avida default=0; set slightly below one because i'm not sure how the numbers are represented and wanted to make wure min < max
      reActObj.max[ndx] = 1.0;      //Avida default=1; Need to talk to curriculum folks about best value for min in Avidea-ED; I'm thinking just less than 1
      reActObj.max_count[ndx] = 1;         //Avdida-ED default = 1; 
      reActObj.task[ndx] = lnArray[2];     //from line parcing passed to this method 
      reActObj.resource[ndx] = "missing";  //if resoucre = missing, no resource was stated and the reaction is global and either none or infinite
      reActObj.type[ndx] = 'pow';          //Avida-ED default = 'pow'

      var len;
      var lngth = lnArray.length;
      //console.log('ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
      for (var jj=3; jj<lngth ;jj++) {
        var pairArray = lnArray[jj].split(':');    //this should get process
        len = pairArray.length;    
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii=1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          //console.log('React: ii=',ii,'; pear', pear);
          nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
          if (-1 < nn) {
            reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
          }
          else {
              lnError = ' '+pear[0]+' is not a valid reaction keyword. lnArray = '+lnArray;
              //console.log(lnError);
          };
        };
      };
      //There are older environment.cfg files that do not include a resource in the reaction statement. 
      // All of those will be considered to have global resources and they will typically be infinite or none.
      // 
      // IF the code word 'missing' is the listed as the name of the resource than there is not resource specified and 
      // the reaction can only act as if the resource for that task is none or infinite and it must be global. 
      av.debug.fio = true;
      if ('missing' === reActObj.resource[ndx]) {
        av.nut[numTsk].uiAll.regionsNumOf = 1;                 //reaction but no resource so it must be global and none or infinite
        av.nut[numTsk].uiAll.geometry = 'global';            //grid (if 1 < subdish)

        if (0 < reActObj.value[ndx]) {
          av.nut[numTsk].uiAll.supplyType = 'infinite';
          //if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll.supplyType =', av.nut[numTsk].uiAll.supplyType); }
        }
        else if (0 > reActObj.value[ndx])  {
          av.nut[numTsk].uiAll.supplyType = 'poison';   //poison or damage. does not kill, but hurts energy aquisition rate (ear). 
        }
        else if (0 == reActObj.value[ndx]) {
          av.nut[numTsk].uiAll.supplyType = 'none';
          //if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll.supplyType =', av.nut[numTsk].uiAll.supplyType); }
        }
        //console.log('numTsk=', numTsk, '; ndx=', ndx, '; av.nut[numTsk].uiAll.supplyType[ndx]=', av.nut[numTsk].uiSub.supplyType[ndx]
        //             , '; av.nut[numTsk].uiAll.regionsNumOf=', av.nut[numTsk].uiAll.regionsNumOf);
      }
      else {
        //console.log('ndx=', ndx, '; av.nut['+numTsk+'].react.depletable=', av.nut[numTsk].react.depletable);
        if (null == reActObj.depletable[ndx]) { reActObj.depletable[ndx] = 1; }
        if ( 1 != Number(reActObj.depletable[ndx]) ) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'infinite';
        };
        //console.log('ndx=', ndx, '; reActObj.depletable=', reActObj.depletable, '; uiSub.supplyType=', av.nut[numTsk].uiSub.supplyType);

/*
        // Reaction names a Resource; Need to find info about that resource to determine Supply Type. SupplyTypes will
        // be determined after the entire file has beeen read to make sure the named resource  is in the (nut)rient structure 
        
        //if (av.debug.fio) { console.log('____resourceName['+ndx+'] =', reActObj.resource[ndx], '; Name array is', av.nut[numTsk].resrc.name); } 
        else {
        reSrcName = reActObj.resource[ndx];
        reSrcNameAry = av.nut[numTsk].resrc.name;
        mm = reSrcNameAry.indexOf( reSrcName );
        console.log('numtsk=', numTsk, '; ndx=', ndx, '; mm=', mm);
        //if (av.debug.fio) { console.log('reSource  mm  =', mm, '; depletable=', reActObj.depletable[ndx], '; av.nut.'+numTsk +'.uiSub.supplyType=', av.nut[numTsk].uiSub.supplyType); }
        //if (av.debug.fio) { console.log('av.nut[numTsk]=', av.nut[numTsk]); }
        
          if (0 < av.nut[numTsk].uiSub.inflowHi) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'infinite';
          }
        }
*/
      };
      av.debug.fio = false;
      //console.log('numTsk',numTsk,'; ndx=',ndx, '; reAct_supplyType All Sub=', av.nut[numTsk].uiAll.supplyType, av.nut[numTsk].uiSub.supplyType[ndx]);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, '+ lnArray[2]+' not found in av.sgr.logicVnames';
      console.log(lnError);
    };

    return lnError;
  };
  
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