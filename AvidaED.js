/* global userMsgLabel */

// need a server to run this. The one below works.
// python -m SimpleHTTPServer  in the folder with index.html to start a server for using pouchDB
// python -m SimpleHTTPServer 8001  to put on 8001 instead of 8000
// Then visit http://127.0.0.1:8000/avidaED.html
// 
//4814740943
//
// Git commands used to push
// git add .
// git commit -m 'comment about the change being pushed'
// git commit    then use editor to make the comment.
// i to insert text in vim; escape to get out of insert mode
// :wq will write and then quit vim
// git push -u origin master
//
// Get hashtag of avida side to state which version of avida works with this version of av_ui
// git rev-parse HEAD
//
// Avida -------------------
//
// to thet the parse value go to the current version of avida folder and
// git rev-parse --short HEAD
//
// Problems -------------------------------------------------------------------------------------------------------
//  Fix av.anl.widg = {   statement on globals in Avida-ED 3.2 to match the one in Avida-ED-4 ecology
//  
//  fix color and data select/item buttons on Analysis page
//  
//  min/max and limited to number for the orgCycle field
//  oranismPage run button does not work
//
//
// Versions -------------------------------------------------------------------------------------------------------
// The main change are the limited Resources
//
//
//
//
//
//
// Generic Notes -------------------------------------------------------------------------------------------------------
//
// [option]<alt>{go} to get library in the list for finder
//
// /var/www/vhosts/bwng/public_html/projects/
//
// to have chrome run from file
///Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
//
// to get to mac files on parallels
// net use z: \\Mac\Home
//
// Path in TX for Filezilla /var/www/vhosts/bwng/public_html/projects/Avida-ED
//
// for things on Darwin (dream weaver site)
// ssh -l diane darwin.beacon.msu.edu/html
// var/sites/Avida-ED.msu.edu
// emacs home.html
//

// Curent things broken:
// the avidaDataRecorder.csv is broken

console.log('version from Avida-ED-flex-active_2019_0929');
var av = av || {};  //incase av already exists
var dojo = dojo || {};

define.amd.jQuery = true;
require([
  'maqetta/space',
  'maqetta/AppStates',
  'dijit/dijit',
  'dijit/registry',
  'dijit/form/Button',
  'dijit/form/Select',
  'dijit/form/HorizontalSlider',
  'dijit/form/HorizontalRule',
  'dijit/form/HorizontalRuleLabels',
  'dijit/form/RadioButton',
  'dijit/form/NumberSpinner',
  'dijit/form/ComboButton',
  'dijit/form/DropDownButton',
  'dijit/form/ComboBox',
  'dijit/form/Textarea',
  'dijit/Dialog',
  'dijit/layout/BorderContainer',
  'dijit/layout/ContentPane',
  'dijit/MenuBar',
  'dijit/PopupMenuBarItem',
  'dijit/MenuItem',
  'dijit/Menu',
  'dijit/TitlePane',
  'dojo/parser',
  'dojo/_base/declare',
  'dojo/query',
  'dojo/NodeList-traverse',
  'dojo/dnd/Source',
  'dojo/dnd/Manager',
  'dojo/dnd/Selector',
  'dojo/dnd/Target',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/aspect',
  'dojo/on',
  'dojo/request/xhr',
  'dojo/ready',
  'jquery',
  'jquery-ui',
  'lib/plotly-latest.min.js',   //updatd to plotly_v1.44.3.js on 2018_0915
  //'lib/plotly.js',               //version  plotly_v1.44.3   as of 2018
  //'lib/jquery.fileDownload.js',
  //'lib/Blob',
  'lib/jszip.min.js',
  'lib/FileSaver.js',
  //'avida-messages.js',
  'messaging.js',
  'fileDataRead.js',
  'fileDataWrite.js',
  'fileIO.js',

  'populationGrid.js',
  'organismView.js',
  'dojoDnd.js',
  'popControls.js',
  'mouse.js',
  'mouseDown.js',
  'sugar_ui.js',
  //'restartAvida.js',
  //'diagnosticconsole.js',
  'dojo/domReady!'
], function (space, AppStates, dijit, registry,
  Button, Select,
  HorizontalSlider, HorizontalRule, HorizontalRuleLabels, RadioButton, NumberSpinner, ComboButton,
  DropDownButton, ComboBox, Textarea,
  Dialog,
  BorderContainer, ContentPane, MenuBar, PopupMenuBarItem, MenuItem, Menu,
  TitlePane, parser, declare, query, nodelistTraverse,
  dndSource, dndManager, dndSelector, dndTarget, domGeometry, domStyle, dom, domConst,
  aspect, on, xhr,
  ready, $, jqueryui, Plotly, //fileDownload,  //Blob.js,
  JSZip, FileSaver) {
  'use strict';
  if (typeof $ != 'undefined') {
    // jQuery is loaded => print the version
    // console.log($.fn.jquery);
  } else {
    console.log('Jquery ($) is not defined.');
  }

  //console.log('dojo version', dojo.version.toString());
  parser.parse();

  /********************************************************************************************************************/
  // * The files at the end of the require list contain code specific to Avida-ED.
  // * The functions they contain can access the dom. They cannot access functions defined anywhere
  // * else in the project. This has resulted in some code split between AvidaED.js and the various
  // * other files.
  // *
  // * The files included in script tags in AvidaED.html cannot access the dom. They contain global
  // * variables and functions that are independent of the dom
  // *
  /********************************************************************************************************************/
  // Splash Screen code stopped when ready message from Avida
  /********************************************************************************************************************/
  setTimeout(function () {
    if (!av.ui.loadOK) {
      //alert('Avida-ED failed to load, please try re-loading');
      appReloadDialog.show();
    }
  }, 121000);

  //initiallize default mouse shapes
  //av.mouse.getOriginalShapes(); only gets empty strings

  /********************************************************************************************************************/
  console.log('after splash screen code');
  // -------------------------------------------------------------------------------------------------------------------
  // Initialize variables that depend on files loaded in requirement statement
  // -------------------------------------------------------------------------------------------------------------------

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

  // for analyze page
  av.anl.color[0] = av.color.names[document.getElementById('pop0color').value];
  av.anl.color[1] = av.color.names[document.getElementById('pop1color').value];
  av.anl.color[2] = av.color.names[document.getElementById('pop2color').value];
  av.anl.yLeftTitle = document.getElementById('yLeftSelect').value;
  av.anl.yRightTitle = document.getElementById('yRightSelect').value;

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
  av.dom.load();

  if (av.debug.root)
    console.log('before dnd definitions');
  /********************************************************************************************************************/
  /******************************************* Dojo Drag N Drop Initialization ****************************************/
  /********************************************************************************************************************/
  /* Yes they are globals, but they are defined based on the dom and
   when I've tried putting them in another file it does not work */

  av.dnd.fzConfig = new dndSource('fzConfig', {
    accept: ['b', 'c'], //b=both; c=config
    copyOnly: true,
    singular: true,
    selfAccept: false
  });
  if (av.debug.root)
    console.log('before fzOrgan');
  av.dnd.fzOrgan = new dndSource('fzOrgan', {
    accept: ['g'], //g=genome
    copyOnly: true,
    singular: true,
    selfAccept: false
  });
  if (av.debug.root)
    console.log('before fzWorld');
  av.dnd.fzWorld = new dndSource('fzWorld', {
    //accept: ['b', 'w'],   //b=both; w=world  //only after the population started running
    singular: true,
    copyOnly: true,
    selfAccept: false
  });
  av.dnd.fzTdish = new dndSource('fzTdish', {
    accept: ['b', 't'], //b=both; w=world  //test dishes
    singular: true,
    copyOnly: true,
    selfAccept: false
  });

  /*
   av.dnd.fzMdish = new dndSource('fzMdish', {  //multi-dsih
   accept: ['b', 'm'],  //m=multidish
   copyOnly: true,
   singular: true,
   selfAccept: false
   });
   av.dnd.fzRdish = new dndSource('fzRdish', {  //Resources only version
   accept: ['r'],  //t=resource display
   copyOnly: true,
   singular: true,
   selfAccept: false
   });
   */

  /*  //kept only as an example of how to programatically add data to a dnd container
   av.dnd.fzWorld.insertNodes(false, [
   {data: 'm2w30u1000nand', type: ['w']},
   {data: 'm2w30u1000not', type: ['w']}
   ]);
   */

  av.dnd.ancestorBoTest = new dndSource('ancestorBoTest', {accept: ['g'], copyOnly: true, selfAccept: false});


  if (av.debug.root) console.log('before organIcon');
  av.dnd.organIcon = new dndTarget('organIcon', {accept: ['g'], selfAccept: false});
  av.dnd.ancestorBox = new dndSource('ancestorBox', {accept: ['g'], copyOnly: true, selfAccept: false});
  av.dnd.gridCanvas = new dndTarget('gridCanvas', {accept: ['g']});
  av.dnd.trashCan = new dndSource('trashCan', {accept: ['c', 'g', 't', 'w'], singular: true});
  if (av.debug.root) console.log('after trashCan');

  av.dnd.activeConfig = new dndSource('activeConfig', {
    accept: ['b', 'c', 't', 'w'], //b-both; c-configuration; w-world (populated dish); t-test
    singular: true,
    copyOnly: true,
    selfAccept: false
  });

  av.dnd.testConfig = new dndSource('testConfig', {
    accept: ['b', 'c', 't', 'w'], //b-both; c-configuration; w-world (populated dish); t-test
    singular: true,
    copyOnly: true,
    selfAccept: false
  });

  if (av.debug.root) console.log('before activeOrgan');
  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
  av.dnd.activeOrgan = new dndSource('activeOrgan', {
    accept: ['g'],
    singular: true,
    copyOnly: true,
    selfAccept: false
  });
  av.dnd.organCanvas = new dndSource('organCanvas', {accept: ['g'], singular: true, selfAccept: false});
  //Targets only accept object, source can do both
  av.dnd.anlDndChart = new dndTarget('anlDndChart', {accept: ['w'], singular: true});
  av.dnd.popDish0 = new dndTarget('popDish0', {accept: ['w'], singular: true});
  av.dnd.popDish1 = new dndTarget('popDish1', {accept: ['w'], singular: true});
  av.dnd.popDish2 = new dndTarget('popDish2', {accept: ['w'], singular: true});

  av.parents.clearParentsFn();

  //**************************************************************************************************
  //                web worker to talk to avida
  //**************************************************************************************************/

  //Avida as a web worker
  if (av.debug.root) console.log('before call avida');
  //console.log('typeof(av.aww.uiWorker', typeof(av.aww.uiWorker));
  if (typeof (Worker) !== 'undefined') {
    //console.log('Worker type is not undefined');
    if (null === av.aww.uiWorker) {
      av.aww.uiWorker = new Worker('avida.js');
      //console.log('webworker created');
      av.debug.log += '\n     --note: av.aww.uiWorker was null, started a new webworker';
    } else
      console.log('av.aww.uiWorker is not null');
  } else {
    userMsgLabel.textContent = "Sorry, your browser does not support Web workers and Avida won't run";
  }
  ;

  //process message from web worker
  if (av.debug.root) console.log('before fio.uiWorker on message');
  av.aww.uiWorker.onmessage = function (ee) {
    //console.log('avida_ee', ee);
    av.msg.readMsg(ee);
  };  // in file messaging.js

  if (av.debug.root) console.log('before dnd triggers');
  //*******************************************************************************************************************
  //       Dojo Dnd drop function - triggers for all dojo dnd drop events
  //*******************************************************************************************************************
  // Dojo DndDrop function triggers for drops in all locations (target or source). However not all the information is
  // available unless the correct source/target name is in the event call. I had one event handler with calls to the
  // different functions based on the target.node.id, but that did not work, for not all the information was available.
  // It looks like it is there based on console.logging just the taret, but trying to access subdata results in a null.
  // I don't think I would have written it this way had I known the single event handler would not work, but I had
  // created the dojodnd.js file before I realized that I needed separate event handelers with the conditional.

  av.dnd.activeConfig.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeConfig
    'use strict';
    //console.log('s=', source.node.id, '; n=',nodes, '; c=', copy, '; t=', target.node.id);
    if ('activeConfig' === target.node.id) {
      av.dnd.makeMove(source, nodes, target);
    }
  });

  av.dnd.testConfig.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeConfig
    'use strict';
    //console.log('s=', source.node.id, '; n=',nodes, '; c=', copy, '; t=', target.node.id);
    if ('testConfig' === target.node.id) {
      av.dnd.makeMove(source, nodes, target);
    }
  });

