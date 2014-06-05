/* global getUserSetting, tinymce, QTags, wpActiveEditor */

// WordPress, TinyMCE, and Media
// -----------------------------
<<<<<<< HEAD
(function($){
	// Stores the editors' `wp.media.controller.Frame` instances.
	var workflows = {};

	wp.media.string = {
		// Joins the `props` and `attachment` objects,
		// outputting the proper object format based on the
		// attachment's type.
=======
(function($, _){
	/**
	 * Stores the editors' `wp.media.controller.Frame` instances.
	 *
	 * @static
	 */
	var workflows = {};

	/**
	 * A helper mixin function to avoid truthy and falsey values being
	 *   passed as an input that expects booleans. If key is undefined in the map,
	 *   but has a default value, set it.
	 *
	 * @param {object} attrs Map of props from a shortcode or settings.
	 * @param {string} key The key within the passed map to check for a value.
	 * @returns {mixed|undefined} The original or coerced value of key within attrs
	 */
	wp.media.coerce = function ( attrs, key ) {
		if ( _.isUndefined( attrs[ key ] ) && ! _.isUndefined( this.defaults[ key ] ) ) {
			attrs[ key ] = this.defaults[ key ];
		} else if ( 'true' === attrs[ key ] ) {
			attrs[ key ] = true;
		} else if ( 'false' === attrs[ key ] ) {
			attrs[ key ] = false;
		}
		return attrs[ key ];
	};

	/**
	 * wp.media.string
	 * @namespace
	 */
	wp.media.string = {
		/**
		 * Joins the `props` and `attachment` objects,
		 * outputting the proper object format based on the
		 * attachment's type.
		 *
		 * @global wp.media.view.settings
		 * @global getUserSetting()
		 *
		 * @param {Object} [props={}] Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {Object} Joined props
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		props: function( props, attachment ) {
			var link, linkUrl, size, sizes, fallbacks,
				defaultProps = wp.media.view.settings.defaultProps;

			// Final fallbacks run after all processing has been completed.
			fallbacks = function( props ) {
				// Generate alt fallbacks and strip tags.
				if ( 'image' === props.type && ! props.alt ) {
					props.alt = props.caption || props.title || '';
					props.alt = props.alt.replace( /<\/?[^>]+>/g, '' );
					props.alt = props.alt.replace( /[\r\n]+/g, ' ' );
				}

				return props;
			};

			props = props ? _.clone( props ) : {};

<<<<<<< HEAD
			if ( attachment && attachment.type )
				props.type = attachment.type;
=======
			if ( attachment && attachment.type ) {
				props.type = attachment.type;
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			if ( 'image' === props.type ) {
				props = _.defaults( props || {}, {
					align:   defaultProps.align || getUserSetting( 'align', 'none' ),
					size:    defaultProps.size  || getUserSetting( 'imgsize', 'medium' ),
					url:     '',
					classes: []
				});
			}

			// All attachment-specific settings follow.
<<<<<<< HEAD
			if ( ! attachment )
				return fallbacks( props );
=======
			if ( ! attachment ) {
				return fallbacks( props );
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			props.title = props.title || attachment.title;

			link = props.link || defaultProps.link || getUserSetting( 'urlbutton', 'file' );
<<<<<<< HEAD
			if ( 'file' === link || 'embed' === link )
				linkUrl = attachment.url;
			else if ( 'post' === link )
				linkUrl = attachment.link;
			else if ( 'custom' === link )
				linkUrl = props.linkUrl;
=======
			if ( 'file' === link || 'embed' === link ) {
				linkUrl = attachment.url;
			} else if ( 'post' === link ) {
				linkUrl = attachment.link;
			} else if ( 'custom' === link ) {
				linkUrl = props.linkUrl;
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			props.linkUrl = linkUrl || '';

			// Format properties for images.
			if ( 'image' === attachment.type ) {
				props.classes.push( 'wp-image-' + attachment.id );

				sizes = attachment.sizes;
				size = sizes && sizes[ props.size ] ? sizes[ props.size ] : attachment;

				_.extend( props, _.pick( attachment, 'align', 'caption', 'alt' ), {
					width:     size.width,
					height:    size.height,
					src:       size.url,
					captionId: 'attachment_' + attachment.id
				});
			} else if ( 'video' === attachment.type || 'audio' === attachment.type ) {
				_.extend( props, _.pick( attachment, 'title', 'type', 'icon', 'mime' ) );
			// Format properties for non-images.
			} else {
				props.title = props.title || attachment.filename;
				props.rel = props.rel || 'attachment wp-att-' + attachment.id;
			}

			return fallbacks( props );
		},
<<<<<<< HEAD

=======
		/**
		 * Create link markup that is suitable for passing to the editor
		 *
		 * @global wp.html.string
		 *
		 * @param {Object} props Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {string} The link markup
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		link: function( props, attachment ) {
			var options;

			props = wp.media.string.props( props, attachment );

			options = {
				tag:     'a',
				content: props.title,
				attrs:   {
					href: props.linkUrl
				}
			};

<<<<<<< HEAD
			if ( props.rel )
				options.attrs.rel = props.rel;

			return wp.html.string( options );
		},

		audio: function( props, attachment ) {
			return wp.media.string._audioVideo( 'audio', props, attachment );
		},

		video: function( props, attachment ) {
			return wp.media.string._audioVideo( 'video', props, attachment );
		},

=======
			if ( props.rel ) {
				options.attrs.rel = props.rel;
			}

			return wp.html.string( options );
		},
		/**
		 * Create an Audio shortcode string that is suitable for passing to the editor
		 *
		 * @param {Object} props Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {string} The audio shortcode
		 */
		audio: function( props, attachment ) {
			return wp.media.string._audioVideo( 'audio', props, attachment );
		},
		/**
		 * Create a Video shortcode string that is suitable for passing to the editor
		 *
		 * @param {Object} props Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {string} The video shortcode
		 */
		video: function( props, attachment ) {
			return wp.media.string._audioVideo( 'video', props, attachment );
		},
		/**
		 * Helper function to create a media shortcode string
		 *
		 * @access private
		 *
		 * @global wp.shortcode
		 * @global wp.media.view.settings
		 *
		 * @param {string} type The shortcode tag name: 'audio' or 'video'.
		 * @param {Object} props Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {string} The media shortcode
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		_audioVideo: function( type, props, attachment ) {
			var shortcode, html, extension;

			props = wp.media.string.props( props, attachment );
			if ( props.link !== 'embed' )
				return wp.media.string.link( props );

			shortcode = {};

			if ( 'video' === type ) {
<<<<<<< HEAD
				if ( attachment.width )
					shortcode.width = attachment.width;

				if ( attachment.height )
					shortcode.height = attachment.height;
=======
				if ( attachment.image && -1 === attachment.image.src.indexOf( attachment.icon ) ) {
					shortcode.poster = attachment.image.src;
				}

				if ( attachment.width ) {
					shortcode.width = attachment.width;
				}

				if ( attachment.height ) {
					shortcode.height = attachment.height;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			}

			extension = attachment.filename.split('.').pop();

			if ( _.contains( wp.media.view.settings.embedExts, extension ) ) {
				shortcode[extension] = attachment.url;
			} else {
				// Render unsupported audio and video files as links.
				return wp.media.string.link( props );
			}

			html = wp.shortcode.string({
				tag:     type,
				attrs:   shortcode
			});

			return html;
		},
<<<<<<< HEAD

=======
		/**
		 * Create image markup, optionally with a link and/or wrapped in a caption shortcode,
		 *  that is suitable for passing to the editor
		 *
		 * @global wp.html
		 * @global wp.shortcode
		 *
		 * @param {Object} props Attachment details (align, link, size, etc).
		 * @param {Object} attachment The attachment object, media version of Post.
		 * @returns {string}
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		image: function( props, attachment ) {
			var img = {},
				options, classes, shortcode, html;

			props = wp.media.string.props( props, attachment );
			classes = props.classes || [];

<<<<<<< HEAD
			img.src = typeof attachment !== 'undefined' ? attachment.url : props.url;
=======
			img.src = ! _.isUndefined( attachment ) ? attachment.url : props.url;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			_.extend( img, _.pick( props, 'width', 'height', 'alt' ) );

			// Only assign the align class to the image if we're not printing
			// a caption, since the alignment is sent to the shortcode.
<<<<<<< HEAD
			if ( props.align && ! props.caption )
				classes.push( 'align' + props.align );

			if ( props.size )
				classes.push( 'size-' + props.size );
=======
			if ( props.align && ! props.caption ) {
				classes.push( 'align' + props.align );
			}

			if ( props.size ) {
				classes.push( 'size-' + props.size );
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			img['class'] = _.compact( classes ).join(' ');

			// Generate `img` tag options.
			options = {
				tag:    'img',
				attrs:  img,
				single: true
			};

			// Generate the `a` element options, if they exist.
			if ( props.linkUrl ) {
				options = {
					tag:   'a',
					attrs: {
						href: props.linkUrl
					},
					content: options
				};
			}

			html = wp.html.string( options );

			// Generate the caption shortcode.
			if ( props.caption ) {
				shortcode = {};

<<<<<<< HEAD
				if ( img.width )
					shortcode.width = img.width;

				if ( props.captionId )
					shortcode.id = props.captionId;

				if ( props.align )
					shortcode.align = 'align' + props.align;
=======
				if ( img.width ) {
					shortcode.width = img.width;
				}

				if ( props.captionId ) {
					shortcode.id = props.captionId;
				}

				if ( props.align ) {
					shortcode.align = 'align' + props.align;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				html = wp.shortcode.string({
					tag:     'caption',
					attrs:   shortcode,
					content: html + ' ' + props.caption
				});
			}

			return html;
		}
	};

<<<<<<< HEAD
	wp.media.gallery = (function() {
		var galleries = {};

		return {
			defaults: {
				order:      'ASC',
				id:         wp.media.view.settings.post.id,
				itemtag:    'dl',
				icontag:    'dt',
				captiontag: 'dd',
				columns:    '3',
				link:       'post',
				size:       'thumbnail',
				orderby:    'menu_order ID'
			},

			attachments: function( shortcode ) {
				var shortcodeString = shortcode.string(),
					result = galleries[ shortcodeString ],
					attrs, args, query, others;

				delete galleries[ shortcodeString ];

				if ( result )
					return result;

				// Fill the default shortcode attributes.
				attrs = _.defaults( shortcode.attrs.named, wp.media.gallery.defaults );
				args  = _.pick( attrs, 'orderby', 'order' );

				args.type    = 'image';
				args.perPage = -1;

				// Mark the `orderby` override attribute.
				if( undefined !== attrs.orderby )
					attrs._orderByField = attrs.orderby;

				if ( 'rand' === attrs.orderby )
					attrs._orderbyRandom = true;

				// Map the `orderby` attribute to the corresponding model property.
				if ( ! attrs.orderby || /^menu_order(?: ID)?$/i.test( attrs.orderby ) )
					args.orderby = 'menuOrder';
=======
	wp.media.collection = function(attributes) {
		var collections = {};

		return _.extend( attributes, {
			coerce : wp.media.coerce,
			/**
			 * Retrieve attachments based on the properties of the passed shortcode
			 *
			 * @global wp.media.query
			 *
			 * @param {wp.shortcode} shortcode An instance of wp.shortcode().
			 * @returns {wp.media.model.Attachments} A Backbone.Collection containing
			 *      the media items belonging to a collection.
			 *      The query[ this.tag ] property is a Backbone.Model
			 *          containing the 'props' for the collection.
			 */
			attachments: function( shortcode ) {
				var shortcodeString = shortcode.string(),
					result = collections[ shortcodeString ],
					attrs, args, query, others, self = this;

				delete collections[ shortcodeString ];
				if ( result ) {
					return result;
				}
				// Fill the default shortcode attributes.
				attrs = _.defaults( shortcode.attrs.named, this.defaults );
				args  = _.pick( attrs, 'orderby', 'order' );

				args.type    = this.type;
				args.perPage = -1;

				// Mark the `orderby` override attribute.
				if ( undefined !== attrs.orderby ) {
					attrs._orderByField = attrs.orderby;
				}

				if ( 'rand' === attrs.orderby ) {
					attrs._orderbyRandom = true;
				}

				// Map the `orderby` attribute to the corresponding model property.
				if ( ! attrs.orderby || /^menu_order(?: ID)?$/i.test( attrs.orderby ) ) {
					args.orderby = 'menuOrder';
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				// Map the `ids` param to the correct query args.
				if ( attrs.ids ) {
					args.post__in = attrs.ids.split(',');
					args.orderby  = 'post__in';
				} else if ( attrs.include ) {
					args.post__in = attrs.include.split(',');
				}

<<<<<<< HEAD
				if ( attrs.exclude )
					args.post__not_in = attrs.exclude.split(',');

				if ( ! args.post__in )
					args.uploadedTo = attrs.id;
=======
				if ( attrs.exclude ) {
					args.post__not_in = attrs.exclude.split(',');
				}

				if ( ! args.post__in ) {
					args.uploadedTo = attrs.id;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				// Collect the attributes that were not included in `args`.
				others = _.omit( attrs, 'id', 'ids', 'include', 'exclude', 'orderby', 'order' );

<<<<<<< HEAD
				query = wp.media.query( args );
				query.gallery = new Backbone.Model( others );
				return query;
			},

			shortcode: function( attachments ) {
				var props = attachments.props.toJSON(),
					attrs = _.pick( props, 'orderby', 'order' ),
					shortcode, clone;

				if ( attachments.gallery )
					_.extend( attrs, attachments.gallery.toJSON() );
=======
				_.each( this.defaults, function( value, key ) {
					others[ key ] = self.coerce( others, key );
				});

				query = wp.media.query( args );
				query[ this.tag ] = new Backbone.Model( others );
				return query;
			},
			/**
			 * Triggered when clicking 'Insert {label}' or 'Update {label}'
			 *
			 * @global wp.shortcode
			 * @global wp.media.model.Attachments
			 *
			 * @param {wp.media.model.Attachments} attachments A Backbone.Collection containing
			 *      the media items belonging to a collection.
			 *      The query[ this.tag ] property is a Backbone.Model
			 *          containing the 'props' for the collection.
			 * @returns {wp.shortcode}
			 */
			shortcode: function( attachments ) {
				var props = attachments.props.toJSON(),
					attrs = _.pick( props, 'orderby', 'order' ),
					shortcode, clone, self = this;

				if ( attachments.type ) {
					attrs.type = attachments.type;
					delete attachments.type;
				}

				if ( attachments[this.tag] ) {
					_.extend( attrs, attachments[this.tag].toJSON() );
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				// Convert all gallery shortcodes to use the `ids` property.
				// Ignore `post__in` and `post__not_in`; the attachments in
				// the collection will already reflect those properties.
				attrs.ids = attachments.pluck('id');

				// Copy the `uploadedTo` post ID.
<<<<<<< HEAD
				if ( props.uploadedTo )
					attrs.id = props.uploadedTo;

				// Check if the gallery is randomly ordered.
				delete attrs.orderby;

				if ( attrs._orderbyRandom )
					attrs.orderby = 'rand';
				else if ( attrs._orderByField && attrs._orderByField != 'rand' )
					attrs.orderby = attrs._orderByField;
=======
				if ( props.uploadedTo ) {
					attrs.id = props.uploadedTo;
				}
				// Check if the gallery is randomly ordered.
				delete attrs.orderby;

				if ( attrs._orderbyRandom ) {
					attrs.orderby = 'rand';
				} else if ( attrs._orderByField && attrs._orderByField != 'rand' ) {
					attrs.orderby = attrs._orderByField;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				delete attrs._orderbyRandom;
				delete attrs._orderByField;

				// If the `ids` attribute is set and `orderby` attribute
				// is the default value, clear it for cleaner output.
<<<<<<< HEAD
				if ( attrs.ids && 'post__in' === attrs.orderby )
					delete attrs.orderby;

				// Remove default attributes from the shortcode.
				_.each( wp.media.gallery.defaults, function( value, key ) {
					if ( value === attrs[ key ] )
						delete attrs[ key ];
				});

				shortcode = new wp.shortcode({
					tag:    'gallery',
=======
				if ( attrs.ids && 'post__in' === attrs.orderby ) {
					delete attrs.orderby;
				}

				// Remove default attributes from the shortcode.
				_.each( this.defaults, function( value, key ) {
					attrs[ key ] = self.coerce( attrs, key );
					if ( value === attrs[ key ] ) {
						delete attrs[ key ];
					}
				});

				shortcode = new wp.shortcode({
					tag:    this.tag,
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					attrs:  attrs,
					type:   'single'
				});

				// Use a cloned version of the gallery.
				clone = new wp.media.model.Attachments( attachments.models, {
					props: props
				});
<<<<<<< HEAD
				clone.gallery = attachments.gallery;
				galleries[ shortcode.string() ] = clone;

				return shortcode;
			},

			edit: function( content ) {
				var shortcode = wp.shortcode.next( 'gallery', content ),
					defaultPostId = wp.media.gallery.defaults.id,
					attachments, selection;

				// Bail if we didn't match the shortcode or all of the content.
				if ( ! shortcode || shortcode.content !== content )
					return;
=======
				clone[ this.tag ] = attachments[ this.tag ];
				collections[ shortcode.string() ] = clone;

				return shortcode;
			},
			/**
			 * Triggered when double-clicking a collection shortcode placeholder
			 *   in the editor
			 *
			 * @global wp.shortcode
			 * @global wp.media.model.Selection
			 * @global wp.media.view.l10n
			 *
			 * @param {string} content Content that is searched for possible
			 *    shortcode markup matching the passed tag name,
			 *
			 * @this wp.media.{prop}
			 *
			 * @returns {wp.media.view.MediaFrame.Select} A media workflow.
			 */
			edit: function( content ) {
				var shortcode = wp.shortcode.next( this.tag, content ),
					defaultPostId = this.defaults.id,
					attachments, selection, state;

				// Bail if we didn't match the shortcode or all of the content.
				if ( ! shortcode || shortcode.content !== content ) {
					return;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				// Ignore the rest of the match object.
				shortcode = shortcode.shortcode;

<<<<<<< HEAD
				if ( _.isUndefined( shortcode.get('id') ) && ! _.isUndefined( defaultPostId ) )
					shortcode.set( 'id', defaultPostId );

				attachments = wp.media.gallery.attachments( shortcode );
=======
				if ( _.isUndefined( shortcode.get('id') ) && ! _.isUndefined( defaultPostId ) ) {
					shortcode.set( 'id', defaultPostId );
				}

				attachments = this.attachments( shortcode );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				selection = new wp.media.model.Selection( attachments.models, {
					props:    attachments.props.toJSON(),
					multiple: true
				});

<<<<<<< HEAD
				selection.gallery = attachments.gallery;
=======
				selection[ this.tag ] = attachments[ this.tag ];
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				// Fetch the query's attachments, and then break ties from the
				// query to allow for sorting.
				selection.more().done( function() {
					// Break ties with the query.
					selection.props.set({ query: false });
					selection.unmirror();
					selection.props.unset('orderby');
				});

				// Destroy the previous gallery frame.
<<<<<<< HEAD
				if ( this.frame )
					this.frame.dispose();

				// Store the current gallery frame.
				this.frame = wp.media({
					frame:     'post',
					state:     'gallery-edit',
					title:     wp.media.view.l10n.editGalleryTitle,
=======
				if ( this.frame ) {
					this.frame.dispose();
				}

				if ( shortcode.attrs.named.type && 'video' === shortcode.attrs.named.type ) {
					state = 'video-' + this.tag + '-edit';
				} else {
					state = this.tag + '-edit';
				}

				// Store the current frame.
				this.frame = wp.media({
					frame:     'post',
					state:     state,
					title:     this.editTitle,
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					editing:   true,
					multiple:  true,
					selection: selection
				}).open();

				return this.frame;
			}
<<<<<<< HEAD
		};
	}());

	wp.media.featuredImage = {
		get: function() {
			return wp.media.view.settings.post.featuredImageId;
		},

=======
		});
	};

	wp.media.gallery = new wp.media.collection({
		tag: 'gallery',
		type : 'image',
		editTitle : wp.media.view.l10n.editGalleryTitle,
		defaults : {
			itemtag: 'dl',
			icontag: 'dt',
			captiontag: 'dd',
			columns: '3',
			link: 'post',
			size: 'thumbnail',
			order: 'ASC',
			id: wp.media.view.settings.post && wp.media.view.settings.post.id,
			orderby : 'menu_order ID'
		}
	});

	/**
	 * wp.media.featuredImage
	 * @namespace
	 */
	wp.media.featuredImage = {
		/**
		 * Get the featured image post ID
		 *
		 * @global wp.media.view.settings
		 *
		 * @returns {wp.media.view.settings.post.featuredImageId|number}
		 */
		get: function() {
			return wp.media.view.settings.post.featuredImageId;
		},
		/**
		 * Set the featured image id, save the post thumbnail data and
		 * set the HTML in the post meta box to the new featured image.
		 *
		 * @global wp.media.view.settings
		 * @global wp.media.post
		 *
		 * @param {number} id The post ID of the featured image, or -1 to unset it.
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		set: function( id ) {
			var settings = wp.media.view.settings;

			settings.post.featuredImageId = id;

			wp.media.post( 'set-post-thumbnail', {
				json:         true,
				post_id:      settings.post.id,
				thumbnail_id: settings.post.featuredImageId,
				_wpnonce:     settings.post.nonce
			}).done( function( html ) {
				$( '.inside', '#postimagediv' ).html( html );
			});
		},
<<<<<<< HEAD

		frame: function() {
			if ( this._frame )
				return this._frame;

			this._frame = wp.media({
				state: 'featured-image',
				states: [ new wp.media.controller.FeaturedImage() ]
			});

			this._frame.on( 'toolbar:create:featured-image', function( toolbar ) {
=======
		/**
		 * The Featured Image workflow
		 *
		 * @global wp.media.controller.FeaturedImage
		 * @global wp.media.view.l10n
		 *
		 * @this wp.media.featuredImage
		 *
		 * @returns {wp.media.view.MediaFrame.Select} A media workflow.
		 */
		frame: function() {
			if ( this._frame ) {
				return this._frame;
			}

			this._frame = wp.media({
				state: 'featured-image',
				states: [ new wp.media.controller.FeaturedImage() , new wp.media.controller.EditImage() ]
			});

			this._frame.on( 'toolbar:create:featured-image', function( toolbar ) {
				/**
				 * @this wp.media.view.MediaFrame.Select
				 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				this.createSelectToolbar( toolbar, {
					text: wp.media.view.l10n.setFeaturedImage
				});
			}, this._frame );

<<<<<<< HEAD
			this._frame.state('featured-image').on( 'select', this.select );
			return this._frame;
		},

		select: function() {
			var settings = wp.media.view.settings,
				selection = this.get('selection').single();

			if ( ! settings.post.featuredImageId )
				return;

			wp.media.featuredImage.set( selection ? selection.id : -1 );
		},

		init: function() {
			// Open the content media manager to the 'featured image' tab when
			// the post thumbnail is clicked.
=======
			this._frame.on( 'content:render:edit-image', function() {
				var selection = this.state('featured-image').get('selection'),
					view = new wp.media.view.EditImage( { model: selection.single(), controller: this } ).render();

				this.content.set( view );

				// after bringing in the frame, load the actual editor via an ajax call
				view.loadEditor();

			}, this._frame );

			this._frame.state('featured-image').on( 'select', this.select );
			return this._frame;
		},
		/**
		 * 'select' callback for Featured Image workflow, triggered when
		 *  the 'Set Featured Image' button is clicked in the media modal.
		 *
		 * @global wp.media.view.settings
		 *
		 * @this wp.media.controller.FeaturedImage
		 */
		select: function() {
			var selection = this.get('selection').single();

			if ( ! wp.media.view.settings.post.featuredImageId ) {
				return;
			}

			wp.media.featuredImage.set( selection ? selection.id : -1 );
		},
		/**
		 * Open the content media manager to the 'featured image' tab when
		 * the post thumbnail is clicked.
		 *
		 * Update the featured image id when the 'remove' link is clicked.
		 *
		 * @global wp.media.view.settings
		 */
		init: function() {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			$('#postimagediv').on( 'click', '#set-post-thumbnail', function( event ) {
				event.preventDefault();
				// Stop propagation to prevent thickbox from activating.
				event.stopPropagation();

				wp.media.featuredImage.frame().open();
<<<<<<< HEAD

			// Update the featured image id when the 'remove' link is clicked.
=======
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			}).on( 'click', '#remove-post-thumbnail', function() {
				wp.media.view.settings.post.featuredImageId = -1;
			});
		}
	};

	$( wp.media.featuredImage.init );

<<<<<<< HEAD
	wp.media.editor = {
		insert: function( h ) {
			var mce = typeof(tinymce) != 'undefined',
				qt = typeof(QTags) != 'undefined',
				wpActiveEditor = window.wpActiveEditor,
				ed;
=======
	/**
	 * wp.media.editor
	 * @namespace
	 */
	wp.media.editor = {
		/**
		 * Send content to the editor
		 *
		 * @global tinymce
		 * @global QTags
		 * @global wpActiveEditor
		 * @global tb_remove() - Possibly overloaded by legacy plugins
		 *
		 * @param {string} html Content to send to the editor
		 */
		insert: function( html ) {
			var editor,
				hasTinymce = ! _.isUndefined( window.tinymce ),
				hasQuicktags = ! _.isUndefined( window.QTags ),
				wpActiveEditor = window.wpActiveEditor;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			// Delegate to the global `send_to_editor` if it exists.
			// This attempts to play nice with any themes/plugins that have
			// overridden the insert functionality.
<<<<<<< HEAD
			if ( window.send_to_editor )
				return window.send_to_editor.apply( this, arguments );

			if ( ! wpActiveEditor ) {
				if ( mce && tinymce.activeEditor ) {
					ed = tinymce.activeEditor;
					wpActiveEditor = window.wpActiveEditor = ed.id;
				} else if ( !qt ) {
					return false;
				}
			} else if ( mce ) {
				if ( tinymce.activeEditor && (tinymce.activeEditor.id == 'mce_fullscreen' || tinymce.activeEditor.id == 'wp_mce_fullscreen') )
					ed = tinymce.activeEditor;
				else
					ed = tinymce.get(wpActiveEditor);
			}

			if ( ed && !ed.isHidden() ) {
				// restore caret position on IE
				if ( tinymce.isIE && ed.windowManager.insertimagebookmark )
					ed.selection.moveToBookmark(ed.windowManager.insertimagebookmark);

				if ( h.indexOf('[caption') !== -1 ) {
					if ( ed.wpSetImgCaption )
						h = ed.wpSetImgCaption(h);
				} else if ( h.indexOf('[gallery') !== -1 ) {
					if ( ed.plugins.wpgallery )
						h = ed.plugins.wpgallery._do_gallery(h);
				} else if ( h.indexOf('[embed') === 0 ) {
					if ( ed.plugins.wordpress )
						h = ed.plugins.wordpress._setEmbed(h);
				}

				ed.execCommand('mceInsertContent', false, h);
			} else if ( qt ) {
				QTags.insertContent(h);
			} else {
				document.getElementById(wpActiveEditor).value += h;
=======
			if ( window.send_to_editor ) {
				return window.send_to_editor.apply( this, arguments );
			}

			if ( ! wpActiveEditor ) {
				if ( hasTinymce && tinymce.activeEditor ) {
					editor = tinymce.activeEditor;
					wpActiveEditor = window.wpActiveEditor = editor.id;
				} else if ( ! hasQuicktags ) {
					return false;
				}
			} else if ( hasTinymce ) {
				editor = tinymce.get( wpActiveEditor );
			}

			if ( editor && ! editor.isHidden() ) {
				editor.execCommand( 'mceInsertContent', false, html );
			} else if ( hasQuicktags ) {
				QTags.insertContent( html );
			} else {
				document.getElementById( wpActiveEditor ).value += html;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			}

			// If the old thickbox remove function exists, call it in case
			// a theme/plugin overloaded it.
<<<<<<< HEAD
			if ( window.tb_remove )
				try { window.tb_remove(); } catch( e ) {}
		},

		add: function( id, options ) {
			var workflow = this.get( id );

			if ( workflow ) // only add once: if exists return existing
				return workflow;
=======
			if ( window.tb_remove ) {
				try { window.tb_remove(); } catch( e ) {}
			}
		},

		/**
		 * Setup 'workflow' and add to the 'workflows' cache. 'open' can
		 *  subsequently be called upon it.
		 *
		 * @global wp.media.view.l10n
		 *
		 * @param {string} id A slug used to identify the workflow.
		 * @param {Object} [options={}]
		 *
		 * @this wp.media.editor
		 *
		 * @returns {wp.media.view.MediaFrame.Select} A media workflow.
		 */
		add: function( id, options ) {
			var workflow = this.get( id );

			// only add once: if exists return existing
			if ( workflow ) {
				return workflow;
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			workflow = workflows[ id ] = wp.media( _.defaults( options || {}, {
				frame:    'post',
				state:    'insert',
				title:    wp.media.view.l10n.addMedia,
				multiple: true
			} ) );

			workflow.on( 'insert', function( selection ) {
				var state = workflow.state();

				selection = selection || state.get('selection');

				if ( ! selection )
					return;

				$.when.apply( $, selection.map( function( attachment ) {
					var display = state.display( attachment ).toJSON();
<<<<<<< HEAD
=======
					/**
					 * @this wp.media.editor
					 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
					return this.send.attachment( display, attachment.toJSON() );
				}, this ) ).done( function() {
					wp.media.editor.insert( _.toArray( arguments ).join('\n\n') );
				});
			}, this );

			workflow.state('gallery-edit').on( 'update', function( selection ) {
<<<<<<< HEAD
				this.insert( wp.media.gallery.shortcode( selection ).string() );
			}, this );

			workflow.state('embed').on( 'select', function() {
=======
				/**
				 * @this wp.media.editor
				 */
				this.insert( wp.media.gallery.shortcode( selection ).string() );
			}, this );

			workflow.state('playlist-edit').on( 'update', function( selection ) {
				/**
				 * @this wp.media.editor
				 */
				this.insert( wp.media.playlist.shortcode( selection ).string() );
			}, this );

			workflow.state('video-playlist-edit').on( 'update', function( selection ) {
				/**
				 * @this wp.media.editor
				 */
				this.insert( wp.media.playlist.shortcode( selection ).string() );
			}, this );

			workflow.state('embed').on( 'select', function() {
				/**
				 * @this wp.media.editor
				 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				var state = workflow.state(),
					type = state.get('type'),
					embed = state.props.toJSON();

				embed.url = embed.url || '';

				if ( 'link' === type ) {
					_.defaults( embed, {
						title:   embed.url,
						linkUrl: embed.url
					});

					this.send.link( embed ).done( function( resp ) {
						wp.media.editor.insert( resp );
					});

				} else if ( 'image' === type ) {
					_.defaults( embed, {
						title:   embed.url,
						linkUrl: '',
						align:   'none',
						link:    'none'
					});

<<<<<<< HEAD
					if ( 'none' === embed.link )
						embed.linkUrl = '';
					else if ( 'file' === embed.link )
						embed.linkUrl = embed.url;
=======
					if ( 'none' === embed.link ) {
						embed.linkUrl = '';
					} else if ( 'file' === embed.link ) {
						embed.linkUrl = embed.url;
					}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

					this.insert( wp.media.string.image( embed ) );
				}
			}, this );

			workflow.state('featured-image').on( 'select', wp.media.featuredImage.select );
			workflow.setState( workflow.options.state );
			return workflow;
		},
<<<<<<< HEAD

		id: function( id ) {
			if ( id )
				return id;
=======
		/**
		 * Determines the proper current workflow id
		 *
		 * @global wpActiveEditor
		 * @global tinymce
		 *
		 * @param {string} [id=''] A slug used to identify the workflow.
		 *
		 * @returns {wpActiveEditor|string|tinymce.activeEditor.id}
		 */
		id: function( id ) {
			if ( id ) {
				return id;
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			// If an empty `id` is provided, default to `wpActiveEditor`.
			id = wpActiveEditor;

			// If that doesn't work, fall back to `tinymce.activeEditor.id`.
<<<<<<< HEAD
			if ( ! id && typeof tinymce !== 'undefined' && tinymce.activeEditor )
				id = tinymce.activeEditor.id;
=======
			if ( ! id && ! _.isUndefined( window.tinymce ) && tinymce.activeEditor ) {
				id = tinymce.activeEditor.id;
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			// Last but not least, fall back to the empty string.
			id = id || '';
			return id;
		},
<<<<<<< HEAD

=======
		/**
		 * Return the workflow specified by id
		 *
		 * @param {string} id A slug used to identify the workflow.
		 *
		 * @this wp.media.editor
		 *
		 * @returns {wp.media.view.MediaFrame} A media workflow.
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		get: function( id ) {
			id = this.id( id );
			return workflows[ id ];
		},
<<<<<<< HEAD

=======
		/**
		 * Remove the workflow represented by id from the workflow cache
		 *
		 * @param {string} id A slug used to identify the workflow.
		 *
		 * @this wp.media.editor
		 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		remove: function( id ) {
			id = this.id( id );
			delete workflows[ id ];
		},
<<<<<<< HEAD

		send: {
=======
		/**
		 * @namespace
		 */
		send: {
			/**
			 * Called when sending an attachment to the editor
			 *   from the medial modal.
			 *
			 * @global wp.media.view.settings
			 * @global wp.media.post
			 *
			 * @param {Object} props Attachment details (align, link, size, etc).
			 * @param {Object} attachment The attachment object, media version of Post.
			 * @returns {Promise}
			 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			attachment: function( props, attachment ) {
				var caption = attachment.caption,
					options, html;

				// If captions are disabled, clear the caption.
<<<<<<< HEAD
				if ( ! wp.media.view.settings.captions )
					delete attachment.caption;
=======
				if ( ! wp.media.view.settings.captions ) {
					delete attachment.caption;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				props = wp.media.string.props( props, attachment );

				options = {
					id:           attachment.id,
					post_content: attachment.description,
					post_excerpt: caption
				};

<<<<<<< HEAD
				if ( props.linkUrl )
					options.url = props.linkUrl;
=======
				if ( props.linkUrl ) {
					options.url = props.linkUrl;
				}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

				if ( 'image' === attachment.type ) {
					html = wp.media.string.image( props );

					_.each({
						align: 'align',
						size:  'image-size',
						alt:   'image_alt'
					}, function( option, prop ) {
						if ( props[ prop ] )
							options[ option ] = props[ prop ];
					});
				} else if ( 'video' === attachment.type ) {
					html = wp.media.string.video( props, attachment );
				} else if ( 'audio' === attachment.type ) {
					html = wp.media.string.audio( props, attachment );
				} else {
					html = wp.media.string.link( props );
					options.post_title = props.title;
				}

				return wp.media.post( 'send-attachment-to-editor', {
					nonce:      wp.media.view.settings.nonce.sendToEditor,
					attachment: options,
					html:       html,
					post_id:    wp.media.view.settings.post.id
				});
			},
<<<<<<< HEAD

=======
			/**
			 * Called when 'Insert From URL' source is not an image. Example: YouTube url.
			 *
			 * @global wp.media.view.settings
			 *
			 * @param {Object} embed
			 * @returns {Promise}
			 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
			link: function( embed ) {
				return wp.media.post( 'send-link-to-editor', {
					nonce:   wp.media.view.settings.nonce.sendToEditor,
					src:     embed.linkUrl,
					title:   embed.title,
					html:    wp.media.string.link( embed ),
					post_id: wp.media.view.settings.post.id
				});
			}
		},
<<<<<<< HEAD

		open: function( id, options ) {
			var workflow, editor;
=======
		/**
		 * Open a workflow
		 *
		 * @param {string} [id=undefined] Optional. A slug used to identify the workflow.
		 * @param {Object} [options={}]
		 *
		 * @this wp.media.editor
		 *
		 * @returns {wp.media.view.MediaFrame}
		 */
		open: function( id, options ) {
			var workflow;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			options = options || {};

			id = this.id( id );
<<<<<<< HEAD

			// Save a bookmark of the caret position in IE.
			if ( typeof tinymce !== 'undefined' ) {
=======
/*
			// Save a bookmark of the caret position in IE.
			if ( ! _.isUndefined( window.tinymce ) ) {
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
				editor = tinymce.get( id );

				if ( tinymce.isIE && editor && ! editor.isHidden() ) {
					editor.focus();
					editor.windowManager.insertimagebookmark = editor.selection.getBookmark();
				}
			}
<<<<<<< HEAD

			workflow = this.get( id );

			// Redo workflow if state has changed
			if ( ! workflow || ( workflow.options && options.state !== workflow.options.state ) )
				workflow = this.add( id, options );
=======
*/
			workflow = this.get( id );

			// Redo workflow if state has changed
			if ( ! workflow || ( workflow.options && options.state !== workflow.options.state ) ) {
				workflow = this.add( id, options );
			}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

			return workflow.open();
		},

<<<<<<< HEAD
		init: function() {
			$(document.body).on( 'click', '.insert-media', function( event ) {
				var $this = $(this),
					editor = $this.data('editor'),
					options = {
						frame:    'post',
						state:    'insert',
						title:    wp.media.view.l10n.addMedia,
						multiple: true
					};

				event.preventDefault();

				// Remove focus from the `.insert-media` button.
				// Prevents Opera from showing the outline of the button
				// above the modal.
				//
				// See: http://core.trac.wordpress.org/ticket/22445
				$this.blur();

				if ( $this.hasClass( 'gallery' ) ) {
					options.state = 'gallery';
					options.title = wp.media.view.l10n.createGalleryTitle;
				}

				wp.media.editor.open( editor, options );
			});
=======
		/**
		 * Bind click event for .insert-media using event delegation
		 *
		 * @global wp.media.view.l10n
		 */
		init: function() {
			$(document.body)
				.on( 'click', '.insert-media', function( event ) {
					var elem = $( event.currentTarget ),
						editor = elem.data('editor'),
						options = {
							frame:    'post',
							state:    'insert',
							title:    wp.media.view.l10n.addMedia,
							multiple: true
						};

					event.preventDefault();

					// Remove focus from the `.insert-media` button.
					// Prevents Opera from showing the outline of the button
					// above the modal.
					//
					// See: http://core.trac.wordpress.org/ticket/22445
					elem.blur();

					if ( elem.hasClass( 'gallery' ) ) {
						options.state = 'gallery';
						options.title = wp.media.view.l10n.createGalleryTitle;
					}

					wp.media.editor.open( editor, options );
				});

			// Initialize and render the Editor drag-and-drop uploader.
			new wp.media.view.EditorUploader().render();
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		}
	};

	_.bindAll( wp.media.editor, 'open' );
	$( wp.media.editor.init );
<<<<<<< HEAD
}(jQuery));
=======
}(jQuery, _));
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
