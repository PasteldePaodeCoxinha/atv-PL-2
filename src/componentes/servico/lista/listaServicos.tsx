/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaServicos.css"
import Servico from "../../../modelo/servico";
import AlterarServico from "../alterar/alterarServico";

type props = {
    servicos: Array<Servico>
}

type state = {
    servicos: Array<Servico>
    servico: Servico | undefined
}

export default class ListaServicos extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            servicos: props.servicos,
            servico: undefined
        }
        this.gerarListaServico = this.gerarListaServico.bind(this)
        this.excluirServico = this.excluirServico.bind(this)
        this.pegarUmServico = this.pegarUmServico.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaServico()
    }

    componentDidUpdate(): void {
        this.gerarListaServico()
    }

    pegarUmServico(nome: string) {
        const servico = this.state.servicos.find(c => c.nome === nome)
        this.setState({
            servico: servico,
        })
    }

    excluirServico(nome: string) {
        this.state.servicos.splice((this.state.servicos.findIndex(c => c.nome === nome)), 1)
        this.setState({
            servicos: this.state.servicos
        })
    }

    gerarListaServico() {
        if (this.state.servicos.length <= 0) {
            return <></>
        } else {
            let listaServico = this.state.servicos.map((p, i) =>
                <tr className="linhaTabelaServicos" key={i} onClick={() => this.pegarUmServico(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirServico" onClick={() => this.excluirServico(p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaServico
        }
    }

    render() {
        return (
            <div className="containerListaServico">
                {this.state.servico === undefined ? (
                    <div className="servicosCadastrados">
                        <table className="tabelaServicos">
                            <thead>
                                <tr className="headerTabelaServicos">
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaServico()}
                            </tbody>
                        </table>
                    </div>

                ) : (

                    <>
                        <button className="botaVoltarListagemServico" onClick={() => { this.setState({ servico: undefined }) }}>
                            Voltar
                        </button>
                        <AlterarServico servico={this.state.servico} />
                    </>

                )}
            </div>
        )
    }
}