// based on https://stackoverflow.com/questions/27529727/sorta-b-does-not-work-in-dojo-dnd-source
  av.dnd.sortDnD = function (dndSection) {
    // Input: dndSection = the text of the class os the Dojo DnD section with elements to be sorted
    // e.g., var dndSection = 'fzOrgan'; sortDnD(dndSection);
    // actually full class name is ".element dojoDndItem" to query
    // console.log('inside sortDnD');
    //dojo.query(".element",  dojo.byId(dndSection)).sort(
    dojo.query(".dojoDndItem", dndSection).sort(
      function (a, b) {
        var aih = a.innerHTML.toString().toLowerCase();
        var bih = b.innerHTML.toString().toLowerCase();
        return (aih == bih ? 0 : (aih > bih ? 1 : -1));
      }
    ).forEach(// fire bug debugging cursor move to this section
      function (a, idx) {
        dojo.byId(dndSection).insertBefore(a, dojo.byId(dndSection).childNodes[idx]);
      });
  };

  // Connect sections to sortDnD function
  // Section names: fcConfig, fzOrgan, fzWorld, fzTdish, fzMdish, fzRdish

  // 2019-04-14: test dragging @default in, then back to freeezer with name change; sort appears to work.
  dojo.connect(av.dnd.fzConfig, "onDndDrop", function (source, nodes, copy, target) {
    //This triggers for every dnd drop, not just those of fzConfig  
    if ('fzConfig' === target.node.id) {
      //console.log('fzConfig=', av.dnd.fzConfig);
      //console.log('.childNodes=', av.dnd.fzConfig.childNodes);
      //console.log('nodes=', nodes);
      //console.log('; copy=', copy, '; target=', target);
      //console.log('av.dnd.fzOrgan=', av.dnd.fzOrgan);
      av.dnd.landFzConfig(source, nodes, target);  //needed as part of call to contextMenu
      nodes.forEach(function (node) {
        av.dnd.sortDnD('fzConfig');
      });
    }
  });

  // 2019-04-14: test grabbing organisms, dropping in grid, then from setup textbox to freezer, appears to work
  dojo.connect(av.dnd.fzOrgan, "onDndDrop", function (source, nodes, copy, target) {
    //This triggers for every dnd drop, not just those of fzOrgan
    if ('fzOrgan' === target.node.id) {
      //console.log('fzOrgan=', av.dnd.fzOrgan);
      //console.log('.childNodes=', av.dnd.fzOrgan.childNodes);
      console.log('nodes=', nodes);
      av.dnd.landFzOrgan(source, nodes, target);
      nodes.forEach(function (node) {
        av.dnd.sortDnD('fzOrgan');
      });
    }
  });

  dojo.connect(av.dnd.fzWorld, "onDndDrop", function (source, nodes, copy, target) {
    //This triggers for every dnd drop, not just those of fzWorld
    if ('fzWorld' === target.node.id) {
      var pkg = {};
      av.ui.num = av.fzr.wNum;
      pkg.source = source;
      pkg.nodes = nodes;
      pkg.copy = copy;
      pkg.target = target;
      av.dnd.landFzWorldFn(pkg);
      nodes.forEach(function (node) {
        av.dnd.sortDnD('fzWorld');
      });
      if (av.ui.num !== av.fzr.wNum) {
        av.fwt.makeFzrWorld(av.ui.num, 'dojo.connect');
      } //tiba need to check this
    }
  });

  av.dnd.fzTdish.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeConfig
    if ('fzTdish' === target.node.id) {
      var pkg = {};
      av.ui.num = av.fzr.wNum;
      pkg.source = source;
      pkg.nodes = nodes;
      pkg.copy = copy;
      pkg.target = target;
      av.dnd.landfzTdishFn(pkg);
      if (av.ui.num !== av.fzr.wNum) {
        av.fwt.makeFzrWorld(av.ui.num, 'av.dnd.fzTdish.on');
      } //tiba need to check this
    }
  });

  // 2019-04-14: Untested.
  dojo.connect(av.dnd.fzTdish, "onDndDrop", function (source, nodes, copy, target) {
    if ('fzTdish' === target.node.id) {
      nodes.forEach(function (node) {
        av.dnd.sortDnD('fzTdish');
      });
    }
  });

  // 2019-04-14: Untested.
  /*
   dojo.connect( av.dnd.fzMdish, "onDndDrop", function( source, nodes, copy, target ) {
   if ('fzMdish' === target.node.id) {
   nodes.forEach(function(node) {
   av.dnd.sortDnD('fzMdish');
   });
   }
   });
   
   // 2019-04-14: Untested.
   dojo.connect( av.dnd.fzRdish, "onDndDrop", function( source, nodes, copy, target ) {
   if ('fzRdish' === target.node.id) {
   nodes.forEach(function(node) {
   av.dnd.sortDnD('fzRdish');
   });
   }
   });
   */

  //console.log('av.dnd.ancestorBox', av.dnd.ancestorBox);
  av.dnd.ancestorBox.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of ancestorBox
    if ('ancestorBox' === target.node.id) {
      //console.log('ancestorBox=', target, av.dnd.ancestorBox);  //yes they are the same. could use in the above if statement.
      av.dnd.makeMove(source, nodes, target);
    }
  });

  av.dnd.ancestorBoTest.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of ancestorBox
    if ('ancestorBoTest' === target.node.id) {
      av.dnd.makeMove(source, nodes, target);
    }
  });

  av.dnd.gridCanvas.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of gridCanvas
    if ('gridCanvas' === target.node.id) {
      av.dnd.landGridCanvas(source, nodes, target);
      //console.log('before call av.grd.drawGridSetupFn');
      av.grd.drawGridSetupFn('av.dnd.gridCanvas where target = gridCanvas');
      //console.log('in gridCanvas.on');
    }
  });

  av.dnd.organIcon.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of organIcon
    //setTimeout(null,1000);
    if ('organIcon' === target.node.id) {
      if (av.debug.dnd)
        console.log('landOrganIcon: s, t', source, target);
      av.dnd.landOrganIcon(source, nodes, target);
      //Change to Organism Page
      av.ui.mainBoxSwap('organismBlock');
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.activeOrgan.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeOrgan
    if ('activeOrgan' === target.node.id) {
      if (av.debug.dnd)
        console.log('activeOrgan: s, t', source, target);
      av.dnd.makeMove(source, nodes, target);
      //av.dnd.landActiveOrgan(source, nodes, target);
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.organCanvas.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of organCanvas
    if ('organCanvas' === target.node.id) {
      if (av.debug.dnd)
        console.log('landorganCanvas: s, t', source, target);
      av.dnd.landorganCanvas(source, nodes, target);
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.trashCan.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of trashCan
    if ('trashCan' === target.node.id) {
      var remove = {};
      remove.type = '';
      remove.dir = '';
      if (av.debug.dnd)
        console.log('trashCan: s, t', source, target);
      remove = av.dnd.landTrashCan(source, nodes, target);
      if ('' !== remove.type) {
        //removeFzrItem(av.fzr, remove.dir, remove.type);
        remove.dir = av.fzr.dir[remove.domid];
        av.fwt.removeFzrItem(remove.dir, remove.type);
      }
    }
  });

  av.dnd.anlDndChart.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of anlDndChart
    if ('anlDndChart' === target.node.id) {
      if (av.debug.dnd)
        console.log('anlDndChart: s, t', source, target);
      av.dnd.landAnlDndChart(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish0.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish0
    if ('popDish0' === target.node.id) {
      if (av.debug.dnd)
        console.log('popDish0: s, t', source, target);
      av.dnd.landpopDish0(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish1.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish1
    if ('popDish1' === target.node.id) {
      if (av.debug.dnd)
        console.log('popDish1: s, t', source, target);
      av.dnd.landpopDish1(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish2.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish2
    if ('popDish2' === target.node.id) {
      if (av.debug.dnd)
        console.log('popDish2: s, t', source, target);
      av.dnd.landpopDish2(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish0.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeConfig
    //The following cases should never happen as they are defined as 'target' not as 'source' dnd types.
    // The code is here in case the dnd type is changed to 'source'
    switch (source.node.id) {
      case 'popDish0':
        av.post.addUser('DnD: delete_from: popDish0?');
        av.anl.pop[0].left = [];       //remove lines from population 1
        av.anl.pop[0].right = [];
        av.anl.AnaChartFn();
        break;
      case 'popDish1':
        av.post.addUser('DnD: delete_from: popDish1?');
        av.anl.pop[1].left = [];       //remove lines from population 2
        av.anl.pop[1].right = [];
        av.anl.AnaChartFn();
        break;
      case 'popDish2':
        av.post.addUser('DnD: delete_from: popDish2?');
        av.anl.pop[2].left = [];       //remove lines from population 3
        av.anl.pop[2].right = [];
        av.anl.AnaChartFn();
        break;
    }
  });

  //----------------------------------------------------------------------------------------------------------------------
  //                                    End of dojo based DND triggered functions
  //----------------------------------------------------------------------------------------------------------------------

  if (av.debug.root)
    console.log('before Error Logging');
  //********************************************************************************************************************
  // Error logging
  //********************************************************************************************************************

  //--------------------------------------------------------------------------------------------
  //https://bugsnag.com/blog/js-stacktracess
  //http://blog.bugsnag.com/js-stacktraces
  window.onerror = function (message, file, line, col, error) {
    //console.log('in onError');
    av.dom.runStopButton.innerHTML = 'Run';  //av.msg.pause('now');
    av.debug.finalizeDtail();
    av.debug.triggered = 'errorTriggered';
    av.post.postLogPara = 'Please send the info below to help us make Avida-ED better by clicking on the [Send] button';
    av.debug.sendLogPara = 'The error is the last line in the session log in the text below.';
    av.debug.postEmailLabel = 'Please include your e-mail if you would like feed back or are willing to further assist in debug';
    av.debug.postNoteLabel = 'Please include any additional comments in the field below.';
    av.debug.postEmailLabel = 'Please include your e-mail for feedback or so we can discuss the problem further';
    av.debug.error = 'Error: ' + message + ' from ' + file + ':' + line + ':' + col;
    av.debug.sendLogTextarea = av.fio.mailAddress + '\n\n' + av.debug.log + '\n\nDebug Details:\n' + av.debug.dTail + '\n\n' + av.debug.error;

    console.log('before call problemWindow');
    av.ui.problemWindow();
  };

  window.addEventListener('error', function (evt) {
    //console.log('event listener', evt);
  });
  //--------------------------------------------------------------------------------------------

  on(document.getElementById('postPost'), 'click', function () {
    av.post.addUser('Button: postPost');
    //Data to send
    av.debug.postData.email = av.dom.postEmailInput.value;
    av.debug.postData.comment = av.dom.postComment.value;
    console.log('postData=', av.debug.postData);

    av.dom.postStatus.textContent = 'Sending';
    av.dom.postProblemError.textContent = '';

    //domConst.place('<p>sending message</p>', 'postStatus');
    var hostname = 'https://avida-ed.msu.edu/developer/report/receive';

    xhr.post(//Post is a helper function to xhr, a more generic class
      hostname, //URL parameter
      {//Data and halding parameter
        data: dojo.toJson(av.debug.postData),
        headers: {'X-Requested-With': null}
      }
    ).then(function (received) { //Promise format; received data from request (first param of then)
      av.dom.postStatus.textContent = 'Received';
      //domConst.place('<p>Data received: <code>' + JSON.stringify(received) + '</code></p>', 'postStatus');
    }, function (err) { //Error handling (second param of then)
      av.dom.postStatus.textContent = 'Error';
      av.dom.postProblemError.textContent = 'Please send an e-mail to ' + av.fio.mailAddress + ' about the error sending a Problem Report';
      av.dom.postProblemError.style.color = 'red';

      //domConst.place('<p>Error: <code>' + JSON.stringify(err) + '</code></p>', 'postStatus');
    }
    ); // End then
  }); // End on's function and on statement

  //--------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------
  //More usefull websites to catch errors
  // https://davidwalsh.name/javascript-stack-trace
  // https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/
  //to send e-mail  http://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript

  // how to send e-mail
  // http://www.codeproject.com/Questions/303284/How-to-send-email-in-HTML-or-Javascript

  // selected text
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  // http://www.javascriptkit.com/javatutors/copytoclipboard.shtml

  //http://www.technicaladvices.com/2012/03/26/detecting-the-page-leave-event-in-javascript/
  //Cannot get custom message in Firefox (or Safari for now)
  window.onbeforeunload = function (event) {
    if (!av.ui.sendEmailFlag) {
      if ('no' === av.fzr.saveState || 'maybe' === av.fzr.saveState) {
        return 'Your workspace may have changed sine you last saved. Do you want to save first?';

        //e.stopPropagation works in Firefox.
        if (event.stopPropagation) {
          event.stopPropagation();
          event.preventDefault();
        }
        ;
      }
      ;
    }
    ;
  };

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

  //********************************************************************************************************************
  //  Read Default Workspace as part of initialization
  // ********************************************************************************************************************
  av.fio.JSZip = JSZip;  //to allow other required files to be able to use JSZip
  av.fio.FileSaver = FileSaver;
  av.pch.Plotly = Plotly;

  av.fio.readZipWS(av.fio.defaultFname, true);
  //av.fio.loadDefaultConfig();

  // can from here to dom.ready be functions only? 2018_0801
  //
  //********************************************************************************************************************
  // Menu Buttons handling
  //********************************************************************************************s************************

  if (av.debug.fio)
    console.log('dijit test', dijit.byId('mnFlOpenDefaultWS'));

  dijit.byId('mnFlOpenDefaultWS').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlOpenDefaultWS');
    av.fio.useDefault = true;
    if ('no' === av.fzr.saveState)
      sWSfDialog.show();  //Save WSfile Dialog box
    else {
      av.fio.readZipWS(av.fio.defaultFname, false);  //false = do not load config file
    }
  });

  dijit.byId('sWSfSave').on('Click', function () {
    av.post.addUser('Button: sWSSave');
    //console.log('before call save workspace');
    av.fio.fzSaveCurrentWorkspaceFn();  //fileIO.js
    //console.log('after call to save workspace');
  });

  dijit.byId('sWSfOpen').on('Click', function () {
    av.post.addUser('Button: sWSfOpen');
    sWSfDialog.hide(sWSfDialog.hide);
    if (av.fio.useDefault) {
      av.fio.readZipWS(av.fio.defaultFname, false);
    }  //false = do not load config file
    else {
      //document.getElementById('inputFile').click();  //to get user picked file
      document.getElementById('putWS').click();  //to get user picked file
    }
  });

  // open and read user picked file
  //--------------------------------------------------------------------------------------------------------------------

  dijit.byId('mnFlOpenWS').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlOpenWS');
    av.fio.useDefault = false;
    if ('no' === av.fzr.saveState)
      sWSfDialog.show();   //Need to change to include might be saved tiba fix
    //else document.getElementById('inputFile').click();
    else
      document.getElementById('putWS').click();  // calls av.fio.userPickZipRead
  });

  //--------------------------------------------------------------------------------------------------------------------

  dijit.byId('mnFlFzItem').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlFzItem');
    av.fio.useDefault = false;
    //console.log('importFzrItem', importFzrItem);
    document.getElementById('importFzrItem').click();
  });

  // ----------------------- Save Workspace ----------------------------------------------------------------------------
  // Save current workspace (mnFzSaveWorkspace)
  document.getElementById('mnFlSaveWorkspace').onclick = function () {
    if (!av.brs.isSafari) {
      //if (true) {
      av.post.addUser('Button: mnFlSaveWorkspace');
      av.fio.fzSaveCurrentWorkspaceFn();  //fileIO.js
    }
  };

  try {
    var isFileSaverSupported = !!new Blob;
  } catch (e) {
    console.log('----------------------------------------------------------filesaver supported?', e);
  }

  // Save current workspace with a new name
  document.getElementById('mnFlSaveAs').onclick = function () {
    if (!av.brs.isSafari) {
      //if (true) {
      av.post.addUser('Button: mnFlSaveAs');
      var suggest = 'avidaWS.avidaWs.zip';
      if (av.fio.userFname) {
        if (0 < av.fio.userFname.length)
          suggest = av.fio.userFname;
      }
      av.fio.userFname = prompt('Choose a new name for your Workspace now', suggest);
      if (null !== av.fio.userFname) {
        av.fio.fzSaveCurrentWorkspaceFn();
      }  //fileIO.js
    }
  };

  //Export csv data from current run.
  dijit.byId('mnFlExportData').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportData');
    av.fwt.writeCurrentCSV(av.fzr.actConfig.name + '@' + av.grd.popStatsMsg.update + '\n');
  });

  //Export chart data from current run.
  dijit.byId('mnFlExportGraph').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportGraph');
    mnFlExportGraphDialog.show();
  });

  //Save Stand alone applicaton .
  dijit.byId('mnFlStandAloneApp').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportGraph');
    mnFlStandAloneAppDialog.show();
  });

  //------------- Testing & Development Tools. Hide from User .--------------------

  av.doj.mnHpDebug.onclick = function () {
    if ('visible' === av.doj.mnDebug.style.visibility) {
      av.doj.mnDebug.style.visibility = 'hidden';
      dijit.byId('mnHpDebug').set('label', 'Show debug menu');
      av.post.addUser('Button: mnHpDebug: now hidden');
    } else {
      av.doj.mnDebug.style.visibility = 'visible';
      dijit.byId('mnHpDebug').set('label', 'Hide debug menu');
      av.post.addUser('Button: mnHpDebug: now visible');
    }
  };

  av.ui.where = function (domobj) {
    // placeholder that was to return the cell ID in the grid perhaps never done. 
    console.log('domobj=', domobj);
  };

  av.ui.toggleDevelopentDisplays = function (domobj) {
    console.log('domobj=', domobj);
    var len, tsk, sub;
    if ('visible' === av.doj.mnDebug.style.visibility) {
      //hide all development elements
      av.ui.hideDevelopment = true;
      av.doj.mnDebug.style.visibility = 'hidden';
      document.getElementById('showTextButtonDiv').style.visibility = 'hidden';
      document.getElementById('developmentToggle').className = 'devoCammo';

      document.getElementById('fzTdishSec').style.visibility = 'hidden';
      document.getElementById('testDishDetailDiv').style.display = 'none';
      document.getElementById('testConfigLableHolder').style.display = 'none';
      document.getElementById('testConfig').style.display = 'none';
      document.getElementById('avidianOutline').style.display = 'none';

      document.getElementById('popInfoTabHolder').className = 'tabHolderHide';
      document.getElementById('displayGridResourceData').style.display = 'none';

      av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.ui.toggleDevelopentDisplays');
/*
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
*/
      len = av.sgr.logicNames.length;
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
      };


      dijit.byId('mnHpDebug').set('label', 'Show debug menu');   //???????
//      tsk = 'orn';
//      sub = 1;
//      document.getElementById(tsk + sub + 'gradientCheckbox').style.display = 'none';

      av.post.addUser('Button: mnHpDebug: now hidden');
    } else {       // development sectiomn can be seen.
      av.ui.hideDevelopment = false;
      av.doj.mnDebug.style.visibility = 'visible';
      document.getElementById('showTextButtonDiv').style.visibility = 'visible';
      document.getElementById('developmentToggle').className = 'devoShow';

      document.getElementById('fzTdishSec').style.visibility = 'visible';
      document.getElementById('testDishDetailDiv').style.display = 'block';
      document.getElementById('testConfigLableHolder').style.display = 'flex';
      document.getElementById('testConfig').style.display = 'flex';
      document.getElementById('avidianOutline').style.display = 'inline-block'; 

      document.getElementById('popInfoTabHolder').className = 'tabHolderShow';
      document.getElementById('displayGridResourceData').style.display = 'flex';

      av.sgr.processHideFlags(av.sgr.flagInitOpposite, 'av.ui.toggleDevelopentDisplays.onclick_show');
/*
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
*/      
      len = av.sgr.logicNames.length;
      sub = 1;   //this may change later;
      for (ii = 0; ii < len; ii++) {
        tsk = av.sgr.logicNames[ii];
        av.sgr.changeDetailsLayout(tsk, sub, 'toggle development show');
      };
//      document.getElementById(tsk + sub + 'gradientCheckbox').style.display = 'inline-block';
      //Show debug on dropdown menu
      dijit.byId('mnHpDebug').set('label', 'Hide debug menu');   //????????
      av.post.addUser('Button: mnHpDebug: now visible');
    }
    //console.log('in av.ui.hideDevelopment=', av.ui.hideDevelopment, 'at end of function');
  };

  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.dom.xorLabel.onclick = function () {
    if ('none' === document.getElementById('displayGridResourceData').style.display) {
      document.getElementById('displayGridResourceData').style.display = 'flex';
    } else {
      document.getElementById('displayGridResourceData').style.display = 'none';
    }
  };



  av.fwt.tryDown = function (blob) {
    var ab = document.createElement('a');
    ab.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(av.debug.log);
    ab.target = '_blank';
    ab.download = 'testfile.txt';
    document.body.appendChild(ab);
    ab.click();
    setTimeout(function () {
      document.body.removeChild(ab);
      window.URL.revokeObjectURL(ab.href);
    }, 100);
  };
  //------------- Testing only need to delete above later.--------------------

  if (av.debug.root)
    console.log('before Help drop down menu');
  //--------------------------------------------------------------------------------------------------------------------
  // Help Drop down menu buttons
  //--------------------------------------------------------------------------------------------------------------------
  dijit.byId('mnHpAbout').on('Click', function () {
    av.post.addUser('Button: mnHpAbout');
    mnHpAboutDialog.show();
  });

  dijit.byId('mnAeAbout').on('Click', function () {
    av.post.addUser('Button: mnAeAbout');
    mnHpAboutDialog.show();
  });

  dijit.byId('mnHpProblem').on('Click', function () {
    av.post.addUser('Button: mnHpProblem');
    av.debug.finalizeDtail();
    av.debug.triggered = 'userTriggered';
    av.debug.postStatus = '';
    av.post.postLogPara = 'Please send the data below to help us make Avida-ED better by clicking on the [Send] button';
    av.debug.sendLogPara = 'Please describe the problem and put that at the beginning of the e-mail along with the session log from the text area seeen below.';
    av.debug.postNoteLabel = 'Please describe the problem or suggestion in the comment field below.';
    av.debug.postEmailLabel = 'Please include your e-mail so we can discuss your problem or suggeston further.';
    av.debug.sendLogTextarea = av.fio.mailAddress + '\n\n' + av.debug.log + '\n\nDebug Details:\n' + av.debug.dTail;
    av.debug.error = '';
    av.dom.postError.style.color = 'grey';
    av.ui.problemWindow();
    // only shows one line = prompt('Please put this in an e-mail to help us improve Avida-ED: Copy to clipboard: Ctrl+C, Enter', '\nto: ' + av.fio.mailAddress + '\n' + av.debug.log);
  });

  //http://stackoverflow.com/questions/7080269/javascript-before-leaving-the-page
  dijit.byId('sendEmail').on('Click', function () {
    av.ui.sendEmailFlag = true;
    av.post.addUser('Button: sendEmail');
    var link = 'mailto:' + av.fio.mailAddress +
      //'?cc=CCaddress@example.com' +
      '?subject=' + escape('Avida-ED session log') +
      '&body=' + escape(av.debug.log);
    window.location.href = link;
    av.ui.sendEmailFlag = false;
  });

  //http://stackoverflow.com/questions/7080269/javascript-before-leaving-the-page
  dijit.byId('sendEmail').on('Click', function () {
    av.ui.sendEmailFlag = true;
    av.post.addUser('Button: sendEmail');
    var link = 'mailto:' + av.fio.mailAddress +
      //'?cc=CCaddress@example.com' +
      '?subject=' + escape('Avida-ED session log') +
      '&body=' + escape(av.debug.log);
    window.location.href = link;
    av.ui.sendEmailFlag = false;
  });

  av.debug.finalizeDtail = function () {
    //finalize dTail
    //dom dimensions clientWidth clientHeight scrollWidth scrollHeight innerWidth innerHeight outerWidth outerHeight
    //assignment must have units and is a string style.width style.height
    av.debug.dTail = ''
      + '\nmapHolder.client wd Ht = ' + av.dom.mapHolder.clientWidth + '  ' + av.dom.mapHolder.clientHeight
      + '\nmapHolder.scroll wd Ht = ' + av.dom.mapHolder.scrollWidth + '  ' + av.dom.mapHolder.scrollHeight
      + '\n  gridHolder.client wd Ht = ' + av.dom.gridHolder.clientWidth + '  ' + av.dom.gridHolder.clientHeight
      + '\n  gridHolder.scroll wd Ht = ' + av.dom.gridHolder.scrollWidth + '  ' + av.dom.gridHolder.scrollHeight
      + '\n  gridCanvas.client wd Ht = ' + av.dom.gridCanvas.clientWidth + '  ' + av.dom.gridCanvas.clientHeight
      + '\n  gridCanvas.scroll wd Ht = ' + av.dom.gridCanvas.scrollWidth + '  ' + av.dom.gridCanvas.scrollHeight
      + '\n' + av.debug.dTail;
  };

  //process problme pop-up window
  av.ui.problemWindow = function () {
    //console.log('in problemWindow');
    av.debug.vars = {
      isBlink: av.brs.isBlink,
      isChrome: av.brs.isChrome,
      isEdge: av.brs.isEdge,
      isFirefox: av.brs.isFirefox,
      isIE: av.brs.isIE,
      isOpera: av.brs.isOpera,
      isSafari: av.brs.isSafari
    };

    av.debug.postData = {
      version: av.ui.version,
      userInfo: window.navigator.userAgent,
      screenSize: av.brs.userData.screen,
      comment: 'userComment',
      error: av.debug.error,
      email: 'user email if provided',
      triggered: av.debug.triggered,
      logs: {
        details: av.debug.dTail,
        session: av.debug.log
      },
      freezer: JSON.stringify(av.fzr),
      vars: av.debug.vars
    };
    console.log('postData=', av.debug.postData);

    //Until we get sending data to database figure out. Switch between post and e-mail session log
    if (true) {
      //Need to be able to get rid of these three lines for postPost. will crash without them now.
      sendLogDialog.show();  //textarea must be visable first
      av.dom.sendLogTextarea.focus();   //must not be commented out or extra error
      sendLogDialog.hide();  //
      av.post.sendWindow();
    }
    //e-mail in production version until database worked out.
    else {
      av.post.emailWindow();
    }
  };

  av.post.sendWindow = function () {
    postLogDialog.show();  //textarea must be visable first
    av.dom.postLogPara.textContent = av.post.postLogPara;
    av.dom.postVersionLabel.textContent = av.ui.version;
    av.dom.postScreenSize.textContent = av.brs.userData.screen;
    av.dom.postUserInfoLabel.textContent = window.navigator.userAgent.toString();
    av.dom.postError.textContent = av.debug.error;
    av.dom.postError.style.color = 'red';
    av.dom.postEmailLabel.textContent = av.debug.postEmailLabel;
    av.dom.postNoteLabel.textContent = av.debug.postNoteLabel;
    av.dom.postStatus.textContent = av.debug.postStatus;
    av.dom.postLogTextarea.textContent = av.debug.log;
    av.dom.postdTailTextarea.textContent = av.debug.dTail;
    av.dom.postProblemError.textContent = '';
  };

  av.post.emailWindow = function () {
    av.dom.sendLogTextarea.textContent = av.debug.sendLogTextarea;
    av.dom.sendLogPara.textContent = av.debug.sendLogPara;

    //document.getElementById('postLogTextarea').textContent = av.debug.sendLogTextarea;
    //document.getElementById('postLogPara').textContent = av.debug.sendLogPara;

    sendLogDialog.show();  //textarea must be visable first
    av.dom.sendLogTextarea.focus();
    av.dom.sendLogTextarea.select();  //https://css-tricks.com/snippets/javascript/auto-select-textarea-text/
  };

  //********************************************************************************************************************
  // main button scripts
  //********************************************************************************************************************

  //The style display: 'none' cannnot be used in the html during the initial load as the dijits won't work right
  //visibility:hidden can be used, but it leaves the white space and just does not display dijits.
  //So all areas are loaded, then the mainBoxSwap is called to set display to none after the load on all but
  //the default option.
  av.ui.mainBoxSwap = function (showBlock) {
    //console.log('showBlock=', showBlock);
    av.ui.page = showBlock;
    av.dom.populationBlock.style.display = "none";
    av.dom.organismBlock.style.display = "none";
    av.dom.analysisBlock.style.display = "none";
    av.dom.showTextBlock.style.display = "none";
    av.dom.populationButton.style.background = 'white';
    av.dom.organismButton.style.background = 'white';
    av.dom.analysisButton.style.background = 'white';
    av.dom.showTextButton.style.background = 'white';
    document.getElementById(showBlock).style.display = "flex";   //orgPageButtonHolder
    var showButton = showBlock.substring(0,showBlock.length-5)+'Button';
    //console.log('showButton=',showButton);
    document.getElementById(showButton).style.background = '#DBDBDB'; 
    //dijit.byId(showBlock).resize();
    //document.getElementById(showBlock).resize();

    //disable menu options. they will be enabled when relevant canvas is drawn
    dijit.byId('mnFzOffspring').attr('disabled', true);
    dijit.byId('mnCnOffspringTrace').attr('disabled', true);

    // if the miniplot on the populaton page needs to be initiated call that funciton.
    if ('flex' == av.dom.popStatsBlock.style.display && ('populationBlock' == av.ui.page) && av.pch.needInit) {
      av.grd.popChartInit('av.ui.mainBoxSwap');
    };
    if (('populationBlock' == av.ui.page) || ('organismBlock' == av.ui.page)) {
      document.getElementById('RtSideToggleButtons').style.display = 'block';
      document.getElementById('ritePnlBtnDiv').style.display = 'block';
    }
    else {
      document.getElementById('RtSideToggleButtons').style.display = 'none';
      document.getElementById('ritePnlBtnDiv').style.display = 'none';
    };
    if ('organismBlock' == av.ui.page) {
      if ('settings' == av.ui.orgInfo) {
        av.dom.orgSettings.style.display = 'block';
        av.dom.orgDetailID.style.display = 'none';
      }
      else {
        av.dom.orgSettings.style.display = 'none';
        av.dom.orgDetailID.style.display = 'block';
        av.ui.adjustOrgInstructionTextAreaSize();
      };
      
      if (undefined !== av.traceObj) {
        av.ind.updateOrgTrace('mainBoxSwap_organismBlock');
      };
      av.ind.organismCanvasHolderSize('mainBoxSwap_organismBlock');   ///??????
    }
    //console.log('end of mainBoxSwap');
  };

  // Buttons that call MainBoxSwap
  av.dom.populationButton.onclick = function () {
    av.post.addUser('Button: populationButton');
    if (av.debug.dnd || av.debug.mouse)
      console.log('PopulationButton, av.fzr.genome', av.fzr.genome);
    av.ui.mainBoxSwap('populationBlock');
  };

  av.dom.organismButton.onclick = function () {
    av.post.addUser('Button: organismButton');
    // * offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
    // * clientWidth = box + 2*padding - scrollbar_width    
    // * scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
    // * csssWidth = box only nothing else
    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
      av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
      $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
    if (av.dom.orgInfoHolder.clientWidth < av.ui.orgInfoHolderMinWidth) av.ui.orgInfoHolderWidth = av.ui.orgInfoHolderMinWidth;
    av.ui.mainBoxSwap('organismBlock');

    av.dom.orgInfoHolder.style.width = av.ui.orgInfoHolderWidth + 'px';
    
    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
      av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
      $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
    console.log('orgInfoHolder.paddding=', $("#orgInfoHolder").css('padding'));
  };

  document.getElementById('analysisButton').onclick = function () {
    av.post.addUser('Button: analysisButton');
    av.ui.mainBoxSwap('analysisBlock');
    //console.log('after mainBoxSwap to analysisBlock');
    av.anl.AnaChartFn();
  };

  document.getElementById('showTextButton').onclick = function () {
    av.post.addUser('Button: showTextButton');
    av.ui.mainBoxSwap('showTextBlock');
  };
  // ------------------ two controls for the same purpose; tabs used in develoopment mode --
  
  //Toggle switch for Population/Organism pages
  av.ptd.rightInfoPanelToggleButton = function(domObj) {
    if ('populationBlock' == av.ui.page) {
      var tabcontent = document.getElementsByClassName("labInfoClass");
      //console.log('tabcontent=', tabcontent);
      for (ii = 0; ii < tabcontent.length; ii++) {
        //console.log('ii=', ii, '; tabcontent[ii]=', tabcontent[ii]);
        tabcontent[ii].className = 'labInfoClass labInfoNone';
        //console.log('ii=', ii, '; tabcontent[ii].className =', tabcontent[ii].className);
      };
      var tablinks = document.getElementsByClassName("tablinks");
      for (var ii = 0; ii < tablinks.length; ii++) {
        //console.log('ii=', ii, '; tablinks[ii]=', tablinks[ii], '; tablinks[ii].className =', tablinks[ii].className);
        tablinks[ii].className = tablinks[ii].className.replace(" active", "");
        //console.log('tablinks[ii].className =', tablinks[ii].className);
      };

      if ('SetupButton' == domObj.id) {
        document.getElementById('SetupButton').className = 'toggleRitButton activeBtn';
        document.getElementById('StatsButton').className = 'toggleLftButton';
        av.dom.popStatsBlock.className = 'labInfoClass labInfoNone';
        av.dom.setupBlock.className = 'labInfoClass labInfoFlex';

        av.dom.setupTab.className = 'tablinks active';
      } else {
        // show Statisitcal data about grid
        document.getElementById('StatsButton').className = 'toggleLftButton activeBtn';
        document.getElementById('SetupButton').className = 'toggleRitButton';
        av.dom.popStatsBlock.className = 'labInfoClass labInfoFlex';
        av.dom.setupBlock.className = 'labInfoClass labInfoNone';

        av.dom.statsTab.className = 'tablinks active'; 

        // if the miniplot on the populaton page needs to be initiated call that funciton.
        if ('flex' == av.dom.popStatsBlock.style.display && ('populationBlock' == av.ui.page) && av.pch.needInit) {
          av.grd.popChartInit('av.ptd.rightInfoPanelToggleButton');
        };
      };
      //console.log('Stats.class=', document.getElementById('StatsButton').className, '; Setup.class=', document.getElementById('SetupButton').className);
    }
    else if ('organismBlock' == av.ui.page) {
      if ('SetupButton' == domObj.id) {
        av.post.addUser('Button: OrgSetting');
        av.ind.settingsChanged = false;
        av.ui.orgInfo = 'settings';
        av.dom.orgSettings.style.display = 'block';
        av.dom.orgDetailID.style.display = 'none';
      }
      else {
        av.ui.orgInfo = 'details';
        av.dom.orgSettings.style.display = 'none';
        av.dom.orgDetailID.style.display = 'block';
        console.log('av.ind.settingsChanged=', av.ind.settingsChanged);
        if (av.ind.settingsChanged) av.msg.doOrgTrace();
        
      }  
    }
    else {
      // Analysis Page or Big text display for debug
      console.log('should not be avaiable on analysis or showText page');
    }
  };

  //Development section with tabs
  av.ptd.processTab = function (evt, contentType) {
    var ii, tablinks;
    var tabcontent = document.getElementsByClassName("labInfoClass");
    //console.log('tabcontent=', tabcontent);
    for (ii = 0; ii < tabcontent.length; ii++) {
      //console.log('ii=', ii, '; tabcontent[ii]=', tabcontent[ii]);
      tabcontent[ii].className = 'labInfoClass labInfoNone';
      //console.log('ii=', ii, '; tabcontent[ii].display =', tabcontent[ii].style.display);
    };
    tablinks = document.getElementsByClassName("tablinks");
    for (ii = 0; ii < tablinks.length; ii++) {
      //console.log('ii=', ii, '; tablinks[ii]=', tablinks[ii], '; tablinks[ii].className =', tablinks[ii].className);
      tablinks[ii].className = tablinks[ii].className = 'tablinks';
      //console.log('tablinks[ii].className =', tablinks[ii].className);
    };
    //console.log('contentType=',contentType,'; evt=', evt);  //keep because evt info looks useful for improving mouse code.
    document.getElementById(contentType).className = 'labInfoClass labInfoFlex';;
    evt.currentTarget.className = "tablinks active";
    //console.log('id=', evt.currentTarget.id);
    if ('setupTab' == evt.currentTarget.id) {
      document.getElementById('SetupButton').className = 'toggleRitButton activeBtn';
      document.getElementById('StatsButton').className = 'toggleLftButton';
    }
    else if ('statsTab' == evt.currentTarget.id) {
      document.getElementById('SetupButton').className = 'toggleRitButton';
      document.getElementById('StatsButton').className = 'toggleLftButton activeBtn';      
    }
    else {
      document.getElementById('SetupButton').className = 'toggleRitButton';
      document.getElementById('StatsButton').className = 'toggleLftButton';            
    }
  };
  
  document.getElementById('StatsButton').click();
  // ------------ end of two controls for the same purpose; took work to get tabs to look right so I'm keeping tab example --

