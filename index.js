/*
 * 👉 : moves the memory pointer to the next cell
 * 👈 : moves the memory pointer to the previous cell
 * 👆 : increment the memory cell at the current position
 * 👇 : decreases the memory cell at the current position.
 * 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
 * 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
 * 👊 : Display the current character represented by the ASCII code defined by the current position.
 */
const MIN_CELL = 0;
const MAX_CELL = 255;

function translate (input) {
    const AOS = Array.from(input);
    let pointer = 0;
    let memory = [0];
    let indexMemory = 0;
    let output = '';
    for (let i = 0; i < AOS.length; i++) {
        switch(AOS[i]) {
            case '👉': pointer++; break;
            case '👈': pointer--; break;
            case '👆': memory[indexMemory] = pointer; indexMemory++; break;
            case '👇': memory[indexMemory] = pointer; indexMemory--; break;
        }
        output += String.fromCharCode(memory[indexMemory-1]);
    }
    console.log(output);
}

translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊');
console.log('DONE');