
// --------------------------------------------- //
// ------- 3D PONG built with Three.JS --------- //
// -------- Created by Nikhil Suresh ----------- //
// -------- Three.JS is by Mr. doob  ----------- //
// --------------------------------------------- //

// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight, arrowHelper;
var plane,flag1, x, flagp, flagc, flagt, velocity, fl, t, angle, a, dirx = [], diry = [], velx = [], vely = [], gf, valid = [], red_flag, b, temp, timer_flag, t;
var coin = [];
var hi = "hi";
// field variables
var fieldWidth = 300, fieldHeight = 300;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;

// game-related variables
var score;

// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup()
{
	// now reset player and opponent scores
	score = 100;
	flag1 = 0;
	fl = 0;
	flagc = 0;
	flagp = 0;
	flagt = 0;
	gf = 1;
	velocity = 5;
	red_flag = 0;
	temp = 0;
	timer_flag = 0;
	for(var i = 0;i < 10;i ++)
	{
		velx[i] = 0;
		vely[i] = 0;
		dirx[i] = 0;
		diry[i] = 0;
		valid[i] = 1;
	}
	// set up all the 3D objects in the scene
	createScene();

	// and let's get cracking!

	draw();
}

function arrow()
{
	var dir = new THREE.Vector3( Math.sin(temp), Math.cos(temp), 0 );
	var origin = new THREE.Vector3( coin[0].position.x, coin[0].position.y, coin[0].position.z+0.1 );
	var length = 50;
	var hex = 0x000000;

	arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
	arrowHelper.rotation.z = temp;
	scene.add(arrowHelper);
}

function createScene()
{
	// set the scene size
	var WIDTH = 1000,//640
	  HEIGHT = 600;//360

	// set some camera attributes
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);

	// set a default position for the camera
	// not doing this somehow messes up shadow rendering
	view_top();

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;

	// create the paddle1's material
	var paddle1Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x1B32C0
		});
	// create the paddle2's material
	var paddle2Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xFF4045
		});
	// create the plane's material
	var planeMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xCC6600
		});
	// create the table's material
	var tableMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x111111
		});
	// create the pillar's material
	var pillarMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x534d0d
		});
	// create the ground's material
	var groundMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x888888
		});


	// create the playing surface plane
	plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight * 0.90,
		planeQuality,
		planeQuality),

	  planeMaterial);

	scene.add(plane);

//	plane.receiveShadow = true;
var planeMaterial1 =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x000000
		});
	var plane1 = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.75,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight * 0.70,
		planeQuality,
		planeQuality),

	  planeMaterial1);
	plane1.position.z = plane.position.z + 0.5;
	scene.add(plane1);
	var plane2 = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.74,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight * 0.69,
		planeQuality,
		planeQuality),

	  planeMaterial);
	plane2.position.z = plane.position.z + 0.6;
	scene.add(plane2);

	var table = new THREE.Mesh(

	  new THREE.CubeGeometry(
		planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
		planeHeight * 1.03,
		100,				// an arbitrary depth, the camera can't see much of it anyway
		planeQuality,
		planeQuality,
		1),

	  tableMaterial);
	table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	scene.add(table);
	// // set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;

	paddle1 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle1Material);

	// // add the sphere to the scene
//	scene.add(paddle1);
//	paddle1.receiveShadow = true;
//    paddle1.castShadow = true;

	paddle2 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle2Material);

	// // add the sphere to the scene
//	scene.add(paddle2);
//	paddle2.receiveShadow = true;
//    paddle2.castShadow = true;

	// set paddles on each side of the table
	paddle1.position.x = -fieldWidth/2 + paddleWidth;
	paddle2.position.x = fieldWidth/2 - paddleWidth;

	// lift paddles over playing surface
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
	var material = new THREE.MeshBasicMaterial({
		color: 0x0000ff
	});

	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the left
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  30,
		  300,
		  1,
		  1,
		  1 ),

		  pillarMaterial);

		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = 230;
		backdrop.position.z = -30;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;
//		scene.add(backdrop);
	}
	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the right
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  30,
		  300,
		  1,
		  1,
		  1 ),

		  pillarMaterial);

		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = -230;
		backdrop.position.z = -30;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;
