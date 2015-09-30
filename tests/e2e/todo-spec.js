describe('angularjs homepage todo list', function() {
  it('should add a task', function() {
    browser.get('http://localhost:63342/ionic-todo/www/index.html');

    var tasks = element.all(by.repeater('task in tasks'));
    expect(tasks.count()).toEqual(3);

    var completedAmount = element.all(by.css('.complete'));
    expect(completedAmount.count()).toEqual(1);

    element(by.css('button[ng-click="newTask()"]')).click();
    element(by.model('data.response')).sendKeys('write protractor test');
    element(by.buttonText('Create task')).click();

    tasks = element.all(by.repeater('task in tasks'));
    expect(tasks.count()).toEqual(4);

    element.all(by.css('.item-content')).last().click();

    completedAmount = element.all(by.css('.complete'));
    expect(completedAmount.count()).toEqual(2);
  });
});
