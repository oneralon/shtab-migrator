export enum Environment {
  Development = 'development',
  Production = 'production',
}

let env = Environment.Development;

if (process.env.NODE_ENV) {
  const [override] = Object
    .values(Environment)
    .filter(value => value === process.env.NODE_ENV);

  /* istanbul ignore if */
  if (!override) {
    const message = [
      'It seems you specified wrong NODE_ENV',
      `Possible values are: ${ Object.values(Environment).join(', ') }`,
      `Your value is: ${ process.env.NODE_ENV }.`,
    ].join('. ');

    throw new Error(message);
  }

  env = override;
}

export const ENV = env;
