<<<<<<< HEAD
/* global ajaxurl, wpAjax */

var findPosts;
(function($){
	findPosts = {
		open : function(af_name, af_val) {
			var st = document.documentElement.scrollTop || $(document).scrollTop(),
				overlay = $( '.ui-find-overlay' );
=======
/* global ajaxurl, attachMediaBoxL10n */

var findPosts;
( function( $ ){
	findPosts = {
		open: function( af_name, af_val ) {
			var overlay = $( '.ui-find-overlay' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			if ( overlay.length === 0 ) {
				$( 'body' ).append( '<div class="ui-find-overlay"></div>' );
				findPosts.overlay();
			}

			overlay.show();

			if ( af_name && af_val ) {
<<<<<<< HEAD
				$('#affected').attr('name', af_name).val(af_val);
			}
			$('#find-posts').show().draggable({
				handle: '#find-posts-head'
			}).css({'top':st + 50 + 'px','left':'50%','marginLeft':'-328px'});

			$('#find-posts-input').focus().keyup(function(e){
				if (e.which == 27) { findPosts.close(); } // close on Escape
=======
				$( '#affected' ).attr( 'name', af_name ).val( af_val );
			}

			$( '#find-posts' ).show();

			$('#find-posts-input').focus().keyup( function( event ){
				if ( event.which == 27 ) {
					findPosts.close();
				} // close on Escape
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			});

			// Pull some results up by default
			findPosts.send();

			return false;
		},

<<<<<<< HEAD
		close : function() {
			$('#find-posts-response').html('');
			$('#find-posts').draggable('destroy').hide();
			$( '.ui-find-overlay' ).hide();
		},

		overlay : function() {
			$( '.ui-find-overlay' ).css(
				{ 'z-index': '999', 'width': $( document ).width() + 'px', 'height': $( document ).height() + 'px' }
			).on('click', function () {
=======
		close: function() {
			$('#find-posts-response').html('');
			$('#find-posts').hide();
			$( '.ui-find-overlay' ).hide();
		},

		overlay: function() {
			$( '.ui-find-overlay' ).on( 'click', function () {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				findPosts.close();
			});
		},

<<<<<<< HEAD
		send : function() {
			var post = {
					ps: $('#find-posts-input').val(),
=======
		send: function() {
			var post = {
					ps: $( '#find-posts-input' ).val(),
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					action: 'find_posts',
					_ajax_nonce: $('#_ajax_nonce').val()
				},
				spinner = $( '.find-box-search .spinner' );

			spinner.show();

<<<<<<< HEAD
			$.ajax({
				type : 'POST',
				url : ajaxurl,
				data : post,
				success : function(x) { findPosts.show(x); spinner.hide(); },
				error : function(r) { findPosts.error(r); spinner.hide(); }
			});
		},

		show : function(x) {

			if ( typeof(x) == 'string' ) {
				this.error({'responseText': x});
				return;
			}

			var r = wpAjax.parseAjaxResponse(x);

			if ( r.errors ) {
				this.error({'responseText': wpAjax.broken});
			}
			r = r.responses[0];
			$('#find-posts-response').html(r.data);

			// Enable whole row to be clicked
			$( '.found-posts td' ).on( 'click', function () {
				$( this ).parent().find( '.found-radio input' ).prop( 'checked', true );
			});
		},

		error : function(r) {
			var er = r.statusText;

			if ( r.responseText ) {
				er = r.responseText.replace( /<.[^<>]*?>/g, '' );
			}
			if ( er ) {
				$('#find-posts-response').html(er);
			}
		}
	};

	$(document).ready(function() {
		$('#find-posts-submit').click(function(e) {
			if ( '' === $('#find-posts-response').html() )
				e.preventDefault();
=======
			$.ajax( ajaxurl, {
				type: 'POST',
				data: post,
				dataType: 'json'
			}).always( function() {
				spinner.hide();
			}).done( function( x ) {
				if ( ! x.success ) {
					$( '#find-posts-response' ).text( attachMediaBoxL10n.error );
				}

				$( '#find-posts-response' ).html( x.data );
			}).fail( function() {
				$( '#find-posts-response' ).text( attachMediaBoxL10n.error );
			});
		}
	};

	$( document ).ready( function() {
		$( '#find-posts-submit' ).click( function( event ) {
			if ( ! $( '#find-posts-response input[type="radio"]:checked' ).length )
				event.preventDefault();
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		});
		$( '#find-posts .find-box-search :input' ).keypress( function( event ) {
			if ( 13 == event.which ) {
				findPosts.send();
				return false;
			}
<<<<<<< HEAD
		} );
		$( '#find-posts-search' ).click( findPosts.send );
		$( '#find-posts-close' ).click( findPosts.close );
		$('#doaction, #doaction2').click(function(e){
			$('select[name^="action"]').each(function(){
				if ( $(this).val() == 'attach' ) {
					e.preventDefault();
=======
		});
		$( '#find-posts-search' ).click( findPosts.send );
		$( '#find-posts-close' ).click( findPosts.close );
		$( '#doaction, #doaction2' ).click( function( event ) {
			$( 'select[name^="action"]' ).each( function() {
				if ( $(this).val() === 'attach' ) {
					event.preventDefault();
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					findPosts.open();
				}
			});
		});
<<<<<<< HEAD
	});
	$(window).resize(function() {
		findPosts.overlay();
	});
})(jQuery);
=======

		// Enable whole row to be clicked
		$( '.find-box-inside' ).on( 'click', 'tr', function() {
			$( this ).find( '.found-radio input' ).prop( 'checked', true );
		});
	});
})( jQuery );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
