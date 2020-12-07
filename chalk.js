// const chalk = require('chalk')

const chalk = require('chalk');

// console.log(chalk.blue.bgWhite.bold('Hello world!'))
// console.log(chalk.red.underline('Hello world!'))
// console.log(chalk.green('Hello world!' + chalk.yellow.bold('世界你好')))


async function throwError() {
  throw new Error('這是一個示範案例')
}

throwError()
  .then()
  .catch(error => {
    console.log(chalk.red.underline('ERROR OCCUR!! Message: ' + chalk.blue.bgWhite.bold(error)))
})

// console.log(chalk.gray('Hello world!'))
// console.log(chalk.yellow('Hello world!'))
// console.log(chalk.cyan('Hello world!'))
// console.log(chalk.magenta('Hello world!'))


// const log = console.log;

// // Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold('Hello world!'));

// // Pass in multiple arguments
// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// // Nest styles
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// // Nest styles of the same type even (color, underline, background)
// log(chalk.green(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));

// // ES2015 template literal
// log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);



// // Use RGB colors in terminal emulators that support it.
// log(chalk.keyword('orange')('Yay for orange colored text!'));
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// log(chalk.hex('#DEADED').bold('Bold gray!'));