//		scene.add(backdrop);
	}

	// finally we finish by adding a ground plane
	// to show off pretty shadows
	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry(
	  1000,
	  1000,
	  3,
	  1,
	  1,
	  1 ),

	  groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
	ground.position.z = -132;
//	ground.receiveShadow = true;
	scene.add(ground);

	// // create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	// add to the scene
	scene.add(pointLight);

	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
//    scene.add(spotLight);

	var circleMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000
	});
    	var radius = 40;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	scene.add( circle );
	var circleMaterial1 = new THREE.MeshBasicMaterial({
	color: 0xCC6600
	});
	var radius = 39;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial1);
	circle.position.z = plane.position.z + 1.1;
	scene.add( circle );
	//1
    	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = 130;
	circle.position.y = 123;
	scene.add( circle );
//2
	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = 130;
	circle.position.y = -123;
	scene.add( circle );
//3
	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = -130;
	circle.position.y = 123;
	scene.add( circle );
//4
	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = -130;
	circle.position.y = -123;
	scene.add( circle );

	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = 104;
	circle.position.y = 95;
	scene.add( circle );

	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = 104;
	circle.position.y = -95;
	scene.add( circle );

	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = -104;
	circle.position.y = 95;
	scene.add( circle );

	var radius = 10;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial);
	circle.position.z = plane.position.z + 1;
	circle.position.x = -104;
	circle.position.y = -95;
	scene.add( circle );
	//--
	var radius = 9;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial1);
	circle.position.z = plane.position.z + 1.1;
	circle.position.x = -104;
	circle.position.y = -95;
	scene.add( circle );

	var radius = 9;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial1);
	circle.position.z = plane.position.z + 1.1;
	circle.position.x = 104;
	circle.position.y = -95;
	scene.add( circle );

	var radius = 9;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial1);
	circle.position.z = plane.position.z + 1.1;
	circle.position.x = -104;
	circle.position.y = 95;
	scene.add( circle );

	var radius = 9;
	var segments = 100;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, circleMaterial1);
	circle.position.z = plane.position.z + 1.1;
	circle.position.x = 104;
	circle.position.y = 95;
	scene.add( circle );

	var geometry = new THREE.CylinderGeometry( 12, 12, 1, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
	coin[0] = new THREE.Mesh( geometry, material );
	coin[0].rotation.x = 3.14/2;
	coin[0].position.set(0,-92,plane.position.z + 1.2);

	scene.add( coin[0] );

/*	var dir = new THREE.Vector3( 0, 1, 0 );
	var origin = new THREE.Vector3( coin[0].position.x, coin[0].position.y, coin[0].position.z+0.1 );
	var length = 50;
	var hex = 0x000000;

	arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
	scene.add(arrowHelper);
*/
	//coins-

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x383838} );
	coin[1] = new THREE.Mesh( geometry, material );
	coin[1].rotation.x = 3.14/2;
	coin[1].position.set(-24,19,plane.position.z + 1.2);
	scene.add( coin[1] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x383838} );
	coin[2] = new THREE.Mesh( geometry, material );
	coin[2].rotation.x = 3.14/2;
	coin[2].position.set(24,19,plane.position.z + 1.2);
	scene.add( coin[2] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x383838} );
	coin[3] = new THREE.Mesh( geometry, material );
	coin[3].rotation.x = 3.14/2;
	coin[3].position.set(-24,-19,plane.position.z + 1.2);
	scene.add( coin[3] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x383838} );
	coin[4] = new THREE.Mesh( geometry, material );
	coin[4].rotation.x = 3.14/2;
	coin[4].position.set(24,-19,plane.position.z + 1.2);
	scene.add( coin[4] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	coin[5] = new THREE.Mesh( geometry, material );
	coin[5].rotation.x = 3.14/2;
	coin[5].position.set(0,31,plane.position.z + 1.2);
	scene.add( coin[5] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	coin[6] = new THREE.Mesh( geometry, material );
	coin[6].rotation.x = 3.14/2;
	coin[6].position.set(0,-31,plane.position.z + 1.2);
	scene.add( coin[6] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	coin[7] = new THREE.Mesh( geometry, material );
	coin[7].rotation.x = 3.14/2;
	coin[7].position.set(31,0,plane.position.z + 1.2);
	scene.add( coin[7] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	coin[8] = new THREE.Mesh( geometry, material );
	coin[8].rotation.x = 3.14/2;
	coin[8].position.set(-31,0,plane.position.z + 1.2);
	scene.add( coin[8] );

	var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xee0000} );
	coin[9] = new THREE.Mesh( geometry, material );
	coin[9].rotation.x = 3.14/2;
	coin[9].position.set(0,0,plane.position.z + 1.2);
	scene.add( coin[9] );
	// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;
}

function reset()
{
	temp = 0;
	coin[0].position.set(0,-92,plane.position.z + 1.2);
	arrow();
	fl = 0;
	for(var i = 0;i < 10; i++)
	{
		if(valid[i] == 0)
			continue;
		velx[i] = 0;
		vely[i] = 0;
		dirx[i] = 0;
		diry[i] = 0;
	}
	if (red_flag == 2)
	{
		red_flag = 0;
		if(b == 0)
		{
			var geometry = new THREE.CylinderGeometry( 8, 8, 5, 100 );
			var material = new THREE.MeshBasicMaterial( {color: 0xee0000} );
			coin[9] = new THREE.Mesh( geometry, material );
			coin[9].rotation.x = 3.14/2;
			coin[9].position.set(0,0,plane.position.z + 1.2);
			scene.add( coin[9] );
			valid[9] = 1;
			velx[9] = 0;
			vely[9] = 0;
			dirx[9] = 0;
			diry[9] = 0;
		}
		else
		{
			score += 20;
			document.getElementById("scores").innerHTML = "score =" + score;
		}
	}
	else if(red_flag == 1)
	{
		red_flag ++;
	}
	b = 0;
}

function draw()
{
	timer();
	if(gf)
	{
		reset();
		gf = 0;
	}
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);

	strikerPhysics();
	keyboard_controls();
	check_wall_collision();
	move();
	check_collision();
	if(fl)
		check_movement();
	check_hole();
	for(var i = 1; i<10 ; i++)
	{
		if(valid[i] == 1)
			break;
		else if(valid[9] == 0)
			return;
	}

//	ballPhysics();
//	paddlePhysics();
//	cameraPhysics();
//	playerPaddleMovement();
//	opponentPaddleMovement();
}

