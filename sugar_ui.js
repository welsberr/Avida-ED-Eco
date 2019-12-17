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
    //var pattren = 'orn';
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