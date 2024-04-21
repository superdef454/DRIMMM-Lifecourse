import { Chip } from 'primereact/chip';
import classes from './FacultyPage.module.scss';
import { SharedClassNameEnum } from '../../uikit/main/styles/SharedClassNameEnum.ts';
import { OrganizationChart } from 'primereact/organizationchart';
import { useMemo } from 'react';
import osu_logo from '../../../public/osu_sign.png';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ROUTE_RATING } from '../../core/routes/constants/routePath.ts';

export const FacultyPage = () => {
  const navigate = useNavigate();
  const data = {
    name: 'ИМИТ',
    professions: ['Программист', 'Математик', 'Аналитик'],
    description:
      'Институт математики и информационных технологий, созданный на базе факультета математики и информационных технологий, начал осуществлять деятельность 28 апреля 2023 года (приказ от 24.01.2023 № 50).\n' +
      '\n' +
      'В институте работают около 100 высококвалифицированных преподавателей, среди них есть выпускники ведущих вузов страны: Московского государственного университета им. М.В. Ломоносова, Московского инженерно-физического института, Санкт-Петербургского, Саратовского и других университетов. В институте работают 13 докторов и 77 кандидатов наук.\n' +
      '\n' +
      'Основную свою задачу институт видит в подготовке специалистов, обладающих развитым системным мышлением, устойчивыми навыками аналитической и прикладной деятельности, способных производить новые знания. К чтению лекций по специальным дисциплинам привлекаются ведущие специалисты организаций г. Оренбурга.',
  };

  const treeData = useMemo(
    () => [
      {
        expanded: true,
        type: 'person',
        className: classNames(`bg-indigo-500 text-white ${classes.card}`),
        style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
        data: {
          image: osu_logo,
          name: 'ОГУ',
          title: 'Оренбургский государственный университет',
        },
        children: [
          {
            label: 'ИМИТ',
            className: 'bg-purple-500 text-white',
            style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
            children: [
              {
                label: '20ПИНж',
                className: 'bg-purple-500 text-white',
                style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
                command: () => {
                  navigate(ROUTE_RATING + '?groupId=1');
                  console.log('salfdj');
                },
              },
              {
                label: '20ИВТ',
                className: 'bg-purple-500 text-white',
                style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
              },
            ],
          },
          {
            label: 'АКИ',
            className: 'bg-purple-500 text-white',
            style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
            children: [
              {
                label: '20ПИНж',
                className: 'bg-purple-500 text-white',
                style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
              },
              {
                label: '20ИВТ',
                className: 'bg-purple-500 text-white',
                style: { borderRadius: '12px', backgroundColor: '#E0D8FC', color: '#6453A1' },
              },
            ],
          },
        ],
      },
    ],
    [],
  );
  const nodeTemplate = (node: any) => {
    if (node.type === 'person') {
      return (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
            <span className="font-bold mb-2" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
              {node.data.name}
            </span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };
  return (
    <div className={SharedClassNameEnum.GRID}>
      <h1>{data.name}</h1>
      <div>{data.description}</div>
      <div className={classes.professions}>
        {data.professions.map(item => (
          <Chip label={item} />
        ))}
      </div>
      <div className={classes.structure}>
        <h1 style={{ textAlign: 'center', margin: '50px' }}>Структура университета</h1>
        <OrganizationChart value={treeData} nodeTemplate={nodeTemplate} />
      </div>
    </div>
  );
};
