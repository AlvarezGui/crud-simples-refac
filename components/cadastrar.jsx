
import { useState } from "react";
import {app, database} from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

//definir a coleção
const contato = collection(database, 'contato');


export default function Cadastrar(){

    //hooks
    const [nome, SetNome] = useState('');
    const [email, SetEmail] = useState('');
    const [tel, SetTel] = useState('');
    const [mensagem, SetMensagem] = useState('');

    //create
    const create = () => {
        addDoc(contato, {
            nome:nome,
            email:email,
            telefone:tel,
            mensagem:mensagem
            }).then(()=>{
                SetNome('');
                SetEmail('');
                SetTel('');
                SetMensagem('');
                read();
             });
    }
    

    return(
        <>
            <h3 className="text-center"> Cadastrar </h3> 
            <input type="text" placeholder="Nome" className="form-control" required onChange={event=>SetNome(event.target.value)} value={nome} /> <br/>
            <input type="email" placeholder="Email" className="form-control" required onChange={event=>SetEmail(event.target.value)} value={email} /> <br/>
            <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>SetTel(event.target.value)} value={tel} /> <br/>
            <textarea placeholder="Mensagem" className="form-control" required onChange={event=>SetMensagem(event.target.value)} value={mensagem} ></textarea> <br/>
            <input type="submit" value="Salvar" className="btn btn-outline-dark" onClick={create} />
        </>
    );
}