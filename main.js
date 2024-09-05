
document.addEventListener('keyup', keyup);

let x=-10
let z=27;

let heading =0;

let headingDelta = Math.PI / 60;

// Boundary checks using rectangular areas
const boundaryRectangles = [
  { minX: -14, maxX: -6, minZ: 5, maxZ: 27 },  // Covering area (-14,27) to (-6,5)
  { minX: -6, maxX: 5, minZ: 8, maxZ: 27 },    // Covering area (-6,8) to (5,8)
  { minX: 5, maxX: 15, minZ: 4, maxZ: 27 },    // Covering area (5,4) to (15,27)
  { minX: 0, maxX: 10, minZ: 12, maxZ: 18, isExclusion:true},    // Covering area (0,18) to (10,12)
];

function isWithinBoundaries(newX, newZ) {
  // Check if within any restricted area first
  const withinExclusion = boundaryRectangles.some(rect => rect.isExclusion && newX >= rect.minX && newX <= rect.maxX && newZ >= rect.minZ && newZ <= rect.maxZ);

  if (withinExclusion) {
    return false; // If within an exclusion zone, movement is not allowed
  }

  // Check if within any of the allowed outer boundaries
  return boundaryRectangles.some(rect => !rect.isExclusion && newX >= rect.minX && newX <= rect.maxX && newZ >= rect.minZ && newZ <= rect.maxZ);
}



function keyup(event) {
  let key = event.key;
  let newX = x, newZ = z;


  if(key == "ArrowUp") {
    newZ-=Math.cos(heading);
    newX-=Math.sin(heading);
  }
  else if(key == "ArrowDown") {
    newZ+=Math.cos(heading);
    newX+=Math.sin(heading);
  }

  // Apply new position if it is within the boundaries
  if (isWithinBoundaries(newX, newZ)) {
    x = newX;
    z = newZ;
  }

  if(key == "ArrowLeft") {
    heading += headingDelta;
  }
  else if(key == "ArrowRight") {
    heading -= headingDelta;
  }

  let viewpoint = document.getElementById("viewpoint");
  viewpoint.setAttribute("position", `${x} -2 ${z}`);
  viewpoint.setAttribute("orientation", `0 1 0 ${heading}`);
}





