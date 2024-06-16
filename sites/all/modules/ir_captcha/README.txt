INTRODUCTION
------------

Image-Recognition CAPTCHA provides a CAPTCHA that challenges the visitor to
recognize a subset of images within a set of images. For example, the visitor
may be challenged to identify all the images with trees.

Image-recognition CAPTCHAs have advantages and disadvantages versus other
CAPTCHAs, such as text-recognition CAPTCHAs. See the CONSIDERATIONS section
below for information which may be helpful in determining whether this module
is appropriate for your website.


REQUIREMENTS
------------

This module requires the following modules:

 * CAPTCHA (https://drupal.org/project/captcha)


INSTALLATION
------------

Image files must be installed for Image-Recognition CAPTCHA to work. You should
provide your own image files. See the CONSIDERATIONS section, particularly the
third paragraph, for guidance on choosing images. Example images are included
in this module, but are intended only for demonstration, and should not be used
for production websites.

1. Download and extract the module.

2. Install images.

 * To install your own images:

     a. Within your public file system directory, create an 'ir_captcha'
        directory. For example, on Unix-like systems:

          mkdir sites/default/files/ir_captcha

     b. Copy images into that directory.

 * Alternatively, to install the example images:

     a. Copy the 'example_images' directory within this module to your public
        file system directory, renaming it to 'ir_captcha'.

        On Unix-like systems, if you are using the Drupal default public file
        system directory, you can use the following command:

          cp -R path/to/module/example_images sites/default/files/ir_captcha 

3. Enable module.

4. Configure. (See next section.)


CONFIGURATION
-------------

To configure the module, browse to:
  Administration » Configuration » People » CAPTCHA » Image-Recognition CAPTCHA

No configuration is necessary if you just want to see a demonstration of how
the module works using the example images. For production websites though, you
should complete the following "Initial configuration" steps.

Initial configuration:

    1. Change the challenge prompt to something fairly unique to your website.
       See the CONSIDERATIONS section for more information.

    2. Replace the filenames in "Correct image filenames" and "Incorrect image
       filenames" with the filenames of your correct and incorrect challenge
       image filenames, respectively.

       Take care that your filenames do not indicate their correctness, since
       the filenames will be visible to the visitor. For instance, if your
       challenge is to "Select all images with trees", correct image filenames
       should probably not contain the word "tree".

Further configuration:

  The difficulty of the CAPTCHA can be adjusted using the "Number of
  correct/incorrect images to display" settings. These determine the
  probability of solving the CAPTCHA by random guessing.  For the defaults of 4
  correct and 6 incorrect, this probability is calculated as follows:
  
    4/10 * 3/9 * 2/8 * 1/7 = 1/210


CONSIDERATIONS
--------------

Basic image-recognition CAPTCHAs can be defeated by well-known
image-classification techniques. An attacker can manually download and identify
a sample of the images, then use them as a training set to build an image
classifier that solves the CAPTCHA with a high success rate. Notably, Microsoft
used to provide an image-recognition CAPTCHA called ASIRRA that required
identifying either cats or dogs, but the project was discontinued when
researchers were able to develop software to solve the CAPTCHA with >99%
accuracy.

However, if the image-recognition challenge is unique to a given website, the
attacker will be forced to build an image classifier specifically for that
website. The theory of this module is that for many websites, the effort
required to build a site-specific image classifier will not be worth the payoff
to spammers.

So, proper usage of this module requires the administrator to devise a fairly
unique image challenge. That is, the administrator should come up with a
challenge in the form "Select all images with X", where X is some object or
characteristic that is fairly unique versus other websites. See the section
FINDING IMAGES for advice on how to find images.

The presently commonplace text-recognition CAPTCHA (scrambled letters) is
more resilient against a determined attacker than a basic image-recognition
CAPTCHA. Therefore, a text-recognition CAPTCHA may be more appropriate for your
website if the value of defeating your CAPTCHA is great enough that attackers
will develop image classifiers to defeat the CAPTCHA provided by this module.


FINDING IMAGES
--------------

There are a number of repositories of freely licensed images on the web that
may contain images suitable for use with this module. Flickr allows searching
for CC0-licensed (public domain dedication) images:

  https://www.flickr.com/creativecommons/cc0-1.0/

Images may be downloaded from Flickr in a square, 150x150 format which is
especially suitable for use with this module.

How many images to select is dependent on the effort an attacker would make to
manually enumerate and identify all images. That is, an attacker could refresh
the CAPTCHA repeatedly, download all images, the manually identify them, and
program his or her CAPTCHA solver with the correct responses. Enough images are
needed that it is not worth it for an attacker to do this. For small websites,
a suggested minimum is 20 correct and 20 incorrect images, but this suggestion
may change per results in practice.

Note that in many jurisdictions, images not expressly freely licensed are
copyright of their authors, and therefore might not be legally usable on your
website without permission. Many images are also licensed in ways that require
attribution.
