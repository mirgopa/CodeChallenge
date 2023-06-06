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

const centinelCell = value => {
    if (value > MAX_CELL) return MIN_CELL;
    if (value < MIN_CELL) return MAX_CELL;
    return value;
}

const getLastIndex = (index, AOS, reverse) => {
    let loops = 1;
    if (!reverse) {
        let i = index + 1;
        while (i < AOS.length) {
            if (AOS[i] === '🤜') loops++;
            if (AOS[i] === '🤛') loops--;
            if (loops === 0) return i;
            i++;
        }
    } else {
        let i = index - 1;
        while (i >= 0) {
            if (AOS[i] === '🤜') loops--;
            if (AOS[i] === '🤛') loops++;
            if (loops === 0) return i;
            i--;
        }
    }
}

function translate (input) {
    const AOS = Array.from(input);
    let pointer = 0;
    let memory = [0];
    let output = '';
    for (let i = 0; i < AOS.length; i++) {
        switch(AOS[i]) {
            case '👉': pointer++; memory[pointer] ??= 0; break;
            case '👈': pointer--; memory[pointer] ??= 0; break;
            case '👆': memory[pointer] = centinelCell(memory[pointer]+1); break;
            case '👇': memory[pointer] = centinelCell(memory[pointer]-1); break;
            case '🤜': 
                if (memory[pointer] === 0) {
                    i = getLastIndex(i, AOS, false);
                }
                break;
            case '🤛': 
                if (memory[pointer] !== 0) {
                    i = getLastIndex(i, AOS, true);
                }
                break;
            case '👊': output += String.fromCharCode(memory[pointer]); break;
        }
        // console.log(`${AOS[i]} ; ${i} ; ${pointer} ; ${output} ; ${memory}`);
    }
    console.log(output);
}

//translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊');

translate('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊');