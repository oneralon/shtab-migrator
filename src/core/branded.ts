export type Brandable = null | boolean | string | number;

export type Brand<T, B> = T & { __brand__: B };

export interface Branded<T extends Brandable, B extends string> {
  readonly __brand__: B;
  cast: (value: T) => Brand<T, B>;
}

type Cast<T> = (val: T) => T;

export function CreateBranded<T extends Brandable, B extends string>(__brand__: B, cast: Cast<T>): Branded<T, B> {
  return {
    __brand__,

    cast(value: T) {
      return cast(value) as unknown as Brand<T, B>;
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrandedType<T extends Branded<any, string>> = Brand<Parameters<T['cast']>[0], T['__brand__']>;
