import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet} from '../src/components/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return(
    <Box>  
    <img src={`https://github.com/${propriedades.githubUser}.png`} style = {{borderRadius: '8px'}}/>
   </Box>
   
  )
}



export default function Home() {

  const usuarioAleatorio = 'zeleandroxavier';
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>

          <div className="profileArea" style={{gridArea: 'profileArea'}}> 
          <ProfileSidebar githubUser={usuarioAleatorio}/>
          </div>

          <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}> 
            <Box> 
              <h1 className="title">
                Bem Vindo
              </h1>

              <OrkutNostalgicIconSet />
            </Box>
          </div>
          
          <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}> 
         
            <ProfileRelationsBoxWrapper>
            
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.slice(0,6).map((itemAtual) => {
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
         
            <Box> 
              Comunidades
            </Box>
          </div>          
      </MainGrid>
    </>
  )
}