// Function to create and add a new house to the scene
function makeHouse(x, y, z) {
  // Create a transform element for the new house
  let houseTransform = document.createElement('transform');
  houseTransform.setAttribute('translation', `${x} ${y} ${z}`);
  houseTransform.setAttribute('DEF', 'NewHouse');

  // House Model Template
  houseTransform.innerHTML = `
  <group DEF='House'>

  <!-- Total Roof -->
  <group DEF="Roof">
  <!-- Main Roof -->
  <transform translation="-0.3 0.4 0.5">
    <shape>
      <appearance>
        <material diffuseColor='1 0 0'></material>
        <ImageTexture url='textures/roofTexture.jpeg'></ImageTexture>
      </appearance>
      <IndexedFaceSet coordIndex='
        0 1 2 -1
        3 4 5 -1
        0 3 5 2 -1
        2 5 4 1 -1
        1 4 3 0 -1
        ' solid='false'>
        <Coordinate point='
        0 0 -0.2
        0 0 -1
        0.4 0.5 -0.6
        1.4 0 -0.2
        1.4 0 -1
        1 0.5 -0.6
      '/>
      </IndexedFaceSet>
    </shape>
  </transform>

    <!-- Secondary Roof -->
  <transform translation="-0.3 0.4 0">
    <shape>
      <appearance>
        <material diffuseColor='1 0 0'></material>
        <ImageTexture url='textures/roofTexture.jpeg'></ImageTexture>
      </appearance>
      <IndexedFaceSet coordIndex='
        0 1 2 -1
        3 4 5 -1
        0 3 5 2 -1
        2 5 4 1 -1
        1 4 3 0 -1
        ' solid='false'>
        <Coordinate point='
        0 0 0
        0.6 0 0
        0.3 0.3 0
        0 0 0.6
        0.6 0 0.6
        0.3 0.3 0.4
      '/>
      <!-- <TextureCoordinate point='
      0.25 0.25
      0.75 0.25
      0.5 0.75
      0.25 0.25
      0.75 0.25
      0.5 0.75
    '/> -->
      </IndexedFaceSet>
    </shape>
  </transform>
</group>


<!-- Body of house -->
<group DEF="Body">
  <!-- Exterior walls -->
  <transform translation="0 0 0.05"> <!-- Adjusted to sit on the surface -->
    <shape>
        <appearance>
            <material diffuseColor='0.7 0.7 0.7'></material>
            <ImageTexture url='textures/brickTexture.jpeg'></ImageTexture>
        </appearance>
        <box size="0.6 0.8 0.9"></box>
    </shape>
  </transform>

  <!-- Second part of the house -->
  <transform translation="0.7 -0.15 -0.1"> <!-- Adjusted to sit on the surface uniformly -->
    <shape>
        <appearance>
            <material diffuseColor='0.7 0.7 0.7'></material>
            <ImageTexture url='textures/brickTexture.jpeg'></ImageTexture>
        </appearance>
        <box size='0.8 0.5 0.6'></box>
    </shape>
  </transform>
  <transform translation="0.7 0.25 -0.1"> <!-- Adjusted to sit on the surface uniformly -->
    <shape>
        <appearance>
            <material diffuseColor='0.7 0.7 0.7'></material>
            <ImageTexture url='textures/pebbledash.png'></ImageTexture>
        </appearance>
        <box size='0.8 0.3 0.6'></box>
    </shape>
  </transform>
  






  <!-- Front Door Group -->
  <group DEF="FrontDoor">

    <!-- Front Door Step Platform -->
  <group DEF="DoorPlatform">
    <transform translation="0.45 -0.325 0.3">
      <shape>
        <appearance>
          <material diffuseColor="gray"></material>
          <ImageTexture url='textures/concrete.jpeg'></ImageTexture>
        </appearance>
        <box size="0.3 0.05 0.2"></box>
      </shape>
    </transform>
  </group>
    <!-- Front Door Side Path -->
  <group DEF="SidePath">
    <transform translation="0.85 -0.37 0.25">
      <shape>
        <appearance>
          <material diffuseColor="gray"></material>
          <ImageTexture url='textures/concrete.jpeg'></ImageTexture>
        </appearance>
        <box size="0.6 0.05 0.15"></box>
      </shape>
    </transform>
  </group>

  <!-- Front Door -->
  <group DEF="Door">
    <transform translation="0.45 -0.15 0.2">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/IMG_1054.png'></ImageTexture>
        </appearance>
        <box size="0.3 0.4 0.01"></box>
      </shape>
    </transform>
  </group>

  <!-- Roof over front door -->
  <group DEF="DoorRoof">
    <transform translation="0.225 0.05 0.4">
      <shape>
        <appearance>
          <material diffuseColor='1 0 0'></material>
          <ImageTexture url='textures/roofTexture.jpeg'></ImageTexture>
        </appearance>
        <IndexedFaceSet coordIndex='
          0 1 2 -1
          3 4 5 -1
          0 3 5 2 -1
          2 5 4 1 -1
          1 4 3 0 -1
          ' solid='false'>
          <Coordinate point='
          0 0 0
          0 0 -0.2
          0 0.15 -0.2
          0.4 0 0
          0.4 0 -0.2
          0.3 0.15 -0.2
        '/>
        </IndexedFaceSet>
      </shape>
    </transform>
  </group>


</group>
  <group DEF="Windows">
    <transform translation="0.85 -0.1 0.2">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/window.png'></ImageTexture>
        </appearance>
        <box size="0.3 0.2 0.01"></box>
      </shape>
    </transform>
    <transform translation="0.85 0.25 0.2">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/window.png'></ImageTexture>
        </appearance>
        <box size="0.3 0.2 0.01"></box>
      </shape>
    </transform>

    <transform translation="0 -0.1 0.5">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/window.png'></ImageTexture>
        </appearance>
        <box size="0.3 0.2 0.01"></box>
      </shape>
    </transform>
    <transform translation="0 0.25 0.5">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/window.png'></ImageTexture>
        </appearance>
        <box size="0.3 0.2 0.01"></box>
      </shape>
    </transform>
    
    
    <transform translation="-0.3 0.25 0" rotation="0 1 0 1.5708">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/windowmini.png'></ImageTexture>
        </appearance>
        <box size="0.12 0.2 0.01"></box>
      </shape>
    </transform>
    <transform translation="-0.3 -0.1 0" rotation="0 1 0 1.5708">
      <shape>
        <appearance>
          <material diffuseColor="green"></material>
          <ImageTexture url='textures/windowmini.png'></ImageTexture>
        </appearance>
        <box size="0.12 0.2 0.01"></box>
      </shape>
    </transform>
  </group>
</group>

</group>
  `;

    // Select the "MainStructures" group by its DEF attribute
    let MainStruct = document.querySelector('group[DEF="MainStructures"]');

    // Append the new house to the "MainStructures" group
    if (MainStruct) {
      MainStruct.appendChild(houseTransform);
    } else {
      console.error('MainStructures group not found.');
    }
  }

  // Create instances of the house
  document.addEventListener('DOMContentLoaded', (event) => {
    makeHouse(0, 0, 0);
    makeHouse(2.5, 0, 0);
    makeHouse(-2.4, 0, 0);  
    makeHouse(-5, 0, 0);  
    makeHouse(5, 0, 0);  
  });

  




  // Function to animate the rear wheel
  function animateRearWheel() {
    var rearWheel = document.querySelector('[DEF="WheelAltering"]');
    if (!rearWheel) {
      console.error('Rear wheel not found');
      return;
    }
    var angle = 0; // Initial angle
    var axis = '0 0 1'; // Rotate about Z-axis

  function updateRotation() {
    angle = (angle + 1) % 360; // Increment angle, wrap at 360
    var rotation = axis + ' ' + (angle * Math.PI / 180).toFixed(4); // Convert to radians
    
    rearWheel.setAttribute('rotation', rotation);
    requestAnimationFrame(updateRotation);
  }

  updateRotation();
  setTimeout(function() {
    TransitionToViewpoint("-13.90423 0.18491 15.13339","-0.04718 -0.99782 -0.04619 1.5810");
  }, 5000);
}



