	var topAnim = document.getElementById("top-anim"),
		leftAnim = document.getElementById("left-anim"),
		rightAnim = document.getElementById("right-anim"),
		fourAnim = document.getElementById("four-anim"),
		fiveAnim = document.getElementById("five-anim"),
		colors = ['red','blue','tan','green','purple'],
		topLimits = [-400,-600],
		leftLimits = [-200,-200],
		rightLimits = [-200,300],
		fourLimits = [-650,100],
		fiveLimits = [-600,600],
		range=100;

	var randomizeGlow = function(anim, limits, range) {
			anim.className = colors[ Math.floor(Math.random() * 5) ];
			newTop = Math.floor(Math.random()*range)+limits[0] + 'px';
			newLeft = Math.floor(Math.random()*range)+limits[1] + 'px';
			anim.style.top = newTop;
			anim.style.left = newLeft;
	}

	randomizeGlow(topAnim, topLimits, range);
	randomizeGlow(leftAnim, leftLimits, 0);
	randomizeGlow(rightAnim, rightLimits, range);
	randomizeGlow(fourAnim, fourLimits, range);
	randomizeGlow(fiveAnim, fiveLimits, range);

	window.setInterval('randomizeGlow(topAnim, topLimits)',6100) ;
	window.setInterval('randomizeGlow(leftAnim, leftLimits)',15000) ;
	window.setInterval('randomizeGlow(rightAnim, rightLimits)',8300) ;
	window.setInterval('randomizeGlow(fourAnim, fourLimits)',20200) ;
	window.setInterval('randomizeGlow(fiveAnim, fiveLimits)',12100) ;
