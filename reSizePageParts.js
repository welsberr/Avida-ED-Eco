/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// if (av.dbg.flg.root) { console.log('Root: start of reSizePageParts'); }
var av = av || {};  //because av already exists

/* yemi: checks if the left side panel is closed or not; is used by both the dragbar and the left panel button. */
var IS_LEFT_CLOSED = false;

/* yemi: checks if the right side panel is closed or not; is used by both the dragbar and the right panel button. */
var IS_RIGHT_CLOSED = false;

/* yemi: function to automatically resize the Analysis page when button clicked; called in avidaED.js */
function resizeAnalysisPage() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarLeftWidth = $('#dragbarLeft').css("width");
  var newColumns = leftNavBarWidth + " " + dragbarLeftWidth + " auto";
  $('.all2lft').css("grid-template-columns", newColumns);
}

/* diane modieved yemi's work: function to automatically resize the Analysis page when button clicked; called in avidaED.js */
av.ui.resizeShowTextDebugPage =function() {
  console.log('in av.ui.resizeShowTextDebugPage');
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarLeftWidth = $('#dragbarLeft').css("width");
  var newColumns = leftNavBarWidth + " " + dragbarLeftWidth + " auto";
  $('.all2lft').css("grid-template-columns", newColumns);
};

/* yemi: function to automatically resize the Populations page when button clicked; called in avidaED.js */
function resizePopulationPage() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarWidth = $('.dragbar').css("width");
  var rightSideWidth = $('#rightInfoHolder').css("width");
  var newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
  $('.all3pop').css("grid-template-columns", newColumns);
  av.grd.drawGridSetupFn(); // yemi: redraw the grid
}

/* yemi: function to automatically resize the Organisms page when button clicked; called in avidaED.js */
function resizeOrganismPage() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarWidth = $('.dragbar').css("width");
  console.log('$("#rightInfoHolder").css("width"); = ', $('#rightInfoHolder').css("width"));
  //var rightSideWidth = $('#rightInfoHolder').css("width");
  var rightSideWidth = 0;
  var newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
  $('.all3org').css("grid-template-columns", newColumns);
}

