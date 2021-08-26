var av = av || {};  //incase av already exists
var dojo = dojo || {};

//global definitions based dom that involve DND

//functions used to process events that happen when a dojo drag and drop lands on the particular dnd 'target'.
//Note that all dnd 'source' elements can also be 'targets'.

//http://stackoverflow.com/questions/1134572/dojo-is-there-an-event-after-drag-drop-finished
//Puts the contents of the source in a object (list) called items.
// if (av.dbg.flg.root) { console.log('Root: before av.dnd.getAllItems'); }

//------------------------------------------------------------------------------------------ av.msg.TestDishSetupPrep --
av.dnd.TestDishSetupPrep = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the test-dish in the active area
    av.msg.setupType = 'test';  //Do not reload files from the active config freezer section
                                      //Do not put data from files in the setup section. 
                                      //
    //there is always a node here, so it must always be cleared when adding a new one.
    av.dnd.activeConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    av.dnd.activeConfig.sync();   //should be done after insertion or deletion
                                      
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    added = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.TestDishSetupPrep');
    console.log('after added av.dnd.lndActiveConfig, added=', added);
    
    console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);
    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };

  }
  else {
    alert('You must select a test-dish first');
  };
};
//-------------------------------------------------------------------------------------- end av.dnd.testDishSetupPrep --

//------------------------------------------------------------------------------------------------ av.dnd.runTestDish --
av.dnd.runTestDish = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the multi-dish in the active area
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    //added = av.dnd.lndActiveConfig(av.dnd.move);

    var filename = av.dnd.move.dir +'/ancestors.txt';
    console.log('filename = ', filename, '=======================================================');
    if (av.fzr.file[filename]) {
      console.log('file ', filename, 'exists');
      av.fio.autoAncestorLoad(av.fzr.file[filename]);
    }
    var filename = av.dnd.move.dir +'/ancestors_manual.txt';
    console.log('filename = ', filename, '=======================================================');
    if (av.fzr.file[filename]) {
      console.log('file ', filename, 'exists');
      av.fio.handAncestorLoad(av.fzr.file[filename]);
    }
    //Now actually load resreq direcdtly from the freezer.
    av.msg.makeTestDirMsg(av.dnd.move.dir);
    av.msg.setupType = 'test';   //Do not reload files from the active config freezer section
  }
  else {
    alert('You must select a multi dish first');
  }
};

//-------------------------------------------------------------------------------------------- end av.dnd.runTestDish --


//----------------------------------------------------------------------------------------------- av.dnd.runTestDish --
av.dnd.runTestDish2 = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the test-dish in the active area
    av.msg.setupType = 'test';   //Do not reload files from the active config freezer section
                                      //Do not put data from files in the setup section. 
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    added = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.runTestDish2');
    console.log('after added av.dnd.lndActiveConfig, added=', added);
    
    //Now actually load and run the test direcdtly from the freezer.
    av.msg.importTestDishExpr(av.dnd.move.dir); 

    console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);
    //av.dom.environConfigEdit.value = "some text";
    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };

  }
  else {
    alert('You must select a test-dish first');
  };
};

//--------------------------------------------------------------------------------------------------------------------//
//          DND Analysis page
//--------------------------------------------------------------------------------------------------------------------//

av.anl.loadWorldData = function (worldNum, dir) {
  if (av.debug.dnd) console.log('loadWorldData: WoldNum:', worldNum, '; dir', dir);
  av.anl.hasWrldData[worldNum] = true;
  av.fzr.pop[worldNum].fit = av.fio.tr2chart(av.fzr.file[dir + '/tr0.txt']);
  av.fzr.pop[worldNum].ges = av.fio.tr2chart(av.fzr.file[dir + '/tr1.txt']);
  av.fzr.pop[worldNum].met = av.fio.tr2chart(av.fzr.file[dir + '/tr2.txt']);
  av.fzr.pop[worldNum].num = av.fio.tr2chart(av.fzr.file[dir + '/tr3.txt']);
  av.fzr.pop[worldNum].via = av.fio.tr2chart(av.fzr.file[dir + '/tr4.txt']);
};

av.anl.clearWorldData = function (worldNum){
  'use strict';
  av.fzr.pop[worldNum].fit = [];
  av.fzr.pop[worldNum].ges = [];
  av.fzr.pop[worldNum].met = [];
  av.fzr.pop[worldNum].num = [];
  av.fzr.pop[worldNum].via = [];
};

//worldNum is a number 0-2 of the population loaded into analysis page
av.anl.loadSelectedData = function (worldNum, axisSide, side, from) {
  'use strict';
  console.log(from, 'called v.anl.loadSelectedData: worldNum=',worldNum, '; axis=', axisSide, '; side=', side);
  var dataType = document.getElementById(axisSide).value.toLowerCase();
  switch(dataType) {
    case 'none':
      av.anl.wrld[worldNum][side] = [];
      break;
    case 'average fitness':
      av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].fit;
      break;
    case 'average offspring cost':
      av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].ges;
      break;
    case 'average energy acq. rate':
      av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].met;
      break;
    case 'number of organisms':
      av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].num;
      break;
    case 'number viable':
      av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].via;
      break;
  }
  var begin = av.anl.xx.length;
  var end = av.fzr.pop[worldNum].fit.length;
  //console.log('begin=', begin, '; end=', end);
  if (av.anl.xx.length < av.fzr.pop[worldNum].fit.length) {
    for (ii = begin; ii< end; ii++) {
      av.anl.xx[ii] = ii;
    }
  }
};
