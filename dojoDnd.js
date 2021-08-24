var av = av || {};  //incase av already exists
var dojo = dojo || {};

//global definitions based dom that involve DND

//functions used to process events that happen when a dojo drag and drop lands on the particular dnd 'target'.
//Note that all dnd 'source' elements can also be 'targets'.

//http://stackoverflow.com/questions/1134572/dojo-is-there-an-event-after-drag-drop-finished
//Puts the contents of the source in a object (list) called items.
// if (av.dbg.flg.root) { console.log('Root: before av.dnd.getAllItems'); }

//============================================================================================ Drag n Drog Unilities ===

//---------------------------------------------------------------------------------------------- av.dnd.getAllItems --*/

//------------------------------------------------------------------------------------------------- av.dnd.getDomId ----
av.dnd.getDomId = function (name, target){
  'use strict';
  //Now find which node has the new content so it can get a context menu.
  var domItems = Object.keys(target.map);
  var nodeIndex = -1;
  var lngth = domItems.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (target.map[domItems[ii]].data === name) {
      nodeIndex = ii;
      break;
    }
  }
  return domItems[nodeIndex];
};

//-------------------------------------------------------------------------------------------- av.dnd.getUniqueName ----
// yemd
// replaced by av.dnd.contextMenu in dragulaDnd.js

// av.dnd.getUniqueName = function (name, target){
//   'use strict';
//   var namelist = $(target);
//   //console.log('u namelist', namelist);
//   var unique = true;
//   var lngth = namelist.length;
//   while (unique) {
//     unique = false;
//     for (var ii = 0; ii < lngth;  ii++) {
//       //if (av.debug.dnd) console.log ('name ', namelist[ii].innerHTML);
//       if (name == namelist[ii].textContent) {
//         name = prompt('Please give your item a unique name ', name + '_1');
//         unique = true;
//       }
//     }
//   }
//   return name;
// };

//--------------------------------------------------------------------------------------------- av.dnd.makeNameList ----

// yemd
// av.dnd.makeNameList = function (target) {
//   'use strict';
//   var namelist = dojo.query('> .dojoDndItem', target.node.id);
//   var lngth = namelist.length;
//   var listNames = [];
//   for (var ii = 0; ii < lngth; ii++) {
//     listNames[ii] = namelist[ii].textContent;
//   }
//   return listNames;
// };

//-------------------------------------------------------------------------------------- av.dnd.preTransferNameList ----

// yemd
// av.dnd.preTransferNameList = function(target, name) {
//   'use strict';
//   var listFull = av.dnd.makeNameList(target);
//   var ndx = listFull.indexOf(name);
//   //console.log('name', name, '; index', ndx, '; listFull',listFull);
//   if (-1 < ndx) listFull.splice(ndx,1);
//   //console.log('listFull', listFull);
//   return listFull;
// };

//--------------------------------------------------------------------------------------------- av.dnd.nameNfrzItem ----

// yemd
// av.dnd.nameNfrzItem = function (namelist, name, number) {
//   var num = number + 1;
//   var aName = name + '_' + num.formatNum(0);
//   var newName;
//   if (0 <= namelist.indexOf(aName)) {
//     newName = av.dnd.nameNfrzItem(namelist, name, num);
//     //console.log('aName', aName, '; num', num, 'newName', newName);
//   }
//   else { newName = aName; }
//   return newName;
// };

//---------------------------------------------------------------------------------------------- av.dnd.namefzrItem ----

// yemd
// av.dnd.namefzrItem = function(name, namelist) {
//   'use strict';
//   var theName;
//   //look for name in freezer section
//   //console.log('name', name, '; index', namelist.indexOf(name), '; nameList',namelist);
//   if (0 <= namelist.indexOf(name)) {
//     theName = av.dnd.nameNfrzItem(namelist, name, 1);
//   }
//   else { theName = name; }
//   //console.log('name', theName);
//   return theName;
// };

//----------------------------------------------------------------------------------------- av.dnd.getUniqueFzrName ----

// yemd
// av.dnd.getUniqueFzrName = function(name, namelist) {
//   'use strict';
//   var unique = true;
//   var suggestName;
//   var lngth = namelist.length;
//   //console.log('namelist', namelist);
//   while (unique) {
//     unique = false;
//     if (0 <= namelist.indexOf(name)) {
//       suggestName = av.dnd.namefzrItem(name, namelist);
//       name = prompt('Please give your item a unique name ', suggestName);
//       unique = true;
//     }
//   }
//   return name;
// };


//---------------------------------------------------------------------------------------------- av.dnd.nameNparent ----

// yemd 
// moved to dragulaDnd.js
// av.dnd.nameNparent = function (name, number) {
//   var num = number + 1;
//   var aName = name + '-' + num.formatNum(0);
//   var newName;
//   if (0 <= av.parents.name.indexOf(aName)) {
//     newName = av.dnd.nameNparent(name, num);
//     //console.log('aName', aName, '; num', num, 'newName', newName);
//   }
//   else { newName = aName; }
//   return newName;
// };

//----------------------------------------------------------------------------------------------- av.dnd.nameParent ----

// yemd
// moved to dragulaDnd.js
// av.dnd.nameParent = function(name) {
//   'use strict';
//   var theName;
//   //look for name in parent
//   if (0 <= av.parents.name.indexOf(name)) {
//     theName = av.dnd.nameNparent(name, 1);
//   }
//   else { theName = name; }
//   //console.log('name', theName);
//   av.parents.name.push(theName);
//   return theName;
// };

//======================================================================================== End Drag n Drog Unilities ===

//======================================================================================== Drag n Drop Configuration ===
//Need to have only the most recent dropped configuration in configCurrent. Do this by deleting everything in configCurrent
//and reinserting the most resent one after a drop event.
//
//---------------------------------------------------------------------------------------------- av.dnd.lndtestConfig --

// yemd

// av.dnd.lndTestConfig = function (move) {
//   'use strict';
//   av.dnd.configFlag = 'test';
//   console.log('In av.dnd.lndTestConfig: move=', move);
//   av.post.addUser('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
//   var ndx = -1;
//   var klen = 0;
//   var kk = 0;
//   var str = '';
//   //there is always a node here, so it must always be cleared when adding a new one.
//   av.dnd.testConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.testConfig.sync();   //should be done after insertion or deletion

//   //get the data for the new configuration
//   move.source.forInSelectedItems(function (item, id) { //assign the node that is selected from the source.
//     av.dnd.testConfig.insertNodes(false, [item]);
//   });
//   var domid = Object.keys(av.dnd.testConfig.map)[0];
//   //console.log('ldn.testConfig: type=', move.target.map[domid].type[0] );
//   // The type assignment and .sync were done here in the past. I'm going to try moving this to just before clearing the ancestor box. 
//     //move.target.map[domid].type[0] = 'b';
//   av.dnd.testConfig.sync();
//   //console.log('data', move.target.map[domid].data, move.target.map[domid]);

//   av.fzr.actConfig.actDomid = domid;
//   av.fzr.actConfig.name = document.getElementById(domid).textContent;
//   //console.log('New Config:', av.fzr.actConfig.name);
//   av.fzr.actConfig.fzDomid = Object.keys(move.source.selection)[0];
//   av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.fzDomid];
//   delete av.fzr.actConfig.file['instset.cfg'];
//   if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
//     av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
//   }
  
//   //The types are reassigned to indicate that they might be the populated form of the dishes.
//   if ('c' == move.target.map[domid].type[0] || 'w' == move.target.map[domid].type[0]) {
//     move.target.map[domid].type[0]= 'b';
//     av.frd.updateSetup('av.dnd.lndActiveConfig');                  //call the avida-ED normal style setup page
//     av.msg.setupType = 'standard';
//   }
//   else {
//     move.target.map[domid].type[0] = 'v';   //type is test or populated test
//     av.frd.updateTestSetup('av.dnd.lndActiveConfig');               //call the test version of Setup
//     av.msg.setupType = 'test';
//   };

//   //Clear ancestorBox
//   av.dnd.ancestorBox.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.ancestorBox.sync();   //should be done after insertion or deletion
//   av.dnd.ancestorBoTest.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.ancestorBoTest.sync();   //should be done after insertion or deletion

//   av.parents.clearParentsFn();

//   console.log('move.source.node.id=',move.source.node.id);
//   if ('fzConfig' === move.source.node.id || ('fzTdish' === move.source.node.id)) {
//     av.fzr.actConfig.type = move.type;
//     //av.fzr.actConfig.type = 'c';
    
//     //clear any old data files;
//     av.fzr.actConfig.file['events.cfg'] = ' ';
    
//     //delete anyfiles in activeConfig part of freezer
//     if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
//     if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
//     if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}
    
