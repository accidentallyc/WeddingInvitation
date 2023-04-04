function Timeline(opts){
	if( !opts ) opts = {};
	if( !opts.fps )  opts.fps = 8;
	if( !opts.accuracy ) opts.accuracy = 1;
	
	/** Public Fields **/
	var _fps = this.fps = opts.fps;
	
	/** Private fields **/
	var _state = "stopped";
	var _interval = 1 / opts.fps;
	var _curr_time = 0;
	var _curr_frame = 0;
	var _interval_counter;
	var _interval_funcs = {};
	Object.defineProperty( this, "interval",{get:function(){return _interval}});
	Object.defineProperty( this, "time",{get:function(){return _curr_time}});
	Object.defineProperty( this, "frame",{get:function(){return _curr_frame}});
	Object.defineProperty( this, "state",{get:function(){return _state}});
	
	var _max_exec_timekey = 0;
	
	
	/** Initialize Methods **/
	this.add = _add;
	this.play = _play;
	this.pause = _pause;
	this.stop = _stop;
	this.reset = _reset;
	this.jump = _jump;
	this.step = _step;
	
	/**********************/
	/** Instance Methods **/
	/**********************/
	
	function _add(ExecTime, func){
		var timekey = __timekey__(ExecTime);
		if( _interval_funcs[timekey] )
			throw "Warning: A function is already assigned to " + ExecTime + ". Consider using a wrapper";
		
		console.log( "time key from ",ExecTime,"is",timekey);
		
		_interval_funcs[timekey] = func;
		if( timekey > _max_exec_timekey ) _max_exec_timekey = timekey;
	}
	
	function _step(time){
		_curr_frame = time ? __timekey__(time) : _curr_frame;
		
		if( _interval_funcs[ _curr_frame ] )
				_interval_funcs[ _curr_frame ]();
				
		_curr_frame++;
	}
	
	function  _play(start_time, end_time){
		_curr_frame = start_time ? __timekey__(start_time) : _curr_frame;
		end_frame = end_time ? __timekey__(end_time) : _max_exec_timekey;
		_state = "playing";
		
		_interval_callback(); /** Call for no delay setiNTERVAL **/
		_interval_counter = setInterval( _interval_callback ,_interval * 1000); /** x1000 cause js is in milliseconds **/
		function _interval_callback(){
			if( _interval_funcs[ _curr_frame ] )
				_interval_funcs[ _curr_frame ]();
		
	
			_curr_frame++;
			
			
			if( _curr_frame > end_frame )	_stop();
		}
		
		// hack
		
		$("#audio").trigger('play').on('ended', function () {
			this.currentTime = 0;
    			this.play();
		});
	}
	
	function _stop(){
		clearInterval( _interval_counter );
		_reset();
	}
	
	function _reset(){
		_curr_time = 0;
		_curr_frame = 0;
		_state = "stopped";
	}
	
	function _pause(){
		clearInterval( _interval_counter );
		_curr_time = _curr_frame/_fps;
		_state = "paused";
	}

	function _jump(ExecTime){
		_curr_time = __time__(ExecTime);
		_curr_frame = __timekey__(ExecTime);
	}
	
	/**********************/
	/** Internal Methods **/
	/**********************/

	
	function __time__(ExecTime){
		var ExecTimeInt = Math.floor( ExecTime );
		return  (ExecTimeInt * 60) +( (ExecTime - ExecTimeInt)*100 );
	}
	
	function __timekey__( ExecTime ){
		return Math.round( __time__(ExecTime) * _fps ); 
		}
	
	
}

//Timeline.prototype = {};
