'use strict';

var expect = require('chai').expect;

var frettable = require('../');

describe('frettable', function () {
    it('should handle basic cases', function () {
        expect(frettable([-1, -1, -1, -1, -1, -1])).to.equal(true);
        expect(frettable([0, 0, 0, 0, 0, 0])).to.equal(true);
        expect(frettable([1, 0, 0, 0, 0, 0])).to.equal(true);
        expect(frettable([1, 0, 0, 0, 0, 0])).to.equal(true);
    });
});
