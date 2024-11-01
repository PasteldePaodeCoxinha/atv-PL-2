import { Component } from "react";
import "./alterarProduto.css"
import Produto from "../../../modelo/produto";

type props = {
    produto: Produto
}

type state = {
    produto: Produto
}

export default class AlterarProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            produto: props.produto
        }
    }

    render() {
        return (<div className="informarcoesDeUmProdutoNaLista">
            <ul>
                <li> <label htmlFor="">Nome:</label> <input type="text" value={this.state.produto.nome} /></li>
                <li><label htmlFor="">Preço:</label> <input type="number" value={this.state.produto.preco} /> </li>

                <li><label htmlFor="">Qtd vendidos:</label> <input type="text" value={this.state.produto.getCompraram} /> </li>
            </ul>
        </div>)
    }
}