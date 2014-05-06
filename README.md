# bowerz

test bower components in kraken 1.0

## Requirements

Expect bower components which (for component named matt):
* has single layer template directory: matt/templates/\*.dust
* one or more locale based directory endpoints matt/locales/{CC}/{lc}/\*.properties where CC=country code and lc=language code

grunt-contrib-symlink task needs to:
* symlink matt/templates/\*.dust -> public/templates/components/matt/\*.dust
* symlink matt/locales/{CC}/{lc}/\*.properties -> locales/{CC}/{lc}/components/matt/\*.properties

## Install app and run bower task

```shell
$ git clone <this repo>
$ cd bowerz
$ npm install
$ bower install
```

Note, before you run the symlink task, there is no public/templates or locales/\*\*/\*\*/templates directories. The task will create these per what it finds in the "matt" component.

```shell
$ grunt symlink
```

After running the task, we have symlinked the files: matt.dust, joni.dust, matt.properties, joni.properties to the appropriate directories

## Changes

To achieve this, add the grunt-contrib-symlink task to the project:

package.json
```javascript
"grunt-contrib-symlink": "git://github.com/grawk/grunt-contrib-symlink#master"
```
TODO: open pull request to grunt-contrib-symlink

Add a "symlink.js" file to the tasks directory, excerpted below:

```javascript
return {
options: {
	overwrite: true
},
expanded: {
	files: [{
		expand: true,
		overwrite: true,
		flatten: false,
		cwd: 'public/components',
		src: ['*/*/*.dust'],
		regex: /(public\/components)(\/.+)(\/templates)(\/.+dust)/g,
		backreference: 'public/templates/components$2$4'
	}, {
		expand: true,
		overwrite: true,
		flatten: false,
		cwd: 'public/components/',
		src: ['*/*/*/*/*.properties'],
		regex: /(public\/components)(\/.+)(\/locales)(\/[A-Z]{2}\/[a-z]{2})(\/.+properties)/g,
		backreference: 'locales$4/components$2$5'
	}]
}
}
```
