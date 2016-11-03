const gutil = require('gulp-util');

const srcDir = 'assets/src',
      distDir = 'assets/dist';


const ConfigOptions = function () {
    const config = this;

    config.isProduction = (gutil.env.prod ? true : false);

    // CSS-related gulp vars
    config.css = {
        srcDir: `${srcDir}/scss`, // <%=config.css.scssDir%>
        distDir: `${distDir}/css`, // <%=config.css.distDir%>

        // We are supporting the last 2 browsers, any browsers with >5% market share,
        // and ensuring we support IE8+ with prefixes
        autoprefixer: ['> 5%', 'last 2 versions', 'ie > 7', 'Safari >= 8'], // <%=config.css.autoprefixer%>
        sourcemaps: (gutil.env.prod ? false : true)
    };

    // Image-related gulp vars
    config.img = {
        srcDir       : `${srcDir}/img`,      // <%=config.img.srcDir%>
        distDir      : `${distDir}/img`     // <%=config.img.distDir%>
    };

    config.docs = {
        rootDir : './docs/',
        srcDir : 'src/',
        distDir :  'dist/',
        tmplDir : 'templates',
        dataDir : 'data',
        helperDir : 'helpers',
        assetsDir : 'assets/dist/',

        isProd : (gutil.env.prod ? true : false) // used to set the baseUrl for the production server
    };

    // Banners and info
    config.misc = {
        // Output file-size and gzip file-size. May slow-down build.
        showFileSize: true
    };

    config.gulp = {
        // Reports which file was changed
        changeEvent : function(evt) {
            gutil.log();
            gutil.log( gutil.colors.cyan.bold('❯❯ File: ' + evt.path.replace(new RegExp('/.*(?=/' + srcDir.substr(2) + ')/'), '')), 'was', gutil.colors.magenta(evt.type) );
            // gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + srcDir.substr(2) + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
        },

        /**
         * Formats Error messages a little better than we do usually
         *
         * Can use any of the following from err object:
         * status,file,line,column,message,formatted,messageFormatted,messageOriginal,relativePath,name,stack,showStack,showProperties,plugin
         */
        onError : function (err) {
            gutil.beep();
            gutil.log( gutil.colors.red.bold('-----------------------------------------------------------------------') );
            gutil.log( gutil.colors.red.bold(`Error in plugin: ${gutil.colors.cyan.bold(`'${err.plugin}'`)}`) );
            gutil.log( gutil.colors.red.bold(`on ${gutil.colors.cyan.bold(`line ${err.line}, column ${err.column}`)} of ${gutil.colors.cyan.bold(`'${err.relativePath}'`)}`) );
            gutil.log( gutil.colors.red.bold(err.messageFormatted) );

            if (gutil.env.prod && err.status === 1) {
                process.exit(1);
            }

            this.emit('end');
        }
    };

    const envLog = (config.isProduction ? 'Production' : 'Development');
    console.log( gutil.colors.yellow(`❯❯❯❯ Running Gulp build in ${gutil.colors.bold(`${envLog}`)}`) );
}


module.exports = new ConfigOptions();
