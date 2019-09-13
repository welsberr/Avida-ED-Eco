//***************************************
// Defaults and Constants
// one global to hold them all.
var av = av || {};  //incase av already exists

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
};

//av.debug flags
av.debug = {};
av.debug.userMsg = false; //debug of user messages.
av.debug.root = false;  //statements that look for failiers when the code executes outside of functions
av.debug.bool = false;  //av.debug statements that look for errors outlining logic functions
av.debug.mouse = false;  //av.debug statements about non-dojo drag and drop
av.debug.dnd = false;  //debu statements about dojo dnd
av.debug.msg = false;  //messages to and from avida
av.debug.trace = false;  //organism page
av.debug.grid = false;  //population grid
av.debug.popCon = false;  //population Controls
av.debug.fio = false;  // file input/output; fio, read, write
av.debug.ind = false;  //oranism page
av.debug.anl = false;  //analysis page
av.debug.plotly = false;  //both popChart and analysis
av.debug.uil = false; //user interface layout.
av.debug.alo = false; //analysis page layout

av.dbg = {};
av.dbg.flg = {}; 
av.dbg.flg.nut = false;

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
av.dft.pauseType = 'manualUpdateRadio';     //alternate = 'autoUpdateRadio'
av.dft.autoUpdateOnce = 1000;

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
  , 'labInfoBlock'
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
  , 'labInfoBlock'
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
  , 'buffer'
  , 'register'
  , 'Astack'
  , 'Bstack'
  , 'output'
  , 'InstructionDetail'
  , 'ExecuteJust'
  , 'ExecuteAbout'
  //Buttons
  , 'populationButton'
  , 'organismButton'
  , 'analysisButton'
  , 'OrgSetting'
  , 'OrgDetailsButton'
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
}
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
if (av.debug.root) console.log('brs', av.brs);
if (av.debug.root) console.log('browser info:', av.brs.name, ': ', window.navigator.userAgent);

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
av.ptd.popStatFlag = true;  //flag that determines if the stats panel is visible.
av.ptd.regionNames = ['Entire Dish', 'Upper Left', 'Upper Right', 'Lower Left', 'Lower Right'];
av.ptd.logicButtons = ['notButton', 'nanButton', 'andButton', 'ornButton', 'oroButton', 'antButton', 'norButton', 'xorButton', 'equButton'];

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

av.sgr = {};   //specific to resource/reactions (sugars);
av.sgr.logEdNames = ['0not', '1nan', '2and', '3orn', '4oro', '5ant', '6nor', '7xor', '8equ'];
av.sgr.logicNames = ['not', 'nan', 'and', 'orn', 'oro', 'ant', 'nor', 'xor', 'equ'];
av.sgr.logicVnames = ['not', 'nand', 'and', 'orn', 'or', 'andn', 'nor', 'xor', 'equ'];
av.sgr.reactValues = [ 1.0,   1.0,   2.0,   2.0,   3.0,   3.0,   4.0,   4.0,   5.0];
av.ptd.popInfoHolderWd = 395;
av.sgr.monoChromeMaps = ['reddMap', 'orngMap', 'yllwMap', 'lawnMap',  'grenMap', 'seagMap', 'cyanMap', 
                         'cornMap', 'blueMap', 'purpMap', 'mgntMap',  'pinkMap', 'redvMap', 'greyMap'];
//av.sgr.sugarColors = ['redvMap', 'orngMap',  'yllwMap', 'grenMap',  'cyanMap', 'cornMap',  'blueMap', 'purpMap', 'mgntMap'];
//av.sgr.sugarColors = ['purpMap', 'blueMap',  'cornMap', 'cyanMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'pinkMap'];
  av.sgr.sugarColors = ['blueMap', 'cornMap',  'cyanMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'mgntMap',  'purpMap'];
  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'redvMap', 'mgntMap',  'purpMap'];
  av.sgr.sugarColors = ['grenMap', 'seagMap',  'cornMap', 'blueMap',  'purpMap', 'mgntMap',  'redvMap', 'orngMap',  'yllwMap'];
