describe('TodoCtrl', function () {
    var controller,
        scope,
        ionicListDelegateMock,
        ionicPopup;

    const newTaskTitle = 'new task';
    const editTaskTitle = 'edit task';

    // load the module for our app
    beforeEach(module('starter'));

    // instantiate the Controller and Mocks
    beforeEach(inject(function ($controller, $rootScope, $ionicPopup, $q) {
        //real scope
        scope = $rootScope.$new(true);

        // mock $ionicListDelegateMock
        ionicListDelegateMock =
            jasmine.createSpyObj('$ionicListDelegateMock spy', ['closeOptionButtons']);

        // mock $ionicPopup
        spyOn($ionicPopup, "prompt").and.callFake(function() {
            var deferred = $q.defer();
            if (scope.data) scope.data.response = editTaskTitle;
            deferred.resolve(newTaskTitle);
            return deferred.promise;
        });
        ionicPopup = $ionicPopup;
        //ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['prompt']);

        // instantiate TodoCtrl
        controller = $controller('TodoCtrl', {
                '$scope': scope,
                '$ionicPopup': $ionicPopup,
                '$ionicListDelegate': ionicListDelegateMock
            }
        );
    }));

    describe('tasks', function() {
        it('should have 3 tasks', function() {
            expect(scope.tasks.length).toBe(3);
        });
    });

    describe('new task', function() {
        it('should create another task', function() {
            scope.newTask();
            expect(ionicPopup.prompt).toHaveBeenCalled();
            scope.$digest();
            expect(scope.tasks.length).toBe(4);
            expect(scope.tasks[3].title).toBe(newTaskTitle);
        });
    });

    describe('edit task', function () {
        it('should change the title of a task', function () {
            scope.edit(scope.tasks[0]);
            expect(ionicPopup.prompt).toHaveBeenCalled();
            scope.$digest();
            expect(scope.tasks[0].title).toBe(editTaskTitle);
        })
    })

});