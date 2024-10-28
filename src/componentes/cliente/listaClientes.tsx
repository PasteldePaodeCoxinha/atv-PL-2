/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaClientes.css"
import Cliente from "../../modelo/cliente";
import AlterarCliente from "./alterarCliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";

type state = {
    clientes: Array<Cliente>
    cliente: Cliente | undefined
    nome: string
    nomeSocial: string
    email: string
    telefone: string
}

export default class ListaCliente extends Component<{}, state> {
    constructor(props: {}) {
        super(props)
        this.state = {
            clientes: [new Cliente("a", "a", "a@email.com", new CPF("123", new Date()), [new RG("147", new Date())], [new Telefone("12", "159")]),
            new Cliente("b", "b", "b@email.com", new CPF("456", new Date()), [new RG("258", new Date())], [new Telefone("12", "348")]),
            new Cliente("c", "c", "c@email.com", new CPF("789", new Date()), [new RG("369", new Date())], [new Telefone("12", "267")])],
            cliente: undefined,
            nome: "",
            nomeSocial: "",
            email: "",
            telefone: ""
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
        this.setState({
            clientes: this.state.clientes
        })
    }

    gerarListaCliente() {
        if (this.state.clientes.length <= 0) {
            return <></>
        } else {
            let listaCliente = this.state.clientes.map((c, i) =>
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