
 // this version uses grid box layout for major sections (toop, left side, main, right side)  
 // if (av.dbg.flg.root) { console.log('Root: avidaED.js at beginning of file on 2020_0111 @ 20:21'); };
 console.log('Root: avidaED.js at beginning of file on 2021_218'); 

// need a server to run Avida-ED from a file. The one below works.
// python -m SimpleHTTPServer 
// python -m SimpleHTTPServer 8001  to put on 8001 instead of 8000
// Then visit 
// pouchDB requied a server to run, but no longer using pouchDB, but still using the server. 
//
// Using NetBeans as IDE in 2019 Different versions exists see
// https://netbeans.apache.org/download/archive/index.html
//
//----------------------------------------------------------------------------------------------------------------------
// Ideally I would have listed the hashtag or the complied version of Avida that goes with each veersion of Avida-ED
//  - in reality this did not happen. Or if at least I had thee ID of the commit on github that would have been good.
//  - the instructions below are supposed to tell one how to get a hash number for compiled emspcripten, but I'm not
//    really sure what the instructions mean. 
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
// 4814740943 this might be the hash number for avida.js, but not sure
//
// Versions -------------------------------------------------------------------------------------------------------
// The main change are the limited Resources
//
// The main function change from Avida-ED 3 to four is the addition of limited and gird (local) resources
// Layout was changed on Population Page 
// all files in tthe workspace now have a three letter sufix; *.txt was added to those missing a suffix
//
// Generic Notes -------------------------------------------------------------------------------------------------------
//
// [option]<alt>{go} to get library in the list for finder
//
// to have chrome run from file
///Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
////
// Path in TX for Filezilla /var/www/vhosts/bwng/public_html/projects/Avida-ED
//                          /var/www/vhosts/bwng/public_html/projects/
//
// Dreamweaver no longer in use ----------------------------------------------------------------------------------------
//
// for things on Darwin (dream weaver site)
// ssh -l diane darwin.beacon.msu.edu/html
// var/sites/Avida-ED.msu.edu
// emacs home.html
//
// to get to mac files on parallels
// net use z: \\Mac\Home
//
//----------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------- Problems --
//  
//  Population Page -------
//  
//  the avidaDataRecorder.csv does not export correctly, but is created correctly when the population is frozen
//  
//  In the environment.cfg file I wrote, I put one unit or resouce in each cell for grid; infinite. I need to have 
//  the same amount of resouce as in the default so it will default to the corret courrect amount if the user changes from 
//  infimite to finite in the UI. 
//  
//  I think it will write to have the default amount of resource for that region. 
//  
//  Looking at loading default files and perhaps we need to add default values for finite when finite is selected even 
//  there is no finite in the config file. 
//  
//  Oraganism Page -------
//  
//  
//  Analysis page
//  
//  Fix av.anl.widg = {   statement on globals in Avida-ED 3.2 to match the one in Avida-ED-4 ecology
//  
//----------------------------------------------------------------------------------------------------------------------
// 

// if (av.dbg.flg.root) { console.log('Root: before require statement'); }
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
  //next line from avidaEdEco.html
  //            {'name':'jquery','location':'../jquery/dist','main':'jquery'},   // older version
  'jquery',
  'jquery-ui',   //used primarily for the jquery slider. It can go away if the slider goes away. 
                // line from avidaEdEco.html        <link rel='stylesheet' href='lib/jquery-ui/themes/smoothness/jquery-ui.css'>
  //'lib/plotly-latest.min.js',   //updatd to plotly_v1.44.3.js on 2018_0915
  //'lib/plotly.js',               //version  plotly_v1.44.3   as of 2018
  //'lib/plotly-v1.53.min.js',      //2020_0409 production
  'lib/plotly-v1.53.js',      //2020_0409 development

  //'lib/jszip.min.js',        //older version. Not sure what version
  'lib/jszip-v2.6.1.js',        //need to update, but need to figure out update methods. 
  //'jszip-v3.3.0.js',         //current version on 2020_0404, but code changes needed that have not been done. development
  //'jszip-v3.3.0.min.js',     //current version on 2020_0404, but code changes needed that have not been done. production
  'lib/FileSaver_v1.1_date-2016_0328.js',
  //'lib/FileSaver-2.0.3/FileSaver.min.js',
  //'lib/FileSaver.js',
  //'avida-messages.js',
  'messaging.js',
  'initializeDomReadyItems.js',
  'fileDataRead.js',
  'fileDataWrite.js',
  'fileIO.js',
  'populationGrid.js',
  'organismView.js',
  'dojoDnd.js',
  'popControls.js',
  'mouse.js',
  'mouseDown.js',
  'environment2UI.js',
  'sugar_ui.js',
  'reSizePageParts.js',
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
  if (av.dbg.flg.root) { console.log('before type of $'); }
  if (typeof $ != 'undefined') {
    // jQuery is loaded => print the version
    console.log('Jquery ($) is defined.');
    av.jqueryVersion = ($.fn.jquery);
  } else {
    console.log('Jquery ($) is not defined.');
  }
  if (av.dbg.flg.root) { console.log('after type of $'); }

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
      document.getElementById('appReloadDialog').style.display = 'show';
    }
  }, 121000);

  //initiallize default mouse shapes
  //av.mouse.getOriginalShapes(); only gets empty strings

  /********************************************************************************************************************/
  // if (av.dbg.flg.root) { console.log('Root: after splash screen code'); }
  // -------------------------------------------------------------------------------------------------------------------
  // Initialize variables that depend on files loaded in requirement statement
  // -------------------------------------------------------------------------------------------------------------------

  // if (av.dbg.flg.root) { console.log('Root: before av.dom.load'); };
  av.dom.load();

  av.dom.initilizeDigitData();
  av.dom.initilizeAnalizePage(); 


  // if (av.dbg.flg.root) { console.log('Root: before dnd definitions'); };
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
  
  // if (av.dbg.flg.root) { console.log('Root: before fzOrgan'); }
  av.dnd.fzOrgan = new dndSource('fzOrgan', {
    accept: ['g'], //g=genome
    copyOnly: true,
    singular: true,
    selfAccept: false
  });
  
  // if (av.dbg.flg.root) { console.log('Root: before fzWorld'); };
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

  av.dnd.ancestorBoTest = new dndSource('ancestorBoTest', {accept: ['g'], copyOnly: true, selfAccept: false});

  // if (av.dbg.flg.root) { console.log('Root: before organIcon'); }
  av.dnd.organIcon = new dndTarget('organIcon', {accept: ['g'], selfAccept: false});
  av.dnd.ancestorBox = new dndSource('ancestorBox', {accept: ['g'], copyOnly: true, selfAccept: false});
  av.dnd.gridCanvas = new dndTarget('gridCanvas', {accept: ['g']});
  av.dnd.trashCan = new dndSource('trashCan', {accept: ['c', 'g', 't', 'w'], singular: true});
  // if (av.dbg.flg.root) { console.log('Root: after trashCan'); }

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

  // if (av.dbg.flg.root) { console.log('Root: before activeOrgan'); }
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
  // if (av.dbg.flg.root) { console.log('Root: before call avida'); }
  //
  // if (av.dbg.flg.root) { console.log('Root: typeof(av.aww.uiWorker', typeof(av.aww.uiWorker)); }
  if (typeof (Worker) !== 'undefined') {
    //console.log('Worker type is not undefined');
    if (null === av.aww.uiWorker) {
      av.aww.uiWorker = new Worker('avida.js');
      //console.log('webworker created');
      av.debug.log += '\n     --note: av.aww.uiWorker was null, started a new webworker';
    } else { console.log('av.aww.uiWorker is not null'); }
  } 
  else {
    userMsgLabel.textContent = "Sorry, your browser does not support Web workers and Avida won't run";
  };

  //process message from web worker
  // if (av.dbg.flg.root) { console.log('Root: before dnd triggers'); }
  av.aww.uiWorker.onmessage = function (ee) {
    //console.log('avida_ee', ee);
    av.msg.readMsg(ee);
  };  // in file messaging.js

  // if (av.dbg.flg.root) { console.log('Root: before dnd triggers'); }
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

  // if (av.dbg.flg.root) { console.log('Root: before av.dnd.ancestorBox'); }
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
      if (av.debug.dnd) { console.log('landOrganIcon: s, t', source, target); }
      av.dnd.landOrganIcon(source, nodes, target);
      //Change to Organism Page
      av.ui.mainBoxSwap('organismBlock');
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.activeOrgan.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of activeOrgan
    if ('activeOrgan' === target.node.id) {
      if (av.debug.dnd) { console.log('activeOrgan: s, t', source, target); }
      av.dnd.makeMove(source, nodes, target);
      //av.dnd.landActiveOrgan(source, nodes, target);
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.organCanvas.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of organCanvas
    if ('organCanvas' === target.node.id) {
      if (av.debug.dnd) { console.log('landorganCanvas: s, t', source, target); }
      av.dnd.landorganCanvas(source, nodes, target);
      av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
    }
  });

  av.dnd.trashCan.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of trashCan
    if ('trashCan' === target.node.id) {
      var remove = {};
      remove.type = '';
      remove.dir = '';
      if (av.debug.dnd) { console.log('trashCan: s, t', source, target); }
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
      if (av.debug.dnd) { console.log('anlDndChart: s, t', source, target); }
      av.dnd.landAnlDndChart(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish0.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish0
    if ('popDish0' === target.node.id) {
      if (av.debug.dnd) { console.log('popDish0: s, t', source, target); }
      av.dnd.landpopDish0(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish1.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish1
    if ('popDish1' === target.node.id) {
      if (av.debug.dnd) { console.log('popDish1: s, t', source, target); }
      av.dnd.landpopDish1(av.dnd, source, nodes, target);
      av.anl.AnaChartFn();
    }
  });

  av.dnd.popDish2.on('DndDrop', function (source, nodes, copy, target) {//This triggers for every dnd drop, not just those of popDish2
    if ('popDish2' === target.node.id) {
      if (av.debug.dnd) { console.log('popDish2: s, t', source, target); }
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
        av.anl.wrld[0].left = [];       //remove lines from population 1
        av.anl.wrld[0].right = [];
        av.anl.AnaChartFn();
        break;
      case 'popDish1':
        av.post.addUser('DnD: delete_from: popDish1?');
        av.anl.wrld[1].left = [];       //remove lines from population 2
        av.anl.wrld[1].right = [];
        av.anl.AnaChartFn();
        break;
      case 'popDish2':
        av.post.addUser('DnD: delete_from: popDish2?');
        av.anl.wrld[2].left = [];       //remove lines from population 3
        av.anl.wrld[2].right = [];
        av.anl.AnaChartFn();
        break;
    }
  });

  /*  //kept only as an example of how to programatically add data to a dnd container
   av.dnd.fzWorld.insertNodes(false, [
   {data: 'm2w30u1000nand', type: ['w']},
   {data: 'm2w30u1000not', type: ['w']}
   ]);
   */

  //----------------------------------------------------------------------------------------------------------------------
  //                                    End of dojo based DND triggered functions
  //----------------------------------------------------------------------------------------------------------------------
  window.onbeforeunload = function (event) {
  console.log('window.onbeforeunload');
    if (!av.ui.sendEmailFlag) {
      if ('no' === av.fzr.saveState || 'maybe' === av.fzr.saveState) {
        return 'Your workspace may have changed sine you last saved. Do you want to save first?';

        //e.stopPropagation works in Firefox.
        if (event.stopPropagation) {
          event.stopPropagation();
          event.preventDefault();
        };
      };
    };
  };

   // if (av.dbg.flg.root) { console.log('Root: before Error Logging'); }
  //********************************************************************************************************************
  // Error logging
  //********************************************************************************************************************
  //--------------------------------------------------------------------------------------------------------------------
  //https://bugsnag.com/blog/js-stacktracess
  //http://blog.bugsnag.com/js-stacktraces
  window.onerror = function (message, file, line, col, error) {
    //console.log('in window.onerror 633');
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

    //console.log('inside Window.on_Error: before call problemWindow');
    av.ui.problemWindow('window.onerror');
  };

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
  
  // if (av.dbg.flg.root) { console.log('Root: defore av.ui.problemWindow'); }
  //process problme pop-up window
  av.ui.problemWindow = function (from) {
    //console.log(from, 'called av.ui.problemWindow 665');
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
    //console.log('postData=', av.debug.postData); 

    //Until we get sending data to database figure out. Switch between post and e-mail session log
    if (false) {
      //Need to be able to get rid of these three lines for postPost. will crash without them now.
      document.getElementById('sendLogModalID').style.display = "block";  //textarea must be visable first
      av.dom.sendLogTextarea.focus();   //must not be commented out or extra error
      document.getElementById('sendLogModalID').style.display = "none";   //sendLogDialog.hide();  
      av.post.sendWindow();
    }
    //e-mail in production version until database worked out.
    else {
      av.post.emailWindow();
    }
  };

  av.post.emailWindow = function () {
    //console.log('in av.post.emailWindow 708');
    av.dom.sendLogTextarea.textContent = av.debug.sendLogTextarea;
    av.dom.sendLogPara.textContent = av.debug.sendLogPara;

    //document.getElementById('postLogTextarea').textContent = av.debug.sendLogTextarea;
    //document.getElementById('postLogPara').textContent = av.debug.sendLogPara;

    document.getElementById('sendLogModalID').style.display = 'block';  //sendLogDialog.show();  //textarea must be visable first
    av.dom.sendLogTextarea.focus();
    av.dom.sendLogTextarea.select();  //https://css-tricks.com/snippets/javascript/auto-select-textarea-text/
  };
  
  document.getElementById('sendLogModalCancel').onclick = function(){
    document.getElementById('sendLogModalID').style.display = 'none';
  }
  
  //--------------------------------------------------------------------------------------------------------------------
    
  av.post.sendWindow = function () {
    console.log('in av.post.sendWindow; used for database; not email');
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
  
  window.addEventListener('error', function (evt) {
    console.log('In window.addEventListener: event listener 739', evt);
  });
  //--------------------------------------------------------------------------------------------
  //http://www.technicaladvices.com/2012/03/26/detecting-the-page-leave-event-in-javascript/
  //Cannot get custom message in Firefox (or Safari for now)
  

  on(document.getElementById('postPost'), 'click', function () {
    console.log('in on(document.getElementById(postPost)');
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
    
  

  //********************************************************************************************************************
  // Menu Buttons handling
  //********************************************************************************************s************************

  // if (av.dbg.flg.root) { console.log('Root: dijit test', dijit.byId('mnFlOpenDefaultWS')); }

  // if (av.dbg.flg.root) { console.log('Root: before mnFlOpenDefaultWS'); }
  dijit.byId('mnFlOpenDefaultWS').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlOpenDefaultWS');
    av.fio.useDefault = true;
    if ('no' === av.fzr.saveState) {
      sWSfDialog.show();  //Save WSfile Dialog box
    }
    else {
      av.fio.readZipWS(av.fio.defaultFname, false);  //loadConfigFlag = false = do not load config file
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
      av.fio.readZipWS(av.fio.defaultFname, false);  //loadConfigFlag = false = do not load config file
    }  
    //false = do not load config file
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
    if ('no' === av.fzr.saveState) {
      sWSfDialog.show();   //Need to change to include might be saved tiba fix
    }
    //else document.getElementById('inputFile').click();
    else {
      document.getElementById('putWS').click();  // calls av.fio.userPickZipRead
    }
  });

  //--------------------------------------------------------------------------------------------------------------------
  dijit.byId('mnFlFzItem').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlFzItem');
    av.fio.useDefault = false;
    //console.log('importFzrItem', importFzrItem);
    document.getElementById('importFzrItem').click();
  });

  //--------------------------------------------------------------------------------------------------------------------
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

  //--------------------------------------------------------------------------------------------------------------------
  // Save current workspace with a new name
  document.getElementById('mnFlSaveAs').onclick = function () {
    if (!av.brs.isSafari) {
      //if (true) {
      av.post.addUser('Button: mnFlSaveAs');
      var suggest = 'avidaWS.avidaWs.zip';
      if (av.fio.userFname) {
        if (0 < av.fio.userFname.length) { suggest = av.fio.userFname; }
      }
      av.fio.userFname = prompt('Choose a new name for your Workspace now', suggest);
      if (null !== av.fio.userFname) {
        av.fio.fzSaveCurrentWorkspaceFn();
      }  //fileIO.js
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  //Export csv data from current run.
  dijit.byId('mnFlExportData').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportData');
    av.fwt.writeCurrentCSV(av.fzr.actConfig.name + '@' + av.grd.popStatsMsg.update + '\n');
  });

  //--------------------------------------------------------------------------------------------------------------------
  //Export chart data from current run.
  dijit.byId('mnFlExportGraph').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportGraph');
    mnFlExportGraphDialog.show();
  });

  //--------------------------------------------------------------------------------------------------------------------
  //Save Stand alone applicaton.
  dijit.byId('mnFlStandAloneApp').on('Click', function () {
    'use strict';
    av.post.addUser('Button: mnFlExportGraph');
    mnFlStandAloneAppDialog.show();
  });

 //----------------------------------------- Testing & Development Tools that are hidden from from User .---------------
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
    // placeholder that was to return the cell ID in the grid; this was never done. 
    console.log('domobj=', domobj);
  };

  // if (av.dbg.flg.root) { console.log('Root: before Help drop down menu'); }
  //--------------------------------------------------------------------------------------------------------------------
  // Help Drop down menu buttons
  //--------------------------------------------------------------------------------------------------------------------

  dijit.byId('mnHpAbout').on('Click', function () {
    ///console.log('in Button: mnHpAbout.click');
    av.post.addUser('Button: mnHpAbout');
    av.clk.aboutAvidaED();
  });

  dijit.byId('mnAeAbout').on('Click', function () {
    av.post.addUser('Button: mnAeAbout');
    //console.log('in mnAeAbout.click');
    av.clk.aboutAvidaED();
  });

  // onclick='av.clk.aboutAvidaED'
  av.clk.aboutAvidaED = function() {
    av.post.addUser('Button: display About Avida-ED');
    document.getElementById('aboutAvidaED_ModalID').style.display = "block";
    console.log('in av.clk.aboutAvidaED');    
  };

  //document.getElementById('aboutAvidaED_Cancel').onclick = function () {
  av.ui.aboutAvidaED_Close = function() {
    document.getElementById('aboutAvidaED_ModalID').style.display = 'none';
  };

  dijit.byId('mnAePreferences').on('Click', function () {
    av.post.addUser('Button: mnAePreferences');
    //console.log('in mnAePreferences.click');
    document.getElementById('preferences_ModalID').style.display = "block";
  });

  
  av.sgr.complexityChange = function (domObj) {
    console.log('the complexity requested is:', domObj.value);
    av.sgr.complexityLevel = domObj.value;
    av.sgr.complexityChangeProcess('av.sgr.complexityChange');
  };
   
  av.ui.language = function (domObj) {
    av.ui.language = domObj.value;
    console.log('not yet implemented: the language requested is:', domObj.value);
  };
 
  av.ui.closePreferences = function () {
    document.getElementById('preferences_ModalID').style.display = 'none';
  };

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
    av.ui.problemWindow("dijit.byId('mnHpProblem').on('Click', function ()");
    // only shows one line = prompt('Please put this in an e-mail to help us improve Avida-ED: Copy to clipboard: Ctrl+C, Enter', '\nto: ' + av.fio.mailAddress + '\n' + av.debug.log);
  });

  //http://stackoverflow.com/questions/7080269/javascript-before-leaving-the-page
  document.getElementById('sendEmail').onclick = function () {
    av.ui.sendEmailFlag = true;
    av.post.addUser('Button: sendEmail');
    var link = 'mailto:' + av.fio.mailAddress +
      //'?cc=CCaddress@example.com' +
      '?subject=' + escape('Avida-ED session log') +
      '&body=' + escape(av.debug.log);
    window.location.href = link;
    av.ui.sendEmailFlag = false;
  };

