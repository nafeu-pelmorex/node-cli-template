import arg from 'arg';
import inquirer from 'inquirer';
import execa from 'execa';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '-y': '--yes',
        },
        {
            argv: rawArgs.slice(2),
        }
    )
    return {
        skipPrompts: args['--yes'] || false,
        command: args._[0],
    }
}

async function promptForMissingOptions(options) {
    const defaultCommand = 'date';
    if (options.skipPrompts) {
        return {
            ...options,
            command: options.command || defaultCommand
        };
    }

    const questions = [];
    if (!options.command) {
        questions.push({
            type: 'list',
            name: 'command',
            message: 'Please choose which command to run',
            choices: ['date', 'ls', 'pwd'],
            default: defaultCommand
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        command: options.command || answers.command,
    }
}

async function handleOptions({ command }) {
    const result = await execa(command, [], {});
    if (result.failed) {
        Promise.reject(`Failed to execute ${command}`)
        return;
    } else {
        console.log(result.stdout);
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    try {
        await handleOptions(options);
    } catch(err) {
        console.log(err.message);
    }
}
