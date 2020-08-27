  //write file data
  // if (av.dbg.flg.root) { console.log('Root: start of fileDataWrite'); }
  var av = av || {};  //incase av already exists

  // if (av.dbg.flg.root) { console.log('Root: before av.fwt.deleteFzrFile'); }
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
    if (av.dbg.flg.frd) { console.log(from, ' called av.fwt.makeFzrFile: fileID=',fileId); }
    av.fzr.file[fileId] = text;
  };

  av.fwt.makeActConfigFile = function (fileId, text, from) {
    'use strict';
    //console.log(from, ' called av.fwt.makeActConfigFile: fileID=', fileId);
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
    var txt = av.dom.autoPauseNum.value.toString();
    // Is auto Update Radio button checked?
    if (!av.dom.autoPauseCheck.checked) {  //manually pause population
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
    txt += 'COPY_MUT_PROB ' + document.getElementById('mutePopInput').value/100 + '\n';
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

  /*-------------------------------------------------------------------------------- end of av.fwt.makeFzrAvidaTest --*/

  //Find subarea based on region code
  //-------------------------------------------------------------------------------------- av.fwt.getInflowRegionArea --
  av.fwt.getInflowRegionArea = function(numTsk, subnum) {
    var ndx = av.nut[numTsk].uiSub.regionNdx[subnum];
    var cols = Math.floor(av.nut.wrldCols *  av.sgr.regionQuarterCols[ndx]);
    var rows = Math.floor(av.nut.wrldRows *  av.sgr.regionQuarterRows[ndx]);
    //console.log('tsk=', numTsk, '; subnum=', subnum,'; ndx=', ndx, '; cols=', cols, '; rows=', rows);
     
    // if the number of rows or cols is odd, then one half will get an extra row/col in that direction
    if(0 != av.nut.wrldCols % 2) {
       cols += av.sgr.regionQuarterColsAdd[1];
      }
      if (0 != av.nut.wrldRows %2 ) {
        rows += av.sgr.regionQuarterRowsAdd[1];
      };
      var rslt = {
        area : rows*cols,
        cols : cols,
        rows : rows,
        boxx : Math.floor(av.nut.wrldCols * av.sgr.regionQuarterBoxx[ndx]),
        boxy : Math.floor(av.nut.wrldRows * av.sgr.regionQuarterBoxy[ndx])
      };
     return (rslt);
  };
  //---------------------------------------------------------------------------------- end av.fwt.getInflowRegionArea --

  av.fwt.existDfltCheck = function(str, data, dfltTxt, avidaDefault){
    if (':depletable=' == str )
    var text = ''; 
    if (null != data) {
      text = data;
    } 
    else if (null != dfltTxt) {
      text = dfltTxt;
    };
    //console.log('str=', str, '; data=', data, '; dfltTxt=', dfltTxt, '; avidaDefault=', avidaDefault,'; text=', text, '-------- are they equal?-----');
    if (text == avidaDefault) {
      text = '';
    }
    else if (null != str) {
      text = str + text;
    };
    
    //if (':depletable=' == str ) {
    if (false) {
      console.log('in av.fwt.existDfltCheck: str=', str, '; data=', data, '; dfltTxt='+dfltTxt+'; avidaDefault='+avidaDefault
        +'; text=', text);
    }
    return text;
  };
  
  av.fwt.existCheck = function(str, data, dfltTxt){
    var text = '';
    if (null !=  data) {
      text = data;
    }
    else if (null != dfltTxt) {
      text = dfltTxt;
    }
    else { 
      return ''; 
    }
    if (null != str) {
      text = str + text;
    }
    if (':value=' == str) {
      console.log('in av.fwt.existCheck: str=', str, '; data=', data, '; dfltTxt='+dfltTxt+'; text='+text+'|');  
    }
    return text;
  };

  //--------------------------------------------------------------------------------------------- av.fwt.nut2cfgFile  --
  av.fwt.nut2cfgFile = function (idStr, toActiveConfigFlag, from) {
    var tsk, tskvar, numtsk, resrcFix, cellboxtxt, cellTxt, cellList, ndx, codeTxt, reactTxt;
    var logicLen = av.sgr.logicNames.length;
    var tmpNum = 0;
    var jj=0;
    var cellBeg = 0; 
    var cellEnd = av.nut.wrldSize-1;
    console.log(from, 'called av.fwt.nut2cfgFile: toActiveConfigFlag=', toActiveConfigFlag, '; cellEnd=', cellEnd, 'logicLen=',logicLen);

    var txt = '\n';
    txt += '# Environment.cfg file for Avida-ED 4: guidelines for hand editing.\n';
    txt += '\n';
    txt += '# environment.cfg for information is at https://github.com/devosoft/avida/wiki/Environment-file  \n';
    txt += '# \n';
    txt += '# A "name-set" are the set of statements that all use the same resource name. For Avida-ED the REACTION name should match as well. \n';
    txt += '# name and the reaction name should match as well. Each nam set may contatin:\n';
    txt += '#    RESCOURCE   \n';
    txt += '#      - must be the first line of the name-set for Avida-ED\n';
    txt += '#      - describes the resouce \n';
    txt += '#      - defines boundaries for inflow and outflow \n';
    txt += '#      - sets diffusion on or off \n';
    txt += '#      - needed for all sub-region resources \n';
    txt += '#      - grid position is based on two dimensional representation where (0,0) is uppper left corner \n';
    txt += '#    CELL \n';
    txt += '#      - requires a RESOURCE statement \n';
    txt += '#      - defines boundaries for initial so needed for Finite\n';
    txt += '#      - also used to define gradient resources \n';
    txt += '#      - may have zero or more CELL statements in each name-set \n';
    txt += '#      - are not named but must have matcing resource name \n';
    txt += '#      - grid position are based on a one dimensional array from 0 to world size - 1 \n';
    txt += '#      - \n';
    txt += '#    REACTION \n';
    txt += '#      - needed for there to be any effect on Avians\n';
    txt += '#      - defines tsk needed and the effect \n';
    txt += '#      - no matching RESOURCE statement:\n';
    txt += '#      - - when there is no resouce name is stated or there is no matching RESOURCE statement.\n';
    txt += '#      - - must be none or infinite;\n';
    txt += '#      - - must be glogal \n';
    txt += '#      - - could act as "none" even for  global/local or a subregion even if not technically correct\n';
    txt += '#      - matching RESOURE statement found \n';
    txt += '#      - - can be global or local; can be any resource option \n';
    txt += '#      - can be either global or finite (grid) if a RESOURCE is specieifed. \n';
    txt += '#\n';
    txt += '# Summary: There must be a REACTION STATEMENT to effect an avidian\n';
    txt += '#    RESOURCE statement must be first line for each name-set if there is a RESOURCE statement \n';
    txt += '# \n';
    txt += '\n';
    
    for (var ii=0; ii< logicLen; ii++) {      //9
      numtsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];      //3 letter logic names
      tskvar = av.sgr.logicVnames[ii];   // variable length logic tasks names as required by Avida
      //console.log('numtsk=', numtsk, '; tsk=', tsk, '; tskvar=', tskvar, 'uiAll.geometry=', av.nut[numtsk].uiAll.geometry.toLowerCase());

//      if ('nor' == tsk) {
        if (false) {
        txt += 'RESOURCE nor000q:geometry=grid:xdiffuse=0:ydiffuse=0\n';
        txt += 'CELL nor000q:0..39:initial=40\n';
        txt += 'CELL nor000q:40..79:initial=80\n';
        txt += 'CELL nor000q:80..119:initial=120\n';
        txt += 'CELL nor000q:120..159:initial=160\n';
        txt += 'CELL nor000q:160..199:initial=200\n';
        txt += 'CELL nor000q:200..239:initial=240\n';
        txt += 'CELL nor000q:240..279:initial=280\n';
        txt += 'CELL nor000q:280..319:initial=320\n';
        txt += 'CELL nor000q:320..359:initial=360\n';
        txt += 'CELL nor000q:360..399:initial=400\n';
        txt += 'REACTION nor000q  nor process:resource=nor000q:value=4:type=pow requisite:max_count=1\n\n';
      }
      else if (false) {
        txt += 'RESOURCE nor013q:geometry=grid:xdiffuse=0:ydiffuse=0:inflow=128:outflow=0.04:';
        txt += 'inflowX1=0:inflowY1=0:inflowX2=19:inflowY2=19:cellbox=0,0,20,20:';
        txt += 'outflowX1=0:outflowY1=0:outflowX2=19:outflowY2=19\n';
        txt += 'RESOURCE nor013q:geometry=grid:xdiffuse=0:ydiffuse=0:inflow=144:outflow=0.04:';
        txt += 'inflowX1=20:inflowY1=0:inflowX2=39:inflowY2=19:cellbox=20,0,20,20:';
        txt += 'outflowX1=20:outflowY1=0:outflowX2=39:outflowY2=19\n';
        txt += 'REACTION  nor013q xor  process:resource=nor013q:value=2.0:type=pow:min=0.9:max=1 requisite:max_count=1\n';
      }
      else {

      if ('global' == av.nut[numtsk].uiAll.geometry.toLowerCase()) {
        jj = 0;
        tmpNum = 1;
        //console.log('numtsk=', numtsk, '; jj=', jj, '; supplyType=', av.nut[numtsk].uiAll.supplyType.toLowerCase());
        txt += '# Task = '+ numtsk + '; Geometry = ' + av.nut[numtsk].uiAll.geometry + '; supplyType = '+  av.nut[numtsk].uiAll.supplyType.toLowerCase() + '\n';
        switch ( av.nut[numtsk].uiAll.supplyType.toLowerCase() ) {
          case 'none':
            tmpNum = 0;
          case 'infinite':
            txt += 'REACTION ' + av.fwt.existCheck( '',av.nut[numtsk].react.name[jj],tskvar );
            txt += ' ' + av.fwt.existCheck( '',av.nut[numtsk].react.task[jj], tskvar );
            console.log('av.nut['+numtsk+'].react.value['+jj+']=', av.nut[numtsk].react.value[jj]);
            txt += ' process' + av.fwt.existCheck( ':value=', av.nut[numtsk].react.value[jj], tmpNum);
            txt += av.fwt.existCheck( ':type=', av.nut[numtsk].react.type[jj], ':type=pow' );
            txt += av.fwt.existDfltCheck( ':depletable=', av.nut[numtsk].react.depletable[jj], '', 1 );
            txt += ' requisite' + av.fwt.existCheck(':max_count=', av.nut[numtsk].react.max_count[jj], ':max_count=1') + '\n\n';
            break;
          case 'finite':
            txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numtsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numtsk].react.resource[jj], tsk) );
            txt += av.fwt.existCheck(':geometry=', av.nut[numtsk].resrc.geometry[jj], '');
            txt += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numtsk].resrc.xdiffuse[jj], 0, 1); 
            txt += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numtsk].resrc.ydiffuse[jj], 0, 1); 
            // Since fileDataRead looks for initial to see if the catagory is finite, 
            // initial needs to be in the file even if it is the default value = 0
            txt += av.fwt.existCheck(':initial=', av.nut[numtsk].resrc.initial[jj], '')+ '\n'; 
            
            // Reaction is the same for finite and chemostate
            txt += 'REACTION ' + av.fwt.existCheck( '',av.nut[numtsk].react.name[jj],tskvar );
            txt += ' ' + av.fwt.existCheck( '',av.nut[numtsk].react.task[jj], tskvar );
            txt += ' process' + av.fwt.existCheck( ':value=', av.nut[numtsk].react.value[jj], '');
            txt += av.fwt.existCheck( ':type=', av.nut[numtsk].react.type[jj], ':type=pow' );
            txt += av.fwt.existDfltCheck( ':depletable=', av.nut[numtsk].react.depletable[jj], '', 1 );
            txt += av.fwt.existCheck(' requisite:max_count=', av.nut[numtsk].react.max_count[jj], ' requisite:max_count=1') + '\n\n';

            
            txt += 'REACTION ' + av.nut[numtsk].react.name[jj] + ' ' + av.nut[numtsk].react.task[jj];
            txt += ' process:resource='+av.nut[numtsk].react.resource[jj]+':value=' + av.nut[numtsk].react.value[jj];
            txt +=':type=' + av.nut[numtsk].react.type[jj]+':min='+av.nut[numtsk].react.max[jj]+':min='+av.nut[numtsk].react.min[jj];
            txt += ' requisite:max_count=' + av.nut[numtsk].react.max_count[jj] + '\n\n';
            break;
          case 'chemostat': 
            txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numtsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numtsk].react.resource[jj], tsk) );
            txt += av.fwt.existCheck(':geometry=', av.nut[numtsk].resrc.geometry[jj], '');
            // Since fileDataRead looks for inflow/outflow to see if the catagory is chemostat, 
            // initial must not exist in file
            txt += av.fwt.existCheck(':inflow=', av.nut[numtsk].resrc.inflow[jj], ':inflow='+av.nut.wrldSize); 
            txt += av.fwt.existCheck(':outflow=', av.nut[numtsk].resrc.inflow[jj], ':outflow='+av.nut.wrldSize); 
            txt += av.fwt.existCheck(':inflowx1=', av.nut[numtsk].resrc.inflowx1[jj], ':inflowx1=0' ); 
            txt += av.fwt.existCheck(':inflowy1=', av.nut[numtsk].resrc.inflowy1[jj], ':inflowy1=0' ); 
            txt += av.fwt.existCheck(':inflowx2=', av.nut[numtsk].resrc.inflowx2[jj], ':inflowx2='+(av.nut.wrldCols-1)); 
            txt += av.fwt.existCheck(':inflowy2=', av.nut[numtsk].resrc.inflowy2[jj], ':inflowy2='+(av.nut.wrldRows-1) ); 

            txt += av.fwt.existCheck(':outflowx1=', av.nut[numtsk].resrc.outflowx1[jj], ':outflowx1=0' ); 
            txt += av.fwt.existCheck(':outflowy1=', av.nut[numtsk].resrc.outflowy1[jj], ':outflowy1=0' ); 
            txt += av.fwt.existCheck(':outflowx2=', av.nut[numtsk].resrc.outflowx2[jj], ':outflowx2='+(av.nut.wrldCols-1)); 
            txt += av.fwt.existCheck(':outflowy2=', av.nut[numtsk].resrc.outflowy2[jj], ':outflowy2='+(av.nut.wrldRows-1) ); 
            
            txt += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numtsk].resrc.xdiffuse[jj], 0, 1); 
            txt += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numtsk].resrc.ydiffuse[jj], 0, 1); 
            txt +=  + '\n';
            
            // Reaction is the same for finite and chemostate
            txt += 'REACTION ' + av.fwt.existCheck( '',av.nut[numtsk].react.name[jj],tskvar );
            txt += ' ' + av.fwt.existCheck( '',av.nut[numtsk].react.task[jj], tskvar );
            txt += ' process' + av.fwt.existCheck( ':value=', av.nut[numtsk].react.value[jj], '');
            txt += av.fwt.existCheck( ':type=', av.nut[numtsk].react.type[jj], ':type=pow' );
            txt += av.fwt.existDfltCheck( ':depletable=', av.nut[numtsk].react.depletable[jj], '', 1 );
            txt += av.fwt.existCheck(' requisite:max_count=', av.nut[numtsk].react.max_count[jj], ' requisite:max_count1'+av.sgr.reactValues[ii]);
            txt += '\n\n';
            break;
        }  //end switch
      }
      else {
        // geometery = grid
        len = av.nut[numtsk].uiSub.regionCode.length;
        for (jj=1; jj< len; jj++) {
          resrcFix =  'RESOURCE ' + av.fwt.existCheck('', av.nut[numtsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numtsk].react.resource[jj], tsk) );
          resrcFix += av.fwt.existCheck(':geometry=', av.nut[numtsk].resrc.geometry[jj], 'grid');
          resrcFix += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numtsk].resrc.xdiffuse[jj], 0, 1); 
          resrcFix += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numtsk].resrc.ydiffuse[jj], 0, 1) + '\n';

          cellboxtxt = '';
          if ( (null == av.nut[numtsk].resrc.boxflag[jj]) && (null == av.nut[numtsk].resrc.boxx[jj]) 
            && (null == av.nut[numtsk].resrc.boxy[jj]) && (null == av.nut[numtsk].resrct.boxcol[jj]) 
            && (null == av.nut[numtsk].resrc.boxrow[jj]) ) {
            if (av.nut[numtsk].resrc.boxflag[jj]) {
              cellboxtxt += ':cellbox='+',' + av.nut[numtsk].resrc.boxx[jj] + ',' + av.nut[numtsk].resrc.boxy[jj] + ',';
              cellboxtxt += ',' + av.nut[numtsk].resrc.boxcol[jj] + ',' + av.nut[numtsk].resrc.boxrow[jj];
            }
          };
          //console.log('av.nut['+numtsk+'].resrc.name['+jj+']=', av.nut[numtsk].resrc.name[jj], '; av.nut['+numtsk+'].react.resource['+jj+']=', av.nut[numtsk].react.resource[jj], 'tsk=', tsk);
          cellTxt = 'CELL ' + av.fwt.existCheck('', av.nut[numtsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numtsk].react.resource[jj], tsk) );
          
          //Find cell description
          codeTxt = av.nut[numtsk].uiSub.regionCode[jj];
          ndx = av.sgr.regionQuarterCodes.indexOf(codeTxt);
          //lineararray index = x + y * (numcols)
          if ('000' == codeTxt || '012' == codeTxt || '34' == codeTxt) {
            //subdish includes entire rows so it is easier to define. 
            cellBeg = Number(av.nut[numtsk].resrc.inflowx1[jj]) +
                      Number(av.nut[numtsk].resrc.inflowy1[jj]) * Number(av.nut.wrldCols);
                    
            cellEnd = Number(av.nut[numtsk].resrc.inflowx2[jj]) +
                      Number(av.nut[numtsk].resrc.inflowy2[jj]) * Number(av.nut.wrldCols);
            cellList = ':' + Math.floor(cellBeg) + '..' + Math.floor(cellEnd);
            //console.log('inx1=', Number(av.nut[numtsk].resrc.inflowx1[jj]), 'iny1=', Number(av.nut[numtsk].resrc.inflowy1[jj])
            //          , 'inx2=', Number(av.nut[numtsk].resrc.inflowx2[jj]), 'iny2=', Number(av.nut[numtsk].resrc.inflowy2[jj])  
            //          , 'wld=',  Number(av.nut.wrldCols), '; cellBeg=', cellBeg, '; cellEnd=', cellEnd);
          }
          else {
            //Need to find cell list in parts for half rows
            //This is wrong as I think it only gives the first row of list in that region
            cellBeg = Number(av.nut[numtsk].resrc.boxx[jj]) +
                      Number(av.nut[numtsk].resrc.boxy[jj]) * Number(av.nut.wrldCols);
            cellEnd = cellBeg + Number(av.nut[numtsk].resrc.boxcol[jj])-1;
            //console.log('boxx=', Number(av.nut[numtsk].resrc.boxx[jj]), '; boxy=', Number(av.nut[numtsk].resrc.boxy[jj]), '; wldCols=', Number(av.nut.wrldCols) );
            cellList = ':' + Math.floor(cellBeg) + '..' + Math.floor(cellEnd);  //this is just the first row
          };
          cellTxt += cellList;
          tmpNum = Number(av.nut[numtsk].cell.initial[jj]);
          if (!isNaN( tmpNum) )  {
            cellTxt += av.fwt.existCheck( ':initial=', Math.round(tmpNum).toString(), tmpNum )+ '\n'; 
          } 
          else {
            tmpNum = Number(av.nut[numtsk].resrc.initial[jj]);
            if (!isNaN( tmpNum) )  {
              cellTxt += av.fwt.existCheck( ':initial=', Math.round(tmpNum).toString(), tmpNum )+ '\n'; 
            }
            else if ('none' == av.nut[numtsk].uiSub.supplyType[jj].toLowerCase()) {
              cellTxt += ':initial=0\n'; 
            }
            else if ('infinite' == av.nut[numtsk].uiSub.supplyType[jj].toLowerCase()) {
              tmpNum = Number(av.nut.wrldSize);
              if (!isNaN( tmpNum) )  {
                cellTxt += av.fwt.existCheck( ':initial=', Math.round(tmpNum).toString(), tmpNum )+ '\n'; 
              }
              else {
                cellTxt += ':initial=14400\n'; 
                console.log('cellTxt = :initial=14400');
              }
            }
          }
          reactTxt = 'REACTION ' + av.fwt.existCheck( '',av.nut[numtsk].react.name[jj],tskvar );
          reactTxt += ' ' + av.fwt.existCheck( '',av.nut[numtsk].react.task[jj], tskvar );
          reactTxt += ' process' + av.fwt.existCheck( ':resource=', av.nut[numtsk].react.resource[jj], '');
          reactTxt += av.fwt.existCheck( ':value=', av.nut[numtsk].react.value[jj], '');
          reactTxt += av.fwt.existCheck( ':type=', av.nut[numtsk].react.type[jj], ':type=pow' );
          reactTxt += av.fwt.existDfltCheck( ':depletable=', av.nut[numtsk].react.depletable[jj], '', 1 );
          //console.log('av.nut['+numtsk+'].react.depletable['+jj+']=', av.nut[numtsk].react.depletable[jj]);
          reactTxt += av.fwt.existCheck(' requisite:max_count=', av.nut[numtsk].react.max_count[jj], ' requisite:max_count1'+av.sgr.reactValues[ii]);
          reactTxt += '\n\n';

          //console.log('numtsk=', numtsk, '; jj=', jj, '; supplyType=',av.nut[numtsk].uiSub.supplyType[jj].toLowerCase());
          txt += '# Task = '+ numtsk + '; Geometry = ' + av.nut[numtsk].uiAll.geometry + '; supplyType = '+  av.nut[numtsk].uiSub.supplyType[jj].toLowerCase() + '\n';
          switch ( av.nut[numtsk].uiSub.supplyType[jj].toLowerCase() ) {
            case 'infinite':
              txt += resrcFix;
              txt += cellTxt;
              txt += reactTxt;
              console.log('resrcFix=', resrcFix);
              break;
            case 'none':
            case 'finite':
              txt += resrcFix;
              txt += cellTxt;
              txt += reactTxt;
              console.log('resrcFix=', resrcFix);
              break;
            case 'chemostat': 
              txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numtsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numtsk].react.resource[jj], tsk) );
              txt += av.fwt.existCheck(':geometry=', av.nut[numtsk].resrc.geometry[jj], '');
              // Since fileDataRead looks for inflow/outflow to see if the catagory is chemostat, 
              // initial must not exist in file
              txt += av.fwt.existCheck(':inflow=', av.nut[numtsk].resrc.inflow[jj], ':inflow='+av.nut.wrldSize); 
              txt += av.fwt.existCheck(':outflow=', av.nut[numtsk].resrc.outflow[jj], ':outflow='+av.nut.wrldSize); 
              txt += av.fwt.existCheck(':inflowx1=', av.nut[numtsk].resrc.inflowx1[jj], ':inflowx1=0' ); 
              txt += av.fwt.existCheck(':inflowy1=', av.nut[numtsk].resrc.inflowy1[jj], ':inflowy1=0' ); 
              txt += av.fwt.existCheck(':inflowx2=', av.nut[numtsk].resrc.inflowx2[jj], ':inflowx2='+(av.nut.wrldCols-1)); 
              txt += av.fwt.existCheck(':inflowy2=', av.nut[numtsk].resrc.inflowy2[jj], ':inflowy2='+(av.nut.wrldRows-1) ); 

              txt += av.fwt.existCheck(':outflowx1=', av.nut[numtsk].resrc.outflowx1[jj], ':outflowx1=0' ); 
              txt += av.fwt.existCheck(':outflowy1=', av.nut[numtsk].resrc.outflowy1[jj], ':outflowy1=0' ); 
              txt += av.fwt.existCheck(':outflowx2=', av.nut[numtsk].resrc.outflowx2[jj], ':outflowx2='+(av.nut.wrldCols-1)); 
              txt += av.fwt.existCheck(':outflowy2=', av.nut[numtsk].resrc.outflowy2[jj], ':outflowy2='+(av.nut.wrldRows-1) ); 

              txt += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numtsk].resrc.xdiffuse[jj], 0, 1); 
              txt += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numtsk].resrc.ydiffuse[jj], 0, 1); 
              txt += '\n';
              txt += reactTxt;

              // Reaction is the same for finite and chemostate
              break;
          } // end of switch
        } // end loop through array of each resource/reaction instance
      }  // end of else geometry=grid
     }   // end of else based on if to run some test code
     txt += '#-----\n'; 
    }  // end of looping through each sugar
    //console.log(txt);
    if (toActiveConfigFlag) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.form2NutrientTxt');
    else {av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.form2NutrientTxt');}

  };
  //----------------------------------------------------------------------------------------- end av.fwt.nut2cfgFile  --
  
  //-------------------------------------------------------------------------------------- av.fwt.nutUI2cfgStructure  --
  // This function takes values in the uiAll and uiSub substructures and creates the data for the parameters that are 
  // needed to write the evironment file. Iniital and inflow amounts are per cell in the ui and total aount in the environment
  // in the RESOURCE and CELLS statements. 
  av.fwt.nutUI2cfgStructure = function (from) {
    //console.log(from, 'called av.fwt.nutUI2cfgStructure');
    //------ assign ui parameters first --
    var tsk; //name of a task with 3 letters
    var numtsk; //number prefix to put in Avida-ED order before 3 letter prefix
    var tskvar;  // avida uses variable length logic9 names
    var logiclen = av.sgr.logicNames.length;
    var tmpNum = 1;
    var tmpTxt = '';
    var ndx = 1;
    var jj = 0;
    var react_arguLen = av.sgr.react_argu.length;

    for (var ii=0; ii< logiclen; ii++) {      //9
      numtsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];      //3 letter logic names
      tskvar = av.sgr.logicVnames[ii];   // variable length logic tasks names as required by Avida
      
      if ('global' == av.nut[numtsk].uiAll.geometry.toLowerCase()) {
        jj = 0;
        av.nut[numtsk].resrc.geometry[jj] = av.nut[numtsk].uiAll.geometry;
        av.nut[numtsk].resrc.boxflag[jj] = false;

        // Start with default Avida-ED values for reactoins. re-writen with dictionary. 
        for (var ll = 0; ll < react_arguLen; ll++) {
          av.nut[numtsk].react[ av.sgr.react_argu[ll] ][jj] = av.sgr.reAct_edValu_d[av.sgr.react_argu[ll]];
        }
        
        av.nut[numtsk].react.value[jj] = av.sgr.reactValues[ii];
        av.nut[numtsk].react.name[jj] = tsk+'000';
        av.nut[numtsk].react.task[jj] = tskvar;
        //console.log('numtsk =', numtsk,';  av.nut[numtsk].react=', av.nut[numtsk].react);

        //inflow and outflow coordinates are the same for most suppply Types
        av.nut[numtsk].resrc.inflowx1[jj] = 0;
        av.nut[numtsk].resrc.inflowy1[jj] = 0;
        av.nut[numtsk].resrc.outflowx1[jj] = 0;
        av.nut[numtsk].resrc.outflowy1[jj] = 0;

        av.nut[numtsk].resrc.inflowx2[jj] += av.nut.wrldCols-1;
        av.nut[numtsk].resrc.inflowy2[jj] += av.nut.wrldRows-1;
        av.nut[numtsk].resrc.outflowx2[jj] += av.nut.wrldCols-1;
        av.nut[numtsk].resrc.outflowy2[jj] += av.nut.wrldRows-1;
        
        console.log('av.nut['+numtsk+'].uiAll.supplyType=', av.nut[numtsk].uiAll.supplyType);
        switch ( av.nut[numtsk].uiAll.supplyType.toLowerCase() ) {
          case 'none':
            av.nut[numtsk].react.value[0] = 0;
            break;
          case 'infinite':
            av.nut[numtsk].react.depletable[0] = 0;
            break;
          case 'finite':
            av.nut[numtsk].resrc.initial[jj] = av.nut[numtsk].uiAll.initial;
            av.nut[numtsk].react.resource[0] = tsk+'000';
            break;
          case 'chemostat': 
            av.nut[numtsk].react.resource[0] = tsk+'000';
            break;
        }
      }
      else {
        // 'Local' or 'grid'
        len = av.nut[numtsk].uiSub.regionCode.length;
        for (jj=1; jj< len; jj++) {
          // Start with default Avida-ED values for reactions. re-writen with dictionary. 
          for (var ll = 0; ll < react_arguLen; ll++) {
            av.nut[numtsk].react[ av.sgr.react_argu[ll] ][jj] = av.sgr.reAct_edValu_d[av.sgr.react_argu[ll]];
          };
          
          av.nut[numtsk].react.value[jj] = av.sgr.reactValues[ii];
          av.nut[numtsk].react.name[jj] = av.nut[numtsk].resrc.name[jj];
          av.nut[numtsk].react.resource[jj] = av.nut[numtsk].resrc.name[jj];
          av.nut[numtsk].react.task[jj] = tskvar;

          av.nut[numtsk].resrc.boxflag[jj] = true;
          av.nut[numtsk].resrc.geometry[jj] = av.nut[numtsk].uiAll.geometry.toLowerCase();
          av.nut[numtsk].resrc.name[jj] = tsk + av.nut[numtsk].uiSub.regionCode[jj]+'q';

          if (av.nut[numtsk].uiSub.diffuseCheck[jj]) {
            av.nut[numtsk].resrc.xdiffuse[jj] = 1;
            av.nut[numtsk].resrc.ydiffuse[jj] = 1;
          }
          else {
            av.nut[numtsk].resrc.xdiffuse[jj] = 0;
            av.nut[numtsk].resrc.ydiffuse[jj] = 0;            
          };
          //ndx = av.sgr.regionQuarterNames.indexOf(av.nut[numtsk].uiSub.regionName[jj]);
          
          //inflow and outflow coordinates are the same for most suppply Types
          av.nut[numtsk].resrc.inflowx1[jj] = av.nut[numtsk].resrc.boxx[jj];
          av.nut[numtsk].resrc.inflowy1[jj] = av.nut[numtsk].resrc.boxy[jj];
          av.nut[numtsk].resrc.outflowx1[jj] = av.nut[numtsk].resrc.boxx[jj];
          av.nut[numtsk].resrc.outflowy1[jj] = av.nut[numtsk].resrc.boxy[jj];
          
          av.nut[numtsk].resrc.inflowx2[jj] = av.nut[numtsk].resrc.boxx[jj]+av.nut[numtsk].resrc.boxcol[jj]-1;
          av.nut[numtsk].resrc.inflowy2[jj] = av.nut[numtsk].resrc.boxy[jj]+av.nut[numtsk].resrc.boxrow[jj]-1;
          av.nut[numtsk].resrc.outflowx2[jj] = av.nut[numtsk].resrc.boxx[jj]+av.nut[numtsk].resrc.boxcol[jj]-1;
          av.nut[numtsk].resrc.outflowy2[jj] = av.nut[numtsk].resrc.boxy[jj]+av.nut[numtsk].resrc.boxrow[jj]-1;
          
          av.nut[numtsk].react.resource[jj] = tsk+av.nut[numtsk].uiSub.regionCode[jj]+'q';
          av.nut[numtsk].react.name[jj] = tsk+av.nut[numtsk].uiSub.regionCode[jj]+'q';
          
          //console.log('numtsk='+numtsk, 'sub='+jj, 'x2=', av.nut[numtsk].resrc.inflowx2[jj],
          //   'y2=', av.nut[numtsk].resrc.inflowy2[jj]);
          //av.nut[numtsk].resrc.inflow[jj] = av.nut[numtsk].uiSub.[jj];
          
 /*
          av.nut[numtsk].react.max[jj] = 1;
          av.nut[numtsk].react.max_count[jj] = 1;
          av.nut[numtsk].react.min[jj] = 0.99;
          av.nut[numtsk].react.name[jj] = tsk+'000';
          av.nut[numtsk].react.resource[jj] = av.nut[numtsk].react.name[jj];
          av.nut[numtsk].react.resource[jj] = tsk+'000';
          av.nut[numtsk].react.task[jj] = tskvar;
          av.nut[numtsk].react.type[jj] = 'pow';
          av.nut[numtsk].react.depletable[jj] = 1;
*/ 

          console.log('av.nut['+numtsk+'].uiSub.supplyType['+jj+']=', av.nut[numtsk].uiSub.supplyType[jj]);
          switch ( av.nut[numtsk].uiSub.supplyType[jj].toLowerCase() ) {
            case 'infinite':
              av.nut[numtsk].react.depletable[jj] = 0;
              av.nut[numtsk].cell.initial[jj] = 1;
              break;
            case 'finite':
              av.nut[numtsk].cell.name[jj] = av.nut[numtsk].resrc.name[jj];
              av.nut[numtsk].cell.initial[jj] = Math.round(av.nut[numtsk].uiSub.initialHiNp[jj],0);
              break;
            case 'none':
              av.nut[numtsk].cell.name[jj] = av.nut[numtsk].resrc.name[jj];
              av.nut[numtsk].cell.initial[jj] = 0;
              break;
            case 'chemostat': 
              av.nut[numtsk].resrc.inflow[jj] =  Math.round(av.nut[numtsk].uiSub.inflowHiNp[jj] * av.nut[numtsk].uiSub.area[jj]);
              av.nut[numtsk].resrc.outflow[jj] = av.nut[numtsk].uiSub.outflowHiNp[jj];
//              av.nut[numtsk].resrc.[jj] = av.nut[numtsk].uiSub.[jj];
              //console.log('av.nut['+numtsk+'].resrc.inflow['+jj+']=', av.nut[numtsk].resrc.inflow[jj], '; av.nut['+numtsk+'].resrc.outflow['+jj+']=', av.nut[numtsk].resrc.outflow[jj]);
              break;
          }
        }  // for go thru array of subregions in grid; 
      };  // end global else grid
      //console.log('av.nut['+numtsk+'].react.value=', av.nut[numtsk].react.value);
    }  //end for loop to go thru all sugars
    if (true) { 
      console.log('----------------------------------------------End of av.fwt.nutUI2cfgStructure, when called by ', from);
      av.nut_ui_cfg = {};
      av.nut_ui_cfg = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_ui_cfg = ', av.nut_ui_cfg); 
    };
  };
  //---------------------------------------------------------------------------------------- end nutUI2cftParameters  --

  /*---------------------------------------------------------------------------------------- av.fwt.dom2nutUIfields --*/

  av.fwt.dom2nutUIfields = function (from) {
    av.fzr.clearEnvironment('av.fwt.dom2nutUIfields');
    av.nut.wrldCols = Number(av.dom.sizeCols.value);
    av.nut.wrldRows = Number(av.dom.sizeRows.value);
    av.nut.wrldSize = av.nut.wrldCols * av.nut.wrldRows;
    //------ assign ui parameters first --
    var tsk; //name of a task with 3 letters
    var numtsk; //number prefix to put in Avida-ED order before 3 letter prefix
    var tskvar;  // avida uses variable length logic9 names
    var arguDom;  // argument name in the Dom
    var arguDish; // arugment name in the nutrient structure (nut); which is also the arugment name in the environment.cfg file
    var logiclen = av.sgr.logicNames.length;
    var area = 1;
    var uiAllDishLen = av.sgr.ui_allDish_argu.length;
    var uiAllDomLen  = av.sgr.ui_allDom_argu.length;
    var uiSubDom_numLen = av.sgr.uiSubDom_num.length;
    var uiSub_checkLen = av.sgr.uiSub_Check.length;
    var ui_subDom_txt = av.sgr.ui_subDom_txt.length;
    var tmpNum = 1;
    var tmpTxt = '';
    var ndx = 1;
    var react_arguLen = av.sgr.react_argu.length;
    var rslt;
    var tmpText = '';
    
    if (false) {
      console.log(from,'called av.fwt.dom2nutUIfields: react_arguLen=',react_arguLen, 
        ';aiAlDishLen=',uiAllDishLen,'; uiAllDomLen=', uiAllDomLen, '; uiSubdom_numLen=', uiSubDom_numLen, 
        '; uiSub_checkLen=', uiSub_checkLen, '; ui_subDom_txt=', ui_subDom_txt);
    }
    for (var ii=0; ii< logiclen; ii++) {      //9
      numtsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];      //3 letter logic names
      tskvar = av.sgr.logicVnames[ii];   // variable length logic tasks names as required by Avida
      // need an argument list to hold data relevant to getting data from dom or need to do each individually
      
      for (jj=0; jj < uiAllDomLen; jj++) {
        arguDom = av.sgr.ui_allDom_argu[jj];
        //console.log('ii='+ii+'; jj='+jj, '; av.nut['+numtsk+'].uiAll['+arguDom+']=', 'dom of', tsk+'0'+arguDom);
        //console.log('domList length=', uiAllDomLen,'; value=',document.getElementById(tsk+'0'+arguDom).value);    
        av.nut[numtsk].uiAll[arguDom] = document.getElementById(tsk+'0'+arguDom).value;
        //console.log('av.nut['+numtsk+'].uiAll['+arguDom+']=');
        //console.log(av.nut[numtsk].uiAll[arguDom]);
      };
      //console.log('av.nut['+numtsk+'].uiAll=',av.nut[numtsk].uiAll);
      av.nut[numtsk].uiAll.regionsNumOf = av.nut[numtsk].uiAll.regionLayout[0];
      
      //console.log('av.nut['+numtsk+'].uiAll.regionsNumOf=', av.nut[numtsk].uiAll.regionsNumOf, '; rLayout', av.nut[numtsk].uiAll.regionLayout);
      // will need to go through a list of names later so maybe I should make the dictionary
       
      //start on the potential subdishes next
      //console.log('SubDishes Now -----------------uiSub_txt length=', ui_subDom_txt);
      for (kk=1; kk <= av.nut[numtsk].uiAll.regionsNumOf; kk++) {
        //subregion not currently used. using regionCode, regionName, regionNdx
        //av.nut[numtsk].uiSub.regionSet[kk] = kk;      //not sure this is needed or make sense. needs work when get past one reagion
        
        tmpTxt = av.nut[numtsk].uiAll.regionLayout;
        
        //seemed to have inconsistent error, but it went away. left the debug consol.logs for now
        //console.log('tmpTxt = av.nut['+numtsk+'].uiAll.regionLayout=', av.nut[numtsk].uiAll.regionLayout);
        
        //console.log('av.nut['+numtsk+'].uiSub.regionName['+kk+']=', av.nut[numtsk].uiSub.regionName[kk]);
        //console.log('av.sgr.name['+tmpTxt+']['+kk+']=', av.sgr.name[tmpTxt][kk]);

        av.nut[numtsk].uiSub.regionName[kk] = av.sgr.name[tmpTxt][kk];
                                      //tmptext = av.sgr.name[tmpTxt][kk];
          //av.nut[numtsk].uiSub.regionName[kk] = tmpText;
        //console.log('av.nut['+numtsk+'].uiSub.regionName['+kk+']=', av.nut[numtsk].uiSub.regionName[kk]);
          
        ndx = av.sgr.regionQuarterNames.indexOf(av.sgr.name[tmpTxt][kk]);
        av.nut[numtsk].uiSub.regionNdx[kk] = ndx;
        
        av.nut[numtsk].uiSub.regionCode[kk] = av.sgr.regionQuarterCodes[ndx];
        //av.nut[numtsk].uiSub.area[kk] = av.nut.wrldCols * av.sgr.regionQuarterCols[ndx]
        //                    * av.nut.wrldRows * av.sgr.regionQuarterRows[ndx];
        

        rslt = av.fwt.getInflowRegionArea(numtsk, kk);
        av.nut[numtsk].uiSub.area[kk] = rslt.area;
        av.nut[numtsk].resrc.boxcol[kk] = rslt.cols;
        av.nut[numtsk].resrc.boxrow[kk] = rslt.rows;
        av.nut[numtsk].resrc.boxx[kk] = rslt.boxx;
        av.nut[numtsk].resrc.boxy[kk] = rslt.boxy;
        //console.log('av.nut['+numtsk+'].resrc.boxx['+kk+']; boxy =', av.nut[numtsk].resrc.boxx[kk], ';', av.nut[numtsk].resrc.boxy[kk]);
        
        for (jj=0; jj< ui_subDom_txt; jj++) {
          arguDom = av.sgr.ui_subDom_txt[jj];
          //console.log('jj='+jj, '; av.nut['+numtsk+'].uiSub['+arguDom+']['+kk+']=', 'dom of', '|'+tsk+kk+arguDom+'|');
          //console.log('; dom=',document.getElementById(tsk+kk+arguDom).value ); 
          av.nut[numtsk].uiSub[arguDom][kk] = document.getElementById(tsk+kk+arguDom).value;
        };
        for (jj=0; jj< uiSub_checkLen; jj++) {
          arguDom = av.sgr.uiSub_Check[jj];
          //console.log('jj='+jj, '; av.nut['+numtsk+'].uiSub['+arguDom+']['+kk+']=', 'dom of', '|'+tsk+kk+arguDom+'|');
          //console.log('; dom=',document.getElementById(tsk+kk+arguDom).checked ); 
          av.nut[numtsk].uiSub[arguDom][kk] = document.getElementById(tsk+kk+arguDom).checked;
        };
        
        // error in this section
        //Need to fine area of subregions first. 
        for (jj=0; jj< uiSubDom_numLen; jj++) {
          arguDom = av.sgr.uiSubDom_num[jj];
          //console.log('jj='+jj, '; av.nut['+numtsk+'].uiSub['+arguDom+']['+kk+']=', 'dom of', '|'+tsk+kk+arguDom+'|');
          //console.log('; dom=',document.getElementById(tsk+kk+arguDom).value ); 
          if (!isNaN(Number(document.getElementById(tsk+kk+arguDom).value))) {
            tmpNum = Number(document.getElementById(tsk+kk+arguDom).value);
            if ('in' == arguDom.substr(0,2)) {
              tmpNum = tmpNum / area;   //need to find area first
            };
            av.nut[numtsk].uiSub[arguDom][kk] = tmpNum;
          }
        };        
      };   //end for kk   

    };  //end for ii
    if (true) { 
      console.log('----------------------------------------------End of av.fwt.dom2nutUIfields, when called by ', from);
      av.nut_ui = {};
      av.nut_ui = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_ui = ', av.nut_ui); 
    }
  };
  //----------------------------------------------------------------------------------- End of av.fwt.dom2nutUIfields --

  //------------------------------------------------------------------------------- av.fwt.NutStruct2environment_cfg  --
  av.fwt.NutStruct2environment_cfg = function (idStr, toActiveConfigFlag, from) {
    
  };
  //--------------------------------------------------------------------------- end av.fwt.NutStruct2environment_cfg  --

  // the function av.fwt.form2NutrientTxt needs to be replaced with av.fwt.NutStruct2environment_cfg
  //----------------------------------------------------------------------------------------- av.fwt.form2NutrientTxt --
  av.fwt.form2NutrientTxt = function (idStr, toActiveConfigFlag, from) {
    //console.log(from + ' called av.fwt.form2NutrientTxt');
    var geometry = 'global';
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
        region_ndx = av.sgr.regionQuarterCodes.indexOf(regionName);
        regionCode = '00';        //will need to find later based subdish+regionName
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
        regionName = document.getElementById(tsk+ndx+'regionName').textContent;
        region_ndx = av.sgr.regionQuarterNames.indexOf(regionName);
        regionCode = av.sgr.regionQuarterCodes[region_ndx];
        rname = tsk + regionCode;
        supplyType = document.getElementById(tsk+ndx+'supplyType').value.toLowerCase();
        //console.log('regionCode=', regionCode, '; regionName=', regionName, '; rname=', rname, '; suppplyType=', supplyType);
        switch (supplyType) {
          case 'none':
            txt += 'RESOURCE ' + rname + ':geometry=grid:initial=0' + ' \n';
            txt += 'REACTION ' + rname + ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:max=1:min=1  requisite:max_count=1 \n';
            break;
          case 'infinite':
            sgrPerCell = av.sgr.nut.dft.uiSub.initialHi;
            regionInit = numCells * sgrPerCell;
            txt += 'RESOURCE ' + rname + ':geometry=grid:initial=' + regionInit + ':xdiffuse=0:ydiffuse=0\n';   //cells should have one, but not deplete any
            txt += 'REACTION ' + rname +  ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:depletable=0 requisite:max_count=1 \n';
            break;
          case 'finite':
            // later will get from av.nut
            sgrPerCell = Number(document.getElementById(tsk+ndx+'initialHiNp').value);
            regionInit = numCells * sgrPerCell;
            //console.log('tsk=',tsk,'; ndx=',ndx,'; sgrPerCell=', sgrPerCell, '; diffusion checkbox = ', document.getElementById(tsk+ndx+'diffuseCheck').checked );

            //only have diffusion = 0 implemented at this time
            txt += 'RESOURCE ' + rname + ':geometry=grid:initial=' + regionInit + ':xdiffuse=0:ydiffuse=0\n';
            txt += 'REACTION ' + rname +  ' ' + atsk + ' process:resource='+ rname +':value=' + av.sgr.reactValues[ii] + ':type=pow:max=1:min=1 requisite:max_count=1 \n';
            break;
        };  // end of LOCAL swtich
      };

    }// end of loop to go thru all the logic functions. 
 
     if (true) { 
      console.log('end of End of av.fwt.form2NutrientTxt');   //av.debug.fio
      av.nut_dom_cfg = {};
      av.nut_dom_cfg = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_dom_cfg = ', av.nut_dom_cfg); 
      console.log('av=', av);
    }
   
    //  if ('cfg'==idStr) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.form2NutrientTxt');  // 
    if (toActiveConfigFlag) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.form2NutrientTxt');
    else {av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.form2NutrientTxt');}
  };
  /*---------------------------------------------------------------------------------- End of av.fwt.form2NutrientTxt --*/

  /*------------------------------------------------------------------------------------ av.fwt.makeFzrEnvironmentCfg --*/
  av.fwt.makeFzrEnvironmentCfg = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrEnvironmentCfg; idStr=', idStr);
    av.fwt.dom2nutUIfields('av.fwt.makeFzrEnvironmentCfg');
    av.fwt.nutUI2cfgStructure('av.fwt.makeFzrEnvironmentCfg');
    console.log('before calling av.fwt.nut2cfgFile');
    av.fwt.nut2cfgFile(idStr, toActiveConfigFlag, 'av.fwt.makeFzrEnvironmentCfg');
    console.log('after calling av.fwt.nut2cfgFile');
    
    //will change to av.fwt.nutStruct2Nuttxt later;
    //av.fwt.form2NutrientTxt(idStr, toActiveConfigFlag, 'av.fwt.makeFzrEnvironmentCfg');  
  };

  /*--------------------------------------------------------------------------------- av.fwt.makeFzrOldEnvironmentCfg --
   *  This function is not loner in use. delete by 2021
   
  av.fwt.makeFzrOldEnvironmentCfg = function (idStr, from) {
    'use strict';
    if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrOldEnvironmentCfg *************************************************');
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

  /*-------------------------------------------------------------------------------------- av.fwt.makeFzrAncestorAuto --*/

  av.fwt.makeFzrAncestorAuto = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAncestorAuto: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
    var txt = '';
    var lngth = av.parents.autoNdx.length;
    for (var ii = 0; ii < lngth; ii++) {
      txt += av.parents.name[av.parents.autoNdx[ii]] + '\n';
      txt += av.parents.genome[av.parents.autoNdx[ii]] + '\n';
    }
    if (toActiveConfigFlag) {av.fwt.makeActConfigFile('ancestors.txt', txt, 'av.fwt.makeFzrAncestorAuto');}
    else {av.fwt.makeFzrFile(idStr+'/ancestors.txt', txt), 'av.fwt.makeFzrAncestorAuto';}
  };

  /*-------------------------------------------------------------------------------------- av.fwt.makeFzrAncestorHand --*/
  av.fwt.makeFzrAncestorHand = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    //if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAncestorHand: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
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

  /*-------------------------------------------------------------------------------------------- av.fwt.makeFzrTRfile --*/
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
  /*-------------------------------------------------------------------------------------- av.fwt.makeFzrTimeRecorder --*/
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
    //avida.cfg file must be created before the environment.cfg file. 
    av.fwt.makeFzrEnvironmentCfg('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');  
    av.fwt.makeFzrAncestorAuto('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
    av.fwt.makeFzrAncestorHand('activeConfig', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
  };

  //test setup to active folder just before sending to avida
  /*------------------------------------------------------------------------------------------ av.fwt.testForm2folder --*/
  av.fwt.testForm2folder = function() {
    'use strict';
    var toActiveConfigFlag = true; // true is to Config spot for experiment; false is to Freezer
    av.fwt.makeFzrAvidaTest('cfg', 'av.fwt.form2cfgFolder');
    av.fwt.makeFzrEnvironmentTest('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
    av.fwt.makeFzrAncestorAuto('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');
    av.fwt.makeFzrAncestorHand('cfg', toActiveConfigFlag, 'av.fwt.form2cfgFolder');  
  };

  //making a freezer file not an active file
  /*-------------------------------------------------------------------------------------------- av.fwt.makeFzrConfig --*/
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

  /*--------------------------------------------------------------------------------------------- av.fwt.makeFzrWorld --*/
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
    av.fwt.makeFzrTRfile('w'+num+'/tr0.txt', av.pch.aveFit);
    av.fwt.makeFzrTRfile('w'+num+'/tr1.txt', av.pch.aveCst);
    av.fwt.makeFzrTRfile('w'+num+'/tr2.txt', av.pch.aveEar);
    av.fwt.makeFzrTRfile('w'+num+'/tr3.txt', av.pch.aveNum);
    av.fwt.makeFzrTRfile('w'+num+'/tr4.txt', av.pch.aveVia);
    av.fwt.makeFzrFile('w'+num + '/update.txt', av.grd.updateNum.toString(), 'av.fwt.makeFzrWorld' );
    av.fwt.makeFzrCSV('w'+num);
  };

  /*---------------------------------------------------------------------------------------------- av.fwt.popExpWrite --*/
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

  /*------------------------------------------------------------------------------------------ av.fwt.removeFzrConfig --*/
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

  /*------------------------------------------------------------------------------------------ av.fwt.removeFzrGenome --*/
  av.fwt.removeFzrGenome = function (dir) {
    'use strict';
    av.fwt.deleteFzrFile(dir+'/entryname.txt');
    av.fwt.deleteFzrFile(dir+'/genome.seq');
    var domid = av.fzr.domid[dir];
    delete av.fzr.domid[dir];
    delete av.fzr.dir[domid];
    //console.log('after remove genome: dir', dir, '; av.fzr', av.fzr);
  };

  /*------------------------------------------------------------------------------------------- av.fwt.removeFzrWorld --*/
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

  /*-------------------------------------------------------------------------------------------- av.fwt.removeFzrItem --*/
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

  /*----------------------------------------------------------------------------------------------- av.fwt.makeFzrCSV --*/
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

  /*------------------------------------------------------------------------------------------ av.fwt.writeCurrentCSV --*/
  av.fwt.writeCurrentCSV = function(idStr) {  
    "use strict";
    av.fwt.makeCSV(idStr);
    av.fio.fzSaveCsvfn();
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.fwt.makeCSV'); }
  /*-------------------------------------------------------------------------------------------------- av.fwt.makeCSV --*/
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
  /*------------------------------------------------------------------------------------------- End of av.fwt.makeCSV --*/


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

   av.fwt.tryDown = function (blob) {
      var ab = document.createElement('a');
      ab.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(av.debug.log);
      ab.target = '_blank';
      ab.download = 'testfile.txt';
      document.body.appendChild(ab);
      ab.click();
      setTimeout(function () {
        document.body.removeChild(ab);
        window.URL.revokeObjectURL(ab.href);
      }, 100);
    };
    //------------- Testing only need to delete above later.--------------------

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



  /***********************************************************************************************************************
                                    Code Not in use  may delte later. 
  /***********************************************************************************************************************



  /*  put here in 2019 Dec
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
  */

  /*  put here in 2019 Dec
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
      av.nut[etsk].uiAll.regionLayout = document.getElementById(tsk +'0regionLayout').value.toLowerCase();
      if ('global' == av.nut[etsk].geometry.toLowerCase()) {

          av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //technically name is not an argument, but it starts the list. 
                              ,  'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                              , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                              , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                              ,'boxflag', 'boxx', 'boxy', 'boxcol', 'boxrow',     //theste are new for Avida-ED and not in the wiki. 
                              , 'region', 'side', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'

      }
      else {
        // local so there could be subdishes; later the number of subdishes will come from av.dom.orn0regionLayout.value
        // for now there is just one option, the whole dish so len = 1
        for (sub = 1; sub <= 1; sub++) {   //yes this loop starts at 1 instead of zero
          av.nut[etsk].uiSub.supplyType[sub] = document.getElementById(tsk + sub +'supplyType').value.toLowerCase();
          av.nut[etsk].resrc.initial[sub];
          av.nut[etsk].uiAll.supplyType[0] = document.getElementById(tsk + '0supplyType').value.toLowerCase();
          av.nut[etsk].resrc.name = tsk + '00';  // this may change later
          av.nut[etsk].resrc.initial[0] = 0;  //different if finite
          av.nut[etsk].resrc.xdiffuse = 0;
          av.nut[etsk].resrc.ydiffuse = 0;
        };
      };
    };
  };
  */


  // if (av.dbg.flg.root) { console.log('Root: end of fileDataWrite'); }
    /********************************************************************************************************************/

