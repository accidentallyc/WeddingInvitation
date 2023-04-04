$( document).ready( function(){
	hasOpened = false;
	T = new Timeline({fps:4});
	sec = 1000;
	T.add( 0,		function(){	
						hasOpened = true
						console.log("timeline-actions.js::7",1)
						$("body").css({height:"70em"});
						$("#envelope").css({width:"31em",height:"15em", cursor:'default'});		
						$("#envelope-top").css("transform","rotateX(165deg)");
					} );
	T.add( 0.003, 	function(){
		console.log("timeline-actions.js::13",2)
						$("#envelope-top").removeClass("shadow-thin bg-htl").addClass("bg-ht");
						$("#wax-seal").remove(); 
						$("#envelope-bottom").css("transform","rotateX(-165deg)");	
					} );
	T.add( 0.005, function(){ $("#part2-paper").show(); } );
	T.add( 0.007, function(){
						$("#envelope").css({width:"50em",height:"24em"},sec)
					});
	// T.add( 0.012, 	function(){ $("#wax-seal").remove(); } );
	// T.add( 0.014, 	function(){ $("#envelope-bottom").css("transform","rotateX(-165deg)");	} );
	//T.add( 0.020, 	function(){ $("#envelope").animate({width:"100%"}); } );
	


	

}); //document.ready

$(window).load( function(){
	$("#preloader").delay(2000).fadeOut(3000);
});
