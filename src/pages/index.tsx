import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo.png';
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthContext } from '../contexts/AuthContext'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest'; 

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email=== '' || password === ''){
      toast.warning('Preencha todos os dados corretamente!')
      return;
    }
    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Laboratory Central - login</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />
      <h1 style={{ fontSize: "50px", color: "#8A8A8A"}} >Laboratório Central</h1>
      <h1 style={{color: "#8A8A8A"}} >Faça seu Login</h1>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite o seu email!"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <Input
            placeholder="Digite a sua senha!"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>
        </form>

        <Link href="/signup">
           <a style={{color: "#8A8A8A"}}>Não possui uma conta? Cadastre-se</a>
        </Link>

      </div> 
    </div>
    </>
  )
}

// função para mandar usuário para paginas apenas que tem cookies dele já logado, 
// ou seja, ele não consegue acessar página de login,k pois ele já tem um cookies de login
export const getServerSideProps = canSSRGuest(async (ctx)=>{

  return{
    props:{

    }
  }
})






// export const getServiceSideProps: GetServerSideProps = async (context) => {
//   console.log("testando service")
//   return {
//     props:{

//     }
//   }

// }