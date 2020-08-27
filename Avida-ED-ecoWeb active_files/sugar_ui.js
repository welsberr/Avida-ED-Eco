  /* 
   *  functions used to create and modify the user interface for the resources and reactions. 
   *  In Avida-ED we use the analogy of bacterial digessting sugars
   *  Most of the interface is to create the environment file. 
   *  The Periodic functions occure in the Event File. 
   */

  /*  Just to state some dom IDs that might be used.
      av.dom.sugarAccordion = document.getElementById('sugarAccordion');
      av.dom.orn0section = document.getElementById('orn0section');
      av.dom.orn0title
      av.dom.orn0summary = document.getElementById('orn0summary'); 
      av.dom.orn0Details = document.getElementById('orn0Details'); 
      av.dom.orn1subSection = document.getElementById('orn1subSection'); 
      av.dom.tst2textarea
  */

  var av = av || {};  //incase av already exists

  // This function builds the html for all the other tasks based on the html writen for "orn"
  if (av.dbg.flg.root) { console.log('Root: before av.sgr.buildHtml'); }
  av.sgr.buildHtml = function() {
    //console.log('in av.sgr.buildHtml');
    var ii, jj;
    var tskSectionStr = '';
    //var subSectionStr = av.dom.orn1subSection.innterHTML;   //later there will be 4 of these for each sugar/task
    var newstr = '';
    var pattern = 'orn';  
    var pattern0 = 'orn0';
    var patternW = 'ornW';
    var patternTsk = 'orn';
    var tmpstr = '';
    var sgrNum = '';
    var len = av.sgr.logicNames.length;
    for (ii=0; ii<len; ii++) {
      if ('orn' != av.sgr.logicNames[ii]) {
        tskSectionStr = av.dom.orn0section.innerHTML;
        sgrNum = av.sgr.logicNames[ii] + '0';
        //console.log('sgrNum=', sgrNum, 'pattern0=',pattern0);
        tskSectionStr = tskSectionStr.replaceAll(pattern0, sgrNum);
        sgrNum = av.sgr.logicNames[ii] + 'W';
        tskSectionStr = tskSectionStr.replaceAll(patternW, sgrNum);
        //console.log('tskSectionStr=', tskSectionStr);

        //av.dom.showTextarea.value = tskSectionStr;
        tmpstr = av.sgr.logicNames[ii]+'0section';
        //console.log('id = ', tmpstr);
        document.getElementById(tmpstr).innerHTML = tskSectionStr;
        tmpstr = av.sgr.logicNames[ii]+'0title';
        //console.log('id = ', tmpstr);
        document.getElementById(av.sgr.logicNames[ii]+'0title').innerHTML = av.sgr.oseNames[ii];

        document.getElementById(tmpstr).innerHTML = av.sgr.oseNames[ii];

        newstr = av.dom.orn0Details.innerHTML;
        // av.nut.numRegionsinHTML is defined in globals and is the number of subregions in the html
        for (jj=1; jj <= av.nut.numRegionsinHTML; jj++) {
          patternTsk = pattern + jj.toString();
          sgrNum = av.sgr.logicNames[ii] + jj;
          //console.log('patternTsk=',patternTsk, '; sgrNum=',sgrNum);
          newstr = newstr.replaceAll(patternTsk, sgrNum);
        }
        document.getElementById(av.sgr.logicNames[ii]+'0Details').innerHTML = newstr;
      }
    }
      //Was using this to display how I was building sugar according data
      //console.log('av.dom.orn0section.innerHTML=', av.dom.orn0section.innerHTML);
      //av.dom.tst2textarea.value = document.getElementById('equ0Details').innerHTML;
      //av.dom.tst2textarea.value = tskSectionStr;

      sgrNum = av.dom.sugarAccordion.innerHTML;
      jj = sgrNum.length;
      av.dom.showTextarea.value = av.dom.sugarAccordion.innerHTML;  
      //console.log('innterHTML.len=',jj,'; innerHtml=',av.dom.sugarAccordion.innerHTML);
      //av.dom.showTextarea.value = document.getElementById('not0Details');  
      av.dom.showTextarea.value = sgrNum;
  };
  
  //-------------------------------------------------------------------------------------------------- sugars for Eco --
  //Code for adaptable user interface for environment layout witn upto 9 subsections. 
  //-------------------------------------------------------------------------------------------------- sugars for Eco --

/***************************************************************************************** calls directly from dom ****/

//------------------------------------------------------------------------------------------------- Sugar Accordion ----
//Global or Local in Ed speak = Global or Grid in Avida Environment file.
  av.sgr.allSugarGeometryChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var which = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllGeo(which);
    //av.sgr.setSugarColors(true);  //true is to turn colors on;    //color now dependent on presence absence of resources for that task
    document.getElementById('allSugarGeometry').value = 'neutral';
  };
  
  av.sgr.allSugarDiffusionChange = function(domObj) {
    var selectedOption = domObj.value;
    //console.log('selected=', selectedOption);
    var diffussionFlag = false;
    if ('true' == domObj.value) { diffussionFlag = true; }
    var endName = 'diffuseCheck';   
    var domName = '';
    var numtasks = av.sgr.logicNames.length;
    var start =1;   //only grid geometry can have diffusion, item 0 is for global
    // all tasks
    //console.log('endName=', endName, '; numtasks=', numtasks, '; sub=', sub, ' numRegons=', av.nut.numRegionsinHTML);
    for (var ii=0; ii< numtasks; ii++) {  
      for (var sub=start; sub <= av.nut.numRegionsinHTML; sub++) {
      //change glabal and all subsections  (only 1 sub secton for now) - this may need to change later; but only allowing None and Infinte for now, so ok.
        domName = av.sgr.logicNames[ii] + sub + endName;
        //console.log('domName='+domName, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub);
        //console.log('dom.'+domName+'.value =',  document.getElementById(domName).value, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub);
        document.getElementById(domName).checked = diffussionFlag;
        av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], sub, 'av.sgr.ChangeAllsugarSupplyType');   //only need to do once per task/subsection combo even if it does change both global and subtasks
        if (10 < sub) break;
      }
    }
    //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
    document.getElementById('allSugarDiffusion').value = 'neutral';
  };