/* 
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
*/

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

  //********************************************************************************************************************
  // main button scripts
  //********************************************************************************************************************

  //The style display: 'none' cannnot be used in the html during the initial load as the dijits won't work right
  //visibility:hidden can be used, but it leaves the white space and just does not display dijits.
  //So all areas are loaded, then the mainBoxSwap is called to set display to none after the load on all but
  //the default option.
  // if (av.dbg.flg.root) { console.log('Root: before av.ui.mainBoxSwap defined'); }
  av.ui.mainBoxSwap = function (showBlock) {
    //console.log('showBlock=', showBlock);
    av.ui.page = showBlock;
    av.dom.populationBlock.style.display = "none";
    av.dom.organismBlock.style.display = "none";
    av.dom.analysisBlock.style.display = "none";
    av.dom.showTextDebugBlock.style.display = "none";
    av.dom.orgInfoHolder.style.display = 'none';
    av.dom.popInfoVert.style.display = 'none';
    av.dom.populationButton.style.background = 'white';
    av.dom.organismButton.style.background = 'white';
    av.dom.analysisButton.style.background = 'white';
    av.dom.showTextDebugButton.style.background = 'white';
    document.getElementById(showBlock).style.display = "flex";   //orgPageButtonHolder
    var showButton = showBlock.substring(0,showBlock.length-5)+'Button';
    console.log('showButton=',showButton);
    document.getElementById(showButton).style.background = '#DBDBDB'; 
    //dijit.byId(showBlock).resize();
    //document.getElementById(showBlock).resize();

    //disable menu options. they will be enabled when relevant canvas is drawn
    dijit.byId('mnFzOffspring').attr('disabled', true);
    dijit.byId('mnCnOffspringTrace').attr('disabled', true);

    // if the miniplot on the populaton page needs to be initiated call that funciton.
    console.log('In: av.ui.mainBoxSwap; av.pch.needInit=', av.pch.needInit, '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible"));
    if ($(av.dom.popStatsBlock).is(":visible") && (av.pch.needInit) ) {
      av.grd.popChartInit('av.ui.mainBoxSwap');
    };
    if ('populationBlock' == av.ui.page) {
      av.dom.popInfoVert.style.display = 'block';
      document.getElementById('allAvidaContainer').className = 'all3pop';
    }
    if ('analysisBlock' == av.ui.page) {
      document.getElementById('allAvidaContainer').className = 'all2lft';
    }
    if ('organismBlock' == av.ui.page) {
      document.getElementById('allAvidaContainer').className = 'all3org';
      console.log('allAvidaContainer.class=', document.getElementById('allAvidaContainer').className );
      av.dom.orgInfoHolder.style.display = 'block';
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
      av.ind.clearGen('mainBoxSwap_organismBlock');
      av.ind.cpuOutputCnvsSize();
    }
     if (('populationBlock' == av.ui.page) || ('organismBlock' == av.ui.page)) {
      document.getElementById('RtSideToggleButtons').style.display = 'block';
      document.getElementById('ritePnlBtnHolder').style.display = 'block';
      document.getElementById('rightInfoHolder').style.display = 'block';
    }
    else {
      document.getElementById('RtSideToggleButtons').style.display = 'none';
      document.getElementById('ritePnlBtnHolder').style.display = 'none';
      document.getElementById('rightInfoHolder').style.display = 'none';
    };
    //console.log('allAvidaContainer.class=', document.getElementById('allAvidaContainer').className );
  };

  // Buttons that call MainBoxSwap
  // if (av.dbg.flg.root) { console.log('Root: before av.dom.populationButton.onclick'); }
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

  // if (av.dbg.flg.root) { console.log('Root: before showTextDebugButton.onclick'); }
  document.getElementById('showTextDebugButton').onclick = function () {
    av.post.addUser('Button: showTextDebugButton');
    av.ui.mainBoxSwap('showTextDebugBlock');
  };
  // ------------------ two controls for the same purpose; tabs used in develoopment mode --
  
  //Toggle switch for Population/Organism pages
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.rightInfoPanelToggleButton'); }
  //Population page
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
        
      // show set up panel
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

        if (av.dbg.flg.plt) {      //
          console.log('In: av.ptd.rightInfoPanelToggleButton; av.pch.needInit=', av.pch.needInit
              , '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") ); 
        }
        // if the miniplot on the populaton page needs to be updated.
        if ( $(av.dom.popStatsBlock).is(":visible")) {
          if (av.dbg.flg.plt) { console.log('need to call av.grd.popChartInit'); }
          av.grd.popChartFn('av.ptd.rightInfoPanelToggleButton');
        }
      };
      //console.log('Stats.class=', document.getElementById('StatsButton').className, '; Setup.class=', document.getElementById('SetupButton').className);
    }
    //Organism Page
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
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.processTab'); }
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
    // keep console example because evt info looks useful for improving mouse code.
    // console.log('contentType=',contentType,'; evt=', evt);
    // console.log('contentType=', contentType);
    
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
  // ------- end of two controls for the same purpose; took work to get tabs to look right so I'm keeping tab example --

  //----------------------------------------------------------------------------------------show/hide left side panel --
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.lftPnlButtonImg'); }
  av.ptd.lftPnlButtonImg = function () {
    if (av.ui.lftSidePnlShowing) {
      av.post.addUser('Button: lftPnlButtonImg: start hidding left side panel');
      av.ui.lftSidePnlShowing = false;
      //av.ui.navColId = av.dom.navColId.offsetWidth;
      //av.dom.navColId.style.display = 'none';
      if ('all3pop' == document.getElementById('allAvidaContainer').className) {
        document.getElementById('allAvidaContainer').className = 'all2rit';
      }
    } else {
      av.post.addUser('Button: lftPnlButtonImg: start showing left side panel');
      av.ui.lftSidePnlShowing = true;
      //av.dom.navColId.style.display = 'flex';
      //av.dom.rightInfoHolder.style.width = av.ui.navColId + 'px';
      if ('all2rit' == document.getElementById('allAvidaContainer').className) {
        document.getElementById('allAvidaContainer').className = 'all3pop';
      }
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
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.rtPnlButtonImg'); }
  av.ptd.rtPnlButtonImg = function () {
    //console.log('rtPnlButtonImg: av.ui.page=', av.ui.page);
    if ('populationBlock' == av.ui.page) {
      if (av.ui.popStatFlag) {
        av.post.addUser('Button: rtPnlButtonImg: start hidding population stats');
        av.ui.popStatFlag = false;
        av.ptd.rightInfoHolderWd = av.dom.rightInfoHolder.offsetWidth;
        av.dom.rightInfoHolder.style.display = 'none';
      } else {
        av.post.addUser('Button: rtPnlButtonImg: start showing population stats');
        av.ui.popStatFlag = true;
        av.dom.rightInfoHolder.style.display = 'flex';
        //reset info pane dimensions. Try rightInfoHolderWd = 395px; selOrgTypeWd = 150px
        av.dom.rightInfoHolder.style.width = av.ptd.rightInfoHolderWd + 'px';
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

//------------------------------------------------------------------------------------- modal dialog cancel buttons --

  av.dom.needAncestorCancel.onclick = function () {
    av.dom.needAncestorModalID.style.display = 'none';
  };

  av.dom.newDishCancel.onclick = function () {
    av.dom.newDishModalID.style.display = 'none';
  };

  /******************************************* New Button and new Dialog **********************************************/

  //av.dom.newDishDiscard not in avidaEdEco.html
  av.dom.newDishDiscard.onclick = function () {
    av.post.addUser('Button: newDishDiscard');
    av.dom.newDishModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newDishDiscard click');
  };

  // av.dom.newDishSaveConfig not in avidaEdEco.html
  av.dom.newDishSaveWorld.onclick = function () {
    av.post.addUser('Button: newDishSaveWorld');
    av.ptd.FrPopulationFn();
    av.dom.newDishModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newDishSaveWorld click');
  };

  av.dom.newDishSaveConfig.onclick = function (domObj) {
    console.log('in av.dom.newDishSaveConfig, domObj = ', domObj);
    av.post.addUser('Button: newDishSaveConfig');
    av.ptd.FrConfigFn('av.dom.newDishSaveConfig.onclick');
    av.dom.newDishModalID.style.display = 'none';
    av.msg.reset();
    //console.log('newDishSaveConfig click');
  };

  av.ui.newButtonBoth = function() {
    'use strict';
    if ('prepping' == av.grd.runState) {// reset petri dish
      av.msg.reset();
      console.log('in prepping');
      //av.ptd.resetDishFn(true); //Only do when get reset back from avida after sending reset, commented out in v3.0
    } else {// check to see about saving current population
      av.msg.pause('now');
      av.ptd.makePauseState();
      console.log('av.dom.newDishModalID=', av.dom.newDishModalID);
      av.dom.newDishModalID.style.display = "block";
    }
  };

  av.dom.newDishButton.onclick = function () {
    av.post.addUser('Button: newDishButton');
    av.ui.newButtonBoth();
  };

  dijit.byId('mnCnNewpop').on('Click', function () {
    av.post.addUser('Button: mnCnNewpop');
    av.ui.newButtonBoth();
  });

  //**************************************      Freeze Button      *****************************************************
  //Saves either configuration or populated dish
  //Also creates context menu for all new freezer items.*/
  av.dom.freezeButton.onclick = function () {
    console.log('in av.dom.freezeButton.onclick: av.grd.runState=', av.grd.runState, '; av.msg.ByCellIDgenome=', av.msg.ByCellIDgenome, '; length=', av.msg.ByCellIDgenome.length);
    av.post.addUser('Button: freezeButton');
    if ('prepping' == av.grd.runState)
      av.ptd.FrConfigFn('av.dom.freezeButton.onclick');
    else {
      if (5 > av.msg.ByCellIDgenome.length) {
        document.getElementById('fzDialogModFzOrganismSpan').style.display = 'none';
      } 
      else
        document.getElementById('fzDialogModFzOrganismSpan').style.display = 'inline';
      console.log('before fzDialog.show()');
      document.getElementById('fzDialogModalID').style.display = "block";    //fzDialog.show();
    }
  };



  document.getElementById('fzDialogModSaveConfig').onclick = function () {
//  dijit.byId('FzConfigurationButton').on('Click', function () {
    av.post.addUser('Button: fzDialogModSaveConfig');
    document.getElementById('fzDialogModalID').style.display = 'none';    //fzDialog.hide();
    av.ptd.FrConfigFn('fzDialogModSaveConfig.onClick');
  };

  //Drop down menu to save a configuration item
  dijit.byId('mnFzConfig').on('Click', function () {
    av.post.addUser('Button: mnFzConfig');
    av.ptd.FrConfigFn('mnFzConfig');
  });

    document.getElementById('fzDialogModSaveOrganism').onclick = function () {
//  dijit.byId('FzOrganismButton').on('Click', function () {
    av.post.addUser('Button: fzDialogModSaveOrganism');
    document.getElementById('fzDialogModalID').style.display = 'none';    //fzDialog.hide
    av.ptd.FrOrganismFn('selected');
  };

  //button to freeze a population
  document.getElementById('fzDialogModSaveWorld').onclick = function () {  
  //dijit.byId('FzPopulationButton').on('Click', function () {
    av.post.addUser('Button: fzDialogModSaveWorld');
    document.getElementById('fzDialogModalID').style.display = 'none';    //fzDialog.hide
    av.ptd.FrPopulationFn();
  };
  
  document.getElementById('fzDialogModCancel').onclick = function () {
    document.getElementById('fzDialogModalID').style.display = 'none';    //fzDialog.hide
  };

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
    av.ind.organismCanvasHolderSize('mnFzAddGenomeView');
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
    console.log('av.grd.DataByCellID =', av.grd.DataByCellID);
    console.log('av.pch =', av.pch);
    console.log('av.dom.popChart.data=', av.dom.popChart.data);
    console.log('av.anl =', av.anl);
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
        av.ind.organismCanvasHolderSize('mouseup_organIcon_parent');
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
        av.ind.organismCanvasHolderSize('mouseup_organIcon_Kid');
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
  // if (av.dbg.flg.root) { console.log('Root: before av.grd.drawGridSetupFn'); }

  av.grd.drawGridSetupFn = function (from) {
    'use strict';
    //if (true) {console.log(from, 'called av.grd.drawGridSetupFn'); }
    av.dom.popBot.style.height = '5px';

    //size testing box = mainButtons
    av.dsz.mainButtonsWd = parseInt($("#mainButtons").css("width"));
    av.dsz.mainButtonsHt = parseInt($("#mainButtons").css("height"));
    if (av.debug.uil) { console.log('ui: w:', av.dsz.mainButtonsWd, av.dsz.mainButtonsHt, '= mainButtons'); }

    //about total window size
    av.dsz.windowWd = window.innerWidth || document.documentElement.clientWidth
      || document.body.clientWidth;
    av.dsz.windowHd = window.innerHeight || document.documentElement.clientHeight
      || document.body.clientHeight;
    if (av.debug.uil)
      console.log('w:', av.dsz.windowWd, av.dsz.windowHd, '= window');


    if (undefined != av.grd.msg) {
      if ('prepping' != av.grd.runState && undefined != av.grd.msg.fitness) {
        //av.grd.setMapData('av.grd.drawGridSetupFn');  //update color information for offpsring once run has started only if screen visable.
        av.grd.findLogicOutline();
      }
    }
    if ('populationBlock' === av.ui.page) {
      // Does not seem to change wd/ht of gridHolder
      if ('none' == document.getElementById('colorMode').value.toLowerCase()) {
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

        //check if gridHolder is taller or wider
        if (av.dom.gridControlContainer.clientWidth < $("#gridHolder").height()) {
          av.dom.scaleCanvas.width = (av.dom.gridControlContainer.clientWidth - 22);  //works for canvas; need to use .style for divs
        } else
          av.dom.scaleCanvas.width = $("#gridHolder").height() - 22;  //the 22 was determined by trial and error and works on a mac
        
        if (av.debug.uil) {
          console.log('plain, client, offset, scroll, style, jq_innner, jq_reg, jq_outter ______________ after assigning scaleCanvasWidth');
          console.log('scaleCanvas w:', av.dom.scaleCanvas.width, av.dom.scaleCanvas.clientWidth, av.dom.scaleCanvas.offsetWidth, av.dom.scaleCanvas.scrollWidth, av.dom.scaleCanvas.style.width,
                      ';  h:', av.dom.scaleCanvas.height, av.dom.scaleCanvas.clientHeight, av.dom.scaleCanvas.offsetHeight, av.dom.scaleCanvas.scrollHeight, av.dom.scaleCanvas.style.height);
        }

        //figure out scale or legend
        if ('Ancestor Organism' == document.getElementById('colorMode').value) {
          av.grd.drawLegend();
        } else {
          av.grd.setColorMapOnly('draw gradient scale in av.grd.drawGridSetupFn');  //to set color scales for resources
          av.grd.gradientScale('av.grd.drawGridSetupFn');
        }
        //console.log('after drawing scale or legend. update=',av.grd.oldUpdate);

        av.dom.popBot.style.height = av.dom.popBot.scrollHeight + 'px';
        if (av.debug.uil) { console.log('ui: change ht of popBot'); }
        //if (av.debug.uil) { console.log('ui: w:', parseInt($("#gridHolder").css('width')), parseInt($("#gridHolder").css('height')),'= av.dom.gridHolder jQuery.cssWd ht ~ outer ~ offset'); }

        //av.dsz.gridHolderWd = parseInt($("#gridHolder").css("width"));   //this seems to match offsetht
        //av.dsz.gridHolderHt = parseInt($("#gridHolder").css("height"));
        //if (av.debug.uil) { console.log('ui: w:',av.dsz.gridHolderWd,av.dsz.gridHolderHt, '= gridHolder jQuery.width ht ~ outer ~ css ~ offset'); }

        if (av.debug.uil) {
          console.log('plain, client, offset, scroll, style, jq_innner, jq_reg, jq_outter ______________ Before testing to see if gridHolder ht/width is larger');
          console.log('gridHolder: w: _,',  av.dom.gridHolder.clientWidth, av.dom.gridHolder.offsetWidth, av.dom.gridHolder.scrollWidth, 
                   av.dom.gridHolder.style.width, $("#gridHolder").innerWidth(), $("#gridHolder").width(), $("#gridHolder").outerWidth(),
                  '  h: ___, ',  av.dom.gridHolder.clientHeight, av.dom.gridHolder.offsetHeight, av.dom.gridHolder.scrollHeight, 
                  av.dom.gridHolder.style.height, $("#gridHolder").innerHeight(), $("#gridHolder").height(), $("#gridHolder").outerHeight());
          console.log('gridCanvas w:', av.dom.gridCanvas.width, av.dom.gridCanvas.clientWidth, av.dom.gridCanvas.offsetWidth, av.dom.gridCanvas.scrollWidth, av.dom.gridCanvas.style.width,
                        ';  h:', av.dom.gridCanvas.height, av.dom.gridCanvas.clientHeight, av.dom.gridCanvas.offsetHeight, av.dom.gridCanvas.scrollHeight, av.dom.gridCanvas.style.height);
        }
        if ($("#gridHolder").height() < $("#gridHolder").width()) {
          av.grd.canvasSize = Math.floor( $("#gridHolder").height() ) - 4;
          //console.log('smaller height: canvasSize = ', av.grd.canvasSize);
        } else {
          av.grd.canvasSize = Math.floor( $("#gridHolder").width() ) - 2;
          //console.log('smaller width: canvasSize = ', av.grd.canvasSize);
        }

        av.dom.gridCanvas.width = av.grd.canvasSize;
        av.dom.gridCanvas.height = av.grd.canvasSize;
        av.grd.spaceX = av.grd.canvasSize;
        av.grd.spaceY = av.grd.canvasSize;

        if (av.debug.uil) {
          console.log('plain, client, offset, scroll, style, jq_innner, jq_reg, jq_outter ______________  Before findGridSize');
          console.log('gridHolder: w: _,',  av.dom.gridHolder.clientWidth, av.dom.gridHolder.offsetWidth, av.dom.gridHolder.scrollWidth, 
                   av.dom.gridHolder.style.width, $("#gridHolder").innerWidth(), $("#gridHolder").width(), $("#gridHolder").outerWidth(),
                  '  h: ___, ',  av.dom.gridHolder.clientHeight, av.dom.gridHolder.offsetHeight, av.dom.gridHolder.scrollHeight, 
                  av.dom.gridHolder.style.height, $("#gridHolder").innerHeight(), $("#gridHolder").height(), $("#gridHolder").outerHeight());
          console.log('gridCanvas w:', av.dom.gridCanvas.width, av.dom.gridCanvas.clientWidth, av.dom.gridCanvas.offsetWidth, av.dom.gridCanvas.scrollWidth, av.dom.gridCanvas.style.width,
                        ';  h:', av.dom.gridCanvas.height, av.dom.gridCanvas.clientHeight, av.dom.gridCanvas.offsetHeight, av.dom.gridCanvas.scrollHeight, av.dom.gridCanvas.style.height);
        }
        av.grd.findGridSize(av.grd, av.parents);

        if (av.debug.uil) {
        console.log('plain, client, offset, scroll, style, jq_innner, jq_reg, jq_outter ______________  After findGridSize');
        console.log('gridHolder: w: _,',  av.dom.gridHolder.clientWidth, av.dom.gridHolder.offsetWidth, av.dom.gridHolder.scrollWidth, 
                 av.dom.gridHolder.style.width, $("#gridHolder").innerWidth(), $("#gridHolder").width(), $("#gridHolder").outerWidth(),
                '  h: ___, ',  av.dom.gridHolder.clientHeight, av.dom.gridHolder.offsetHeight, av.dom.gridHolder.scrollHeight, 
                av.dom.gridHolder.style.height, $("#gridHolder").innerHeight(), $("#gridHolder").height(), $("#gridHolder").outerHeight());
        console.log('gridCanvas w:', av.dom.gridCanvas.width, av.dom.gridCanvas.clientWidth, av.dom.gridCanvas.offsetWidth, av.dom.gridCanvas.scrollWidth, av.dom.gridCanvas.style.width,
                      ';  h:', av.dom.gridCanvas.height, av.dom.gridCanvas.clientHeight, av.dom.gridCanvas.offsetHeight, av.dom.gridCanvas.scrollHeight, av.dom.gridCanvas.style.height);
        }
        //Need to fix for scrolling   // This was commented out in Avida-ED 3.1
        //if (av.dom.gridHolder.scrollHeight == av.dom.gridHolder.clientHeight + 17) {
        //  var numGH = av.dom.gridHolder.clientHeight;
        //  av.dom.gridCanvas.height = numGH - 6 - 17;
        //  av.grd.findGridSize(av.grd, av.parents);     //in populationGrid.js
        //  consold.log('inside DrawGridSetupFn in odd if statement ----------------------------------');
        //}

        //if (false) { console.log('before av.grd.drawGridUpdate'); }
        av.grd.drawGridUpdate();   //in populationGrid.js

        rescaleLabel.textContent = av.grd.fillRescale;       //Tiba look at later
        av.grd.need2DrawGrid = true;
        if (av.debug.uil) {
        console.log('plain, client, offset, scroll, style, jq_innner, jq_reg, jq_outter ______________  After av.grd.drawGridUpdate');
        console.log('gridHolder: w: _,',  av.dom.gridHolder.clientWidth, av.dom.gridHolder.offsetWidth, av.dom.gridHolder.scrollWidth, 
                 av.dom.gridHolder.style.width, $("#gridHolder").innerWidth(), $("#gridHolder").width(), $("#gridHolder").outerWidth(),
                '  h: ___, ',  av.dom.gridHolder.clientHeight, av.dom.gridHolder.offsetHeight, av.dom.gridHolder.scrollHeight, 
                av.dom.gridHolder.style.height, $("#gridHolder").innerHeight(), $("#gridHolder").height(), $("#gridHolder").outerHeight());
        console.log('gridCanvas w:', av.dom.gridCanvas.width, av.dom.gridCanvas.clientWidth, av.dom.gridCanvas.offsetWidth, av.dom.gridCanvas.scrollWidth, av.dom.gridCanvas.style.width,
                      ';  h:', av.dom.gridCanvas.height, av.dom.gridCanvas.clientHeight, av.dom.gridCanvas.offsetHeight, av.dom.gridCanvas.scrollHeight, av.dom.gridCanvas.style.height);
        }
      }
    }
  };

  // The rest of grid canvas drawing code is in populationGrid.js

  // *******************************************************************************************************************
  //        Color Map Color Mode and Zoom Slide Controls
  // *******************************************************************************************************************

  // Get color map data from Avida and draw
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
  // if (av.dbg.flg.root) { console.log('Root: before logic buttons'); }

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

  //---------------------------------------------------------------------------------------- av.ui.miniChartOptionsFn --
  av.ui.miniChartOptionsFn = function (domobj) {
    av.pch.option = domobj.value;
    av.grd.popChartFn('av.ui.miniChartOptionsFn');    
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.grd.popChartInit defined'); }
  // initialize needs to be in AvidaED.js; cannot be run when mini-graph is not visible. 
  //--------------------------------------------------------------------------------------------- av.grd.popChartInit --
  // Should be done before av.grd.popChartFn is run.  
  av.grd.popChartInit = function (from) {
    console.log(from, 'called av.grd.popChartInit; av.pch.needInit=', av.pch.needInit, 
                   '; av.dom.popStatsBlock.style.display=', av.dom.popStatsBlock.style.display, '; av.ui.page=', av.ui.page, 
                    '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") );
    
    if (av.dbg.flg.plt) { 
      console.log(from , 'called av.grd.popChartInit; av.pch.needInit=', av.pch.needInit, 
                    '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") );
    }
    //
    //look to see if poplulation page mini-chart is showing
    //if ('flex' != av.dom.popStatsBlock.style.display || ('populationBlock' !== av.ui.page)) {
    if ( !$(av.dom.popStatsBlock).is(":visible") ) {
      av.pch.needInit = true;
      return;
      // chart is not visible don't try to write chart
    };
    
    //minichart is visible on population page
    av.pch.clearPopChrt();
    av.pch.divSize('av.grd.popChartInit');
    av.pch.popData = av.pch.data;

    //if (av.dbg.flg.plt) { console.log('PopPlot: dom of popChart=', document.getElementById('popChart') ); }
    if (av.dbg.flg.plt) { console.log('PopPlot: av.dom.popChart=', av.dom.popChart); }
    if (av.dbg.flg.plt) { console.log('PopPlot: av.dom.popChart.data=',av.dom.popChart.data); }
    
    if (null == av.dom.popChart.data) {
      av.pch.update = {
        autorange: true,
        width: av.pch.layout.width,
        height: av.pch.layout.height
      };

      if (undefined != av.dom.popChart.data[0]) {
        Plotly.deleteTraces(av.dom.popChart, [0, 1]);
        Plotly.relayout(av.dom.popChart, av.pch.update);
        if (av.dbg.flg.plt) { console.log('PopPlot: av.dom.popChart.data=',av.dom.popChart.data); }
      }
    };
    av.dom.popChart.style.visibility = 'hidden';
    //if (av.dbg.flg.plt) { console.log('PopPlot: layout.ht, wd =', av.dom.popChart.layout.height, av.dom.popChart.layout.width); }
    av.pch.needInit = false;
  };
  // if (av.dbg.flg.root) { console.log('Root: after av.grd.popChartInit defined'); }

   //Draw popChartFn
  //----------------------------------------------------------------------------------------------- av.grd.popChartFn --
  av.grd.popChartFn = function (from) {
    'use strict';
    var popData;
    var numof;
    var jj = 0; //count y data arrays
    //console.log(from, 'called popChartFn: av.pch.needInit= ', av.pch.needInit, 
    //                  '; $(statsBlock.display = ', $(av.dom.popStatsBlock).css('display'),
    //                  '; av.dom.popStatsBlock.style.display=', av.dom.popStatsBlock.style.display,
    //                  '; av.ui.page=', av.ui.page,
    //                  '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible"));      
    //console.log('PopPlot:',from, 'called popChartFn: av.pch.needInit= ', av.pch.needInit, 
    //                  '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible"));      
    if (av.pch.needInit) {
      //console.log(from + ' called av.grd.popChartFn: av.pch.needInit=', av.pch.needInit, '; av.ui.page=', av.ui.page);

      //initialize if block is visible
      if ( !$(av.dom.popStatsBlock).is(":visible") ) {
        if (av.dbg.flg.plt) { console.log('PopPlot: if $popStatsBlock is visible & needInit - then call popChartInit'); }
        av.grd.popChartInit('av.grd.popChartFn');
        if (av.dbg.flg.plt) { console.log('PopPlot: av.grd.runState = ', av.grd.runState); }
      };
    };

    // Do not display chart if the chart is not on the screen. Data seems to be getting updated. need to verify this.
    if ( !$(av.dom.popStatsBlock).is(":visible") ) {
      if (av.dbg.flg.plt) { console.log('PopPlot: Not visible: so skip rest of function'); }
      return;
    };
    
    if (av.dbg.flg.plt) { console.log('PopPlot: av.grd.runState = ', av.grd.runState); }
    //values can be prepping, started, or world
    if ('prepping' === av.grd.runState) {
      av.dom.popChart.style.visibility = 'hidden';  //hide mini-chart when an experiment is not running. 
      av.pch.noneWas = av.pch.noneNow;
      av.pch.noneNow = true;
      return;
    };
    av.pch.chartContains = document.getElementById('miniCharts').value;
    av.pch.organismTrait = document.getElementById('yaxis').value;

    if ('none' === av.pch.chartContains) {
      av.pch.noneWas = av.pch.noneNow;
      av.pch.noneNow = true;
      av.dom.popChart.style.visibility = 'hidden';
      if (undefined !== av.dom.popChart.data) {
        console.log('av.dom.popChart.data is', av.dom.popChart.data);
      };
      return;
    };
    
    // process chart options and y-axis for organisms. 
    av.dom.popChart.style.visibility = 'visible';  
    // this is the adust the size. Seems like the size should only change when window/div changes size rather than checking very time. 
    av.pch.divSize('av.grd.popChartFn');
    //console.log('after av.pch.divSize');
    
    if ('organism' == av.pch.chartContains || 'combine' == av.pch.chartContains) {
      
      //not in current use. Seems if the y-axis had not changed we might not need to redo case statement
      if (document.getElementById('yaxis').value === av.pch.yValue) {
        av.pch.yChange = false;
      } else {
        av.pch.yChange = true;
        av.pch.yValue = document.getElementById('yaxis').value;
      };

      //console.log('av.pch.maxFit=',av.pch.aveMaxFit, '; av.pch.logMaxFit=',av.pch.logMaxFit, '; av.pch.aveFit = ', av.pch.aveFit);
      //console.log('av.pch.logFit = ', av.pch.logFit);
      switch (av.pch.organismTrait) {
        case 'Average Fitness':
          av.pch.popY = av.pch.aveFit;
          av.pch.logY = av.pch.logFit;
          //console.log('av.pch.maxFit=',av.pch.aveMaxFit, '; av.pch.logMaxFit=',av.pch.logMaxFit);
          av.pch.maxY = (av.pch.aveMaxFit > av.pch.logMaxFit) ? av.pch.aveMaxFit : av.pch.logMaxFit;
          //console.log('aveMaxFit=', av.pch.aveMaxFit, '; logMaxFit=', av.pch.logMaxFit, '; maxY=', av.pch.maxY);
          //console.log('aveFit', av.pch.aveFit);
          //console.log('logFit', av.pch.logFit);
          break;
        case 'Average Offspring Cost':
          av.pch.popY = av.pch.aveCst;
          av.pch.logY = av.pch.logCst;
          av.pch.maxY = (av.pch.aveMaxCst > av.pch.logMaxCst) ? av.pch.aveMaxCst : av.pch.logMaxCst;
          break;
        case 'Average Energy Acq. Rate':
        av.pch.popY = av.pch.aveEar;
        av.pch.logY = av.pch.logEar;
        av.pch.maxY = (av.pch.aveMaxEar > av.pch.logMaxEar) ? av.pch.aveMaxEar : av.pch.logMaxEar;
          break;
        case 'Number of Organisms':
        av.pch.popY = av.pch.aveNum;
        av.pch.logY = av.pch.logNum;
        av.pch.maxY = (av.pch.aveMaxNum > av.pch.logMaxNum) ? av.pch.aveMaxNum : av.pch.logMaxNum;
          break;
        case 'Number Viable':
        av.pch.popY = av.pch.aveVia;
        av.pch.logY = av.pch.logNum;
        av.pch.maxY = (av.pch.aveMaxVia > av.pch.logMaxNum) ? av.pch.aveMaxVia : av.pch.logMaxNum;
        default:
        av.pch.yValue = 'none';
        av.pch.popY = [];
        av.pch.logY = [];
        av.pch.maxY = 0.1;
          break;
      }; //end switch
      
      //console.log('xx   after', av.pch.xx);
      //console.log('popY after', av.pch.logY);
      //console.log('maxY', av.pch.maxY);
      //console.log('logY after', av.pch.logY);

      // tiba delete in 2021
      // I don' think these are used
      //av.pch.tracePop.x = av.pch.xx;
      //av.pch.tracePop.y = av.pch.popY;
      //av.pch.traceLog.x = av.pch.xx;
      //av.pch.traceLog.y = av.pch.logY;
      //console.log('trace0',av.pch.tracePop);
      //console.log('trace1',av.pch.traceLog);
    
      av.pch.tracePop = {x:av.pch.xx, y:av.pch.popY, type:'scatter', mode: 'lines'};
      av.pch.traceLog = {x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines'};
      av.pch.popData = [av.pch.tracePop];
      av.pch.popData = [av.pch.tracePop, av.pch.traceLog]; //popData
      av.pch.traceList = [];
      
      av.pch.traceList[jj] = {x: [av.pch.xx], y: [av.pch.popY]};
      av.pch.traceList[jj+1] = {x: [av.pch.xx], y: [av.pch.logY]};
      jj+2;
    }; // chart contains trait determined by yaxis select dom-object

    if ('resource' == av.pch.chartContains || 'combine' == av.pch.chartContains) {

      // need to check to see if there are any valid global resources before adding them to the structure
      console.log('cntGlobalDataTask=', av.nut.cntGlobalDataTasks, '; av.pch.resrcGlobal=', av.pch.resrcGlobal);
      if (0 < av.nut.cntGlobalDataTasks) {
        for (var ii=0; ii < av.sgr.numTasks; ii++) {
          numTsk = av.sgr.logEdNames[ii];
          tsk = av.sgr.logicNames[ii];
           av.pch.sgr[numTsk] = av.pch.resrcGlobal[tsk];
           av.pch.trc[numTsk].x = av.pch.xx;
           av.pch.trc[numTsk].y = av.pch.sgr[numTsk];
           av.pch.popData[ii+jj] = av.pch.trc[numTsk];
           av.pch.traceList[ii+jj] = {x: [av.pch.xx], y: [ av.pch.sgr[numTsk] ]};
        };
      };
    };  // end of chart contains amount of resource

 
    if (true) {
      numof = av.pch.traceList.length;
      if (av.debug.uil) { console.log('ui: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
      if (av.debug.uil) { console.log('ui: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }

      av.pch.update = {
        autorange: true,
        width: av.pch.layout.width,
        height: av.pch.layout.height
      };

      if (av.dom.popChart.data) console.log('av.dom.popChart.data.length=', av.dom.popChart.data.length);
      if (undefined == av.dom.popChart.data) {
        Plotly.plot('popChart', av.pch.popData, av.pch.layout, av.pch.widg);
      } else if (0 == av.dom.popChart.data.length) {
        //build av.dom.popChart.data
        Plotly.plot('popChart', av.pch.popData, av.pch.layout, av.pch.widg);
      } else {
        if (av.brs.isChrome) {
          av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", av.pch.traceList[0], [0]) at 1734';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.traceList[0]', [av.pch.traceList[0]]);
          Plotly.restyle('popChart', av.pch.traceList[0], [0]);
          av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", av.pch.traceList[1], [1])  in AvidaED.js at 1738';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.traceList[1]', [av.pch.traceList[1]]);
          Plotly.restyle('popChart', av.pch.traceList[1], [1]);
          av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in AvidaED.js at 1741';

          for (var ii=2; ii< numof; ii++) {
            av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", av.pch.traceList[0], ['+ii+'])';
            av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.traceList[]', [av.pch.traceList[ii]]);
            Plotly.restyle('popChart', av.pch.traceList[ii], [ii]);
          }
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
          Plotly.relayout(av.dom.popChart, av.pch.update);
        } else {
          //console.log('trace0', av.pch.tracePop);
          //Plotly.restyle(graphDiv, update, [1, 2]);
          //Plotly.restyle(av.dom.popChart, av.pch.tracePop, [0]);
          //Plotly.restyle(av.dom.popChart, av.pch.traceLog, [1]);
          av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in AvidaED.js at 2304';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
          if (undefined == av.pch.update) {
            av.pch.update = {
              autorange: true,
              width: av.pch.layout.width,
              height: av.pch.layout.height
            };
          };
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

          if (av.dbg.flg.plt) { console.log('PopPlot: av.pch.popData', av.pch.popData); }
          //Plotly.animate('popChart', {av.pch.popData});
          av.debug.log += '\n     --uiD: Plotly.animate("popChart", {av.pch.popData}) in AvidaED.js at 1757';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.popData', [av.pch.popData]);
          popData = av.pch.popData;
          Plotly.animate('popChart', {popData});
//              Plotly.animate('popChart', {av.pch.popData});
          if (av.dbg.flg.plt) { console.log('PopPlot: after animate in update grid chart'); }
        }
      };
      if (av.dbg.flg.plt) { console.log('PopPlot: chart.av.pch.popData=', av.dom.popChart.data); }
      if (av.dbg.flg.plt) { console.log('PopPlot: chart.layout=', av.dom.popChart.layout); }
    };  //end of true
  };

//--------------------------------------------------------------- ************** Tiba whhy does is this functions empty?
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
  };

/*------------------------------------------------------------------------------------------------ av.ptd.popSizeFn --*/
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
        if (av.debug.popCon) { console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]); }
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        if (av.debug.popCon) { console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]); }
      }
    };
    av.grd.gridWasCols = Number(av.dom.sizeCols.value);
    av.grd.gridWasRows = Number(av.dom.sizeRows.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };

/*-------------------------------------------------------------------------------------------- av.ptd.popSizeFnTest --*/
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
        //console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        //console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
      }
    };
    av.grd.gridWasCols = Number(av.dom.sizeColTest.value);
    av.grd.gridWasRows = Number(av.dom.sizeRowTest.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };


// changing the base does not seem change position on the slider

//-------------------------------------------------------------------------------------------- $(function slidePopmute() --
   $(function slidePopMute() {
    // because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED 
    // the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, 
    // so I multiplied by 200 to get 100.000% to get a reasonable number of values for the pixils in the slide
    //console.log('before defaultslide value');
    var muteSlideDefault = 95.4242509439325;
    // results in 2% as a default 
    var muteDefault = (Math.pow(10, (muteSlideDefault / 200)) - 1).toFixed(1);
    var slides = $('#mutePopSlide').slider({
      range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 401,
      theme: 'summer',
      slide: function (event, ui) {
        var tmpVal = (Math.pow(10, (ui.value / 200)) - 1);
        if (10 <= tmpVal ) {tmpVal = tmpVal.toFixed(0); }     //had been 12, but 10 is more consistent with 2 sig figs
        else if (1 <= tmpVal ) {tmpVal = tmpVal.toFixed(1); }
        else if (0.3 <= tmpVal ) {tmpVal = tmpVal.toFixed(2); }
        else {tmpVal = tmpVal.toFixed(2); }
        //put the value in the text box 
        // console.log('input', tmpVal, '; slide=', ui.value);
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
        //console.log('value=', muteNum, '; slide=', 200 * av.utl.log(10,1 + (muteNum) ) );
        
        //av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('Mute changed', av.ind.settingsChanged); };
        av.post.addUser('mutePopInput =' + av.dom.mutePopInput.value,  '1add ? 949');
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

  /********************************************************************************** enviornment (sugar) settings ****/
  /**************************************************************************** Tests for Population Setup section ****/

//------------------------------------------------------------------------------------------------- av.ptd.gridChange --
  av.ptd.gridChange = function (domObj) {
    // if (av.dbg.flg.popSetup ) { console.log('popSetup: in av.ptd.gridChange; domObj.id =', domObj.id); }
    var colNum = Number(av.dom.sizeCols.value);
    var rowNum = Number(av.dom.sizeRows.value);
    var gridSize = colNum * rowNum;
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
      if (colNum > 0 && colNum <= 100) {
        av.dom.sizeCols.style.color = 'black';
        av.dom.sizeCells.innerHTML += 'there are '+ gridSize;
      }
      else
        av.dom.sizeCols.style.color = 'red';
      if (rowNum > 0 && rowNum <= 100)
        av.dom.sizeRows.style.color = 'black';
      else
        av.dom.sizeRows.style.color = 'red';
      av.dom.sizeCells.style.color = 'red';
      // if (av.dbg.flg.popSetup ) { console.log('popSetup: not valid; col, row=', colNum, rowNum); }
      av.dom.sizeCells.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be greater than zero. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: <0'); }
      }
      if (colNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be 100 or less. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: >0'); }
      }
      if (isNaN(colNum)) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be a valid number. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: ==NaN'); }
      }
      if (rowNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number rof rows must be greater than zero. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: <0'); }
      }
      if (rowNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be 100 or less. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: >0'); }
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be a valid number. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: ==NaN'); }
      }
    }
  };
//---------------------------------------------------------------------------------------------- av.ptd.gridChangTest --
  av.ptd.gridChangTest = function (from) {
    //console.log(from, 'called av.ptd.gridChangTest; ');
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
      //console.log('not valid; col, row=', colNum, rowNum);
      av.dom.sizeCellTest.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be greater than zero. ';
        //console.log('<0');
      }
      if (colNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be 100 or less. ';
        //console.log('>0');
      }
      if (isNaN(colNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be a valid number. ';
        //console.log('==NaN');
      }
      if (rowNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be greater than zero. ';
        //console.log('<0');
      }
      if (rowNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be 100 or less. ';
        //console.log('>0');
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be a valid number. ';
        //console.log('==NaN');
      }
    }
  };

//xxs------------------------------------------------------------------------------------ dojo controls that will change --
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

  av.dom.autoPauseNum.onchange = function () {
    av.post.addUser(': autoPauseNum = ' + av.dom.autoPauseNum.value);
    av.ui.autoStopValue = av.dom.autoPauseNum.value;
    //console.log('autoPauseNum=', av.dom.autoPauseNum.value);
  };


  dojo.connect(dijit.byId('manualUpdateRadiTest'), 'onClick', function () {
    av.post.addUser('Button: manualUpdateRadiTest');
    av.ui.autoStopFlag = false;
  });

  dojo.connect(dijit.byId('autoUpdateRadiTest'), 'onClick', function () {
    av.post.addUser('Button: autoUpdateRadiTest');
    av.ui.autoStopFlag = true;
  });

  //********************************************************************************************************************
  //  Read Default Workspace as part of initialization
  // ********************************************************************************************************************
  av.fio.JSZip = JSZip;  //to allow other required files to be able to use JSZip
  av.fio.FileSaver = FileSaver;
  av.pch.Plotly = Plotly;

  //Read the default work space and then loadConfigFlag = true; //the @default should be placed at the current configuration
  // need to change how loadConfig worrks
  
  // if (av.dbg.flg.root) { console.log('Root: before calling av.fio.readZipWS ---------------'); }
  av.fio.readZipWS(av.fio.defaultFname, true);  
  
  //Need to get @default (the condents of folder c0) into the active config field. 

  //------------------------------------------------------- call StatsButton.click to get the display in default mode --
  // if (av.dbg.flg.root) { console.log('Root: before call StatsButton.click'); }
  document.getElementById('StatsButton').click();

//----------------------------------------------------------------------------------------------------------------------
//                                                     Oranism Page methods
//----------------------------------------------------------------------------------------------------------------------
 
//adjust instruction text size
  // if (av.dbg.flg.root) { console.log('Root: before av.ui.adjustOrgInstructionTextAreaSize'); }
//---------------------------------------------------------------------------- av.ui.adjustOrgInstructionTextAreaSize --
  av.ui.adjustOrgInstructionTextAreaSize = function() {
    var height = ( $('#orgInfoHolder').innerHeight() - $('#orgDetailID').innerHeight() - 10 ) / 2;
    //console.log('orgInfoHolder.ht=', $('#orgInfoHolder').innerHeight(), '; orgDetailID=',$('#orgDetailID').innerHeight(), '; height=', height);
    av.dom.ExecuteJust.style.height = height + 'px';  //from http://stackoverflow.com/questions/18295766/javascript-overriding-styles-previously-declared-in-another-function
    av.dom.ExecuteAbout.style.height = height + 'px';
    av.dom.ExecuteJust.style.width = '100%';
    av.dom.ExecuteAbout.style.width = '100%';    
  };
  
  //--------------------------------------------------------------------------------------------------- $ slideOrganism --
  $(function slideOrganism() {
    /* because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED */
    /* the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, */
    /* so I multiplied by 400 to get a range .from 0 to 802 for a slide that uses 800 pixels */
    //console.log('before defaultslide value');
    var muteSlideDefault = 190.848501887865;
    /* results in 2% as a default */
    var muteDefault = (Math.pow(10, (muteSlideDefault / 400)) - 1).toFixed(1);
    var slides = $('#orgMuteSlide').slider({
      orientation: "vertical",
      range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 802,
      slide: function (event, ui) {
        var tmpVal = (Math.pow(10, (ui.value / 400)) - 1);
        if (12 <= tmpVal ) {tmpVal = tmpVal.toFixed(0); }
        else if (1 <= tmpVal ) {tmpVal = tmpVal.toFixed(1); }
        else if (0.3 <= tmpVal ) {tmpVal = tmpVal.toFixed(2); }
        else {tmpVal = tmpVal.toFixed(2); }
         //console.log('mutation rate =', tmpVal, 'slider = ', ui.value);
        $('#orgMuteInput').val(tmpVal); //put slider value in the text near slider 
        //put the value in the text box 
        av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('orSlide changed', av.ind.settingsChanged); }
      }
    });
    // initialize
    $('#orgMuteInput').val(muteDefault);
    
    // update slide based on textbox 
    $('#orgMuteInput').change(function () {
      var value = this.value;
      var muteNum = Number(value);
      //if (av.debug.uil) { console.log('ui: muteNum=', muteNum); }
      if (muteNum >= 0 && muteNum <= 100) {
        av.ptd.validMuteInuput = true;
        console.log();
        av.dom.muteOrgError.style.color = 'black';
        av.dom.muteOrgError.innerHTML = '';
        //update slide value
        slides.slider('value', 400 * av.utl.log(10,1 + (muteNum)));
        av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('Mute changed', av.ind.settingsChanged); };
        //console.log('value=', muteNum, '; slide=', 400 * av.utl.log(10,1 + (muteNum) ) );
        av.post.addUser('orgMuteInput =' + document.getElementById('orgMuteInput').value,  '1add ? 949');
      } 
      else {
        av.ptd.validMuteInuput = false;
        av.dom.muteOrgError.style.color = 'red';
        av.dom.muteOrgError.innerHTML = '';
        av.dom.userMsgLabel.innerHTML = '';
        if (muteNum <= 0) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be >= than zero percent. ';
          if (av.debug.popCon) { console.log('<0'); }
        }
        if (muteNum >= 100) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be 100% or less. ';
          if (av.debug.popCon) { console.log('>0'); }
        }
        if (isNaN(muteNum)) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be a valid number. ';
          if (av.debug.popCon) { console.log('==NaN'); }
        }
      }
    });
  });

  //triggers flag that requests more data when the settings dialog is closed.
  //http://stackoverflow.com/questions/3008406/dojo-connect-wont-connect-onclick-with-button
