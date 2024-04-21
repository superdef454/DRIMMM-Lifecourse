import classes from './EmployerInfo.module.scss';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { AuthPage } from '../../auth/components/AuthPage.tsx';

export const EmployerInfo = () => {
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
      status: 'Анализ рынка труда',
      icon: 'pi pi-shopping-cart',
      description:
        'Предприниматели могут использовать приложение для анализа рынка труда, поиска талантливых студентов и выпускников, а также для оценки их навыков и достижений.',
    },
    {
      status: 'Привлечение молодых специалистов',
      icon: 'pi pi-briefcase',
      description:
        'Предприниматели могут использовать приложение для привлечения молодых специалистов, которые ищут работу или стажировку. Это может быть особенно полезно для стартапов и инновационных компаний.',
    },
    {
      status: 'Создание сообщества',
      icon: 'pi pi-users',
      description:
        'Приложение объединяет студентов, преподавателей и других участников образовательного процесса в единое сообщество. Предприниматели могут использовать это сообщество для обмена опытом, идеями и ресурсами, а также для поиска партнёров и инвесторов.',
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
      <h1 className={classes.title}>Информация предпринимателям</h1>
      <div className={classes.description}>
        Приложение «LifeCourse» может быть полезно предпринимателям по нескольким причинам:
      </div>

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
