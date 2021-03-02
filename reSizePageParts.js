  /* 
   * To change this license header, choose License Headers in Project Properties.
   * To change this template file, choose Tools | Templates
   * and open the template in the editor.
   */

  // if (av.dbg.flg.root) { console.log('Root: start of reSizePageParts'); }
  var av = av || {};  //because av already exists

  //********************************************************************************************************************
  //                                             Resize window helpers 
  //********************************************************************************************************************
  
  // if (av.dbg.flg.root) { console.log('Root: before Resize helpers'); }
  //----------------------------------------------------------------------------------------------------------------------
   av.removeVerticalScrollBars = function () {
    if (av.debug.uil) { console.log('ui: documentElement Ht, scroll client', document.documentElement.scrollHeight, document.documentElement.clientHeight); }
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      document.documentElement.style.height = document.documentElement.clientHeight + 'px';
    };

    //initialize the ht for main buttons and trash can so there is no scroll bar
    if (av.dom.mainButtons.scrollHeight > av.dom.mainButtons.clientHeight) {
      av.dom.mainButtons.style.height = av.dom.mainButtons.scrollHeight + 'px';
    };
    if (av.debug.uil) { console.log('ui: trashDivHt.client,scroll=', av.dom.trashDiv.clientHeight, av.dom.trashDiv.scrollHeight); }
    if (av.dom.trashDiv.scrollHeight > av.dom.trashDiv.clientHeight) {
      av.dom.trashDiv.style.height = av.dom.trashDiv.scrollHeight + 'px';
    };
    if (av.dom.orgTopId.scrollHeight > av.dom.orgTopId.clientHeight) {
      av.dom.orgTopId.style.height = av.dom.orgTopId.scrollHeight + 'px';
    };
    if (av.debug.uil) { console.log('ui: orgBot Ht', av.dom.orgBotId.scrollHeight, av.dom.orgBotId.clientHeight); }
    if (av.dom.orgBotId.scrollHeight > av.dom.orgBotId.clientHeight) {
      av.ui.orgBotIdNum = av.dom.orgBotId.scrollHeight + 9;
      av.dom.orgBotId.style.height = av.ui.orgBotIdNum + 'px';
    };
  };


  //on 2018_0823 this is where height gets messed up when loading the program. 
  //----------------------------------------------------------------------------------------------------------------------
  //on 2018_0823 this is where height gets messed up when loading the program. 
