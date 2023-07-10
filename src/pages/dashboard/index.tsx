import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { ModalOrder } from '../../components/ModalOrder'
import Modal from 'react-modal';
import { toast } from 'react-toastify';

type OrderProps = {
  id: string;
  number_sus: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps{
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    number_sus: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps){

  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
   
     const apiClient = setupAPIClient(); 

     const response = await apiClient.get('/order/detail', {
       params:{
        order_id: id,
       } 
     })

     setModalItem(response.data);
     setModalVisible(true);

  }


  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish', {
      order_id: id,

      
    })
    
    toast.warning('Pedido recebido do Laboratório')


    const response = await apiClient.get('/orders');

    setOrderList(response.data);
    setModalVisible(false);
  }


  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/orders')
    setOrderList(response.data);
  }

  Modal.setAppElement('#__next');

  return(
    <>
    <Head>
      <title>Painel - Dashboard</title>
    </Head>
    <div>
      <Header/>
    
      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Pedidos enviados ao Laboratório</h1>
          <button>
            <FiRefreshCcw size={25} color=" #403e3e;"/>
          </button>
        </div>

        <article className={styles.listOrders}>

          {orderList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

          {orderList.map( item => (
            <section  key={item.id} className={styles.orderItem}> 
              <button onClick={ () => handleOpenModalView(item.id) }>
                <div className={styles.tag}></div>
             
                <span><b>Nome do Cliente: </b>{item.name} <br></br>
                <b>Número do SUS: </b> {item.number_sus}<br></br>
                <b style={{padding: "0.5rem"}}>Id do Exame: </b> {item.id}</span>
              </button>
            </section>
             
           
          ))}
                 
        </article>

      </main>

      { modalVisible && (
        <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={ handleFinishItem }
        />
      )}

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');
  //console.log(response.data);


  return {
    props: {
      orders: response.data
    }
  }
})















// import { useState } from 'react'
// import { canSSRAuth } from '../../utils/canSSRAuth'
// import Head from 'next/head';
// import styles from './styles.module.scss';
// import { Header } from '../../components/Header'
// import { FiRefreshCcw } from 'react-icons/fi'
// import { setupAPIClient } from '../../services/api';
// import Modal from 'react-modal'
// import { ModalOrder } from '../../components/ModalOrder';
// import { toast } from 'react-toastify';


// type OrderProps = {
//   id: string;
//   code: string;
//   number_sus: string
//   status: boolean;
//   draft: boolean;
//   name: string 
// }

// interface HomeProps{
//   orders: OrderProps[];
// }

// export type OrderItemProps = {
//   id: string;
//   amount: number;
//   order_id: string;
//   product_id: string;
//   product:{
//     id: string;
//     name: string;
//     description: string;
//     price: string;
//   }
//   order:{
//     id: string;
//     number_sus: string
//     status: boolean;
//     name: string 
//   }
// }

// export default function Dashboard({ orders }: HomeProps){

//   const [orderList, setOrderList] = useState(orders || [])
//   const [modalItem, setModalItem] = useState <OrderItemProps[]> ()
//   const [modalVisible, setModalVisible] = useState(false)

//   function handleCloseModal(){
//     setModalVisible(false);
//   }

//   async function handleOpenModalView(id: string){
//     const apiClient = setupAPIClient()
//     const response = await apiClient.get('/order/detail', {
//       params:{
//         order_id: id,
//       }
//     })
//     setModalItem(response.data);
//     setModalVisible(true);

//   }

// async function handleFinishItem(){
//   const apiClient = setupAPIClient();
//   await apiClient.put('/order/finish', {
//     order_id: IdleDeadline,
//   })
//   setModalVisible(false)

//   toast.warning('Pedido recebido do Laboratório')

// }


// Modal.setAppElement('#__next');

//   return(
//     <>
//     <Head>
//       <title>Painel - Dashboard</title>
//     </Head>
//     <div>
//       <Header/>
    
//       <main className={styles.container}>

//         <div className={styles.containerHeader}>
//           <h1>Pedidos enviados ao Laboratório</h1>
//           <button>
//             <FiRefreshCcw size={25} color=" #403e3e;"/>
//           </button>
//         </div>

//         <article className={styles.listOreders}>

//           {orderList.map( item => (
//             <section  key={item.id} className={styles.orderItem}> 
//               <button onClick={ () => handleOpenModalView(item.id)}>
//                 <div className={styles.tag}></div>
//                 <span><b>Nome do Cliente: </b>{item.name} <br></br>
//                 <b>Número do SUS: </b> {item.number_sus}<br></br>
//                 <b style={{padding: "0.5rem"}}>Id do Exame: </b> {item.id}</span>
//               </button>
//             </section>
//           ))}
                 
//         </article>

//       </main>
//       { modalVisible && (
//         <ModalOrder
//           isOpen={modalVisible}
//           onRequestClose={handleCloseModal}
//           order={modalItem}
//           handleFinishOrder={ handleFinishItem }
//         />
//       )}
//     </div>
//     </>
//   )
// }

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx);

//   const response = await apiClient.get('/orders');

//   return {
//     props: {
//       orders: response.data
//     }
//   }
// })