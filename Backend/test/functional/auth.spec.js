const { test, trait } = use('Test/Suite')('Auth');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')}
 */
const User = use('App/Models/User');

trait('Test/ApiClient');

test('It should return JWT token when auth was created', async ({
  assert,
  client,
}) => {
  const userPayload = {
    email: 'emersonlaranja@gmail.com',
    password: '123456',
  };

  const user = await Factory.model('App/Models/User').create(userPayload);

  const response = await client.post('/authenticate').send(userPayload).end();

  console.log(response);

  response.assertStatus(200);
  assert.exists(response.body.token);
});
