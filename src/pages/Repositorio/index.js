import React, {useState, useEffect} from 'react';
import {Container, Loading} from './styles';
import api from '../../services/api';

export default function Repositorio({match}) {

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params:{
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);

    }

    load();

  }, [match.params.repositorio]);

  if(loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return(
    <Container>

    </Container>
  )
}