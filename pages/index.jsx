import Head from 'next/head';

//importar components
import Cadastrar from "../components/cadastrar";
import Read from "../components/read";

export default function Home() {

  return (
    <>
      <Head>
        <title> Crud Simples com Firestore </title>
      </Head>

      <main className="container">

        <div className="row">

          <div className="col-md"> 
            <Cadastrar></Cadastrar>
          </div>

          <div className="col-md">
            <Read></Read>
          </div>

        </div>

      </main>
    </>
  );
}
