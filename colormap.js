// one global to hold them all.
//http://stackoverflow.com/questions/5150124/splitting-a-javascript-namespace-into-multiple-files
var av = av || {};  //incase av already exists

//Definition of Viridis and other dictionaries or color data sets

// console.log('Root: before definition of av.color'); 
av.color = {};

av.color.defaultParentColor = 'rgb(200, 200, 200)';
av.color.defaultKidColor = 'rgb(130, 130, 130)';
//av.color.defaultKidColor = 'rgb(0, 130, 0)';

av.color.redCmap = [
   'rgb(255, 204, 204)'
 , 'rgb(255, 153, 153)'
 , 'rgb(255, 102, 102)'
 , 'rgb(255,  51,  51)'
 , 'rgb(255,   0,   0)'
 , 'rgb(204,   0,   0)'
 , 'rgb(153,   0,   0)'
 , 'rgb(102,   0,   0)'
 , 'rgb( 51,   0,   0)'
];

av.color.Gnuplot2cmap = [
/* 'rgb(0, 0, 0)'
, 'rgb(0, 0, 4)'
, 'rgb(0, 0, 8)'
, 'rgb(0, 0, 12)'
, 'rgb(0, 0, 16)'
, 'rgb(0, 0, 20)'
, 'rgb(0, 0, 24)'
, 'rgb(0, 0, 28)'
, 'rgb(0, 0, 32)'
, 'rgb(0, 0, 36)'
, 'rgb(0, 0, 40)'
, 'rgb(0, 0, 44)'
, 'rgb(0, 0, 48)'
, 'rgb(0, 0, 52)'
, 'rgb(0, 0, 56)'
, 'rgb(0, 0, 60)'
, 'rgb(0, 0, 64)'  //was the first point
, 'rgb(0, 0, 68)'
, 'rgb(0, 0, 72)'
, 'rgb(0, 0, 76)'
, 'rgb(0, 0, 80)'
, 'rgb(0, 0, 84)'
, 'rgb(0, 0, 88)'
, 'rgb(0, 0, 92)'
, 'rgb(0, 0, 96)'
, 'rgb(0, 0, 100)'   //try 4
, 'rgb(0, 0, 104)'
, 'rgb(0, 0, 108)'
, 'rgb(0, 0, 112)'
, 'rgb(0, 0, 116)'
, 'rgb(0, 0, 120)'   */ // try 5
 'rgb(0, 0, 124)'
, 'rgb(0, 0, 128)'
, 'rgb(0, 0, 132)'
, 'rgb(0, 0, 136)'    //try 3
, 'rgb(0, 0, 140)'
, 'rgb(0, 0, 144)'
, 'rgb(0, 0, 148)'
, 'rgb(0, 0, 152)'
, 'rgb(0, 0, 156)'
, 'rgb(0, 0, 160)'
, 'rgb(0, 0, 164)'
, 'rgb(0, 0, 168)'
, 'rgb(0, 0, 172)'
, 'rgb(0, 0, 176)'
, 'rgb(0, 0, 180)'
, 'rgb(0, 0, 184)'   //try two start
, 'rgb(0, 0, 188)'
, 'rgb(0, 0, 192)'
, 'rgb(0, 0, 196)'
, 'rgb(0, 0, 200)'
, 'rgb(0, 0, 204)'
, 'rgb(0, 0, 208)'
, 'rgb(0, 0, 212)'
, 'rgb(0, 0, 216)'
, 'rgb(0, 0, 220)'
, 'rgb(0, 0, 224)'
, 'rgb(0, 0, 228)'
, 'rgb(0, 0, 232)'
, 'rgb(0, 0, 236)'
, 'rgb(0, 0, 240)'
, 'rgb(0, 0, 244)'
, 'rgb(0, 0, 248)'
, 'rgb(0, 0, 252)'
, 'rgb(1, 0, 255)'
, 'rgb(4, 0, 255)'
, 'rgb(7, 0, 255)'
, 'rgb(10, 0, 255)'
, 'rgb(13, 0, 255)'
, 'rgb(16, 0, 255)'
, 'rgb(20, 0, 255)'
, 'rgb(23, 0, 255)'
, 'rgb(26, 0, 255)'
, 'rgb(29, 0, 255)'
, 'rgb(32, 0, 255)'
, 'rgb(35, 0, 255)'
, 'rgb(38, 0, 255)'
, 'rgb(41, 0, 255)'
, 'rgb(45, 0, 255)'
, 'rgb(48, 0, 255)'
, 'rgb(51, 0, 255)'
, 'rgb(54, 0, 255)'
, 'rgb(57, 0, 255)'
, 'rgb(60, 0, 255)'
, 'rgb(63, 0, 255)'
, 'rgb(66, 0, 255)'
, 'rgb(70, 0, 255)'
, 'rgb(73, 0, 255)'
, 'rgb(76, 0, 255)'
, 'rgb(79, 0, 255)'
, 'rgb(82, 0, 255)'
, 'rgb(85, 0, 255)'
, 'rgb(88, 0, 255)'
, 'rgb(91, 0, 255)'
, 'rgb(95, 0, 255)'
, 'rgb(98, 0, 255)'
, 'rgb(101, 0, 255)'
, 'rgb(104, 0, 255)'
, 'rgb(107, 0, 255)'
, 'rgb(110, 0, 255)'
, 'rgb(113, 0, 255)'
, 'rgb(116, 0, 255)'
, 'rgb(120, 0, 255)'
, 'rgb(123, 0, 255)'
, 'rgb(126, 0, 255)'
, 'rgb(129, 0, 255)'
, 'rgb(132, 0, 255)'
, 'rgb(135, 0, 255)'
, 'rgb(138, 2, 253)'
, 'rgb(141, 4, 251)'
, 'rgb(145, 6, 249)'
, 'rgb(148, 8, 247)'
, 'rgb(151, 10, 245)'
, 'rgb(154, 12, 243)'
, 'rgb(157, 14, 241)'
, 'rgb(160, 16, 239)'
, 'rgb(163, 18, 237)'
, 'rgb(166, 20, 235)'
, 'rgb(170, 22, 233)'
, 'rgb(173, 24, 231)'
, 'rgb(176, 26, 229)'
, 'rgb(179, 28, 227)'
, 'rgb(182, 30, 225)'
, 'rgb(185, 32, 223)'
, 'rgb(188, 34, 221)'
, 'rgb(191, 36, 219)'
, 'rgb(195, 38, 217)'
, 'rgb(198, 40, 215)'
, 'rgb(201, 42, 213)'
, 'rgb(204, 44, 211)'
, 'rgb(207, 46, 209)'
, 'rgb(210, 48, 207)'
, 'rgb(213, 50, 205)'
, 'rgb(216, 52, 203)'
, 'rgb(220, 54, 201)'
, 'rgb(223, 56, 199)'
, 'rgb(226, 58, 197)'
, 'rgb(229, 60, 195)'
, 'rgb(232, 62, 193)'
, 'rgb(235, 64, 191)'
, 'rgb(238, 66, 189)'
, 'rgb(241, 68, 187)'
, 'rgb(245, 70, 185)'
, 'rgb(248, 72, 183)'
, 'rgb(251, 74, 181)'
, 'rgb(254, 76, 179)'
, 'rgb(255, 78, 177)'
, 'rgb(255, 80, 175)'
, 'rgb(255, 82, 173)'
, 'rgb(255, 84, 171)'
, 'rgb(255, 86, 169)'
, 'rgb(255, 88, 167)'
, 'rgb(255, 90, 165)'
, 'rgb(255, 92, 163)'
, 'rgb(255, 94, 161)'
, 'rgb(255, 96, 159)'
, 'rgb(255, 98, 157)'
, 'rgb(255, 100, 155)'
, 'rgb(255, 102, 153)'
, 'rgb(255, 104, 151)'
, 'rgb(255, 106, 149)'
, 'rgb(255, 108, 147)'
, 'rgb(255, 110, 145)'
, 'rgb(255, 112, 143)'
, 'rgb(255, 114, 141)'
, 'rgb(255, 116, 139)'
, 'rgb(255, 118, 137)'
, 'rgb(255, 120, 135)'
, 'rgb(255, 122, 133)'
, 'rgb(255, 124, 131)'
, 'rgb(255, 126, 129)'
, 'rgb(255, 128, 127)'
, 'rgb(255, 130, 125)'
, 'rgb(255, 132, 123)'
, 'rgb(255, 134, 121)'
, 'rgb(255, 136, 119)'
, 'rgb(255, 138, 117)'
, 'rgb(255, 140, 115)'
, 'rgb(255, 142, 113)'
, 'rgb(255, 144, 111)'
, 'rgb(255, 146, 109)'
, 'rgb(255, 148, 107)'
, 'rgb(255, 150, 105)'
, 'rgb(255, 152, 103)'
, 'rgb(255, 154, 101)'
, 'rgb(255, 156, 99)'
, 'rgb(255, 158, 97)'
, 'rgb(255, 160, 95)'
, 'rgb(255, 162, 93)'
, 'rgb(255, 164, 91)'
, 'rgb(255, 166, 89)'
, 'rgb(255, 168, 87)'
, 'rgb(255, 170, 85)'
, 'rgb(255, 172, 83)'
, 'rgb(255, 174, 81)'
, 'rgb(255, 176, 79)'
, 'rgb(255, 178, 77)'
, 'rgb(255, 180, 75)'
, 'rgb(255, 182, 73)'
, 'rgb(255, 184, 71)'
, 'rgb(255, 186, 69)'
, 'rgb(255, 188, 67)'
, 'rgb(255, 190, 65)'
, 'rgb(255, 192, 63)'
, 'rgb(255, 194, 61)'
, 'rgb(255, 196, 59)'
, 'rgb(255, 198, 57)'
, 'rgb(255, 200, 55)'
, 'rgb(255, 202, 53)'
, 'rgb(255, 204, 51)'
, 'rgb(255, 206, 49)'
, 'rgb(255, 208, 47)'
, 'rgb(255, 210, 45)'
, 'rgb(255, 212, 43)'
, 'rgb(255, 214, 41)'
, 'rgb(255, 216, 39)'
, 'rgb(255, 218, 37)'
, 'rgb(255, 220, 35)'
, 'rgb(255, 222, 33)'
, 'rgb(255, 224, 31)'
, 'rgb(255, 226, 29)'
, 'rgb(255, 228, 27)'
, 'rgb(255, 230, 25)'
, 'rgb(255, 232, 23)'
, 'rgb(255, 234, 21)'
, 'rgb(255, 236, 19)'
, 'rgb(255, 238, 17)'
, 'rgb(255, 240, 15)'
, 'rgb(255, 242, 13)'
, 'rgb(255, 244, 11)'
, 'rgb(255, 246, 9)'
, 'rgb(255, 248, 7)'
, 'rgb(255, 250, 5)'
, 'rgb(255, 252, 3)'
, 'rgb(255, 254, 1)'
, 'rgb(255, 255, 5)'
, 'rgb(255, 255, 17)'
, 'rgb(255, 255, 30)'
, 'rgb(255, 255, 42)'
, 'rgb(255, 255, 55)'
, 'rgb(255, 255, 67)'
, 'rgb(255, 255, 80)'
, 'rgb(255, 255, 92)'
, 'rgb(255, 255, 105)'
, 'rgb(255, 255, 117)'
, 'rgb(255, 255, 130)'
, 'rgb(255, 255, 142)'
, 'rgb(255, 255, 155)'
, 'rgb(255, 255, 167)'
, 'rgb(255, 255, 180)'
, 'rgb(255, 255, 192)'
/*, 'rgb(255, 255, 205)'
, 'rgb(255, 255, 218)'
, 'rgb(255, 255, 230)'
, 'rgb(255, 255, 243)'
, 'rgb(255, 255, 255)' */
  ];

