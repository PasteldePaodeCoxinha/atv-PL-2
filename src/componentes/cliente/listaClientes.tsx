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
    cliente: Cliente
    nome: string
    nomeSocial: string
    email: string
    telefone: string
}

export default class ListaCliente extends Component<{}, state> {
    constructor(props: {}, readonly<{}>) {
        super(props)
        this.state = {
            clientes: [],
            cliente: {},
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
        const clientes = [new Cliente("a","a","a@email.com",new CPF("123", new Date()), [new RG("147", new Date())], [new Telefone("12", "159")]),
        new Cliente("b","b","b@email.com",new CPF("456", new Date()), [new RG("258", new Date())], [new Telefone("12", "348")]),
        new Cliente("c","c","c@email.com",new CPF("789", new Date()), [new RG("369", new Date())], [new Telefone("12", "267")])]
        this.setState({
            cliente: clientes,
        })
    }

    excluirCliente(nome: string) {
        this.props.clientes.splice((this.props.clientes.findIndex(c => c.nome === nome)), 1)
        this.setState({
            clientes: this.props.clientes
        })
    }

    
    gerarListaCliente() {
        if (this.state.clientes.length <= 0) {
            return <></>
        } else {
            let listaCliente = this.state.clientes.map(c =>
                <li className="informacoesDosClientes">
                    <button
                        onClick={() => {
                            this.pegarUmCliente(c.nome)
                        }}
                        className="botaoSelecionarClienteNaListaCliente">
                        Nome: {c.nome}
                    </button>
                    <span>Nome Social: {c.nomeSocial} </span>
                    <span>CPF: {c.getCpf.getValor}</span>
                    <button onClick={() => this.excluirCliente(c.nome)}>Excluir</button>
                </li>
            )
            return listaCliente
        }
    }

    render() {
        if (this.state.cliente === undefined) {
            return (
                <div className="clientesCadastrados">
                    <ul className="listaDeClientes">
                        {this.gerarListaCliente()}
                    </ul>
                </div>
            )
        } else {
            return (
                <>
                    <AlterarCliente cliente={this.state.cliente}/>
                </>
            )
        }
    }
}