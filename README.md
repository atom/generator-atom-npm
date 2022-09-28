##### Atom and all repositories under Atom will be archived on December 15, 2022. Learn more in our [official announcement](https://github.blog/2022-06-08-sunsetting-atom/)
 # Atom npm Package Generator

This Yeoman generator creates a default directory layout for an npm written in
CoffeScript. It includes:

* Basic `package.json` with typical dependencies
* `Gruntfile.coffee`
* `LICENSE.md` (MIT)
* Basic `README.md`
* `.gitignore` and `.npmignore`
* A `src` and `spec` folder
* `spec-helper.coffee` that loads `coffee-cache`

Usage:

```
npm install -g yo
npm install -g git+https://github.com/atom/generator-atom-npm.git
mkdir my-package
cd my-package
yo atom-npm
```
