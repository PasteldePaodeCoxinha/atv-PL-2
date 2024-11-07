/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaClientes.css"
import Cliente from "../../../modelo/cliente";
import AlterarCliente from "../alterar/alterarCliente";

type props = {
    clientes: Array<Cliente>
}

type state = {
    clientes: Array<Cliente>
    cliente: Cliente | undefined
    nome: string
    nomeSocial: string
    email: string
    telefone: string
    ordemLista: number
}

export default class ListaCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            clientes: props.clientes,
            cliente: undefined,
            nome: "",
            nomeSocial: "",
            email: "",
            telefone: "",
            ordemLista: 0
        }
        this.gerarListaCliente = this.gerarListaCliente.bind(this)
        this.excluirCliente = this.excluirCliente.bind(this)
        this.pegarUmCliente = this.pegarUmCliente.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaCliente()
    }

    componentDidUpdate(): void {
        this.gerarListaCliente()
    }

    pegarUmCliente(nome: string) {
        const cliente = this.state.clientes.find(c => c.nome === nome)
        this.setState({
            cliente: cliente,
        })
    }

    excluirCliente(nome: string) {
        this.state.clientes.splice((this.state.clientes.findIndex(c => c.nome === nome)), 1)
    }

    gerarListaCliente() {
        if (this.state.clientes.length <= 0) {
            return <></>
        } else {
            let cliente = this.state.clientes

            if (this.state.ordemLista === 1) {
                cliente = cliente.sort((a, b) => b.getProdutosConsumidos.length - a.getProdutosConsumidos.length)
            }

            let listaCliente = cliente.map((c, i) =>
                <tr className="linhaTabelaClientes" key={i} onClick={() => this.pegarUmCliente(c.nome)
                }>
                    <td>{c.nome}</td>
                    <td>{c.nomeSocial}</td>
                    <td>{c.getCpf.getDataEmissao.toISOString().split("T")[0]} {c.getCpf.getValor}</td>
                    <td><button className="botaExcluirCliente" onClick={() => this.excluirCliente(c.nome)}>Excluir</button></td>
                </tr>
            )
            return listaCliente
        }
    }

    render() {
        return (
            <div className="containerListaCliente">
                <select className="seletorOrdemListaCliente">
                    <option value={0}>Ordenar por ordem cadastrado</option>
                    <option value={1}>Ordenar por qtd produtos consumidos</option>
                </select>

                {this.state.cliente === undefined ? (
                    <div className="clientesCadastrados">
                        <table className="tabelaClientes">
                            <thead>
                                <tr className="headerTabelaClientes">
                                    <th>Nome</th>
                                    <th>Nome Social</th>
                                    <th>CPF</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaCliente()}
                            </tbody>
                        </table>
                    </div>

                ) : (

                    <>
                        <button className="botaVoltarListagemCliente" onClick={() => { this.setState({ cliente: undefined }) }}>
                            Voltar
                        </button>
                        <AlterarCliente cliente={this.state.cliente} />
                    </>

                )}
            </div>
        )
    }
}