import { useEffect, useState } from 'react';
import { IOptions } from './IOptions.ts';
import classes from './Feed.module.scss';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { cities, faculty, group, university } from './mocks.ts';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { useAppDispatch } from '../../core/store/hooks/useAppDispatch.ts';
import { FeedService } from './services/FeedService.ts';

export const FeedFilters = () => {
  const [paramCity, setParamCity] = useState<IOptions | null>(null);
  const [paramUniversity, setParamUniversity] = useState<IOptions | null>(null);
  const [paramFaculty, setParamFaculty] = useState<IOptions | null>(null);
  const [paramGroup, setParamGroup] = useState<IOptions | null>(null);

  const [listUniversity, setListUniversity] = useState<any[]>([]);
  const [listFaculty, setListFaculty] = useState<any[]>([]);
  const [listCity, setListCity] = useState<any[]>([]);
  const [listGroup, setListGroup] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FeedService.getGroup())
      .unwrap()
      .then(res => {
        setListGroup(res);
      })
      .catch(() => {
        setListGroup(group);
      });
    dispatch(FeedService.getUniversity())
      .unwrap()
      .then(res => {
        setListUniversity(res);
      })
      .catch(() => {
        setListUniversity(university);
      });
    dispatch(FeedService.getCity())
      .unwrap()
      .then(res => {
        setListCity(res);
      })
      .catch(() => {
        setListCity(cities);
      });
    dispatch(FeedService.getFaculty())
      .unwrap()
      .then(res => {
        setListFaculty(res);
      })
      .catch(() => {
        setListFaculty(faculty);
      });
  }, []);

  return (
    <Panel header={'Фильтры'} toggleable className={classes.searchGroup}>
      <div className={classes.aside}>
        <div className={classes.filterItem}>
          <div>Город</div>
          <Dropdown
            filter
            inputId="dd-city"
            value={paramCity}
            onChange={(e: DropdownChangeEvent) => setParamCity(e.value)}
            options={listCity}
            optionLabel="name"
            className={classes.filterItem__input}
          />
        </div>
        <div className={classes.filterItem}>
          <div>ВУЗ</div>
          <Dropdown
            filter
            inputId="dd-city"
            value={paramUniversity}
            onChange={(e: DropdownChangeEvent) => setParamUniversity(e.value)}
            options={listUniversity}
            optionLabel="name"
            className={classes.filterItem__input}
          />
        </div>
        <div className={classes.filterItem}>
          <div>Факультет</div>
          <Dropdown
            filter
            inputId="dd-city"
            value={paramFaculty}
            onChange={(e: DropdownChangeEvent) => setParamFaculty(e.value)}
            options={listFaculty}
            optionLabel="name"
            className={classes.filterItem__input}
          />
        </div>
        <div className={classes.filterItem}>
          <div>Група</div>
          <Dropdown
            filter
            inputId="dd-city"
            value={paramGroup}
            onChange={(e: DropdownChangeEvent) => setParamGroup(e.value)}
            options={listGroup}
            optionLabel="name"
            className={classes.filterItem__input}
          />
        </div>
        <div className={classes.feedFilter__buttonGroup}>
          <Button label="Сбросить" outlined />
          <Button label="Применить" />
        </div>
      </div>
    </Panel>
  );
};