//Early list; not useing now
av.color.parentColorNames = [
  'A blue'    //1               website #7
  ,'B yellow'  //2            website #15 modified was 255, 255, 109
  ,'C medium blue green'// website #3
  ,'D pink'    //4              website #4
  ,'E brown'   //5             website #12 modified was 146, 73, 0
  ,'F lt pink' //6           used digital color meter to match #5 on website lt pink
  ,'G orange brown' //7      used digital color meter to match #5 on website;
  ,'H lavender'  //8          website #8
  ,'I red brown' //9         website #11 modified was 146,   0,   0
  ,'J dark blue-green' //10   website #2 modified was 0, 73, 73
  ,'K pale orange' //11       website #5 but does not look pink
  ,'L pale blue' //12         website #10
  ,'M dark yellow' //13       website #13 modified was 219, 209, 0
  ,'N lt blue'   //14           website #9
  ,'O purple' //15            website #6 modified was 73,   0, 146
  ,'P green' //16             website #14 modied was 36, 255,  36
  ,'Q magenta' //17
  ,'R pale yellow' //18
  ,'S red'  //19
  ,'T blue-green'  //20
  ,'U dark blue'  //21
  ,'V hot pink'  //22
  ,'W sky blue'  //23
  ,'X red-orange'  //24
  ,'Y dark grey'  //25
  ,'Z bright light blue'  //26
  ,'2 grey'   //27
];

    //http://www.color-blindness.com/coblis-color-blindness-simulator/
    //http://www.vischeck.com/vischeck/vischeckImage.php
    //http://www.somersault1824.com/tips-for-designing-scientific-figures-for-color-blind-readers/
av.color.parentColorList = [
    'rgb(  0, 109, 219)' //  1 blue              website #7   note that 1=black;
   ,'rgb(255, 109, 182)' //  2 pink              website #4
   ,'rgb(220, 190,   0)' // 18 dark yellow       website #13 modified was 219, 209, 0  looks like 4 to Tritanopia
   ,'rgb(  0,  93,  93)' //  4 dark blue-green   website #2 modified was 0, 73, 73

   ,'rgb(182, 219, 255)' //  5 pale blue         website #10
   ,'rgb( 93,  20, 166)' //  6 purple            website #6 modified was 73,   0, 146
   ,'#FEB6DB'            //  7 lt pink           used digital color meter to match #5 on website lt pink
   ,'rgb(156,  82,  10)' //  8 brown             website #12 modified was 146, 73, 0

   ,'rgb(182, 109, 255)' //  9 lavender           website #8
   ,'rgb(255, 182, 119)' // 10 pale orange       website #5 but does not look pink
   ,'rgb(156,  10,  10)' // 11 red brown         website #11 modified was 146,   0,   0
   ,'rgb(109, 182, 255)' // 12 lt blue           website #9

   ,'#DB6D00'            // 13 orange brown      used digital color meter to match #5 on website;
   ,'rgb(  0, 146, 146)' // 14 medium blue green website #3; looks like 7 to Tritanopia
   ,'#FFFF9B'            // 15 pale yellow
   ,'rgb(  0, 245, 255)' // 16 bright light blue

    ,'rgb(179,   0, 255)'  // 17 magenta
    ,'rgb(255, 255, 100)'  // 3  yellow            website #15 modified was 255, 255, 109
    ,'rgb(  0, 182, 158)'  // 19 blue-green
    ,'rgb(  0,   0, 186)'  // 20 dark blue
    ,'rgb(255,   0, 255)'  // 21 hot pink
    ,'rgb(  0, 138, 255)'  // 22 sky blue
    ,'rgb(255,  97,   0)'  // 23 red-orange
    ,'rgb(255,   0,  10)'  // 24 red
    ,'rgb(127, 127, 127)'  // 25 grey
    ,'rgb(187, 187, 187)'  // 26 dark grey
    ,'rgb(  0, 195,   0)'  // 27 green             website #14 modied was 36, 255,  36
    ,'rgb( 36, 255,  36)'  // 28 bright green      website #14
];

av.color.chipColors = av.color.parentColorList.slice();

