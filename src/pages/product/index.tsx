import { useState, FormEvent } from 'react'
import Head from "next/head"
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { api } from '../../services/apiClient';

type ItemPros = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemPros[]
}

export default function Product({categoryList}:CategoryProps ){
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [delivery_time, setDelivery_time] = useState('')
  const [password, setPassword] = useState('')
  //
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('');


  // console.log(categoryList)
  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  // para conseguir selecionar um anova categoria da lista de categoria
  function handleChangeCategory(event){
// console.log("categoria: ", categories [event.target.value])
    setCategorySelected (event.target.value)
  }

  async function handleRegister(event: FormEvent){
    event.preventDefault();
    try{
      const data = new FormData()
      if(name === '' || code === '' || delivery_time === '' || password === '' || price === '' || description === ''){
      toast.error("Por favor preencha todos os campos!");
      return;
      }
      data.append('name', name);
      //
      data.append('code', code);
      data.append('delivery_time', delivery_time);
      data.append('password', password);
      //
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);

      const apiClient = setupAPIClient()
      await apiClient.post('/product', data);

      toast.success('Exame cadastrado com sucesso!')

      }catch(err){
      console.log(err)
      toast.error('Ops erro ao cadastrar!')

    }

    setName('');
    setCode('');
    setDelivery_time('');
    setPassword('');
    setPrice('');
    setDescription('');

  }
  return(
    <>
    <Head>
      <title>Novo Exame - CL</title>
    </Head>
 
<div>
</div>
      <Header/>
      <main className={styles.container}>
        <h1>Cadastrar novo exame</h1>
        <form className={styles.form} onSubmit={handleRegister} >

          <select className={styles.select}
          value={categorySelected}
          onChange={handleChangeCategory}
          >


            {categories.map((item, index)=>{
              return(
                <option 
                key={item.id}
                value={index}
                 >
                {item.name}
                </option>
              )
            })}
         
          </select>
<textarea 
        placeholder='Digite o nome do exame'
        className={styles.textarea}
          value={name}
        onChange={(e) => setName(e.target.value)}        
        />        

<input 
          type='text'
          placeholder='Digite o código do exame'
            className={styles.input}
            value={code}
          onChange={(e) => setCode(e.target.value)}
          />

<input 
          type='number'
          min={1}
          placeholder='Digite o prazo em dias para entrega do exame'
            className={styles.input}
            value={delivery_time}
          onChange={(e) => setDelivery_time(e.target.value)}
          />

<input 
          type='number'
          min={1}
          placeholder='Digite a senha desse exame'
            className={styles.input}
            value={password}
          onChange={(e) => setPassword(e.target.value)}
          />          

<input 
          type='text'
          placeholder='Digite o preço do exame'
          className={styles.input}
            value={price}
          onChange={(e) => setPrice(e.target.value)}
          />  
                  
<textarea 
        
          placeholder='Descreva as informações do exame'
          className={styles.textarea}
            value={description}
          onChange={(e) => setDescription(e.target.value)}          
          />
            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/category')
  // console.log(response.data)

  return{
    props:{
      categoryList: response.data
    }
  }
})

