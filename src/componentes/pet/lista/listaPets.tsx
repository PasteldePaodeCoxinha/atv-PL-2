/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaPets.css"
import Cliente from "../../../modelo/cliente";
import Pet from "../../../modelo/pet";


type props = {
    clientes: Array<Cliente>
}

type state = {
    cliente: Cliente | undefined
    pet: Pet | undefined
    nomeCliente: string
}

export default class ListaPet extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            pet: undefined,
            nomeCliente: ""
        }
        this.gerarListaPet = this.gerarListaPet.bind(this)
        this.excluirPet = this.excluirPet.bind(this)
        this.procurarCliente = this.procurarCliente.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaPet()
    }

    componentDidUpdate(): void {
        this.gerarListaPet()
    }

    procurarCliente() {
        const cliente = this.props.clientes.find(c => c.nome === this.state.nomeCliente)
        this.setState({
            cliente: cliente,
        })
        console.log(cliente);
        
    }

    excluirPet(nome: string) {
        if (this.state.cliente) {
            this.state.cliente.getPets.splice((this.state.cliente.getPets.findIndex(p => p.getNome === nome)), 1)
            this.setState({
                cliente: this.state.cliente
            })
        }
    }

    gerarListaPet() {
        if (!this.state.cliente) {
            return <></>
        } else {
            let listaPet = this.state.cliente.getPets.map((p, i) =>
                <tr className="linhaTabelaPets" key={i}>
                    <td>{p.getNome}</td>
                    <td>{p.getTipo}</td>
                    <td>{p.getGenero}</td>
                    <td><button className="botaExcluirPet" onClick={() => this.excluirPet(p.getNome)}>Excluir</button></td>
                </tr>
            )
            return listaPet
        }
    }

    render() {
        return (
            <div className="containerListaPet">
                <div className="procurarCliente">
                    <input type="text" className="inputProcurarCliente" placeholder="Digite o nome do cliente" 
                    onChange={e => this.setState({nomeCliente: e.target.value})}/>
                    <button className="botaoProcurarCliente" onClick={this.procurarCliente}>
                        Procurar
                    </button>
                </div>
                {this.state.cliente !== undefined ? (
                    <div className="petsCadastrados">
                        <table className="tabelaPets">
                            <thead>
                                <tr className="headerTabelaPets">
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Genêro</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaPet()}
                            </tbody>
                        </table>
                    </div>

                ) : (
                    <></>
                )}
            </div>
        )
    }
}