  // *********************************************************************************************************************
  //                                       Population page script
  // *********************************************************************************************************************
  // ptd = PeTri Dish
  var av = av || {};  //incase av already exists
  var dojo = dojo || {};  //incase av already exists
  var dijit = dijit || {};  //incase av already exists

  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.makePauseState'); }
    av.ptd.makePauseState = function () {
    dijit.byId('mnCnPause').attr('disabled', true);
    dijit.byId('mnCnRun').attr('disabled', false);
    dijit.byId('mnCnOne').attr('disabled', false);
    //console.log('pauseState; button=run');
    av.dom.runStopButton.textContent = 'Run';
    av.dom.oneUpdateButton.disabled = false;
  };

  //change what buttons work in the user interface to be consistent with avida running on the population page.
  //probably should not be called until after program is sure that it is valid to start running, but it works this way
  //might change someday.
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


  //---------------------------------------------------------------------------------------- av.ptd.popRunningStateUi --
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
    $('#mutePopSlide').slider({disabled: true});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
    av.dom.sizeCols.disabled = true;
    av.dom.sizeRows.disabled = true;

    av.dom.mutePopInput.disabled= true;

    av.dom.childParentRadio.disabled = true;
    av.dom.childRandomRadio.disabled = true;
    
    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = true;
      document.getElementById(tsk+'_regionLayout').disabled = true;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = true;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = true;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = true;
      document.getElementById(tsk+'_periodTimeHolder').disabled = true;
      document.getElementById(tsk+'_initialHiNp').disabled = true;
      for (var sub=0; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = true;
        //console.log('html:', tsk+sub+'supplyModifierSelect');
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = true;
        document.getElementById(tsk+sub+'periodNp').disabled = true;
        document.getElementById(tsk+sub+'hiSide').disabled = true;
        document.getElementById(tsk+sub+'initialHiNp').disabled = true;
        document.getElementById(tsk+sub+'initialLoNp').disabled = true;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = true;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = true;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = true;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = true;
      };
    };
    document.getElementById('allSugarGeometry').disabled = true;
    document.getElementById('allsugarsupplyTypeSlct').disabled = true;
    document.getElementById('allSugarRegionLayout').disabled = true;
    document.getElementById('allSugarModifier').disabled = true;
    document.getElementById('allSugarDetails').disabled = true;

    /*
     * These checkboxHolderes no longer exist; tiba delete by 2021
    av.dom.notose.disabled = true;
    av.dom.nanose.disabled = true;
    av.dom.andose.disabled = true;
    av.dom.ornose.disabled = true;
    av.dom.orose.disabled = true;
    av.dom.andnose.disabled = true;
    av.dom.norose.disabled = true;
    av.dom.xorose.disabled = true;
    av.dom.equose.disabled = true;
    */
    av.dom.experimentRadio.disabled = true;
    av.dom.demoRadio.disabled = true;

    //there will be a population so it can now be frozen.
    dijit.byId('mnFzPopulation').attr('disabled', false);
  };
  //------------------------------------------------------------------------------------ end av.ptd.popRunningStateUi --
  
  //-------------------------------------------------------------------------------------------- av.ptd.popNewExState --
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
    av.dom.sizeCols.disabled = false;
    av.dom.sizeRows.disabled = false;
    av.dom.mutePopInput.disabled = false;
    $('#mutePopSlide').slider({disabled: false});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
    av.dom.childParentRadio.disabled = false;
    av.dom.childRandomRadio.disabled = false;
    console.log('Avida-ED4: need to reset defaults on new Environmental seettings.');

    av.dom.experimentRadio.disabled = false;
    av.dom.demoRadio.disabled = false;

    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = false;
      document.getElementById(tsk+'_regionLayout').disabled = false;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = false;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = false;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = false;
      document.getElementById(tsk+'_periodTimeHolder').disabled = false;
      document.getElementById(tsk+'_initialHiNp').disabled = false;
      //clear the resource series graphs
      av.pch.resrcGlobal[tsk] = [];
      for (var sub=1; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = false;
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = false;
        document.getElementById(tsk+sub+'periodNp').disabled = false;
        document.getElementById(tsk+sub+'hiSide').disabled = false;
        document.getElementById(tsk+sub+'initialHiNp').disabled = false;
        document.getElementById(tsk+sub+'initialLoNp').disabled = false;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = false;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = false;
      };
    };

    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = false;
      document.getElementById(tsk+'_regionLayout').disabled = false;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = false;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = false;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = false;
      document.getElementById(tsk+'_periodTimeHolder').disabled = false;
      document.getElementById(tsk+'_initialHiNp').disabled = false;
      //clear the resource series graphs
      av.pch.resrcGlobal[tsk] = [];
      for (var sub=0; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = false;
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = false;
        document.getElementById(tsk+sub+'periodNp').disabled = false;
        document.getElementById(tsk+sub+'hiSide').disabled = false;
        document.getElementById(tsk+sub+'initialHiNp').disabled = false;
        document.getElementById(tsk+sub+'initialLoNp').disabled = false;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = false;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = false;
      };
    };
    document.getElementById('allSugarGeometry').disabled = false;
    document.getElementById('allsugarsupplyTypeSlct').disabled = false;
    document.getElementById('allSugarRegionLayout').disabled = false;
    document.getElementById('allSugarModifier').disabled = false;
    document.getElementById('allSugarDetails').disabled = false;
    console.log('environment settings should now be enabled ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


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
    //av.frd.avidaCFG2form(fileStr, 'av.ptd.popNewExState');
    av.dnd.ancestorBox.selectAll().deleteSelectedNodes();
    av.dnd.ancestorBox.sync();
    av.dnd.ancestorBoTest.selectAll().deleteSelectedNodes();
    av.dnd.ancestorBoTest.sync();
    av.dnd.gridCanvas.selectAll().deleteSelectedNodes();
    av.dnd.gridCanvas.sync();

    //Update data for Selected Organism Type
    av.dom.sotColorBox.style.backgroundColor = '#D7D7D7';
    av.dom.sotColorBox.style.border = '2px solid ' + '#D7D7D7';
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
    logTit0.textContent = '';
    logTit1.textContent = '';
    logTit2.textContent = '';
    logTit3.textContent = '';
    logTit4.textContent = '';
    logTit5.textContent = '';
    logTit6.textContent = '';
    logTit7.textContent = '';
    av.grd.flagSelected = false;
    dijit.byId('mnCnOrganismTrace').attr('disabled', true);
    dijit.byId('mnFzOrganism').attr('disabled', true);
  };

  //after Run button pushed for population
  av.ptd.runPopFn = function (from) {
    'use strict';
    if (av.debug.popCon) { console.log('popCon:', from, 'called av.ptd.runPopFn: runPopFn runState =', av.grd.runState); }
    console.log(from, 'called av.ptd.runPopFn: runPopFn runState =', av.grd.runState);
    //check for ancestor organism in configuration data
    var namelist;
    // used only for testing new dish configurations don't work in the current computer interface
    if ('test' == av.msg.setupType)
      namelist = dojo.query('> .dojoDndItem', 'ancestorBoTest'); 
    // normal end user version
    else
      //get a list of names of organisms that are in the starting population. 
      //works for both configured dishes and populated dishes
      namelist = dojo.query('> .dojoDndItem', 'ancestorBox');
    //console.log('namelist = namelist);
    if (1 > namelist.length) {
      //console.log('about to call av.ptd.makePauseState()');
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      //NeedAncestorDialog.show();
      av.dom.needAncestorModalID.style.display = 'block';
    }
    else if (!av.ptd.validGridSize) {
      console.log('not option: !av.ptd.validGridSize=', !av.ptd.validGridSize);
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      av.dom.userMsgLabel.innerHTML = 'A valid grid size is required before Avida will run';
      if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
    }
    else if (!av.ptd.validMuteInuput) {
      console.log('Not option: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      av.dom.userMsgLabel.innerHTML = 'A valid mutation rate is required before Avida will run';
      if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
    }
    else { // setup for a new run by sending config data to avida
      if (av.debug.popCon) console.log('else: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
      av.dom.userMsgLabel.innerHTML = '';
      // tiba: eventually put the 'av.ptd.makeRunState' here.

      if ('started' !== av.grd.runState) {
        if ('test' == av.msg.setupType) { 
          console.log('test files just allow edits directly to the environment file so rest of form is ignored');
          //get original files. 
          av.fwt.testForm2folder();
        }
        // 
        else {
          //collect setup data to send to avida in a normal run.  
          //Order matters. Files must be created first. Then files must be sent before some other stuff.
          av.fwt.form2cfgFolder();  //creates avida.cfg and environment.cfg and ancestor.txt and ancestors_manual.txt from form
        };
        if ('prepping' === av.grd.runState) {
           av.msg.importConfigExpr('av.ptd.runPopFn ln301');   // send importExpr message to avida
          //console.log('after calling av.msg.importConfigExpr');
          //used for configured dish
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
        //console.log('numver of ancestors =',av.pch.numDads, '; av.pch.dadFit=',av.pch.dadFit);
      }; // end if section to deal with starting a new run

      if (av.dom.autoPauseCheck.checked) {
        av.ui.autoStopFlag = true;                          // switching to using check box directly
        av.ui.autoStopValue = av.dom.autoPauseNum.value;    // swithcing to using dom value
        //console.log('stop at  = av.dom.autoPauseNum.value;
      };
      //console.log('before call av.ptd.makeRunState');
      av.ptd.makeRunState('av.ptd.runPopFn 338');
      //console.log('after call av.ptd.makeRunState');
      av.msg.stepUpdate();   //av.msg.doRunPause(av.fio);
      //console.log('after av.msg.stepUpdate');
    }
    if (av.debug.popCon) console.log('end of av.ptd.runPopFn 331');
    //update screen based on data from C++
  };
  //---------------------------------------------------------------------------------------- end av.ptd.popNewExState --

  //------------------------------------------------------------------------------------------------ av.ptd.runStopFn --
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
  //-------------------------------------------------------------------------------------------- end av.ptd.runStopFn --

  //--------------------------------------------------------------------------------------------------------------------
  // Freezer Button functions
  //--------------------------------------------------------------------------------------------------------------------

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

  //get a name for the new config file for the freezer
  av.ptd.FrConfigFn = function (from) {
    'use strict';
    console.log(from, ' called av.ptd.FrConfigFn');
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
        av.fwt.makeFzrConfig(av.fzr.cNum, 'av.ptd.FrConfigFn');
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
        av.fwt.makeFzrWorld(av.fzr.wNum, 'av.ptd.FrPopulationFn');
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
    av.grd.popChartFn('av.ptd.bitToggle');
    //console.log('bitToggle: av.grd.popStatsMsg.update', av.grd.popStatsMsg.update);
    av.ptd.updateLogicFn(av.grd.popStatsMsg.update);
  };

  //reset values
  av.ptd.resetDishFn = function (need2sendRest2avida) { //Need to reset all settings to @default
    'use strict';
    // send reset to Avida adaptor
    //if (need2sendRest2avida) {av.msg.reset();} //Take this out if we only reset when avida resets After sending a request for reset.

    var Tsk;
    console.log('in resetDishFn');
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
      av.dom.autoPauseCheck.checked = false;
      av.dom.autoPauseNum.value = av.ptd.autoPauseUpdate;

    av.ptd.clearLogicButtons();
    //console.log('fzr.activeCon', av.fzr.actConfig);

    // re-write grid if that page is visible
    av.grd.drawGridSetupFn('av.ptd.resetDishFn');

    // reset resource values.
    for (var ii=0; ii < av.sgr.numTasks; ii++) {
      Tsk = av.sgr.logicTitleNames[ii];
      document.getElementById('mx'+Tsk).innerHTML = '';
      document.getElementById('cell'+Tsk).innerHTML = '';
      document.getElementById('tot'+Tsk).innerHTML = '';
    };
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

