import { Component } from "react";
import "./alterarServico.css"
import Servico from "../../../modelo/servico";

type props = {
    servico: Servico
}

type state = {
    servico: Servico
}

export default class AlterarServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            servico: props.servico
        }
    }

    render() {
        return (<div className="informarcoesDeUmServicoNaLista">
            <ul className="listaDeInformacoesServico">
                <li> <label htmlFor="">Nome:</label> <input type="text" value={this.state.servico.nome} /></li>
                <li><label htmlFor="">Preço:</label> <input type="number" value={this.state.servico.preco} /> </li>

                <li><label htmlFor="">Qtd vendidos:</label> <input type="text" value={this.state.servico.getCompraram} /> </li>
            </ul>
        </div>)
    }
}