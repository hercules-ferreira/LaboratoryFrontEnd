import Modal from 'react-modal';
import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '../../pages/dashboard'
import styles from './styles.module.scss'

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void; 
}

export function ModalOrder({ isOpen, onRequestClose, order,  handleFinishOrder }: ModalOrderProps){

  const customStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#dedede'
    }
  };

  return(
   <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
   >

    <button
    type="button"
    onClick={onRequestClose}
    className="react-modal-close"
    style={{ background: 'transparent', border:0 }}
    >
      <FiX size={45} color= '#464444' />
    </button>

    <div className={styles.container}>

      <h2>Detalhes do pedido</h2>
      <span className={styles.table}>
        Número do SUS: <strong>{order[0].order.number_sus}</strong>
      </span>

      {order.map( item => (
        <section key={item.id} className={styles.containerItem}>
          <span>{item.amount}<strong>{item.product.name}</strong></span>
          <span className={styles.description}>{item.product.description}</span>
        </section>
      ))}
<button className={styles.buttonOrdem}
onClick={()=> handleFinishOrder(order[0].order_id) } >
  Concluir Pedido
</button>

    </div>

   </Modal>
  )
}