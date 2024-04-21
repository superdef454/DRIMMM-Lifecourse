import classes from './UniversityInfo.module.scss';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { AuthPage } from '../../auth/components/AuthPage.tsx';
import { MapRussia } from '../MapRussia.tsx';

interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  content?: string;
  description?: string;
}

export const UniversityInfo = () => {
  const events: TimelineEvent[] = [
    {
      status: 'Улучшение качества образования',
      icon: 'pi pi-chart-line',
      content: 'game-controller.jpg',
      description:
        '           Приложение помогает студентам разобраться в сложных темах, получить помощь от\n' +
        '          однокурсников и оформить свои достижения в резюме. Это способствует более глубокому пониманию материала и\n' +
        '          повышению успеваемости.',
    },
    {
      status: 'Повышение вовлечённости студентов',
      icon: 'pi pi-users',
      description:
        ' Приложение предоставляет студентам новые возможности для общения, обмена опытом и сотрудничества. Это повышает их мотивацию и интерес к учёбе.',
    },
    {
      status: 'Повышение престижа вуза',
      icon: 'pi pi-graduation-cap',
      description:
        ' Приложение, которое помогает студентам учиться и развиваться, может повысить репутацию вуза и привлечь больше абитуриентов.',
    },
  ];

  const customizedMarker = (item: TimelineEvent) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  const customizedContent = (item: TimelineEvent) => {
    return (
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
            alt=""
            width={200}
            className="shadow-1"
          />
        )}
        <p>{item.description}</p>
      </Card>
    );
  };

  return (
    <div>
      <h1 className={classes.title}>Информация ВУЗам</h1>
      <div className={classes.description}>Приложение «LifeCourse» полезно для вузов по нескольким причинам:</div>

      <div>
        <Timeline
          value={events}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      </div>
      <h2 className={classes.title}>ВУЗы сотрудники</h2>
      <div className={classes.map}>
        <MapRussia />
      </div>
      <AuthPage />
    </div>
  );
};
