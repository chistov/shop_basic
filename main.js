var app = angular.module("demo", []);

app.run(function($rootScope) {
  angular.element(document).on("click", function(e) {
    console.log('sddd');
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
});

app.controller('dropdownCtrl', function($rootScope, $scope){
  $scope.colours = [{
    name: "Red",
    hex: "#F21B1B"
  }, {
    name: "Blue",
    hex: "#1B66F2"
  }, {
    name: "Green",
    hex: "#07BA16"
  }];
  $scope.colour = $scope.colours[1];

  $scope.thing = [{
    name: "Cat_1",
    value: true
  }, {
    name: "Cat_2",
    hex: false
  }, {
    name: "Cat_3",
    hex: false
  }];
  $scope.colour1 = $scope.thing[0];

  $scope.bcp = [{
    name: "Grad",
    value: true
  }, {
    name: "Gh",
    hex: false
  }, {
    name: "PPP",
    hex: false
  }];

  $scope.currCategory = $scope.thing[0].name;


  $scope.f = function(){
      $scope.colours[1].name = "GG"; console.log("GGGG");
  };

  $scope.choose = function(category){
    console.log('choose', category);
    $scope.currCategory = category;
  }
});

app.directive("dropdown", function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "templates/dropdown.html",
    scope: {
      placeholder: "@",
      list: "=",
      selected: "=",
      property: "@"
    },
    controller: 'dropdownCtrl',
    link: function(scope,element, attrs, ctrl ) {
      scope.listVisible = false;
      scope.isPlaceholder = true;

      scope.select = function(item) {
        console.log('select', item);
        console.log('scope', scope);
        console.log('thing', scope.thing);
        scope.list[0].name = "Ios";
        
        console.log('list', scope.list);
        scope.isPlaceholder = false;
        scope.selected = item;
        scope.colour = item;
        if(scope.colour.name == "Green"){
          scope.thing[0].name = "Gui";
          $rootScope.$broadcast("menuChanged", "IOS");
        }

        
        // scope.$apply(function() {
        //     scope.colour = item;//scope.listVisible = false;
        //   });

        if(item.name == 'Green'){
          scope.f();
          console.log('parse', scope.thing);
          console.log('parse___1', scope.bcp);
        }
      };

      scope.isSelected = function(item) {
        return item[scope.property] === scope.selected[scope.property];
      };

      scope.show = function() {
        scope.listVisible = true;
      };

      $rootScope.$on("documentClicked", function(inner, target) {
        console.log('dClicked', inner);
        console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
        if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
          scope.$apply(function() {
            scope.listVisible = false;
          });
      });

      scope.$watch("selected", function(value) {
        console.log('selected', value);
        scope.isPlaceholder = scope.selected[scope.property] === undefined;
        scope.display = scope.selected[scope.property];
        // scope.currCategory = 
      });
    }
  }
});

app.directive("dropup", function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "templates/dropup.html",
    scope: {
      placeholder: "@",
      list: "=",
      selected: "=",
      property: "@"
    },
    controller: 'dropdownCtrl',
    link: function(scope) {
      scope.listVisible = false;
      scope.isPlaceholder = true;

      scope.select = function(item) {
        console.log('select', item);
        console.log('scope', scope.thing);
        scope.isPlaceholder = false;
        scope.selected = item.name;
        scope.choose(item.name);
      };

      scope.isSelected = function(item) {
        return item[scope.property] === scope.selected[scope.property];
      };

      scope.show = function() {
        scope.listVisible = true;
      };

      $rootScope.$on("documentClicked", function(inner, target) {
        console.log('dClicked', inner);
        console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
        if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
          scope.$apply(function() {
            scope.listVisible = false;
          });
      });

      scope.$on("menuChanged", function(event, data) {
        console.log('event__', event);
        console.log('value__', data);
        scope.list = scope.bcp;
        scope.selected = scope.bcp[0];
      });

      scope.$watch("selected", function(value) {
        console.log('selected', value);
        scope.isPlaceholder = scope.selected[scope.property] === undefined;
        scope.display = scope.selected[scope.property];
        scope.currCategory = value.name;
      });
    }
  }
});
