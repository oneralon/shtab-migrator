import { BrandedType, CreateBranded } from './branded';

export const Name = CreateBranded('Name', (value: string) => {
  return value;
});
export type Name = BrandedType<typeof Name>;
