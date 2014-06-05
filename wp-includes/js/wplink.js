<<<<<<< HEAD
/* global ajaxurl, tinymce, wpLinkL10n, tinyMCEPopup, setUserSetting, wpActiveEditor */
var wpLink;

(function($){
	var inputs = {}, rivers = {}, ed, River, Query;
=======
/* global ajaxurl, tinymce, wpLinkL10n, setUserSetting, wpActiveEditor */
var wpLink;

( function( $ ) {
	var inputs = {}, rivers = {}, editor, searchTimer, River, Query;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

	wpLink = {
		timeToTriggerRiver: 150,
		minRiverAJAXDuration: 200,
		riverBottomThreshold: 5,
		keySensitivity: 100,
		lastSearch: '',
		textarea: '',

<<<<<<< HEAD
		init : function() {
			inputs.dialog = $('#wp-link');
			inputs.submit = $('#wp-link-submit');
			// URL
			inputs.url = $('#url-field');
			inputs.nonce = $('#_ajax_linking_nonce');
			// Secondary options
			inputs.title = $('#link-title-field');
			// Advanced Options
			inputs.openInNewTab = $('#link-target-checkbox');
			inputs.search = $('#search-field');
			// Build Rivers
			rivers.search = new River( $('#search-results') );
			rivers.recent = new River( $('#most-recent-results') );
			rivers.elements = $('.query-results', inputs.dialog);
=======
		init: function() {
			inputs.wrap = $('#wp-link-wrap');
			inputs.dialog = $( '#wp-link' );
			inputs.backdrop = $( '#wp-link-backdrop' );
			inputs.submit = $( '#wp-link-submit' );
			inputs.close = $( '#wp-link-close' );
			// URL
			inputs.url = $( '#url-field' );
			inputs.nonce = $( '#_ajax_linking_nonce' );
			// Secondary options
			inputs.title = $( '#link-title-field' );
			// Advanced Options
			inputs.openInNewTab = $( '#link-target-checkbox' );
			inputs.search = $( '#search-field' );
			// Build Rivers
			rivers.search = new River( $( '#search-results' ) );
			rivers.recent = new River( $( '#most-recent-results' ) );
			rivers.elements = inputs.dialog.find( '.query-results' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			// Bind event handlers
			inputs.dialog.keydown( wpLink.keydown );
			inputs.dialog.keyup( wpLink.keyup );
<<<<<<< HEAD
			inputs.submit.click( function(e){
				e.preventDefault();
				wpLink.update();
			});
			$('#wp-link-cancel').click( function(e){
				e.preventDefault();
				wpLink.close();
			});
			$('#internal-toggle').click( wpLink.toggleInternalLinking );

			rivers.elements.bind('river-select', wpLink.updateFields );

			inputs.search.keyup( wpLink.searchInternalLinks );

			inputs.dialog.bind('wpdialogrefresh', wpLink.refresh);
			inputs.dialog.bind('wpdialogbeforeopen', wpLink.beforeOpen);
			inputs.dialog.bind('wpdialogclose', wpLink.onClose);
		},

		beforeOpen : function() {
			wpLink.range = null;

			if ( ! wpLink.isMCE() && document.selection ) {
				wpLink.textarea.focus();
				wpLink.range = document.selection.createRange();
			}
		},

		open : function() {
			if ( !wpActiveEditor )
				return;

			this.textarea = $('#'+wpActiveEditor).get(0);

			// Initialize the dialog if necessary (html mode).
			if ( ! inputs.dialog.data('wpdialog') ) {
				inputs.dialog.wpdialog({
					title: wpLinkL10n.title,
					width: 480,
					height: 'auto',
					modal: true,
					dialogClass: 'wp-dialog'
				});
			}

			inputs.dialog.wpdialog('open');
		},

		isMCE : function() {
			return tinyMCEPopup && ( ed = tinyMCEPopup.editor ) && ! ed.isHidden();
		},

		refresh : function() {
=======
			inputs.submit.click( function( event ) {
				event.preventDefault();
				wpLink.update();
			});
			inputs.close.add( inputs.backdrop ).add( '#wp-link-cancel a' ).click( function( event ) {
				event.preventDefault();
				wpLink.close();
			});

			$( '#wp-link-search-toggle' ).click( wpLink.toggleInternalLinking );

			rivers.elements.on( 'river-select', wpLink.updateFields );

			inputs.search.keyup( function() {
				var self = this;

				window.clearTimeout( searchTimer );
				searchTimer = window.setTimeout( function() {
					wpLink.searchInternalLinks.call( self );
				}, 500 );
			});
		},

		open: function( editorId ) {
			var ed;
			
			wpLink.range = null;

			if ( editorId ) {
				window.wpActiveEditor = editorId;
			}

			if ( ! window.wpActiveEditor ) {
				return;
			}

			this.textarea = $( '#' + window.wpActiveEditor ).get( 0 );

			if ( typeof tinymce !== 'undefined' ) {
				ed = tinymce.get( wpActiveEditor );

				if ( ed && ! ed.isHidden() ) {
					editor = ed;
				} else {
					editor = null;
				}

				if ( editor && tinymce.isIE ) {
					editor.windowManager.bookmark = editor.selection.getBookmark();
				}
			}

			if ( ! wpLink.isMCE() && document.selection ) {
				this.textarea.focus();
				this.range = document.selection.createRange();
			}

			inputs.wrap.show();
			inputs.backdrop.show();

			wpLink.refresh();
		},

		isMCE: function() {
			return editor && ! editor.isHidden();
		},

		refresh: function() {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			// Refresh rivers (clear links, check visibility)
			rivers.search.refresh();
			rivers.recent.refresh();

			if ( wpLink.isMCE() )
				wpLink.mceRefresh();
			else
				wpLink.setDefaultValues();

			// Focus the URL field and highlight its contents.
			//     If this is moved above the selection changes,
			//     IE will show a flashing cursor over the dialog.
			inputs.url.focus()[0].select();
			// Load the most recent results if this is the first time opening the panel.
			if ( ! rivers.recent.ul.children().length )
				rivers.recent.ajax();
		},

<<<<<<< HEAD
		mceRefresh : function() {
			var e;
			ed = tinyMCEPopup.editor;

			tinyMCEPopup.restoreSelection();

			// If link exists, select proper values.
			if ( e = ed.dom.getParent(ed.selection.getNode(), 'A') ) {
				// Set URL and description.
				inputs.url.val( ed.dom.getAttrib(e, 'href') );
				inputs.title.val( ed.dom.getAttrib(e, 'title') );
				// Set open in new tab.
				inputs.openInNewTab.prop('checked', ( '_blank' == ed.dom.getAttrib( e, 'target' ) ) );
=======
		mceRefresh: function() {
			var e;

			// If link exists, select proper values.
			if ( e = editor.dom.getParent( editor.selection.getNode(), 'A' ) ) {
				// Set URL and description.
				inputs.url.val( editor.dom.getAttrib( e, 'href' ) );
				inputs.title.val( editor.dom.getAttrib( e, 'title' ) );
				// Set open in new tab.
				inputs.openInNewTab.prop( 'checked', ( '_blank' === editor.dom.getAttrib( e, 'target' ) ) );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				// Update save prompt.
				inputs.submit.val( wpLinkL10n.update );

			// If there's no link, set the default values.
			} else {
				wpLink.setDefaultValues();
			}
		},

<<<<<<< HEAD
		close : function() {
			if ( wpLink.isMCE() )
				tinyMCEPopup.close();
			else
				inputs.dialog.wpdialog('close');
		},

		onClose: function() {
			if ( ! wpLink.isMCE() ) {
				wpLink.textarea.focus();
=======
		close: function() {
			if ( ! wpLink.isMCE() ) {
				wpLink.textarea.focus();

>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				if ( wpLink.range ) {
					wpLink.range.moveToBookmark( wpLink.range.getBookmark() );
					wpLink.range.select();
				}
<<<<<<< HEAD
			}
		},

		getAttrs : function() {
			return {
				href : inputs.url.val(),
				title : inputs.title.val(),
				target : inputs.openInNewTab.prop('checked') ? '_blank' : ''
			};
		},

		update : function() {
=======
			} else {
				editor.focus();
			}

			inputs.backdrop.hide();
			inputs.wrap.hide();
		},

		getAttrs: function() {
			return {
				href: inputs.url.val(),
				title: inputs.title.val(),
				target: inputs.openInNewTab.prop( 'checked' ) ? '_blank' : ''
			};
		},

		update: function() {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			if ( wpLink.isMCE() )
				wpLink.mceUpdate();
			else
				wpLink.htmlUpdate();
		},

<<<<<<< HEAD
		htmlUpdate : function() {
			var attrs, html, begin, end, cursor, selection,
=======
		htmlUpdate: function() {
			var attrs, html, begin, end, cursor, title, selection,
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				textarea = wpLink.textarea;

			if ( ! textarea )
				return;

			attrs = wpLink.getAttrs();

			// If there's no href, return.
			if ( ! attrs.href || attrs.href == 'http://' )
				return;

			// Build HTML
			html = '<a href="' + attrs.href + '"';

<<<<<<< HEAD
			if ( attrs.title )
				html += ' title="' + attrs.title + '"';
			if ( attrs.target )
				html += ' target="' + attrs.target + '"';
=======
			if ( attrs.title ) {
				title = attrs.title.replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' );
				html += ' title="' + title + '"';
			}

			if ( attrs.target ) {
				html += ' target="' + attrs.target + '"';
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			html += '>';

			// Insert HTML
			if ( document.selection && wpLink.range ) {
				// IE
				// Note: If no text is selected, IE will not place the cursor
				//       inside the closing tag.
				textarea.focus();
				wpLink.range.text = html + wpLink.range.text + '</a>';
				wpLink.range.moveToBookmark( wpLink.range.getBookmark() );
				wpLink.range.select();

				wpLink.range = null;
			} else if ( typeof textarea.selectionStart !== 'undefined' ) {
				// W3C
				begin       = textarea.selectionStart;
				end         = textarea.selectionEnd;
				selection   = textarea.value.substring( begin, end );
				html        = html + selection + '</a>';
				cursor      = begin + html.length;

				// If no text is selected, place the cursor inside the closing tag.
				if ( begin == end )
					cursor -= '</a>'.length;

				textarea.value = textarea.value.substring( 0, begin ) + html +
					textarea.value.substring( end, textarea.value.length );

				// Update cursor position
				textarea.selectionStart = textarea.selectionEnd = cursor;
			}

			wpLink.close();
			textarea.focus();
		},

<<<<<<< HEAD
		mceUpdate : function() {
			var ed = tinyMCEPopup.editor,
				attrs = wpLink.getAttrs(),
				e, b;

			tinyMCEPopup.restoreSelection();
			e = ed.dom.getParent(ed.selection.getNode(), 'A');

			// If the values are empty, unlink and return
			if ( ! attrs.href || attrs.href == 'http://' ) {
				if ( e ) {
					b = ed.selection.getBookmark();
					ed.dom.remove(e, 1);
					ed.selection.moveToBookmark(b);
					tinyMCEPopup.execCommand('mceEndUndoLevel');
					wpLink.close();
				}
				return;
			}

			if (e == null) {
				ed.getDoc().execCommand('unlink', false, null);
				tinyMCEPopup.execCommand('mceInsertLink', false, '#mce_temp_url#', {skip_undo : 1});

				tinymce.each(ed.dom.select('a'), function(n) {
					if (ed.dom.getAttrib(n, 'href') == '#mce_temp_url#') {
						e = n;
						ed.dom.setAttribs(e, attrs);
					}
				});

				// Sometimes WebKit lets a user create a link where
				// they shouldn't be able to. In this case, CreateLink
				// injects "#mce_temp_url#" into their content. Fix it.
				if ( tinymce.isWebKit && $(e).text() == '#mce_temp_url#' ) {
					ed.dom.remove(e);
					e = null;
				}
			} else {
				ed.dom.setAttribs(e, attrs);
			}

			// Move the caret if selection was not an image.
			if ( e && (e.childNodes.length != 1 || e.firstChild.nodeName != 'IMG') ) {
				ed.selection.select(e);
				ed.selection.collapse(0);
				tinyMCEPopup.storeSelection();
			}

			ed.execCommand('mceEndUndoLevel');
			wpLink.close();
			ed.focus();
		},

		updateFields : function( e, li, originalEvent ) {
			inputs.url.val( li.children('.item-permalink').val() );
			inputs.title.val( li.hasClass('no-title') ? '' : li.children('.item-title').text() );
			if ( originalEvent && originalEvent.type == 'click' )
				inputs.url.focus();
		},
		setDefaultValues : function() {
			// Set URL and description to defaults.
			// Leave the new tab setting as-is.
			inputs.url.val('http://');
			inputs.title.val('');
=======
		mceUpdate: function() {
			var link,
				attrs = wpLink.getAttrs();

			wpLink.close();
			editor.focus();

			if ( tinymce.isIE ) {
				editor.selection.moveToBookmark( editor.windowManager.bookmark );
			}

			link = editor.dom.getParent( editor.selection.getNode(), 'a[href]' );

			// If the values are empty, unlink and return
			if ( ! attrs.href || attrs.href == 'http://' ) {
				editor.execCommand( 'unlink' );
				return;
			}

			if ( link ) {
				editor.dom.setAttribs( link, attrs );
			} else {
				editor.execCommand( 'mceInsertLink', false, attrs );
			}

			// Move the cursor to the end of the selection
			editor.selection.collapse();
		},

		updateFields: function( e, li, originalEvent ) {
			inputs.url.val( li.children( '.item-permalink' ).val() );
			inputs.title.val( li.hasClass( 'no-title' ) ? '' : li.children( '.item-title' ).text() );
			if ( originalEvent && originalEvent.type == 'click' )
				inputs.url.focus();
		},

		setDefaultValues: function() {
			// Set URL and description to defaults.
			// Leave the new tab setting as-is.
			inputs.url.val( 'http://' );
			inputs.title.val( '' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			// Update save prompt.
			inputs.submit.val( wpLinkL10n.save );
		},

<<<<<<< HEAD
		searchInternalLinks : function() {
			var t = $(this), waiting,
=======
		searchInternalLinks: function() {
			var t = $( this ), waiting,
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				search = t.val();

			if ( search.length > 2 ) {
				rivers.recent.hide();
				rivers.search.show();

				// Don't search if the keypress didn't change the title.
				if ( wpLink.lastSearch == search )
					return;

				wpLink.lastSearch = search;
				waiting = t.parent().find('.spinner').show();

				rivers.search.change( search );
<<<<<<< HEAD
				rivers.search.ajax( function(){ waiting.hide(); });
=======
				rivers.search.ajax( function() {
					waiting.hide();
				});
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			} else {
				rivers.search.hide();
				rivers.recent.show();
			}
		},

<<<<<<< HEAD
		next : function() {
			rivers.search.next();
			rivers.recent.next();
		},
		prev : function() {
=======
		next: function() {
			rivers.search.next();
			rivers.recent.next();
		},

		prev: function() {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			rivers.search.prev();
			rivers.recent.prev();
		},

<<<<<<< HEAD
		keydown : function( event ) {
			var fn, key = $.ui.keyCode;

			if ( event.which !== key.UP && event.which !== key.DOWN ) {
				return;
			}

			fn = event.which === key.UP ? 'prev' : 'next';
=======
		keydown: function( event ) {
			var fn, id,
				key = $.ui.keyCode;

			if ( key.ESCAPE === event.keyCode ) {
				wpLink.close();
				event.stopImmediatePropagation();
			} else if ( key.TAB === event.keyCode ) {
				id = event.target.id;

				if ( id === 'wp-link-submit' && ! event.shiftKey ) {
					inputs.close.focus();
					event.preventDefault();
				} else if ( id === 'wp-link-close' && event.shiftKey ) {
					inputs.submit.focus();
					event.preventDefault();
				}
			}

			if ( event.keyCode !== key.UP && event.keyCode !== key.DOWN ) {
				return;
			}

			fn = event.keyCode === key.UP ? 'prev' : 'next';
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			clearInterval( wpLink.keyInterval );
			wpLink[ fn ]();
			wpLink.keyInterval = setInterval( wpLink[ fn ], wpLink.keySensitivity );
			event.preventDefault();
		},

		keyup: function( event ) {
			var key = $.ui.keyCode;

<<<<<<< HEAD
			if ( event.which === key.ESCAPE ) {
				event.stopImmediatePropagation();
				if ( ! $(document).triggerHandler( 'wp_CloseOnEscape', [{ event: event, what: 'wplink', cb: wpLink.close }] ) )
					wpLink.close();
				return false;
			}

=======
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			if ( event.which === key.UP || event.which === key.DOWN ) {
				clearInterval( wpLink.keyInterval );
				event.preventDefault();
			}
		},

<<<<<<< HEAD
		delayedCallback : function( func, delay ) {
=======
		delayedCallback: function( func, delay ) {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			var timeoutTriggered, funcTriggered, funcArgs, funcContext;

			if ( ! delay )
				return func;

			setTimeout( function() {
				if ( funcTriggered )
					return func.apply( funcContext, funcArgs );
				// Otherwise, wait.
				timeoutTriggered = true;
<<<<<<< HEAD
			}, delay);
=======
			}, delay );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			return function() {
				if ( timeoutTriggered )
					return func.apply( this, arguments );
				// Otherwise, wait.
				funcArgs = arguments;
				funcContext = this;
				funcTriggered = true;
			};
		},

<<<<<<< HEAD
		toggleInternalLinking : function( event ) {
			var panel = $('#search-panel'),
				widget = inputs.dialog.wpdialog('widget'),
				// We're about to toggle visibility; it's currently the opposite
				visible = !panel.is(':visible'),
				win = $(window);

			$(this).toggleClass('toggle-arrow-active', visible);

			inputs.dialog.height('auto');
			panel.slideToggle( 300, function() {
				setUserSetting('wplink', visible ? '1' : '0');
				inputs[ visible ? 'search' : 'url' ].focus();

				// Move the box if the box is now expanded, was opened in a collapsed state,
				// and if it needs to be moved. (Judged by bottom not being positive or
				// bottom being smaller than top.)
				var scroll = win.scrollTop(),
					top = widget.offset().top,
					bottom = top + widget.outerHeight(),
					diff = bottom - win.height();

				if ( diff > scroll ) {
					widget.animate({'top': diff < top ?  top - diff : scroll }, 200);
				}
			});
			event.preventDefault();
=======
		toggleInternalLinking: function() {
			var visible = inputs.wrap.hasClass( 'search-panel-visible' );

			inputs.wrap.toggleClass( 'search-panel-visible', ! visible );
			setUserSetting( 'wplink', visible ? '0' : '1' );
			inputs[ ! visible ? 'search' : 'url' ].focus();
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		}
	};

	River = function( element, search ) {
		var self = this;
		this.element = element;
<<<<<<< HEAD
		this.ul = element.children('ul');
=======
		this.ul = element.children( 'ul' );
		this.contentHeight = element.children( '#link-selector-height' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		this.waiting = element.find('.river-waiting');

		this.change( search );
		this.refresh();

<<<<<<< HEAD
		element.scroll( function(){ self.maybeLoad(); });
		element.delegate('li', 'click', function(e){ self.select( $(this), e ); });
=======
		$( '#wp-link .query-results, #wp-link #link-selector' ).scroll( function() {
			self.maybeLoad();
		});
		element.on( 'click', 'li', function( event ) {
			self.select( $( this ), event );
		});
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
	};

	$.extend( River.prototype, {
		refresh: function() {
			this.deselect();
<<<<<<< HEAD
			this.visible = this.element.is(':visible');
=======
			this.visible = this.element.is( ':visible' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		},
		show: function() {
			if ( ! this.visible ) {
				this.deselect();
				this.element.show();
				this.visible = true;
			}
		},
		hide: function() {
			this.element.hide();
			this.visible = false;
		},
		// Selects a list item and triggers the river-select event.
		select: function( li, event ) {
			var liHeight, elHeight, liTop, elTop;

<<<<<<< HEAD
			if ( li.hasClass('unselectable') || li == this.selected )
				return;

			this.deselect();
			this.selected = li.addClass('selected');
=======
			if ( li.hasClass( 'unselectable' ) || li == this.selected )
				return;

			this.deselect();
			this.selected = li.addClass( 'selected' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			// Make sure the element is visible
			liHeight = li.outerHeight();
			elHeight = this.element.height();
			liTop = li.position().top;
			elTop = this.element.scrollTop();

			if ( liTop < 0 ) // Make first visible element
				this.element.scrollTop( elTop + liTop );
			else if ( liTop + liHeight > elHeight ) // Make last visible element
				this.element.scrollTop( elTop + liTop - elHeight + liHeight );

			// Trigger the river-select event
<<<<<<< HEAD
			this.element.trigger('river-select', [ li, event, this ]);
		},
		deselect: function() {
			if ( this.selected )
				this.selected.removeClass('selected');
=======
			this.element.trigger( 'river-select', [ li, event, this ] );
		},
		deselect: function() {
			if ( this.selected )
				this.selected.removeClass( 'selected' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			this.selected = false;
		},
		prev: function() {
			if ( ! this.visible )
				return;

			var to;
			if ( this.selected ) {
<<<<<<< HEAD
				to = this.selected.prev('li');
=======
				to = this.selected.prev( 'li' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				if ( to.length )
					this.select( to );
			}
		},
		next: function() {
			if ( ! this.visible )
				return;

<<<<<<< HEAD
			var to = this.selected ? this.selected.next('li') : $('li:not(.unselectable):first', this.element);
=======
			var to = this.selected ? this.selected.next( 'li' ) : $( 'li:not(.unselectable):first', this.element );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			if ( to.length )
				this.select( to );
		},
		ajax: function( callback ) {
			var self = this,
				delay = this.query.page == 1 ? 0 : wpLink.minRiverAJAXDuration,
				response = wpLink.delayedCallback( function( results, params ) {
					self.process( results, params );
					if ( callback )
						callback( results, params );
				}, delay );

			this.query.ajax( response );
		},
		change: function( search ) {
			if ( this.query && this._search == search )
				return;

			this._search = search;
			this.query = new Query( search );
<<<<<<< HEAD
			this.element.scrollTop(0);
=======
			this.element.scrollTop( 0 );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		},
		process: function( results, params ) {
			var list = '', alt = true, classes = '',
				firstPage = params.page == 1;

<<<<<<< HEAD
			if ( !results ) {
=======
			if ( ! results ) {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				if ( firstPage ) {
					list += '<li class="unselectable"><span class="item-title"><em>' +
						wpLinkL10n.noMatchesFound + '</em></span></li>';
				}
			} else {
				$.each( results, function() {
					classes = alt ? 'alternate' : '';
					classes += this.title ? '' : ' no-title';
					list += classes ? '<li class="' + classes + '">' : '<li>';
					list += '<input type="hidden" class="item-permalink" value="' + this.permalink + '" />';
					list += '<span class="item-title">';
					list += this.title ? this.title : wpLinkL10n.noTitle;
					list += '</span><span class="item-info">' + this.info + '</span></li>';
					alt = ! alt;
				});
			}

			this.ul[ firstPage ? 'html' : 'append' ]( list );
		},
		maybeLoad: function() {
			var self = this,
				el = this.element,
				bottom = el.scrollTop() + el.height();

<<<<<<< HEAD
			if ( ! this.query.ready() || bottom < this.ul.height() - wpLink.riverBottomThreshold )
=======
			if ( ! this.query.ready() || bottom < this.contentHeight.height() - wpLink.riverBottomThreshold )
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				return;

			setTimeout(function() {
				var newTop = el.scrollTop(),
					newBottom = newTop + el.height();

<<<<<<< HEAD
				if ( ! self.query.ready() || newBottom < self.ul.height() - wpLink.riverBottomThreshold )
=======
				if ( ! self.query.ready() || newBottom < self.contentHeight.height() - wpLink.riverBottomThreshold )
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					return;

				self.waiting.show();
				el.scrollTop( newTop + self.waiting.outerHeight() );

<<<<<<< HEAD
				self.ajax( function() { self.waiting.hide(); });
=======
				self.ajax( function() {
					self.waiting.hide();
				});
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			}, wpLink.timeToTriggerRiver );
		}
	});

	Query = function( search ) {
		this.page = 1;
		this.allLoaded = false;
		this.querying = false;
		this.search = search;
	};

	$.extend( Query.prototype, {
		ready: function() {
<<<<<<< HEAD
			return !( this.querying || this.allLoaded );
=======
			return ! ( this.querying || this.allLoaded );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		},
		ajax: function( callback ) {
			var self = this,
				query = {
					action : 'wp-link-ajax',
					page : this.page,
					'_ajax_linking_nonce' : inputs.nonce.val()
				};

			if ( this.search )
				query.search = this.search;

			this.querying = true;

<<<<<<< HEAD
			$.post( ajaxurl, query, function(r) {
				self.page++;
				self.querying = false;
				self.allLoaded = !r;
=======
			$.post( ajaxurl, query, function( r ) {
				self.page++;
				self.querying = false;
				self.allLoaded = ! r;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				callback( r, query );
			}, 'json' );
		}
	});

<<<<<<< HEAD
	$(document).ready( wpLink.init );
})(jQuery);
=======
	$( document ).ready( wpLink.init );
})( jQuery );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