//     //load ancestors if present.
//     if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
//       str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
//       av.fio.autoAncestorLoad(str);
//     };
//     if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
//       str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
//       av.fio.handAncestorLoad(str);
//     };
    
//     //load files from freezer
//     av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
//     av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
//     av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
//     av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

    
//     av.grd.drawGridSetupFn('av.dnd.lndActiveConfig'); //draw grid
//   }
//   else if (('fzWorld' === move.source.node.id) ) {
//     if ('fzWorld' === move.source.node.id) {
//       av.fzr.actConfig.type = 'w';
//     }
//     else {
//       av.fzr.actConfig.type = 'm';
//       console.log('multi- Dish in LandActive Config===================================================================');
//     }
//     av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
//     av.fzr.actConfig.file['clade.ssg'] = av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg'];
//     av.fzr.actConfig.file['detail.spop'] = av.fzr.file[av.fzr.actConfig.dir + '/detail.spop'];
//     av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
//     av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
//     av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];
//     av.grd.oldUpdate = av.fzr.actConfig.file['update'];
//     TimeLabel.textContent = av.grd.oldUpdate;
//     console.log('in dojo');

//     //load parents from clade.ssg and ancestors.
//     av.fio.cladeSSG2parents(av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg']);
//     var handList = av.fio.handAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']);
//     var autoList = av.fio.autoAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']);
//     console.log('handList=', handList);
//     console.log('autoList=', autoList);
//     var ndx = 0;
//     klen = av.parents.name.length;
//     for (kk = 0; kk < klen; kk++) {
//       ndx = autoList.nam.indexOf(av.parents.name[kk]);
//       if (-1 < ndx) {
//         av.parents.genome[kk] = autoList.gen[ndx];
//         av.parents.howPlaced[kk] = 'auto';
//         av.parents.injected[kk] = true;
//         av.parents.autoNdx.push(kk);
//         autoList.nam.splice(ndx, 1);
//         autoList.gen.splice(ndx, 1);
//       }
//       else {
//         ndx = handList.nam.indexOf(av.parents.name[kk]);
//         if (-1 < ndx) {
//           av.parents.genome[kk] = handList.gen[ndx];
//           av.parents.col[kk] = handList.col[ndx];
//           av.parents.row[kk] = handList.row[ndx];
//           av.parents.howPlaced[kk] = 'hand';
//           av.parents.injected[kk] = true;
//           av.parents.handNdx.push(kk);
//           handList.nam.splice(ndx, 1);
//           handList.gen.splice(ndx, 1);
//           handList.col.splice(ndx, 1);
//           handList.row.splice(ndx, 1);
//         }
//         else {
//           console.log('Name, ', av.parents.name[kk], ', not found');
//         }
//       }
//     }
//   } else {
//     console.log('fzr.activeCon - something strange happened', av.fzr.actConfig);
//   }

//   av.parents.placeAncestors();
//   //run status is no longer 'new' it is 'world'

//   if ('fzWorld' === move.source.node.id) {
//     av.fzr.actConfig.type = 'w';
//     av.ptd.popWorldStateUi('av.dnd.lndActiveConfig');
//   }
//   else {
//     av.fzr.actConfig.type = 't';
//     av.ptd.popTdishStateUi('av.dnd.lndActiveConfig');
//   }

//   //Load Time Recorder Data
//   av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
//   av.pch.processLogic();
//   //send message to Avida
//   av.msg.importPopExpr();
//   av.msg.requestGridData();
//   av.msg.sendData();
//   av.grd.popChartFn('av.dnd.lndTestConfig');
// };

//------------------------------------------------------------------------------------------ end av.dnd.lndtestConfig --

//-------------------------------------------------------------------------------------- start av.dnd.lndActiveConfig --

// yemd
// replaced by av.dnd.lndActiveConfig in dragulaDnd.js
// av.dnd.lndActiveConfig = function (move, from) {
//   'use strict';
//   av.dnd.configFlag = 'normal';
//   console.log(from, 'called av.dnd.lndActiveConfig; move = ', move, '; configFlag=', av.dnd.configFlag);
//   av.post.addUser('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
//   var ndx = -1;
//   var klen = 0;
//   var kk = 0;
//   var str = '';
  
//   //move.sourceNodes= move.source.getAllNodes();  //does not seeem to be used. 
//   //console.log('move.source.getAllNodes()=move.source.getAllNodes()=', move.sourceNodes);

  
//   //there is always a node here, so it must always be cleared when adding a new one.
//   av.dnd.activeConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.activeConfig.sync();   //should be done after insertion or deletion

//   //should be defined before av.dnd.landActiveConfig is called - comment out later
//   move.sourceMoveData = move.source.map[move.sourceDomId];
  
//   //console.log('sourceDomId=,', move.sourceDomId,'; move.source.map[sourceDomId].data=', move.source.map[move.sourceDomId].data, '; mmove.sourceMoveData=', move.sourceMoveData);

//   //if we know the item and id can we do this without anything selected? Yes. so we need to replace this with the insertNodes below
//   //get the data for the new configuration
//   /*
//   move.source.forInSelectedItems(
//     function (item, id) { 
//       //assign the node that is selected from the source.
//       av.dnd.activeConfig.insertNodes(false, [item]);
//       console.log('In move.source.forInSelectedItems: id=', id, '; item=', item);
//   });
//   */
  
//   // [item] must be the item that is the node we want to put in move.target from move.source 
//   av.dnd.activeConfig.insertNodes(false, [ move.sourceMoveData]);

//   // Syncronize activeConfig holder as things were manipulated in javascript
//   av.dnd.activeConfig.sync();   //or should sync be after reassign type to b?
//           //Still reassigning thing within holder using javascript. Should av.dnd.___.sync() be after this?    so did again later
  
//   av.fzr.actConfig.actDomid = Object.keys(move.target.map)[0];
//   //          av.fzr.actConfig.actDomid = Object.keys(av.dnd.activeConfig.map)[0];    //old version
//   av.fzr.actConfig.name = document.getElementById(av.fzr.actConfig.actDomid).textContent;
//   //console.log('New Config name=:', av.fzr.actConfig.name);
  
//   av.fzr.actConfig.fzDomid = move.sourceDomId;
//   //console.log('av.fzr.actConfig.fzDomid=', av.fzr.actConfig.fzDomid, '; move.sourceDomId=', move.sourceDomId);
//   //console.log('Object.keys(move.target.map)[0];=', Object.keys(move.target.map)[0], '; av.fzr.actConfig.actDomid=', av.fzr.actConfig.actDomid);

//   av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.fzDomid];
//   delete av.fzr.actConfig.file['instset.cfg'];
//   if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
//     av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
//   }
   
//   //The types are reassigned to indicate that they might be the populated form of the dishes.
//     move.target.map[av.fzr.actConfig.actDomid].type[0]= 'b';
//     av.frd.updateSetup('av.dnd.lndActiveConfig');                  //call the avida-ED 3.0 style setup page
//     av.msg.setupType = 'standard';
 
//   //--------------------------------- doho DnD done; now update ancestors and other data from files
//   //Clear ancestorBox
//   av.dnd.ancestorBox.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.ancestorBox.sync();   //should be done after insertion or deletion
//   av.dnd.ancestorBoTest.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.ancestorBoTest.sync();   //should be done after insertion or deletion

//   av.parents.clearParentsFn();

//   //console.log('move.source.node.id=',move.source.node.id, '; why is this out of order?');
//   if ('fzConfig' === move.source.node.id || ('fzTdish' === move.source.node.id)) {
//     av.fzr.actConfig.type = move.type;
//     //av.fzr.actConfig.type = 'c';
    
//     //clear any old data files;
//     av.fzr.actConfig.file['events.cfg'] = ' ';
    
//     //delete anyfiles in activeConfig part of freezer
//     if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
//     if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
//     if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}
    
//     //load ancestors if present.
//     if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
//       str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
//       av.fio.autoAncestorLoad(str);
//     };
//     if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
//       str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
//       av.fio.handAncestorLoad(str);
//     };
    
//     //load files from freezer
//     av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
//     av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
//     av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
//     av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

    
//     av.grd.drawGridSetupFn('av.dnd.lndActiveConfig'); //draw grid
//   }
//   else if (('fzWorld' === move.source.node.id) ) {
//     if ('fzWorld' === move.source.node.id) {
//       av.fzr.actConfig.type = 'w';
//     }
//     else {
//       av.fzr.actConfig.type = 'm';
//       console.log('multi- Dish in LandActive Config===================================================================');
//     }
//     av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
//     av.fzr.actConfig.file['clade.ssg'] = av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg'];
//     av.fzr.actConfig.file['detail.spop'] = av.fzr.file[av.fzr.actConfig.dir + '/detail.spop'];
//     av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
//     av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
//     av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];
//     av.grd.oldUpdate = av.fzr.actConfig.file['update'];
//     TimeLabel.textContent = av.grd.oldUpdate;
//     console.log('in dojo');

