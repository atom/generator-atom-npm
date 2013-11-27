'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NpmGenerator = module.exports = function NpmGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  //this.on('end', function () {
    //this.installDependencies({ skipInstall: options['skip-install'] });
  //});

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
  }, {
    type: 'list',
    name: 'packageLicense',
    message: 'license',
    // licenses from http://choosealicense.com/licenses/
    choices: [
      'AGPL',
      'Apache',
      'Antistic',
      'BSD-3-CLAUSE',
      'BSD',
      'CC0',
      'Eclipse',
      'GPL-V2',
      'GPL-V3',
      'LGPL-V2.1',
      'LGPL-V3',
      'MIT',
      'Mozilla',
      'Unlicense'
    ],
    default: 11 // MIT
  }];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    this.packageDesc = props.packageDesc;
    this.packageLicense = props.packageLicense;
    done();
  }.bind(this));
};

NpmGenerator.prototype.app = function app() {
  this.mkdir('bin');
  this.mkdir('lib');
  this.mkdir('test');
};

NpmGenerator.prototype.projectFiles = function() {
  var done = this.async();

  var username = 'github';
  var repo = 'choosealicense.com';
  var branch = 'gh-pages';
  // fetch licenses repo
  this.remote(username, repo, branch,  function (err, remote) {
    if (err) throw err;

    // change sourceRoot to cacheRoot
    var root = this.sourceRoot();
    this.sourceRoot(path.join(this.cacheRoot(), username, repo, branch));

    var content = this
      .read('licenses/' + this.packageLicense.toLowerCase() + '.txt')
      .replace(/-+[\d\D]*?-+\n\n/, '');
    this.write('LICENSE', content);

    // restore sourceRoot
    this.sourceRoot(root);

    var data = {
      name: this.packageName,
      description: this.packageDesc,
      licenses: this.packageLicense
    };
    this.template('package.json', 'package.json', data);
    this.template('README.md', 'README.md', data);

    done();
  }.bind(this));

  //this.copy('Gruntfile.js', 'Gruntfile.js');
};

NpmGenerator.prototype.git = function () {
  this.copy('gitignore', '.gitignore');
};
