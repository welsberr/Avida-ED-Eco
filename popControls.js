// *********************************************************************************************************************
//                                       Population page script
// *********************************************************************************************************************
// ptd = PeTri Dish
var av = av || {};  //incase av already exists
var dojo = dojo || {};  //incase av already exists
var dijit = dijit || {};  //incase av already exists

av.ptd.makePauseState = function () {
  dijit.byId('mnCnPause').attr('disabled', true);
  dijit.byId('mnCnRun').attr('disabled', false);
  dijit.byId('mnCnOne').attr('disabled', false);
  //console.log('pauseState; button=run');
  av.dom.runStopButton.textContent = 'Run';
  av.dom.oneUpdateButton.disabled = false;
};

av.ptd.makeRunState = function (from) {
  //console.log(from, ' called av.ptd.makeRunState');
  av.dom.runStopButton.textContent = 'Pause';
  dijit.byId('mnCnPause').attr('disabled', false);
  dijit.byId('mnCnRun').attr('disabled', true);
  dijit.byId('mnCnOne').attr('disabled', true);
  av.dom.oneUpdateButton.disabled = true;
};

av.ptd.popWorldStateUi = function (from) {
  'use strict';
  console.log(from, 'called av.ptd.popWorldStateUi');
  av.grd.runState = 'world';
  //Disable some of the options on the Setup page
  //av.dnd.ancestorBox.isSource = false;
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.ancestorBoTest.copyOnly = true;
  av.dnd.activeConfig.isSource = true;
  //delete av.dnd.ancestorBox.accept['g'];
  //delete av.dnd.gridCanvas.accept['g'];
  delete av.dnd.activeConfig.accept['c'];
  delete av.dnd.activeConfig.accept['w'];
  av.dnd.fzWorld.accept['w'] = 1;
  av.dnd.fzWorld.accept['b'] = 1;
  av.dom.sizeCols.disabled = true;
  av.dom.sizeRows.disabled = true;
  //av.dom.experimentRadio.disabled = true;
  //av.dom.demoRadio.disabled = true;

  //there will be a population so it can now be frozen.
  dijit.byId('mnFzPopulation').attr('disabled', false);
};

av.ptd.popTdishStateUi = function (from) {
  'use strict';
  console.log(from, 'called av.ptd.popTdishStateUi');
  av.grd.runState = 'tDish';
  //Disable normal Setup page and setup testDish setup Page   
  //av.dnd.ancestorBox.isSource = false;
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.ancestorBoTest.copyOnly = true;
  av.dnd.activeConfig.isSource = true;
  //delete av.dnd.ancestorBox.accept['g'];
  //delete av.dnd.gridCanvas.accept['g'];
  delete av.dnd.activeConfig.accept['c'];
  delete av.dnd.activeConfig.accept['w'];
  av.dnd.fzWorld.accept['t'] = 1;
  av.dnd.fzWorld.accept['b'] = 1;
  av.dom.sizeCols.disabled = true;
  av.dom.sizeRows.disabled = true;
  //av.dom.experimentRadio.disabled = true;
  //av.dom.demoRadio.disabled = true;

  //there will be a population so it can now be frozen.
  dijit.byId('mnFzPopulation').attr('disabled', false);
};


av.ptd.popRunningStateUi = function () {
  'use strict';
  av.grd.runState = 'started';  //the run has now started
  //Disable some of the options on the Setup page
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.ancestorBoTest.copyOnly = true;
  //av.dnd.ancestorBox.isSource = false;
  //av.dnd.activeConfig.isSource = false;
  delete av.dnd.ancestorBox.accept['g'];
  delete av.dnd.ancestorBoTest.accept['g'];
  delete av.dnd.gridCanvas.accept['g'];
  delete av.dnd.activeConfig.accept['c'];
  delete av.dnd.activeConfig.accept['w'];
  av.dnd.fzWorld.accept['w'] = 1;
  av.dnd.fzWorld.accept['b'] = 1;
  $('#muteSlide').slider({disabled: true});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
  av.dom.sizeCols.disabled = true;
  av.dom.sizeRows.disabled = true;
  
  av.dom.muteInput.disabled= true;

  av.dom.muteInput.disabled = true;
  av.dom.childParentRadio.disabled = true;
  av.dom.childRandomRadio.disabled = true;
  av.dom.notose.disabled = true;
  av.dom.nanose.disabled = true;
  av.dom.andose.disabled = true;
  av.dom.ornose.disabled = true;
  av.dom.orose.disabled = true;
  av.dom.andnose.disabled = true;
  av.dom.norose.disabled = true;
  av.dom.xorose.disabled = true;
  av.dom.equose.disabled = true;
  av.dom.experimentRadio.disabled = true;
  av.dom.demoRadio.disabled = true;

  //there will be a population so it can now be frozen.
  dijit.byId('mnFzPopulation').attr('disabled', false);
};

