# DivMapper

DivMapper is a small plugin for three.js and it's main use is mapping HTML DIV-containers onto 3D-faces (I have primarily been using it for hidden planes) using CSS3DTransforms. The current version supports Chrome only (support for other browser are in progress).

## Usage

```javascript
// Set up mapping - inserts some new div-containers within the container div.
var mapper = new THREE.DivMapper( threeCamera, jqContainer );

// Create the mapping
mapper.map( jqDiv, threeObj );

// Update mapping
mapper.update();
```

To enable animations with three.js, update your animation function as follows:

```javascript
var animate = function() {
	requestAnimationFrame( animate );
	renderer.render( scene, threeCamera );
	mapper.update();
};
```

## Dependencies

The current version is dependant upon jquery/underscore (may change in the future) and three.js. For now, only Chrome is supported.