console.log('sugarColors=', av.sgr.sugarColors);
av.sgr.sugarBackgroundShade = 40;  //was 30
av.sgr.sugarNameShade = 340;   //was 365   265 too light for yellow&greens; 300 green ok; yellow still too light
av.sgr.monoColormaplength = av.color.reddMap.length;
av.sgr.darkEnd = av.sgr.monoColormaplength-30;          //last color used in the the array for color scale
av.sgr.sugarGreyShade = 20;
console.log('full mono colorMap length =', av.sgr.monoColormaplength, '; greyMap length =', av.color.greyMap.length
     , '; darkEnd =', av.sgr.darkEnd, '; sugarBackgroundShade', av.sgr.sugarBackgroundShade, '; sugarNameShade=', av.sgr.sugarNameShade);

av.sgr.rsrce_fake = ['0', '3600', '0', '19', '20', '39', '1', '1'
                           ,'.2', '0', '19', '20', '39', '0', '0'
                           ,'true', '0', '20', '20', '20', 'not1'];
                            
av.sgr.react_fake = ['1', '1', '0.99', '1.0', '1', 'not1', 'not', 'not1', 'pow']; 

av.sgr.react_argu = ['depletable', 'value', 'min', 'max', 'max_count', 'name', 'task', 'resource', 'type']; 
av.sgr.reacDefaultValu = [ 1,                0,  0.99,    1,            1,     '',     '',  'missing', 'pow'];
                            //depletable = 1 = yes resources are eaten; 0 = no they are not eaten
                            //type = pow always in Avida-ED
                            //value = 1 through 5 based on number of nan gates needed to do the task. 
                            //max_count = 1 always in Avida-ED
                            //min will be a constant probably 0.9
                            //max will be a constang probably 1.1
av.sgr.resrc_argu_old = ['initial', 'inflow', 'inflowx1', 'inflowx2', 'xdiffuse', 'ydiffuse'
                           , 'outflow', 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2', 'xgravity', 'ygravity'
                           , 'boxflag', 'boxx', 'boyy', 'boxcol', 'boxrow', 'name'
                           , 'geometry', 'region', 'side', 'grdNum', 'regionCode','regionList'];  
av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //technically name is not an argument, but it starts the list. 
                            ,  'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                            , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                            , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                            ,'boxflag', 'boxx', 'boyy', 'boxcol', 'boxrow',     //theste are new for Avida-ED and not in the wiki. 
                            , 'region', 'side', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'
                          
av.sgr.supply_argu = ['region', 'side', 'grdNum', 'regionCode','regionList'];           //each is an array for region

//number of subdishis is useful, especially if we only allow one layout per number of subdishes. 
//geometry is always the same for all regions, but also part of the avida arguments for resource. 
//Different ways to discribe layout, only one desciptor needed per task
av.sgr.layout3 = ['glob', 'all', 'haf', 'three', '4th'];
av.sgr.layout = ['Global Dish', 'Whole Dish', 'Halves', '3-sections', 'Quarters'];
av.sgr.layoutMany = ['glob', 'all', 'halfLR', 'halfTB', '3top1', '3bot1', '3lft1', '3Rit1', '3book', '3stack', '4th', ];
                         
