import { usePublicationList } from '../hooks/usePublicationList.ts';
import classes from './UserPublicationPage.module.scss';
import { PublicationItem } from './PublicationItem.tsx';
import { SharedClassNameEnum } from '../../uikit/main/styles/SharedClassNameEnum.ts';

export const UserPublicationPage = () => {
  const list = usePublicationList();

  return (
    <div className={classes.container}>
      <div className={SharedClassNameEnum.GRID_3}>
        {list.map(item => (
          <PublicationItem
            key={item.id}
            id={item.id}
            src={item.src}
            tags={item.tags}
            date={item.date}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};
