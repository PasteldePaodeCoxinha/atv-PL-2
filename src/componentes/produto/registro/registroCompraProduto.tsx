import { Component, ReactNode } from "react";
import Cliente from "../../../modelo/cliente";
import Produto from "../../../modelo/produto";
import "./registroCompraProduto.css"

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

type state = {
    cliente: Cliente | undefined,
    produto: Produto | undefined,
    textoAviso: string,
    qtdProdutos: number
}

export default class RegistroCompraProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            produto: undefined,
            textoAviso: "Selecione um cliente!",
            qtdProdutos: 0
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.registrarCompra = this.registrarCompra.bind(this)
    }

    selecionarCliente(n: string) {
        const cliente = this.props.clientes.find(c => c.nome === n)
        if (cliente) {
            this.setState({
                cliente: cliente,
                textoAviso: "Selecione um produto!"
            })
        }
    }

    registrarCompra() {
        if (this.state.cliente && this.state.produto) {
            for (let i = 0; i < this.state.qtdProdutos; i++) {
                this.state.cliente.getProdutosConsumidos.push(this.state.produto)
            }
        }
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroProduto">

                <div className="containerAvisoRegistroProduto">
                    <p className="textoAvisoRegistroProduto">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroProduto">
                    {!this.state.cliente ? (
                        <table className="tabelaRegistroProdutoClientes">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clientes.map((c, i) => {
                                    return (
                                        <tr className={c.nome === this.state.cliente?.nome ? "linhaSelecionadaRegistroProduto" : ""}
                                            key={i}
                                            onClick={() => this.selecionarCliente(c.nome)}>
                                            <td>{c.nome}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="menuRegistroCompraProduto">
                            <div className="containerSeletorProduto">
                                <select className="seletorProduto"
                                    onChange={e => this.setState({ produto: this.props.produtos.find(p => p.nome === e.target.value) })}
                                    value={this.state.produto?.nome}>
                                    <option value="" disabled>Selecione o produto</option>
                                    {this.props.produtos.map((p, i) => {
                                        return (
                                            <option
                                                value={p.nome}
                                                key={i}>
                                                {p.nome}
                                            </option>
                                        )
                                    })}
                                </select>

                                <input type="number"
                                    className="qtdProdutosEscolher"
                                    value={this.state.qtdProdutos}
                                    onChange={e => {
                                        this.setState({
                                            qtdProdutos: Number(e.target.value).valueOf()
                                        })
                                    }}
                                />
                            </div>

                            <button className="botaResgitrarCompraProduto"
                                onClick={() => this.registrarCompra()}
                            >
                                <p>
                                    Registrar
                                </p>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}