av.color.names =  {};
    av.color.names['Red'] = 'rgb(156,  10,  10)';     //'#FF0000'; using one that is more color blind friendly
    av.color.names['Green'] = 'rgb(  0,  93,  93)';   //'#00FF00'; using one that is more color blind friendly
    av.color.names['Blue'] = 'rgb(  0, 109, 219)';    //'#0000FF'; using one that is more color blind friendly
    av.color.names['Yellow'] = 'rgb(220, 190,   0)';  //'#FFFF00'; using one that is more color blind friendly
    av.color.names['Purple'] = 'rgb( 93,  20, 166)';  //'#8800FF'; using one that is more color blind friendly
    av.color.names['Orange'] = '#DB6D00';             //'#FFAA00'; used digital color meter to get color blind friendly
    av.color.names['Pink'] = 'rgb(255, 109, 182)';    //using one that is more color blind friendly
    av.color.names['LtGreen'] = 'rgb( 0,  195,   0)'; //using one that is more color blind friendly
    av.color.names['Magenta'] = '#FF00FF';
    av.color.names['Cyan'] = '#00FFFF';
    av.color.names['Black'] = '#000000';
    av.color.names['ltGrey'] = '#CCCCCC';
    av.color.names['White'] = '#FFFFFF';
 
    //Dictionarys
av.color.letterColor = {};
    av.color.letterColor['a'] = '#F9CC65'; //color Meter
    av.color.letterColor['b'] = '#EFC461'; //color Meter
    av.color.letterColor['c'] = '#E5BC5D'; //color Meter
    av.color.letterColor['d'] = '#59FF71'; //color Meter
    av.color.letterColor['e'] = '#55FF6D'; //color Meter
    av.color.letterColor['f'] = '#52F768'; //color Meter
    av.color.letterColor['g'] = '#BBFF5C'; //color Meter
    av.color.letterColor['h'] = '#B4FF59'; //color Meter
    av.color.letterColor['i'] = '#ACF655'; //color Meter
    av.color.letterColor['j'] = '#A5EC51'; //color Meter
    av.color.letterColor['k'] = '#6EFFEB'; //color Meter
    av.color.letterColor['l'] = '#69FAE2'; //color Meter
    av.color.letterColor['m'] = '#65F0D8'; //color Meter
    av.color.letterColor['n'] = '#61E5CF'; //color Meter
    av.color.letterColor['o'] = '#7B8FFF'; //color Meter
    av.color.letterColor['p'] = '#7B8FFF'; //color Meter
    av.color.letterColor['q'] = '#7084EA'; //color Meter
    av.color.letterColor['r'] = '#6C7EE1'; //color Meter
    av.color.letterColor['s'] = '#5CDBC5'; //color Meter
    av.color.letterColor['t'] = '#58D1BC'; //color Meter
    av.color.letterColor['u'] = '#53C6B3'; //color Meter
    av.color.letterColor['v'] = '#FF26EE'; //color Meter
    av.color.letterColor['x'] = '#ED24DB'; //color Meter
    av.color.letterColor['w'] = '#F725E5'; //color Meter
    av.color.letterColor['y'] = '#AE2CFF'; //color Meter
    av.color.letterColor['z'] = '#9DE14E'; //color Meter

av.color.orgColorCodes = {};
    av.color.orgColorCodes['mutate_old'] = '#00FF00'; //color Meter green
    av.color.orgColorCodes['mutate'] = '#000000'; //color black
    av.color.orgColorCodes['start'] = '#5300FF'; //color Meter blue - I don't think this is used.
    //av.color.orgColorCodes['headFill_old'] = '#777777'; //color Meter grey
    //av.color.orgColorCodes['headFill'] = '#AAAAAA'; //lighter grey
    av.color.orgColorCodes['headFill'] = '#DDDDDD'; //off white
    av.color.orgColorCodes['WRITE'] = '#FA0022'; //color Meter  red
    av.color.orgColorCodes['READ'] = '#5300FF'; //color Meter  blue
    av.color.orgColorCodes['FLOW'] = '#006400'; //color Meter  green  #1b991c
    av.color.orgColorCodes['IP'] = '#000000'; //color Meter  black
    av.color.orgColorCodes['outline'] = '#666666'; //grey
    av.color.orgColorCodes['0'] = '#BBBBFF'; //lt blue
    av.color.orgColorCodes['1'] = '#F5FF00'; //color Meter yellow
    
av.color.headCodes = {};
    av.color.headCodes['READ'] = 'R';
    av.color.headCodes['WRITE'] = 'W';
    av.color.headCodes['FLOW'] = 'F';
    av.color.headCodes['IP'] = 'I';
    
av.color.InstDescribe = {};
    av.color.InstDescribe['a']='nop-A is a no-operation instruction, and will not do anything when executed. It can, however, modify the behavior of the instruction preceding it (by changing the CPU component that it affects; see also nop-register notation and nop-head notation) or act as part of a template to denote positions in the genome.';
    av.color.InstDescribe['b']='nop-B is a no-operation instruction, and will not do anything when executed. It can, however, modify the behavior of the instruction preceding it (by changing the CPU component that it affects; see also nop-register notation and nop-head notation) or act as part of a template to denote positions in the genome.';
    av.color.InstDescribe['c']='nop-C is a no-operation instruction, and will not do anything when executed. It can, however, modify the behavior of the instruction preceding it (by changing the CPU component that it affects; see also nop-register notation and nop-head notation) or act as part of a template to denote positions in the genome.';
    av.color.InstDescribe['d']='if-n-equ: This instruction compares the BX register to its complement. If they are not equal, the next instruction (after a modifying no-operation instruction, if one is present) is executed. If they are equal, that next instruction is skipped.';
    av.color.InstDescribe['e']='if-less: This instruction compares the BX register to its complement. If BX is the lesser of the pair, the next instruction (after a modifying no-operation instruction, if one is present) is executed. If it is greater or equal, then that next instruction is skipped.';
    av.color.InstDescribe['f']='if-label: This instruction reads in the template that follows it, and tests if its complement template was the most recent series of instructions copied. If so, it executed the next instruction, otherwise it skips it. This instruction is commonly used for an organism to determine when it has finished producing its offspring.';
    av.color.InstDescribe['g']='mov-head: This instruction will cause the IP to jump to the position in memory of the flow-head.';
    av.color.InstDescribe['h']="jmp-head: This instruction will read in the value of the CX register, and the move the IP by that fixed amount through the organism's memory.";
    av.color.InstDescribe['i']='get-head: This instruction will copy the position of the IP into the CX register.';
    av.color.InstDescribe['j']='set-flow: This instruction moves the flow-head to the memory position denoted in the CX register.';
    av.color.InstDescribe['k']='shift-r: This instruction reads in the contents of the BX register, and shifts all of the bits in that register to the right by one. In effect, it divides the value stored in the register by two, rounding down.';
    av.color.InstDescribe['l']='shift-l: This instruction reads in the contents of the BX register, and shifts all of the bits in that register to the left by one, placing a zero as the new rightmost bit, and truncating any bits beyond the 32 maximum. For values that require fewer than 32 bits, it effectively multiplies that value by two.';
    av.color.InstDescribe['m']='inc: This instruction reads in the content of the BX register and increments it by one.';
    av.color.InstDescribe['n']='dec: This instruction reads in the content of the BX register and decrements it by one.';
    av.color.InstDescribe['o']='push: This instruction reads in the contents of the BX register, and places it as a new entry at the top of the active stack. The BX register itself remains unchanged.';
    av.color.InstDescribe['p']='pop: This instruction removes the top element from the active stack, and places it into the BX register.';
    av.color.InstDescribe['q']='swap-stk: This instruction toggles the active stack in the CPU. All other instructions that use a stack will always use the active one.';
    av.color.InstDescribe['r']='swap: This instruction swaps the contents of the BX register with its complement.';
    av.color.InstDescribe['s']='add: This instruction reads in the contents of the BX and CX registers and sums them together. The result of this operation is then placed in the BX register.';
    av.color.InstDescribe['t']='sub: This instruction reads in the contents of the BX and CX registers and subtracts CX from BX (respectively). The result of this operation is then placed in the BX register.';
    av.color.InstDescribe['u']='nand: This instruction reads in the contents of the BX and CX registers (each of which are 32-bit numbers) and performs a bitwise nand operation on them. The result of this operation is placed in the BX register. Note that this is the only logic operation provided in the basic avida instruction set.';
    av.color.InstDescribe['v']="h-copy: This instruction reads the contents of the organism's memory at the position of the read-head, and copy that to the position of the write-head. If a non-zero copy mutation rate is set, a test will be made based on this probability to determine if a mutation occurs. If so, a random instruction (chosen from the full set with equal probability) will be placed at the write-head instead.";
    av.color.InstDescribe['w']='h-alloc: This instruction allocates additional memory for the organism up to the maximum it is allowed to use for its offspring.';
    av.color.InstDescribe['x']="h-divide: This instruction is used for an organism to divide off a finished offspring. The original organism keeps the state of its memory up until the read-head. The offspring's memory is initialized to everything between the read-head and the write-head. All memory past the write-head is removed entirely.";
    av.color.InstDescribe['y']='IO: This is the input/output instruction. It takes the contents of the BX register and outputs it, checking it for any tasks that may have been performed. It will then place a new input into BX.';
    av.color.InstDescribe['z']='h-search: This instruction will read in the template the follows it, and find the location of a complement template in the code. The BX register will be set to the distance to the complement from the current position of the instruction-pointer, and the CX register will be set to the size of the template. The flow-head will also be placed at the beginning of the complement template. If no template follows, both BX and CX will be set to zero, and the flow-head will be placed on the instruction immediately following the h-search.';

