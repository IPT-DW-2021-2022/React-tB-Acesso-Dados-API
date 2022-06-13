/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";

/**
 * função que efetivamente pergunta à API pelos dados dos animais
 * CORS: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
 * Corrigir o problema:
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
async function getAnimais() {

  let dados = await fetch("https://localhost:7221/api/animaisAPI/");
  if (!dados.ok) {
    console.error(dados)
    throw new Error("Não foi possível aceder à API e ler os dados dos Animais. Código: ",
      dados.status)
  }
  // exportar os dados recebido
  return await dados.json();
}


class App extends React.Component {

  state = {
    // esta lista de animais há-de receber dados da API
    animais: []
  }

  /**
   * Esta função funciona como um 'startup'
   * Qd o componente é montado, o seu código é executado
   */
  componentDidMount() {
    this.LoadAnimais();
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

  render() {
    // ler os dados do STATE
    const { animais } = this.state;

    return (
      <div className="container">
        <h1>Animais</h1>
        {/* 
        <h4>Novo animal:</h4>
        <Formulario /> */}

        <br />
        <h4>Lista de animais</h4>
        <Tabela dadosAnimaisIN={animais} />

        <br /><br />
      </div>
    )
  }
}

export default App;
