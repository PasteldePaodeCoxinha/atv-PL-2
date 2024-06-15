/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaClientes.css"
import Cliente from "../../modelo/cliente";

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
        this.informarcoesDeUmCliente = this.informarcoesDeUmCliente.bind(this)
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

    informarcoesDeUmCliente() {
        if (this.state.cliente !== undefined) {
            return (<div className="informarcoesDeUmClienteNaLista">
                <li>Nome: {this.state.cliente.nome}
                </li>
                <li>Nome Social: {this.state.cliente.nomeSocial}</li>

                <li>Email: {this.state.cliente.getEmail}</li>

                <li>Valor do CPF: {this.state.cliente.getCpf.getValor}</li>
                <li>Data de emissão do CPF: {this.state.cliente.getCpf.getDataEmissao.toUTCString()}</li>

                <li>Valor do RG: {this.state.cliente.getRgs[0].getValor}</li>
                <li>Data de emissão do RG: {this.state.cliente.getRgs[0].getDataEmissao.toUTCString()}</li>

                <li>
                    <div>
                        <span>1º Telefone: +{this.state.cliente.getTelefones[0].getDdd} {this.state.cliente.getTelefones[0].getNumero}</span>
                        {this.state.cliente.getTelefones.length > 1 ? <button>Deletar telefone</button> : <></>}
                    </div>
                </li>

                {this.state.cliente.getTelefones[1] ?
                    <li>
                        <div>
                            <span>2º Telefone: +{this.state.cliente.getTelefones[1].getDdd} {this.state.cliente.getTelefones[1].getNumero}</span>
                            <button>Deletar telefone</button>
                        </div>
                    </li>
                    :
                    <button>Adcionar telefone</button>
                }

                <li><button onClick={() => this.pegarUmCliente("")}>Voltar a listagem</button></li>

            </div>)
        }
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
        if (!(this.state.cliente !== undefined)) {
            return (
                <div className="clientesCadastrados">
                    <ul className="listaDeClientes">
                        {this.gerarListaCliente()}
                    </ul>
                </div>
            )
        } else {
            return (
                <ul className="clientesCadastrados">{this.informarcoesDeUmCliente()}</ul>
            )
        }
    }
}