//     //load parents from clade.ssg and ancestors.
//     av.fio.cladeSSG2parents(av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg']);
//     var handList = av.fio.handAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']);
//     var autoList = av.fio.autoAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']);
//     console.log('handList=', handList);
//     console.log('autoList=', autoList);
//     var ndx = 0;
//     klen = av.parents.name.length;
//     for (kk = 0; kk < klen; kk++) {
//       ndx = autoList.nam.indexOf(av.parents.name[kk]);
//       if (-1 < ndx) {
//         av.parents.genome[kk] = autoList.gen[ndx];
//         av.parents.howPlaced[kk] = 'auto';
//         av.parents.injected[kk] = true;
//         av.parents.autoNdx.push(kk);
//         autoList.nam.splice(ndx, 1);
//         autoList.gen.splice(ndx, 1);
//       }
//       else {
//         ndx = handList.nam.indexOf(av.parents.name[kk]);
//         if (-1 < ndx) {
//           av.parents.genome[kk] = handList.gen[ndx];
//           av.parents.col[kk] = handList.col[ndx];
//           av.parents.row[kk] = handList.row[ndx];
//           av.parents.howPlaced[kk] = 'hand';
//           av.parents.injected[kk] = true;
//           av.parents.handNdx.push(kk);
//           handList.nam.splice(ndx, 1);
//           handList.gen.splice(ndx, 1);
//           handList.col.splice(ndx, 1);
//           handList.row.splice(ndx, 1);
//         }
//         else {
//           console.log('Name, ', av.parents.name[kk], ', not found');
//         }
//       }
//     }
//     av.parents.placeAncestors();
//     //run status is no longer 'new' it is 'world'
    
//     if ('fzWorld' === move.source.node.id) {
//       av.fzr.actConfig.type = 'w';
//       av.ptd.popWorldStateUi('av.dnd.lndActiveConfig');
//     }
//     else {
//       av.fzr.actConfig.type = 't';
//       av.ptd.popTdishStateUi('av.dnd.lndActiveConfig');
//     }

//     //Load Time Recorder Data
//     av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
//     av.pch.processLogic();
//     //send message to Avida
//     av.msg.importPopExpr();
//     av.msg.requestGridData();
//     av.msg.sendData();
//     av.grd.popChartFn('av.dnd.lndActiveConfig');
//     //av.msg.requestPopStats();  //tiba last time this was on; data was all = 0, so confusing;
//   }
  
//   else console.log('fzr.activeCon - something strange happened', av.fzr.actConfig);
// };

//---------------------------------------------------------------------------------------- end av.dnd.lndActiveConfig --

//----------------------------------------------------------------------------------------- start av.dnd.landFzConfig --

// yemd

//Process when an Configuration is added to the Freezer
// av.dnd.landFzConfig = function (source, nodes, target) {
//   'use strict';
//   if (av.debug.dnd) console.log('av.dnd.landFzConfig: fzr', av.fzr);
//   var domid = Object.keys(target.selection)[0];
//   //console.log('domID', domid, target);
//   //console.log('fzConfig', av.dnd.fzConfig);
//   var oldName = nodes[0].textContent;
//   var nameArray = av.dnd.preTransferNameList(target, oldName);
//   var sName = av.dnd.namefzrItem(oldName, nameArray);
//   var configurationName = prompt('Please name your dish configuration', sName);
//   if (configurationName) {
//     var configName = av.dnd.getUniqueFzrName(configurationName, nameArray);
//     if (null != configName) {
//       av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent + '; --> ' + configName);
//       document.getElementById(domid).textContent = configName;
//       target.map[domid].data = configName;
//       target.map[domid].type[0] = 'c';
//       //console.log('data', target.map[domid].data, target.map[domid]);
//       //console.log('type', target.map[domid].type[0]);

//       //Now find which node has the new content so it can get a context menu.
//       var domID = av.dnd.getDomId(configName, target);
//       target.map[domid].type[0] = 'c';
//       av.fzr.dir[domID] = 'c'+ av.fzr.cNum;
//       av.fzr.domid['c'+ av.fzr.cNum] = domID;
//       av.fzr.file[av.fzr.dir[domID]+'/entryname.txt'] = configName;
//       av.fwt.makeFzrConfig(av.fzr.cNum,'av.dnd.landFzConfig');
//       av.fzr.cNum++;

//       //create a right av.mouse-click context menu for the item just created.
//       av.dnd.contextMenu(target, domID, 'av.dnd.landFzConfig');
//       av.fzr.saveUpdateState('no');
//       if (av.debug.dnd) console.log('dir', av.fzr.dir[domID], '; configName', configName );
//     }
//     else {  //user cancelled so the item should NOT be added to the freezer.
//       av.dnd.fzConfig.deleteSelectedNodes();  //clear items
//       av.dnd.fzConfig.sync();   //should be done after insertion or deletion
//     }
//   }
//   else {  //user cancelled so the item should NOT be added to the freezer.
//     av.dnd.fzConfig.deleteSelectedNodes();  //clear items
//     av.dnd.fzConfig.sync();   //should be done after insertion or deletion
//   }
// };

//=============================================================================================== av.dnd.landFzOrgan ===

//When something is added to the Organism Freezer
//---------------------------------------------------------------------------------------------- av.dnd.landFzOrgan --*/
// av.dnd.landFzOrgan = function (source, nodes, target) {
//   'use strict';
//   var gen;
//   var domid = Object.keys(target.selection)[0];
//   if (av.debug.dnd) console.log('domid', domid);
//   //console.log('target', target, '; fzrOrgan', av.dnd.fzOrgan);
//   var oldName = nodes[0].textContent;
//   var nameArray = av.dnd.preTransferNameList(target, oldName);
//   //console.log('name', oldName, '; array',  nameArray);
//   var sName = av.dnd.namefzrItem(oldName, nameArray);
//   var avidian = prompt('Please name your avidian', sName);
//   if (avidian) {
//     var avName = av.dnd.getUniqueFzrName(avidian, nameArray);
//     if (null != avName) {  //give dom item new avName name
//       av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent + '; --> ' + avName);
//       document.getElementById(domid).textContent = avName;
//       target.map[domid].data = avName;

//       if ('ancestorBox' == source.node.id) {  //do not remove if population has started running
//         //update structure to hold freezer data for Organisms.
//         var Ndx = av.parents.domid.indexOf(nodes[0].id);  //Find index into parent structure
//         gen = av.parents.genome[Ndx];

//         if (false === av.dnd.ancestorBox.copyOnly) {

//           // need to remove organism from parents list.
//           av.parents.removeParent(Ndx);
//           av.parents.placeAncestors();

//           // need to remove organism from the Ancestor Box.
//           // av.dnd.ancestorBox is dojo dnd copyonly to prevent loss of that organsim when the user clicks cancel. The user will
//           // see the cancel as cancelling the dnd rather than canceling the rename.
//           av.dnd.ancestorBox.deleteSelectedNodes();  //clear items
//           av.dnd.ancestorBox.sync();   //should be done after insertion or deletion
//         }
//       }
//       else if ('activeOrgan' === source.node.id) { gen = av.fzr.actOrgan.genome; }
//       av.fzr.dir[domid] = 'g' + av.fzr.gNum;
//       av.fzr.domid['g' + av.fzr.gNum] = domid;
//       av.fzr.file['g' + av.fzr.gNum + '/genome.seq'] = gen;
//       av.fzr.file['g' + av.fzr.gNum + '/entryname.txt'] = av.dnd.fzOrgan.map[domid].data;
//       av.fzr.gNum++;
//       if (av.debug.dnd) console.log('fzr', av.fzr);

//       if (av.debug.dnd) console.log('fzOrgan', av.dnd.fzOrgan);
//       //create a right av.mouse-click context menu for the item just created.
//       if (av.debug.dnd) console.log('before context menu: target',target, '; domId', domid );
//       av.dnd.contextMenu(target, domid, 'av.dnd.landFzOrgan');
//       av.fzr.saveUpdateState('no');
//     }
//     else { //Not given a name, so it should NOT be added to the freezer.
//       av.dnd.fzOrgan.deleteSelectedNodes();  //clear items
//       av.dnd.fzOrgan.sync();   //should be done after insertion or deletion
//     }
//   }
//   else {  //cancelled so the item should NOT be added to the freezer.
//     av.dnd.fzOrgan.deleteSelectedNodes();  //clear items
//     av.dnd.fzOrgan.sync();   //should be done after insertion or deletion
//   }
//   if (av.debug.dnd) console.log('near end of av.dnd.landFzOrgan');
//   if ('ancestorBox' != source.node.id) {
//     if (av.debug.dnd) console.log('dojo dnd to Organ Freezer, not from Ancestor Box');
//   }
//   if (av.debug.dnd) console.log('End of av.dnd.landFzOrgan');
// };
//------------------------------------------------------------------------------------------ end av.dnd.landFzOrgan --*/

