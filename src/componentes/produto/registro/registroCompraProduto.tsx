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
    textoAviso: string
}

export default class RegistroCompraProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            produto: undefined,
            textoAviso: "Selecione um cliente!"
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.selecionarProduto = this.selecionarProduto.bind(this)
        this.registrarCompraProduto = this.registrarCompraProduto.bind(this)
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

    selecionarProduto(n: string) {
        const produto = this.props.produtos.find(p => p.nome === n)
        if (produto) {
            this.setState({
                produto: produto,
                textoAviso: "Compra registrada!"
            })

            this.registrarCompraProduto(produto)

            setTimeout(() => {
                this.setState({
                    textoAviso: "Selecione um produto!"
                })
            }, 2551)
        }
    }

    registrarCompraProduto(produto: Produto) {
        produto.compraramMaisUm()
        if (this.state.cliente) {
            const cliente = this.state.cliente
            cliente.getProdutosConsumidos.push(produto)
            cliente.setValorGasto = this.state.cliente.getValorGasto + produto.preco
            this.setState({
                cliente: cliente
            })
        }
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroProduto">

                <div className="containerAvisoRegistroProduto">
                    <p className="textoAvisoRegistroProduto">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroProduto">
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

                    {this.state.cliente ? (
                        <table className="tabelaRegistroProdutoProdutos">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.produtos.map((p, i) => {
                                    return (
                                        <tr className={p.nome === this.state.produto?.nome ? "linhaSelecionadaRegistroProduto" : ""}
                                            key={i}
                                            onClick={() => { this.selecionarProduto(p.nome) }}>
                                            <td>{p.nome}</td>
                                            <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
        )
    }
}