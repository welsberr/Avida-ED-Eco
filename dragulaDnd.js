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
                    $.map($("#ancestorBoTest"), (value, key) => { return value }),
                    $.map($("#activeOrgan"), (value, key) => { return value }),
                    $.map($("#organCanvas"), (value, key) => { return value }),
                    $.map($("#organIcon"), (value, key) => { return value }),
                    $.map($("#anlDndChart"), (value, key) => { return value }),
                    $.map($("#popDish0"), (value, key) => { return value }),
                    $.map($("#popDish1"), (value, key) => { return value }),
                    $.map($("#popDish2"), (value, key) => { return value }),
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
  av.dnd.activeOrgan = containers[10]
  av.dnd.organCanvas = containers[11]
  av.dnd.organIcon = containers[12]
  av.dnd.anlDndChart = containers[13]
  av.dnd.popDish0 = containers[14]
  av.dnd.popDish1 = containers[15]
  av.dnd.popDish2 = containers[16]

  // yemd: variables necessary to make landGridCanvas work (because dragula and regular JavaScript mouseevents are not compatible)
  var dragging = false;
  var sourceIsFzOrgan = false;
  var elForGrid = '';

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
      if ((source === av.dnd.ancestorBox) && (target === av.dnd.organIcon || target === av.dnd.gridCanvas)) {
        return true;
      }
      if (source === av.dnd.activeConfig && (target === av.dnd.fzConfig || target === av.dnd.fzWorld)) {
        return true;
      }
      if (source === av.dnd.activeOrgan && (target === av.dnd.fzOrgan)) {
        return true;
      }
      if ((source === av.dnd.fzConfig || source === av.dnd.fzWorld) && target === av.dnd.activeConfig) {
        return true;
      }
      if (source === av.dnd.fzWorld && (target === av.dnd.anlDndChart || target === av.dnd.popDish0 || target === av.dnd.popDish1 || target === av.dnd.popDish2)) {
        return true;
      }
      if (source === av.dnd.fzOrgan && (target === av.dnd.activeOrgan || target === av.dnd.organCanvas || target === av.dnd.organIcon || target === av.dnd.gridCanvas || target === av.dnd.ancestorBox || target === av.dnd.ancestorBoTest)) {
        return true;
      }
      if (source === av.dnd.fzTdish && target === av.dnd.testConfig) {
        return true;
      } 
      if (target === av.dnd.trashCan) {
        return true;
      }
      else {
        // el.style.cursor = 'not-allowed'; // not working yet 
        return false;
      }
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    copy: function (el, source) {
      //Makes sure the only item that will be copied instead of moved is in the FreezerMove div
      return source === av.dnd.activeOrgan || source === av.dnd.activeConfig || source === av.dnd.fzConfig || source === av.dnd.fzOrgan || source === av.dnd.fzWorld || source === av.dnd.fzTdish;
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped                       
    copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: true,               // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });

  dra.on('drag', (el, source) => { 
    // el.style.background = 'rgb(189, 229, 245)';
    el.style.cursor =  'default';
    console.log("dragging");
    dragging = true;
    //When mouse button is released, return cursor to default values
    if (source === av.dnd.fzOrgan) { // necessary because for some reason inside mouse events, dra 'source' and 'target' are messed up
      sourceIsFzOrgan = true;
    } else sourceIsFzOrgan = false;

    elForGrid = el;
  });

  // main function that determines the logic for drag and drop
  dra.on('drop', (el, target, source) => {

    // el, target, source are dom objects aka stuff you could 'target.id' to
    if ((target === av.dnd.activeConfig || target === av.dnd.ancestorBox) && av.grd.runState === 'started') {
      av.dom.newDishModalID.style.display = 'block'; // show the 'please save' modal
      dra.cancel(); // cancel the drag event
    } else if (target === av.dnd.activeConfig) {
      av.dnd.landActiveConfig(el, target, source);
    }

    if (target === av.dnd.testConfig || target === av.dnd.ancestorBoTest && av.grd.runState === 'started') {
      av.dom.newDishModalID.style.display = 'block';
      dra.cancel();
    } else if (target === av.dnd.testConfig) {
      av.dnd.landTestConfig(el, target, source);
    }

    if (target === av.dnd.trashCan) {
      // yemi: however, if the drag is being initiated from the gridCanvas aka, then the event handler is in mouse.js
      // refer to av.mouse.ParentMouse or av.mouse.KidMouse
      av.dnd.landTrashCan(el, source);
    }
    
    if (target === av.dnd.fzConfig) {
      av.dnd.landFzConfig(el, target, source);
    }

    if (target === av.dnd.ancestorBox) {
      av.dnd.landAncestorBox(el, target, source);
    }

    if (target === av.dnd.ancestorBoTest) {
      av.dnd.landAncestorBoTest(el, target, source);
    }

    if (target === av.dnd.fzWorld) {
      // yemi: does not trigger because techinically there are no 'items' on the grid right now.
      // on the grid, mouse movements overtake. Code for that is in mouse.js (av.mouse.kidMouse)
      av.dnd.landFzWorld(el, target, source);
    }

    if (target === av.dnd.fzOrgan) {
      av.dnd.landFzOrgan(el, target, source); // I don't think it's getting called
    }

    if (target === av.dnd.organIcon) {
      av.dnd.landOrganIcon(el, target, source);
    }

    $(document).on('mouseup touchend', function (evt) {
      'use strict';
      if (dragging) {
        var x;
        var y;
        if(evt.type == 'touchend'){
          var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
          x = touch.pageX;
          y = touch.pageY;
        } else if (evt.type == 'mouseup') {
          x = evt.clientX;
          y = evt.clientY;
        }
        av.mouse.UpGridPos = [x, y];
        var elements = $.map(document.elementsFromPoint(x, y), (x) => {return x.id});
        if (elements.indexOf("gridCanvas") != -1 && sourceIsFzOrgan) { // if gridCanvas is behind this mouse point
          av.dnd.landGridCanvas(elForGrid, av.dnd.gridCanvas, source);
          av.grd.drawGridSetupFn('av.dnd.gridCanvas where target = gridCanvas');
        }
      }
      dragging = false;
      $(document).unbind('mousemove touchmove');
    });

    if (target === av.dnd.activeOrgan) {
      av.dnd.landActiveOrgan(el, target, source);
    }

    if (target === av.dnd.organCanvas) {
      av.dnd.landOrganCanvas(el, target, source);
    }

    if (target === av.dnd.anlDndChart) {
      av.dnd.landAnlDndChart(el, target, source);
    }

    if (target === av.dnd.popDish0 || target === av.dnd.popDish1 || target === av.dnd.popDish2) {
      if (target === av.dnd.popDish0) {
        av.dnd.landpopDish(el, target, source, 0);
      }
      else if (target === av.dnd.popDish1) {
        av.dnd.landpopDish(el, target, source, 1);
      }
      else if (target === av.dnd.popDish2) {
        av.dnd.landpopDish(el, target, source, 2);
      }
    } 
  });

  var selectedId = '';
    $(document).on('click', function(e) {
      var classList = e.target.className.split(" "); // yemd: e.target.className is a string
      if (selectedId !== '' && e.target.id === selectedId) {
        $('#' + e.target.id).css('background', 'inherit');
        selectedId = '';
      } 
      else if (selectedId === '' && classList.indexOf('item') != -1) { // yemd: if the target is of class 'item' (aka draggable item)
        $('#' + e.target.id).css('background', 'rgb(189, 229, 245)');
        selectedId = e.target.id;
      }
      else if (selectedId != '' && classList.indexOf('item') != -1) { // if something is selected already and user selects another one
        $('#' + selectedId).css('background', 'inherit');
        $('#' + e.target.id).css('background', 'rgb(189, 229, 245)');
        selectedId = e.target.id;
      }
    });

  av.dnd.FzAddExperimentFn = function (source, target, type) {
    if (undefined != selectedId) {
      var el = $.map($('#' + selectedId), (value, key) => { return value })[0].cloneNode(true);
      var fzSection = source.id;
      var targetId = target.id;
      console.log('fzSection=', fzSection, '; target=', target, '; selectedId=', selectedId, '; type=', type);
      var addedPopPage = false;
      var addedAnaPage = false;
      // av.dnd.insert(target, el, type);
      if ('fzOrgan' == fzSection && 'ancestorBox' == targetId) { addedPopPage = av.dnd.landAncestorBox(el, target, source); }
      else if ('fzOrgan' == fzSection && 'activeOrgan' == targetId) { addedPopPage = av.dnd.landActiveOrgan(el, target, source); }
      else if (('fzConfig' == fzSection || 'fzWorld' == fzSection) && 'activeConfig' == targetId) { 
        addedPopPage = av.dnd.landActiveConfig(el, target, source);
      }
      else if ('anlDndChart' == targetId && 'fzWorld' == fzSection) addedAnaPage = av.dnd.landAnlDndChart(el, target, source);
  
      if (addedPopPage) av.grd.drawGridSetupFn('av.dnd.FzAddExperimentFn');
    }
    else {
      switch(fzSection) {
        case 'fzConfig':
          alert('You must select a configurated dish first');
          break;
        case 'fzOrgan':
          alert('You must select an organism first');
          break;
        case 'fzWorld':
          alert('You must select a populated dish first');
          break;
      }
    }

    // yemd: reset the selectedId
    $('#' + selectedId).css('background', 'inherit');
    selectedId = '';
  };

  av.dnd.landpopDish = function(el, target, source, num) {
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent.trim());
    var items = av.dnd.getAllItems(target);

    //if there is an existing item, need to clear all nodes and assign most recent to item 0
    //clear out the old data
    av.dnd.empty(target);
    //get the data for the new organism
    av.dnd.insert(target, el, 'w');
    av.dnd.insertToDOM(target, el);
  
    var fzdomid = el.id;
    var dir = av.fzr.dir[fzdomid];
    av.anl.loadWorldData(num, dir);
    av.anl.loadSelectedData(num, 'yLeftSelect', 'left', 'av.dnd.landpopDish');
    av.anl.loadSelectedData(num, 'yRightSelect', 'right', 'av.dnd.landpopDish');
    av.anl.AnaChartFn();
  }

  av.dnd.putNslot = function (el, num, source) {
    'use strict';
    //the console.log get the data one way, the codes gets the same data another way. 
    // console.log('sourceContainer=', source.parent.id, '; world domID=', source.anchor.id, '; world Name=', source.anchor.textContent.trim());
    var domid = el.id;
    var dir = av.fzr.dir[domid];
    av.dnd.insert(source, el, 'w');

    av.anl.loadWorldData(num, dir);
    av.anl.loadSelectedData(num, 'yLeftSelect', 'left', 'av.dnd.putNslot');
    av.anl.loadSelectedData(num, 'yRightSelect', 'right', 'av.dnd.putNslot');
  };

  av.dnd.landAnlDndChart = function(el, target, source) {
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    var items = av.dnd.getAllItems(av.dnd.popDish0);
    el = el.cloneNode(true);
    if (0 === items.length) { av.dnd.putNslot(el, 0, av.dnd.popDish0); }
    else {
      items = av.dnd.getAllItems(av.dnd.popDish1);
      if (0 === items.length) { av.dnd.putNslot(el, 1, av.dnd.popDish1); }
      else {
        items = av.dnd.getAllItems(av.dnd.popDish2);
        if (0 === items.length) { av.dnd.putNslot(el, 2, av.dnd.popDish2);}
      }
    }
    //in all cases no population name is stored in the graph div
    av.dnd.empty(target);
    av.dnd.insert(av.dnd.popDish0, el, 'w')
    av.dnd.insertToDOM(av.dnd.popDish0, el);
    av.anl.AnaChartFn();
  };

  av.dnd.landOrganCanvas = function(el, target, source) {
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    el = el.cloneNode(true);
    av.dnd.landActiveOrgan(el, target, source);
  };

  av.dnd.landActiveOrgan = function(el, target, source) {
    // Need to have only the most recent dropped organism in av.dnd.activeOrgan. Do this by deleting everything in activeOrgan
    //and reinserting the most resent one after a drop event.
    'use strict';
    console.log('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    //clear out the old data if an organism is already there
    av.dnd.empty(av.dnd.activeOrgan);
    // append the new organism
    av.dnd.insertToDOM(av.dnd.activeOrgan, el);
    // Add an entry to containerMap
    av.dnd.insert(av.dnd.activeOrgan, el, 'g');
    av.fzr.actOrgan.actDomid = el.id;
    av.dnd.updateFromFzrOrganism(el);
    av.msg.doOrgTrace();
  };
  
  av.dnd.landOrganIcon = function(el, target, source) {
    //clear out the old data if an organism is already there
    'use strict'
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    if (av.debug.dnd) console.log('source', source.id);

    // remove the existing configuration
    av.dnd.empty(av.dnd.activeOrgan);
    // append the new organism
    av.dnd.insertToDOM(av.dnd.activeOrgan, el);
    // Add an entry to containerMap
    av.dnd.insert(av.dnd.activeOrgan, el, 'g');
    av.fzr.actOrgan.actDomid = el.id;

    if ('fzOrgan' === source.id) { 
      av.dnd.updateFromFzrOrganism(el); 
    }
    
    if (source === av.dnd.ancestorBox) {
      var Ndx = av.parents.domid.indexOf(el.id);
      av.fzr.actOrgan.name = av.parents.name[Ndx];
      av.fzr.actOrgan.genome = av.parents.genome[Ndx];
      if (av.debug.dnd) console.log('fzr', av.fzr, '; parents', av.parents, '; ndx', Ndx);
    }

    //Change to Organism Page
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mouseup_organIcon_parent');
    av.ui.adjustOrgInstructionTextAreaSize();
    if (av.debug.mouse)
      console.log('from parent', av.parent, '; fzr', av.fzr);
    av.post.addUser('Dragged item to Organism Icon');
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.

    //clear out av.dnd.organIcon as nothing is stored there - just moved on to OrganismCurrent
    av.dnd.empty(target); //clear items from icon
  };

  av.dnd.updateFromFzrOrganism = function (el) {
    'use strict';
    var domId = el.id;
    var dir = av.fzr.dir[domId];
    if (av.debug.dnd) console.log('domId', domId, '; dir', dir);
    av.fzr.actOrgan.name = av.fzr.file[dir+'/entryname.txt'];
    av.fzr.actOrgan.genome = av.fzr.file[dir+'/genome.seq'];
    if (av.debug.dnd) console.log('domId', domId);
    if (av.debug.dnd) console.log('domId', domId, '; dir', dir, '; name', av.fzr.actOrgan.name, '; genome', av.fzr.actOrgan.genome);
    if (av.debug.dnd) console.log('fzr', av.fzr);
  
    if (av.debug.dnd) console.log('av.fzr.actOrgan', av.fzr.actOrgan);
  };

  av.dnd.landFzOrgan = function(el, target, source) {
    var gen;
    var domid = el.id;
    var oldName = el.textContent.trim();
    var sName = av.dnd.namefzrItem(target, oldName);
    var avidian = prompt('Please name your avidian', sName);
    var type = 'g';
    if (avidian) {
      var avName = av.dnd.getUniqueFzrName(target, avidian);
      if (null != avName) { //give dom item new avName name
        av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent + '; --> ' + avName);
        document.getElementById(domid).textContent = avName;
         // Add an entry to containerMap
        av.dnd.insert(target, el, type);
        if (source === av.dnd.ancestorBox) { //do not remove if population has started running
          //update structure to hold freezer data for Organisms.
          var Ndx = av.parents.domid.indexOf(domid); //Find index into parent structure
          gen = av.parents.genome[Ndx];

          if (true) { // because av.dnd.ancestorBox is always not copyOnly in the new framework
            av.parents.removeParent(Ndx);
            av.parents.placeAncestors();
            // need to remove organism from the Ancestor Box.
            // av.dnd.ancestorBox is dojo dnd copyonly to prevent loss of that organsim when the user clicks cancel. The user will
            // see the cancel as cancelling the dnd rather than canceling the rename.
            av.dnd.remove(av.dnd.ancestorBox, el);
          }
        }
        else if (source === av.dnd.activeOrgan) { console.log('bells'); gen = av.fzr.actOrgan.genome; }
        av.fzr.dir[domid] = 'g' + av.fzr.gNum;
        av.fzr.domid['g' + av.fzr.gNum] = domid;
        av.fzr.file['g' + av.fzr.gNum + '/genome.seq'] = gen;
        av.fzr.file['g' + av.fzr.gNum + '/entryname.txt'] = avName;
        av.fzr.gNum++;
        if (av.debug.dnd) console.log('fzr', av.fzr);

        if (av.debug.dnd) console.log('fzOrgan', av.dnd.fzOrgan);
        //create a right av.mouse-click context menu for the item just created.
        if (av.debug.dnd) console.log('before context menu: target',target, '; domId', domid );
        av.dnd.contextMenu(target, domid, 'av.dnd.landFzOrgan');
        av.fzr.saveUpdateState('no');
      }
      else { //Not given a name, so it should NOT be added to the freezer.
        // do not do anything
      }
    }
    else { //cancelled so the item should NOT be added to the freezer.
      // do not do anything
    }
    if (av.debug.dnd) console.log('near end of av.dnd.landFzOrgan');
    if (source != av.dnd.ancestorBox) {
      if (av.debug.dnd) console.log('dojo dnd to Organ Freezer, not from Ancestor Box');
    }
    if (av.debug.dnd) console.log('End of av.dnd.landFzOrgan');
  };

  av.dnd.landGridCanvas = function(el, target, source) {
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
      el = el.cloneNode(true);
      //Start setting up for getting data for parents structure
      nn = av.parents.name.length;  // get index into parents
      el.textContent = av.dnd.nameParent(el.textContent.trim());
      //Add organism to av.dnd.ancestorBox in settings.
      var domid = el.id;
      var dir = domid;
      console.log(el);
      av.dnd.insert(av.dnd.ancestorBox, el, 'g');
      av.dnd.insertToDOM(av.dnd.ancestorBox, el);

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
    av.dnd.empty(av.dnd.gridCanvas);  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    if (av.debug.dnd) console.log('parents', av.parents);
  };

  av.dnd.landFzWorld = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) console.log('landFzPopDish: fzr', av.fzr);

    // create a new dom id for the new object
    el.id = 'w' + av.fzr.wNum;
    var domid = el.id;
    var oldName = el.textContent.trim() + '@' + av.grd.popStatsMsg.update.formatNum(0);
    var sName = av.dnd.namefzrItem(target, oldName);
    var worldName = prompt('Please name your populated dish', sName);
    if (worldName) {
      var nameWorld = av.dnd.getUniqueFzrName(target, worldName);
      if (nameWorld !== null) {
        av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent.trim() + ' --> ' + nameWorld);
        el.textContent = nameWorld;

        // Add an entry to containerMap
        av.dnd.insert(target, el, 'w');

        av.fzr.dir[domid] = 'w'+ av.fzr.wNum;
        av.fzr.domid['w'+ av.fzr.wNum] = domid;
        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(target, domid, 'av.dnd.landFzWorldFn');
        av.fwt.makeFzrWorld(av.fzr.wNum, 'av.dnd.landFzWorldFn');
        av.msg.exportExpr('w' + av.fzr.wNum);
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
    var domid = el.id;
    var dir = domid;

    if (source !== av.dnd.ancestorBox) {
      //find genome by finding source
      av.parents.genome.push(av.fzr.file[dir + '/genome.seq']);
      var nn = av.parents.name.length;
      av.parents.autoNdx.push(nn);
      av.parents.injected.push(false);
      
      //rename the item with a new name
      var newName = av.dnd.nameParent(el.textContent.trim());
      el.textContent = newName;
      //Add organism to av.dnd.ancestorBox in settings.
      var dir = domid;
      // Add an entry to containerMap
      av.dnd.insert(target, el, 'g');

      av.parents.howPlaced.push('auto');
      av.parents.domid.push(domid); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();

      if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
      av.grd.drawGridSetupFn('av.dnd.landAncestorBox');

      // if the element has not been added yet to target because it has been moved from outside the dragula framework, manually add them
      var childDomIds = $.map(document.querySelector('#' + target.id).children, (x) => { if (!x.classList.contains('gu-transit')) return x.id});
      if (childDomIds.indexOf(el.id) === -1) {
        target.append(el);
      }

      return (true);
    }
    else { return (false); }
  }

  av.dnd.landAncestorBoTest = function(el, target, source) {
    'use strict';
    var domid = el.id;
    var dir = domid;
    
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
      
      //rename the item with a new name
      var newName = av.dnd.nameParent(el.textContent.trim());
      el.textContent = newName;
      //Add organism to av.dnd.ancestorBox in settings.
      var dir = domid;
      // Add an entry to containerMap
      av.dnd.insert(target, el, 'g');

      av.parents.howPlaced.push('auto');
      av.parents.domid.push(domid); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();

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
    var oldName = el.textContent.trim();
    var sName = av.dnd.namefzrItem(target, oldName);
    var configurationName = prompt('Please name your dish configuration', sName);
    if (configurationName) {
      var configName = av.dnd.getUniqueFzrName(target, configurationName);
      if (configName !== null) {
        el.textContent = configName;

        // Add an entry to containerMap
        av.dnd.insert(target, el, 'c');

        av.fzr.dir[domid] = 'c'+ av.fzr.cNum;
        av.fzr.domid['c'+ av.fzr.cNum] = domid;
        av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = configName;
        av.fwt.makeFzrConfig(av.fzr.cNum,'av.dnd.landFzConfig');
        av.fzr.cNum++;

        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(target, domid, 'av.dnd.landFzConfig');
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

    // remove the existing configuration
    av.dnd.empty(target);
    av.dnd.insertToDOM(target, el);

    av.fzr.actConfig.actDomid = domid;
    av.fzr.actConfig.name = el.textContent;
    av.fzr.actConfig.fzDomid = source.id;
    av.fzr.actConfig.dir = av.fzr.dir[av.fzr.actConfig.actDomid];
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }

    //The types are reassigned to indicate that they might be the populated form of the dishes.
    av.frd.updateSetup('av.dnd.landActiveConfig');                  //call the avida-ED 3.0 style setup page
    av.msg.setupType = 'standard';

    av.dnd.empty(av.dnd.ancestorBoTest);
    av.dnd.empty(av.dnd.ancestorBox);
    av.parents.clearParentsFn();

    if (source === av.dnd.fzConfig || source === av.dnd.fzTdish) {
      av.dnd.insert(target, el, 'c');
      av.fzr.actConfig.type = 'c';
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

      av.grd.drawGridSetupFn('Yemi\'s Implementation of landTestConfig'); //draw grid
    }

    else if (source === av.dnd.fzWorld) {
      av.dnd.insert(target, el, 'w');
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
      av.dnd.insert(target, el, 't');
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
    av.dnd.configFlag = 'test';
    av.dnd.landActiveConfig(el, target, source);
  };

  // When item is added to the trash can
  av.dnd.landTrashCan = function (el, source) {
    'use strict';
    var remove = {};
    remove.type = '';
    remove.domid = '';
    if (av.debug.dnd) console.log('in av.dnd.landTrashCan');
    
    //if the item is from the freezer, delete from freezer unless it is original stock (@)
    if (av.dnd.fzOrgan === source && '@ancestor' !== el.textContent.trim()) {
      if (av.debug.dnd) {console.log('fzOrgan->trash', av.fzr.genome);}
      remove.domid = el.id;
      remove.type = 'g';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      av.dnd.remove(source, el);
      // maybe have a pop up saying 'it was successfully deleted?
      av.fzr.saveUpdateState('no');
    }
    else if (av.dnd.fzConfig === source && '@default' !== el.textContent.trim()) {
      remove.domid = el.id;
      remove.type = 'g';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      av.dnd.remove(source, el);
      av.fzr.saveUpdateState('no');
    }
    else if (av.dnd.fzWorld === source && '@example' !== el.textContent.trim()) {
      remove.domid = el.id;
      remove.type = 'w';
      el.remove();       //http://stackoverflow.com/questions/1812148/dojo-dnd-move-node-programmatically
      av.dnd.remove(source, el);
      av.fzr.saveUpdateState('no');
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
    av.dnd.landActiveConfig(el, av.dnd.activeConfig, av.dnd.fzConfig);
  };

  // yemi's implementation of av.dnd.contextMenu
  av.dnd.contextMenu = function(target, fzItemID, from) {
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var dir = '';
    if (av.debug.dnd) console.log('contextMenu; target.id =',container);
    if (av.debug.dnd) console.log('contextMenu; fzItemID=',fzItemID, ' container=', container);
    if (av.debug.dnd) console.log('contextMenu: fzr', av.fzr);

    var aMenu = new dijit.Menu({targetNodeIds: [fzItemID]});
    aMenu.addChild(new dijit.MenuItem({
      label: 'Rename',
      onClick: function () {
        av.post.addUser('Button: Rename:' + document.getElementById(fzItemID).textContent);
        var fzName = prompt('Please rename freezer item', document.getElementById(fzItemID).textContent);
        if (fzName) {
          fzName = av.dnd.getUniqueFzrName(target, fzName);
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
          console.log(container);
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
  Helpers for Inserting and Removing Items from Dragula Containers
  */

  av.dnd.empty = function(target) {
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    $(container).empty();
    if (Object.keys(containerMap).indexOf(container) != -1) {
      containerMap[container] = {}
    }
  }

  av.dnd.remove = function(target, el) {
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    $(container).remove(el);
    document.querySelector(container).removeChild(document.getElementById(el.id));
    delete containerMap[container][el.id];
  }

  av.dnd.insert = function(target, el, type) {
    var domid = el.id;
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    if (Object.keys(containerMap).indexOf(container) === -1) {
      containerMap[container] = {}
    }
    console.log(el);
    console.log($(el));
    containerMap[container][domid] = {'name': el.textContent.trim() , 'type': type};
  }

  av.dnd.insertToDOM = function(target, el) {
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    console.log($(container));
    $(container).append(el.cloneNode(true));
  }

  av.dnd.getAllItems = function (source) {
    'use strict';
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    try {
      var items = Object.keys(containerMap[container]);
    } catch (error) {
      var items = [];
    }
    return items;
  };

  /* 
  Helpers for Naming Things 
  */

  // used when anything is dragged into the freezer and it must be named
  av.dnd.getUniqueFzrName = function(target, name) {
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var unique = true;
    var suggestName;
    var namelist = $.map(document.querySelector(container).children, (x) => { if (!x.classList.contains('gu-transit')) return x.textContent.trim()});
    while (unique) {
      unique = false;
      if (0 <= namelist.indexOf(name)) {
        suggestName = av.dnd.namefzrItem(target, name);
        name = prompt('Please give your item a unique name ', suggestName);
        unique = true;
      }
    }
    return name;
  };

  // used to name an item that's being introduced to the freezer
  av.dnd.namefzrItem = function(target, name) {
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var namelist = $.map(document.querySelector(container).children, (x) => { if (!x.classList.contains('gu-transit')) return x.textContent.trim()});
    var theName;
    //look for name in freezer section
    if (0 <= namelist.indexOf(name)) {
      console.log(namelist, name);
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
    }
    else { newName = aName; }
    return newName;
  };

  av.dnd.nameParent = function(name) {
    'use strict';
    var theName;
    //look for name in parent
    if (0 <= av.parents.name.indexOf(name)) {
      theName = av.dnd.nameNparent(name, 0);
    }
    else { theName = name;}
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
