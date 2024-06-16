<?php
/**
 * @file
 * Gotripps's theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template normally located in the
 * modules/system directory.
 *
 */

?>
<?php global $base_url; ?>
<?php
	$file_url = '';
	$file_fid = theme_get_setting('site_bg');
	if(!empty($file_fid)) {
		$file_loaded = file_load($file_fid);
		if($file_loaded !== false) {
			if(!empty($file_loaded->uri)) {
				$file_url_raw = file_create_url($file_loaded->uri);
				if($file_url_raw !== false) {
				    $file_url = $file_url_raw;
				}
			}
		}
	}
?>
<div class="container site-container">
    <header class="container site-header">
      <!-- background -->
      <div class="row supheader">
        <div class="logo">
          <a href="<?php print $front_page; ?>" rel="home" id="logo" title="<?php print t('Home'); ?>">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>">
          </a>
          <?php
				$logo_social_icons_block = block_load('block', '144');
				$logo_social_icons_block1=_block_get_renderable_array( _block_render_blocks( array($logo_social_icons_block) ));
				print render($logo_social_icons_block1);
		  ?>
        </div>
        <!-- logo -->
        <?php print render($page['header']); ?>
        <div class="nav_toggle">
        <span></span>
        <span></span>
        <span></span>
        </div>
        <div id="menu-row">
          <nav class="header-menu mobile_menu">
            <div class="menu"> 
              <?php print render($page['mainmenu']); ?>
            </div> 
            <?php
              /*$external_msg_block_1 = block_load('block', '116');
              $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
              print render($external_msg_block2);*/
            ?>
            <?php print render($page['header_left']); ?>
          <!-- social links -->       
          </nav>
        </div>        
        <div class="clear"></div>
        <!--/ select menu-->            
      </div>
    </header>
    <!-- header -->
    <div class="full_main">
    <section class="container site-content row">
		<?php if ($title): ?>
	        <h1 class="title" id="page-title">
          		<?php print $title; ?>
        	</h1>
      	<?php endif; ?>

<?php print $messages; ?>
  <!--  <?php if ($tabs): ?>
      <div class="tabs">
        <?php print render($tabs); ?>
      </div>
    <?php endif; ?>-->

  <?php print render($page['sidebar_first']); ?>
    <?php print render($page['content']); ?>

 
    
	<?php print render($page['sidebar_second_top']); ?>
	<?php print render($page['sidebar_second']); ?>
	<?php print render($page['contentbtm']); ?>
	<?php print render($page['contentbottom']); ?>
    </section>

   </div>

    <!-- content -->
    <footer class="container site-footer">    
      <div class="row">

  <div class="footer_language">
          <?php
            $external_msg_block_1 = block_load('locale', 'language');
            $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
            print render($external_msg_block2);
          ?>
        </div>
    

        <div class="copyright">
			<a href="<?php echo $base_url; ?>"><?php echo theme_get_setting('copyright_text'); ?></a>
        </div>
        <div class="menu">
          <?php print render($page['footer_fourthcolumn']); ?>
        </div>
      </div>
    </footer>
    <!-- footer -->
  </div>
