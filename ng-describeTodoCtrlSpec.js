ngDescribe({
    name: 'TodoCtrl',
    modules: 'starter',
    inject: ['$controller', '$rootScope', '$ionicPopup', '$q'],
    tests: function (deps) {
        var controller,
            scope,
            ionicListDelegateMock,
            ionicPopup;

        const newTaskTitle = 'new task';
        const editTaskTitle = 'edit task';

        // instantiate the Controller and Mocks
        beforeEach(function () {
            //real scope
            scope = deps.$rootScope.$new(true);

            // mock $ionicListDelegateMock
            ionicListDelegateMock =
                jasmine.createSpyObj('$ionicListDelegateMock spy', ['closeOptionButtons']);

            // mock $ionicPopup
            spyOn(deps.$ionicPopup, "prompt").and.callFake(function () {
                var deferred = deps.$q.defer();
                if (scope.data) scope.data.response = editTaskTitle;
                deferred.resolve(newTaskTitle);
                return deferred.promise;
            });
            ionicPopup = deps.$ionicPopup;
            //ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['prompt']);

            // instantiate TodoCtrl
            controller = deps.$controller('TodoCtrl', {
                    '$scope': scope,
                    '$ionicPopup': $ionicPopup,
                    '$ionicListDelegate': ionicListDelegateMock
                }
            );
        });

        it('should have 3 tasks', function () {
            la(scope.tasks.length === 3);
        });

        it('should create another task', function () {
            scope.newTask();
            expect(ionicPopup.prompt).toHaveBeenCalled();
            scope.$digest();
            la(scope.tasks.length == 4);
            la(scope.tasks[3].title == newTaskTitle);
        });

        it('should change the title of a task', function () {
            scope.edit(scope.tasks[0]);
            expect(ionicPopup.prompt).toHaveBeenCalled();
            scope.$digest();
            la(scope.tasks[0].title === editTaskTitle);
        })
    }
});