//----------------------------------------------------------------------------------------------------------------------  

  //triggers flag that requests more data when the settings dialog is closed.
  //http://stackoverflow.com/questions/3008406/dojo-connect-wont-connect-onclick-with-button
//----------------------------------------------------------------------------------------------------------------------
  dojo.connect(dijit.byId('OrganExperimentRadio'), 'onClick', function () {
    av.post.addUser('Button: OrganExperimentRadio');
    av.ind.settingsChanged = true;
  });
  
  dojo.connect(dijit.byId('OrganDemoRadio'), 'onClick', function () {
    av.ind.settingsChanged = true;
    av.post.addUser('Button: OrganDemoRadio');
  });

//----------------------------------------------------------------------------------------------------------------------
//                                        Menu buttons that call for genome/Organism trace
//----------------------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------- mnCnOrganismTrace --
  dijit.byId('mnCnOrganismTrace').on('Click', function () {
    av.post.addUser('Button: mnCnOrganismTrace');
    av.mouse.traceSelected(av.dnd, av.fzr, av.grd);
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mnCnOrganismTrace');
    av.ui.adjustOrgInstructionTextAreaSize();
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  });

  //Put the offspring in the parent position on Organism Trace
  dijit.byId('mnCnOffspringTrace').on('Click', function () {
    //Open Oranism view
    av.post.addUser('Button: mnCnOffspringTrace');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mnCnOffspringTrace');
    av.ui.adjustOrgInstructionTextAreaSize();
    offspringTrace(av.dnd, av.fio, av.fzr, av.gen);
  });

