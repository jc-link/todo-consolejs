require('colors');

const showMenu = () => {
    return new Promise( resolve => {
        console.clear();
        console.log('============================='.green);
        console.log('     To Do console App'.green);
        console.log('============================='.green);
    
        console.log(`${ '1.'.green } Create Task`);
        console.log(`${ '2.'.green } Show Tasks`);
        console.log(`${ '3.'.green } Show Completed Tasks`);
        console.log(`${ '4.'.green } Show pending Tasks`);
        console.log(`${ '5.'.green } Complete task`);
        console.log(`${ '6.'.green } Delete Task`);
        console.log(`${ '0.'.green } Exit \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Select an option: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

const wait = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Press ${'Enter'.green } to continue`, () => {
            readline.close();
            resolve();
        })
    })
}

module.exports = {
    showMenu,
    wait
}