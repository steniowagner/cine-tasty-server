import { LocalStackRoute } from '../../../../types';

type Routes = 'DISCOVER';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  DISCOVER: {
    title: 'Discover',
    id: 'DISCOVER',
  },
};

export default LOCAL_ROUTES;
