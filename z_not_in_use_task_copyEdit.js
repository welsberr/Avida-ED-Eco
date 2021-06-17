av.dnd.lndAncestorBox = function (move) {
  'use strict';
  var added;
  //Do not copy parents if one is moved within Ancestor Box
  if ('ancestorBox' != move.source.node.id) {
    //av.post.addUser('DnD: ' + move.source.node.id + '--> ' + move.target.node.id + ': by: ' + move.nodeName);
    /*
    av.post.data = {
      'operation' : 'DojoDnd',
      'name' : 'av.dnd.lndAncestorBox',
      //'vars' : {'source' : 'av.dnd.fzOrgan', 'nodeDir': move.dir, 'target': 'av.dnd.ancestorBox'},
      'vars' : {'source' : move.source.node.id, 'nodeDir': move.dir, 'target': move.target.node.id, 'call': 'dnd.lndAncestorBox'},
      'assumptions' : {'nodeName': move.nodeName, 'via': move.via}
    };
    av.post.usrOut(av.post.data, 'in dojoDND.js line 467');
     */
    console.log('move=', move);
    
    //The rest of this is about updating data for parents and the automatic placement of that parent.
    //find genome by finding source
    //console.log('seq=', av.fzr.file[move.dir+'/genome.seq']);
    av.parents.genome.push(av.fzr.file[move.dir+'/genome.seq']);
    var nn = av.parents.name.length;
    av.parents.autoNdx.push(nn);
    av.parents.injected.push(false);
    var newName = av.dnd.nameParent(move.nodeName);
    document.getElementById(move.targetDomId).textContent = newName;
    av.parents.howPlaced.push('auto');
    av.parents.domid.push(move.targetDomId); //domid in ancestorBox used to remove if square in grid moved to trashcan
    //Find color of ancestor
    if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
    else { av.parents.color.push(av.color.defaultParentColor); }
    av.parents.placeAncestors();
    if (av.debug.dnd) console.log('parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
    return (true);
  }
  else return (false);
};