// -------------------------------------------------------- Not in use -------------------------------------------------
av.color.notNuse = {};

av.color.notNuse.Viridis12 = [
  'rgb( 72,  31, 112)' //1
  ,'rgb(200, 224,  32)' //b
  ,'rgb( 32, 164, 134)' //7
  ,'rgb( 59,  82, 139)' //3
  ,'rgb( 92, 200,  99)' //9
  ,'rgb( 40, 124, 142)' //5
  ,'rgb(253, 231,  37)' //c
  ,'rgb( 53, 183, 121)' //8
  ,'rgb( 68,  58, 131)' //2
  ,'rgb( 33, 145, 140)' //6
  ,'rgb(144, 215,  67)' //a
  ,'rgb( 49, 104, 142)' //b
];

av.color.notNuse.OriginalCubehelixCmap = [
  'rgb(2, 1, 2)'
  , 'rgb(3, 1, 3)'
  , 'rgb(5, 2, 5)'
  , 'rgb(7, 2, 6)'
  , 'rgb(8, 3, 8)'
  , 'rgb(10, 3, 10)'
  , 'rgb(11, 4, 12)'
  , 'rgb(12, 5, 14)'
  , 'rgb(14, 5, 15)'
  , 'rgb(15, 6, 17)'
  , 'rgb(16, 7, 19)'
  , 'rgb(17, 8, 21)'
  , 'rgb(18, 8, 23)'
  , 'rgb(19, 9, 25)'
  , 'rgb(20, 10, 27)'
  , 'rgb(21, 11, 29)'
  , 'rgb(22, 12, 31)'
  , 'rgb(22, 13, 33)'
  , 'rgb(23, 14, 35)'
  , 'rgb(24, 15, 37)'
  , 'rgb(24, 16, 39)'
  , 'rgb(25, 17, 41)'
  , 'rgb(25, 18, 43)'
  , 'rgb(25, 19, 45)'
  , 'rgb(26, 20, 47)'
  , 'rgb(26, 22, 49)'
  , 'rgb(26, 23, 51)'
  , 'rgb(26, 24, 53)'
  , 'rgb(27, 26, 54)'
  , 'rgb(27, 27, 56)'
  , 'rgb(27, 28, 58)'
  , 'rgb(27, 30, 59)'
  , 'rgb(27, 31, 61)'
  , 'rgb(26, 33, 62)'
  , 'rgb(26, 34, 64)'
  , 'rgb(26, 36, 65)'
  , 'rgb(26, 37, 67)'
  , 'rgb(26, 39, 68)'
  , 'rgb(25, 40, 69)'
  , 'rgb(25, 42, 70)'
  , 'rgb(25, 44, 71)'
  , 'rgb(25, 45, 72)'
  , 'rgb(24, 47, 73)'
  , 'rgb(24, 49, 74)'
  , 'rgb(24, 50, 75)'
  , 'rgb(23, 52, 76)'
  , 'rgb(23, 54, 76)'
  , 'rgb(23, 55, 77)'
  , 'rgb(22, 57, 77)'
  , 'rgb(22, 59, 78)'
  , 'rgb(22, 61, 78)'
  , 'rgb(22, 63, 78)'
  , 'rgb(22, 64, 78)'
  , 'rgb(21, 66, 78)'
  , 'rgb(21, 68, 79)'
  , 'rgb(21, 70, 78)'
  , 'rgb(21, 71, 78)'
  , 'rgb(21, 73, 78)'
  , 'rgb(21, 75, 78)'
  , 'rgb(21, 77, 78)'
  , 'rgb(21, 78, 77)'
  , 'rgb(21, 80, 77)'
  , 'rgb(21, 82, 76)'
  , 'rgb(22, 83, 76)'
  , 'rgb(22, 85, 75)'
  , 'rgb(22, 87, 75)'
  , 'rgb(23, 88, 74)'
  , 'rgb(23, 90, 73)'
  , 'rgb(24, 91, 72)'
  , 'rgb(25, 93, 72)'
  , 'rgb(25, 94, 71)'
  , 'rgb(26, 96, 70)'
  , 'rgb(27, 97, 69)'
  , 'rgb(28, 99, 68)'
  , 'rgb(29, 100, 67)'
  , 'rgb(30, 101, 66)'
  , 'rgb(31, 103, 65)'
  , 'rgb(32, 104, 64)'
  , 'rgb(34, 105, 63)'
  , 'rgb(35, 106, 62)'
  , 'rgb(37, 107, 61)'
  , 'rgb(38, 108, 60)'
  , 'rgb(40, 109, 59)'
  , 'rgb(42, 110, 58)'
  , 'rgb(43, 111, 57)'
  , 'rgb(45, 112, 56)'
  , 'rgb(47, 113, 55)'
  , 'rgb(49, 114, 54)'
  , 'rgb(51, 115, 53)'
  , 'rgb(53, 116, 53)'
  , 'rgb(56, 116, 52)'
  , 'rgb(58, 117, 51)'
  , 'rgb(60, 118, 50)'
  , 'rgb(63, 118, 50)'
  , 'rgb(65, 119, 49)'
  , 'rgb(68, 119, 49)'
  , 'rgb(70, 120, 48)'
  , 'rgb(73, 120, 48)'
  , 'rgb(76, 121, 47)'
  , 'rgb(78, 121, 47)'
  , 'rgb(81, 121, 47)'
  , 'rgb(84, 121, 47)'
  , 'rgb(87, 122, 47)'
  , 'rgb(90, 122, 47)'
  , 'rgb(93, 122, 47)'
  , 'rgb(96, 122, 47)'
  , 'rgb(99, 122, 47)'
  , 'rgb(102, 122, 48)'
  , 'rgb(105, 123, 48)'
  , 'rgb(108, 123, 49)'
  , 'rgb(111, 123, 49)'
  , 'rgb(114, 123, 50)'
  , 'rgb(117, 123, 51)'
  , 'rgb(120, 123, 52)'
  , 'rgb(123, 122, 53)'
  , 'rgb(126, 122, 54)'
  , 'rgb(129, 122, 55)'
  , 'rgb(132, 122, 56)'
  , 'rgb(135, 122, 58)'
  , 'rgb(138, 122, 59)'
  , 'rgb(141, 122, 61)'
  , 'rgb(144, 122, 62)'
  , 'rgb(147, 122, 64)'
  , 'rgb(150, 122, 66)'
  , 'rgb(153, 121, 68)'
  , 'rgb(156, 121, 70)'
  , 'rgb(159, 121, 72)'
  , 'rgb(161, 121, 74)'
  , 'rgb(164, 121, 76)'
  , 'rgb(167, 121, 79)'
  , 'rgb(169, 121, 81)'
  , 'rgb(172, 121, 84)'
  , 'rgb(174, 121, 86)'
  , 'rgb(177, 121, 89)'
  , 'rgb(179, 121, 91)'
  , 'rgb(181, 121, 94)'
  , 'rgb(183, 121, 97)'
  , 'rgb(185, 121, 100)'
  , 'rgb(188, 121, 103)'
  , 'rgb(190, 121, 106)'
  , 'rgb(191, 121, 109)'
  , 'rgb(193, 122, 112)'
  , 'rgb(195, 122, 115)'
  , 'rgb(197, 122, 118)'
  , 'rgb(198, 122, 121)'
  , 'rgb(200, 123, 124)'
  , 'rgb(201, 123, 127)'
  , 'rgb(202, 124, 131)'
  , 'rgb(204, 124, 134)'
  , 'rgb(205, 125, 137)'
  , 'rgb(206, 125, 140)'
  , 'rgb(207, 126, 143)'
  , 'rgb(208, 126, 147)'
  , 'rgb(209, 127, 150)'
  , 'rgb(209, 128, 153)'
  , 'rgb(210, 128, 156)'
  , 'rgb(211, 129, 160)'
  , 'rgb(211, 130, 163)'
  , 'rgb(211, 131, 166)'
  , 'rgb(212, 132, 169)'
  , 'rgb(212, 133, 172)'
  , 'rgb(212, 134, 175)'
  , 'rgb(212, 135, 178)'
  , 'rgb(213, 136, 181)'
  , 'rgb(213, 137, 184)'
  , 'rgb(212, 138, 187)'
  , 'rgb(212, 140, 190)'
  , 'rgb(212, 141, 193)'
  , 'rgb(212, 142, 195)'
  , 'rgb(212, 144, 198)'
  , 'rgb(211, 145, 201)'
  , 'rgb(211, 146, 203)'
  , 'rgb(210, 148, 206)'
  , 'rgb(210, 149, 208)'
  , 'rgb(210, 151, 210)'
  , 'rgb(209, 152, 212)'
  , 'rgb(208, 154, 215)'
  , 'rgb(208, 156, 217)'
  , 'rgb(207, 157, 219)'
  , 'rgb(207, 159, 221)'
  , 'rgb(206, 161, 223)'
  , 'rgb(205, 162, 224)'
  , 'rgb(204, 164, 226)'
  , 'rgb(204, 166, 228)'
  , 'rgb(203, 168, 229)'
  , 'rgb(202, 169, 231)'
  , 'rgb(202, 171, 232)'
  , 'rgb(201, 173, 233)'
  , 'rgb(200, 175, 234)'
  , 'rgb(200, 177, 236)'
  , 'rgb(199, 178, 237)'
  , 'rgb(198, 180, 238)'
  , 'rgb(198, 182, 238)'
  , 'rgb(197, 184, 239)'
  , 'rgb(197, 186, 240)'
  , 'rgb(196, 188, 241)'
  , 'rgb(196, 189, 241)'
  , 'rgb(195, 191, 242)'
  , 'rgb(195, 193, 242)'
  , 'rgb(194, 195, 242)'
  , 'rgb(194, 197, 243)'
  , 'rgb(194, 198, 243)'
  , 'rgb(194, 200, 243)'
  , 'rgb(193, 202, 243)'
  , 'rgb(193, 204, 243)'
  , 'rgb(193, 205, 243)'
  , 'rgb(193, 207, 243)'
  , 'rgb(193, 209, 243)'
  , 'rgb(194, 210, 243)'
  , 'rgb(194, 212, 243)'
  , 'rgb(194, 214, 243)'
  , 'rgb(194, 215, 243)'
  , 'rgb(195, 217, 243)'
  , 'rgb(195, 218, 242)'
  , 'rgb(196, 220, 242)'
  , 'rgb(196, 221, 242)'
  , 'rgb(197, 223, 242)'
  , 'rgb(198, 224, 241)'
  , 'rgb(198, 225, 241)'
  , 'rgb(199, 227, 241)'
  , 'rgb(200, 228, 240)'
  , 'rgb(201, 229, 240)'
  , 'rgb(202, 231, 240)'
  , 'rgb(203, 232, 240)'
  , 'rgb(204, 233, 239)'
  , 'rgb(205, 234, 239)'
  , 'rgb(207, 235, 239)'
  , 'rgb(208, 236, 239)'
  , 'rgb(209, 237, 239)'
  , 'rgb(211, 238, 239)'
  , 'rgb(212, 239, 239)'
  , 'rgb(214, 240, 239)'
  , 'rgb(215, 241, 239)'
  , 'rgb(217, 242, 239)'
  , 'rgb(219, 243, 239)'
  , 'rgb(220, 243, 239)'
  , 'rgb(222, 244, 239)'
  , 'rgb(224, 245, 240)'
  , 'rgb(226, 246, 240)'
  , 'rgb(227, 246, 240)'
  , 'rgb(229, 247, 241)'
  , 'rgb(231, 248, 241)'
  , 'rgb(233, 248, 242)'
  , 'rgb(235, 249, 243)'
  , 'rgb(237, 250, 244)'
  , 'rgb(239, 250, 244)'
  , 'rgb(240, 251, 245)'
  , 'rgb(242, 251, 246)'
  , 'rgb(244, 252, 247)'
  , 'rgb(246, 252, 248)'
  , 'rgb(248, 253, 250)'
  , 'rgb(250, 253, 251)'
  , 'rgb(251, 254, 252)'
  , 'rgb(253, 254, 254)'
  , 'rgb(255, 255, 255)'
];