av.ptd.popNewExState = function () {
  'use strict';
  //set configuation to default
  var fname = '@default';
  av.dnd.activeConfig.selectAll().deleteSelectedNodes();
  av.dnd.activeConfig.insertNodes(false, [{data: fname, type: ['c']}]);
  av.dnd.activeConfig.sync();
  var domId = Object.keys(av.dnd.activeConfig.map)[0];
  av.fzr.actConfig.actDomid = domId;
  av.fzr.actConfig.name = fname;
  av.fzr.actConfig.type = 'c';
  av.fzr.actConfig._id = 'c0';
  // clear parents
  av.dnd.ancestorBox.accept['g'] = 1;
  av.dnd.ancestorBoTest.accept['g'] = 1;
  av.dnd.gridCanvas.accept['g'] = 1;
  av.dnd.activeConfig.accept['c'] = 1;
  av.dnd.activeConfig.accept['b'] = 1;
  av.dnd.activeConfig.accept['t'] = 1;
  av.dnd.activeConfig.accept['w'] = 1;
  av.dnd.fzWorld.accept['w'] = 0;
  av.dnd.fzWorld.accept['b'] = 0;
  av.dnd.ancestorBox.isSource = true;
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.ancestorBoTest.isSource = true;
  av.dnd.ancestorBoTest.copyOnly = true;
  av.dnd.activeConfig.isSource = true;
  $('#muteSlide').slider({disabled: false});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
  av.dom.sizeCols.disabled = false;
  av.dom.sizeRows.disabled = false;
  av.dom.muteInput.disabled = false;
  av.dom.childParentRadio.disabled = false;
  av.dom.childRandomRadio.disabled = false;
  av.dom.notose.disabled = false;
  av.dom.nanose.disabled = false;
  av.dom.andose.disabled = false;
  av.dom.ornose.disabled = false;
  av.dom.orose.disabled = false;
  av.dom.andnose.disabled = false;
  av.dom.norose.disabled = false;
  av.dom.xorose.disabled = false;
  av.dom.equose.disabled = false;
  av.dom.experimentRadio.disabled = false;
  av.dom.demoRadio.disabled = false;

  //reset Ancestor Color stack
  //av.parents.Colors = av.color.parentColorList.slice();   //delete this later
  av.parents.Colors.reverse();
  //set run/stop and drop down menu to the 'stopped' state
  dijit.byId('mnCnPause').attr('disabled', true);
  dijit.byId('mnCnRun').attr('disabled', false);
  av.dom.runStopButton.innerHTML = 'Run';
  //console.log('pauseState; button=run in av.ptd.popNewExState');

  //clear the time series graphs
  av.pch.aveFit = [];
  av.pch.logFit = [];
  av.pch.aveCst = [];
  av.pch.logCst = [];
  av.pch.aveEar = [];
  av.pch.logEar = [];
  av.pch.aveNum = [];
  av.pch.logNum = [];

  TimeLabel.textContent = 0;
  //av.frd.avidaCFG2form(fileStr);
  av.dnd.ancestorBox.selectAll().deleteSelectedNodes();
  av.dnd.ancestorBox.sync();
  av.dnd.ancestorBoTest.selectAll().deleteSelectedNodes();
  av.dnd.ancestorBoTest.sync();
  av.dnd.gridCanvas.selectAll().deleteSelectedNodes();
  av.dnd.gridCanvas.sync();

  //Update data for Selected Organism Type
  av.grd.selCtx.fillStyle = '#D7D7D7';
  av.grd.selCtx.fillRect(0, 0, av.grd.SelectedWd, av.grd.SelectedHt);
  nameLabel.textContent = '';
  fitLabel.innerHTML = '';
  energyAcqRateLabel.textContent = '';
  offspringCostLabel.textContent = '';
  ageLabel.textContent = '';
  ancestorLabel.textContent = '';
  viableLabel.textContent = '';
  notLabel.textContent = 'NOT';
  nanLabel.textContent = 'NAN';
  andLabel.textContent = 'AND';
  ornLabel.textContent = 'ORN';
  oroLabel.textContent = 'ORO';
  antLabel.textContent = 'ANT';
  norLabel.textContent = 'NOR';
  xorLabel.textContent = 'XOR';
  equLabel.textContent = 'EQU';
  notTime.textContent = '0';
  nanTime.textContent = '0';
  andTime.textContent = '0';
  ornTime.textContent = '0';
  oroTime.textContent = '0';
  antTime.textContent = '0';
  norTime.textContent = '0';
  xorTime.textContent = '0';
  equTime.textContent = '0';
  
  //Population Statistics
  popSizeLabel.textContent = '';
  aFitLabel.textContent = '';
  aEnergyAcqRateLabel.textContent = '';
  aOffspringCostLabel.textContent = '';
  aAgeLabel.textContent = '';
  parentNumLabel.textContent = '';
  viableNumLabel.textContent = '';
  notPop.textContent = '';
  nanPop.textContent = '';
  andPop.textContent = '';
  ornPop.textContent = '';
  oroPop.textContent = '';
  antPop.textContent = '';
  norPop.textContent = '';
  xorPop.textContent = '';
  equPop.textContent = '';
  
  numLog.textContent = '';
  logTit1.textContent = '';
  logTit2.textContent = '';
  logTit3.textContent = '';
  logTit4.textContent = '';
  logTit5.textContent = '';
  logTit6.textContent = '';
  av.grd.flagSelected = false;
  dijit.byId('mnCnOrganismTrace').attr('disabled', true);
  dijit.byId('mnFzOrganism').attr('disabled', true);
};

