import classes from './Feed.module.scss';
import { FeedPost } from './FeedPost.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../core/store/hooks/useAppDispatch.ts';
import { FeedService } from './services/FeedService.ts';
import { IFeedState } from './interfaces/IFeedState.ts';
import { localStorageNames } from '../../main/constants/localStorageNames.ts';
import { SharedClassNameEnum } from '../../uikit/main/styles/SharedClassNameEnum.ts';
import { feedData } from './mocks.ts';

export const FeedDataList = () => {
  const dispatch = useAppDispatch();

  const [list, setList] = useState<IFeedState['list']>([]);

  useEffect(() => {
    if (localStorage.getItem(localStorageNames.TOKEN) === null) {
      setList(feedData as unknown as IFeedState['list']);
    }

    dispatch(FeedService.fn())
      .unwrap()
      .then(res => {
        setList(res);
      })
      .catch(() => {
        setList(feedData as unknown as IFeedState['list']);
      });
  }, []);

  return (
    <div className={classes.feedList}>
      {list.length > 0 ? (
        <>
          {list.map(feed => (
            <FeedPost feed={feed} />
          ))}
        </>
      ) : (
        <div style={{ margin: '25% 40%' }} className={SharedClassNameEnum.TEXT_20_REGULAR}>
          Not found
        </div>
      )}
    </div>
  );
};
