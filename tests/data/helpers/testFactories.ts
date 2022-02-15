import faker from 'faker';

export const makeUrl = () => 'http://any-url.com';

export const makeInvalidUrl = () => '//any-url.com';

export const makeAuthentication = () => faker.random.alpha({ count: 10 });