/*
   av.pch.divSize = function (from) {
    //av.debug.uil = true;
    if (av.debug.uil) { console.log('ui: PopPlotSize: ',from, 'called av.pch.divSize'); }
    if (av.debug.uil) { 
      console.log('ui: popChrtHolder css.wd ht border padding margin=', $("#popChrtHolder").css('width'), $("#popChrtHolder").css('height')
        , $("#popChrtHolder").css('border'), $("#popChrtHolder").css('padding'), $("#popChrtHolder").css('margin'));
    } 
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: av.dom.popChrtHolder.ht offset, client ht=', av.dom.popChrtHolder.offsetHeight,
        av.dom.popChrtHolder.clientHeight, '; parseInt(padding)=', parseInt($("#popChrtHolder").css('padding'), 10));
    }
    
    av.pch.pixel.ht = av.dom.popChrtHolder.clientHeight - 2 * parseInt($("#popChrtHolder").css('padding'), 10);
    av.pch.pixel.wd = av.dom.popChrtHolder.clientWidth - 2 * parseInt($("#popChrtHolder").css('padding'), 10);
    //console.log(from, 'called av.pch.divSize: av.pch.pixel.wd=', av.pch.pixel.wd, '; av.pch.pixel.ht=', av.pch.pixel.ht);
    av.pch.layout.height = av.pch.pixel.ht - av.pch.pixel.hdif;  //leave a bit more vertical space for plot;
    av.pch.layout.width = av.pch.pixel.wd - av.pch.pixel.wdif;   //leave more horizontal space to right of plot;
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }

    //av.dom.popChrtHolder.style.width = av.dom.popChrtHolder.clientWidth + 'px';  //seems redundent  djb said to delete as of 2018_0827
    //av.dom.popChrtHolder.style.height = av.dom.popChrtHolder.clientHeight + 'px';  //seems redundent djb said to delete as of 2018_0827
    av.dom.popChart.style.height = av.pch.layout.height + 'px';
    av.dom.popChart.style.width = av.pch.layout.width + 'px';
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: popChart css.wd, border, padding, margin=', $("#popChart").css('width'), $("#popChart").css('height')
        , $("#popChart").css('border'), $("#popChart").css('padding'), $("#popChart").css('margin'));
    }
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight,
        av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'), 10));
    }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }
    //av.debug.uil = false;
  };
*/
  av.anl.divSize = function (from) {
    if (av.debug.alo) { console.log('alo: ', from, 'called av.anl.divSize'); }
    //console.log(from,'anaChrtHolder Ht client scroll ', av.dom.anaChrtHolder.clientHeight, av.dom.anaChrtHolder.scrollHeight);
    //console.log(from,'anlDndChart Ht client scroll', av.dom.anlDndChart.clientHeight, av.dom.anlDndChart.scrollHeight);
    //console.log(from,'anlChrtSpace Ht client scroll', av.dom.anlChrtSpace.clientHeight, av.dom.anlChrtSpace.scrollHeight);

    if (av.debug.alo) { console.log('alo: av.dom.anaChrtHolder.clientWd, Ht=', av.dom.anaChrtHolder.clientWidth, av.dom.anaChrtHolder.clientHeight); }
    av.anl.ht = av.dom.anaChrtHolder.clientHeight - 1;
    av.anl.wd = av.dom.anaChrtHolder.clientWidth - 1;
    av.dom.anaChrtHolder.style.height = av.anl.ht + 'px';
    av.anl.ht = av.dom.anaChrtHolder.clientHeight - 6;
    av.dom.anlChrtSpace.style.height = av.anl.ht + 'px';
    av.dom.anlChrtSpace.style.width = av.anl.wd + 'px';
    av.anl.layout.height = av.anl.ht;
    av.anl.layout.width = av.anl.wd;
  };

  //----------------------------------------------------------------------------------------------------------------------

  // called from script in html file as well as below
  //----------------------------------------------------------------------------------------------------------------------
  // called from script in html file as well as below
  av.ui.browserResizeEventHandler = function (from) {
    if (true) { console.log(from, 'called av.ui.browserResizeEventHandler'); }
    if ('none' !== domStyle.get('analysisBlock', 'display')) {
      av.anl.AnaChartFn();
    }
    if ('none' !== domStyle.get('populationBlock', 'display')) {
      //av.ui.resizePopLayout('av.ui.browserResizeEventHandler popBlock');  //does not work
      if (av.debug.uil) {
        console.log('ui: av.grd.canvasSize =', av.grd.canvasSize, '; av.dom.gridCanvas.width = ', av.dom.gridCanvas.width,
          '; av.dom.gridHolder.clientHeight=', av.dom.gridHolder.clientHeight);
      }
      if (av.grd.need2DrawGrid) {
        av.grd.popChartFn('av.ui.browserResizeEventHandler');
        if (av.debug.uil) { console.log('ui: av.grd.need2DrawGrid=', av.grd.need2DrawGrid); }
        //av.grd.drawGridSetupFn('av.ui.browserResizeEventHandler when pop=flex');
      }
    }
    if ('none' !== domStyle.get('organismBlock', 'display')) {
      var rd = $('#orgDetailID').innerHeight();
      av.ui.adjustOrgInstructionTextAreaSize();
      av.ind.updateOrgTrace('av.ui.browserResizeEventHandler');
    }
  };

  //----------------------------------------------------------------------------------------------------------------------
    av.ui.chngPopWidth = function (from) {
    if (av.debug.uil) { console.log('ui: ', from, 'called av.ui.chngPopWidth'); }
    av.dom.rightInfoHolder.style.width = rightInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.selOrgType.style.width = ((rightInfoHolderWd / 2).toFixed(0)) + 'px';
  };

  //----------------------------------------------------------------------------------------------------------------------
  av.ui.adjustpopInfoWd = function (adjustGridWd) {
    var rightInfoHolderWd = av.dom.rightInfoHolder.offsetWidth - adjustGridWd;  //adjustGridWd postive means Grid needs width
    if (av.debug.uil) { console.log('ui: rightInfoHolderWd=', rightInfoHolderWd, '; av.ui.rightInfoHolderMinWd', av.ui.rightInfoHolderMinWd); }
    if (rightInfoHolderWd < av.ui.rightInfoHolderMinWd) {
      var navColWd = av.dom.navColId.offsetWidth;
      if (av.debug.uil) { console.log('ui: navColWd=', navColWd, '; rightInfoHolderWd=', rightInfoHolderWd, ''); }
      navColWd = (0.33 * (navColWd + rightInfoHolderWd)).toFixed(0);
      rightInfoHolderWd = navColWd * 2;
      av.dom.navColId.style.width = navColWd + 'px';
      if (av.debug.uil) { console.log('ui: navColWd=', navColWd, '; rightInfoHolderWd=', rightInfoHolderWd, '; mapHolder=', av.dom.mapHolder.offsetWidth);}
    }
    av.dom.rightInfoHolder.style.width = rightInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = rightInfoHolderWd + 'px';
    rightInfoHolderWd = (rightInfoHolderWd / 2).toFixed(0); //Math.round(rightInfoHolder/2);
    av.dom.selOrgType.style.width = rightInfoHolderWd + 'px';
    if (av.debug.uil) { console.log('ui: set selOrgType to ', rightInfoHolderWd + 'px'); }
    if (av.debug.uil) { console.log('ui: gridHolder.wd=', av.dom.gridHolder.offsetWidth, '; selOrgType.offsetWidth=', av.dom.selOrgType.offsetWidth); }
  };


