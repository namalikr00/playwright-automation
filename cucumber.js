module.exports = {
  default: {
    require: ['tests/step-definitions/**/*.ts'],
    format: ['progress', 'html:cucumber-report.html'],
    paths: ['tests/features/**/*.feature']
  }
};
