// *********************************************************************************************************************
//                                       Population page script
// *********************************************************************************************************************
// ptd = PeTri Dish
var av = av || {};  //incase av already exists

av.ptd.makePauseState = function () {
  dijit.byId('mnCnPause').attr('disabled', true);
  dijit.byId('mnCnRun').attr('disabled', false);
  dijit.byId('mnCnOne').attr('disabled', false);
  //console.log('pauseState; button=run');
  av.dom.runStopButton.textContent = 'Run';
  av.dom.oneUpdateButton.disabled = false;
};

av.ptd.makeRunState = function () {
  av.dom.runStopButton.textContent = 'Pause';
  dijit.byId('mnCnPause').attr('disabled', false);
  dijit.byId('mnCnRun').attr('disabled', true);
  dijit.byId('mnCnOne').attr('disabled', true);
  av.dom.oneUpdateButton.disabled = true;
};

// shifts the population page from Map (grid) view to setup parameters view and back again.
av.ptd.popBoxSwap = function () {
  'use strict';
  if ('Setup' != popSetupButton.innerHTML) {
    av.post.addUser('Button: popSetupButton became Setup');
    av.dom.labInfoBlock.style.display = 'flex';
    av.dom.setupBlock.style.display = 'none';
    av.dom.popSetupButton.textContent = 'Setup';

    av.ui.subpage = 'Data';
  } else {
    av.post.addUser('Button: popSetupButton became Data');
    av.dom.labInfoBlock.style.display = 'none';
    av.dom.setupBlock.style.display = 'flex';
    av.dom.popSetupButton.textContent = 'Data';
    av.ui.subpage = 'setup';
  }
};

av.ptd.popWorldStateUi = function (from) {
  'use strict';
  console.log(from, 'called av.ptd.popWorldStateUi');
  av.grd.runState = 'world';
  //Disable some of the options on the Setup page
  //av.dnd.ancestorBox.isSource = false;
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.activeConfig.isSource = true;
  //delete av.dnd.ancestorBox.accept['g'];
  //delete av.dnd.gridCanvas.accept['g'];
  delete av.dnd.activeConfig.accept['c'];
  delete av.dnd.activeConfig.accept['w'];
  av.dnd.fzWorld.accept['w'] = 1;
  av.dnd.fzWorld.accept['b'] = 1;
  av.dom.sizeCols.disabled = true;
  av.dom.sizeRows.disabled = true;
  //av.dom.sizeRows.disabled = true;
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
  //av.dnd.ancestorBox.isSource = false;
  //av.dnd.activeConfig.isSource = false;
  delete av.dnd.ancestorBox.accept['g'];
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
  av.dnd.gridCanvas.accept['g'] = 1;
  av.dnd.activeConfig.accept['c'] = 1;
  av.dnd.activeConfig.accept['b'] = 1;
  av.dnd.activeConfig.accept['w'] = 1;
  av.dnd.fzWorld.accept['w'] = 0;
  av.dnd.fzWorld.accept['b'] = 0;
  av.dnd.ancestorBox.isSource = true;
  av.dnd.ancestorBox.copyOnly = true;
  av.dnd.activeConfig.isSource = true;
  $('#muteSlide').slider({disabled: false});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
  av.dom.sizeCols.disabled = false;
  av.dom.sizeRows.disabled = false;
  //av.dom.sizeRows.disabled = false;
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
  av.dom.mnCnPause.disabled = true;
  av.dom.mnCnRun.disabled = false;
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
  av.dom.mnFzOrganism.disabled = true;
  av.dom.mnCnOrganismTrace.disabled = true;
}

