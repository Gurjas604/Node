var universe = [];
var unicolor = [];
var currentobj = [];
var colorspace = [];

for(var i = 0; i<10*3;i++)
{
  colorspace.push(Math.random());
}


renderuniverse();

drawobject();

function renderuniverse()
{

  for(var i = 0; i<200; i++)
  {
      universe[i]= 0;
      unicolor[i]= 0;
  }
  for(var i = 200; i<210; i++)
  {
      universe[i] = -1;
  }
  
}

render();


function keyevent(gl, programInfo){
  document.addEventListener('keydown', (event) => {
    const keyname = event.key;
    console.log(keyname);
    if(keyname == 'ArrowDown')
    {  
        down(gl, programInfo);

    }
    else if(keyname == 'ArrowRight')
    {  
        right(gl, programInfo);

    }
    else if(keyname == 'ArrowLeft')
    {  
        left(gl, programInfo);
    }
    else if(keyname == 'r')
    {  
        renderuniverse();
        drawobject();
    }
    else if(keyname == 'ArrowUp')
    {  
      rotation(gl, programInfo);
    }
  });
}

function render()
{
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');
  
    // If we don't have a GL context, give up now
  
    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }
  
    // Vertex shader program
  
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
  
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
  
      varying lowp vec4 vColor;
  
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;
  
    // Fragment shader program
  
    const fsSource = `
      varying lowp vec4 vColor;
  
      void main(void) {
        gl_FragColor = vColor;
      }
    `;
  
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  
    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVevrtexColor and also
    // look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };
  
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
  
    // Draw the scene
    //drawScene(gl, programInfo, buffers);
    

      keyevent(gl, programInfo);

    var counter = 0;
    function yes(now) {
      counter++;
  
      if((counter%60) == 0)
      {
        counter = 0;
        down(gl, programInfo);
      }
      requestAnimationFrame(yes);
    
    }
    requestAnimationFrame(yes);
}
function xycheck(x, y)
{
  if(x<0)
  {
    return false;
  }
  else if(x>9)
  {
    return false;
  }
  else if(y<0)
  {
    return false;
  }
  else if(y>9)
  {        
    return false;
  }
  else
  {
    return true;
  }
}

function drawobject()
{
  var random = Math.floor(Math.random()*7);
  var color = Math.floor(Math.random()*10) + 1;
  for(var i = 4; i<17; i++)
  {
    if(universe[i] == -1)
    {
      renderuniverse();
      break;
    }
  }
  switch(random){
    case 0:
        universe[4] = 1;
        unicolor[4] = color;

        universe[5] = 1;
        unicolor[5] = color;

        universe[14] = 1;
        unicolor[14] = color;
        
        universe[15] = 1;
        unicolor[15] = color;
        break;
    case 1:
        universe[3] = 1;
        unicolor[3] = color;

        universe[4] = 1;
        unicolor[4] = color;

        universe[5] = 1;
        unicolor[5] = color;

        universe[6] = 1;
        unicolor[6] = color;
        break;
    case 2:
        universe[5] = 1;
        unicolor[5] = color;

        universe[6] = 1;
        unicolor[6] = color;
        
        universe[14] = 1;
        unicolor[14] = color;
        
        universe[15] = 1;
        unicolor[15] = color;
        break;
    case 3:
        universe[4] = 1;
        unicolor[4] = color;

        universe[5] = 1;
        unicolor[5] = color;
        
        universe[15] = 1;
        unicolor[15] = color;
        
        universe[16] = 1;
        unicolor[16] = color;
        break;
    case 4:
        universe[4] = 1;
        unicolor[4] = color;
        
        universe[5] = 1;
        unicolor[5] = color;
        
        universe[6] = 1;
        unicolor[6] = color;
        
        universe[14] = 1;
        unicolor[14] = color;
        break;
    case 5:
        universe[4] = 1;
        unicolor[4] = color;
        
        universe[5] = 1;
        unicolor[5] = color;
       
        universe[6] = 1;
        unicolor[6] = color;
       
        universe[16] = 1;
        unicolor[16] = color;
        break;
    case 6:
        universe[4] = 1;
        unicolor[4] = color;
        
        universe[5] = 1;
        unicolor[5] = color;
        
        universe[6] = 1;
        unicolor[6] = color;
        
        universe[15] = 1;
        unicolor[15] = color;
        break;
        
  }
  currentobj = [];
  currentobj.push(random);
  currentobj.push(0);
}

