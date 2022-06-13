/**
 * Tabela.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Peso</th>
                <th>Dono</th>
                <th>Fotografia</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
    // 'map' funciona como um 'foreach()'
    const linhas = props.dadosTabelaIN.map((animal) => {
        return (
            <tr key={animal.id}>
                <td>{animal.nome}</td>
                <td>{animal.especie}</td>
                <td>{animal.raca}</td>
                <td>{animal.peso}</td>
                <td>{animal.nomeDono}</td>
                <td>
                    <img src={'Animais/' + animal.fotografia}
                         alt={'foto do ' + animal.nome}
                         title={animal.nome}
                         height="50" />
                    </td>
            </tr>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{linhas}</tbody>)
}



class Tabela extends React.Component {

    render() {

        const { dadosAnimaisIN } = this.props;

        return (
            <table className="table table-striped">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosAnimaisIN} />
            </table>
        )
    }
}


export default Tabela
