<?php

/**
 * @file
 * Bartik's theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */

global $base_path;

drupal_add_js(drupal_get_path('theme', 'gotriptv').'/templates/imgshare.js', array('scope'=>'footer'));

?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="meta submitted">
      <?php print $user_picture; ?>
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

<?php
  global $user;
  if (($user->uid == $node->uid) || (array_key_exists(3, $user->roles)) ) { ?>


	<div class="gallery-edit-link">
    <ul class="field action-links">
      <li>
        <?php global $language;
        if ($language->language == 'pt-br'){
          print '<a class="media-gallery-edit" href="'.$base_path."pt-br/node/". $node->nid.'/edit">Editar Album</a>';
        }
        elseif ($language->language == 'en'){
          print '<a class="media-gallery-edit" href="'.$base_path."en/node/". $node->nid.'/edit">Edit Album</a>';
        }
        elseif ($language->language == 'es'){
         print '<a class="media-gallery-edit" href="'.$base_path."es/node/". $node->nid.'/edit">Editar Album</a>';
        }
        ?>
      </li>
      <li>
        <?php global $language;
        if ($language->language == 'pt-br'){
          print '<a class="media-gallery-photo-add colorbox-inline" href="?width=600&height=350&inline=true#block-views-add-photo-block-1">Adicionar Nova Foto</a>';
        }
        elseif ($language->language == 'en'){
          print '<a class="media-gallery-photo-add colorbox-inline" href="?width=600&height=350&inline=true#block-views-add-photo-block-1">Add New Photo</a>';
        }
        elseif ($language->language == 'es'){
         print '<a class="media-gallery-photo-add colorbox-inline" href="?width=600&height=350&inline=true#block-views-add-photo-block-1">Anadir Nueva Foto</a>';
        }
        ?>
      </li>
    </ul>
  </div>

<?php

  }

?>



  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content['media_gallery_description']);
    ?>

    <div class="field field-name-field-gallery-image field-type-image field-label-hidden">
      <div class="field-items">
        <?php
          $i = 1;
          global $base_url;
          foreach ($node->field_gallery_image['und'] as $key => $value) {
            echo '<div id="item-'.$i.'" class="field-item">';
              echo '<a rel="gall" class="colorbox-inline" href="?inline=true#item-'.$i.'">';
                echo '<img title="' . $value['title'] . '" alt="" src="' . file_create_url($value['uri']) . '" />';
              // echo '<div id="item-'.$i.'-social" class="gallery-social"><div class="fb-share-button" data-layout="button_count" data-href="' . file_create_url($value['uri']) . '"></div></div>';
              echo '</a>';
              echo '<div class="pinit"><a href="//www.pinterest.com/pin/create/button/?url='.$base_url.'&media='.file_create_url($value['uri']).'&description='.$value['title'].'" data-pin-do="buttonPin" data-pin-config="above" data-pin-color="red" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png" /></a></div>';
            ?>
            <div class="tumb"><a href="http://www.tumblr.com/share/photo?source=<?php echo urlencode(file_create_url($value['uri'])); ?>&caption=<?php echo urlencode($value['title']); ?>&clickthru=<?php echo urlencode($base_url."/pt-br/node/". $node->nid); ?>" title="Share on Tumblr" style="display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('https://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;">Share on Tumblr</a></div>
            <?php
              //echo '<div class="g-plus" data-action="share" data-href="'.file_create_url($value['uri']).'"></div>';
              echo '<span class="img-title">'.$value['title'].'</span>';
              //echo '<a href="https://twitter.com/share" class="twitter-share-button" data-url="'.$base_url.'" data-text="'.$value['title'].'">Tweet</a>';
            echo '</div>';
            $i++;
          }
        ?>

      </div>
      </div>
    </div>

  <?php
    // Remove the "Add new comment" link on the teaser page or if the comment
    // form is being displayed on the same page.
    if ($teaser || !empty($content['comments']['comment_form'])) {
      unset($content['links']['comment']['#links']['comment-add']);
    }
    // Only display the wrapper div if there are links.
    $links = render($content['links']);
    if ($links):
  ?>
    <div class="link-wrapper">
      <?php print $links; ?>
    </div>
  <?php endif; ?>

  <?php print render($content['comments']); ?>

  <div id="the-add-photo-block">
    <?php
      $addphoto_block = block_load('views', 'add_photo-block_1');
      $addphoto_block1=_block_get_renderable_array( _block_render_blocks( array($addphoto_block) ));
      print render($addphoto_block1);
    ?>
  </div>

</div>
<?php // print kpr($form); 
if($node->nid =='tracker')
{
global $language;
if ($language->language == 'pt-br'){

 print '<h1>Gerenciar conteúdos</h1>';
}
elseif ($language->language == 'en'){

  print '<h1>Manage Content</h1>';
}
elseif ($language->language == 'es'){

 print '<h1>Administrar Contenido</h1>';
}
}
?>