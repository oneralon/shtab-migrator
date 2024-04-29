import { BrandedType, CreateBranded } from './branded';

export const Email = CreateBranded('Email', (value: string) => {
  return value.toLowerCase();
});
export type Email = BrandedType<typeof Email>;
