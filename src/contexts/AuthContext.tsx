import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';
import { toast } from 'react-toastify';


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

//login
type UserProps = {
  id: string;
  name: string;
  email: string;
}

// signIn - credentials
type SignInProps = {
  email: string;
  password: string;
}


//cadastro
type SignUpProps = {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

//criação do contexto do signIn - children
type AuthProviderProps = {
  children: ReactNode;
}

//criação do contexto do signIn
export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

//criação do contexto do signIn
export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  
//autenticação
  const isAuthenticated = !!user;

  useEffect(()=>{
    // tentar pegar algo no cookies  /token

    const { '@nextauth.token': token } = parseCookies();
    if(token){
      api.get('/me').then(response => {
        const { id, name, email } = response.data;
        setUser({
          id,
          name,
          email,
        })
      })
      .catch(()=>{
        // se deu erro => deslogar o usuário
        signOut();
      })
    }
  },[])


//criação propriedade de user, isAuthenticated, e método login
  async function signIn({ email, password }: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Logado com sucesso!")

      //Redirecionar o user para /dashboard
      Router.push('/dashboard')


    }catch(err){
      toast.error('Erro ao acessar!')
      console.log("ERRO AO ACESSAR ", err)


    }
  }

// para fazer cadastro
  async function signUp ({ name, cpf, email, password }: SignUpProps){
    console.log(name, cpf, email, password)
    toast.success("Cadastro criado com sucesso!")

   try{
    Router.push('/')

// criar um usuário / cadastro
    const response = await api.post('/users', {
      name,
      cpf,
      email,
      password
    })

   }catch(err){
    toast.error('Erro ao cadastrar!')
    console.log("erro ao cadastrar ", err)
   } 

  }



  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}