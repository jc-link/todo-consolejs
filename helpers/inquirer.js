const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option!',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Create task`
            },
            {
                value: 2,
                name: `${'2.'.green} Show completed tasks`
            },
            {
                value: 3,
                name: `${'3.'.green} Show pending tasks`
            },
            {
                value: 4,
                name: `${'4.'.green} Complete task`
            },
            {
                value: 5,
                name: `${'5.'.green} Delete task`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit!`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('============================='.green);
    console.log('     To Do console App');
    console.log('============================='.green);

    const { option } = await inquirer.prompt(menuOptions);
    
    return option;
}

const wait = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'Enter'.green } to continue..`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'taskName',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Insert a name';
                }
                return true;
            }
        }
    ];
    const { taskName }= await inquirer.prompt(question);
    return taskName;
}

const showDeleteTask = async (tasks = []) => {
    const choices = tasks.map( (task, id) => {
        return {
            value: task.id,
            name: `${id + 1} ${task.taskName} ${(task.completed)? 'Completed':'Pending'}`
        }
    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} Cancelar`
    });
    
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ];
    const { id } = await inquirer.prompt(question);
    return id;
}

const validate = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showCompleteTask = async (tasks) => {
    const choices = tasks.map( (task, id) => {
        return {
            value: task.id,
            name: `${ id + 1} ${task.taskName}`,
            checked: false
        }
    });

    const question = [{
            type: 'checkbox',
            name: 'ids',
            message: 'Select the task(s) to complete:',
            choices
        }];
    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    wait,
    readInput,
    showDeleteTask,
    validate,
    showCompleteTask
}