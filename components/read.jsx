import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc } from 'firebase/firestore';
import {app, database} from '../services/firebase';

//definir a coleção
const contato = collection(database, 'contato');

export default function Read(){

    //read
    const [lista, setLista] = useState([]);
    const read = ()=>{
        getDocs(query(contato, orderBy("nome")))
        .then((data)=>{
            setLista(data.docs.map((item)=>{
            return{...item.data(), id:item.id};
            }));
            
        });
    }

    //mostrar os documentos 
    useEffect(()=>{
        read();
    },[]);

    //excluir
    const deleteBtn = (id) =>{
      const documento = doc(database, "contato", id);
      deleteDoc(documento)
      .then(() =>{
        read();
      });
    }

    //update - mostrar contato selecionado
    const [ID, setID] = useState(null);
    const [contatoUnico, setContatoUnico] = useState({});
    const [mostrar, setMostrar] = useState(false);
    const [nome, SetNome] = useState("");
    const [email, SetEmail] = useState("");
    const [telefone, SetTelefone] = useState("");
    const [mensagem, SetMensagem] = useState("");

    const show = async(id) =>{
      setID(id)
      if(ID != null){
        const contatoSimples = doc(database, "contato", ID);
        const resultado = await getDoc(contatoSimples);
        setContatoUnico({...resultado.data(), id:resultado.id});
        SetNome(contatoUnico.nome);
        SetEmail(contatoUnico.email);
        SetTelefone(contatoUnico.telefone);
        SetMensagem(contatoUnico.mensagem);
      }
      if(mensagem != ""){
        setMostrar(true);
      }
    }

    useEffect(() =>{
      show();
    }, [ID]);

    return(
        <>
          {mostrar ?(
            <div>
              <h3 className="text-center">ALTERAR</h3>

              {/* Nome */}
              <input type="text" placeholder="Nome" className="form-control" required onChange={event=>SetNome(event.target.value)} value={nome} /> <br/>
              
              {/* EMail */}
              <input type="email" placeholder="Email" className="form-control" required onChange={event=>SetEmail(event.target.value)} value={email} /> <br/>
              
              {/* Telefone */}
              <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>SetTelefone(event.target.value)} value={telefone} /> <br/>
              
              {/* Mensagem */}
              <textarea placeholder="Mensagem" className="form-control" required onChange={event=>SetMensagem(event.target.value)} value={mensagem} ></textarea> <br/>
              
              {/* Botão */}
              <input type="submit" value="Salvar" className="btn btn-outline-dark form-control" />
              </div>
          ):(
            <></>
          )}

            <h3 className="text-center">Exibir</h3>
            {lista.map((lista)=>{
              return(

                <>
                <div className="card">

                  <div className="card-header bg-dark text-light">
                    Id: {lista.id}
                  </div>

                  {/* info */}
                  <div className="card-body">
                    <p className="card-title text-info">Nome: {lista.nome}</p>
                    <p className="card-subtitle">Email: {lista.email}</p>
                    <p className="card-subtitle">Telefone: {lista.telefone}</p>
                    <p className="card-subtitle">Mensagem: {lista.mensagem}</p>
                  </div>

                  {/* botoes */}
                  <div className="card-footer">
                    <div className="input-group">
                      <input type="button" value="Alterar" onClick={()=>show(lista.id)} className="btn btn-outline-warning form-control" />
                      <input type="button" value="Excluir" onClick={()=>deleteBtn(lista.id)} className="btn btn-outline-danger form-control" />
                    </div>
                  </div>
                </div>
                  
                </>
              )
            })}
        </>
    );
}