function rotation(gl, programInfo)
{
  var oldcoords = [];
  var newcoords = [];
  var x;
  var y;
  var colormatch;
  var colorcoord;
  
  for(var i = 0; i<200; i++)
  {
    if(universe[i]==1)
    {
      oldcoords.push(i);
    }
  }

    switch(currentobj[0]){
      case 0:
        oldcoords = [];
        newcoords = [];
        break;
      case 1:
        switch(currentobj[1]){
          case 0:
            x = oldcoords[0]%10;
            y = (oldcoords[0]-x)/10;
            x = x +2;
            y = y+2;
            if(!xycheck(x,y))
            {
              oldcoords = [];
              newcoords = [];
              break;
            }

            newcoords.push(y*10+x);
            
            x = oldcoords[1]%10;
            y = (oldcoords[1]-x)/10;
            x = x +1;
            y = y+1;
            if(!xycheck(x,y))
            {
              oldcoords = [];
              newcoords = [];
              break;
            }

            newcoords.push(y*10+x);

            x = oldcoords[2]%10;
            y = (oldcoords[2]-x)/10;


            newcoords.push(y*10+x);

            x = oldcoords[3]%10;
            y = (oldcoords[3]-x)/10;
            x = x -1;
            y = y -1;
            if(!xycheck(x,y))
            {
              oldcoords = [];
              newcoords = [];
              break;
            }

            newcoords.push(y*10+x);
            currentobj[1] = 1;
            console.log('rotated');
            break;
            case 1:
              x = oldcoords[0]%10;
              y = (oldcoords[0]-x)/10;
              x = x + 1;
              y = y + 1;
              if(!xycheck(x,y))
              {
                oldcoords = [];
                newcoords = [];
                break;
              }
  
              newcoords.push(y*10+x);
              
              x = oldcoords[1]%10;
              y = (oldcoords[1]-x)/10;
  
              newcoords.push(y*10+x);
  
              x = oldcoords[2]%10;
              y = (oldcoords[2]-x)/10;
              x = x - 1;
              y = y - 1;
              if(!xycheck(x,y))
              {
                oldcoords = [];
                newcoords = [];
                break;
              }
  
              newcoords.push(y*10+x);
  
              x = oldcoords[3]%10;
              y = (oldcoords[3]-x)/10;
              x = x - 2;
              y = y - 2;
              if(!xycheck(x,y))
              {
                oldcoords = [];
                newcoords = [];
                break;
              }
  
              newcoords.push(y*10+x);
              currentobj[1] = 0;
              console.log('rotated');
              break;
        }
        break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          
          if(middlefinder(oldcoords) == false)
          {
              console.log('here');

              newcoords = [];
              oldcoords = [];   
          }
          
          break;
    }


    for(var i = 0; i < newcoords.length; i++)
    {
      x = newcoords[i]%10;
      y = (newcoords[i]-x)/10;


    }

    while(oldcoords.length >0)
    {
      colorcoord = oldcoords.pop();
      colormatch = unicolor[colorcoord];
      unicolor[colorcoord] = 0;
      universe[colorcoord] = 0;
    }
    while(newcoords.length >0)
    {
      colorcoord = newcoords.pop();
      unicolor[colorcoord] = colormatch;
      universe[colorcoord] = 1;
    }

    var positions = unitopos();
    var buffers = cubebuffer(gl, positions);

    drawboard(gl, programInfo, buffers, positions.length/2);
}

