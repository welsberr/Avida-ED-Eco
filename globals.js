  //
  // change color and change data line select/item don't work in Analysis page
  //
  //
  ////***************************************
  // Defaults and Constants
  // one global to hold them all.
  var av = av || {};  //incase av already exists

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
  av.debug.root = false;  //statements that look for failiers when the code executes outside of functions
  av.debug.trace = false;  //organism page
  av.debug.uil = false; //user interface layout.
  av.debug.userMsg = false; //debug of user messages.

  av.dbg = {};
  av.dbg.flg = {}; 
  av.dbg.flg.nut = true;
  av.dbg.flg.plt = true;  //both popChart and analysis

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

  /*
  //default values - these are not in use; the values now come from the file system
  av.dft = {};
  av.dft.sizeCols = 100;
  av.dft.sizeRows = 100;
  av.dft.muteInput = 2;   //percent
  av.dft.child = 'childParentRadio';  //alternate = childRandomRadio
  av.dft.nearParent = true;
  av.dft.notose = true;
  av.dft.nanose = true;
  av.dft.andose = true;
  av.dft.ornose = true;
  av.dft.orose = true;
  av.dft.andnose = true;
  av.dft.norose = true;
  av.dft.xorose = true;
  av.dft.equose = true;
  av.dft.repeat = 'experimentRadio';   //alternate = 'demoRadio'
  av.dft.autoPauseNum = 1000;
  */

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
    , 'activeOrgImg'
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
  av.ui.popInfoHolderMinWd = 338;
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
  if (av.debug.root) { 
    console.log('Root: brs', av.brs);
    console.log('Root: browser info: window.navigator.userAgent=', window.navigator.userAgent);
  }
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
  av.dnd.move = {};  //used to hold data needed for dnd type move.

  av.ptd = {};  // on population page that are not part of the grid. (PeTri Dish)
  av.ptd.logicButtons = ['notButton', 'nanButton', 'andButton', 'ornButton', 'oroButton', 'antButton', 'norButton', 'xorButton', 'equButton'];
  av.ptd.popInfoHolderWd = 395;

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
  //

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

  av.sgr.react_fake = [ 'pow',   0.9,   1.0,      1,             1,     'not1',  'not',     'not1',    1   ];
  av.sgr.react_argu = ['type', 'min', 'max', 'max_count', 'depletable', 'name', 'task', 'resource', 'value']; 
  av.sgr.react_valED = ['pow',  0.99999,  1,           1,            0,     '',     '',  'missing',    0   ];
                              //depletable = 1 = yes resources are eaten; 0 = no they are not eaten
                              //type = pow always in Avida-ED
                              //value = 1 through 5 based on number of nan gates needed to do the task. 
                              //max_count = 1 always in Avida-ED
                              //min will be a constant probably 0.9
                              //max will be a constang probably 1.1

  av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //geometry is always the same, not sure it belongs here
                              ,  'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                              , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                              , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                              ,'boxflag', 'boxx', 'boyy', 'boxcol', 'boxrow' ];   //these are new for Avida-ED and not in the wiki. 

                              //belong ui part of structure not resource
                              //, 'region', 'side', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'


  //Avida resource Arguments that have Defaults I will probably use. If they are the default, they do not need to be in the Environment.cfg file
  av.sgr.resrcAvidaDefaultGlobalArgu = [ 'initial', 'inflow', 'outflow', 'geometry'   
                                       , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'];
  av.sgr.resrcAvidaDefaultGlobalValu = [ 0, 0, 0.0, 'global', 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1

  av.sgr.resrcAvidaDefaultGridValu = [ 0, 0, 0.0, 'grid', 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1
  av.sgr.resrcAvida_EDdefaultValu =   [ 100, 0, 0.0, 'global', 0, 0, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1

  //not in current use
  //av.sgr.supply_argu = ['region', 'side', 'grdNum', 'regionCode','regionList'];           //each is an array for region

  /************************************************************           ideas for regionLayout Names and Region Names --
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

                           //region list does not work at this time. It was to create a way to fill out on the data ofr all tasks based on region. 
                           //     I don't think we need it now. It should go away  when that part of ex1 goes away. 
                           //name will be created from task, subdishnum or region, type and side
                           // 
                           // region list was used to state the index into the array of data that goes with the region in the regionlis. 
                           // so the region lisst for quarters is [empty, 0, 1, 2, 3]
                           // the region list for top bottom would be [empty, empty, empty, empty, empty, 0, 1]

    av.sgr.regionNamesLower =  ['whole dish', 'upper left', 'upper right', 'lower left', 'lower right', 'top', 'bottom', 'left', 'right']; 
    av.sgr.regionValues =  ['WholeDish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 

    //region List based on 9 sections like a tic-tac-toe board
    av.sgr.regionN3chr =   ['all', 'upL', 'upC', 'upR', 'mdL', 'mdC', 'mdR', 'loL', 'loC', 'loR'
                          , 'lft', 'cen', 'rit', 'top', 'mid', 'bot'];
    av.sgr.regionNcodes = ['_0_', '_1_', '_2_', '_3_', '_4_', '_5_', '_6_', '_7_', '_8_', '_9_'
                          , '147', '258', '369', '123', '456', '789'];
  */

  //Region Layout in use as of 2019 Dec

    av.sgr.re_region = /(\D+)(\d+)(.*$)/;
    av.sgr.regionLayoutValues = ['1All', '2LftRit', '3TopLftRit', '4Quarters'];

  //will need something like the statement below eventuatlly
  //sav.sgr['3TopLftRit'] = ['top', 'Lft', 'Rit'];

    //Region List based on 4 quarters: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half
    av.sgr.regionNames =  ['Whole Dish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 
    av.sgr.region3char = ['all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];   //Use as values when the time comes
    av.sgr.regionCodes = [ '00',  '01',  '02',  '03',  '04',  '12',  '34',  '13',  '24'];   //These numbers go with the regions above


  av.sgr.resrcAvidaDefaultGridArgu = [  'initial', 'inflow', 'outflow', 'geometry'   
                                    ,  'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'    // not used when geometry = global
                                    , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'    // not used when geometry = global
                                    ,  'xdiffuse',  'ydiffuse',  'xgravity',  'ygravity'];
  av.sgr.resrcAvidaDefaultGridValu =  [ 0, 0, 0.0, 'global'
                                        , 0, 0, 0, 0    //technically deterministic, but Avida-ED is using 0;
                                        , 0, 0, 0, 0    //unset with the second parametner set equal to the first; again Avida-ED uses 0; 
                                        , 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1
  av.sgr.boxArguments = ['boxflag', 'boxx', 'boyy', 'boxcol', 'boxrow']; //flag is true if in use; false if these arguments are not included. 
                        //boxx and boxy are the upper left corner positions of the region in Avida-ED
                        //boxcol and boxrow is the size of the box, so the lower right corner is (boxx+boxcol-1, boxy+boxrow-1]



  // need to figure out how to assign when reading environment.cfg
    av.sgr.supply3 =      ['non', 'inf',  'fin',  'equ',  'poi', 'flo' ];  //none, infinite, finite, equilibrium, poison
    av.sgr.supply4 =      ['none', 'infn', 'fint', 'equl', 'pois', 'flow'];
    av.sgr.supply  =      ['None', 'Infinite', 'Finite', 'Equilibrium', 'Flow'];    //only using the first 3 for now; 
    av.sgr.supplylower  = ['none', 'infinite', 'finite', 'equilibrium', 'flow'];    //only using the first 3 for now; 
    //Flow would be from the source in a diffrent place fromt he sink: that is input x,y coordinaes are different from those of output. 
    av.sgr.supplyLetter = ['N'  , 'I'  , 'F'  , 'E', 'P', 'S'];   
    av.sgr.side1 = ['L', 'R', 'T', 'B', 'C', 'E', 'U'];
    av.sgr.side3 = ['Lft', 'Rit', 'Top', 'Bot', 'Cen', 'Edg', 'Unk']; //left, right, top, bottom, center, edge, unknown
    av.sgr.side = ['left', 'rite', 'top', 'bottom', 'center', 'edges', 'unknown'];

    av.sgr.hideFlgNames = ['gradient', 'periodic'];  
    av.sgr.hideFlagInit = [true, true];  //true is to hide when areas underdevelopment are hidden. 
    av.sgr.flagInitOpposite = [false, false];  //false in this case is to NOT hide as develpment sections shown.

  //one each task if I make a data structure from the UI that is separate from what goes in thhe config file.
  av.sgr.ui_allDom_argu = ['geometry', 'supplyType', 'regionLayout', 'initial'];  //'regionsNumOf' is not in dom but found using regionLayout (region layout in the dish)
  av.sgr.ui_allDish_argu = ['geometry', 'supplyType', 'regionLayout', 'initial', 'regionsNumOf'];   //'regionsNumOf' is not in dom, so it is at the end of the list.
  // 'inflow', 'outflow', 'periodFlag';  could be in global, but won't fit on one line in the sumary/details accordian.

  //each task; each subregion; 'subRegion' is needed, but it is not a named item in the dom
  av.sgr.ui_subDom_argu = ['supplyType', 'initialHiInput', 'inflowHiInput', 'outflowHiInput', 'diffuseCheck'
                          , 'periodCheck', 'periodInput'                                                          //not sure if regionCode and regionName belong in Dom
                          , 'gradientCheck', 'sideSelect', 'initialLoInput', 'inflowLoInput', 'outflowLoInput'];
  // arugment name in the nutrient structure (nut); which is also the arugment name in the environment.cfg file if relevent
  av.sgr.ui_subDish_argu = ['supplyType', 'initialHi', 'inflowHi', 'outflowHi', 'diffuseCheck'
                          , 'periodCheck', 'periodTime'
                          , 'gradientCheck', 'side', 'initialLo', 'inflowLo', 'outflowLo'
                          , 'regionCode', 'regionName', 'boxed' , 'subRegion'];  //subRegion is not in Dom, so it is at the end; boxed has not been added to the dom yet
                         //regionName should probably be in the dom, but it is not right now with only one region. 

  av.nut = {};  // within Nutrients (av.nut) the first element in all arrays refer to the geometry="global". The element has an index = 0;
                // when geometry="grid", Avida-ED calls it "local" and there can be up to 9 subdishes. 
                // subscripts 1-9 can refer upto 9 subsections within a dish. They are actually elements 2-10, but the subscript is 1-9. 
                // at this time, I'm only implementing 1 local section, which like global, covers the "Whole Dish". 
                // av.uiALL.regionLayout has various options which define both how many subdishes can be defined and where in the dish those subdishes are located. 
                // the dom elelment tsk#regionLayout.value will determine number and labels for the subsections. 
                // When more subdishes are implemented, an array or dictionary will be defined for each of the tsk#regionLayout values. 
                // 
  //------------------------------------------------------------------------------------------- av.fzr.clearEnvironment --
  // used to create several structures used in defining parameters for the environment.cfg file
  av.fzr.clearEnvironment = function(from) {
    //console.log(from + ' called av.fzr.clearEnvironment');
    av.oldnut = av.nut;
    av.nut = {};
    av.nut.hideFlags = {};
    av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.fzr.clearEnvironment');

    // more about environment variables can be found at https://github.com/devosoft/avida/wiki/Environment-file#RESOURCE
    // av.nut is used for normal runs. nut is for nutrients

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
        av.nut[tsk]['react'][ av.sgr.react_argu[jj] ] = [];     
      };
      //from user interface 
      av.nut[tsk]['uiAll'] = {};
      av.nut[tsk]['uiSub'] = {};
      for (jj=0; jj < uiAllDishLen; jj++) {
        av.nut[tsk].uiAll[ av.sgr.ui_allDish_argu[jj] ] = 'default';
      };
      //defaults for items that describe the whole dish
      av.nut[tsk].uiAll.geometry = 'Global';        //Needs be the default incase there is no resource, but only a reaction ro a task; in that case the resource is global 
      av.nut[tsk].uiAll.supplyType = 'Infinite';    //this is only for whem ui.geometry = global
      av.nut[tsk].uiAll.regionLayout = '1All';  //only whole dish for now
      av.nut[tsk].uiAll.regionsNumOf = 1;   // whole dishß
      av.nut[tsk].uiAll.initial = 1000;      //only whem ui.geometry = global and  supplyType = 'finite' 

      for (jj=0; jj < uiSubDishLen; jj++) {
        av.nut[tsk]['uiSub'][av.sgr.ui_subDish_argu[jj] ] = [];
      };
      // a few defaults for when resources are local
      for (kk=1; kk<=1; kk++) {                  //later the subRegion will be determined by x, x coordinates
        av.nut[tsk].uiSub.subRegion[kk] = kk;    // this goes with 'all' = regionLayoutName (or 1234 could be used) or 'WholeDish'; tiba check this more than on region allowed
        av.nut[tsk].uiSub.supplyType[kk] = 'unknown';  //Lamar this may need to change
        av.nut[tsk].uiSub.initialHi[kk] = 1000;  //sugar units/cell guess at an initial value when supplyType='finite';
        av.nut[tsk].uiSub.inflowHi[kk]  = 100;   //sugar units/cell guess at an initial value when supplyType='equilibrium';
        av.nut[tsk].uiSub.outflowHi[kk] = 0.1;  //sugar units/cell guess at an initial value when supplyType='equilibrium';
        av.nut[tsk].uiSub.inflowLo[kk]  =   0;  //sugar units/cell guess at an initial value when supplyType='gradient' or 'flow';
        av.nut[tsk].uiSub.outflowLo[kk] = 0.1;  //sugar units/cell guess at an initial value when supplyType='gradient' or 'flow';
        av.nut[tsk].uiSub.initialLo[kk] =   0;  //sugar units/cell guess at an initial value when supplyType='gradient' or 'flow';
        av.nut[tsk].uiSub.side[kk] = 'left';    //only valid for local resources with supply Type = 'gradient' or 'flow';
        av.nut[tsk].uiSub.diffuseCheck[kk] = false;    //false = default;  else true.      
        av.nut[tsk].uiSub.gradientCheck[kk] = false;    //false = default;  else true.      
        //from event file
        av.nut[tsk].uiSub.periodCheck[kk] = false;    //false = default;  else true.   
        av.nut[tsk].uiSub.boxed[kk] = true;           //true keeps resources in their subdish; false allows them to flow into the rest of the dish
      }
    };
    console.log('av.nut =',av.nut);
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


  //-------------------------------------------------------------------------------------------- in av.fzr.clearFzrFn --//
  //cannot call av.fzr.clearFzrFn until after saveUpdateState is defined in fileIO.js
  // Clear the ___active config data__  and __av.nut___
  av.fzr.clearFzrFn = function () {
    'use strict';
    av.fzr.dir = {};
    av.fzr.domid = {};
    av.fzr.file = {};
    av.fzr.item = {};
    av.fzr.mDish = {};

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
    av.fzr.clearEnvironment('av.fzr.clearFzrFn');
  };

  //------------------------------------------------------------------------------------------- end av.fzr.clearFzrFn --//

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

  //----------------------------------------------------------------------------------------------------------------------
  // Notes on page layout
  //----------------------------------------------------------------------------------------------------------------------
  // AllAvida: 937
  // Population page: Initial assume a square grid and both sidebars open. 
  // navColID or navColClass: wd = 152 includling 2px for a 1 px border. (minimum nice wd) about 84 too narrow, but works. 
  // mainBlockHolder: wd = 
  // popInfoHolder: mn wd = 500 inlcuding border
  // popStatsBlock: min wd = 364 no border. 
  // selOrgType: min wd = 164  (might make a tad smaller) includes 1 px border
  // popStats4grid: min wd = 176   (get left over)