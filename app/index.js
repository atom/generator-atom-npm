'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NpmGenerator = module.exports = function NpmGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NpmGenerator, yeoman.generators.Base);

NpmGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  var prompts = [{
    type: 'input',
    name: 'packageName',
    message: 'name',
    default: path.basename(process.cwd())
  }, {
    type: 'input',
    name: 'packageDesc',
    message: 'description'
  }];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    this.packageDesc = props.packageDesc;
    done();
  }.bind(this));
};

NpmGenerator.prototype.projectFiles = function() {
  var data = {
    name: this.packageName,
    description: this.packageDesc
  };
  this.template('package.json', 'package.json', data);
  this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
  this.template('README.md', 'README.md', data);
  this.template('LICENSE.md', 'LICENSE.md', {year: (new Date()).getFullYear()});
  this.copy('npmignore', '.npmignore');
  this.mkdir('src');
  this.mkdir('spec');
  this.copy('spec-helper.coffee', 'spec/spec-helper.coffee');
};

NpmGenerator.prototype.git = function () {
  this.copy('gitignore', '.gitignore');
};