//--------------------------------------------------------------------------------- av.sgr.ChangeAllsugarSupplyType --

  av.sgr.allSugarRegionLayoutChange = function(domObj) {
    //console.log('in av.sgr.allSugarRegionLayoutChange: value=', domObj.value);
    var selectedOption = domObj.value;
    var endName = 'regionLayout';   //nan0supplyType  the 0 is present because we were considering doing upto 4 local areas and easier to take the 0 out later, than to put it in. 
    //console.log(from, ' called av.sgr.ChangeAllsugarSupplyType: selectedOption=',selectedOption);
    var domName = '';  
    var numtasks = av.sgr.logicNames.length;
    var sub=0;   //most will start with 0 for global and also do local section 1
    // all tasks
    for (var ii=0; ii< numtasks; ii++) {  
      //change glabal and all subsections  (only 1 sub secton for now) - this may need to change later; but only allowing None and Infinte for now, so ok.
        domName = av.sgr.logicNames[ii] + sub + endName;
        //console.log('domName='+domName, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub, '; value=', domObj.value);
        //console.log('dom.'+domName+'.value =',  document.getElementById(domName).value, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub);
        document.getElementById(domName).value = selectedOption;
        av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], sub, 'av.sgr.ChangeAllsugarSupplyType');   //only need to do once per task/subsection combo even if it does change both global and subtasks
    }
    //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
    document.getElementById('allSugarRegionLayout').value = 'neutral';
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.allsugarSupplyTypeChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var selectedValue = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllsugarSupplyType(selectedValue, 'av.sgr.allsugarSupplyTypeChange');
    document.getElementById('allsugarSupplyType').value = 'neutral';
  };

  //--------------------------------------------------------------------------------- av.sgr.ChangeAllsugarSupplyType --
  av.sgr.ChangeAllsugarSupplyType = function(selectedOption, from) {
    var endName = 'supplyType';   //nan0supplyType  the 0 is present because we were considering doing upto 4 local areas and easier to take the 0 out later, than to put it in. 
    //console.log(from, ' called av.sgr.ChangeAllsugarSupplyType: selectedOption=',selectedOption);
    var domName = '';  
    var numtasks = av.sgr.logicNames.length;
    var start = 0;   //most will start with 0 for global and also do local section 1
    if ('Finite' == selectedOption) { start=1; }   //only local finte implemented for now; global finite not implemented.
    // all task
    //console.log('start='+start, '; tsklen='+numtasks, '; endName='+endName, '; value=', selectedOption);
    for (var ii=0; ii< numtasks; ii++) {  
      //change glabal and all subsections  (only 1 sub secton for now) - this may need to change later; but only allowing None and Infinte for now, so ok.
      domName = av.sgr.logicNames[ii] + 'W' + endName;
      //console.log('domname=', domName);
      document.getElementById(domName).value = selectedOption;
      //console.log('document.getElementById('+domName+').value=', document.getElementById(domName).value);
      av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 0, 'av.sgr.ChangeAllsugarSupplyType');
      for (var sub=start; sub<= 2; sub++) {
        domName = av.sgr.logicNames[ii] + sub + endName;
        //console.log('domName='+domName, '; selectedOption='+selectedOption+'|');
        document.getElementById(domName).value = selectedOption;
        //console.log('dom.'+domName+'.value =',  document.getElementById(domName).value, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub);
        //if (0 < sub) av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], sub, 'av.sgr.ChangeAllsugarSupplyType');   //only need to do once per task/subsection combo even if it does change both global and subtasks
        av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], sub, 'av.sgr.ChangeAllsugarSupplyType');   //only need to do once per task/subsection combo even if it does change both global and subtasks
      }
    }
    //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.allSugarDetailsOpenClose = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var selectedOption = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.OpenCloseAllSugarDetails(selectedOption, 'av.sgr.allSugarDetailsOpenClose');
    document.getElementById('allSugarDetails').value = 'neutral';
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.geometryChange = function (selectObj) {
    //need to find subregion Number in the future - set to 1 for now.;
    var taskID = selectObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
 // if (av.dbg.flg.nut) { console.log('av.sgr.geometryChange: taskID=', taskID, '; task =', task, '; subsection=', sub); }
    sub = 1;       //or should this be 0 since it is in the 'summary' section?
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.geometryChange');
    //does av.sgr.changeDetailsLayout need a 'sub' value? 
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.supplyChange_placeholder = function (domObj) {
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
 // if (av.dbg.flg.nut) { console.log('taskID=', taskID, 'task=', task, '; subsection=', sub); }
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'supplyChange_placeholder');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.regionLayoutChange = function (domObj) {
  if (av.dbg.flg.nut) { console.log('av.sgr.regionLayoutChange was called by', domObj); }
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    //console.log('taskID=', taskID, 'task=', task, '; subsection=', sub);
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.regionLayoutChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.supplyChange = function (domObj) {
    var taskID = domObj.id;
    var value = domObj.value;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    if ('1' == sub) {
      var tmpstr = task + 'W' + taskID.substr(4);
      console.log('av.sgr.supplyChange: taskID=', taskID, '; task=', task, '; subsection=', sub, '; suffix=', taskID.substr(4), '; value=', value, '; tmpstr = '+tmpstr);
      document.getElementById(tmpstr).value = domObj.value;
    }
    else if ('W' == sub) {
      var tmpstr = task + '1' + taskID.substr(4);
      console.log('av.sgr.supplyChange: taskID=', taskID, '; task=', task, '; subsection=', sub, '; suffix=', taskID.substr(4), '; value=', value, '; tmpstr = '+tmpstr);
      document.getElementById(tmpstr).value = domObj.value;      
    }
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.supplyChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.eachSugarCheckBoxChange = function (domObj) {
  //av.sgr.re_region = /(\D+)(\d+)(.*$)/;
    var taskID = domObj.id;
    var matchTaskRegion = taskID.match(av.sgr.re_region);
    var task = matchTaskRegion[1];      //taskID.substring(0,3);   
    var sub = matchTaskRegion[2];       //taskID.substring(3,1);   did not work; substr seems to work for sub
 // if (av.dbg.flg.nut) { console.log('av.sgr.eachSugarCheckBoxChange: taskID=', taskID, 'tst=', task, '; subsection=', sub); }
    if (1 < sub)
      sub = 1;
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.eachSugarCheckBoxChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.periodChange = function (domObj) {
    //console.log('av.sgr.periodChange domObj=', domObj);
 // if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.initialChange = function (domObj) {
 // if (av.dbg.flg.nut) { console.log('domObj.value=', domObj.value, '; id=, domObj.id); }
    //var ndx = domObj.id.indexOf('Input');
    //var id = domObj.id.substring(0, ndx) + 'Text';
    var id = domObj.id;
    // console.log('text id=', id, '; input id=', domObj.id);
    // console.log('Number(domObj.value)=',Number(domObj.value));
    if (isNaN(Number(domObj.value))) {
      document.getElementById(id).innerHTML = 'inital amount must be a number';
      document.getElementById(id).style.color = 'red';
    } else if (0 > domObj.value) {
      document.getElementById(id).innerHTML = 'inital amount must be > 0';
      document.getElementById(id).style.color = 'red';
    } else {
      document.getElementById(id).innerHTML = 'inital amount / cell';
      document.getElementById(id).style.color = 'black';
      var tsk = domObj.id.substring(0, 3);  //start and end (does not inlcude end)
      var sub = domObj.id.substr(3, 1);     //start and number of characters
      var geometry = document.getElementById(tsk+'0geometry').value;
      var supplyType = document.getElementById(tsk+sub+'supplyType').value;
      console.log('tsk=', tsk, '; geometry=', geometry, '; supplyType=', supplyType);
      
     av.sgr.setColorFlagBasedonSugarPresence(geometry, tsk, 'av.sgr.initialChange');
    }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.inflowChange = function (domObj) {
 // if (av.dbg.flg.nut) { console.log('av.sgr.inflowChange domObj=', domObj); }
 // if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
    var id = domObj.id;
    var equilbrium = 1;
    var preID = id.substr(0,4);
    var postID = id.substr(-4,2);
    var textID = preID + 'inflow' + postID + 'Text';
    console.log('id=', domObj.id, '; domObj.value=', domObj.value, '; preID=', preID, '; postID=', postID, '; textID=', textID);
    if (isNaN(Number(domObj.value))) {
      document.getElementById(textID).innerHTML = 'inflow amount must be a number';
      document.getElementById(textID).style.color = 'red';
    } else if (0 >= domObj.value) {
      document.getElementById(textID).innerHTML = 'inflow amount must be >= 0';
      document.getElementById(textID).style.color = 'red';
    } else {
      document.getElementById(textID).innerHTML = 'inflow amount / cell';
      document.getElementById(textID).style.color = 'black';
      equilbrium = parseFloat(document.getElementById(preID+'inflow'+ postID + 'Np').value)/
                   parseFloat(document.getElementById(preID+'outflow'+ postID + 'Np').value);
      console.log('av.dom.'+preID+'chmstat'+postID+'Text = ', equilbrium.toFixed(1) + ' = equilibrium if not eaten');
      document.getElementById(preID+'chmstat'+postID +'Text').innerHTML = equilbrium.toFixed(1) + ' = equilibrium if not eaten';
  };
};

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.outflowChange = function (domObj) {
 // if (av.dbg.flg.nut) { console.log('av.sgr.outflowChange domObj=', domObj); }
 // if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
    var id = domObj.id;
    var equilbrium = 1;
    var preID = id.substr(0,4);
    var postID = id.substr(-4,2);
    var textID = preID + 'outflow' + postID + 'Text';
    console.log('id=', domObj.id, '; domObj.value=', domObj.value, '; preID=', preID, '; postID=', postID, '; textID=', textID);
    if (isNaN(Number(domObj.value))) {
      document.getElementById(textID).innerHTML = 'outflow fraction must be a number';
      document.getElementById(textID).style.color = 'red';
    } else if (0 >= domObj.value || domObj.value >  1) {
      document.getElementById(textID).innerHTML = 'Required: 0 < outflow fraction <= 0';
      document.getElementById(textID).style.color = 'red';
    } else {
      document.getElementById(textID).innerHTML = 'outflow fraction / cell';
      document.getElementById(textID).style.color = 'black';
      equilbrium = parseFloat(document.getElementById(preID+'inflow'+ postID + 'Np').value)/
                   parseFloat(document.getElementById(preID+'outflow'+ postID + 'Np').value);
      console.log('av.dom.'+preID+'chmstat'+postID+'Text = ', equilbrium.toFixed(1) + ' = equilibrium if not eaten');
      document.getElementById(preID+'chmstat'+postID +'Text').innerHTML = equilbrium.toFixed(1) + ' = equilibrium if not eaten';
    }
  };

  /*********************************************************************************** end calls directly from dom ****/



  //--------------------------------------------------------------------------------------------- av.sgr.ChangeAllGeo --
  //This does  not deal with complement, I'll do that later if asked. 
  av.sgr.ChangeAllGeo = function(selectedOption){
    var sub = 1;  //need to figure out subsections later
    var idName = '';
    var numtasks = av.sgr.logicNames.length;
    for (var ii=0; ii< numtasks; ii++) {
    //for (var ii=1; ii< 3; ii++) {
      idName = av.sgr.logicNames[ii] + '0geometry';   //nan0geometry
      document.getElementById(idName).value = selectedOption;

      av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], sub, 'av.sgr.ChangeAllGeo');
    }
    //console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption);
  };

  //------------------------------------------------------------------------------------------- av.sgr.setSugarColors --
    // not called as of 2020_0124
  av.sgr.setSugarColors = function(colorFlg) {
    var idname;
    var backgndColor = av.color.greyMap[av.sgr.sugarGreyShade];
    var nameColor = 'Black';
    var darkColor = '#eee';
    var len = av.sgr.sugarColors.length;
    for (ii = 0; ii < len; ii++) {
      //need to think this thru as eventually there will be up to 4 subsections. Just one for now.
      idname = av.sgr.logicNames[ii]+'0section';
      //if ('Local' == document.getElementById('allSugarGeometry').value) {    //when determined by local vs global 
      if (colorFlg) {
        backgndColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarBackgroundShade];
        nameColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade]; 
        darkColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade+10]; 
      }
      idname = av.sgr.logicNames[ii]+'0section';
      document.getElementById(idname).style.backgroundColor = backgndColor;
      idname = av.sgr.logicNames[ii]+'0title';
      //console.log('idname=',idname);
      document.getElementById(idname).style.color = nameColor;  
      // eventually there will be up to 4 subsections. deal with that later.
      for (var sub=1; sub < 3; sub++) {
        idname = av.sgr.logicNames[ii]+sub+'regionName';
        document.getElementById(idname).style.color = darkColor;  
        // console.log('set color for idname=', idname);
      }
    }
  };
  
  //if (av.dbg.flg.root) { console.log('Root: av.sgr.updateSugarColors'); }
  //---------------------------------------------------------------------------------------- av.sgr.updateSugarColors --
  // not called as of 2020_0124
  av.sgr.updateSugarColors = function() {
    var tsk;
    var sub = 1;
    var colorFlg = true;
    var from = 'av.sgr.update.colors';
    var geometry, supplyType, initial;
    var len = av.sgr.logicNames.length;
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      geometry = document.getElementById(tsk+'0geometry').value;
      if ('global' == geometry.toLowerCase()) {
        supplyType = document.getElementById(tsk + '0supplyType').value.toLowerCase();
        if ('none' == supplyType.toLowerCase() ) {
          colorFlg = false;
        }
      }
      // now look at local resources that might be different in the different subSections in the future. 
      else {
        supplyType = document.getElementById(tsk + sub + 'supplyType').value.toLowerCase();
        if ('none' == supplyType.toLowerCase() ) {
          colorFlg = false;
        }
        else if ('finite' == supplyType.toLowerCase() ) {
          initial = document.getElementById(tsk+sub+'initialHiNp').value;
          if (0 >= initial) {
            colorFlg = false;
          }
        }
      }
      // for all tasks call setSingeleSugarColor
      av.sgr.setSingleSugarColor(colorFlg, ii, from);
    }
  };
  //------------------------------------------------------------------------------------ end av.sgr.updateSugarColors --

  //if (av.dbg.flg.root) { console.log('Root: av.sgr.OpenCloseAllSugarDetails'); }
  //--------------------------------------------------------------------------------- av.sgr.OpenCloseAllSugarDetails --
  av.sgr.OpenCloseAllSugarDetails = function(selectedOption, from) {
    var endName = '0section';   //nanGeometry
    var idName = '';
    var openFlag = false;
    var numtasks = av.sgr.logicNames.length;
    if ('allOpen' == selectedOption) {openFlag = true;}
    for (var ii=0; ii< numtasks; ii++) {
    //for (var ii=1; ii< 3; ii++) {
      idName = av.sgr.logicNames[ii] + endName;
      document.getElementById(idName).open = openFlag;
    }
    //if (av.dbg.flg.nut) { console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption, '; openFlag=', openFlag, '; from=', from); }
  };
  //----------------------------------------------------------------------------- end av.sgr.OpenCloseAllSugarDetails --
  
  if (av.dbg.flg.root) { console.log('Root: av.sgr.setSingleSugarColor()'); }
  //-------------------------------------------------------------------------------------- av.sgr.setSingleSugarColor --
  av.sgr.setSingleSugarColor = function(colorFlg, tskNum, from) {
    //if (av.dbg.flg.nut) { console.log(from, 'called av.sgr.setSingleSugarColor: tskNum=', tskNum, '; colorFlg=', colorFlg); }
    //console.log(from, 'called av.sgr.setSingleSugarColor: tskNum=', tskNum, '; colorFlg=', colorFlg);
    var idname;
    var backgndColor = av.color.greyMap[av.sgr.sugarGreyShade];
    var nameColor = 'Black';
    var darkColor = '#eee';
      //need to think this thru as eventually there will be up to 4 subsections. Just one for now.
      idname = av.sgr.logicNames[tskNum]+'0section';
      //if ('Local' == document.getElementById('allSugarGeometry').value) {    //when determined by local vs global 
      if (colorFlg) {
        backgndColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarBackgroundShade];
        nameColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade]; 
        darkColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade+10]; 
      }
      // make grey
      else {
        backgndColor = av.color.greyMap[av.sgr.sugarBackgroundShade];
        nameColor = av.color.greyMap[av.sgr.sugarNameShade]; 
        darkColor = av.color.greyMap[av.sgr.sugarNameShade+10];         
      }
      idname = av.sgr.logicNames[tskNum]+'0section';
      document.getElementById(idname).style.backgroundColor = backgndColor;
      idname = av.sgr.logicNames[tskNum]+'0title';
      // if (av.dbg.flg.nut) { console.log('idname=',idname); }
      document.getElementById(idname).style.color = nameColor;  
      // eventually there will be up to 4 subsections. deal with that later.
      for (var sub=1; sub <= av.nut.numRegionsinHTML; sub++) {
        idname = av.sgr.logicNames[tskNum]+sub+'regionName';
        //console.log('set color for idname=', idname);
        document.getElementById(idname).style.color = darkColor;  
        idname = av.sgr.logicNames[tskNum]+sub+'subSection';
        document.getElementById(idname).style['border-top'] = '1px solid '+darkColor;  
      }
  };
  //---------------------------------------------------------------------------------- end av.sgr.setSingleSugarColor --

  //if (av.dbg.flg.root) { console.log('Root: before av.sgr.setColorFlagBasedonSugarPresence'); }
  //------------------------------------------------------------------------- av.sgr.setColorFlagBasedonSugarPresence --
  av.sgr.setColorFlagBasedonSugarPresence = function(geometry, tsk, from) {
 // if (av.dbg.flg.nut) { console.log(from, 'called av.sgr.setColorFlagBasedonSugarPresence: supplyType=', supplyType, '; geometry=', geometry, '; tsk=', tsk, '; sub=', sub); }
    //console.log(from, 'called av.sgr.setColorFlagBasedonSugarPresence: geometry=', geometry, '; tsk=', tsk);
    var colorFlg = false;
    var supplyType;
    var domObjName;
    var indx = av.sgr.logicNames.indexOf(tsk);
    var edTsk = av.sgr.logEdNames[indx];
    //console.log('tsk=', tsk, '; indx=', indx, '; edTsk=', edTsk, '; geometry=', geometry);
    av.nut[edTsk].uiAll.regionsNumOf =  Number(av.nut[edTsk].uiAll.regionLayout.substr(0,1) );
    if ('global' == geometry.toLowerCase()) {
      supplyType = document.getElementById(tsk + '0supplyType').value.toLowerCase();
      //console.log('supplyType=', supplyType);
      if ('none' != supplyType.toLowerCase() ) {
        colorFlg = true;
      }
    }
    // now look at local resources that might be different in the different subSections in the future. 
    else {
      for (var ii=1; ii <=av.nut[edTsk].uiAll.regionsNumOf; ii++) {
        domObjName = tsk + ii + 'supplyType';
        //console.log('tsk=', tsk, '; ii=', ii);
        //console.log('domElementID=|' + domObjName +'|');
        //console.log(domObjName+'.value=', document.getElementById(domObjName).value);
        supplyType = document.getElementById(domObjName).value.toLowerCase();
        if ('none' != supplyType.toLowerCase() ) {
          colorFlg = true;
        }
        if ('finite' == supplyType.toLowerCase() ) {
          initial = document.getElementById(tsk+ii+'initialHiNp').value;
          if (0 < initial) {
            colorFlg = true;
          }
        }
      }
    } // end else Grid=geometry
    // for all tasks call setSingeleSugarColor
    av.sgr.setSingleSugarColor(colorFlg, indx, 'av.sgr.setColorFlagBasedonSugarPresence');
  };
  //--------------------------------------------------------------------- end av.sgr.setColorFlagBasedonSugarPresence --


  //if (av.dbg.flg.root) { console.log('Root: before av.sgr.changeDetailsLayout'); }
  //-------------------------------------------------------------------------------------- av.sgr.changeDetailsLayout --
  av.sgr.changeDetailsLayout = function(tsk, subChanged, from) {
    //these are not as usefull, turn on the one after the first if ('global' statement if problems
    //if (true) { console.log(from, 'called av.sgr.changeDetailsLayout: task=', tsk, '; subChanged=', subChanged); }
    // if (av.dbg.flg.nut) { console.log('av.nut.hideFlags=', av.nut.hideFlags); }
    var tmpNum = 1;
    var show1SupplyType=false;
    var ndx = av.sgr.logicNames.indexOf(tsk);
    var edTsk = av.sgr.logEdNames[ndx];
    var supplyType;
    var regionName;
    var regionLayout = document.getElementById(tsk+'0regionLayout').value;
    var regionNameList;
    // one line method to get value of select/option struture.
    //console.log('onlygrid=', av.sgr.gridOnly, '; mnDebug=', av.doj.mnDebug.style.visibility, '; geoStyle=', document.getElementById(tsk+'0geometry').style.displaly, '; regionLayout=', regionLayout);
    //console.log('onlygrid=', av.sgr.gridOnly, '; mnDebug=', av.doj.mnDebug.style.visibility, '; regionLayout=', regionLayout);

//  if (av.sgr.gridOnly && 'visible' != av.doj.mnDebug.style.visibility) {  
    if (av.sgr.gridOnly && 'visible' != av.doj.mnDebug.style.visibility) {
      showGeo = 'gridOnly';
      document.getElementById(tsk+'0regionLayout').style.display = 'inline-block';
      //av.nut[edTsk].uiAll.geometry = document.getElementById(tsk+'0geometry').value = 'grid';
      show1SupplyType = false;
      document.getElementById(tsk+'0geometry').style.displaly = 'none';
      if ('1All' == regionLayout) {
        document.getElementById(tsk+'WsupplyType').style.display = 'inline-block';
        document.getElementById(tsk+'1supplyType').style.display = 'none';
        //console.log(tsk+'1supplyType.class, style=', document.getElementById(tsk+'1supplyType').class, document.getElementById(tsk+'1supplyType').style.display);
      }
      else {
        showGeo = 'grid';
        show1SupplyType = true;
        document.getElementById(tsk+'WsupplyType').style.display = 'none';
        document.getElementById(tsk+'1supplyType').style.display = 'inline-block';
      }
    }
    else {
        showGeo = 'grid';
        show1SupplyType = true;    //showgeo
        document.getElementById(tsk+'0regionLayout').style.display = 'none';
        document.getElementById(tsk+'WsupplyType').style.display = 'inline-block';
        document.getElementById(tsk+'1supplyType').style.display = 'inline-block';
    }
    av.nut[edTsk].uiAll.geometry = document.getElementById(tsk+'0geometry').value;
    av.nut[edTsk].uiAll.regionLayout = document.getElementById(tsk+'0regionLayout').value;
    //console.log('layout =', av.nut[tsk].uiAll.regionLayout, '; tsk=', tsk, ' subChanged=', subChanged, '; from=', from);
    av.nut[edTsk].uiAll.regionsNumOf =  Number(av.nut[edTsk].uiAll.regionLayout.substr(0,1) );
    //console.log('num sub Regions=', av.nut[edTsk].uiAll.regionsNumOf, 'layoutName=', '|'+av.nut[edTsk].uiAll.regionLayout+'|');
    
    regionNameList = av.sgr[av.nut[edTsk].uiAll.regionLayout];
    switch (av.nut[edTsk].uiAll.regionLayout) {
      case '1All':
        regionNameList = av.sgr.name['1All'];
        
        break;
      case '2LftRit':
        regionNameList = av.sgr.name['2LftRit'];
        break;
    };

    //console.log('regionNameList=', regionNameList);
    //this 2 line method woks to get the value of the option in the select structure, but so does the one line method;
    //var idx = document.getElementById(tsk+'0geometry').selectedIndex;
    //var geoOption = document.getElementById(tsk+'0geometry').options[idx].value;   // get the value of the selected option   
    // if (av.dbg.flg.nut) { console.log('geometry=', geometry, '; geoOption=', geoOption); }

    //hide everything. Display parts based on what is selected
    document.getElementById(tsk+'0supplyType').style.display = 'none';
    document.getElementById(tsk+'0initialDiv').style.display = 'none';
    //if (av.dbg.flg.nut) { console.log('document.getElementById('+tsk+sub+'supplyTypeSelectHolder) =', document.getElementById(tsk+sub+'supplyTypeSelectHolder')); }

    // hide for all subsections possible not just the number based on the regon layout type
    for (var sub=1; sub <= av.nut.numRegionsinHTML; sub++) {
      document.getElementById(tsk+sub+'supplyTypeSelectHolder').style.display = 'none';
      document.getElementById(tsk+sub+'regionName').style.display = 'none';
      document.getElementById(tsk+sub+'blank').style.display = 'none';      
      document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'none';
      document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'none';
      document.getElementById(tsk+sub+'periodCheckbox').style.display = 'none';
      document.getElementById(tsk+sub+'periodTime').style.display = 'none';
      document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'none';
      document.getElementById(tsk+sub+'sideHiText').style.display = 'none';
      document.getElementById(tsk+sub+'sideLoText').style.display = 'none';
      document.getElementById(tsk+sub+'initialHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'initialLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'none';
      tmpstr = JSON.stringify(av.nut[edTsk].uiSub.supplyType);
      //console.log('av.nut['+edTsk+'].uiSub.supplyType['+sub+'] =',av.nut[edTsk].uiSub.supplyType[sub], '; supplyType=', tmpstr);
    };
    //console.log('av.nut.'+edTsk+'.uiAll.geometry.tolower()=',av.nut[edTsk].uiAll.geometry.toLowerCase());
    if ('global' == av.nut[edTsk].uiAll.geometry.toLowerCase()) {
      document.getElementById(tsk+'WsupplyType').style.display = 'none';
      document.getElementById(tsk+'0supplyType').style.display = 'inline-block';  
      av.nut[edTsk].uiAll.supplyType = document.getElementById(tsk + '0supplyType').value;
      switch (av.nut[edTsk].uiAll.supplyType.toLowerCase()) {
        case 'none': 
        case 'infinite': 
          document.getElementById(tsk+'0section').open = false;
          break;
        case 'finite': 
          document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
          document.getElementById(tsk+'0section').open = false;
          break;
        case 'chemostat':
          document.getElementById(tsk+'1periodCheckbox').style.display = 'block';
          document.getElementById(tsk+'1inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+'1outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+'1inflowHiText').innerHTML = 'Inflow amount / cell';
          document.getElementById(tsk+'1outflowHiText').innerHTML = 'Outflow fraction / cell';
          document.getElementById(tsk+'1chmstatHiDiv').style.display = 'block';
          document.getElementById(tsk+'1chmstatHiText').innerHTML = ' = chemostat when resource not consumed';
          document.getElementById(tsk+'1subSection').className = 'grid-sugarDetail-globalsugarDetail-chemostat';
          // if (av.dbg.flg.nut) { console.log('task='+tsk, '; sub='+sub, '; get className from dom of ', tsk+'0Details'); }
          // if (av.dbg.flg.nut) { console.log('task='+tsk,'; Details.class=', document.getElementById(tsk+'0Details').className); }
          // if (av.dbg.flg.nut) { console.log(tsk+'1periodCheckbox.checked value =', document.getElementById(tsk+'1periodCheck').checked, document.getElementById(tsk+'1periodCheck').value); }
          if (true == document.getElementById(tsk+'1periodCheck').checked) {
            document.getElementById(tsk+'1periodTime').style.display = 'block';
            document.getElementById(tsk+'1chmstatHiText').innerHTML = ' = chemostat when resource not consumed';
            document.getElementById(tsk+'1subSection').className = 'grid-sugarDetail-globalEqualPeriod-container';
          };
          document.getElementById(tsk+'0section').open = true;
          break;
        case 'debug':
          document.getElementById(tsk+'0section').open = true;
          document.getElementById(tsk+'1periodCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+'1gradientCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+'1diffuseCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
          document.getElementById(tsk+'1periodTime').style.display = 'block';
          document.getElementById(tsk+'1initialHiDiv').style.display = 'block';
          document.getElementById(tsk+'1initialLoDiv').style.display = 'block';
          document.getElementById(tsk+'1inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+'1inflowLoDiv').style.display = 'block';
          document.getElementById(tsk+'1outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+'1outflowLoDiv').style.display = 'block';
          document.getElementById(tsk+'1chmstatHiDiv').style.display = 'block';
          document.getElementById(tsk+'1chmstatLoDiv').style.display = 'block';
          document.getElementById(tsk+'1hiSideSelectHolder').style.display = 'block';
          document.getElementById(tsk+'1sideText').innerHTML = 'Side text describing what side means';
          document.getElementById(tsk+'1subSection').className = 'grid-sugarDetailAll-container';
       // if (av.dbg.flg.nut) { console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className); }
          break;
      }    
    }        // end global 
    else {
      // geometry = grid
      document.getElementById(tsk+'0regionLayout').style.display = 'inline-block';
      document.getElementById(tsk+'0section').open = true;
//      console.log('av.nut['+edTsk+'].uiAll.regionsNumOf=', av.nut[edTsk].uiAll.regionsNumOf);
      for (var sub=1; sub <= av.nut[edTsk].uiAll.regionsNumOf; sub++) {
        av.nut[edTsk].uiSub.supplyType[sub] = document.getElementById(tsk + sub + 'supplyType').value;
        //console.log('sub=', sub,'; regionNameList=',  regionNameList);
        regionName = regionNameList[sub];
        document.getElementById(tsk+sub+'regionName').innerHTML = regionName;
//        if (av.sgr.gridOnly && 'visible' != av.doj.mnDebug.style.visibility) {
        if ('gridOnly'== showGeo) {
          document.getElementById(tsk+'1regionName').style.display = 'none';
          document.getElementById(tsk+'1supplyTypeSelectHolder').style.display = 'none';
        }
        else {
          document.getElementById(tsk+sub+'regionName').style.display = 'block';
          document.getElementById(tsk+sub+'supplyTypeSelectHolder').style.display = 'block';
        }
        if (av.nut.hideFlags.gradient) {
          document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'none';
          document.getElementById(tsk+sub+'gradientCheck').checked = false;
        }
        if (av.nut.hideFlags.periodic) {
          document.getElementById(tsk+sub+'periodCheckbox').style.display = 'none';
          document.getElementById(tsk+sub+'periodCheck').checked = false;
        }
        //console.log('supplyType ui =', document.getElementById(tsk + sub + 'supplyType').value);
        //console.log('tsk=', tsk, 'edTsk=', edTsk, 'sub=', sub, '; uiSub=', av.nut[edTsk].uiSub) ;
        //console.log('supplyType nut =', av.nut[edTsk].uiSub.supplyType[sub]);
        // if (av.dbg.flg.nut) { console.log('Nut: tsk=', 'sub=', sub, tsk,'supplyType=', av.nut[edTsk].uiSub.supplyType[sub].toLowerCase(),'regionLayout=', document.getElementById(tsk+'0regionLayout').value); }
        switch (av.nut[edTsk].uiSub.supplyType[sub].toLowerCase()) {    //for when geometery = local
          case 'none':
          case 'infinite': 
              //document.getElementById(tsk+sub+'blank').style.display = 'block';      
              document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-Infinite-container';
            break;
          case 'finite':   //Local
            // if (av.dbg.flg.nut) { console.log('av.nut.hideFlags.gradient=',av.nut.hideFlags.gradient); }
            document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'block';
            document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'block';
            // if (av.dbg.flg.nut) { console.log('task=',tsk, '; sub=', sub, '; gradientCheck.checked=', document.getElementById(tsk+sub+'gradientCheck').checked); }
            if (true == document.getElementById(tsk+sub+'gradientCheck').checked) {  
              //gradient
              document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
              document.getElementById(tsk+sub+'sideText').innerHTML = 'Choose the side to have the a higher initla amount';
              document.getElementById(tsk+sub+'initialHiText').innerHTML = 'High side initial amount / cell';
              document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
              document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-FiniteGradient-container';
           // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
            }
            else {
              //not-gradient; Local
              document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'initialHiText').innerHTML = 'Inital amount in each cell';
              document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-Finite-container';
              if (av.nut.hideFlags.gradient) {
                document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'none';
                //console.log('id=', tsk+sub+'gradientCheck');
                document.getElementById(tsk+sub+'gradientCheck').checked = false;
                document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-Finite-noGradientCheckbox-container';
              }
              // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
              // if (av.dbg.flg.nut) { console.log('subSection=', document.getElementById(tsk+sub+'subSection')); }
            }
            break;
          case 'chemostat':
            // if (av.dbg.flg.nut) { console.log(tsk,'0gradientCheckbox.checked=', document.getElementById(tsk+sub+'gradientCheck').checked); }
            // if (!av.nut.hideFlags.gradient) { document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';}
            // if (!av.nut.hideFlags.periodic) { document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';  }
            document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
            //if (av.dbg.flg.nut) { console.log(tsk+sub+'gradientCheck', document.getElementById(tsk+sub+'gradientCheck').checked, '; av.sgr.hideFlgNames.gradient=', av.sgr.hideFlgNames.gradient); }
            if (true == document.getElementById(tsk+sub+'gradientCheck').checked && !av.sgr.hideFlgNames.gradient) {
              //gradient
              document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
              document.getElementById(tsk+sub+'sideText').innerHTML = 'Side with a higher amount';
    //          document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
    //          document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
              document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
              document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
              document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'block';
              document.getElementById(tsk+sub+'chmstatHiText').innerHTML = ' = chemostat on high side.';
              document.getElementById(tsk+sub+'chmstatLoText').innerHTML = ' = equilibrium on Low side';
              document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow amount / cell on high side.';
              document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow fraction / cell on high side';
              document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostatGradient-container';
              // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
              if (true == document.getElementById(tsk+sub+'periodCheck').checked && !av.sgr.hideFlgNames.periodic) {
                document.getElementById(tsk+sub+'periodTime').style.display = 'block';
                document.getElementById(tsk+sub+'sideText').innerHTML = 'Side with a higher amount';
                document.getElementById(tsk+sub+'subSection').className = showGeo + 'X';            
                // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
              }
            }
            else {
              //not-gradient; Local
              //document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
              //document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
              document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
              document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow amount / cell';
              document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow fraction / cell';
              document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
              if ( !isNaN(Number(document.getElementById(tsk+sub+'inflowHiNp').value))  && 
                   !isNaN(Number(document.getElementById(tsk+sub+'outflowHiNp').value)) ) {
                if ( 0 < Number(document.getElementById(tsk+sub+'outflowHiNp').value)  && 
                         Number(document.getElementById(tsk+sub+'outflowHiNp').value) <=1 ) {
                  tmpNum = Number(document.getElementById(tsk+sub+'inflowHiNp').value) / 
                           Number(document.getElementById(tsk+sub+'outflowHiNp').value);
                  document.getElementById(tsk+sub+'chmstatHiText').innerHTML = tmpNum.toFixed(1) + ' = chemostat if not eaten.';                  
                }
                else {
                  document.getElementById(tsk+sub+'chmstatHiText').innerHTML = 'outflow or inflow value is not valid';
                }
              }
              document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostat-container';
              //console.log('document.getElementById('+tsk+sub+'gradientCheck).checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
              //console.log('document.getElementById('+tsk+sub+'gradientCheckbox).style=', document.getElementById(tsk+sub+'gradientCheckbox').style);
           // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
              if (true == document.getElementById(tsk+sub+'periodCheck').checked  && !av.sgr.hideFlgNames.periodic) {
                document.getElementById(tsk+sub+'periodTime').style.display = 'block';
                document.getElementById(tsk+sub+'chmstatHiText').innerHTML = ' = equilibrium when not consumed';
                document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostatPeriod-container';            
                // if (av.dbg.flg.nut) { console.log('nut: tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
              };
            }
            break;
            /*
          case 'SourceSink':        //or should this be 'flow' as it must have diffusion and/or gravity ??
            document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+sub+'sideText').innerHTML = 'inflow side; outlow will be everywhere or on the opposite side';
            document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
            document.getElementById(tsk+'Details').className = 'grid-sugarDetailSourceSink-container';
         // if (av.dbg.flg.nut) { console.log('nanDetails.class=', document.getElementById(tsk+'Details').className); }
            break;
            */
          case 'Debug':
            document.getElementById(tsk+'0regionLayout').style.display = 'inline-block';
            document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
            document.getElementById(tsk+sub+'periodTime').style.display = 'block';
            document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
            document.getElementById(tsk+sub+'sideText').innerHTML = 'Side text describing what side means';
            document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
            document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
            document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
         // if (av.dbg.flg.nut) { console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className); }
            break;
        }; //end of switch
        //console.log('document.getElementById('+tsk+sub+'subSection).className=', document.getElementById(tsk+sub+'subSection').className);
          //console.log('document.getElementById('+tsk+sub+'gradientCheckbox).className=', document.getElementById(tsk+sub+'gradientCheckbox').className);
          //console.log('document.getElementById('+tsk+sub+'gradientCheck).style.display=', document.getElementById(tsk+sub+'gradientCheckbox').style.display);
      };  //end of subregion for loop
    }    //end of global/local if statement
    // if (av.dbg.flg.nut) { console.log('tsk=', tsk, 'sub=', sub, '; geometry=', geometry, '; supplyType =', supplyType, ' ' ,tsk+'0regionLayout=', document.getElementById(tsk+'0regionLayout').value ); }
    av.sgr.setColorFlagBasedonSugarPresence(av.nut[edTsk].uiAll.geometry.toLowerCase(), tsk, 'av.sgr.changeDetailsLayout');
        
    // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
  };
  //---------------------------------------------------------------------------------- end av.sgr.changeDetailsLayout --
  //---------------------------------------------------------------------------------------------- end sugars for Eco --
  if (av.dbg.flg.root) { console.log('Root: end sugars for Eco'); }


  //------------------------------------------------------------------------------------------ ex1 and tst2 delete later --
  //in tst2 page now
  av.ptd.ex1allSugarChange = function (allmode) {
    var onoff = 'none';
    var geometry = 'Local';
 // if (av.dbg.flg.nut) { console.log('ex1_allmode=', allmode); }
    if ( ('allon' == allmode) || ('alloff' == allmode) ) {
      geometry = 'global';
      if ('allon' == allmode) {
        onoff = 'Infinite';
      }
      else if ('alloff' == allmode) {
        onoff = 'none';
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

      document.getElementById('ex1notGlobalLocal').value = geometry;
      document.getElementById('ex1nanGlobalLocal').value = geometry;
      document.getElementById('ex1andGlobalLocal').value = geometry;
      document.getElementById('ex1ornGlobalLocal').value = geometry;
      document.getElementById('ex1oroGlobalLocal').value = geometry;
      document.getElementById('ex1antGlobalLocal').value = geometry;
      document.getElementById('ex1norGlobalLocal').value = geometry;
      document.getElementById('ex1xorGlobalLocal').value = geometry;
      document.getElementById('ex1equGlobalLocal').value = geometry;
    }
    else if ('allLocal' == allmode){
      //local was picked
      //would change to grey if this part was implemented 
    }
  };

  //in tst2 page now
  if (av.dbg.flg.root) { console.log('Root: before av.ptd.allSugarCheckBox'); }
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

  //for structure on tst2 tab; not currently called as of 2019 Aug 4
  /*
  av.ptd.envobj2form = function(from) {
 // if (av.dbg.flg.nut) { console.log(from, 'called av.ptd.envobj2form'); }
 // if (av.dbg.flg.nut) { console.log('av.ui.envRegion=',av.ui.envRegion, '; av.ui.envTask=', av.ui.envTask, '; av.ui.envDistribute=',av.ui.envDistribute); }
    if (true) return;
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
      // if (av.dbg.flg.nut) {  console.log('task='+task,'; av.fzr.env.rsrce[task] = ', av.fzr.env.rsrce[task]); }
      len = envobj.name.length;
      //console.log('len='+len, '; envobj.name=',envobj.name);

      while(ii < len && !found) {
     // if (av.dbg.flg.nut) { console.log('ii='+ii,'; envobj.name[ii]='+envobj.name[ii],'; envobj.name[ii].substring(3,10)='+envobj.name[ii].substring(3,10)+'|'); }
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
      else if ('Chemostat' == av.ui.envDistribute) {
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
  */
