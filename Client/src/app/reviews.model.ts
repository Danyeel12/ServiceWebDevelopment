export class Review {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  _id?: string; // Use _id as MongoDB generates this field
  author?: string;
  title?: string;
  content?: string;
  date?: Date;
}
