const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');


gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', gulp.series('svgSymbol:dev'), 'copyFonts:dev', 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

