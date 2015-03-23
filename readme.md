# Quiver Enterprise Portal


**Quiver Web Portal** for Enteprise Users.

Build on [Zurb Foundation for Apps](http://foundation.zurb.com/apps/) template.



***

## Requirements

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.

***
## Get Started

1. Clone this repository.

	```
	git clone http://stash.quiver.zone/projects/QWP/repos/quiver-web-portal/
	```

2. Change into the directory.

	```
	cd quiver-web-portal
	```

3. Install the dependencies. If you're running Mac OS or Linux, you may need to run 	`sudo npm install` instead, depending on how your machine is configured.

	```
	npm install
	bower install
	```

3. While you're working on your project, run:

	```
	npm start
	```

	This will compile the Sass and assemble your Angular app. **Now go to `localhost:8080` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

4. To run the compiling process once, without watching any files, use the `build` command.

	```
	npm start build
	```