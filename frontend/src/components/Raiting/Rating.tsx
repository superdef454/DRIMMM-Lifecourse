import classes from './Rating.module.scss';
import { ProgressBar } from 'primereact/progressbar';
import { Chip } from 'primereact/chip';
import { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

export const Rating = () => {
  interface Select {
    name: string;
    code: string;
  }

  const [paramCity, setParamCity] = useState<Select | null>(null);
  const [paramUniversity, setParamUniversity] = useState<Select | null>(null);
  const [paramFaculty, setParamFaculty] = useState<Select | null>(null);
  const [paramGroup, setParamGroup] = useState<Select | null>(null);
  const [paramPotok, setParamPotok] = useState<Select | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const studentData = [
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
    {
      id: 1,
      name: 'Иванов Иван',
      rate: 100,
      faculty: 'ИМИТ',
      group: '20ПИж',
    },
  ];
  const cities: Select[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  const valueTemplate = (value: number) => {
    return (
      <>
        {value}/<b>100</b>
      </>
    );
  };
  return (
    <div>
      <h1>Рейтинг студентов</h1>
      <div className={classes.ratingPage}>
        <div>
          {studentData.map(student => (
            <div className={classes.student__card}>
              <div className={classes.student__data}>
                <div>{student.id}</div>
                <div className={classes.student__avatar}></div>
                <div className={classes.student__name}>{student.name}</div>
              </div>
              <span>★</span>
              <div className={classes.student__rate}>
                <ProgressBar value={student.rate} displayValueTemplate={valueTemplate}></ProgressBar>
              </div>
              <div className={classes.tagsGroup}>
                <Chip label={student.faculty} />
                <Chip label={student.group} />
              </div>
              {isSaved ? (
                <i
                  className="pi pi-bookmark-fill"
                  onClick={() => setIsSaved(!isSaved)}
                  style={{ color: 'slateblue' }}
                ></i>
              ) : (
                <i className="pi pi-bookmark" onClick={() => setIsSaved(!isSaved)} style={{ color: 'slateblue' }}></i>
              )}
            </div>
          ))}
        </div>

        <Panel header={'Фильтры'} toggleable className={classes.searchGroup}>
          <div className={classes.aside}>
            <div className={classes.filterItem}>
              <div>Город</div>
              <Dropdown
                filter
                inputId="dd-city"
                value={paramCity}
                onChange={(e: DropdownChangeEvent) => setParamCity(e.value)}
                options={cities}
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
                options={cities}
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
                options={cities}
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
                options={cities}
                optionLabel="name"
                className={classes.filterItem__input}
              />
            </div>
            <div className={classes.filterItem}>
              <div>Поток</div>
              <Dropdown
                filter
                inputId="dd-city"
                value={paramPotok}
                onChange={(e: DropdownChangeEvent) => setParamPotok(e.value)}
                options={cities}
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
      </div>
    </div>
  );
};