//------------------------------------------------------------------------------------------show/hide left side panel --
  av.ptd.lftPnlButtonImg = function () {
    if (av.ui.lftSidePnlShowing) {
      av.post.addUser('Button: lftPnlButtonImg: start hidding left side panel');
      av.ui.lftSidePnlShowing = false;
      av.ui.navColId = av.dom.navColId.offsetWidth;
      av.dom.navColId.style.display = 'none';
    } else {
      av.post.addUser('Button: lftPnlButtonImg: start showing left side panel');
      av.ui.lftSidePnlShowing = true;
      av.dom.navColId.style.display = 'flex';
      av.dom.popInfoHolder.style.width = av.ui.navColId + 'px';
    }
  };
  
  av.dom.lftPnlButtonImg.onclick = function () {
    ///av.post.addUser('Button: lftPnlButtonImg');   //done in popStatView
    av.ptd.lftPnlButtonImg();
  };

//----------------------------------------------------------------------------------------------------------------------
//                                             Population page Buttons
//----------------------------------------------------------------------------------------------------------------------

// hides and shows the population and selected organsim data on right of population page with 'Stats/mpa' button
  av.ptd.rtPnlButtonImg = function () {
    //console.log('rtPnlButtonImg: av.ui.page=', av.ui.page);
    if ('populationBlock' == av.ui.page) {
      if (av.ui.popStatFlag) {
        av.post.addUser('Button: rtPnlButtonImg: start hidding population stats');
        av.ui.popStatFlag = false;
        av.ptd.popInfoHolderWd = av.dom.popInfoHolder.offsetWidth;
        av.dom.popInfoHolder.style.display = 'none';
      } else {
        av.post.addUser('Button: rtPnlButtonImg: start showing population stats');
        av.ui.popStatFlag = true;
        av.dom.popInfoHolder.style.display = 'flex';
        //reset info pane dimensions. Try popInfoHolderWd = 395px; selOrgTypeWd = 150px
        av.dom.popInfoHolder.style.width = av.ptd.popInfoHolderWd + 'px';
        av.ui.adjustpopInfoSize('av.ptd.rtPnlButtonImg');
      };
    }
    else if ('organismBlock' == av.ui.page) {
      //console.log('av.ui.orgStatFlag=', av.ui.orgStatFlag);
      if (av.ui.orgStatFlag) {
        av.post.addUser('Button: rtPnlButtonImg: start hidding oranism stats');
        av.ui.orgStatFlag = false;
        //console.log('av.dom.orgInfoHolder.offsetWidth=', av.dom.orgInfoHolder.offsetWidth);
        av.ui.orgInfoHolderWd = (av.ui.orgInfoHolderMinWidth > av.dom.orgInfoHolder.offsetWidth) ? 
                                                         av.ui.orgInfoHolderMinWidth : av.dom.orgInfoHolder.offsetWidth;
        av.dom.orgInfoHolder.style.display = 'none';
      } else {
        av.post.addUser('Button: rtPnlButtonImg: start showing oranism stats');
        av.ui.orgStatFlag = true;
        av.dom.orgInfoHolder.style.display = 'flex';
        //reset info pane dimensions. 
        //console.log('av.ui.orgInfoHolderWd=', av.ui.orgInfoHolderWd);
        av.dom.orgInfoHolder.style.width = av.ui.orgInfoHolderWd + 'px';
        //av.ui.adjustOrgInfoSize('av.ptd.rtPnlButtonImg');
      };
    }
    else {
      //no right info panel so button goes away
      console.log('should not be available to be clicked');
    };
  };

  av.dom.rtPnlButtonImg.onclick = function () { av.ptd.rtPnlButtonImg(); };

  //--------------------------------------------------------------------------------------------------------------------
  ///   Map Grid buttons - New  Run/Pause Freeze
  //--------------------------------------------------------------------------------------------------------------------

  //process the run/Stop Button - a separate function is used so it can be flipped if the message to avida is not successful.
  av.dom.runStopButton.onclick = function () {
    av.post.addUser('Button: runStopButton = ' + av.grd.updateNum, '=updateNum;  ' + av.grd.msg.update + '=msg.update;  ' + av.grd.popStatsMsg.update + '=popStatsMsg.update');
    av.ptd.runStopFn();
  };

  dijit.byId('mnCnPause').on('Click', function () {
    av.post.addUser('Button: mnCnPause');
    //console.log('about to call av.ptd.makePauseState()');
    av.msg.pause('now');
    //av.debug.log += '______Debug Note: about to call av.ptd.makePauseState() in AvidaEd.js line 986 \n';
    av.ptd.makePauseState();
  });

  //process run/Stop buttons as above but for drop down menu
  dijit.byId('mnCnRun').on('Click', function () {
    av.post.addUser('Button: mnCnRun');
    av.ptd.makeRunState('mnCnRun.Click');
    av.ptd.runPopFn('mnCnRun.Click');
  });

  //process run/Stop buttons as above but for drop down menu
  dijit.byId('mnCnOne').on('Click', function () {
    av.post.addUser('Button: mnCnOne');
    av.ui.oneUpdateFlag = true;
    av.ptd.makeRunState('mnCnOne.Click');
    av.ptd.runPopFn('mnCnOne.Click');
  });

  av.dom.oneUpdateButton.onclick = function () {
    av.post.addUser('Button: oneUpdateButton', '=updateNum; ' + av.grd.msg.update + '=msg.update;  ' + av.grd.popStatsMsg.update + '=popStatsMsg.update');
    av.ui.oneUpdateFlag = true;
    av.ptd.makeRunState('av.dom.oneUpdateButton.onclick');
    av.ptd.runPopFn('av.dom.oneUpdateButton.onclick');
  };

