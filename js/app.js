angular.module('marmont.ui', [])
    .controller('NumpadController', ['$scope', function($scope) {
        let vm = this;

        vm.value = '';
        vm.savedValue = '';
        vm.isNumpadVisible = false;
        vm.isValueVisible = false;
        vm.overrideValue = false;
        vm.hasValueBeenAccepted = false;

        vm.toggleNumpadVisibility = function() {
            vm.isNumpadVisible = !vm.isNumpadVisible;
            if (vm.isNumpadVisible) {
                vm.overrideValue = true;
            }
        };

        vm.nr = function(nr) {
            if (vm.hasValueBeenAccepted && nr !== ',' && !vm.value.includes(',')) {
                vm.value = '';
                vm.hasValueBeenAccepted = false;
            }

            if (vm.value.includes(',')) {
                let decimalPart = vm.value.split(',')[1];
                if (decimalPart && decimalPart.length >= 3) {
                    return;
                }
            }

            vm.value += nr.toString();
        };

        vm.del = function() {
            vm.value = vm.value.slice(0, -1);
        };

        vm.komma = function() {
            if (vm.value.indexOf(',') === -1) {
                vm.value += ',';
            }
        };

        vm.clear = function() {
            vm.value = '';
        };

        vm.uebernehmen = function() {
            let cleanedValue = vm.value.replace(/^0+/, '').replace(',', '.');
            let floatValue = parseFloat(cleanedValue);
            if (floatValue > 0) {
                vm.savedValue = cleanedValue;
            }
            vm.isValueVisible = true;
            vm.overrideValue = true;
            vm.hasValueBeenAccepted = true;
        };
    }]);
