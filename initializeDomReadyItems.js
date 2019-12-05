//Just a definition of pointes to DOM objecs. I'm not sure if this speeds up running at all just slows down lading the app

var av = av || {};  //incase av already exists

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
    av.dom.showTextBlock = document.getElementById('showTextBlock');
    av.dom.populationButton = document.getElementById('populationButton');
    av.dom.organismButton = document.getElementById('organismButton');
    av.dom.analysisButton = document.getElementById('analysisButton');
    av.dom.showTextButton = document.getElementById('showTextButton');
    av.dom.allAvida = document.getElementById('allAvida');

    av.dom.lftPnlButtonImg = document.getElementById('lftPnlButtonImg');
    av.dom.rtPnlButtonImg = document.getElementById('rtPnlButtonImg');

    //Population Page
    av.dom.popInfoHolder = document.getElementById('popInfoHolder');
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

    av.dom.popChart = document.getElementById('popChart');  //easier handle for div with chart
    av.dom.popChrtHolder = document.getElementById('popChrtHolder');

    av.dom.cycleSlider = document.getElementById('cycleSlider');
    av.dom.runStopButton = document.getElementById('runStopButton');
    av.dom.oneUpdateButton = document.getElementById('oneUpdateButton');
    av.dom.newDishButton = document.getElementById('newDishButton');
    av.dom.avidianOutline = document.getElementById('avidianOutline');


    av.dom.selOrgType = document.getElementById('selOrgType');
    av.dom.gridControlTable = document.getElementById('gridControlTable');

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
    av.dom.muteInput = document.getElementById('muteInput');
    av.dom.muteError = document.getElementById('muteError');
    av.dom.childParentRadio = document.getElementById('childParentRadio');
    av.dom.childRandomRadio = document.getElementById('childRandomRadio');
    av.dom.envNone = document.getElementById('envNone');
    av.dom.envFinite = document.getElementById('envFinite');
    av.dom.envGradient = document.getElementById('envGradient');
    av.dom.envEquilibrium = document.getElementById('envEquilibrium');
    av.dom.envSourceSink = document.getElementById('envSourceSink');
    av.dom.envInitial = document.getElementById('envInitial');
    av.dom.envEqInflow = document.getElementById('envEqInflow');
    av.dom.envEqOutflow = document.getElementById('envEqOutflow');
    av.dom.envEqual = document.getElementById('envEqual');
    av.dom.envGrSide = document.getElementById('envGrSide');
    av.dom.envGrInflow = document.getElementById('envGrInflow');
    av.dom.envGrOutflow = document.getElementById('envGrOutflow');
    //av.dom.env = document.getElementById(''); 

    av.dom.notose = document.getElementById('notose');
    av.dom.andose = document.getElementById('andose');
    av.dom.orose = document.getElementById('orose');
    av.dom.norose = document.getElementById('norose');
    av.dom.equose = document.getElementById('equose');  //5
    av.dom.nanose = document.getElementById('nanose');
    av.dom.ornose = document.getElementById('ornose');
    av.dom.andnose = document.getElementById('andnose');
    av.dom.xorose = document.getElementById('xorose');


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
    av.dom.orn0section = document.getElementById('orn0section');
    av.dom.orn0summary = document.getElementById('orn0summary');
    av.dom.orn0title = document.getElementById('orn0title');
    av.dom.orn0Details = document.getElementById('orn0Details');
    av.dom.orn1subSection = document.getElementById('orn1subSection');
    av.dom.showTextarea = document.getElementById('showTextarea');

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
    av.dom.manualUpdateRadio = document.getElementById('manualUpdateRadio');
    av.dom.autoUpdateRadio = document.getElementById('autoUpdateRadio');
    av.dom.autoUpdateOnce = document.getElementById('autoUpdateOnce');

    //test dishes setup
    av.dom.environConfigEdit = document.getElementById('environConfigEdit');
    av.dom.tst2textarea = document.getElementById('tst2textarea');

    av.dom.sendLogPara = document.getElementById('sendLogPara');
    av.dom.sendLogTextarea = document.getElementById('sendLogTextarea');

    //Organism Page
    av.dom.orgBotId = document.getElementById('orgBotId');
    av.dom.organCanvas = document.getElementById("organCanvas");
    av.dom.orgInfoHolder = document.getElementById('orgInfoHolder');
    av.dom.orgSettings = document.getElementById('orgSettings');
    av.dom.orgDetailID = document.getElementById('orgDetailID');
    av.dom.orgCycle = document.getElementById('orgCycle');
    
    //Analysis Page  
    //av.dom.anlChrtSpace = document.getElementById('anlChrtSpace');  //easier handle for div with chart
    av.dom.anlChrtSpace = document.getElementById('anlDndChart');  //easier handle for div with chart
    av.dom.anlDndChart = document.getElementById('anlDndChart');
    av.dom.anaChrtHolder = document.getElementById('anaChrtHolder');
    av.dom.popDish0 = document.getElementById('popDish0');
    av.dom.popDish1 = document.getElementById('popDish1');
    av.dom.popDish2 = document.getElementById('popDish2');

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

    av.dom.xorLabel = document.getElementById('xorLabel');          //used to toggle debug menu

    //av.dom. = document.getElementById('');
    // Modal Dialogs 
    av.dom.newModalID = document.getElementById('newModalID');
    av.dom.newCancel = document.getElementById('newCancel');
    av.dom.newDiscard = document.getElementById('newDiscard');
    av.dom.newSaveConfig = document.getElementById('newSaveConfig');
    av.dom.newSaveWorld = document.getElementById('newSaveWorld');
    av.dom.needAncestorModalID = document.getElementById('needAncestorModalID');
    av.dom.needAncestorCancel = document.getElementById('needAncestorCancel');

    //av.dom. = document.getElementById('');
  };

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
    av.anl.color[0] = av.color.names[document.getElementById('pop0color').value];
    av.anl.color[1] = av.color.names[document.getElementById('pop1color').value];
    av.anl.color[2] = av.color.names[document.getElementById('pop2color').value];
    av.anl.yLeftTitle = document.getElementById('yLeftSelect').value;
    av.anl.yRightTitle = document.getElementById('yRightSelect').value;
  }

  av.ui.toggleDevelopentDisplays = function () {
    var len, tsk, sub;
    if ('visible' === av.doj.mnDebug.style.visibility) {
      //hide all development elements
      av.ui.hideDevelopment = true;
      av.doj.mnDebug.style.visibility = 'hidden';
      document.getElementById('showTextButtonDiv').style.visibility = 'hidden';
      document.getElementById('developmentToggle').className = 'devoCammo';  
      document.getElementById('ritePnlBtnHolder').className = 'pnlBtnHldrHide';

      document.getElementById('fzTdishSec').style.visibility = 'hidden';
      document.getElementById('testDishDetailDiv').style.display = 'none';
      document.getElementById('testConfigLableHolder').style.display = 'none';
      document.getElementById('testConfig').style.display = 'none';
      document.getElementById('avidianOutline').style.display = 'none';

      document.getElementById('popInfoTabHolder').className = 'tabHolderHide';
      document.getElementById('displayGridResourceData').style.display = 'none';

      av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.ui.toggleDevelopentDisplays');
      len = av.sgr.logicNames.length;
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
      };
      
      //Hide select options that are not yet implemented
      //console.log("document.getElementsByClassName('globalEquilibrium')=", document.getElementsByClassName('globalEquilibrium').length );
      len = document.getElementsByClassName('localEquilibrium').length;
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('globalEquilibrium')[ii].style.display = 'none';
        document.getElementsByClassName('globalFinite')[ii].style.display = 'none';
        document.getElementsByClassName('globalAll')[ii].style.display = 'none';
        document.getElementsByClassName('localEquilibrium')[ii].style.display = 'none';
        document.getElementsByClassName('localAll')[ii].style.display = 'none';
      };
      len = document.getElementsByClassName('globalEquilibrium').length - 1;
      document.getElementsByClassName('globalEquilibrium')[len].style.display = 'none';
      document.getElementsByClassName('globalFinite')[len].style.display = 'none';
      document.getElementsByClassName('globalAll')[len].style.display = 'none';
      
      //debug menu??
      dijit.byId('mnHpDebug').set('label', 'Show debug menu');   //???????

      av.post.addUser('Button: mnHpDebug: now hidden');
    } else {       // development sectiomn can be seen.
      av.ui.hideDevelopment = false;
      av.doj.mnDebug.style.visibility = 'visible';
      document.getElementById('showTextButtonDiv').style.visibility = 'visible';
      document.getElementById('developmentToggle').className = 'devoShow';
      document.getElementById('ritePnlBtnHolder').className = 'ritePnlBtnHlderShow';

      document.getElementById('fzTdishSec').style.visibility = 'visible';
      document.getElementById('testDishDetailDiv').style.display = 'block';
      document.getElementById('testConfigLableHolder').style.display = 'flex';
      document.getElementById('testConfig').style.display = 'flex';
      document.getElementById('avidianOutline').style.display = 'inline-block'; 

      document.getElementById('popInfoTabHolder').className = 'tabHolderShow';
      document.getElementById('displayGridResourceData').style.display = 'flex';

      av.sgr.processHideFlags(av.sgr.flagInitOpposite, 'av.ui.toggleDevelopentDisplays.onclick_show');

      len = av.sgr.logicNames.length;
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
      };
      
      //show environment options sill under development.
      len = document.getElementsByClassName('localEquilibrium').length;
      for (ii = 0; ii < len; ii++) {
        document.getElementsByClassName('globalEquilibrium')[ii].style.display = 'inline';
        document.getElementsByClassName('globalFinite')[ii].style.display = 'inline';
        document.getElementsByClassName('globalAll')[ii].style.display = 'inline';
        document.getElementsByClassName('localEquilibrium')[ii].style.display = 'inline';
        document.getElementsByClassName('localAll')[ii].style.display = 'inline';
      };
      len = document.getElementsByClassName('globalEquilibrium').length - 1;
      document.getElementsByClassName('globalEquilibrium')[len].style.display = 'inline';
      document.getElementsByClassName('globalFinite')[len].style.display = 'inline';
      document.getElementsByClassName('globalAll')[len].style.display = 'inline';
      tsk = 'orn';
      sub = 1;
      document.getElementById(tsk + sub + 'gradientCheckbox').style.display = 'inline-block';
            
      //Show debug on dropdown menu
      dijit.byId('mnHpDebug').set('label', 'Hide debug menu');   //????????
      av.post.addUser('Button: mnHpDebug: now visible');
    }
    //console.log('in av.ui.hideDevelopment=', av.ui.hideDevelopment, 'at end of function');
  };

//----------------------------------------------------------------------------------------------------------------------
  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.ui.xorLabel = function () {
    if ('none' === document.getElementById('displayGridResourceData').style.display) {
      document.getElementById('displayGridResourceData').style.display = 'flex';
    } else {
      document.getElementById('displayGridResourceData').style.display = 'none';
    }
  };



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

