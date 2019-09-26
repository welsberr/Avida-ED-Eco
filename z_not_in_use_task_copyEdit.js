                          <details id='equSection' class='sugarAccordionSection'>
                            <summary class='sugarSummary'>
                                <div class='sugarTitle'>Equose</div>&nbsp;
                                <select  id='equGeometry' class='globalLocal' onchange='av.sgr.geometryChange(this);'>
                                  <option value='Global' selected>Global</option>
                                  <option value='Local'>Local</option>
                                </select>&nbsp;&nbsp;&nbsp;
                                <select  id='equ0Type' class='sugarType' onchange='av.sgr.supplyChange(this)'>
                                  <option id='equ0none' value='None'>None</option>
                                  <option id='equ0Infinite' value='Infinite' selected>Infinite</option>
                                  <option id='equ0Finite' value='Finite'>Finite</option>
                                  <option id='equ0Equilibrium' value='Equilibrium'>Equilibrium</option>
                                  <option id='equ0All' value='All'>All debug only</option>
                                  </select>&nbsp;&nbsp;&nbsp;
                                <div id='equ0initialDiv' class='sugarSummaryDiv'>
                                  <input id='equ0initialInput' class='sugInitialInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '100'/>
                                  &nbsp;Initial amount per cell&nbsp;&nbsp;
                                </div>
                                <div id='equ0periodCheckbox' class='sugarSummaryDiv' onchange='av.sgr.eachSugarCheckBoxChange(this)'>
                                  <input id='equ0periodCheck' type='checkbox'>Periodic&nbsp;&nbsp;
                                </div>
                                <div id='equ0gradientCheckbox' class='sugarSummaryDiv' onchange='av.sgr.eachSugarCheckBoxChange(this)'>
                                  <input id='equ0gradientCheck' type='checkbox'>Gradient&nbsp;&nbsp;
                                </div>
                                <div id='equ0diffuseCheckbox' class='sugarSummaryDiv'onchange='av.sgr.eachSugarCheckBoxChange(this)'>
                                  <input type='checkbox' id='equ0diffuseCheck'>Diffusion&nbsp;&nbsp;
                                </div>
                            </summary>
                            <div id='equDetails' class='sugarDetailSection'>
                              <div id='equ1periodTime' class='grid-sugarDetail-item periodTime'>
                                <input id='equ0periodInput'  class='sugPeriodInput' type='text' onchange='av.ptd.gridChange(this.value)' /> Period (updates)
                              </div>
                              <div id='equ1sideHiDiv' class='grid-sugarDetail-item sideTitleHi'>
                                <label clase='sideTitle'>High Side</label>
                              </div>
                              <div id='equ1sideLoDiv' class='grid-sugarDetail-item sideTitleLo'>
                                <label clase='sideTitle'>Low Side</label>
                              </div>                            
                              <div id='equ1initialHiDiv' class='grid-sugarDetail-item initialHi'>
                                <input id='equ1initialHiInput' class='sugInitialHiInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '100'/>&nbsp;
                                <label id='equ1initialHiLabel'>High side initial amount per cell </label>
                              </div>
                              <div id='equ1initialLoDiv' class='grid-sugarDetail-item initialLo'>
                                <input id='equ1initialHiInput' class='sugInitialLoInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '90'/>&nbsp;
                                Low side initial amount per cell 
                              </div>
                              <div id='equ1inflowHiDiv' class='grid-sugarDetail-item inflowHi'>
                                <input id='equ1inflowHiInput' class='sugInflowHiInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '0.09'/>&nbsp;
                                <label id='equ1inflowHiLabel' class='sugOutflowLabel'>Inflow amount per cell</label>
                              </div>
                              <div id='equ1inflowLoDiv' class='grid-sugarDetail-item inflowLo'>
                                <input id='equ1inflowLoInput' class='sugInflowLoInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '0.01'/>&nbsp;
                                <label id='equ1inflowLoLabel' class='sugOutflowLabel'>Inflow amount per cell on low side</label>
                              </div>
                              <div id='equ1outflowHiDiv' class='grid-sugarDetail-item outflowHi'>
                                <input id='equ1outflowHiInput' class='sugOutflowHiInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '0.01'/>&nbsp;
                                <label id='equ1outflowHiLabel' class='sugOutflowLabel'>Outflow fraction per cell.</label>
                              </div>
                              <div id='equ1outflowLoDiv' class='grid-sugarDetail-item outflowLo'>
                                <input id='equ1outflowLoInput' class='sugOutflowLoInput' type='text' onchange='av.ptd.gridChange(this.value)' value = '0.01'/>&nbsp;
                                <label id='equ1outflowLoLabel' class='sugOutflowLabel'>Outflow fraction per cell on low side.</label>
                              </div>
                              <div id='equ1equalHiDiv' class='grid-sugarDetail-item equalHi'>
                                <label id='equ1equalHiLabel'>9</label>
                                <span id='equ1equalHiText'> = equilibrium when no resource has been consumed</span>
                              </div>
                              <div id='equ1equalLoDiv' class='grid-sugarDetail-item equalLo'>
                                <label id='equ1equalLoLabel'>1</label>
                                <span id='equ1equalLoText'> = equilibrium if not consumed</span>
                              </div>
                              <div id='equ1sideDiv' class='grid-sugarDetail-item sideInput'>
                                <select  id='equ1sideSelect' >
                                  <option value='left' selected>Left</option>
                                  <option value='right'>Right</option>
                                  <option value='top'>Top</option>
                                  <option value='bottom'>Bottom</option>
                                  <option value='center'>Center</option>
                                  <option value='edge'>Edge</option>
                                </select>
                                <label id='equ1sideLabel'>side text</label>
                              </div>
                            </div><span id='endEquDetails' class='end_grid-sugarDetail-container'></span>
                          </details>
