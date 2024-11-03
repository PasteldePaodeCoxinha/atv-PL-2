import { Component } from "react";
import "./alterarServico.css"
import Servico from "../../../modelo/servico";

type props = {
    servico: Servico
}

type state = {
    servico: Servico
}

export default class AlterarServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            servico: props.servico
        }
        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorPreco = this.mudarValorPreco.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        const servico = this.state.servico
        servico.nome = e.target.value
        this.setState({
            servico: servico
        })
    }

    mudarValorPreco(e: React.ChangeEvent<HTMLInputElement>) {
        const servico = this.state.servico
        servico.preco = Number(e.target.value).valueOf()
        this.setState({
            servico: servico
        })
    }

    render() {
        return (
            <div className="containerInformacoesServico">
                <div className="campoServicoEditavel">
                    <label>Nome:</label>
                    <input type="text" value={this.state.servico.nome} onChange={this.mudarValorNome} />
                </div>

                <div className="campoServicoEditavel">
                    <label>Tamanho:</label>
                    <input type="number" value={this.state.servico.preco} onChange={this.mudarValorPreco} />
                </div>

                <div className="campoServicoFixo">
                    <label>Quantidade vendido:</label>
                    <p>{this.state.servico.getCompraram}</p>
                </div>

            </div>
        )
    }
}