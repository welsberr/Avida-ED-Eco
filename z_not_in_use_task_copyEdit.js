                        <div id="orn3subSection" class="sugarDishSubsection">
                          <div id="orn3regionName" class="grid-sugarDetail-item subSectionTitle">Whole Dish</div>
                          <div id="orn3supplyTypeSelectHolder" class="grid-sugarDetail-item typeInput">
                            <select id="orn3supplyType" class="sugarSupplyType" onchange="av.sgr.supplyChange(this);">
                              <option id="orn3none" value="None">None</option>
                              <option id="orn3Infinite" value="Infinite" selected="">Infinite</option>
                              <option id="orn3Finite" class="localFinite" value="Finite">Finite</option>
                              <option id="orn3Equilibrium" class="localEquilibrium" value="Equilibrium">Equilibrium</option>
                              <option id="orn3Debug" class="localDebug" value="Debug">All debug</option>
                            </select>&nbsp;&nbsp;&nbsp;
                          </div>
                          <div id="orn3periodCheckbox" class="grid-sugarDetail-item periodCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn3periodCheck" type="checkbox">Periodic&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn3gradientCheckbox" class="grid-sugarDetail-item gradientCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn3gradientCheck" type="checkbox">Gradient&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn3diffuseCheckbox" class="grid-sugarDetail-item diffuseCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn3diffuseCheck" type="checkbox">Diffusion&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn3hiSideSelectHolder" class="grid-sugarDetail-item sideInput">
                            <label><select id="orn3sideSelect">
                              <option value="left" selected="">Left</option>
                              <option value="right">Right</option>
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                              <option value="center">Center</option>
                              <option value="edge">Edge</option>
                            </select>
                              <span id="orn3sideText">side text to describe what side means</span></label>
                          </div>
                          <div id="orn3periodTime" class="grid-sugarDetail-item periodTime">
                            <label><input id="orn3periodInput" class="sugPeriodInput" type="text" onchange="av.sgr.periodChange(this);"> Period (updates)</label>
                          </div>
                          <div id="orn3sideHiText" class="grid-sugarDetail-item sideTitleHi">High Side</div>
                          <div id="orn3sideLoText" class="grid-sugarDetail-item sideTitleLo">Low Side</div>
                          <div id="orn3blank" class="grid-sugarDetail-item sgrBlank">&nbsp;&nbsp;&nbsp;&nbsp;</div>  

                          <div id="orn3initialHiDiv" class="grid-sugarDetail-item initialHi">
                            <label><input id="orn3initialHiInput" class="sugInitialHiInput" type="text" value="100" onchange="av.sgr.initialChange(this);">&nbsp;
                              <span id="orn3initialHiText">High side initial amount / cell </span></label>
                          </div>
                          <div id="orn3initialLoDiv" class="grid-sugarDetail-item initialLo">
                            <label><input id="orn3initialLoInput" class="sugInitialLoInput" type="text" value="100" onchange="av.sgr.initialChange(this);">&nbsp;
                              <span id="orn3initialLoText">Low side initial amount / cell</span></label>
                          </div>
                          <div id="orn3inflowHiDiv" class="grid-sugarDetail-item inflowHi">
                            <label><input id="orn3inflowHiInput" class="sugInflowHiInput" type="text" onchange="av.sgr.inflowChange(this);">&nbsp;
                              <span id="orn3inflowHiText" class="sugOutflowLabel">Inflow amount / cell</span></label>
                          </div>
                          <div id="orn3inflowLoDiv" class="grid-sugarDetail-item inflowLo">
                            <label><input id="orn3inflowLoInput" class="sugInflowLoInput" type="text" onchange="av.sgr.inflowChange(this);">&nbsp;
                            <span id="orn3inflowLoText" class="sugOutflowLabel">Inflow amount / cell on low side</span></label>
                          </div>
                          <div id="orn3outflowHiDiv" class="grid-sugarDetail-item outflowHi">
                            <label><input id="orn3outflowHiInput" class="sugOutflowHiInput" type="text" onchange="av.sgr.outflowChange(this);">&nbsp;
                            <span id="orn3outflowHiText" class="sugOutflowLabel">Outflow fraction / cell.</span></label>
                          </div>
                          <div id="orn3outflowLoDiv" class="grid-sugarDetail-item outflowLo">
                            <label><input id="orn3outflowLoInput" class="sugOutflowLoInput" type="text" onchange="av.sgr.outflowChange(this);">&nbsp;
                              <span id="orn3outflowLoText" class="sugOutflowLabel">Outflow fraction / cell on low side.</span></label>
                          </div>
                          <div id="orn3equalHiDiv" class="grid-sugarDetail-item equalHi">
                            <span id="orn3equalHiValue"></span>
                            <span id="orn3equalHiText"> = equilibrium when no resource has been consumed</span>
                          </div>
                          <div id="orn3equalLoDiv" class="grid-sugarDetail-item equalLo">
                            <span id="orn3equalLoValue"></span>
                            <span id="orn3equalLoText"> = equilibrium if not consumed</span>
                          </div>
                        </div><span id="orn3Section_end" class='displayNone'></span>


                        <div id="orn4subSection" class="sugarDishSubsection">
                          <div id="orn4regionName" class="grid-sugarDetail-item subSectionTitle">Whole Dish</div>
                          <div id="orn4supplyTypeSelectHolder" class="grid-sugarDetail-item typeInput">
                            <select id="orn4supplyType" class="sugarSupplyType" onchange="av.sgr.supplyChange(this);">
                              <option id="orn4none" value="None">None</option>
                              <option id="orn4Infinite" value="Infinite" selected="">Infinite</option>
                              <option id="orn4Finite" class="localFinite" value="Finite">Finite</option>
                              <option id="orn4Equilibrium" class="localEquilibrium" value="Equilibrium">Equilibrium</option>
                              <option id="orn4Debug" class="localDebug" value="Debug">All debug</option>
                            </select>&nbsp;&nbsp;&nbsp;
                          </div>
                          <div id="orn4periodCheckbox" class="grid-sugarDetail-item periodCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn4periodCheck" type="checkbox">Periodic&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn4gradientCheckbox" class="grid-sugarDetail-item gradientCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn4gradientCheck" type="checkbox">Gradient&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn4diffuseCheckbox" class="grid-sugarDetail-item diffuseCheckDiv" onchange="av.sgr.eachSugarCheckBoxChange(this);">
                            <label><input id="orn4diffuseCheck" type="checkbox">Diffusion&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn4hiSideSelectHolder" class="grid-sugarDetail-item sideInput">
                            <label><select id="orn4sideSelect">
                              <option value="left" selected="">Left</option>
                              <option value="right">Right</option>
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                              <option value="center">Center</option>
                              <option value="edge">Edge</option>
                            </select>
                              <span id="orn4sideText">side text to describe what side means</span></label>
                          </div>
                          <div id="orn4periodTime" class="grid-sugarDetail-item periodTime">
                            <label><input id="orn4periodInput" class="sugPeriodInput" type="text" onchange="av.sgr.periodChange(this);"> Period (updates)</label>
                          </div>
                          <div id="orn4sideHiText" class="grid-sugarDetail-item sideTitleHi">High Side</div>
                          <div id="orn4sideLoText" class="grid-sugarDetail-item sideTitleLo">Low Side</div>
                          <div id="orn4blank" class="grid-sugarDetail-item sgrBlank">&nbsp;&nbsp;&nbsp;&nbsp;</div>  

                          <div id="orn4initialHiDiv" class="grid-sugarDetail-item initialHi">
                            <label><input id="orn4initialHiInput" class="sugInitialHiInput" type="text" value="100" onchange="av.sgr.initialChange(this);">&nbsp;
                              <span id="orn4initialHiText">High side initial amount / cell </span></label>
                          </div>
                          <div id="orn4initialLoDiv" class="grid-sugarDetail-item initialLo">
                            <label><input id="orn4initialLoInput" class="sugInitialLoInput" type="text" value="100" onchange="av.sgr.initialChange(this);">&nbsp;
                              <span id="orn4initialLoText">Low side initial amount / cell</span></label>
                          </div>
                          <div id="orn4inflowHiDiv" class="grid-sugarDetail-item inflowHi">
                            <label><input id="orn4inflowHiInput" class="sugInflowHiInput" type="text" onchange="av.sgr.inflowChange(this);">&nbsp;
                              <span id="orn4inflowHiText" class="sugOutflowLabel">Inflow amount / cell</span></label>
                          </div>
                          <div id="orn4inflowLoDiv" class="grid-sugarDetail-item inflowLo">
                            <label><input id="orn4inflowLoInput" class="sugInflowLoInput" type="text" onchange="av.sgr.inflowChange(this);">&nbsp;
                            <span id="orn4inflowLoText" class="sugOutflowLabel">Inflow amount / cell on low side</span></label>
                          </div>
                          <div id="orn4outflowHiDiv" class="grid-sugarDetail-item outflowHi">
                            <label><input id="orn4outflowHiInput" class="sugOutflowHiInput" type="text" onchange="av.sgr.outflowChange(this);">&nbsp;
                            <span id="orn4outflowHiText" class="sugOutflowLabel">Outflow fraction / cell.</span></label>
                          </div>
                          <div id="orn4outflowLoDiv" class="grid-sugarDetail-item outflowLo">
                            <label><input id="orn4outflowLoInput" class="sugOutflowLoInput" type="text" onchange="av.sgr.outflowChange(this);">&nbsp;
                              <span id="orn4outflowLoText" class="sugOutflowLabel">Outflow fraction / cell on low side.</span></label>
                          </div>
                          <div id="orn4equalHiDiv" class="grid-sugarDetail-item equalHi">
                            <span id="orn4equalHiValue"></span>
                            <span id="orn4equalHiText"> = equilibrium when no resource has been consumed</span>
                          </div>
                          <div id="orn4equalLoDiv" class="grid-sugarDetail-item equalLo">
                            <span id="orn4equalLoValue"></span>
                            <span id="orn4equalLoText"> = equilibrium if not consumed</span>
                          </div>
                        </div><span id="orn4Section_end" class='displayNone'></span>
