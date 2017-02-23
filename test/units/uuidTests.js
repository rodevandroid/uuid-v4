'use strict';

const assert = require('assertthat');

const uuidv4 = require('../../lib/uuidv4');

suite('uuidv4', () => {
  test('is a function', done => {
    assert.that(uuidv4).is.ofType('function');
    done();
  });

  test('returns a v4 UUID.', done => {
    const uuid = uuidv4();

    assert.that(uuid).is.ofType('string');
    assert.that(uuidv4.regex.test(uuid)).is.true();
    done();
  });

  test('returns a different v4 UUID on each call.', done => {
    const uuid = uuidv4(),
          uuidOther = uuidv4();

    assert.that(uuid).is.not.equalTo(uuidOther);
    done();
  });

  suite('regex', () => {
    test('is a regular expression that describes a v4 UUID.', done => {
      assert.that(uuidv4.regex).is.equalTo(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);
      done();
    });
  });

  suite('fromString', () => {
    test('is a function.', done => {
      assert.that(uuidv4.fromString).is.ofType('function');
      done();
    });

    test('throws an error if no text is given.', done => {
      assert.that(() => {
        uuidv4.fromString();
      }).is.throwing('Text is missing.');
      done();
    });

    test('returns a v4 UUID that is derived from the SHA1 of the given text.', done => {
      const uuid = uuidv4.fromString('the native web');

      assert.that(uuid).is.equalTo('cc762e69-089e-4239-8b06-1ab26a005319');
      assert.that(uuidv4.regex.test(uuid)).is.true();
      done();
    });
  });

  suite('empty', () => {
    test('is a function.', done => {
      assert.that(uuidv4.empty).is.ofType('function');
      done();
    });

    test('returns 00000000-0000-0000-0000-000000000000.', done => {
      assert.that(uuidv4.empty()).is.equalTo('00000000-0000-0000-0000-000000000000');
      done();
    });
  });
});