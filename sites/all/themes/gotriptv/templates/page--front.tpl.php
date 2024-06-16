<?php
//echo fboauth_action_display('connect', $redirect);
render(metatag_metatags_view('global:frontpage', array()));
/**
 * @file
 * Bartik's theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template normally located in the
 * modules/system directory.
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['featured']: Items for the featured region.
 *
 * - $page['highlighted']: Items for the highlighted content region.
 *
 * - $page['help']: Dynamic help text, mostly for admin pages.
 *
 * - $page['content']: The main content of the current page.
 *
 * - $page['sidebar_first']: Items for the first sidebar.
 *
 * - $page['triptych_first']: Items for the first triptych.
 *
 * - $page['triptych_middle']: Items for the middle triptych.
 *
 * - $page['triptych_last']: Items for the last triptych.
 *
 * - $page['footer_firstcolumn']: Items for the first footer column.
 *
 * - $page['footer_secondcolumn']: Items for the second footer column.
 *
 * - $page['footer_thirdcolumn']: Items for the third footer column.
 *
 * - $page['footer_fourthcolumn']: Items for the fourth footer column.
 *
 * - $page['footer']: Items for the footer region.
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
          <div class="travel-widget-title"> 
            <?php
              $external_msg_block_1 = block_load('block', '125');
              $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
              print render($external_msg_block2);
            ?>
          </div>
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
      <!-- supheader -->

      <div class="row subheader desktop-front-widget-cls">
          <div class="twelvecol column subheader-block">
              <?php
              $external_msg_block_1 = block_load('block', '145');
              $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
              print render($external_msg_block2);
              ?>
          </div>
      </div>
      <div class="row subheader mobile-front-widget-cls">
        <div class="threecol column subheader-block">
        	<div class="travel-widget-title"> 
		          <?php
		            $external_msg_block_1 = block_load('block', '125');
		            $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
		            print render($external_msg_block2);
		          ?>
	        </div>
          <div class="tour-search-form placeholder-form">
            <?php //print render($page['pricesearch']); ?>
            <?php
            $external_msg_block_1 = block_load('block', '124');
            $external_msg_block2=_block_get_renderable_array( _block_render_blocks( array($external_msg_block_1) ));
            print render($external_msg_block2);
            ?>
          </div>
        </div>
        <div class="ninecol column subheader-block last">
          <div class="main-slider-container content-slider-container">
            <div class="content-slider main-slider fade-effect">
              <?php print render($page['banner']); ?>
            </div>
            <div class="block-background layer-1"></div>
            <div class="block-background layer-2"></div>
          </div>
        </div>
      </div>
      <!-- subheader -->
    </header>
    <!-- header -->
    <?php print $messages; ?>
    <div class="full_main">
    <section class="container site-content">
      <div class="row">
        <div id="contentbottom">
          <?php print render($page['contentbottom']); ?>
        </div>
        <div class="eightcol column" style="display:none;">
          <div class="fivecol column">
            <img class="alignnone size-medium wp-image-21 demo-image" title="image_1" src="<?php echo $base_url.'/'.path_to_theme().'/images/image_1.jpg'; ?>" alt="">
          </div>
          <div class="sevencol column last">
            <div class="section-title">
              <h1>Explore the World</h1>
            </div>
            Duis molestie ultrices massa, non volutpat nibh auctor rhoncus. Aenean erat nunc, venenatis euismod quis, iaculis eu dolor. Sed purus neque, consequat at vulputate in, sagittis at dolor. Duis ut arcu libero. Ut quis neque nunc, eget suscipit nisl. Quisque orci neque, scelerisque!
          </div>
          <div class="clear"></div>
        </div>
        <div class="fourcol column last" style="display:none;">
          <div class="content-slider testimonials-slider fade-effect">
            <ul>
              <li class="current" style="display: block;">
                <article class="testimonial">
                  <div class="quote-text">
                    <div class="block-background">
                      We had the most amazing honeymoon trip in Thailand thanks to you. There is no question the trip far exceeded our expectation. Thank you!
                    </div>
                  </div>
                  <h6 class="quote-author">
                    Mary Templeton    
                  </h6>
                </article>
              </li>
              <li style="display: none;">
                <article class="testimonial">
                  <div class="quote-text">
                    <div class="block-background">
                      Everything was absolutely amazing and all of the details were just perfect. You made the entire trip just effortless! The best trip i’ve ever had.
                    </div>
                  </div>
                  <h6 class="quote-author">
                    John Peterson
                  </h6>
                </article>
              </li>
              <li style="display: none;">
                <article class="testimonial">
                  <div class="quote-text">
                    <div class="block-background">
                      Thank you for the marvelous trip you arranged in India. We could never have put together such a well-planned visit by ourselves. Amazing!
                    </div>
                  </div>
                  <h6 class="quote-author">
                    Lisa Blackwood    
                  </h6>
                </article>
              </li>
            </ul>
            <input class="slider-pause" value="0" type="hidden">
            <input class="slider-speed" value="400" type="hidden">
            <div class="controls">
              <a class="current" href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </section>
    <section class="container content-section">
      <div class="row">
        <div class="items-grid">

         <div class="page_language_tile">


          <h2>
              <?php
                  if($language->language == 'en') {
                    echo "Get Inspired!";
                  }
                  elseif ($language->language == "pt-br") {
                    echo "Inspire-se!";
                  }
                  elseif ($language->language == "es") {
                    echo " Inspírate!";
                  }
              ?>
            </h2>

         </div>


            <?php
              $k=3;
              $query = new EntityFieldQuery();

              $query->entityCondition('entity_type', 'node')
                ->entityCondition('bundle', array('article', 'blog'))
                ->propertyCondition('status', NODE_PUBLISHED)
								->propertyCondition('language', $language->language)
                ->fieldCondition('field_featured', 'value', 'yes', '=')
                ->propertyOrderBy('created', 'DESC');
              $result = $query->execute();

              if (isset($result['node'])) {
              	$k=3;
                $news_items_nids = array_keys($result['node']);
                $news_item = node_load($news_items_nids[0]);
                //echo 'kkk<pre>';print_r($news_items_nids);echo "</pre>";
              }
              else
              {
              	$k=4;
              }
            ?>
            <?php if($k=='3'){?>
          <div class="column-home-article">
            <div class="tour-thumb-container">
              <div class="tour-thumb">

                <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$news_item->nid); ?>">
                  <img src="<?php echo file_create_url($news_item->field_image['und'][0]['uri']); ?>" class="attachment-preview wp-post-image" alt="<?php echo $news_item->field_image['und'][0]['alt']; ?>" height="330" width="440">
                </a>
                <div class="tour-caption">
                  <h5 class="tour-title">
                    <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$news_item->nid); ?>">
                      <?php echo $news_item->title; ?>
                    </a>
                  </h5>
                  <div class="tour-meta">
                    <div class="tour-destination">
                      <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$news_item->nid); ?>" rel="tag"><?php print t('Read More') ;?></a>
                    </div>
                    <div class="tour-duration"></div>
                  </div>
                </div>      
              </div>
              <div class="block-background"></div>
            </div>
          </div> 
            <?php }?>


          <?php 
            $uid = 1;
           // echo $k;
            $result = db_query("SELECT node.nid AS nid, node.title AS node_title, node.language AS node_language, 
                      'node' AS field_data_field_image_node_entity_type, 'node' AS field_data_body_node_entity_type, 
                      RAND() AS random_field FROM {node} node
                      WHERE (( (node.status = '1') 
                      AND (node.type IN  ('article', 'blog')) 
                      AND (node.language IN  ('".$language->language."')) 
                      AND (node.promote = '0') ))
                      ORDER BY random_field DESC
                      LIMIT $k OFFSET 0", array());
            // Result is returned as a iterable object that returns a stdClass object on each iteration
            global $language;
            $i=0;
            foreach ($result as $record) {
              $random_node = node_load($record->nid); 
              //echo '<pre>'; print_r($random_node); echo '</pre>'; ?>


              <div class="column-home-article <?php if($i == ($k-1)) { echo 'last'; } if($i == 0) { echo 'first'; } ?>">
                <div class="tour-thumb-container">
                  <div class="tour-thumb">
                    <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$random_node->nid); ?>">
                      <img src="<?php echo file_create_url($random_node->field_image['und'][0]['uri']); ?>" class="attachment-preview wp-post-image" alt="<?php echo $random_node->field_image['und'][0]['alt']; ?>" height="330" width="440">
                    </a>
                    <div class="tour-caption">
                      <h5 class="tour-title">
                        <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$random_node->nid); ?>">
                          <?php echo $random_node->title; ?>
                        </a>
                      </h5>
                      <div class="tour-meta">
                        <div class="tour-destination">
                          <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$random_node->nid); ?>" rel="tag"><?php print t('Read More') ;?></a>
                        </div>
                        <div class="tour-duration"></div>
                      </div>
                    </div>      
                  </div>
                  <div class="block-background"></div>
                </div>
              </div> 


          <?php 
              $i++;    
            }
          ?>

          <div class="clear"></div>
        </div>
      </div>
    </section>
    <section class="container site-content front-bottom-site-content">
      <div class="row">
        <div class="threecol column currency-convert-wrap">
          <div class="section-title currency-title">
            <h1>
              <?php
                  if($language->language == 'en') {
                    echo "Currency Converter";
                  }
                  elseif ($language->language == "pt-br") {
                    echo "Conversor de Moedas";
                  }
                  elseif ($language->language == "es") {
                    echo "Convertidor de Monedas";
                  }
              ?>
            </h1>
          </div>
          <div class="featured-blog">
            <?php
              $currency_convertor = block_load('block', '18');
              $renderable_currency_convertor=_block_get_renderable_array( _block_render_blocks( array($currency_convertor) ));
              print render($renderable_currency_convertor);
            ?>
          </div>
        </div>
        <div class="sixcol column frontpage-insta">
          <div class="section-title">
            <h1>GoTripps Instagram</h1>
          </div>
          <div class="items-grid instragram-wrapper desktop-widget">
            <?php 
              /*  $instagram_block = block_load('instagram_block', 'instagram_block');*/
                 $instagram_block = block_load('block', '131');
                $renderable_instagram_block=_block_get_renderable_array( _block_render_blocks( array($instagram_block) ));
                print render($renderable_instagram_block);
            ?>
            <div class="clear"></div>
          </div>
          <span id="insta-link"><a href="<?php echo url($base_url.'/'.$language->language.'/instagram'); ?>"><?php echo t("See More");?></a></span>
        </div>
        <div class="threecol column last newslettr-container">
          <div class="widget widget-subscribe">
            <?php 
                $newsletter_block = block_load('block', '107');
                $renderable_newsletter_block=_block_get_renderable_array( _block_render_blocks( array($newsletter_block) ));
                print render($renderable_newsletter_block);
            ?>
          </div>
          <div class="widget widget-add">
            <?php 
                $add_block = block_load('block', '109');
                $renderable_add_block=_block_get_renderable_array( _block_render_blocks( array($add_block) ));
                print render($renderable_add_block);
            ?>
          </div>
          <div class="widget widget-twitter">
            <?php print render($page['homepage_ad_bottom']); ?>
          </div>
        </div>
        <div class="clear"></div>
      </div>    
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