// Transition movement animation for Camera (used to move camera behind car)
function TransitionToViewpoint(targetPosition, targetOrientation) {
  var viewpoint = document.querySelector('Viewpoint');

  var currentPosition = viewpoint.getAttribute('position').split(' ').map(Number);
  var currentOrientation = viewpoint.getAttribute('orientation').split(' ').map(Number);
  var targetPos = targetPosition.split(' ').map(Number);
  var targetOrient = targetOrientation.split(' ').map(Number);

  var step = 0.05; // Adjust speed of transition



  function updateViewpoint() {
    // Linearly interpolate position and orientation
    for (let i = 0; i < 3; i++) {
      currentPosition[i] += (targetPos[i] - currentPosition[i]) * step;
      currentOrientation[i] += (targetOrient[i] - currentOrientation[i]) * step;
    }
    currentOrientation[3] += (targetOrient[3] - currentOrientation[3]) * step;

    viewpoint.setAttribute('position', currentPosition.join(' '));
    viewpoint.setAttribute('orientation', currentOrientation.join(' '));

    // Check if close enough to the target position and orientation
    const positionClose = currentPosition.every((val, idx) => Math.abs(val - targetPos[idx]) < 0.01);
    const orientationClose = currentOrientation.every((val, idx) => Math.abs(val - targetOrient[idx]) < 0.01);

    if (!positionClose || !orientationClose) {
      requestAnimationFrame(updateViewpoint);
    }
  }

  updateViewpoint();
  setTimeout(addHeadlightLights, 3000);
}


function addHeadlightLights() {
  var scene = document.querySelector('Scene');

  // Define properties for the left headlight
  var leftLight = document.createElement('SpotLight');
  leftLight.setAttribute('DEF', 'LeftHeadlight');
  leftLight.setAttribute('location', '7.57417 -1.57376 9.58532'); // Position of the left headlight
  leftLight.setAttribute('direction', '10 -1.57376 4.58532'); // Direction pointing forward
  leftLight.setAttribute('intensity', '1');
  leftLight.setAttribute('beamWidth', '0.02');
  leftLight.setAttribute('cutOffAngle', '0.785398'); //  45 degrees

  // Define properties for the right headlight
  var rightLight = document.createElement('SpotLight');
  rightLight.setAttribute('DEF', 'RightHeadlight');
  rightLight.setAttribute('location', '7.57417 -1.57376 14.58532'); // Position of the right headlight
  rightLight.setAttribute('direction', '10 -1.57376 10.58532'); // Direction pointing forward
  rightLight.setAttribute('intensity', '1');
  rightLight.setAttribute('beamWidth', '0.2');
  rightLight.setAttribute('cutOffAngle', '0.785398'); //  45 degrees

  // Add the lights to the scene
  scene.appendChild(leftLight);
  scene.appendChild(rightLight);
}












