import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export function Header(){
const { user, signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>


    <Link href='/dashboard'>

        <img src='logo.png' width={100} height={100} />

    </Link>
    <h4>Bem Vindo(a) {user?.name}</h4>



      <nav className={styles.menuNav} >
        <Link href='/category' >
        <a>Categoria</a>
        </Link>

        <Link href='/product' >
        <a>Produtos</a>
        </Link>

        <button onClick={signOut} >
          <FiLogOut  color='#292828' size={25} />
        </button>
      </nav>
</div>
        </header>
)}



