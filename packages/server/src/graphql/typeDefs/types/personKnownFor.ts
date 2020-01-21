import { gql } from 'apollo-server';

export default gql`
  union PersonKnowFor = BaseMovie | BaseTVShow
`;