function keyboard_controls()
{
	if(Key.isDown(Key.UP) /*&& velocity < 5*/ && !fl)
		velocity += 0.1;
	else if(Key.isDown(Key.DOWN) /*&& velocity > 0*/ && !fl)
		velocity -= 0.1;
	else if (Key.isDown(Key.P))
		view_player();
	else if(Key.isDown(Key.T))
		view_top();
	else if(Key.isDown(Key.A) /*&& arrowHelper.rotation.z > -3.14*/ && !fl)
	{
		temp -= 0.01;
//		console.log(arrowHelper.rotation.z);
//		arrowHelper.rotation.z -= 0.01;
		scene.remove(arrowHelper);
		arrow();
	}
	else if(Key.isDown(Key.D) /*&& arrowHelper.rotation.z < 3.14*/ && !fl)
	{
		temp += 0.01;
//		arrowHelper.rotation.z += 0.01;
		scene.remove(arrowHelper);
		arrow();
	}
	else if(Key.isDown(Key.S))
	{
//		scene.remove(arrowHelper);
		fl = 1;
//		t = 0.01;
//		a = arrowHelper.rotation.z;
//		angle = 90 - a;
//		angle = a;
		if (arrowHelper.rotation.z < 0)
			dirx[0] = -1;
		else
			dirx[0] = 1;
		diry[0] = 1;
		var re = arrowHelper.rotation.z;
		var angle = arrowHelper.rotation.z - (Math.floor(/*arrowHelper.rotation.z/6.28*/re/6.28)*6.28);
		console.log(angle);
		console.log(angle);
//		console.log(arrowHelper.rotation.z);
		if(arrowHelper.rotation.z < 0)
		{
			velx[0] = velocity * Math.cos(3.14/2 + arrowHelper.rotation.z/* Math.PI/180*/);
			vely[0] = velocity * Math.sin(3.14/2 + arrowHelper.rotation.z/* Math.PI/180*/);
		}
		else
		{
			velx[0] = velocity * Math.cos(3.14/2 - arrowHelper.rotation.z/* Math.PI/180*/);
			vely[0] = velocity * Math.sin(3.14/2 - arrowHelper.rotation.z/* Math.PI/180*/);
		}
		scene.remove(arrowHelper);
		if(velx < 0)
		{
			velx[0] = -velx[0];
			dirx[0] = -1;
		}
		if(vely < 0)
		{
			vely[0] = -vely[0];
			diry[0] = -1;
		}
	}
	else if(Key.isDown(Key.W))
		view_coin();
	/*else if(Key.isDown(Key.ENTER) && flag1)
	{
		flag1 = 0;
//	}*/
}

