import classes from './StudentInfo.module.scss';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { AuthPage } from '../../auth/components/AuthPage.tsx';

export const StudentInfo = () => {
  interface TimelineEvent {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
    description?: string;
  }

  const events: TimelineEvent[] = [
    {
      status: 'Помощь в учёбе',
      icon: 'pi pi-info-circle',
      description:
        'Студенты могут использовать приложение для поиска информации, решения задач и обмена опытом с однокурсниками. Это помогает им лучше понимать материал и достигать более высоких результатов.',
    },
    {
      status: 'Общение и сотрудничество',
      icon: 'pi pi-trophy',
      description:
        'Приложение позволяет студентам оформить свои достижения в учёбе в виде резюме. Это может быть полезно при поиске работы или поступлении в магистратуру.',
    },
    {
      status: 'Общение и сотрудничество',
      icon: 'pi pi-users',
      description:
        'Приложение предоставляет студентам новые возможности для общения, обмена опытом и сотрудничества. Это способствует их развитию и повышению мотивации.',
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
      <h1 className={classes.title}>Информация студентам</h1>
      <div className={classes.description}>Приложение «LifeCourse» полезно для студентов по нескольким причинам:</div>

      <div>
        <Timeline
          value={events}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      </div>
      <AuthPage />
    </div>
  );
};
