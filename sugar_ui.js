/* 
 *  functions used to create and modify the user interface for the resources and reactions. 
 *  In Avida-ED we use the analogy of bacterial digessting sugars
 *  Most of the interface is to create the environment file. 
 *  The Periodic functions occure in the Event File. 
 */


<button id='runButton' onclick='av.sgr.runButtonOnClick()'>Run</button>

                        <div id='sugarAccordion'>placeholder</div>
<textarea id='showTxt' cols='200' rows='100'></textarea>

//--------- editing this to go in a CodePen or JSfiddle

// The following should be done once and only once, probably in onload or something like that.

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };

av  = av || {};
av.dom = {};
av.dom.sugarAccordion = document.getElementById('sugarAccordion');
av.dom.showTxt = document.getElementById('showTxt');
av.sgr = {};

av.sgr.runButtonOnClick = function() {
   av.sgr.makeSgrUI();
};

av.sgr.makeSgrUI = function (){
  var newhtml = "";

  var template = `

                          <!-- Sugar of interest: $sug1$ ----------------------------------- -->
                          <details id='$sug1$Section' class='sugarAccordionSection'>
                            <summary class='sugarSummary'>
                              <div id='$sug1$Title' class='sugarTitle'>$sug3$</div>&nbsp;
                              <select  id='$sug1$Geometry' class='globalLocal' onchange='av.sgr.geometryChange(this);'>
                                <option value='Global' selected>Global</option>
                                <option value='Local'>Local</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <select  id='$sug1$0SupplyType' class='sugarSupplyType' onchange='av.sgr.supplyChange(this)'>
                                <option id='$sug1$0none' value='None'>None</option>
                                <option id='$sug1$0Infinite' value='Infinite' selected>Infinite</option>
                                <option id='$sug1$0Finite' class='globalFinite' value='Finite'>Finite</option>
                                <option id='$sug1$0Equilibrium' class='globalEquilibrium' value='Equilibrium'>Equilibrium</option>
                                <option id='$sug1$0All' class='globalAll' value='All'>All debug only</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <select  id='$sug1$0dishRegion' class='dishRegion' onchange='av.sgr.dishRegionChange(this)'>
                                <option id='$sug1$0WholeDish' value='WholeDish selected'>Whole Dish</option>
                                <option id='$sug1$0HalvesLeftRight' class='HalfLftRit' value='HalvesLeftRight'>Halves Left/Right</option>
                                <option id='$sug1$0TopLeftRight' class='TopLftRit' value='ThirdsTopLeftRight'>Top/Bottom(L/R)</option>
                                <option id='$sug1$0Quarters' class='Quarters' value='Quarters'>Quarters</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <div id='$sug1$0initialDiv' class='sugarSummaryDiv'>
                                <label><input id='$sug1$0initialInput' class='sugInitialInput' type='text' onchange='av.sgr.initialChange(this);'/>
                                &nbsp;Initial amount per cell&nbsp;&nbsp;</label>
                              </div>
                            </summary>

                            <div id='$sug1$Details' class='sugarDetailSection'>
			 `; // end template

  // This part of the template is iterated 4 times to populate numbers
  var numberReplace = "1";
  var template_2 = `
                              
                              <div id='$sug1$$num$subSection' class='sugarDishSubsection'>
                                <div id='$sug1$$num$Title' class='grid-sugarDetail-item subSectionTitle'>Whole Dish</div>
                                <div id='$sug1$$num$supplyTypeSelectHolder' class='grid-sugarDetail-item typeInput'>
                                  <select  id='$sug1$$num$SupplyType' class='sugarSupplyType' onchange='av.sgr.supplyChange(this);'>
                                    <option id='$sug1$$num$none' value='None'>None</option>
                                    <option id='$sug1$$num$Infinite' value='Infinite' selected>Infinite</option>
                                    <option id='$sug1$$num$Finite' class='localFinite' value='Finite'>Finite</option>
                                    <option id='$sug1$$num$Equilibrium' class='localEquilibrium' value='Equilibrium'>Equilibrium</option>
                                    <option id='$sug1$$num$All' class='localAll' value='All'>All debug only</option>
                                  </select>&nbsp;&nbsp;&nbsp;
                                </div>
                                <div id='$sug1$$num$periodCheckbox' class='grid-sugarDetail-item periodCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='$sug1$$num$periodCheck' type='checkbox'>Periodic&nbsp;&nbsp;</label>
                                </div>
                                <div id='$sug1$$num$$num$gradientCheckbox' class='grid-sugarDetail-item gradientCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='$sug1$$num$gradientCheck' type='checkbox'>Gradient&nbsp;&nbsp;</label>
                                </div>
                                <div id='$sug1$$num$diffuseCheckbox' class='grid-sugarDetail-item diffuseCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='$sug1$$num$diffuseCheck' type='checkbox'>Diffusion&nbsp;&nbsp;</label>
                                </div>
                                <div id='$sug1$$num$hiSideSelectHolder' class='grid-sugarDetail-item sideInput'>
                                  <label><select  id='$sug1$$num$sideSelect'>
                                    <option value='left' selected>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='top'>Top</option>
                                    <option value='bottom'>Bottom</option>
                                    <option value='center'>Center</option>
                                    <option value='edge'>Edge</option>
                                  </select>
                                    <span id='$sug1$$num$sideText'>side text to describe what side means</span></label>
                                </div>
                                <div id='$sug1$$num$periodTime' class='grid-sugarDetail-item periodTime'>
                                  <label><input id='$sug1$$num$periodInput'  class='sugPeriodInput' type='text' onchange='av.sgr.periodChange(this);'/> Period (updates)</label>
                                </div>
                                <div id='$sug1$$num$sideHiText' class='grid-sugarDetail-item sideTitleHi'>High Side</div>
                                <div id='$sug1$$num$sideLoText' class='grid-sugarDetail-item sideTitleLo'>Low Side</div>
                                <div id='$sug1$$num$Blank' class='grid-sugarDetail-item sgrBlank'>&nbsp;&nbsp;&nbsp;&nbsp;</div>  

                                <div id='$sug1$$num$initialHiDiv' class='grid-sugarDetail-item initialHi'>
                                  <label><input id='$sug1$$num$initialHiInput' class='sugInitialHiInput' type='text' onchange='av.sgr.initialChange(this);'/>&nbsp;
                                    <span id='$sug1$$num$initialHiText'>High side initial amount per cell </span></label>
                                </div>
                                <div id='$sug1$$num$initialLoDiv' class='grid-sugarDetail-item initialLo'>
                                  <label><input id='$sug1$$num$initialHiInput' class='sugInitialLoInput' type='text' onchange='av.sgr.initialChange(this);'/>&nbsp;
                                    <span id='$sug1$$num$initialLoText'>Low side initial amount per cell</span></label>
                                </div>
                                <div id='$sug1$$num$inflowHiDiv' class='grid-sugarDetail-item inflowHi'>
                                  <label><input id='$sug1$$num$inflowHiInput' class='sugInflowHiInput' type='text' onchange='av.sgr.inflowChange(this);'/>&nbsp;
                                    <span id='$sug1$$num$inflowHiText' class='sugOutflowLabel'>Inflow amount per cell</span></label>
                                </div>
                                <div id='$sug1$$num$inflowLoDiv' class='grid-sugarDetail-item inflowLo'>
                                  <label><input id='$sug1$$num$inflowLoInput' class='sugInflowLoInput' type='text' onchange='av.sgr.inflowChange(this);'/>&nbsp;
                                  <span id='$sug1$$num$inflowLoText' class='sugOutflowLabel'>Inflow amount per cell on low side</span></label>
                                </div>
                                <div id='$sug1$$num$outflowHiDiv' class='grid-sugarDetail-item outflowHi'>
                                  <label><input id='$sug1$$num$outflowHiInput' class='sugOutflowHiInput' type='text' onchange='av.sgr.outflowChange(this);'/>&nbsp;
                                  <span id='$sug1$$num$outflowHiText' class='sugOutflowLabel'>Outflow fraction per cell.</span></label>
                                </div>
                                <div id='$sug1$$num$outflowLoDiv' class='grid-sugarDetail-item outflowLo'>
                                  <label><input id='$sug1$$num$outflowLoInput' class='sugOutflowLoInput' type='text' onchange='av.sgr.outflowChange(this);'/>&nbsp;
                                    <span id='$sug1$$num$outflowLoText' class='sugOutflowLabel'>Outflow fraction per cell on low side.</span></label>
                                </div>
                                <div id='$sug1$$num$equalHiDiv' class='grid-sugarDetail-item equalHi'>
                                  <span id='$sug1$$num$equalHiValue'></span>
                                  <span id='$sug1$$num$equalHiText'> = equilibrium when no resource has been consumed</span>
                                </div>
                                <div id='$sug1$$num$equalLoDiv' class='grid-sugarDetail-item equalLo'>
                                  <span id='$sug1$$num$equalLoValue'></span>
                                  <span id='$sug1$$num$equalLoText'> = equilibrium if not consumed</span>
                                </div>
                              </div><span id='$sug1$$num$SectionEnd' class='endsugarDishSubsection'> </span>
			      `; // end of template_2 for numeric iteration

  var template_3 = `
			                      </div><span id='$sug1$DetailsEnd' class='end_sugarDetailSection_grid_container'></span>
                          </details>
                          
  `; // End of template_3 string

  newhtml = ""; // Clear the string

  for (const sugarlist of sugarReplacements){
    var sug1 = sugarlist[0];
    var sug2 = sugarlist[1];
    var sug3 = sugarlist[2];

    var sug1ReplacePattern = '$sug1$';
    var sug2ReplacePattern = '$sug2$';
    var sug3ReplacePattern = '$sug3$';

    var numReplacePattern = '$num$';

    // First part, globals for this sugar
    var newstr = template;
    newstr = newstr.replaceAll(sug1ReplacePattern, sug1);
    newstr = newstr.replaceAll(sug2ReplacePattern, sug2);
    newstr = newstr.replaceAll(sug3ReplacePattern, sug3);
    
    newhtml.append(newstr);

    // Now add local sections 1 2 3 4
    for (var ii=0; ii < 4; ii++){
      var sugnum = ii + 1;

      newstr = template_2;
      newstr = newstr.replaceAll(sug1ReplacePattern, sug1);
      newstr = newstr.replaceAll(sug2ReplacePattern, sug2);
      newstr = newstr.replaceAll(sug3ReplacePattern, sug3);
      newstr = newstr.replaceAll(numReplacePattern, sugnum);

      newhtml.append(newstr);
    }

    // Finish up with closing the section for this sugar
    newstr = template_3;
    newstr = newstr.replaceAll(sug1ReplacePattern, sug1);
    newstr = newstr.replaceAll(sug2ReplacePattern, sug2);
    newstr = newstr.replaceAll(sug3ReplacePattern, sug3);
    
    newhtml.append(newstr);
  };

  // Now all nine tasks are set up in newhtml.
  // Replace the holding div's innerHTML with that.
  av.dom.sugarAccordion.innerHTML = newhtml;
  av.dom.showTxt.value = newhtml;

  // Done.
  };
