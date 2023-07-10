import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo.png';
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function SignUp() {
const {signUp} = useContext(AuthContext)


// state de cadastro
  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [cpf, setCPF] = useState ('')
  const [password, setPassword] = useState ('')


  const [loading, setLoading] = useState(false)
  
   async function handleSignUp (event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error("Preencha todos os campos!")
      return;
    }

setLoading(true);

// o signUp precisa receber os dados do cadastro do cliente, então faz o let par o signUp, poder pegar
let data = {
  name,
  cpf,
  email,
  password
} 

await signUp(data)

setLoading(false);


   }
  
  return (
    <>
    <Head>
      <title>Faça o seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />

      <div className={styles.login}>
      <h1 style={{ fontSize: "50px", color: "#8A8A8A"}} >Laboratório Central</h1>

        <h1 style={{color: "#8A8A8A"}} >Cadastre-se</h1>

        <form onSubmit={handleSignUp} > 
          <Input
            placeholder="Digite o seu nome!"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

<Input
            placeholder="Digite o seu CPF!"
            type="text"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />

          <Input
            placeholder="Digite o seu melhor email!"
            type="text"
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         
          />

          <Input
            placeholder="Digite a sua senha!"
            type="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Cadastrar
          </Button>
        </form>

        <Link href="/">
           <a style={{color: "#8A8A8A"}}>Já possui uma conta? Faça login!</a>
        </Link>

      </div>
    </div>
    </>
  )
}