//  av.dom.avidianOutline.onclick = function () {
  av.ui.avidianOutlineOnclick = function (domObj) {
    av.post.addUser('Button: avidianOutline; av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
    if ('Resource Mode: hide Avidian Outlines' == av.dom.avidianOutline.innerHTML) {
      av.dom.avidianOutline.innerHTML = 'Resource Mode: show Avidian Outlines';
      av.ui.showOutlineFlag = false;
      console.log('av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
    } else {
      av.dom.avidianOutline.innerHTML = 'Resource Mode: hide Avidian Outlines';
      console.log('av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
      av.ui.showOutlineFlag = true;
    }
  };

//------------------------------------------------------------------------------------- modal dialog cancle buttons --

  av.dom.needAncestorCancel.onclick = function () {
    av.dom.needAncestorModalID.style.display = 'none';
  };

  av.dom.newCancel.onclick = function () {
    av.dom.newModalID.style.display = 'none';
  };

  /******************************************* New Button and new Dialog **********************************************/

  av.dom.newDiscard.onclick = function () {
    av.post.addUser('Button: newDiscard');
    av.dom.newModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newDiscard click');
  };

  av.dom.newSaveWorld.onclick = function () {
    av.post.addUser('Button: newSaveWorld');
    av.ptd.FrPopulationFn();
    av.dom.newModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newSaveWorld click');
  };

  av.dom.newSaveConfig.onclick = function () {
    av.post.addUser('Button: newSaveConfig');
    av.ptd.FrConfigFn('av.dom.newSaveConfig.onclick');
    av.dom.newModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newSaveConfig click');
  };

  function newButtonBoth() {
    'use strict';
    if ('prepping' == av.grd.runState) {// reset petri dish
      av.msg.reset();
      console.log('in prepping');
      //av.ptd.resetDishFn(true); //Only do when get reset back from avida after sending reset, commented out in v3.0
    } else {// check to see about saving current population
      av.msg.pause('now');
      av.ptd.makePauseState();
      av.dom.newModalID.style.display = "block";
    }
  }

//  document.getElementById('newDishButton').onclick = function () {
  av.dom.newDishButton.onclick = function () {
    av.post.addUser('Button: newDishButton');
    newButtonBoth();
  };

  dijit.byId('mnCnNewpop').on('Click', function () {
    av.post.addUser('Button: mnCnNewpop');
    newButtonBoth();
  });

  //**************************************      Freeze Button      *****************************************************
  //Saves either configuration or populated dish
  //Also creates context menu for all new freezer items.*/
  av.dom.freezeButton.onclick = function () {
    av.post.addUser('Button: freezeButton');
    if ('prepping' == av.grd.runState)
      av.ptd.FrConfigFn('av.dom.freezeButton.onclick');
    else {
      if (5 > av.msg.ByCellIDgenome.length) {
        document.getElementById('FzOrganismSpan').style.display = 'none';
      }  //block
      else
        document.getElementById('FzOrganismSpan').style.display = 'inline';
      fzDialog.show();
    }
  };

  dijit.byId('FzConfigurationButton').on('Click', function () {
    av.post.addUser('Button: FzConfigurationButton');
    fzDialog.hide();
    av.ptd.FrConfigFn('FzConfigurationButton');
  });

  //Drop down menu to save a configuration item
  dijit.byId('mnFzConfig').on('Click', function () {
    av.post.addUser('Button: mnFzConfig');
    av.ptd.FrConfigFn('mnFzConfig');
  });

  //
  dijit.byId('FzOrganismButton').on('Click', function () {
    av.post.addUser('Button: FzOrganismButton');
    fzDialog.hide();
    av.ptd.FrOrganismFn('selected');
  });

  //button to freeze a population
  dijit.byId('FzPopulationButton').on('Click', function () {
    av.post.addUser('Button: FzPopulationButton');
    fzDialog.hide();
    av.ptd.FrPopulationFn();
  });

  dijit.byId('mnFzPopulation').on('Click', function () {
    av.post.addUser('Button: mnFzPopulation');
    av.ptd.FrPopulationFn();
  });

  //Buttons on drop down menu to save an organism
  dijit.byId('mnFzOrganism').on('Click', function () {
    av.post.addUser('Button: mnFzOrganism');
    av.ptd.FrOrganismFn('selected');
  });

  //Buttons on drop down menu to save an offspring
  dijit.byId('mnFzOffspring').on('Click', function () {
    av.post.addUser('Button: mnFzOffspring');
    av.ptd.FrOrganismFn('offspring');
  });

  //Buttons on drop down menu to add Configured Dish to an Experiment
  dijit.byId('mnFzAddConfigEx').on('Click', function () {
    av.post.addUser('Button: mnFzAddConfigEx');
    av.dnd.FzAddExperimentFn('fzConfig', 'activeConfig', 'c');
  });

  //Buttons on drop down menu to add Organism to an Experiment - does not work on Test
  dijit.byId('mnFzAddGenomeEx').on('Click', function () {
    av.post.addUser('Button: mnFzAddGenomeEx');
    av.dnd.FzAddExperimentFn('fzOrgan', 'ancestorBox', 'g');
  });

  //Buttons on drop down menu to add Populated Dish to an Experiment
  dijit.byId('mnFzAddPopEx').on('Click', function () {
    av.post.addUser('Button: mnFzAddPopEx');
    av.dnd.FzAddExperimentFn('fzWorld', 'activeConfig', 'w');
  });

  /*
   //Buttons on drop down menu to add Multi-Dish to an Experiment
   dijit.byId('mnFzAddMdishEx').on('Click', function () {
   av.post.addUser('Button: mnFzAddMdishEx');
   //av.dnd.FzAddExperimentFn('fzMdish', 'activeConfig', 'm');
   av.msg.runMultiDish('fzMdish', 'activeConfig', 'm');
   });
   */


//Buttons on drop down menu to put an organism in Organism Viewer
  dijit.byId('mnFzAddGenomeView').on('Click', function () {
    av.post.addUser('Button: mnFzAddGenomeEx');
    av.dnd.FzAddExperimentFn('fzOrgan', 'activeOrgan', 'g');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize();
    av.ui.adjustOrgInstructionTextAreaSize();
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  });

  //Buttons on drop down menu to add Populated Dish to Analysis
  dijit.byId('mnFzAddPopAnalysis').on('Click', function () {
    av.post.addUser('Button: mnFzAddPopEx');
    av.dnd.FzAddExperimentFn('fzWorld', 'anlDndChart', 'w');
  });


  // End of Freezer functions
  //---------------------------------------------- Restart Avida web worker --------------------------------------------

  //http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_webworker
  av.ui.restartAvida = function () {
    userMsgLabel.textContent = 'reloading Avida . . .';

    av.aww.uiWorker.terminate();
    av.aww.uiWorker = null;

    //console.log('just killed webWorker');

    if (typeof (Worker) !== 'undefined') {
      if (null == av.aww.uiWorker) {
        av.aww.uiWorker = new Worker('avida.js');
        console.log('webworker recreated');
        av.debug.log += '\nuiA: ui killed avida webworker and started a new webworker';
      }
    } else {
      userMsgLabel.textContent = "Sorry, your browser does not support Web workers and Avida won't run";
    }

    //need to 'start new experiment'
    av.ptd.resetDishFn(false);  //do not send reset to avida; avida restarted
    restartAvidaDialog.hide();
  };

  document.getElementById('restartAvidaNow').onclick = function () {
    av.post.addUser('Button: restartAvidaNow');
    av.ui.restartAvida();
  };

  document.getElementById('restartAvidaFrzConfig').onclick = function () {
    av.post.addUser('Button: restartAvidaFzrConfig');
    av.ptd.FrConfigFn('restartAvidaFrzConfig');
  };

  //test - delete later ------------------------------------------------------------------------------------------------

  document.getElementById('mnDbThrowData').onclick = function () {
    'use strict';
    av.post.addUser('Button: mnDbThrowData');
    console.log('av', av);
    console.log('fzr', av.fzr);
    console.log('parents', av.parents);
    console.log('av.grd.msg', av.grd.msg);
    console.log('av.grd.popStatsMsg', av.grd.popStatsMsg);
    console.log('av.dnd.fzConfig', av.dnd.fzConfig);
    console.log('av.dnd.fzOrgan', av.dnd.fzOrgan);
    console.log('av.dnd.fzWorld', av.dnd.fzWorld);
    console.log('av.dnd.fzTdish', av.dnd.fzTdish);
    console.log('av.dnd.activeConfig', av.dnd.activeConfig);
    console.log('av.dnd.activeOrgan', av.dnd.activeOrgan);
    console.log('av.dnd.ancestorBox', av.dnd.ancestorBox);
  };

  document.getElementById('mnDbThrowError').onclick = function () {
    'use strict';
    av.post.addUser('Button: mnDbThrowError');
    var george = fred;
  };

  document.getElementById('mnDbLineLog').onclick = function () {
    'use strict';
    av.debug.log += '\n -----------------------------------------------------------------------------------------------\n';
  };

  /*
   document.getElementById('mnDbLoadProtoType').onclick = function () {
   'use strict';
   //code to load the files from the freezer into the space
   };
   */

  //--------------------------------------------------------------------------------------------------------------------
  //    mouse DND functions
  //--------------------------------------------------------------------------------------------------------------------

  //mouse click started on Organism Canvas - only offspring can be selected if present
  $(document.getElementById('organCanvas')).on('mousedown', function (evt) {
    av.post.addUser('mousedown: organCanvas(' + evt.offsetX + ', ' + evt.offsetY + ')');
    av.mouse.downOrganCanvasFn(evt);
  });

  //if a cell is selected, arrow keys can move the selection
  $(document).keydown(function (event) {
    //av.post.addUser(' ');   //in av.mouse.arrowKeyOnGrid
    av.mouse.arrowKeysOnGrid(event);
  });

  //av.mouse down on the grid
  $(av.dom.gridCanvas).on('mousedown', function (evt) {
    av.post.addUser('mousedown: gridCanvas(' + evt.offsetX + ', ' + evt.offsetY + ')');
    av.mouse.downGridCanvasFn(evt);
  });

  //mouse move anywhere on screen - not currently in use.
  /*  $(document.getElementById('gridCanvas')).on('mousemove', function handler (evt) {
   //$(document).on('mousemove', function handler(evt) { //needed so cursor changes shape
   //console.log('gd move');
   //document.getElementById('gridCanvas').style.cursor = 'copy';
   //document.getElementById('trashCan').style.cursor = 'copy';
   //console.log('av.mouseMove cursor GT', document.getElementById('gridCanvas').style.cursor, dom.byId('trashCan').style.cursor);
   //if (av.debug.mouse) console.log('________________________________av.mousemove');
   if (!av.mouse.nearly([evt.offsetX, evt.offsetY], av.mouse.DnGridPos)) {
   //if (av.debug.mouse) console.log('________________________________');
   //if (av.debug.mouse) console.log('gd draging');
   if (av.mouse.Dn) av.mouse.Drag = true;
   }
   $(document).off('av.mousemove', handler);
   });
   */

  $(document).on('pointerup', function (evt) {
    av.mouse.UpGridPos = [evt.originalEvent.offsetX, evt.originalEvent.offsetY];
  });

  //When mouse button is released, return cursor to default values
  $(document).on('mouseup', function (evt) {
    'use strict';
    var target = '';
    if (av.debug.mouse)
      console.log('in mouseup target:', evt.target.id, '; event:', evt);
    if (av.debug.mouse)
      console.log('in mouseup target:', evt.target.id);
    av.mouse.makeCursorDefault();
    av.mouse.UpGridPos = [evt.offsetX, evt.offsetY];
    if (av.debug.mouse)
      console.log('AvidaED.js: mouse.UpGridPosX, y', av.mouse.UpGridPos[0], av.mouse.UpGridPos[1]);
    av.mouse.Dn = false;

    // --------- process if something picked to dnd ------------------
    if ('parent' == av.mouse.Picked) {
      av.mouse.Picked = '';
      av.mouse.ParentMouse(evt, av);
      if ('gridCanvas' == evt.target.id || 'trashCanImage' == evt.target.id) {
        av.grd.drawGridSetupFn('on mouseup where evt.target.id=gridCanvas or trashCanImage');
      } else if ('organIcon' == evt.target.id) {
        //Change to Organism Page
        av.ui.mainBoxSwap('organismBlock');
        av.ind.organismCanvasHolderSize();
        av.ui.adjustOrgInstructionTextAreaSize();
        if (av.debug.mouse)
          console.log('from parent', av.parent, '; fzr', av.fzr);
        av.post.addUser('Dragged item to Organism Icon');
        av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
      }
    } else if ('offspring' == av.mouse.Picked) {
      target = av.mouse.offspringMouse(evt, av.dnd, av.fio, av.fzr, av.gen);
      av.mouse.Picked = '';
    } else if ('kid' == av.mouse.Picked) {
      av.mouse.Picked = '';
      target = av.mouse.kidMouse(evt, av.dnd, av.fzr, av.grd);
      if (av.debug.mouse)
        console.log('kidMouse: target', target, '===============', evt.target.id);
      if ('organIcon' == evt.target.id) {
        //Change to Organism Page
        av.ui.mainBoxSwap('organismBlock');
        av.ind.organismCanvasHolderSize();
        av.ui.adjustOrgInstructionTextAreaSize();
        av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
      }
      /*      else if ('fzOrgan' == target) {
       //make_database_entry if using a database (av.fio, av.fzr);
       }
       */
    }
    av.mouse.Picked = '';
  });

  // *******************************************************************************************************************
  //                                      Pouplation Page
  // *******************************************************************************************************************
  //                                      Draw Population Grid
  // *******************************************************************************************************************

  //Set up canvas objects
  av.grd.sCtx = av.dom.scaleCanvas.getContext('2d');
  av.grd.cntx = av.dom.gridCanvas.getContext('2d');
  av.dom.sotColorCanvas = document.getElementById('sotColorCanvas');
  av.grd.selCtx = av.dom.sotColorCanvas.getContext('2d');
  av.grd.SelectedWd = $('#sotColorCanvas').innerWidth();
  av.grd.SelectedHt = $('#sotColorCanvas').innerHeight();

  //av.dom.gridCanvas.height = $('#gridHolder').innerHeight() - 16 - av.dom.scaleCanvas.height;

  //--------------------------------------------------------------------------------------------------------------------
  if (av.debug.root)
    console.log('before av.grd.drawGridSetupFn');

  av.grd.drawGridSetupFn = function (from) {
    'use strict';
    if (av.debug.uil)
      console.log(from, 'called av.grd.drawGridSetupFn');
    av.dom.popBot.style.height = '5px';

    //size testing box = mainButtons
    av.dsz.mainButtonsWd = parseInt($("#mainButtons").css("width"));
    av.dsz.mainButtonsHt = parseInt($("#mainButtons").css("height"));
    if (av.debug.uil)
      console.log('w:', av.dsz.mainButtonsWd, av.dsz.mainButtonsHt, '= mainButtons');

    //about total window size
    av.dsz.windowWd = window.innerWidth || document.documentElement.clientWidth
      || document.body.clientWidth;
    av.dsz.windowHd = window.innerHeight || document.documentElement.clientHeight
      || document.body.clientHeight;
    if (av.debug.uil)
      console.log('w:', av.dsz.windowWd, av.dsz.windowHd, '= window');

    if (av.debug.uil)
      console.log('w:', $("#gridHolder").width(), $("#gridHolder").height(), '= av.dom.gridHolder jQuery.width ht');
    if (av.debug.uil)
      console.log('w:', $("#gridHolder").innerWidth(), $("#gridHolder").innerHeight(), '= av.dom.gridHolder jQuery.innerWd ht');
    if (av.debug.uil)
      console.log('w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset');

    if (av.debug.uil)
      console.log('w:', av.dom.gridCanvas.width, av.dom.gridCanvas.height, '= av.dom.gridCanvas.width ht____________');

    if (undefined != av.grd.msg) {
      if ('prepping' != av.grd.runState && undefined != av.grd.msg.fitness) {
        //av.grd.setMapData('av.grd.drawGridSetupFn');  //update color information for offpsring once run has started only if screen visable.
        av.grd.findLogicOutline();
      }
    }
    if ('populationBlock' === av.ui.page) {
      // Does not seem to change wd/ht of gridHolder
      if ('None' == document.getElementById('colorMode').value) {
        if (av.grd.newlyNone) {
          av.grd.newlyNone = false;
          av.grd.cntx.fillStyle = av.color.names['Black'];
          av.grd.cntx.fillRect(1, 1, av.dom.gridCanvas.width - 1, av.dom.gridCanvas.height - 1);
        }
      } else {
        av.grd.newlyNone = true;
        // Does not seem to change wd/ht of gridHolder
        if (undefined != av.grd.msg) {
          if ('prepping' != av.grd.runState && undefined != av.grd.msg.fitness) {
            av.grd.setMapData('colorMode != none in av.grd.drawGridSetupFn');  //update color information for offpsring once run has started
            //av.grd.findLogicOutline(); //needs to be done for all updates
          }
        }

        //figure out scale or legend
        if (av.dom.gridControlTable.clientWidth < $("#gridHolder").height()) {
          av.dom.scaleCanvas.width = (av.dom.gridControlTable.clientWidth - 22);  //works for canvas; need to use .style for divs
        } else
          av.dom.scaleCanvas.width = $("#gridHolder").height() - 22;
        if ('Ancestor Organism' == document.getElementById('colorMode').value) {
          av.grd.drawLegend();
        } else {
          av.grd.setColorMapOnly('draw gradient scale in av.grd.drawGridSetupFn');  //to set color scales for resources
          av.grd.gradientScale('av.grd.drawGridSetupFn');
        }
        //console.log('after drawing scale or legend. update=',av.grd.oldUpdate);

        if (av.debug.uil)
          console.log('w:', $("#gridHolder").width(), $("#gridHolder").height(), '= av.dom.gridHolder jQuery.width ht');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").innerWidth(), $("#gridHolder").innerHeight(), '= av.dom.gridHolder jQuery.innerWd ht ~ client');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset');

        av.dom.popBot.style.height = av.dom.popBot.scrollHeight + 'px';
        if (av.debug.uil)
          console.log('change ht of popBot');

        //if (av.debug.uil) console.log('w:', av.dom.gridHolder.scrollWidth, av.dom.gridHolder.scrollHeight, '= av.dom.gridHolder.scrollWidth ht');
        //if (av.debug.uil) console.log('w:', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight, '= av.dom.gridHolder.clientWidth ht');
        //if (av.debug.uil) console.log('w:', av.dom.gridHolder.offsetWidth, av.dom.gridHolder.offsetHeight, '= av.dom.gridHolder.offsetWidth ht');
        //if (av.debug.uil) console.log('w:', parseInt($("#gridHolder").css('width')), parseInt($("#gridHolder").css('height')),'= av.dom.gridHolder jQuery.cssWd ht ~ outer ~ offset');

        //av.dsz.gridHolderWd = parseInt($("#gridHolder").css("width"));   //this seems to match offsetht
        //av.dsz.gridHolderHt = parseInt($("#gridHolder").css("height"));
        //if (av.debug.uil) console.log('w:',av.dsz.gridHolderWd,av.dsz.gridHolderHt, '= gridHolder jQuery.width ht ~ outer ~ css ~ offset');


        if (av.debug.uil)
          console.log('w:', $("#gridHolder").width(), $("#gridHolder").height(), '= av.dom.gridHolder jQuery.width ht');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").innerWidth(), $("#gridHolder").innerHeight(), '= av.dom.gridHolder jQuery.innerWd ht ~ client');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset');

        if (av.debug.uil)
          console.log('w:', av.dom.gridCanvas.width, av.dom.gridCanvas.height, '= Before: av.dom.gridCanvas.width ht____________');

        //if (av.dom.gridHolder.style.height < av.dom.gridHolder.clientWidth){
        //if (av.dom.gridHolder.style.height < av.dom.gridHolder.style.width){
        if ($("#gridHolder").height() < $("#gridHolder").width()) {
          av.grd.canvasSize = $("#gridHolder").height() - 2;
        } else {
          av.grd.canvasSize = $("#gridHolder").width() - 2;
        }

        av.dom.gridCanvas.width = av.grd.canvasSize;
        av.dom.gridCanvas.height = av.grd.canvasSize;
        av.grd.spaceX = av.grd.canvasSize;
        av.grd.spaceY = av.grd.canvasSize;

        av.grd.findGridSize(av.grd, av.parents);
        if (av.debug.uil)
          console.log('w:', av.dom.gridCanvas.width, av.dom.gridCanvas.height, '= After: av.dom.gridCanvas.width ht____________');
        if (av.debug.uil)
          console.log('w:', $("#gridCanvas").outerWidth(), $("#gridCanvas").outerHeight(), '= After: gridCanvas jQuery.outerWd______________');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").width(), $("#gridHolder").height(), '= av.dom.gridHolder jQuery.width ht');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset');

        //Need to fix for scrolling   // This was commented out in Avida-ED 3.1
        //if (av.dom.gridHolder.scrollHeight == av.dom.gridHolder.clientHeight + 17) {
        //  var numGH = av.dom.gridHolder.clientHeight;
        //  av.dom.gridCanvas.height = numGH - 6 - 17;
        //  av.grd.findGridSize(av.grd, av.parents);     //in populationGrid.js
        //  consold.log('inside DrawGridSetupFn in odd if statement ----------------------------------');
        //}

        if (av.debug.uil)
          console.log('before av.grd.drawGridUpdate');
        av.grd.drawGridUpdate();   //in populationGrid.js

        rescaleLabel.textContent = av.grd.fillRescale;       //Tiba look at later
        av.grd.need2DrawGrid = true;
        if (av.debug.uil)
          console.log('w:', av.dom.gridCanvas.width, av.dom.gridCanvas.height, '= End: av.dom.gridCanvas.width ht____________');
        if (av.debug.uil)
          console.log('w:', $("#gridCanvas").outerWidth(), $("#gridCanvas").outerHeight(), '= End: gridCanvas jQuery.outerWd______________');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").width(), $("#gridHolder").height(), '= av.dom.gridHolder jQuery.width ht');
        if (av.debug.uil)
          console.log('w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset');
      }
    }
  };

  // The rest of grid canvas drawing code is in populationGrid.js

  // *******************************************************************************************************************
  //        Color Map Color Mode and Zoom Slide Controls
  // *******************************************************************************************************************

  // Get color map data from Avida and draw
  //dijit.byId('colorMode').on('Change', function () {
  document.getElementById('colorMode').onchange = function () {
    av.grd.drawGridSetupFn('colorMode_onchange');
  };

  // Zoom slide - display only not avida
  av.grd.zoomSlide = new HorizontalSlider({
    name: 'zoomSlide',
    value: 1,
    minimum: 1,
    maximum: 10,
    intermediateChanges: true,
    discreteValues: 10,
    style: 'height: auto; width: 80px;float:right',
    onChange: function (value) {
      av.grd.zoom = value;
      //console.log('zoomSlide', av.grd.zoom);
      av.grd.drawGridSetupFn('av.grd.zoomSlide');
    }
  }, 'zoomSlide');

  av.grd.colorMap = 'Gnuplot2';
  /*
   dijit.byId('mnGnuplot2').attr('disabled', true);
   
   dijit.byId('mnViridis').on('Click', function () {
   av.post.addUser('Button: mnViridis');
   dijit.byId('mnCubehelix').attr('disabled', false);
   dijit.byId('mnGnuplot2').attr('disabled', false);
   dijit.byId('mnViridis').attr('disabled', true);
   av.grd.colorMap = 'Viridis';
   av.grd.drawGridSetupFn('digjit.byID(mnViridis');
   });
   
   dijit.byId('mnGnuplot2').on('Click', function () {
   av.post.addUser('Button: mnGnuplot2');
   dijit.byId('mnCubehelix').attr('disabled', false);
   dijit.byId('mnGnuplot2').attr('disabled', true);
   dijit.byId('mnViridis').attr('disabled', false);
   av.grd.colorMap = 'Gnuplot2';
   av.grd.drawGridSetupFn('digit.byID(mnGnuplot2)');
   });
   
   dijit.byId('mnCubehelix').on('Click', function () {
   av.post.addUser('Button: mnCubehelix');
   dijit.byId('mnCubehelix').attr('disabled', true);
   dijit.byId('mnGnuplot2').attr('disabled', false);
   dijit.byId('mnViridis').attr('disabled', false);
   av.grd.colorMap = 'Cubehelix';
   av.grd.drawGridSetupFn('digit.byID(mnCubehelix)');
   av.post.addUser('Button: mnCubehelix pressed');
   });
   */
  // *******************************************************************************************************************
  //    Buttons that select organisms that perform a logic function
  // *******************************************************************************************************************
  if (av.debug.root)
    console.log('before logic buttons');

  //    av.post.addUser('Button: notButton');    //done in av.ptd.bitToggle
  document.getElementById('notButton').onclick = function () {
    av.ptd.bitToggle('notButton');
  }; //av.ptd.bitToggle in popControls.js
  document.getElementById('nanButton').onclick = function () {
    av.ptd.bitToggle('nanButton');
  };
  document.getElementById('andButton').onclick = function () {
    av.ptd.bitToggle('andButton');
  };
  document.getElementById('ornButton').onclick = function () {
    av.ptd.bitToggle('ornButton');
  };
  document.getElementById('oroButton').onclick = function () {
    av.ptd.bitToggle('oroButton');
  };
  document.getElementById('antButton').onclick = function () {
    av.ptd.bitToggle('antButton');
  };
  document.getElementById('norButton').onclick = function () {
    av.ptd.bitToggle('norButton');
  };
  document.getElementById('xorButton').onclick = function () {
    av.ptd.bitToggle('xorButton');
  };
  document.getElementById('equButton').onclick = function () {
    av.ptd.bitToggle('equButton');
  };

  // -------------------------------------------------------------------------------------------------------------------
  //                    Population Chart   ; pop chart; popchart
  // -------------------------------------------------------------------------------------------------------------------

  // Chart control on population page
  //Set Y-axis title and choose the correct array to plot
  document.getElementById('yaxis').onchange = function () {
    av.grd.ytitle = document.getElementById('yaxis').value;
    //need to get correct array to plot from freezer
    //console.log('changeyaxis popChartFn');
    av.grd.popChartFn('av.dom.yaxis. onchange');
  };

  // initialize needs to be in AvidaED.js; cannot be run when mini-graph is not visible. 
  // Should be done before av.grd.popChartFn is run.
  av.grd.popChartInit = function (from) {
    //console.log(from, 'called av.grd.popChartInit');
    //looke to see if poplulation page mini-chart is showing
    if ('flex' != av.dom.popStatsBlock.style.display || ('populationBlock' !== av.ui.page)) {
      av.pch.needInit = true;
      return;
    };

    av.pch.clearPopChrt();
    av.pch.divSize('av.grd.popChartInit');
    var popData = av.pch.data;

    if (undefined == av.dom.popChart.data) {
      if (av.debug.plotly)
        //console.log('before plotly.plot in popChartInit');
      av.debug.log += '\n     --uiD: Plotly.plot("popChart", popData, av.pch.layout, av.pch.widg) in AvidaED.js at 1565';
      av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'popData, av.pch.layout, av.pch.widg', [popData, av.pch.layout, av.pch.widg]);
      Plotly.plot('popChart', popData, av.pch.layout, av.pch.widg);
      if (av.debug.uil) console.log('av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height);
      if (av.debug.plotly) console.log('after plotly.plot in poChartInit');
    } else {
      //av.pch.update = {
      //  xaxis: {range: [0, 10]}, yaxis: {range: [0, 1]},
      //  width: av.pch.wd,
      //  height: av.pch.ht
      //};
      //console.log('av.pch.wd ht=', av.pch.wd, av.pch.ht);
      av.pch.update = {
        autorange: true,
        width: av.pch.wd,
        height: av.pch.ht
      };

      if (av.debug.plotly)
        console.log('popData', popData);
      //Plotly.purge(av.dom.popChart);      //does not seem to work once plotly.animate has been used
      //console.log('data=', av.dom.popChart.data);
      if (undefined != av.dom.popChart.data[0]) {
        av.debug.log += '\n     --uiD: Plotly: Plotly.deleteTraces(av.dom.popChart, [0, 1]) in AvidaED.js at 2133';
        av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart', [av.dom.popChart]);
        Plotly.deleteTraces(av.dom.popChart, [0, 1]);
        av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in av.grd.popChartInit in AvidaED.js at 2182';
        av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
        Plotly.relayout(av.dom.popChart, av.pch.update);
      }
    }
    av.dom.popChart.style.visibility = 'hidden';
    //console.log('layout.ht, wd =', av.dom.popChart.layout.height, av.dom.popChart.layout.width);
    av.pch.needInit = false;
  };

  av.grd.popChartFn = function (from) {
    'use strict';
    if (av.pch.needInit) {
      console.log(from + ' called av.grd.popChartFn: av.pch.needInit=', av.pch.needInit, ' should not be here');
      // if the miniplot on the populaton page needs to be initiated call that funciton.
      if ('flex' == av.dom.popStatsBlock.style.display && ('populationBlock' == av.ui.page) && av.pch.needInit) {
        av.grd.popChartInit('av.grd.popChartFn');
      }
      ;
    } else  //console.log('av.grd.runState = ', av.grd.runState);

    // Do not display chart if the chart is not on the screen. Data seems to be getting updated. need to verify this.
    // console.log('av.dom.popStatsBlock.style.display =', av.dom.popStatsBlock.style.display, '; av.ui.page=', av.ui.page);
    if ('flex' != av.dom.popStatsBlock.style.display || ('populationBlock' !== av.ui.page)) {
      // the avidaDataRecorder.csv is broken
      return;
    }
    ;

    //console.log('av.grd.runState = ', av.grd.runState);
    if ('prepping' === av.grd.runState) {   //values can be prepping, started, or world
      av.dom.popChart.style.visibility = 'hidden';
    } else {
      av.dom.popChart.style.visibility = 'visible';
      if ('none' === document.getElementById('yaxis').value) {
        if (undefined !== av.dom.popChart.data) {
          console.log('before purge in popChartFn');
          av.debug.log += '\n     --uiD: Plotly: Plotly.deleteTraces(av.dom.popChart, [0, 1]) in AvidaED.js at 1621';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart', [av.dom.popChart]);
          Plotly.deleteTraces(av.dom.popChart, [0, 1]);
          //Plotly.purge(av.dom.popChart);      //does not seem to work once plotly.animate has been used
          console.log('after purge in popChartFn');
        }
      } else {
        av.pch.divSize('av.grd.popChartFn');

        if (document.getElementById('yaxis').value === av.pch.yValue)
          av.pch.yChange = false;
        else {
          av.pch.yChange = true;
          av.pch.yValue = document.getElementById('yaxis').value;
        }
        //console.log('av.pch.maxFit=',av.pch.aveMaxFit, '; av.pch.logMaxFit=',av.pch.logMaxFit, '; av.pch.aveFit = ', av.pch.aveFit);
        //console.log('av.pch.logFit = ', av.pch.logFit);
        if ('Average Fitness' === document.getElementById('yaxis').value) {
          av.pch.popY = av.pch.aveFit;
          av.pch.logY = av.pch.logFit;
          //console.log('av.pch.maxFit=',av.pch.aveMaxFit, '; av.pch.logMaxFit=',av.pch.logMaxFit);
          av.pch.maxY = (av.pch.aveMaxFit > av.pch.logMaxFit) ? av.pch.aveMaxFit : av.pch.logMaxFit;
          //console.log('aveMaxFit=', av.pch.aveMaxFit, '; logMaxFit=', av.pch.logMaxFit, '; maxY=', av.pch.maxY);
          //console.log('aveFit', av.pch.aveFit);
          //console.log('logFit', av.pch.logFit);
        } else if ('Average Offspring Cost' == document.getElementById('yaxis').value) {
          av.pch.popY = av.pch.aveCst;
          av.pch.logY = av.pch.logCst;
          av.pch.maxY = (av.pch.aveMaxCst > av.pch.logMaxCst) ? av.pch.aveMaxCst : av.pch.logMaxCst;
        } else if ('Average Energy Acq. Rate' == document.getElementById('yaxis').value) {
          av.pch.popY = av.pch.aveEar;
          av.pch.logY = av.pch.logEar;
          av.pch.maxY = (av.pch.aveMaxEar > av.pch.logMaxEar) ? av.pch.aveMaxEar : av.pch.logMaxEar;
        } else if ('Number of Organisms' == document.getElementById('yaxis').value) {
          av.pch.popY = av.pch.aveNum;
          av.pch.logY = av.pch.logNum;
          av.pch.maxY = (av.pch.aveMaxNum > av.pch.logMaxNum) ? av.pch.aveMaxNum : av.pch.logMaxNum;
        } else if ('Number Viable' == document.getElementById('yaxis').value) {
          av.pch.popY = av.pch.aveVia;
          av.pch.logY = av.pch.logNum;
          av.pch.maxY = (av.pch.aveMaxVia > av.pch.logMaxNum) ? av.pch.aveMaxVia : av.pch.logMaxNum;
        } else {
          av.pch.yValue = 'none';
          av.pch.popY = [];
          av.pch.logY = [];
          av.pch.maxY = 0.1;
        }
        //console.log('xx   after', av.pch.xx);
        //console.log('popY after', av.pch.logY);
        //console.log('maxY', av.pch.maxY);
        //console.log('logY after', av.pch.logY);

        //av.pch.trace0 = {x:av.pch.xx, y:av.pch.popY, type:'scatter', mode: 'lines'};
        //av.pch.trace1 = {x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines'};
        av.pch.trace0.x = av.pch.xx;
        av.pch.trace0.y = av.pch.popY;
        av.pch.trace1.x = av.pch.xx;
        av.pch.trace1.y = av.pch.logY;
        //console.log('trace0',av.pch.trace0);
        //console.log('trace1',av.pch.trace1);

        //var popData = [av.pch.trace0];
        var popData = [av.pch.trace0, av.pch.trace1];
        var rstl0 = {x: [av.pch.xx], y: [av.pch.popY]};
        var rstl1 = {x: [av.pch.xx], y: [av.pch.logY]};

        //if (av.pch.yChange) {
        if (false) {
          av.pch.yChange = false;
          av.pch.layout.width = av.pch.wd;
          av.pch.layout.height = av.pch.ht;
          console.log('before purge in update grid chart');
          av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.popChart)  in AvidaED.js at 1690';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart', [av.dom.popChart]);
          Plotly.purge(av.dom.popChart);
          console.log('after purge in update grid chart');
          av.debug.log += '\n     --uiD: Plotly: Plotly.plot("popChart", popData, av.pch.layout, av.pch.widg)  in AvidaED.js at 1694';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'popData, av.pch.layout, av.pch.widg', [popData, av.pch.layout, av.pch.widg]);
          Plotly.plot('popChart', popData, av.pch.layout, av.pch.widg);
          //Plotly.plot('popChart', popData, av.pch.layout);
          console.log('purge chart.popData=', av.dom.popChart.data);
          //console.log('purge chart.layout=', av.dom.popChart.layout);
        } else {
          //av.pch.update = {
          //  xaxis: {range: [0, av.pch.popY.length + 1]}, yaxis: {range: [0, 1.1 * av.pch.maxY]},
          //  width: av.pch.wd,
          //  height: av.pch.ht
          //};
          if (av.debug.uil)
            console.log('av.pch.wd ht=', av.pch.wd, av.pch.ht);
          if (av.debug.uil)
            console.log('av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height);

          av.pch.update = {
            autorange: true,
            width: av.pch.wd,
            height: av.pch.ht
          };
          //av.pch.update = {xaxis: {range: [0, av.pch.popY.length+1]}, yaxis: {range: [0, av.pch.maxY]}};

          //console.log('before relayout in update grid chart');
          if (av.debug.plotly)
            console.log('av.pch.update', av.pch.update);

          if (undefined == av.dom.popChart.data) {
            if (av.debug.plotly)
              console.log('before plot');
            av.debug.log += '\n     --uiD: Plotly: Plotly.plot("popChart", popData, av.pch.layout, av.pch.widg)  in AvidaED.js at 1714';
            av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'popData, av.pch.layout, av.pch.widg', [popData, av.pch.layout, av.pch.widg]);
            Plotly.plot('popChart', popData, av.pch.layout, av.pch.widg);
            if (av.debug.plotly)
              console.log('after plot');
          } else if (0 == av.dom.popChart.data.length) {
            if (av.debug.plotly)
              console.log('before plot');
            av.debug.log += '\n     --uiD: Plotly: Plotly.plot("popChart", popData, av.pch.layout, av.pch.widg) in AvidaED.js at 1724';
            av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'popData, av.pch.layout, av.pch.widg', [popData, av.pch.layout, av.pch.widg]);
            Plotly.plot('popChart', popData, av.pch.layout, av.pch.widg);
          } else {
            if (av.brs.isChrome) {
              av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", rstl0, [0]) at 1734';
              av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'rstl0', [rstl0]);
              Plotly.restyle('popChart', rstl0, [0]);
              av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", rstl1, [1])  in AvidaED.js at 1738';
              av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'rstl1', [rstl1]);
              Plotly.restyle('popChart', rstl1, [1]);
              av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in AvidaED.js at 1741';
              av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
              Plotly.relayout(av.dom.popChart, av.pch.update);
            } else {
              //console.log('trace0', av.pch.trace0);
              //Plotly.restyle(graphDiv, update, [1, 2]);
              //Plotly.restyle(av.dom.popChart, av.pch.trace0, [0]);
              //Plotly.restyle(av.dom.popChart, av.pch.trace1, [1]);
              av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in AvidaED.js at 2304';
              av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
              if (undefined == av.pch.update) {
                av.pch.update = {
                  autorange: true,
                  width: av.pch.wd,
                  height: av.pch.ht
                };
              }
              ;
              //trying to figure out why plotly crashed. 
              //When these were added 2019_08, plotly crased because div holding plotly was not being displayed
              //console.log('av.debug.log = ', av.debug);
              //console.log('av.dom.popChart=',av.dom.popChart);
              //console.log('av.pch.update=', av.pch.update);   // should look like av.pch.update= {autorange: true, width: 544, height: 236}
              //console.log('av=', av);
              //next line crashes ------------------
              Plotly.relayout(av.dom.popChart, av.pch.update);
              //console.log('after relayout in update grid chart');
              //Error: Uncaught TypeError: Cannot read property 'width' of undefined from 
              //http://localhost:8003/lib/plotly.js:114473:53

              if (av.debug.plotly)
                console.log('popData', popData);
              //Plotly.animate('popChart', {popData});
              av.debug.log += '\n     --uiD: Plotly.animate("popChart", {popData}) in AvidaED.js at 1757';
              av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'popData', [popData]);
              Plotly.animate('popChart', {popData});
              if (av.debug.plotly)
                console.log('after animate in update grid chart');
            }
          }
          if (av.debug.plotly)
            console.log('chart.popData=', av.dom.popChart.data);
          if (av.debug.plotly)
            console.log('chart.layout=', av.dom.popChart.layout);
        }
      }
    }
  };

  av.grd.popChartClear = function () {
    'use strict';
    //console.log('in popChartClear');
  };
  //av.grd.popChartClear();

  // **************************************************************************************************************** */
  // ******* Population Setup Buttons from 'Setup' subpage ********* */
  // **************************************************************************************************************** */
  if ('test' == av.msg.setupType) {
    av.grd.gridWasCols = Number(av.dom.sizeColTest.value);
    av.grd.gridWasRows = Number(av.dom.sizeRowTest.value);
  } else {
    av.grd.gridWasCols = Number(av.dom.sizeCols.value);
    av.grd.gridWasRows = Number(av.dom.sizeRows.value);
  }

  av.ptd.popSizeFn = function (from) {
    av.grd.setupCols = Number(av.dom.sizeCols.value);
    av.grd.setupRows = Number(av.dom.sizeRows.value);
    //console.log(from, 'called av.ptd.popSizeFn: new col, row', av.grd.setupCols, av.grd.setupRows);
    //console.log('av.grd.setupCols, Rows', av.grd.setupCols, av.grd.setupRows);
    av.dom.sizeCells.innerHTML = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    //av.dom.sizeCells.text = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    av.dom.sizeCols.style.color = 'black';
    av.dom.sizeRows.style.color = 'black';
    av.dom.sizeCells.style.color = 'black';
    //Linear scale the position for Ancestors added by hand;
    if (undefined != av.parents.handNdx) {
      var lngth = av.parents.handNdx.length;
      for (var ii = 0; ii < lngth; ii++) {
        console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
      }
    }
    ;
    av.grd.gridWasCols = Number(av.dom.sizeCols.value);
    av.grd.gridWasRows = Number(av.dom.sizeRows.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };

  av.ptd.popSizeFnTest = function (from) {
    av.grd.setupCols = Number(av.dom.sizeColTest.value);
    av.grd.setupRows = Number(av.dom.sizeRowTest.value);
    //console.log(from, 'called av.ptd.popSizeFnTest: new col, row', av.grd.setupCols, av.grd.setupRows);
    //console.log('av.grd.setupCols, Rows', av.grd.setupCols, av.grd.setupRows);
    av.dom.sizeCellTest.innerHTML = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    //av.dom.sizeCells.text = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    av.dom.sizeColTest.style.color = 'black';
    av.dom.sizeRowTest.style.color = 'black';
    av.dom.sizeCellTest.style.color = 'black';
    //Linear scale the position for Ancestors added by hand;
    if (undefined != av.parents.handNdx) {
      var lngth = av.parents.handNdx.length;
      for (var ii = 0; ii < lngth; ii++) {
        console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
      }
    }
    ;
    av.grd.gridWasCols = Number(av.dom.sizeColTest.value);
    av.grd.gridWasRows = Number(av.dom.sizeRowTest.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };

  av.ptd.muteInputChange = function (value, muteErroTest) {
    var muteNum = Number(value);
    if (av.debug.uil)
      console.log('muteNum=', muteNum);
    if (muteNum >= 0 && muteNum <= 100) {
      av.ptd.validMuteInuput = true;
      document.getElementById(muteErroTest).style.color = 'black';
      document.getElementById(muteErroTest).innerHTML = '';
      document.getElementById(muteErroTest).innerHTML = '';
    } else {
      av.ptd.validMuteInuput = false;
      document.getElementById(muteErroTest).style.color = 'red';
      document.getElementById(muteErroTest).innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (muteNum <= 0) {
        document.getElementById(muteErroTest).innerHTML += 'Mutation rate must be >= than zero percent. ';
        console.log('<0');
      }
      if (muteNum >= 100) {
        document.getElementById(muteErroTest).innerHTML += 'Mutation rate must be 100% or less. ';
        console.log('>0');
      }
      if (isNaN(muteNum)) {
        document.getElementById(muteErroTest).innerHTML += 'Mutation rate must be a valid number. ';
        console.log('==NaN');
      }
    }
    ;
  };

  av.ptd.randInputChange = function (value, randErroTest) {
    var randNum = Number(value);
    if (av.debug.uil)
      console.log('randNum=', randNum);
    if (randNum >= -1 && randNum <= 1000000) {
      av.ptd.validMuteInuput = true;
      document.getElementById(randErroTest).style.color = 'black';
      document.getElementById(randErroTest).innerHTML = '';
      document.getElementById(randErroTest).innerHTML = '';
    } else {
      av.ptd.validMuteInuput = false;
      document.getElementById(randErroTest).style.color = 'red';
      document.getElementById(randErroTest).innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (randNum <= -1) {
        document.getElementById(randErroTest).innerHTML += 'Random Seed must be > -1. ';
        console.log('<0');
      }
      if (randNum >= 1000000) {
        document.getElementById(randErroTest).innerHTML += 'Random Seed must be 1,000,000 or less. ';
        console.log('>0');
      }
      if (isNaN(randNum)) {
        document.getElementById(randErroTest).innerHTML += 'Random Seed must be a valid number. ';
        console.log('==NaN');
      }
    }
    ;
  };

  /************************************************************************************ enviornment (sugar) settings ****/

  av.ui.ex1setSugarColors = function () {
    var sugarSection = ['ex1notSection', 'ex1nanSection', 'ex1andSection', 'ex1ornSection', 'ex1oroSection', 'ex1antSection', 'ex1norSection', 'ex1xorSection', 'ex1equSection'];
    var len = av.sgr.sugarColors.length;
    var ndx = av.sgr.sugarBackgroundShade;
    for (ii = 0; ii < len; ii++) {
      //console.log('ii=',ii,'SugarSection=', sugarSection[ii]);
      if ('allLocal' != document.getElementById('ex1allSugarChange').value) {
        document.getElementById(sugarSection[ii]).style.backgroundColor = av.color.greyMap[ndx];
      } else {
        document.getElementById(sugarSection[ii]).style.backgroundColor = av.color[av.sgr.sugarColors[ii]][ndx];
      }
    }
    ;
  };

  document.getElementById('ex1allSugarChange').onchange = function () {
    var allSugar = document.getElementById('ex1allSugarChange').value;
    av.ptd.ex1allSugarChange(allSugar);
    av.ui.ex1setSugarColors();
    document.getElementById('ex1allSugarChange').value = 'allNeutral';
  };

// end of ex1 and tst2 page stuff
//------------------------------------------------------------------------------------------------- Sugar Accordion ----
//Global or Local in Ed speak = Global or Grid in Avida Environment file.
  av.sgr.allSugarGeometryChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var which = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllGeo(which);
    av.sgr.setSugarColors(true);  //true is to turn colors on;
    document.getElementById('allSugarGeometry').value = 'Neutral';
  };

  av.sgr.allsugarSupplyTypeChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var which = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllsugarSupplyType(which);
    document.getElementById('allsugarSupplyType').value = 'Neutral';
  };

  av.sgr.allSugarDetailsOpenClose = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var selectedOption = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.OpenCloseAllSugarDetails(selectedOption, 'av.sgr.allSugarDetailsOpenClose');
    document.getElementById('allSugarDetails').value = 'Neutral';
  };

  av.sgr.geometryChange = function (selectObj) {
    //need to find subregion Number in the future - set to 1 for now. 
    var taskID = selectObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substring(3, 1);
    console.log('tst=', task, '; subsection=', sub);
    sub = 1;
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.geometryChange');
  };

  av.sgr.supplyChange_placeholder = function (domObj) {
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substring(3, 1);
    console.log('taskID=', taskID, 'tst=', task, '; subsection=', sub);
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.supplyChange');
  };

  av.sgr.dishRegionChange = function (domObj) {
    console.log('av.sgr.dishRegionChange was called by', domObj);
  };

  av.sgr.supplyChange = function (domObj) {
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    console.log('taskID=', taskID, '; tst=', task, '; subsection=', sub); // this is wrong on 2019
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.supplyChange');
  };

  av.sgr.eachSugarCheckBoxChange = function (domObj) {
    var re_region = /(\D+)(\d+)(.*$)/;
    var taskID = domObj.id;
    var matchTaskRegion = taskID.match(re_region);
    var task = matchTaskRegion[1];      //taskID.substring(0,3);  
    var sub = matchTaskRegion[2];       //taskID.substring(3,1);   did not work
    console.log('taskID=', taskID, 'tst=', task, '; subsection=', sub);
    if (1 < sub)
      sub = 1;
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.eachSugarCheckBoxChange');
  };

  av.sgr.periodChange = function (domObj) {
    //console.log('av.sgr.periodChange domObj=', domObj);
    console.log('id=', domObj.id, '; domObj.value=', domObj.value);
  };

  av.sgr.initialChange = function (domObj) {
    //console.log('av.sgr.initialChange domObj=', domObj);
    console.log('domObj.value=', domObj.value);
    var ndx = domObj.id.indexOf('Input');
    var id = domObj.id.substring(0, ndx) + 'Text';
    //console.log('new id=', id, '; old id=', domObj.id);
    //console.log('Number(domObj.value)=',Number(domObj.value));
    if (isNaN(Number(domObj.value))) {
      document.getElementById(id).innerHTML = 'inital amount must be a number';
      document.getElementById(id).style.color = 'red';
    } else if (0 > domObj.value) {
      document.getElementById(id).innerHTML = 'inital amount must be > 0';
      document.getElementById(id).style.color = 'red';
    } else {
      document.getElementById(id).innerHTML = 'inital amount per cell';
      document.getElementById(id).style.color = 'black';
    }
  };

  av.sgr.inflowChange = function (domObj) {
    console.log('av.sgr.inflowChange domObj=', domObj);
    console.log('id=', domObj.id, '; domObj.value=', domObj.value);
  };

  av.sgr.outflowChange = function (domObj) {
    console.log('av.sgr.outflowChange domObj=', domObj);
    console.log('id=', domObj.id, '; domObj.value=', domObj.value);
  };

  /******************************************************************************** End enviornment (sugar) settings ****/

  av.ptd.gridChange = function (domObj) {
    console.log('in av.ptd.gridChange; domObj.id =', domObj.id);
    var colNum = Number(av.dom.sizeCols.value);
    var rowNum = Number(av.dom.sizeRows.value);
    //console.log('col, row=', colNum, rowNum);
    if (colNum > 0 && colNum <= 100 && rowNum > 0 && rowNum <= 100) {
      //console.log('valid response');
      av.ptd.popSizeFn('gridChange');
      av.ptd.validGridSize = true;
      av.dom.userMsgLabel.innerHTML = '';
      //redraw grid
      av.grd.drawGridSetupFn('av.ptd.gridChange');
    } else {
      av.ptd.validGridSize = false;
      if (colNum > 0 && colNum <= 100)
        av.dom.sizeCols.style.color = 'black';
      else
        av.dom.sizeCols.style.color = 'red';
      if (rowNum > 0 && rowNum <= 100)
        av.dom.sizeRows.style.color = 'black';
      else
        av.dom.sizeRows.style.color = 'red';
      av.dom.sizeCells.style.color = 'red';
      console.log('not valid; col, row=', colNum, rowNum);
      av.dom.sizeCells.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be greater than zero. ';
        console.log('<0');
      }
      if (colNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be 100 or less. ';
        console.log('>0');
      }
      if (isNaN(colNum)) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be a valid number. ';
        console.log('==NaN');
      }
      if (rowNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be greater than zero. ';
        console.log('<0');
      }
      if (rowNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be 100 or less. ';
        console.log('>0');
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be a valid number. ';
        console.log('==NaN');
      }
    }
  };

  av.ptd.gridChangTest = function (from) {
    console.log(from, 'called av.ptd.gridChangTest; ');
    var colNum = Number(av.dom.sizeColTest.value);
    var rowNum = Number(av.dom.sizeRowTest.value);
    if (colNum > 0 && colNum <= 100 && rowNum > 0 && rowNum <= 100) {
      //console.log('valid response');
      av.ptd.popSizeFnTest('gridChangTest');
      av.ptd.validGridSizTest = true;
      av.dom.userMsgLabel.innerHTML = '';
      //redraw grid
      av.grd.drawGridSetupFn('av.ptd.gridChangTest');
    } else {
      av.ptd.validGridSizTest = false;
      if (colNum > 0 && colNum <= 100)
        av.dom.sizeColTest.style.color = 'black';
      else
        av.dom.sizeColTest.style.color = 'red';
      if (rowNum > 0 && rowNum <= 100)
        av.dom.sizeRowTest.style.color = 'black';
      else
        av.dom.sizeRowTest.style.color = 'red';
      av.dom.sizeCellTest.style.color = 'red';
      console.log('not valid; col, row=', colNum, rowNum);
      av.dom.sizeCellTest.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be greater than zero. ';
        console.log('<0');
      }
      if (colNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be 100 or less. ';
        console.log('>0');
      }
      if (isNaN(colNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be a valid number. ';
        console.log('==NaN');
      }
      if (rowNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be greater than zero. ';
        console.log('<0');
      }
      if (rowNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be 100 or less. ';
        console.log('>0');
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be a valid number. ';
        console.log('==NaN');
      }
    }
  };

  $(function slidemute() {
    /* because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED */
    /* the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, */
    /* so I multiplied by 100,000 to get 100.000% to come out even. */
    //console.log('before defaultslide value');
    var muteSlideDefault = 109861.;
    var muteVal;
    /* results in 2% as a default */
    var muteDefault = (Math.pow(Math.E, (muteSlideDefault / 100000)) - 1).toFixed(3);
    var slides = $('#muteSlide').slider({
      // range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 461512,
      slide: function (event, ui) {
        var muteVal = (Math.pow(Math.E, (ui.value / 100000)) - 1).toFixed(3);
        av.post.addUser('muteInput =' + muteVal, ' in AvidaED.js line 1855');
        //$( '#mRate' ).val( ui.value);  /*put slider value in the text above the slider */
        $('#muteInput').val(muteVal);
        /*put the value in the text box */
      }
    });
    /* initialize */
    //$( '#mRate' ).val( ($( '#muteSlide').slider( 'value' )));  //used in testing nonlinear scale
    $('#muteInput').val(muteDefault);
    /*update slide based on textbox */
    $('#muteInput').change(function () {
      //muteVal = 100000 * Math.log(1 + (parseFloat(this.value)));
      muteVal = parseFloat(this.value);
      slides.slider('value', muteVal);
      $('#mRate').val(muteVal);


      //Not sure the section below does anything expcept example about debug data collection.
      av.post.data1 = {
        'changed': 'muteInput',
        'muteInput': muteVal.formatNum(1)
      };
      av.post.data2 = {
        'operation': 'assign',
        'object': ['muteInput'],
        'value': [muteVal.formatNum(1)]
      };
      av.post.data = {
        'operation': 'assign',
        'name': 'muteInput',
        'vars': ['muteInput', 'person'],
        'value': [muteVal.formatNum(1), 'fred']
      };

      av.post.data = {
        'operation': 'button',
        'name': 'runPause',
        'vars': {'update': 5},
        'assumptions': {'av.dom.runStopButton.textContent': 'Run'}
      };
      av.post.data = {
        'operation': 'DojoDnd',
        'name': 'fz2Grid',
        'vars': {'source': 'av.dnd.fzOrgan', 'nodeDir': 'g0', 'target': 'av.dnd.popGrid', 'xGrid': 4, 'yGrid': 9},
        //// need dom Id associated with @ancestor.
        'assumptions': {'nodeName': '@ancestor'}    //condition, constraint
      }
      //usr:
      av.post.addUser('muteInput =' + muteVal.formatNum(1), ' in AvidaED.js line 1865');
      av.post.usrOneline(av.post.data, 'in AvidaED.js line 1868');
      //console.log('in mute change');

    });
  });

  dojo.connect(dijit.byId('childParentRadio'), 'onClick', function () {
    av.post.addUser('Button: childParentRadio');
  });

  dojo.connect(dijit.byId('childRandomRadio'), 'onClick', function () {
    av.post.addUser('Button: childRandomRadio');
  });

  dojo.connect(dijit.byId('notose'), 'onClick', function () {
    av.post.addUser('Button: notose = ' + dijit.byId('notose').get('checked').toString());
  });


  dojo.connect(dijit.byId('andose'), 'onClick', function () {
    av.post.addUser('Button: andose = ' + dijit.byId('andose').get('checked').toString());
  });

  dojo.connect(dijit.byId('orose'), 'onClick', function () {
    av.post.addUser('Button: orose = ' + dijit.byId('orose').get('checked').toString());
  });

  dojo.connect(dijit.byId('norose'), 'onClick', function () {
    av.post.addUser('Button: norose = ' + dijit.byId('norose').get('checked').toString());
  });

  dojo.connect(dijit.byId('equose'), 'onClick', function () {
    av.post.addUser('Button: equose = ' + dijit.byId('equose').get('checked').toString());
  });

  dojo.connect(dijit.byId('nanose'), 'onClick', function () {
    av.post.addUser('Button: nanose = ' + dijit.byId('nanose').get('checked').toString());
  });

  dojo.connect(dijit.byId('ornose'), 'onClick', function () {
    av.post.addUser('Button: ornose = ' + dijit.byId('ornose').get('checked').toString());
  });

  dojo.connect(dijit.byId('andnose'), 'onClick', function () {
    av.post.addUser('Button: andnose = ' + dijit.byId('andnose').get('checked').toString());
  });

  dojo.connect(dijit.byId('xorose'), 'onClick', function () {
    av.post.addUser('Button: xorose = ' + dijit.byId('xorose').get('checked').toString());
  });

  dojo.connect(dijit.byId('experimentRadio'), 'onClick', function () {
    av.post.addUser('Button: experimentRadio');
  });

  dojo.connect(dijit.byId('demoRadio'), 'onClick', function () {
    av.post.addUser('Button: demoRadio');
  });

  dojo.connect(dijit.byId('manualUpdateRadio'), 'onClick', function () {
    av.post.addUser('Button: manualUpdateRadio');
    av.ui.autoStopFlag = false;
  });

  dojo.connect(dijit.byId('autoUpdateRadio'), 'onClick', function () {
    av.post.addUser('Button: autoUpdateRadio');
    av.ui.autoStopFlag = true;
  });

  av.dom.autoUpdateOnce.onchange = function () {
    av.post.addUser('Spinner: autoUpdateOnce = ' + av.dom.autoUpdateOnce.value);
    av.ui.autoStopValue = av.dom.autoUpdateOnce.value;
    //console.log('autoUpdateOnce=', av.dom.autoUpdateOnce.value);
  };


  dojo.connect(dijit.byId('manualUpdateRadiTest'), 'onClick', function () {
    av.post.addUser('Button: manualUpdateRadiTest');
    av.ui.autoStopFlag = false;
  });

  dojo.connect(dijit.byId('autoUpdateRadiTest'), 'onClick', function () {
    av.post.addUser('Button: autoUpdateRadiTest');
    av.ui.autoStopFlag = true;
  });


  dojo.connect(dijit.byId('autoUpdateSpinneTest'), 'onChange', function () {
    av.post.addUser('Spinner: autoUpdateOnce = ' + av.dom.autoUpdateOnce.value);
    av.ui.autoStopValue = dijit.byId('autoUpdateSpinneTest').get('value');
    //console.log('autoUpdateOnce=', av.dom.autoUpdateOnce.value);
  });

  /* *************************************************************** */
  /* Organism page script *********************************************/
  /* *************************************************************** */
  /* **** Organism Setup Dialog */

  //process button to hide or show Organism detail panel: this button moved to population as it is using the same button:
  
  //adjust instruction text size
  av.ui.adjustOrgInstructionTextAreaSize = function() {
    var height = ( $('#orgInfoHolder').innerHeight() - $('#orgDetailID').innerHeight() - 10 ) / 2;
    console.log('orgInfoHolder.ht=', $('#orgInfoHolder').innerHeight(), '; orgDetailID=',$('#orgDetailID').innerHeight(), '; height=', height);
    av.dom.ExecuteJust.style.height = height + 'px';  //from http://stackoverflow.com/questions/18295766/javascript-overriding-styles-previously-declared-in-another-function
    av.dom.ExecuteAbout.style.height = height + 'px';
    av.dom.ExecuteJust.style.width = '100%';
    av.dom.ExecuteAbout.style.width = '100%';    
  };
  

  $(function slideOrganism() {
    /* because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED */
    /* the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, */
    /* so I multiplied by 100,000 to get 100.000% to come out even. */
    //console.log('before defaultslide value');
    var muteSlideDefault = 109861.;
    /* results in 2% as a default */
    var muteDefault = (Math.pow(Math.E, (muteSlideDefault / 100000)) - 1).toFixed(3);
    var slides = $('#orMuteSlide').slider({
      // range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 461512,
      slide: function (event, ui) {
        //$( '#orMRate' ).val( ui.value);  /*put slider value in the text near slider */
        $('#orMuteInput').val((Math.pow(Math.E, (ui.value / 100000)) - 1).toFixed(3));
        /*put the value in the text box */
        av.ind.settingsChanged = true;
        if (av.debug.trace)
          console.log('orSlide changed', av.ind.settingsChanged);
      }
    });
    /* initialize */
    //$( '#orMRate' ).val( ($( '#orMuteSlide').slider( 'value' )));
    //$( '#orMuteInput' ).val(muteDefault+'%');
    $('#orMuteInput').val(muteDefault);
    /*update slide based on textbox */
    
    $('#orMuteInput').change(function () {
      slides.slider('value', 100000.0 * Math.log(1 + (parseFloat(this.value))));
      av.ind.settingsChanged = true;
      if (av.debug.trace)
        console.log('orMute changed', av.ind.settingsChanged);
      //$( '#orMRate' ).val( 100000*Math.log(1+(parseFloat(this.value))) );
      console.log('in mute change');
      av.post.addUser('muteInput =' + dijit.byId('orMuteInput').get('value') + '1949');
    });
  });

  //triggers flag that requests more data when the settings dialog is closed.
  //http://stackoverflow.com/questions/3008406/dojo-connect-wont-connect-onclick-with-button
  dojo.connect(dijit.byId('OrganExperimentRadio'), 'onClick', function () {
    av.post.addUser('Button: OrganExperimentRadio');
    av.ind.settingsChanged = true;
  });
  dojo.connect(dijit.byId('OrganDemoRadio'), 'onClick', function () {
    av.ind.settingsChanged = true;
    av.post.addUser('Button: OrganDemoRadio');
  });

  // ****************************************************************
  //        Menu buttons that call for genome/Organism trace
  // ****************************************************************
  dijit.byId('mnCnOrganismTrace').on('Click', function () {
    av.post.addUser('Button: mnCnOrganismTrace');
    av.mouse.traceSelected(av.dnd, av.fzr, av.grd);
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize();
    av.ui.adjustOrgInstructionTextAreaSize();
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  });

  //Put the offspring in the parent position on Organism Trace
  dijit.byId('mnCnOffspringTrace').on('Click', function () {
    //Open Oranism view
    av.post.addUser('Button: mnCnOffspringTrace');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize();
    av.ui.adjustOrgInstructionTextAreaSize();
    offspringTrace(av.dnd, av.fio, av.fzr, av.gen);
  });

  /* ****************************************************************/
  /*                  Canvas for Organsim View (genome)
   /* ************************************************************** */

  av.gen = av.ind.clearGen(av.gen);
  //set canvas size; called from many places
  av.ind.organismCanvasHolderSize = function() {
    av.dom.organCanvas.width = $('#organismCanvasHolder').innerWidth() - 6;
    av.dom.organCanvas.height = $('#organismCanvasHolder').innerHeight() - 12;
  };

  av.ind.updateOrgTrace = function (from) {
    console.log(from, 'called av.ind.updateOrgTrace: av.traceObj=', av.traceObj.length);
    //console.log('av.ind.cycle', av.ind.cycle);
    av.ind.organismCanvasHolderSize();
    //if (undefined == av.traceObj[av.ind.cycle]) console.log('its undefined');
    if (!(undefined == av.traceObj || {} == av.traceObj || undefined == av.traceObj[av.ind.cycle])) {
      av.ind.didDivide = av.traceObj[av.ind.cycle].didDivide; //update global version of didDivide
      av.ind.updateOrganTrace(av.traceObj, av.gen);
    } else
      av.ind.didDivide = false;
  };
  
  /* ******************************************************************************************************************/
  /*                                 End of Canvas to draw genome and update details
  /* ******************************************************************************************************************/

  /* ************************************** Controls bottum of organism page ******************************************/
  
  //wonder if this does anything.
  function outputUpdate(vol) {
    document.querySelector('#orgCycle').value = vol;
  }

  //need something so it does not go before begin of organism. 
  document.getElementById('orgBack').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    if (av.ind.cycleSlider.get('minimum') < av.ind.cycleSlider.get('value')) {
      ii--;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      av.ind.updateOrgTrace('orgBack_onclick');
    }
    av.post.addUser('Button: orgBack; cycle = ' + ii);
  };

  //Need something to check that it does not go past end of organism. 
  document.getElementById('orgForward').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    if (av.ind.cycleSlider.get('maximum') > av.ind.cycleSlider.get('value')) {
      ii++;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      if (av.debug.ind)
        console.log('ii', ii, '; gen', av.gen);
      av.ind.updateOrgTrace('orgForward_onclick');
    }
    av.post.addUser('Button: orgForward; cycle = ' + ii);
  };

  document.getElementById('orgReset').onclick = function () {
    av.post.addUser('Button: orgReset');
    av.msg.doOrgTrace();
  };

  av.ind.orgRunFn = function () {
    if (av.ind.cycleSlider.get('maximum') > av.ind.cycleSlider.get('value')) {
      av.ind.cycle++;
      av.dom.orgCycle.value = av.ind.cycle;
      av.ind.updateOrgTrace('orgRunFn');
    } else {
      av.ind.orgStopFn();
    }
  };

  //Broken; does not work; tiba; help
  document.getElementById('orgRun').onclick = function () {
    if ('Run' == document.getElementById('orgRun').textContent) {
      document.getElementById('orgRun').textContent = 'Stop';
      av.ind.update_timer = setInterval(av.ind.orgRunFn, 100);
      av.post.addUser('Button: orgRun = stop; cycle = ' + av.ind.cycleSlider.get('value'));
    } else {
      av.ind.orgStopFn();
      av.post.addUser('Button: orgRun = run; cycle = ' + av.ind.cycleSlider.get('value'));
    };
  };

  document.getElementById('orgEnd').onclick = function () {
    av.post.addUser('Button: orgEnd');
    av.dom.orgCycle.value = av.ind.cycleSlider.get('maximum');
    av.ind.cycle = av.ind.cycleSlider.get('maximum');
    av.ind.updateOrgTrace('orgEnd_onclick');
    av.ind.orgStopFn();
  };

  document.getElementById('orgCycle').onchange = function (value) {
    av.ind.cycleSlider.set('value', value);
    av.ind.cycle = value;
    //console.log('orgCycle.change');
    av.ind.updateOrgTrace('orgCycle_onChange');
  };

  /* Organism Offspring Cost Slider */
  av.ind.cycleSlider = new HorizontalSlider({
    name: 'cycleSlider',
    value: 0,
    minimum: 0,
    maximum: 2,
    diabled: true,
    intermediateChanges: true,
    discreteValues: 3,
    style: 'width:100%;',
    onChange: function (value) {
      document.getElementById('orgCycle').value = value;
      av.ind.cycle = value;
      //console.log('cycleSlider');
      av.ind.updateOrgTrace('av.ind.cycleSlider');
    }
  }, 'cycleSlider');

  //********************************************************************************************************************
  // Resize window helpers -------------------------------------------
  //********************************************************************************************************************
  if (av.debug.root)
    console.log('before Resize helpers');

  av.removeVerticalScrollBars = function () {
    if (av.debug.uil)
      console.log('documentElement Ht, scroll client', document.documentElement.scrollHeight,
        document.documentElement.clientHeight);
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      document.documentElement.style.height = document.documentElement.clientHeight + 'px';
    };

    //initialize the ht for main buttons and trash can so there is no scroll bar
    if (av.dom.mainButtons.scrollHeight > av.dom.mainButtons.clientHeight) {
      av.dom.mainButtons.style.height = av.dom.mainButtons.scrollHeight + 'px';
    };
    if (av.debug.uil)
      console.log('trashDivHt.client,scroll=', av.dom.trashDiv.clientHeight, av.dom.trashDiv.scrollHeight);
    if (av.dom.trashDiv.scrollHeight > av.dom.trashDiv.clientHeight) {
      av.dom.trashDiv.style.height = av.dom.trashDiv.scrollHeight + 'px';
    };
    if (av.dom.orgTopId.scrollHeight > av.dom.orgTopId.clientHeight) {
      av.dom.orgTopId.style.height = av.dom.orgTopId.scrollHeight + 'px';
    };
    if (av.debug.uil)
      console.log('orgBot Ht', av.dom.orgBotId.scrollHeight, av.dom.orgBotId.clientHeight);
    if (av.dom.orgBotId.scrollHeight > av.dom.orgBotId.clientHeight) {
      av.ui.orgBotIdNum = av.dom.orgBotId.scrollHeight + 9;
      av.dom.orgBotId.style.height = av.ui.orgBotIdNum + 'px';
    };
  };

  //on 2018_0823 this is where height gets messed up when loading the program. 
  av.pch.divSize = function (from) {
    //console.log(from, 'called av.pch.divSize');
    //av.debug.uil = true;
    if (av.debug.uil)
      console.log('popChrtHolder css.wd ht border padding margin=', $("#popChrtHolder").css('width'), $("#popChrtHolder").css('height')
        , $("#popChrtHolder").css('border'), $("#popChrtHolder").css('padding'), $("#popChrtHolder").css('margin'));

    if (av.debug.uil)
      console.log('av.dom.popChrtHolder.ht offset, client ht=', av.dom.popChrtHolder.offsetHeight,
        av.dom.popChrtHolder.clientHeight, '; parseInt(padding)=', parseInt($("#popChrtHolder").css('padding'), 10));

    av.pch.ht = av.dom.popChrtHolder.clientHeight - 2 * parseInt($("#popChrtHolder").css('padding'), 10);
    av.pch.wd = av.dom.popChrtHolder.clientWidth - 2 * parseInt($("#popChrtHolder").css('padding'), 10);
    //console.log(from, 'called av.pch.divSize:', 'av.pch.wd=', av.pch.wd, '; av.pch.ht=', av.pch.ht);
    av.pch.layout.height = av.pch.ht;
    av.pch.layout.width = av.pch.wd;
    if (av.debug.uil)
      console.log('av.pch.wd ht=', av.pch.wd, av.pch.ht);
    if (av.debug.uil)
      console.log('av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height);

    //av.dom.popChrtHolder.style.width = av.dom.popChrtHolder.clientWidth + 'px';  //seems redundent  djb said to delete as of 2018_0827
    //av.dom.popChrtHolder.style.height = av.dom.popChrtHolder.clientHeight + 'px';  //seems redundent djb said to delete as of 2018_0827
    av.dom.popChart.style.height = av.pch.ht + 'px';
    av.dom.popChart.style.width = av.pch.wd + 'px';
    if (av.debug.uil)
      console.log('popChart css.wd, border, padding, margin=', $("#popChart").css('width'), $("#popChart").css('height')
        , $("#popChart").css('border'), $("#popChart").css('padding'), $("#popChart").css('margin'));
    if (av.debug.uil)
      console.log('av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight,
        av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'), 10));
    if (av.debug.uil)
      console.log('av.pch.wd ht=', av.pch.wd, av.pch.ht);
    if (av.debug.uil)
      console.log('av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height);
    //av.debug.uil = false;
  };

  av.anl.divSize = function (from) {
    if (av.debug.alo)
      console.log(from, 'called av.anl.divSize');
    //console.log(from,'anaChrtHolder Ht client scroll ', av.dom.anaChrtHolder.clientHeight, av.dom.anaChrtHolder.scrollHeight);
    //console.log(from,'anlDndChart Ht client scroll', av.dom.anlDndChart.clientHeight, av.dom.anlDndChart.scrollHeight);
    //console.log(from,'anlChrtSpace Ht client scroll', av.dom.anlChrtSpace.clientHeight, av.dom.anlChrtSpace.scrollHeight);

    if (av.debug.alo)
      console.log('av.dom.anaChrtHolder.clientWd, Ht=', av.dom.anaChrtHolder.clientWidth, av.dom.anaChrtHolder.clientHeight);
    av.anl.ht = av.dom.anaChrtHolder.clientHeight - 1;
    av.anl.wd = av.dom.anaChrtHolder.clientWidth - 1;
    av.dom.anaChrtHolder.style.height = av.anl.ht + 'px';
    av.anl.ht = av.dom.anaChrtHolder.clientHeight - 6;
    av.dom.anlChrtSpace.style.height = av.anl.ht + 'px';
    av.dom.anlChrtSpace.style.width = av.anl.wd + 'px';
    av.anl.layout.height = av.anl.ht;
    av.anl.layout.width = av.anl.wd;
  };

  // called from script in html file as well as below
  av.ui.browserResizeEventHandler = function (from) {
    if (true)
      console.log(from, 'called av.ui.browserResizeEventHandler');
    if ('none' !== domStyle.get('analysisBlock', 'display')) {
      av.anl.AnaChartFn();
    }
    if ('none' !== domStyle.get('populationBlock', 'display')) {
      //av.ui.resizePopLayout('av.ui.browserResizeEventHandler popBlock');  //does not work
      if (av.debug.uil)
        console.log('av.grd.canvasSize =', av.grd.canvasSize, '; av.dom.gridCanvas.width = ', av.dom.gridCanvas.width,
          '; av.dom.gridHolder.clientHeight=', av.dom.gridHolder.clientHeight);
      if (av.grd.need2DrawGrid) {
        av.grd.popChartFn('av.ui.browserResizeEventHandler');
        console.log('av.grd.need2DrawGrid=', av.grd.need2DrawGrid);
        //av.grd.drawGridSetupFn('av.ui.browserResizeEventHandler when pop=flex');
      }
    }
    if ('none' !== domStyle.get('organismBlock', 'display')) {
      var rd = $('#orgDetailID').innerHeight();
      av.ui.adjustOrgInstructionTextAreaSize();
      av.ind.updateOrgTrace('av.ui.browserResizeEventHandler');
    }
  };

  //console.log('before resize function');
  $(window).resize(function () {
    // av.ui.resizePopLayout('window.resize');    //does not work.
  });


  //This function does not work. make grid get larger and larger
  av.ui.resizePopLayout = function (from) {
    //console.log(from, 'called av.ui.resizePopLayout');
    var extraGridWd = 0;  //positive there is extra to distribute; negative need more space.
    var popSideWdSum = av.dom.navColId.offsetWidth + av.dom.popInfoHolder.offsetWidth;
    av.ui.allAvidaWd = av.dom.allAvida.offsetWidth;
    av.ui.navColIdWd = av.dom.navColId.offsetWidth;
    av.ui.mapHolderWd = av.dom.mapHolder.offsetWidth;
    av.ui.gridHolderWd = av.dom.gridHolder.offsetWidth;
    av.ui.popInfoHolderWd = av.dom.popInfoHolder.offsetWidth;

    av.ui.allAvidaHt = av.dom.allAvida.offsetHeight;
    av.ui.mapHolderHd = av.dom.mapHolder.offsetHeight;
    av.ui.popTopHd = av.dom.popTopRw.offsetHeight;
    av.ui.gridHolderHd = av.dom.gridHolder.offsetHeight;
    av.ui.popBotHd = av.dom.popBot.offsetHeight;

    //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
    //console.log('gridHolder_margin' ,$("#gridHolder").css("margin"), '; popChart=', $("#popChart").css('margin'));

    if (av.debug.uil)
      console.log('Wd: allAvida navColId mapHolder gridHolder popInfoHolder, sum', av.dom.allAvida.offsetWidth,
        av.dom.navColId.offsetWidth, av.dom.mapHolder.offsetWidth, av.dom.popInfoHolder.offsetWidth,
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.popInfoHolder.offsetWidth);
    if (av.debug.uil)
      console.log('Wd: popStatsBlock selOrgType sum', av.dom.popStatsBlock.offsetWidth, av.dom.selOrgType.clientWidth,
        av.dom.popStatsBlock.offsetWidth + av.dom.selOrgType.clientWidth);

    if (av.debug.uil)
      console.log('Ht; allAvida, mapHolder, popTopRw, gridHolder, popBot sum', av.dom.allAvida.offsetHeight,
        av.dom.mapHolder.offsetHeight, av.dom.popTopRw.offsetHeight, av.dom.gridHolder.offsetHeight,
        av.dom.popBot.offsetHeight, av.dom.popTopRw.offsetHeight + av.dom.gridHolder.offsetHeight + av.dom.popBot.offsetHeight);
    if (av.dom.gridHolder.offsetWidth > av.dom.gridHolder.offsetHeight && av.dom.gridHolder.offsetWidth > av.ui.popGridCtlWdMin) {
      //set grid size based on height and distribute extra width.
      extraGridWd = av.dom.gridHolder.offsetWidth - av.dom.gridHolder.offsetHeight;
      popSideWdSum = popSideWdSum + extraGridWd;
      if (av.debug.uil)
        console.log('av.dom.gridHolder.client.wd ht', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight);
      //av.dom.gridCanvas.width = av.dom.gridHolder.clientHeight;     //no style for canvas; style needed for div
      //av.dom.gridCanvas.height = av.dom.gridHolder.clientHeight;
      av.dom.gridCanvas.width = $("#gridHolder").height();     //no style for canvas; style needed for div
      av.dom.gridCanvas.height = $("#gridHolder").height();

      if (av.debug.uil)
        console.log('av.dom.gridCanvas.wd ht', av.dom.gridCanvas.width, av.dom.gridCanvas.height);
      if (av.debug.uil)
        console.log('av.dom.gridHolder.client.wd ht', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight);
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

  av.ui.chngPopWidth = function (from) {
    console.log(from, 'called av.ui.chngPopWidth');
    av.dom.popInfoHolder.style.width = popInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = popInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = popInfoHolderWd + 'px';
    av.dom.selOrgType.style.width = ((popInfoHolderWd / 2).toFixed(0)) + 'px';
  };

  av.ui.adjustpopInfoWd = function (adjustGridWd) {
    var popInfoHolderWd = av.dom.popInfoHolder.offsetWidth - adjustGridWd;  //adjustGridWd postive means Grid needs width
    if (av.debug.uil)
      console.log('popInfoHolderWd=', popInfoHolderWd, '; av.ui.popInfoHolderMinWd', av.ui.popInfoHolderMinWd);
    if (popInfoHolderWd < av.ui.popInfoHolderMinWd) {
      var navColWd = av.dom.navColId.offsetWidth;
      if (av.debug.uil)
        console.log("navColWd=", navColWd, '; popInfoHolderWd=', popInfoHolderWd, '');
      navColWd = (.33 * (navColWd + popInfoHolderWd)).toFixed(0);
      popInfoHolderWd = navColWd * 2;
      av.dom.navColId.style.width = navColWd + 'px';
      if (av.debug.uil)
        console.log('navColWd=', navColWd, '; popInfoHolderWd=', popInfoHolderWd, '; mapHolder=', av.dom.mapHolder.offsetWidth);
    }
    av.dom.popInfoHolder.style.width = popInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = popInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = popInfoHolderWd + 'px';
    popInfoHolderWd = (popInfoHolderWd / 2).toFixed(0); //Math.round(popInfoHolder/2);
    av.dom.selOrgType.style.width = popInfoHolderWd + 'px';
    if (av.debug.uil)
      console.log('set selOrgType to ', popInfoHolderWd + 'px');
    if (av.debug.uil)
      console.log('gridHolder.wd=', av.dom.gridHolder.offsetWidth, '; selOrgType.offsetWidth=', av.dom.selOrgType.offsetWidth);
  };

  //Adjust Statistics area width based on gridholder size and shape. gridholder should be roughly square
  av.ui.adjustpopInfoSize = function (from) {
    var adjustGridWd = 0;
    if (av.debug.uil)
      console.log('av.ui.adjustpopInfoSize was called from: ', from);
    if (av.debug.uil)
      console.log('gridHolder.wd=', av.dom.gridHolder.offsetWidth);
    if (av.debug.uil)
      console.log('navColId.wd=', av.dom.navColId.offsetWidth, '; mapHolder.wd=', av.dom.mapHolder.offsetWidth,
        '; popInfoHolder.wd=', av.dom.popInfoHolder.offsetWidth);
    if (av.debug.uil)
      console.log('allAvida=', av.dom.allAvida.offsetWidth, '; sum= ',
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.popInfoHolder.offsetWidth);
    if (av.debug.uil)
      console.log('popInfoHolder.offsetWidth, clientwidth =', av.dom.popInfoHolder.offsetWidth, av.dom.popInfoHolder.clientWidth);
    if (av.debug.uil)
      console.log('popStatsBlock.offsetWidth, clientwidth =', av.dom.popStatsBlock.offsetWidth, av.dom.popStatsBlock.clientWidth);
    if (av.debug.uil)
      console.log('selOrgType.offsetWidth, clientwidth =', av.dom.selOrgType.offsetWidth, av.dom.selOrgType.clientWidth);
    if (av.debug.uil)
      console.log('av.ui.popGridCtlWdMin=', av.ui.popGridCtlWdMin, '; gridHolder.offsetWidt=', av.dom.gridHolder.offsetWidth);
    if (av.dom.gridHolder.offsetWidth > av.dom.gridHolder.offsetHeight) {
      adjustGridWd = av.dom.gridHolder.offsetHeight - av.dom.gridHolder.offsetWidth; //adjustGridWd negative means grid holder is too wide.
      av.ui.adjustpopInfoWd(adjustGridWd);
    }
    if (av.ui.popGridCtlWdMin > av.dom.gridHolder.offsetWidth) {
      adjustGridWd = av.ui.popGridCtlWdMin - av.dom.gridHolder.offsetWidth;
      av.ui.adjustpopInfoWd(adjustGridWd);
    };
    if (av.debug.uil)
      console.log('gridHolder.wd=', av.dom.gridHolder.offsetWidth, '; selOrgType.offsetWidth=', av.dom.selOrgType.offsetWidth);
    if (av.debug.uil)
      console.log('navColId.wd=', av.dom.navColId.offsetWidth, '; mapHolder.wd=', av.dom.mapHolder.offsetWidth,
        '; popInfoHolder.wd=', av.dom.popInfoHolder.offsetWidth);
    if (av.debug.uil)
      console.log('allAvida=', av.dom.allAvida.offsetWidth, '; sum= ',
        av.dom.navColId.offsetWidth + av.dom.mapHolder.offsetWidth + av.dom.popInfoHolder.offsetWidth);

    if (av.debug.uil)
      console.log('popInfo.offsetWidth, clientwidth =', av.dom.popInfoHolder.offsetWidth, av.dom.popInfoHolder.clientWidth);
    if (av.debug.uil)
      console.log('popStatsBlock.offsetWidth, clientwidth =', av.dom.popStatsBlock.offsetWidth, av.dom.popStatsBlock.clientWidth);
    if (av.debug.uil)
      console.log('selOrgType.offsetWidth, clientwidth =', av.dom.selOrgType.offsetWidth, av.dom.selOrgType.clientWidth);

    av.dom.gridCanvas.style.width = (av.dom.gridHolder.clientHeight - 2) + 'px';
    av.dom.gridCanvas.style.height = av.dom.gridCanvas.offsetWidth + 'px';
    av.dom.scaleCanvas.style.width = (av.dom.gridControlTable.clientWidth - 1) + 'px';

    if (av.debug.uil)
      console.log('av.dom.gridHolder.clientWidth ht = ', av.dom.gridHolder.clientWidth, av.dom.gridHolder.clientHeight);
    if (av.debug.uil)
      console.log('==== av.dom.gridCanvas.width ht =', av.dom.gridCanvas.width, av.dom.gridCanvas.height);
  };

  // **************************************************************************************************************** */
  //                                                Analysis Page
  // **************************************************************************************************************** */

  // initialize needs to be in AvidaED.js
  av.anl.anaChartInit = function () {
    av.anl.divSize('anaChartInit');

    if (undefined !== av.dom.anlChrtSpace.data) {
      if (av.debug.plotly)
        console.log('before purge in init');
      av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2168';
      av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
      Plotly.purge(av.dom.anlChrtSpace);
      if (av.debug.plotly)
        console.log('after purge in init');
    }
    //Comment out the next three lines later
    var anaData = av.anl.data;
    if (av.debug.plotly)
      console.log('anlChrtPlotly in av.anl.anaChartInit');
    //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
    av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 2157';
    av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
    Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
    if (av.debug.plotly)
      console.log('after plot in av.anl.anaChartInit');

    //console.log('layout=', av.dom.anlChrtSpace.layout);
    av.dom.anlChrtSpace.style.visibility = 'hidden';
  };
  av.anl.anaChartInit();

  av.anl.AnaChartFn = function () {
    'use strict';
    var hasData = false;
    var hideChart = true;
    for (var ii = 0; ii < 3; ii++) {
      if (0 < document.getElementById('popDish' + ii).textContent.length)
        hasData = true;
    }
    if (!hasData)
      av.dom.anlChrtSpace.style.visibility = 'hidden';
    else {
      av.dom.anlChrtSpace.style.visibility = 'visible';
      //if ('populationBlock' === av.ui.page && av.ui.popStatFlag && undefined !== av.anl.logFit[1]) {
      if ('none' === document.getElementById('yLeftSelect').value && 'none' === document.getElementById('yRightSelect').value) {
        if (av.debug.plotly)
          console.log('both axis set to none');
        // hide chart see if this will work instead of purging. 
        if (hideChart) {
          av.dom.anlChrtSpace.style.visibility = 'visible';
        }
        // purge chart this was the old way.
        else if (undefined !== av.dom.anlChrtSpace.data) {
          console.log('before purge in anaChartFn');
          av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2205';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
          Plotly.purge(av.dom.anlChrtSpace);
          console.log('after purge in anaChartFn');
        }
      } else {
        if (av.debug.plotly)
          console.log('in AnaChartFn');
        av.anl.trace0.x = av.anl.xx.slice(0, av.anl.pop[0].left.length);
        av.anl.trace1.x = av.anl.xx.slice(0, av.anl.pop[0].right.length);
        av.anl.trace2.x = av.anl.xx.slice(0, av.anl.pop[1].left.length);
        av.anl.trace3.x = av.anl.xx.slice(0, av.anl.pop[1].right.length);
        av.anl.trace4.x = av.anl.xx.slice(0, av.anl.pop[2].left.length);
        av.anl.trace5.x = av.anl.xx.slice(0, av.anl.pop[2].right.length);
        av.anl.trace0.y = av.anl.pop[0].left;
        av.anl.trace1.y = av.anl.pop[0].right;
        av.anl.trace2.y = av.anl.pop[1].left;
        av.anl.trace3.y = av.anl.pop[1].right;
        av.anl.trace4.y = av.anl.pop[2].left;
        av.anl.trace5.y = av.anl.pop[2].right;
        av.anl.trace0.line.color = av.anl.color[0];
        av.anl.trace1.line.color = av.anl.color[0];
        av.anl.trace2.line.color = av.anl.color[1];
        av.anl.trace3.line.color = av.anl.color[1];
        av.anl.trace4.line.color = av.anl.color[2];
        av.anl.trace5.line.color = av.anl.color[2];
        av.anl.trace0.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish0').textContent;
        av.anl.trace1.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish0').textContent;
        av.anl.trace2.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish1').textContent;
        av.anl.trace3.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish1').textContent;
        av.anl.trace4.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish2').textContent;
        av.anl.trace5.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish2').textContent;

        var anaData = [av.anl.trace0, av.anl.trace1, av.anl.trace2, av.anl.trace3, av.anl.trace4, av.anl.trace5];

        if (av.debug.plotly)
          console.log('av.anl.xx', av.anl.xx);
        if (av.debug.plotly)
          console.log('trace0', av.anl.trace0);

        av.anl.divSize('anaChartInit');
        av.anl.layout.height = av.anl.ht;
        av.anl.layout.width = av.anl.wd;
        av.anl.layout.yaxis.title = document.getElementById('yLeftSelect').value;
        av.anl.layout.yaxis2.title = document.getElementById('yRightSelect').value;
        if (av.debug.plotly)
          console.log('before purge in update');
        av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2249';
        av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
        Plotly.purge(av.dom.anlChrtSpace);
        if (av.debug.plotly)
          console.log('after plot anlChrtSpace');
        //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
        av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 2254';
        av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
        Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
        if (av.debug.plotly)
          console.log('after plot anlChrtSpace');
      }
    }
  };

  /* Chart buttons ****************************************/
  document.getElementById('pop0delete').onclick = function () {
    av.post.addUser('Button: pop0delete');
    av.anl.hasPopData[0] = false;
    av.anl.pop[0].left = [];
    av.anl.pop[0].right = [];
    av.anl.clearWorldData(0);
    av.dnd.popDish0.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn();
  };
  document.getElementById('pop1delete').onclick = function () {
    av.post.addUser('Button: pop1delete');
    av.anl.hasPopData[1] = false;
    av.anl.pop[1].left = [];
    av.anl.pop[1].right = [];
    av.anl.clearWorldData(1);
    av.dnd.popDish1.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn();
  };
  document.getElementById('pop2delete').onclick = function () {
    av.post.addUser('Button: pop2delete');
    av.anl.hasPopData[2] = false;
    av.anl.pop[2].left = [];
    av.anl.pop[2].right = [];
    av.anl.clearWorldData(2);
    av.dnd.popDish2.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn();
  };


  av.popColorOnClick = function (domObj) {
    var ndx = Number(domObj.id.substr(3, 1));
    console.log('domObj.id=', domObj.id, '; ndx=', ndx, '; domObj.value', domObj.value, '; av.color.names[]=', av.color.names[domObj.value]);
    av.anl.color[ndx] = av.color.names[domObj.value];
    av.post.addUser('Button:' + domObj.id);
    console.log('av.anl.color[ndx]=', av.anl.color[ndx]);
    av.anl.AnaChartFn();    //redraw chart which will get new color from dom
  };
  /*
   document.getElementById('pop0color').onclick = function () {
   av.anl.color[0] = av.color.names[document.getElementById('pop0color').value];
   av.post.addUser('Button: pop0color');
   av.anl.AnaChartFn();
   };
   document.getElementById('pop1color').onclick = function () {
   av.post.addUser('Button: pop1color');
   av.anl.color[1] = av.color.names[document.getElementById('pop1color').value];
   av.anl.AnaChartFn();
   };
   document.getElementById('pop2color').onclick = function () {
   av.post.addUser('Button: pop2color');
   av.anl.color[2] = av.color.names[document.getElementById('pop2color').value];
   av.anl.AnaChartFn();
   };
   */
  //Set Y-axis title and choose the correct array to plot
  document.getElementById('yLeftSelect').onclick = function () {
    av.post.addUser('Button: yLeftSelect = ' + document.getElementById('yLeftSelect').value);
    av.anl.yLeftTitle = document.getElementById('yLeftSelect').value;
    //need to get correct array to plot from freezer
    av.anl.loadSelectedData(0, 'yLeftSelect', 'left');  //numbers are world landing spots
    av.anl.loadSelectedData(1, 'yLeftSelect', 'left');
    av.anl.loadSelectedData(2, 'yLeftSelect', 'left');
    av.anl.AnaChartFn();
  };

  //dijit.byId('yRightSelect').on('Change', function () {
  document.getElementById('yRightSelect').onclick = function () {
    av.anl.yRightTitle = document.getElementById('yRightSelect').value;
    //need to get correct array to plot from freezer
    av.anl.loadSelectedData(0, 'yRightSelect', 'right');
    av.anl.loadSelectedData(1, 'yRightSelect', 'right');
    av.anl.loadSelectedData(2, 'yRightSelect', 'right');
    av.anl.AnaChartFn();
    av.post.addUser('Button: yRightSelect = ' + document.getElementById('yRightSelect').value);
  };

  // **************************************************************************************************************** */
  //Tasks that Need to be run when page is loaded and after chart is defined
  // **************************************************************************************************************** */

  //if (true) console.log('after chart defined for analysis page');
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

  av.ui.removeVerticalScrollbar = function (scrollDiv, htChangeDiv) {
    //https://tylercipriani.com/2014/07/12/crossbrowser-javascript-scrollbar-detection.html
    var scrollSpace = 0;
    if (0 <= window.jscd.os.indexOf('Win')) {
      scrollSpace = 17;
    }
    //if the two heights are different then there is a scroll bar
    var ScrollDif = document.getElementById(scrollDiv).scrollHeight - document.getElementById(scrollDiv).clientHeight;
    var hasScrollbar = 0 < ScrollDif;
    if (av.debug.uil)
      console.log('scroll', scrollDiv, hasScrollbar, document.getElementById(scrollDiv).scrollHeight,
        document.getElementById(scrollDiv).clientHeight, '; htChangeDiv=', document.getElementById(htChangeDiv).scrollHeight,
        document.getElementById(htChangeDiv).offsetHeight, document.getElementById(htChangeDiv).style.height);

    var divHt = document.getElementById(htChangeDiv).offsetHeight;
    if (av.debug.uil)
      console.log('htChangeDiv is', htChangeDiv, '; divHt=', divHt);
    if (hasScrollbar) {
      if (null !== divHt) {
        var NewHt = divHt + 1 + scrollSpace + ScrollDif;  //add the ht difference to the outer div that holds this one
        //line below is where the height of the div actually changes
        if (av.debug.uil)
          document.getElementById(htChangeDiv).style.height = NewHt + 'px';
      }
      //redraw the screen
      //av.ui.mainBoxSwap(page);
      //if (av.debug.root) 
      if (av.debug.uil) {
        console.log('Afterscroll', hasScrollbar, document.getElementById(scrollDiv).scrollHeight,
          document.getElementById(scrollDiv).clientHeight, '; htChangeDiv=', document.getElementById(htChangeDiv).scrollHeight,
          document.getElementById(htChangeDiv).offsetHeight, document.getElementById(htChangeDiv).style.height);
      }
      ;
    }
  };

  //Tiba - put back soon
  //av.ui.removeVerticalScrollbar('popStats4grid', 'popStatistics');
  //av.ui.removeVerticalScrollbar('popBot', 'popBot');

  // **************************************************************************************************************** */
  //                                          Last things done
  // **************************************************************************************************************** */
  // Do this after all other is done; end of file
  //must create the rest of the resource/reaction user interface before calling av.sgr.ChangeAllGeo('Global');
  av.sgr.buildHtml();

  av.ui.ex1setSugarColors();   //example 1     //delete later

  //av.ui.removeVerticalScrollbar('popTopRw', 'popTopRw');
  
  // * offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
  // * clientWidth = box + 2*padding - scrollbar_width    
  // * scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
  // * csssWidth = box only nothing else
  console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
    av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
    $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );

  console.log('before mainBoxSwap');
  av.ui.mainBoxSwap('populationBlock');  // just uncommented jan 2019
  av.dom.popStatsBlock.className = 'labInfoClass labInfoNone';
  av.dom.setupBlock.className = 'labInfoClass labInfoFlex';

  av.doj.mnDebug.style.visibility = 'visible';   // set visiable so that av.ui.toggleDevelopentDisplays will hide debuts stuff

  // Avida-ED 4.0.0 Alpha Testing fix this too. 
  //true when diane is working; false for all production releases even in alpha testsing.  
  if (false) {
    console.log('testing mode; set to true before public release for Avida-ED 4.0.0 Alpha Testing. ');
    //av.dom.xorLabel.onclick();   now only turns grid resource value table on and off
    //
    //set mmDebug to hidden so that when toggle called it will show the development sections 
    av.doj.mnDebug.style.visibility = 'hidden';   //visible
  };
  av.ui.toggleDevelopentDisplays('Last_things_done');
  av.ptd.rightInfoPanelToggleButton(av.dom.StatsButton);
  av.sgr.ChangeAllGeo('Global');
  av.sgr.setSugarColors(true);  //true is to turn colors on;
  av.sgr.ChangeAllsugarSupplyType('Infinite');
  av.sgr.OpenCloseAllSugarDetails('allClose', 'Last things done');
  
  // May need to do some things here to get the app to look right on the screen. 
  //av.grd.popChartFn();
  //av.grd.drawGridSetupFn('initial background'); //Draw initial background

  //Safari 9 will not allow saving workspaces or freezer items.  This is old from when Safari did not allow saving.
  //if (av.brs.isSafari) {
  if (false) {
    userMsgLabel.textContent = 'Safari 9 does not allow saving a workspace or freezer items. Please use Firefox or Chrome';
    dijit.byId('mnFlSaveWorkspace').attr('disabled', true);
    dijit.byId('mnFlSaveWorkspace').attr('disabled', true);
    dijit.byId('mnFlSaveAs').attr('disabled', true);
  };

// should be none;
  console.log('av.dom.testSetupBlock.display=', av.dom.testSetupBlock.display);

  // 

  // **************************************************************************************************************** */
  //                                          Useful Generic functions
  // **************************************************************************************************************** */

  //Modulo that is more accurate than %; Math.fmod(aa, bb);
  Math.fmod = function (aa, bb) {
    return Number((aa - (Math.floor(aa / bb) * bb)).toPrecision(8));
  };

  //http://nelsonwells.net/2011/10/swap-object-key-and-values-in-javascript/
  av.ui.invertHash = function (obj) {
    var new_obj = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        new_obj[obj[prop]] = prop;
      }
    }
    return new_obj;
  };
});

