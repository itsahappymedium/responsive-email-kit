Responsive Email Kit
====================

A fork of Zurb's excellent [Ink responsive email template system](http://zurb.com/ink/) integrated into a Grunt and Sass/Compass workflow for automated CSS inlining, quicker editing, image minification, and email testing.

## Installation

Download this repository as a ZIP file or clone it to your local machine:

	git clone git@github.com:happymedium/responsive-email-kit.git

You'll also need the following Rubygem dependencies installed (if you don't already have them):

	gem install compass
	gem install premailer
	gem install nokogiri

You'll of course need [NodeJS](http://nodejs.org) with NPM running. We'll be using [Grunt](http://gruntjs.com) for this project, so let's install the command line client:

	sudo npm install -g grunt-cli

Now, head to the root of your local repository and install the Node dependencies:

	npm install

## Usage

To compile your assets during development, run `grunt` in the command line. This will do the following:

* Compile the Sass files within the `/sass/` folder and render them in the `/css/` folder.
* Create a `/dist/` directory (or empty it if it's already there).
* Copy all images in `/img/` to `/dist/img/`.
* Render each of the files with corresponding EJS templates and partials, if used. The files are placed in `/dist/`.
* Insert the `mq.css` stylesheet in the document `<head>` (so the media queries don't get stripped).

Once you've compiled assets for the first time, navigate to the `/dist/` folder in your browser and select one of the HTML files to view.

### Watch for Updates

You can also watch for updates! Using the [LiveReload](http://livereload.com/) extension, you can run `grunt watch`. It will refresh your browser window with any changes.

### Deployment

When you're ready to "deploy" your changes and add them to your email marketing service, run `grunt dist` to do everything the standard command does, except:

* Minify your images using `imagemin`.
* Inline the CSS referenced in each of the HTML templates and place the finished files in the `/dist/` folder.

Then, copy the HTML within the HTML template you'd like to use (find it in the `/dist/` folder) and paste it where your service directs you to.

Remember, your CSS has already been inlined, so you don't need to do that step manually.

You will also need to upload your images from the `/dist/img/` folder to whatever email marketing service you use.

### Email Testing

You can use [Nodemailer](https://github.com/andris9/Nodemailer) to send a test email with your template via the command line.

1. Configure the Sender and Recipient fields within the `nodemailer` task in `Gruntfile.js`
2. Set the values of your transport method inside `config/nodemailer-transport.json`. An example Gmail method is there right now; you can check [Nodemailer's site](https://github.com/andris9/Nodemailer#well-known-services-for-smtp) for other options.
3. From the command line, run `grunt send --template=YOURTEMPLATENAME` (without the `.html` appended). This will run the `dist` task before sending it using Nodemailer.

## Editing

Edit templates within the `/templates/` directory. You can add or remove them as you'd like.

To add new CSS files, it is recommended to create a new Sass (`.scss`) file for your template. Grunt will automatically compile any `.scss` files to `.css` (if they don't have an underscore `_` prepended).

## Changelog

### 1.2.1

* Update documentation to switch to the `nokogiri` gem instead of the dead `hpricot` gem (thanks to @yuvio).

### 1.2.0

Fixed a few bugs and implemented email testing.

* Fix error in JSON watch path
* Update partials watch path to account for nested partials
* Implement Nodemailer and Grunt send task (thanks to @dwightjack and his [Grunt Email Boilerplate](https://github.com/dwightjack/grunt-email-boilerplate) for inspiration)
* Updated the `htmlbuild` task and tags to have the basic stylesheet also printed out in a `<style>` tag, allowing for usage of web fonts and other things that get stripped

### 1.1.0

* Implemented EJS for templating, partials, and data integration.
* Added a `dev` and `dist` task to prevent premailer from firing every time during `watch`.

### 1.0.0

* Initial commit.
* Added in Zurb's Ink templates and implemented some Sass variables for easy customization.
