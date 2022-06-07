/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";

class App extends React.Component {

  state = {
    // esta lista de animais há-de receber dados da API
    animais: []
  }

/**
 * Tarefas
 *   1. ler dados da API
 *   2. atribuir esses dados à variável state 'animais'
 */


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
