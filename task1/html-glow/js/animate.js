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
		range=100,
		pfx = ['webkit','moz','MS','o',''];


	var PrefixedEvent = function(element,type,callback) {
		for (var p=0; p<pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
				element.addEventListener(pfx[p]+type, callback, false);
		}
	}

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

	PrefixedEvent(topAnim, 'AnimationIteration', function(e){randomizeGlow(topAnim, topLimits, range)});
	PrefixedEvent(leftAnim, 'AnimationIteration', function(e){randomizeGlow(leftAnim, leftLimits, 0)});
	PrefixedEvent(rightAnim, 'AnimationIteration', function(e){randomizeGlow(rightAnim, rightLimits, range)});
	PrefixedEvent(fourAnim, 'AnimationIteration', function(e){randomizeGlow(fourAnim, fourLimits, range)});
	PrefixedEvent(fiveAnim, 'AnimationIteration', function(e){randomizeGlow(fiveAnim, fiveLimits, range)});