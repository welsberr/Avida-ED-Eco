  //Read file data
  var av = av || {};  //incase av already exists
  var dijit = dijit || {};  //incase av already exists

  // if (av.dbg.flg.root) { console.log('Root: before av.fio.addFzItem'); }
  /*------------------------------------------------------------------------------------------------ av.fio.addFzItem --*/
  av.fio.addFzItem = function(dndSection, name, type, fileNum) {
    'use strict';
    var domid;
    if (undefined !== dndSection) {
      //var items = av.dnd.getAllItems(av.dnd.activeOrgan);
      //console.log('name=',name,'; items=',items);
      //var nodes = dndSection.getAllNodes();
      //console.log('name=',name,'; nodes=',nodes); 
      var names = [];
      var domItems = Object.keys(dndSection.map);
      var lngth = domItems.length;

      if (false) {
      //if (0 < lngth) {
        //trying to figure out sorting 
        for (var ii = 0; ii < lngth; ii++) {
          names[ii] = dndSection.map[domItems[ii]].data;
        };
      }
      else {
        dndSection.insertNodes(false, [{data: name, type: [type]}]);
        dndSection.sync();
        var mapItems = Object.keys(dndSection.map);
        domid = mapItems[mapItems.length - 1];
      };

      //var domID = av.dnd.getDomId(configName, target);


      if (av.dbg.flg.frd) console.log('fileNum=', fileNum, '; name=', name, '; Section=', dndSection.node.id);
      //console.log('fileNum', fileNum, '; name', name, '; Section', dndSection.node.id, '; type', type);

      //create a right av.mouse-click context menu for the item just created.
      if (0 < fileNum) {
        av.dnd.contextMenu(dndSection, domid, 'av.fio.addFzItem');
      }
      return domid;
    }
    else {
      //console.log('dndSection=', dndSection, '; name=', name, '; type=', type, '; fileNum=', fileNum);
      return 'dndSection is undefined';
    }
  };

  /*------------------------------------------------------------------------------------------ av.fio.setActiveConfig --*/
  av.fio.setActiveConfig = function(dndSection, name, type){
    'use strict';
    if (av.debug.fio) { console.log('name=', name); }
    av.dnd.activeConfig.selectAll().deleteSelectedNodes();
    av.dnd.activeConfig.insertNodes(false, [{data: name, type: [type]}]);
    av.dnd.activeConfig.sync();
    var mapItems = Object.keys(dndSection.map);
    av.fzr.actConfig.fzDomid = mapItems[mapItems.length - 1];  //domid from freezer. not sure if this is used.
    mapItems = Object.keys(av.dnd.activeConfig.map);
    av.fzr.actConfig.actDomid = mapItems[0];    //domid from active config.  this is used in changing cursor shape
    av.fzr.actConfig.name = name;
    av.fzr.actConfig.type = type;
    return av.fzr.actConfig.actDomid;
  };

  /*-------------------------------------------------------------------------------------- av.frd.add2freezerFromFile --*/
  av.frd.add2freezerFromFile = function (loadConfigFlag, from) {
    'use strict';
    //console.log(from, ' called av.frd.add2freezerFromFile: loadConfigFlag = ', loadConfigFlag);
    var type = av.fio.anID.substr(0, 1);
    //console.log('av.fio.anID', av.fio.anID);
    var dir = av.utl.wsb('/', av.fio.anID);
    var num = dir.substr(1, dir.length-1);
    var name, domid;
    //console.log('av.fio.thisfile.asText()', av.fio.thisfile.asText());
    //console.log('av.fio.thisfile', av.fio.thisfile);
    if (null === av.fio.thisfile.asText()) { name = av.fio.anID; }
    else { name = av.utl.wsb('\n', av.fio.thisfile.asText()); }

    //if (av.debug.fio) console.log('type ', type, '; dir', dir, '; num', num);

    switch (type) {
      case 'c':
        domid = av.fio.addFzItem(av.dnd.fzConfig, name, type, num);
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzConfig is undefined');
        if (av.fzr.cNum < Number(num)) {av.fzr.cNum = Number(num); }
        // console.log('c: num=', num, '; name=', name, 'loadConfigflag = ', loadConfigFlag);
         
        //The default config file is loaded as the activeConfig after all the files are loaded. 
        //if (0 == num && loadConfigFlag) {var ConfigActiveDomID = av.fio.setActiveConfig(av.dnd.activeConfig, name, 'b');}
        break;
      case 'g':
        domid = av.fio.addFzItem(av.dnd.fzOrgan, name, type, num);
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzOrgan is undefined');
        if (av.fzr.gNum < Number(num)) {av.fzr.gNum = Number(num); }
        break;
  /*
      case 'm':
        domid = av.fio.addFzItem(av.dnd.fzMdish, name, type, num);
        av.fzr.mDish[dir] = {};
        av.fzr.mDish[dir].dir = {};
        av.fzr.mDish[dir].domid = {};
        av.fzr.mDish[dir].cNum = -1;
        av.fzr.mDish[dir].wNum = -1;
        if ('dndSection is undefined' == domid) console.log('av.dnd.fzMdish is undefined------------------------------');
        if (av.fzr.mNum < Number(num)) {av.fzr.mNum = Number(num); }
        break;
      case 'r':
        domid = av.fio.addFzItem(av.dnd.fzRdish, name, type, num);
        if ('dndSection is undefined' == domid) console.log('av.dnd.fzrDish is undefined');
        if (av.fzr.rNum < Number(num)) {av.fzr.rNum = Number(num); }
        break;
  */
      case 't':
        domid = av.fio.addFzItem(av.dnd.fzTdish, name, type, num);
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzTdish is undefined');
        if (av.fzr.tNum < Number(num)) {av.fzr.tNum = Number(num); }
        break;
      case 'w':
        domid = av.fio.addFzItem(av.dnd.fzWorld, name, type, num);
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzWorld is undefined');
        if (av.fzr.wNum < Number(num)) {av.fzr.wNum = Number(num); }
        break;
    }
    av.fzr.file[av.fio.anID] = name;
    av.fzr.domid[dir] = domid;
    av.fzr.dir[domid] = dir;
  };

  /*------------------------------------------------------------------------------------ av.frd.add2multiDishFromFile --*/
  av.frd.add2multiDishFromFile = function(){
    "use strict";
    //console.log(from, ' called av.frd.add2multiDishFromFile');
    //console.log('av.fio.fName', av.fio.fName, '; av.fio.anID', av.fio.anID, '; av.fzr.folderType=',av.fzr.folderType);
    var multiDish = av.utl.wsb('/', av.fio.anID);
    var superNum = multiDish.substr(1, multiDish.length-1);
    var firstIndex = av.fio.anID.indexOf('/');
    var lastIndex = av.fio.anID.lastIndexOf('/');
    var length = lastIndex - firstIndex - 1;
    //console.log('firstI=', firstIndex, ';  lastI=', lastIndex);
    var subDish = av.fio.anID.substr(firstIndex+1, length);
    var type = subDish.substr(0,1);
    var subNum = subDish.substr(1, subDish.length-1);
    switch (type) {
      case 'c':
        if (av.fzr.mDish[multiDish].cNum < Number(subNum)) {av.fzr.mDish[multiDish].cNum = Number(subNum); }
        break;
      case 'w':
        if (av.fzr.mDish[multiDish].wNum < Number(subNum)) {av.fzr.mDish[multiDish].wNum = Number(subNum); }
        break;
    }
    av.fzr.mDish[multiDish].domid[subDish] = subNum;  //eventually subNum will be a domid, but we are not building the editing interface yet.
    av.fzr.mDish[multiDish].dir[subNum] = subDish;

    //console.log('multiDish=', multiDish, '; superNum=', superNum, '; subDish=', subDish, '; subNum=', subNum, '; type=', type, 'wNum=', av.fzr.mDish[multiDish].wNum);
  };

  /*------------------------------------------------------------------------------------------ aav.frd.processSubDish --*/
  av.frd.processSubDish = function() {
    "use strict";
    //console.log('SubDish:', av.fzr.folderType, ';  ID=', av.fio.anID);
  };

  /*--------------------------------------------------------------------------------------------- av.fio.processFiles --*/
  av.fio.processFiles = function (loadConfigFlag, from) {
    'use strict';
    if (av.dbg.flg.frd) { console.log('FIO: ',from, ' called av.fio.processFiles: loadConfigFlag = ', loadConfigFlag); }
    //console.log('FIO: ',from, ' called av.fio.processFiles: loadConfigFlag = ', loadConfigFlag);
    var fileType = av.fio.anID;
    
    //Multi-dish not being implented at this time so subDish should never be a av.fzr.folderType
    if ('subDish' === av.fzr.folderType){
      fileType = av.utl.wsa('/', fileType);
      //av.frd.processSubDish();
    };
    
    fileType = av.utl.wsa('/', fileType);
    //if (av.debug.fio) console.log('anID=', av.fio.anID, '; fileType=', fileType, '; fziType=', av.fzr.folderType);
      switch (fileType) {
        case 'entryname.txt':
          if ('subDish' !== av.fzr.folderType) {  //the if was added when trying to deal with multi-dish they used the else case
            // all normal files
            av.frd.add2freezerFromFile(loadConfigFlag, 'av.fio.processFiles');
            av.fzr.usrFileLoaded = true;
          }
          else {
            // only for dealing with the multi-dish section
            av.frd.add2multiDishFromFile();
          }
        case 'ancestors':
        case 'ancestors_manual':
        case 'tr0':
        case 'tr1':
        case 'tr2':
        case 'tr3':
        case 'tr4':
        case 'update':
        case 'ancestors.txt':
        case 'ancestors_manual.txt':
        case 'avida.cfg':
        case 'clade.ssg':
        case 'detail.spop':
        case 'environment.cfg':
        case 'events.cfg':
        case 'genome.seq':
        case 'instset.cfg':
        case 'pauseRunAt.txt':
        case 'offset.txt':
        case 'timeRecorder.csv':
        case 'tr0.txt':
        case 'tr1.txt':
        case 'tr2.txt':
        case 'tr3.txt':
        case 'tr4.txt':
        case 'update.txt':
          // deal with multidish - not sure what this section has to do with multi-dish? perhaps a reminder that if we implement multidishh?

          // fix files that are missing the .txt extension
          switch (fileType) {
            case 'ancestors':
            case 'ancestors_manual':
            case 'tr0':
            case 'tr1':
            case 'tr2':
            case 'tr3':
            case 'tr4':
            case 'update':
              //console.log('av.fio.anID = ', av.fio.anID);
              av.fio.anID += '.txt';
              break;
          };

          //need to fix this so the config dish is loaded after all the files are read not during the file reading. 
          //if (loadConfigFlag) {        
          // trying false; if thise works well this section will be deleted. 
          if (false) {
              //console.log('loadConfigFlag = ', loadConfigFlag);
              if ('c0/avida.cfg' === av.fio.anID) {
                av.frd.avidaCFG2form(av.fio.thisfile.asText(), 'av.fio.processFiles');
              }
              else if ('c0/environment.cfg' === av.fio.anID) {
                av.frd.environmentCFG2form(av.fio.thisfile.asText().trim());
              }
              else if ('c0/events.cfg' === av.fio.anID) {
                av.frd.eventsCFG2form(av.fio.thisfile.asText().trim(), 'av.fio.processFiles');
              }
            };

            //put the text of the file in the freezer
            av.fzr.file[av.fio.anID] = av.fio.thisfile.asText().trim();

            //Process dishes with ancesotrs. //this was commented out before 2019_1225;s
            //if ('ancestors' == fileType || 'ancestors_manual' == fileType) {
            //  av.fio.anID = av.fio.anID + '.txt';
            //};

            //if (av.debug.fio) console.log('FileType is ', fileType, '; filepath = ', av.fio.anID);
          break;
        default:
          //if (av.debug.fio) console.log('undefined file type in zip: full ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
          break;

      //if (av.debug.fio) console.log('file type in zip: fname ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
      //console.log('file type in zip: fname ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
    }
  };
  //-------------------------------------------------------------------------------------- end of av.fio.processFiles --

  //----------------------------------------------------------------------------------------- av.fio.processItemFiles --
  // used to load a single freeer item, not a whole workspace
  av.fio.processItemFiles = function (){
    'use strict';
    switch (av.fio.anID) {
      case 'ancestors':
      case 'ancestors_manual':
      case 'tr0':
      case 'tr1':
      case 'tr2':
      case 'tr3':
      case 'tr4':
      case 'update':
      case 'entryname.txt':
      case 'entrytype.txt':
      case 'ancestors.txt':
      case 'ancestors_manual.txt':
      case 'avida.cfg':
      case 'clade.ssg':
      case 'detail.spop':
      case 'environment.cfg':
      case 'events.cfg':
      case 'genome.seq':
      case 'instset.cfg':
      case 'pauseRunAt.txt':
      case 'timeRecorder.csv':
      case 'tr0.txt':
      case 'tr1.txt':
      case 'tr2.txt':
      case 'tr3.txt':
      case 'tr4.txt':
      case 'update.txt':

        // fix files that are missing the .txt extension
        if (av.debug.fio) { console.log('av.fio.anID = ', av.fio.anID); }
        switch (av.fio.anID) {
          case 'ancestors':
          case 'ancestors_manual':
          case 'tr0':
          case 'tr1':
          case 'tr2':
          case 'tr3':
          case 'tr4':
          case 'update':
            av.fio.anID += '.txt';
            break;
        };

        if ('ancestors' === av.fio.anID ||'ancestors_manual' == av.fio.anID) {
          av.fio.anID = av.fio.anID + '.txt';
        };
        //put the text of the file in the freezer
        if (av.debug.fio) { console.log('av.fio.anID = ', av.fio.anID); }
        av.fzr.item[av.fio.anID] = av.fio.thisfile.asText().trim();
        break;
      default:
        if (av.debug.fio) console.log('undefined file type in zip: full ', av.fio.fName, '; id ', av.fio.anID);
        break;
    }
  };
  //====================================================================================================================

  //--------------------------------------------------------------------------------------------- av.frd.updateSetups --
  //update config data from file data stored in freezer
  av.frd.updateSetup = function(from) {
    'use strict';
    var dir = av.fzr.actConfig.dir;
    // av.debug.fio
    if (true) { console.log(from, 'called av.frd.updateSetup; dir=', dir); }

    var doctext = av.fzr.file[dir + '/avida.cfg'];
    av.frd.avidaCFG2form(doctext, 'av.frd.updateSetup');

    doctext = av.fzr.file[dir + '/events.cfg'];
    if (av.debug.fio) { console.log('events.cfg = ', doctext, '; length = ', doctext.length); }
    if (2 < doctext.length) {
      av.frd.eventsCFG2form(doctext, 'av.frd.updateSetup');
    }

    doctext = av.fzr.file[dir + '/environment.cfg'];
    if (av.debug.fio) { console.log(dir + '/environment.cfg:  ', doctext); }
    //av.frd.environmentCFG2form(doctext);
    av.frd.environment2struct(doctext, 'av.frd.updateSetup');      //puts environment in a structure

    av.frd.defaultNut2dom('av.frd.updateSetup');               //put data from defaults in the dom.
    av.frd.nutrientStruct2dom('av.frd.updateSetup');           //puts data from the structure in the the dom for user interface

    doctext = av.fzr.file[dir + '/pauseRunAt.txt'];
    if (undefined !== doctext) { av.frd.pauseRunAtTXT2form(doctext); }
  };
  //--------------------------------------------------------------------------------------- end of av.frd.updateSetup --

  //--------------------------------------------------------------------------------------- of av.frd.updateTestSetup --
  //update config data from file data stored in freezer for test setup page 
  av.frd.updateTestSetup = function (from) {
    'use strict';
    //console.log(from, ' called av.frd.updateTestSetup; dir=', dir);
    var dir = av.fzr.actConfig.dir;
    var path = dir + '/avida.cfg';
    var doctext = av.fzr.file[path];
    //console.log('actConfig: path=', path);

    av.frd.avidaTestform(doctext, 'av.frd.updateTestSetup');
    doctext = av.fzr.file[dir + '/environment.cfg'];
    console.log('Test files only --------------------------------------------------------------');
    av.frd.environment2struct(doctext, 'av.frd.updateTestSetup');     
    //av.frd.environmentTestform(doctext);     //for now editing the whole file
    //console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);

    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };


    //doctext = av.fzr.file[dir + '/environment.cfg'];

    //not sure about this one; may need a test version of this one too
    //doctext = av.fzr.file[dir + '/pauseRunAt.txt'];
    //av.frd.pauseRunAtTest2form(doctext);
  };
  //----------------------------------------------------------------------------------- end of av.frd.updateTestSetup --

  //============================================================================================ read environment.cfg ==
  //environment.cfg into setup traditional form of population page = no longer in use;
  //---------------------------------------------------------------------------------- av.frd.environmentCFGlineParse --
  
  av.frd.environmentCFGlineParse = function(instr){
    'use strict';
    var num = 0;
    var flag = true;
    //console.log('instr', instr);
    var cfgary = av.utl.flexsplit(instr).split(',');      //replaces white space with a comma, then splits on comma
    //console.log('cfgary = ', cfgary);
    if (0 < cfgary[3].length) {num = av.utl.wsb(':',av.utl.wsa('=',cfgary[3]));}
    if (0 === num) {flag = false;} //use == in this case as they are of different type
    //if (av.debug.fio) console.log('flag', flag, '; num', num, '; cfgary', cfgary[3], '; instr', instr);
    //console.log('flag', flag, '; num', num, '; cfgary', cfgary[3], '; instr', instr);
    var rslt = {
      name : cfgary[1],
      value : flag
    };
    return rslt;
  };

  // makes a dictionary out of a environment.cfg file
  //-------------------------------------------------------------------------------------- av.frd.environmentCFGparse --
  av.frd.environmentCFGparse = function (filestr) {
    'use strict';
    var rslt = {};
    var lineobj;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (3 < lines[ii].length) {
        //console.log("lines[", ii, "]=", lines[ii]);
        lineobj = av.frd.environmentCFGlineParse(lines[ii]);
        rslt[lineobj.name.toUpperCase()] = lineobj.value;
      }
    } // for
    return rslt;
  };

  // puts data from the environment.cfg into the setup form for the population page
  //-------------------------------------------------------------------------------------- av.frd.environmentCFG2form --
  av.frd.environmentCFG2form = function (fileStr) {
    'use strict';
    var dict = av.frd.environmentCFGparse(fileStr);
    //console.log('av.frd.environmentCFG2form; dict=',dict);

    /*
    dijit.byId('notose').set('checked', dict.NOT);
    dijit.byId('nanose').set('checked', dict.NAND);
    dijit.byId('andose').set('checked', dict.AND);
    dijit.byId('ornose').set('checked', dict.ORN);
    dijit.byId('orose').set('checked', dict.OR);
    dijit.byId('andnose').set('checked', dict.ANDN);
    dijit.byId('norose').set('checked', dict.NOR);
    dijit.byId('xorose').set('checked', dict.XOR);
    dijit.byId('equose').set('checked', dict.EQU);
    */
  };
  //======================================================================================== end read environment.cfg ==


  //----------------------------------------------------------------------------------------- put in nutrient structure --

  //============================================================================================ read environment.cfg ==
  // to make nutrient structure; and then to create user controls
  //-------------------------------------------------------------------------------------------- av.frd.findNameIndex --
  av.frd.findNameIndex = function(nutrientObj, rtag, geometry) {
    /*
     * 
     * @param nutrientObj =  the suboabject of av.nut that holds the arrays for logic9 type
     * @param rtag       the string that we are looking for. If the string is found data will be over written. 
     *                     if not, create a new entry in the arrays
     * @returns {Int}
     * 
     * Look for rtag in structure
     * return its index if it exists
     * return length + 1 is it does not exist
     */
    //var geometry = String (geometry_);
    //console.log('rtag=', rtag, '; geometry = ', geometry, '; nutrientObj=',nutrientObj,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    var defaultindex = nutrientObj.name.length;
    //console.log('rtag=', rtag, '; geometry = ', geometry, '; defaultindex=', defaultindex);
    if (undefined !== geometry) {
      if ('grid' === geometry.toLowerCase() && 1 > defaultindex) {
        defaultindex = 1;
      }
      else if ('global' === geometry.toLowerCase() && 1 > defaultindex) { 
        defaultindex = 0;
      };
    }
    else {console.log('why is geometry undefined: geometry = ', geometry);}

    var found = nutrientObj.name.indexOf(rtag);

    //onsole.log('defaultindex = ',  defaultindex, '; name.length = ', nutrientObj.name.length, 'found=', found );

    if (-1 < found) {
      //console.log('The name ', rtag, ' was found already in av.nut;   The subobject=',nutrientObj);
      return found;
    } 
    //if (av.debug.fio) { console.log('defaultindex=',defaultindex,'; rtag='+rtag, '; found=', found, '; nutrientObj.name=', nutrientObj.name); }
    return defaultindex;  
  };
  //---------------------------------------------------------------------------------------- end av.frd.findNameIndex --

  // Avida reacton line format
  // REACTION reactionName taskName process:resource=resourceName:value=2:type=pow:max=1.1:min=0.9 requisite:max_count=1
  // Avida-ED 3 version for no resource is 
  // REACTION ANDN andn process:value=0.0:type=pow requisite:max_count=1  #value=3.0
  //
  // For now in Avida-ED 4.0 beta; the the Resource MUST be defined before the Reaction for that resource. 

  //------------------------------------------------------------------------------------------- av.frd.reActLineParse --
  av.frd.reActLineParse = function(lnArray, from) {
    'use strict';
    if (av.debug.fio) { console.log('____', from, ' called av.frd.reActLineParse _____'); }
    var lnError = '';     //was it a valid line wihtout errors
    //console.log('lnArray = ', lnArray);
    var pear = [];
    var reSrcNameAry; var reSrcName;
    var nn;
    var mm;

    //if (av.dbg.flg.nut) { console.log('reActLineParse: lnArray=', lnArray); }

    //console.log('task = lnArray[2]=',lnArray[2]);
    console.log('REACT: lnArray=', lnArray);
    var logicindex = av.sgr.logicVnames.indexOf( lnArray[2] );   //task name length is variable so must fined in taht array
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var reActObj = av.nut[numTsk].react;   //objec based on logic type and reaction;
      //console.log('numTsk=', numTsk,'; lnArray', lnArray);
      //console.log('av.nut.'+numTsk+'.uiAll.geometry = ');

      if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll = ',av.nut[numTsk].uiAll); }

      var ndx = av.frd.findNameIndex(reActObj, lnArray[1], av.nut[numTsk].uiAll.geometry);

      reActObj.name[ndx] = lnArray[1];   //assin the name of the resource. 

      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with constants for Avida-ED
      reActObj.depletable[ndx] = 1;   //This is the default value for Avida
      reActObj.value[ndx] = 1;      //Avida default = 1; v<0 --> poison; v = 0 --> "None";  v > 0 --> rewarded; this should always be in cfg file
      reActObj.min[ndx] = 0.99;     //Avida default=0; set slightly below one because i'm not sure how the numbers are represented and wanted to make wure min < max
      reActObj.max[ndx] = 1.0;      //Avida default=1; Need to talk to curriculum folks about best value for min in Avidea-ED; I'm thinking just less than 1
      reActObj.max_count[ndx] = 1;         //Avdida-ED default = 1; 
      reActObj.task[ndx] = lnArray[2];     //from line parcing passed to this method 
      reActObj.resource[ndx] = "missing";  //if resoucre = missing, no resource was stated and the reaction is global and either none or infinite
      reActObj.type[ndx] = 'pow';          //Avida-ED default = 'pow'

      var len;
      var lngth = lnArray.length;
      console.log('REACT: ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
      for (var jj=3; jj<lngth ;jj++) {
        var pairArray = lnArray[jj].split(':');    //this should get process
        len = pairArray.length;    
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii=1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          //console.log('React: ii=',ii,'; pear', pear);
          nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
          if (-1 < nn) {
            reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
          }
          else {
              lnError = ' '+pear[0]+' is not a valid reaction keyword. lnArray = '+lnArray;
              //console.log(lnError);
          };
        };
      };
      //There are older environment.cfg files that do not include a resource in the reaction statement. 
      // All of those will be considered to have global resources and they will typically be infinite or none.
      // 
      // IF the code word 'missing' is the listed as the name of the resource than there is not resource specified and 
      // the reaction can only act as if the resource for that task is none or infinite and it must be global. 
      av.debug.fio = true;
      if ('missing' === reActObj.resource[ndx]) {
        av.nut[numTsk].uiAll.regionsNumOf = 1;                 //reaction but no resource so it must be global and none or infinite
        av.nut[numTsk].uiAll.geometry = 'global';            //grid (if 1 < subdish)
        if (0 < reActObj.value[ndx]) {
          console.log('av.nut['+numTsk+'].react.depletable['+ndx+']=', av.nut[numTsk].react.depletable[ndx]);
          if (isNaN(Number(reActObj.depletable[ndx])) || 0 < reActObj.depletable[ndx]) {
            av.nut[numTsk].uiAll.supplyType = 'finite';
          }
          else { av.nut[numTsk].uiAll.supplyType = 'finite'; }
          //if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll.supplyType =', av.nut[numTsk].uiAll.supplyType); }
        }
        else if (0 > reActObj.value[ndx])  {
          av.nut[numTsk].uiAll.supplyType = 'poison';   //poison or damage. does not kill, but hurts energy aquisition rate (ear). 
        }
        else if (0 == reActObj.value[ndx]) {
          av.nut[numTsk].uiAll.supplyType = 'none';
          //if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll.supplyType =', av.nut[numTsk].uiAll.supplyType); }
        }
        //console.log('numTsk=', numTsk, '; ndx=', ndx, '; av.nut[numTsk].uiAll.supplyType[ndx]=', av.nut[numTsk].uiSub.supplyType[ndx]
        //             , '; av.nut[numTsk].uiAll.regionsNumOf=', av.nut[numTsk].uiAll.regionsNumOf);
      }
      else {
        //console.log('ndx=', ndx, '; av.nut['+numTsk+'].react.depletable=', av.nut[numTsk].react.depletable);
        if (null == reActObj.depletable[ndx]) { reActObj.depletable[ndx] = 1; }
        if ( 1 != Number(reActObj.depletable[ndx]) ) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'infinite';
        };
        //console.log('ndx=', ndx, '; reActObj.depletable=', reActObj.depletable, '; uiSub.supplyType=', av.nut[numTsk].uiSub.supplyType);

        // Reaction names a Resource; Need to find info about that resource to determine Supply Type. SupplyTypes will
        // be determined after the entire file has beeen read to make sure the named resource  is in the (nut)rient structure 
      };
      av.debug.fio = false;
      //console.log('numTsk',numTsk,'; ndx=',ndx, '; reAct_supplyType All Sub=', av.nut[numTsk].uiAll.supplyType, av.nut[numTsk].uiSub.supplyType[ndx]);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, |'+ lnArray[2]+'| not found in av.sgr.logicVnames';
      console.log(lnError);
    };

    return lnError;
  };
  //--------------------------------------------------------------------------------------- end av.frd.reActLineParse --

  //------------------------------------------------------------------------------------------- av.frd.reSrcLineParse --
  av.frd.reSrcLineParse = function(lnArray, from ){
    'use strict';
    var lineErrors = '';  //was it a valid line wihtout errors
    if (av.debug.fio) { console.log('____', from, ' called av.frd.reSrcLineParse____'); }
    //console.log('lnArray = ', lnArray);
    var pairArray = lnArray[1].split(':');
    var pear = [];
    var cellboxdata = [];
    var matchTaskRegion;
    var matchSide;
    var matchgradientNdx;
    var len;
    var nn; 
    var numTsk;
    var rSourcObj;
    var regionStr = '';
    var ndx;
    var re_name = /(\D+)(\d+)([qn])(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL
    var re_region = /(\D+)(\d+)(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL
    var re_side = /(\D+)(.*$)/;      // applied to the last element of the result if finding task and region above to get side. 
    var re_gradientNdx = /(\d+)(.*$)/;     //applied to the last element if text for a side is found
    //var re_gradientNdx = /(\d+)/;        //applied to the last element if text for a side is found

    //not using since I'm leaving the option for enviornemtns that flow (input and output xy coordinates are not identiacal
    //var re_gradient = /(\D+)(\d+)(.*$)/;  // match array = whole line? , 'gradient side', gradient line number, rest if string if any exists. 
                                          // match.input = initial string
                                          // match.length is the length of the array, including null elements 
    //av.debug.fio = true;

    //if (av.dbg.flg.nut) console.log('Nut: reSrcLineParse: pairArray=', pairArray);
    //find logic type include test for quarters vs ninths subregion layout. 
    matchTaskRegion = pairArray[0].match(re_name);  // Matches using re_name pattern: looing for tsk##q_gradientInfo.
    //if (av.dbg.flg.nut) console.log('nut: pairArra[0]=', pairArray[0],'; re_name=', re_name, ', matchTaskRegion=', matchTaskRegion);
    if (null == matchTaskRegion) {
      matchTaskRegion = pairArray[0].match(re_region);  // Matches using re_num pattern.
      //if (av.dbg.flg.nut) 
      console.log('nut: reSrc pairArra[0]=', pairArray[0],'; re_region=', re_region, ', matchTaskRegion=', matchTaskRegion);
      //assume 'q' for quarters if suffix letter indicating subregion layout not included. 
      matchTaskRegion[4] = matchTaskRegion[3];
      matchTaskRegion[3] = 'q';
      //console.log('q missing');
      if (null == matchTaskRegion) {
        console.log('ERROR: RESOURCE name format wrong; pairArray=', pairArray);
      }
    }
    //if (av.dbg.flg.nut) console.log('nut: pairArra[0]=', pairArray[0],', matchTaskRegion=', matchTaskRegion);
    var tsk =  matchTaskRegion[1];
    var logicindex = av.sgr.logicNames.indexOf( tsk );
    if (-1 < logicindex) {
      numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      rSourcObj = av.nut[numTsk].resrc;
      //console.log('numTsk='+numTsk,'; rSourcObj=', rSourcObj);

      //needs to be more efficient. tiba fix later. Should break out of loop when found. look at av.frd.findNameIndex for hints
      len = pairArray.length;
      for (var ii=1; ii < len; ii++) {
        pear = pairArray[ii].split('=');
        //console.log('pear = ', pear);
        if ('geometry' === pear[0].toLowerCase() ) {
          av.nut[numTsk].uiAll.geometry = pear[1];
          break;
        };   
      }; 
      //console.log('ii =', ii, '; len=', len);  //used to verify that program leaves loop when 'geometry' found
      if (av.debug.fio) { 
        //console.log('pairArray = ', pairArray);
        //console.log('; geometry['+numTsk+']=', av.nut[numTsk].uiAll.geometry,'; matchTaskRegion =', matchTaskRegion); 
      }

      // check to make sure name is unqiue. If it is not unique then overright the previous data. 
      // index into all the arrays that hold resource/reaction parameters; The name should be unique for all arrays in the object. 
      ndx = av.frd.findNameIndex(rSourcObj, pairArray[0], av.nut[numTsk].uiAll.geometry);   
      //console.log('ndx=',ndx, '; tsk=',tsk, '; name=', pairArray[0], '-------------------------');
      //if (av.debug.fio) { console.log('ndx=',ndx); }
      if (-1 < ndx) {
        rSourcObj.name[ndx] = pairArray[0];    //asign the name of the resource statement. 

        // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with a few exceptions
        // boxflag is false indicating there are no box values. 
        // in Avida-ED, geometry=Grid or global; The user interface calls Grid = 'Local'
        //defaults are done in av.fzr.clearEnvironment

        

        // need to update this the ui part of the structure
        //find region listed in user interface?
        console.log('RESOURCE: matchTaskRegion=', matchTaskRegion);
        //to add a leading zero if needed and add if code is based on 4 quarters or 9 octothorpe
        regionStr = ('000'+ matchTaskRegion[2]).slice(-3);
        //console.log('regionStr=', regionStr);
        av.nut[numTsk].uiSub.regionSet[ndx] = matchTaskRegion[3];
        av.nut[numTsk].uiSub.regionCode[ndx] = regionStr;   //This is a one to three digit string with leading zeros.
        av.nut[numTsk].uiSub.regionNdx[ndx] = av.sgr.regionQuarterCodes.indexOf(regionStr);
        //console.log('av.nut['+numTsk+'].uiSub.regionNdx['+ndx+']=', av.nut[numTsk].uiSub.regionNdx[ndx]);
        av.nut[numTsk].uiSub.regionName[ndx] = av.sgr.regionQuarterNames[av.nut[numTsk].uiSub.regionNdx[ndx]];
        //if (av.dbg.flg.nut) { console.log('RESOURCE: ndx=',ndx, '; av.nut[numTsk].uiSub.regionCode[ndx]=', av.nut[numTsk].uiSub.regionCode[ndx],'; av.nut[numTsk].uiSub.regionName[ndx]=',av.nut[numTsk].uiSub.regionName[ndx]); }
        console.log('RESOURCE: rSourcObj.name[ndx]=',rSourcObj.name[ndx],'; numTsk=', numTsk, '; lnArray.length=', lnArray.length);

        // as of 2020 July 13 no files with gradient data has been parsed. 
        // look for a side if it is flow or gradient   thhis part does not work right.
        if (0 < matchTaskRegion[4].length){
          matchSide = matchTaskRegion[4].match(re_side);
          if (av.dbg.flg.nut) console.log('re_side=', re_side, '; matchSide=', matchSide);
          rSourcObj.side[ndx] = matchSide[1];
          if (0 < matchSide[2].length){
            rSourcObj.grdNum[ndx] = matchSide[2];
            if (av.dbg.flg.nut) console.log('ndx=', ndx ,'; rSourcObj.grdNum=', rSourcObj.grdNum, 'rSourcObj.grdNum[ndx]=', rSourcObj.grdNum[ndx]);
            // this does not work get Wesley to help
            matchgradientNdx = matchSide[2].match(re_gradientNdx);
            //matchgradientNdx = '00'.match(re_gradientNdx);

            if (av.dbg.flg.nut) console.log('re_gradientNdx=', re_gradientNdx, '; matchSide[2]=', matchSide[2], re_gradientNdx, '; matchgradientNdx=', matchgradientNdx);
            if (av.dbg.flg.nut) console.log('result=', matchSide[2].match[re_gradientNdx]);
            rSourcObj.grdNum[ndx] = matchgradientNdx[1];
            if (0 < matchgradientNdx[2].length) console.log('The name should not have anymore to it ,but here it is ', matchgradientNdx[2]);
          };
        };

        //process all data pairs
        len = pairArray.length;
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii=1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          nn = av.sgr.resrc_argu.indexOf(pear[0].toLowerCase());
          //if (av.debug.fio) { console.log('Resource: ii=',ii,'; pear=', pear, '; nn=', nn); }
          if (-1 < nn) {
            rSourcObj[av.sgr.resrc_argu[nn]][ndx] = pear[1];
            //console.log('av.sgr.resrc_argu[nn]=',av.sgr.resrc_argu[nn], '; value =', rSourcObj[av.sgr.resrc_argu[nn]][ndx] );
          }
          else {
            //console.log('pear= ', pear[0]);
            if ('cellbox' === pear[0].toLowerCase()) {
              cellboxdata = pear[1].split('|');
              //console.log('cellboxdata=',cellboxdata);
              rSourcObj.boxflag[ndx] = true;
              rSourcObj.boxx[ndx] = cellboxdata[0];
              rSourcObj.boxy[ndx] = cellboxdata[1];
              rSourcObj.boxcol[ndx] = cellboxdata[2];
              rSourcObj.boxrow[ndx] = cellboxdata[3];
              av.nut[numTsk].uiSub.area[ndx] = Number(rSourcObj.boxcol[ndx]) * Number(rSourcObj.boxrow[ndx]);
              //console.log('av.nut['+numTsk+'].uiSub.area['+ndx+']=', av.nut[numTsk].uiSub.area[ndx], 'rSourcObj.boxrow[ndx]=', rSourcObj.boxrow[ndx]);
            }
            else {
              lineErrors = 'leftside, '+pear[0]+', not a valid resource keyword. lnArray = '+lnArray;
              if (av.debug.fio) { console.log(lineErrors); }
            };
          };
        };

        //console.log('rSourcObj.geometry['+ndx+']=', rSourcObj.geometry[ndx]);
        //console.log('av.nut['+numTsk+'].uiAll.geometry', av.nut[numTsk].uiAll.geometry);
        if ('grid' == rSourcObj.geometry[ndx].toLowerCase() || 'global' == rSourcObj.geometry[ndx].toLowerCase() ) {
          av.nut[numTsk].uiAll.geometry = rSourcObj.geometry[ndx];
        }
        //if (av.dbg.flg.nut) console.log('numTsk=', numTsk,'; av.nut[numTsk].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);

        //Find the supply type
        if (0 == rSourcObj.initial[ndx]) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'none';
        } 
        else if (0 < rSourcObj.initial[ndx]) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'finite';
          if (null == av.nut[numTsk].uiSub.area[ndx]) {
            av.nut[numTsk].uiSub.area[ndx] = av.nut.wrldSize;   //this may get redifned based on cells
          }
        };
        if (0 < rSourcObj.inflow[ndx]) {
          if (rSourcObj.inflowx1[ndx]===rSourcObj.outflowx1[ndx] && rSourcObj.inflowx2[ndx]===rSourcObj.outflowx2[ndx] && 
              rSourcObj.inflowy1[ndx]===rSourcObj.outflowy1[ndx] && rSourcObj.inflowy2[ndx]===rSourcObj.outflowy2[ndx] ) {
            av.nut[numTsk].uiSub.supplyType[ndx] = 'chemostat';
            if (null == av.nut[numTsk].uiSub.area[ndx]) {
              rSourcObj.boxcol[ndx] = Math.abs( 1 + Number(rSourcObj.inflowx2[ndx]) - Number(rSourcObj.inflowx1[ndx]) );
              rSourcObj.boxrow[ndx] = Math.abs( 1 + Number(rSourcObj.inflowy2[ndx]) - Number(rSourcObj.inflowy1[ndx]) );
              av.nut[numTsk].uiSub.area[ndx] = rSourcObj.boxcol[ndx] * rSourcObj.boxrow[ndx];
            }            
          }
          else { 
            av.nut[numTsk].uiSub.supplyType[ndx] = 'flow';
            if (null == av.nut[numTsk].uiSub.area[ndx] 
                && null != rSourcObj.inflowx1[ndx] && null != rSourcObj.inflowx2[ndx] 
                && null != rSourcObj.inflowy1[ndx] && null != rSourcObj.inflowy2[ndx] ) {
              rSourcObj.boxcol[ndx] = Math.abs( 1 + Number(rSourcObj.inflowx2[ndx]) - Number(rSourcObj.inflowx1[ndx]) );
              rSourcObj.boxrow[ndx] = Math.abs( 1 + Number(rSourcObj.inflowy2[ndx]) - Number(rSourcObj.inflowy1[ndx]) );
              av.nut[numTsk].uiSub.area[ndx] = rSourcObj.boxcol[ndx] * rSourcObj.boxrow[ndx];
            }            
          }
        }
        if (0 == rSourcObj.initial[ndx] && 0 == rSourcObj.inflow[ndx]) {
          av.nut[numTsk].uiSub.supplyType[ndx] = 'none';
        }
        //console.log('numTsk',numTsk,'; ndx=',ndx, '; reSrce_supplyType=', av.nut[numTsk].uiSub.supplyType[ndx]);
      }   //end of valid ndx found.
    }  
    // valid logic name not found;
    else {
      lineErrors = 'RESOURCE: pairArray.substring='+pairArray[0].substring(0,3)+' not found in av.sgr.logicNames';
      console.log(lineErrors);
    }
    av.debug.fio = false;
    //console.log('RESOURCE: lineErrors=', lineErrors);
    return lineErrors;
  };
  //--------------------------------------------------------------------------------------- end av.frd.reSrcLineParse --

  //------------------------------------------------------------------------------------------- av.frd.cell_LineParse --
  av.frd.cell_LineParse = function(lnArray, from) {
    'use strict';
    if (av.debug.fio) { console.log('____', from, ' called av.frd.cell_LineParse _____'); }
    var lnError = '';     //was it a valid line wihtout errors
    console.log('CELL lnArray = ', lnArray);
    var pear = [];
    var cellNameAry; var cellName;
    var nn;
    var mm;

    //if (av.dbg.flg.nut) { console.log('cell_LineParse: lnArray=', lnArray); }

    //console.log('task = lnArray[2]=',lnArray[2]);
    var logicindex = av.sgr.logicVnames.indexOf( lnArray[2] );   //task name length is variable so must fined in taht array
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var cellObj = av.nut[numTsk].react;   //objec based on logic type and reaction;
      //console.log('numTsk=', numTsk,'; lnArray', lnArray);
      //console.log('av.nut.'+numTsk+'.uiAll.geometry = ');

      if (av.debug.fio) { console.log('av.nut['+numTsk+'].uiAll = ',av.nut[numTsk].uiAll); }

      var ndx = av.frd.findNameIndex(cellObj, lnArray[1], av.nut[numTsk].uiAll.geometry);

      cellObj.name[ndx] = lnArray[1];   //assin the name of the resource. 


      var len;
      var lngth = lnArray.length;
      console.log('CELL: ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
/*
      for (var jj=3; jj<lngth ;jj++) {
        var pairArray = lnArray[jj].split(':');    //this should get process
        len = pairArray.length;    
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii=1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          //console.log('React: ii=',ii,'; pear', pear);
          nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
          if (-1 < nn) {
            reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
          }
          else {
              lnError = ' '+pear[0]+' is not a valid reaction keyword. lnArray = '+lnArray;
              //console.log(lnError);
          };
        };
      };
*/
      //console.log('numTsk',numTsk,'; ndx=',ndx, '; CELL All Sub=', av.nut[numTsk].uiAll.supplyType, av.nut[numTsk].uiSub.supplyType[ndx]);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, '+ lnArray[2]+' not found in av.sgr.logicVnames';
      console.log('CELL: lnError=',lnError);
    };

    return lnError;
  };
  //--------------------------------------------------------------------------------------- end av.frd.cell_LineParse --

  //-------------------------------------------------------------------------------------------- av.frd.nutrientParse --
  // Uses environment.cfg file to create a structure to hold environment variables.   uses av.nut
  av.frd.nutrientParse = function (filestr, from) {
    'use strict';
    if (av.debug.fio) { console.log('============================================================ ',from + ' called av.frd.nutrientParse =='); }
    var errors='';
    var reacError='', rsrcError='', cellError='';
    var eolfound;
    //var lineobj;
    var aline;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    var matchComment, matchContinue, matchResult, metaData;
    var re_metaData = /^(.*?)#!.*$/;    //metadata 
    var re_comment =  /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_REACTION = /^(.*?)REACTION/i;
    var re_CELL = /^(.*?)CELL/i;
    var re_RESOURCE = /RESOURCE/i;
    var lineArray;
    var ii = 0;
    while (ii < lngth) {
      eolfound = false;
      metaData = lines[ii].match(re_metaData);        //console.log("lines["+ii+"]=", lines[ii]);
      matchComment = lines[ii].match(re_comment);
      //if (null !== metaData) { console.log('metaData=', metaData); }   // not useing metadata, hope there is no neeed
      if (null !== matchComment) {aline = matchComment[1];}
      else aline = lines[ii];
      if (3 < aline.length) {
        //console.log('aline.length=', aline.length,'; aline=', aline);
        do {
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
          if (ii+1 < lngth) {
            matchContinue = aline.match(re_continue);
            //console.log('matchContinue=',matchContinue);
            if (null !== matchContinue) {
              ii++;
              //console.log('ii=', ii);
              matchComment = lines[ii].match(re_comment);
              //console.log('matchComment=',matchComment);
              if (null !== matchComment) {aline = matchContinue[1]+matchComment[1];}
              else aline = matchContinue[1]+lines[ii];
            }
            else eolfound = true;
          }
          else eolfound = true;
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
        }
        while (!eolfound)  //end of subloop for continuation lines
        //console.log('ii', ii, '; aline=', aline);
        // look for valid starting keyword
        lineArray = av.utl.spaceSplit(aline).split('~');      //change , to !; remove leading and trailing space and replaces white space with a ~, then splits on ~
        //console.log('lineArray=', lineArray);
        
        //look for a RESOURCE statement
        matchResult = lineArray[0].match(re_RESOURCE);
        //consolen('matchResource=', matchResult);
        if (null !== matchResult) { 
          //if (av.dbg.flg.nut) 
          rsrcError = av.frd.reSrcLineParse(lineArray, 'av.frd.nutrientParse');
          if ('' != rsrcError) console.log('reSrcLineParse: lineArray=', lineArray, '; rsrcError=', rsrcError);          
        }
        else {rsrcError = '';}

        //look for a REACTION statement
        matchResult = lineArray[0].match(re_REACTION);
        //console.log('matchReaction=', matchResult);
        if (null !== matchResult) { 
          //if (av.dbg.flg.nut) { console.log('reActLineParse: lnArray=', lineArray); }
          reacError = av.frd.reActLineParse(lineArray, 'av.frd.nutrientParse');
          if ('' != reacError)console.log('reActLineParse: lineArray=', lineArray, '; reacError=', reacError);          
        }
        else {
          reacError='';
          //console.log('no matach on REACTION');
        };

        //look for a CELL statement
        matchResult = lineArray[0].match(re_CELL);
        //console.log('matchReaction=', matchResult);
        if (null !== matchResult) { 
          //if (av.dbg.flg.nut) { console.log('cell_LineParse: lnArray=', lineArray); }
          cellError = av.frd.reActLineParse(lineArray, 'av.frd.nutrientParse');
          if ('' != cellError) console.log('CELL_LineParse: lineArray=', lineArray, '; cellError=', cellError);          
        }
        else {
          cellError='';
          //console.log('no matach on REACTION');
        };

        if ('' !== rsrcError || '' !== reacError || '' != cellError) {
          console.log('-------------------------------------------------------errors in line: ii=', ii, '; aline=', aline);
          errors += 'ii='+ii+'; rsrcError='+rsrcError+'; reacError='+reacError+'; cellError='+cellError+'\n';
        };

      //if (av.dbg.flg.nut) console.log('--------------------- end of processing a line that was longer than 3 characters -------------------------------');
      }  //end of processing one line that was lines longer than 3 characters
      ii++;
    } // while that goes through lines in file. 
    if (av.dbg.flg.nut) { console.log('------------------------------ all environment.cfg lines processed --------------'); }
    
          //if (av.dbg.flg.nut) { 
    if (true) { 
      console.log('After while look looking at all lines of environment.cfg; Before looking for summarny information for each task');
      av.nut_env_cfg = {};
      av.nut_env_cfg = JSON.parse(JSON.stringify(av.nut));
      console.log('; av.nut_env_cfg = ', av.nut_env_cfg); 
    }
    
    /// This section should be in a new function. 
    
    var numTsk, reActNameLen, ndx;
    var len = av.sgr.logEdNames.length;   //9
    var distinctRegions, drLen;
    var regStr = '';
    var regionLayoutLen = av.sgr.regionLayoutValues.length;
    //find some summary info about nutrients. Need to look at each task separately. 
    
    //console.log('regionLayoutLen=', regionLayoutLen,'; regionLayoutValues=', av.sgr.regionLayoutValues);
    
    for (var ii=0; ii< len; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      //console.log('av.nut['+numTsk+'].resrc=', av.nut[numTsk].resrc);
      //console.log('av.nut['+numTsk+'].react=', av.nut[numTsk].react);
      //console.log('av.nut['+numTsk+'].uiAll=', av.nut[numTsk].uiAll);
      //console.log('av.nut['+numTsk+'].uiSub=', av.nut[numTsk].uiSub);

      //distincRegions will be in more important when gradient is implemented
      // The regionsNumOf is determined and used to assign default regionLayout
      // Then a region code, region name need to be assigned in av.nut[tsk]uiSub.regionName      
      distinctRegions = [...new Set(av.nut[numTsk].uiSub.regionCode.slice(1))];   //ignore index 0 as it is reserved for global data
      //console.log('numTsk=', numTsk, '; distinctRegions=', distinctRegions);
      drLen = distinctRegions.length;
      // this is not fool proof it requires a reaction for every subdish of regionLayout definition
      if (0<drLen && drLen <= regionLayoutLen) {
        distinctRegions.sort;
        regStr = distinctRegions.join();
        if ('000q' == regStr || '000n' == regStr) { regStr='000'; }
        //console.log('regionStr='+regStr+'|', '; av.sgr.regionLookup=', av.sgr.regionLookup);
        av.nut[numTsk].uiAll.regionLayout = av.sgr.regionLookup[regStr];
        //console.log('sorted regStr=', regStr, '; av.sgr.regionLayoutValues[drLen]=', av.sgr.regionLayoutValues[drLen],
        //  '; av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout);
        
        //av.nut[numTsk].uiAll.regionsLayout = av.sgr.regionLayoutValues[drLen];  //lft/rit & upp/low both have 2 = drlen
        av.nut[numTsk].uiAll.regionsNumOf = drLen-1;  //region[0] does not count as it is for global
      }
      else {
        if (0 != drLen) {
          console.log('Distinct Regions Error: numTsk=', numTsk, '; distinctRegions=', distinctRegions, '; uiAll.geometry=', av.nut[numTsk].uiAll.geometry, '; regionLayout=', av.nut[numTsk].uiAll.regionLayout,'==========================');           
        }
      }
      //this will need change to work when gradient is added. 
      reActNameLen = av.nut[numTsk].react.name.length;
      for (var jj=0; jj<=reActNameLen; jj++) {
        // 'missing' is a key word used in this program to indicate that the reaction has no resoucre and is either 0 or infinite.
        // These should have been fully translated in the parse react routine; only processing those with resource names
        if ('missing' !== av.nut[numTsk].react.resource[jj] && null != av.nut[numTsk].react.resource[jj]) {
          //console.log('av.nut['+numTsk+']uiSub.supplyType['+jj+']=', av.nut[numTsk].uiSub.supplyType[jj], '; geometry=', av.nut[numTsk].uiAll.geometry);
          // Resource should exist
          ndx = av.nut[numTsk].resrc.name.indexOf(av.nut[numTsk].react.resource[jj]);
          //if (true) {
          if (jj != ndx) {
            console.log('ndx jj=', ndx, jj, '; av.nut['+numTsk+'].recrc.name=', av.nut[numTsk].resrc.name, 
                        'av.nut['+numTsk+'].react.resource['+jj+']=', av.nut[numTsk].react.resource[jj] );
          };
      
          if (-1 < ndx) {
            //add code from the end of resource here to interpret values

            
          }
          console.log('resrc.name not found in react.resource = ERROR------------------------ERROR');

          
          
          
        };  
      }; // end of loop react name array      
    };  // end of logic task loops
    
    if (av.dbg.flg.nut) { console.log('============================================================================== end of nutrientParse =='); }
  };
  //------------------------------------------------------------------------------------- end of av.frd.nutrientParse --
    
  //Find subarea based on inflow x, y coordinates
  //--------------------------------------------------------------------------------------- av.frd.getInflowAreaResrc --
  av.frd.getInflowAreaResrc = function(numTsk, subnum) {
    //console.log('in av.frd.getInflowAreaResrc: numTsk=', numTsk, '; subnum=', subnum);
    var area = 1;
    var corner = '';
    var coordinates = {};
    var labels = ['inflowx1', 'inflowx2', 'inflowy1', 'inflowy2'];
    var len = labels.length;
    if (null != av.nut[numTsk].uiSub.regionNdx[subnum]) {
      if (0 <= av.nut[numTsk].uiSub.regionNdx[subnum] && av.nut[numTsk].uiSub.regionNdx[subnum] < av.sgr.regionQuarterCodes.length) {

        for (var ndx = 0; ndx < len; ndx++) {
          corner = labels[ndx];
          //console.log('corner=', corner, '; av.nut['+numTsk+'].resrc['+corner+']['+subnum+']=', av.nut[numTsk].resrc[corner][subnum]);
          if (NaN == Number(av.nut[numTsk].resrc[corner][subnum])) {
            coordinates[labels[0]] = 0;
          }
          else {
            coordinates[corner] = Number(av.nut[numTsk].resrc[corner][subnum]);
          }
        }
        //console.log('coordinates=',coordinates);
        var subCols = Math.abs( coordinates.inflowx2 - coordinates.inflowx1 ) + 1;
        var subRows = Math.abs( coordinates.inflowy2 - coordinates.inflowy1 ) + 1;
        area = subCols * subRows;
        console.log('numTsk=', numTsk, 'subnum=', subnum, '; cols=', subCols, '; rows=', subRows, '; area=', area);
        return (area);
      }
      else {
        console.log('Error: problem with av.nut['+numTsk+'].uiSub.regionNdx['+subnum+']=', av.nut[numTsk].uiSub.regionNdx[subnum]);
        return (1);
      }
    }
  };
  //----------------------------------------------------------------------------------- end av.frd.getInflowAreaResrc --

  //---------------------------------------------------------------------------------------- av.frd.environment2struct --
  // puts data from the environment.cfg into the structure for the setup form for the population page
  av.frd.environment2struct = function (fileStr, from) {
    'use strict';
    if (av.dbg.flg.nut) { console.log(from, ' called av.frd.environment2struct'); }
    
    if ('test' != av.dnd.configFlag) {
      // using 'normal' activeConfiguration 
      av.fzr.clearEnvironment('av.frd.environment2struct');
      //should the dom be loaded from the clean environment and then load the data from the file? 

      av.nut.wrldCols = av.fzr.actConfig.cols;  //came from  Number(dict.WORLD_X)
      av.nut.wrldRows = av.fzr.actConfig.rows;  //came from  Number(dict.WORLD_Y)
      av.nut.wrldSize = av.fzr.actConfig.cols * av.fzr.actConfig.rows;  //  av.fzr.actConfig.size;

      av.frd.nutrientParse(fileStr, 'av.frd.environment2struct');    // uses av.nut
      //if (av.dbg.flg.nut) { 
      if (true) { 
        av.nutConfig = {};
        av.nutConfig = JSON.parse(JSON.stringify(av.nut));
        console.log('After av.frd.nutrientParse');
        console.log('av.nutConfig = ', av.nutConfig); 
      }
    }
    else {
      // using "testConfig"
      var errors =  av.frd.testEnvironmentParse(fileStr, av.frd.environment2struc);    // uses av.fzr.env.react This is in the test tab only and will be removed
      if (1 < errors.length) console.log('errors=', errors);    
    }
    if (av.dbg.flg.nut) { console.log('------------------------------------------------------------------ end of av.frd.environment2struct --'); }
  };
  //----------------------------------------------------------------------------------- end av.frd.environment2struct --

  //Load defaults in the dom from the defaults in the av.nut structure. 
  //------------------------------------------------------------------------------------------- av.frd.defaultNut2dom --
  av.frd.defaultNut2dom = function(from) {
    var sugarLength = av.sgr.logicNames.length;
    var numTsk, tsk, tskose;
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface. 

    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];

      document.getElementById(tsk+'0geometry').value = av.sgr.nut.dft.uiAll.geometry;
      document.getElementById(tsk+'0supplyType').value = av.sgr.nut.dft.uiAll.supplyType;
      document.getElementById(tsk+'0regionLayout').value = av.sgr.nut.dft.uiAll.regionLayout;
      document.getElementById(tsk+'0initial').value = av.sgr.nut.dft.uiAll.initial; 

      //for now only one dish - entire world. Later there will be subdishes initial plan is for 2 and then 4;
      for (subNum = 1; subNum <= av.nut.numRegionsinHTML; subNum++) {
        //console.log('ocument.getElementById('+tsk+subNum+'supplyType) =', document.getElementById(tsk+subNum+'supplyType') );
        document.getElementById(tsk+subNum+'supplyType').value = av.sgr.nut.dft.uiSub.supplyType;
        
        //console.log('document.getElementById('+tsk+subNum+'initialHiNp) =', document.getElementById(tsk+subNum+'initialHiNp').value );
        document.getElementById(tsk+subNum+'initialHiNp').value = av.sgr.nut.dft.uiSub.initialHi;
        //console.log('document.getElementById('+tsk+subNum+'initialHiNp) =', document.getElementById(tsk+subNum+'initialHiNp').value );
        
        document.getElementById(tsk+subNum+'inflowHiNp').value = av.sgr.nut.dft.uiSub.inflowHi;
        document.getElementById(tsk+subNum+'outflowHiNp').value = av.sgr.nut.dft.uiSub.outflowHi;
        document.getElementById(tsk+subNum+'diffuseCheck').value = av.sgr.nut.dft.uiSub.diffuseCheck;
        document.getElementById(tsk+subNum+'periodCheck').value = av.sgr.nut.dft.uiSub.periodCheck;
        document.getElementById(tsk+subNum+'gradientCheck').value = av.sgr.nut.dft.uiSub.gradientCheck;
        //console.log('document.getElementById('+tsk+subNum+'hiSide)=', document.getElementById(tsk+subNum+'hiSide') );
        document.getElementById(tsk+subNum+'hiSide').value = av.sgr.nut.dft.uiSub.hiSide;
        document.getElementById(tsk+subNum+'inflowLoNp').value = av.sgr.nut.dft.uiSub.inflowLo;
        document.getElementById(tsk+subNum+'outflowLoNp').value = av.sgr.nut.dft.uiSub.outflowLo;
        document.getElementById(tsk+subNum+'initialLoNp').value = av.sgr.nut.dft.uiSub.initialLo;
        document.getElementById(tsk+subNum+'regionName').value = av.sgr.nut.dft.uiSub.regionName;
        //
        // Not really in Dom, but needed to transition between environment.cfg to dom back to environment.cfg
        //
        //document.getElementById(tsk+subNum+'regionCode').value = av.sgr.nut.dft.uiSub.regionCode;
        //document.getElementById(tsk+subNum+'boxed').value = av.sgr.nut.dft.uiSub.boxed;
        //document.getElementById(tsk+subNum+'').value = av.sgr.nut.dft.uiSub;    //in case we think of another
      }
      //if (av.dbg.flg.nut) { console.log('----------------------------------------------------------- end of each task in default to dome =='); }
    };
    if (av.dbg.flg.nut) { console.log('================================================================== end of av.frd.defaultNut2dom =='); }
  };
  //--------------------------------------------------------------------------------------- end av.frd.defaultNut2dom --

  //Now that structure exists, use that data to update values in the user interface. 
  //--------------------------------------------------------------------------------------- av.frd.nutrientStruct2dom --
  av.frd.nutrientStruct2dom = function(from) {
    //console.log(from, 'called av.frd.nutrientStruct2dom --------------------');
    var sugarLength = av.sgr.logicNames.length;  //
    var numTsk, tsk, tskose;
    var initialValue;
    var subNum = 1;                   //Will need to loop throughh all subNum later
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface. 
    var xdiffuse = -1;
    var ydiffuse = -1;
    var diffusion = -1;
    var area = 1;  // area of the world or subsection
    var cols = Number(av.nut.wrldCols);
    var rows = Number(av.nut.wrldRows);
    var wrldSize = cols * rows;
    if (av.dbg.flg.nut) { console.log(from, ' called av.frd.nutrientStruct2dom: cols = ', cols, '; rows = ', rows, '; wrldSize = ', wrldSize); }
    
    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];

      document.getElementById(tsk+'0regionLayout').value = av.nut[numTsk].uiAll.regionLayout;
      document.getElementById(tsk+'0geometry').value = av.nut[numTsk].uiAll.geometry;

      if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        document.getElementById(tsk+'0supplyType').value = av.nut[numTsk].uiAll.supplyType;
        //console.log('av.nut['+numTsk+']=', av.nut[numTsk]);
      }
      else if ('grid' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        subsections = av.nut[numTsk].resrc.geometry.length;
        //console.log('subsections=', subsections,'; av.nut['+numTsk+']=', av.nut[numTsk]);
        
        //Loop through each subsection. 
        for (subNum = 1; subNum < subsections; subNum++) {

          // regionCode will need to be converted to regionName or need to get regionName from xy cooredinates
          //console.log('numTsk=', numTsk, 'av.nut[numTsk].uiSub=', av.nut[numTsk].uiSub);
          //document.getElementById(tsk+subNum+'regionName').value = av.nut[numTsk].uiSub.regionName[subNum];

          //console.log('document.getElementById('+tsk+subNum+'supplyType)',document.getElementById(tsk+subNum+'supplyType') );
          //tmpstr = JSON.stringify(av.nut[numTsk].uiSub.supplyType);
          //console.log('av.nut['+numTsk+'].uiSub.supplyType['+subNum+'] =',av.nut[numTsk].uiSub.supplyType[subNum], '; supplyType=', tmpstr);
          document.getElementById(tsk+subNum+'supplyType').value = av.nut[numTsk].uiSub.supplyType[subNum]; 

          //console.log('numTsk=',numTsk,'; subNum=',subNum,'; resrc.xdiffuse=',av.nut[numTsk].resrc.xdiffuse[subNum], '; resrc.ydiffuse=',av.nut[numTsk].resrc.ydiffuse[subNum]);
          if (av.nut[numTsk].resrc.xdiffuse[subNum]) {
            if (!isNaN(parseFloat(av.nut[numTsk].resrc.xdiffuse[subNum]))) {
              xdiffuse = parseFloat(av.nut[numTsk].resrc.xdiffuse[subNum]);
            }
            else {xdiffuse = 1;}
          } 
          else {xdiffuse = 1;}
          if (av.nut[numTsk].resrc.ydiffuse[subNum]) {
            if (!isNaN(parseFloat(av.nut[numTsk].resrc.ydiffuse[subNum]))) {
              ydiffuse = parseFloat(av.nut[numTsk].resrc.ydiffuse[subNum]);
            }
            else {ydiffuse = 1;}
          }
          else {ydiffuse = 1;}
          diffuse = Math.round((xdiffuse+ydiffuse)/2);
          //console.log(tsk+subNum+'.xdiffuse=', xdiffuse, '; ydiffuse', ydiffuse, '; diffuse=', diffuse);
          if (0 < diffuse) {
            document.getElementById(tsk+subNum+'diffuseCheck').checked = true;
            av.nut[numTsk].uiSub.diffuseCheck[subNum] = true;
          }
          else { 
            document.getElementById(tsk+subNum+'diffuseCheck').checked = false;
            av.nut[numTsk].uiSub.diffuseCheck[subNum] = false;
          }

          //------------------------------------------------------------------------- 
          // Find area of region or whole dish as needed for inflow  Not sure this statement is needed, as there should alway be an area for dish 1.
          if ("1All" == av.nut[numTsk].uiAll.regionLayout) {
            area = wrldSize;
            if (!isNaN(parseFloat(av.nut[numTsk].cells.initial[subNum]))) {
              //console.log('cells.initial=', parseFloat(av.nut[numTsk].cells.initial[subNum]));
              av.nut[numTsk].uiSub.initialHiNP[subNum] = parseFloat(av.nut[numTsk].cells.initial[subNum])/
                                                         parseFloat(av.nut.wrldSize);
            }
            else if (!isNaN(parseFloat(av.nut[numTsk].resrc.initial[subNum])) ) {
              //console.log('reSrc=', av.nut[numTsk].resrc.initial[subNum], '; wrldSize=', av.nut.wrldSize, 'Num(wrldSize=', parseFloat(av.nut.wrldSize) );
              av.nut[numTsk].uiSub.initialHiNp[subNum] = parseFloat(av.nut[numTsk].resrc.initial[subNum])/
                                                         parseFloat(av.nut.wrldSize);
              //console.log( 'tsk='+numTsk, 'reSrc=' , parseFloat(av.nut[numTsk].resrc.initial[subNum]) );
            }
            if (!isNaN(parseFloat(av.nut[numTsk].uiSub.initialHiNp[subNum]))) {
              //console.log('; uiSub=', av.nut[numTsk].uiSub.initialHiNp[subNum]);
              document.getElementById(tsk+subNum+'initialHiNp').value = av.nut[numTsk].uiSub.initialHiNp[subNum];
            }          
          } 
          else {
            //console.log('numTsk=', numTsk, '; subNum=', subNum, '; cells.initial=', parseFloat(av.nut[numTsk].cells.initial[subNum]), 'reSrc=', av.nut[numTsk].resrc.initial[subNum], '; uiSub=', av.nut[numTsk].uiSub.initialHiNp[subNum]);
            area = av.nut[numTsk].uiSub.area[subNum];
            //console.log('av.nut['+numTsk+'].uiSub.area['+subNum+']=', av.nut[numTsk].uiSub.area[subNum]);
          };

          //------------------------------------------------------------------------- 
          // This only works for whole dish until I start parsing cells. 
          // if initial is defined in RESOURCE, use that value, else use the default value from globals.          
          rValue = parseFloat(av.nut[numTsk].resrc.initial[subNum]);
          var rflag = true;
          //console.log(numTsk+'.resrc.initial=', av.nut[numTsk].resrc.initial[subNum], 'uiSub.initialHi.'+subNum+'=', av.nut[numTsk].uiSubinitialHiNp);
          if ( isNaN(rValue) ) {rflag = false;}
          else {
          // resrc.initial contains a number
            if ( 0 >rValue ) {rflag = false;}
            else {
              // resrc.initial is postive: now test area;
              if ( !isNaN(parseFloat(av.nut[numTsk].uiSub.area[subNum])) && 
                     0 != parseFloat(av.nut[numTsk].uiSub.area[subNum]) ) {
                rValue = rValue / parseFloat(av.nut[numTsk].uiSub.area[subNum]);
              }
              else if ( !isNaN(parseFloat(av.nut.wrldSize)) &&  0 != parseFloat(av.nut.wrldSize) ){
                rValue = rValue / parseFloat(av.nut.wrldSize);
                //console.log('Initial for '+tsk+' subNum='+subNum+'based on WrldSize, subNum size missing or = 0');
              }
            }
          }
          if (!rflag) {
            // inital value not assigned in config file for this task;
            av.nut[numTsk].uiSub.initialHiNp[subNum] = null;
            //if ( isNaN(parseFloat(document.getElementById(tsk+subNum+'initialHiNp').value))) {
            //    document.getElementById(tsk+subNum+'initialHiNp').value = av.sgr.nut.dft.uiSub.initialHi;
            //}
          }

          //------------------------------------------------------------------------- 
          // if inflow is defined in RESOURCE, use that value, else use the default value from globals.
          //console.log('av.nut['+numTsk+'].resrc.inflow['+subNum+']=', av.nut[numTsk].resrc.inflow[subNum]);
          rValue = parseFloat(av.nut[numTsk].resrc.inflow[subNum]);
          if ( !isNaN(rValue) ) {
            if ( 0 <= parseFloat(av.nut[numTsk].resrc.inflow[subNum]) ) {
              //dom and nut contain inflow value per cell; 
              //RESOURCE contains inflow amount for all cells defined (whole world or subsection)
              if (0 < area) { rValue = rValue / area; }
              else { console.log('ERROR: area must be greater than zero'); }
            }
            else {
              rValue = av.sgr.nut.dft.uiSub.inflowHi;
            }
          }
          else {
              rValue = av.sgr.nut.dft.uiSub.inflowHi;           
          };
          //console.log('id=', tsk+subNum+'inflowHiNp');
          document.getElementById(tsk+subNum+'inflowHiNp').value = rValue;
          av.nut[numTsk].uiSub.inflowHiNp[subNum] = rValue;

          //------------------------------------------------------------------------- 
          // if outflow is defined in RESOURCE, use that value, else use the default value from globals.
          rValue = parseFloat(av.nut[numTsk].resrc.outflow[subNum]);
          if ( !isNaN(rValue) ) {
            if ( 0 <= rValue && rValue <= 1 ) {
              //console.log('av.nut['+numTsk+'].uiSub.outflowHiNp['+subNum+']=', tsk+subNum+'outflowHiNp).value=', rValue);
              document.getElementById(tsk+subNum+'outflowHiNp').value = rValue;
              av.nut[numTsk].uiSub.outflowHiNp[subNum] = rValue;
            };
          };
        
          // this is all that is being set now; I'll set more later
        }  //loop thru subsections
      }
      else {
        console.log('Error: geometry unrecognized');
      }
      // must be called outside the subsections loop
      //console.log('av.nut['+numTsk+']', av.nut[numTsk]);
      av.sgr.changeDetailsLayout(tsk, 1, 'av.frd.nutrientStruct2dom');  //the one in this case is for subsection, but it is not used. 
    }
    if (av.dbg.flg.nut) { 
      av.nut2dom = {};
      av.nut2dom = JSON.parse(JSON.stringify(av.nut));
      console.log('nut2dom = ', av.nut2dom); 
    }
    if (av.dbg.flg.nut) { console.log('================================================================== end of av.frd.nutrientStruct2dom =='); }
  };
  //------------------------------------------------------------------------ get needed events out of events.cfg file --

  
  
