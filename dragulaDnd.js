/**
 * Filename: dragulaDnd.js
 * Author: Yemi Shin
 * Description: Implementation of Raheem Clemon's Dragula proof of concept in AvidaED 4. 
 * Note: Change the legacy "Dojo-" tags later in HTMl, CSS, and JS
 *       // yemd is a tag for all the legacy code that is getting commented out in development
 */

// var av = av || {};  // consistent with the rest of js files

jQuery(document).ready(function($) {
  var containers = [$(".hi")[0], 
                    $.map($(".freezerContainer"), (value, key) => { return value }),  
                    $.map($("#testConfig"), (value, key) => { return value }),
                    $.map($("#activeConfig"), (value, key) => { return value }), 
                    $.map($("#trashCan"), (value, key) => { return value }), 
                    $.map($("#gridCanvas"), (value, key) => { return value }), 
                    $.map($("#ancestorBox"), (value, key) => { return value })].flat();
  console.log(containers);

  var hi = containers[0]
  var fzConfig = containers[1]
  var fzOrgan = containers[2]
  var fzWorld = containers[3]
  var fzTdish = containers[4]
  var testConfig = containers[5]
  var activeConfig = containers[6]
  var trashCan = containers[7]
  var gridCanvas = containers[8]
  var ancestorBox = containers[9]

  var dra = dragula(containers, {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      return true; // elements are always draggable by default
    },
    accepts: function (el, target, source, sibling) {
      return true; // elements can be dropped in any of the `containers` by default
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    copy: function (el, source) {
      //Makes sure the only item that will be copied instead of moved is in the FreezerMove div
      return source === fzConfig || source === hi || source === fzOrgan || source === fzWorld || source === fzTdish;
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped                       
    copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: true,               // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });

  dra.on('drag', (el, source) => { 
    console.log("dragging");
  });

  // main function that determines the logic for drag and drop
  dra.on('drop', (el, target, source) => {

    if (target !== null && target === trashCan) {
      console.log("in trashcan");
      av.dnd.landTrashCan(el, source);
    }

    if (source === fzTdish && target === testConfig) {
      av.dnd.lndTestConfig(el, target, source);
    }

    if (source === fzConfig && target === activeConfig) {
      av.dnd.lndActiveConfig(el, target, source);
    }

  });

  av.dnd.landTrashCan = function (el, source) {
    'use strict';
    var remove = {};
    remove.type = '';
    remove.domid = '';
    if (av.debug.dnd) console.log('in av.dnd.landTrashCan');
    
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    //if the item is from the freezer, delete from freezer unless it is original stock (@)
    if (fzOrgan === source && '@ancestor' !== el.textContent) {
      if (av.debug.dnd) {console.log('fzOrgan->trash', av.fzr.genome);}
      remove.domid = el.id;
      remove.type = 'g';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      document.querySelector(container).removeChild(document.getElementById(el.id));
      // maybe have a pop up saying 'it was successfully deleted?
      av.fzr.saveUpdateState('no');
    }
    else if (fzConfig === source && '@default' !== el.textContent) {
      remove.domid = el.id;
      remove.type = 'g';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      document.querySelector(container).removeChild(document.getElementById(el.id));
      av.fzr.saveUpdateState('no');
    }
    else if (fzWorld === source && '@example' !== el.textContent) {
      remove.domid = el.id;
      remove.type = 'w';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      document.querySelector(container).removeChild(document.getElementById(el.id));
      av.fzr.saveUpdateState('no');
    }

    //$('#trashCan').empty();  //in all cases, empty the av.dnd.trashCan
    
    if ('' !== remove.type) {
      //removeFzrItem(av.fzr, remove.dir, remove.type);
      remove.dir = av.fzr.dir[remove.domid];
      av.fwt.removeFzrItem(remove.dir, remove.type);
      console.log(av.fzr);
    }
  };

  av.dnd.loadDefaultConfigFn = function (from) {
    el = $.map($("#c0"), (value, key) => { return value })[0];
    av.dnd.lndActiveConfig(el, activeConfig, fzConfig);
    console.log(av.fzr.domid);
  };

  av.dnd.getUniqueName = function(name, target) {
    'use strict';
    var namelist = $.map(document.querySelector(target).children, (x) => {return x.innerHTML});
    console.log(namelist);
    var unique = true;
    var lngth = namelist.length;
    while (unique) {
      unique = false;
      for (var ii = 0; ii < lngth;  ii++) {
        if (name == namelist[ii]) {
          name = prompt('Please give your item a unique name ', name + '_1');
          unique = true;
        }
      }
    }
    return name;
  };

  // yemi's implementation of av.dnd.contextMenu
  av.dnd.contextMenu = function(target, fzItemID, from) {
    // example 'target' input format: '.className' or '#id'
    'use strict';
    var fzSection = target.slice(1);
    console.log(from, 'called av.dnd.contextMenu; fzItemID=', fzItemID, '; fzSection=', fzSection);
    var dir = '';
    if (av.debug.dnd) console.log('contextMenu; target.id =',fzSection);
    if (av.debug.dnd) console.log('contextMenu; fzItemID=',fzItemID, ' fzSection=', fzSection);
    if (av.debug.dnd) console.log('contextMenu: fzr', av.fzr);
    console.log(containerMap);

    // should I not use digit here?
    var aMenu = new dijit.Menu({targetNodeIds: [fzItemID]});
    aMenu.addChild(new dijit.MenuItem({
      label: 'Rename',
      onClick: function () {
        av.post.addUser('Button: Rename:' + document.getElementById(fzItemID).textContent);
        var fzName = prompt('Please rename freezer item', document.getElementById(fzItemID).textContent);
        if (fzName) {
          fzName = av.dnd.getUniqueName(fzName, target);
          if (null != fzName) {
            document.getElementById(fzItemID).innerHTML = fzName;
            document.getElementById(fzItemID).data = fzName;
            containerMap[target][fzItemID].name = fzName;
            //update freezer structure
            dir = av.fzr.dir[fzItemID];
            av.fzr.file[dir+'/entryname.txt']=fzName;
            av.fzr.saveUpdateState('no');
          }
        }
      }
    }));
    if (!av.brs.isSafari) {
      aMenu.addChild(new dijit.MenuItem({
        label: 'export',
        onClick: function () {
          av.post.addUser('Button: export:' + document.getElementById(fzItemID).textContent);
          var type;
          var itemName = $(fzItemID).textContent;
          var zName = prompt(itemName + ' will be saved as ' + itemName + '.avidaED_fi.zip', itemName + '.avidaED_fi.zip');
          if (zName) {
            if (0 === zName.length) zName = itemName + '.avidaED_fi.zip';  //.avidaED_fi.zip is 23 characters
            if ('.zip' != zName.substring(zName.length - 4)) zName = zName + '.zip';
            dir = av.fzr.dir[fzItemID];
            type = dir.substring(0, 1);
            var FIzip = new av.fio.JSZip();  //FreezerItemZip
            FIzip.file('entrytype.txt', type);
            if (av.debug.dnd) console.log('type', type);
            for (var fname in av.fzr.file) {
              //console.log('dir', dir, '; fname', fname);
              if (dir == fname.substring(0, dir.length)) {
                if (av.debug.dnd) console.log('export filename', fname.substring(dir.length + 1));
                FIzip.file(fname.substring(dir.length + 1), av.fzr.file[fname]);
              }
            }
            var content = FIzip.generate({type: 'blob'});
            saveAs(content, zName);
          }
        }
      }));
    }
    aMenu.addChild(new dijit.MenuItem({
      label: 'delete',
      onClick: function () {
        av.post.addUser('Button: delete:' + document.getElementById(fzItemID).textContent);
        var sure = confirm('Do you want to delete ' + document.getElementById(fzItemID).textContent + '?');
        if (sure) {
          dir = av.fzr.dir[fzItemID];
          av.fzr.file[dir+'/entryname.txt'];
          if ('fzOrgan' == fzSection) {
            av.fwt.removeFzrItem(dir, 'g');
          } else if ('fzConfig' == fzSection){
            av.fwt.removeFzrItem(dir, 'c');
          } else if ('fzWorld' == fzSection){
            av.fwt.removeFzrItem(dir, 'w');
          }

          document.querySelector(target).removeChild(document.getElementById(fzItemID));
          delete containerMap[target][fzItemID];
          console.log(containerMap);

          av.fzr.saveUpdateState('no');
          //need to remove from fzr and pouchDB
        }
      }
    }));
  };

  // yemi's implementation of av.dnd.lndTestConfig but locally
  av.dnd.lndTestConfig = (el, target, source) => {
    $("#testConfig").empty();
    $("#testConfig").append(el);

    var domid = el.id;
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    av.fzr.actConfig.actDomid = domid;
    av.fzr.actConfig.name = document.getElementById(domid).textContent;
    av.fzr.actConfig.fzDomid = domid;
    av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.fzDomid];
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }
    // console.log(av.fzr.dir);
    // console.log(av.fzr.actConfig.actDomid, av.fzr.actConfig.name, av.fzr.actConfig.fzDomid, av.fzr.actConfig.dir);
    // console.log(av.fzr.file);

    // console.log(containerMap);
    // console.log(container);

    $("#ancestorBox").empty();
    // av.dnd.ancestorBoTest.empty();

    av.parents.clearParentsFn();

    if (source.id === 'fzConfig' || source.id === 'fzTdish') {
      av.fzr.actConfig.type = containerMap[container][domid].type;
      av.fzr.actConfig.file['events.cfg'] = ' ';

      //delete anyfiles in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      //load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        av.fio.handAncestorLoad(str);
      };

      //load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn('Yemi\'s Implementation of lndTestConfig'); //draw grid

      av.parents.placeAncestors();
    }

    if (source.id == 'fzWorld') {
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.lndActiveConfig');
    } else {
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.lndActiveConfig');
    }

    //Load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    //send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn('av.dnd.lndTestConfig');
  };

  av.dnd.lndActiveConfig = function (el, target, source) {
    'use strict';
    av.dnd.configFlag = 'normal';

    var ndx = -1;
    var klen = 0;
    var kk = 0;
    var str = '';

    $("#activeConfig").empty();
    $("#activeConfig").append(el);

    var domid = el.id;
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    av.fzr.actConfig.actDomid = domid;
    av.fzr.actConfig.name = document.getElementById(av.fzr.actConfig.actDomid).textContent;
    av.fzr.actConfig.fzDomid = source.id;
    av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.actDomid];
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }

    //The types are reassigned to indicate that they might be the populated form of the dishes.
    // move.target.map[av.fzr.actConfig.actDomid].type[0]= 'b';
    av.frd.updateSetup('av.dnd.lndActiveConfig');                  //call the avida-ED 3.0 style setup page
    av.msg.setupType = 'standard';

    $("#ancestorBox").empty();
    // av.dnd.ancestorBoTest.empty();

    av.parents.clearParentsFn();

    if (source.id === 'fzConfig' || source.id === 'fzTdish') {
      av.fzr.actConfig.type = containerMap[container][domid].type;
      av.fzr.actConfig.file['events.cfg'] = ' ';

      //delete anyfiles in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      //load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        av.fio.handAncestorLoad(str);
      };

      //load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn('Yemi\'s Implementation of lndTestConfig'); //draw grid
    }

    else if (source.id == 'fzWorld') {
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.lndActiveConfig');

      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['clade.ssg'] = av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg'];
      av.fzr.actConfig.file['detail.spop'] = av.fzr.file[av.fzr.actConfig.dir + '/detail.spop'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];
      av.grd.oldUpdate = av.fzr.actConfig.file['update'];
      TimeLabel.textContent = av.grd.oldUpdate;
      
      //load parents from clade.ssg and ancestors.
      av.fio.cladeSSG2parents(av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg']);
      var handList = av.fio.handAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']);
      var autoList = av.fio.autoAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']);
      console.log('handList=', handList);
      console.log('autoList=', autoList);
      var ndx = 0;
      klen = av.parents.name.length;
      for (kk = 0; kk < klen; kk++) {
        ndx = autoList.nam.indexOf(av.parents.name[kk]);
        if (-1 < ndx) {
          av.parents.genome[kk] = autoList.gen[ndx];
          av.parents.howPlaced[kk] = 'auto';
          av.parents.injected[kk] = true;
          av.parents.autoNdx.push(kk);
          autoList.nam.splice(ndx, 1);
          autoList.gen.splice(ndx, 1);
        }
        else {
          ndx = handList.nam.indexOf(av.parents.name[kk]);
          if (-1 < ndx) {
            av.parents.genome[kk] = handList.gen[ndx];
            av.parents.col[kk] = handList.col[ndx];
            av.parents.row[kk] = handList.row[ndx];
            av.parents.howPlaced[kk] = 'hand';
            av.parents.injected[kk] = true;
            av.parents.handNdx.push(kk);
            handList.nam.splice(ndx, 1);
            handList.gen.splice(ndx, 1);
            handList.col.splice(ndx, 1);
            handList.row.splice(ndx, 1);
          }
          else {
            console.log('Name, ', av.parents.name[kk], ', not found');
          }
        }
      }
    } else {
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.lndActiveConfig');
    }

    av.parents.placeAncestors();
    //Load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    //send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn('av.dnd.lndActiveConfig');

  };


  /*
  Helpers For Touch Screens
  */

  controlMovement();

  function controlMovement(){
    // makes sure that 1 finger touch wont move the screen in the canvas
      $("#gridCnvsHldr").on('touchmove', function(e) {
          // screen wont move with one touch
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    // makes sure that 1 finger touch wont move the screen in any of the first 3 containers
    for (var i = 0; i < containers.length; i++) {
      containers[i].addEventListener('touchmove', function(e) {
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    }
  };
});