// color maps no longer in use
av.color.ViridisCmap = [
//   'rgb(34, 1, 42)'
   'rgb(68, 1, 84)'
   ,'rgb(68, 2, 86)'
   ,'rgb(69, 4, 87)'
   ,'rgb(69, 5, 89)'
   ,'rgb(70, 7, 90)'
   ,'rgb(70, 8, 92)'
   ,'rgb(70, 10, 93)'
   ,'rgb(70, 11, 94)'
   ,'rgb(71, 13, 96)'
   ,'rgb(71, 14, 97)'
   ,'rgb(71, 16, 99)'
   ,'rgb(71, 17, 100)'
   ,'rgb(71, 19, 101)'
   ,'rgb(72, 20, 103)'
   ,'rgb(72, 22, 104)'
   ,'rgb(72, 23, 105)'
   ,'rgb(72, 24, 106)'
   ,'rgb(72, 26, 108)'
   ,'rgb(72, 27, 109)'
   ,'rgb(72, 28, 110)'
   ,'rgb(72, 29, 111)'
   ,'rgb(72, 31, 112)'
   ,'rgb(72, 32, 113)'
   ,'rgb(72, 33, 115)'
   ,'rgb(72, 35, 116)'
   ,'rgb(72, 36, 117)'
   ,'rgb(72, 37, 118)'
   ,'rgb(72, 38, 119)'
   ,'rgb(72, 40, 120)'
   ,'rgb(72, 41, 121)'
   ,'rgb(71, 42, 122)'
   ,'rgb(71, 44, 122)'
   ,'rgb(71, 45, 123)'
   ,'rgb(71, 46, 124)'
   ,'rgb(71, 47, 125)'
   ,'rgb(70, 48, 126)'
   ,'rgb(70, 50, 126)'
   ,'rgb(70, 51, 127)'
   ,'rgb(70, 52, 128)'
   ,'rgb(69, 53, 129)'
   ,'rgb(69, 55, 129)'
   ,'rgb(69, 56, 130)'
   ,'rgb(68, 57, 131)'
   ,'rgb(68, 58, 131)'
   ,'rgb(68, 59, 132)'
   ,'rgb(67, 61, 132)'
   ,'rgb(67, 62, 133)'
   ,'rgb(66, 63, 133)'
   ,'rgb(66, 64, 134)'
   ,'rgb(66, 65, 134)'
   ,'rgb(65, 66, 135)'
   ,'rgb(65, 68, 135)'
   ,'rgb(64, 69, 136)'
   ,'rgb(64, 70, 136)'
   ,'rgb(63, 71, 136)'
   ,'rgb(63, 72, 137)'
   ,'rgb(62, 73, 137)'
   ,'rgb(62, 74, 137)'
   ,'rgb(62, 76, 138)'
   ,'rgb(61, 77, 138)'
   ,'rgb(61, 78, 138)'
   ,'rgb(60, 79, 138)'
   ,'rgb(60, 80, 139)'
   ,'rgb(59, 81, 139)'
   ,'rgb(59, 82, 139)'
   ,'rgb(58, 83, 139)'
   ,'rgb(58, 84, 140)'
   ,'rgb(57, 85, 140)'
   ,'rgb(57, 86, 140)'
   ,'rgb(56, 88, 140)'
   ,'rgb(56, 89, 140)'
   ,'rgb(55, 90, 140)'
   ,'rgb(55, 91, 141)'
   ,'rgb(54, 92, 141)'
   ,'rgb(54, 93, 141)'
   ,'rgb(53, 94, 141)'
   ,'rgb(53, 95, 141)'
   ,'rgb(52, 96, 141)'
   ,'rgb(52, 97, 141)'
   ,'rgb(51, 98, 141)'
   ,'rgb(51, 99, 141)'
   ,'rgb(50, 100, 142)'
   ,'rgb(50, 101, 142)'
   ,'rgb(49, 102, 142)'
   ,'rgb(49, 103, 142)'
   ,'rgb(49, 104, 142)'
   ,'rgb(48, 105, 142)'
   ,'rgb(48, 106, 142)'
   ,'rgb(47, 107, 142)'
   ,'rgb(47, 108, 142)'
   ,'rgb(46, 109, 142)'
   ,'rgb(46, 110, 142)'
   ,'rgb(46, 111, 142)'
   ,'rgb(45, 112, 142)'
   ,'rgb(45, 113, 142)'
   ,'rgb(44, 113, 142)'
   ,'rgb(44, 114, 142)'
   ,'rgb(44, 115, 142)'
   ,'rgb(43, 116, 142)'
   ,'rgb(43, 117, 142)'
   ,'rgb(42, 118, 142)'
   ,'rgb(42, 119, 142)'
   ,'rgb(42, 120, 142)'
   ,'rgb(41, 121, 142)'
   ,'rgb(41, 122, 142)'
   ,'rgb(41, 123, 142)'
   ,'rgb(40, 124, 142)'
   ,'rgb(40, 125, 142)'
   ,'rgb(39, 126, 142)'
   ,'rgb(39, 127, 142)'
   ,'rgb(39, 128, 142)'
   ,'rgb(38, 129, 142)'
   ,'rgb(38, 130, 142)'
   ,'rgb(38, 130, 142)'
   ,'rgb(37, 131, 142)'
   ,'rgb(37, 132, 142)'
   ,'rgb(37, 133, 142)'
   ,'rgb(36, 134, 142)'
   ,'rgb(36, 135, 142)'
   ,'rgb(35, 136, 142)'
   ,'rgb(35, 137, 142)'
   ,'rgb(35, 138, 141)'
   ,'rgb(34, 139, 141)'
   ,'rgb(34, 140, 141)'
   ,'rgb(34, 141, 141)'
   ,'rgb(33, 142, 141)'
   ,'rgb(33, 143, 141)'
   ,'rgb(33, 144, 141)'
   ,'rgb(33, 145, 140)'
   ,'rgb(32, 146, 140)'
   ,'rgb(32, 146, 140)'
   ,'rgb(32, 147, 140)'
   ,'rgb(31, 148, 140)'
   ,'rgb(31, 149, 139)'
   ,'rgb(31, 150, 139)'
   ,'rgb(31, 151, 139)'
   ,'rgb(31, 152, 139)'
   ,'rgb(31, 153, 138)'
   ,'rgb(31, 154, 138)'
   ,'rgb(30, 155, 138)'
   ,'rgb(30, 156, 137)'
   ,'rgb(30, 157, 137)'
   ,'rgb(31, 158, 137)'
   ,'rgb(31, 159, 136)'
   ,'rgb(31, 160, 136)'
   ,'rgb(31, 161, 136)'
   ,'rgb(31, 161, 135)'
   ,'rgb(31, 162, 135)'
   ,'rgb(32, 163, 134)'
   ,'rgb(32, 164, 134)'
   ,'rgb(33, 165, 133)'
   ,'rgb(33, 166, 133)'
   ,'rgb(34, 167, 133)'
   ,'rgb(34, 168, 132)'
   ,'rgb(35, 169, 131)'
   ,'rgb(36, 170, 131)'
   ,'rgb(37, 171, 130)'
   ,'rgb(37, 172, 130)'
   ,'rgb(38, 173, 129)'
   ,'rgb(39, 173, 129)'
   ,'rgb(40, 174, 128)'
   ,'rgb(41, 175, 127)'
   ,'rgb(42, 176, 127)'
   ,'rgb(44, 177, 126)'
   ,'rgb(45, 178, 125)'
   ,'rgb(46, 179, 124)'
   ,'rgb(47, 180, 124)'
   ,'rgb(49, 181, 123)'
   ,'rgb(50, 182, 122)'
   ,'rgb(52, 182, 121)'
   ,'rgb(53, 183, 121)'
   ,'rgb(55, 184, 120)'
   ,'rgb(56, 185, 119)'
   ,'rgb(58, 186, 118)'
   ,'rgb(59, 187, 117)'
   ,'rgb(61, 188, 116)'
   ,'rgb(63, 188, 115)'
   ,'rgb(64, 189, 114)'
   ,'rgb(66, 190, 113)'
   ,'rgb(68, 191, 112)'
   ,'rgb(70, 192, 111)'
   ,'rgb(72, 193, 110)'
   ,'rgb(74, 193, 109)'
   ,'rgb(76, 194, 108)'
   ,'rgb(78, 195, 107)'
   ,'rgb(80, 196, 106)'
   ,'rgb(82, 197, 105)'
   ,'rgb(84, 197, 104)'
   ,'rgb(86, 198, 103)'
   ,'rgb(88, 199, 101)'
   ,'rgb(90, 200, 100)'
   ,'rgb(92, 200, 99)'
   ,'rgb(94, 201, 98)'
   ,'rgb(96, 202, 96)'
   ,'rgb(99, 203, 95)'
   ,'rgb(101, 203, 94)'
   ,'rgb(103, 204, 92)'
   ,'rgb(105, 205, 91)'
   ,'rgb(108, 205, 90)'
   ,'rgb(110, 206, 88)'
   ,'rgb(112, 207, 87)'
   ,'rgb(115, 208, 86)'
   ,'rgb(117, 208, 84)'
   ,'rgb(119, 209, 83)'
   ,'rgb(122, 209, 81)'
   ,'rgb(124, 210, 80)'
   ,'rgb(127, 211, 78)'
   ,'rgb(129, 211, 77)'
   ,'rgb(132, 212, 75)'
   ,'rgb(134, 213, 73)'
   ,'rgb(137, 213, 72)'
   ,'rgb(139, 214, 70)'
   ,'rgb(142, 214, 69)'
   ,'rgb(144, 215, 67)'
   ,'rgb(147, 215, 65)'
   ,'rgb(149, 216, 64)'
   ,'rgb(152, 216, 62)'
   ,'rgb(155, 217, 60)'
   ,'rgb(157, 217, 59)'
   ,'rgb(160, 218, 57)'
   ,'rgb(162, 218, 55)'
   ,'rgb(165, 219, 54)'
   ,'rgb(168, 219, 52)'
   ,'rgb(170, 220, 50)'
   ,'rgb(173, 220, 48)'
   ,'rgb(176, 221, 47)'
   ,'rgb(178, 221, 45)'
   ,'rgb(181, 222, 43)'
   ,'rgb(184, 222, 41)'
   ,'rgb(186, 222, 40)'
   ,'rgb(189, 223, 38)'
   ,'rgb(192, 223, 37)'
   ,'rgb(194, 223, 35)'
   ,'rgb(197, 224, 33)'
   ,'rgb(200, 224, 32)'
   ,'rgb(202, 225, 31)'
   ,'rgb(205, 225, 29)'
   ,'rgb(208, 225, 28)'
   ,'rgb(210, 226, 27)'
   ,'rgb(213, 226, 26)'
   ,'rgb(216, 226, 25)'
   ,'rgb(218, 227, 25)'
   ,'rgb(221, 227, 24)'
   ,'rgb(223, 227, 24)'
   ,'rgb(226, 228, 24)'
   ,'rgb(229, 228, 25)'
   ,'rgb(231, 228, 25)'
   ,'rgb(234, 229, 26)'
   ,'rgb(236, 229, 27)'
   ,'rgb(239, 229, 28)'
   ,'rgb(241, 229, 29)'
   ,'rgb(244, 230, 30)'
   ,'rgb(246, 230, 32)'
   ,'rgb(248, 230, 33)'
   ,'rgb(251, 231, 35)'
   ,'rgb(253, 231, 37)'
];

