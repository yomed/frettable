'use strict';

function frettable(frets) {
    const totalFingers = 4;
    const usedFingers = [];

    frets.forEach(function (fret, string) {
        let newGroup = [];
        let note = { fret, string };

        if (fret > 0) {
            let needNewGroup = true;

            // first try to add note to one of current finger groups
            usedFingers.forEach(function (fingerGroup) {
                let groupFret = fingerGroup[0].fret;
                let groupString = fingerGroup[0].string;

                // barre if fret number matches where finger is fretted on a previous note
                // but dont barre when:
                // * on top 5 strings and next note in sequence is a lower fret
                // * on 5th note and third group, and last note would create fourth group
                if (fret === groupFret &&
                    !(string < 5 && fret >= frets[string + 1]) &&
                    !(string === 4 && frets[5] !== fret && usedFingers.length === 3)) {
                    // if the in between notes are on higher frets
                    let diff = frets.slice(groupString + 1, string);
                    if (diff.filter(i => i >= fret).length === diff.length) {
                        // then barre this note with the rest of this finger group
                        fingerGroup.push(note);
                        needNewGroup = false;
                    }
                }
            });

            // otherwise create new group
            if (needNewGroup) {
                newGroup.push(note);
                usedFingers.push(newGroup);
            }
        }
    });

    return usedFingers.length <= totalFingers;
}

module.exports = frettable;
