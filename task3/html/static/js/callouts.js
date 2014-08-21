var r = Raphael('callout-canvas', 1009, 800),
		originT = $('#callout-canvas').offset().top , 
		originL = $('#callout-canvas').offset().left ,
		htops = [] ,
		hlefts = [] ,
		hwidth = [] ,
		ctops = [] ,
		clefts = [] ,
		lines = [] ,
		length = 5;

var connectCallouts = function() {

	//Find absolute positions
	$('.social-content').not('.socialcorrect').find('.social-highlight').each(function() {
		htops.push($(this).offset().top - originT + 1);
		hlefts.push($(this).offset().left - originL + 1);
		hwidth.push($(this).width());
	});
	$('.social-callout').each(function() {
		ctops.push($(this).offset().top - originT + 1);
		clefts.push($(this).offset().left - originL + 1);
	});
	//END

	//Find correct corner for left hand elements
	if (hlefts[0] < clefts[0]) {
		for (var i = 0; i < length; i++) {
			hlefts[i] += hwidth[i];
		};
	} else {
		for (var i = 0; i < length; i++) {
			clefts[i] += 391;
		};
	};
	//END

	//Draw lines in raphael
	for (var i = 0; i < length; i++) {
		lines.push(r.path('M' + clefts[i] + ' ' + ctops[i]))
		lines[i].attr({stroke: '#ffcc00', 'stroke-width': 2})
		lines[i].animate({path:'M' + clefts[i] + ' ' + ctops[i] + ' L' + hlefts[i] + ' ' + htops[i]}, 2000)
	};
	//END

}


var resetScrolls = function() {
	$('.social-container').animate({scrollTop: '0'},2000)
};


