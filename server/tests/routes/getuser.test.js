const test = require('tape');
const request = require('supertest');
const app = require('../../app');
const dbBuild = require('../../database/db_build');

const getUserTest = () => {
  test('Routes: test for getuser route', (t) => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTUxNjI2OTY3NzgzMn0.rWD7TYNYFWVFlJAQsPTQm6CawqXYX8w_BEyB5WcGRyA';
    dbBuild(() => {
      request(app)
        .get('/getuser')
        .set('authorization', token)
        .end((err, res) => {
          t.error(err, 'err object should be null');
          t.equal(res.status, 200, 'request with valid token should generate 200 response');
        });

      request(app)
        .get('/getuser')
        .end((err, res) => {
          t.error(err, 'err object should be null');
          t.equal(res.status, 401, 'request without token should return a 401 response');
          t.end();
        });
    });
  });
};

module.exports = getUserTest;
