const test = require('tape');
const request = require('supertest');
const app = require('../../app');
const dbBuild = require('../../database/db_build');
require('env2')('config.env');

const getUserTest = () => {
  dbBuild(() => {
    const token = process.env.TEST_TOKEN;

    test('Routes: test for getuser route', (t) => {
      request(app)
        .get('/getuser')
        .set('authorization', token)
        .expect(200)
        .end((err, res) => {
          t.error(err, 'err object should be null');

          request(app)
            .get('/getuser')
            .expect(401)
            .end((err2, res2) => {
              t.error(err2, 'err object should be null');
              t.end();
            });
        });
    });
  });
};

module.exports = getUserTest;