//here the parameters are Dojo DND objects
//------------------------------------------------------------------------------------------------- av.dnd.makeMove --*/

// yemd
// av.dnd.makeMove = function (source, nodes, target) {
//   'use strict';
//   var added = false;
//   var trgt = '';
//   av.dnd.move.via = 'user';
//   av.dnd.move.source = source;
//   av.dnd.move.target = target;
//   av.dnd.move.nodeName = nodes[0].textContent;
//   av.dnd.move.sourceDomId = Object.keys(source.selection)[0];
//   av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
//   av.dnd.move.nodeName = av.fzr.domid[av.dnd.move.dir];
//   var domIDs = Object.keys(target.map);
//   av.dnd.move.targetDomId = domIDs[domIDs.length-1];
//   av.dnd.move.sourceMoveData = av.dnd.move.source.map[av.dnd.move.sourceDomId];

//   console.log('move', av.dnd.move);
//   switch (target) {
//     case av.dnd.ancestorBox:
//       added = av.dnd.lndAncestorBox(av.dnd.move);
//       trgt = 'ancestorBox';
//       break;
//     case av.dnd.activeConfig:
//       added = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.makeMove');
//       trgt = 'ActiveConfig';
//       break;
//     case av.dnd.activeOrgan:
//       added = av.dnd.lndActiveOrgan(av.dnd.move);
//       trgt = 'ActiveOrgan';
//       break;
//     case av.dnd.testConfig:      
//       added = av.dnd.lndTestConfig(av.dnd.move);
//       trgt = 'TestConfig';
//       break;
//     default:
//       console.log('target not found: target=', target);
//   }
// };
//----------------------------------------------------------------------------------------------- end av.dnd.makeMove --


//--------------------------------------------------------------------------------------------- av.dnd.lndAncestorBox --

// yemd
// replaced by av.dnd.lndAncestorBox in dragula.js

// av.dnd.lndAncestorBox = function (move) {
//   'use strict';
//   var added;
//   //Do not copy parents if one is moved within Ancestor Box
//   if ('ancestorBox' != move.source.node.id) {
//     //av.post.addUser('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
//     /*
//     av.post.data = {
//       'operation' : 'DojoDnd',
//       'name' : 'av.dnd.lndAncestorBox',
//       //'vars' : {'source' : 'av.dnd.fzOrgan', 'nodeDir': move.dir, 'target': 'av.dnd.ancestorBox'},
//       'vars' : {'source' : move.source.node.id, 'nodeDir': move.dir, 'target': move.target.node.id, 'call': 'dnd.lndAncestorBox'},
//       'assumptions' : {'nodeName': move.nodeName, 'via': move.via}
//     };
//     av.post.usrOut(av.post.data, 'in dojoDND.js line 467');
//      */
//     console.log('move=', move);
    
//     //The rest of this is about updating data for parents and the automatic placement of that parent.
//     //find genome by finding source
//     //console.log('seq=', av.fzr.file[move.dir+'/genome.seq']);
//     av.parents.genome.push(av.fzr.file[move.dir+'/genome.seq']);
//     var nn = av.parents.name.length;
//     av.parents.autoNdx.push(nn);
//     av.parents.injected.push(false);
    
//     var newName = av.dnd.nameParent(move.sourceMoveData.data);
//     document.getElementById(move.targetDomId).textContent = newName;
    
//     av.parents.howPlaced.push('auto');
//     av.parents.domid.push(move.targetDomId); //domid in ancestorBox used to remove if square in grid moved to trashcan
//     //Find color of ancestor
//     if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
//     else { av.parents.color.push(av.color.defaultParentColor); }
//     av.parents.placeAncestors();
//     if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
//     av.grd.drawGridSetupFn('av.dnd.lndAncestorBox');

//     return (true);
//   }
//   else return (false);
// };

//----------------------------------------------------------------------------------------- end av.dnd.lndAncestorBox --

//------------------------------------------------------------------------------------------ av.dnd.lndAncestorBoTest --

// yemd
// av.dnd.lndAncestorBoTest = function (move) {
//   'use strict';
//   var added;
//   //Do not copy parents if one is moved within Ancestor Box
//   if ('ancestorBoTest' != move.source.node.id) {
//     //av.post.addUser('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
//     av.post.data = {
//       'operation' : 'DojoDnd',
//       'name' : 'av.dnd.lndAncestorBoTest',
//       //'vars' : {'source' : 'av.dnd.fzOrgan', 'nodeDir': move.dir, 'target': 'av.dnd.ancestorBoTest'},
//       'vars' : {'source' : move.source.node.id, 'nodeDir': move.dir, 'target': move.target.node.id, 'call': 'dnd.lndAncestorBoTest'},
//       'assumptions' : {'nodeName': move.nodeName, 'via': move.via}
//     };
//     av.post.usrOut(av.post.data, 'in dojoDND.js line 467');

//     //find genome by finding source
//     //console.log('seq=', av.fzr.file[move.dir+'/genome.seq']);
//     av.parents.genome.push(av.fzr.file[move.dir+'/genome.seq']);
//     var nn = av.parents.name.length;
//     av.parents.autoNdx.push(nn);
//     av.parents.injected.push(false);
//     var newName = av.dnd.nameParent(move.nodeName);
//     document.getElementById(move.targetDomId).textContent = newName;
//     av.parents.howPlaced.push('auto');
//     av.parents.domid.push(move.targetDomId); //domid in ancestorBoTest used to remove if square in grid moved to trashcan
//     //Find color of ancestor
//     if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
//     else { av.parents.color.push(av.color.defaultParentColor); }
//     av.parents.placeAncestors();
//     if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
//     return (true);
//   }
//   else return (false);
// };
//-------------------------------------------------------------------------------------- end av.dnd.lndAncestorBoTest --

// Process Drop on gridCanvas
//--------------------------------------------------------------------------------------------- av.dnd.landGridCanvas --

// yemd
// replaced by av.dnd.landGridCanvas in dragulaDnd.js

// av.dnd.landGridCanvas = function (source, nodes, target) {
//   'use strict';
//   if (av.debug.dnd) console.log('inside gridCanvas dnd');
//   if (av.debug.dnd) console.log('parents', av.parents);

//   //was it dropped on the grid of cells?
//   //if (av.debug.dnd) console.log('xOff, yOff, xUP, y', av.grd.xOffset, av.grd.yOffset, av.mouse.UpGridPos[0];, av.mouse.UpGridPos[1];);
//   //calculated grid cell to see if it was a valid grid position.
//   var nn = av.parents.name.length;
//   //console.log('nn', nn);
//   //add to log
//   av.post.addUser('DnD: ' + source.node.id + '--> GridCanvas: by: ' + nodes[0].textContent + ' on (' +  av.mouse.UpGridPos[0] + ', ' + av.mouse.UpGridPos[1] + ')' );

//   var offsetXLocal = ($("#gridHolder").width() - av.dom.gridCanvas.width) / 2;
//   var offsetYLocal = ($("#gridHolder").height() - av.dom.gridCanvas.height) / 2;
//   var mouseX = av.mouse.UpGridPos[0] - av.grd.marginX - av.grd.xOffset - offsetXLocal;
//   var mouseY = av.mouse.UpGridPos[1] - av.grd.marginY - av.grd.yOffset - offsetYLocal;
//   if (av.debug.dnd) console.log('mouse.UpGridPosX, y', av.mouse.UpGridPos[0], av.mouse.UpGridPos[1]);
//   if (av.debug.dnd) console.log('mouseX, y', mouseX, mouseY);
//   av.parents.col[nn] = Math.floor(mouseX / av.grd.cellWd);
//   av.parents.row[nn] = Math.floor(mouseY / av.grd.cellHt);
//   //check to see if in the grid part of the canvas
//   if (av.parents.col[nn] >= 0 && av.parents.col[nn] < av.grd.cols && av.parents.row[nn] >= 0 && av.parents.row[nn] < av.grd.rows) {
//     av.parents.AvidaNdx[nn] = av.parents.row[nn] * av.grd.cols + av.parents.col[nn];

//     //Start setting up for getting data for parents structure
//     nn = av.parents.name.length;  // get index into parents
//     var newName = av.dnd.nameParent(nodes[0].textContent);
//     //av.parents.name[nn] = nodes[0].textContent;

