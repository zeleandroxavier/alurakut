import React from 'react';
import nookies from 'nookies';
import jwt, { decode } from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSidebar from '../src/components/ProfileSidebar';
//import Recado from '../src/components/Recado';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
      {propriedades.items.sort(() => Math.random() - 0.5).slice(0, 6).map((itemAtual) =>{
          return (
            <li key={itemAtual.login}>
            <a href={`${itemAtual.html_url}`}>
              <img src={`${itemAtual.html_url}.png`} />
              <span>{itemAtual.login}</span>
            </a>
          </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser; /*Usuário do gitHub*/

  
    // const comunidades = comunidades[0];
    // const alteradorDeComunidades/setComunidades = comunidades[1];
    // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'thiagoabreu72', 'EvandroOliveira495', 'juunegreiros',
    'omariosouto',
    'peas',
    /*'rafaballerini',
    'marcobrunodev',
    'felipefialho',*/
  ]
  const [seguidores, setSeguidores] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [recados, setRecados] = React.useState([]);

    
  React.useEffect(function() {
    //GET
    fetch('https://api.github.com/users/zeleandroxavier/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
         
    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7df1b11e1e6fffd885a7e7502b6935',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorSlug
          }
        }`
      })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato);
      setComunidades(comunidadesVindasDoDato);
    })
    // .then(function (response) {
    //   return response.json()
    // })
    
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7df1b11e1e6fffd885a7e7502b6935',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allRecados {
          id
          nome
          recado
          creatorslug
        }
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      //const recadosVindosDoDato =  respostaCompleta.data.allRecados;
      //console.log(recadosVindosDoDato);
      //setRecados(recadosVindosDoDato);
    })      

  }, [])


 
  console.log('seguidores antes do return', seguidores);
  console.log('recados antes do return', recados);

  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub

  const handleCriaComunidade = async (e) => {
    e.preventDefault();
    
    const dadosDoForm = new FormData(e.target);

    console.log('Campo: ', dadosDoForm.get('title'));
    console.log('Campo: ', dadosDoForm.get('image'));

    
    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: usuarioAleatorio,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (response) => {
      const dados = await response.json();
      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado;
      const comunidadesAtualizadas = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas)
    })
}

const handleCriaRecado = async (e) => {
    e.preventDefault();

    const dadosDoForm = new FormData(e.target);

    console.log('Campo: ', dadosDoForm.get('nome'));
    console.log('Campo: ', dadosDoForm.get('recado'));

    const recados = {
      nome : dadosDoForm.get('nome'),
      recado : dadosDoForm.get('recado'),
      creatorSlug: usuarioAleatorio,
    }

    fetch('/api/recados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recados)
    })
    .then(async (response) => {
      const dados = await response.json();
      console.log(dados.registroCriado);
      const recado = dados.registroCriado;
      const recadosAtualizadas = [...recados, recado];
      setRecados(recadosAtualizadas)
    })

}
  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a) , { props.githubUser }</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCriaComunidade}>
             <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>
              <div>
                <input placeholder="Insira uma URL de imagem para usarmos como capa" name="image" aria-label="Insira uma URL de imagem para usarmos como capa" />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
              
          <Box>
            <div>
              <h2 className="subTitle">Deixar um recado</h2>
              <form onSubmit={handleCriaRecado}>
                <input type="text" name="nome" placeholder="Seu nome" />
                <textarea rows="3" name="recado" placeholder="Deixe aqui o seu recado" aria-label="Deixe aqui o seu recado">

                </textarea>
                <button aria-label="enviar recado" disabled="">Enviar recado</button>
              </form>
              <br/>
            </div>
            <div>
              <h2 className="subTitle">Recados Recentes</h2>
              
            </div>
            
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
         
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper title="Comunidades" item={comunidades}>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunities/${itemAtual.title}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper title="Pessoas da comunidade">
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  //const { isAuthenticated } = await fetch("http://localhost:3000/api/auth", {
  const { isAuthenticated } = await fetch("https://alurakut-eight-silk.vercel.app/api/auth", {
    headers: {
      Authorization: token,
    }
  })
  .then((resposta) => resposta.json())
   


  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const followers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  //   .then((res) => res.json())
  //   .then(followers => followers.map((follower) => ({
  //     id: follower.id,
  //     name: follower.login,
  //     image: follower.avatar_url,
  //   })));

  //console.log('Token decodificado: ', jwt.decode(token))
  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    }, //will be passed to the page component as props
  }
 
}