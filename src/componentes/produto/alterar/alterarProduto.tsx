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

        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorPreco = this.mudarValorPreco.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        const produto = this.state.produto
        produto.nome = e.target.value
        this.setState({
            produto: produto
        })
    }

    mudarValorPreco(e: React.ChangeEvent<HTMLInputElement>) {
        const produto = this.state.produto
        produto.preco = Number(e.target.value).valueOf()
        this.setState({
            produto: produto
        })
    }

    render() {
        return (
            <div className="containerInformacoesProduto">
                <div className="campoProdutoEditavel">
                    <label>Nome:</label>
                    <input type="text" value={this.state.produto.nome} onChange={this.mudarValorNome} />
                </div>

                <div className="campoProdutoEditavel">
                    <label>Tamanho:</label>
                    <input type="number" value={this.state.produto.preco} onChange={this.mudarValorPreco} />
                </div>

                <div className="campoProdutoFixo">
                    <label>Quantidade vendido:</label>
                    <p>{this.state.produto.getCompraram}</p>
                </div>

            </div>
        )
    }
}