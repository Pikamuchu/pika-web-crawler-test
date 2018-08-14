import { expect, test } from '@oclif/test';

import cmd = require('../src');

describe('Test pika-web-crawler-test script', () => {
  test
    .stdout()
    .do(() => cmd.run(['-f=kk', 'https://pikamachu.github.io']))
    .it('runs crawler on https://pikamachu.github.io with kk filter', ctx => {
      expect(ctx.stdout).to.contain('Opening url https://pikamachu.github.io and parsing links');
    });
});
