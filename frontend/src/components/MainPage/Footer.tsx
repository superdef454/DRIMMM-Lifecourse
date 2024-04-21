import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';
import {
  ROUTE_CONDITIONS_OF_USE,
  ROUTE_MAIN_MENU,
  ROUTE_PRIVACY_POLICY,
} from '../../core/routes/constants/routePath.ts';
import Logo from '../../../public/header-logo.svg';
import TelegramLogo from '../../../public/telegram.svg';
import VKLogo from '../../../public/vk.svg';
import GithubLogo from '../../../public/github.svg';
import classnames from 'classnames';
import { SharedClassNameEnum } from '../../uikit/main/styles/SharedClassNameEnum.ts';
import { Divider } from 'primereact/divider';

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div
        className={classnames(classes.footer_wrapper, SharedClassNameEnum.GRID, SharedClassNameEnum.TEXT_16_REGULAR)}
      >
        <div className={SharedClassNameEnum.GRID_3}>
          <div className={classnames(classes.footer_column, SharedClassNameEnum.GRID)}>
            <Link to={ROUTE_MAIN_MENU}>
              <img src={Logo} height="40" alt="footer logo" />
            </Link>
            <div>
              <div>460048, Оренбургская обл., г Оренбург</div>
              <div>Томилинская ул, д. 238, помещ. 2</div>
            </div>

            <div className={classes.social}>
              <Link className={classes.footer__logo_link} to="#">
                <img src={TelegramLogo} height="40" alt="footer logo" />
              </Link>
              <Link className={classes.footer__logo_link} to="#">
                <img src={VKLogo} height="40" alt="footer logo" />
              </Link>
              <Link className={classes.footer__logo_link} to="#">
                <img src={GithubLogo} height="40" alt="footer logo" />
              </Link>
            </div>
          </div>

          <div></div>

          <div className={classnames(classes.footer_column, classes.content)}>
            <Link className={classes.footer__link} to="#">
              <div>О нас</div>
            </Link>
            <Link className={classes.footer__link} to="#">
              <div>Реклама</div>
            </Link>
            <Link className={classes.footer__link} to="#">
              <div>Партнеры</div>
            </Link>
            <Link className={classes.footer__link} to="#">
              <div>Обратная связь</div>
            </Link>
          </div>
        </div>
        <Divider />

        <div className={classes.footer__row_politic}>
          <div className={classes.footer_row}>
            <Link className={classes.footer__link} to={ROUTE_PRIVACY_POLICY}>
              <div>Политика конфиденциальности</div>
            </Link>
            <Link className={classes.footer__link} to={ROUTE_CONDITIONS_OF_USE}>
              <div>Условия использования сайта</div>
            </Link>
          </div>
          <div>© ООО "СОЗНАНИЕ" 2024. Все права защищены</div>
        </div>
      </div>
    </footer>
  );
};
