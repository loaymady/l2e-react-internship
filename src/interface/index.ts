export interface Post {
  id: string;
  name: string;
  image: File | null;
}

export interface FormValues {
  name: string;
  image: File | null;
}