//after Run button pushed for population
av.ptd.runPopFn = function (from) {
  'use strict';
  if (av.debug.popCon) console.log(from, 'called av.ptd.runPopFn: runPopFn runState =', av.grd.runState);
  //check for ancestor organism in configuration data
  var namelist;
  if ('test' == av.msg.setupType)
    namelist = dojo.query('> .dojoDndItem', 'ancestorBoTest');    
  else
    namelist = dojo.query('> .dojoDndItem', 'ancestorBox');
  //console.log('namelist = namelist);
  if (1 > namelist.length) {
    console.log('about to call av.ptd.makePauseState()');
    av.ptd.makePauseState();
    //NeedAncestorDialog.show();
    av.dom.needAncestorModalID.style.display = 'block';
  }
  else if (!av.ptd.validGridSize) {
    console.log('not option: !av.ptd.validGridSize=', !av.ptd.validGridSize);
    av.ptd.makePauseState();
    av.dom.userMsgLabel.innerHTML = 'A valid grid size is required before Avida will run';
    if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
  }
  else if (!av.ptd.validMuteInuput) {
    console.log('Not option: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
    av.ptd.makePauseState();
    av.dom.userMsgLabel.innerHTML = 'A valid mutation rate is required before Avida will run';
    if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
  }
  else { // setup for a new run by sending config data to avida
    if (av.debug.popCon) console.log('else: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
    av.dom.userMsgLabel.innerHTML = '';
    if ('started' !== av.grd.runState) {
      if ('test' == av.msg.setupType) { 
        console.log('scrap test form; not completely working yet');
        //get original files. 
        av.fwt.testForm2folder();
      }
      else {
        //collect setup data to send to avida.  Order matters. Files must be created first. Then files must be sent before some other stuff.
        av.fwt.form2cfgFolder();          //creates avida.cfg and environment.cfg and ancestor.txt and ancestors_manual.txt from form
      }
      if ('prepping' === av.grd.runState) {
        av.msg.importConfigExpr('av.ptd.runPopFn ln291');
        console.log('after calling av.msg.importConfigExpr');
        av.msg.injectAncestors('config');
      }
      else {
        av.msg.importWorldExpr();
        //console.log('parents.injected = av.parents.injected);
        //av.debug.log += '\nstart importWorld running-----------------------------------------\n'
        av.msg.injectAncestors('world');
      }

      //change ui parameters for the correct state when the avida population has started running
      av.ptd.popRunningStateUi();  //av.grd.runState now == 'started'

      av.msg.requestGridData();
      av.msg.requestPopStats();
      if (0 < av.grd.selectedNdx) av.msg.doWebOrgDataByCell();

      //initialize arrays to store data by_clade (or can be called by_ancestor)
      av.pch.numDads = (av.pch.dadMax < av.parents.name.length) ? av.pch.dadMax : av.parents.name.length;
      for (var ii = 0; ii < av.pch.numDads; ii++) {
        av.pch.dadFit[av.parents.name[ii]] = [];
        av.pch.dadCst[av.parents.name[ii]] = [];
        av.pch.dadEar[av.parents.name[ii]] = [];
        av.pch.dadNum[av.parents.name[ii]] = [];
        av.pch.dadVia[av.parents.name[ii]] = [];
      }
      console.log(av.pch.numDads, '; av.pch.dadFit=',av.pch.dadFit);
    }

    if (av.dom.autoUpdateRadio.checked) {
      //av.msg.pause(av.dom.autoUpdateOnce.value);  //not used where there is handshaking (not used with av.msg.stepUpdate)
      av.ui.autoStopFlag = true;
      av.ui.autoStopValue = av.dom.autoUpdateOnce.value;
      //console.log('stop at  = av.dom.autoUpdateOnce.value;
    }

    av.ptd.makeRunState('av.ptd.runPopFn 328');
    av.msg.stepUpdate();   //av.msg.doRunPause(av.fio);
  }
  if (av.debug.popCon) console.log('end of av.ptd.runPopFn 331');
  //update screen based on data from C++
};

av.ptd.runStopFn = function () {
  if ('Run' == av.dom.runStopButton.innerHTML) {
    av.ptd.makeRunState('av.ptd.runStopFn');
    av.ptd.runPopFn('av.ptd.runStopFn');
  } else {
    //console.log('about to call av.ptd.makePauseState()');
    //av.debug.log += 'about to call av.ptd.makePauseState() in AvidaEd.js line 772 \n';
    av.ptd.makePauseState();
    //av.msg.doRunPause(av.fio);
    //console.log('pop size  = av.pch.aveNum);
  }
};

//----------------------------------------------------------------------------------------------------------------------
// Freezer Button functions
//----------------------------------------------------------------------------------------------------------------------

//Freeze the selected organism
av.ptd.FrOrganismFn = function (trigger) {
  'use strict';
  var fzName = 'new';
  var parentName = '';
  var gene;
  if ('selected' == trigger) {
    fzName = prompt('Please name the selected organism', 'av.grd.kidName');
    gene = av.grd.kidGenome;
  }
  else if ('offspring' == trigger) {
    //get name from parent
    parentName = document.getElementById(Object.keys(av.dnd.activeOrgan.map)[0]).textContent;
    fzName = prompt('Please name the offspring', parentName + '_Offspring');
    gene = '0,heads_default,' + av.ind.dna[1];
  }
  else {
    fzName = prompt('Please name the organism', 'newOrganism');
    //console.log('source unknwon', trigger);
  }
  fzName = av.dnd.getUniqueName(fzName, av.dnd.fzOrgan);
  if (null != fzName) {
    //insert new item into the freezer.
    av.dnd.fzOrgan.insertNodes(false, [{data: fzName, type: ['g']}]);
    av.dnd.fzOrgan.sync();

    //Find out the dom ID the node element just inserted.
    var mapItems = Object.keys(av.dnd.fzOrgan.map);
    var domid = mapItems[mapItems.length - 1];
    av.fzr.dir[domid] = 'g' + av.fzr.gNum;
    av.fzr.domid['g' + av.fzr.gNum] = domid;
    av.fzr.file['g' + av.fzr.gNum + '/genome.seq'] = gene;
    av.fzr.file['g' + av.fzr.gNum + '/entryname.txt'] = fzName;
    av.fzr.gNum++;
    av.dnd.contextMenu(av.dnd.fzOrgan, domid, 'av.ptd.FrOrganismFn');
    av.fzr.saveUpdateState('no');
  }
};

av.ptd.FrConfigFn = function () {
  'use strict';
  var fzName = prompt('Please name the new configuration', 'newConfig');
  if (fzName) {
    //var namelist = dojo.query('> .dojoDndItem', 'fzConfig');  console.log('namelist', namelist); not in use, but does show another way to get data
    fzName = av.dnd.getUniqueName(fzName, av.dnd.fzConfig);
    if (null != fzName) {
      av.dnd.fzConfig.insertNodes(false, [{data: fzName, type: ['c']}]);
      av.dnd.fzConfig.sync();
      var domid = av.dnd.getDomId(fzName, av.dnd.fzConfig);
      av.fzr.dir[domid] = 'c'+ av.fzr.cNum;
      av.fzr.domid['c'+ av.fzr.cNum] = domid;
      av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = fzName;
      av.fwt.makeFzrConfig(av.fzr.cNum);
      av.fzr.cNum++;
      //Create context menu for right-click on this item
      av.dnd.contextMenu(av.dnd.fzConfig, domid, 'av.ptd.FrConfigFn');
      av.fzr.saveUpdateState('no');
    }
  }
};

//Save a populated dish
av.ptd.FrPopulationFn = function () {
  'use strict';
  av.msg.exportExpr('w' + av.fzr.wNum);
  av.msg.sendData();
  var popName = av.fzr.actConfig.name + '@' + av.grd.popStatsMsg.update.formatNum(0);  // need update here star
  var fzName = prompt('Please name the new population', popName);
  if (fzName) {
    fzName = av.dnd.getUniqueName(fzName, av.dnd.fzWorld);
    if (null != fzName) {
      av.dnd.fzWorld.insertNodes(false, [{data: fzName, type: ['w']}]);
      av.dnd.fzWorld.sync();
      //Find out the dom ID the node element just inserted.
      var domid = av.dnd.getDomId(fzName, av.dnd.fzWorld);
      av.fzr.dir[domid] = 'w'+ av.fzr.wNum;
      av.fzr.domid['w'+ av.fzr.wNum] = domid;
      av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = fzName;
      av.fwt.makeFzrWorld(av.fzr.wNum);
      av.fzr.wNum++;
      //Create context menu for right-click on this item
      av.dnd.contextMenu(av.dnd.fzWorld, domid, 'av.ptd.FrPopulationFn');
      av.fzr.saveUpdateState('no');
    }
  }
};

av.pch.processLogic = function() {
  "use strict";
  console.log('In av.pch.processLogic: av.pch.fnBinary = ', av.pch.fnBinary);
  if ( (null !== av.pch.fnBinary) && (undefined !== av.pch.fnBinary) ) {
    for (var ii = 0; ii<9; ii++) {
      //console.log('substring = ', av.pch.fnBinary.substring(ii,ii+1));
      //console.log('ii = ', ii, '; buton=', av.ptd.logicButtons[ii]);
      if ('1' == av.pch.fnBinary.substring(ii, ii + 1)) {
        av.pch.bitTurnOn(av.ptd.logicButtons[ii]);
      }
    }
  }
};

av.pch.bitTurnOn = function(button) {
  "use strict";
  document.getElementById(button).value = 'on';
  document.getElementById(button).className = 'bitButtonOn';
  av.post.addUser('Button: ' + button + ' = on');
  av.grd.fnChosen[button] = true;

  av.grd.selFnText = '';
  av.grd.selFnBinary = '';
  for (var ii=0; ii<9; ii++) {
    if (av.grd.fnChosen[av.ptd.logicButtons[ii]]) {
      av.grd.selFnText += av.sgr.logicNames[ii] + '.';
      av.grd.selFnBinary += '1';
    }
    else av.grd.selFnBinary +='0';
  }
  if (3 > av.grd.selFnText.length) {av.grd.selFnText = 'none';}
  //console.log('av.grd.fnChosen = ', av.grd.fnChosen);
  //console.log('av.grd.selFnText =', av.grd.selFnText);
  //console.log('av.grd.selFnBinary =',av.grd.selFnBinary);
};

av.ptd.bitToggle = function (button) {
  'use strict';
  if ('on' == document.getElementById(button).value) {
    document.getElementById(button).value = 'off';
    document.getElementById(button).className = 'bitButtonOff';
    av.post.addUser('Button: ' + button + ' = off');
    av.grd.fnChosen[button] = false;
  }
  else {
    document.getElementById(button).value = 'on';
    document.getElementById(button).className = 'bitButtonOn';
    av.post.addUser('Button: ' + button + ' = on');
    av.grd.fnChosen[button] = true;
  }
  
  av.grd.selFnText = '';
  av.grd.selFnBinary = '';
  for (var ii=0; ii<9; ii++) {
    if (av.grd.fnChosen[av.ptd.logicButtons[ii]]) {
      av.grd.selFnText += av.sgr.logicNames[ii] + '.';
      av.grd.selFnBinary += '1';
    }
    else av.grd.selFnBinary +='0';
  }
  if (3 > av.grd.selFnText.length) {av.grd.selFnText = 'none';}
  //console.log('av.grd.fnChosen = ', av.grd.fnChosen);
  //console.log('av.grd.selFnText =', av.grd.selFnText);
  //console.log('av.grd.selFnBinary =',av.grd.selFnBinary);

  //console.log('av.grd.selFnText=', av.grd.selFnText);
  var lngth = av.pch.aveFit.length;
  for (var ii=0; ii < lngth; ii++){
    av.pch.logFit[ii] = null;
    av.pch.logCst[ii] = null;
    av.pch.logEar[ii] = null;
    av.pch.logNum[ii] = null;
  }
  av.grd.drawGridSetupFn('av.ptd.bitToggle');
  av.grd.popChartFn();
  //console.log('bitToggle: av.grd.popStatsMsg.update', av.grd.popStatsMsg.update);
  av.ptd.updateLogicFn(av.grd.popStatsMsg.update);
};

//reset values
av.ptd.resetDishFn = function (need2sendRest2avida) { //Need to reset all settings to @default
  'use strict';
  // send reset to Avida adaptor
  //if (need2sendRest2avida) {av.msg.reset();} //Take this out if we only reset when avida resets After sending a request for reset.

  //console.log('in resetDishFn');
  av.msg.pause('now');
  av.ptd.makePauseState();
  av.grd.clearGrd();
  if (av.debug.grid) console.log('before calling av.grd.popChartInit');
  av.grd.popChartInit('restDishFn');
  av.grd.runState = 'prepping';
  dijit.byId('mnCnOrganismTrace').attr('disabled', true);
  dijit.byId('mnFzOrganism').attr('disabled', true);
  //Enable the options on the Setup page
  av.ptd.popNewExState();
  //Clear grid settings
  av.parents.clearParentsFn();
  // reset values in population settings based on a 'file' @default
  av.fzr.actConfig.file = {};
  // write if @default not found - need to figure out a test for this
  // av.ptd.writeHardDefault(av);
  av.fzr.actConfig.dir = 'c0';
  av.fzr.actConfig.file['events.cfg'] = ' ';
  if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
  if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
  if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}
  if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
    str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
    av.fio.autoAncestorLoad(str);
  }
  if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
    str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
    av.fio.handAncestorLoad(str);
  }

  av.frd.updateSetup('av.ptd.resetDishFn');

  if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];}

    //Clear options that are not in the config files
  av.dom.manualUpdateRadio.checked = true;
  av.dom.autoUpdateRadio.checked = false;
  av.dom.autoUpdateOnce.value = av.ptd.autoPauseUpdate;

  av.ptd.clearLogicButtons();
  //console.log('fzr.activeCon', av.fzr.actConfig);

  // re-write grid if that page is visible
  av.grd.popChartClear();
  av.grd.drawGridSetupFn('av.ptd.resetDishFn');
  
  // reset debug values. 
    mxNot.textContent = "";
    mxNan.textContent = "";
    mxAnd.textContent = "";
    mxOrn.textContent = "";
    mxOro.textContent = "";
    mxAnt.textContent = "";
    mxNor.textContent = "";
    mxXor.textContent = "";
    mxEqu.textContent = "";
    
    cellNot.textContent = "";
    cellNan.textContent = "";
    cellAnd.textContent = "";
    cellOrn.textContent = "";
    cellOro.textContent = "";
    cellAnt.textContent = "";
    cellNor.textContent = "";
    cellXor.textContent = "";
    cellEqu.textContent = "";
};