//======================================================================================================================

  av.frd.eventsCFGparse = function (filestr, from) {
    if (av.dbg.flg.nut) { console.log(from, 'called av.frd.eventsCFGparse'); }
    var matchComment, matchContinue, matchResult;
    var aline;
    var lines = filestr.split('\n');
    var lngth = lines.length;       //number of lines in file. 
    var re_comment = /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_SetPeriodicResourceInflow = /^(.*?)SetPeriodicResourceInflow/i;
    var re_SETPERIODICRESOURCEINFLOW = /^(.*?)SETPERIODICRESOURCEINFLOW/i;
    var lineArray;
    var ii = 0;
    while (ii < lngth) {
      eolfound = false;
      //console.log("lines["+ii+"]=", lines[ii]);
      matchComment = lines[ii].match(re_comment);
      //console.log('matchComment=',matchComment);
      if (null !== matchComment) {aline = matchComment[1];}
      else aline = lines[ii];
      if (3 < aline.length) {
        //console.log('aline.length=', aline.length,'; aline=', aline);
        do {
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
          if (ii+1 < lngth) {
            matchContinue = aline.match(re_continue);
            //console.log('matchContinue=',matchContinue);
            if (null !== matchContinue) {
              ii++;
              //console.log('ii=', ii);
              matchComment = lines[ii].match(re_comment);
              //console.log('matchComment=',matchComment);
              if (null !== matchComment) {aline = matchContinue[1]+matchComment[1];}
              else aline = matchContinue[1]+lines[ii];
            }
            else eolfound = true;
          }
          else eolfound = true;
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
        }
        while (!eolfound)  //end of subloop for continuation lines
        //console.log('ii', ii, '; aline=', aline);
        // look for valid starting keyword
        lineArray = av.utl.spaceSplit(aline).split('~');      //change , to !; remove leading and trailing space and replaces white space with a ~, then splits on ~
        //console.log('lineArray=', lineArray);
        if (2 < lineArray.length) {
          matchResult = lineArray[2].toUpperCase().match(re_SETPERIODICRESOURCEINFLOW);
          //console.log('matchReaction=', matchResult);
          if (null !== matchResult) av.frd.setPeriodicInflowLineParse(lineArray);
        }  //end of checking that line has at least 3 'words'
      }  //end of processing lines longer than 3 characters
      ii++;
    } // while that goes through lines in file. 
    //console.log('----------------------------------------------------------------------------------------------------');
  };

  av.frd.eventsCFG2form = function(fileStr, from){
    'use strict';
    if (av.dbg.flg.nut) { console.log(from, 'called av.frd.eventsCFG2form'); }
    av.frd.eventsCFGparse(fileStr, 'av.frd.eventsCFG2form' );
  };

  //--------------------------------------------- section to put data from avida.cfg into setup form of population page --
  //makes a dictionary entry out of line if the key and value are the first two items.
  av.frd.avidaCFGlineParse = function(instr){
    'use strict';
    var cfgary = av.utl.flexsplit(instr).split(',');  //replaces white space with a comma, then splits on comma
    var rslt = {
      name : cfgary[0],
      value : cfgary[1]
    };
    return rslt;
  };

  // makes a dictionary out of a avida.cfg file
  av.frd.avidaCFGparse = function (filestr) {
    'use strict';
    var rslt = {};
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      var lineobj = av.frd.avidaCFGlineParse(lines[ii]);
      rslt[lineobj.name.toUpperCase()] = lineobj.value;
    } // for
    return rslt;
  };

  // puts data from the avida.cfg into the setup form for the population page
  av.frd.avidaCFG2form = function (fileStr, from){
    'use strict';
    var dict = av.frd.avidaCFGparse(fileStr);
    console.log(from, 'called av.frd.avidaCFG2form; dict=', dict);
    av.dom.sizeCols.value = parseInt(dict.WORLD_X);
    av.grd.gridWasCols = parseInt(dict.WORLD_X);  
    av.grd.setupCols = parseInt(dict.WORLD_X);  
    av.fzr.env.fileCols = parseInt(dict.WORLD_X);  //test dishes only
    av.fzr.actConfig.cols = parseInt(dict.WORLD_X);   // move to av.nut.wrldCols in environment.cfg to struct

    av.dom.sizeRows.value = dict.WORLD_Y;
    av.grd.gridWasRows = parseInt(dict.WORLD_Y);
    av.grd.setupRows = parseInt(dict.WORLD_Y);
    av.fzr.env.fileRows = parseInt(dict.WORLD_Y);   //test dishes only
    av.fzr.actConfig.rows = parseInt(dict.WORLD_Y);    // move to av.nut.wrldRows in environment.cfg to struct
    
    av.fzr.actConfig.size = av.fzr.actConfig.cols * av.fzr.actConfig.rows;
    
    document.getElementById('mutePopInput').value = dict.COPY_MUT_PROB*100;
    //var event = new Event('change');
    var event = new window.CustomEvent('change');
    document.getElementById('mutePopInput').dispatchEvent(event);
    if (0==dict.BIRTH_METHOD) {
      dijit.byId('childParentRadio').set('checked', true);
      dijit.byId('childRandomRadio').set('checked', false);
    }
    else {
      dijit.byId('childParentRadio').set('checked', false);
      dijit.byId('childRandomRadio').set('checked', true);
    }

    if (-1 == dict.RANDOM_SEED) {
      dijit.byId('experimentRadio').set('checked', true);
      dijit.byId('demoRadio').set('checked', false);
    }
    else {
      dijit.byId('experimentRadio').set('checked', false);
      dijit.byId('demoRadio').set('checked', true);
    };
  };
  //---------------------------------------------------------------------------------------------- av.frd.avidaTestform --
  av.frd.avidaTestform = function (fileStr){
    'use strict';
    //console.log('in av.frd.avidaTestform');
    var dict = av.frd.avidaCFGparse(fileStr);
    document.getElementById('sizeColTest').value = dict.WORLD_X;
    //av.grd.gridWasCols = dict.WORLD_X;
    av.grd.gridWasCols = parseInt(dict.WORLD_X);  
    av.grd.setupCols = parseInt(dict.WORLD_X); 
    av.fzr.env.fileCols = parseInt(dict.WORLD_X);

    document.getElementById('sizeRowTest').value = dict.WORLD_Y;
    //av.grd.gridWasRows = dict.WORLD_Y;
     av.grd.gridWasRows = parseInt(dict.WORLD_Y);
    av.grd.setupRows = parseInt(dict.WORLD_Y);
    av.fzr.env.fileRows = parseInt(dict.WORLD_Y);

    document.getElementById('muteInpuTest').value = dict.COPY_MUT_PROB*100;

    //var event = new Event('change');
    var event = new window.CustomEvent('change');
    document.getElementById('muteInpuTest').dispatchEvent(event);
    if (0==dict.BIRTH_METHOD) {
      dijit.byId('childParentRadiTest').set('checked', true);
      dijit.byId('childRandomRadiTest').set('checked', false);
    }
    else {
      dijit.byId('childParentRadiTest').set('checked', false);
      dijit.byId('childRandomRadiTest').set('checked', true);
    }
    av.dom.manualUpdateRadiTest.value = dict.RANDOM_SEED;
  /*
    if (-1 == dict.RANDOM_SEED) {
      dijit.byId('experimentRadiTest').set('checked', true);
      dijit.byId('demoRadiTest').set('checked', false);
    }
    else {
      dijit.byId('experimentRadiTest').set('checked', false);
      dijit.byId('demoRadiTest').set('checked', true);
    }
    */
  };
  //------------------------------------------------------------------------------------------ end processing avida.cfg --

  //--------------------- puts data from the av.frd.pauseRun.txt file into the setup form for the population page---------
  av.frd.pauseRunAtTest2form = function (fileStr) {
    'use strict';
    var update = parseInt(fileStr);
    if (0 < update) {
      dijit.byId('manualUpdateRadiTest').set('checked', false);
      dijit.byId('autoUpdateRadiTest').set('checked', true);
      dijit.byId('autoUpdateSpinneTest').set('value', update);
    }
    else {
      dijit.byId('manualUpdateRadiTest').set('checked', true);
      dijit.byId('autoUpdateRadiTest').set('checked', false);
      dijit.byId('autoUpdateSpinneTest').set('value', '1000');
    }
  };

  //--------------------- puts data from the av.frd.pauseRun.txt file into the setup form for the population page---------
  // this uses the value from the last ine in pauseRunAt.txt if the line has more than one char.
  av.frd.pauseRunAtTXT2form = function (fileStr) {
    'use strict';
    if (av.debug.fio) { console.log('fileStr=', fileStr); }
    if (undefined !== fileStr) {
      var lines = fileStr.split('\n');
      var update;
      var lngth = lines.length;
      for (var ii = 0; ii < lngth; ii++) {
        if (1 < lines[ii].length) {
          if (av.debug.fio) { console.log('lines['+ii+'] = ', lines[ii]); }
          update  = parseInt(lines[ii]);
          if (isNaN(update)) {
            av.dom.autoPauseCheck.checked = false;
            av.dom.autoPauseNum.value = '1000';
          } else if (0 < update){
            av.dom.autoPauseCheck.checked = true;
            av.dom.autoPauseNum.value = update;
          }
          else {
            av.dom.autoPauseCheck.checked = false;
            av.dom.autoPauseNum.value = '1000';
          }
        }
      } // for
    }
  };

  //----------------------- section to put data from ancestors file into ancestorBox and placeparents auto ---------------

  // makes a list out of a ancestor file
  av.fio.autoAncestorParse = function (filestr) {
    'use strict';
    var rslt = {};
    rslt.nam = [];
    rslt.gen = [];
    var lineobj, gen, name;
    var lines = filestr.split('\n');
    var kk = 0;
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        if (ii % 2 < 1) {//even
          rslt.nam[kk] = lines[ii];  //tiba need to get rid of whitespace in string
        }
        else { //odd
          rslt.gen[kk] = lines[ii]; //content will be genome line; leave white space alone
          //console.log('autAncestor', kk, rslt.nam[kk], rslt.gen[kk]);
          kk++;
        }
      }
    } // for
    return rslt;
  };

  // puts data from the ancestor into parents file using autoplace
  av.fio.autoAncestorLoad = function(fileStr) {
    'use strict';
    if (av.debug.fio) console.log('in av.autoAncestorLoad: fileStr', fileStr);
    var rslt = av.fio.autoAncestorParse(fileStr);
    //Now put in ancestors and place parents
    var lngth = rslt.nam.length;
    for (var ii = 0; ii < lngth; ii++) {
      av.parents.genome.push(rslt.gen[ii]);
      var nn = av.parents.name.length;
      av.parents.name.push(rslt.nam[ii]);
      av.parents.howPlaced.push('auto');
      var domIds;
      if ('test' == av.msg.setupType) {
        av.dnd.ancestorBoTest.insertNodes(false, [{data: rslt.nam[ii], type: ['g']}]);
        av.dnd.ancestorBoTest.sync();
        domIds = Object.keys(av.dnd.ancestorBoTest.map);
      }
      else {
        av.dnd.ancestorBox.insertNodes(false, [{data: rslt.nam[ii], type: ['g']}]);
        av.dnd.ancestorBox.sync();
        domIds = Object.keys(av.dnd.ancestorBox.map);
      }
      if (av.debug.fio) console.log('autoPlaceParent: domIds', domIds, '; length', domIds.length);
      av.parents.domid.push(domIds[domIds.length-1]); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.autoNdx.push(nn);
      av.parents.placeAncestors();
      if (av.debug.fio) console.log('av.parents:  name', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
    }
  };

  //---------------- section to put data from ancestors_manual.txt' file into ancestorBox and placeparents hand ---------------

  // makes a listing out of a ancestors_manual.txt' file
  av.fio.handAncestorParse = function (filestr) {
    'use strict';
    if (av.debug.fio) { console.log('filestr=', filestr); }
    var rslt = {};
    rslt.nam = [];
    rslt.gen = [];
    rslt.col = [];
    rslt.row = [];
    var lineobj, gen, xx, yy;
    var pair = [];
    var lines = filestr.split('\n');
    var lngth = lines.length;
    var kk = 0;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        if (0 === ii % 3) {// divide by 3 evenly => first line
          rslt.nam[kk] = lines[ii];  //tiba need to get rid of whitespace in string
        }
        else if (1 === ii % 3){ //second line
          rslt.gen[kk] = lines[ii]; //content will be genome line; leave white space alone
        }
        else {  //third line
          pair = lines[ii].split(',');
          rslt.col[kk] = parseInt(pair[0]);
          rslt.row[kk] = parseInt(pair[1]);
          kk++;
        }
      }
    } // for
    return rslt;
  };

  // puts data from the ancestor into parents file by hand
  av.fio.handAncestorLoad = function(fileStr) {
    'use strict';
    if (av.debug.fio) { console.log('in av.fio.handAncestorLoad'); }
    if (av.debug.fio || true) console.log('in av.fio.handAncestorLoad: fileStr', fileStr);
    var stuff = av.fio.handAncestorParse(fileStr);
    if (av.debug.fio) console.log('in av.fio.handAncestorLoad: stuff', stuff);
    //Now put in ancestors and place parents
    var lngth = stuff.nam.length;
    for (var kk = 0; kk < lngth; kk++) {
      var nn = av.parents.name.length;
      av.parents.name.push(stuff.nam[kk]);
      var domIds;
      if ('test' == av.msg.setupType) {
        av.dnd.ancestorBoTest.insertNodes(false, [{data: stuff.nam[kk], type: ['g']}]);
        av.dnd.ancestorBoTest.sync();
        domIds = Object.keys(av.dnd.ancestorBoTest.map);
      }
      else {
        av.dnd.ancestorBox.insertNodes(false, [{data: stuff.nam[kk], type: ['g']}]);
        av.dnd.ancestorBox.sync();
        domIds = Object.keys(av.dnd.ancestorBox.map);
      }
      if (av.debug.fio) console.log('handAncestorLoad: domIds', domIds, '; length', domIds.length);
      av.parents.domid.push(domIds[domIds.length-1]); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.handNdx.push(nn);
      av.parents.howPlaced.push('hand');
      av.parents.genome[nn] = stuff.gen[kk];
      av.parents.col[nn] = stuff.col[kk];
      av.parents.row[nn] = stuff.row[kk];
      av.parents.injected[nn] = false;
      av.parents.AvidaNdx[nn] = av.parents.col[nn] + parseInt(av.parents.row[nn]) * parseInt(av.dom.sizeCols.value);
      //av.parents.AvidaNdx[nn] = av.parents.col[nn] + parseInt(av.parents.row[nn]) * parseInt(dijit.byId('sizeCols').get('value'));
      //av.parents.AvidaNdx[av.parents.autoNdx[ii]] = av.parents.col[av.parents.autoNdx[ii]] + cols * av.parents.row[av.parents.autoNdx[ii]];
      if (av.debug.fio) console.log('av.parents:  name', av.parents.name[nn], '; domid', av.parents.domid[nn], '; gen', av.parents.genome[nn]);
    }
    if (av.debug.fio) console.log('parents', av.parents);
  };

  //----------------------- section to put data from clade.ssg into parents ----------------------------------------------

  // makes a dictionary out of a clade.ssg file
  av.frd.cladeSSGparse = function (filestr) {
    'use strict';
    var rslt = [];
    var lineobj, cfgary, name;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        cfgary = av.utl.flexsplit(lines[ii]).split(',');   //replaces white space with a comma, then splits on comma
        name = cfgary[0];
        if ('#' !== name[0]) {
          rslt.push(name);
        }
      }
    } // for
    return rslt;
  };

  // puts data from the clade.ssg into the parents structure
  av.fio.cladeSSG2parents = function (fileStr) {
    'use strict';
    var list = av.frd.cladeSSGparse(fileStr);
    var lngth = list.length;
    for (var ii = lngth-1; 0 <= ii; ii--) {
      av.parents.name[ii] = list[ii];
      av.parents.injected[ii] = false;
      //console.log('Dads', list[ii]);
      av.dnd.ancestorBox.insertNodes(false, [{data: av.parents.name[ii], type: ['g']}]);
      // need to find the domid of the ancestor in ancestorBox. The line below is not correct. ???? !!!!! tiba
      var domIDs = Object.keys(av.dnd.ancestorBox.map);
      av.parents.domid.push(domIDs[domIDs.length-1]);
      //Find color of ancestor
      if (0 < av.parents.Colors.length) {av.parents.color.push(av.parents.Colors.pop());}
      else {av.parents.color.push(av.color.defaultParentColor);}
    }
    av.dnd.ancestorBox.sync();
    //console.log('parents', av.parents);
  };

  //----------------------- section to put data from timeRecorder.csv file into data from charts ----------------------

  // makes arrays out of a time recorder file
  av.frd.timeRecorder2chart = function (filestr) {
    'use strict';
    if (undefined !== filestr) {
      var jj = 0;
      var lineData, aline, headerLine, functionLine;
      var lines = filestr.split('\n');
      var lngth = lines.length;
      //console.log('length= ', lngth, '; lines = ', lines);

      //Used to find the maxium for each data column
      av.pch.aveMaxFit = 0;
      av.pch.aveMaxCst = 0;
      av.pch.aveMaxEar = 0;
      av.pch.aveMaxNum = 0;
      av.pch.aveMaxVia = 0;
      av.pch.logMaxFit = 0;
      av.pch.logMaxCst = 0;
      av.pch.logMaxEar = 0;
      av.pch.logMaxNum = 0;

      av.pch.fnBinary = '000000000';            //default is all buttons off.
      for (var ii = 0; ii < lngth; ii++) {
        if (1 < lines[ii].length) {
          aline = lines[ii];
          //console.log('aline[0]', aline[0]);
          if ('#' == aline[0]) {
            //console.log('aline.substring.(0,11) = ', aline.substring(0,11));
            if ('# Functions' == aline.substring(0,11)) {
              //console.log('functionLine = ', aline);
              av.pch.fnBinary = aline.substring(14, 24);
              if (av.debug.fio) { console.log('av.pch.fnBinary = ', av.pch.fnBinary, '; aline=', aline); }
            }
          }
          else {
            //console.log('lines[ii]',lines[ii]);
            lineData = lines[ii].split(',');
            if ('Update' == lineData[0]) {
              headerLine = lineData;
              //console.log('headerLine',headerLine);
            }
            else {
              //console.log('lineData',lineData);
              //console.log('av.pch.nUpdate', av.pch.nUpdate);
              //console.log('jj=', jj);
              av.pch.nUpdate[jj] = parseFloat(lineData[0]);
              //console.log('av.pch.nUpdate[jj]',av.pch.nUpdate[jj]);
              av.pch.aveFit[jj] = parseFloat(lineData[1]);
              av.pch.aveCst[jj] = parseFloat(lineData[2]);
              av.pch.aveEar[jj] = parseFloat(lineData[3]);
              av.pch.aveNum[jj] = parseFloat(lineData[4]);
              av.pch.aveVia[jj] = parseFloat(lineData[5]);
              av.pch.logFit[jj] = parseFloat(lineData[6]);
              av.pch.logCst[jj] = parseFloat(lineData[7]);
              av.pch.logEar[jj] = parseFloat(lineData[8]);
              av.pch.logNum[jj] = parseFloat(lineData[9]);
              av.pch.xx[jj] = jj;
              if (av.pch.aveFit[jj] > av.pch.aveMaxFit) av.pch.aveMaxFit = av.pch.aveFit[jj];
              if (av.pch.aveCst[jj] > av.pch.aveMaxCst) av.pch.aveMaxCst = av.pch.aveCst[jj];
              if (av.pch.aveEar[jj] > av.pch.aveMaxEar) av.pch.aveMaxEar = av.pch.aveEar[jj];
              if (av.pch.aveNum[jj] > av.pch.aveMaxNum) av.pch.aveMaxNum = av.pch.aveNum[jj];
              if (av.pch.aveVia[jj] > av.pch.aveMaxVia) av.pch.aveMaxVia = av.pch.aveVia[jj];
              if (av.pch.logFit[jj] > av.pch.logMaxFit) av.pch.logMaxFit = av.pch.logFit[jj];
              if (av.pch.logCst[jj] > av.pch.logMaxCst) av.pch.logMaxCst = av.pch.logCst[jj];
              if (av.pch.logEar[jj] > av.pch.logMaxEar) av.pch.logMaxEar = av.pch.logEar[jj];
              if (av.pch.logNum[jj] > av.pch.logMaxNum) av.pch.logMaxNum = av.pch.logNum[jj];
              jj++;
            }
          }
        }
      } // for
      //console.log('headerLine = ', headerLine, '; jj=', jj);
      //console.log('av.pch = ', av.pch);
      return;
    }
  };

  //Load Time Recorder Data.
  av.frd.loadTimeRecorderData = function(dir) {
    'use strict';
  //console.log('fzr.file', av.fzr.file);
  // if there is NOT a timeRecorder.csv file, then look for tr0, tr1, tr2, tr3 and tr4
    if (undefined == av.fzr.file[dir + '/timeRecorder.csv']) {
      av.pch.aveFit = av.fio.tr2chart(av.fzr.file[dir + '/1']);
      av.pch.aveCst = av.fio.tr2chart(av.fzr.file[dir + '/tr1.txt']);
      av.pch.aveEar = av.fio.tr2chart(av.fzr.file[dir + '/tr2.txt']);
      av.pch.aveNum = av.fio.tr2chart(av.fzr.file[dir + '/tr3.txt']);
      av.pch.aveVia = av.fio.tr2chart(av.fzr.file[dir + '/tr4.txt']);
      if (av.debug.fio) { console.log('via=', av.fzr.file[dir + '/tr4']); }
      //av.pch.xx = [];  in globals.js
      //console.log('av.pch.aveFit', av.pch.aveFit);
      lngth = av.pch.aveFit.length;
      av.pch.logFit = av.utl.newFilledArray(lngth, null);
      av.pch.logCst = av.utl.newFilledArray(lngth, null);
      av.pch.logEar = av.utl.newFilledArray(lngth, null);
      av.pch.logNum = av.utl.newFilledArray(lngth, null);
      for (var ii = 0; ii < lngth; ii++) av.pch.xx[ii] = ii;
    }
    else {
      //console.log('av.fzr.file.' + dir + '/timeRecorder.csv=', av.fzr.file[dir + '/timeRecorder.csv']);
      //console.log('av.fzr.file.' + dir + '/timeRecorder.csv.length=', av.fzr.file[dir + '/timeRecorder.csv'].length);

      av.frd.timeRecorder2chart(av.fzr.file[dir+'/timeRecorder.csv']);
      if (av.debug.fio) { console.log('av.pch.fnBinary = ', av.pch.fnBinary); }
    }
  };

  //----------------------- section to put data from time recorder (tr) files into data from charts ----------------------

  // makes a dictionary out of a time recorder file
  av.frd.tr2chartParse = function (filestr) {
    'use strict';
    var rslt = {};
    rslt.update = [];
    rslt.data = [];
    var lineobj, cfgary, name;
    var pairs = filestr.split(',');
    var pairLngth = pairs.length;
    if (av.debug.fio) console.log('pairLngth', pairLngth);
    for (var ii = 0; ii < pairLngth; ii++) {
      lineobj = pairs[ii].split(':');
      rslt.update[ii] = parseFloat(lineobj[0]);
      rslt.data[ii] = parseFloat(lineobj[1]);
    } // for
    return rslt.data;
  };

  // puts data from the time recorder data into the right format
  av.fio.tr2chart = function (fileStr) {
    'use strict';
    var data = [];
    if (undefined !== fileStr) { data = av.frd.tr2chartParse(fileStr); }
    return data;
  };

  //------------------------------------------------------------------------------------------ regular expression notes --

  // examples from avdia-ed 
  /*  
    var commentStr = "#!data name:not34g87 region:bot side:lft supply:equilibrium";
    var reactStr = 'REACTION  NAND nand process:resource=nan1:value=1.0:type=pow:depletable=0 requisite:max_count=1 ';
    var resrcStr = 'RESOURCE not1:geometry=grid:initial=1600 #this is a commment';
    var resrcStr1 = "RESOURCE and1:geometry=grid:outflow=1:inflow=40:\  ";
    var resrcStr2 = 'inflowX1=15:inflowY1=0:inflowX2=15:inflowY2=39 ';
    var re_comment = /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_REACTION = /^(.*?)REACTION/i;
    var re_RESOURCE = /RESOURCE/i;
    var match = commentStr.match(re_comment);
    /*
    console.log('not match: str='+resrcStr2+'; resrcStr.match(re_comment)=',resrcStr2.match(re_comment)); 
    console.log('match: str='+commentStr,'; commentStr.match(re_comment)=', commentStr.match(re_comment)); 
    console.log('');
    console.log('str= ',resrcStr,';resrcStr.match(re_comment)=', resrcStr.match(re_comment));
    console.log('str= ',resrcStr1,'resrcStr1.match(re_continue)=',resrcStr1.match(re_continue));
    console.log('str= ',resrcStr,'resrcStr.match(re_RESOURCE)=',resrcStr.match(re_RESOURCE));
    console.log('str= ',reactStr,'reactStr.match(e_REACTION',reactStr.match(re_REACTION));

  //-- looking at resource names
  var nameNone = 'not';
  var shortNames =      ['not0', 'nan12', 'nam345', 'and4g3', 'and4g04', 'and4g22', 'and04g3L'];
  var someNames =      ['not0', 'nan12', 'nam34', 'and1', 'and01', 'and02', 'and03', 'and4g00L', 'and4g01L', 'and4g2L', 'and04g3L'];
  var exampleNames_sepg = ['not0', 'nan12', 'nam34', 'and1', 'and01', 'and02', 'and03', 'and4_g00', 'and4g01', 'and4g2', 'and04g3'];
  var sepNames = ['not_0', 'nan_12', 'nam_34', 'and_1', 'and_01', 'and_02', 'and_03', 'and_4_g00', 'and_4_g01_Lft', 'and_4_g2_Lft', 'and_04_g3_Lft'];
  var get1; var get2; var get3; var tempStr;
  var exampleNames = shortNames;
    var re_num1 = /\D+(\d+)/ig;
    // re_num1 pattern: ^ start of string; \D+ match all non-numerics, but at least one character must exist; (\d+) match into a group one or more contiguous numeric characters
    var re_num2 = /(\d+)/ig;
    var re_num3 = /\d+(\D+)(\d+)/;
    // re_num2 pattern: extending re_num 1 to match the second set of contiguous numeric characters
    for (var ii = 0; ii < exampleNames.length; ii++) {
      tempStr = exampleNames[ii];
      get1 = tempStr.match(re_num1);
      get2 = tempStr.match(re_num2);
      get3 = tempStr.match(re_num3);
      console.log('str=',tempStr, '; re_num1=',re_num1, 'exampleNames['+ii+'].match(re_num1) = \n', get1 );
      console.log('str=',tempStr, '; re_num2=',re_num2, 'exampleNames['+ii+'].match(re_num2) = \n', get2 );
      console.log('str=',tempStr, '; re_num3=',re_num3, 'exampleNames['+ii+'].match(re_num3) = \n', get3 );
      get1 = re_num1.exec(tempStr);
      get2 = re_num2.exec(tempStr);  
      get3 = re_num3.exec(tempStr); 
      console.log('str=',tempStr, '; re_num1=',re_num1, 'get1.last=', re_num1.lastIndex, 're_num1.exec(exampleNames['+ii+']) = \n', get1 );
      console.log('str=',tempStr, '; re_num2=',re_num2, 'get2.last=', re_num2.lastIndex, 're_num2.exec(exampleNames['+ii+']) = \n', get2 );
      console.log('str=',tempStr, '; re_num3=',re_num3, 'get3.last=', re_num3.lastIndex, 're_num3.exec(exampleNames['+ii+']) = \n', get3 );
      //console.log('str=',tempStr, 'get1.last=', tempStr.lastIndex, 're_num2.exec(exampleNames['+ii+']) = \n', /\D+\d+(\D+)(\d+)/.exec(tempStr)   );
      console.log('re_num1 =', re_num1,';  re_num2', re_num2, '----------------------------------------');
    }

  //Examples from https://codepen.io/ijmccallum/post/regular-expressions-in-javascript
  //
  var stringToSearch = 'aa ab ac';
  var myRegExp = /a\w+/g;
  console.log('myRegExp=', myRegExp, '; stringToSearch=', stringToSearch);
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 0
  console.log('myRegExp.exec(stringToSearch', myRegExp.exec(stringToSearch) ); //["aa", index: 0, input: "aa ab ac"]
  console.log('myRegExp.lastIndex', myRegExp.lastIndex); // 2
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); //["ab", index: 3, input: "aa ab ac"]
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 5
  console.log('myRegExp.exec(stringToSearch=', myRegExp.exec(stringToSearch) ); //["ac", index: 6, input: "aa ab ac"]
  console.log('myRegExp.lastIndex', myRegExp.lastIndex); // 8
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); // null
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 0
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); // ["aa", index: 0, input: "aa ab ac"]
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 2

  myRegExp.lastIndex = 0;
  console.log('myRegExp.test(stringToSearch)=', myRegExp.test(stringToSearch) );
  console.log('myRegExp.lastIndex)=', myRegExp.lastIndex); //n 
  console.log('stringToSearch.match(myRegExp)=', stringToSearch.match(myRegExp));
  console.log('stringToSearch.search(myRegExp)=', stringToSearch.search(myRegExp));

  console.log('stringToSearch.search(/ad/)=', stringToSearch.search(/ad/) );
  var newstring = stringToSearch.replace(myRegExp, 'replacement!');
  console.log("stringToSearch.replace(myRegExp, 'replacement!')=", newstring);

  // examples for learning. 
  var junkStr = 'The address is 1273 Divine Dr';   // meta data ^ beginning of string;   $ end of string. 
                                                  // ^ can also be used to indicated negation in a character set
  var re_address_literal = /address/;  // looks for this and only this literally. 
  var re_address = /^.*?address.*?$/;   // 
  var re_number1more = /[0-9]+/;  // one ore more of characters in the group 0 to 9
  var re_decimal = /\d/;    //here the \d is the same as [0-9]
  var re_notNum = /[^0-9]+/;  //one ore more of 'not numeral'
  var re_notNumD = /\D+/;     //one ore more of 'not numeral'
  var re_number0more = /[0-9]*/;   // zero or more of characters in the group 0 to 9

  //  // what does .*/   //do?
  //var re_simple = /.*/;     // in javascript the / at the beginning and end is used to indicate this is a regular expression pattern

  ///----------------------------------------------------------------------------------------- convert string to number --
  //ways to convert from string to number. 
  //console.log('envobj.value[ndx]=', envobj.value[ndx], '; +envobj.value[ndx]=', +envobj.value[ndx],'; task = lnArray[2]=',lnArray[2]);
  //var valueNumber = parseFloat(envobj.value[ndx]);             //if there are characters other than [0-9] or white_space it returns NaN
  //var plusValue = +envobj.value[ndx];
  //var parseIntValue = parseInt(envobj.value[ndx], 10);   // the second pareameter is the radix or base, ignores non [0-9] after the number part of the string
  //var parseFloatValue = parseFloat(envobj.value[ndx]);   //ignores non [0-9] after the number part of the string
  //console.log('valueNumber=', valueparseFloat, '; plusValue=',plusValue,'; parseIntValue=', parseIntValue, '; parseFloatValue=', parseFloatValue);

  ///---------------------------------------------------------------------------------------------------------------------
  //                                                                                           Only used for Test files --
  ///---------------------------------------------------------------------------------------------------------------------

  // only called by by files using av.fzr.env
  av.frd.rNameIndex = function(avfzrenvLog, rtag) {  
     /*
     * 
     * @param avfzrenv =  the suboabject of av.fzr.env that holds the arrays for logic9 type
     * @param rtag       the string that we are looking for. If the string is found data will be over written. 
     *                     if not, create a new entry in the arrays
     * @returns {Int}
     * 
     * Look for rtag in structure
     * return its index if it exists
     * return length + 1 is it does not exist
     */
    //console.log('avfzrenvLog=',avfzrenvLog,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    var defaultindex = avfzrenvLog.name.length;
    //console.log('defaultindex='defaultindex);
    var found = avfzrenvLog.name.indexOf(rtag);

    if (-1 < found) {
      //console.log('The name ', rtag, ' was found already in av.fzr.env subobject=',avfzrenvLog.name);
      return found;
    } 

    return defaultindex;  
  };

  // all av.frd.test files will be deleted eventually. 
  av.frd.testReActLineParse = function (lnArray, from) {
    //console.log(from, 'called av.frd.testReActLineParse');
    'use strict';
    var lnError = '';     //was it a valid line wihtout errors
    //console.log('lnArray = ', lnArray);
    var pear = [];
    var nn;
    var numTsk;
    //find logic type
    //console.log('task = lnArray[2]=',lnArray[2]);
    var logicindex = av.sgr.logicVnames.indexOf(lnArray[2]);   //task name
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var reActObj = av.fzr.env.react[numTsk];   //objec based on logic type and reaction;
      var ndx = av.frd.rNameIndex(reActObj, lnArray[1]);
      //assin the name of the resource. 
      reActObj.name[ndx] = lnArray[1];
      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with constants for Avida-ED
      reActObj.depletable[ndx] = 0;
      reActObj.value[ndx] = 1;
      reActObj.min[ndx] = 0.9;
      reActObj.max[ndx] = 1.1;
      reActObj.max_count[ndx] = 1;
      reActObj.task[ndx] = lnArray[2];
      reActObj.resource[ndx] = reActObj.name[ndx];
      reActObj.type[ndx] = 'pow';

      var len;
      var lngth = lnArray.length;
      //console.log('ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
      for (var jj = 3; jj < lngth; jj++) {
        var pairArray = lnArray[jj].split(':');    //this should get process
        len = pairArray.length;
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii = 1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          //console.log('React: ii=',ii,'; pear', pear);
          nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
          if (-1 < nn) {
            reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
          } else {
            lnError = 'pear[0]=, ' + pear[0] + ' is not a valid reaction keyword. lnArray = ' + lnArray;
            //console.log(lnError);
          }
          ;
        }
        ;  //completed going thru pair arrays
      }
      ;  //completed loop to processs lnArray
      //console.log('numTsk=', numTsk,'ndx=',ndx,'reActObj=', reActObj);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, ' + lnArray[2] + ' not found in av.sgr.logicVnames';
    };
    return lnError;
  };

  //uses av.fzr.env.react 
  av.frd.testResrcLineParse = function (lnArray, from) {
    'use strict';
    //console.log(from, 'called av.frd.testResrcLineParse');
    var lineErrors = '';  //was it a valid line wihtout errors
    //console.log('lnArray = ', lnArray);
    var pairArray = lnArray[1].split(':');
    var pear = [];
    var cellboxdata = [];
    var nn;
    //console.log('pairArray=', pairArray);
    //find logic type
    var logicindex = av.sgr.logicNames.indexOf(pairArray[0].substring(0, 3));
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      var rSourcObj = av.fzr.env.rsrce[numTsk];
      //console.log('numTsk='+numTsk,'; rSourcObj=', rSourcObj);
      var ndx = av.frd.rNameIndex(rSourcObj, pairArray[0]);
      //console.log('ndx=',ndx);
      //assin the name of the resource. 
      rSourcObj.name[ndx] = pairArray[0];

      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file witha few exceptions
      // boxflag is false indicating there are no box values. 
      // in Avida-ED, geometry=grid; 
      //console.log('av.fzr.env=', av.fzr.env);
      //console.log('rSourcObj=', rSourcObj);
      rSourcObj.boxflag[ndx] = false;
      rSourcObj.inflow[ndx] = 0;
      rSourcObj.outflow[ndx] = 0;
      rSourcObj.initial[ndx] = 0;
      //rSourcObj.geometry[ndx] = "Grid";
      rSourcObj.inflowx1[ndx] = 0;                     //techincally should be rand between 0 and cols-1
      rSourcObj.inflowx2[ndx] = rSourcObj.inflowx1[ndx];
      rSourcObj.inflowy1[ndx] = 0;                     //techincally should be rand between 0 and rows-1
      rSourcObj.inflowy2[ndx] = rSourcObj.inflowy1[ndx];
      rSourcObj.outflowx1[ndx] = 0;                     //techincally should be rand between 0 and cols-1
      rSourcObj.outflowx2[ndx] = rSourcObj.inflowx1[ndx];
      rSourcObj.outflowy1[ndx] = 0;                     //techincally should be rand between 0 and rows-1
      rSourcObj.outflowy2[ndx] = rSourcObj.inflowy1[ndx];
      rSourcObj.xdiffuse[ndx] = 0;
      rSourcObj.ydiffuse[ndx] = 0;
      rSourcObj.xgravity[ndx] = 0;
      rSourcObj.ygravity[ndx] = 0;
      //rSourcObj.region[ndx] = 'all';
      //rSourcObj.side[ndx] = 'unk';
      //av.fzr.env.rsrce[numTsk][ndx] = 'unk';

      //process all data pairs
      var len = pairArray.length;
      //console.log('len=',len,'; pairArray=',pairArray);
      for (var ii = 1; ii < len; ii++) {
        pear = pairArray[ii].split('=');
        //console.log('Resource: ii=',ii,'; pear', pear);
        nn = av.sgr.resrc_argu.indexOf(pear[0].toLowerCase());
        if (-1 < nn) {
          rSourcObj[av.sgr.resrc_argu[nn]][ndx] = pear[1];
        } else {
          if ('cellbox' == pear[0].toLowerCase()) {
            cellboxdata = pear[1].split('|');
            //console.log('cellboxdata=',cellboxdata);
            rSourcObj.boxflag[ndx] = true;
            rSourcObj.boxx[ndx] = cellboxdata[0];
            rSourcObj.boxy[ndx] = cellboxdata[1];
            rSourcObj.boxcol[ndx] = cellboxdata[2];
            rSourcObj.boxrow[ndx] = cellboxdata[3];
            av.nut[numTsk].uiSub.area[ndx] = parseFloat(rSourcObj.boxcol[ndx]) * parseFloat(rSourcObj.boxrow[ndx]);
            console.log('av.nut['+numTsk+'].uiSub.area['+ndx+']=', av.nut[numTsk].uiSub.area[ndx], 'rSourcObj.boxrow[ndx]=', rSourcObj.boxrow[ndx]);
          } else {
            lineErrors = 'pear[0]=, ' + pear[0] + ', not a valid resource keyword. lnArray = ' + lnArray;
            //console.log(lineErrors);
          }
        }
      }
      ;

      var subCode = rSourcObj.name[ndx].substring(3).toString();
      //rSourcObj.region[ndx] = subCode;
      //rSourcObj.regionList[subCode] = ndx;

      if (0 < rSourcObj.initial[ndx]) {
        av.fzr.env.supply[numTsk][ndx] = 'fin';
        //av.fzr.env.rsrce[numTsk].supply[ndx] = 'fin';
      } else if (0 < rSourcObj.inflow[ndx]) {
        av.fzr.env.supply[numTsk][ndx] = 'equ';
        //av.fzr.env.rsrce[numTsk].supply[ndx] = 'equ';
      }

      //now assign an index to the region list. 

      //console.log('matchNum=', matchNum,'; numTsk=', numTsk,'ndx=',ndx,'av.fzr.env.rsrce['+numTsk+'].regionList=', av.fzr.env.rsrce[numTsk].regionList);
    }
    // valid logic name not found;
    else {
      lineErrors = 'resource,' + pairArray[0].substring(0, 3) + ' not found in av.sgr.logicNames';
    }

    //co/nsole.log('lineErrors=', lineErrors);
    return lineErrors;
  };

  // uses av.fzr.env.react
  // Uses environment.cfg file to create a structure to hold environment variables. 
  // if (av.dbg.flg.root) { console.log('Root: before  av.frd.testEnvironmentParse'); }
   av.frd.testEnvironmentParse = function (filestr, from) {
    //console.log(from, 'called  av.frd.testEnvironmentParse');
    'use strict';
    var errors = '';
    var reacError, rsrcError;
    var eolfound;
    var lineobj;
    var aline;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    var matchComment, matchContinue, matchResult, metaData;
    var re_metaData = /^(.*?)#.*$/;
    var re_comment = /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_REACTION = /^(.*?)REACTION/i;
    var re_RESOURCE = /RESOURCE/i;
    var lineArray;
    var ii = 0;
    while (ii < lngth) {
      eolfound = false;
      //console.log("lines["+ii+"]=", lines[ii]);
      matchComment = lines[ii].match(re_comment);
      //console.log('matchComment=',matchComment);

      if (null !== matchComment) {
        aline = matchComment[1];
      } else
        aline = lines[ii];
      if (3 < aline.length) {
        //console.log('aline.length=', aline.length,'; aline=', aline);
        do {
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
          if (ii + 1 < lngth) {
            matchContinue = aline.match(re_continue);
            //console.log('matchContinue=',matchContinue);
            if (null !== matchContinue) {
              ii++;
              //console.log('ii=', ii);
              matchComment = lines[ii].match(re_comment);
              //console.log('matchComment=',matchComment);
              if (null !== matchComment) {
                aline = matchContinue[1] + matchComment[1];
              } else
                aline = matchContinue[1] + lines[ii];
            } else
              eolfound = true;
          } else
            eolfound = true;
          //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
        } while (!eolfound)  //end of subloop for continuation lines
        //console.log('ii', ii, '; aline=', aline);
        // look for valid starting keyword
        lineArray = av.utl.spaceSplit(aline).split('~');      //change , to !; remove leading and trailing space and replaces white space with a ~, then splits on ~
        //console.log('lineArray=', lineArray);
        matchResult = lineArray[0].match(re_REACTION);
        //console.log('matchReaction=', matchResult);
        if (null !== matchResult)
          reacError = av.frd.testReActLineParse(lineArray, ' av.frd.testEnvironmentParse');
        else {
          reacError = '';
        }

        matchResult = lineArray[0].match(re_RESOURCE);
        //consolen('matchResource=', matchResult);
        if (null !== matchResult)
          rsrcError = av.frd.testResrcLineParse(lineArray, "av.frd.testEnvironmentParse");
        else {
          rsrcError = '';
        }

        if ('' !== rsrcError || '' !== reacError) {
          //console.log('errors in line: ii=', ii, '; aline=', aline);
          errors += 'ii=' + ii + '; rsrcError=' + rsrcError + '; reacError=' + reacError + '\n';
        }
      }  //end of processing lines longer than 3 characters
      ii++;
    } // while that goes through lines in file. 
    // console.log('----------------------------------------------------------------------------------------------------');
    // console.log('av.fzr.env=', av.fzr.env);
    return errors;
  };
  // will delete later - end of section to put data from environment.cfg into av.fzr.env.react & av.fzr.rsrce Structure --

