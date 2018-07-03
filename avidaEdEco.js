// need a server to run this. The one below works.
// python -m SimpleHTTPServer  in the folder with index.html to start a server for using pouchDB
// python -m SimpleHTTPServer 8001  to put on 8001 instead of 8000
// Then visit http://127.0.0.1:8000/avidaED.html
//
// Git commands used to push
// git add .
// git commit -m 'comment about the change being pushed'
// git commit    then use editor to make the comment.
// i to insert text in vim; escape to get out of insert mode
// :wq will write and then quit vim
// git push -u origin master
//
// Get hashtag of avida side to state which version of avida works with this version of av_ui
// git rev-parse HEAD
//
// Avida ___________________
//
// to thet the parse value go to the current version of avida folder and
// git rev-parse --short HEAD
//
// on 2017_0927 switched to using new avida files with parse number  = 88746e4
//
// Generic Notes _______________________________________________________________________________________________________
//
// [option]<alt>{go} to get library in the list for finder
//
// /var/www/vhosts/bwng/public_html/projects/
//
// to have chrome run from file
///Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
//
// to get to mac files on parallels
// net use z: \\Mac\Home
//
// Path in TX for Filezilla /var/www/vhosts/bwng/public_html/projects/Avida-ED
//
// for things on Darwin (dream weaver site)
// ssh -l diane darwin.beacon.msu.edu/html
// var/sites/Avida-ED.msu.edu
// emacs home.html
//
define.amd.jQuery = true;
require([
  'maqetta/space',
  'maqetta/AppStates',
  'dijit/dijit',
  'dijit/registry',
  'dijit/form/Button',
  'dijit/form/Select',
  'dijit/form/HorizontalSlider',
  'dijit/form/HorizontalRule',
  'dijit/form/HorizontalRuleLabels',
  'dijit/form/RadioButton',
  'dijit/form/NumberSpinner',
  'dijit/form/ComboButton',
  'dijit/form/DropDownButton',
  'dijit/form/ComboBox',
  'dijit/form/Textarea',
  'dijit/Dialog',
  'dijit/layout/BorderContainer',
  'dijit/layout/ContentPane',
  'dijit/MenuBar',
  'dijit/PopupMenuBarItem',
  'dijit/MenuItem',
  'dijit/Menu',
  'dijit/TitlePane',
  'dojo/parser',
  'dojo/_base/declare',
  'dojo/query',
  'dojo/NodeList-traverse',
  'dojo/dnd/Source',
  'dojo/dnd/Manager',
  'dojo/dnd/Selector',
  'dojo/dnd/Target',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/aspect',
  'dojo/on',
  'dojo/request/xhr',
  'dojo/ready',
  'jquery',
  'jquery-ui',
  //'lib/plotly-latest.min.js',
  'lib/plotly.js',
  //'lib/jquery.fileDownload.js',
  //'lib/Blob',
  'lib/jszip.min.js',
  'lib/FileSaver.js',
  //'avida-messages.js',
  
  //'messaging.js',
  //'fileDataRead.js',
  //'fileDataWrite.js',
  //'fileIO.js',

  //'populationGrid.js',
  //'organismView.js',
  //'dojoDnd.js',
  //'popControls.js',
  //'mouse.js',
  //'mouseDown.js',
  
  //'restartAvida.js',
  //'diagnosticconsole.js',
  'dojo/domReady!'
], function (space, AppStates, dijit, registry,
             Button, Select,
             HorizontalSlider, HorizontalRule, HorizontalRuleLabels, RadioButton, NumberSpinner, ComboButton,
             DropDownButton, ComboBox, Textarea,
             Dialog,
             BorderContainer, ContentPane, MenuBar, PopupMenuBarItem, MenuItem, Menu,
             TitlePane, parser, declare, query, nodelistTraverse,
             dndSource, dndManager, dndSelector, dndTarget, domGeometry, domStyle, dom, domConst,
             aspect, on, xhr,
             ready, $, jqueryui, Plotly, //fileDownload,  //Blob.js,
             JSZip, FileSaver) {
  'use strict';
  if (typeof $ != 'undefined') {
    // jQuery is loaded => print the version
    // console.log($.fn.jquery);
  } else {
    console.log('Jquery ($) is not defined.');
  }

  //console.log('dojo version', dojo.version.toString());
  parser.parse();

});
  /********************************************************************************************************************/
  // * The files at the end of the require list contain code specific to Avida-ED.
  // * The functions they contain can access the dom. They cannot access functions defined anywhere
  // * else in the project. This has resulted in some code split between AvidaED.js and the various
  // * other files.
  // *
  // * The files included in script tags in AvidaED.html cannot access the dom. They contain global
  // * variables and functions that are independent of the dom
  // *
  /********************************************************************************************************************/

//-----------------------------------------------------------------------------
//   Methods to do a collapsible list
//-----------------------------------------------------------------------------
/*
First implemented: https://codepen.io/huange/pen/pJqEMj?editors=1100
  this uses the checkbox input method and modifies it. 

Next implemented: https://stackoverflow.com/questions/24977965/collapsible-lists-using-html-and-css
  uses <details> and <summary> tags

  Examples that use javascript
  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion
  https://www.w3schools.com/howto/howto_js_accordion.asp
  


*/