//clear logic Buttons
av.ptd.clearLogicButtons = function() {
  var len = av.ptd.logicButtons.length;
  for (var ii = 0; ii < len; ii++) {
    document.getElementById(av.ptd.logicButtons[ii]).value = 'off';
    document.getElementById(av.ptd.logicButtons[ii]).className = 'bitButtonOff';
    av.grd.fnChosen[av.ptd.logicButtons[ii]] = false;
  }
};

//----------------------------------------------------------------------------------------------------------------------

// should really be in a ui code section
// http://stackoverflow.com/questions/7125453/modifying-css-class-property-values-on-the-fly-with-javascript-jquery
  av.ptd.setStyle = function (cssText) {
  var sheet = document.createElement('style'), isIE = false;
    sheet.type = 'text/css';
    /* Optional */ window.customSheet = sheet;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
    try{sheet.cloneNode(false).appendChild(document.createTextNode('')); }
  catch (err){isIE = true; }
  var wrapper = isIE ? document.createElement('div') : sheet;
    return (setStyle = function(cssText, node) {
    if (!node || node.parentNode !== wrapper)
      node = wrapper.appendChild(document.createTextNode(cssText));
      else node.nodeValue = cssText;
      if (isIE) sheet.styleSheet.cssText = wrapper.innerHTML;
      return node;
    })(cssText);
    };
