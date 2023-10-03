import { GraphQLError } from "graphql";

export default class TMDBApiError extends GraphQLError {
  extensions: Record<string, string | number> = {};
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.extensions = { code: "TMDB_API_ERROR", status };
  }
}