//----------------------------------------------------------------------------------------------------------------------
//                                             Canvas for Organsim View (genome)
//----------------------------------------------------------------------------------------------------------------------

  //set canvas size; called from many places
  av.ind.organismCanvasHolderSize = function() {
    av.dom.organCanvas.width = $('#organismCanvasHolder').innerWidth() - 6;
    av.dom.organCanvas.height = $('#organismCanvasHolder').innerHeight() - 12;
  };
  //set output Canvas Size
  av.ind.cpuOutputCnvsSize = function() {
    console.log('output Wd Ht: $inner =', $('#cpuOutputCnvs').innerWidth(), $('#cpuOutputCnvs').innerHeight());
    av.ind.outputCanvasWd = $('#cpuOutputCnvs').innerWidth();
    av.ind.outputCanvasHt = $('#cpuOutputCnvs').innerHeight();
    console.log('av.ind.outputCanvas=', av.ind.outputCanvasWd, av.ind.outputCanvasHt);
  };

  av.ind.updateOrgTrace = function (from) {
    //console.log(from, 'called av.ind.updateOrgTrace: av.traceObj=', av.traceObj.length);
    //console.log('av.ind.cycle', av.ind.cycle);
    av.ind.organismCanvasHolderSize('av.ind.updateOrgTrace');
    //if (undefined == av.traceObj[av.ind.cycle]) console.log('its undefined');
    if (!(undefined == av.traceObj || {} == av.traceObj || undefined == av.traceObj[av.ind.cycle])) {
      av.ind.didDivide = av.traceObj[av.ind.cycle].didDivide; //update global version of didDivide
      av.ind.updateOrganTrace(av.traceObj, av.gen, 'av.ind.updateOrgTrace');
    } else
      av.ind.didDivide = false;
  };
  