//Avida resource Arguments that have Defaults I will probably use. If they are the default, they do not need to be in the Environment.cfg file
av.sgr.resrcAvidaDefaultGlobalArgu = [ 'initial', 'inflow', 'outflow', 'geometry'   
                                    , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'];
av.sgr.junk = 1; 
av.sgr.resrcAvidaDefaultGlobalValu =  [ 0, 0, 0.0, 'global', 1, 1, 0, 0];   //diffuse range from 0 to 1; gravity range from -1 to 1

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
                         
                         //region list does not work at this time. It was to create a way to fill out on the data ofr all tasks based on region. 
                         //     I don't think we need it now. It should go away  when that part of ex1 goes away. 
                         //name will be created from task, subdishnum or region, type and side
                         // 
                         // region list was used to state the index into the array of data that goes with the region in the regionlis. 
                         // so the region lisst for quarters is [empty, 0, 1, 2, 3]
                         // the retion list for top bottom would be [empty, empty, empty, empty, empty, 0, 1]

  //Regtion List: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half
  av.sgr.region3char =    ['all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];
  av.sgr.regionCode = [  '00',   '01',   '02',   '03',   '04',  '12',  '34',  '13',  '24'];   //These numbers go with the regions above
  av.sgr.regionNames =  ['Whole Dish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 
  
// need to figure out how to assign when reading environment.cfg
  av.sgr.supply3 =  ['non', 'inf',  'fin',  'equ',  'poi', 'flo' ];  //none, infinite, finite, equilibrium, poison
  av.sgr.supply4 = ['none', 'infn', 'fint', 'equl', 'pois', 'flow'];
  av.sgr.supply  = ['None', 'Infinite', 'Finite', 'Equilibrium', 'Flow'];    //only using the first four for now; 
  //Flow would be from the source in a diffrent place fromt he sink: that is input x,y coordinaes are different from those of output. 
  av.sgr.supplyLetter = ['N'  , 'I'  , 'F'  , 'E', 'P', 'S'];   
  av.sgr.side1 = ['L', 'R', 'T', 'B', 'C', 'E', 'U'];
  av.sgr.side3 = ['Lft', 'Rit', 'Top', 'Bot', 'Cen', 'Edg', 'Unk']; //left, right, top, bottom, center, edge, unknown
  av.sgr.side = ['left', 'rite', 'top', 'bottom', 'center', 'edges', 'unknown'];
  
  av.sgr.hideFlgNames = ['gradient', 'periodic'];
  av.sgr.hideFlagInit = [true, true];

//Commments 
//
//#comment option
//#!xor not34 region=all:side=none:supply=finite:gradient=false
//region options are in av.sgr.region above.   or regionNum could be used. 
//supply optoins are in av.sgr.supply 
//side options are in av.sgr.side3
//gradient options are false/true
//
//Name ideas. not01g00 to 99  for gradients   leading zeros by using padStart
//

av.sgr.processHideFlags = function(boolArry, from) {
  console.log(from+' called av.sgr.processHideFlags: boolArry=', boolArry);
  if (undefined != boolArry) {
    if (boolArry.length < av.sgr.hideFlgNames.length) {
      boolArry = av.sgr.hideFlagInit;
    }
  }
  else boolArry = av.sgr.hideFlagInit;
  var len = av.sgr.hideFlgNames.length;
  for (var ii=0; ii < len; ii++) {
    av.nut.hideFlags[av.sgr.hideFlgNames[ii]] = boolArry;
  };
};

av.nut = {};
av.fzr.clearEnvironment = function(from) {
  console.log(from + ' called av.fzr.clearEnvironment');
  av.event = {};
  av.fzr.env = {};
  av.oldnut = av.nut;
  av.nut = {};
  av.nut.hideFlags = {};
  av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.fzr.clearEnvironment');
  

  // more about environment variables can be found at https://github.com/devosoft/avida/wiki/Environment-file#RESOURCE
  av.fzr.env.rsrce = {};
  av.fzr.env.react = {}; 
  av.fzr.env.supply = {};
  var logiclen = av.sgr.logicNames.length;
  var rsrcelen = av.sgr.resrc_argu.length; 
  var reactlen = av.sgr.react_argu.length;
  var tsk;
  var rnm;
  
  for (var ii=0; ii< logiclen; ii++) {      //9
    tsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
    av.nut[tsk] = {};
    av.nut[tsk].numsubdish = 1;   // whole dish
    av.nut[tsk].regionLayout = 'all';  // all, 4ths, topbot, lftrit
    av.nut[tsk].geometry = 'global';
    av.nut[tsk].supply = [];     // default is  'Infinite';]
    
    //from event file
    av.nut[tsk].periodic = [];    //false = default;  else true.  
    av.nut[tsk].periodTime = [];    //100,000 = defautl for now
    
    av.nut[tsk]['resrc'] = {};
    av.nut[tsk]['react'] = {};
    for (var jj=0; jj<rsrcelen; jj++){
      rnm = av.sgr.resrc_argu[jj];
      av.nut[tsk]['resrc'][rnm] = [];
    }
    for (var jj=0; jj<reactlen; jj++){
      rnm = av.sgr.react_argu[jj];
      av.nut[tsk]['react'][rnm] = [];
    }
  }
  console.log('av.nut =',av.nut);
  
  
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
      rnm = av.sgr.react_argu[jj];
      av.fzr.env.react[tsk][rnm] = [];
    }
  };
  console.log('av.fzr.env.react=',av.fzr.env.react);
  console.log('av.fzr.env.rsrce=',av.fzr.env.rsrce);
  console.log('av.fzr.env=', av.fzr.env);
};

//-------------------------------------------------------------------------------------------- in av.fzr.clearFzrFn --//
//cannot call av.fzr.clearFzrFn until after saveUpdateState is defined in fileIO.js
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

// Does not clear the active config data
av.fzr.clearMainFzrFn = function () {
  'use strict';
  if (av.debug.root) console.log('in ClearMainFzrFn');


  //Clear each section of the freezer and active organism and ancestorBox
  if (av.debug.root) console.log('before av.dnd.fzConfig.selectAll', av.dnd.fzConfig);
  av.dnd.fzConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
  if (av.debug.root) console.log('before av.dnd.fzConfig.sync');
  av.dnd.fzConfig.sync();   //should be done after insertion or deletion
  if (av.debug.root) console.log('before av.dnd.fzOrgan.selectAll=', av.dnd.fzOrgan);
  av.dnd.fzOrgan.selectAll().deleteSelectedNodes();
  if (av.debug.root) console.log('before av.dnd.fzOrgan.sync');
  av.dnd.fzOrgan.sync();

/*
  if (av.debug.root) console.log('before av.dnd.fzMdish.selectAll=', av.dnd.fzMdish);
  av.dnd.fzMdish.selectAll().deleteSelectedNodes();
  if (av.debug.root) console.log('before av.dnd.fzMdish.sync');
  av.dnd.fzMdish.sync();
*/

  if (av.debug.root) console.log('before av.dnd.fzWorld.selectAll=', av.dnd.fzWorld);
  av.dnd.fzWorld.selectAll().deleteSelectedNodes();
  if (av.debug.root) console.log('before av.dnd.fzWorld.sync');
  av.dnd.fzWorld.sync();
  if (av.debug.root) console.log('before av.dnd.ancestorBox.selectAll=', av.dnd.ancestorBox);
  av.dnd.ancestorBox.selectAll().deleteSelectedNodes();
  if (av.debug.root) console.log('before av.dnd.ancestorBox.sync');
  av.dnd.ancestorBox.sync();

  if (av.debug.root) console.log('before av.fzr.saveUpdateState');
  av.fzr.saveUpdateState('yes');
  if (av.debug.root) console.log('end of ClearMainFzrFn');
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
    av.pch.widg = {                // https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
    autosizable: true              // plot will respect layout.autosize=true and infer its container size
    ,fillFrame: false              // if we DO autosize, do we fill the container or the screen?
    ,frameMargins: 0               // if we DO autosize, set the frame margins in percents of plot
    ,sizescrollZoom: true          // mousewheel or two-finger scroll zooms the plot
    ,doubleClick: 'reset+autosize' // double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
    ,showTips: true                // new users see some hints about interactivity
    ,showLink: false               // link to edit image of graph - this is an edit link outside of the modebar
    ,sendData: true                // if we show a link, does it contain data or just link to a plotly file?
    ,staticPlot: false             // no interactivity, for export or image generation
    ,displaylogo: false            // hides plotly logo    ,displayModeBar: false       // display the mode bar (true, false, or 'hover')
    ,modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
      'toImage'           //makes png file
      ,'sendDataToCloud'  //sends data to plotly web editor workspace
      ,'zoom2d'           //zoom to a box defined with cursor
      //,'pan2d'            //pan
      ,'select2d'         //this one does not seem to turn anything on/off
      ,'lasso2d'          //this one does not seem to turn anything on/off
      ,'zoomIn2d'           //zoom in
      ,'zoomOut2d'          //zoom out
      //,'autoScale2d'
      ,'resetScale2d'
        , 'hoverClosestCartesian'  //shows values as an (x,y) pair
        , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
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
    , modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
       'toImage'           //makes png file
      ,'sendDataToCloud'  //sends data to plotly web editor workspace
      //,'zoom2d'           //zoom to a box defined with cursor
      //,'pan2d'            //pan
      //,'select2d'         //this one does not seem to turn anything on/off
      //,'lasso2d'          //this one does not seem to turn anything on/off
      , 'zoomIn2d'           //zoom in
      , 'zoomOut2d'          //zoom out
      //, 'autoScale2d'
      , 'resetScale2d'
      , 'hoverClosestCartesian'  //shows values as an (x,y) pair
      , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
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
// labInfoBlock: min wd = 364 no border. 
// selOrgType: min wd = 164  (might make a tad smaller) includes 1 px border
// popStats4grid: min wd = 176   (get left over)