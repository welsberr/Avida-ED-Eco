  //Just a definition of pointes to DOM objecs. I'm not sure if this speeds up running at all just slows down lading the app

  var av = av || {};  //because av already exists, want to let editor know that av is valid
  var dojo = dojo || {};
  var dijit = dijit || {};

  // if (av.dbg.flg.root) { console.log('Root: before av.dom.load'); }
  av.dom.load = function () {
    'use strict';
    //Menu
    av.doj.mnCnPopRun = document.getElementById('mnCnPopRun');

    av.doj.mnFlStandAloneApp = document.getElementById('mnFlStandAloneApp');
    av.doj.mnHpAbout = document.getElementById('mnHpAbout');
    av.doj.mnHpManual = document.getElementById('mnHpManual');
    av.doj.mnHpHardware = document.getElementById('mnHpHardware');
    av.doj.mnHpInfo = document.getElementById('mnHpInfo');
    av.doj.mnHpProblem = document.getElementById('mnHpProblem');
    av.doj.mnHpDebug = document.getElementById('mnHpDebug');
    av.doj.mnDebug = document.getElementById('mnDebug');

    //main area
    av.dom.userMsgLabel = document.getElementById('userMsgLabel');
    av.dom.wsSavedMsg = document.getElementById('wsSavedMsg');
    av.dom.wsNameMsg = document.getElementById('wsNameMsg');


    av.dom.allAvida = document.getElementById('allAvida');
    av.dom.navColId = document.getElementById('navColId');

    av.dom.populationButton = document.getElementById('populationButton');
    av.dom.freezeButton = document.getElementById('freezeButton');
    av.dom.populationBlock = document.getElementById('populationBlock');
    av.dom.organismBlock = document.getElementById('organismBlock');
    av.dom.analysisBlock = document.getElementById('analysisBlock');
    av.dom.showTextDebugBlock = document.getElementById('showTextDebugBlock');
    av.dom.populationButton = document.getElementById('populationButton');
    av.dom.organismButton = document.getElementById('organismButton');
    av.dom.analysisButton = document.getElementById('analysisButton');
    av.dom.showTextDebugButton = document.getElementById('showTextDebugButton');
    av.dom.allAvida = document.getElementById('allAvida');

    av.dom.leftPanelButton = document.getElementById('leftPanelButton');
    av.dom.rtPnlButtonImg = document.getElementById('rtPnlButtonImg');

    av.dom.orgInfoHolder = document.getElementById('orgInfoHolder');
    av.dom.popInfoVert = document.getElementById('popInfoVert');


    //Population Page
    av.dom.rightInfoHolder = document.getElementById('rightInfoHolder');
    av.dom.statsTab = document.getElementById('statsTab');
    av.dom.setupTab = document.getElementById('setupTab');
    av.dom.testTab = document.getElementById('testTab');
    av.dom.setupBlock = document.getElementById('setupBlock');
    av.dom.testSetupBlock = document.getElementById('testSetupBlock');
    av.dom.mapHolder = document.getElementById('mapHolder');
    av.dom.popTopRw = document.getElementById('popTopRw');
    av.dom.popBot = document.getElementById('popBot');
    av.dom.gridHolder = document.getElementById('gridHolder');
    av.dom.gridCanvas = document.getElementById('gridCanvas');
    av.dom.scaleCanvas = document.getElementById('scaleCanvas');
    av.dom.popBot = document.getElementById('popBot');
    av.dom.popStatsBlock = document.getElementById('popStatsBlock');
    av.dom.StatsButton = document.getElementById('StatsButton');

    av.dom.popChrtHolder = document.getElementById('popChrtHolder'); 
    av.dom.popChart = document.getElementById('popChart');  //easier handle for div with chart
    av.dom.popChartDiv = document.getElementById('popChartDiv');
    av.dom.cycleSlider = document.getElementById('cycleSlider');
    av.dom.runStopButton = document.getElementById('runStopButton');
    av.dom.oneUpdateButton = document.getElementById('oneUpdateButton');
    av.dom.newDishButton = document.getElementById('newDishButton');
    av.dom.avidianOutline = document.getElementById('avidianOutline');


    av.dom.selOrgType = document.getElementById('selOrgType');
    av.dom.gridControlContainer = document.getElementById('gridControlContainer');

    //Test setup page
    av.dom.sizeCellTest = document.getElementById('sizeCellTest');
    av.dom.sizeColTest = document.getElementById('sizeColTest');
    av.dom.sizeRowTest = document.getElementById('sizeRowTest');
    av.dom.childParentRadiTest = document.getElementById('childParentRadiTest');
    av.dom.experimentRadiTest = document.getElementById('experimentRadiTest');
    av.dom.randInpuTest = document.getElementById('randInpuTest');
    av.dom.manualUpdateRadiTest = document.getElementById('manualUpdateRadiTest');
    //av.dom.Test = document.getElementById('Test');
    //av.dom.Test = document.getElementById('Test');

    //Population Map Setup page
    av.dom.sizeCells = document.getElementById('sizeCells');
    av.dom.sizeCols = document.getElementById('sizeCols');
    av.dom.sizeRows = document.getElementById('sizeRows');
    av.dom.mutePopInput = document.getElementById('mutePopInput');
    av.dom.mutePopError = document.getElementById('mutePopError');
    av.dom.childParentRadio = document.getElementById('childParentRadio');
    av.dom.childRandomRadio = document.getElementById('childRandomRadio');
    av.dom.envNone = document.getElementById('envNone');
    av.dom.envFinite = document.getElementById('envFinite');
    av.dom.envGradient = document.getElementById('envGradient');
    av.dom.envChemostat = document.getElementById('envChemostat');
    av.dom.envSourceSink = document.getElementById('envSourceSink');
    av.dom.envInitial = document.getElementById('envInitial');
    av.dom.envEqInflow = document.getElementById('envEqInflow');
    av.dom.envEqOutflow = document.getElementById('envEqOutflow');
    av.dom.envEqual = document.getElementById('envEqual');
    av.dom.envGrSide = document.getElementById('envGrSide');
    av.dom.envGrInflow = document.getElementById('envGrInflow');
    av.dom.envGrOutflow = document.getElementById('envGrOutflow');
    //av.dom.env = document.getElementById(''); 

/*
    av.dom.notose = document.getElementById('notose');
    av.dom.andose = document.getElementById('andose');
    av.dom.orose = document.getElementById('orose');
    av.dom.norose = document.getElementById('norose');
    av.dom.equose = document.getElementById('equose');  //5
    av.dom.nanose = document.getElementById('nanose');
    av.dom.ornose = document.getElementById('ornose');
    av.dom.andnose = document.getElementById('andnose');
    av.dom.xorose = document.getElementById('xorose');
*/

    av.dom.notButton = document.getElementById('notButton');
    av.dom.andButton = document.getElementById('andButton');
    av.dom.orButton = document.getElementById('orButton');
    av.dom.norButton = document.getElementById('norButton');
    av.dom.equButton = document.getElementById('equButton');  //5
    av.dom.nanButton = document.getElementById('nanButton');
    av.dom.ornButton = document.getElementById('ornButton');
    av.dom.andnButton = document.getElementById('andnButton');
    av.dom.xorButton = document.getElementById('xorButton');

    av.dom.sugarAccordion = document.getElementById('sugarAccordion');
    av.dom.orn_section = document.getElementById('orn_section');
    av.dom.orn_summary = document.getElementById('orn_summary');
    av.dom.orn_title = document.getElementById('orn_title');
    av.dom.orn_detailsHolder = document.getElementById('orn_detailsHolder');
    av.dom.orn1subSection = document.getElementById('orn1subSection');
    av.dom.showBigTextarea = document.getElementById('showBigTextarea');

    /*
     * Not in use any longer; might use to create new vars
     * 
     av.dom.notType = document.getElementById('notType');
     av.dom.andType = document.getElementById('andType');
     av.dom.oroType = document.getElementById('oroType');
     av.dom.norType = document.getElementById('norType');
     av.dom.equType = document.getElementById('equType'); 
     av.dom.nanType = document.getElementById('nanType');
     av.dom.ornType = document.getElementById('ornType');
     av.dom.antType = document.getElementById('antType');
     av.dom.xorType = document.getElementById('xorType');

     av.dom.notIn = document.getElementById('notIn');
     av.dom.andIn = document.getElementById('andIn');
     av.dom.oroIn = document.getElementById('oroIn');
     av.dom.norIn = document.getElementById('norIn');
     av.dom.equIn = document.getElementById('equIn'); 
     av.dom.nanIn = document.getElementById('nanIn');
     av.dom.ornIn = document.getElementById('ornIn');
     av.dom.antIn = document.getElementById('antIn');
     av.dom.xorIn = document.getElementById('xorIn');

     av.dom.notOut = document.getElementById('notOut');
     av.dom.andOut = document.getElementById('andOut');
     av.dom.oroOut = document.getElementById('oroOut');
     av.dom.norOut = document.getElementById('norOut');
     av.dom.equOut = document.getElementById('equOut'); 
     av.dom.nanOut = document.getElementById('nanOut');
     av.dom.ornOut = document.getElementById('ornOut');
     av.dom.antOut = document.getElementById('antOut');
     av.dom.xorOut = document.getElementById('xorOut');
     */
    av.dom.experimentRadio = document.getElementById('experimentRadio');
    av.dom.demoRadio = document.getElementById('demoRadio');
    av.dom.autoPauseCheck = document.getElementById('autoPauseCheck');
    av.dom.autoPauseNum = document.getElementById('autoPauseNum');

    //test dishes setup
    av.dom.environConfigEdit = document.getElementById('environConfigEdit');
    av.dom.tst2textarea = document.getElementById('tst2textarea');

    av.dom.sendLogPara = document.getElementById('sendLogPara');
    av.dom.sendLogTextarea = document.getElementById('sendLogTextarea');

    //Organism Page
    av.dom.orgBotId = document.getElementById('orgBotId');
    av.dom.organCanvas = document.getElementById("organCanvas");
    av.dom.orgSettings = document.getElementById('orgSettings');
    av.dom.orgDetailID = document.getElementById('orgDetailID');
    av.dom.orgCycle = document.getElementById('orgCycle');
    av.dom.muteOrgError = document.getElementById('muteOrgError');

    //Analysis Page  
    //av.dom.anlChrtSpace = document.getElementById('anlChrtSpace');  //easier handle for div with chart
    av.dom.anlChrtSpace = document.getElementById('anlDndChart');  //easier handle for div with chart
    av.dom.anlDndChart = document.getElementById('anlDndChart');
    av.dom.anaChrtHolder = document.getElementById('anaChrtHolder');
    av.dom.popDish0 = document.getElementById('popDish0');
    av.dom.popDish1 = document.getElementById('popDish1');
    av.dom.popDish2 = document.getElementById('popDish2');
    av.dom.pop0color = document.getElementById('pop0color');
    av.dom.pop1color = document.getElementById('pop1color');
    av.dom.pop2color = document.getElementById('pop2color');

    //post - send data to database
    av.dom.postLogTextarea = document.getElementById('postLogTextarea');
    av.dom.postLogPara = document.getElementById('postLogPara');
    av.dom.postVersionLabel = document.getElementById('postVersionLabel');
    av.dom.postScreenSize = document.getElementById('postScreenSize');
    av.dom.postUserInfoLabel = document.getElementById('postUserInfoLabel');
    av.dom.postError = document.getElementById('postError');
    av.dom.postProblemError = document.getElementById('postProblemError');
    av.dom.postEmailInput = document.getElementById('postEmailInput');
    av.dom.postEmailLabel = document.getElementById('postEmailLabel');
    av.dom.postNoteLabel = document.getElementById('postNoteLabel');
    av.dom.postComment = document.getElementById('postComment');
    av.dom.postLogTextarea = document.getElementById('postLogTextarea');
    av.dom.postdTailTextarea = document.getElementById('postdTailTextarea');
    av.dom.postStatus = document.getElementById('postStatus');

    av.dom.mainButtons = document.getElementById('mainButtons');
    av.dom.trashDiv = document.getElementById('trashDiv');

    av.dom.orgTopId = document.getElementById('orgTopId');

    av.dom.ExecuteJust = document.getElementById('ExecuteJust');       //check for code repeats might be able to do a function and clean things tiba
    av.dom.ExecuteAbout = document.getElementById('ExecuteAbout');

    av.dom.xorLabel = document.getElementById('xorLabel');          //no longer in use. 

    //av.dom. = document.getElementById('');
    // Modal Dialogs 
    av.dom.newDishModalID = document.getElementById('newDishModalID');
    av.dom.newDishCancel = document.getElementById('newDishCancel');
    av.dom.newDishDiscard = document.getElementById('newDishDiscard');
    av.dom.newDishSaveConfig = document.getElementById('newDishSaveConfig');
    av.dom.newDishSaveWorld = document.getElementById('newDishSaveWorld');
    av.dom.needAncestorModalID = document.getElementById('needAncestorModalID');
    av.dom.needAncestorCancel = document.getElementById('needAncestorCancel');

    //av.dom. = document.getElementById('');
  };
  //av.dom.load();

  av.dom.initilizeDigitData = function () {
    dijit.byId('mnCnPause').attr('disabled', true);
    dijit.byId('mnCnOrganismTrace').attr('disabled', true);
    dijit.byId('mnFzOrganism').attr('disabled', true);
    dijit.byId('mnFzOffspring').attr('disabled', true);
    dijit.byId('mnFzPopulation').attr('disabled', true);
    //dijit.byId('mnFzAddConfigEx').attr('disabled', true);
    //dijit.byId('mnFzAddGenomeEx').attr('disabled', true);
    //dijit.byId('mnFzAddPopEx').attr('disabled', true);
    //dijit.byId('mnFzAddGenomeView').attr('disabled', true);
    //dijit.byId('mnFzAddPopAnalysis').attr('disabled', true);
  };

  // for analyze page
  av.dom.initilizeAnalizePage = function() {
    //console.log('getDomByID of pop0color=', document.getElementById('pop0color') );
    //console.log('av.dom.pop0color=', av.dom.pop0color);
    //console.log('av.dom.pop0color.value=', av.dom.pop0color.value);
    //console.log('av.color.names=', av.color.names);
    av.anl.color[0] = av.color.names[av.dom.pop0color.value];
    av.anl.color[1] = av.color.names[av.dom.pop1color.value];
    av.anl.color[2] = av.color.names[av.dom.pop2color.value];
    av.anl.yLeftTitle = document.getElementById('yLeftSelect').value;
    av.anl.yRightTitle = document.getElementById('yRightSelect').value;
  };

  av.ui.toggleRegionLayoutControls = function(){ 
    var len = av.sgr.logicNames.length;
    var willbe = 'none';
    if ('none' === document.getElementById('orn_regionLayHolder').style.display) {
      willbe = 'inline-block';
    } else {
      willbe = 'none';
    };
    console.log('willbe=', willbe);  
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      document.getElementById(tsk+'_regionLayHolder').style.display = willbe;
    };
    document.getElementById('regionLayoutSgr').style.display = willbe;
    document.getElementById('allSugarRegionLayoutDiv').style.display = willbe;
  };

  //No longer in uses as Geometry and Region Layout are now combined
  av.ui.toggleDisplayGeometryControls = function(){ 
    var len = av.sgr.logicNames.length;
    var willbe = 'none';
    if ('none' === document.getElementById('orn_geometryDiv').style.display) {
      willbe = 'inline-block';
    } else {
      willbe = 'none';
    };
    //console.log('willbe=', willbe);  
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      document.getElementById(tsk+'_geometryDiv').style.display = willbe;
    };
    document.getElementById('geometrySgr').style.display = willbe;
    document.getElementById('allSugarGeometryDiv').style.display = willbe;
  };

  av.ui.toggleDevelopentDisplays = function () {
    var len, tsk, sub;
    var visibleTxt = 'visible';
    if ('visible' === av.doj.mnDebug.style.visibility) {
      //hide all development elements
      av.ui.hideDevelopment = true;
      av.doj.mnDebug.style.visibility = 'hidden';
      document.getElementById('showTextDebugButtonDiv').style.visibility = 'hidden';
      document.getElementById('developmentToggle').className = 'devoCammo';  
      document.getElementById('geometyHideButton').className = 'geoButtonCammo';  
      document.getElementById('ritePnlBtnHolder').className = 'pnlBtnHldrHide';

      document.getElementById('fzTdishSec').style.visibility = 'hidden';
      document.getElementById('testDishDetailDiv').style.display = 'none';
      document.getElementById('testConfigLableHolder').style.display = 'none';
      document.getElementById('testConfig').style.display = 'none';
      document.getElementById('avidianOutline').style.display = 'none';

      document.getElementById('popInfoTabHolder').className = 'tabHolderHide';
      //document.getElementById('resrceDataHolder').style.display = 'none';

      av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.ui.toggleDevelopentDisplays');
      len = av.sgr.logicNames.length;
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
      };

      if (av.sgr.gridOnly) {
        document.getElementById('sugarFooter').className = 'changeAllSugarsTogetherNoGlobalContainer';
        document.getElementById('geometrySgr').style.display = 'none';
        document.getElementById('allSugarGeometryDiv').style.display = 'none'; 
        document.getElementById('allSugarGeometry').style.display = 'none'; 
      }

      //console.log("document.getElementsByClassName('globalChemostat').length=", document.getElementsByClassName('globalChemostat').length );
      //console.log("document.getElementsByClassName('localChemostat')=", document.getElementsByClassName('localChemostat').length );
      //console.log("document.getElementsByClassName('globalFinite')=", document.getElementsByClassName('globalFinite').length );

      //Hide select options that are not yet implemented

      len = document.getElementsByClassName('localDebug').length;
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('localDebug')[ii].style.display = 'none';
        //document.getElementsByClassName('localChemostat')[ii].style.display = 'none';
      };

      //Hide select options that are not yet implemented
      len = document.getElementsByClassName('globalChemostat').length;
      for (ii = 0; ii < len; ii++) {
        //console.log('globalFinite=', document.getElementsByClassName('globalFinite')[ii].id);
        document.getElementsByClassName('globalFinite')[ii].style.display = 'none';
        document.getElementsByClassName('globalChemostat')[ii].style.display = 'none';
        //document.getElementsByClassName('globalDebug')[ii].style.display = 'none';
      };

      len = document.getElementsByClassName('3TopLftRit').length;
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('3TopLftRit')[ii].style.display = 'none';
        document.getElementsByClassName('4Quarters')[ii].style.display = 'none';
      }
      
      // now clear options for changing all sugars (groups)
      //document.getElementsByClassName('groupChemostat')[0].style.display = 'none';
      //document.getElementsByClassName('groupFinite')[0].style.display = 'none';     //finite available for local options
      //document.getElementsByClassName('groupDebug')[0].style.display = 'none';
      //console.log('dom.groupDebug=', document.getElementsByClassName('groupDebug'));

      //debug menu??
      dijit.byId('mnHpDebug').set('label', 'Show debug menu');   //???????

      av.post.addUser('Button: mnHpDebug: now hidden');
    } else {       
      // development sectiomn can be seen.
      av.ui.hideDevelopment = false;
      av.doj.mnDebug.style.visibility = 'visible';
      document.getElementById('showTextDebugButtonDiv').style.visibility = 'visible';
      document.getElementById('developmentToggle').className = 'devoShow';
      document.getElementById('geometyHideButton').className = 'devoShow';
      document.getElementById('ritePnlBtnHolder').className = 'ritePnlBtnHlderShow';

      document.getElementById('fzTdishSec').style.visibility = 'visible';
      document.getElementById('testDishDetailDiv').style.display = 'block';
      document.getElementById('testConfigLableHolder').style.display = 'flex';
      document.getElementById('testConfig').style.display = 'flex';
      document.getElementById('avidianOutline').style.display = 'inline-block'; 

      document.getElementById('popInfoTabHolder').className = 'tabHolderShow';
      document.getElementById('resrceDataHolder').style.display = 'block';

      av.sgr.processHideFlags(av.sgr.flagInitOpposite, 'av.ui.toggleDevelopentDisplays.onclick_show');

      if (av.sgr.gridOnly) {    //In devvelopment
        document.getElementById('sugarFooter').className = 'changeAllSugarsTogetherContainer';
        document.getElementById('geometrySgr').style.displaly = 'inline-block';
        document.getElementById('allSugarGeometryDiv').style.displaly = 'inline-block';
      }

      len = document.getElementsByClassName('3TopLftRit').length;
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('3TopLftRit')[ii].style.display = 'inline-block';
        document.getElementsByClassName('4Quarters')[ii].style.display = 'inline-block';
      }



      len = av.sgr.logicNames.length;
      console.log('logicNames.length=', len);
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
        //document.getElementsByClassName('globalChemostat')[ii].style.display = 'inline';
        //document.getElementsByClassName('globalFinite')[ii].style.display = 'inline';
        //document.getElementsByClassName('globalDebug')[ii].style.display = 'inline';
      };

      //show environment options sill under development.
      document.getElementById('sugarFooter').className = 'changeAllSugarsTogetherContainer';

