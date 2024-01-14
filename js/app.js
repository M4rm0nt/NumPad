angular.module('marmont.ui', [])
    .controller('PinpadController', ['$scope', function($scope) {
        let vm = this;

        vm.value = '';
        vm.savedPin = '1234'; // Hier kannst du den gewünschten PIN setzen
        vm.isNumpadVisible = false;
        vm.isValueVisible = false;
        vm.overrideValue = false;
        vm.hasValueBeenAccepted = false;
        vm.isAccessGranted = false;

        vm.toggleNumpadVisibility = function() {
            vm.isNumpadVisible = !vm.isNumpadVisible;
            if (vm.isNumpadVisible) {
                vm.overrideValue = true;
            }
        };

        vm.nr = function(nr) {
            if (vm.hasValueBeenAccepted && vm.overrideValue) {
                vm.value = '';
            }

            vm.hasValueBeenAccepted = false;

            if (vm.value.includes(',')) {
                let decimalPart = vm.value.split(',')[1];
                if (decimalPart && decimalPart.length >= 3) {
                    return;
                }
            }

            if (vm.value === '0,') {
                vm.value = '0,' + nr.toString();
            } else {
                vm.value += nr.toString();
            }
        };

        vm.del = function() {
            vm.value = vm.value.slice(0, -1);
            vm.hasValueBeenAccepted = false;
        };

        vm.komma = function() {
            if (vm.value.indexOf(',') === -1) {
                if (vm.value.length === 0) {
                    vm.value = '0,';
                } else {
                    vm.value += ',';
                }
            }
            vm.hasValueBeenAccepted = false;
        };

        vm.clear = function() {
            vm.value = '';
            vm.savedValue = '';
        };

        vm.uebernehmen = function() {
            if (vm.value === vm.savedPin) {
                vm.isAccessGranted = true;
                vm.savedValue = 'Zugang gewährt!';
            } else {
                vm.savedValue = 'Falscher PIN!';
            }
            vm.isValueVisible = true;
            vm.overrideValue = true;
            vm.hasValueBeenAccepted = true;
        };

        vm.goBack = function() {
            vm.isAccessGranted = false;
            vm.savedValue = '';
            vm.value = '';
            vm.isValueVisible = false;
            vm.overrideValue = false;
            vm.hasValueBeenAccepted = false;
        };

        vm.addTask = function() {
            if (vm.newTask && vm.newTask.trim() !== '') {
                vm.todoList.push(vm.newTask);
                vm.newTask = '';
            }
        };

        vm.clearTasks = function() {
            vm.todoList = [];
        };

    }]);
