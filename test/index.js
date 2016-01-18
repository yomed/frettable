'use strict';

var expect = require('chai').expect;

var frettable = require('../');

describe('frettable', function () {
    it('should handle basic cases', function () {
        expect(frettable([-1, -1, -1, -1, -1, -1])).to.be.true;
        expect(frettable([0, 0, 0, 0, 0, 0])).to.be.true;
        expect(frettable([1, 0, 0, 0, 0, 0])).to.be.true;
        expect(frettable([1, 0, 0, 0, 0, 0])).to.be.true;
    });
    it('should fail when there are too many unique frets', function () {
        expect(frettable([1, 2, 3, 4, 5, 6])).to.be.false;
        expect(frettable([2, 2, 3, 4, 5, 6])).to.be.false;
        expect(frettable([-1, 2, 3, 4, 5, 6])).to.be.false;
        expect(frettable([0, 2, 3, 4, 5, 6])).to.be.false;
    });
    it('should handle weird barring', function () {
        expect(frettable([3, 3, 4, 5, 6, 6])).to.be.true;
        expect(frettable([3, 3, 5, 5, 5, 3])).to.be.true;
        expect(frettable([2, 0, 0, 2, 3, 2])).to.be.true;
    });
    it('should fail on errant chords', function () {
        expect(frettable([3, 3, 2, -1, 1, 3])).to.be.false; // C
        expect(frettable([-1, 3, 2, 5, 5, 3])).to.be.false; // C
    });
});
