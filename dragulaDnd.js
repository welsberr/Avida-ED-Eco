/**
 * Filename: dragulaDnd.js
 * Author: Yemi Shin
 * Description: Implementation of Raheem Clemon's Dragula proof of concept in AvidaED 4. 
 * Note: Change the legacy "Dojo-" tags later in HTMl, CSS, and JS
 *       // yemd is a tag for all the legacy code that is getting commented out in development
 */

// var av = av || {};  // consistent with the rest of js files

jQuery(document).ready(function($) {
  var containers = [$(".hi")[0], 
                    $.map($(".freezerContainer"), (value, key) => { return value }),  
                    $.map($("#testConfig"), (value, key) => { return value }),
                    $.map($("#activeConfig"), (value, key) => { return value }), 
                    $.map($("#trashCan"), (value, key) => { return value }), 
                    $.map($("#gridCanvas"), (value, key) => { return value }), 
                    $.map($("#ancestorBox"), (value, key) => { return value })].flat();
  console.log(containers);

  var hi = containers[0]
  var fzConfig = containers[1]
  var fzOrgan = containers[2]
  var fzWorld = containers[3]
  var fzTdish = containers[4]
  var testConfig = containers[5]
  var activeConfig = containers[6]
  var trashCan = containers[7]
  var gridCanvas = containers[8]
  var ancestorBox = containers[9]

  var dra = dragula(containers, {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      return true; // elements are always draggable by default
    },
    accepts: function (el, target, source, sibling) {
      return true; // elements can be dropped in any of the `containers` by default
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    copy: function (el, source) {
      //Makes sure the only item that will be copied instead of moved is in the FreezerMove div
      return el.parentElement.className === 'freezerContainer' || el.parentElement.className === 'hi';
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped                       
    copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: true,               // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });

  dra.on('drag', (el, source) => { 
    console.log("dragging");
  });

  // main function that determines the logic for drag and drop
  dra.on('drop', (el, target, source) => {

    if (el.parentElement !== null && (el.parentElement === trashCan || el.parentElement.id === "trashDiv")) {
      console.log("in trashcan");
      // console.log(target.id);
      // console.log(source.className);
      el.remove();
    }

    if (source === fzTdish && target === testConfig) {
      console.log("here");
      lndTestConfig(el, target);
    }

  });

  // yemi's implementation of av.dnd.lndTestConfig but locally
  lndTestConfig = (el, target) => {
    //$("#testConfig").empty();
    var domid = el.id;
  }

  /*
  Helpers For Touch Screens
  */

  controlMovement();

  function controlMovement(){
    // makes sure that 1 finger touch wont move the screen in the canvas
      $("#gridCnvsHldr").on('touchmove', function(e) {
          // screen wont move with one touch
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    // makes sure that 1 finger touch wont move the screen in any of the first 3 containers
    for (var i = 0; i < containers.length; i++) {
      containers[i].addEventListener('touchmove', function(e) {
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    }
  };
});