//after Run button pushed for population
av.ptd.runPopFn = function () {
  'use strict';
  //console.log('runPopFn runState = av.grd.runState);
  //check for ancestor organism in configuration data
  //console.log('validGridSize=',av.ptd.validGridSize, '; popSetupButton.innerHTML= = popSetupButton.innerHTML, '; av.ui.page=',av.ui.page);
  var namelist = dojo.query('> .dojoDndItem', 'ancestorBox');
  //console.log('namelist = namelist);
  if (1 > namelist.length) {
    //console.log('about to call av.ptd.makePauseState()');
    av.ptd.makePauseState();
    //NeedAncestorDialog.show();
    av.dom.NeedAncestorModalID.style.display = "block";
  }
  else if (!av.ptd.validGridSize) {
    av.ptd.makePauseState();
    av.dom.userMsgLabel.innerHTML = 'A valid grid size is required before Avida will run';
    if ('Setup' == popSetupButton.innerHTML) av.ptd.popBoxSwap();
    if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
  }
  else if (!av.ptd.validMuteInuput) {
    av.ptd.makePauseState();
    av.dom.userMsgLabel.innerHTML = 'A valid mutation rate is required before Avida will run';
    if ('Setup' == popSetupButton.innerHTML) av.ptd.popBoxSwap();
    if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
  }
  else { // setup for a new run by sending config data to avida
    av.dom.userMsgLabel.innerHTML = '';
    if ('started' !== av.grd.runState) {
      //collect setup data to send to avida.  Order matters. Files must be created first. Then files must be sent before some other stuff.
      av.fwt.form2cfgFolder();          //fileDataWrite.js creates avida.cfg and environment.cfg and ancestor.txt and ancestor_manual.txt
      if ('prepping' === av.grd.runState) {
        av.msg.importConfigExpr();
        av.msg.injectAncestors();
      }
      else {
        av.msg.importWorldExpr();
        //console.log('parents.injected = av.parents.injected);
        //av.debug.log += '\nstart importWorld running-----------------------------------------\n'
        av.msg.injectAncestors();
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
      //av.msg.pause(av.dom.autoUpdateSpinner').get('value'));  //not used where there is handshaking (not used with av.msg.stepUpdate)
      av.ui.autoStopFlag = true;
      av.ui.autoStopValue = av.dom.autoUpdateSpinner.value;
      //console.log('stop at  = av.dom.autoUpdateSpinner').get('value'));
    }

    av.ptd.makeRunState();
    av.msg.stepUpdate();   //av.msg.doRunPause(av.fio);
  }
  //update screen based on data from C++
};

av.ptd.runStopFn = function () {
  if ('Run' == av.dom.runStopButton.innerHTML) {
    av.ptd.makeRunState();
    av.ptd.runPopFn();
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
    av.dnd.contextMenu(av.dnd.fzOrgan, domid);
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
      av.dnd.contextMenu(av.dnd.fzConfig, domid);
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
      av.dnd.contextMenu(av.dnd.fzWorld, domid);
      av.fzr.saveUpdateState('no');
    }
  }
}

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
      av.grd.selFnText += av.ptd.logicNames[ii] + '.';
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
      av.grd.selFnText += av.ptd.logicNames[ii] + '.';
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
  av.grd.popChartInit();
  av.grd.runState = 'prepping';
  av.dom.mnCnOrganismTrace.disabled = true;
  av.dom.mnFzOrganism.disabled = true;
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
  if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors']) {
    str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors'];
    av.fio.autoAncestorLoad(str);
  }
  if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual']) {
    str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual'];
    av.fio.handAncestorLoad(str);
  }

  av.frd.updateSetup();

  if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];}

    //Clear options that are not in the config files
  av.dom.manualUpdateRadio.checked = true;
  av.dom.autoUpdateRadio.checked = false;
  av.dom.autoUpdateSpinner.value = av.ptd.autoPauseUpdate;

  av.ptd.clearLogicButtons();
  //console.log('fzr.activeCon', av.fzr.actConfig);

  // re-write grid if that page is visible
  av.grd.popChartClear();
  av.grd.drawGridSetupFn('av.ptd.resetDishFn');
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
// code below this line is not in use tiba delete later
//writes data to Environmental Settings page based on the content of av.dnd.activeConfig
//for now this is hard coded to what would be in @default. will need a way to request data from PouchDB
//and read the returned JSON string.
av.ptd.writeHardDefault = function (av) {
  'use strict';
  av.dom.sizeCols.value = av.dft.sizeCols;
  av.dom.sizeRows.value = av.dft.sizeRows;
  //av.dom.sizeCols.value = av.dft.sizeCols;
  //av.dom.sizeRows.value = av.dft.sizeRows;
  if ('childParentRadio'==av.dft.child) {
    av.dom.childParentRadio.checked = true;
    av.dom.childRandomRadio.checked = false;
  }
  else {
    av.dom.childParentRadio.checked = false;
    av.dom.childRandomRadio.checked = true;
  }
  av.dom.notose.checked = av.dft.notose;
  av.dom.nanose.checked = av.dft.nanose;
  av.dom.andose.checked = av.dft.andose;
  av.dom.ornose.checked = av.dft.ornose;
  av.dom.orose.checked = av.dft.orose;
  av.dom.andnose.checked = av.dft.andnose;
  av.dom.norose.checked = av.dft.norose;
  av.dom.xorose.checked = av.dft.xorose;
  av.dom.equose.checked = av.dft.equose;
  av.dom.experimentRadio.checked = true;
  av.dom.manualUpdateRadio.checked = true;
  if ('experimentRadio'==av.dft.repeat) {
    av.dom.experimentRadio.checked = true;
    av.dom.demoRadio.checked = false;
  }
  else {
    av.dom.experimentRadio.checked = false;
    av.dom.demoRadio.checked = true;
  }
  if ('manualUpdateRadio'==av.dft.pauseType) {
    av.dom.manualUpdateRadio.checked = true;
    av.dom.autoUpdateRadio.checked = false;
  }
  else {
    av.dom.manualUpdateRadio.checked = false;
    av.dom.autoUpdateRadio.checked = true;
  };
};

// should really be in a ui code section
// http://stackoverflow.com/questions/7125453/modifying-css-class-property-values-on-the-fly-with-javascript-jquery
av.ptd.setStyle = function (cssText) {
  var sheet = document.createElement('style'), isIE = false;
  sheet.type = 'text/css';
  /* Optional */ window.customSheet = sheet;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
  try{sheet.cloneNode(false).appendChild(document.createTextNode(''));}
  catch(err){isIE = true;}
  var wrapper = isIE ? document.createElement('div') : sheet;
  return (setStyle = function(cssText, node) {
    if(!node || node.parentNode !== wrapper)
      node = wrapper.appendChild(document.createTextNode(cssText));
    else node.nodeValue = cssText;
    if (isIE) sheet.styleSheet.cssText = wrapper.innerHTML;
    return node;
  })(cssText);
};

//----------------------------------------------------------------------------------------------------------------------