function timer()
{
	var th;
	if(!timer_flag)
	{
		t = new Date().getSeconds();
		timer_flag = 1;
	}
	th = new Date().getSeconds();
	if(t < 56)
	{
		if(th - t == 5)
		{
			timer_flag = 0;
			score -= 1;
			document.getElementById("scores").innerHTML = "score =" + score;
		}
	}
	else if(60 + th - t == 5)
	{
		timer_flag = 0;
		score -= 1;
		document.getElementById("scores").innerHTML = "score =" + score;
	}
}

function strikerPhysics()
{
	if (!flag1)
	{
		if (Key.isDown(Key.RIGHT) && coin[0].position.x < (fieldWidth * 0.75/2 - 10))
		{
			coin[0].position.x ++;
			arrowHelper.position.x ++;
			if(flagc)
			{
				camera.position.x = coin[0].position.x;
				camera.position.y = coin[0].position.y - 100;
				camera.position.z = coin[0].position.z + 100;
			}
		}
		else if (Key.isDown(Key.LEFT) && coin[0].position.x > -(fieldWidth * 0.75/2 - 10))
		{
			coin[0].position.x --;
			arrowHelper.position.x --;
			if(flagc)
			{
				camera.position.x = coin[0].position.x;
				camera.position.y = coin[0].position.y - 100;
				camera.position.z = coin[0].position.z + 100;
			}
		}
		else if (Key.isDown(Key.ENTER))
		{
			flag1 = 1;
		}
	}
}

function view_top()
{
	if (!flagt)
	{
		flagt = 1;
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 320;
	}
	if (flagp)
	{
		flagp = 0;
		camera.rotation.x -= 50 * Math.PI/180;
	}
	else if(flagc)
	{
		flagc = 0;
		camera.rotation.x -= 60 * Math.PI/180;
	}
}

function view_player()
{
	flagt = 0;
	if(flagc)
	{
		flagc = 0;
		camera.rotation.x -= 60 * Math.PI/180;
	}
	if (!flagp)
	{
		flagp = 1;
		camera.position.x = 0;
		camera.position.y = -320;
		camera.position.z = 250;

//	camera.rotation.y =
		camera.rotation.x = 50 * Math.PI/180;
//	camera.rotation.z =
	}
}

function view_coin()
{
	flagt = 0;
	if(flagp)
	{
		flagp = 0;
		camera.rotation.x -= 50 * Math.PI/180;
	}
	if(!flagc)
	{
		flagc = 1;
		camera.position.x = coin[0].position.x;
		camera.position.y = coin[0].position.y - 100;
		camera.position.z = coin[0].position.z + 100;
		camera.rotation.x = 60 * Math.PI/180;
	}
}