/* yemi: functions for left dragbar */
function dragbarLeftResize() {
  console.log('navColID=', parseInt($('#navColId').css("min-width")));
  var dragging = false;

  /* yemi: when there's a mousehover over dragbar, dragbar changes color */
  $('#dragbarLeft').on('mouseover touchstart', function(e) {
    $('#dragbarLeft').css('background-color', 'blue');
  });

  $('#dragbarLeft').on('mouseout touchend', function(e) {
    $('#dragbarLeft').css('background-color', 'gray');
  });

  $('#dragbarLeft').on('mousedown touchmove', function(e) {
    dragging = true;

    // yemi: need to account for both touch and mouse event
    var x;
    if(e.type == 'touchmove'){
      console.log('here', e);
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      x = touch.pageX;
    } else if (e.type == 'mouseup') {
      x = e.clientX;
    }
    
    $(document).on('mousemove touchmove', function(e){
      av.grd.drawGridSetupFn(); // yemi: redraw the grid

      /* yemi: on mouse move, dragbar changes color */
      $('#dragbarLeft').css('background-color', 'blue');

      var rightSideWidth = $('#rightInfoHolder').css("width");
      var rightSideWidthNum = parseInt($('#rightInfoHolder').css("width")); /* yemi: extract only the number */
      var widthAvailable = window.innerWidth - rightSideWidthNum - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = (x / widthAvailable);
      var widthOfNav = widthAvailable * percentage;


      /* yemi: if the width of the user's cursor is smaller than the minimum width of the navigation column, choose the minimum width */
      if (widthOfNav < parseInt($('#navColId').css("min-width"))) {
        widthOfNav = 0; /* yemi: if width too small, collapse it*/
        IS_LEFT_CLOSED = true;
      } 

      /* yemi: if thhe width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfNav > parseInt($('#navColId').css("max-width"))) {
        widthOfNav = parseInt($('#navColId').css("max-width"));
        IS_LEFT_CLOSED = false;
      }

      else {
        IS_LEFT_CLOSED = false;
      }

      /* yemi: when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var analysis_colInfo = widthOfNav + "px 3px auto";
      $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* yemi: make the following divs take up the entire width of their containers */
      $('orgInfoHolder').css("width", "100%");

      /* yemi: update organism canvas */
      av.ind.updateOrgTrace();
    });
  });

  $(document).on('mouseup touchend', function(e) {

    if (dragging) {
      av.grd.drawGridSetupFn(); // yemi: redraw the grid

      // yemi: need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mouseup') {
        x = e.clientX;
      }

      /* yemi: dragbar changes color back to original */
      $('#dragbarLeft').css('background-color', 'gray');

      var rightSideWidth = $('#rightInfoHolder').css("width");
      var rightSideWidthNum = parseInt($('#rightInfoHolder').css("width")); /* yemi: extract only the number */
      var widthAvailable = window.innerWidth - rightSideWidthNum - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = (x / widthAvailable);
      var widthOfNav = widthAvailable * percentage;

      /* yemi: if the width of the user's cursor is smaller than the minimum width of the navigation column, choose the minimum width */
      if (widthOfNav < parseInt($('.navColClass').css("min-width"))) {
        widthOfNav = 0; /* yemi: if width too small, collapse it */
        IS_LEFT_CLOSED = true;
        /* yemi: change the button's contents and look */
        $('#leftPanelButton').val('>> ');
        $('#leftPanelBUtton').css('background', '#ccc');
      } 

      /* yemi: if thhe width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfNav > parseInt($('.navColClass').css("max-width"))) {
        widthOfNav = parseInt($('#navColId').css("max-width"));
        IS_LEFT_CLOSED = false;
        /* yemi: change the button's contents and look */
        $('#leftPanelButton').val('<< ');
        $('#leftPanelBUtton').css('background', 'inherit');
      }

      else {
        IS_LEFT_CLOSED = false;
        /* yemi: change the button's contents and look */
        $('#leftPanelButton').val('<< ');
        $('#leftPanelBUtton').css('background', 'inherit');
      }

      /* yemi: when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var analysis_colInfo = widthOfNav + "px 3px auto";
      $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* yemi: make the following divs take up the entire width of their containers */
      $('orgInfoHolder').css("width", "100%");
      
      dragging = false;
    }
  });
};