window.addEventListener('resize', function() {
	// viewport and full window dimensions will change
	
	av.viewPortInnerWidth = window.innerWidth;
	av.viewPortInnerHeight = window.innerHeight;
	av.viewPortClientWidth = document.documentElement.clientWidth;
	av.viewPortClientHeight = document.documentElement.clientHeight;
});


  //This function does not work. make grid get larger and larger
  //----------------------------------------------------------------------------------------------------------------------
  av.ui.resizePopLayout = function (from) {
    //console.log(from, 'called av.ui.resizePopLayout');
    var extraGridWd = 0;  //positive there is extra to distribute; negative need more space.
    var popSideWdSum = av.dom.navColId.offsetWidth + av.dom.rightInfoHolder.offsetWidth;
    av.ui.allAvidaWd = av.dom.allAvida.offsetWidth;
    av.ui.navColIdWd = av.dom.navColId.offsetWidth;
    av.ui.mapHolderWd = av.dom.mapHolder.offsetWidth;
    av.ui.gridHolderWd = av.dom.gridHolder.offsetWidth;
    av.ui.rightInfoHolderWd = av.dom.rightInfoHolder.offsetWidth;

    av.ui.allAvidaHt = av.dom.allAvida.offsetHeight;
    av.ui.mapHolderHd = av.dom.mapHolder.offsetHeight;
    av.ui.popTopHd = av.dom.popTopRw.offsetHeight;
    av.ui.gridHolderHd = av.dom.gridHolder.offsetHeight;
    av.ui.popBotHd = av.dom.popBot.offsetHeight;

    //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
    //console.log('gridHolder_margin' ,$("#gridHolder").css("margin"), '; popChart=', $("#popChart").css('margin'));

    if (av.debug.uil) { 
      console.log('ui: Wd: allAvida navColId mapHolder gridHolder rightInfoHolder, sum', av.dom.allAvida.offsetWidth,
        av.dom.navColId.offsetWidth, av.dom.mapHolder.offsetWidth, av.dom.rightInfoHolder.offsetWidth,
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.rightInfoHolder.offsetWidth);
      console.log('ui: Wd: popStatsBlock selOrgType sum', av.dom.popStatsBlock.offsetWidth, av.dom.selOrgType.clientWidth,
        av.dom.popStatsBlock.offsetWidth + av.dom.selOrgType.clientWidth);

      console.log('ui: Ht; allAvida, mapHolder, popTopRw, gridHolder, popBot sum', av.dom.allAvida.offsetHeight,
        av.dom.mapHolder.offsetHeight, av.dom.popTopRw.offsetHeight, av.dom.gridHolder.offsetHeight,
        av.dom.popBot.offsetHeight, av.dom.popTopRw.offsetHeight + av.dom.gridHolder.offsetHeight + av.dom.popBot.offsetHeight);
      }
    if (av.dom.gridHolder.offsetWidth > av.dom.gridHolder.offsetHeight && av.dom.gridHolder.offsetWidth > av.ui.popGridCtlWdMin) {
      //set grid size based on height and distribute extra width.
      extraGridWd = av.dom.gridHolder.offsetWidth - av.dom.gridHolder.offsetHeight;
      popSideWdSum = popSideWdSum + extraGridWd;
      if (av.debug.uil) { console.log('ui: av.dom.gridHolder.client.wd ht', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight); }
      //av.dom.gridCanvas.width = av.dom.gridHolder.clientHeight;     //no style for canvas; style needed for div
      //av.dom.gridCanvas.height = av.dom.gridHolder.clientHeight;
      av.dom.gridCanvas.width = $("#gridHolder").height();     //no style for canvas; style needed for div
      av.dom.gridCanvas.height = $("#gridHolder").height();

      if (av.debug.uil) { console.log('ui: av.dom.gridCanvas.wd ht', av.dom.gridCanvas.width, av.dom.gridCanvas.height); }
      if (av.debug.uil) { console.log('ui: av.dom.gridHolder.client.wd ht', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight); }
      av.dom.navColId.style.width = (0.3 * popSideWdSum) + 'px';
      av.dom.popStatsBlock.style.width = (0.7 * popSideWdSum) + 'px';
      av.dom.setupBlock.style.width = (0.7 * popSideWdSum) + 'px';
      av.dom.selOrgType.style.width = (0.33 * popSideWdSum) + 'px';
    } else {
      // set grid size based on width   
      av.dom.gridCanvas.width = $("#gridHolder").width();     //no style for canvas; style needed for div
      av.dom.gridCanvas.height = $("#gridHolder").width();
    }
  };

  av.ui.adjustpopInfoWd = function (adjustGridWd) {
    var rightInfoHolderWd = av.dom.rightInfoHolder.offsetWidth - adjustGridWd;  //adjustGridWd postive means Grid needs width
    if (av.debug.uil) { console.log('ui: rightInfoHolderWd=', rightInfoHolderWd, '; av.ui.rightInfoHolderMinWd', av.ui.rightInfoHolderMinWd); }
    if (rightInfoHolderWd < av.ui.rightInfoHolderMinWd) {
      var navColWd = av.dom.navColId.offsetWidth;
      if (av.debug.uil) { console.log('ui: navColWd=', navColWd, '; rightInfoHolderWd=', rightInfoHolderWd, ''); }
      navColWd = (.33 * (navColWd + rightInfoHolderWd)).toFixed(0);
      rightInfoHolderWd = navColWd * 2;
      av.dom.navColId.style.width = navColWd + 'px';
      if (av.debug.uil) { console.log('ui: navColWd=', navColWd, '; rightInfoHolderWd=', rightInfoHolderWd, '; mapHolder=', av.dom.mapHolder.offsetWidth); }
    }
    av.dom.rightInfoHolder.style.width = rightInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = rightInfoHolderWd + 'px';
    rightInfoHolderWd = (rightInfoHolderWd / 2).toFixed(0); //Math.round(rightInfoHolder/2);
    av.dom.selOrgType.style.width = rightInfoHolderWd + 'px';
    if (av.debug.uil) { console.log('ui: set selOrgType to ', rightInfoHolderWd + 'px'); }
    if (av.debug.uil) { console.log('ui: gridHolder.wd=', av.dom.gridHolder.offsetWidth, '; selOrgType.offsetWidth=', av.dom.selOrgType.offsetWidth); }
  };

  //----------------------------------------------------------------------------------------------------------------------
  //Adjust Statistics area width based on gridholder size and shape. gridholder should be roughly square
  av.ui.adjustpopInfoSize = function (from) {
    var adjustGridWd = 0;
    if (av.debug.uil) { 
      console.log('ui: av.ui.adjustpopInfoSize was called from: ', from);
      console.log('ui: gridHolder.wd=', av.dom.gridHolder.offsetWidth);
      console.log('ui: navColId.wd=', av.dom.navColId.offsetWidth, '; mapHolder.wd=', av.dom.mapHolder.offsetWidth, '; rightInfoHolder.wd=', av.dom.rightInfoHolder.offsetWidth);
      console.log('ui: allAvida=', av.dom.allAvida.offsetWidth, '; sum= ',
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.rightInfoHolder.offsetWidth);
      console.log('ui: rightInfoHolder.offsetWidth, clientwidth =', av.dom.rightInfoHolder.offsetWidth, av.dom.rightInfoHolder.clientWidth);
      console.log('ui: popStatsBlock.offsetWidth, clientwidth =', av.dom.popStatsBlock.offsetWidth, av.dom.popStatsBlock.clientWidth);
      console.log('ui: selOrgType.offsetWidth, clientwidth =', av.dom.selOrgType.offsetWidth, av.dom.selOrgType.clientWidth);
      console.log('ui: av.ui.popGridCtlWdMin=', av.ui.popGridCtlWdMin, '; gridHolder.offsetWidt=', av.dom.gridHolder.offsetWidth);
    }
    if (av.dom.gridHolder.offsetWidth > av.dom.gridHolder.offsetHeight) {
      adjustGridWd = av.dom.gridHolder.offsetHeight - av.dom.gridHolder.offsetWidth; //adjustGridWd negative means grid holder is too wide.
      av.ui.adjustpopInfoWd(adjustGridWd);
    }
    if (av.ui.popGridCtlWdMin > av.dom.gridHolder.offsetWidth) {
      adjustGridWd = av.ui.popGridCtlWdMin - av.dom.gridHolder.offsetWidth;
      av.ui.adjustpopInfoWd(adjustGridWd);
    };
    if (av.debug.uil) {
      console.log('ui: gridHolder.wd=', av.dom.gridHolder.offsetWidth, '; selOrgType.offsetWidth=', av.dom.selOrgType.offsetWidth);
      console.log('ui: navColId.wd=', av.dom.navColId.offsetWidth, '; mapHolder.wd=', av.dom.mapHolder.offsetWidth,
        '; rightInfoHolder.wd=', av.dom.rightInfoHolder.offsetWidth);
      console.log('ui: allAvida=', av.dom.allAvida.offsetWidth, '; sum= ',
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.rightInfoHolder.offsetWidth);

      console.log('ui: popInfo.offsetWidth, clientwidth =', av.dom.rightInfoHolder.offsetWidth, av.dom.rightInfoHolder.clientWidth);
      console.log('ui: popStatsBlock.offsetWidth, clientwidth =', av.dom.popStatsBlock.offsetWidth, av.dom.popStatsBlock.clientWidth);
      console.log('ui: selOrgType.offsetWidth, clientwidth =', av.dom.selOrgType.offsetWidth, av.dom.selOrgType.clientWidth);
    }
    av.dom.gridCanvas.style.width = (av.dom.gridHolder.clientHeight - 2) + 'px';
    av.dom.gridCanvas.style.height = av.dom.gridCanvas.offsetWidth + 'px';
    av.dom.scaleCanvas.style.width = (av.dom.gridControlContainer.clientWidth - 1) + 'px';

    if (av.debug.uil) {
      console.log('ui: av.dom.gridHolder.clientWidth ht = ', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight);
      console.log('ui: ==== av.dom.gridCanvas.width ht =', av.dom.gridCanvas.width, av.dom.gridCanvas.height);
    }
  };


  // if (av.dbg.flg.root) { console.log('Root: before av.ui.removeVerticalScrollbar'); }
  //----------------------------------------------------------------------------------------------------------------------
  //https://tylercipriani.com/2014/07/12/crossbrowser-javascript-scrollbar-detection.html
  av.ui.removeVerticalScrollbar = function (scrollDiv, htChangeDiv) {
    console.log('ui: scrollDiv=', scrollDiv, '; htChangeDiv=', htChangeDiv);
    var scrollSpace = 0;
    if (0 <= window.jscd.os.indexOf('Win')) {
      scrollSpace = 17;
    }
    //if the two heights are different then there is a scroll bar
    var ScrollDif = document.getElementById(scrollDiv).scrollHeight - document.getElementById(scrollDiv).clientHeight;
    var hasScrollbar = 0 < ScrollDif;
    if (av.debug.uil) { 
      console.log('ui: scroll', scrollDiv, hasScrollbar, document.getElementById(scrollDiv).scrollHeight,
        document.getElementById(scrollDiv).clientHeight, '; htChangeDiv=', document.getElementById(htChangeDiv).scrollHeight,
        document.getElementById(htChangeDiv).offsetHeight, document.getElementById(htChangeDiv).style.height);
      }
    var divHt = document.getElementById(htChangeDiv).offsetHeight;
    if (av.debug.uil) { console.log('ui: htChangeDiv is', htChangeDiv, '; divHt=', divHt); }
    if (hasScrollbar) {
      if (null !== divHt) {
        var NewHt = divHt + 1 + scrollSpace + ScrollDif;  //add the ht difference to the outer div that holds this one
        //line below is where the height of the div actually changes
        if (av.debug.uil) { 
          document.getElementById(htChangeDiv).style.height = NewHt + 'px'; 
          console.log('ui: htChangeDiv=', htChangeDiv,'; NewHt=', NewHt);
        }    //why is dom assignment in debug?
      }
      //redraw the screen
      //av.ui.mainBoxSwap(page);
      if (av.debug.uil) {
          console.log('ui: Afterscroll', hasScrollbar, document.getElementById(scrollDiv).scrollHeight,
          document.getElementById(scrollDiv).clientHeight, '; htChangeDiv=', document.getElementById(htChangeDiv).scrollHeight,
          document.getElementById(htChangeDiv).offsetHeight, document.getElementById(htChangeDiv).style.height);
      };
    };
  };
  //Use later ??
  //av.ui.removeVerticalScrollbar('popStats4grid', 'popStatistics');
  //av.ui.removeVerticalScrollbar('popBot', 'popBot');


  //----------------------------------------------------------------------------------------------------------------------
  //                 Code that was compeletly commmented out
  //----------------------------------------------------------------------------------------------------------------------
  // ------------------------ Population Page Statistics tables --------------------------------------------------------

  //av.ui.adjustpopInfoSize('after page loaded, before chart is defined.');  // djb might delete later; not using as of 2018_0827

  //used to set the height so the data just fits. Done because different monitor/browser combinations require a different height in pixels.
  //may need to take out as requires loading twice now.

  //setting row height to match on population page stats window
  //http://www.tek-tips.com/viewthread.cfm?qid=891026
  /*
   Trying to dynamically set row ht in case it was different on differnt screens/opperationg systems, browsers.
   Never got it working
   
   var popsBotTblRows = document.getElementById('popsBotTable').rows;
   var sotBotTbl = document.getElementById('sotBotTable').rows;
   var ht = sotBotTbl[2].offsetHeight;
   for (var ii = 1; ii < popsBotTblRows.length; ii++) {
   //sotBotTbl[ii].offsetHeight = popsBotTblRows[ii].offsetHeight;  //can only get values not put them.
   console.log('sot rowHt=',sotBotTbl[ii].offsetHeight, '; PopsrowHt=',popsBotTblRows[ii].offsetHeight );
   }
   
   var newCss = '.botTable td {  line-height: ' + ht + 'px;  }';
   av.ptd.setStyle(newCss);
   //stylesheet.insertRule('.botTable td {  line-height: ' + ht + 'px;  }', 265);
   */
  // if (av.dbg.flg.root) { console.log('Root: end of reSizePageParts'); }


