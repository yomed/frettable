'use strict';

function frettable(notes) {
    var fingers = [];
    var numFingers = 4;
    var newGroup;
    var diff;
    var fingerSpot = function (string, fret) {
        return {
            string: string,
            fret: fret
        };
    };

    notes.forEach(function (note, string) {
        newGroup = [];
        if (note > 0) {
            // try to add to current groups
            var needNewGroup = true;
            fingers.forEach(function (fingerGroup) {
                // if fret number matches where finger is fretted
                if (note === fingerGroup[0].fret) {
                    // and the diff notes are higher frets
                    diff = notes.slice(fingerGroup[0].string + 1, string);
                    if (diff.filter(function (i) { return i >= note;}).length === diff.length) {
                        fingerGroup.push(fingerSpot(string, note));
                        needNewGroup = false;
                    }
                }
            });
            // otherwise create new group
            if (needNewGroup) {
                newGroup.push(fingerSpot(string, note));
                fingers.push(newGroup);
            }
        }
    });
    return (fingers.length <= numFingers);
}

module.exports = frettable;