//----------------------------------------------------------------------------------------------------------------------
//                                 End of Canvas to draw genome and update details
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//                    Methods for Buttons examine run of one Avidian on Organaism Page (below drawing of genome
//----------------------------------------------------------------------------------------------------------------------

  //wonder if this does anything.
  function outputUpdate(vol) {
    if (av.debug.ind) { console.log('outputUpdate: vol= ', vol); }
    document.querySelector('#orgCycle').value = vol;
  };
  
  //Need to fix lenth of cycleSlider so it lines up with slider on canvas. 
  //bit strings sill not updated correctly   2019 Dec 03
  
//----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgBack').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    //console.log('; av.ind.cycleSlider.get(minimum") =', av.ind.cycleSlider.get('minimum'), '; orgBack: ii = ', ii );
    //console.log('av.ind.cycleSlider = ', av.ind.cycleSlider);
    if (av.ind.cycleSlider.get('minimum') < ii) {
      ii--;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      av.ind.cycleSlider.set('value', ii);
      av.ind.updateOrgTrace('orgBack_onclick');
    }
    av.post.addUser('Button: orgBack; cycle = ' + ii);
  };

//----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgForward').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    //console.log('orgForward: ii = ', ii);
    if (av.ind.cycleSlider.get('maximum') > ii) {
      ii++;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      av.ind.cycleSlider.set('value', ii);
      av.ind.updateOrgTrace('orgForward_onclick');
      //console.log('ii', ii, '; gen', av.gen);
    }
    av.post.addUser('Button: orgForward; cycle = ' + ii);
  };

