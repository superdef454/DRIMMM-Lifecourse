import classes from './Feed.module.scss';
import { Chip } from 'primereact/chip';
import { useState } from 'react';
import ScinseImage from '../../../public/scinse.png';
import SportImage from '../../../public/sport.png';
import { InputText } from 'primereact/inputtext';

interface IFeedPostProps {
  feed: any;
}

export const FeedPost = ({ feed }: IFeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className={classes.feedItem}>
      <div className={classes.feedItem_header}>
        <div className={classes.feedItem_header__userInfo}>
          <div className={classes.feedItem_header__avatar}></div>
          <div className={classes.feedItem_header__header_text}>
            <div className={classes.feedItem_header__userName}>{feed.author.name}</div>
            <div className={classes.feedItem_header__date}>{feed.created_at}</div>
          </div>
        </div>
        <div className={classes.feedItem_header__title}>{feed.title}</div>
        <div className={classes.feedItem_header__saved}>
          <Chip label={feed.author.group} />
          <Chip label={feed.author.faculty} />
          {isSaved ? (
            <i className="pi pi-bookmark-fill" onClick={() => setIsSaved(!isSaved)} style={{ color: 'slateblue' }}></i>
          ) : (
            <i className="pi pi-bookmark" onClick={() => setIsSaved(!isSaved)} style={{ color: 'slateblue' }}></i>
          )}
        </div>
      </div>
      <div className={classes.feedItem_main}>
        <div className={classes.feedItem_main__image}></div>
      </div>
      <div className={classes.feedItem_bottom}>
        {isLiked ? (
          <i className="pi pi-heart-fill" onClick={() => setIsLiked(!isLiked)} style={{ color: 'red' }}></i>
        ) : (
          <i className="pi pi-heart" onClick={() => setIsLiked(!isLiked)} style={{ color: 'slateblue' }}></i>
        )}

        <span>{feed.likes}</span>
        <i className="pi pi-comment" style={{ color: 'slateblue' }}></i>
        <div className={classes.feedItem_header__chipsGroup}>
          <Chip label="Наука" image={ScinseImage} className={classes.chip} />
          <Chip label="Спорт" image={SportImage} className={classes.chip} />
        </div>
      </div>
      <div className={classes.feedItem_main__description}>{feed.description.replace(/<[^>]+>/g, '')}</div>
      <div className={classes.comment}>
        <div className="p-inputgroup w-full md:w-30rem">
          <InputText
            placeholder="Написать комментариий..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <span className="p-inputgroup-addon">
            <i className="pi pi-camera"></i>
          </span>
          <span className="p-inputgroup-addon">
            <i className="pi pi-face-smile"></i>
          </span>
          {!!comment && (
            <span className="p-inputgroup-addon">
              <i className="pi pi-send"></i>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