//     //Add organism to av.dnd.ancestorBox in settings.
//     av.dnd.fzOrgan.forInSelectedItems(function (item, id) {
//       item.data = newName;
//       if (av.debug.dnd) console.log('selected: item', item, '; id', id);
//       av.dnd.ancestorBox.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//       if (av.debug.dnd) console.log('av.dnd.gridCanvas.map', av.dnd.gridCanvas.map);
//       if (av.debug.dnd) console.log('av.dnd.ancestorBox.map', av.dnd.ancestorBox.map);
//     });
//     // need to find the domid of the ancestor in ancestorBox. The line below is not correct. ???? !!!!! tiba
//     var domIDs = Object.keys(av.dnd.ancestorBox.map);
//     av.parents.domid.push(domIDs[domIDs.length-1]);

//     //update parents structure
//     av.parents.handNdx.push(nn);
//     av.parents.howPlaced[nn] = 'hand';
//     av.parents.injected[nn] = false;
//     var domId = Object.keys(source.selection)[0];
//     if (av.debug.dnd) console.log('av.dnd.landGridCanvas; domId', domId, '; av.fzr.genome', av.fzr.genome);
//     var dir = av.fzr.dir[domId];
//     av.parents.genome.push(av.fzr.file[dir+'/genome.seq']);
//     //find domId of parent as listed in av.dnd.ancestorBox

//     //Don't think I need domID within ancestorBox
//     //var mapItems = Object.keys(av.dnd.ancestorBox.map);
//     //av.parents.domid.push(mapItems[mapItems.length - 1]);

//     //Find color of ancestor
//     if (0 < av.parents.Colors.length) {av.parents.color.push(av.parents.Colors.pop());}
//     else {av.parents.color.push(av.color.defaultParentColor);}
//     //if (av.debug.dnd) console.log('after', av.parents)
//     //Re-Draw Grid - done in routine that calls this one.
//   }
//   else {
//     //not on grid
//     av.post.addUser('DnD: ' + source.node.id + '--> GridCanvas: by: ' + nodes[0].textContent);
//   }
//   //In all cases remove the ancestor from the gridCanvas so we only keep them in the av.dnd.ancestorBox.
//   av.dnd.gridCanvas.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
//   av.dnd.gridCanvas.sync();
  
//   if (av.debug.dnd) console.log('parents', av.parents);
// };
//--------------------------------------------------------------------------------------- end av.dnd.landGridCanvas --*/

//------------------------------------------------------------------------------------ av.dnd.updateFromFzrOrganism --*/

// yemd
// av.dnd.updateFromFzrOrganism = function () {
//   'use strict';
//   var domId = Object.keys(av.dnd.fzOrgan.selection)[0];
//   var dir = av.fzr.dir[domId];
//   if (av.debug.dnd) console.log('domId', domId, '; dir', dir);
//   av.fzr.actOrgan.name = av.fzr.file[dir+'/entryname.txt'];
//   av.fzr.actOrgan.genome = av.fzr.file[dir+'/genome.seq'];
//   if (av.debug.dnd) console.log('domId', domId);
//   if (av.debug.dnd) console.log('domId', domId, '; dir', dir, '; name', av.fzr.actOrgan.name, '; genome', av.fzr.actOrgan.genome);
//   if (av.debug.dnd) console.log('fzr', av.fzr);

//   if (av.debug.dnd) console.log('av.fzr.actOrgan', av.fzr.actOrgan);
// };

//-------------------------------------------------------------------------------------------- av.dnd.landOrganIcon --*/

// yemd
// replaced by av.dnd.landOrganIcon2 in dragulaDnd.js
// av.dnd.landOrganIcon = function (source, nodes, target) {
//   //clear out the old data if an organism is already there
//   'use strict'
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   if (av.debug.dnd) console.log('source', source.node.id);
//   if ('activeOrgan' != source.node.id) {
//     var items = av.dnd.getAllItems(av.dnd.activeOrgan);    //gets some data about the items in the container
//     if (0 < items.length) {
//       av.dnd.activeOrgan.selectAll().deleteSelectedNodes();  //clear items
//       av.dnd.activeOrgan.sync();   //should be done after insertion or deletion
//     }
//     //get the data for the new organism
//     source.forInSelectedItems(function (item, id) {
//       av.dnd.activeOrgan.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//       av.dnd.activeOrgan.sync();
//     });
//     av.fzr.actOrgan.actDomid = Object.keys(av.dnd.activeOrgan.map)[0];
//   }
//   if ('fzOrgan' === source.node.id) { av.dnd.updateFromFzrOrganism(); }
//   else if ('ancestorBox' === source.node.id) {
//     var domid = Object.keys(av.dnd.ancestorBox.selection)[0];
//     var Ndx = av.parents.domid.indexOf(domid);  //Find index into parent structure
//     av.fzr.actOrgan.name = av.parents.name[Ndx];
//     av.fzr.actOrgan.genome = av.parents.genome[Ndx];
//     if (av.debug.dnd) console.log('fzr', av.fzr, '; parents', av.parents, '; ndx', Ndx);
//   }

//   //clear out av.dnd.organIcon as nothing is stored there - just moved on to OrganismCurrent
//   av.dnd.organIcon.selectAll().deleteSelectedNodes();  //clear items
//   av.dnd.organIcon.sync();   //should be done after insertion or deletion
// };
//---------------------------------------------------------------------------------------- end av.dnd.landOrganIcon --*/

//Need to have only the most recent dropped organism in av.dnd.activeOrgan. Do this by deleting everything in activeOrgan
//and reinserting the most resent one after a drop event.

// yemd
// replaced by av.dnd.landActiveOrgan2 in dragulaDnd.js
//------------------------------------------------------------------------------------------- av.dnd.landActiveOrgan --*/
// av.dnd.landActiveOrgan = function (move) {
//   'use strict';
//   //av.post.addUser('DnD: ' + move.fzSection.node.id + '--> ' + move.target.node.id + ': by: ' + move.sourceDomId.textContent);
//   console.log('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + av.dnd.move.nodeName);
//   //clear out the old data if an organism is already there
//   var items = av.dnd.getAllItems(av.dnd.activeOrgan);    //used to see if there is more than one item in Organ Current
//   //if (av.debug.dnd) console.log('items', items, items.length);
//   if (0 < items.length) {
//     av.dnd.activeOrgan.selectAll().deleteSelectedNodes();  //clear items
//     av.dnd.activeOrgan.sync();   //should be done after insertion or deletion

//     //get the data for the new organism
//     av.dnd.fzOrgan.forInSelectedItems(function (item, id) {
//       av.dnd.activeOrgan.insertNodes(false, [item]);          //assign the node that is selected from the only valid pkg.source.
//     });
//     av.dnd.activeOrgan.sync();
//     av.fzr.actOrgan.actDomid = Object.keys(av.dnd.activeOrgan.map)[0];
//     //if (av.debug.dnd) console.log('av.dnd.activeOrgan.map=', av.dnd.activeOrgan.map);
//   }
//   av.dnd.updateFromFzrOrganism();
// };
//-------------------------------------------------------------------------------------- end av.dnd.landActiveOrgan --*/

//The variable organCanvas with the html tag organismCanvas will Not hold the organism. Anything dropped on the OrganismCanvas
//will be put in av.dnd.activeOrgan.
//------------------------------------------------------------------------------------------ av.dnd.landorganCanvas --*/
// av.dnd.landorganCanvas = function (source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   //Clear current to put the new organism in there.
//   av.dnd.activeOrgan.selectAll().deleteSelectedNodes();  //clear items
//   av.dnd.activeOrgan.sync();   //should be done after insertion or deletion

//   //Clear canvas because we only store the 'Mom' in the OrganCurrentNode
//   var ItemID = Object.keys(av.dnd.activeOrgan.map)[0];
//   av.dnd.organCanvas.selectAll().deleteSelectedNodes();  //clear items
//   av.dnd.organCanvas.sync();   //should be done after insertion or deletion
//   dojo.destroy(ItemID);

//   //get the data for the new organism
//   av.dnd.fzOrgan.forInSelectedItems(function (item, id) {
//     av.dnd.activeOrgan.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//   });
//   av.dnd.activeOrgan.sync();
//   av.fzr.actOrgan.actDomid = Object.keys(av.dnd.activeOrgan.map)[0];

//   if ('fzOrgan' == source.node.id) av.dnd.updateFromFzrOrganism();
// };
//-------------------------------------------------------------------------------------- end av.dnd.landorganCanvas --*/

//============================================================================================= Populated Dishes DND ===

//Process when an World is added to the Freezer
//pkg contains = pkg.source, pkg.nodes, pkg.target
//--------------------------------------------------------------------------------------------- av.dnd.landFzWorldFn ---

