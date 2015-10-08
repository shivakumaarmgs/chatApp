module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: 'assets',
        js_dest: 'assets/js',
        css_dest: 'assets/styles',
        options: {
          keepExpandedHierarchy: false
        }
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};