//----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgReset').onclick = function () {
    //console.log('orgReset');
    av.post.addUser('Button: orgReset');
    av.msg.doOrgTrace();
  };

//----------------------------------------------------------------------------------------------------------------------
  av.ind.orgRunFn = function () {
    if (av.ind.cycleSlider.get('maximum') > av.ind.cycle) {
      av.ind.cycle++;
      av.dom.orgCycle.value = av.ind.cycle;
      av.ind.cycleSlider.set('value', av.ind.cycle);
      av.ind.updateOrgTrace('orgRunFn');
    } else {
      av.ind.orgStopFn();
    }
  };

//----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgRun').onclick = function () {
    //console.log('orgRun: av.ind.cycleSlider.get("value")=', av.ind.cycleSlider.get('value'));
    if ('Run' == document.getElementById('orgRun').textContent) {
      document.getElementById('orgRun').textContent = 'Stop';
      av.ind.update_timer = setInterval(av.ind.orgRunFn, 100);
      av.post.addUser('Button: orgRun = stop; cycle = ' + av.ind.cycle);
    } else {
      av.ind.orgStopFn();
      av.post.addUser('Button: orgRun = run; cycle = ' + av.ind.cycle);
    };
  };

  document.getElementById('orgEnd').onclick = function () {
    if (av.debug.ind) { console.log('orgEnd: av.ind.cycleSlider.get("maximum)', av.ind.cycleSlider.get('maximum')); }
    av.post.addUser('Button: orgEnd');
    av.dom.orgCycle.value = av.ind.cycleSlider.get('maximum');
    av.ind.cycle = av.ind.cycleSlider.get('maximum');
    av.ind.cycleSlider.set('value', av.ind.cycle);
    av.ind.updateOrgTrace('orgEnd_onclick');
    av.ind.orgStopFn();
  };