// yemd
// replaced by av.dnd.landFzWorld in dragulaDnd.js

// av.dnd.landFzWorldFn = function (pkg) {  
//   'use strict';
//   if (av.debug.dnd) console.log('landFzPopDish: fzr', av.fzr);
//   var domid = Object.keys(pkg.target.selection)[0];

//   var oldName = pkg.nodes[0].textContent + '@' + av.grd.popStatsMsg.update.formatNum(0);
//   var nameArray = av.dnd.preTransferNameList(pkg.target, oldName);
//   var sName = av.dnd.namefzrItem(oldName, nameArray);
//   var worldName = prompt('Please name your populated dish', sName);
//   if (worldName) {
//     var nameWorld = av.dnd.getUniqueFzrName(worldName, nameArray);
//     if (null != nameWorld) {
//       av.post.addUser('DnD: ' + pkg.source.node.id + '--> ' + pkg.target.node.id + ': by: ' + pkg.nodes[0].textContent + ' --> ' + nameWorld);
//       document.getElementById(domid).textContent = nameWorld;
//       pkg.target.map[domid].data = nameWorld;
//       pkg.target.map[domid].type[0] = 'w';
//       //console.log('data', pkg.target.map[domid].data, pkg.target.map[domid]);
//       //console.log('type', pkg.target.map[domid].type[0]);

//       //Now find which node has the new content so it can get a context menu.
//       var domID = av.dnd.getDomId(nameWorld, pkg.target);
//       av.fzr.dir[domID] = 'w'+ av.fzr.wNum;
//       av.fzr.domid['w'+ av.fzr.wNum] = domID;

//       //create a right av.mouse-click context menu for the item just created.
//       av.dnd.contextMenu(pkg.target, domID, 'av.dnd.landFzWorldFn');
//       av.fwt.makeFzrWorld(av.fzr.wNum, 'av.dnd.landFzWorldFn');
//       av.msg.exportExpr('w' + av.fzr.wNum);
//       av.msg.sendData();

//       av.fzr.saveUpdateState('no');
//       av.fzr.wNum++;
//     }
//     else {  //user cancelled so the item should NOT be added to the freezer.
//       av.dnd.fzWorld.deleteSelectedpkg.nodes();  //clear items
//       av.dnd.fzWorld.sync();   //should be done after insertion or deletion
//     }
//   }
//   else {  //user cancelled so the item should NOT be added to the freezer.
//     av.dnd.fzWorld.deleteSelectedpkg.nodes();  //clear items
//     av.dnd.fzWorld.sync();   //should be done after insertion or deletion
//   }
// };
//----------------------------------------------------------------------------------------- end av.dnd.landFzWorldFn ---

    //ways to get information about the Dnd containers
    //console.log('pkg.nodes[0].id, pkg.target.node.id = ', pkg.nodes[0].id, pkg.target.node.id);
    //console.log(Object.keys(pkg.target.selection)[0]);
    //console.log('map: ', pkg.target.map);
    //console.log('id: ', pkg.target.node.id);
    //console.log('textContent: ', pkg.nodes[0].textContent);
    //console.log('pkg.nodes[0].id: ', pkg.nodes[0].id);
    //console.log('pkg.target.selection: ',pkg.target.selection);
    //console.log('pkg.target.selection: ',Object.keys(pkg.target.selection)[0]);
    //console.log(document.getElementById(Object.keys(pkg.target.selection)[0]).innerHTML)
    //console.log('allnodes: ',pkg.target.getAllNodes());

//---------------------------------------------------------------------------------------------- av.dnd.landTrashCan ---

//yemd
// replaced by av.dnd.landTrashCan in dragulaDnd.js

// av.dnd.landTrashCan = function (source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   var remove = {};
//   remove.type = '';
//   remove.domid = '';
//   if (av.debug.dnd) console.log('in av.dnd.landTrashCan');
//   //if the item is from the freezer, delete from freezer unless it is original stock (@)
//   if ('fzOrgan' == source.node.id && '@ancestor' != nodes[0].textContent) {
//     if (av.debug.dnd) {console.log('fzOrgan->trash', av.fzr.genome);}
//     remove.domid = Object.keys(av.dnd.fzOrgan.selection)[0];
//     remove.type = 'g';
//     if (av.debug.dnd) console.log('fzOrgan->trash; nodes[0]',nodes[0]);
//     if (av.debug.dnd) console.log('fzOrgan->trash; source.parent',source.parent);
//     source.parent.removeChild(nodes[0]);       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
//     source.sync();
//     av.fzr.saveUpdateState('no');
//   }
//   else if ('fzConfig' == source.node.id && '@default' != nodes[0].textContent) {
//     remove.domid = Object.keys(av.dnd.fzConfig.selection)[0];
//     remove.type = 'c';
//     source.parent.removeChild(nodes[0]);       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
//     source.sync();
//     av.fzr.saveUpdateState('no');
//   }
//   else if ('fzWorld' == source.node.id && '@example' != nodes[0].textContent) {
//     remove.domid = Object.keys(av.dnd.fzWorld.selection)[0];
//     remove.type = 'w';
//     source.parent.removeChild(nodes[0]);       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
//     source.sync();
//     av.fzr.saveUpdateState('no');
//   }
//   av.dnd.trashCan.selectAll().deleteSelectedNodes();  //in all cases, empty the av.dnd.trashCan
//   return remove;
// };
//------------------------------------------------------------------------------------------ end av.dnd.landTrashCan ---

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


// get rid of if don't use
//-------------------------------------------------------------------------------------- av.dnd.loadDefautlConfigFn --*/

// yemd
// replaced by av.dnd.loadDefaultConfigFn from dragulaDnd.js

// av.dnd.loadDefaultConfigFn = function (from) {
//   //console.log(from, 'called av.dnd.loadDefautlConfigFn: av.fzr.file.c0/entryname.txt=', av.fzr.file['c0/entryname.txt']);
//   //console.log('av.fzr.domid.c0=', av.fzr.domid.c0);
  
//   //example of using the javascript .forEach( function) property of nodes as a set of items each with an index
//   av.dom.findNode = function(item, index) {
//     //console.log('ndx=', index, '; item=', item);
//     console.log('ndx=', index, '; item.id=', item.id, '; av.fzr.domid.c0=', av.fzr.domid.c0);
//     if (av.fzr.domid.c0 == item.id) {
//       av.dnd.move.sourceNodeNdx = index;
//       console.log('av.dnd.move.sourceNodeNdx=', av.dnd.move.sourceNodeNdx);
//       //break; //not allowed in this function according to NetBeans
//     }
//   };
//   var nodes = av.dnd['fzConfig'].getAllNodes();
//   // example of a way to do this doing using a special dojo function.
//   //nodes.forEach(av.dom.findNode);
  
//   var fzSection = 'fzConfig';
//   var target = 'activeConfig';
//   var type = 'c';
//   var ndx = -1;
  
//   //console.log('fzrObject.getAllNodes[0]=', av.dnd[fzSection].getAllNodes()[0]);
//   //console.log('fzrObject.getAllNodes=',    av.dnd[fzSection].getAllNodes());
//   //console.log('fzConfig=', av.dnd.fzConfig); 
  
 
//   //one more loop example idea
//   var len = nodes.length;
//   for (var ii=0; ii < len; ii++) {
//     //console.log('ii, nodes[ii].id=', ii, nodes[ii].id );
//     if (av.fzr.domid.c0 == nodes[ii].id) {
//       ndx = ii;
//     }    
//   };

//   if (-1 <  ndx) {
//     var nodeMvDomid = nodes[ndx].id;
//     var node2Mv = nodes[ndx].id;     //from messey version
//     //console.log('fzSection=', fzSection, '; target=', target, '; nodeMvDomid=', nodeMvDomid);
//     //console.log('type=', type, '; node2Mv=', node2Mv);
    
//     av.dnd.move.sourceDomId = nodeMvDomid;

//     //console.log('; moveNode=', nodes[av.dnd.move.sourceDomId]);

//     var addedPopPage = false;
//     var addedAnaPage = false;
//     av.dnd.move.via = 'menu';
//     av.dnd.move.source = av.dnd[fzSection];
//     av.dnd.move.target = av.dnd[target];
//     av.dnd.move.type = type;
//     av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
//     av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    
//     //put node to move into the target
//     av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
//     av.dnd[target].sync();
//     var domIDs = Object.keys(av.dnd[target].map);
//     av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
//     av.dnd.move.sourceMoveData = av.dnd.move.source.map[av.dnd.move.sourceDomId];
//     console.log('move', av.dnd.move);
    
