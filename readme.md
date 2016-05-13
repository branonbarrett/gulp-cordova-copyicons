# gulp-cordova-copyicons

> Copy directory contents (i.e. res icons) to a cordova project platform res directory.

## Installation

```
npm install --save-dev gulp-cordova-copyicons
```

## Usage

```js
var create = require('gulp-cordova-create');
var copyicons = require('gulp-cordova-copyicons');

gulp.task('build', function () {
    var src = 'path/to/icons';
    var options = { platform: 'android' };

    return gulp.src('dist')
        .pipe(create())
        .pipe(copyicons(src, options));
});
```

This will copy all content in the source directory to the platform specific
res directory. If the platform has not been created it will be created by this call before the contents are copied.

NOTE: It is expected that the directory you are copying from has the correct directory structure for the target platform.

### Options

If you do not pass options the platform will default to android.

This will execute the following command

```
$ cordova platform add android
```

## API

### copyicons(src, [options])

#### options

##### platform

Type: `string`  
Default: `android`

The target platform to copy icons to.

## Related

This package is intended to be use with Sam Verschueren's [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova)

Click the link above for the full list of Sam's available packages.

## License

MIT © Branon Barrett
