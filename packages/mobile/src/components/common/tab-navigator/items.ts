import { TabID as HomeTabID } from '../../screens/home/routes/stack-routes';
import { TabID as PeopleTabID } from '../../screens/people/routes/stack-routes';
import { TabID as QuizTabID } from '../../screens/quiz/routes/stack-routes';
import { TabID as NewsTabID } from '../../screens/news/routes/stack-routes';
import { TabID as SettingsTabID } from '../../screens/settings/routes/stack-routes';

import { TabNavigatorItem } from '../../../types';

const items: TabNavigatorItem[] = [
  {
    id: HomeTabID,
    title: 'Home',
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
  },
  {
    id: PeopleTabID,
    title: 'People',
    activeIcon: 'account-group',
    inactiveIcon: 'account-group-outline',
  },
  {
    id: QuizTabID,
    title: 'Quiz',
    activeIcon: 'comment-question',
    inactiveIcon: 'comment-question-outline',
  },
  {
    id: NewsTabID,
    title: 'Notícias',
    activeIcon: 'newspaper',
    inactiveIcon: 'newspaper',
  },
  {
    id: SettingsTabID,
    title: 'Configurações',
    activeIcon: 'settings',
    inactiveIcon: 'settings-outline',
  },
];

export default items;