//---------------------------------------------------------------------------------- notes on different types of size --
//
// div objects have size with width (x) and height (y) directions. 
// there are several size modifies and trying to figure out which is which can be confusing. 

// dom box model and size info   
// https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
// There is a nested set of boxes with every div
// margin
//   border
//     padding
//       box (with actual content or guts
// the size of stuff around the box gets added twice, once for each side
// 
// dom.name.offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
// dom.name.clientWidth = box + 2*padding - scrollbar_width    
// dom.name.scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
// cssWidth = box only nothing else
// dom.name.width
// 
// 
// $('#name').innerWidth()
//    where name is from the id='name'   of the dom objecte in the html
//  .height() - returns the height of element excludes padding, border and margin.
//  .innerHeight() - returns the height of element includes padding but excludes border and margin.
//  .outerHeight() - returns the height of the div including border but excludes margin.
//  .outerHeight(true) - returns the height of the div including margin.
// 
// The difference between .css( "height" ) and .height() is that the former returns a value with units intact (for example, 400px).
// while the latter returns a unit-less pixel value (for example, 400)
// https://api.jquery.com/height/
//   
// var av.dom.nameQ = $("#name"); // ariable is longer than $ version so no real need to use
//  
// scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth
//  
//
// get css values
//     //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
//     //https://stackoverflow.com/questions/9592575/get-height-of-div-with-no-height-set-in-css
//     
// an example: the 10 at the end is to say base 10 rather than octal.
//     console.log('av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight, 
//       av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'),10));