//----------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------- sugars for Eco --

//This does  not deal wtth complement, I'll do that later if asked. 
av.sgr.ChangeAllGeo = function(selectedOption){
  var endName = 'Geometry';   //nanGeometry
  var sub = 1;  //need to figure out subsections later
  var idName = '';
  var numtasks = av.sgr.logicNames.length;
  for (var ii=0; ii< numtasks; ii++) {
  //for (var ii=1; ii< 3; ii++) {
    idName = av.sgr.logicNames[ii] + endName;
    document.getElementById(idName).value = selectedOption;
    
    av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'deletefromGeo', sub, 'av.sgr.ChangeAllGeo');
  }
  console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption);
};

av.sgr.ChangeAllSugarType = function(selectedOption) {
  var endName = 'Type';   //nan0Type  the 0 is present because we were considering doing upto 4 hear and easier to take the 0 out later, than to put it in. 
  console.log('endName=', endName, '; selectedOption=',selectedOption);
  var domName = '';        
  var numtasks = av.sgr.logicNames.length;
  for (var ii=0; ii< numtasks; ii++) {
    for (var jj=0; ii< 2; ii++) {
      domName = av.sgr.logicNames[ii] + jj + endName;
      document.getElementById(domName).value = selectedOption;
    }
    av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'deleteSupplyType', 1, 'av.sgr.ChangeAllSugarType');
  }
    console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
};

  av.sgr.setSugarColors = function() {
  var sugarSection = ['notSection', 'nanSection', 'andSection', 'ornSection', 'oroSection', 'antSection', 'norSection', 'xorSection', 'equSection'];
  var sugarTitle = ['notTitle', 'nanTitle', 'andTitle', 'ornTitle', 'oroTitle', 'antTitle', 'norTitle', 'xorTitle', 'equTitle'];
    var len = av.sgr.sugarColors.length;
    for (ii = 0; ii < len; ii++) {
      //if ('Spatial' == document.getElementById('allSugarGeometry').value) {
      if (true) {
        document.getElementById(sugarSection[ii]).style.backgroundColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarBackgroundShade];
        document.getElementById(sugarTitle[ii]).style.color = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade];
        
      }
      else {
        document.getElementById(sugarSection[ii]).style.backgroundColor = av.color.greyMap[av.sgr.sugarGreyShade];
        document.getElementById(sugarTitle[ii]).style.color = 'Black';
      }
    }
  };