/* yemi: functions for right dragbar */
function dragbarRightResize() {

  var dragging = false;

  /* yemi: when there's a mousehover over dragbar, dragbar changes color */
  $('#dragbarRight').on('mouseover touchstart', function(e) {
    $('#dragbarRight').css('background-color', 'blue');
  });

  $('#dragbarRight').on('mouseout touchend', function(e) {
    $('#dragbarRight').css('background-color', 'gray');
  });

  $('#dragbarRight').on('mousedown touchmove', function(e) {
    // e.preventDefault();
    dragging = true;
    
    $(document).on('mousemove touchmove', function(e){
      av.grd.drawGridSetupFn(); // yemi: redraw the grid
      av.grd.popChartFn(); // yemi: redraw plotly graph

      // yemi: need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mouseup') {
        x = e.clientX;
      }

      /* yemi: on mouse move, dragbar changes color */
      $('#dragbarRight').css('background-color', 'blue');

      var leftSideWidth;
      if (IS_LEFT_CLOSED) {
        leftSideWidth = "0px";
      } else {
        leftSideWidth = $('#navColId').css("width");
      }

      var widthAvailable = window.innerWidth - parseInt(leftSideWidth) - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = ((x - parseInt(leftSideWidth) - 6) / widthAvailable); /* yemi: prolly needs fixing */
      var widthOfCenter = widthAvailable * percentage;
      var widthOfRight = widthAvailable - widthOfCenter;

      /* yemi: if the width of the user's cursor is smaller than the minimum width of the navigation column, choose the minimum width */
      if (widthOfRight < parseInt($('.labInfoHoldCls').css("min-width"))) {
        widthOfRight = 0; /* yemi: if width too small, collapse it */
        widthOfCenter = widthAvailable;
      }

      /* yemi: if the width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfRight > parseInt($('.labInfoHoldCls').css("max-width"))) {
        widthOfRight = parseInt($('.labInfoHoldCls').css("max-width"));
        widthOfCenter = widthAvailable - widthOfRight;
      }
      
      /* yemi: when modifying the column sizes, need to modify all two layouts */
      var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      //console.log(population_colInfo);
      
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* yemi: make the following divs take up the entire width of their containers */
      $('#orgInfoHolder').css("width", "100%");

      /* yemi: update organism canvas */
      av.ind.updateOrgTrace();
    });
  });

  $(document).on('mouseup touchend', function(e) {

    if (dragging) {
      av.grd.drawGridSetupFn(); // yemi: redraw the grid
      av.grd.popChartFn(); // yemi: redraw plotly graph

      // yemi: need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mouseup') {
        x = e.clientX;
      }

      var leftSideWidth;
      if (IS_LEFT_CLOSED) {
        leftSideWidth = "0px";
      } else {
        leftSideWidth = $('#navColId').css("width");
      }

      var widthAvailable = window.innerWidth - parseInt(leftSideWidth) - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = ((x - parseInt(leftSideWidth) - 6) / widthAvailable); /* yemi: prolly needs fixing */
      var widthOfCenter = widthAvailable * percentage;
      var widthOfRight = widthAvailable - widthOfCenter;

      /* yemi: if the width of the user's cursor is smaller than the minimum width of the navigation column, choose the minimum width */
      if (widthOfRight < parseInt($('.labInfoHoldCls').css("min-width"))) {
        widthOfRight = 0; /* yemi: if width too small, collapse it */
        widthOfCenter = widthAvailable;
        IS_RIGHT_CLOSED = true;
        /* yemi: change the button's contents and look */
        $('#ritePanelButton').val('<< ');
        $('#ritePanelBUtton').css('background', '#ccc');
      }

      /* yemi: if thhe width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfRight > parseInt($('.labInfoHoldCls').css("max-width"))) {
        widthOfRight = $('.labInfoHolder').css("max-width");
        widthOfCenter = widthAvailable - widthOfRight;
        IS_RIGHT_CLOSED = false;
        /* yemi: change the button's contents and look */
        $('#ritePanelButton').val('>> ');
        $('#ritePanelBUtton').css('background', 'inherit');
      }

      else {
        IS_RIGHT_CLOSED = false;
        /* yemi: change the button's contents and look */
        $('#ritePanelButton').val('>> ');
        $('#ritePanelBUtton').css('background', 'inherit');
      }
      
      /* yemi: when modifying the column sizes, need to modify all two layouts */
      var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";

      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* yemi: make the following divs take up the entire width of their containers */
      $('orgInfoHolder').css("width", "100%");
      
      dragging = false;
    }
  });
};


