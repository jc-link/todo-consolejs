const Task = require('./Task');
class Tasks {
    _list = {};

    constructor() {
        this._list = {};
    }

    get getTasks() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }
    
    get getPendingTasks() {
        return this.getTasks.filter(({ completed }) => completed === false );
    }

    createTask( taskName ) {
        const task = new Task(taskName);
        this._list[task.id] = task;
    }

    loadFromDB( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }

    
    showCompletedAndPendingTasks( isCompleted ) {

        const tasks = this.getTasks.filter(({ completed }) => completed === isCompleted );

        const pTasks = (isCompleted)
                            ? tasks.map(({ taskName, completed, completedDate}) => {
                                return {taskName, completed, completedDate};
                            })
                            : tasks.map(({ taskName, completed}) => {
                                return {taskName, completed};
                            });
        return pTasks;
    }

    deleteTask( id ) {
        if (this._list[id] ) {
            delete this._list[id];
        }
    }
    completeTask( ids ) {
        ids.forEach( id => {
            const task = this._list[id];
            const date = new Date();
            task.completedDate = `${date.getDate()}-${((date.getMonth()+1) < 10 )? '0'+(date.getMonth()+1): (date.getMonth()+1)}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            task.completed = true;
        });
    }
    
}

module.exports = Tasks;