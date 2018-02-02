(function($) {
	
	$.uniprogy.uFacebook = function(settings)
	{
		$('<div />').attr({id: "fb-root"}).appendTo('body');
		var e = document.createElement('script');
		e.src = document.location.protocol + '//connect.facebook.net/'+settings.language+'/all.js';
		e.async = true;
		
		document.getElementById('fb-root').appendChild(e);	
		
		window.fbAsyncInit = function() {
			FB.init({
				appId   : settings.appId,
				status  : true, // check login status
				cookie  : true, // enable cookies to allow the server to access the session
				xfbml   : true // parse XFBML
			});
			
			// whenever the user logs in, we act
			FB.Event.subscribe('auth.statusChange', function(response) {
				if(response.status === 'connected' && settings.isGuest == true)
				{
					setTimeout('$.uniprogy.uFacebookLoggedIn("'+settings.loginUrl
						+'/?accessToken='+response.authResponse.accessToken+'",'+settings.flag+')',0);
				}
			});
		};
	};
	
	$.uniprogy.uFacebookLoggedIn = function(loginUrl,flag)
	{
		FB.api('/me', {fields: 'name,email'}, function(response) {
			var me = JSON.stringify(response);
			$.ajax({
				url: loginUrl,
				type: 'post',
				data: {
					flag: flag,
					me: response
				},
				success: function(data)
				{
					if(data){
						if(flag == 1){
							location.reload(true);
							$('.facebookLoginButton').html(data);
						}else if(flag == 2 && data == 'reload'){
							location.reload(true);
						}
						else{
							location.reload(true);
							$('#wlt-UserMenu').uWorklet().process({
								content: {
									replace: data
								}
							});
						}
					}
				}
			});

		});
	}
})(jQuery);