//------------------------------------------------------------------------------------------- av.dom.storeInitialSize --
// Called in messaging.js in av.msg.readMsg()
// called when the avida webworker indicates that it is ready.
// the splash screen should also be turned off at this time. 
// stores initial size that are valid when the viewport stays the same
//
av.dom.storeInitialSize = function() {
  av.dom.window_ht_now = $(window).height();
  av.dom.window_wd_now = $(window).width();
  av.dom.document_ht_now = $(document).height();
  av.dom.document_wd_now = $(document).width();
  av.dom.freezerSection_wd_now = $("#freezerSection").width();
  av.dom.freezerSection_ht_now = $("#freezerSection").height();
  av.dom.navColId_wd_now = $("#navColId").width();
  av.dom.navColId_ht_now = $("#navColId").height();
  av.dom.popInfoVert_wd_now = $("#popInfoVert").width();
  av.dom.popInfoVert_ht_now = $("#popInfoVert").height();
  av.dom.popChrtHolder_wd_now = $("#popChrtHolder").width();
  av.dom.popChrtHolder_ht_now = $("#popChrtHolder").height();
  av.dom.sclCnvsHldr_wd_now = $('#sclCnvsHldr').width();
  av.dom.sclCnvsHldr_ht_now = $('#sclCnvsHldr').height();
  
  if (av.dbg.flg.dsz) { console.log('dsz: now: navColId wd,       ht =', av.dom.navColId_wd_now, ',', av.dom.navColId_ht_now); }
  if (av.dbg.flg.dsz) { console.log('dsz: now: freezerSection wd, ht =', av.dom.freezerSection_wd_now, ',', av.dom.freezerSection_ht_now); }
  if (av.dbg.flg.dsz) { console.log('dsz: now: popInfoVert wd,    ht =', av.dom.popInfoVert_wd_now, ',', av.dom.popInfoVert_ht_now); }
  if (av.dbg.flg.dsz) { console.log('dsz: now: popChrtHolder wd,  ht =', av.dom.popChrtHolder_wd_now, ',', av.dom.popChrtHolder_ht_now); }
  if (av.dbg.flg.dsz) { console.log('dsz: now: sclCnvsHldr_wd, ht =', av.dom.sclCnvsHldr_wd_now, ',', av.dom.sclCnvsHldr_ht_now); }

  av.dom.headerMain_ht_ot_now = $('#headerMain').outerHeight(true);
  av.dom.navColId_ht_ot_now = $('#navColId').outerHeight(true);
  av.dom.navColId_ht_now = $('#navColId').height();
  av.dom.mainButtons_ht_ot_now = $('#mainButtons').outerHeight(true);
  av.dom.freezerSection_ht_ot_now = $('#freezerSection').outerHeight(true);
  av.dom.trashDiv_ht_ot_now = $('#trashDiv').outerHeight(true);
  av.dom.window_ht_now = $(window).height();

  console.log('Ht: header=', av.dom.headerMain_ht_ot_now, '; navColID=', av.dom.navColId_ht_ot_now
              , '; sum=', (av.dom.headerMain_ht_ot_now+av.dom.navColId_ht_ot_now) );
  console.log('mainButtons=', av.dom.mainButtons_ht_ot_now, '; freezer=', av.dom.freezerSection_ht_ot_now
              , '; trash=', av.dom.trashDiv_ht_ot_now, '; navColID_now=', av.dom.navColId_ht_now
              , '; sum=',(av.dom.mainButtons_ht_ot_now+av.dom.freezerSection_ht_ot_now+av.dom.trashDiv_ht_ot_now) );
  
  // call other size related function when initializing 
  av.ui.freezerSizeHtFn(); 
  console.log('sizes=', av.dom.sizes() );
  
  /* yemi: call the drag bar left function */
  dragbarLeftResize();

  /* yemi: call the drag bar right function */
  dragbarRightResize();

  av.grd.drawGridSetupFn(); // yemi: redraw the grid
};

//----------------------------------------------------------------------------------------show/hide left side panel --
// fix Freezer div size
// only called from within av.dom.storeInitialSize
// the notation 
// = function() {        is the same as 
// = () => {
av.ui.freezerSizeHtFn = () => {
  var dif = 0;
  console.log('window=', $(window).height(), '; docu=', $(document).height() );
  if ( $(window).height() < $(document).height() ) {
    console.log('fix Freezer Size jquery');

    dif = $(document).height - $(window).height();
    if ( dif < $("#freezerSection").height() ) {
      av.dom.gridCanvas.height = 10;
      av.dom.gridHolder.style.height = '10px';
      
      av.dom.freezerSection.style.overflow = 'scroll';
      av.dom.freezerSection.style.height = ($("#freezerSection").height() - dif) +'px';
      //av.grd.drawGridSetupFn is in avidaED.js
      av.grd.drawGridSetupFn('av.ui.freezerSizeHtFn');
    }
  };  
};

