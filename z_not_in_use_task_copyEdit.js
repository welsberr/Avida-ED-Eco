  //Load defaults in the dom from the defaults in the av.nut structure. 
  //------------------------------------------------------------------------------------------- av.frd.defaultNut2dom --
  av.frd.defaultNut2dom = function(from) {
    var sugarLength = av.sgr.logicNames.length;
    var ndx;
    var numTsk, tsk, tskose;
    var initialValue, rows, cols, gridSize;
    var subNum = 1;                   //Will need to loop throughh all subNum later
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface. 
    cols = Number(av.nut.wrldCols);
    rows = Number(av.nut.wrldRows);
    gridSize = cols * rows;
    if (av.dbg.flg.nut) { console.log(from, ' called av.frd.defaultNut2dom: cols = ', cols, '; rows = ', rows, '; gridSize = ', gridSize); }

    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];

      document.getElementById(tsk+'0geometry').value = av.sgr.nut.dft.uiAll.geometry;
      document.getElementById(tsk+'0supplyType').value = av.sgr.nut.dft.uiAll.supplyType;
      document.getElementById(tsk+'0regionLayout').value = av.sgr.nut.dft.uiAll.regionLayout;
      document.getElementById(tsk+'0initial').value = av.sgr.nut.dft.uiAll.initial;

      //for now only one dish - entire world. Later there will be subdishes initial plan is for 2 and then 4;
      for (var jj = 1; jj <= 1; jj++) {
        document.getElementById(tsk+jj+'supplyType').value = av.sgr.nut.dft.uiSub.supplyType;
        document.getElementById(tsk+jj+'initialHi').value = av.sgr.nut.dft.uiSub.initialHi;
        document.getElementById(tsk+jj+'inflowHi').value = av.sgr.nut.dft.uiSub.inflowHi;
        document.getElementById(tsk+jj+'outflowHi').value = av.sgr.nut.dft.uiSub.outflowHi;
        document.getElementById(tsk+jj+'diffuseCheck').value = av.sgr.nut.dft.uiSub.diffuseCheck;
        document.getElementById(tsk+jj+'periodCheck').value = av.sgr.nut.dft.uiSub.periodCheck;
        document.getElementById(tsk+jj+'gradientCheck').value = av.sgr.nut.dft.uiSub.gradientCheck;
        document.getElementById(tsk+jj+'side').value = av.sgr.nut.dft.uiSub.side;
        document.getElementById(tsk+jj+'inflowLo').value = av.sgr.nut.dft.uiSub.inflowLo;
        document.getElementById(tsk+jj+'outflowLo').value = av.sgr.nut.dft.uiSub.outflowLo;
        document.getElementById(tsk+jj+'initialLo').value = av.sgr.nut.dft.uiSub.initialLo;
        document.getElementById(tsk+jj+'regionCode').value = av.sgr.nut.dft.uiSub.regionCode;
        document.getElementById(tsk+jj+'regionName').value = av.sgr.nut.dft.uiSub.regionName;
        document.getElementById(tsk+jj+'boxed').value = av.sgr.nut.dft.uiSub.boxed;
        document.getElementById(tsk+jj+'subRegion').value = av.sgr.nut.dft.uiSub.subRegion;
        //document.getElementById(tsk+jj+'').value = av.sgr.nut.dft.uiSub;    //in case we think of another
      }
      
    if (av.dbg.flg.nut) { console.log('================================================================== end of av.frd.defaultNut2dom =='); }
  };
  //--------------------------------------------------------------------------------------- end av.frd.defaultNut2dom --

