// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service to get topic data.
 */

require('domain/utilities/UrlInterpolationService.ts');

require('domain/classroom/classroom-domain.constants.ajs.ts');

angular.module('oppia').factory('ClassroomBackendApiService', [
  '$http', '$q', 'UrlInterpolationService', 'CLASSROOOM_DATA_URL_TEMPLATE',
  function($http, $q, UrlInterpolationService, CLASSROOOM_DATA_URL_TEMPLATE) {
    var classroomDataDict = null;
    var _fetchClassroomData = function(
        classroomName, successCallback, errorCallback) {
      var classroomDataUrl = UrlInterpolationService.interpolateUrl(
        CLASSROOOM_DATA_URL_TEMPLATE, {
          classroom_name: classroomName
        });

      $http.get(classroomDataUrl).then(function(response) {
        classroomDataDict = angular.copy(response.data);
        if (successCallback) {
          successCallback(classroomDataDict);
        }
      }, function(errorResponse) {
        if (errorCallback) {
          errorCallback(errorResponse.data);
        }
      });
    };

    return {
      fetchClassroomData: function(classroomName) {
        return $q(function(resolve, reject) {
          _fetchClassroomData(classroomName, resolve, reject);
        });
      }
    };
  }
]);
