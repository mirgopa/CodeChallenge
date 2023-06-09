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

const processLoops = (AOS) => {
    let stack = [], loopPairs = [];
    for (let i = 0; i < AOS.length; i++) {
        if (AOS[i] === '🤜') {
            stack.push(i);
        } else if (AOS[i] === '🤛') {
            let openLoop = stack.pop();
            loopPairs[openLoop] = i;
            loopPairs[i] = openLoop;
        }
    }
    return loopPairs;
}

const translate = (input) => {
    const AOS = Array.from(input);
    let loopPairs = processLoops(AOS); // Generamos estructura con pares de índices para loops
    let pointer = 0;
    let memory = [0];
    let output = '';

    for (let i = 0; i < AOS.length; i++) {
        switch(AOS[i]) {
            case '👉': pointer++; memory[pointer] ??= 0; break;
            case '👈': pointer--; memory[pointer] ??= 0; break;
            case '👆': memory[pointer] = memory[pointer]+1 > MAX_CELL ? MIN_CELL : memory[pointer]+1; break;
            case '👇': memory[pointer] = memory[pointer]-1 < MIN_CELL ? MAX_CELL : memory[pointer]-1; break;
            case '🤜': 
                if (memory[pointer] === 0) {
                    i = loopPairs[i];
                }
                break;
            case '🤛': 
                if (memory[pointer] !== 0) {
                    i = loopPairs[i];
                }
                break;
            case '👊': output += String.fromCharCode(memory[pointer]); break;
        }
        // console.log(`${AOS[i]} ; ${i} ; ${pointer} ; ${output} ; ${memory}`);
    }
    console.log(output);
}

translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊');

translate('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊');