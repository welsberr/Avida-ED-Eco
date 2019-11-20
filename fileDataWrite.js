//write file data
var av = av || {};  //incase av already exists

av.fwt.deleteFzrFile = function (fileId) {
  'use strict';
  try { delete av.fzr.file[fileId];}
  catch(e) {av.fzr.file[fileId] = undefined; }
};

av.fwt.deleteFzrItem = function (fileId) {
  'use strict';
  try { delete av.fzr.item[fileId];}
  catch(e) {av.fzr.item[fileId] = undefined; }
};

av.fwt.makeEmDxFile = function (path, contents) {
  'use strict';
/*
  //Dexie is not currently in use
  av.fio.dxdb.FILE_DATA.add( {
      timestamp: Date.now(),  //We may need to do more work with this property
      //contents: utf8bytesEncode(contents),
      mode: 33206
    },
    path
  ).then(function () {
      console.log('Able to add file ', path);
    }).catch(function (err) {
      console.log('Unable to add file, path',path, '; error', err);
    });
    */
};

//kept this one line function in case we need to go to storing the workspace in a database instead of freezer memory
av.fwt.makeFzrFile = function (fileId, text, from) {
  'use strict';
  console.log(from, ' called av.fwt.makeFzrFile: fileID=',fileId);
  av.fzr.file[fileId] = text;
};

av.fwt.makeActConfigFile = function (fileId, text, from) {
  'use strict';
  console.log(from, ' called av.fwt.makeActConfigFile: fileID=', fileId);
  av.fzr.actConfig.file[fileId] = text;
};

// copy instruction set from default config.
av.fwt.makeFzrInstsetCfg = function (idStr) {
  'use strict';
  av.fzr.file[idStr + '/instset.cfg'] = av.fzr.file['c0/instset.cfg'];
};

av.fwt.makeFzrEventsCfgWorld = function (idStr) {
  'use strict';
  var txt = 'u begin LoadPopulation detail.spop' + '\n';
  txt += 'u begin LoadStructuredSystematicsGroup role=clade:filename=clade.ssg';
  av.fwt.makeFzrFile(idStr+'/events.cfg', txt, 'av.fwt.makeFzrEventsCfgWorld');
};

/*---------------------------------------------------------------------------------------- av.fwt.makeFzrPauseRunAt --*/

av.fwt.makeFzrPauseRunAt = function (idStr, from) {
  'use strict';
  console.log(from + ' called av.fwt.makeFzrPauseRunAt');
  var txt = av.dom.autoUpdateOnce.value.toString();
  // Is auto Update Radio button checked?
  if (av.dom.manualUpdateRadio.checked) {  //manually pause population
    txt = '-1';   //Manual Update
  }
  if (false) {av.fwt.makeActConfigFile('pauseRunAt.txt', txt, 'av.fwt.makeFzrPauseRunAt');}
  else {av.fwt.makeFzrFile(idStr+'/pauseRunAt.txt', txt, 'av.fwt.makeFzrPauseRunAt');}
};