function check_collision()
{
	var i,j;
	for (i = 0;i < 9;i++)
	{
		if(valid[i] == 0)
			continue;
		for(j = i+1;j < 10;j++)
		{
			if(valid[j] == 0)
				continue;
			var dis;
			var m1 = 2, m2 = 2;
			if(i == 0)
				dis = 20;
			else
				dis = 16;
			if(Math.sqrt(Math.pow((coin[i].position.x - coin[j].position.x),2)+Math.pow((coin[i].position.y - coin[j].position.y),2)+Math.pow((coin[i].position.z - coin[j].position.z),2)) <= dis/* && Math.sqrt(Math.pow((coin[i].position.x - coin[j].position.x),2)+Math.pow((coin[i].position.y - coin[j].position.y),2)+Math.pow((coin[i].position.z - coin[j].position.z),2)) <= dis + 1*/)
			{
				if (i == 0)
					m1 = 10;
				var vx1 = velx[i], vy1 = vely[i], vx2 = velx[j], vy2 = velx[j];
				velx[i] = (m1 - m2)/(m1 + m2)*vx1*dirx[i] + 2*m2/(m1+m2)*vx2*dirx[j];
				vely[i] = (m1 - m2)/(m1 + m2)*vy1*diry[i] + 2*m2/(m1+m2)*vy2*diry[j];
				velx[j] = (2*m1)/(m1+m2)*vx1*dirx[i] + (m2 - m1)/(m1 + m2)*vx2*dirx[j];
				vely[j] = (2*m1)/(m1+m2)*vy1*diry[i] + (m2 - m1)/(m1 + m2)*vy2*diry[j];
//				console.log(vely[j]);
				dirx[i] = 1;
				diry[i] = 1;
				dirx[j] = 1;
				diry[j] = 1;
				if(velx[i] < 0)
				{
					velx[i] = -velx[i];
					dirx[i] = -1;
				}
				if(vely[i] < 0)
				{
					vely[i] = -vely[i];
					diry[i] = -1;
				}
				if(velx[j] < 0)
				{
					velx[j] = -velx[j];
					dirx[j] = -1;
				}
				if(vely[j] < 0)
				{
					vely[j] = -vely[j];
					diry[j] = -1;
				}
			}
				//;

		}
	}
}

function check_movement()
{
	for(var i = 0;i < 10;i++)
	{
		if(valid[i] == 0)
			continue;
		if(Math.abs(velx[i]) < 0.5 && Math.abs(vely[i]) < 0.5);
		else
			return;
	}
	reset();
}

function check_wall_collision()
{
	var i;
	for (i = 0; i < 10; i++)
	{
		if(valid[i] == 0)
			continue;
		if (i == 0)
			dis = 12;
		else
			dis = 8;
		if (coin[i].position.x >= fieldWidth * 0.95/2 - dis)
		{
			coin[i].position.x = fieldWidth * 0.95/2 - dis;
//			angle = 180 - a;
//			t = 0.01;
//			fl = 1;
			dirx[i] = -dirx[i];
		}
		else if(coin[i].position.x <= -(fieldWidth * 0.95/2 - dis))
		{
			coin[i].position.x = -(fieldWidth * 0.95/2 - dis);
//			angle = -a;
//			t = 0.01;
//			fl = 1;
			dirx[i] = -dirx[i];
		}
		else if(coin[i].position.y >= fieldHeight * 0.90/2 - dis)
		{
			coin[i].position.y = fieldHeight * 0.90/2 - dis;
//			angle = 180 + a;
//			t = 0.01;
//			fl = 1;
			diry[i] = -diry[i];
		}
		else if(coin[i].position.y <= -(fieldHeight * 0.90/2 - dis))
		{
			coin[i].position.y = -(fieldHeight * 0.90/2 - dis);
//			angle = a;
//			t = 0.01;
//			fl = 1;
			diry[i] = -diry[i];
		}
	}
}

