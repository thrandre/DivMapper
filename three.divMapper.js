THREE.DivMapper = function( camera, container ) {
				
	if( typeof( window.$ ) === "undefined" ) {
		console.error( "THREE.DivMapper is dependant upon jquery (http://jquery.com) or underscore (http://underscorejs.org/) to function. This may change in the future." );
		return;
	}
	
	if( !camera || !container ) {
		console.error( "Incorrect usage." );
		return;
	}
		
	var	fov, 
		wrapperDiv,
		cameraDiv, 
		mappings = [];
	
	var init = function() {
		wrapperDiv 	= $("<div></div>");
		cameraDiv 	= $("<div></div>");
		wrapperDiv.append( cameraDiv );
		container.append( wrapperDiv );
	};
	
	var setup = function() {
		fov = 0.5 / Math.tan( THREE.Math.degToRad( camera.fov * 0.5 ) ) * container.height();
		setWrapperStyle();
		setCameraStyle();
	};
	
	var epsilon = function ( value ) {
		return Math.abs( value ) < 0.000001 ? 0 : value;
	};
	
	var getCameraCSSMatrix = function () {
		var e = camera.matrixWorldInverse.elements;
		return "matrix3d(" +
			epsilon( e[ 0 ] ) 	+ "," +
			epsilon( -e[ 1 ] ) 	+ "," +
			epsilon( e[ 2 ] ) 	+ "," +
			epsilon( e[ 3 ] ) 	+ "," +
			epsilon( e[ 4 ] ) 	+ "," +
			epsilon( -e[ 5 ] ) 	+ "," +
			epsilon( e[ 6 ] ) 	+ "," +
			epsilon( e[ 7 ] ) 	+ "," +
			epsilon( e[ 8 ] ) 	+ "," +
			epsilon( -e[ 9 ] ) 	+ "," +
			epsilon( e[ 10 ] ) 	+ "," +
			epsilon( e[ 11 ] ) 	+ "," +
			epsilon( e[ 12 ] ) 	+ "," +
			epsilon( -e[ 13 ] ) + "," +
			epsilon( e[ 14 ] ) 	+ "," +
			epsilon( e[ 15 ] ) 	+
		")";
	};
	
	var getObjectCSSMatrix = function ( div, obj ) {
			var e = obj.matrixWorld.elements;
			var fx = obj.geometry.width / div.outerWidth();
			var fy = obj.geometry.height / div.outerHeight();
			return "translate3d(-50%, -50%, 0) matrix3d(" +
				epsilon( e[ 0 ] ) 	+ "," +
				epsilon( e[ 1 ] ) 	+ "," +
				epsilon( e[ 2 ] ) 	+ "," +
				epsilon( e[ 3 ] ) 	+ "," +
				epsilon( -e[ 4 ] ) 	+ "," +
				epsilon( -e[ 5 ] ) 	+ "," +
				epsilon( -e[ 6 ] ) 	+ "," +
				epsilon( -e[ 7 ] ) 	+ "," +
				epsilon( e[ 8 ] ) 	+ "," +
				epsilon( e[ 9 ] ) 	+ "," +
				epsilon( e[ 10 ] ) 	+ "," +
				epsilon( e[ 11 ] ) 	+ "," +
				epsilon( e[ 12 ] ) 	+ "," +
				epsilon( e[ 13 ] ) 	+ "," +
				epsilon( e[ 14 ] )	+ "," +
				epsilon( e[ 15 ] ) 	+ ")" + 
			" scale3d(" +
				epsilon( fx ) + "," +
				epsilon( fy ) + "," +
				"1" +
			")";
		}
	
	var setWrapperStyle = function() {
		wrapperDiv.css({
			"-webkit-perspective"			: fov + "px",
			"-webkit-transform-style"		: "preserve-3d", 
			"-webkit-perspective-origin"	: "50% 50%",
			"position"						: "absolute",
			"width"							: container.width() + "px",
			"height"						: container.height() + "px",
			"left"							: 0 + "px",
			"top"							: 0 + "px"
		});
	};
	
	var setCameraStyle = function() {
		cameraDiv.css({
			"-webkit-transform-style"		: "preserve-3d",
			"-webkit-transform-origin"		: "50% 50%",
			"-webkit-transform"				: "translate3d(0, 0, " + fov + "px)" + 
											  getCameraCSSMatrix() + " " +
											  "translate3d(" + ( wrapperDiv.width() / 2 ) + "px," + ( wrapperDiv.height() / 2 ) + "px, 0)",
			"width"							: wrapperDiv.width(),
			"height"						: wrapperDiv.height()
		});
	};
	
	var setObjectStyle = function( div, obj ) {
		div.css({
			"-webkit-transform"				: getObjectCSSMatrix( div, obj ),
			"-webkit-transform-style"		: "preserve-3d",
			"-webkit-transform-origin"		: "50% 50%",
			"-webkit-backface-visibility"	: "hidden",
			"position"						: "absolute"
		});
	};
	
	var map = function( div, obj ) {
		cameraDiv.append( div );
		mappings.push( { div: div, obj: obj } );
		update();
	};
	
	var update = function() {
		setWrapperStyle();
		setCameraStyle();
		
		for( var i in mappings ) {
			setObjectStyle( mappings[ i ].div, mappings[ i ].obj );
		}
	};
	
	init();
	setup();
	
	return {
		update	: update,
		map		: map
	};
	
};