av.fwt.makeFzrAvidaCfg = function (idStr, toActiveConfigFlag, from) {
  'use strict';
  if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAvidaCfg', '; col, row = ', av.dom.sizeCols.value, av.dom.sizeRows.value);
  //console.log('col; row', av.dom.sizeCols, av.dom.sizeRows);
  //console.log('col; row - text', av.dom.sizeCols.text, av.dom.sizeRows.text);
  //console.log('col; row - value', av.dom.sizeCols.value, av.dom.sizeRows.value);
  //console.log('col; row - HTML', av.dom.sizeCols.innerHTML, av.dom.sizeRows.innerHTML);
  var txt = 'WORLD_X ' + av.dom.sizeCols.value + '\n';
  txt += 'WORLD_Y ' + av.dom.sizeRows.value + '\n';
  txt += 'WORLD_GEOMETRY 1 \n';
  txt += 'COPY_MUT_PROB ' + document.getElementById('muteInput').value/100 + '\n';
  txt += 'DIVIDE_INS_PROB 0.0 \n';
  txt += 'DIVIDE_DEL_PROB 0.0 \n';
  txt += 'OFFSPRING_SIZE_RANGE 1.0 \n';
  // parents (ancestors) are injected into avida separately.
  if (av.dom.childParentRadio.checked) txt += 'BIRTH_METHOD 0 \n';  //near parent
  else txt += 'BIRTH_METHOD 4 \n';   //anywhere randomly
  if (av.dom.experimentRadio.checked) txt += 'RANDOM_SEED -1 \n';
  else txt += 'RANDOM_SEED 100\n';
  txt += '#include instset.cfg\n';
  txt += 'PRECALC_PHENOTYPE 1\n';
  txt += 'VERSION_ID 2.14.0 \n';
  console.log(from, ' called av.fwt.makeFzrAvidaCfg; idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
  if (toActiveConfigFlag) av.fwt.makeActConfigFile('avida.cfg', txt, 'av.fwt.makeFzrAvidaCfg');  // 
  else {av.fwt.makeFzrFile(idStr+'/avida.cfg', txt, 'av.fwt.makeFzrAvidaCfg');}
};

/*----------------------------------------------------------------------------------------- av.fwt.makeFzrAvidaTest --*/
av.fwt.makeFzrAvidaTest = function (idStr, toActiveConfigFlag, from) {
  'use strict';
  if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAvidaTest', '; col, row = ', av.dom.sizeCols.value, av.dom.sizeRows.value);
  var txt = 'WORLD_X ' + av.dom.sizeColTest.value + '\n';
  txt += 'WORLD_Y ' + av.dom.sizeRowTest.value + '\n';
  txt += 'WORLD_GEOMETRY 1 \n';
  txt += 'COPY_MUT_PROB ' + document.getElementById('muteInpuTest').value/100 + '\n';
  txt += 'DIVIDE_INS_PROB 0.0 \n';
  txt += 'DIVIDE_DEL_PROB 0.0 \n';
  txt += 'OFFSPRING_SIZE_RANGE 1.0 \n';
  // parents (ancestors) are injected into avida separately.
  if (av.dom.childParentRadiTest.checked) txt += 'BIRTH_METHOD 0 \n';  //near parent
  else txt += 'BIRTH_METHOD 4 \n';   //anywhere randomly
  txt += 'RANDOM_SEED ' + av.dom.randInpuTest.value + '\n';
  
  //if (av.dom.experimentRadiTest.checked) txt += 'RANDOM_SEED -1 \n';
  //else txt += 'RANDOM_SEED 100\n';
  txt += '#include instset.cfg\n';
  txt += 'PRECALC_PHENOTYPE 1\n';
  txt += 'VERSION_ID 2.14.0 \n';
  console.log(from, ' called av.fwt.makeFzrAvidaTest', '; col, row = ', av.dom.sizeCols.value, av.dom.sizeRows.value, '; toActiveConfigFlag', toActiveConfigFlag);
  if (toActiveConfigFlag) {av.fwt.makeActConfigFile('avida.cfg', txt, 'av.fwt.makeFzrAvidaTest');}  // always false for now 2017 July
  else {av.fwt.makeFzrFile(idStr+'/avida.cfg', txt, 'av.fwt.makeFzrAvidaTest');}
};

/*---------------------------------------------------------------------------------- end of av.fwt.makeFzrAvidaTest --*/

/*------------------------------------------------------------------------------------ av.fwt.makeFzrEnvironmentCfg --*/
// might not use
av.fwt.loadEnvDefaults = function (geometry, ndx, etsk) {
  var len; //var tmp;
  len = av.sgr.react_argu.length;
  for (var ii=0; ii< len; ii++) {
    av.nut[etsk].react[av.sgr.react_argu[ii]][ndx] = av.sgr.reacDefaultValu[ii];
  };
  if ('global' == geometry) {
    len = av.sgr.resrcAvidaDefaultArgu.length;
    for (var ii=0; ii< len; ii++) {
      av.nut[etsk].resrc[av.sgr.resrcAvidaDefaultArgu[ii]][ndx] = av.sgr.resrcAvidaDefaultGlobalValu[ii];
    };
  } // now for the 'grid' defaults
  else {
      av.nut[etsk].resrc[av.sgr.resrcAvidaDefaultLocalArgu[ii]][ndx] = av.sgr.resrcAvidaDefaultLocallValu[ii];    
  };
};

av.fwt.form2Nutrients = function() {
  console.log('in av.fwt.form2Nutrients');
  var tsk; var etsk; var atsk; var domName; 
  var len = 1;
  var numtasks = av.sgr.logEdNames.length;
  for (var ii=0; ii< numtasks; ii++) {
    etsk = av.sgr.logEdNames[ii];
    tsk = av.sgr.logicNames[ii];
    atsk = av.sgr.logicVnames[ii];
    domName = tsk + '0geometry';
    av.nut[etsk].geometry = document.getElementById(domName).value;
    av.nut[etsk].regionLayout = document.getElementById(tsk +'0dishRegion').value.toLowerCase();
    if ('global' == av.nut[etsk].geometry.toLowerCase()) {
      
        av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //technically name is not an argument, but it starts the list. 
                            ,  'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                            , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                            , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                            ,'boxflag', 'boxx', 'boyy', 'boxcol', 'boxrow',     //theste are new for Avida-ED and not in the wiki. 
                            , 'region', 'side', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'

    }
    else {
      // local so there could be subdishes; later the number of subdishes will come from av.dom.orn0dishRegion.value
      // for now there is just one option, the whole dish so len = 1
      for (sub = 1; sub <= 1; sub++) {   //yes this loop starts at 1 instead of zero
        av.nut[etsk].supply[sub] = document.getElementById(tsk + sub +'supplyType').value.toLowerCase();
        av.nut[etsk].resrc.initial[sub]
        av.nut[etsk].supplyType[0] = document.getElementById(tsk + '0supplyType').value.toLowerCase();
        av.nut[etsk].resrc.name = tsk + '00'  // this may change later
        av.nut[etsk].resrc.initial[0] = 0;  //different if finite
        av.nut[etsk].resrc.xdiffuse = 0;
        av.nut[etsk].resrc.ydiffuse = 0;
      };
    };
  };
};

av.fwt.form2NutrientStruct = function (from) {
  av.fzr.clearEnvironment('av.fwt.form2NutrientStruct');
  //I don't think I will use this here.  In this situation, all data should be directly from the dom.
  //av.fwt.loadEnvDefaults('global', ndx, etsk);   
  console.log(from, 'called av.fwt.form2NutrientStruct; av=', av);
  
  //------ assign ui parameters first --
  var tsk; //name of a task with 3 letters
  var numtsk; //number prefix to put in Avida-ED order before 3 letter prefix
  var arguName;  // argument name
  var logiclen = av.sgr.logicNames.length;
  var uiAllDishLen = av.sgr.ui_allDish_argu.length;
  for (var ii=0; ii< logiclen; ii++) {      //9
    numtsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
    tsk = av.sgr.logicNames[ii];      //3 letter logic names
    // need an argument list to hold data relevant to getting data from dom or need to do each individually
    for (jj=0; jj < uiAllDishLen; jj++) {
      arguName = av.sgr.ui_allDish_argu[jj];
      console.log('ii='+ii+'; jj='+jj, '; av.nut['+numtsk+'].ui['+arguName+']=', 'dom of', tsk+'0'+arguName);
      console.log(document.getElementById(tsk+'0'+arguName).value);
      av.nut[numtsk].ui[arguName] = document.getElementById(tsk+'0'+arguName).value;
    };

    
  };

  
};


av.fwt.form2NutrientTxt = function (idStr, toActiveConfigFlag, from) {
  console.log(from + ' called av.fwt.form2NutrientTxt');
  var geometry = 'Global';
  var supplyType = 'Infinite';
  var ndx = 1;           // only using the first subsection for now
  var tsk; var etsk; var atsk;
  var regionCode = '00';
  var regionName = 'Whole Dish';
  var region_ndx = 1;
  var domName; 
  var sgrPerCell =1;
  var regionInit = 1;
  var rname = 'unk';
  var numtasks = av.sgr.logEdNames.length;
  var txt = '';
  var cols = 1 ; var rows = 1; var numCells = 1; 
  
  //Find grid size;
  cols = Number(av.dom.sizeCols.value);
  rows = Number(av.dom.sizeRows.value);
  numCells = cols * rows; 
  //console.log('cols=', av.dom.sizeCols.value, '; rows=', av.dom.sizeRows.value, '; numDCells=',  numCells);

  
  for (var ii=0; ii< numtasks; ii++) {
  //for (var ii=0; ii< 0; ii++) {
    etsk = av.sgr.logEdNames[ii];
    tsk = av.sgr.logicNames[ii];
    atsk = av.sgr.logicVnames[ii];
    domName = tsk + '0geometry';
    geometry = document.getElementById(domName).value;
    //console.log('domName=', domName, '; value=', geometry);
    if ('global' == geometry.toLowerCase()) {
      regionName = 'Whole Dish';           //alway the case for global.
      region_ndx = av.sgr.regionCodes.indexOf(regionName);
      regionCode = '00';
      rname = tsk + regionCode;
      supplyType = document.getElementById(tsk+'0supplyType').value.toLowerCase();
      //console.log('regionCode=', regionCode, '; regionName=', regionName, '; rname=', rname, '; suppplyType=', supplyType);      
      switch (supplyType) {
        case 'none':
          txt += 'REACTION ' + rname + ' ' + atsk + ' process:value=0:type=pow  requisite:max_count=1\n';
          break;
        case 'infinite':
          txt += 'REACTION ' + rname + ' ' + atsk + ' process:value=' + av.sgr.reactValues[ii] + ':type=pow  requisite:max_count=1\n';
          break;
      }; // end of glbal switch
    }
    else {   // local   using avida defaults for now will separate out diffusion later.    
      ndx = 1;   // only doing the first subsection for now
      regionName = document.getElementById(tsk+ndx+'title').textContent;
      region_ndx = av.sgr.regionNames.indexOf(regionName);
      regionCode = av.sgr.regionCodes[region_ndx];
      rname = tsk + regionCode;
      supplyType = document.getElementById(tsk+ndx+'supplyType').value.toLowerCase();
      //console.log('regionCode=', regionCode, '; regionName=', regionName, '; rname=', rname, '; suppplyType=', supplyType);
      switch (supplyType) {
        case 'none':
          txt += 'RESOURCE ' + rname + ':geometry=grid:initial=0' + ' \n';
          txt += 'REACTION ' + rname + ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:max=1:min=1  requisite:max_count=1 \n';
          break;
        case 'infinite':
          txt += 'RESOURCE ' + rname + ':geometry=grid:initial=' + numCells + ' \n';   //cells should have one, but not deplete any
          txt += 'REACTION ' + rname +  ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:depletable=0 requisite:max_count=1 \n';
          break;
        case 'finite':
          // later will get from av.nut
          sgrPerCell = Number(document.getElementById(tsk+ndx+'initialHiInput').value);
          regionInit = numCells * sgrPerCell;
          console.log('tsk=',tsk,'; ndx=',ndx,'; sgrPerCell=', sgrPerCell, '; diffusion checkbox = ', document.getElementById(tsk+ndx+'diffuseCheck').checked );
          txt += 'RESOURCE ' + rname + ':geometry=grid:initial=' + regionInit + ' \n';
          txt += 'REACTION ' + rname +  ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:max=1:min=1 requisite:max_count=1 \n';
          break;
      };  // end of LOCAL swtich
    };
    
  }// end of loop to go thru all the logic functions. 
  //console.log('txt=', txt);
  //console.log('av.oldnut=',av.oldnut);
  console.log('very tired: av.nut=',av.nut);
  console.log('av.fzr=', av.fzr);
//  if ('cfg'==idStr) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.form2NutrientTxt');  // 
  if (toActiveConfigFlag) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.form2NutrientTxt');  // 
  else {av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.form2NutrientTxt');}
};


av.fwt.makeFzrEnvironmentCfg = function (idStr, toActiveConfigFlag, from) {
  'use strict';
  if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrEnvironmentCfg; idStr=', idStr);
  av.fwt.form2NutrientStruct('av.fwt.makeFzrEnvironmentCfg');
  
  //will change to av.fwt.nutStruct2Nuttxt later;x
  av.fwt.form2NutrientTxt(idStr, toActiveConfigFlag, 'av.fwt.makeFzrEnvironmentCfg');  
};

/*--------------------------------------------------------------------------------- av.fwt.makeFzrOldEnvironmentCfg --*/
av.fwt.makeFzrOldEnvironmentCfg = function (idStr, from) {
  'use strict';
  if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrOldEnvironmentCfg');
  var txt = '';
  if (av.dom.notose.checked) txt += 'REACTION  NOT  not   process:value=1:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  NOT  not   process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.nanose.checked) txt += 'REACTION  NAND nand  process:value=1:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  NAND nand  process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.andose.checked) txt += 'REACTION  AND  and   process:value=2:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  AND  and   process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.ornose.checked) txt += 'REACTION  ORN  orn   process:value=2:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  ORN  orn   process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.orose.checked)  txt += 'REACTION  OR   or    process:value=3:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  OR   or    process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.andnose.checked) txt += 'REACTION  ANDN andn  process:value=3:type=pow  requisite:max_count=1\n'; else txt += 'REACTION  ANDN andn  process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.norose.checked) txt += 'REACTION  NOR  nor   process:value=4:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  NOR  nor   process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.xorose.checked) txt += 'REACTION  XOR  xor   process:value=4:type=pow  requisite:max_count=1\n';  else txt += 'REACTION  XOR  xor   process:value=0:type=pow  requisite:max_count=1\n';
  if (av.dom.equose.checked) txt += 'REACTION  EQU  equ   process:value=5:type=pow  requisite:max_count=1';    else txt += 'REACTION  EQU  equ   process:value=0:type=pow  requisite:max_count=1';
  if (true) {av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.makeFzrOldEnvironmentCfg');}
  else  { av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.makeFzrOldEnvironmentCfg');}
};

/*----------------------------------------------------------------------------------- av.fwt.makeFzrEnvironmentTest --*/
av.fwt.makeFzrEnvironmentTest = function (idStr, from) {
  'use strict';
  if (av.debug.fio) console.log(from, 'called av.fwt.makeFzrEnvironmentTest');
 
  var txt = av.dom.environConfigEdit.value;
  
  if (true) {av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.makeFzrEnvironmentTest');}
  else  { av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.makeFzrEnvironmentTest');}
};

/*----------------------------------------------------------------------------------- av.fwt.makeFzrEnvironmentTest --*/

av.fwt.makeFzrAncestorAuto = function (idStr, toActiveConfigFlag, from) {
  'use strict';
  if (av.debug.fio) console.log(from, ' av.fwt.makeFzrAncestorAuto');
  console.log(from, ' called av.fwt.makeFzrAncestorAuto: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
  var txt = '';
  var lngth = av.parents.autoNdx.length;
  for (var ii = 0; ii < lngth; ii++) {
    txt += av.parents.name[av.parents.autoNdx[ii]] + '\n';
    txt += av.parents.genome[av.parents.autoNdx[ii]] + '\n';
  }
  if (toActiveConfigFlag) {av.fwt.makeActConfigFile('ancestors.txt', txt, 'av.fwt.makeFzrAncestorAuto');}
  else {av.fwt.makeFzrFile(idStr+'/ancestors.txt', txt), 'av.fwt.makeFzrAncestorAuto';}
};

av.fwt.makeFzrAncestorHand = function (idStr, toActiveConfigFlag, from) {
  'use strict';
  //if (av.debug.fio) 
    console.log(from, ' called av.fwt.makeFzrAncestorHand: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
  var txt = '';
  var lngth = av.parents.handNdx.length;
  for (var ii = 0; ii < lngth; ii++) {
    txt += av.parents.name[av.parents.handNdx[ii]] + '\n';
    txt += av.parents.genome[av.parents.handNdx[ii]] + '\n';
    txt += av.parents.col[av.parents.handNdx[ii]] + ',' + av.parents.row[av.parents.handNdx[ii]] + '\n';
  }
  if (toActiveConfigFlag) {av.fwt.makeActConfigFile('ancestors_manual.txt', txt, 'av.fwt.makeFzrAncestorHand');}
  else {av.fwt.makeFzrFile(idStr+'/ancestors_manual.txt', txt, 'av.fwt.makeFzrAncestorHand');}
};

av.fwt.makeFzrTRfile = function (path, data) {
  var text = '';
  var pairs = [];
  var dataLn = data.length;
  for (var ii = 0; ii < dataLn; ii++) {
    pairs[ii] = ii + ':' + data[ii];
  }
  text = pairs.join();
  //console.log(path, text);
  av.fwt.makeFzrFile(path, text, 'av.fwt.makeFzrTRfile');
};

//Never called as of 2019 Oct 2; Delete??
av.fwt.makeFzrTimeRecorder = function (fname, data) {
  var text='';
  var lngth = data.length-1;
  //console.log('lngth', lngth);
  for (ii=0; ii < lngth; ii++) {
    text += ii + ':' + data[ii] + ',';
  }
  lngth++;
  text += lngth + ':' + data[lngth];
  av.fwt.makeFzrTRfile(fname, text, 'av.fwt.makeFzrTimeRecorder');
};

// --------------------------------------------------- called by other files -------------------------------------------
//Setup to active folder just before sending to avida
av.fwt.form2cfgFolder = function() {
  'use strict';
  var toActiveConfigFlag = true; // true is to Config spot for experiment; false is to Freezer
  av.fwt.makeFzrAvidaCfg('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrEnvironmentCfg('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrAncestorAuto('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrAncestorHand('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
};

//test setup to active folder just before sending to avida
av.fwt.testForm2folder = function() {
  'use strict';
  var toActiveConfigFlag = true; // true is to Config spot for experiment; false is to Freezer
  av.fwt.makeFzrAvidaTest('cfg', 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrEnvironmentTest('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrAncestorAuto('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  av.fwt.makeFzrAncestorHand('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');  
};

//making a freezer file not an active file
av.fwt.makeFzrConfig = function (num, from) {
  'use strict';
  console.log(from, 'called av.fwt.makeFzrConfig');
  var toActiveConfigFlag = false; // true is to Config spot for experiment; false is to Freezer
  
  // or should we just copy the files from Active Config to the the freezer index?
  av.fwt.makeFzrAvidaCfg('c'+num, toActiveConfigFlag, 'av.fwt.makeFzrConfig');
  av.fwt.makeFzrEnvironmentCfg('c'+num, toActiveConfigFlag, 'av.fwt.makeFzrConfig');

  av.fwt.makeFzrFile('c'+num+'/events.cfg', '', 'av.fwt.makeFzrConfig');
  //av.fwt.makeFzrFile('c'+num+'/entryname.txt', av.fzr.config[ndx].name);  // this was created in dnd menu code
  av.fwt.makeFzrInstsetCfg('c'+num);
  av.fwt.makeFzrAncestorAuto('c'+num, toActiveConfigFlag, 'av.fwt.makeFzrConfig');
  av.fwt.makeFzrAncestorHand('c'+num, toActiveConfigFlag, 'av.fwt.makeFzrConfig');
  av.fwt.makeFzrPauseRunAt('c'+num, 'av.fwt.makeFzrConfig');
};

av.fwt.makeFzrWorld = function (num, from) {
  'use strict';
   var toActiveConfigFlag = false; // true is to Config spot for experiment; false is to Freezer

  console.log(from, 'called av.fwt.makeFzrWorld');
  av.fwt.makeFzrAvidaCfg('w'+num, toActiveConfigFlag, 'av.fwt.makeFzrWorld');
  av.fwt.makeFzrEnvironmentCfg('w'+num, toActiveConfigFlag, 'av.fwt.makeFzrWorld');
  //console.log('after av.fwt.makeFzrEnvironmentCfg in av.fwt.makeFzrWorld');
  av.fwt.makeFzrEventsCfgWorld('w'+num);
  //av.fwt.makeFzrFile('c'+num+'/entryname.txt', av.fzr.config[ndx].name);  // this was created in dnd menu code
  av.fwt.makeFzrInstsetCfg('w'+num);
  av.fwt.makeFzrAncestorAuto('w'+num, toActiveConfigFlag, 'av.fwt.makeFzrWorld');
  av.fwt.makeFzrAncestorHand('w'+num, toActiveConfigFlag, 'av.fwt.makeFzrWorld');
  av.fwt.makeFzrTRfile('w'+num+'/tr0', av.pch.aveFit);
  av.fwt.makeFzrTRfile('w'+num+'/tr1', av.pch.aveCst);
  av.fwt.makeFzrTRfile('w'+num+'/tr2', av.pch.aveEar);
  av.fwt.makeFzrTRfile('w'+num+'/tr3', av.pch.aveNum);
  av.fwt.makeFzrTRfile('w'+num+'/tr4', av.pch.aveVia);
  av.fwt.makeFzrFile('w'+num + '/update', av.grd.updateNum.toString(), 'av.fwt.makeFzrWorld' );
  av.fwt.makeFzrCSV('w'+num);
};

av.fwt.popExpWrite = function (msg) {
  'use strict';
  //console.log('exportExpr', msg);
  //assume last world for now.
  var lngth = msg.files.length;
  for (var ii = 0; ii < lngth; ii++) {
    switch (msg.files[ii].name) {
      case 'clade.ssg':
      case 'detail.spop':
      case 'instset.cfg':
      case 'events.cfg':
      case 'environment.cfg':
      case 'avida.cfg':
        console.log('ii', ii, '; name', msg.files[ii].name);
        av.fwt.makeFzrFile(msg.popName + '/' + msg.files[ii].name, msg.files[ii].data, 'av.fwt.popExpWrite');
        break;
    };
  };
  //console.log('fzr', av.fzr.file);
};

av.fwt.removeFzrConfig = function(dir) {
  'use strict';
  av.fwt.deleteFzrFile(dir+'/ancestors.txt');
  av.fwt.deleteFzrFile(dir+'/ancestors_manual.txt');
  av.fwt.deleteFzrFile(dir+'/avida.cfg');
  av.fwt.deleteFzrFile(dir+'/environment.cfg');
  av.fwt.deleteFzrFile(dir+'/events.cfg');
  av.fwt.deleteFzrFile(dir+'/entryname.txt');
  av.fwt.deleteFzrFile(dir+'/instset.cfg');
  var domid = av.fzr.domid[dir];
  delete av.fzr.domid[dir];
  delete av.fzr.dir[domid];
};

av.fwt.removeFzrGenome = function (dir) {
  'use strict';
  av.fwt.deleteFzrFile(dir+'/entryname.txt');
  av.fwt.deleteFzrFile(dir+'/genome.seq');
  var domid = av.fzr.domid[dir];
  delete av.fzr.domid[dir];
  delete av.fzr.dir[domid];
  //console.log('after remove genome: dir', dir, '; av.fzr', av.fzr);
};

av.fwt.removeFzrWorld = function (dir) {
  'use strict';
  av.fwt.deleteFzrFile(dir+'/ancestors.txt');
  av.fwt.deleteFzrFile(dir+'/ancestors_manual.txt');
  av.fwt.deleteFzrFile(dir+'/avida.cfg');
  av.fwt.deleteFzrFile(dir+'/environment.cfg');
  av.fwt.deleteFzrFile(dir+'/events.cfg');
  av.fwt.deleteFzrFile(dir+'/entryname.txt');
  av.fwt.deleteFzrFile(dir+'/instset.cfg');
  av.fwt.deleteFzrFile(dir+'/update');
  var domid = av.fzr.domid[dir];
  delete av.fzr.domid[dir];
  delete av.fzr.dir[domid];
  //av.fwt.deleteFzrFile(dir+'/');
  //av.fwt.deleteFzrFile(dir+'/');
};

av.fwt.removeFzrItem = function(dir, type){
  'use strict';
  //console.log('dir', dir, '; type', type, '; dir0', dir[0]);
  switch (type){
    case 'c':
      av.fwt.removeFzrConfig(dir);
      break;
    case 'g':
      av.fwt.removeFzrGenome(dir);
      break;
    case 'w':
      av.fwt.removeFzrWorld(dir);
      break;
  };
};

av.fwt.makeFzrCSV = function(idStr) {
  "use strict";
  console.log('name is ', idStr + '/entryname.txt');
  var fileNm = av.fzr.file[idStr + '/entryname.txt'];
  console.log('fileName = ', fileNm, '; idStr=', idStr,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  av.fwt.makeCSV(fileNm);
  // only ever makes in the active Config area
  if (false) {av.fwt.makeActConfigFile('/timeRecorder.csv', av.fwt.csvStrg, 'av.fwt.popExpWrite');}
  else {av.fwt.makeFzrFile(idStr+'/timeRecorder.csv', av.fwt.csvStrg, 'av.fwt.popExpWrite');}  
  //  av.fwt.makeFzrFile(path, text);

};

av.fwt.writeCurrentCSV = function(idStr) {  
  "use strict";
  av.fwt.makeCSV(idStr);
  av.fio.fzSaveCsvfn();
};

av.fwt.makeCSV = function(fileNm) {
  'use strict';
  if ('populationBlock' === av.ui.page) {
    //  '@default at update 141 Average Fitness,@default at update 141 Average Gestation Time,' +
    //  '@default at update 141 Average Energy Acq. Rate,@default at update 141 Count of Organisms in the World';
    av.fwt.csvStrg = '# Name = ' + fileNm + '\n';
    av.fwt.csvStrg += '# Functions = ' + av.grd.selFnBinary + ' = ' + av.grd.selFnText + ' are picked \n'
      + '# FitP = Average Fitness of Viable Population \n'
      + '# CstP = Average Offspring Cost of Viable Population \n'
      + '# EarP = Average Energy Acquisition Rate of Viable Population \n'
      + '# NumP = Total Polution Size \n'
      + '# ViaP = Viable Population Size \n'
      + '# FitF = Average Fitness of avidians performing picked functions \n'
      + '# CstF = Average Offspring Cost avidians performing picked functions \n'
      + '# EarF = Average Energy Acquisition Rate avidians performing functions \n'
      + '# NumF = Number of avidians performing picked functions \n'
      + '# columns for statistics for each ancestor (up to 16) will follow. Each column will use 3 letters for the \n'
      + '# data type followed by _##; where the number with a leading zero is for each ancestor \n';

    for (var ii = 0; ii < av.pch.numDads; ii++) {
      av.fwt.csvStrg += '# ancestor ' + (ii).pad() + ' is ' + av.parents.name[ii] + '\n';
    };

    av.fwt.csvStrg += 'Update,'
      + 'FitP,'
      + 'CstP,'
      + 'EarP,'
      + 'NumP,'
      + 'ViaP,'
      + 'FitF,'
      + 'CstF,'
      + 'EarF,'
      + 'NumF,';

    for (var ii = 0; ii < av.pch.numDads; ii++) {
      //av.fwt.csvStrg += 'Fit_' + av.parents.name[ii] + ',';
      //av.fwt.csvStrg += 'Cst_' + av.parents.name[ii] + ',';
      //av.fwt.csvStrg += 'Ear_' + av.parents.name[ii] + ',';
      //av.fwt.csvStrg += 'Num_' + av.parents.name[ii] + ',';
      //av.fwt.csvStrg += 'Via_' + av.parents.name[ii] + ',';
      av.fwt.csvStrg += 'Fit_' + (ii).pad() + ',';
      av.fwt.csvStrg += 'Cst_' + (ii).pad() + ',';
      av.fwt.csvStrg += 'Ear_' + (ii).pad() + ',';
      av.fwt.csvStrg += 'Num_' + (ii).pad() + ',';
      av.fwt.csvStrg += 'Via_' + (ii).pad() + ',';
    }

    var lngth = av.pch.aveFit.length;
    for (var update = 0; update < lngth; update++) {
      av.fwt.csvStrg += '\n' + update + ',' + av.pch.aveFit[update] + ',' + av.pch.aveCst[update] + ','
        + av.pch.aveEar[update] + ',' + av.pch.aveNum[update] + ',' + av.pch.aveVia[update] + ','
        + av.pch.logFit[update] + ',' + av.pch.logCst[update] + ',' + av.pch.logEar[update] + ',' + av.pch.logNum[update] + ',';

      for (var kk = 0; kk < av.pch.numDads; kk++) {
        av.fwt.csvStrg += av.pch.dadFit[av.parents.name[kk]][update] + ',';
        av.fwt.csvStrg += av.pch.dadCst[av.parents.name[kk]][update] + ',';
        av.fwt.csvStrg += av.pch.dadEar[av.parents.name[kk]][update] + ',';
        av.fwt.csvStrg += av.pch.dadNum[av.parents.name[kk]][update] + ',';
        av.fwt.csvStrg += av.pch.dadVia[av.parents.name[kk]][update] + ',';
      }
    }
    //string completed
  }
  else if ('analysisBlock' === av.ui.page) {
    var longest = 0;
    av.fwt.csvStrg = 'Update';
    for (var ii = 0; ii < 3; ii++) {
      if (0 < document.getElementById('popDish' + ii).textContent.length) {
        av.fwt.csvStrg += ', "' + document.getElementById('popDish' + ii).textContent + ' Ave Fitness' + '"';
        av.fwt.csvStrg += ', "' + document.getElementById('popDish' + ii).textContent + ' Ave Offspring Cost' + '"';
        av.fwt.csvStrg += ', "' + document.getElementById('popDish' + ii).textContent + ' Ave Energy Acq. Rate' + '"';
        av.fwt.csvStrg += ', "' + document.getElementById('popDish' + ii).textContent + ' Pop Size' + '"';
        av.fwt.csvStrg += ', "' + document.getElementById('popDish' + ii).textContent + ' Viable Size' + '"';
        if (longest < av.fzr.pop[ii].fit.length) longest = av.fzr.pop[ii].fit.length;
      }
    }
    for (var ii = 0; ii < longest; ii++) {
      av.fwt.csvStrg += '\n' + ii;
      for (var jj = 0; jj < 3; jj++)
      if (0 < document.getElementById('popDish' + jj).textContent.length) {
        if (ii < av.fzr.pop[jj].fit.length) {
          av.fwt.csvStrg += ', ' + av.fzr.pop[jj].fit[ii]
                          + ', ' + av.fzr.pop[jj].ges[ii]
                          + ', ' + av.fzr.pop[jj].met[ii]
                          + ', ' + av.fzr.pop[jj].num[ii]
                          + ', ' + av.fzr.pop[jj].via[ii];
        }
        else av.fwt.csvStrg += ', , , , , ';
      }
    }
  }
  //console.log(av.fwt.csvStrg);
};


/***********************************************************************************************************************
                                  Notes about problems saving in Safari
/***********************************************************************************************************************
 Notes on saving files in Safari.
 http://jsfiddle.net/B7nWs/  works on Safari in jsfiddle
 works in Avida-ED for PDF, but gives the following error
 [Error] Failed to load resource: Frame load interrupted (0, line 0)
 works in pdf file, but can’t seem to get with text I generate.

 /works in safari – does not open blank tab. Callbacks do not work.
 av.fio.writeSafari = function (tmpUrl) {
    //http://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/
$.fileDownload('http://jqueryfiledownload.apphb.com/FileDownload/DownloadReport/0', {
      //$.fileDownload(tmpUrl, {
      successCallback: function (url) {
        alert('You just got a file download dialog or ribbon for this URL :' + url);
      },
      failCallback: function (html, url) {
        alert('Your file download just failed for this URL:' + url + '\r\n' + 'Here was the resulting error HTML: \r\n' + html
        );
      }
    });
  };

//works in safari for pdf files
http://jqueryfiledownload.apphb.com

//works in safari - opens a new blank tab and leaves it open after saving file called 'unknown'
//http://stackoverflow.com/questions/12802109/download-blobs-locally-using-safari
window.open('data:attachment/csv;charset=utf-8,' + encodeURI(av.debug.log));

http://stackoverflow.com/questions/23667074/javascriptwrite-a-string-with-multiple-lines-to-a-csv-file-for-downloading
https://adilapapaya.wordpress.com/2013/11/15/exporting-data-from-a-web-browser-to-a-csv-file-using-javascript/
http://jsfiddle.net/nkm2b/2/
$(fileDownloadButton).click(function () {
 //works in Safari, but opens a new tab which is blank and gets left open; file named 'unknown'
  var a = document.createElement('a');
  a.href     = 'data:attachment/csv,' + av.fwt.csvStrg;
  a.target   = '_blank';
  a.download = 'myFile.csv';
  document.body.appendChild(a);
  a.click();
});

  //Did not work in Safari works in Firefox
  var saveData = (function () {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([json], {type: 'octet/stream'}),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  var data = { x: 42, s: 'hello, world', d: new Date() },
    fileName = 'DianeFile.json';  //av.fio.userFname
  saveData(data, fileName);

//Does not work in safari
https://codepen.io/davidelrizzo/pen/cxsGb

// the statement pair below does not work in Safari. Opens tab with text data. does not save it.
// tab has randomvalue url name like blob:file:///705ac45f-ab49-40ac-ae9a-8b03797daeae
//http://stackoverflow.com/questions/18690450/how-to-generate-and-prompt-to-save-a-file-from-content-in-the-client-browser
 var blob = new Blob(['Hello, world!'], {type: 'text/plain;charset=utf-8'});
 saveAs(blob, 'helloWorld.txt');

//Does not work in Safari – opens tab with the string only
// http://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    var myCsv = 'Col1,Col2,Col3\nval1,val2,val3';
    window.open('data:text/csv;charset=utf-8,' + escape(myCsv));

//http://stackoverflow.com/questions/13405129/javascript-create-and-save-file
//does not work in chrome or safari I might not have it right
    var a = document.getElementById('a');
    var file = new Blob(['file text'], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'filename.txt';

//works in chrome, but not in safari
function download(text, name, type) {
    var a = document.createElement('a');
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  }
download('file text', 'myfilename.txt', 'text/plain')

//Does not work in Safari
var aFileParts = ['<a id='a'><b id='b'>hey!</b></a>'];
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
window.open(URL.createObjectURL(oMyBlob));

//does not work in safari does work in chrome
http://thiscouldbebetter.neocities.org/texteditor.html

//does not work in Safari
  var blob = new Blob([av.fwt.csvStrg], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, av.fio.csvFileName);};
 
 // http://stackoverflow.com/questions/30694453/blob-createobjecturl-download-not-working-in-firefox-but-works-when-debugging
 //Should work but I can get the right type for data
 function downloadFile(filename, data) {

    var a = document.createElement('a');
    a.style = 'display: none';
    var blob = new Blob(data, {type: 'application/octet-stream'});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){
      document.body.removeChild(a);    //does not remove blank tab
      window.URL.revokeObjectURL(url);
    }, 100);
  }

 //works in Firefox & safari. Lets you name the file in Firefox ,BUT
 // looses the line feeds so does not work for sv file.
 var a = document.createElement('a');
 a.href = 'data:attachment/csv,' + av.fwt.csvStrg;
 a.target = '_blank';
 a.download = av.fio.csvFileName;
 document.body.appendChild(a);
 a.click();

 // saves in safari - opens blank tab an leaves it open
 av.fwt.tryDown = function() {
    var ab = document.createElement('a');
    ab.href     = 'data:attachment/csv;charset=utf-8,' + encodeURI(av.debug.log);
    ab.target   = '_blank';
    ab.download = 'testfile.txt';
    document.body.appendChild(ab);
    ab.click();
    setTimeout(function(){
      document.body.removeChild(ab);
      window.URL.revokeObjectURL(ab.href);
    }, 100);
  }

 //window.open('data:attachment/csv;charset=utf-8,' + encodeURI(av.debug.log)); //also works, but creates odd file names.


 Places that say you cannot save non-text files from javascript in Safari
 https://github.com/wenzhixin/bootstrap-table/issues/2187
 http://www.html5rocks.com/en/tutorials/file/filesystem/

 ---------------------- look at -- could not get to load in Safari
 http://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/

***********************************************************************************************************************/
// http://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
/*
 function download(filename, text) {
 var pom = document.createElement('a');
 pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
 pom.setAttribute('download', filename);

 if (document.createEvent) {
 var event = document.createEvent('av.mouseEvents');
 event.initEvent('click', true, true);
 pom.dispatchEvent(event);
 }
 else {
 pom.click();
 }
 }
 */

/*
 //console.log('declaring window.downloadFile()');
 // http://pixelscommander.com/en/javascript/javascript-file-download-ignore-content-type/
 window.downloadFile = function(sUrl) {

 //If in Chrome or Safari - download via virtual link click
 if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
 //Creating new link node.
 var link = document.createElement('a');
 link.href = sUrl;

 if (link.download !== undefined){
 //Set HTML5 download attribute. This will prevent file from opening if supported.
 var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
 link.download = fileName;
 }

 //Dispatching click event.
 if (document.createEvent) {
 var e = document.createEvent('av.mouseEvents');
 e.initEvent('click' ,true ,true);
 link.dispatchEvent(e);
 return true;
 }
 }

 // Force file download (whether supported by server).
 var query = '?download';

 window.open(sUrl + query);
 }
*/

/**********************************************************************************************************************/
/* OpenJSCAD.org  There is a github site for this. 

Can apparently save files in Safari from javascript
  Used some ideas from here and I can save a file that is the correct size, but I still cannot read it.

  For saving look at:
 generateOutputFileBlobUrl: function() {
 if (OpenJsCad.isSafari()) {
 //console.log('Trying download via DATA URI');
 // convert BLOB to DATA URI
 var blob = this.currentObjectToBlob();
 var that = this;
 var reader = new FileReader();
 reader.onloadend = function() {
 if (reader.result) {
 that.hasOutputFile = true;
 that.downloadOutputFileLink.href = reader.result;
 that.downloadOutputFileLink.innerHTML = that.downloadLinkTextForCurrentObject();
 var ext = that.selectedFormatInfo().extension;
 that.downloadOutputFileLink.setAttribute('download','openjscad.'+ext);
 that.downloadOutputFileLink.setAttribute('target', '_blank');
 that.enableItems();
 }
 };
 reader.readAsDataURL(blob);

County data from https://web.co.orange.nc.us/pinmanagementweb/
  or https://web.co.orange.nc.us/PinManagementWeb/PinInquiry.aspx
     and https://gis.orangecountync.gov:8443/orangeNCGIS/default.htm
     and https://property.spatialest.com/nc/orange/#/property/69519
  these alas could also be useful 
    https://www.orangecountync.gov/2057/Download-GIS-Data
    https://www.orangecountync.gov/FAQ.aspx?TID=37
                  
  PIN = 9872217978 (inactive)
    size = 1 lot; date = 1901
    child PINs
      PIN = 9872217989 (inactive)
        size = 99.17 acre (John C Blackwood and Shelton Nunn listed)  
        date = 1981
        prior owner = Mattie E Blacwkood
        child PIN = 9872227017 (inactive) Aunt Mattie's house and land
          size = 103.19 acre
          date = 1901
          owners (1/8 each)
            Blackwood, John Council
            Blackwood, Samuel Joyner
            Blackwood, Robert Craig
            Blackwood, Linda
            Blackwood, Lewis Boone
            Nunn, Annie Virginia
            Nunn, William Shelton
            Nunn, Robert C
          other Parent PIN = 9872324017 (inactive)
            John Council Blackwood ETAL and William Shelton Nunn listed
            size = 2.01 acre
            prior owner = Mattie E Blacwkood
            date recorded = 1981_1108
            note: this PIN has only one child PIN = 9872227017
          Child PINs
            PIN = 9872312673 = was Mattie's house with 6 acres (now new house)
              address = 1020 New Hope Church Rd
              size = 6.25 to 6.5 acre
              Value = $715,100
            PIN = 9872227341 =  (inactive) other land (94.68 acre)
              size = 94.68 acres
              date recorded = 1982_0722
              owner = Blackwood John C ETAL
              child PINs
                PIN = 9872411905
                  size = 1.50 acre
                  date recorded = 1984_1011
                  owner = Department of Transportation
                  child PIN = 9871766139 Department of Transportation (lots of other parents) 
                PIN = 9872321355
                  size = 93.18 acre
                  date recorded = 1984_1011
                  owners = John C Blackwood ETAL & William S Nunn 
                  address = RT 2 New Hope Church Rd Box 1021
                  child PINs
                    PIN = 9872217422 (Active) woods to west of Mattie's house
                      size = 10 to 11.65
                      date recorded = 2006_0109
                      interest owners
                        5/16 John Council Blackwood 
                        3/16 John Council Blackwood 
                        2/16 John Council Blackwood (1/8) total = 10/16 or 5/8
                        2/16 Sheila N Bishop (1/8)
                        2/16 Sheila N Bishop (1/8) total = 1/4
                        1/16 Sam & MM Blackwood 
                        2/16 Saumual J Blackwood (1/8) total = 3/16
                        2/16 Sheldon Hrs Blackwood (1/8)
                        2/16 Annie Virginia Nunn (1/8)
                        2/16 Robert Craig Blackwood (1/8)
                      value = 5,900 (land only)
                    PIN = 9872223822 (inactive)
                      size = 62.2 acres
                      date recorded = 1901 0101
                      owner = Newllo L Teer Co
                    PIN = 9872326022 (Active) land between Mattie and Grandma's
                      size = 20.98 acres 
                      date recorded = 2006_0109
                      interest owners
                        5/16 John Council Blackwood 
                        3/16 John Council Blackwood 
                        2/16 John Council Blackwood (1/8) total = 10/16 or 5/8
                        2/16 Sheila N Bishop (1/8)
                        2/16 Sheila N Bishop (1/8) total = 1/4
                        1/16 Sam & MM Blackwood 
                        2/16 Saumual J Blackwood (1/8) total = 3/16
                        2/16 Sheldon Hrs Blackwood (1/8)
                        2/16 Annie Virginia Nunn (1/8)
                        2/16 Robert Craig Blackwood (1/8)
                      value = $9,279 (land only) by county              
      PIN = 9872410248 (inactive)
        size = 3.65 date = 1979; owner = John C. Blackwood
        child PINs
          PIN = 9872410384 (active)
            size = 0.92 acres
            address = 1113 New Hope Church Rd   Grandma Singly's house
            description = house by Tapps based on https://gis.orangecountync.gov:8443/orangeNCGIS/default.htm
            date recorded = 1982_1223
            owner = John C Blackwood
            finsished = 1264 sq ft; Grade C+05; 2B 1B; built 1968; $193,600; Stm/Hot Wtr
          PIN = 9872319289 (active)
            size = 0.92 acre
            address = 1107 New Hope Church Rd
            description = middle house based on https://gis.orangecountync.gov:8443/orangeNCGIS/default.htm
            date recorded = 1982_1223
            owner = John C Blackwood
            finished = 1328 sq ft; qualinty = Grade C+05; 3B 2B 1986 ~$193,000 Combo H&A
          PIN = 9872411178 (active)
            size = 0.98 acres
            description = house behind other two bassed on https://gis.orangecountync.gov:8443/orangeNCGIS/default.htm
            address = 1105 New Hope Church Rd
            date recorded = 1982_1223
            owner = John C Blackwood
            finished = 1306 sq ft; quality = Grade C+10; 3B 2B built 1988 ~$212,400 Combo H&A
          PIN = 9872317188 (inactive)
            size = 0.83 acre (3A)
            child PIN = 9872317185 (active)
              size = 1.45 acre 
              address = 1021 New Hope Church Rd 
              drawing of outline of John's house from https://property.spatialest.com/nc/orange/#/property/69519
                finished = 2772 sq ft; quality = Grade B-10; 3B 1.5B built 1963 $333,200; Combo H&A
              description = John's house based on https://gis.orangecountync.gov:8443/orangeNCGIS/default.htm 
              other parent PIN = 9872317043 (inactive)
                size = 0.62 acres
                date recorded = 1982_1105
                previouss owner = Robert A & Joy W Bonar
                address = 1723 New Hope Church Rd (of this lot only)
-------------
Other nearby propoety
  Homer Tapp's House = 1201 New Hope Church Rd
    PIN = 9872413444 (active)
    owner listed as Jack C. Tapp
    size = 5.03 acre
    value = $	468,300
 Jack C. Tapp PINs
  PIN = 9872413444 (Busy Bee Apiaries = house where we got permissoin to ride St Patrick)
                  
                  
                  
                  
  Brown's House (Bonnar's) includes the house
    addresss = 921/923 New Hope Church Rd
    PIN = 9871395706
    Acres = 12
    value = $656,600
  PIN = 9871399754; owner=Bonar Robert & Joy; acre = 80.42 Acres; date = 1901   
    child PIN = 9872317043 (became part of John C Blackwood's Lot)
    child PIN = 9872401210; Searle Properties 1986; 79.8 acres = subdivision
      1723 New Hope Church Rd (Bonars sold to Searle Properties)

PIN = 9872423009
  address = 4334 Vallie Hi Ln; Chapel Hill NC 27516-8191
  owner = Carolyn Blackwood
  lot = 3.35 acre
  finished = 2666 sq ft; quality = Grade B-10; 5B 2B; built 1965; forced Air;
  value = $385,200
  original house = 41*31 + 8*12 = 1367 sq ft (with partial basement)
  Sunroom was carport = 12*23 = 276
  Addition = 31*31 = 961 with apartment upstairs and grar
  
----
was Uncle Vernon's 
 Woods behind Grandma's and Matties
  PIN = 9872331584
    related PINs
  owner = HANSON AGGREGATES SOUTHEAST INC
  owner address = 3520 PIEDMONT RD STE 410 
 				C/O MARVIN F POER & COMPANY SPS RE 
 				ATLANTA GA 30305
  Acres = 206.76
  Value = 2,766,500 (land only)
 Land between I-40 and Blackwood Farm Park
  PIN = 9872540013
  Acre = 48 to 48.75 
  value = $944,300 (land only)
 Land N of Hanson Aggregates (west of I40)
  PIN = 9872268538
  owner = MCGEE DIANE B ETAL & CANTER PATSY B
  owner address = PO BOX 5, CLEMMONS NC
  Acre = 58 to 60.26
  Value = $18,390 (land only) appears land locked
 Land N of Hanson Aggregates (east of I40)
  PIN = 9872461956
  owner = MCGEE DIANE B ETAL & CANTER PATSY B
  value = $	1,519 (land only) might get access to Cheyenne Dr, or land locked
  acre = 6 to 6.7 acre

                  
  /********************************************************************************************************************/
                  
                  