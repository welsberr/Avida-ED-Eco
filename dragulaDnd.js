/**
 * Filename: dragulaDnd.js
 * Author: Yemi Shin
 * Description: Implementation of Raheem Clemon's Dragula proof of concept in AvidaED 4. 
 * Note: Change the legacy "Dojo-" tags later in HTMl, CSS, and JS
 *       // yemd is a tag for all the legacy code that is getting commented out in development
 */

// var av = av || {};  // consistent with the rest of js files

jQuery(document).ready(function($) {
  var containers = [
                    $.map($(".freezerContainer"), (value, key) => { return value }),  
                    $.map($("#testConfig"), (value, key) => { return value }),
                    $.map($("#activeConfig"), (value, key) => { return value }), 
                    $.map($("#trashCan"), (value, key) => { return value }), 
                    $.map($("#gridCanvas"), (value, key) => { return value }), 
                    $.map($("#ancestorBox"), (value, key) => { return value }),
                    $.map($("#ancestorBoTest"), (value, key) => { return value })
                   ].flat();
  console.log('dragula containters: ', containers);

  // currently only have draggable containers on the Population page. 
  // Organism and Analysis page draggable containers will be implemented soon.
  av.dnd.fzConfig = containers[0]
  av.dnd.fzOrgan = containers[1]
  av.dnd.fzWorld = containers[2]
  av.dnd.fzTdish = containers[3]
  av.dnd.testConfig = containers[4]
  av.dnd.activeConfig = containers[5]
  av.dnd.trashCan = containers[6]
  av.dnd.gridCanvas = containers[7]
  av.dnd.ancestorBox = containers[8]
  av.dnd.ancestorBoTest = containers[9]

  var dragging = false;

  var dra = dragula(containers, {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      return true; // elements are always draggable by default
    },
    accepts: function (el, target, source, sibling) {
      if (target === source) {
        return true;
      }
      if (source === av.dnd.activeConfig && (target === av.dnd.fzConfig || target === av.dnd.fzWorld)) {
        return true;
      }
      if ((source === av.dnd.fzConfig || source === av.dnd.fzWorld) && target === av.dnd.activeConfig) {
        return true;
      }
      if (source === av.dnd.fzOrgan && (target === av.dnd.gridCanvas || target === av.dnd.ancestorBox || target === av.dnd.ancestorBoTest)) {
        return true;
      }
      if (source === av.dnd.fzTdish && target === av.dnd.testConfig) {
        return true;
      }
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    copy: function (el, source) {
      //Makes sure the only item that will be copied instead of moved is in the FreezerMove div
      return source === av.dnd.activeConfig || source === av.dnd.fzConfig || source === av.dnd.fzOrgan || source === av.dnd.fzWorld || source === av.dnd.fzTdish;
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
    dragging = true;
  });

  // main function that determines the logic for drag and drop
  dra.on('drop', (el, target, source) => {

    // el, target, source are dom objects aka stuff you could 'target.id' to

    if (target !== null && target === trashCan) {
      av.dnd.landTrashCan(el, source);
    }

    if (target === testConfig) {
      av.dnd.landTestConfig(el, target, source);
    }

    if (target === activeConfig) {
      av.dnd.landActiveConfig(el, target, source);
    }

    if (target === fzConfig) {
      av.dnd.landFzConfig(el, target, source);
    }

    if (target === ancestorBox) {
      av.dnd.landAncestorBox(el, target, source);
    }

    if (target === ancestorBoTest) {
      av.dnd.landAncestorBoTest(el, target, source);
    }

    if (target === fzWorld) {
      av.dnd.landFzWorld(el, target, source);
    }

    //When mouse button is released, return cursor to default values
    $(document).bind('mouseup', function (evt) {
      'use strict';
      if (dragging) {
        av.mouse.UpGridPos = [evt.pageX, evt.pageY];
        if (target === av.dnd.gridCanvas) {
          av.dnd.landGridCanvas2(el, target, source);
          av.grd.drawGridSetupFn('av.dnd.gridCanvas where target = gridCanvas');
        }
        dragging = false;
        $(document).unbind('mousemove');
      }
    });

    /* to be implemented */
    if (target === fzOrgan) {
      av.dnd.landFzOrgan2(el, target, source);
    }

    // if (target === organIcon) {
    //   av.dnd.landOrganIcon(el, target, source);
    //   av.ui.mainBoxSwap('organismBlock');
    //   av.msg.doOrgTrace();
    // }

    // if (target === activeOrgan) {
    //   av.dnd.landActiveOrgan(el, target, source);
    //   av.msg.doOrgTrace();
    // }

    // if (target === organCanvas) {
    //   av.dnd.landOrganCanvas(el, target, source);
    //   av.msg.doOrgTrace();
    // }

    // if (target === anlDndChart) {
    //   av.dnd.landAnlDndChart(el, target, source);
    //   av.anl.AnaChartFn();
    // }

    // if (target === popDish0) {
    //   av.dnd.landpopDish0(el, target, source);
    //   av.anl.AnaChartFn();
    // } 

    // if (target === popDish1) {
    //   av.dnd.landpopDish1(el, target, source);
    //   av.anl.AnaChartFn();
    // }

    // if (target === popDish2) {
    //   av.dnd.landpopDish2(el, target, source);
    //   av.anl.AnaChartFn();
    // }

    // if (target === popDish0) {
    //   switch (source.id) {
    //     case 'popDish0':
    //       av.post.addUser('DnD: delete_from: popDish0?');
    //       av.anl.wrld[0].left = [];       //remove lines from population 1
    //       av.anl.wrld[0].right = [];
    //       av.anl.AnaChartFn();
    //       break;
    //     case 'popDish1':
    //       av.post.addUser('DnD: delete_from: popDish1?');
    //       av.anl.wrld[1].left = [];       //remove lines from population 2
    //       av.anl.wrld[1].right = [];
    //       av.anl.AnaChartFn();
    //       break;
    //     case 'popDish2':
    //       av.post.addUser('DnD: delete_from: popDish2?');
    //       av.anl.wrld[2].left = [];       //remove lines from population 3
    //       av.anl.wrld[2].right = [];
    //       av.anl.AnaChartFn();
    //       break;
    //   }
    // }

  });

  av.dnd.landpopDish2 = function(el, target, source) {

  };

  av.dnd.landpopDish1 = function(el, target, source) {

  };

  av.dnd.landpopDish0 = function(el, target, source) {

  };

  av.dnd.landAnlDndChart = function(el, target, source) {

  };

  av.dnd.landOrganCanvas2 = function(el, target, source) {

  };

  av.dnd.landActiveOrgan2 = function(el, target, source) {

  };
  
  av.dnd.landOrganIcon2 = function(el, target, source) {

  };

  av.dnd.landFzOrgan2 = function(el, target, source) {

  };

  av.dnd.landGridCanvas2 = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) console.log('inside gridCanvas dnd');
    if (av.debug.dnd) console.log('parents', av.parents);

    var nn = av.parents.name.length;
    av.post.addUser('DnD: ' + source.id + '--> GridCanvas: by: ' + el.textContent.trim() + ' on (' +  av.mouse.UpGridPos[0] + ', ' + av.mouse.UpGridPos[1] + ')' );

    // to correctly place the organism, need to calculate offsets
    var offsetXLocal = ($("#gridHolder").width() - av.dom.gridCanvas.width) / 2;
    var offsetYLocal = ($("#gridHolder").height() - av.dom.gridCanvas.height) / 2;
    var widthOfNav = parseInt($('#navColId').css('width'));
    var heightOfTop = parseInt($('#popTopRw').css('height')) + parseInt($('#headerMain').css('height'));
    var mouseX = av.mouse.UpGridPos[0] - av.grd.marginX - av.grd.xOffset - offsetXLocal - widthOfNav - 5; // yemi: hardcoded 5; works for now
    var mouseY = av.mouse.UpGridPos[1] - av.grd.marginY - av.grd.yOffset - offsetYLocal - heightOfTop - 5;
    if (av.debug.dnd) console.log('mouse.UpGridPosX, y', av.mouse.UpGridPos[0], av.mouse.UpGridPos[1]);
    if (av.debug.dnd) console.log('mouseX, y', mouseX, mouseY);
    av.parents.col[nn] = Math.floor(mouseX / av.grd.cellWd);
    av.parents.row[nn] = Math.floor(mouseY / av.grd.cellHt);
    //check to see if in the grid part of the canvas
    if (av.parents.col[nn] >= 0 && av.parents.col[nn] < av.grd.cols && av.parents.row[nn] >= 0 && av.parents.row[nn] < av.grd.rows) {
      av.parents.AvidaNdx[nn] = av.parents.row[nn] * av.grd.cols + av.parents.col[nn];

      //Start setting up for getting data for parents structure
      nn = av.parents.name.length;  // get index into parents
      var newName = av.dnd.nameParent(el.textContent.trim());

      //Add organism to av.dnd.ancestorBox in settings.
      var domid = el.id;
      var type = 'g';
      var dir = domid;
      var container = '#' + av.dnd.ancestorBox.id;

      $(container).append(`<div class="item ${type}" id="${domid}"> ${newName} </div>`);

      // Add an entry to containerMap
      if (Object.keys(containerMap).indexOf(container) === -1) {
        containerMap[container] = {};
      }

      if (Object.keys(containerMap[container]).indexOf(domid) === -1) {
        containerMap[container][domid] = {'name': newName , 'type': 'g'};
      } else {
        containerMap[container][domid].name = newName;
        containerMap[container][domid].type = 'g';
      }
      
      // var domid = av.dnd.insertNode(container, newName, type);
      if (av.debug.dnd) console.log('containerMap[#ancestorBox]', containerMap[container]);

      // Push the item to av.parents
      av.parents.domid.push(domid);

      //update parents structure
      av.parents.handNdx.push(nn);
      av.parents.howPlaced[nn] = 'hand';
      av.parents.injected[nn] = false;
      if (av.debug.dnd) console.log('av.dnd.landGridCanvas; domId', domid, '; av.fzr.genome', av.fzr.genome);
      var dir = av.fzr.dir[domid];
      av.parents.genome.push(av.fzr.file[dir+'/genome.seq']);
      //Find color of ancestor
      if (0 < av.parents.Colors.length) {av.parents.color.push(av.parents.Colors.pop());}
      else {av.parents.color.push(av.color.defaultParentColor);}
      //Re-Draw Grid - done in routine that calls this one.
    }
    else {
      // not on grid
      av.post.addUser('DnD: ' + source.id + '--> GridCanvas: by: ' + el.textContent.trim());
    }
    //In all cases remove the ancestor from the gridCanvas so we only keep them in the av.dnd.ancestorBox.
    $('#' + av.dnd.gridCanvas.id).empty();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    if (av.debug.dnd) console.log('parents', av.parents);
  };

  av.dnd.landFzWorld = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) console.log('landFzPopDish: fzr', av.fzr);

    // create a new dom id for the new object
    el.id = 'w' + av.fzr.wNum;
    var domid = el.id;
    // var domid;
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var oldName = el.textContent.trim() + '@' + av.grd.popStatsMsg.update.formatNum(0);
    var sName = av.dnd.namefzrItem(container, oldName);
    var worldName = prompt('Please name your populated dish', sName);
    if (worldName) {
      var nameWorld = av.dnd.getUniqueFzrName(container, worldName);
      if (nameWorld !== null) {
        av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent.trim() + ' --> ' + nameWorld);
        document.getElementById(domid).textContent = nameWorld;

        // Add an entry to containerMap
        if (Object.keys(containerMap[container]).indexOf(domid) === -1) {
          containerMap[container][domid] = {'name': nameWorld , 'type': 'w'};
        } else {
          containerMap[container][domid].name = nameWorld;
          containerMap[container][domid].type = 'w';
        }
        // domid = av.dnd.insertNode(container, nameWorld, 'w', el);
        // document.getElementById(domid).textContent = nameWorld;
        // console.log(containerMap);

        av.fzr.dir[domid] = 'w'+ av.fzr.wNum;
        av.fzr.domid['w'+ av.fzr.wNum] = domid;
        // av.fzr.dir[domid] = 'w' + (av.fzr.wNum - 1);
        // av.fzr.domid['w' + (av.fzr.wNum - 1)] = domid;

        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(container, domid, 'av.dnd.landFzWorldFn');
        av.fwt.makeFzrWorld(av.fzr.wNum, 'av.dnd.landFzWorldFn');
        av.msg.exportExpr('w' + av.fzr.wNum);
        // av.fwt.makeFzrWorld((av.fzr.wNum - 1), 'av.dnd.landFzWorldFn');
        // av.msg.exportExpr('w' + (av.fzr.wNum - 1));
        av.msg.sendData();

        av.fzr.saveUpdateState('no');
        av.fzr.wNum++;
      } else { //user cancelled so the item should NOT be added to the freezer.
        // do nothing
      }
    } else { //user cancelled so the item should NOT be added to the freezer.
      // do nothing
    }
  };

  av.dnd.landAncestorBox = function(el, target, source) {
    'use strict';
    el.id = 'g' + av.fzr.gNum;
    var domid = el.id;
    // var domid;
    var dir = domid;
    // var type = 'g';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;

    if (source !== av.dnd.ancestorBox) {

      //find genome by finding source
      av.parents.genome.push(av.fzr.file[dir + '/genome.seq']);
      var nn = av.parents.name.length;
      av.parents.autoNdx.push(nn);
      av.parents.injected.push(false);
      
      var newName = av.dnd.nameParent(el.textContent.trim());
      //Add organism to av.dnd.ancestorBox in settings.
      var type = 'g';
      var dir = domid;
      var container = '#' + av.dnd.ancestorBox.id;

      // Add a DOM object
      //$(container).append(`<div class="item ${type}" id="${domid}"> ${newName} </div>`);

      // Add an entry to containerMap
      if (Object.keys(containerMap).indexOf(container) === -1) {
        containerMap[container] = {};
      }

      if (Object.keys(containerMap[container]).indexOf(domid) === -1) {
        containerMap[container][domid] = {'name': newName , 'type': 'g'};
      } else {
        containerMap[container][domid].name = newName;
        containerMap[container][domid].type = 'g';
      }

      console.log(containerMap);
      // domid = av.dnd.insertNode(container, newName, type, el);

      av.parents.howPlaced.push('auto');
      av.parents.domid.push(domid); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();

      // unsure if this is supposed to happen; in the original, it doesn't
      // //load ancestors if present.
      // if (av.fzr.file[dir + '/ancestors.txt']) { // not triggering when '@ancestor'
      //   console.log('here');
      //   str = av.fzr.file[dir + '/ancestors.txt'];
      //   av.fio.autoAncestorLoad(str);
      // };
      // if (av.fzr.file[dir + '/ancestors_manual.txt']) {
      //   str = av.fzr.file[dir + '/ancestors_manual.txt'];
      //   av.fio.handAncestorLoad(str);
      // };

      av.fzr.gNum++;
      if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
      av.grd.drawGridSetupFn('av.dnd.landAncestorBox');

      return (true);
    }
    else { return (false); }
  }

  av.dnd.landAncestorBoTest = function(el, target, source) {
    'use strict';
    var added;
    var domid = el.id;
    var dir = domid;
    var type = 'g';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    
    //Do not copy parents if one is moved within Ancestor Box
    if ('ancestorBoTest' != move.source.node.id) {
      av.post.data = {
        'operation' : 'DojoDnd',
        'name' : 'av.dnd.landAncestorBoTest',
        //'vars' : {'source' : 'av.dnd.fzOrgan', 'nodeDir': move.dir, 'target': 'av.dnd.ancestorBoTest'},
        'vars' : {'source' : source.id, 'nodeDir': dir, 'target': target.id, 'call': 'dnd.landAncestorBoTest'},
        'assumptions' : {'nodeName': el.textContent.trim() , 'via': 'usr'}
      };
      av.post.usrOut(av.post.data, 'in dragulaDnd.js line 233');

      //find genome by finding source
      av.parents.genome.push(av.fzr.file[dir + '/genome.seq']);
      var nn = av.parents.name.length;
      av.parents.autoNdx.push(nn);
      av.parents.injected.push(false);
      
      var newName = av.dnd.nameParent(el.textContent.trim());
      document.getElementById(target.id).textContent = newName;
      //Add organism to av.dnd.ancestorBox in settings.
      // domid = av.dnd.insertNode(container, newName, type, el);

      av.parents.howPlaced.push('auto');
      av.parents.domid.push(move.targetDomId); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();
      
      // unsure if this is supposed to happen; in the original, it doesn't
      // //load ancestors if present.
      // if (av.fzr.file[dir + '/ancestors.txt']) { // not triggering when '@ancestor'
      //   console.log('here');
      //   str = av.fzr.file[dir + '/ancestors.txt'];
      //   av.fio.autoAncestorLoad(str);
      // };
      // if (av.fzr.file[dir + '/ancestors_manual.txt']) {
      //   str = av.fzr.file[dir + '/ancestors_manual.txt'];
      //   av.fio.handAncestorLoad(str);
      // };

      if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
      av.grd.drawGridSetupFn('av.dnd.landAncestorBox');

      return (true);
    }
    else { return (false); }
  }

  //when a configuration is added to the freezer
  av.dnd.landFzConfig = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) console.log('av.dnd.landFzConfig: fzr', av.fzr);

    // create a new dom id for the new object
    el.id = 'c' + av.fzr.cNum;
    var domid = el.id;
    // var domid;
    // var type = 'c';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var oldName = el.textContent.trim();
    var sName = av.dnd.namefzrItem(container, oldName);
    var configurationName = prompt('Please name your dish configuration', sName);
    if (configurationName) {
      var configName = av.dnd.getUniqueFzrName(container, configurationName);
      if (configName !== null) {
        document.getElementById(domid).textContent = configName;

        // Add an entry to containerMap
        if (Object.keys(containerMap[container]).indexOf(domid) === -1) {
          containerMap[container][domid] = {'name': configName , 'type': 'c'};
        } else {
          containerMap[container][domid].name = configName;
          containerMap[container][domid].type = 'c';
        }

        // domid = av.dnd.insertNode(container, configName, type, el);

        av.fzr.dir[domid] = 'c'+ av.fzr.cNum;
        av.fzr.domid['c'+ av.fzr.cNum] = domid;
        // av.fzr.dir[domid] = 'c'+ (av.fzr.cNum - 1);
        // av.fzr.domid['c'+ (av.fzr.cNum - 1)] = domid;
        av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = configName;
        av.fwt.makeFzrConfig(av.fzr.cNum,'av.dnd.landFzConfig');
        av.fzr.cNum++;
        // av.fwt.makeFzrConfig((av.fzr.cNum - 1),'av.dnd.landFzConfig');

        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(container, domid, 'av.dnd.landFzConfig');
        av.fzr.saveUpdateState('no');
        if (av.debug.dnd) console.log('dir', av.fzr.dir[domid], '; configName', configName );
      } else { //user cancelled so the item should NOT be added to the freezer.
        // do nothing
      }
    } else { //user cancelled so the item should NOT be added to the freezer.
      // do nothing
    }
  };

  // when a configured dish is added to the config box
  av.dnd.landActiveConfig = function (el, target, source) {
    'use strict';
    av.dnd.configFlag = 'normal';

    var ndx = -1;
    var klen = 0;
    var kk = 0;
    var str = '';

    var domid = el.id;
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    var target_container = target.id !== undefined ? "#" + target.id : "." + target.className;

    // remove the existing configuration
    $("#activeConfig").empty();
    if (Object.keys(containerMap).indexOf(target_container) !== -1) {
      delete containerMap[target_container];
    }
    // // empty the container map
    // containerMap[target_container] = {};
    $("#activeConfig").append(el);
    // Add an entry to containerMap
    if (Object.keys(containerMap).indexOf(target_container) === -1) {
      containerMap[target_container] = {};
    }

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
    av.frd.updateSetup('av.dnd.landActiveConfig');                  //call the avida-ED 3.0 style setup page
    av.msg.setupType = 'standard';

    $("#ancestorBox").empty();
    $("#ancestorBoTest").empty();

    av.parents.clearParentsFn();

    if (source === av.dnd.fzConfig || source === av.dnd.fzTdish) {
      containerMap[target_container][domid] = {"name": el.innerHTML.trim(), "type": "c"};
      av.fzr.actConfig.type = containerMap[container][domid].type;
      av.fzr.actConfig.file['events.cfg'] = ' ';

      //delete anyfiles in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      //load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        console.log('ancester auto');
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        console.log('ancestor hand');
        av.fio.handAncestorLoad(str);
      };

      //load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn('Yemi\'s Implementation of landTestConfig'); //draw grid
    }

    else if (source === av.dnd.fzWorld) {
      containerMap[target_container][domid] = {"name": el.innerHTML.trim(), "type": "w"};
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.landActiveConfig');

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
      containerMap[target_container][domid] = {"name": el.innerHTML.trim(), "type": "t"};
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.landActiveConfig');
    }

    av.parents.placeAncestors();
    //Load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    //send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn('av.dnd.landActiveConfig');
  };


  // when a test dish is added to the test config box
  av.dnd.landTestConfig = (el, target, source) => {
    'use strict';
    av.dnd.configFlag = 'normal';

    var domid = el.id;
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    var target_container = target.id !== undefined ? "#" + target.id : "." + target.className;

    // remove the existing configuration
    $("#testConfig").empty();
    // $("#activeConfig").empty();
    if (Object.keys(containerMap).indexOf(target_container) !== -1) {
      delete containerMap[target_container];
    }

    $("#testConfig").append(el);
    // Add an entry to containerMap
    if (Object.keys(containerMap).indexOf(target_container) === -1) {
      containerMap[target_container] = {};
    }
    // $("#activeConfig").append(el);
    containerMap[target_container][domid] = {"name": el.innerHTML, "type": "c"};

    av.fzr.actConfig.actDomid = domid;
    av.fzr.actConfig.name = document.getElementById(domid).textContent;
    av.fzr.actConfig.fzDomid = domid;
    av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.fzDomid];
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }

    $("#ancestorBox").empty();
    $("#ancestorBoTest").empty();

    av.parents.clearParentsFn();

    if (source === av.dnd.fzConfig || source === av.dnd.fzTdish) {
      av.fzr.actConfig.type = containerMap[container][domid].type;
      av.fzr.actConfig.file['events.cfg'] = ' ';

      //delete anyfiles in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      //load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        var str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        var str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        av.fio.handAncestorLoad(str);
      };

      //load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn('Yemi\'s Implementation of landTestConfig'); //draw grid

      av.parents.placeAncestors();
    }

    if (source === av.dnd.fzWorld) {
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.landActiveConfig');
    } else {
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.landActiveConfig');
    }

    //Load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    //send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn('av.dnd.landTestConfig');
  };


  // When item is added to the trash can
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
    else {
      // if it's none of the above, undo the delete by appending the element back to the source
      source.append(el);
    }

    // empty the trashCan of all children elements except for the trashCan image
    for (var i = 0; i < $('#trashCan')[0].children.length; i++) {
      if ($('#trashCan')[0].children[i].id !== 'trashCanImage') {
        $('#trashCan')[0].children[i].remove();
      }
    }
    
    if ('' !== remove.type) {
      remove.dir = av.fzr.dir[remove.domid];
      av.fwt.removeFzrItem(remove.dir, remove.type);
    }

    return remove;
  };

  av.dnd.loadDefaultConfigFn = function (from) {
    el = $.map($("#c0"), (value, key) => { return value })[0];
    console.log(el);
    av.dnd.landActiveConfig(el, activeConfig, fzConfig);
  };

  // yemi's implementation of av.dnd.contextMenu
  av.dnd.contextMenu = function(container, fzItemID, from) {
    // example 'target' input format: '.className' or '#id'
    'use strict';
    // console.log(from, 'called av.dnd.contextMenu; fzItemID=', fzItemID, '; container=', container);
    var dir = '';
    if (av.debug.dnd) console.log('contextMenu; target.id =',container);
    if (av.debug.dnd) console.log('contextMenu; fzItemID=',fzItemID, ' container=', container);
    if (av.debug.dnd) console.log('contextMenu: fzr', av.fzr);

    // should I not use digit here?
    console.log(containerMap);
    console.log(fzItemID);
    var aMenu = new dijit.Menu({targetNodeIds: [fzItemID]});
    aMenu.addChild(new dijit.MenuItem({
      label: 'Rename',
      onClick: function () {
        av.post.addUser('Button: Rename:' + document.getElementById(fzItemID).textContent);
        var fzName = prompt('Please rename freezer item', document.getElementById(fzItemID).textContent);
        if (fzName) {
          fzName = av.dnd.getUniqueFzrName(container, fzName);
          if (null != fzName) {
            document.getElementById(fzItemID).innerHTML = fzName;
            document.getElementById(fzItemID).data = fzName;
            containerMap[container][fzItemID].name = fzName;
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
          var itemName = $(fzItemID).textContent.trim();
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
          if ('fzOrgan' == container) {
            av.fwt.removeFzrItem(dir, 'g');
          } else if ('fzConfig' == container){
            av.fwt.removeFzrItem(dir, 'c');
          } else if ('fzWorld' == container){
            av.fwt.removeFzrItem(dir, 'w');
          }

          document.querySelector(container).removeChild(document.getElementById(fzItemID));
          delete containerMap[container][fzItemID];

          av.fzr.saveUpdateState('no');
          //need to remove from fzr and pouchDB
        }
      }
    }));
  };

  /*
  av.dnd.inserNode
  */
  
  av.dnd.insertNode = function(container, name, type, el = '', fileNum = -1) {
    var domid = '';
    switch (type) {
      case 'g':
        domid = 'g' + av.fzr.gNum++;
        break;

      case 'w':
        domid = 'w' + av.fzr.wNum++;
        break;
      
      case 't':
        domid = 't' + av.fzr.tNum++;
        break;
      
      case 'c':
        domid = 'c' + av.fzr.cNum++;
        break;
    }

    // if the element was dragged into the container, creating a dom object already
    if (el !== '') {
      el.id = domid;
      el.innerHTML = name;
      el.class = `item ${type}`;
      console.log(el);
    }
    // if the element is being added during the fileDataRead stage,
    else {
      if (fileNum >= 0) {
        domid = `${type}${fileNum}`;
      }
      $(container).append(`<div class="item ${type}" id="${domid}"> ${name} </div>`);
    }

    // Add an entry to containerMap
    if (Object.keys(containerMap).indexOf(container) === -1) {
      containerMap[container] = {};
    }
    containerMap[container][domid] = {'name': name , 'type': type};

    return domid;
  };

  /* 
  Helpers for Naming Things 
  */

  // used when anything is dragged into the freezer and it must be named
  av.dnd.getUniqueFzrName = function(container, name) {
    'use strict';
    var unique = true;
    var suggestName;
    var namelist = $.map(document.querySelector(container).children, (x) => {return x.textContent.trim()});
    console.log(namelist);
    console.log(name);
    console.log(namelist.indexOf(name));
    while (unique) {
      unique = false;
      if (0 <= namelist.indexOf(name)) {
        console.log("trie");
        suggestName = av.dnd.namefzrItem(container, name);
        name = prompt('Please give your item a unique name ', suggestName);
        unique = true;
      }
    }
    return name;
  };

  // used to name an item that's being introduced to the freezer
  av.dnd.namefzrItem = function(container, name) {
    'use strict';
    var namelist = $.map(document.querySelector(container).children, (x) => {return x.textContent.trim()});
    console.log(namelist);
    console.log(name);
    console.log(namelist.indexOf(name));
    var theName;
    //look for name in freezer section
    if (0 <= namelist.indexOf(name)) {
      console.log("there's a dupe");
      theName = av.dnd.nameNfrzItem(namelist, name, 0);
    } else { theName = name; }

    return theName;
  };

  // helper function for namefzrItem
  av.dnd.nameNfrzItem = function (namelist, name, number) {
    var num = number + 1;
    var aName = name + '_' + num.formatNum(0);
    var newName;
    if (0 <= namelist.indexOf(aName)) {
      newName = av.dnd.nameNfrzItem(namelist, name, num);
    }
    else { newName = aName; }
    return newName;
  };

  av.dnd.nameNparent = function (name, number) {
    var num = number + 1;
    var aName = name + '-' + num.formatNum(0);
    var newName;
    if (0 <= av.parents.name.indexOf(aName)) {
      newName = av.dnd.nameNparent(name, num);
      //console.log('aName', aName, '; num', num, 'newName', newName);
    }
    else { newName = aName; }
    return newName;
  };

  av.dnd.nameParent = function(name) {
    'use strict';
    var theName;
    //look for name in parent
    if (0 <= av.parents.name.indexOf(name)) {
      theName = av.dnd.nameNparent(name, 1);
    }
    else { theName = name; }
    //console.log('name', theName);
    av.parents.name.push(theName);
    return theName;
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