//Dave Green's ‘cubehelix’ colour scheme (but this version is brighter than the one online)

av.color.cubehelixCmap = [  //djb version
/* 'rgb(0, 0, 0)'
, 'rgb(3, 3, 1)'
, 'rgb(5, 5, 1)'
, 'rgb(6, 7, 2)'
, 'rgb(8, 9, 2)'
, 'rgb(9, 11, 2)'
, 'rgb(10, 12, 1)'
, 'rgb(11, 14, 1)'
, 'rgb(12, 16, 1)'*/
 'rgb(14, 18, 1)'
, 'rgb(14, 20, 1)'
, 'rgb(15, 21, 1)'
, 'rgb(16, 23, 1)'
, 'rgb(17, 25, 1)'
, 'rgb(17, 27, 1)'
, 'rgb(18, 28, 1)'
, 'rgb(18, 30, 1)'
, 'rgb(19, 32, 1)'
, 'rgb(19, 34, 1)'
, 'rgb(19, 35, 1)'
, 'rgb(20, 37, 1)'
, 'rgb(20, 39, 1)'
, 'rgb(20, 41, 1)'
, 'rgb(20, 42, 1)'
, 'rgb(20, 44, 1)'
, 'rgb(20, 46, 1)'
, 'rgb(20, 48, 2)'
, 'rgb(20, 49, 2)'
, 'rgb(20, 51, 2)'
, 'rgb(20, 53, 3)'
, 'rgb(20, 55, 3)'
, 'rgb(19, 57, 3)'
, 'rgb(19, 58, 4)'
, 'rgb(19, 60, 4)'
, 'rgb(19, 62, 5)'
, 'rgb(18, 63, 6)'
, 'rgb(18, 65, 6)'
, 'rgb(17, 67, 7)'
, 'rgb(17, 69, 8)'
, 'rgb(17, 70, 9)'
, 'rgb(16, 72, 9)'
, 'rgb(16, 74, 10)'
, 'rgb(15, 75, 11)'
, 'rgb(15, 77, 12)'
, 'rgb(14, 79, 14)'
, 'rgb(14, 81, 15)'
, 'rgb(13, 82, 16)'
, 'rgb(12, 84, 17)'
, 'rgb(12, 86, 18)'
, 'rgb(11, 87, 20)'
, 'rgb(11, 89, 21)'
, 'rgb(10, 90, 23)'
, 'rgb(9, 92, 24)'
, 'rgb(9, 94, 26)'
, 'rgb(8, 95, 27)'
, 'rgb(8, 97, 29)'
, 'rgb(7, 98, 31)'
, 'rgb(7, 100, 32)'
, 'rgb(6, 101, 34)'
, 'rgb(6, 103, 36)'
, 'rgb(5, 104, 38)'
, 'rgb(4, 105, 40)'
, 'rgb(4, 107, 42)'
, 'rgb(3, 108, 44)'
, 'rgb(3, 109, 46)'
, 'rgb(3, 111, 48)'
, 'rgb(2, 112, 50)'
, 'rgb(2, 113, 53)'
, 'rgb(1, 115, 55)'
, 'rgb(1, 116, 57)'
, 'rgb(1, 117, 59)'
, 'rgb(0, 118, 62)'
, 'rgb(0, 119, 64)'
, 'rgb(0, 121, 67)'
, 'rgb(0, 122, 69)'
, 'rgb(0, 123, 72)'
, 'rgb(0, 124, 74)'
, 'rgb(0, 125, 77)'
, 'rgb(0, 126, 80)'
, 'rgb(0, 127, 82)'
, 'rgb(0, 128, 85)'
, 'rgb(0, 129, 87)'
, 'rgb(0, 130, 90)'
, 'rgb(0, 130, 93)'
, 'rgb(0, 131, 96)'
, 'rgb(0, 132, 99)'
, 'rgb(0, 133, 101)'
, 'rgb(0, 133, 104)'
, 'rgb(0, 134, 107)'
, 'rgb(1, 135, 110)'
, 'rgb(1, 135, 113)'
, 'rgb(1, 136, 116)'
, 'rgb(2, 137, 119)'
, 'rgb(2, 137, 122)'
, 'rgb(3, 138, 125)'
, 'rgb(4, 138, 128)'
, 'rgb(4, 139, 131)'
, 'rgb(5, 139, 134)'
, 'rgb(6, 140, 137)'
, 'rgb(7, 140, 140)'
, 'rgb(7, 141, 143)'
, 'rgb(8, 141, 146)'
, 'rgb(9, 141, 149)'
, 'rgb(10, 141, 152)'
, 'rgb(11, 142, 155)'
, 'rgb(12, 142, 158)'
, 'rgb(14, 142, 161)'
, 'rgb(15, 142, 164)'
, 'rgb(16, 142, 167)'
, 'rgb(18, 143, 170)'
, 'rgb(19, 143, 173)'
, 'rgb(20, 143, 175)'
, 'rgb(22, 143, 179)'
, 'rgb(23, 143, 181)'
, 'rgb(25, 143, 184)'
, 'rgb(27, 143, 187)'
, 'rgb(28, 143, 190)'
, 'rgb(30, 143, 193)'
, 'rgb(32, 143, 195)'
, 'rgb(34, 142, 198)'
, 'rgb(35, 142, 201)'
, 'rgb(37, 142, 203)'
, 'rgb(39, 142, 206)'
, 'rgb(41, 142, 209)'
, 'rgb(43, 142, 211)'
, 'rgb(45, 141, 214)'
, 'rgb(47, 141, 216)'
, 'rgb(50, 141, 219)'
, 'rgb(52, 141, 221)'
, 'rgb(54, 140, 224)'
, 'rgb(56, 140, 226)'
, 'rgb(59, 140, 228)'
, 'rgb(61, 139, 231)'
, 'rgb(63, 139, 233)'
, 'rgb(66, 139, 235)'
, 'rgb(69, 138, 237)'
, 'rgb(71, 138, 239)'
, 'rgb(73, 137, 241)'
, 'rgb(76, 137, 243)'
, 'rgb(79, 137, 245)'
, 'rgb(81, 136, 247)'
, 'rgb(84, 136, 249)'
, 'rgb(87, 135, 250)'
, 'rgb(90, 135, 252)'
, 'rgb(92, 135, 254)'
, 'rgb(95, 134, 255)'
, 'rgb(98, 134, 255)'
, 'rgb(100, 133, 255)'
, 'rgb(103, 133, 255)'
, 'rgb(106, 132, 255)'
, 'rgb(109, 132, 255)'
, 'rgb(112, 132, 255)'
, 'rgb(115, 131, 255)'
, 'rgb(118, 131, 255)'
, 'rgb(121, 130, 255)'
, 'rgb(124, 130, 255)'
, 'rgb(127, 129, 255)'
, 'rgb(130, 129, 255)'
, 'rgb(133, 129, 255)'
, 'rgb(135, 128, 255)'
, 'rgb(138, 128, 255)'
, 'rgb(142, 127, 255)'
, 'rgb(144, 127, 255)'
, 'rgb(147, 126, 255)'
, 'rgb(150, 126, 255)'
, 'rgb(153, 126, 255)'
, 'rgb(156, 125, 255)'
, 'rgb(159, 125, 255)'
, 'rgb(162, 125, 255)'
, 'rgb(165, 124, 255)'
, 'rgb(168, 124, 255)'
, 'rgb(171, 124, 255)'
, 'rgb(174, 124, 255)'
, 'rgb(177, 123, 255)'
, 'rgb(180, 123, 255)'
, 'rgb(183, 123, 255)'
, 'rgb(185, 123, 255)'
, 'rgb(188, 123, 255)'
, 'rgb(191, 122, 255)'
, 'rgb(194, 122, 255)'
, 'rgb(197, 122, 255)'
, 'rgb(199, 122, 255)'
, 'rgb(202, 122, 255)'
, 'rgb(205, 122, 255)'
, 'rgb(208, 122, 255)'
, 'rgb(210, 122, 255)'
, 'rgb(213, 122, 255)'
, 'rgb(215, 122, 255)'
, 'rgb(218, 122, 255)'
, 'rgb(220, 122, 255)'
, 'rgb(223, 122, 255)'
, 'rgb(225, 122, 255)'
, 'rgb(228, 122, 255)'
, 'rgb(230, 123, 255)'
, 'rgb(232, 123, 255)'
, 'rgb(235, 123, 255)'
, 'rgb(237, 123, 255)'
, 'rgb(239, 124, 255)'
, 'rgb(241, 124, 255)'
, 'rgb(243, 124, 255)'
, 'rgb(245, 125, 255)'
, 'rgb(247, 125, 255)'
, 'rgb(249, 125, 255)'
, 'rgb(251, 126, 254)'
, 'rgb(253, 126, 252)'
, 'rgb(255, 127, 251)'
, 'rgb(255, 128, 250)'
, 'rgb(255, 128, 248)'
, 'rgb(255, 129, 247)'
, 'rgb(255, 129, 246)'
, 'rgb(255, 130, 244)'
, 'rgb(255, 131, 243)'
, 'rgb(255, 131, 241)'
, 'rgb(255, 132, 240)'
, 'rgb(255, 133, 238)'
, 'rgb(255, 133, 237)'
, 'rgb(255, 134, 235)'
, 'rgb(255, 135, 234)'
, 'rgb(255, 136, 232)'
, 'rgb(255, 137, 231)'
, 'rgb(255, 137, 229)'
, 'rgb(255, 138, 228)'
, 'rgb(255, 139, 226)'
, 'rgb(255, 141, 225)'
, 'rgb(255, 141, 223)'
, 'rgb(255, 142, 222)'
, 'rgb(255, 144, 220)'
, 'rgb(255, 145, 219)'
, 'rgb(255, 146, 218)'
, 'rgb(255, 147, 216)'
, 'rgb(255, 148, 215)'
, 'rgb(255, 149, 213)'
, 'rgb(255, 150, 212)'
, 'rgb(255, 151, 210)'
, 'rgb(255, 152, 209)'
, 'rgb(255, 154, 208)'
, 'rgb(255, 155, 207)'
, 'rgb(255, 156, 205)'
, 'rgb(255, 158, 204)'
, 'rgb(255, 159, 203)'
, 'rgb(255, 160, 202)'
, 'rgb(255, 162, 201)'
, 'rgb(255, 163, 199)'
, 'rgb(255, 164, 198)'
, 'rgb(255, 166, 197)'
, 'rgb(255, 167, 196)'
, 'rgb(255, 169, 195)'
, 'rgb(255, 170, 195)'
, 'rgb(255, 171, 194)'
, 'rgb(255, 173, 193)'
, 'rgb(255, 174, 192)'
, 'rgb(255, 176, 191)'
, 'rgb(255, 177, 190)'
, 'rgb(255, 179, 190)'
, 'rgb(255, 180, 189)'
, 'rgb(255, 182, 188)'
, 'rgb(255, 183, 188)'
, 'rgb(255, 185, 187)'
, 'rgb(255, 186, 187)'
, 'rgb(255, 187, 187)'
, 'rgb(255, 189, 186)'
, 'rgb(255, 190, 186)'
, 'rgb(255, 192, 186)'
, 'rgb(255, 194, 186)'
, 'rgb(255, 195, 186)'
, 'rgb(255, 197, 185)'
, 'rgb(255, 198, 185)'
, 'rgb(255, 199, 185)'
, 'rgb(255, 201, 186)'
, 'rgb(255, 202, 186)'
, 'rgb(255, 204, 186)'
, 'rgb(255, 206, 186)'
, 'rgb(255, 207, 186)'
, 'rgb(255, 208, 187)'
, 'rgb(255, 210, 187)'
, 'rgb(255, 211, 188)'
, 'rgb(255, 213, 188)'
, 'rgb(255, 214, 189)'
, 'rgb(255, 215, 189)'
, 'rgb(255, 217, 190)'
, 'rgb(255, 218, 191)'
, 'rgb(255, 220, 192)'
, 'rgb(255, 221, 193)'
, 'rgb(255, 222, 194)'
, 'rgb(255, 224, 195)'
, 'rgb(255, 225, 195)'
, 'rgb(255, 226, 197)'
, 'rgb(255, 227, 198)'
, 'rgb(255, 229, 199)'
, 'rgb(255, 230, 200)'
/*, 'rgb(255, 231, 201)'
, 'rgb(255, 232, 203)'
, 'rgb(255, 234, 204)'
, 'rgb(255, 235, 205)'
, 'rgb(255, 236, 207)'
, 'rgb(255, 237, 208)'
, 'rgb(255, 238, 210)'
, 'rgb(255, 239, 211)'
, 'rgb(255, 240, 213)'
, 'rgb(254, 241, 215)'
, 'rgb(254, 242, 216)'
, 'rgb(254, 243, 218)'
, 'rgb(253, 244, 220)'
, 'rgb(253, 245, 222)'
, 'rgb(253, 246, 224)'
, 'rgb(253, 246, 226)'
, 'rgb(253, 247, 228)'
, 'rgb(252, 248, 230)'
, 'rgb(252, 249, 232)'
, 'rgb(252, 249, 234)'
, 'rgb(252, 250, 236)'
, 'rgb(252, 251, 238)'
, 'rgb(253, 251, 240)'
, 'rgb(253, 252, 242)'
, 'rgb(253, 253, 244)'
, 'rgb(253, 253, 246)'
, 'rgb(254, 254, 248)'
, 'rgb(254, 254, 251)'
, 'rgb(254, 254, 253)'
, 'rgb(255, 255, 255)'*/
  ];


