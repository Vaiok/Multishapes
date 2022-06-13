const cnvs = document.querySelector('#mainCanvas');
const ctx2d = cnvs.getContext('2d');
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
const pixBase = 60;
let pixScale = 2;
let pixSq = pixBase*pixScale;
let horOffSet = (cnvs.width%pixSq)/2;
let verOffSet = (cnvs.height%pixSq)/2;

function Character(ctx, x, y, w, h) {
  this.x = x, this.y = y, this.w = w, this.h = h;
  this.heroFront = {
    head: [{pnts: {x: this.x, y: this.y-this.h*7/60, rad: this.h*7/60}, col: 'tan'},
            {pnts: {x: this.x-this.w*6/60, y: this.y-this.h*9/60, rad: this.w*2/60}, col: 'white'},
            {pnts: {x: this.x+this.w*6/60, y: this.y-this.h*9/60, rad: this.w*2/60}, col: 'white'},
            {pnts: {x: this.x-this.w*6/60, y: this.y-this.h*9/60, rad: this.w*1/60}, col: 'black'},
            {pnts: {x: this.x+this.w*6/60, y: this.y-this.h*9/60, rad: this.w*1/60}, col: 'black'},
            {pnts: [{x: this.x-this.w*6/60, y: this.y-this.h*5/60},{x: this.x+this.w*6/60, y: this.y-this.h*5/60},
                    {x: this.x+this.w*6/60, y: this.y-this.h*4/60},{x: this.x-this.w*6/60, y: this.y-this.h*4/60}],
              col: 'pink'},
            {pnts: [{x: this.x-this.w*10/60, y: this.y-this.h*14/60},{x: this.x, y: this.y-this.h*15/60},
                    {x: this.x+this.w*10/60, y: this.y-this.h*14/60},{x: this.x+this.w*17/60, y: this.y-this.h*8/60},
                    {x: this.x+this.w*14/60, y: this.y-this.h*6/60},{x: this.x+this.w*10/60, y: this.y-this.h*11/60},
                    {x: this.x, y: this.y-this.h*12/60},{x: this.x-this.w*10/60, y: this.y-this.h*11/60},
                    {x: this.x-this.w*14/60, y: this.y-this.h*6/60},{x: this.x-this.w*17/60, y: this.y-this.h*8/60}],
              col: 'yellow'}],
    body: [{pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*18/60, y: this.y+this.h*16/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*16/60},{x: this.x-this.w*18/60, y: this.y-this.h*0/60}],
              col: 'red'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y+this.h*16/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*16/60}],
              col: 'blue'}],
    lArm: [{pnts: {x: this.x+this.w*24/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*30/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*30/60, y: this.y+this.h*14/60},{x: this.x+this.w*18/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    rArm: [{pnts: {x: this.x-this.w*24/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*30/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*30/60, y: this.y+this.h*14/60},{x: this.x-this.w*18/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*17/60, y: this.y+this.h*28/60},{x: this.x+this.w*3/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*3/60, y: this.y+this.h*28/60},{x: this.x+this.w*17/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*18/60, y: this.y+this.h*30/60},{x: this.x+this.w*2/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*17/60, y: this.y+this.h*28/60},{x: this.x-this.w*3/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*3/60, y: this.y+this.h*28/60},{x: this.x-this.w*17/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*30/60},{x: this.x-this.w*2/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.heroFront1 = {
    head: this.heroFront.head,
    lArm: [{pnts: {x: this.x+this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*27/60, y: this.y+this.h*14/60},{x: this.x+this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    body: this.heroFront.body,
    rArm: [{pnts: {x: this.x-this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*27/60, y: this.y+this.h*14/60},{x: this.x-this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*18/60, y: this.y+this.h*28/60},{x: this.x+this.w*2/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*28/60},{x: this.x+this.w*18/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*19/60, y: this.y+this.h*30/60},{x: this.x+this.w*1/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*16/60, y: this.y+this.h*28/60},{x: this.x-this.w*4/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*4/60, y: this.y+this.h*28/60},{x: this.x-this.w*16/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*17/60, y: this.y+this.h*30/60},{x: this.x-this.w*3/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.x += pixSq;
  this.heroFront2 = this.heroFront;
  this.x += pixSq;
  this.heroFront3 = {
    head: this.heroFront.head,
    rArm: [{pnts: {x: this.x-this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*27/60, y: this.y+this.h*14/60},{x: this.x-this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    body: this.heroFront.body,
    lArm: [{pnts: {x: this.x+this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*27/60, y: this.y+this.h*14/60},{x: this.x+this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*28/60},{x: this.x-this.w*2/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*28/60},{x: this.x-this.w*18/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*19/60, y: this.y+this.h*30/60},{x: this.x-this.w*1/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*16/60, y: this.y+this.h*28/60},{x: this.x+this.w*4/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*4/60, y: this.y+this.h*28/60},{x: this.x+this.w*16/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*17/60, y: this.y+this.h*30/60},{x: this.x+this.w*3/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.x += pixSq;
  this.heroBack = {
    head: [{pnts: {x: this.x, y: this.y-this.h*7/60, rad: this.h*7/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*10/60, y: this.y-this.h*14/60},{x: this.x, y: this.y-this.h*15/60},
                    {x: this.x+this.w*10/60, y: this.y-this.h*14/60},{x: this.x+this.w*17/60, y: this.y-this.h*8/60},
                    {x: this.x+this.w*10/60, y: this.y-this.h*3/60},{x: this.x, y: this.y-this.h*2/60},
                    {x: this.x-this.w*10/60, y: this.y-this.h*3/60},{x: this.x-this.w*17/60, y: this.y-this.h*8/60}],
              col: 'yellow'}],
    body: [{pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*18/60, y: this.y+this.h*16/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*16/60},{x: this.x-this.w*18/60, y: this.y-this.h*0/60}],
              col: 'red'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y+this.h*16/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*16/60}],
              col: 'blue'}],
    lArm: [{pnts: {x: this.x+this.w*24/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*30/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*30/60, y: this.y+this.h*14/60},{x: this.x+this.w*18/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    rArm: [{pnts: {x: this.x-this.w*24/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*30/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*30/60, y: this.y+this.h*14/60},{x: this.x-this.w*18/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*17/60, y: this.y+this.h*28/60},{x: this.x+this.w*3/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*3/60, y: this.y+this.h*28/60},{x: this.x+this.w*17/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*18/60, y: this.y+this.h*30/60},{x: this.x+this.w*2/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*17/60, y: this.y+this.h*28/60},{x: this.x-this.w*3/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*3/60, y: this.y+this.h*28/60},{x: this.x-this.w*17/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*30/60},{x: this.x-this.w*2/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.heroBack1 = {
    head: this.heroBack.head,
    lArm: [{pnts: {x: this.x+this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*27/60, y: this.y+this.h*14/60},{x: this.x+this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    body: this.heroBack.body,
    rArm: [{pnts: {x: this.x-this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*27/60, y: this.y+this.h*14/60},{x: this.x-this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*18/60, y: this.y+this.h*28/60},{x: this.x+this.w*2/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*28/60},{x: this.x+this.w*18/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*19/60, y: this.y+this.h*30/60},{x: this.x+this.w*1/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*16/60, y: this.y+this.h*28/60},{x: this.x-this.w*4/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*4/60, y: this.y+this.h*28/60},{x: this.x-this.w*16/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*17/60, y: this.y+this.h*30/60},{x: this.x-this.w*3/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.x += pixSq;
  this.heroBack2 = this.heroBack;
  this.x += pixSq;
  this.heroBack3 = {
    head: this.heroBack.head,
    rArm: [{pnts: {x: this.x-this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*18/60, y: this.y-this.h*0/60},{x: this.x-this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*27/60, y: this.y+this.h*14/60},{x: this.x-this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    body: this.heroBack.body,
    lArm: [{pnts: {x: this.x+this.w*21/60, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*18/60, y: this.y-this.h*0/60},{x: this.x+this.w*29/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*27/60, y: this.y+this.h*14/60},{x: this.x+this.w*15/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    rLeg: [{pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*18/60},{x: this.x-this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*18/60, y: this.y+this.h*28/60},{x: this.x-this.w*2/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*2/60, y: this.y+this.h*28/60},{x: this.x-this.w*18/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*19/60, y: this.y+this.h*30/60},{x: this.x-this.w*1/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
    lLeg: [{pnts: [{x: this.x+this.w*2/60, y: this.y+this.h*18/60},{x: this.x+this.w*18/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*16/60, y: this.y+this.h*28/60},{x: this.x+this.w*4/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*4/60, y: this.y+this.h*28/60},{x: this.x+this.w*16/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*17/60, y: this.y+this.h*30/60},{x: this.x+this.w*3/60, y: this.y+this.h*30/60}],
              col: 'gray'}]
  };
  this.x -= pixSq*5;
  this.y += pixSq*1.5;
  this.heroLeft = {
    head: [{pnts: {x: this.x, y: this.y-this.h*7/60, rad: this.h*7/60}, col: 'tan'},
            {pnts: {x: this.x-this.w*6/60, y: this.y-this.h*9/60, rad: this.w*2/60}, col: 'white'},
            {pnts: {x: this.x-this.w*6/60, y: this.y-this.h*9/60, rad: this.w*1/60}, col: 'black'},
            {pnts: [{x: this.x-this.w*7/60, y: this.y-this.h*5/60},{x: this.x-this.w*13/60, y: this.y-this.h*5/60},
                    {x: this.x-this.w*13/60, y: this.y-this.h*4/60},{x: this.x-this.w*7/60, y: this.y-this.h*4/60}],
              col: 'pink'},
            {pnts: [{x: this.x-this.w*9/60, y: this.y-this.h*14/60},{x: this.x, y: this.y-this.h*15/60},
                    {x: this.x+this.w*10/60, y: this.y-this.h*14/60},{x: this.x+this.w*17/60, y: this.y-this.h*8/60},
                    {x: this.x+this.w*14/60, y: this.y-this.h*3/60},{x: this.x+this.w*10/60, y: this.y-this.h*2/60},
                    {x: this.x, y: this.y-this.h*11/60},{x: this.x-this.w*10/60, y: this.y-this.h*12/60}],
              col: 'yellow'}],
    body: [{pnts: [{x: this.x+this.w*6/60, y: this.y-this.h*0/60},{x: this.x+this.w*12/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*12/60, y: this.y+this.h*16/60},{x: this.x-this.w*12/60, y: this.y+this.h*16/60},
                    {x: this.x-this.w*12/60, y: this.y+this.h*2/60},{x: this.x-this.w*6/60, y: this.y-this.h*0/60}],
              col: 'red'},
            {pnts: [{x: this.x+this.w*12/60, y: this.y+this.h*16/60},{x: this.x+this.w*12/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*12/60, y: this.y+this.h*18/60},{x: this.x-this.w*12/60, y: this.y+this.h*16/60}],
              col: 'blue'}],
    lArm: [{pnts: {x: this.x, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x-this.w*6/60, y: this.y+this.h*2/60},{x: this.x+this.w*6/60, y: this.y+this.h*2/60},
                    {x: this.x+this.w*6/60, y: this.y+this.h*14/60},{x: this.x-this.w*6/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x-this.w*12/60, y: this.y+this.h*18/60},{x: this.x+this.w*12/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*10/60, y: this.y+this.h*28/60},{x: this.x-this.w*10/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x-this.w*20/60, y: this.y+this.h*28/60},{x: this.x+this.w*10/60, y: this.y+this.h*28/60},
                    {x: this.x+this.w*11/60, y: this.y+this.h*30/60},{x: this.x-this.w*19/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
  };
  this.heroLeft1 = {
    head: this.heroLeft.head,
    body: this.heroLeft.body
  };
  this.x += pixSq;
  this.heroLeft2 = this.heroLeft;
  this.x += pixSq;
  this.heroLeft3 = {
    head: this.heroLeft.head,
    body: this.heroLeft.body
  };
  this.x += pixSq;
  this.heroRight = {
    head: [{pnts: {x: this.x, y: this.y-this.h*7/60, rad: this.h*7/60}, col: 'tan'},
            {pnts: {x: this.x+this.w*6/60, y: this.y-this.h*9/60, rad: this.w*2/60}, col: 'white'},
            {pnts: {x: this.x+this.w*6/60, y: this.y-this.h*9/60, rad: this.w*1/60}, col: 'black'},
            {pnts: [{x: this.x+this.w*7/60, y: this.y-this.h*5/60},{x: this.x+this.w*13/60, y: this.y-this.h*5/60},
                    {x: this.x+this.w*13/60, y: this.y-this.h*4/60},{x: this.x+this.w*7/60, y: this.y-this.h*4/60}],
              col: 'pink'},
            {pnts: [{x: this.x+this.w*9/60, y: this.y-this.h*14/60},{x: this.x, y: this.y-this.h*15/60},
                    {x: this.x-this.w*10/60, y: this.y-this.h*14/60},{x: this.x-this.w*17/60, y: this.y-this.h*8/60},
                    {x: this.x-this.w*14/60, y: this.y-this.h*3/60},{x: this.x-this.w*10/60, y: this.y-this.h*2/60},
                    {x: this.x, y: this.y-this.h*11/60},{x: this.x+this.w*10/60, y: this.y-this.h*12/60}],
              col: 'yellow'}],
    body: [{pnts: [{x: this.x-this.w*6/60, y: this.y-this.h*0/60},{x: this.x-this.w*12/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*12/60, y: this.y+this.h*16/60},{x: this.x+this.w*12/60, y: this.y+this.h*16/60},
                    {x: this.x+this.w*12/60, y: this.y+this.h*2/60},{x: this.x+this.w*6/60, y: this.y-this.h*0/60}],
              col: 'red'},
            {pnts: [{x: this.x-this.w*12/60, y: this.y+this.h*16/60},{x: this.x-this.w*12/60, y: this.y+this.h*18/60},
                    {x: this.x+this.w*12/60, y: this.y+this.h*18/60},{x: this.x+this.w*12/60, y: this.y+this.h*16/60}],
              col: 'blue'}],
    lArm: [{pnts: {x: this.x, y: this.y+this.h*15/60, rad: this.h*3/60}, col: 'tan'},
            {pnts: [{x: this.x+this.w*6/60, y: this.y+this.h*2/60},{x: this.x-this.w*6/60, y: this.y+this.h*2/60},
                    {x: this.x-this.w*6/60, y: this.y+this.h*14/60},{x: this.x+this.w*6/60, y: this.y+this.h*14/60}],
              col: 'crimson'}],
    lLeg: [{pnts: [{x: this.x+this.w*12/60, y: this.y+this.h*18/60},{x: this.x-this.w*12/60, y: this.y+this.h*18/60},
                    {x: this.x-this.w*10/60, y: this.y+this.h*28/60},{x: this.x+this.w*10/60, y: this.y+this.h*28/60}],
              col: 'blue'},
            {pnts: [{x: this.x+this.w*20/60, y: this.y+this.h*28/60},{x: this.x-this.w*10/60, y: this.y+this.h*28/60},
                    {x: this.x-this.w*11/60, y: this.y+this.h*30/60},{x: this.x+this.w*19/60, y: this.y+this.h*30/60}],
              col: 'gray'}],
  };
  this.heroRight1 = {
    head: this.heroRight.head,
    body: this.heroRight.body
  };
  this.x += pixSq;
  this.heroRight2 = this.heroRight;
  this.x += pixSq;
  this.heroRight3 = {
    head: this.heroRight.head,
    body: this.heroRight.body
  };
}
Character.prototype.drawSprites = function(shape) {
  ctx2d.fillStyle = shape.col;
  ctx2d.beginPath();
  if (Array.isArray(shape.pnts)) {
    ctx2d.moveTo(shape.pnts[0].x, shape.pnts[0].y);
    for (let point = 1; point < shape.pnts.length; point++) {ctx2d.lineTo(shape.pnts[point].x, shape.pnts[point].y);}
  }
  else {ctx2d.arc(shape.pnts.x, shape.pnts.y, shape.pnts.rad, 0, Math.PI*2);}
  ctx2d.closePath();
  ctx2d.fill();
}
Character.prototype.moveSprites = function(heroSprite) {
  for (let parts in heroSprite) {
    for (let shape of heroSprite[parts]) {
      if (Array.isArray(shape.pnts)) {
        for (let point = 0; point < shape.pnts.length; point++) {shape.pnts[point].x += pixSq;}
      }
      else {shape.pnts.x += pixSq;}
    }
  }
}
Character.prototype.drawSpriteSet = function(heroSprite) {
  for (let i = 1; i < 4; i++)
  {
    if (i > 1) {this.moveSprites(this[heroSprite]);}
    for (let parts in this[heroSprite+i]) {for (let shape of this[heroSprite+i][parts]) {this.drawSprites(shape);}}
  }
}
let hero = new Character(ctx2d, pixSq/2 + horOffSet, pixSq/2 + verOffSet, pixSq, pixSq*2);

ctx2d.fillStyle = 'black';
ctx2d.fillRect(0,0,cnvs.width,cnvs.height);

hero.drawSpriteSet('heroFront');
hero.drawSpriteSet('heroBack');
hero.drawSpriteSet('heroLeft');
hero.drawSpriteSet('heroRight');

ctx2d.strokeStyle = 'white';
for (let i = verOffSet; i <= cnvs.height; i += pixSq/2) {
  ctx2d.beginPath();
  ctx2d.moveTo(0,i);
  ctx2d.lineTo(cnvs.width,i);
  ctx2d.stroke();
}
for (let j = horOffSet; j <= cnvs.width; j += pixSq/2) {
  ctx2d.beginPath();
  ctx2d.moveTo(j,0);
  ctx2d.lineTo(j,cnvs.height);
  ctx2d.stroke();
}
