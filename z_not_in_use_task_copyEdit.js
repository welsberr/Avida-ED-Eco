                        <div id='sugarAccordion'>

                          <details id='xor0Section' class='sugarAccordionSection'>
                            <summary class='sugarSummary'>
                              <div id='xor0Title' class='sugarTitle'>xorose</div>&nbsp;
                              <select  id='xor0Geometry' class='globalLocal' onchange='av.sgr.geometryChange(this);'>
                                <option value='Global' selected>Global</option>
                                <option value='Local'>Local</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <select  id='xor0SupplyType' class='sugarSupplyType' onchange='av.sgr.supplyChange(this)'>
                                <option id='xor0none' value='None'>None</option>
                                <option id='xor0Infinite' value='Infinite' selected>Infinite</option>
                                <option id='xor0Finite' class='globalFinite' value='Finite'>Finite</option>
                                <option id='xor0Equilibrium' class='globalEquilibrium' value='Equilibrium'>Equilibrium</option>
                                <option id='xor0All' class='globalAll' value='All'>All debug only</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <select  id='xor0dishRegion' class='dishRegion' onchange='av.sgr.dishRegionChange(this)'>
                                <option id='xor0WholeDish' value='WholeDish selected'>Whole Dish</option>
                                <option id='xor0HalvesLeftRight' class='HalfLftRit' value='HalvesLeftRight'>Halves Left/Right</option>
                                <option id='xor0TopLeftRight' class='TopLftRit' value='ThirdsTopLeftRight'>Top/Bottom(L/R)</option>
                                <option id='xor0Quarters' class='Quarters' value='Quarters'>Quarters</option>
                              </select>&nbsp;&nbsp;&nbsp;
                              <div id='xor0initialDiv' class='sugarSummaryDiv'>
                                <label><input id='xor0initialInput' class='sugInitialInput' type='text' onchange='av.sgr.initialChange(this);'/>
                                &nbsp;Initial amount per cell&nbsp;&nbsp;</label>
                              </div>
                            </summary>

                            <div id='xor0Details' class='sugarDetailSection'>
                              
                              <div id='xor1subSection' class='sugarDishSubsection'>
                                <div id='xor1Title' class='grid-sugarDetail-item subSectionTitle'>Whole Dish</div>
                                <div id='xor1supplyTypeSelectHolder' class='grid-sugarDetail-item typeInput'>
                                  <select  id='xor1SupplyType' class='sugarSupplyType' onchange='av.sgr.supplyChange(this);'>
                                    <option id='xor1none' value='None'>None</option>
                                    <option id='xor1Infinite' value='Infinite' selected>Infinite</option>
                                    <option id='xor1Finite' class='localFinite' value='Finite'>Finite</option>
                                    <option id='xor1Equilibrium' class='localEquilibrium' value='Equilibrium'>Equilibrium</option>
                                    <option id='xor1All' class='localAll' value='All'>All debug only</option>
                                  </select>&nbsp;&nbsp;&nbsp;
                                </div>
                                <div id='xor1periodCheckbox' class='grid-sugarDetail-item periodCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='xor1periodCheck' type='checkbox'>Periodic&nbsp;&nbsp;</label>
                                </div>
                                <div id='xor1gradientCheckbox' class='grid-sugarDetail-item gradientCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='xor1gradientCheck' type='checkbox'>Gradient&nbsp;&nbsp;</label>
                                </div>
                                <div id='xor1diffuseCheckbox' class='grid-sugarDetail-item diffuseCheckDiv' onchange='av.sgr.eachSugarCheckBoxChange(this);'>
                                  <label><input id='xor1diffuseCheck' type='checkbox'>Diffusion&nbsp;&nbsp;</label>
                                </div>
                                <div id='xor1hiSideSelectHolder' class='grid-sugarDetail-item sideInput'>
                                  <label><select  id='xor1sideSelect'>
                                    <option value='left' selected>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='top'>Top</option>
                                    <option value='bottom'>Bottom</option>
                                    <option value='center'>Center</option>
                                    <option value='edge'>Edge</option>
                                  </select>
                                    <span id='xor1sideText'>side text to describe what side means</span></label>
                                </div>
                                <div id='xor1periodTime' class='grid-sugarDetail-item periodTime'>
                                  <label><input id='xor1periodInput'  class='sugPeriodInput' type='text' onchange='av.sgr.periodChange(this);'/> Period (updates)</label>
                                </div>
               t                 <div id='xor1sideHiText' class='grid-sugarDetail-item sideTitleHi'>High Side</div>
                                <div id='xor1sideLoText' class='grid-sugarDetail-item sideTitleLo'>Low Side</div>
                                <div id='xor1Blank' class='grid-sugarDetail-item sgrBlank'>&nbsp;&nbsp;&nbsp;&nbsp;</div>  

                                <div id='xor1initialHiDiv' class='grid-sugarDetail-item initialHi'>
                                  <label><input id='xor1initialHiInput' class='sugInitialHiInput' type='text' onchange='av.sgr.initialChange(this);'/>&nbsp;
                                    <span id='xor1initialHiText'>High side initial amount per cell </span></label>
                                </div>
                                <div id='xor1initialLoDiv' class='grid-sugarDetail-item initialLo'>
                                  <label><input id='xor1initialHiInput' class='sugInitialLoInput' type='text' onchange='av.sgr.initialChange(this);'/>&nbsp;
                                    <span id='xor1initialLoText'>Low side initial amount per cell</span></label>
                                </div>
                                <div id='xor1inflowHiDiv' class='grid-sugarDetail-item inflowHi'>
                                  <label><input id='xor1inflowHiInput' class='sugInflowHiInput' type='text' onchange='av.sgr.inflowChange(this);'/>&nbsp;
                                    <span id='xor1inflowHiText' class='sugOutflowLabel'>Inflow amount per cell</span></label>
                                </div>
                                <div id='xor1inflowLoDiv' class='grid-sugarDetail-item inflowLo'>
                                  <label><input id='xor1inflowLoInput' class='sugInflowLoInput' type='text' onchange='av.sgr.inflowChange(this);'/>&nbsp;
                                  <span id='xor1inflowLoText' class='sugOutflowLabel'>Inflow amount per cell on low side</span></label>
                                </div>
                                <div id='xor1outflowHiDiv' class='grid-sugarDetail-item outflowHi'>
                                  <label><input id='xor1outflowHiInput' class='sugOutflowHiInput' type='text' onchange='av.sgr.outflowChange(this);'/>&nbsp;
                                  <span id='xor1outflowHiText' class='sugOutflowLabel'>Outflow fraction per cell.</span></label>
                                </div>
                                <div id='xor1outflowLoDiv' class='grid-sugarDetail-item outflowLo'>
                                  <label><input id='xor1outflowLoInput' class='sugOutflowLoInput' type='text' onchange='av.sgr.outflowChange(this);'/>&nbsp;
                                    <span id='xor1outflowLoText' class='sugOutflowLabel'>Outflow fraction per cell on low side.</span></label>
                                </div>
                                <div id='xor1equalHiDiv' class='grid-sugarDetail-item equalHi'>
                                  <span id='xor1equalHiValue'></span>
                                  <span id='xor1equalHiText'> = equilibrium when no resource has been consumed</span>
                                </div>
                                <div id='xor1equalLoDiv' class='grid-sugarDetail-item equalLo'>
                                  <span id='xor1equalLoValue'></span>
                                  <span id='xor1equalLoText'> = equilibrium if not consumed</span>
                                </div>
                              </div><span id='xor1SectionEnd' class='endsugarDishSubsection'> </span>

                              <div id='xor2subSection' class='sugarDishSubsection'>
                              </div><span id='xor2SectionEnd' class='endsugarDishSubsection'> </span>
                              
                              <div id='xor3subSection' class='sugarDishSubsection'>
                              </div><span id='xor3SectionEnd' class='endsugarDishSubsection'> </span>
                              
                              <div id='xor4subSection' class='sugarDishSubsection'>
                              </div><span id='xor4SectionEnd' class='endsugarDishSubsection'> </span>
                              
                            </div><span id='xor0DetailsEnd' class='end_sugarDetailSection_grid_container'></span>
                          </details>
                          
                          
                        </div><span id='sugarAccordionEnd'></span>