//----------------------------------------------------------------------------------------------------------------------
  av.ind.orgCycleInputChange = function (domObj) {
    if (av.debug.ind) { console.log('orgCycle.onChange:  value = ',  domObj.value); }
    av.ind.cycleSlider.set('value', domObj.value);  //seemed to work;
    av.ind.cycle = domObj.value;
    if (av.debug.ind) { console.log('orgCycle: value = ', domObj.value, '; av.ind.cycleSlider.get("value") =', av.ind.cycleSlider.get('value')); }
    av.ind.updateOrgTrace('av.ind.orgCycleInputChange');
    if (av.debug.ind) { console.log('orgCycle: value = ', domObj.value, '; av.ind.cycleSlider=', av.ind.cycleSlider); }
  };

//       Organism Offspring Cycle Slider      running all the cycles completes the reproduuction
//       I think this is another loading action rather than a function that gets called. 
//----------------------------------------------------------------------------------------------------------------------
  if (av.debug.ind) { console.log('av.dom.cycleSlider =', av.dom.cycleSlider); }
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
    if (av.debug.ind) { console.log('av.dom.cycleSlider.innerHTML =', av.dom.cycleSlider.innerHTML); }
    if (av.debug.ind) { console.log('av.ind.cycleSlider =', av.ind.cycleSlider); }


  //********************************************************************************************************************
  // Resize window helpers -------------------------------------------
  //********************************************************************************************************************
  // if (av.dbg.flg.root) { console.log('Root: before Resize helpers'); }

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
   av.pch.divSize = function (from) {
    if (av.dbg.flg.divsize) { 
      console.log('plt: PopPlotSize: ',from, 'called av.pch.divSize +++++++++++++++++++++++++++++++');
      console.log('plt: popChrtHolder: css.h=', $("#popChrtHolder").css('height'), '; ht=', $('#popChrtHolder').height(), 
          '; innerHt=', $('#popChrtHolder').innerHeight(), '; outerHt=', $('#popChrtHolder').outerHeight(), 
          '; outherHt(true)=', $('#popChrtHolder').outerHeight(true), '; offsetHt=', av.dom.popChrtHolder.offsetHeight );
      console.log('plt: popChrtHolder: css.wd, wd, innerWd, outerWd, outherWd(true)', $("#popChrtHolder").css('width'), 
            $('#popChrtHolder').innerWidth(), $('#popChrtHolder').outerWidth(), $('#popChrtHolder').outerWidth(true) );
      console.log('plt: ');
    };
    
    av.pch.pixel.ht = $('#popChrtHolder').height();
    av.pch.pixel.wd = $('#popChrtHolder').width();
    //console.log(from, 'called av.pch.divSize: av.pch.pixel.wd=', av.pch.pixel.wd, '; av.pch.pixel.ht=', av.pch.pixel.ht);
    av.pch.layout.height = av.pch.pixel.ht - av.pch.pixel.hdif;  //leave a bit more vertical space for plot;
    av.pch.layout.width = av.pch.pixel.wd - av.pch.pixel.wdif;   //leave more horizontal space to right of plot;
    if (av.dbg.flg.divsize) { console.log('plt: PopPlotSize: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
    if (av.dbg.flg.divsize) { console.log('plt: PopPlotSize: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }

    //console.log('av.pch.layout. wt & ht:', av.pch.layout.width, av.pch.layout.height, '~~~~~~~~~~~~~~~~~~~~~');
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

  av.anl.divSize = function (from) {
    if (av.debug.alo) { console.log('alo: ', from, 'called av.anl.divSize'); }
    //console.log(from,'anaChrtHolder Ht client scroll ', av.dom.anaChrtHolder.clientHeight, av.dom.anaChrtHolder.scrollHeight);
    //console.log(from,'anlDndChart Ht client scroll', av.dom.anlDndChart.clientHeight, av.dom.anlDndChart.scrollHeight);
    //console.log(from,'anlChrtSpace Ht client scroll', av.dom.anlChrtSpace.clientHeight, av.dom.anlChrtSpace.scrollHeight);

    if (av.debug.alol) { console.log('alo: av.dom.anaChrtHolder.clientWd, Ht=', av.dom.anaChrtHolder.clientWidth, av.dom.anaChrtHolder.clientHeight); }
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

  //console.log('before resize function');
  $(window).resize(function () {
    // av.ui.resizePopLayout('window.resize');    //does not work.
  });


  //This function does not work. make grid get larger and larger
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

  av.ui.chngPopWidth = function (from) {
    if (av.debug.uil) { console.log('ui: ', from, 'called av.ui.chngPopWidth'); }
    av.dom.rightInfoHolder.style.width = rightInfoHolderWd + 'px';
    av.dom.setupBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.popStatsBlock.style.width = rightInfoHolderWd + 'px';
    av.dom.selOrgType.style.width = ((rightInfoHolderWd / 2).toFixed(0)) + 'px';
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

  // **************************************************************************************************************** */
  //                                                Analysis Page
  // **************************************************************************************************************** */
  // if (av.dbg.flg.root) { console.log('Root: start of Analysis Page'); }
  
  // initialize needs to be in AvidaED.js   Does not work in included files
  av.anl.anaChartInit = function () {
    av.anl.divSize('anaChartInit');

    if (undefined !== av.dom.anlChrtSpace.data) {
      if (av.dbg.flg.divsize) { console.log('AnaPlot: before purge in init'); } 
      av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2168';
      av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
      Plotly.purge(av.dom.anlChrtSpace);
      if (av.dbg.flg.divsize) { console.log('AnaPlot: after purge in init'); }
    }
    //Comment out the next three lines later
    var anaData = av.anl.data;
    if (av.dbg.flg.divsize) { console.log('AnaPlot: anlChrtPlotly in av.anl.anaChartInit'); }
    //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
    av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 2157';
    av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
    Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
    if (av.dbg.flg.divsize) { console.log('AnaPlot: after plot in av.anl.anaChartInit'); }

    //console.log('layout=', av.dom.anlChrtSpace.layout);
    av.dom.anlChrtSpace.style.visibility = 'hidden';
  };
  // if (av.dbg.flg.root) { console.log('Root: before av.anl.anaChartInit called'); }
  av.anl.anaChartInit();

  //----------------------------------------------------------------------------------------------- av.anl.AnaChartFn --
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
        if (av.dbg.flg.plt) { console.log('AnaPlot: both axis set to none'); }
        // hide chart see if this will work instead of purging. 
        if (hideChart) {
          av.dom.anlChrtSpace.style.visibility = 'visible';
        }
        // purge chart this was the old way.
        else if (undefined !== av.dom.anlChrtSpace.data) {
          console.log('before purge in anaChartFn');
          av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2205';
          av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
          Plotly.purge(av.dom.anlChrtSpace);
          console.log('after purge in anaChartFn');
        }
      } else {
        if (av.dbg.flg.plt) { console.log('AnaPlot: in AnaChartFn'); }
        av.anl.trace0.x = av.anl.xx.slice(0, av.anl.wrld[0].left.length);
        av.anl.trace1.x = av.anl.xx.slice(0, av.anl.wrld[0].right.length);
        av.anl.trace2.x = av.anl.xx.slice(0, av.anl.wrld[1].left.length);
        av.anl.trace3.x = av.anl.xx.slice(0, av.anl.wrld[1].right.length);
        av.anl.trace4.x = av.anl.xx.slice(0, av.anl.wrld[2].left.length);
        av.anl.trace5.x = av.anl.xx.slice(0, av.anl.wrld[2].right.length);
        av.anl.trace0.y = av.anl.wrld[0].left;
        av.anl.trace1.y = av.anl.wrld[0].right;
        av.anl.trace2.y = av.anl.wrld[1].left;
        av.anl.trace3.y = av.anl.wrld[1].right;
        av.anl.trace4.y = av.anl.wrld[2].left;
        av.anl.trace5.y = av.anl.wrld[2].right;
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

        if (av.dbg.flg.plt) { console.log('AnaPlot: av.anl.xx', av.anl.xx); }
        if (av.dbg.flg.plt)
          console.log('trace0', av.anl.trace0);

        av.anl.divSize('anaChartInit');
        av.anl.layout.height = av.anl.ht;
        av.anl.layout.width = av.anl.wd;
        av.anl.layout.yaxis.title = document.getElementById('yLeftSelect').value;
        av.anl.layout.yaxis2.title = document.getElementById('yRightSelect').value;
        if (av.dbg.flg.plt) { console.log('AnaPlot: before purge in update'); }
        av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2249';
        av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
        Plotly.purge(av.dom.anlChrtSpace);
        if (av.dbg.flg.plt) { console.log('AnaPlot: after plot anlChrtSpace'); }
        //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
        av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 2254';
        av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
        Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
        if (av.dbg.flg.plt) { console.log('AnaPlot: after plot anlChrtSpace'); }
      }
    }
  };

  /* Chart buttons ****************************************/
  document.getElementById('pop0delete').onclick = function () {
    av.post.addUser('Button: pop0delete');
    av.anl.hasWrldData[0] = false;
    av.anl.wrld[0].left = [];
    av.anl.wrld[0].right = [];
    av.anl.clearWorldData(0);
    av.dnd.popDish0.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn();
  };
  document.getElementById('pop1delete').onclick = function () {
    av.post.addUser('Button: pop1delete');
    av.anl.hasWrldData[1] = false;
    av.anl.wrld[1].left = [];
    av.anl.wrld[1].right = [];
    av.anl.clearWorldData(1);
    av.dnd.popDish1.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn();
  };
  document.getElementById('pop2delete').onclick = function () {
    av.post.addUser('Button: pop2delete');
    av.anl.hasWrldData[2] = false;
    av.anl.wrld[2].left = [];
    av.anl.wrld[2].right = [];
    av.anl.clearWorldData(2);
    av.dnd.popDish2.selectAll().deleteSelectedNodes();
    av.anl.AnaChartFn(); 
  };

  //Set Y-axis title and choose the correct array to plot
  //document.getElementById('yLeftSelect').onclick = function () {
  av.anl.yScaleSelect_onChange = function(domObj) {
    var id = domObj.id;
    var value = domObj.value;
    var side = id.substr(1,4).toLowerCase();
    console.log('id=', id, '; value=', value, '; side=', side);
    if ('left' !== side) {side = 'right';};
    av.post.addUser('Button: ' + id + ' is ' + value);
    av.anl.yLeftTitle = value;
    //need to get correct array to plot from freezer
    av.anl.loadSelectedData(0, id, side, 'av.anl.yScaleSelect_onChange');  //numbers are world landing spots
    av.anl.loadSelectedData(1, id, side, 'av.anl.yScaleSelect_onChange');
    av.anl.loadSelectedData(2, id, side, 'av.anl.yScaleSelect_onChange');
    av.anl.AnaChartFn('av.anl.yScaleSelect_onChange');
  };

  av.anl.wrldColorOnChange = function (domObj) {
    var ndx = Number(domObj.id.substr(3, 1));
    console.log('domObj.id=', domObj.id, '; ndx=', ndx, '; domObj.value', domObj.value, '; av.color.names[]=', av.color.names[domObj.value]);
    av.anl.color[ndx] = av.color.names[domObj.value];
    av.post.addUser('Button:' + domObj.id);
    console.log('av.anl.color[ndx]=', av.anl.color[ndx]);
    var tstText = 'not0Details';
    av.dom.test = document.getElementById(tstText);
    console.log(tstText+'.domObj =', av.dom.test);
    var sugarlist = av.dom.test.children;
    console.log('children of '+tstText+' =', sugarlist);
    var leng = sugarlist.length;
    for (var ii = 0; ii < leng; ii++) {
      console.log('coloroption ['+ii+'] =', sugarlist[ii].id);
    }
      
    
    av.anl.AnaChartFn();    //redraw chart which will get new color from dom
  };
  
  /* commented out prior to 2021
   av.dom.pop0color.onclick = function () {
   av.anl.color[0] = av.color.names[av.dom.pop0color.value];
   av.post.addUser('Button: pop0color');
   av.anl.AnaChartFn();
   };
   av.dom.pop1color.onclick = function () {
   av.post.addUser('Button: pop1color');
   av.anl.color[1] = av.color.names[av.dom.pop1color.value];
   av.anl.AnaChartFn();
   };
   av.dom.pop2color.onclick = function () {
   av.post.addUser('Button: pop2color');
   av.anl.color[2] = av.color.names[av.dom.pop2color.value];
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
   */
  
  // if (av.dbg.flg.root) { console.log('Root: after chart defined for analysis page'); }
  // **************************************************************************************************************** */
  //                                       end of Analysis Page
  // **************************************************************************************************************** */

  
  // **************************************************************************************************************** */
  //                                          Last_things_done; Last things done; Last done last done
  // **************************************************************************************************************** */
  // Do this after all other is done; end of file
  //must create the rest of the resource/reaction user interface before calling av.sgr.ChangeAllGeo('Global');
  av.sgr.buildHtml();
  // av.sgr.defaults;

  if (av.debug.ind) {
    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
    av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
    $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
  }
  // if (av.dbg.flg.root) { console.log('Root: before mainBoxSwap'); }
  av.ui.mainBoxSwap('populationBlock');  // just uncommented jan 2019
  av.dom.popStatsBlock.className = 'labInfoClass labInfoNone';
  av.dom.setupBlock.className = 'labInfoClass labInfoFlex';

  av.doj.mnDebug.style.visibility = 'visible';   // set visiable so that av.ui.toggleDevelopentDisplays will hide devo stuff

  // Avida-ED 4.0.0 Alpha Testing fix this too. 
  //true when diane is working; false for all production releases even in alpha testsing.  
  if (false) {
    console.log('testing mode; set to false before public release for Avida-ED 4.0.0 Alpha Testing. ');
    av.ui.toggleResourceData('lastDone');   //now only turns grid resource value table on and off
    //
    //set mmDebug to hidden so that when toggle called it will show the development sections x
    av.doj.mnDebug.style.visibility = 'hidden';   //visible
  };
  av.ui.toggleDevelopentDisplays('Last_things_done');  // this needs to b called in production version
  
  av.ptd.rightInfoPanelToggleButton(av.dom.StatsButton);
  //av.sgr.ChangeAllGeo(av.sgr.dftGeometry);   //tiba delete in 2021
  av.changeAllSgrRegionLayout(av.sgr.nutdft.uiAll.regionLayout, 'last_things_done');
  //av.sgr.setSugarColors(true);  //true is to turn colors on;    // set color/grey individually so when 0 resources, grey shades rather than colors
  av.sgr.ChangeAllsugarsupplyTypeSlct('infinite','Last_things_done');
  av.sgr.OpenCloseAllSugarDetails('allClose', 'Last_things_done');
  document.getElementById('resourceDataTable').style.display = 'flex';   //display local resource data

  //problem as now av.ui.about does not desplay at all
  av.ui.aboutAvidaED_Close();    //should not needd this as display = 'none' but it is needed for now.

  av.ui.setResourceComplexity(av.sgr.complexityLevel, 'last-things-done');

  av.fwt.clearResourceConstants();

  //Geometry is no longer a drop down. Now it is an opton in Supply Type
  document.getElementById('allSugarGeometry').style.display = 'none';
  document.getElementById('geometrySgr').style.display = 'none';

  // **************************************************************************************************************** */
  //Resize tools might be called here or after "Last_things_done"
  // **************************************************************************************************************** */

  // **************************************************************************************************************** */

  //---------------------------------------------------------------------------------------------------- size testing --
  // May need to do some things here to get the app to look right on the screen. 
  //av.grd.popChartFn();
  //av.grd.drawGridSetupFn('initial background'); //Draw initial background

  // className should be 'labInfoClass labInfoNone'
  // if (av.dbg.flg.popSetup ) { console.log('popSetup: av.dom.testSetupBlock.className=', av.dom.testSetupBlock.className); }


  //---------------------------------------------------------------------------------------------------- size testing --
  //av.ui.removeVerticalScrollbar('popTopRw', 'popTopRw');
  
  // * offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
  // * clientWidth = box + 2*padding - scrollbar_width    
  // * scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
  // * csssWidth = box only nothing else

  //---------------------------------------------------------------------------------------------------- size testing --
  /*   An attempt to look for which dom objects cause scroll bars
  var docWidth = document.documentElement.offsetWidth;
  var docHeight = document.documentElement.offsetHeight;
  var num_el = 0;
  var num_parent = 0;
  console.log('docWidth=', docWidth, '; docHeight=', docHeight);

  [].forEach.call(
    document.querySelectorAll('*'),
    function(el) {
      num_el++;
      if (el.offsetWidth > docWidth) {
        console.log(el, ': too wide = ', el.offsetWidth);
      }
      if (el.offsetHeight > docHeight) {
        console.log(el, ': too tall = ', el.offsetHeight);
      }
      if ((undefined != el.scrollHeight) && (null != el.scrollHeight)) {  
        //console.log('el.scrollHeight=', el.scrollHeight);
        if (el.scrollHeight > el.clientHeight+2) {
          num_parent++;
          console.log(el, ': too tall = ', el.offsetHeight, '; el.scrollHeight=', el.scrollHeight,'; el.clientHeight=', el.clientHeight);
        }
      }
    }
  );
  console.log('num_el=', num_el, '; num_parent = ', num_parent);
  */
  // **************************************************************************************************************** */

  // **************************************************************************************************************** */
  //                                          Useful Generic functions
  // **************************************************************************************************************** */

  //Modulo that is more accurate than %; Math.fmod(aa, bb);
  Math.fmod = function (aa, bb) {
    return Number((aa - (Math.floor(aa / bb) * bb)).toPrecision(8));
  };
  
  //console.log('before resize function');
  //does this need a timer function to delay response slightly so the page is not re-written as frequently when the
  //page is changing sizes  ??
  //----------------------------------------------------------------------------------------------------------------------
  $(window).resize(function () {
    // av.ui.resizePopLayout('window.resize');    //does not work.
  });
  
}
)
;


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

/* Not in use */
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
 * dom.name.offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
 * dom.name.clientWidth = box + 2*padding - scrollbar_width    
 * dom.name.scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
 * cssWidth = box only nothing else
 * dom.name.width
 * $('#name').innerWidth()
 *    where name is from the id='name'   of the dom objecte in the html
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
 https://stackoverflow.com/questions/24977965/collapsible-lists-using-html-and-css
 <details class='debugDetails' id='fzMdishDetails'>
 <summary id='fzMdishSec' class="freezerSummaryClass">Multi-Dishes</summary>
 <ul id='fzMdish' class='container'>
 </ul>
 </details>
 <details class='debugDetails' id='fzRdishDetails'>
 <summary id='fzRdishSec' class="freezerSummaryClass">Resource setup</summary>
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

      //Not sure the section below does anything except example about debug data collection.
/*
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
      };
*/