/*        
      len = document.getElementsByClassName('localChemostat').length;
      console.log('localChemostat.len=', len, '; globalChemostat.len=', document.getElementsByClassName('globalChemostat').length);
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('localChemostat')[ii].style.display = 'inline';
        //document.getElementsByClassName('localDebug')[ii].style.display = 'inline';
      };

       // now show options for changing all sugars (groups)
      //document.getElementsByClassName('groupChemostat')[0].style.display = 'inline';
      //document.getElementsByClassName('groupFinite')[0].style.display = 'inline';     //finite available for local options
      //document.getElementsByClassName('groupDebug')[0].style.display = 'inline';
*/
      //Show debug on dropdown menu
      dijit.byId('mnHpDebug').set('label', 'Hide debug menu');   //????????
      av.post.addUser('Button: mnHpDebug: now visible');
    }
    //console.log('in av.ui.hideDevelopment=', av.ui.hideDevelopment, 'at end of function');
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.ui.antLabel'); }
  //----------------------------------------------------------------------------------------------------------------------
  //Forces popChartInit
  av.ui.antLabel = function (from) {
    console.log(from, 'called av.ui.antLabel to run av.grd.popChartInit'); 
    
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
    var htnum = Number($('#popChrtHolder').outerHeight(true))-1;
    av.dom.popChart.style.maxheight = htnum +'px;';
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
    av.grd.popChartInit('av.ui.antLabel');
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
  };
  
  // if (av.dbg.flg.root) { console.log('Root: before av.ui.toggleResourceData'); }
  //----------------------------------------------------------------------------------------------------------------------
  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.ui.toggleResourceData = function (from) {
    console.log(from, 'called av.ui.toggleResourceData to to toggle dipslay of resource data');
    if ('none' === document.getElementById('resrceDataHolder').style.display) {
      document.getElementById('resrceDataHolder').style.display = 'block';
    } else {
      document.getElementById('resrceDataHolder').style.display = 'none';  //flex
    };
    av.sgr.complexityChangeProcess('last-things-done');
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.ui.toggleResourceComplexity'); }
  //----------------------------------------------------------------------------------------------------------------------
  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.ui.toggleResourceComplexity = function (from) {
    console.log(from, 'called av.ui.toggleResourceComplexity to to toggle dipslay of complexityLevel');
    if ('sgrBasic' === av.sgr.complexityLevel) {
      av.sgr.complexityLevel = 'sgrAdvanced';
    } else {
        av.sgr.complexityLevel = 'sgrBasic';
    }
    av.ui.setResourceComplexity(av.sgr.complexityLevel, 'av.ui.toggleResourceComplexity');
  };
  
av.ui.setResourceComplexity = function (level, from) {
  document.getElementById('resrcComplexity').value = level;
  av.sgr.complexityChangeProcess('av.ui.setResourceComplexity');
};

//=========================================================================================== simulated dom action ===
// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript?fbclid=IwAR0Ht17-ZP6Rb6paHLZUFoLPf_Hz0-WXRTv-dKS3SsZsymY8TsM7OJYinmQ
// 
// example call of av.dom.simulate
// av.dom.simulate(document.getElementById(defaultConfigDomID), "click");
//
// Note that as a third parameter you can pass in 'options'. The options you don't specify are taken from the 
// defaultOptions (see bottom of the script). So if you for example want to specify mouse coordinates you can do something like:
// simulate(document.getElementById("btn"), "click", { pointerX: 123, pointerY: 321 })

av.dom.simulate = function (element, eventName) {
    console.log('element', element, '; eventName=', eventName);
    var options = av.dom.simulateExtend(av.dom.simulateDefaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in av.dom.simulateEventMatchers)
    {
        if (av.dom.simulateEventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
        console.log('after dispatchEvent; oEvent=', oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = av.dom.simulateExtend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
        console.log('after fire; evt=', evt);
    }
    return element;
};

  av.dom.simulateExtend = function(destination, source) {
      for (var property in source)
        destination[property] = source[property];
      return destination;
  };

  av.dom.simulateEventMatchers = {
      'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
  };
  av.dom.simulateDefaultOptions = {
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true
  };
  //======================================================================================= end simulated dom action ===



  //----------------------------------------------------------------------------------------------------------------------
  //     Un used code snipits from AvidaED.js
  //----------------------------------------------------------------------------------------------------------------------

  /*
    //http://stackoverflow.com/questions/20773306/mozilla-firefox-not-working-with-window-onbeforeunload
    var myEvent = window.attachEvent || window.addEventListener;
    var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

    myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
    var confirmationMessage = 'Remember to save your workSpace before you leave Avida-ED';  // a space
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
    });

    function goodbye(e) {
    if(!e) e = window.event;
    //e.cancelBubble is supported by IE - this will kill the bubbling process.
    e.cancelBubble = true;
    e.returnValue = 'Have you saved your workspace?'; //This is displayed on the dialog

    //e.stopPropagation works in Firefox.
    if (e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
    }
    }
    window.onbeforeunload=goodbye;
    */

  //----------------------------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------------------------
  //   un used snips from file Data Write
  //----------------------------------------------------------------------------------------------------------------------