av.sgr.OpenCloseAllSugarDetails = function(selectedOption, from){
  var endName = 'Section';   //nanGeometry
  var idName = '';
  var openFlag = false;
  var numtasks = av.sgr.logicNames.length;
  if ('allOpen' == selectedOption) {openFlag = true;}
  for (var ii=0; ii< numtasks; ii++) {
  //for (var ii=1; ii< 3; ii++) {
    idName = av.sgr.logicNames[ii] + endName;
    document.getElementById(idName).open = openFlag;
  }
  console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption, '; openFlag=', openFlag, '; from=', from);
};

av.sgr.changeDetailsLayout = function(tsk, deleteLater, sub, from) {
  if ('not' != tsk) {return;}   //used in testing; should be deleted in 2019 Aug/Sept
  
  console.log(from, 'called av.sgr.changeDetailsLayout: task=', tsk, '; delete this =', deleteLater, '; sub=', sub);
  
  var supplyType;
  var idx = document.getElementById(tsk+'Geometry').selectedIndex;
  var geoOption = document.getElementById(tsk+'Geometry').options[idx].value;   // get the value of the selected option   
  var geometry = document.getElementById(tsk+'Geometry').value;
  console.log('geometry=', geometry, '; geoOption=', geoOption);
  if ('global' == geometry.toLowerCase()) {
    supplyType = document.getElementById(tsk + '0Type').value;
  }
  else {
    supplyType = document.getElementById(tsk + sub + 'Type').value;
    
  }
  console.log('tsk=', tsk, '; geometry=', geometry, '; supplyType =', supplyType );

  
  
  console.log(tsk+'0dishRegion=', document.getElementById(tsk+'0dishRegion').value );

  document.getElementById(tsk+'0Type').style.display = 'none';      
  document.getElementById(tsk+'0dishRegion').style.display = 'none';
  document.getElementById(tsk+'0initialDiv').style.display = 'none';
  document.getElementById(tsk+sub+'TypeDiv').style.display = 'none';
  document.getElementById(tsk+sub+'Title').style.display = 'none';      
  document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'none';
  document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'none';
  document.getElementById(tsk+sub+'periodCheckbox').style.display = 'none';
  document.getElementById(tsk+sub+'periodTime').style.display = 'none';
  document.getElementById(tsk+sub+'sideDiv').style.display = 'none';
  document.getElementById(tsk+sub+'sideHiDiv').style.display = 'none';
  document.getElementById(tsk+sub+'sideLoDiv').style.display = 'none';
  document.getElementById(tsk+sub+'initialHiDiv').style.display = 'none';
  document.getElementById(tsk+sub+'initialLoDiv').style.display = 'none';
  document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'none';
  document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'none';
  document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'none';
  document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'none';
  document.getElementById(tsk+sub+'equalHiDiv').style.display = 'none';
  document.getElementById(tsk+sub+'equalLoDiv').style.display = 'none';
  if ('Global' == geoOption) {
    document.getElementById(tsk+'0Type').style.display = 'inline-block';      
    switch (supplyType) {
      case 'None': 
      case 'Infinite': 
        document.getElementById(tsk+'Section').open = false;
        break;
      case 'Finite': 
        document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
        document.getElementById(tsk+'Section').open = false;
        break;
      case 'Equilibrium':
        document.getElementById(tsk+sub+'periodCheckbox').style.display = 'block';
        document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'inflowHiLabel').innerHTML = 'Inflow amount per cell';
        document.getElementById(tsk+sub+'outflowHiLabel').innerHTML = 'Outflow fraction per cell';
        document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when no resource has been consumed';
        document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-globalEqual-container';
        console.log('task='+tsk,'; Details.class=', document.getElementById(tsk+'Details').className);
        console.log(tsk+sub+'periodCheckbox.checked=', document.getElementById(tsk+sub+'periodCheck').checked);
        if (true == document.getElementById(tsk+sub+'periodCheck').checked) {
          document.getElementById(tsk+sub+'periodTime').style.display = 'block';
          document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when no resource has been consumed';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-globalEqualPeriod-container';
        };
        document.getElementById(tsk+'Section').open = true;
        break;
      case 'All':
        document.getElementById(tsk+'Section').open = true;
        document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
        document.getElementById(tsk+sub+'periodTime').style.display = 'block';
        document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'equalLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'sideDiv').style.display = 'block';
        document.getElementById(tsk+sub+'sideLabel').innerHTML = 'Side text describing what side means';
        document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
        console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className);
        break;
    }    
  }        // end global 
  else {
    document.getElementById(tsk+'0dishRegion').style.display = 'inline-block';
    document.getElementById(tsk+sub+'TypeDiv').style.display = 'block';
    document.getElementById(tsk+sub+'Title').style.display = 'block';    
    document.getElementById(tsk+'Section').open = true;

    switch (supplyType) {    //for when geometery = local
      case 'None':         
      case 'Infinite': 
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-None-container';
        break;
      case 'Finite':   //spatial
        document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'block';
        document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'block';
        console.log('task=',tsk, '; sub=', sub, '; gradientCheck.checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
        if (true == document.getElementById(tsk+sub+'gradientCheck').checked) {  
          //gradient
          document.getElementById(tsk+sub+'sideDiv').style.display = 'block';
          document.getElementById(tsk+sub+'sideLabel').innerHTML = 'Choose the side to have the a higher initla amount';
          document.getElementById(tsk+sub+'initialHiLabel').innerHTML = 'High side initial amount per cell';
          document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-FiniteGradient-container';
          console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
        }
        else {
          //not-gradient; spatial
          document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'initialHiLabel').innerHTML = 'Inital amount in each cell';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Finite-container';
          console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
        }
        break;
      case 'Equilibrium':
        console.log(tsk,'0gradientCheckbox.checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
        document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
        console.log(tsk+sub+'gradientCheck', document.getElementById(tsk+sub+'gradientCheck').checked, '; av.sgr.hideFlgNames.gradient=', av.sgr.hideFlgNames.gradient);
        if (true == document.getElementById(tsk+sub+'gradientCheck').checked && !av.sgr.hideFlgNames.gradient) {
          //gradient
          document.getElementById(tsk+sub+'sideDiv').style.display = 'block';
          document.getElementById(tsk+sub+'sideLabel').innerHTML = 'Side with a higher amount';
//          document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
//          document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
          document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium on high side.';
          document.getElementById(tsk+sub+'equalLoText').innerHTML = ' = equilibrium on Low side';
          document.getElementById(tsk+sub+'inflowHiLabel').innerHTML = 'Inflow amount per cell on high side.';
          document.getElementById(tsk+sub+'outflowHiLabel').innerHTML = 'Outflow fraction per cell on high side';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualGradient-container';
          console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
          if (true == document.getElementById(tsk+sub+'periodCheck').checked) {
            document.getElementById(tsk+sub+'periodTime').style.display = 'block';
            document.getElementById(tsk+sub+'sideLabel').innerHTML = 'Side with a higher amount';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualGradientPeriod-container';            
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
          }
        }
        else {
          //not-gradient; spatial          
          document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'inflowHiLabel').innerHTML = 'Inflow amount per cell';
          document.getElementById(tsk+sub+'outflowHiLabel').innerHTML = 'Outflow fraction per cell';
          document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium if not consumed.';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Equal-container';
          console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
          if (true == document.getElementById(tsk+sub+'periodCheck').checked) {
            document.getElementById(tsk+sub+'periodTime').style.display = 'block';
            document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when no resource has been consumed';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualPeriod-container';            
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
          }
        }
        break;
        /*
      case 'SourceSink':        //or should this be flow as it must have diffusion and/or gravity ??
        document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'sideLabel').innerHTML = 'inflow side; outlow will be everywhere or on the opposite side';
        document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'sideDiv').style.display = 'block';
        document.getElementById(tsk+'Details').className = 'grid-sugarDetailSourceSink-container';
        console.log('nanDetails.class=', document.getElementById(tsk+'Details').className);
        break;
        */
      case 'All':
        document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
        document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
        document.getElementById(tsk+sub+'periodTime').style.display = 'block';
        document.getElementById(tsk+sub+'sideDiv').style.display = 'block';
        document.getElementById(tsk+sub+'sideLabel').innerHTML = 'Side text describing what side means';
        document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
        document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
        document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
        document.getElementById(tsk+sub+'equalLoDiv').style.display = 'block';
        document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
        console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className);
        break;
    };
  };
};

