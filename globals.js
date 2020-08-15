  //
  // change color and change data line select/item don't work in Analysis page
  //
  //
  ////***************************************
  // Defaults and Constants
  // one global to hold them all.
  var av = av || {};  //incase av already exists

  console.log('start of globals on 2020_0710');

  Number.prototype.pad = function(size) {
    var ss = String(this);
    while (ss.length < (size || 2)) {ss = "0" + ss;}
    return ss;
  };

  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };

  //av.debug flags
  av.debug = {};
  av.debug.alo = false; //analysis page layout
  av.debug.anl = false;  //analysis page
  av.debug.bool = false;  //av.debug statements that look for errors outlining logic functions
  av.debug.dnd = false;  //debu statements about dojo dnd
  av.debug.fio = false;  // file input/output; fio, read, write
  av.debug.fzr = false;  // statements about freezer
  av.debug.grid = false;  //population grid
  av.debug.ind = false;  //oranism page
  av.debug.mouse = false;  //av.debug statements about non-dojo drag and drop
  av.debug.msg = false;  //messages to and from avida
  av.debug.popCon = false;  //population Controls
  av.debug.trace = false;  //organism page
  av.debug.uil = false; //user interface layout.
  av.debug.userMsg = false; //debug of user messages.

  av.dbg = {};
  av.dbg.flg = {}; 
  av.dbg.flg.frd = false;  //reading file text strings
  av.dbg.flg.nut = true;  //processing nutrients (sugars) for the new new structures related to ecology (resources/reactions/sugars/logic functions
  av.dbg.flg.plt = false;  //both popChart and analysis
  av.dbg.flg.root = false;  //statements that look for failers when the code executes outside of functions

  av.debug.usr = ''; //working on log for user actions.

  av.post = {};
  av.post.addUser = function(addStr, comment) {
    "use strict";
    var note = comment === undefined ? '' : comment;
    av.debug.log += '\n--usr: ' + addStr + ' ~.~ ' + note;
    if (av.debug.usr) {console.log('usr: ' + addStr + note);}
  };

  av.post.usrOneline = function (data, comment) {
    "use strict";
    var note = comment === undefined ? '' : comment;
    av.debug.log += '\n--usr: ' + '~|~' + JSON.stringify(data) + ' ~.~ ' + note;
  };

  av.post.usrOut = function (jStr, comment) {
    "use strict";
    var note = comment === undefined ? '' : ' ' + comment;
    var str0 = JSON.stringify(jStr, null, 2);
    var str1 = '~|~' + str0.replace(/\\n/g, "\n") + '~.~' + note;
    av.debug.log += '\n--usr: ' + '~|~' + str0.replace(/\\n/g, "\n") + '~.~' + note;
  };

  av.mouse = {};

  function clearmouse(av) {
    'use strict';
    av.mouse.Dn = false;
    av.mouse.DnGridPos = [];
    av.mouse.UpGridPos = [];
    av.mouse.DnOrganPos = [];
    av.mouse.Move = false;
    av.mouse.Drag = false;
    av.mouse.ParentNdx = -1;
    av.mouse.ParentSelected = false;
    av.mouse.Picked = "";
  };
  clearmouse(av);

  //offspring on grid
  av.mouse.kidTarget = ['gridCanvas'   //canvas must be first in the list for conditional to work in av.mouse.kidMouse
    , 'organIcon'
    , 'organismsFzSec'
    , 'fzOrgan'
  ];

  //parent on grid
  av.mouse.dadTarget = ['organIcon'
    , 'gridCanvas'
    , 'trashCanImage'
    , 'activeOrgan'
  ];

  //offspring on Organism View
  av.mouse.sonTarget = ['organIcon'
    , 'organCanvas'
    , 'activeOrgan'
    , 'actOrgImg'
//    , 'activeOrgImg'
  ];

  av.mouse.dndTarget = ['organIcon'
    , 'organCanvas'
    , 'gridCanvas'
    , 'trashCanImage'
  ];

  //list of dom elements on the Population page that need to have the mouse over shape/style changed for the drag n drop to look right
  av.mouse.notDndPopList = ['colorMode'
    , 'TimeLabel'
    , 'popStatsBlock'
    , 'setupBlock'
    , 'populationBlock'
    , 'scaleCanvas'
    , 'trashDiv'
    , 'trashCanImage'
    , 'gridHolder'
    //freezer
    , 'fzOrgan'
    //menu Buttons
    , 'mnFile'
    , 'mnFreezer'
    , 'mnControl'
    , 'mnHelp'
    , 'mnDebug'
    , 'wsSavedMsg'
    , 'wsNameMsg'
    //Buttons
    , 'mainButtons'
    , 'rtPnlButtonImg'
    , 'populationButton'
    , 'organismButton'
    , 'analysisButton'
    , 'newDishButton'
    , 'runStopButton'
    , 'freezeButton'
    , 'rescaleLabel'
    , 'zoomSlide'
    //statistics section
    , 'sotLabel'
    , 'nameLabel'
    , 'sotColorCanvas'
    , 'fitLabel'
    , 'energyAcqRateLabel'
    , 'offspringCostLabel'
    , 'ageLabel'
    , 'ancestorLabel'
    , 'viableLabel'
    , 'sotFn'
    , 'sotTimes'
    , 'notLabel'
    , 'nanLabel'
    , 'andLabel'
    , 'ornLabel'
    , 'oroLabel'
    , 'antLabel'
    , 'norLabel'
    , 'xorLabel'
    , 'equLabel'
    , 'notTime'
    , 'nanTime'
    , 'andTime'
    , 'ornTime'
    , 'oroTime'
    , 'antTime'
    , 'norTime'
    , 'xorTime'
    , 'equTime'
    , 'popStat'
    , 'popSizeLabel'
    , 'aFitLabel'
    , 'aEnergyAcqRateLabel'
    , 'aOffspringCostLabel'
    , 'aAgeLabel'
    , 'psFn'
    , 'psNumOrg'
    , 'notButton'
    , 'nanButton'
    , 'andButton'
    , 'ornButton'
    , 'oroButton'
    , 'antButton'
    , 'norButton'
    , 'xorButton'
    , 'equButton'
    , 'notPop'
    , 'nanPop'
    , 'andPop'
    , 'ornPop'
    , 'oroPop'
    , 'antPop'
    , 'norPop'
    , 'xorPop'
    , 'equPop'
    // chart
    , 'yaxis'
    , 'yaxisLabel'
  ];
  var lngth = av.mouse.notDndPopList.length;
  av.mouse.notDndPopShape = [];
  for (var ii = 0; ii < lngth; ii++) {
    av.mouse.notDndPopShape[ii] = 'default';
  };

  //Ind is for individual organism page
  av.mouse.notDndIndList = ['colorMode'
    , 'populationBlock'
    , 'setupBlock'
    , 'popStatsBlock'
    , 'scaleCanvas'
    , 'trashCan'
    , 'organismCanvasHolder'
    , 'organCanvas'
    // Stats
    , 'notOrg'
    , 'nanOrg'
    , 'andOrg'
    , 'ornOrg'
    , 'oroOrg'
    , 'antOrg'
    , 'norOrg'
    , 'xorOrg'
    , 'equOrg'
    , 'notPerf'
    , 'nanPerf'
    , 'andPerf'
    , 'ornPerf'
    , 'oroPerf'
    , 'antPerf'
    , 'norPerf'
    , 'xorPerf'
    , 'equPerf'
    , 'cpuBufferCnvs'
    , 'cpuRegisterCnvs'
    , 'cpuStackAcnvs'
    , 'cpuStackBcnvs'
    , 'cpuOutputCnvs'
    , 'InstructionDetail'
    , 'ExecuteJust'
    , 'ExecuteAbout'
    //Buttons
    , 'populationButton'
    , 'organismButton'
    , 'analysisButton'
    //, 'orgSetting'
    , 'cycleSlider'
    , 'orgCycle'
    , 'orgReset'
    , 'orgBack'
    , 'orgRun'
    , 'orgForward'
    , 'orgEnd'
  ];
  var lngth = av.mouse.notDndIndList.length;
  av.mouse.notDndIndShape = [];
  for (var ii = 0; ii < lngth; ii++) {
    av.mouse.notDndIndShape[ii] = 'default';
  };

  //initialize globals needed to hold Organism Trace Data
  var traceObj = {}; //global that holds the traceObject that was sent from Avida

  //initialize gen (genome) object. Used in organism view
  av.ind = {};
  av.ind.cycle = 0;
  av.ind.update_timer = null;
  av.ind.labeled = [];
  for (ii=0; ii <101; ii++) { av.ind.labeled[ii] = false;}

  av.aww = {}; //avida web worker

  av.msg = {}; //holds functions to send messages between the ui and Avida (web worker)
  av.msg.uiReqestedReset = false;
  av.msg.setupType = 'normal';

  //http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
  // please note,
  // that IE11 now returns undefined again for window.chrome
  // and new Opera 30 outputs true for window.chrome
  // and new IE Edge outputs to true now for window.chrome
  // so use the below updated condition

  av.ui = {};  //user interface functions and variables
  av.ui.popStatFlag = true;  //flag that determines if the stats panel is visible.
  av.ui.orgStatFlag = true;  //flag that determines if the stats panel is visible.
  av.ui.orgInfoHolderMinWidth = 250; //need to cross check with orgInfoHolder in avidaEdEco.css
  av.ui.orgInfo = 'details';   //settings is the other option
  av.ui.beginFlag = true;
  av.ui.oneUpdateFlag = false;
  av.ui.lftSidePnlShowing = true;
  av.ui.version = '2017_0323';
  av.debug.log = '';
  av.debug.log = '--hed: message and error log: version Beta Test ' + av.ui.version;
  av.debug.triggered = 'unknown';

  av.ui.page = 'populationBlock';
  av.ui.subpage = 'Data';
  av.ui.autoStopFlag = false;
  av.ui.autoStopValue = 987654321;
  //used in adjusting size of areas on population page
  av.ui.gridHolderSideBuffer = 0;
  av.ui.popGridCtlWdMin = 380;   //was 430
  av.ui.rightInfoHolderMinWd = 338;
  av.ui.popBotHtMin = 90;
  av.ui.navColIdMinWd = 152;

  //not really ui, but not sure where to put them
  av.ui.num = 0;   //tenporary holder for a number;
  av.ui.numTxt = '';
  av.msg.avidaReady = false;
  av.ui.loadOK = false;  //av.ui.loadOK is set true when the application has been loaded.
  av.ui.showOutlineFlag = false;

  //----------------------------------------------- finding the browser and opperating system ----------------------------
  //http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
  av.brs = {};  //browser and operating system data
  av.brs.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  av.brs.isFirefox = typeof InstallTrigger !== 'undefined';
  // At least Safari 3+: "[object HTMLElementConstructor]"
  av.brs.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  // Internet Explorer 6-11
  av.brs.isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  av.brs.isEdge = !av.brs.isIE && !!window.StyleMedia;
  // Chrome 1+
  av.brs.isChrome = !!window.chrome && !!window.chrome.webstore;
  // Blink engine detection
  av.brs.isBlink = (av.brs.isChrome || av.brs.isOpera) && !!window.CSS;

  //----------------------------------------------------------------------------------------------------------------------
  av.brs.found = 0;
  if (av.brs.isOpera) {
    av.debug.log += '\n     Browser is Opera';
    av.brs.found++;
    av.brs.browser = 'Opera';
    av.debug.log += '\n     Browser is Opera';
  };
  if (av.brs.isFirefox) {
    av.brs.found++;
    av.brs.browser = 'Firefox';
    av.debug.log += '\n     Browser is Firefox';
  }
  if (av.brs.isSafari) {
    av.brs.found++;
    av.brs.browser = 'Safari';
    av.debug.log += '\n     Browser is Safarli';
  }
  if (av.brs.isIE) {
    av.brs.found++;
    av.brs.browser = 'IE';
    av.debug.log += '\n     Browser is IE';
  }
  if (av.brs.isEdge) {
    av.brs.found++;
    av.brs.browser = 'Edge';
    av.debug.log += '\n     Browser is Edge';
  }
  if (av.brs.isChrome) {
    av.brs.found++;
    av.brs.browser = 'Chrome';
    av.debug.log += '\n     Browser is Chrome';
  }
  if (av.brs.isBlink) {
    av.brs.found++;
    av.brs.browser = 'Blink';
    av.debug.log += '\n     Browser is Blink';
  }
  if (0 === av.brs.found) {
    av.brs.browser = 'not found';
    av.debug.log += '\n     Browser is not found';
  }

  //----------------------------------------------------------------------------------------------------------------------

  //console.log('window.navigator',window.navigator);
  // if (av.dbg.flg.root) { console.log('Root: brs', av.brs); }
  // if (av.dbg.flg.root) { console.log('Root: browser info: window.navigator.userAgent=', window.navigator.userAgent); }
  //----------------------------------------------------------------------------------------------------------------------

  av.utl = {};  // holds utility functions

  av.fwt = {}; // file data write
  av.frd = {}; // file data read
  av.fio = {}; //file input output data
  av.fio.dbName = 'wsdb';  //for workspace database
  //av.fio.wsdb = null;
  av.fio.defaultFname = 'default.avidaWs.zip';
  //av.fio.defaultFname = 'default.avidaedworkspace.zip';
  av.aww.uiWorker = null;
  av.fio.fileReadingDone = false;
  //av.fio.defaultUserFname = 'avidaWS.avidaedworkspace.zip';
  av.fio.defaultUserFname = 'avidaWS.avidaWs.zip';
  av.fio.userFname = av.fio.defaultUserFname;
  av.fio.csvFileName = 'avidaDataRecorder.csv';
  av.fio.useDefault = true;
  av.fio.mailAddress = 'Avida-ED-development@googlegroups.com';  //'mailto:diane.blackwood@gmail.com'

  av.dnd = {};  //details in AvidiaEd.js as it access the DOM
  av.dnd.configFlag = 'normal';
  av.dnd.move = {};  //used to hold data needed for dnd type move.

  av.ptd = {};  // on population page that are not part of the grid. (PeTri Dish)
  av.ptd.logicButtons = ['notButton', 'nanButton', 'andButton', 'ornButton', 'oroButton', 'antButton', 'norButton', 'xorButton', 'equButton'];
  av.ptd.rightInfoHolderWd = 395;

  //structure to hold list of ancestor organisms
  av.parents = {};
  //Clear parents/Ancestors
  av.parents.clearParentsFn = function () {
    av.parents.name = [];
    av.parents.injected = [];   //Has it been injeccted?
    av.parents.genome = [];
    av.parents.color = [];
    av.parents.col = [];
    av.parents.row = [];
    av.parents.AvidaNdx = [];
    av.parents.autoNdx = [];
    av.parents.handNdx = [];
    av.parents.howPlaced = [];
    av.parents.domid = [];  //need domID of entry in ancestorBox so that it can be removed from ancestor box when square on grid is dragged from box
    av.parents.Colors = av.color.parentColorList.slice();
    av.parents.Colors.reverse();  //needed for the stack to have the "easy to see" colors on top
    return av.parents;
  };
  //console.log('after clearParents', av.parents.clearParentsFn);

  av.fzr = {};

  //Commments in the environment.cfg file?
  //
  //#comment option
  //#!xor not34 region=all:side=none:supply=finite:gradient=false
  //region options are in av.sgr.region below   There are several name formats and one dictionary below 
  //supply optoins are in av.sgr.supply 
  //side options are in av.sgr.side3
  //gradient options are false/true
  //
  //Name ideas. not01g00 to 99  for gradients   leading zeros by using padStart
  // or not01q_T00, not003n_L00  where T = top, B = bottom, L = left, R = right as the "high side"
  // q suffix on numbrs is q for quarters or n for ninths

  /************************************************************           ideas for regionLayout Names and Region Names --
  // These are ideas tossed about that I'm not currently using - or they are defined lower down. 
  //


  //Avida resource Arguments that have Defaults I might use probably use. If they are the default, they do not need to be in the Environment.cfg file
  /*
  av.sgr.resrcAvidaDefaultGlobalArgu = [ 'initial', 'inflow', 'outflow', 'geometry'   
                                       , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'];

  av.sgr.resrcAvidaDefaultGlobalValu = [ 0, 0, 0.0, 'global', 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1

  av.sgr.resrcAvidaDefaultGridValu =   [ 0, 0, 0.0, 'grid',  1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1
  av.sgr.resrcAvida_EDdfltGlobValu = [ 100, 0, 0.0, 'global', 0, 0, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1

  av.sgr.reSrcAvidaDefaultGridLongArgu = [  'initial',    'inflow',   'outflow', 'geometry'   
                                        ,  'inflowx1',  'inflowx2',  'inflowy1', 'inflowy2'    // not used when geometry = global
                                        , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'    // not used when geometry = global
                                        ,  'xdiffuse',  'ydiffuse',  'xgravity', 'ygravity'];
  av.sgr.reSrcAvidaDefaultGridLongValu =  [ 0, 0, 0.0, 'global'
                                          , 0, 0, 0, 0    //technically deterministic, but Avida-ED is using 0;
                                          , 0, 0, 0, 0    //unset with the second parametner set equal to the first; again Avida-ED uses 0; 
                                          , 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1
*/
/*
  //not in current use
  //av.sgr.supply_argu = ['region', 'hiSide', 'grdNum', 'regionCode','regionList'];           //each is an array for region

  //number of subdishis is useful, especially if we only allow one layout per number of subdishes. 
  //geometry is always the same for all regions, but also part of the avida arguments for resource. 
  //Different ways to discribe layout, only one desciptor needed per task; most of these are just ideas
  av.sgr.layout3 = ['glob', 'all', 'haf', 'thr', '4th'];
  av.sgr.layout = ['Global Dish', 'Whole Dish', 'Halves', 'ThirdsTopLeftRight', 'Quarters'];
  av.sgr.layoutMany = ['glob', 'all', 'halfLR', 'halfTB', '3top1', '3bot1', '3lft1', '3Rit1', '3book', '3stack', '4th'];
  //a dictionary to assign the number of regions based on possible names for region layouts in 'summary' section

  av.sgr.regionDct = {};  //more can be added if needed
  av.sgr.regionDct['all'] = 1;
  av.sgr.regionDct['WholeDish'] = 1;
  av.sgr.regionDct['HalvesLeftRight'] = 2;
  av.sgr.regionDct['ThirdsTopLeftRight'] = 3;
  av.sgr.regionDct['Quarters'] = 4;

                           //region list does not work at this time. It was to create a way to fill out of the data of all tasks based on region. 
                           //     I don't think we need it now. It should go away  when that part of ex1 goes away. 
                           //name will be created from task, subdishnum or region, type and side
                           // 
                           // region list was used to state the index into the array of data that goes with the region in the regionlis. 
                           // so the region lisst for quarters is [empty, 0, 1, 2, 3]
                           // the region list for top bottom would be [empty, empty, empty, empty, empty, 0, 1]

    av.sgr.regionQuarterNamesLower =  ['whole dish', 'upper left', 'upper right', 'lower left', 'lower right', 'top', 'bottom', 'left', 'right']; 
    av.sgr.regionValues =  ['WholeDish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 

    //region List based on 9 sections like a tic-tac-toe board
    av.sgr.regionN3chr =   ['all', 'upL', 'upC', 'upR', 'mdL', 'mdC', 'mdR', 'loL', 'loC', 'loR'
                          , 'lft', 'cen', 'rit', 'top', 'mid', 'bot'];
    av.sgr.regionNcodes = ['_0_', '_1_', '_2_', '_3_', '_4_', '_5_', '_6_', '_7_', '_8_', '_9_'
                          , '147', '258', '369', '123', '456', '789'];
  
  
    //thinking about a situation where either 4ths or 9ths were allowed in Avida-ED
    av.sqr.postfix_q    | 1, 2, |  //layout
                        | 3, 4  |
  
    av.sqr.postfix_n | 1 2 3 |   //sub-sections can be done as for quarters below
      // layout      | 4 5 6 |   // not123n = top one third row
                     | 7 8 9 |
    
    av.sgr.regions = ['1q, 2q, 3q, 4q, 12q, 34q, 13q, 24q] //leading zeros also work
  
    av.sgr.gradient format | 12q_T0, 12q_T1, 12q_T2,   etc //starts at the top (row0)
      defines rows in teh upper half with a gradient with the hightest concentration at the top. 
  */



  //----------------------------------------------------------------------------------------------------------------------
  // av.sgr = These are constants; dictionaries and arrays that might be useful to process 
  //       // environment.cfg --> av.nut.reAct & reSrc (nutrient structure)
  //       // av.nut.reAct & reSrc --> av.nut.uiAll & uiSub
  //       // av.nut --> dom (actual values in the dom that the user sees)
  //       // dom --> av.nut.uiAll & uiSub
  //       // av.nut.uiAll & uiSub --> av.nut.reAct & reSrc
  //       // av.nut.reAct & reSrc --> environment. 
  //       //
  //       // there are extra items in av.sgr as ideas were put in before implementation and not all ideas were used
  //       // in implementation. Eventually after all is working with at least 4 subdishes Diane will clean out extra 
  //       // items in av.sgr
  //----------------------------------------------------------------------------------------------------------------------

  av.sgr = {};   //specific to resource/reactions (sugars); mostly constants. Not all iddeas written here will be used. 
  av.sgr.oseNames = ['Notose', 'Nanose', 'Andose', 'Ornose', 'Orose', 'Antose', 'Norose', 'Xorose', 'Equose'];
  av.sgr.logEdNames = ['0not', '1nan', '2and', '3orn', '4oro', '5ant', '6nor', '7xor', '8equ'];
  av.sgr.logicNames = ['not', 'nan', 'and', 'orn', 'oro', 'ant', 'nor', 'xor', 'equ'];
  av.sgr.logicVnames = ['not', 'nand', 'and', 'orn', 'or', 'andn', 'nor', 'xor', 'equ'];
  av.sgr.reactValues = [ 1.0,   1.0,   2.0,   2.0,   3.0,   3.0,   4.0,   4.0,   5.0];
  av.sgr.monoChromeMaps = ['reddMap', 'orngMap', 'yllwMap', 'lawnMap',  'grenMap', 'seagMap', 'cyanMap', 
                           'cornMap', 'blueMap', 'purpMap', 'mgntMap',  'pinkMap', 'redvMap', 'greyMap'];
  //av.sgr.sugarColors = ['redvMap', 'orngMap',  'yllwMap', 'grenMap',  'cyanMap', 'cornMap',  'blueMap', 'purpMap', 'mgntMap'];
  //av.sgr.sugarColors = ['purpMap', 'blueMap',  'cornMap', 'cyanMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'pinkMap'];
    av.sgr.sugarColors = ['blueMap', 'cornMap',  'cyanMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
    av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
    av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'mgntMap',  'purpMap'];
    av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'redvMap', 'mgntMap',  'purpMap'];
    av.sgr.sugarColors = ['grenMap', 'seagMap',  'cornMap', 'blueMap',  'purpMap', 'mgntMap',  'redvMap', 'orngMap',  'yllwMap'];
  //console.log('sugarColors=', av.sgr.sugarColors);
  av.sgr.sugarBackgroundShade = 40;  //was 30
  av.sgr.sugarNameShade = 345;   //was 365   265 too light for yellow&greens; 300 green ok; yellow still too light (Rob liked 340)
  av.sgr.monoColormaplength = av.color.reddMap.length;
  av.sgr.darkEnd = av.sgr.monoColormaplength-30;          //last color used in the the array for color scale
  av.sgr.sugarGreyShade = 20;
  //console.log('full mono colorMap length =', av.sgr.monoColormaplength, '; greyMap length =', av.color.greyMap.length
  //     , '; darkEnd =', av.sgr.darkEnd, '; sugarBackgroundShade', av.sgr.sugarBackgroundShade, '; sugarNameShade=', av.sgr.sugarNameShade);

  av.sgr.react_valED = [   '',       1,            1,  'missing',   0.0,  1.0,   '',           1,    'pow' ];
  av.sgr.react_argu = ['name', 'value', 'depletable', 'resource', 'min', 'max', 'task', 'max_count', 'type'];   
  av.sgr.reAct_edValu_d = {
    'name' : '',
    'value' : 1,
    'depletable' : 1,
    'resource' : 'missing',
    'min' : 0.999, 
    'max' : 1.0,
    'task' : '',
    'max_count' : 1,
    'type' : 'pow'
  };

  av.sgr.reAct_avidaDft_d = {
      'name' : '',       //name of reaction
      'value' : 1,       //value = 1 through 5 based on number of nan gates needed to do the task. 
      'depletable' : 1,  // depletable = 1 = yes resources are eaten; 0 = no they are not eaten
      'resource' : '',  // name or resource that needs to be present for reaction. if none stated assume infinate
      'min' : 0.0,      // min will be a constant probably 0.9
      'max' : 1.0,      // max will be a constang probably 1.1
      'task' : '',      // one of the logic. s
      'max_count' : 1,  // max_count = 1 always in Avida-ED
      'type' : 'add'    // type = pow always in Avida-ED
  };

  // arugment name in the nutrient structure (nut); which is also the arugment name in the environment.cfg file if relevent
  av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //geometry is always the same, not sure it belongs here
                      , 'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                      , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                      , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                      ,'boxflag', 'boxx', 'boxy', 'boxcol', 'boxrow' ];   //these are new for Avida-ED and not in the wiki. 
                  //belong ui part of structure not resource
                  //, 'region', 'hiSide', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'

  av.sgr.resrc_num = ['initial', 'inflow', 'outflow',
                      , 'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                      , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                      , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                      , 'boxx', 'boxy', 'boxcol', 'boxrow' ];   //these are new for Avida-ED and not in the wiki. 

                    
                    
                    
                    
  av.sgr.uiMin = [-2, -2, 1, -2, -2, 0, -2];  //need to document this tiba                  
  av.sgr.uiMax = [ 0,  0, 0,  0,  0, 0, 1];
  
  av.sgr.uiSubDom_num = ['initialHiNp', 'inflowHiNp', 'outflowHiNp',                
                      'initialLoNp', 'inflowLoNp', 'outflowLoNp', 'periodNp'];  //names of arguements that have numerical values in the dom for each subdish
  av.sgr.uiSubDish_num = ['initialHiNp', 'inflowHiNp', 'outflowHiNp', 
                        , 'initialLoNp', 'inflowLoNp', 'outflowLoNp', 'periodNp', 'area'];  //names of arguements that have numerical values in av.nut[numtsk].uiSub
  av.sgr.ui_subDom_txt = ['supplyType', 'hiSide'];                      
  
  av.sgr.uiSub_Check = [ 'diffuseCheck', 'periodCheck', 'gradientCheck' ];
  av.sgr.ui_subDom_argu = ['supplyType', 'initialHiNp', 'inflowHiNp', 'outflowHiNp', 'periodNp'
                          , 'diffuseCheck', 'periodCheck'   //not sure if regionCode and regionName belong in Dom
                          , 'gradientCheck', 'hiSide', 'initialLoNp', 'inflowLoNp', 'outflowLoNp'];

  av.sgr.ui_subDish_argu = ['supplyType', 'initialHiNp', 'inflowHiNp', 'outflowHiNp', 'periodNp'
                          , 'diffuseCheck', 'periodCheck', 'area'
                          , 'gradientCheck', 'hiSide', 'initialLoNp', 'inflowLoNp', 'outflowLoNp'
                          , 'regionCode', 'regionName', 'boxed' , 'subRegion', 'regionNdx'];  
                        //subRegion is not in Dom, so it is at the end; boxed has not been added to the dom yet
                        //I don't think subRegion is in use. 
  //av.sgr.ui values match the dom, so they are amount per cell; av.sgr.Resrce values match avida, so they are amouth per dish/world. (will adust for cell value later)
  //one each task if I make a data structure from the UI that is separate from what goes in thhe config file.
  av.sgr.ui_allDom_argu = ['geometry', 'supplyType', 'regionLayout', 'initial'];  //'regionsNumOf' is not in dom but found using regionLayout (region layout in the dish)
  av.sgr.ui_allDish_argu = ['geometry', 'supplyType', 'regionLayout', 'initial', 'regionsNumOf'];   //'regionsNumOf' is not in dom, so it is at the end of the list.
  // 'inflow', 'outflow', 'periodFlag';  could be in global, but won't fit on one line in the sumary/details accordian.


  av.sgr.reSrc_avidaDft_d = {
      'initial' : 0
    , 'inflow' : 0
    , 'outflow' : 0.0
    , 'geometry' : 'global' // Avida-ED 'global' = global; Avida-ED 'local = grid; Avida-ED does not used torus
    , 'inflowx1' : 0        // Actually in Avida, inflowx1 is deterministic
    , 'inflowx2' : 0        // = inflowx1;
    , 'inflowy1' : 0        // Actually in Avida, inflowx1 is deterministic
    , 'inflowy2' : 0        // = inflowy1
    , 'outflowx1' : 0    // Actually in Avida, outflowx1 is unset
    , 'outflowx2' : 0    // = outflowx1
    , 'outflowy1' : 0    // Actually in Avida, outflowy1 is unset
    , 'outflowy2' : 0    // = outflowy1
    , 'xdiffuse' : 1.0
    , 'ydiffuse' : 1.0
    , 'xgravity' : 0.0
    , 'ygravity' : 0.0
    , 'boxflag' : false  //box is new for Avida-ED and only in defined within Avida-ED, but not in the wiki at https://github.com/devosoft/avida/wiki/Environment-file
    , 'boxx' : 0
    , 'boxy' : 0 
    , 'boxcol' : 0
    , 'boxrow' : 0
};


//Region Layout in use as of 2019 Dec
  // not ready yet                        <option id="orn0TopLeftRight" class="TopLftRit" value="3TopLftRit">Top/Bottom(L/R)</option>
  // not ready yet                        <option id="orn0Quarters" class="Quarters" value="4Quarters">Quarters</option>

    av.sgr.re_region = /(\D+)(\d+)(.*$)/;
    //av.sgr.regionLayoutValues = ['0Global', '1All', '2LftRit', '2UppLoww', '3TopLftRit', '4Quarters'];
    av.sgr.regionLayoutValues = ['0Global', '1All', '2LftRit', '3TopLftRit', '4Quarters'];

    //entry zero is blank so index matches subregion number 
    av.sgr.name = {};
    av.sgr.code = {};
    av.sgr.name['1All'] = [null, 'Whole Dish'];
    av.sgr.code['1All'] = [null, '000'];
    av.sgr.name['2LftRit'] = [null,'Left', 'Right']; 
    av.sgr.code['2LftRit'] = [null, '013q', '024q']; 
    av.sgr.name['2UppLow'] = [null,'Upper', 'Lower']; 
    av.sgr.code['2UppLow'] = [null, '012q', '034q']; 
    av.sgr.name['3TopLftRit'] = [null, 'Top', 'loL', 'loR'];
    av.sgr.code['3TopLftRit'] = [null, '012q', '003q', '004q'];
    av.sgr.name['4Quarters'] = [null, 'upL', 'upR', 'loL', 'loR'];
    av.sgr.code['4Quarters'] = [null, '001q', '002q', '003q', '004q'];
    
    av.sgr.regionLookup = {};
    av.sgr.regionLookup['000'] = ['1All'];
    av.sgr.regionLookup['013q024q'] = ['2LftRit'];
    av.sgr.regionLookup['012q024q'] = ['2UppLow'];
    av.sgr.regionLookup['001q002q034q'] = ['LftRitLow'];
    av.sgr.regionLookup['001q002q003q004q'] = ['4Quarders'];
    av.sgr.regionLookup['003q004q012q'] = ['3TopLftRit'];
    
  //will need something like the statement below eventuatlly
  //sav.sgr['3TopLftRit'] = ['top', 'Lft', 'Rit'];
  
  
  av.sgr.boxArguments = ['boxflag', 'boxx', 'boxy', 'boxcol', 'boxrow']; //flag is true if in use; false if these arguments are not included. 
                        //boxx and boxy are the upper left corner positions of the region in Avida-ED
                        //boxcol and boxrow is the size of the box, so the lower right corner is (boxx+boxcol-1, boxy+boxrow-1]
  
// Still using this version
    //Region List based on 4 quarters: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half
    av.sgr.regionQuarterNames = ['Whole Dish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 
    av.sgr.regionQuarter3Char = ['all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];   //Use as values when the time comes
    av.sgr.regionQuarterCodes = ['000', '001', '002', '003', '004', '012', '034', '013', '024'];   //These numbers go with the regions above
    av.sgr.regionQuarterCols =  [  1.0,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0,   0.5,   0.5];   //fraction of cols
    av.sgr.regionQuarterRows =  [  1.0,   0.5,   0.5,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0];   //fraction of rows
    av.sgr.regionQuarterColsAdd = [  0,     0,     1,     0,     1,     0,     0,     0,     1];   //add amount if odd cols in world
    av.sgr.regionQuarterRowsAdd = [  0,     0,     0,     1,     1,     0,     1,     0,     0];   //add amount if odd rows in world
    av.sgr.regionQuarterBoxx =  [  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.5];  
    av.sgr.regionQuarterBoxy =  [  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.0];  

// Will convert to version below

    //Region List based on 4 quarters: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half
    av.sgr.regionQuarter = {};
    av.sgr.regionQuarter.Names = ['Whole Dish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 
    av.sgr.regionQuarter['3Char'] = ['all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];   //Use as values when the time comes
    av.sgr.regionQuarter.Codes = ['000', '001', '002', '003', '004', '012', '034', '013', '024'];   //These numbers go with the regions above
    av.sgr.regionQuarter.Cols =  [  1.0,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0,   0.5,   0.5];   //fraction of cols
    av.sgr.regionQuarter.Rows =  [  1.0,   0.5,   0.5,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0];   //fraction of rows
    av.sgr.regionQuarter.ColsAdd = [  0,     0,     1,     0,     1,     0,     0,     0,     1];   //add amount if odd cols in world
    av.sgr.regionQuarter.RowsAdd = [  0,     0,     0,     1,     1,     0,     1,     0,     0];   //add amount if odd rows in world
    av.sgr.regionQuarter.Boxx =  [  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.5];  
    av.sgr.regionQuarter.Boxy =  [  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.0];  
    
    av.sgr.regionNine = {};
    av.sgr.regionNine.Codes = ['000n', '001n', '002n', '003n'   //top row: ninth of dish
                                     , '004n', '005n', '006n'   //middle row
                                     , '007n', '008n', '009n'   //bottom row
                                     , '123n', '456n', '789n'   //rows 
                                     , '147n', '258n', '369n'];  //columns 
  
  // need to figure out how to assign when reading environment.cfg
    av.sgr.supply3 =      ['non', 'inf',  'fin',  'chm',  'poi', 'flo' ];  //none, infinite, finite, chemostat, poison
    av.sgr.supply4 =      ['none', 'infn', 'fint', 'chst', 'pois', 'flow'];
    av.sgr.supplyProper = ['None', 'Infinite', 'Finite', 'Chemostat', 'Flow'];    //only using the first 3 for now; 
    av.sgr.supplylower  = ['none', 'infinite', 'finite', 'chemostat', 'flow'];    //only using the first 3 for now; 
    //Flow would be from the source in a diffrent place fromt he sink: that is input x,y coordinaes are different from those of output. 
    av.sgr.supplyLetter = ['N'  , 'I'  , 'F'  , 'E', 'P', 'S'];   
    av.sgr.side1 = ['L', 'R', 'T', 'B', 'C', 'E', 'U'];
    av.sgr.side3 = ['Lft', 'Rit', 'Top', 'Bot', 'Cen', 'Edg', 'Unk']; //left, right, top, bottom, center, edge, unknown
    av.sgr.side = ['left', 'rite', 'top', 'bottom', 'center', 'edges', 'unknown'];

    av.sgr.hideFlgNames = ['gradient', 'periodic'];  
    av.sgr.hideFlagInit = [true, true];  //true is to hide when areas underdevelopment are hidden. 
    av.sgr.flagInitOpposite = [false, false];  //false in this case is to NOT hide as develpment sections shown.

  av.sgr.nut = {}; 
  //------------------------------------------------------------------------------------------- av.sgr.makeNutDefault --
  av.sgr.makeNutDefault = function () {
    av.sgr.nut.wrldCols = 30;
    av.sgr.nut.wrldRows = 30;
    av.sgr.nut.wrldSize = av.sgr.nut.wrldCols * av.sgr.nut.wrldRows;
    
    av.sgr.nut.dft = {};    
        
    //for user interface 
    av.sgr.nut.dft['uiAll'] = {};
    av.sgr.nut.dft['uiSub'] = {};
    var uiAllDishLen = av.sgr.ui_allDish_argu.length;
    for (jj=0; jj < uiAllDishLen; jj++) {
      av.sgr.nut.dft.uiAll[ av.sgr.ui_allDish_argu[jj] ] = 'default';
    };
    //defaults for items that describe the whole dish
    av.sgr.nut.dft.uiAll.geometry = 'global';        //Needs be the default incase there is no resource, but only a reaction ro a task; in that case the resource is global 
    av.sgr.nut.dft.uiAll.supplyType = 'infinite';    //this is only for whem ui.geometry = global
    av.sgr.nut.dft.uiAll.regionLayout = '0All';  //only Whole Dish for now; '1All' is the code for 'Whole Dish';
    av.sgr.nut.dft.uiAll.regionsNumOf = 1;   // whole dish = there is only one dish 
    av.sgr.nut.dft.uiAll.initial = 1000;      //only used when whem ui.geometry = global and  supplyType = 'finite' 

    //defaults for subtasks which must be Grid or Local
    av.sgr.nut.dft.uiSub.supplyType = 'infinite';  // Infinite default from Avida-ED 3: I think Should change to Finite
    av.sgr.nut.dft.uiSub.initialHi = 1000;  //sugar units/cell guess at an initial value when supplyType='finite'; need to multiply by wrldSize
    av.sgr.nut.dft.uiSub.inflowHi  = 100;   //sugar units/cell guess at an initial value when supplyType='chemostat'; need to multiply by wrldSize
    av.sgr.nut.dft.uiSub.outflowHi = 0.1;   //sugar units (fraction) guess at an initial value when supplyType='chemostat';
    av.sgr.nut.dft.uiSub.area = 900;   //based on a standard 30 x 30 world
    av.sgr.nut.dft.uiSub.diffuseCheck = false;    //false = default;  else true.      
    //from event file
    av.sgr.nut.dft.uiSub.periodCheck = false;    //false = default;  else true.
    av.sgr.nut.dft.uiSub.periodTime = 1000;    //need to play with default time in updates
 
    av.sgr.nut.dft.uiSub.gradientCheck = false;    //false = default;  else true.      
    av.sgr.nut.dft.uiSub.hiSide = 'left';    //only valid for local resources with supply Type = 'gradient' or 'flow';
    av.sgr.nut.dft.uiSub.inflowLo  =   0;  //sugar units/cell guess at an initial value when supplyType='gradient' or 'flow';
    av.sgr.nut.dft.uiSub.outflowLo = 0.1;  //sugar units (fraction) guess at an initial value when supplyType='gradient' or 'flow';
    av.sgr.nut.dft.uiSub.initialLo =   0;  //sugar units/cell guess at an initial value when supplyType='gradient' or 'flow';
    av.sgr.nut.dft.uiSub.regionNdx = 1;   //index into various region data vectors
    av.sgr.nut.dft.uiSub.regionCode = '01';
    av.sgr.nut.dft.uiSub.regionName = 'all';
    av.sgr.nut.dft.uiSub.boxed = true;           //true keeps resources in their subdish; false allows them to flow into the rest of the dish
    av.sgr.nut.dft.uiSub.subRegion = 0;    // this goes with 'all' = regionLayoutName (or 1234 could be used) or 'WholeDish'; tiba check this more than on region allowed
  };                                       // not sure if subregion is in use. 
  //---------------------------------------------------------------------------------------end av.sgr.makeNutDefault --
  av.sgr.makeNutDefault();
  console.log('av.sgr.nut =', av.sgr.nut);   //or should there just be a 'dft' task and only ever one region?
 

  av.nut = {};  // within Nutrients (av.nut) the first element in all arrays refer to the geometry="global". The element has an index = 0;
                // when geometry="grid", Avida-ED calls it "local" and there can be up to 9 subdishes. 
                // subscripts 1-9 can refer upto 9 subsections within a dish. They are actually elements 2-10, but the subscript is 1-9. 
                // at this time, I'm only implementing 1 local section, which like global, covers the "Whole Dish". 
                // av.uiALL.regionLayout has various options which define both how many subdishes can be defined and where in the dish those subdishes are located. 
                // the dom elelment tsk#regionLayout.value will determine number and labels for the subsections. 
                // When more subdishes are implemented, an array or dictionary will be defined for each of the tsk#regionLayout values. 
                 
  //----------------------------------------------------------------------------------------- av.fzr.clearEnvironment --
  // used to create several structures used in defining parameters for the environment.cfg file
  av.fzr.clearEnvironment = function(from) {
    //console.log(from + ' called av.fzr.clearEnvironment');
    av.oldNut = {};
    av.oldNut = JSON.parse(JSON.stringify(av.nut));
    av.nut = {};
    av.nut.hideFlags = {};
    av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.fzr.clearEnvironment');
    av.nut.numRegionsinHTML = 2;
    av.nut.wrldCols = 30;
    av.nut.wrldRows = 30;
    av.nut.wrldSize = av.nut.wrldCols * av.nut.wrldRows;
    // more about environment variables can be found at https://github.com/devosoft/avida/wiki/Environment-file#RESOURCE
    // av.nut is used for normal runs. nut is for nutrients; not used for test runs which run the envornment.cfg file as
    // submitted in the workspace. 

    var logiclen = av.sgr.logicNames.length;
    var rsrcelen = av.sgr.resrc_argu.length; 
    var reactlen = av.sgr.react_argu.length;
    var tsk;
    var uiAllDishLen = av.sgr.ui_allDish_argu.length;
    var uiSubDishLen = av.sgr.ui_subDish_argu.length;
    for (var ii=0; ii< logiclen; ii++) {      //9
      tsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      av.nut[tsk] = {};    
      av.nut[tsk]['resrc'] = {};
      for (var jj=0; jj<rsrcelen; jj++){
        av.nut[tsk]['resrc'][ av.sgr.resrc_argu[jj] ] = [];
      };
      av.nut[tsk]['react'] = {};
      for (var jj=0; jj<reactlen; jj++){
        av.nut[tsk]['react'][ av.sgr.react_argu[jj] ] = [];     //Should these actually lbe left blank if they are really avida defaults? 
                                                                //We don't need to write the avida defaults; We do need to write where Avida-ED devaults don't match avida
      };
      av.nut[tsk]['cells'] = {};
      av.nut[tsk]['cells'].name = [];
      av.nut[tsk]['cells'].initial = [];
      av.nut[tsk]['cells'].inflow = [];
      av.nut[tsk]['cells'].outflow = [];
      av.nut[tsk]['cells'].list = [];
      
      
      //for user interface 
      av.nut[tsk]['uiAll'] = {};
      av.nut[tsk]['uiSub'] = {};
      for (jj=0; jj < uiAllDishLen; jj++) {
        av.nut[tsk].uiAll[ av.sgr.ui_allDish_argu[jj] ] = 'default';
      };
      //defaults for items that describe the whole dish
      // These should be in arrays or dictionaries so that they always match with av.sgr.nut.dft.uiAll - tiba fix later
      av.nut[tsk].uiAll.geometry = 'global';        //Needs be the default incase there is no resource, but only a reaction ro a task; in that case the resource is global 
      av.nut[tsk].uiAll.supplyType = 'infinite';    //this is only for whem ui.geometry = global
      av.nut[tsk].uiAll.regionLayout = '1All';  //only whole dish for now
      av.nut[tsk].uiAll.regionsNumOf = 1;   // whole dishß
      av.nut[tsk].uiAll.initial = -1;      //only used whem ui.geometry = global and  supplyType = 'finite' 

      for (jj=0; jj < uiSubDishLen; jj++) {
        av.nut[tsk]['uiSub'][av.sgr.ui_subDish_argu[jj] ] = [];
      };
    };   //end of looping through the logic tasks.
    //if (av.dbg.flg.nut) {
    if (true) {
      av.cleanNut = {};
      av.cleanNut = JSON.parse(JSON.stringify(av.nut));
      // section to verifiy that av.nut and av.cleanNut are different structurs; console.log statements verified that they are different
      // av.cleanNut[tsk].uiAll.geometry = 'grid';
      // console.log('av.nut[tsk].uiAll.geometry', av.nut[tsk].uiAll.geometry, '; tsk=', tsk);
      // console.log('av.cleanNut[tsk].uiAll.geometry', av.cleanNut[tsk].uiAll.geometry, '; tsk=', tsk);
      //console.log('near end of av.fzr.clearEnvironment');
      console.log('av.oldNut =', av.oldNut);
      console.log('av.cleanNut=', av.cleanNut);
    }
    //console.log('av =',av);

    //--------------------------------------------- av.fzr.env section mighht be delted in future. used for Test Dishes --
    // av.fzr.env is only used for Test Dishes. 
    av.fzr.env = {};
    av.fzr.env.rsrce = {};
    av.fzr.env.react = {}; 
    av.fzr.env.supply = {};

    for (var ii=0; ii< logiclen; ii++) {      //9
      tsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      //var vnm = av.sgr.logicVnames[ii];  
      av.fzr.env.supply[tsk] = [];
      av.fzr.env.rsrce[tsk] = {};    
      for (var jj=0; jj<rsrcelen; jj++){
        av.fzr.env.rsrce[tsk][av.sgr.resrc_argu[jj]] = [];
      }
      av.fzr.env.react[tsk] = {};
      for (var jj=0; jj<reactlen; jj++){
        av.fzr.env.react[tsk][ av.sgr.react_argu[jj] ] = [];
      }
    };
    //console.log('av.fzr.env.react=',av.fzr.env.react);
    //console.log('av.fzr.env.rsrce=',av.fzr.env.rsrce);
    //console.log('av.fzr.env=', av.fzr.env);
   //----------------------------------------------------------------------------- end of av.fzr.env section in globals --
  };
  //------------------------------------------------------------------------------------- end av.fzr.clearEnvironment --

  //------------------------------------------------------------------------------------------- av.sgr.processHideFlags --
  //Flags for fields not yet implemented. 
  av.sgr.processHideFlags = function(boolArry, from) {
    //console.log(from+' called av.sgr.processHideFlags: hideDevelopment=', av.ui.hideDevelopment, '; boolArry=', boolArry);
    //showDevelopment is a flag, when true show parts still under development or debug
    if (undefined != boolArry) {
      // it is defined so use it
      if (boolArry.length < av.sgr.hideFlgNames.length) {
        // but it is too short so fill out with the end of initialized array
        for (var ii=boolArry.length; ii < av.sgr.hideFlgNames.length; ii++) {
          boolArry[ii] = av.sgr.hideFlagInit[ii];
        };
        //console.log('boolArry=', boolArry);
      }
    }
    //not defined so use initialized array if we are hiding development, and the comp[lement if showing development
    else {
      if (av.ui.hideDevelopment) boolArry = av.sgr.hideFlagInit;
      else boolArry = av.sgr.flagInitOpposite;
      //console.log('av.ui.hideDevelopment=', av.ui.hideDevelopment,'; boolArry=', boolArry);    
    };
    //now finally change the flags as needed.
    var len = av.sgr.hideFlgNames.length;
    for (var ii=0; ii < len; ii++) {
      av.nut.hideFlags[av.sgr.hideFlgNames[ii]] = boolArry[ii];
    };
    //console.log('av.nut.hideFlags=',av.nut.hideFlags,'-------------------------------------------------------------');
  };
  //------------------------------------------------------------------------------------ end of av.sgr.processHideFlags --


  //---------------------------------------------------------------- in av.fzr.clearFzr_activeConfig_nutData_Fn --//
  //cannot call av.fzr.clearFzr_activeConfig_nutData_Fn until after saveUpdateState is defined in fileIO.js
  // Clear the ___active config data__  and __av.nut___
  av.fzr.clearFzr_activeConfig_nutData_Fn = function () {
    'use strict';
    av.fzr.dir = {};
    av.fzr.domid = {};
    av.fzr.file = {};
    av.fzr.item = {};
    av.fzr.mDish = {};

    av.dnd.configFlag;  //flag to indicate if the normal or test configuration is in use. 
    av.fzr.cNum = 0;  //value of the next configured dish (config) number
    av.fzr.gNum = 0;  //value of the next organism (genome) number
    av.fzr.mNum = 0;  //value of the next multi-dish (complex-populated dish) number
    av.fzr.rNum = 0;  //value of the next resource dish number
    av.fzr.tNum = 0;  //value of the next test dish number
    av.fzr.wNum = 0;  //value of the next world (populated dish) number

    //probably delete the next few lines
    av.fzr.mDish[0] = {};
    av.fzr.mDish[0].cNum = 0; //number of subdish or index of subdish
    av.fzr.mDish[0].wNum = 0;
    av.fzr.mDish[0].dirA = [];
    av.fzr.mDish[0].dir = {};
    av.fzr.mDish[0].domid = {};
    av.fzr.mDish[0].file = {};
    av.fzr.mDish[0].item = {};
    //to here

    //hold genome for active organism in Organism View
    av.fzr.actOrgan = {'name': '', 'actDomid': '', 'fzDomid': '', 'genome': ''};
    //hold genome for active organism in Organism View
    av.fzr.actConfig = {'name': '', 'actDomid': '', 'fzDomid': '', 'type': '', 'dir': ''};
    av.fzr.actConfig.file = {};
    av.fzr.pop = [];
    //the pops hold the data for the populated dishes for the Analysis page
    for (var ii=0; ii<3; ii++) {
      av.fzr.pop[ii] = {};
      av.fzr.pop[ii].fit = [];
      av.fzr.pop[ii].ges = [];
      av.fzr.pop[ii].met = [];
      av.fzr.pop[ii].num = [];
      av.fzr.pop[ii].via = [];
    }
    av.fzr.saveUpdateState('yes');
    av.fzr.subDishOrNot = 'none';
    av.fzr.clearEnvironment('av.fzr.clearFzr_activeConfig_nutData_Fn');
  };

  //--------------------------------------------------------------- end av.fzr.clearFzr_activeConfig_nutData_Fn --//

  av.fzr.saveState = 'default';
  av.fzr.workspaceName = 'default';

  // Does NOT clear the active config data
  av.fzr.clearMainFzrFn = function () {
    'use strict';
    if (av.debug.fzr) { console.log('Freezer: in ClearMainFzrFn'); }


    //Clear each section of the freezer and active organism and ancestorBox
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzConfig.selectAll', av.dnd.fzConfig); }
    av.dnd.fzConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzConfig.sync'); }
    av.dnd.fzConfig.sync();   //should be done after insertion or deletion
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzOrgan.selectAll=', av.dnd.fzOrgan); }
    av.dnd.fzOrgan.selectAll().deleteSelectedNodes();
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzOrgan.sync'); }
    av.dnd.fzOrgan.sync();

  /*
    if (av.debug.fzr) console.log('Freezer: before av.dnd.fzMdish.selectAll=', av.dnd.fzMdish);
    av.dnd.fzMdish.selectAll().deleteSelectedNodes();
    if (av.debug.fzr) console.log('Freezer: before av.dnd.fzMdish.sync');
    av.dnd.fzMdish.sync();
  */

    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzWorld.selectAll=', av.dnd.fzWorld); }
    av.dnd.fzWorld.selectAll().deleteSelectedNodes();
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzWorld.sync'); }
    av.dnd.fzWorld.sync();
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.ancestorBox.selectAll=', av.dnd.ancestorBox); }
    av.dnd.ancestorBox.selectAll().deleteSelectedNodes();
    if (av.debug.fzr) { console.log('Freezer: before av.dnd.ancestorBox.sync'); }
    av.dnd.ancestorBox.sync();

    if (av.debug.fzr) { console.log('Freezer: before av.fzr.saveUpdateState'); }
    av.fzr.saveUpdateState('yes');
    if (av.debug.fzr) { console.log('Freezer: end of ClearMainFzrFn'); }
  };


  av.grd = {};         //data about the grid canvas
  av.grd.popStatsMsg = {};
  av.dom = {};    //dom id shortcuts
  av.dsz = {};    //dom size of elements in the dom
  av.doj = {};    //dom dojo id shortcuts

  av.grd.fnChosen = [];
  for (var ii = 0; ii < 9; ii++) { av.grd.fnChosen[av.ptd.logicButtons[ii]] = false; }

  // initialize data for chart on population page
  av.grd.ytitle = 'Average Fitness';
  av.grd.need2DrawGrid = true;
  av.grd.newlyNone = true;

  av.grd.clearGrd = function () {
    av.grd.cmap = av.color.Gnuplot2cmap;  //default colormap
    av.grd.runState = 'prepping';  //'started'; 'world';
    av.grd.updateNum = 0;
    av.grd.selectedNdx = -1;
    av.grd.cols = 0;    //Number of columns in the grid
    av.grd.rows = 0;    //Number of rows in the grid
    av.grd.sizeX = 0;  //size of canvas in pixels
    av.grd.sizeY = 0;  //size of canvas in pixels
    av.grd.boxX = 0;   //size based zoom
    av.grd.boxY = 0;   //size based zoom
    av.grd.flagSelected = false; //is a cell selected
    av.grd.zoom = 1;     //magnification for zooming.
    //structure for colors in the grid
    av.grd.fill = [];  //deals with color to fill a grid cell
    av.grd.logicOutline = [];   // deals with the color of the grid outline
    av.grd.fillmax = 0;    // max value for grid scale for the gradient color
    av.grd.msg = {};
    av.grd.mxFit = 1.0;   //store initial maximum fitness during an experiment
    av.grd.mxCost = 380;  //store initial maximum Offspring Cost during an experiment
    av.grd.mxRate = 80;   //store initial maximum Energy Acq. Rate during an experiment
    av.grd.mxRnot = 1.0;  //store initial maximum not Resource in any cell during an experiment.
    av.grd.mxRnan = 1.0;  //store initial maximum nan Resource in any cell during an experiment.
    av.grd.mxRand = 1.0;  //store initial maximum and Resource in any cell during an experiment.
    av.grd.mxRorn = 1.0;  //store initial maximum orn Resource in any cell during an experiment.
    av.grd.mxRoro = 1.0;  //store initial maximum oro Resource in any cell during an experiment.
    av.grd.mxRant = 1.0;  //store initial maximum ant Resource in any cell during an experiment.
    av.grd.mxRnor = 1.0;  //store initial maximum nor Resource in any cell during an experiment.
    av.grd.mxRxor = 1.0;  //store initial maximum xor Resource in any cell during an experiment.
    av.grd.mxRequ = 1.0;  //store initial maximum equ Resource in any cell during an experiment.

    av.grd.rescaleTolerance = 0.1;
    av.grd.rescaleTimeConstant = 1;
    av.grd.SelectedColor = '#ffffff';
    av.grd.LogicColor = '#00ff00';   //color used to outline cells with avidians that can do the selected logic functions
    av.grd.cellOutline = '#00aa00';  //color used to outline all cells with avidians 
    av.grd.kidStatus = '';

    av.grd.legendPad = 10;   //padding on left so it is not right at edge of canvas
    av.grd.colorWide = 13;   //width and heigth of color square
    av.grd.RowHt = 20;       //height of each row of text
    av.grd.leftpad = 10;     //padding to allow space between each column of text in the legend
    av.grd.marginX = 1;  //width of black line between the cells
    av.grd.marginY = 1;  //width of black line between the cells

    av.grd.oldUpdate = -10;
    av.ptd.autoPauseUpdate = 1000;

    av.msg.ByCellIDgenome = '';        //Holdes the genome which is needed to freeze a cell.
    av.msg.previousUpdate = -10;
    av.grd.popStatsMsg.update = -5;
    av.ptd.allOff = true;

    av.ptd.validGridSize = true;
    av.ptd.validMuteInuput=true;
    av.grd.selFnText = 'none';
    av.grd.selFnBinary = '000000000';

    av.grd.gridWasCols = 20;
    av.grd.gridWasRows = 20;
  };
  av.grd.clearGrd();

  av.pch = {};   // related to the chart on the population page
  av.pch.dadMax = 16;

  av.pch.clearPopChrt = function () {
    av.pch.needInit = true; //Added on 2019 Dec 10 Tues; not sure if it belongs here or not
    av.pch.ht = 10;
    av.pch.wd = 10; 
    //console.log('av.pch.wd', av.pch.wd);    // when duging why plotly crashed; turned out plotly crashs if div holding plot is not displayed
    av.pch.yValue = 'new';
    av.pch.yChange = 'false';
    av.pch.popY = [];
    av.pch.logY = [];
    av.pch.xx = [];
    av.pch.aveFit = [0];  //ave is for all avidians.
    av.pch.logFit = [0];  //log is for avidians that performm logic functions
    av.pch.aveCst = [0];  //Offspring Cost - used to be Offspring Cost
    av.pch.logCst = [0];
    av.pch.aveEar = [0];
    av.pch.logEar = [0];
    av.pch.aveNum = [0];
    av.pch.logNum = [0];
    av.pch.aveVia = [0];
    av.pch.nUpdate = [];    //not sure if this is needed.  
    av.pch.aveMaxFit = 0.1;
    av.pch.aveMaxCst = 0.1;
    av.pch.aveMaxEar = 0.1;
    av.pch.aveMaxNum = 0.1;
    av.pch.aveMaxVia = 0.1;
    av.pch.logMaxFit = 0;
    av.pch.logMaxCst = 0;
    av.pch.logMaxEar = 0;
    av.pch.logMaxNum = 0;

    av.pch.fnBinary = '000000000';
    av.pch.dadFit = {};
    av.pch.dadCst = {};
    av.pch.dadEar = {};
    av.pch.dadNum = {};
    av.pch.dadVia = {};
    av.pch.numDads = 1;

    av.pch.maxX = 10;
    av.pch.maxY = 1;

    av.pch.makeTrace = function(xx, yy, type, mode, name, color, width, texture) {
      this.x = xx;
      this.y = yy;
      this.type = type;
      this.name = name;
      this.line = {};
      this.line.color = color;
      this.line.width = width;
      this.line.dash = texture;    //solid  dot  dash    dashdot
    };

    av.pch.trace0 = new av.pch.makeTrace(av.pch.xx, av.pch.popY, 'scatter', 'lines', 'Population', 'rgb(2, 2, 2)', 1, 'solid');
  /*
    av.pch.trace0 = {
      x:av.pch.xx, y:av.pch.popY, type:'scatter', mode: 'lines', name: 'Population',
      line: {color: 'rgb(2, 2, 2)', width: 1, dash: 'solid' }
    };
  */
    av.pch.trace1 = {
      x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines', name: 'Function Subset',
      //line: {color: 'rgb(0, 255, 0)', width: 1 }
      //line: {color: '#00FF00', width: 1, dash: 'solid' }   //dash: (solid   dot    dashdot   dash
      line: {color: '#00FF00', width: 1, dash: 'solid' }
    };
    av.pch.pixel = {wd: 310, ht: 202, wdif:10, hdif:2};
    av.pch.data = [av.pch.trace0, av.pch.trace1];
    av.pch.layout = {
      autosize: false,
      width: 300,
      height: 200,
      margin: { l: 35, r: 2, b:40, t: 2},   //l was 85 to show all-functions
      showlegend: false,
      xaxis: {
        title: 'Time (updates)',
        rangemode: 'tozero',
        autorange: true,
        //range: [0, 10],
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: '',
        showticklabels: true
      },
      yaxis: {
        rangemode: 'tozero',
        autorange: true,
        //srange: [0, 1],
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: '',
        showticklabels: true
      }
    };
      // Plotly configuration including that of the modebar
      // https://plot.ly/javascript/configuration-options/#hide-the-modebar-with-plotly.js
      // https://community.plot.ly/search?q=modebar%20options%20list    might also be useful
      av.pch.widg = {                // https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
      autosizable: true              // plot will respect layout.autosize=true and infer its container size
      ,fillFrame: false              // if we DO autosize, do we fill the container or the screen?
      ,frameMargins: 0               // if we DO autosize, set the frame margins in percents of plot
      ,sizescrollZoom: true          // mousewheel or two-finger scroll zooms the plot
      ,showTips: true                // new users see some hints about interactivity
      ,showLink: false               // link to edit image of graph - this is an edit link outside of the modebar
      ,sendData: true                // if we show a link, does it contain data or just link to a plotly file?
      ,staticPlot: false             // no interactivity, for export or image generation
      ,displaylogo: false            // hides plotly logo
      ,displayModeBar: 'hover'       // display the mode bar (true, false, or 'hover')
      ,responsive: true        //added 2019_10 not sure I needed to
      ,modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
        'toImage'           //makes png file
        ,'sendDataToCloud'  //sends data to plotly web editor workspace
        //,'zoom2d'           //zoom to a box defined with cursor
        //,'pan2d'            //pan
        ,'select2d'         //this one does not seem to turn anything on/off
        ,'lasso2d'          //this one does not seem to turn anything on/off
        ,'zoomIn2d'           //zoom in
        ,'zoomOut2d'          //zoom out
        //,'autoScale2d'
        ,'resetScale2d'
          , 'hoverClosestCartesian'  //shows values as an (x,y) pair
          , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
          , 'toggleSpikelines'         //new button that sows horizotal and vertical lines to each axis from the nearest data point
      ]
    };
  };
  av.pch.clearPopChrt();

    av.anl = {};  //Analysis page functions and data
    av.anl.color = [];   //holds the three colors for the three populations
    av.anl.pop = [];
    av.anl.hasPopData = [];
    av.anl.abbreviate = {};
      av.anl.abbreviate['Average Fitness'] = 'Fitness';
      av.anl.abbreviate['Average Offspring Cost'] = 'Cost';
      av.anl.abbreviate['Average Energy Acq. Rate'] = 'EAR';
      av.anl.abbreviate['Number of Organisms'] = 'Num';

  av.anl.clearChart = function () {
    for (var ii = 0; ii < 3; ii++) {
      av.anl.pop[ii] = {};
      av.anl.pop[ii].left = [];
      av.anl.pop[ii].right = [];
      av.anl.hasPopData[ii] = false;

    }
    av.anl.xx = [];
    //av.anl.xx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //av.anl.pop[0].left = [1, 3, 2, 5, 4, 7, 6];
    //av.anl.pop[0].right = [3, 5, 4, 7, 6, 9, 8, 11, 10];

    av.anl.trace0 = {
        x: av.anl.xx.slice(0,av.anl.pop[0].left.length)
      , y: av.anl.pop[0].left
      , type: 'scatter'
      , mode: 'lines'
      , name: 'tr0',
      line: {color: av.color.names['Red'], width: 3}
    };
    av.anl.trace1 = {
      x: av.anl.xx.slice(0,av.anl.pop[0].right.length), y: av.anl.pop[0].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
      line: {color: av.color.names['Red'], width: 1}
    };
    av.anl.trace2 = {
      x: av.anl.xx.slice(0,av.anl.pop[1].left.length), y: av.anl.pop[1].left, type: 'scatter', mode: 'lines', name: 'tr2',
      line: {color: av.color.names['Blue'], width: 3}
    };
    av.anl.trace3 = {
      x: av.anl.xx.slice(0,av.anl.pop[1].right.length), y: av.anl.pop[1].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
      line: {color: av.color.names['Blue'], width: 1}
    };
    av.anl.trace4 = {
      x: av.anl.xx.slice(0,av.anl.pop[2].left.length), y: av.anl.pop[2].left, type: 'scatter', mode: 'lines', name: 'tr4',
      line: {color: av.color.names['Black'], width: 3}
    };
    av.anl.trace5 = {
      x: av.anl.xx.slice(0,av.anl.pop[2].right.length), y: av.anl.pop[2].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
      line: {color: av.color.names['Black'], width: 1}
    };

    av.anl.data = [av.anl.trace0, av.anl.trace1, av.anl.trace2, av.anl.trace3, av.anl.trace4, av.anl.trace5];
    //av.anl.data = [av.anl.trace0, av.anl.trace1];
    av.anl.layout = {
      autosize: false,
      margin: {l: 55, r: 55, b: 40, t: 10},   //l was 85 to show all-functions when y=0 not shown
      showlegend: false,
      xaxis: {
        title: 'Time (updates)',
        rangemode: 'tozero',
        autorange: true,
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: '',
        showticklabels: true
      },
      yaxis: {
        rangemode: 'tozero',
        autorange: true,
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: '',
        showticklabels: true
      },
      yaxis2: {
        //title: 'yaxis2 title',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
    };
    // Plotly configuration including that of the modebar
    // https://plot.ly/javascript/configuration-options/#hide-the-modebar-with-plotly.js
    av.anl.widg = {                // https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
      autosizable: true              // plot will respect layout.autosize=true and infer its container size
      , fillFrame: false              // if we DO autosize, do we fill the container or the screen?
      , frameMargins: 0               // if we DO autosize, set the frame margins in percents of plot
      , sizescrollZoom: true          // mousewheel or two-finger scroll zooms the plot
      , doubleClick: 'reset+autosize' // double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
      , showTips: true                // new users see some hints about interactivity
      , showLink: false               // link to edit image of graph - this is an edit link outside of the modebar
      , sendData: true                // if we show a link, does it contain data or just link to a plotly file?
      , staticPlot: false             // no interactivity, for export or image generation
      , displaylogo: false            // hides plotly logo
      , displayModeBar: 'hover'       // display the mode bar (true, false, or 'hover')
      ,responsive: true        //added 2019_10 not sure I needed to
      , modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
         'toImage'           //makes png file
        ,'sendDataToCloud'  //sends data to plotly web editor workspace
        //,'zoom2d'           //zoom to a box defined with cursor
        //,'pan2d'            //pan
        //,'select2d'         //this one does not seem to turn anything on/off
        //,'lasso2d'          //this one does not seem to turn anything on/off
        , 'zoomIn2d'           //zoom in
        //, 'zoomOut2d'          //zoom out
        //, 'autoScale2d'
        , 'resetScale2d'
        , 'hoverClosestCartesian'  //shows values as an (x,y) pair
        , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
        , 'toggleSpikelines'         //new button that sows horizotal and vertical lines to each axis from the nearest data point
      ]
    };
  };
  av.anl.clearChart();
  
  console.log('end of globals');

  //----------------------------------------------------------------------------------------------------------------------
  // Notes on page layout
  //----------------------------------------------------------------------------------------------------------------------
  // AllAvida: 937
  // Population page: Initial assume a square grid and both sidebars open. 
  // navColID or navColClass: wd = 152 includling 2px for a 1 px border. (minimum nice wd) about 84 too narrow, but works. 
  // mainBlockHolder: wd = 
  // rightInfoHolder: mn wd = 500 inlcuding border
  // popStatsBlock: min wd = 364 no border. 
  // selOrgType: min wd = 164  (might make a tad smaller) includes 1 px border
  // popStats4grid: min wd = 176   (get left over)