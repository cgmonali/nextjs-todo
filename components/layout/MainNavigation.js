import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Todo List</div>
      <nav>
        <ul>
          <li>
            <Link href='/'></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
