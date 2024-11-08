/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaProdutos.css"
import Produto from "../../../modelo/produto";
import AlterarProduto from "../alterar/alterarProduto";

type props = {
    produtos: Produto[]
}

type state = {
    produtos: Produto[],
    produto: Produto | undefined,
    ordemLista: number
}

export default class ListaProdutos extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            produtos: props.produtos,
            produto: undefined,
            ordemLista: 0
        }
        this.gerarListaProduto = this.gerarListaProduto.bind(this)
        this.excluirProduto = this.excluirProduto.bind(this)
        this.pegarUmProduto = this.pegarUmProduto.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaProduto()
    }

    componentDidUpdate(): void {
        this.gerarListaProduto()
    }

    pegarUmProduto(nome: string) {
        const produto = this.state.produtos.find(c => c.nome === nome)
        this.setState({
            produto: produto,
        })
    }

    excluirProduto(nome: string) {
        this.state.produtos.splice((this.state.produtos.findIndex(c => c.nome === nome)), 1)
        this.setState({
            produtos: this.state.produtos
        })
    }

    gerarListaProduto() {
        if (this.state.produtos.length <= 0) {
            return <></>
        } else {
            let produtos = this.state.produtos

            if (this.state.ordemLista === 0) {
                produtos = this.props.produtos
            } else if(this.state.ordemLista === 1) {
                produtos = this.state.produtos.toSorted((a, b) => b.getCompraram - a.getCompraram)
            } else if(this.state.ordemLista === 2){

            }

            let listaProduto = produtos.map((p, i) =>
                <tr className="linhaTabelaProdutos" key={i} onClick={() => this.pegarUmProduto(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirProduto" onClick={() => this.excluirProduto(p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaProduto
        }
    }

    render() {
        return (
            <div className="containerListaProduto">
                {this.state.produto === undefined ? (
                    <div className="produtosCadastrados">

                        <select className="seletorOrdemListaProduto"
                            onChange={e => this.setState({ ordemLista: Number(e.target.value).valueOf() })}
                        >
                            <option value={0}>Ordenar por ordem cadastrado</option>
                            <option value={1}>Ordenar mais vendidos</option>
                            <option value={2}>Ordenar por mais consumidos por tipo e raça+</option>
                        </select>

                        <table className="tabelaProdutos">
                            <thead>
                                <tr className="headerTabelaProdutos">
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaProduto()}
                            </tbody>
                        </table>
                    </div>

                ) : (

                    <>
                        <button className="botaVoltarListagemProduto" onClick={() => { this.setState({ produto: undefined }) }}>
                            Voltar
                        </button>
                        <AlterarProduto produto={this.state.produto} />
                    </>

                )}
            </div>
        )
    }
}