//------- not in use = example
//var hexColor = av.ui.invertHash(av.color.names);
//var theColor = hexColor['#000000'];  //This should get 'Black'
//console.log('theColor=', theColor);

//--------------------------------------------------------------------------------------------------------------------
//Notes on things I learned writing this code, that is not directly used in the code
//use FileMerge to compare to versions of the same file on a Mac
//js fiddle of dragging image to cavans and dragging it around http://jsfiddle.net/XU2a3/41/

//Use Meld to compare two folders worth of stuff. Evoke from a terminal prompt. Does not seem to be be in applications folder

//http://dojo-toolkit.33424.n3.nabble.com/dojo-dnd-problems-selection-object-from-nodes-etc-td3753366.html
//This is supposed to select a node; lists as selected programatically, but does not show up on screen.

//A method to distinguish a av.mouse click from a av.mouse drag
//http://stackoverflow.com/questions/6042202/how-to-distinguish-av.mouse-click-and-drag

//A method to get the data items in a dojo DND container in order
//av.dnd.fzConfig.on('DndDrop', function(source, nodes, copy, target){  //This triggers for every dnd drop, not just those of freezeConfigureNode
//http://stackoverflow.com/questions/5837558/dojo-drag-and-drop-how-to-retrieve-order-of-items
//var orderedDataItems = av.dnd.fzConfig.getAllNodes().map(function(node){
//  return av.dnd.fzConfig.getItem(node.id).data;
//});
//console.log('orderedDataItems', orderedDataItems);
/*
 var matches = function (aa, bb) {
 if (aa[0] == bb[0] && aa[1] == bb[1]) return true;
 else return false;
 }
 });
 */