//     if (('fzConfig' == fzSection || 'fzWorld' == fzSection) && 'activeConfig' == target) { 
//       addedPopPage = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.loadDefautlConfigFn');
//     }
//     else {
//       console.log('Error: some criteria not met');
//     }
//   } 
//   else {
//     console.log('Error: index of default configuration file not found; there must be a c0 folder');
//   }
// };

//---------------------------------------------------------------------------------- end av.dnd.loadDefautlConfigFn --*/


//Add items from freezer section using the menu
//---------------------------------------------------------------------------------------- av.dnd.FzAddExperimentFn --*/
// yemd: replaced by av.dnd.FzAddExperimentFn in dragulaDnd.js

// av.dnd.FzAddExperimentFn = function (fzSection, target, type) {
//   //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
//   //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
//   //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
//   //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

//   if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
//     var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
//     console.log('fzSection=', fzSection, '; target=', target, '; nodeMvDomid=', nodeMvDomid, '; type=', type);
//     var addedPopPage = false;
//     var addedAnaPage = false;
//     av.dnd.move.via = 'menu';
//     av.dnd.move.source = av.dnd[fzSection];
//     av.dnd.move.target = av.dnd[target];
//     av.dnd.move.type = type;
//     //av.dnd.move.sourceDomId = Object.keys(av.dnd.move.source.selection)[0];  //does not work here even if same basic thing work in AvidaED.js
//     av.dnd.move.sourceDomId = nodeMvDomid;
//     av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
//     av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
//     av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
//     av.dnd[target].sync();
//     var domIDs = Object.keys(av.dnd[target].map);
//     av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
//     av.dnd.move.sourceMoveData = av.dnd.move.source.map[av.dnd.move.sourceDomId];
//     // console.log('move', av.dnd.move);
    
//     if ('fzOrgan' == fzSection && 'ancestorBox' == target) { addedPopPage = av.dnd.lndAncestorBox(av.dnd.move); }
//     else if ('fzOrgan' == fzSection && 'activeOrgan' == target) { addedPopPage = av.dnd.lndActiveOrgan(av.dnd.move); }
//     else if (('fzConfig' == fzSection || 'fzWorld' == fzSection) && 'activeConfig' == target) { 
//       addedPopPage = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.FzAddExperimentFn');
//     }
//     else if ('anlDndChart' == target && 'fzWorld' == fzSection) addedAnaPage = av.dnd.lndAnlDndChart(av.dnd.move);

//     if (addedPopPage) av.grd.drawGridSetupFn('av.dnd.FzAddExperimentFn');
    
//   }
//   else {
//     switch(fzSection) {
//       case 'fzConfig':
//         alert('You must select a configurated dish first');
//         break;
//       case 'fzOrgan':
//         alert('You must select an organism first');
//         break;
//       case 'fzWorld':
//         alert('You must select a populated dish first');
//         break;
//     }
//   }
// };
//------------------------------------------------------------------------------------ end av.dnd.FzAddExperimentFn --*/

// yemd: replaced by av.dnd.landAnlDndChart in dragulaDnd.js

// av.dnd.lndAnlDndChart = function (move) {
//   'use strict';
//   console.log('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
//   var items = av.dnd.getAllItems(av.dnd.popDish0);
//   if (0 === items.length) { av.dnd.putNslot(0, move.source); }
//   else {
//     items = av.dnd.getAllItems(av.dnd.popDish1);
//     if (0 === items.length) { av.dnd.putNslot(1, move.source); }
//     else {
//       items = av.dnd.getAllItems(av.dnd.popDish2);
//       if (0 === items.length) { av.dnd.putNslot(2, move.source);}
//     }
//   }
//   //in all cases no population name is stored in the graph div
//   av.dnd.anlDndChart.selectAll().deleteSelectedNodes();  //clear items
//   av.dnd.anlDndChart.sync();   //should be done after insertion or deletion
// };

// av.dnd.landAnlDndChart = function (dnd, source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   var items = av.dnd.getAllItems(av.dnd.popDish0);
//   if (0 === items.length) { av.dnd.putNslot(0, source); }
//   else {
//     items = av.dnd.getAllItems(av.dnd.popDish1);
//     if (0 === items.length) { av.dnd.putNslot(1, source); }
//     else {
//       items = av.dnd.getAllItems(av.dnd.popDish2);
//       if (0 === items.length) { av.dnd.putNslot(2, source);}
//     }
//   }
//   //in all cases no population name is stored in the graph div
//   av.dnd.anlDndChart.selectAll().deleteSelectedNodes();  //clear items
//   av.dnd.anlDndChart.sync();   //should be done after insertion or deletion
// };

//------------------------------------------------------------------------------------------------- av.dnd.putNslot --*/
// av.dnd.putNslot = function (Num, source) {
//   'use strict';
//   //the console.log get the data one way, the codes gets the same data another way. 
//   console.log('sourceContainer=', source.parent.id, '; world domID=', source.anchor.id, '; world Name=', source.anchor.textContent);
//   var domid = Object.keys(source.selection)[0];
//   var name = document.getElementById(domid).textContent;
//   var dir = av.fzr.dir[domid];

//   //I tried putting av.dnd.popDish+Num as a parameter to be passed, but that did not work.
//   av.dnd['popDish'+Num].insertNodes(false, [{data: name, type: ['w']}]);
//   av.dnd['popDish'+Num].sync();
//   av.anl.loadWorldData(Num, dir);
//   av.anl.loadSelectedData(Num, 'yLeftSelect', 'left', 'av.dnd.putNslot');
//   av.anl.loadSelectedData(Num, 'yRightSelect', 'right', 'av.dnd.putNslot');
// };
//--------------------------------------------------------------------------------------------- end av.dnd.putNslot --*/

// should be able to combine the following three functions, but hope to get rid of dojo dnd someday. 
// only called from  av.dnd.popDish0.on('DndDrop', function (source, nodes, copy, target)
// tried to put in a separate file at one time and at that time it did not work. 
//--------------------------------------------------------------------------------------------- av.dnd.landpopDish# --*/

// yemd: replaced by av.dnd.landpopDish in dragulaDnd.js 
// consolidated the three functions because they were basically the same

// av.dnd.landpopDish0 = function (dnd, source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   var items = av.dnd.getAllItems(av.dnd.popDish0);
//   //if there is an existing item, need to clear all nodes and assign most recent to item 0
//   if (0 < items.length) {
//     //clear out the old data
//     av.dnd.popDish0.selectAll().deleteSelectedNodes();  //clear items
//     av.dnd.popDish0.sync();   //should be done after insertion or deletion

//     //get the data for the new organism
//     av.dnd.fzWorld.forInSelectedItems(function (item, id) {
//       av.dnd.popDish0.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//     });
//     av.dnd.popDish0.sync();
//   }
//   var fzdomid = Object.keys(source.selection)[0];
//   var dir = av.fzr.dir[fzdomid];
//   av.anl.loadWorldData(0, dir);
//   av.anl.loadSelectedData(0, 'yLeftSelect', 'left', 'av.dnd.landpopDish0');
//   av.anl.loadSelectedData(0, 'yRightSelect', 'right', 'av.dnd.landpopDish0');
// };

// av.dnd.landpopDish1 = function (dnd, source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   var items = av.dnd.getAllItems(av.dnd.popDish1);
//   //if there is an existing item, need to clear all nodes and assign most recent to item 0
//   if (0 < items.length) {
//     //clear out the old data
//     av.dnd.popDish1.selectAll().deleteSelectedNodes();  //clear items
//     av.dnd.popDish1.sync();   //should be done after insertion or deletion

//     //get the data for the new organism
//     av.dnd.fzWorld.forInSelectedItems(function (item, id) {
//       av.dnd.popDish1.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//     });
//     av.dnd.popDish1.sync();
//   }
//   var fzdomid = Object.keys(source.selection)[0];
//   var dir = av.fzr.dir[fzdomid];
//   av.anl.loadWorldData(1, dir);
//   av.anl.loadSelectedData(1, 'yLeftSelect', 'left', 'av.dnd.landpopDish1');
//   av.anl.loadSelectedData(1, 'yRightSelect', 'right', 'av.dnd.landpopDish1');
// };

// av.dnd.landpopDish2 = function (dnd, source, nodes, target) {
//   'use strict';
//   av.post.addUser('DnD: ' + source.node.id + '--> ' + target.node.id + ': by: ' + nodes[0].textContent);
//   var items = av.dnd.getAllItems(av.dnd.popDish2);
//   //if there is an existing item, need to clear all nodes and assign most recent to item 0
//   if (0 < items.length) {
//     //clear out the old data
//     av.dnd.popDish2.selectAll().deleteSelectedNodes();  //clear items
//     av.dnd.popDish2.sync();   //should be done after insertion or deletion