//------------------------------------------------------------------------------------------------ end sugars for Eco --


//------------------------------------------------------------------------------------------ ex1 and ex2 delete later --
//in ex2 page now
av.ptd.ex1allSugarChange = function (allmode) {
  var onoff = 'None';
  var geometry = 'Spatial';
  console.log('ex1_allmode=', allmode);
  if ( ('allon' == allmode) || ('alloff' == allmode) ) {
    geometry = 'Global';
    if ('allon' == allmode) {
      onoff = 'Infinite';
    }
    else if ('alloff' == allmode) {
      onoff = 'None';
    };
    document.getElementById('ex1notGlobRsrcType').value = onoff;
    //document.getElementById('ex1nanGlobRsrcType').value = onoff;
    //document.getElementById('ex1andGlobRsrcType').value = onoff;
    //document.getElementById('ex1ornGlobRsrcType').value = onoff;
    document.getElementById('ex1oroGlobRsrcType').value = onoff;
    document.getElementById('ex1antGlobRsrcType').value = onoff;
    //document.getElementById('ex1norGlobRsrcType').value = onoff;
    document.getElementById('ex1xorGlobRsrcType').value = onoff;
    document.getElementById('ex1equGlobRsrcType').value = onoff;

    document.getElementById('ex1notGeometry').value = geometry;
    document.getElementById('ex1nanGeometry').value = geometry;
    document.getElementById('ex1andGeometry').value = geometry;
    document.getElementById('ex1ornGeometry').value = geometry;
    document.getElementById('ex1oroGeometry').value = geometry;
    document.getElementById('ex1antGeometry').value = geometry;
    document.getElementById('ex1norGeometry').value = geometry;
    document.getElementById('ex1xorGeometry').value = geometry;
    document.getElementById('ex1equGeometry').value = geometry;
  };
};

//in ex2 page now
av.ptd.allSugarCheckBox = function (allmode) {
  var onflag = true;
  if ('allComp' == allmode) {
    document.getElementById('notose').checked =  !document.getElementById('notose').checked;
    document.getElementById('nanose').checked =  !document.getElementById('nanose').checked;
    document.getElementById('andose').checked =  !document.getElementById('andose').checked;
    document.getElementById('ornose').checked =  !document.getElementById('ornose').checked;
    document.getElementById('orose').checked =  !document.getElementById('orose').checked;
    document.getElementById('andnose').checked =  !document.getElementById('andnose').checked;
    document.getElementById('norose').checked =  !document.getElementById('norose').checked;
    document.getElementById('xorose').checked =  !document.getElementById('xorose').checked;
    document.getElementById('equose').checked =  !document.getElementById('equose').checked;
  }
  else if ( ('allon' == allmode) || ('alloff' == allmode) ) {
    if ('allon' == allmode) {
      onflag = true;
    }
    else if ('alloff' == allmode) {
      onflag = false;
    };
    document.getElementById('notose').checked = onflag;
    document.getElementById('nanose').checked = onflag;
    document.getElementById('andose').checked = onflag;
    document.getElementById('ornose').checked = onflag;
    document.getElementById('orose').checked = onflag;
    document.getElementById('andnose').checked = onflag;
    document.getElementById('norose').checked = onflag;
    document.getElementById('xorose').checked = onflag;
    document.getElementById('equose').checked = onflag;
  };
};

