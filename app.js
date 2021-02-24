require('colors');

const Tasks = require('./model/Tasks');
const { inquirerMenu, wait, readInput, showDeleteTask, validate, showCompleteTask} = require('./helpers/inquirer');
const { saveDB, getDB } = require('./helpers/saveFile');

const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = getDB();
    
    if ( tasksDB ) {
        tasks.loadFromDB(tasksDB);
    }

    do {
        opt = await inquirerMenu();
        switch(opt) {
            case 1: // Add new task
                const taskName = await readInput('Task name:');
                tasks.createTask(taskName);
                break;
            case 2:
                console.table(tasks.showCompletedAndPendingTasks(true));
                break;
            case 3:
                console.table(tasks.showCompletedAndPendingTasks(false));
                break;
            case 4: // Complete Task
                const ids = await showCompleteTask(tasks.getPendingTasks);
                tasks.completeTask(ids);
                break;
            case 5: // Delete
                const id = await showDeleteTask( tasks.getTasks );
                if( id !== 0) {
                    const confirmation = await validate('¿Are you sure?');
                    if( confirmation ) {
                        tasks.deleteTask( id );
                        console.log('Task deleted!');
                    }
                }
                break;
        }
        saveDB(tasks.getTasks);
        await wait();
        
    } while(opt !== 0);
}
main();