//----------------------------------------------------------------------------------------------------------------------
/* web sites about color 
 *  
 *  
 *  
 
 Instructions for color brewer
http://www.personal.psu.edu/cab38/ColorBrewer/ColorBrewer_intro.html   old requires flash 
http://colorbrewer2.org  color selection tool      use this one
    creates a set of colors, does not look at colors from your site. 

Another Color site that I've not yet used. 
https://color.adobe.com/create/color-accessibility

Paul Tol has information on color
   set of 9 color blind friendly distinct colors 
https://personal.sron.nl/~pault/   

Color Universal Design (CUD)
- set of 8 colors for colorbind folks
http://jfly.iam.u-tokyo.ac.jp/color/#pallet   

The Inter-Society Color Council has some resources
https://iscc.org/page-18123
  http://www.iscc.org/pdf/PC54_1724_001.pdf good article, but not there in 2021

creates a set of colors to use as a pallet base on several optional criteria. Colorblind friendly option is slow. 
same tool both sites
http://graphicdesign.stackexchange.com/questions/3682/where-can-i-find-a-large-palette-set-of-contrasting-colors-for-coloring-many-d
http://tools.medialab.sciences-po.fr/iwanthue/  creates distinct color palets, an option for colorblind 

Color gradients with increasing lightness
http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/cubetry.html

Several color gradients including viridis
https://bids.github.io/colormap/  

source of gnuplot2 used in Avida-ED 3 & 4
http://matplotlib.org/users/colormaps.html    not there
https://matplotlib.org/2.0.2/users/colormaps.html   next version 
https://matplotlib.org/stable/                       3.4.2 in 2021

Series of articles about why rainbow is NOT a good color palette for data 
https://mycarta.wordpress.com/2012/05/29/the-rainbow-is-dead-long-live-the-rainbow-series-outline/
More info on the evils of the rainbow color map
http://stackoverflow.com/questions/7251872/is-there-a-better-color-scale-than-the-rainbow-colormap

color tools
list of tools for testing color in a design
http://www.456bereastreet.com/archive/200709/10_colour_contrast_checking_tools_to_improve_the_accessibility_of_your_design/

creates a set of visually distinct colors.
http://phrogz.net/css/distinct-colors.html

http://stackoverflow.com/questions/3620663/color-theory-how-to-convert-munsell-hvc-to-rgb-hsb-hsl

Color tools to see what image looks like, Mike Wiser provided these two. 
  lets one upload an image to see a simulation of how that image appears to people with different types of color blindness
http://www.color-blindness.com/coblis-color-blindness-simulator/
http://www.vischeck.com/vischeck/vischeckImage.php

Has many tools 
Used to create linear color maps when I needed 9 different colors gradients for the set of logic 9
https://www.rapidtables.com/web/color/Web_Color.html


---------- 
Commercial page that makes images for science. I cannot seem to get to the link below in 2021
    list of colors to use for both color normal and color blind people. 
http://www.somersault1824.com/
  av.color.parentColorList came from file below, but that file was not there in 2021
    http://www.somersault1824.com/tips-for-designing-scientific-figures-for-color-blind-readers/
*/