// should this move to an init page ui function?
//get size of screen availbe for Avida-ED; used to keep on screen and get rid of scroll bars
//http://ryanve.com/lab/dimensions/
//https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
//https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
//window.screen.availWidth
//window.innerWidth    or    window.outerWidth
//console.log('documentElement Ht, scroll client', document.documentElement.scrollHeight, 
//  document.documentElement.clientHeight);
//if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
//  document.documentElement.style.height = document.documentElement.clientHeight + 'px';
//}
//
// Targeting common screen sizes   https://www.websitedimensions.com/

// looks like tool-tip
// https://www.w3schools.com/howto/howto_js_popup.asp
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup

//
// jQurey resize() Method
// https://www.w3schools.com/jquery/event_resize.asp
//
// html reize element: 
// https://codepen.io/sol0mka/pen/FnizC
// 
// Position relative to ancestor:
// https://www.w3schools.com/cssref/pr_pos_right.asp
//
// Document Ready Examples
// https://www.sitepoint.com/types-document-ready/
// 
// Forcing windows resize to fire
// https://stackoverflow.com/questions/1861109/forcing-windows-resize-to-fire
// https://stackoverflow.com/questions/23567483/jquery-fake-a-window-resize
// https://stackoverflow.com/questions/277759/html-onresizeend-event-or-equivalent-way-to-detect-end-of-resize
// https://stackoverflow.com/questions/2996431/detect-when-a-window-is-resized-using-javascript
// https://stackoverflow.com/questions/14504079/jquery-trigger-function-above-a-certain-window-width





