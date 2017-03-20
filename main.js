var app = angular.module("demo", []);

app.run(function($rootScope) {
  angular.element(document).on("click", function(e) {
    console.log('sddd');
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
});

app.controller('productsCtrl', function($rootScope, $scope){
  $scope.products = [{
    name: "Computers"
    }, {
    name: "Phones"
  }];
  $scope.product = $scope.products[0];

  $scope.compCategory = [{
    name: "Laptop"
    }, {
    name: "TabletPC"
  }];

  $scope.phonesCategory = [{
    name: "MobilePhones"
    }, {
    name: "SmartPhones"
  }];

  $scope.laptops = [{
    name: "Dell",
    price: 30
    }, {
    name: "Samsung",
    price: 20
  }];

  $scope.tabletpcs = [{
    name: "HP Compaq",
    price: 40
    }, {
    name: "Apple iPad",
    price: 50
  }];

  $scope.mobilePhones = [{
    name: "Nokia",
    price: 350
    }, {
    name: "Motorola",
    price: 450
  }];

  $scope.smartphones = [{
    name: "iPhone",
    price: 550
    }, {
    name: "HTC",
    price: 250
  }];

  $scope.currCategories = $scope.compCategory; // curr list
  $scope.currCategory = $scope.compCategory[0]; // curr element

  $scope.cart = {};
  $scope.cart.totalPrice = 0;
  $scope.cart.itemsTotalCount = 0;

  $scope.cartAdd = function(item){
    ++$scope.cart.itemsTotalCount;
    console.log('ssss',item);
    if( item.name in $scope.cart){
      console.log('found');
      ++$scope.cart[item.name];
    }
    else{
      console.log('not found');
      $scope.cart[item.name] = 0;
    }
    $scope.cart.totalPrice += item.price;
    console.log('card', $scope.card);
  }
});

app.directive("products", function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "templates/products.html",
    scope: {
      placeholder: "@",
      list: "=",
      selected: "=",
      property: "@"
    },
    controller: 'productsCtrl',
    link: function(scope,element, attrs, ctrl ) {
      scope.listVisible = false;
      scope.isPlaceholder = true;

      scope.select = function(item) {
        console.log('select', item);
        console.log('scope', scope);
        // scope.list[0].name = "Ios";
        
        console.log('list', scope.list);
        scope.isPlaceholder = false;
        scope.selected = item;
        scope.product = item;
        $rootScope.$broadcast("menuChanged", item.name);
        
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

app.directive("categories", function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "templates/categories.html",
    scope: {
      placeholder: "@",
      list: "=",
      selected: "=",
      property: "@"
    },
    controller: 'productsCtrl',
    link: function(scope) {
      scope.listVisible = false;
      scope.isPlaceholder = true;

      scope.select = function(item) {
        console.log('select', item);
        scope.isPlaceholder = false;
        scope.selected = item;
        scope.currCategory = item;
        console.log('category', scope.currCategory);
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
        scope.list = scope.phonesCategory;

        if(data == 'Computers'){
          scope.currCategories = scope.compCategory; // curr list
          scope.list = scope.compCategory; // curr list
          scope.selected = scope.compCategory[0];
          // scope.currCategory = scope.compCategory[0].name; // curr element
        }
        else if(data == 'Phones'){
          scope.currCategories = scope.phonesCategory; // curr list
          scope.list = scope.phonesCategory; // curr list
          scope.selected = scope.phonesCategory[0];
          // scope.currCategory = scope.phonesCategory[0].name; // curr element
        }
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
