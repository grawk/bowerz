# bowerz

test bower components in kraken 1.0

## Requirements

Expect bower components which (for component named matt):
* expect single directory with all templates: matt/templates/*.dust
* expect one or more locale based directory endpoint matt/locales/{CC}/{lc}/*.properties where CC=country * code and lc=language code

grunt-bower-task layout needs to:
* copy matt/templates/*.dust -> public/templates/components/matt/*.dust
* copy matt/locales/{CC}/{lc}/*.properties -> locales/{CC}/{lc}/matt/*.properties

To achieve this, add the grunt-bower-task to the project:

package.json
```javascript
"grunt-bower-task": "git://github.com/grawk/grunt-bower-task#devel"
```

_Please see the pull request opened against grunt-bower-task: https://github.com/yatskevich/grunt-bower-task/pull/114 _

Add a "bower.js" file to the tasks directory, with a custom layout function (see entire tasks/bower.js file)

```javascript
layout: function(type, component, src) {
	var loc, newpath;
	if (type === "properties") {
		//what is the {CC}/{lc} ?
		loc = src.match(/[A-Z]{2}\/[a-z]{2}/g);
		newpath = "../locales/" + loc + "/" + component + "/";
	} else if (type === "dust") {
		newpath = "../public/templates/components/" + component + "/";
	}
	return path.join(newpath);
},
```

Add exportsOverride section to bower.json:
```javascript
	"exportsOverride": {
		"*": {
			"dust": "templates/*.dust",
			"properties": "locales/**/*.properties"
		}
	}
```

Running the command `grunt bower` should now install component files per our requirements above