// Web sites that looked useful for some task
/* Capture Close event
 http://stackoverflow.com/questions/1631959/how-to-capture-the-browser-window-close-event
 http://stackoverflow.com/questions/5712195/js-listen-when-child-window-is-closed
 
 Single page app
 http://singlepageappbook.com/detail1.html
 */


/* Charting packages
 
 Reviews
 https://iprodev.com/39-javascript-chart-and-graph-libraries-for-developers/
 http://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries/#gref
 http://www.sitepoint.com/15-best-javascript-charting-libraries/
 
 Good zooming and point value pop-up
 http://dygraphs.com/
 http://jsfiddle.net/eM2Mg/
 
 Charles likes -
 http://c3js.org/
 http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
 http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e
 
 real time grapsh shift data over
 https://square.github.io/cubism/
 https://bost.ocks.org/mike/cubism/intro/#10
 
 other
 http://www.flotcharts.org/flot/examples/
 
 */

//http://maffelu.net/jquery-handle-left-click-right-click-and-double-click-at-the-same-time/
// I just had to handle a left-click, right-click and a dbl-click at the same time which turned
// out to be a bit tricky at first using just the mousedown function, but the solution was simple:
/*$('#Foo')
 .click(function() //Left click
 {
 //Do something
 })
 .mousedown(function(e) //Right click
 {
 if(e.which == 3) //1: left, 2: middle, 3: right
 {
 //Do something
 }
 })
 .dblclick(function() //Double click
 {
 //Do something
 });
 */