//for structure on ex2 tab; not currently called as of 2019 Aug 4
av.ptd.envobj2form = function(from) {
  console.log(from, 'called av.ptd.envobj2form');
  console.log('av.ui.envRegion=',av.ui.envRegion, '; av.ui.envTask=', av.ui.envTask, '; av.ui.envDistribute=',av.ui.envDistribute);
  var task;
  var ndx = -1;
  var envobj;
  var logicindex = av.sgr.logicNames.indexOf(av.ui.envTask);
  var regionindex = av.ptd.regionNames.indexOf(av.ui.envRegion);
  var ii=0;
  var found = false;
  var len;
  if (-1 < logicindex && -1 < regionindex) {
    task = av.sgr.logEdNames[logicindex];
    envobj = av.fzr.env.rsrce[task];
    console.log('task='+task,'; av.fzr.env.rsrce[task] = ', av.fzr.env.rsrce[task]);
    len = envobj.name.length;
    console.log('len='+len, '; envobj.name=',envobj.name);
    while(ii < len && !found) {
      console.log('ii='+ii,'; envobj.name[ii]='+envobj.name[ii],'; envobj.name[ii].substring(3,10)='+envobj.name[ii].substring(3,10)+'|');
      if (regionindex == envobj.name[ii].substring(3,10)) {
        found = true;
        ndx = ii;
        ii = len;
      }
      ii++;
    };
    
    if ('Finite' == av.ui.envDistribute) {  
      av.dom.envInitial.value  = envobj.initial[ndx];
    }
    else if ('Equilibrium' == av.ui.envDistribute) {
      var inflow = envobj.inflow[ndx];
      var outflow = envobj.outflow[ndx];
      av.dom.envEqInflow.value = inflow;
      av.dom.envEqOutflow.value = outflow;
      av.dom.envEqual.innerHTML = inflow/outflow;
    }
    else if ('Gradient' == av.ui.envDistribute) {
      av.dom.envGrInflow.value = envobj.inflow[ndx];
      av.dom.envGrOutflow.value = envobj.outflow[ndx];
      av.dom.envGrSide.value = 'left';
    }
  }
  else {console.log('Error in an environment indesx: av.ui.envRegion=',av.ui.envRegion, '; av.ui.envTask=', av.ui.envTask, '; av.ui.envDistribute=',av.ui.envDistribute);}
};

  //on ex1 tab
av.ptd.showEnv = function(from) {
  console.log(from, 'called av.ptd.showEnv');
  var len = av.sgr.logicNames.length;
  var showRegion = document.getElementById('ex1envShowRegion').value;
  var regionNdx = av.sgr.regionCode.indexOf(showRegion);
  var txtType, txtInit, txtInflo, txtOut;
  
  if (-1< regionNdx) {
    console.log('showRegion = ', showRegion, '; len=', len, '; regionNdx=', regionNdx, '; av.sgr.regionCode=', av.sgr.regionCode);
    for (var ii = 0; ii < len; ii++) {
      txtType = '';
      txtInflo = '';
      txtInit = '';
      txtOut = '';
      var tmpobj = av.fzr.env.rsrce[av.sgr.logEdNames[ii]];
      console.log('av.fzr.env.rsrce['+av.sgr.logEdNames[ii]+'].regionList=', tmpobj.regionList);
      if (undefined != tmpobj) {
        if (0 < tmpobj.regionList.length) {
          rndx = tmpobj.regionList[regionNdx];
          console.log('rndx=', rndx, 'av.sgr.logicNames[ii]+"Type"', av.sgr.logicNames[ii]+'Type');
          if (undefined != rndx) {
            console.log('tmpobj=', tmpobj);
            if (undefined != tmpobj.type[rndx]) {
              txtType = av.fzr.env.rsrce[av.sgr.logEdNames[ii]].type[rndx];
              txtInit = av.fzr.env.rsrce[av.sgr.logEdNames[ii]].initial[rndx];
              txtInflo = av.fzr.env.rsrce[av.sgr.logEdNames[ii]].inflow[rndx];
              txtOut = av.fzr.env.rsrce[av.sgr.logEdNames[ii]].outflow[rndx];
            }
          }    
        }
      }
      console.log('txtType=', txtType, '; txtInit=', txtInit, '; txtOut=', txtOut);
      document.getElementById(av.sgr.logicNames[ii]+'Type').innerHTML = txtType;
      if ('fin' == txtType) { 
        document.getElementById(av.sgr.logicNames[ii]+'In').innerHTML = txtInit;
        document.getElementById('envIn').innerHTML = 'Initial';
      }
      else {
        document.getElementById(av.sgr.logicNames[ii]+'In').innerHTML = txtInflo;
        document.getElementById('envIn').innerHTML = 'Inflow';
      }
      document.getElementById(av.sgr.logicNames[ii]+'Out').innerHTML = txtOut;
      console.log('av.fzr.env.rsrce['+av.sgr.logEdNames[ii]+'].type['+rndx+']=', av.fzr.env.rsrce[av.sgr.logEdNames[ii]].type[rndx],'--------------------------');
    };
  };
};