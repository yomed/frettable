# frettable
determine if a set of notes can be physically fretted on guitar

## Installation

```bash
npm install frettable --save
```


## Usage

Frettable takes an array of notes, each representing the fret on a standard 6-string guitar.
An open note is represented as 0, and a muted note as -1. An open D chord would look like `[-1, -1, 0, 2, 3, 2]`

Based on the possible fingerings, frettable will determine whether or not the chord is "frettable."

```js
var frettable = require('frettable');
var chord;

chord = [-1, -1, 0, 2, 3, 2];
console.log(frettable(chord)); // true

chord = [1, 2, 3, 4, 5, 6];
console.log(frettable(chord)); // false - this chord is impossible to fret

```