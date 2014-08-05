	var leftAnim = document.getElementById("left-anim"),
		rightAnim = document.getElementById("right-anim"),
		colors = ['red','blue','tan','green','purple'],
		leftLimits = [-300,-300],
		rightLimits = [-200,500],
		range=200;

	var randomizeGlow = function(anim, limits) {
			anim.className = colors[ Math.floor(Math.random() * 5) ];
			newTop = Math.floor(Math.random()*range)+limits[0] + 'px';
			newLeft = Math.floor(Math.random()*range)+limits[1] + 'px';
			anim.style.top = newTop;
			anim.style.left = newLeft;
	}

	randomizeGlow(leftAnim, leftLimits);
	randomizeGlow(rightAnim, rightLimits);

	window.setInterval('randomizeGlow(leftAnim, leftLimits)',3000) ;
	window.setInterval('randomizeGlow(rightAnim, rightLimits)',4000) ;
