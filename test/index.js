const test = require('ava');
const frettable = require('../');

function verify(t, isFrettable) {
    return chord => t.is(frettable(chord), isFrettable);
}

test('handles basic cases', t => {
    [
        [-1, -1, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0]
    ].forEach(verify(t, true));
});
test('handles weird barring', t => {
    [
        [3, 3, 4, 5, 6, 6],
        [3, 3, 5, 5, 5, 3],
        [2, 0, 0, 2, 3, 2]
    ].forEach(verify(t, true));
});
test('fails when there are too many unique frets', t => {
    [
        [1, 2, 3, 4, 5, 6],
        [2, 2, 3, 4, 5, 6],
        [-1, 2, 3, 4, 5, 6],
        [0, 2, 3, 4, 5, 6]
    ].forEach(verify(t, false));
});
test('fails on errant chords', t => {
    [
        [3, 3, 2, -1, 1, 3], // C
        [-1, 3, 2, 5, 5, 3] // C
    ].forEach(verify(t, false));
});
