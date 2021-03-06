import Message from "../Message";

const Recado = ({recado}) => {
  return (
    <Message>
      <h4 className="from">De: {recado.from}</h4>
      <div className="message">{recado.message}</div>
    </Message>
  )
}

export default function MessageBox(props){
  // console.log('MessageBox:', props);
  return (
    props.recados.slice(0,props.maxItensToShow).map(recadoAtual => {
      return <MessageItem recado={recadoAtual} key={recadoAtual.id}/>
    })
  )
}