//********************************************************************************************************************
//                                             Resize window helpers 
//********************************************************************************************************************

//called from two places in avidaED.js
av.anl.divSize = function (from) {
  if (av.debug.alo) { console.log('alo: ', from, 'called av.anl.divSize'); }
  console.log('alo: ', from, 'called av.anl.divSize');
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
//  Code below this is not in use. Can be deleted. 
//
//------------------------------------------------------------------------------------------------------ av.dom.sizes --
// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
// not in use, could be useful. So I did not delete 

av.dom.sizes = () => {
  let contentWidth = [...document.body.children].reduce(
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0)
    - document.body.getBoundingClientRect().x;

  return {
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    pageWidth: Math.min(document.body.scrollWidth, contentWidth),
    pageHeight: document.body.scrollHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pageX: document.body.getBoundingClientRect().x,
    pageY: document.body.getBoundingClientRect().y,
    screenX: -window.screenX,
    screenY: -window.screenY - (window.outerHeight - window.innerHeight)
  };
};

// av.dom.page = av.dom.sizes();  //only call for av.dom.sizes

//----------------------------------------------------------------------------------------show/hide left side panel --
// if (av.dbg.flg.root) { console.log('Root: before av.ptd.lftPanelBtnFn'); }
// Used for a presentation to hide the left panel and make the right panel bigger.
// Rob wants a button like this that hides the left panel and makes the center panel bigger. 
// not in current use; I hope this can be done with fewer individual size adjustments

av.ptd.ritePanelBtnFn = function () {

  setTimeout(function() {}, 80);

  var leftSideWidth;
  if (IS_LEFT_CLOSED) {
    leftSideWidth = "0px";
  } else {
    leftSideWidth = $('#navColId').css("width");
  }

  if (!IS_RIGHT_CLOSED) {
    IS_RIGHT_CLOSED = true;

    var widthOfRight = 0;

    /* yemi: change the button's contents and look */
    $('#ritePanelButton').val('<< ');
    $('#ritePanelBUtton').css('background', '#ccc');

    /* yemi: when modifying the column sizes, need to modify all two layouts */
    var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
    var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";

    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);

    /* yemi: make the following divs take up the entire width of their containers */
    $('orgInfoHolder').css("width", "100%");
  }

  else if (IS_RIGHT_CLOSED) {
    IS_RIGHT_CLOSED = false;

    /* yemi: change the button's contents and look */
    $('#ritePanelButton').val('>> ');
    $('#ritePanelBUtton').css('background', 'inherit');

    // var widthOfRight = parseInt($('.labInfoHoldCls').css("min-width"));
    var widthOfRight = 400;

    /* yemi: when modifying the column sizes, need to modify all two layouts */
    var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
    var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";

    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);
    
    /* yemi: make the following divs take up the entire width of their containers */
    $('orgInfoHolder').css("width", "100%");
  }

  av.grd.drawGridSetupFn(); // yemi: redraw the grid
  av.grd.popChartFn(); // yemi: redraw plotly graph
};

av.ptd.lftPanelBtnFn = function () {

  setTimeout(function() {}, 80);  

  const rightSideWidth = $('#rightInfoHolder').css("width");

  /* yemi: new code to implement the left side panel button */
  if (!IS_LEFT_CLOSED) {

    IS_LEFT_CLOSED = true;

    /* yemi: change the button's contents and look */
    $('#leftPanelButton').val('>> ');
    $('#leftPanelBUtton').css('background', '#ccc');

    var widthOfNav = 0
    /* yemi: when modifying the column sizes, need to modify all three layouts */
    var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
    var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
    var analysis_colInfo = widthOfNav + "px 3px auto";
    $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);
  }

  else if (IS_LEFT_CLOSED) {

    IS_LEFT_CLOSED = false;

    /* yemi: change the button's contents and look */
    $('#leftPanelButton').val('<< ');
    $('#leftPanelBUtton').css('background', 'inherit');

    var widthOfNav = 240; // yemi: default width

    /* yemi: when modifying the column sizes, need to modify all three layouts */
    var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
    var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
    var analysis_colInfo = widthOfNav + "px 3px auto";
    $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);
  }

  av.grd.drawGridSetupFn(); // yemi: redraw the grid

};

