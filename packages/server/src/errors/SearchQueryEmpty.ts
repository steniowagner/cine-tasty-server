export class SearchQueryEmpty extends Error {
  constructor() {
    super('Search query cannot be empty.');
    this.name = 'SearchQueryEmpty';
  }
}