function middlefinder(vertexes)
{
  var minx = 9;
  var maxx = 0;
  var miny = 9;
  var maxy = 0;
  var x;
  var y;
  var midx = 0;
  var midy = 0;
  var newcoords = [];
  var colormatch;
  var colorcoord;
  var uniexists = [];
  var oldcoords = [];
  var newcord = [];

  console.log('middlefinder');
  for( var i = 0; i<vertexes.length; i++)
  {
    x = vertexes[i]%10;
    y = (vertexes[i]-x)/10;
    if(minx >= x)
    {
      minx = x;
    }
    if(maxx <= x)
    {
      maxx = x;
    }
    if(miny >= y)
    {
      miny = y;
    }
    if(maxy <= y)
    {
      maxy = y;
    }
    
  }
  console.log(minx, maxx, miny, maxy);

  midx = maxx - minx -1;
  midy = maxy - miny -1;
  midx += minx;
  midy += miny;

  minx = midx -1;
  maxx = midx + 1;
  miny = midy-1;
  maxy = midy + 1;

  for(var i = minx; i<=maxx; i++)
  {
    for(var j = miny; j<=maxy; j++)
      {

          if(universe[(j*10)+i] == -1)
          {
            return false;
          }
          else
          {
            switch(j-miny){
              case 0:
                if((i-minx)==0)
                { newcoords.push(((j+2)*10+i), (j*10)+i , universe[(j*10)+i]); }
                if((i-minx)==1)
                { newcoords.push(((j+1)*10+i-1), (j*10)+i , universe[(j*10)+i]); }
                if((i-minx)==2)
                { newcoords.push(((j)*10+i-2), (j*10)+i , universe[(j*10)+i]); }
                break;

                case 1: 
                if((i-minx)==0)
                { newcoords.push(((j+1)*10+i+1), (j*10)+i , universe[(j*10)+i]); }
                if((i-minx)==1)
                { newcoords.push(((j)*10+i), (j*10)+i , universe[(j*10)+i]); }
                if((i-minx)==2)
                { newcoords.push(((j-1)*10+i-1), (j*10)+i , universe[(j*10)+i]); }
                break;

                case 2:
             
                  if((i-minx)==0)
                  { newcoords.push(((j)*10+i+2),  (j*10)+i ,universe[(j*10)+i]); }
                  if((i-minx)==1)
                  { newcoords.push(((j-1)*10+i+1), (j*10)+i ,universe[(j*10)+i]); }
                  if((i-minx)==2)
                  { newcoords.push(((j-2)*10+i), (j*10)+i ,universe[(j*10)+i]); }
                  break;
            }
          }
      }
  }

while(newcoords.length > 0)
{
  colormatch = newcoords.pop();
  if(colormatch == 1)
  {
    uniexists.push(colormatch);
    oldcoords.push(newcoords.pop());
    newcord.push(newcoords.pop());
  }
  else
  {
    newcoords.pop()
    newcoords.pop()
  }
}


while(oldcoords.length > 0)
{
  colorcoord = oldcoords.pop();
  colormatch = unicolor[colorcoord];
  unicolor[colorcoord] = 0;
  universe[colorcoord] = 0;
}

while(newcord.length > 0)
{
  colorcoord = newcord.pop();
  unicolor[colorcoord] = colormatch;
  universe[colorcoord] = 1;
}



return false;
}

function down(gl, programInfo)
{
    var x;
    var y;
    var old = 0;
    var next = 0;
    var temp = [];
    var oldcoord = [];
    var newcoord = [];
    var colormatch;
    var colorcoord;
    
    for(var i = 199; i>=0; i--)
    {
        if(universe[i]==1)
        {
          temp.push(i);
        }
    }
    while(temp.length > 0)
    {
      old = temp.pop();
      x = old%10;
      y = (old-x)/10;
      y = y+1;
      next = (y*10)+x;
      if(universe[next] >= 0)
        {
          oldcoord.push(old);
          newcoord.push(next);
        }
      else
        {
          collision();
          oldcoord = [];
          newcoord = [];
          break;
        }
    }


    while(oldcoord.length > 0)
    {
      colorcoord = oldcoord.pop();
      colormatch = unicolor[colorcoord];
      unicolor[colorcoord] = 0;
      universe[colorcoord] = 0;
    }
    
    while(newcoord.length > 0)
    {
      colorcoord = newcoord.pop();
      unicolor[colorcoord] = colormatch;
      universe[colorcoord] = 1;
    }

    var positions = unitopos();
    var buffers = cubebuffer(gl, positions);

    drawboard(gl, programInfo, buffers, positions.length/2);
}


function deaduniverse()
{
  for(var i = 0; i < 200; i++)
  {
    if(universe[i] == 1)
    {
      universe[i] = -1;
    }
  }
}

function collision()
{
  deaduniverse();
  drawobject();
}

function left(gl, programInfo)
{
  var x;
  var y;
  var old = 0;
  var next = 0;
  var temp = [];
  var oldcoord = [];
  var newcoord = [];
  var colormatch;
  var colorcoord;
  
  for(var i = 199; i>=0; i--)
  {
      if(universe[i]==1)
      {
        temp.push(i);
      }
  }
  while(temp.length > 0)
  {
    old = temp.pop();
    x = old%10;
    y = (old-x)/10;
    x = x-1;
    next = (y*10)+x;
    if(x<0)
    {
      oldcoord = [];
      newcoord = [];
      break;
    }

    if(universe[next] >= 0)
    {
      oldcoord.push(old);
      newcoord.push(next);
    }
    else
    {
      collision();
      oldcoord = [];
      newcoord = [];
      break;
    }
  }
  
  while(oldcoord.length > 0)
  {
    colorcoord = oldcoord.pop();
    colormatch = unicolor[colorcoord];
    unicolor[colorcoord] = 0;
    universe[colorcoord] = 0;
  }
  
  while(newcoord.length > 0)
  {
    colorcoord = newcoord.pop();
    unicolor[colorcoord] = colormatch;
    universe[colorcoord] = 1;
  }

  var positions = unitopos();
  var buffers = cubebuffer(gl, positions);

  drawboard(gl, programInfo, buffers, positions.length/2);
}

