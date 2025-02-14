/* eslint-env node */

/**
 * В этом файле изменения не требуются - оставьте его таким же)
 * 
 * Если интересно - @see https://karma-runner.github.io/latest/intro/how-it-works.html
 */
module.exports = function (config) {
    config.set({
      browsers: [
        'ChromeHeadless'
      ],
      frameworks: ['qunit'],
      files: [
        'source/*.js',
        'test/*.js'
      ],
      autoWatch: false,
      singleRun: true,
    });
};