//     //get the data for the new organism
//     av.dnd.fzWorld.forInSelectedItems(function (item, id) {
//       av.dnd.popDish2.insertNodes(false, [item]);          //assign the node that is selected from the only valid source.
//     });
//     av.dnd.popDish2.sync();
//     //if (av.debug.dnd) console.log('popDish2.map=', popDish2.map);
//   }
//   var fzdomid = Object.keys(source.selection)[0];
//   var dir = av.fzr.dir[fzdomid];
//   av.anl.loadWorldData(2, dir);
//   av.anl.loadSelectedData(2, 'yLeftSelect', 'left', 'av.dnd.landpopDish2');
//   av.anl.loadSelectedData(2, 'yRightSelect', 'right', 'av.dnd.landpopDish2');
// };
//----------------------------------------------------------------------------------------- end av.dnd.landpopDish# --*/

// ****************************************************************************************************************** */
//                                                                                   Right Click Context Menu Freezer */
// ****************************************************************************************************************** */
//used to re-name freezer items after they are created
//http://jsfiddle.net/bEurr/10/
// if (av.dbg.flg.root) { console.log('Root: before av.dnd.contextMenu'); }

// yemd
// replaced by av.dnd.contextMenu in dragulaDnd.js

// av.dnd.contextMenu = function(target, fzItemID, from) {
//   'use strict';
//   var fzSection = target.node.id;
//   //console.log(from, 'called av.dnd.contextMenu; fzItemID=', fzItemID, '; fzSection=', fzSection);
//   var dir = '';
//   if (av.debug.dnd) console.log('contextMenu; target.node.id=',target.node.id);
//   if (av.debug.dnd) console.log('contextMenu; fzItemID=',fzItemID, ' fzSection=', fzSection);
//   if (av.debug.dnd) console.log('contextMenu: fzr', av.fzr);
//   var aMenu = new dijit.Menu({targetNodeIds: [fzItemID]});
//   aMenu.addChild(new dijit.MenuItem({
//     label: 'Rename',
//     onClick: function () {
//       av.post.addUser('Button: Rname:' + document.getElementById(fzItemID).textContent);
//       var fzName = prompt('Please rename freezer item', document.getElementById(fzItemID).textContent);
//       if (fzName) {
//         fzName = av.dnd.getUniqueName(fzName, target);
//         if (null != fzName) {
//           //document.getElementById(fzItemID).innerHTML = fzName;  //either works
//           document.getElementById(fzItemID).textContent = fzName;
//           document.getElementById(fzItemID).data = fzName;
//           target.map[fzItemID].data = fzName;
//           //console.log('.data=', target.map[fzItemID].data);
//           //update freezer structure
//           dir = av.fzr.dir[fzItemID];
//           av.fzr.file[dir+'/entryname.txt']=fzName;
//           av.fzr.saveUpdateState('no');
//         }
//       }
//     }
//   }));
//   if (!av.brs.isSafari) {
//     //if (true) {
//     aMenu.addChild(new dijit.MenuItem({
//       label: 'export',
//       onClick: function () {
//         av.post.addUser('Button: export:' + document.getElementById(fzItemID).textContent);
//         var type;
//         var itemName = document.getElementById(fzItemID).textContent;
//         var zName = prompt(itemName + ' will be saved as ' + itemName + '.avidaED_fi.zip', itemName + '.avidaED_fi.zip');
//         if (zName) {
//           if (0 === zName.length) zName = itemName + '.avidaED_fi.zip';  //.avidaED_fi.zip is 23 characters
//           if ('.zip' != zName.substring(zName.length - 4)) zName = zName + '.zip';
//           dir = av.fzr.dir[fzItemID];
//           type = dir.substring(0, 1);
//           var FIzip = new av.fio.JSZip();  //FreezerItemZip
//           FIzip.file('entrytype.txt', type);
//           if (av.debug.dnd) console.log('type', type);
//           for (var fname in av.fzr.file) {
//             //console.log('dir', dir, '; fname', fname);
//             if (dir == fname.substring(0, dir.length)) {
//               if (av.debug.dnd) console.log('export filename', fname.substring(dir.length + 1));
//               FIzip.file(fname.substring(dir.length + 1), av.fzr.file[fname]);
//             }
//           }
//           var content = FIzip.generate({type: 'blob'});
//           saveAs(content, zName);
//         }
//       }
//     }));
//   }
//   aMenu.addChild(new dijit.MenuItem({
//     label: 'delete',
//     onClick: function () {
//       av.post.addUser('Button: delete:' + document.getElementById(fzItemID).textContent);
//       var sure = confirm('Do you want to delete ' + document.getElementById(fzItemID).textContent);
//       if (sure) {
//         dir = av.fzr.dir[fzItemID];
//         av.fzr.file[dir+'/entryname.txt'];
//         if ('fzOrgan' == fzSection) {
//           av.fwt.removeFzrItem(dir, 'g');
//         } else if ('fzConfig' == fzSection){
//           av.fwt.removeFzrItem(dir, 'c');
//         } else if ('fzWorld' == fzSection){
//           av.fwt.removeFzrItem(dir, 'w');
//         }
//         target.selectNone();
//         dojo.destroy(fzItemID);
//         target.delItem(fzItemID);
//         av.fzr.saveUpdateState('no');
//         //need to remove from fzr and pouchDB
//       }
//     }
//   }));
// };

  //---------------------------------------------------------------------------------------- av.dnd.clearFrzDogjoFn --*/
  
  // yemd
  // av.dnd.clearFrzDojoFn = function() {
  //   //Clear each section of the freezer
  //   //if (av.debug.fio) { console.log('FIO: before  av.dnd.fzConfig.selectAll'); }
  //   av.dnd.fzConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
  //   //if (av.debug.fio) { console.log('FIO: before av.dnd.fzConfig.sync'); }
  //   av.dnd.fzConfig.sync('');   //should be done after insertion or deletion
  //   //if (av.debug.fio) { console.log('FIO: before av.dnd.fzOrgan.selectAll', av.dnd.fzOrgan); }
  //   av.dnd.fzOrgan.selectAll().deleteSelectedNodes();
  //   //if (av.debug.fio) { console.log('FIO: before av.dnd.fzOrgan.sync'); }
  //   av.dnd.fzOrgan.sync();
  //   /*
  //   if (av.debug.fio) { console.log('before av.dnd.fzMdish.selectAll', av.dnd.fzMdish); }
  //   av.dnd.fzMdish.selectAll().deleteSelectedNodes();
  //   av.dnd.fzMdish.sync();

  //   if (av.debug.fio) { console.log('before av.dnd.fzRdish.selectAll', av.dnd.fzMdish); }
  //   av.dnd.fzRdish.selectAll().deleteSelectedNodes();
  //   av.dnd.fzRdish.sync();
  //   */
  //   //if (av.debug.fio) { console.log('FIO: before av.dnd.fzTdish.selectAll', av.dnd.fzMdish); }
  //   av.dnd.fzTdish.selectAll().deleteSelectedNodes();
  //   av.dnd.fzTdish.sync();

  //   //if (av.debug.fio) { console.log('FIO: before av.dnd.fzWorld.selectAll', av.dnd.fzWorld); }
  //   av.dnd.fzWorld.selectAll().deleteSelectedNodes();
  //   av.dnd.fzWorld.sync();
  //   //if (av.debug.fio) { console.log('FIO: after av.dnd.fzWorld.selectAll'); }
  // };
  
  //------------------------------------------------------------------------------------ end av.dnd.clearFrzDogjoFn --*/

/* ****************************************************************************************************************** */
/* ****************************************************************************************************************** */
/*
A dojo menu drop down cannot call a dojo popup. It crashes

Looking at DND move https://dojotoolkit.org/reference-guide/1.10/dojo/dnd/Moveable.html
 https://dojotoolkit.org/reference-guide/1.10/dojo/dnd/Moveable.html
 */

//I tried to see if I could just remove the one node rather than all of them and re-instering. Seems to work.
//source.parent.removeChild(nodes[0]);    this statement works in trash to remove node from fzOrgan
//statement below only works if new config added to the bottom
//pkg.target.parent.removeChild(pkg.target.parent.childNodes[0]);       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically

//Dojo uses .data to help keep track of .textContent or .innerHTML
//At one time I was trying to keep the original name in .data and allow the user
//to change the .textContent name only. I have now decided that will cause trouble.
//I'm keeping the following commented out code that would update the .textContent specifically.
//var currentItem = Object.keys(av.dnd.activeConfig.map)[0];
//var freezeItem = Object.keys(av.dnd.fzConfig.selection)[0];
//if (av.debug.dnd) console.log('currentI', currentItem, ' freezeI', freezeItem);
//document.getElementById(currentItem).textContent = document.getElementById(freezeItem).textContent;