/*
 formating tables = http://www.the-art-of-web.com/html/table-markup/
 */

/* How to make a .gif file.
 To make a gif using screen capture
 http://osxdaily.com/2013/08/23/record-screen-animated-gif-mac-os-x/
 A web application reverses a GIF.
 http://gifmaker.me/reverser/
 */

/* Border order   
 *  
 *  border-color: red;  //all four borders are the same color taht is red
 *  border-color: red blue;  //Top and bottom borders = red; left and right = blue
 *  border-color: red blue green; //Top=red  left &  right = blue;   bottom = green
 *  border-color: red blue green yellow //top=red;  right=blue;   bottom=green   left=yellow
 * 
 */

/* dom box model and size info   
 * https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
 * There is a nested set of boxes with every div
 * margin
 *   border
 *     padding
 *       box (with actual content or guts
 * the size of stuff around the box gets added twice, once for each side
 * 
 * offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
 * clientWidth = box + 2*padding - scrollbar_width    
 * scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
 * csssWidth = box only nothing else
 * 
 * scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth
 *  
 */
// get css values
//     //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
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
// 
// 
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modal Dialog Popup
// 
// https://www.webdesignerdepot.com/2012/10/creating-a-modal-window-with-html5-and-css3/
// http://webreference.com/js/column90/2.html
// https://jqueryhouse.com/30-best-jquery-modal-dialog-boxes/
// https://www.sitepoint.com/14-jquery-modal-dialog-boxes/
// https://www.sitepoint.com/14-jquery-modal-dialog-boxes/
// https://www.w3schools.com/howto/howto_css_modals.asp
// 
// other dialog boxes premade
// https://www.w3schools.com/js/js_popup.asp
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User interface - Responsive Web design
// 
// https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/
// https://www.w3schools.com/css/css_rwd_intro.asp
// https://www.w3schools.com/html/html_responsive.asp
// 
// very wordy https://alistapart.com/article/responsive-web-design
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Git Hub
// https://github.com/DBlackwood/av_ui/branches
// 
/* Bits of html that I might use later. Stored here because comments are not as reliable in html as they are in javacript 
 * 
 
 <details class='debugDetails' id='fzMdishDetails'>
 <summary id='fzMdishSec' class="freezerSection">Multi-Dishes</summary>
 <ul id='fzMdish' class='container'>
 </ul>
 </details>
 <details class='debugDetails' id='fzRdishDetails'>
 <summary id='fzRdishSec' class="freezerSection">Resource setup</summary>
 <ul id='fzRdish' class='container'>
 </ul>
 </details>
 
 *
 */

//Tabs could be used in the header row for the page buttons. Formated like the tabs on the info pannel for populaton page
/*
 <div id='headerTabs'>
 <span>Population Tab</span>
 <span>Organism Tab</span>
 <span>Analysis Tab</span>
 </div>
 
 */