// if (av.dbg.flg.root) { console.log('Root: before Resize helpers'); }
//--------------------------------------------------------------------------------------- av.removeVerticalScrollBars --
// not in use 
av.removeVerticalScrollBars = function (from) {
  if (av.debug.uil) { console.log('ui: documentElement Ht, scroll client', document.documentElement.scrollHeight, document.documentElement.clientHeight); }
  console.log(from, 'called av.removeVerticalScrollBars ----------------------------------');
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
//----------------------------------------------------------------------------------- end av.removeVerticalScrollBars --

//----------------------------------------------------------------------------------- av.ui.browserResizeEventHandler --
// Not in use. Broken. Was called from script in html
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
//-------------------------------------------------------------------------------end av.ui.browserResizeEventHandler --

//------------------------------------------------------------------------------------------------ av.ui.chngPopWidth --
  // not in use
  av.ui.chngPopWidth = function (from) {
  if (av.debug.uil) { console.log('ui: ', from, 'called av.ui.chngPopWidth'); }
  av.dom.rightInfoHolder.style.width = rightInfoHolderWd + 'px';
  av.dom.setupBlock.style.width = rightInfoHolderWd + 'px';
  av.dom.popStatsBlock.style.width = rightInfoHolderWd + 'px';
  av.dom.selOrgType.style.width = ((rightInfoHolderWd / 2).toFixed(0)) + 'px';
};
//-------------------------------------------------------------------------------------------- end av.ui.chngPopWidth --

//------------------------------------------------------------------------------------------- window.addEventListener --
// triggers when viewport is resized, values are not used. so could be deleted
window.addEventListener('resize', function() {
	// viewport and full window dimensions will change
	console.log('in window.addEventListener in reSizePageParts.js, triggered when viewport (browers) is resized');
	av.viewPortInnerWidth = window.innerWidth;
	av.viewPortInnerHeight = window.innerHeight;
	av.viewPortClientWidth = document.documentElement.clientWidth;
	av.viewPortClientHeight = document.documentElement.clientHeight;
  av.grd.drawGridSetupFn(); // yemi: redraw the grid
});
//--------------------------------------------------------------------------------------- end window.addEventListener --

//--------------------------------------------------------------------------------------------- av.ui.resizePopLayout --
// Not in use. Does not work right. Grid gets larger and larger
// supposed to resize the population page when the viewport changes size
// call is commented out
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
  av.ui.benchPopBotHd = av.dom.benchPopBot.offsetHeight;

  //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
  //console.log('gridHolder_margin' ,$("#gridHolder").css("margin"), '; popChart=', $("#popChart").css('margin'));

  if (av.debug.uil) { 
    console.log('ui: Wd: allAvida navColId mapHolder gridHolder rightInfoHolder, sum', av.dom.allAvida.offsetWidth,
      av.dom.navColId.offsetWidth, av.dom.mapHolder.offsetWidth, av.dom.rightInfoHolder.offsetWidth,
      av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.rightInfoHolder.offsetWidth);
    console.log('ui: Wd: popStatsBlock selOrgType sum', av.dom.popStatsBlock.offsetWidth, av.dom.selOrgType.clientWidth,
      av.dom.popStatsBlock.offsetWidth + av.dom.selOrgType.clientWidth);

    console.log('ui: Ht; allAvida, mapHolder, popTopRw, gridHolder, benchPopBot sum', av.dom.allAvida.offsetHeight,
      av.dom.mapHolder.offsetHeight, av.dom.popTopRw.offsetHeight, av.dom.gridHolder.offsetHeight,
      av.dom.benchPopBot.offsetHeight, av.dom.popTopRw.offsetHeight + av.dom.gridHolder.offsetHeight + av.dom.benchPopBot.offsetHeight);
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
//--------------------------------------------------------------------------------------------- av.ui.adjustpopInfoWd --
// only called by av.ui.adjustpopInfoSize (which is below)
// not in use becaues rite Panel Button is hidden
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
//----------------------------------------------------------------------------------------- end av.ui.adjustpopInfoWd --


//------------------------------------------------------------------------------------------- av.ui.adjustpopInfoSize --
// not in use becaues rite Panel Button is hidden
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
//--------------------------------------------------------------------------------------- end av.ui.adjustpopInfoSize --

//-------------------------------------------------------------------------------------------- av.ptd.ritePanelButton --
// not in use because button hidden
// hides and shows the population and selected organsim data on right of population page with 'Stats/mpa' button
// supposed to make the center section larger. does not so button hidden
// if (av.dbg.flg.root) { console.log('Root: before av.ptd.ritePanelButton'); }
av.ptd.ritePanelButton = function () {
  //console.log('ritePanelButton: av.ui.page=', av.ui.page);
  if ('populationBlock' == av.ui.page) {
    if (av.ui.popStatFlag) {
      av.post.addUser('Button: ritePanelButton: start hidding population stats');
      av.ui.popStatFlag = false;
      av.ptd.rightInfoHolderWd = av.dom.rightInfoHolder.offsetWidth;
      av.dom.rightInfoHolder.style.display = 'none';
    } else {
      av.post.addUser('Button: ritePanelButton: start showing population stats');
      av.ui.popStatFlag = true;
      av.dom.rightInfoHolder.style.display = 'flex';
      //reset info pane dimensions. Try rightInfoHolderWd = 395px; selOrgTypeWd = 150px
      av.dom.rightInfoHolder.style.width = av.ptd.rightInfoHolderWd + 'px';
      av.ui.adjustpopInfoSize('av.ptd.ritePanelButton');
    };
  }
  else if ('organismBlock' == av.ui.page) {
    //console.log('av.ui.orgStatFlag=', av.ui.orgStatFlag);
    if (av.ui.orgStatFlag) {
      av.post.addUser('Button: ritePanelButton: start hidding oranism stats');
      av.ui.orgStatFlag = false;
      //console.log('av.dom.orgInfoHolder.offsetWidth=', av.dom.orgInfoHolder.offsetWidth);
      av.ui.orgInfoHolderWd = (av.ui.orgInfoHolderMinWidth > av.dom.orgInfoHolder.offsetWidth) ? 
                                                       av.ui.orgInfoHolderMinWidth : av.dom.orgInfoHolder.offsetWidth;
      av.dom.orgInfoHolder.style.display = 'none';
    } else {
      av.post.addUser('Button: ritePanelButton: start showing oranism stats');
      av.ui.orgStatFlag = true;
      av.dom.orgInfoHolder.style.display = 'flex';
      //reset info pane dimensions. 
      //console.log('av.ui.orgInfoHolderWd=', av.ui.orgInfoHolderWd);
      av.dom.orgInfoHolder.style.width = av.ui.orgInfoHolderWd + 'px';
      //av.ui.adjustOrgInfoSize('av.ptd.ritePanelButton');
    };
  }
  else {
    //no right info panel so button goes away
    console.log('should not be available to be clicked');
  };
};
//---------------------------------------------------------------------------------------- end av.ptd.ritePanelButton --

//------------------------------------------------------------------------------------- av.ui.removeVerticalScrollbar --
// if (av.dbg.flg.root) { console.log('Root: before av.ui.removeVerticalScrollbar'); }
//https://tylercipriani.com/2014/07/12/crossbrowser-javascript-scrollbar-detection.html
// not in use
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
//--------------------------------------------------------------------------------- end av.ui.removeVerticalScrollbar --
//Use later ??
//av.ui.removeVerticalScrollbar('popStats4grid', 'popStatistics');
//av.ui.removeVerticalScrollbar('benchPopBot', 'benchPopBot');
//------------------------------------------------------------------------ end calls to av.ui.removeVerticalScrollbar --




