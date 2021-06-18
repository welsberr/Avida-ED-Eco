  // Process environment.cfg
  
  var av = av || {};  // variable exists; this just lets the ide konw that av is defnined
  var dijit = dijit || {};  //variable exists; this just lets the ide konw that dijit is defnined

  //============================================================================================ read environment.cfg ==
  // to make nutrient structure; and then to create user controls
  //-------------------------------------------------------------------------------------------- av.env.findNameIndex --
  av.env.findNameIndex = function(nutrientObj, rtag, geometry) {
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
    //if (av.dbg.flg.nut) { console.log('defaultindex=',defaultindex,'; rtag='+rtag, '; found=', found, '; nutrientObj.name=', nutrientObj.name); }
    return defaultindex;  
  };
  //---------------------------------------------------------------------------------------- end av.env.findNameIndex --

  // Avida reacton line format
  // REACTION reactionName taskName process:resource=resourceName:value=2:type=pow:max=1.1:min=0.9 requisite:max_count=1
  // Avida-ED 3 version for no resource is 
  // REACTION ANDN andn process:value=0.0:type=pow requisite:max_count=1  #value=3.0
  //
  // For now in Avida-ED 4.0.03 Beta; the the Resource MUST be defined before the Reaction for that resource. 

  //------------------------------------------------------------------------------------------- av.env.reActLineParse --
  av.env.reActLineParse = function(lnArray, from) {
    'use strict';
    //if (av.dbg.flg.nut) { console.log('Nut: ', from, ' called av.env.reActLineParse'); }
    var lnError = '';     //was it a valid line wihtout errors
//    if (av.dbg.flg.nut) { console.log('Nut: av.env.reActLineParse: lnArray = ', lnArray); }
    var pear = [];
    var nn;

    var logicindex = av.sgr.logicVnames.indexOf( lnArray[2] );   //task name length is variable so must fined in that the correct list of logic functions
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var reActObj = av.nut[numTsk].react;   //objec based on logic type and reaction;
      //console.log('numTsk=', numTsk,'; lnArray', lnArray);
      //console.log('av.nut.'+numTsk+'.uiAll.geometry = ');

//      if (av.dbg.flg.nut) { console.log('av.nut['+numTsk+'].uiAll = ',av.nut[numTsk].uiAll); }

      var ndx = av.env.findNameIndex(reActObj, lnArray[1], av.nut[numTsk].uiAll.geometry);
      reActObj.name[ndx] = lnArray[1];   //assin the name of the resource. 
      //console.log('REACT: ndx = ', ndx, '; lnArray[1]', lnArray[1], 'reactName=', reActObj.name, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );

      var len;
      var lngth = lnArray.length;
      //console.log('REACT: ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
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
      //console.log('av.nut['+numTsk+'].react=', av.nut[numTsk].react);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, |'+ lnArray[2]+'| not found in av.sgr.logicVnames';
      console.log(lnError+':', av.sgr.logicVnames);
    };

    return lnError;
  };
  //--------------------------------------------------------------------------------------- end av.env.reActLineParse --

  //--------------------------------------------------------------------------------------- av.env.reSrcNameBasedInfo --
  // this function puts data in av.nut.[numTsk].uiAll and uiSub[sub] based on the name of the resource;
  av.env.reSrcNameBasedInfo = function(numTsk, sub) {
    var re_name = /(\D+)(\d+)([qn])(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL
    var re_region = /(\D+)(\d+)(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL    
   
    nameRCR = av.nut[numTsk].resrc.name[sub];
    
    // resource name matches resource in reaction cfg line.
    // Reaction names a Resource; Need to find info about that resource to determine Supply Type. supplyTypeSlcts will
    // be determined after the entire file has beeen read to make sure the named resource  is in the (nut)rient structure 

    //if (av.dbg.flg.nut) console.log('Nut: reSrcLineParse: pairArray=', pairArray);
    //find logic type include test for quarters vs ninths subregion layout. 
    matchTaskRegion = nameRCR.match(re_name);  // Matches using re_name pattern: looing for tsk##q
    //if (av.dbg.flg.nut) console.log('nut: name =', av.nut[numTsk].resrc.name[sub],'; re_name=', re_name, ', matchTaskRegion=', matchTaskRegion);
    if (null == matchTaskRegion) {
      matchTaskRegion = nameRCR.match(re_region);  // Matches using re_num pattern.
      //console.log('nut: reSrc pairArra[0]=', nameRCR,'; re_region=', re_region, ', matchTaskRegion=', matchTaskRegion);
      if (null != matchTaskRegion) {
        //assume 'q' for quarters if suffix letter indicating subregion layout not included. 
        matchTaskRegion[4] = matchTaskRegion[3];   //                                   1 2
        matchTaskRegion[3] = 'q';  //q=quarters for a dish divided in 4 regions.        3 4      with 00 = whole dish
                                   //n=ninths for a dish divided into ninths as layed out on a phone with 000 = whole dish (not implemented)
      }
    }
    if (null == matchTaskRegion) {
      console.log('ERROR: RESOURCE name format wrong; nameRCR=', nameRCR);
    } else {
      //console.log('nut: nameRCR=', nameRCR,', matchTaskRegion=', matchTaskRegion);
      var tsk =  matchTaskRegion[1];

      //Find region
      //console.log('RESOURCE: matchTaskRegion=', matchTaskRegion);
      //to add a leading zero if needed and add if code is based on 4 quarters or 9 octothorpe
      regionStr = ('000'+ matchTaskRegion[2]).slice(-3);
      //console.log('regionStr=', regionStr);
      av.nut[numTsk].uiSub.regionSet[sub] = matchTaskRegion[3];
      av.nut[numTsk].uiSub.regionCode[sub] = regionStr;   //This is a one to three digit string with leading zeros.
      av.nut[numTsk].uiSub.regionNdx[sub] = av.sgr.regionQuarterCodes.indexOf(regionStr);

      //console.log('av.nut['+numTsk+'].uiSub.regionNdx['+sub+']=', av.nut[numTsk].uiSub.regionNdx[sub]);
      av.nut[numTsk].uiSub.regionName[sub] = av.sgr.regionQuarterNames[av.nut[numTsk].uiSub.regionNdx[sub]];
      //if (av.dbg.flg.nut) { console.log('Nut: RESOURCE: av.nut['+numTsk+'].uiSub.regionCode['+sub+']=', av.nut[numTsk].uiSub.regionCode[sub],'; av.nut[numTsk].uiSub.regionName[sub]=',av.nut[numTsk].uiSub.regionName[sub]); }
      //if (av.dbg.flg.nut) { console.log('Nut: RESOURCE: av.num['+numTsk+'].name['+sub+']=',av.nut[numTsk].resrc.name[sub]); }
    }
  };
  
  //----------------------------------------------------------------------------------- end av.env.reSrcNameBasedInfo --

  //------------------------------------------------------------------------------------------- av.env.reSrcLineParse --
  av.env.reSrcLineParse = function(lnArray, from ){
    'use strict';
    var lineErrors = '';  //was it a valid line wih tout errors
    // if (av.dbg.flg.nut) { console.log('nut: ', from, ' called av.env.reSrcLineParse'); }
    //if (av.dbg.flg.nut) { console.log('lnArray = ', lnArray); }
    var pairArray = lnArray[1].split(':');
    var pear = [];
    var cellboxdata = [];
    var len;
    var nn; 
    var numTsk;
    var rSourcObj;
    var geometry = '';
    var ndx;
    
    var tsk = pairArray[0].substr(0,3);
    //console.log('name=', pairArray[0], '; tsk=', tsk);
    var logicindex = av.sgr.logicNames.indexOf( tsk );
    if (-1 < logicindex) {
      numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      rSourcObj = av.nut[numTsk].resrc;
      //console.log('numTsk='+numTsk,'; rSourcObj=', rSourcObj);

      // find geometry as global tasks are placed in index 0 within av.nut[numTsk].resrc[index]
      //if (av.dbg.flg.nut) console.log('numTsk=', numTsk,'; av.nut[numTsk].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
      len = pairArray.length;
      for (var ii=1; ii < len; ii++) {
        pear = pairArray[ii].split('=');
        //console.log('pear = ', pear);
        if ('geometry' === pear[0].toLowerCase() ) {
          geometry = pear[1];
          break;
        };   
      };
      if (av.dbg.flg.nut) { 
        // console.log('reSrce: pairArray = ', pairArray);
        // console.log('; geometry['+numTsk+']=', geometry); 
      }

      // Set geometry: in Avida-ED, geometry=Grid or global; The user interface calls Grid = 'Local'
      //console.log('av.nut[numTsk].resrc.geometry['+sub+']=', av.nut[numTsk].resrc.geometry[sub]);
      //// console.log('av.nut['+numTsk+'].uiAll.geometry', av.nut[numTsk].uiAll.geometry);
      if ('grid' == geometry || 'global' == geometry ) {
        av.nut[numTsk].uiAll.geometry = geometry;
      }
      else { 
        console.log('ERROR: geometry was not set correctly in environment.cfg *********************************');
        console.log('pairArray=', pairArray, '; av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
      };

      // check to make sure name is unqiue. If it is not unique then overright the previous data. 
      // index into all the arrays that hold resource/reaction parameters; The name should be unique for all arrays in the object. 
      ndx = av.env.findNameIndex(rSourcObj, pairArray[0], av.nut[numTsk].uiAll.geometry);   
      //console.log('RESROUCE: ndx=',ndx, '; tsk=',tsk, '; name=', pairArray[0], 'resrcName=', rSourcObj.name, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );
      //if (av.dbg.flg.nut) { console.log('ndx=',ndx); }
      if (-1 < ndx) {
        rSourcObj.name[ndx] = pairArray[0];    //asign the name of the resource statement. 
        av.nut[numTsk].resrc.geometry[ndx] = geometry;

        //Find information based on resource name
        av.env.reSrcNameBasedInfo(numTsk, ndx);

        // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with a few exceptions
        // defaults are put directly in the dom

        // boxflag is false indicating there are no box values. 
        rSourcObj.boxflag[ndx] = false;

        //process all data pairs
        len = pairArray.length;
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii=1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          nn = av.sgr.resrc_argu.indexOf(pear[0].toLowerCase());
          //if (av.dbg.flg.nut) { console.log('Resource: ii=',ii,'; pear=', pear, '; nn=', nn); }
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
              //console.log('rSourcObj.boxrow[ndx]=', rSourcObj.boxrow[ndx]);
            }
            else {
              lineErrors = 'leftside, '+pear[0]+', not a valid resource keyword. lnArray = '+lnArray;
              if (av.dbg.flg.nut) { console.log(lineErrors); }
            };
          };
        };   //end of proccessing data pairs
        // look for area based on inflow x & y values if they exist
        
        
      }  //end of valid ndx found for the subdish names
    }    //end of valid logic name
    else {
      // valid logic name not found;
      lineErrors = 'RESOURCE: pairArray.substring='+pairArray[0].substring(0,3)+' not found in av.sgr.logicNames';
      console.log(lineErrors);
    }
    //console.log('RESOURCE: lineErrors=', lineErrors);
    return lineErrors;
  };
  //--------------------------------------------------------------------------------------- end av.env.reSrcLineParse --

  //------------------------------------------------------------------------------------------- av.env.cell_LineParse --
  av.env.cell_LineParse = function(lnArray, from) {
    'use strict';
    //if (av.dbg.flg.nut) { console.log('____', from, ' called av.env.cell_LineParse _____'); }
    var lnError = '';     //was it a valid line wihtout errors
    var pair = lnArray[1].split(':');
    var len = pair.length;
    var pear = [];
    var ndx;
    var nn;

    // console.log('CELL lnArray = ', lnArray);
    // console.log('Resource = pair[0]=',pair[0]);
    var tsk = pair[0].substr(0,3);
    
    var logicindex = av.sgr.logicNames.indexOf(tsk);  
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      var numTsk = av.sgr.logEdNames[logicindex];
      // console.log('numTsk=', numTsk);
      // Checking for a resource tag
//      rsrc = pair[0];
  //    ndx = av.nut[numTsk].resrc.indexOf(rsrc);
      ndx = av.nut[numTsk].resrc.name.indexOf(pair[0]);
      // console.log('CELL ndx=', ndx);
      if (0> ndx) {
        // console.log('CELL resource=', pair[0], 'is not in RESOURCE name list = ', av.nut[numTsk].resrc.name); 
        if ( av.nut[numTsk].resrc.name.length > av.nut[numTsk].cell.resrc.length) {
          ndx = av.nut[numTsk].resrc.name.length;
        }
        else { ndx = av.nut[numTsk].cell.resrc.length; }
      };
      // console.log('av.nut['+numTsk+'].uiAll = ', av.nut[numTsk].uiAll);
      av.nut[numTsk].cell.resource[ndx] = pair[0];
      av.nut[numTsk].cell.list[ndx] = pair[1];
      // console.log('CELL: ndx = ', ndx, '; lnArray[1]', lnArray[1], 'cellResource=', av.nut[numTsk].cell.resource, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );

      for (var ii=2; ii < len; ii++) {
        pear = pair[ii].split('=');
        // console.log('av.sgr.cell_argu=', av.sgr.cell_argu);
        nn = av.sgr.cell_argu.indexOf(pear[0].toLowerCase());
        if (av.dbg.flg.nut) { console.log('Resource: ii=',ii,'; pear=', pear, '; nn=', nn); }
        if (-1 < nn) {
          av.nut[numTsk].cell[av.sgr.cell_argu[nn]][ndx] = pear[1];
          // console.log('av.sgr.cell_argu['+nn+']=', av.sgr.cell_argu[nn]);
          // console.log('av.nut['+numTsk+'].cell[' + av.sgr.cell_argu[nn] +'['+ndx+']=', pear[1] );
        }
        else {
          // console.log('left side of pear not a cell argument: leftside = ', pear[0], 'cell arguments=', av.sgr.cell_argu);
        }
      }

    }
    // valid logic name not found;
    else {
      lnError = 'cell task in pair[0]=' + pair[0] + '; tsk='+ tsk + '; not found in av.sgr.logicNames = ', av.sgr.logicName;
      // console.log('CELL: lnError=',lnError);
    };
    // console.log('CELL: numtsk=', numTsk, '; nut.cell=', av.nut[numTsk].cell);
    return lnError;
  };
  //--------------------------------------------------------------------------------------- end av.env.cell_LineParse --

  //-------------------------------------------------------------------------------------------- av.env.nutrientParse --
  // Uses environment.cfg file to create a structure to hold environment variables.   uses av.nut
  av.env.nutrientParse = function (filestr, from) {
    'use strict';
    if (av.dbg.flg.nut) { console.log('Nut:', from + ' called av.env.nutrientParse =='); }
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
    if (true) {
      console.log('------------------------------------ start of av.env.nutrientParse');
      av.nut_beforeParse = {};
      av.nut_beforeParse = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_beforeParse = ', av.nut_beforeParse); 
    }

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
          rsrcError = av.env.reSrcLineParse(lineArray, 'av.env.nutrientParse');
          if ('' != rsrcError) console.log('reSrcLineParse: lineArray=', lineArray, '; rsrcError=', rsrcError);          
        }
        else {rsrcError = '';}

        //look for a REACTION statement
        matchResult = lineArray[0].match(re_REACTION);
        //console.log('matchReaction=', matchResult);
        if (null !== matchResult) { 
          //if (av.dbg.flg.nut) { console.log('reActLineParse: lnArray=', lineArray); }
          reacError = av.env.reActLineParse(lineArray, 'av.env.nutrientParse');
          if ('' != reacError) console.log('reActLineParse: lineArray=', lineArray, '; reacError=', reacError);          
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
          cellError = av.env.cell_LineParse(lineArray, 'av.env.nutrientParse');
          if ('' != cellError) console.log('CELL_LineParse: lineArray=', lineArray, '; cellError=', cellError);          
        }
        else {
          cellError='';
          //console.log('no matach on REACTION');
        };

        if ('' !== rsrcError || '' !== reacError || '' != cellError) {
          console.log('------------------------------------------------------- aline=', aline);
          errors += 'ii='+ii+'; rsrcError='+rsrcError+'; reacError='+reacError+'; cellError='+cellError+'\n';
          console.log('ii='+ii+'; rsrcError='+rsrcError+'; reacError='+reacError+'; cellError='+cellError);
        };

      //if (av.dbg.flg.nut) console.log('--------------------- end of processing a line that was longer than 3 characters -------------------------------');
      }  //end of processing one line that was lines longer than 3 characters
      ii++;
    } // while that goes through lines in file. 
    
          //if (av.dbg.flg.nut) { 
    if (true) {
      console.log('end of av.env.nutrientParse');
      av.nut_env_cfg = {};
      av.nut_env_cfg = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_env_cfg = ', av.nut_env_cfg); 
    }
    if (av.dbg.flg.nut) { console.log('Nut: ================================ end of nutrientParse:  all environment.cfg lines processed =='); }
  };
    //------------------------------------------------------------------------------------- end of av.env.nutrientParse --
    
  //Find subarea based on inflow x, y coordinates
  //--------------------------------------------------------------------------------------- av.env.getInflowAreaResrc --
  av.env.getInflowAreaResrc = function(numTsk, subnum) {
    //console.log('in av.env.getInflowAreaResrc: numTsk=', numTsk, '; subnum=', subnum);
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
  //----------------------------------------------------------------------------------- end av.env.getInflowAreaResrc --

  //-------------------------------------------------------------------------------------- av.env.findReactOnlyUIdata --
  av.env.findReactOnlyUIdata = function(numTsk, sub) {
    //console.log('in av.env.findReactOnlyUIdata: numTsk=', numTsk, '; sub=', sub, '?????????????????????');
    if (0 != sub) { console.log('Reaction only Data should position 0 in the array, sub = ', sub); }
    else {
      //reaction but no resource so it must be global and none or unlimited
      av.nut[numTsk].uiAll.geometry = 'global';
      av.nut[numTsk].uiAll.regionLayout = '1Global';
      av.nut[numTsk].uiSub.regionCode[sub] = '100';
      av.nut[numTsk].uiSub.regionName[sub] = 'Global Dish';
      av.nut[numTsk].uiSub.regionNdx[sub] = 0;
      av.nut[numTsk].uiSub.regionSet[sub] = 'q';
      av.nut[numTsk].uiAll.regionsNumOf = 1;         
      if (0 < av.nut[numTsk].react.value[sub]) {
        av.nut[numTsk].uiAll.supplyTypeSlct = 'unlimited'; 
        //if (av.dbg.flg.nut) { console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct =', av.nut[numTsk].uiAll.supplyTypeSlct); }
      }
      else if (0 > av.nut[numTsk].react.value[sub])  {
        av.nut[numTsk].uiAll.supplyTypeSlct = 'poison';   //poison or damage. does not kill, but hurts energy aquisition rate (ear). 
      }
      else if (0 == av.nut[numTsk].react.value[sub]) {
        av.nut[numTsk].uiAll.supplyTypeSlct = 'none';
        //if (av.dbg.flg.nut) { console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct =', av.nut[numTsk].uiAll.supplyTypeSlct); }
      }
      else { console.log('should not be here'); }

      av.nut[numTsk].uiSub.supplyTypeSlct[sub] = av.nut[numTsk].uiAll.supplyTypeSlct;
      //console.log('findReactOnlyUIdata: numTsk=', numTsk, '; sub=', sub, '; uiAll=', av.nut[numTsk].uiAll);
      //console.log('uiSub=', av.nut[numTsk].uiSub);
    }
  };
  //---------------------------------------------------------------------------------- end av.env.findReactOnlyUIdata --
  
  //---------------------------------------------------------------------------------------- av.env.resourceNameMatch --
  av.env.resourceNameMatch = function(numTsk, sub) {
    var matchStatus = 'unknown';
    if ( null == av.nut[numTsk].react.resource[sub] ) {
      matchStatus = 'undefined';
      av.nut[numTsk].react.resource[sub] = 'missing';
    };
    //console.log('av.env.resourceNameMatch: av.nut['+numTsk+'].react.resource['+sub+']=', av.nut[numTsk].react.resource[sub]);
    if ( 'missing' === av.nut[numTsk].react.resource[sub] ) {
    matchStatus = 'missing';
  }
  else {
    // There is should be a RESOURCE statement; look for a match
    // make sure react.resource matches resrc.name
    //console.log('av.nut['+numTsk+'].resrc.name=', av.nut[numTsk].resrc.name);
    ndx = av.nut[numTsk].resrc.name.indexOf(av.nut[numTsk].react.resource[sub]);
    //console.log('av.nut['+numTsk+'].react.resource['+sub+']=', av.nut[numTsk].react.resource[sub], '; ndx=', ndx);
    if (0 > ndx) {
      //console.log('resrc.name not found in react.resource = ERROR------------------------ERROR');
      matchStatus = 'not found';
      //return matchStatus;
    } 
    else if (ndx != sub) { 
      console.log('********* Name & resource should have the same index: ',
               'av.nut['+numTsk+'].react.resource['+sub+']=', av.nut[numTsk].react.resource[sub],
               'av.nut['+numTsk+'].resrcName['+ndx+']=', av.nut[numTsk].resrc.name[ndx],
               '************');
      matchStatus = 'index differs';
      return matchStatus;
    } else {
      matchStatus = 'found';
    //return matchStatus;
    }
  };
        return matchStatus;
  };
  //------------------------------------------------------------------------------------ end av.env.resourceNameMatch --

  //------------------------------------------------------------------------------------------------- av.env.findArea -
  //
  av.env.findArea = function(numTsk, sub) {
    // expects a valid regionCode
    var assumeUIareaValid = false;
    var area = 1;
    
    //console.log('findArea: av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry, '- - - - - - - - - - - - - - ');

    // Only process if a REACTION statement exists;
    // console.log('     av.nut['+numTsk+'].react.name['+sub+']=' + av.nut[numTsk].react.name[sub]+'_');
    if (null != av.nut[numTsk].react.name[sub]) {
      // check for a resource in resource
      // console.log('av.nut['+numTsk+'].react.resource.['+sub+']='+ av.nut[numTsk].react.resource[sub]+'_');
      if (null != av.nut[numTsk].react.resource[sub]) {
        // console.log('     av.nut['+numTsk+'].resrc.name['+sub+']='+ av.nut[numTsk].resrc.name[sub]+'_');
        // console.log('(av.nut[numTsk].react.resource[sub] == av.nut[numTsk].resrc.name[sub])='+(av.nut[numTsk].react.resource[sub] == av.nut[numTsk].resrc.name[sub]));
        if (av.nut[numTsk].react.resource[sub] == av.nut[numTsk].resrc.name[sub]) { 
          resourceMatch = true; 
          //console.log('resourceMatch=', resourceMatch);
        }
        else {
          av.nut[numTsk].uiAll.geometry = 'global';
          av.nut[numTsk].uiSub.area[sub] = av.nut.wrldSize;
          area = av.nut.wrldSize;
          // console.log('av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry, '________________________');
          
          console.log('Nut: REACTION statement only; av.nut['+numTsk+'].uiSub['+sub+'].area is wrldSize =', av.nut.wrldSize);
          return area;
        }
      };
      if ('global' == av.nut[numTsk].uiAll.geometry) {
        av.nut[numTsk].uiSub.area[sub] = av.nut.wrldSize;
        area = av.nut.wrldSize; 
        //console.log('Nut: RESOURCE present; area is wrldSize =', av.nut.wrldSize);
        return area;
      }
      else {
        // geometry type should be grid
        // Test to see if uiSub exits and matches region code uiSub.area if assuming area is already correct
        if (assumeUIareaValid) {  
          // not implementd as I don't expect it to exist
          // verify if uiSub.area exists and is <= wrldSize
          // _return_ av.nut.tsk.uiSub.sub when found and varified. 
          //else validUI is still false and we continue. 
        }; 
        
        //need to define area based on inflow if it exists. 
        //In chemostate, inflow area matches outflow area
        //console.log('av.nut['+numTsk+'].uiSub.supplyTypeSlct['+sub+']=', av.nut[numTsk].uiSub.supplyTypeSlct[sub]);
        if ('chemostat' == av.nut[numTsk].uiSub.supplyTypeSlct[sub].toLowerCase()) {
          //console.log('inflowx1', parseInt(av.nut[numTsk].resrc.inflowx1[sub] ) );
          //console.log('inflowx1', parseInt(av.nut[numTsk].resrc.inflowx2[sub] ) );
          //console.log('inflowx1', parseInt(av.nut[numTsk].resrc.inflowy1[sub] ) );
          //console.log('inflowx1', parseInt(av.nut[numTsk].resrc.inflowy2[sub] ) );
          if (av.utl.isNumber(parseInt(av.nut[numTsk].resrc.inflowx1[sub])) && av.utl.isNumber(parseInt(av.nut[numTsk].resrc.inflowx2[sub]))
                && av.utl.isNumber(parseInt(av.nut[numTsk].resrc.inflowy1[sub])) && av.utl.isNumber(parseInt(av.nut[numTsk].resrc.inflowy2[sub])) ) {
            av.nut[numTsk].resrc.boxcol[sub] = Math.abs( 1 + Number(av.nut[numTsk].resrc.inflowx2[sub]) - Number(av.nut[numTsk].resrc.inflowx1[sub]) );
            av.nut[numTsk].resrc.boxrow[sub] = Math.abs( 1 + Number(av.nut[numTsk].resrc.inflowy2[sub]) - Number(av.nut[numTsk].resrc.inflowy1[sub]) );
            av.nut[numTsk].uiSub.area[sub] = av.nut[numTsk].resrc.boxcol[sub] * av.nut[numTsk].resrc.boxrow[sub];
            //console.log('Nut: chemostat; use inflow coordinates - av.nut['+numTsk+'].uiSub.area['+sub+'] =', av.nut[numTsk].uiSub.area[sub]);
            return (av.nut[numTsk].uiSub.area[sub]);
          };
        };

        // Area from cellbox; supply type is none
        if (av.nut[numTsk].resrc.boxflag[sub]) {
          // check data then assign area based on cellbox rows & cols
          if (av.utl.isNumber(parseInt(av.nut[numTsk].resrc.boxcol[sub])) && av.utl.isNumber(parseInt(av.nut[numTsk].resrc.boxrow[sub]) ) 
              && 0 < (parseInt(av.nut[numTsk].resrc.boxcol[sub])) && (parseInt(av.nut[numTsk].resrc.boxcol[sub])) <= av.nut.wrldSize
              && 0 < (parseInt(av.nut[numTsk].resrc.boxrow[sub])) && (parseInt(av.nut[numTsk].resrc.boxrow[sub])) <= av.nut.wrldSize) {
            av.nut[numTsk].uiSub.area[sub] = parseInt(av.nut[numTsk].resrc.boxcol[sub]) * parseInt(av.nut[numTsk].resrc.boxrow[sub]);
            area = av.nut[numTsk].uiSub.area[sub];
            console.log('Nut: use cellbox - av.nut['+numTsk+'].uiSub.area['+sub+'] =', av.nut[numTsk].uiSub.area[sub], 
                        '; col =', av.nut[numTsk].resrc.boxcol[sub], '; row =', av.nut[numTsk].resrc.boxrow[sub]);
            return area;
          }
        };

        // Area based on wrldSize and region definitons. This will be used in writing environment.cfg
        if ( av.utl.isNumber(parseInt(av.nut[numTsk].uiSub.regionNdx[sub])) ) {
          // sub regiona index exist so use that to fine area from regiona type;
          ndx = parseInt(av.nut[numTsk].uiSub.regionNdx[sub]);
          width = Math.floor( parseInt(av.sgr.regionQuarterCols[ndx]) * parseInt(av.nut.wrldCols) );
          if ( 0 != parseInt(av.nut.wrldCols)%2 ) {
            width += av.sgr.regionQuarterColsAdd;  //odd number of columns add one column to 
          }
          height = Math.floor( parseInt(av.sgr.regionQuarterRows[ndx]) * parseInt(av.nut.wrldRows) );
          if (height < parseInt(av.sgr.regionQuarterRows[ndx]) * parseInt(av.nut.wrldRows)) {
            height += av.sgr.regionQuarterRowsAdd;
          }
          //console.log('area based on world size and region definitions: Area = ', area);
          area = width * height;
          return area;
        };
      };    // region is NOT the whole dish; 
    };     // geometry is grid
  };      // there was a react.name 

  
  //--------------------------------------------------------------------------------------------- end av.env.findArea --

  //------------------------------------------------------------------------------------------- av.env.findsupplyTypeSlct --
  // find some summary info about nutrients. Need to look at each task separately. 
  av.env.findsupplyTypeSlct = function() {
    var nameMatch;
    var numTsk,lenResourceInReact, sub;
    var nameRCR;     // name should be the same for RESPONSE, CELL, REACTION, but name or reaction matters the least.
    var regionCodeGroup; 
    var regionCodeAry = [];
    var inflowR, inflowC, initialR, initialC;
    var len = av.sgr.logEdNames.length;   //9
    // console.log('in av.env.findsupplyTypeSlct: len=', len);
    for (var ii=0; ii< len; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      lenResourceInReact = av.nut[numTsk].react.name.length;       // There is data for all reaction statements. s
      //console.log('numTsk=', numTsk, '; lenRegon=', lenResourceInReact);
      for (var sub=0; sub< lenResourceInReact; sub++) {
        // begin of secton from reAct

        //There are older environment.cfg files that do not include a resource in the reaction statement. 
        // All of those will be considered to have global resources and they will typically be unlimited or none.
        // 
        // IF the code word 'missing' is the listed as the name of the resource than there is not resource specified and 
        // the reaction can only act as if the resource for that task is none or unlimited and it must be global. 
        if (null != av.nut[numTsk].react.name[sub]) {
          nameRCR = av.nut[numTsk].react.name[sub];

          // returns 'found' if react.resource[sub] matches resrc.react[sub];
          nameMatch = av.env.resourceNameMatch(numTsk, sub);
          //console.log('nameMatch=', nameMatch);
          if ('missing' == nameMatch) { 
            // Avida Avida-ED 3 workspaces do not have Resourc statements;
            // Some Avida-ED 4 workspaces are missing Resource statements;
            av.env.findReactOnlyUIdata(numTsk, sub); 
          }
          else if ('found' == nameMatch ) { 
            // There is a matching resource statement.
            // Geometry and Region information was found in RESOURCE statment 

            //Find the supply type ------------------------------------------
            //if (av.dbg.flg.nut) { console.log('Nut: regionCode is ', av.nut[numTsk].uiSub.regionCode[sub]); }
            // Look for limited or none
            // Look at RESOURCE initial first. 
            // console.log('av.nut['+numTsk+'].resrc.initial['+sub+']=', av.nut[numTsk].resrc.initial[sub]);
            if ( av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.initial[sub])) ) {
              if (0 == parseFloat(av.nut[numTsk].resrc.initial[sub]) ) {
                av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'none'; 
                av.nut[numTsk].uiAll.supplyTypeSlct = 'none';
              } 
              else if (0 < av.nut[numTsk].resrc.initial[sub]) {
                av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'limited';
                av.nut[numTsk].uiAll.supplyTypeSlct = 'limited';
                if (null == av.nut[numTsk].uiSub.area[sub]) {
                  av.nut[numTsk].uiSub.area[sub] = av.nut.wrldSize;   //this may get redifned based on cells
                  //console.log('set av.nut['+numTsk+'].uiSub.area['+sub+'] to wrldSize=', av.nut.wrldSize);
                }
              }
            };
            
            //If there is also CELL initial, CELL over writes RESOURCE inital for Avida-ED. In avida, they are additive
            if ( av.utl.isNumber(parseFloat(av.nut[numTsk].cell.initial[sub])) ) {
              if (0 == parseFloat(av.nut[numTsk].cell.initial[sub]) ) {
                av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'none';                        //None
                av.nut[numTsk].uiAll.supplyTypeSlct = 'none';
              } 
              else if (0 < av.nut[numTsk].cell.initial[sub]) {
                av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'limited';                      //Limited
                av.nut[numTsk].uiAll.supplyTypeSlct = 'limited';
                if (null == av.nut[numTsk].uiSub.area[sub]) {
                  av.nut[numTsk].uiSub.area[sub] = av.nut.wrldSize;   //this may get redifned based on cells (need to think about how to parse)
                  console.log('set av.nut['+numTsk+'].uiSub.area['+sub+'] to wrldSize=', av.nut.wrldSize);
                }
              }
              av.nut[numTsk].uiAll.supplyTypeSlct = 'uiSub';
            } 
            else if ( 1 < av.nut[numTsk].uiAll.regionsNumOf ) { 
              console.log('av.nut['+numTsk+'].cell.initial['+sub+']=', av.nut[numTsk].cell.initial[sub]); 
            };

            //console.log('av.nut['+numTsk+'].resrc.inflow['+sub+']=', av.nut[numTsk].resrc.inflow[sub]);
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.inflow[sub])) && av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.outflow[sub])) ) {
              //console.log('av.nut['+numTsk+'].resrc.outflow['+sub+']=', av.nut[numTsk].resrc.outflow[sub]);
              //console.log('0 < parseFloat(av.nut[numTsk].resrc.inflow[sub]) is ', (0 < parseFloat(av.nut[numTsk].resrc.inflow[sub])));
              //console.log('0.0 < ' + parseFloat(av.nut[numTsk].resrc.outflow[sub])+' is ', (0.0 < parseFloat(av.nut[numTsk].resrc.outflow[sub])));
              //console.log('parseFloat(av.nut[numTsk].resrc.outflow[sub]) <= 1 is ', (parseFloat(av.nut[numTsk].resrc.outflow[sub]) <= 1));
              if (0 < parseFloat(av.nut[numTsk].resrc.inflow[sub]) && 
                  0.0 < parseFloat(av.nut[numTsk].resrc.outflow[sub]) && parseFloat(av.nut[numTsk].resrc.outflow[sub]) <= 1) {
                  
                if ('global' != av.nut[numTsk].uiAll.geometry) {
                  // Local (grid): if inflow and outflow xy coordinates match then it is chemostate
                  // inflow and outflow exist and are numbers; do the defined areas match?
                  //console.log('Local: av.nut['+numTsk+'].resrc.inflowx1['+sub+']=', av.nut[numTsk].resrc.inflowx1[sub]);
                  if (av.nut[numTsk].resrc.inflowx1[sub]===av.nut[numTsk].resrc.outflowx1[sub] && av.nut[numTsk].resrc.inflowx2[sub]===av.nut[numTsk].resrc.outflowx2[sub] && 
                      av.nut[numTsk].resrc.inflowy1[sub]===av.nut[numTsk].resrc.outflowy1[sub] && av.nut[numTsk].resrc.inflowy2[sub]===av.nut[numTsk].resrc.outflowy2[sub] ) {
                    //console.log('Local: av.nut['+numTsk+'].resrc.outflowx1['+sub+']=', av.nut[numTsk].resrc.outflowx1[sub]);
                    av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'chemostat';
                    av.nut[numTsk].uiAll.supplyTypeSlct = 'chemostat';
                  }
                  else { 
                    console.log('av.nut['+numTsk+'].resrc.inflowy1['+sub+']=', av.nut[numTsk].resrc.inflowy1[sub]);
                    console.log('should  type flow, but we are not doing that so will force to be chemostat');
                    av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'chemostat';  //not implemented
                    av.nut[numTsk].uiAll.supplyTypeSlct = 'chemostat';
                  };
                } else {
                  // global no check for matching xy coordinates
                  av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'chemostat';
                  av.nut[numTsk].uiAll.supplyTypeSlct = 'chemostat';
                  
                  //console.log('av.nut['+numTsk+'].resrc.inflow['+sub+']=', av.nut[numTsk].resrc.inflow[sub]);
                }  
              };  // end section where inflow and outflow have contains a numbers in the correct range
            }   // end of section where inflow exists and is a number
            
            // is this needed? if needed should there be a test for null and isNaN
            if (0 == av.nut[numTsk].resrc.initial[sub] && 0 == av.nut[numTsk].resrc.inflow[sub]) {
              av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'none';
              av.nut[numTsk].uiAll.supplyTypeSlct = 'uiSub';
              console.log('note: av.nut['+numTsk+'].resrc.initial['+sub+'] = infow = 0');
            };
            initialR = av.nut[numTsk].resrc.initial[sub];
            initialC = av.nut[numTsk].cell.initial[sub];
            inflowR = av.nut[numTsk].resrc.inflow[sub];
            inflowC = av.nut[numTsk].cell.inflow[sub];
            if ( (inflowR || inflowC) && (initialC || initialR) ) {
              av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'none';
              av.nut[numTsk].uiAll.supplyTypeSlct = 'none';
              console.log('numTsk=', numTsk, '; sub=', sub, '; initial R, C =' ,initialR, initialC, '; inflow R, C =', inflowR, inflowC);
            }
          };  // end of section based on a found resource --------------------------------------------------------------
          
          // Check some reaction parameters that may effect the supplyTypeSlct classification
          // a missing depleatable should be set to the avida default, which is one
          if (null == av.nut[numTsk].react.depletable[sub]) { av.nut[numTsk].react.depletable[sub] = 1; }
          // if not value declared; assume Avida-ED defaults for value
          //this could be in react, but I thought of it here. 
          if (null == av.nut[numTsk].react.value[sub]) {
            av.av.nut[numTsk].react.value[sub] = av.sgr.reactValues[ii];
          };
          // Depleatable set to 0 is used to make a resource unlimited
          if ( 0 == Number(av.nut[numTsk].react.depletable[sub]) ) {
            //console.log('av.nut['+numTsk+'].react.depletable['+sub+']=', av.nut[numTsk].react.depletable[sub]);
            av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'unlimited';
            av.nut[numTsk].uiAll.supplyTypeSlct = 'uiSub';
          };
        }; // processing index into array with a reaction name 
        if (av.sgr.gridOnly && 'global' == av.nut[numTsk].uiAll.geometry) {
          av.env.convertGlobal2grid(numTsk, sub);
        };
      };   //  end of loop through list of subIndex with a reaction name
      if (av.dbg.flg.nut) {
        var endLoopSupplyTsk = {};
        endLoopSupplyTsk = JSON.parse(JSON.stringify(av.nut[numTsk]));
      //console.log('endLoopSupply['+numTsk+']=', endLoopSupplyTsk);      
      };
      //-------------------
      // Determine regionLayout
      regionCodeAry = JSON.parse(JSON.stringify(av.nut[numTsk].uiSub.regionCode));
      //console.log('av.nut['+numTsk+'].uiSub.regionCode =', av.nut[numTsk].uiSub.regionCode);
      regionCodeAry.sort();
      //console.log('av.nut['+numTsk+'].uiSub.regionCode.sort =', regionCodeAry);
      regionCodeGroup = regionCodeAry.join();
      //console.log('regionCodeGroup', regionCodeGroup);
      if (null != regionCodeGroup) {
        av.nut[numTsk].uiAll.regionLayout = av.sgr.regionLookup[regionCodeGroup];
        //console.log('av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout);
      } else { 
        console.log('Error: Why is regionCode empty? regionCode = ', av.nut[numTsk].uiSub.regionCode); 
      }
    };  // end of logic task loops

    //if (av.dbg.flg.nut) { 
    if (true) { 
      av.nutSupply = {};
      av.nutSupply = JSON.parse(JSON.stringify(av.nut));
      console.log('end of av.env.findsupplyTypeSlct');
      console.log('av.nutSupply = ', av.nutSupply); 
      console.log('======================================= end of av.Nut.find Supply Type ===================');
    };

  };
  //--------------------------------------------------------------------------------------- end av.env.findsupplyTypeSlct --

  //---------------------------------------------------------------------------------------------- av.env.resrc2uiSub --
  // Region information was found when RESOURCE line was parced. 
  // Witout a RESOURSE line, geometry = global and region = 1Global
  // called after supply types have been found
  // moves the relevant data from resource and cell to uiSub
  // for now this only works for geometry = grid
  
    av.env.resrc2uiSub = function() { 
      var supplyTypeSlct = ''; var ndx;
      var area = parseInt(av.nut.wrldSize);
      var numTsk='', lenNames = 1, sub = 1;
      var nameRCR;     // name should be the same for RESPONSE, CELL, REACTION, but name or reaction matters the least.
      
      var len = av.sgr.logEdNames.length;   //9
      // console.log('av.nut["4oro"].uiAll.geometry=', av.nut["4oro"].uiAll.geometry, '+++++++++++++++++ ');

      //console.log('in av.env.resrc2uiSub: len=', len);
      for (var ii=0; ii< len; ii++) {
        numTsk = av.sgr.logEdNames[ii];
        lenNames = av.nut[numTsk].resrc.name.length;       // There is data for all reaction statements.
        //console.log('numTsk=', numTsk, '; lenRerc.Names=', lenNames);
        for (var sub=0; sub< lenNames; sub++) {
          if (null != av.nut[numTsk].resrc.name[sub]) {
            nameRCR = av.nut[numTsk].resrc.name[sub];
            area = av.env.findArea(numTsk, sub);
            //console.log('av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry, 'sub=', sub, '=================');
            
            // determine diffusiont parameters
            if ('grid' == av.nut[numTsk].uiAll.geometry.toLowerCase()) {
              // move general data from nut.resrc
              // diffusion
              if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.xdiffuse[sub]))) {
                if ( 0.4 < parseFloat(av.nut[numTsk].resrc.xdiffuse[sub]) ) {
                  av.nut[numTsk].uiSub.diffuseCheck[sub] = 1;
                }
                else { 
                  av.nut[numTsk].uiSub.diffuseCheck[sub] = 0;
                };
              } else if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.ydiffuse[sub]))) {
                if ( 0.4 < parseFloat(av.nut[numTsk].resrc.xdiffuse[sub]) ) {
                  av.nut[numTsk].uiSub.diffuseCheck[sub] = 1;
                }
                else { 
                  av.nut[numTsk].uiSub.diffuseCheck[sub] = 0;
                };
                
              } else { av.nut[numTsk].uiSub.diffuseCheck[sub] = 1; }
            } else {
              // global = geometry
              av.nut[numTsk].uiSub.diffuseCheck[sub] = 0;
            };
            // Find Supply Type
            // console.log('sub=', sub, '; av.nut['+numTsk+'].uiSub.supplyTypeSlct=', av.nut[numTsk].uiSub.supplyTypeSlct);
            if(null == av.nut[numTsk].uiSub.supplyTypeSlct[sub]) {
              if (null != av.nut[numTsk].uiAll.supplyTypeSlct && av.sgr.supplylower.includes(av.nut[numTsk].uiAll.supplyTypeSlct)
                         && '1All' == av.nut[numTsk].uiAll.regionLayout){
                  supplyTypeSlct = av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase();
                  console.log('Error: sub=', sub, 'av.nut.['+numTsk+'].uiAll=', supplyTypeSlct, 'should be from uiSub_________________________Error');
              }
              else {
                supplyTypeSlct  = 'none';
                av.nut[numTsk].uiSub.supplyTypeSlct[sub] = 'none';
                console.log('Error: supplyTypeSlct defined wrong: av.nut['+numTsk+'].uiSub.supplyTypeSlct['+sub+'] is null. uiAll.supplyTypeSlct='
                              , av.nut[numTsk].uiAll.supplyTypeSlct);
              }
            } else {
              supplyTypeSlct = av.nut[numTsk].uiSub.supplyTypeSlct[sub].toLowerCase();
            };

            switch (supplyTypeSlct) {
              case 'limited':
                if ( av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.initial[sub])) ) {
                  av.nut[numTsk].uiSub.initialHiNp[sub] = parseInt(av.nut[numTsk].resrc.initial[sub]) / area;
                };
                // if both Cell & RESOURCE initial are defined CELL overwrites RESOURCE in Avida-ED. In avida they are addative;
                if (av.utl.isNumber(parseFloat(av.nut[numTsk].cell.initial[sub])) ) {
                  av.nut[numTsk].uiSub.initialHiNp[sub] = parseInt(av.nut[numTsk].cell.initial[sub]);
                }
                else if (av.nut[numTsk].cell.initial[sub]) {
                 console.log('Error: av.nut['+numTsk+'].cell.initial['+sub+']=', av.nut[numTsk].cell.initial[sub],'; should be a number:______________________________ Error'); 
                }
                break;
              case 'none':
                av.nut[numTsk].uiSub.initialHiNp[sub] = 0;
                break;
              case 'chemostat':
                if ( av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.inflow[sub])) ) {
                  av.nut[numTsk].uiSub.inflowHiNp[sub] = parseFloat(av.nut[numTsk].resrc.inflow[sub]) / area;
                } else { 
                  av.nut[numTsk].uiSub.inflowHiNp[sub] =  0.666;
                  console.log('av.nut['+numTsk+'].resrc.inflow['+sub+']=', av.nut[numTsk].resrc.inflow[sub]);
                };

                if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.outflow[sub])) ) {
                  av.nut[numTsk].uiSub.outflowHiNp[sub] = parseFloat(av.nut[numTsk].resrc.outflow[sub]);
                 } else { 
                  av.nut[numTsk].uiSub.inflowHiNp[sub] =  0.666;
                  console.log('av.nut['+numTsk+'].resrc.outflow['+sub+']=', av.nut[numTsk].resrc.outflow[sub]);
                };
                break;
              case 'unlimited':
                av.nut[numTsk].uiSub.initialHiNp[sub] = 2;
                break;
                //
            }; // end of switch statement

            // global geometry
            if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
              if (0 != sub) { console.log('global geometry so sub should be 0; sub=', sub); }
              // console.log('sub=', sub, '; av.nut['+numTsk+'].uiSub.supplyTypeSlct=', av.nut[numTsk].uiSub.supplyTypeSlct);
              if(!av.nut[numTsk].uiAll.regionLayout) {
                console.log('strange: av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout)
                av.nut[numTsk].uiAll.regionLayout = '1Global';
              };
              if (!av.nut[numTsk].react.name[sub]) {
                console.log('Stragne: av.nut['+numTsk+'].react.name['+sub+']=', av.nut[numTsk].react.name[sub]);
                av.nut[numTsk].uiAll.supplyTypeSlct = 'none';
              };
              
              //supply  type specific actions
              supplyTypeSlct = av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase();
              switch (supplyTypeSlct) {
                case 'limited':
                  if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.initial[sub])) ) {
                    av.nut[numTsk].uiSub.initialHiNp[sub] = parseFloat(av.nut[numTsk].resrc.initial[sub]/
                                                            parseFloat(av.nut.wrldSize));
                    av.nut[numTsk].uiAll.initialHiNp = parseFloat(av.nut[numTsk].resrc.initial[sub]/
                                                            parseFloat(av.nut.wrldSize));                  }
                  break;
                case 'none':
                  av.nut[numTsk].uiSub.initialHiNp[sub] = 0;
                  break;
                case 'chemostat':
                  console.log('chemostat: av.nut['+numTsk+'].resrc.inflow['+sub+']=', av.nut[numTsk].resrc.inflow[sub],  '; av.nut['+numTsk+'].uiSub.area['+sub+']=', av.nut[numTsk].uiSub.area[sub]);
                  if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.inflow[sub])) ) {
                    av.nut[numTsk].uiSub.inflowHiNp[sub] = parseFloat(av.nut[numTsk].resrc.inflow[sub]);
                  } else { av.nut[numTsk].uiSub.inflowHiNp[sub] =  0.555; };
                  if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.outflowHiNp[sub])) ) {
                    av.nut[numTsk].uiSub.outflowHiNp[sub] = parseFloat(av.nut[numTsk].uiSub.outflowHiNp[sub]);
                  } else { av.nut[numTsk].uiSub.inflowHiNp[sub] =  0.111; };
                  break;
                case 'unlimited':
                  av.nut[numTsk].uiSub.initialHiNp[sub] = av.sgr.nutdft.uiAll.initialHiNp;
                  break;
                  //
              }; // end of switch statement
            }  // end of 'global' == geometry

          };   // end of checking to make sure name is not null
        };    // end of for subregions loop
      };     // end of task loop
      if (true) { 
        av.nutUI = {};
        av.nutUI = JSON.parse(JSON.stringify(av.nut));
        console.log('end of av.env.resrc2uiSub');
        console.log('av.nutUI = ', av.nutUI); 
        console.log('========================================================================================== end of av.env.resrc2uiSub ==');
      }
    };
  //------------------------------------------------------------------------------------------ end av.env.resrc2uiSub --
     
  //--------------------------------------------------------------------------------------- av.env.convertGlobal2grid --
  // Probably will not be used now that we know the test environment works best with no resource statement.

  av.env.convertGlobal2grid = function(numTsk, sub, nameMatch) {
    console.log('av.env.convertGlobal2grid: numTsk=', numTsk, '; sub=', sub, '; nameMatch=', nameMatch);
    if (av.dbg.flg.nut) {
      var preConverTsk = {};
      preConverTsk = JSON.parse(JSON.stringify(av.nut[numTsk]));
    console.log('av.nut_start_ConvertGlobal2Grid['+numTsk+']=', preConverTsk);      
    };
    
    //console.log('av.sgr.logEdNames=', av.sgr.logEdNames);
    var ndx = av.sgr.logEdNames.indexOf(numTsk);
    var tsk = av.sgr.logicNames[ndx];
    var reactLen = av.sgr.react_argu.length;
    var argue  = '';
    var allDishNdx = 0;
    av.nut[numTsk].uiAll.geometry = 'grid';
    if ('found' != nameMatch) {
      // convert a REACTION only statement to a geometry=grid
      if (0 != sub) { console.log('in av.env.convertGlobal2grid; REACTION only; sub=', sub); }
      av.nut[numTsk].uiAll.geometry = 'grid';
      for (var ii=0; ii < reactLen; ii++) {
        argue = av.sgr.react_argu[ii];
        console.log('av.nut['+numTsk+'].react['+argue+'][0]=', av.nut[numTsk].react[argue][0]);
        av.nut[numTsk].react[argue][1] = av.nut[numTsk].react[argue][0];
        av.nut[numTsk].react[argue][0] = null;
      };
      if (0 != av.nut[numTsk].react.value[1]) { 
        av.nut[numTsk].react.depletable[1] = 0;
        av.nut[numTsk].resrc.initial[1] = av.nut.wrldSize;
        av.nut[numTsk].cell.initial[1] = 1;
        av.nut[numTsk].uiSub.initialHiNp[1] = 1;
        av.nut[numTsk].uiSub.supplyTypeSlct[1] = 'unlimited';
      } else {
        av.nut[numTsk].resrc.initial[1] = 0;
        av.nut[numTsk].cell.initial[1] = 0;
        av.nut[numTsk].uiSub.initialHiNp[1] = 0;
        av.nut[numTsk].uiSub.supplyTypeSlct[1] = 'none';
      };
      av.nut[numTsk].uiAll.supplyTypeSlct = 'uiSub';
      if (av.dbg.flg.nut) {
        var tempUIsub = {};
        tempUIsub = JSON.parse(JSON.stringify(av.nut[numTsk].uiSub));
        console.log('av.nut['+numTsk+']=', tempUIsub);
      };
      av.nut[numTsk].resrc.name[1] = tsk+'000q';
      av.nut[numTsk].resrc.geometry[1] = 'grid';
      av.nut[numTsk].react.resource[1] = tsk+'000q';
      av.nut[numTsk].react.min[1] = av.sgr.nutdft.react.min;
      av.nut[numTsk].react.max[1] = av.sgr.nutdft.react.max;
      av.nut[numTsk].react.max_count[1] = av.sgr.nutdft.react.max_count;
      av.nut[numTsk].react.type[1] = av.sgr.nutdft.react.type;
      av.nut[numTsk].uiSub.area[1] = av.nut.wrldSize;
      av.nut[numTsk].uiSub.regionCode[1] = '000';
      console.log('av.nut['+numTsk+'].uiSub.regionCode[1]=', av.nut[numTsk].uiSub.regionCode[1]);
      console.log('av.nut['+numTsk+'].uiSub.regionCode[0]=', av.nut[numTsk].uiSub.regionCode[0]);
      if (av.dbg.flg.nut) {
        var tmpUIsub = {};
        tmpUIsub = JSON.parse(JSON.stringify(av.nut[numTsk].uiSub));
        console.log('av.nut['+numTsk+']=', tmpUIsub);
      };
      av.nut[numTsk].uiSub.regionNdx[1] = allDishNdx;
      av.nut[numTsk].uiSub.regionName[1] = av.sgr.regionQuarterNames[allDishNdx];
      av.nut[numTsk].uiSub.regionSet[1] = 'q';
      av.nut[numTsk].uiSub.initialHiNp[1] = av.nut.wrldSize;
      if (av.dbg.flg.nut) {
        var postConverTsk = {};
        postConverTsk = JSON.parse(JSON.stringify(av.nut[numTsk]));
        console.log('av.nut_endConvert_Global2Grid['+numTsk+']=', postConverTsk); 
      };
    }
    else {
      // a RESOURCE statement with geometry=global exists
      // not implemented as I don't expect this to exist. 
      // I need to figure out how to get the amount of global resources for this to be useful.
    };
  };
  //----------------------------------------------------------------------------------- end av.env.convertGlobal2grid --

  //------------------------------------------------------------------------------------------- av.env.environment2UI --
  // puts data from the environment.cfg into the structure for the setup form for the population page
  av.env.environment2UI = function (fileStr, from) {
    'use strict';
    if (av.dbg.flg.nut) { console.log('Nut: ', from, ' called av.env.environment2UI'); }
    
    if ('test' != av.dnd.configFlag) {
      // using 'normal' activeConfiguration 
      av.fzr.clearEnvironment('av.env.environment2UI');
      //should the dom be loaded from the clean environment and then load the data from the file? 

      av.nut.wrldCols = av.fzr.actConfig.cols;  //came from  Number(dict.WORLD_X)
      av.nut.wrldRows = av.fzr.actConfig.rows;  //came from  Number(dict.WORLD_Y)
      av.nut.wrldSize = av.fzr.actConfig.cols * av.fzr.actConfig.rows;  //  av.fzr.actConfig.size;

      av.env.nutrientParse(fileStr, 'av.env.environment2UI');    // uses av.nut
      //console.log('av.nut["0not"].uiSub=', av.nut["0not"].uiSub);
      av.env.findsupplyTypeSlct();
      
      // now that region as and supply types have been defined, move relevant data from RESOURCE and CELL to uiSub
      av.env.resrc2uiSub();  // must be called after supplyTypeSlct has been found

      av.env.defaultNut2dom('av.env.environment2UI');               //put data from defaults in the dom.
      av.env.ui2dom('av.env.environment2UI');
    }
    else {
      // using "testConfig"
      //need to just put text of environment.cfg into the text box on the test tab
      console.log('not sure anything needs to  be done for Test');    
    };
    if (av.dbg.flg.nut) { console.log('Nut: ================================================================== end of av.env.environment2UI =='); }
  };
  //----------------------------------------------------------------------------------- end av.env.environment2UI --

  //Load defaults in the dom from the defaults in the av.nut structure. 
  //------------------------------------------------------------------------------------------- av.env.defaultNut2dom --
  av.env.defaultNut2dom = function(from) {
    var sugarLength = av.sgr.logicNames.length;
    var numTsk, tsk, tskose;
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface. 

    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];
      
      //document.getElementById(tsk+'_geometry').value = av.sgr.nutdft.uiAll.geometry;    tiba should be deleted in 2021
      document.getElementById(tsk+'_supplyTypeSlct').value = av.sgr.nutdft.uiAll.supplyTypeSlct;
      document.getElementById(tsk+'_regionLayout').value = av.sgr.nutdft.uiAll.regionLayout;
      document.getElementById(tsk+'_initialHiNp').value = av.sgr.nutdft.uiAll.initialHiNp;

      for (subNum = 0; subNum <= av.nut.numRegionsinHTML; subNum++) {
        //sconsole.log('dom =', tsk+subNum+'supplyTypeSlct');
        //document.getElementById(tsk+subNum+'supplyTypeSlct') );
        document.getElementById(tsk+subNum+'supplyTypeSlct').value = av.sgr.nutdft.uiSub.supplyTypeSlct;
        document.getElementById(tsk+subNum+'initialHiNp').value = av.sgr.nutdft.uiSub.initialHiNpHi;
        //console.log('document.getElementById('+tsk+subNum+'initialHiNp) =', document.getElementById(tsk+subNum+'initialHiNp').value );        
        document.getElementById(tsk+subNum+'inflowHiNp').value = av.sgr.nutdft.uiSub.inflowHi; 
        document.getElementById(tsk+subNum+'outflowHiNp').value = av.sgr.nutdft.uiSub.outflowHi;
        document.getElementById(tsk+subNum+'hiSide').value = av.sgr.nutdft.uiSub.hiSide;
        document.getElementById(tsk+subNum+'inflowLoNp').value = av.sgr.nutdft.uiSub.inflowLo;
        document.getElementById(tsk+subNum+'outflowLoNp').value = av.sgr.nutdft.uiSub.outflowLo;
        document.getElementById(tsk+subNum+'initialLoNp').value = av.sgr.nutdft.uiSub.initialHiNpLo;
        document.getElementById(tsk+subNum+'regionName').value = av.sgr.nutdft.uiSub.regionName;
        //console.log('document.getElementById('+tsk+subNum+'hiSide)=', document.getElementById(tsk+subNum+'hiSide') );
        //
        //document.getElementById(tsk+subNum+'diffuseCheck').checked = av.sgr.nutdft.uiSub.diffuseCheck;
        //document.getElementById(tsk+subNum+'periodCheck').checked = av.sgr.nutdft.uiSub.periodCheck;
        //document.getElementById(tsk+subNum+'gradientCheck').checked = av.sgr.nutdft.uiSub.gradientCheck;
        //console.log('av.dom.'+tsk+subNum+'.diffuseChecked=', document.getElementById(tsk+subNum+'diffuseCheck').checked, 
        //                          '; period=', document.getElementById(tsk+subNum+'periodCheck').checked, 
        //                          '; gradient=',document.getElementById(tsk+subNum+'gradientCheck').checked);
        // 
        // Not really in Dom, but needed to transition between environment.cfg to dom back to environment.cfg
        //
        //document.getElementById(tsk+subNum+'regionCode').value = av.sgr.nutdft.uiSub.regionCode;
        //document.getElementById(tsk+subNum+'boxed').value = av.sgr.nutdft.uiSub.boxed;
        //document.getElementById(tsk+subNum+'').value = av.sgr.nutdft.uiSub;    //in case we think of another
      }  // end of subregion list
      //if (av.dbg.flg.nut) { console.log('Nut: ----------------------------------------------------------- end of each task in default to dome =='); }
    };
    // if (av.dbg.flg.nut) { console.log('Nut: ================================================================== end of av.env.defaultNut2dom =='); }
  };
  //--------------------------------------------------------------------------------------- end av.env.defaultNut2dom --
  
  //--------------------------------------------------------------------------------------------------- av.env.ui2dom --
  av.env.ui2dom = function(from) {
    //console.log(from, 'called av.env.ui2dom --------------------');
    var sugarLength = av.sgr.logicNames.length;  //
    var numTsk, tsk, tskose;
    var sub = 0;                   //Will need to loop throughh all sub later
    // only one regioin for now, so this works. I may need add at subcode index later.
    // the data for the regions may not go in the struture in the same order they need to be on the user interface.
    var area = 1;  // area of the world or subsection
    var cols = Number(av.nut.wrldCols);
    var rows = Number(av.nut.wrldRows);
    var wrldSize = cols * rows;
    
    for (var ii = 0; ii < sugarLength; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tsk = av.sgr.logicNames[ii];
      tskose = av.sgr.oseNames[ii];
      document.getElementById(tsk+'_regionLayout').value = av.nut[numTsk].uiAll.regionLayout;
      document.getElementById(tsk+'_geometry').value = av.nut[numTsk].uiAll.geometry;
      
      //console.log('numTsk=', numTsk, 'complexityLevel=', av.sgr.complexityLevel, '; uiAll=', av.nut[numTsk].uiAll);
      if ('sgrBasic' == av.sgr.complexityLevel.toLowerCase() ) {
        sub = 0;
        document.getElementById(tsk+sub+'supplyTypeSlct').value = av.nut[numTsk].uiAll.supplyTypeSlct;
        document.getElementById(tsk+sub+'regionLayout').value = '1Global';
        //console.log('av.nut['+numTsk+']=', av.nut[numTsk].uiAll);
       
        //console.log('document.getElementById('+tsk+'_supplyTypeSlct).value=', document.getElementById(tsk+'_supplyTypeSlct').value);
        //console.log('document.getElementById('+tsk+'WsupplyTypeSlct).value=', document.getElementById(tsk+'WsupplyTypeSlct').value);
        switch (av.nut[numTsk].uiAll.supplyTypeSlct) {
          case 'limited':
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.initialHiNp[sub])) ) {
              document.getElementById(tsk+'1initialHiNp').value = av.nut[numTsk].uiSub.initialHiNp[sub];
            } else { 
              document.getElementById(tsk+'initialHiNp').value = 0.5;
              console.log('Error: av.nut['+numTsk+'].uiSub.initialHiNp['+sub+'] should be a number');
            }
            break;
          case 'none':
            //av.nut[numTsk].uiSub.initialHiNp[sub] = 0;
            break;
          case 'chemostat':
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.inflowHiNp[sub])) ) {
              document.getElementById(tsk+'1inflowHiNp').value = av.nut[numTsk].uiSub.inflowHiNp[sub];
            } else if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.inflow[sub])) ) {
              document.getElementById(tsk+'1inflowHiNp').value = Number(av.nut[numTsk].resrc.inflow[sub])/Number(av.nut.wrldSize);
            } else { document.getElementById(tsk+'1inflowHiNp').value = 0.44444; }
            
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.outflowHiNp[sub])) ) {
              document.getElementById(tsk+'1outflowHiNp').value = av.nut[numTsk].uiSub.outflowHiNp[sub];
            } else if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.outflow[sub])) ) {
              document.getElementById(tsk+'1outflowHiNp').value = av.nut[numTsk].resrc.outflow[sub];
            } else { document.getElementById(tsk+'1outflowHiNp').value = 0.44444; }
            break;
          case 'unlimited':
            av.nut[numTsk].uiSub.initialHiNp[sub] = 2;
            break;
          default :
            console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
            console.log('av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout, 'av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
            break;
          }; // end of switch statement
      }

      //else if ('1Global'  == av.nut[numTsk].uiAll.regionLayout) {   //needs to becocme this one. 
      else if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        sub = 0;
        document.getElementById(tsk+'_supplyTypeSlct').value = av.nut[numTsk].uiAll.supplyTypeSlct;
        document.getElementById(tsk+'_regionLayout').value = '1Global';
        //console.log('av.nut['+numTsk+']=', av.nut[numTsk].uiAll);
       
        //console.log('document.getElementById('+tsk+'_supplyTypeSlct).value=', document.getElementById(tsk+'_supplyTypeSlct').value);
        //console.log('document.getElementById('+tsk+'WsupplyTypeSlct).value=', document.getElementById(tsk+'WsupplyTypeSlct').value);
        switch (av.nut[numTsk].uiAll.supplyTypeSlct) {
          case 'limited':
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.initialHiNp[sub])) ) {
              document.getElementById(tsk+'_initialHiNp').value = av.nut[numTsk].uiSub.initialHiNp[sub];
            } else { 
              document.getElementById(tsk+'_initialHiNp').value = 0.5;
              console.log('Error: av.nut['+numTsk+'].uiSub.initialHiNp['+sub+'] should be a number');
            }
            break;
          case 'none':
            //av.nut[numTsk].uiSub.initialHiNp[sub] = 0;
            break;
          case 'chemostat':
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.inflowHiNp[sub])) ) {
              document.getElementById(tsk+'_inflowHiNp').value = av.nut[numTsk].uiSub.inflowHiNp[sub];
              document.getElementById(tsk+'0inflowHiNp').value = av.nut[numTsk].uiSub.inflowHiNp[sub];
            } else if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.inflow[sub])) ) {
              document.getElementById(tsk+'_inflowHiNp').value = Number(av.nut[numTsk].resrc.inflow[sub])/Number(av.nut.wrldSize);
              document.getElementById(tsk+'0inflowHiNp').value = Number(av.nut[numTsk].resrc.inflow[sub])/Number(av.nut.wrldSize);
            } else { 
              document.getElementById(tsk+'_inflowHiNp').value = 0.44444; 
              document.getElementById(tsk+'0inflowHiNp').value = 0.44444; 
            }
            
            if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.outflowHiNp[sub])) ) {
              document.getElementById(tsk+'_outflowHiNp').value = av.nut[numTsk].uiSub.outflowHiNp[sub];
              document.getElementById(tsk+'0outflowHiNp').value = av.nut[numTsk].uiSub.outflowHiNp[sub];
            } else if (av.utl.isNumber(parseFloat(av.nut[numTsk].resrc.outflow[sub])) ) {
              document.getElementById(tsk+'_outflowHiNp').value = av.nut[numTsk].resrc.outflow[sub];
              document.getElementById(tsk+'0outflowHiNp').value = av.nut[numTsk].resrc.outflow[sub];
            } else { 
              document.getElementById(tsk+'_outflowHiNp').value = 0.44444; 
              document.getElementById(tsk+'0outflowHiNp').value = 0.44444; 
            }
            break;
          case 'unlimited':
            av.nut[numTsk].uiSub.initialHiNp[sub] = 2;
            break;
          default :
            console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
            console.log('av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout, 'av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
            break;
          }; // end of switch statement

      }
      else if ('grid' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        subsections = av.nut[numTsk].resrc.name.length;
        console.log('av.nut['+numTsk+'].uiAll.geometry', av.nut[numTsk].uiAll.geometry
                , '; av.nut['+numTsk+'].uiAll.regionLayout', av.nut[numTsk].uiAll.regionLayout
                , '; av.nut['+numTsk+'].uiSub.supplyTypeSlct=', av.nut[numTsk].uiSub.supplyTypeSlct );
        document.getElementById(tsk+'WsupplyTypeSlct').value = av.nut[numTsk].uiSub.supplyTypeSlct[1]; 
        //Loop through each subsection. 
        for (sub = 1; sub < subsections; sub++) {
          document.getElementById(tsk+sub+'supplyTypeSlct').value = av.nut[numTsk].uiSub.supplyTypeSlct[sub]; 
          // Diffusion  
          if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.diffuseCheck[sub]))) {
            if (0 < parseFloat(av.nut[numTsk].uiSub.diffuseCheck[sub])) {
//            document.getElementById(tsk+sub+'diffuseCheck').checked = true;
            }
            else { 
//              document.getElementById(tsk+sub+'diffuseCheck').checked = false;
            };          
          };
          console.log('document.getElementById('+tsk+sub+'supplyTypeSlct).value=', document.getElementById(tsk+sub+'supplyTypeSlct').value);
          switch (av.nut[numTsk].uiSub.supplyTypeSlct[sub]) {
            case 'limited':
              if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.initialHiNp[sub])) ) {
                document.getElementById(tsk+sub+'initialHiNp').value = av.nut[numTsk].uiSub.initialHiNp[sub];
              } else { 
                document.getElementById(tsk+sub+'initialHiNp').value = 10;
                console.log('Error: av.nut['+numTsk+'].uiSub.initialHiNp['+sub+'] should be a number');
              }
              break;
            case 'none':
              //av.nut[numTsk].uiSub.initialHiNp[sub] = 0;
              break;
            case 'chemostat':
              if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.inflowHiNp[sub])) ) {
                document.getElementById(tsk+sub+'inflowHiNp').value = av.nut[numTsk].uiSub.inflowHiNp[sub];
              } else { document.getElementById(tsk+sub+'inflowHiNp').value = .2222; }
              if (av.utl.isNumber(parseFloat(av.nut[numTsk].uiSub.outflowHiNp[sub])) ) {
                document.getElementById(tsk+sub+'outflowHiNp').value = av.nut[numTsk].uiSub.outflowHiNp[sub];
              } else { document.getElementById(tsk+sub+'outflowHiNp').value = .1111; }
              break;
            case 'unlimited':
              av.nut[numTsk].uiSub.initialHiNp[sub] = 2;
              break;
              //
          }; // end of switch statement
        };  // end of loop for subsections
        
      };   // end of grid section
      sub = 0;
      // update layout for the "sugar" area of UI, based on nutrient structure (nut) from envrironment.cfg
      av.sgr.changeDetailsLayout(tsk, sub, 'av.env.ui2dom');  // sub is not used in this function; need to update. 
    };    // end of task loop
    if (av.dbg.flg.nut) { console.log('Nut in dom: ================================================================== end of av.env.environment2UI =='); }
    if (av.dbg.flg.nut) { 
      av.nut_ui2dom = {};
      av.nut_ui2dom = JSON.parse(JSON.stringify(av.nut));
      console.log('end of av.env.ui2dom');
      console.log('av.nut_ui2dom = ', av.nut_ui2dom); 
    };
  };
  //----------------------------------------------------------------------------------------------- end av.env.ui2dom --

  //Now that structure exists, use that data to update values in the user interface. 
  // This function will be deleted Delete soon
  