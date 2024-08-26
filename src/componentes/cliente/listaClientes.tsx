/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaClientes.css"
import Cliente from "../../modelo/cliente";
import AlterarCliente from "./alterarCliente";

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
            telefone: ""
        }
        this.gerarListaCliente = this.gerarListaCliente.bind(this)
        this.excluirCliente = this.excluirCliente.bind(this)
        this.pegarUmCliente = this.pegarUmCliente.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaCliente()
    }

    componentDidUpdate(prevProps: props): void {
        this.gerarListaCliente()
    }

    pegarUmCliente(nome: string) {
        this.setState({
            cliente: this.state.clientes.filter(c => c.nome === nome)[0],
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