function right(gl, programInfo)
{
  var x;
  var y;
  var old = 0;
  var next = 0;
  var temp = [];
  var oldcoord = [];
  var newcoord = [];
  var colormatch;
  var colorcoord;
  
  for(var i = 199; i>=0; i--)
  {
      if(universe[i]==1)
      {
        temp.push(i);
      }
  }
  while(temp.length > 0)
  {
    old = temp.pop();
    x = old%10;
    y = (old-x)/10;
    x = x+1;
    next = (y*10)+x;
    if(x>9)
    {
      oldcoord = [];
      newcoord = [];
      break;
    }

    if(universe[next] >= 0)
    {
      oldcoord.push(old);
      newcoord.push(next);
    }
    else
    {
      collision();
      oldcoord = [];
      newcoord = [];
      break;
    }
  }
  
    while(oldcoord.length > 0)
    {
      colorcoord = oldcoord.pop();
      colormatch = unicolor[colorcoord];
      unicolor[colorcoord] = 0;
      universe[colorcoord] = 0;
    }
    
    while(newcoord.length > 0)
    {
      colorcoord = newcoord.pop();
      unicolor[colorcoord] = colormatch;
      universe[colorcoord] = 1;
    }

  var positions = unitopos();
  var buffers = cubebuffer(gl, positions);

  drawboard(gl, programInfo, buffers, positions.length/2);
}





function unitopos()
{
    var positions =[];
    var x = 0;
    var y = 0;
    var temp = 0;
    for(var i = 0; i<200; i++)
    {
        if (universe[i] == 1||universe[i] == -1)
        {
            x = i%10;
            y = (i-x)/10;
            y = y*-1;


            temp = (x*0.1)-0.5;
            positions.push(temp);
            temp = (y*0.1)+1;
            positions.push(temp);

            temp = (x*0.1+0.1)-0.5;
            positions.push(temp);
            temp = (y*0.1)+1;
            positions.push(temp);

            temp = (x*0.1)-0.5;
            positions.push(temp);
            temp = (y*0.1-0.1)+1;
            positions.push(temp);

            temp = (x*0.1+0.1)-0.5;
            positions.push(temp);
            temp = (y*0.1-0.1)+1;
            positions.push(temp);
        }
    }
    return positions;
    
}

function cubebuffer(gl, positions) {

    // Create a buffer for the square's positions.
    var temp;
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.
    
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Now set up the colors for the vertices

    var colors = [];



    for(var temp = 0; temp<= unicolor.length;temp++)
    {
      if(unicolor[temp]>0)
      {
        colors.push(colorspace[unicolor[temp]*3-3], colorspace[unicolor[temp]*3-2], colorspace[unicolor[temp]*3-1], 1.0);
        colors.push(colorspace[unicolor[temp]*3-3], colorspace[unicolor[temp]*3-2], colorspace[unicolor[temp]*3-1], 1.0);
        colors.push(colorspace[unicolor[temp]*3-3], colorspace[unicolor[temp]*3-2], colorspace[unicolor[temp]*3-1], 1.0);
        colors.push(colorspace[unicolor[temp]*3-3], colorspace[unicolor[temp]*3-2], colorspace[unicolor[temp]*3-1], 1.0);
      }
    }
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      color: colorBuffer,
    };
  }

  function drawboard(gl, programInfo, buffers, vertices) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
  
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
  
    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-0.0, 0.0, -3.0]);  // amount to translate
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
  
    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexColor,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexColor);
    }
  
    // Tell WebGL to use our program when drawing
  
    gl.useProgram(programInfo.program);
  
    // Set the shader uniforms
  
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
  
    {
      const offset = 0;
      const vertexCount = 4;
      
      for(var i = 0; i < vertices/4; i++)
      {
        gl.drawArrays(gl.TRIANGLE_STRIP, offset+(i*4), vertexCount);
      }
    }
  }