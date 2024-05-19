export interface Category {
  id: string;
  name: string;
}

export type CategoryCreateInputWithIsActive = Omit<Category, 'id'> & {
  isActive: boolean;
};
