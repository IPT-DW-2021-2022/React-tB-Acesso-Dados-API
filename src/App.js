/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";
import Formulario from './Formulario';

/**
 * função que efetivamente pergunta à API pelos dados dos animais
 * CORS: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
 * Corrigir o problema:
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 * não esquecer: depois da criação do Proxy é necessário REINICIAR o React 
 */
async function getAnimais() {

  let dados = await fetch("api/animaisAPI/");
  if (!dados.ok) {
    console.error(dados)
    throw new Error("Não foi possível aceder à API e ler os dados dos Animais. Código: ",
      dados.status)
  }
  // exportar os dados recebido
  return await dados.json();
}

/**
 * Devolve uma lista com os donos inscritos na BD da app
 * @returns 
 */
async function getDonos() {

  let dados = await fetch("api/donosAPI/");
  if (!dados.ok) {
    console.error(dados)
    throw new Error("Não foi possível aceder à API e ler os dados dos Donos. Código: ",
      dados.status)
  }
  // exportar os dados recebido
  return await dados.json();
}

/**
 * Insere os dados do novo animal, através da API
 * @param {*} animal 
 */
async function InsereAnimal(animal) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("Nome", animal.Nome);
  formData.append("Especie", animal.Especie);
  formData.append("Raca", animal.Raca);
  formData.append("Peso", animal.Peso);
  formData.append("uploadFotoAnimal", animal.Foto);
  formData.append("DonoFK", animal.DonoFK);
  // entregar os dados à API
  let resposta = await fetch("api/animaisAPI",
    {
      method: "POST",
      body: formData
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro na adição dos dados do Animal",
      resposta.status)
  }
}


class App extends React.Component {

  state = {
    // esta lista de animais há-de receber dados da API
    animais: [],
    donos: [],
  }

  /**
   * Esta função funciona como um 'startup'
   * Qd o componente é montado, o seu código é executado
   */
  componentDidMount() {
    this.LoadAnimais();
    this.LoadDonos();
  }

  async LoadAnimais() {
    /**
     * Tarefas:
     * 1. ler os dados dos Animais, da API
     * 2. transferir esses dados para o State
     */
    try {
      // 1.
      let dadosDosAnimais = await getAnimais();
      // 2.
      this.setState({ animais: dadosDosAnimais })
    } catch (erro) {
      console.error("Aconteceu um erro no acesso aos dados dos animais. ", erro)
    }
  }


  /**
   * Ler os dados dos donos
   */
  async LoadDonos() {
    /**
     * Tarefas:
     * 1. ler os dados dos Donos, da API
     * 2. transferir esses dados para o State
     */
    try {
      // 1.
      let dadosDosDonos = await getDonos();
      // 2.
      this.setState({ donos: dadosDosDonos })
    } catch (erro) {
      console.error("Aconteceu um erro no acesso aos dados dos donos. ", erro)
    }
  }


  /**
   * enviar os dados para a API
   * @param {*} animal 
   */
  handleNovoAnimal = async (animal) => {
    try {
      // exporta os dados para a API
      await InsereAnimal(animal);
      // recarregar a Tabela com os dados dos animais
      this.LoadAnimais();
    } catch (error) {
      console.error("ocorreu um erro com a adição do animal (" + animal.Nome + ")")
    }
  }


  render() {
    // ler os dados do STATE
    const { animais, donos } = this.state;

    return (
      <div className="container">
        <h1>Animais</h1>
        <h4>Novo animal:</h4>
        <Formulario donosIN={donos} animalOUT={this.handleNovoAnimal} />
        {/*            <-------          -------------->             */}

        <br />
        <h4>Lista de animais</h4>
        <Tabela dadosAnimaisIN={animais} />

        <br /><br />
      </div>
    )
  }
}

export default App;
