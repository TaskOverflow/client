'use strict';

angular.module('TaskOverflowApp.version', [
  'TaskOverflowApp.version.interpolate-filter',
  'TaskOverflowApp.version.version-directive'
])

.value('version', '0.1');
