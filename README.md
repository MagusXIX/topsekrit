# topsekrit

This is a test project for an engineering position at Getable.  It's still ugly and a bit twitchy, but I wanted to get it in before everyone else snags up all the available engineering positions!

The task was to create a system that will allow users to rate restaurants.  Task details are listed here: https://gist.github.com/joeybaker/7720879f130369cbb956

The UI is really simple - click on a restaurant's stars to rate it, pretty much the same way Netflix works. At the time of writing there are still a couple bugs in the UI but I wanted to hand it in ASAP.  I may have squashed most of the bugs by the time you're reading this.

I used mongodb for the database because it's quick and easy to use for rapid prototyping.  Once you have it running you can just define your models and pop javascript into them.  Nice and easy.

Server side is just raw node.js.  I generally prefer to create new projects in raw node as opposed to using one of the many framework options available because I feel it gives me more flexibility to design a project according to the project's needs as opposed to the constraints of a framework.  (Sometimes frameworks are nice, though.)  That said, the architecture for this project is about as basic as the project itself.  Nothing fancy.  It starts in the start.js file which handles everything that needs to happen before the server fires up, then passes off to the router.js file which starts up the server and handles routes.  Routes typically go to mainController.js where any relevant data is sent wherever it needs to go.

The client side code is just a very basic html file with a template in it, a very basic CSS file that (for now) only exists to make things readable.  Fancy animations and color schemes could come later if necessary, but first I focused on getting things working.  All the backbone code is in the backbone folder, and it's all run via the main.js file.

Getting this working should be simple:
1) Make sure you have node and npm installed.
2) Clone (or otherwise pilfer) the project from my github: https://github.com/MagusXIX/topsekrit
3) Navigate to the root directory and npm install (the package.json dependencies should take care of everything for you.)
4) From the root directory, node start.js

If for whatever reason the bundle.js file isn't there or isn't working, just go to the root directory and type browserify static/scripts/main.js -o bundle.js

This is definitely a top secret project.  The imaginary users, ratings, and restaurants are all classified information.  If you've found this repo, it's too late.  Your device will self-destruct in 10, 9, 8, 7 ...