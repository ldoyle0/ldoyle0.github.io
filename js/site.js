var readyState = function ( callback ) {
	var body = document.body
	if(body && body.readyState == 'loaded') {
		callback();
	} else {
		if (window.addEventListener) {  
			window.addEventListener('load', callback, false);
		} else {
			window.attachEvent('onload', callback);
		}
	}	
}

var changePage = function( collections, active )
{
	for(var c in collections)
	{	
		var self = $(collections[c])[active];
		
		$(collections[c]).removeClass('active');
		$(self).addClass('active');
		
		window.location.hash = '/' + $(self).attr('href').replace('#','');
	}
}

$(document).ready(function()
{
	      
	$('#myCarousel').carousel();

	var headerHeight = $('#header').height();
	var collections = ['#navtop a','#navbottom a','#navphone a'];
	var sectionCollections = $('section[data-type="page"]');
	
	var active = 0;
	
	var scrollTop = $(window).scrollTop();
	var newScrollTop = 0;
	var isScroll = false;
	
	var clearTime = null;
	
	//Menu
	for(var c in collections){
		$(collections[c]).each(function(i){		
			$(this).click(function(){
				if( $("html:not(:animated), body:not(:animated)").length == 0 )
				{
					//Not done with animation
					return false;
				}
				
				var self = this;
				var scrollTop = $(window).scrollTop(); //Double check
				var section = $(sectionCollections[i]);
				var top = section.offset().top - headerHeight;

				if ( $(self).hasClass('active') && scrollTop == top ) {
					return false;
				}
				
				active = i;
				changePage(collections, active);
				
				$("html:not(:animated), body:not(:animated)").animate({
					scrollTop: top
				}, 1000);
				
				return false;
			});
		});
	}

	var latlng = new google.maps.LatLng(43.537972,-72.397242);
	var settings = {
		zoom: 15,
		scrollwheel: false,
		center: latlng,
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP};
	var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
	var contentString = '<div style="color: black">'+
		'<h3 style="color: black; padding:0; margin:0">Elegance</h3>'+
		'<div>'+
		'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'+
		'</div>'+
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var companyImage = new google.maps.MarkerImage('http://maps.google.com/mapfiles/marker_orange.png',
		new google.maps.Size(20,34),
		new google.maps.Point(0,0),
		new google.maps.Point(50,50)
	);

	var companyShadow = new google.maps.MarkerImage('http://maps.google.com/mapfiles/shadow50.png',
		new google.maps.Size(40,34),
		new google.maps.Point(0,0),
		new google.maps.Point(50, 50));

	var companyPos = new google.maps.LatLng(43.537972,-72.397242);

	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyImage,
		shadow: companyShadow,
		title:"Elegance",
		zIndex: 3});

	google.maps.event.addListener(companyMarker, 'click', function() {
		infowindow.open(map,companyMarker);
	});
	
	$(window).scroll(function(){

		scrollTop = $(window).scrollTop();
		isScroll = true;
		
		if( newScrollTop < scrollTop || newScrollTop == 0 )
		{	
			
			if( sectionCollections[(active+1)] !== undefined && ($(sectionCollections[(active+1)]).offset().top - headerHeight) <= newScrollTop )
			{
				active++;
				changePage(collections, active);
			} 
		}
		else
		{
			if( (active-1) >= 0 && ($(sectionCollections[(active-1)]).offset().top - headerHeight) >= newScrollTop || (active-1) >= 0 && ($(sectionCollections[(active)]).offset().top - headerHeight) >= newScrollTop )
			{
				
				active--;
				changePage(collections, active);
			} 
		}
		
		newScrollTop = scrollTop;
	});
	
	$(window).resize(function() {
		
		headerHeight = $('#header').height();
		
		if( clearTime != null ){
			clearTimeout(clearTime);
			clearTime = null;
		}
		
		clearTime = setTimeout(function(){
				if( ! isScroll ) {
					var section = $(sectionCollections[active]);
					var top = section.offset().top - headerHeight;
						
					$("html:not(:animated), body:not(:animated)").animate({
						scrollTop: top
					}, 1000);
				}
			}, 1000);
		
		isScroll = false;
	});
	
	readyState(function(){
		
		headerHeight = $('#header').height();
		
		//Menu
		for(var c in collections){
			$(collections[c]).each(function(i){		
				if( window.location.hash != '') 
				{
					var self = this;
					var section = $(this);
					var top = section.offset().top - headerHeight;

					if( section.attr('data-name') == window.location.hash.replace('#/','')) 
					{
						if( ! isScroll ) {
							$("html:not(:animated), body:not(:animated)").animate({
								scrollTop: top
							}, 1000,function(){

								active = i;
								changePage(collections, active);
							});
						}
						isScroll = false;
					}
				}
			});
		}
		
	})
});