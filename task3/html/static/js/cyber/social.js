;(function(undefined){

var socialApp = angular.module('socialApp', [])

socialApp.controller('corpChallengeSocialController', [
        '$scope', 'userService', 'socialService', 'progressService', '$stateParams', 
function($scope, us, ss, ps, $stateParams) {

    var lvl_id = $stateParams.level,
        puz_id = $stateParams.puzzle,
        puzzle_number = Number(puz_id) + 3 * ( Number(lvl_id) - 1 )

    logit("the puzzle_number = " + puzzle_number)
    logit("the current state level = " + lvl_id + " and puzzle =  " + puz_id)

    us.set_puzzle(puz_id, "social")
    $scope.$parent.level_id = lvl_id
    $scope.$parent.puzzle_id = puz_id
    $scope.$parent.puzzle_id_next = Number(puz_id) + 1
    $scope.$parent.challenge = 'social'
    $scope.puzzle_number = puzzle_number
    ss.get_puzzle_data(lvl_id, puz_id).success(function(data){
        logit("got the data for social from the database! " + data + " for level " + lvl_id + " and puzzle " + puz_id )
        $scope.puzzle_data = data
        $scope.puzzle_state = ss.get_puzzle_state()
        initPuzzle() // needs to be called after $scope.puzzle_state is filled
        logit("The instructions = " + $scope.puzzle_data.instructions)
    }).error(function(data){
        logit("got error on retrieving social puzzle data: " + data)
    })

    $scope.narrativeDone = true
    if (lvl_id == 1 && puz_id == 1){
        $scope.narrativeSlug = 'social_intro'
        $scope.narrativeDone = false
    } else if (lvl_id == 3 && puz_id == 3) $scope.narrativeSlug = 'social_outro'

    // functions from the service pulled up to here 

    $scope.highlight_click = function(index) {
        logit("received a click for index = " + index)
        if (!$scope.puzzle_data.diffs[index].found && !$scope.puzzle_state.diff_failed) {
            $scope.puzzle_state.user_clicks++
            $scope.puzzle_data.diffs[index].found = true
            $scope.puzzle_state.diff_complete = ( howManyFound() == $scope.puzzle_state.clicks_to_complete )
            logit("Found " + howManyFound() + " of " + $scope.puzzle_state.clicks_to_complete)  
            $scope.puzzle_state.diff_failed = !$scope.puzzle_state.diff_complete && ( $scope.puzzle_state.user_clicks >= $scope.puzzle_state.user_click_max )  
            if ($scope.puzzle_state.diff_complete) {
                $scope.puzzle_state.stars = 1
            }
        }
    }

    $scope.wrong_click = function() {
        if ($scope.puzzle_state.diff_complete) {return}
        $scope.puzzle_state.user_clicks++
        $scope.puzzle_state.diff_failed = ( $scope.puzzle_state.user_clicks >= $scope.puzzle_state.user_click_max )
        if ($scope.puzzle_state.user_clicks > $scope.puzzle_state.user_click_max) {$scope.puzzle_state.user_clicks=$scope.puzzle_state.user_click_max}
    }

    $scope.start_fake = function() {
        logit("start_fake")
        $scope.puzzle_state.fake_start = true
        if ($scope.puzzle_data.type == "audio") {
            $scope.puzzle_state.objective = ""
        } else {
            $scope.puzzle_state.objective = $scope.puzzle_data.instructions_fake       
        }
    }

    $scope.select_fake = function(index) {
        logit("select_fake, index= " +index)
        if ($scope.puzzle_data.phish[index].fake) {
            logit("You got it right")
            $scope.puzzle_state.fake_pass = true
            $scope.puzzle_state.stars++
        } else {
            logit("You got it wrong")
        }
        $scope.puzzle_state.fake_start = false
        $scope.puzzle_state.fake_complete = true
        $scope.$parent.cur_stars = $scope.puzzle_state.stars
    }

    $scope.select_audio_fake = function(bFake) {
        logit("The user's fake choice for this audio = " + bFake)
        if ($scope.puzzle_data.phish[0].fake == bFake) {
            logit("You got it right")
            $scope.puzzle_state.fake_pass = true
            $scope.puzzle_state.stars++
        } else {
            logit("You got it wrong")
        }
        $scope.puzzle_state.fake_start = false
        $scope.puzzle_state.fake_complete = true
        $scope.$parent.cur_stars = $scope.puzzle_state.stars
    }

    $scope.end_fake = function() {
        logit("end_fake")
        $scope.$parent.challengeDone()
        $scope.puzzle_state.fake_complete = false
        $scope.puzzle_state.complete = true
        $scope.puzzle_state.objective = $scope.puzzle_data.instructions_highlight_end
        $scope.$parent.isDone = true
    }

    $scope.finish = function() {
        
        if (lvl_id == 3 && puz_id == 3){
            $scope.narrativeDone = false
        }

        $scope.$parent.isDone = true
        // add anything else that you want on the parent popup
    }

    $scope.replay = function() {
        logit('replay')
        $scope.$parent.isDone = false
        $scope.puzzle_state = ss.get_puzzle_state()
        initPuzzle() // needs to be called after $scope.puzzle_state is filled 
    }

    function howManyFound() {
        var i, count=0
        for (i=0; i<$scope.puzzle_state.clicks_to_complete; i++) {
            if ($scope.puzzle_data.diffs[i].found == true) {
                count++
            }
        }
        return count
    } 

    function initPuzzle() {
        // this is used to set some of the state vars that require the data to be returned
        var cc = $scope.puzzle_data.diffs.length
        $scope.puzzle_state.clicks_to_complete = cc
        $scope.puzzle_state.user_click_max = 2 * cc
        var i
        for (i=0; i<cc; i++) {
            $scope.puzzle_data.diffs[i].found = false
        }
        $scope.puzzle_state.objective = $scope.puzzle_data.instructions
    } 

        // **** temp producer functionality to measure drop zones

                    document.onmousedown = startdrag; // in NS this prevents cascading of events, thus disabling text selection
                    document.onmousemove = drag;
                    document.onmouseup = drop;

                    var mousex = 0, mousey =0, algor = 0,
                    xstart = 0,
                    ystart = 0,
                    xstop = 0,
                    ystop = 0,
                    xoff = 0,
                    yoff = 0,
                    bcalibrate = false,
                    bcalibrate_started = false


                    function drop() {
                        if (!bcalibrate_started) {return}
                        logit("drop")
                        var pos = getMouseXY()
                        xstop = pos.x -xoff;
                        ystop = pos.y -yoff;
                        var json = "{ x:" + xstart + ", y:" + ystart + ", w:" + (xstop-xstart) + ", h:" + (ystop-ystart) + " } "
                        logit("The position = " +json)
                        $scope.puzzle_state.highlight_json += json
                    }

                    function drag() {

                    }

                    function startdrag() {

                        if (bcalibrate) {
                            logit("calibrate")
                            var pos = getMouseXY()
                            xoff = pos.x - xoff;
                            yoff = pos.y - yoff; 
                            bcalibrate = false; 
                            $scope.puzzle_state.highlight_json = "2. good, now hit the clear button."
                            return  
                        }
                        var pos = getMouseXY()
                        xstart = pos.x - xoff;
                        ystart = pos.y - yoff;
                        logit("xstart= " + xstart)
                    }

                    function getMouseXY(e){ // works on IE6,FF,Moz,Opera7  
                        if (!e) e = window.event

                        if (e) { 
                            if (e.pageX || e.pageY){
                                mousex = e.pageX
                                mousey = e.pageY
                                algor = '[e.pageX]'
                                if (e.clientX || e.clientY) algor += ' [e.clientX] '
                            } else if (e.clientX || e.clientY) {
                                mousex = e.clientX + document.body.scrollLeft
                                mousey = e.clientY + document.body.scrollTop
                                algor = '[e.clientX]'
                                if (e.pageX || e.pageY) algor += ' [e.pageX] '
                            }  
                        }
                        return {x:mousex, y:mousey}
                    }

                    $scope.calibrate = function() {
                        logit("calibrate")
                        $scope.puzzle_state.highlight_json = "1. click on the upper left corner of the image to set the 0,0 point."
                        bcalibrate = true;
                        bcalibrate_started = true;
                    }

        // *** TEMP END here


}])

socialApp.factory('socialService', [
        '$http',
function($http) {

    var puzzle_state

    initPuzzleState = function() {
        puzzle_state = {
            user_clicks: 0,
            clicks_to_complete: 5,
            user_click_max: 10,
            diff_failed: false,  
            diff_complete: false,  
            fake_start: false,    
            fake_pass: false,    
            fake_complete: false,    
            complete: false,
            stars: 0,
            highlight_json: "",
            objective: ""
        }
    }

    return {

        get_puzzle_data: function(lvl_id, puz_id) {
            var promise = $http.get('research/ajax/puzzle_data/social/' + lvl_id + '/' + puz_id + '/')
            return promise
        },
        get_puzzle_state: function(puzzle_diffs_length) {
            initPuzzleState(puzzle_diffs_length)
            return puzzle_state // this returns the part of the puzzle that is controlled by the state
        }
    }
}])

})();
