/**
 * Formulario.js
 */

import React from "react";

const EscolheDono = (props) => {
    const opcoes = props.dadosDonosIN.map((item) => {
        return (<option value={item.id}>{item.nome}</option>)
    })
    return (
        <select required
            className="form-select"
            onChange={props.donoEscolhidoOUT}>
            <option value="">Selecione, por favor, um dono</option>
            {opcoes}
        </select>
    )
}



class Formulario extends React.Component {

    // criar o objeto State para recolher os dados obtidos através do Formulário
    novoAnimal = {
        nomeAnimal: "",
        especieAnimal: "",
        racaAnimal: "",
        pesoAnimal: "",
        imagemAnimal: null,
        donoAnimalFK: ""
    }

    state = this.novoAnimal;

    /**
   * função para processar os dados recolhidos pelas textboxs
   * @param {*} evento : os dados recolhidos 
   */
    handleAdicao = (evento) => {
        // extrair os dados do 'evento'
        // name  -> nome da textbox
        // value -> o que o utilizador escreveu na textbox
        const { name, value } = evento.target;

        // adicionar os dados extraídos, ao state
        this.setState({
            [name]: value,
        })
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFotoAnimal = (evento) => {
        this.setState({ imagemAnimal: evento.target.files[0] });
    }

    /**
     * recolhe o ID do Dono e adiciona-o ao State
     * @param {*} evento 
     */
    handleDonoChange = (evento) => {
        this.setState({ donoAnimalFK: evento.target.value });
    }

    /**
     * ação a executar pelo React qd os dados do formulário forem submetidos
     * @param {*} evento 
     */
    handleFormSubmit = (evento) => {
        // vamos impedir o Formulário de fazer o que ele naturalmente
        // costuma fazer, para que ele depois faça o que nós queremos...
        evento.preventDefault();
        // preparar os dados para o envio
        let dadosForm={
            Nome:this.state.nomeAnimal,
            Especie:this.state.especieAnimal,
            Raca: this.state.racaAnimal,
            Peso: this.state.pesoAnimal,
            Foto: this.state.imagemAnimal,
            DonoFK:this.state.donoAnimalFK,
        }
        // preparar os dados para exportação
        this.props.animalOUT(dadosForm);
    }



    render() {
        // ler o conteúdo das variáveis State, ou Props, dentro do Render
        const { nomeAnimal, pesoAnimal, especieAnimal, racaAnimal } = this.state;
        const { donosIN } = this.props;

        return (
            <form encType="multipart/form-data"
                method="Post"
                onSubmit={this.handleFormSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        Nome: <input type="text"
                            required
                            className="form-control"
                            name="nomeAnimal"
                            value={nomeAnimal}
                            onChange={this.handleAdicao} /><br />
                        Peso: <input type="text"
                            required
                            className="form-control"
                            name="pesoAnimal"
                            value={pesoAnimal}
                            onChange={this.handleAdicao} />
                    </div>
                    <div className="col-md-4">
                        Espécie: <input type="text"
                            required
                            className="form-control"
                            name="especieAnimal"
                            value={especieAnimal}
                            onChange={this.handleAdicao} /><br />
                        Raça: <input type="text"
                            required
                            className="form-control"
                            name="racaAnimal"
                            value={racaAnimal}
                            onChange={this.handleAdicao} />
                    </div>
                    <div className="col-md-4">
                        Fotografia: <input type="file"
                            required
                            name="fotoAnimal"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handleFotoAnimal} /><br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
                            - dadosDonosIN: serve para introduzir no componente a lista dos donos a representar na dropdown
                            - donoEscolhidoOUT: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                            que será entregue ao 'handlerDonoChange' */}
                        Dono: <EscolheDono dadosDonosIN={donosIN}
                            donoEscolhidoOUT={this.handleDonoChange} />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar animal" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario;