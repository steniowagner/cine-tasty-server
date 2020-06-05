import { gql } from 'apollo-server';

export default gql`
  type ProductionCompany {
    id: ID
    logoPath: String
    name: String
    originCountry: String
  }

  type ProductionCompanyResponse {
    id: ID
    logo_path: String
    name: String
    origin_country: String
  }
`;
