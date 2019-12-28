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
  // if (av.debug.root) { console.log('Root: before av.sgr.buildHtml'); }
  av.sgr.buildHtml = function() {
    //console.log('in av.sgr.buildHtml');
    var tskSectionStr = '';
    //var subSectionStr = av.dom.orn1subSection.innterHTML;   //later there will be 4 of these for each sugar/task
    var newstr = '';
    var pattern0 = 'orn0';  
    var pattern1 = 'orn1';
    var sgrNum = '';
    var len = av.sgr.logicNames.length;
    for (ii=0; ii<len; ii++) {
      if ('orn' != av.sgr.logicNames[ii]) {
        tskSectionStr = av.dom.orn0section.innerHTML;
        sgrNum = av.sgr.logicNames[ii] + '0';
        //console.log('ii=', ii, '; sgrNum=',sgrNum);
        tskSectionStr = tskSectionStr.replaceAll(pattern0, sgrNum);
        //console.log('tskSectionStr=', tskSectionStr);

        //av.dom.showTextarea.value = tskSectionStr;
        document.getElementById(av.sgr.logicNames[ii]+'0section').innerHTML = tskSectionStr;
        document.getElementById(av.sgr.logicNames[ii]+'0title').innerHTML = av.sgr.oseNames[ii];

        newstr = av.dom.orn0Details.innerHTML;
        sgrNum = av.sgr.logicNames[ii] + '1';
        newstr = newstr.replaceAll(pattern1, sgrNum);
        document.getElementById(av.sgr.logicNames[ii]+'0Details').innerHTML = newstr;
      }
    };
      //Was using this to display how I was building sugar according data
      //console.log('av.dom.orn0section.innerHTML=', av.dom.orn0section.innerHTML);
      //av.dom.tst2textarea.value = document.getElementById('equ0Details').innerHTML;
      //av.dom.tst2textarea.value = tskSectionStr;

      av.dom.showTextarea.value = av.dom.sugarAccordion.innerHTML;  
      //av.dom.showTextarea.value = document.getElementById('not0Details');  
      //av.dom.showTextarea.value = newstr;
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
    av.sgr.setSugarColors(true);  //true is to turn colors on;
    document.getElementById('allSugarGeometry').value = 'Neutral';
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.allsugarSupplyTypeChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var which = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllsugarSupplyType(which);
    document.getElementById('allsugarSupplyType').value = 'Neutral';
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.allSugarDetailsOpenClose = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option 
    var selectedOption = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.OpenCloseAllSugarDetails(selectedOption, 'av.sgr.allSugarDetailsOpenClose');
    document.getElementById('allSugarDetails').value = 'Neutral';
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.geometryChange = function (selectObj) {
    //need to find subregion Number in the future - set to 1 for now. 
    var taskID = selectObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    if (av.dbg.flg.nut) { console.log('av.sgr.geometryChange: taskID=', taskID, '; task =', task, '; subsection=', sub); }
    sub = 1;       //or should this be 0 since it is in the 'summary' section?
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.geometryChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.supplyChange_placeholder = function (domObj) {
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    if (av.dbg.flg.nut) { console.log('taskID=', taskID, 'task=', task, '; subsection=', sub); }
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'supplyChange_placeholder');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.regionLayoutChange = function (domObj) {
    if (av.dbg.flg.nut) { console.log('av.sgr.regionLayoutChange was called by', domObj); }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.supplyChange = function (domObj) {
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    if (av.dbg.flg.nut) { console.log('av.sgr.supplyChange: taskID=', taskID, '; task=', task, '; subsection=', sub); }
    sub = 1; //only whole dish  for now  or should sub=0 when it it global?
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.supplyChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.eachSugarCheckBoxChange = function (domObj) {
  //av.sgr.re_region = /(\D+)(\d+)(.*$)/;
    var taskID = domObj.id;
    var matchTaskRegion = taskID.match(av.sgr.re_region);
    var task = matchTaskRegion[1];      //taskID.substring(0,3);   
    var sub = matchTaskRegion[2];       //taskID.substring(3,1);   did not work; substr seems to work for sub
    if (av.dbg.flg.nut) { console.log('av.sgr.eachSugarCheckBoxChange: taskID=', taskID, 'tst=', task, '; subsection=', sub); }
    if (1 < sub)
      sub = 1;
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, sub, 'av.sgr.eachSugarCheckBoxChange');
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.periodChange = function (domObj) {
    //console.log('av.sgr.periodChange domObj=', domObj);
    if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.initialChange = function (domObj) {
    //console.log('av.sgr.initialChange domObj=', domObj);
    if (av.dbg.flg.nut) { console.log('domObj.value=', domObj.value); }
    var ndx = domObj.id.indexOf('Input');
    var id = domObj.id.substring(0, ndx) + 'Text';
    //console.log('new id=', id, '; old id=', domObj.id);
    //console.log('Number(domObj.value)=',Number(domObj.value));
    if (isNaN(Number(domObj.value))) {
      document.getElementById(id).innerHTML = 'inital amount must be a number';
      document.getElementById(id).style.color = 'red';
    } else if (0 > domObj.value) {
      document.getElementById(id).innerHTML = 'inital amount must be > 0';
      document.getElementById(id).style.color = 'red';
    } else {
      document.getElementById(id).innerHTML = 'inital amount per cell';
      document.getElementById(id).style.color = 'black';
    }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.inflowChange = function (domObj) {
    if (av.dbg.flg.nut) { console.log('av.sgr.inflowChange domObj=', domObj); }
    if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
  };

//------------------------------------------------------------------------------------- av.sgr.allSugarGeometryChange --
  av.sgr.outflowChange = function (domObj) {
    if (av.dbg.flg.nut) { console.log('av.sgr.outflowChange domObj=', domObj); }
    if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
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

  //--------------------------------------------------------------------------------- av.sgr.ChangeAllsugarSupplyType --
  av.sgr.ChangeAllsugarSupplyType = function(selectedOption) {
    var endName = 'supplyType';   //nan0supplyType  the 0 is present because we were considering doing upto 4 local areas and easier to take the 0 out later, than to put it in. 
    //console.log('endName=', endName, '; selectedOption=',selectedOption);
    var domName = '';  
    var numtasks = av.sgr.logicNames.length;
    var start = 0;   //most will start with 0 for global and also do local section 1
    if ('Finite' == selectedOption) { start=1; }   //only local finte implemented for now; global finite not implemented.
    // all tasks
    for (var ii=0; ii< numtasks; ii++) {  
      //change glabal and all subsections  (only 1 sub secton for now) - this may need to change later; but only allowing None and Infinte for now, so ok.
      for (var jj=start; jj< 2; jj++) {
        domName = av.sgr.logicNames[ii] + jj + endName;
        document.getElementById(domName).value = selectedOption;
      }
      av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 1, 'av.sgr.ChangeAllsugarSupplyType');
    }
      //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
  };

  //------------------------------------------------------------------------------------------- av.sgr.setSugarColors --
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
      for (var jj=1; jj < 2; jj++) {
        idname = av.sgr.logicNames[ii]+jj+'title';
        document.getElementById(idname).style.color = darkColor;  
      }
    }
  };

  //--------------------------------------------------------------------------------- av.sgr.OpenCloseAllSugarDetails --
  av.sgr.OpenCloseAllSugarDetails = function(selectedOption, from){
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
    if (av.dbg.flg.nut) { console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption, '; openFlag=', openFlag, '; from=', from); }
  };

  //-------------------------------------------------------------------------------------- av.sgr.changeDetailsLayout --
  av.sgr.changeDetailsLayout = function(tsk, sub, from) {
    //these are not as usefull, turn on the one after the first if ('global' statement if problems
    //console.log(from, 'called av.sgr.changeDetailsLayout: task=', tsk, '; sub=', sub);
    //console.log('av.nut.hideFlags=', av.nut.hideFlags);

    var supplyType;

    // one line method to get value of select/option struture. 
    var geometry = document.getElementById(tsk+'0geometry').value;

    //this 2 line method woks to get the value of the option in the select structure, but so does the one line method;
    //var idx = document.getElementById(tsk+'0geometry').selectedIndex;
    //var geoOption = document.getElementById(tsk+'0geometry').options[idx].value;   // get the value of the selected option   
    // console log just hows that the two methods to get the selected option get the same answer
    //console.log('geometry=', geometry, '; geoOption=', geoOption);

    if ('global' == geometry.toLowerCase()) {
      supplyType = document.getElementById(tsk + '0supplyType').value.toLowerCase();
    }
    else {
      supplyType = document.getElementById(tsk + sub + 'supplyType').value.toLowerCase();

    };
    //console.log('tsk=', tsk, 'sub=', sub, '; geometry=', geometry, '; supplyType =', supplyType, ' ' ,tsk+'0regionLayout=', document.getElementById(tsk+'0regionLayout').value );

    //hide everything. Display parts based on what is selected
    document.getElementById(tsk+'0supplyType').style.display = 'none';      
    document.getElementById(tsk+'0regionLayout').style.display = 'none';
    document.getElementById(tsk+'0initialDiv').style.display = 'none';
    document.getElementById(tsk+sub+'supplyTypeSelectHolder').style.display = 'none';
    document.getElementById(tsk+sub+'title').style.display = 'none';
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
    document.getElementById(tsk+sub+'equalHiDiv').style.display = 'none';
    document.getElementById(tsk+sub+'equalLoDiv').style.display = 'none';
    if ('global' == geometry.toLowerCase()) {
      document.getElementById(tsk+'0supplyType').style.display = 'inline-block';      
      switch (supplyType) {
        case 'none': 
        case 'infinite': 
          document.getElementById(tsk+'0section').open = false;
          break;
        case 'finite': 
          document.getElementById(tsk+'0initialDiv').style.display = 'inline-block';
          document.getElementById(tsk+'0section').open = false;
          break;
        case 'equilibrium':
          document.getElementById(tsk+sub+'periodCheckbox').style.display = 'block';
          document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow amount per cell';
          document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow fraction per cell';
          document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when resource not consumed';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-globalEqual-container';
          console.log('task='+tsk, '; sub='+sub, '; get className from dom of ', tsk+'0Details');
          console.log('task='+tsk,'; Details.class=', document.getElementById(tsk+'0Details').className);
          console.log(tsk+'1periodCheckbox.checked value =', document.getElementById(tsk+'1periodCheck').checked, document.getElementById(tsk+'1periodCheck').value);
          if (true == document.getElementById(tsk+'1periodCheck').checked) {
            document.getElementById(tsk+sub+'periodTime').style.display = 'block';
            document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when resource not consumed';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-globalEqualPeriod-container';
          };
          document.getElementById(tsk+'0section').open = true;
          break;
        case 'debug':
          document.getElementById(tsk+'0section').open = true;
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
          document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
          document.getElementById(tsk+sub+'sideText').innerHTML = 'Side text describing what side means';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
          console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className);
          break;
      }    
    }        // end global 
    else {
      //document.getElementById(tsk+'0regionLayout').style.display = 'inline-block';
      document.getElementById(tsk+sub+'supplyTypeSelectHolder').style.display = 'block';
      //document.getElementById(tsk+sub+'title').style.display = 'block';    
      document.getElementById(tsk+'0section').open = true;

      switch (supplyType) {    //for when geometery = local
        case 'none':
        case 'infinite': 
            document.getElementById(tsk+sub+'blank').style.display = 'block';      
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-None-container';
          break;
        case 'finite':   //Local
          //console.log('av.nut.hideFlags.gradient=',av.nut.hideFlags.gradient);
          document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'block';
          document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'block';
          //console.log('task=',tsk, '; sub=', sub, '; gradientCheck.checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
          if (true == document.getElementById(tsk+sub+'gradientCheck').checked) {  
            //gradient
            document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
            document.getElementById(tsk+sub+'sideText').innerHTML = 'Choose the side to have the a higher initla amount';
            document.getElementById(tsk+sub+'initialHiText').innerHTML = 'High side initial amount per cell';
            document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-FiniteGradient-container';
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
          }
          else {
            //not-gradient; Local
            document.getElementById(tsk+sub+'initialHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'initialHiText').innerHTML = 'Inital amount in each cell';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Finite-container';
            if (av.nut.hideFlags.gradient) {
              document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'none';
              document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'none';
              document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Finite-noGridCheckbox-container';
            }
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
            //console.log('subSection=', document.getElementById(tsk+sub+'subSection'));
          }
          break;
        case 'equilibrium':
          console.log(tsk,'0gradientCheckbox.checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
          if (!av.nut.hideFlags.gradient) document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
          if (!av.nut.hideFlags.periodic) document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
          document.getElementById(tsk+sub+'diffuseCheckbox').style.display = 'inline-block';
          console.log(tsk+sub+'gradientCheck', document.getElementById(tsk+sub+'gradientCheck').checked, '; av.sgr.hideFlgNames.gradient=', av.sgr.hideFlgNames.gradient);
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
            document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'equalLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium on high side.';
            document.getElementById(tsk+sub+'equalLoText').innerHTML = ' = equilibrium on Low side';
            document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow amount per cell on high side.';
            document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow fraction per cell on high side';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualGradient-container';
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
            if (true == document.getElementById(tsk+sub+'periodCheck').checked && !av.sgr.hideFlgNames.periodic) {
              document.getElementById(tsk+sub+'periodTime').style.display = 'block';
              document.getElementById(tsk+sub+'sideText').innerHTML = 'Side with a higher amount';
              document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualGradientPeriod-container';            
              console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
            }
          }
          else {
            //not-gradient; Local          
            document.getElementById(tsk+sub+'periodCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+sub+'gradientCheckbox').style.display = 'inline-block';
            document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow amount per cell';
            document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow fraction per cell';
            document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium if not consumed.';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Equal-container';
            console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
            if (true == document.getElementById(tsk+sub+'periodCheck').checked  && !av.sgr.hideFlgNames.periodic) {
              document.getElementById(tsk+sub+'periodTime').style.display = 'block';
              document.getElementById(tsk+sub+'equalHiText').innerHTML = ' = equilibrium when no resource has been consumed';
              document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-EqualPeriod-container';            
              console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);
            }
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
          console.log('nanDetails.class=', document.getElementById(tsk+'Details').className);
          break;
          */
        case 'Debug':
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
          document.getElementById(tsk+sub+'equalHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'equalLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
          console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className);
          break;
      };
    };
    //console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className);

  };
  //---------------------------------------------------------------------------------- end av.sgr.changeDetailsLayout --
  //---------------------------------------------------------------------------------------------- end sugars for Eco --


  //------------------------------------------------------------------------------------------ ex1 and tst2 delete later --
  //in tst2 page now
  av.ptd.ex1allSugarChange = function (allmode) {
    var onoff = 'None';
    var geometry = 'Local';
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
  // if (av.debug.root) { console.log('Root: before av.ptd.allSugarCheckBox'); }
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
    console.log(from, 'called av.ptd.envobj2form');
    console.log('av.ui.envRegion=',av.ui.envRegion, '; av.ui.envTask=', av.ui.envTask, '; av.ui.envDistribute=',av.ui.envDistribute);
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
      //console.log('task='+task,'; av.fzr.env.rsrce[task] = ', av.fzr.env.rsrce[task]);
      len = envobj.name.length;
      //console.log('len='+len, '; envobj.name=',envobj.name);

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
  */