function check_hole()
{
	for(i = 0; i<10 ;i++)
	{
		if(valid[i] == 0)
			continue;
		if(Math.sqrt(Math.pow(coin[i].position.x - 130,2)+Math.pow(coin[i].position.y -123,2)) <= 10)
		{
//			console.log(valid[0]);
			if(i != 0)
			{
				valid[i] = 0;
				if(i >=1 && i <= 4)
				{
					b++;
					score += 5;
					document.getElementById("scores").innerHTML = "score =" + score;
				}
				else if(i >= 5 && i <= 8)
				{
					score -= 20;
					document.getElementById("scores").innerHTML = "score =" + score;
				}
				else if(i == 9)
				{
					red_flag = 1;
				}
				scene.remove(coin[i]);
//				console.log(score);
			}
		}
		else if(Math.sqrt(Math.pow(coin[i].position.x - 130,2)+Math.pow(coin[i].position.y + 123,2)) <= 10)
		{
			if(i != 0)
			{
//				console.log(valid[0]);
				valid[i] = 0;
				if(i >=1 && i <= 4)
				{
					b++;
					score += 5;
					document.getElementById("scores").innerHTML = "score =" + score;
				}
				else if(i >=5 && i <= 8)
				{
					score -= 20;
					document.getElementById("scores").innerHTML = "score =" + score;
				}
				else if(i == 9)
				{
					red_flag = 1;
				}
				scene.remove(coin[i]);
//				console.log(score);
			}
		}
		else if(Math.sqrt(Math.pow(coin[i].position.x + 130,2)+Math.pow(coin[i].position.y - 123,2)) <= 10)
		{
			if(i != 0)
			{
//				console.log(valid[0]);
				valid[i] = 0;
				if(i >=1 && i <= 4)
				{
					b++;
					score += 5;
					document.getElementById("scores").innerHTML = "score = " + score;
				}
				else if(i >=5 && i <= 8)
				{
					score -= 20;
					document.getElementById("scores").innerHTML = "score = " + score;
				}
				else if(i == 9)
				{
					red_flag = 1;
				}
				scene.remove(coin[i]);
//				console.log(score);
			}
		}
		else if(Math.sqrt(Math.pow(coin[i].position.x + 130,2)+Math.pow(coin[i].position.y + 123,2)) <= 10)
		{
			if(i != 0)
			{
//				console.log(valid[0]);
				valid[i] = 0;
				if(i >=1 && i <= 4)
				{
					b++;
					score += 5;
					document.getElementById("scores").innerHTML = "score = " + score;
				}
				else if(i >=5 && i <= 8)
				{
					score -= 20;
					document.getElementById("scores").innerHTML = "score = " + score;
				}
				else if(i == 9)
				{
					red_flag = 1;
				}
				scene.remove(coin[i]);
//				console.log(score);
			}
		}
	}
	if(Math.sqrt(Math.pow(coin[0].position.x - 130,2)+Math.pow(coin[0].position.y -123,2)) <= 18)
		{
			score -= 20;
			document.getElementById("scores").innerHTML = "score = " + score;
//			console.log(score);
			reset();
		}
	else if(Math.sqrt(Math.pow(coin[0].position.x - 130,2)+Math.pow(coin[0].position.y + 123,2)) <= 18)
	{
		score -= 20;
		document.getElementById("scores").innerHTML = "score = " + score;
//		console.log(score);
		reset();
	}
	else if(Math.sqrt(Math.pow(coin[0].position.x + 130,2)+Math.pow(coin[0].position.y - 123,2)) <= 18)
	{
		score -= 20;
		document.getElementById("scores").innerHTML = "score = " + score;
//		console.log(score);
		reset();
	}
	else if(Math.sqrt(Math.pow(coin[0].position.x + 130,2)+Math.pow(coin[0].position.y + 123,2)) <= 18)
	{
		score -= 20;
		document.getElementById("scores").innerHTML = "score = " + score;
//		console.log(score);
		reset();
	}
}

function move()
{
//	coin[0].position.x += velocity*Math.cos(angle * Math.PI/180);//*t;
//	coin[0].position.y += velocity*Math.sin(angle * Math.PI/180);//*t;
//	t += 0.01;
	for(var i = 0; i < 10; i++)
	{
		coin[i].position.x += (velx[i]) * dirx[i];
		coin[i].position.y += (vely[i])* diry[i];
		if(i != 0);
//		console.log(vely[i]);
		if(velx[i] > 0)
			velx[i] -= 0.01;
		else
			velx[i] = 0;
		if(vely[i] > 0)
			vely[i] -= 0.01;
		else
			vely[i] = 0;
	}

//	console.log(coin[0].position.x);
//	console.log(coin[0].position.y);
}
