'use strict';

function fingerSpot(fret, string) {
    return {
        fret: fret,
        string: string
    };
};

function filterAbove(note) {
    return function (i) {
        return i >= note;
    }
}

function frettable(notes) {
    var fingers = [];
    var numFingers = 4;
    var newGroup;
    var needNewGroup;
    var groupFret;
    var groupString;
    var spot;
    var diff;

    notes.forEach(function (note, string) {
        newGroup = [];
        spot = fingerSpot(note, string);
        if (note > 0) {
            // try to add note to one of current finger groups
            needNewGroup = true;
            fingers.forEach(function (fingerGroup) {
                groupFret = fingerGroup[0].fret;
                groupString = fingerGroup[0].string;
                // barre if fret number matches where finger is fretted on a previous note
                // but dont barre when:
                // * on top 5 strings and next note in sequence is a lower fret
                // * on 5th note and third group, and last note would create fourth group
                if (note === groupFret &&
                    !(string < 5 && note >= notes[string + 1]) &&
                    !(string === 4 && notes[5] !== note && fingers.length === 3)) {
                    // check that the in between notes are on higher frets
                    diff = notes.slice(groupString + 1, string);
                    if (diff.filter(filterAbove(note)).length === diff.length) {
                        // then barre this note with the rest of this finger group
                        fingerGroup.push(spot);
                        needNewGroup = false;
                    }
                }
            });
            // otherwise create new group
            if (needNewGroup) {
                newGroup.push(spot);
                fingers.push(newGroup);
            }
        }
    });
    return fingers.length <= numFingers;
}

module.exports = frettable;
