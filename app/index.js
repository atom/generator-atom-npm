'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NpmGenerator = module.exports = function NpmGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NpmGenerator, yeoman.generators.Base);

NpmGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'initialize',
    message: 'Would you like to initialize the npm project?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    if (props.initialize) {
      done();
    } else {
      console.log('Exit');
    }

  }.bind(this));
};

NpmGenerator.prototype.app = function app() {
  this.mkdir('bin');
  this.mkdir('lib');
  this.mkdir('test');

  this.copy('package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

NpmGenerator.prototype.git = function () {
  this.copy('gitignore', '.gitignore');
};

NpmGenerator.prototype.npm = function () {
};
