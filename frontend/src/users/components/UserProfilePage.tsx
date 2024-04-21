import { PanelMenu } from 'primereact/panelmenu';

import { useMenuItem } from '../hooks/useMenuItem.ts';

import classes from './UserProfilePage.module.scss';
import sport from '../../../public/sport.png';
import science from '../../../public/scinse.png';
import creativity from '../../../public/creativity.svg';
import volunteer from '../../../public/volunteer.svg';
import { FeedDataList } from '../../components/Feed/FeedDataList.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_DEPARTMENT, ROUTE_FACULTY } from '../../core/routes/constants/routePath.ts';
import { useMemo } from 'react';

export const UserProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItem = useMenuItem();
  const tagsData = [
    {
      title: 'Наука',
      level: 1,
      avatar: science,
      rate: 10,
    },
    {
      title: 'Спорт',
      level: 1,
      avatar: sport,
      rate: 10,
    },
    {
      title: 'Творчество',
      level: 1,
      avatar: creativity,
      rate: 10,
    },
    {
      title: 'Волонтерство',
      level: 1,
      avatar: volunteer,
      rate: 10,
    },
  ];
  const isProfile = useMemo(() => location.pathname === '/profile', [location]);
  return (
    <div className={classes.profile}>
      <div className={classes.sideBar}>
        {isProfile ? <PanelMenu model={menuItem} className="w-full md:w-25rem" /> : <></>}
      </div>
      <div className={classes.profile__page}>
        <div className={classes.profile__info}>
          <div className={classes.profile__info__header_group}>
            <div className={classes.profile__info__header_group__avatar}></div>
            <div className={classes.profile__info__header_group__data}>
              <div className={classes.profile__name}>Иванов Иван</div>
              <div className={classes.profile__study_data}>
                <div className={classes.profile__study_data_left}>
                  <p>Факультет/Институт: </p>
                  <p>Кафедра: </p>
                  <p>Поток: </p>
                  <p>Группа: </p>
                </div>
                <div className={classes.profile__study_data_right}>
                  <p onClick={() => navigate(ROUTE_FACULTY)}>ИМИТ</p>
                  <p onClick={() => navigate(ROUTE_DEPARTMENT)}>ПОВТАС</p>
                  <p>4 курс</p>
                  <p>20ПИнж</p>
                </div>
              </div>
            </div>
            <div className={classes.profile__info__header_right}>
              {isProfile ? <button className={classes.editProfileBtn}>Редактировать профиль</button> : <></>}

              <div className={classes.profileTopScore}>
                <div className={classes.profileTopScore__rate}>
                  10 <span>★</span>
                </div>
                <div className={classes.profileTopScore__position}>Место в рейтинге 1</div>
              </div>
            </div>
          </div>
          <div className={classes.tagsGroup}>
            {tagsData.map(tag => (
              <div className={classes.tags__card}>
                <div className={classes.tags__card__title}>{tag.title}</div>
                <div className={classes.tags__card__level}> Уровень {tag.level}</div>
                <div className={classes.tags__card__avatar}>
                  <img src={tag.avatar} className={classes.tags__card__avatar_img} />
                </div>
                <div className={classes.tags__card__rate}>{tag.rate} ★</div>
              </div>
            ))}
          </div>
        </div>
        <FeedDataList />
      </div>
    </div>
  );
};
