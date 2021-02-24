const { v4 } = require('uuid');
class Task {
    id = '';
    taskName = '';
    completed = false;
    completedDate = null;

    constructor( taskName ) {
        this.id = v4();
        this.taskName = taskName;
        this.completed = false;
        this.completedDate = null;
    }
}

module.exports = Task;