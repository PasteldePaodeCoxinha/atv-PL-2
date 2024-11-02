import { Component } from "react";
import "./roteadorServico.css"
import BarraNavegacao from "../../barraNavegacao";
import Servico from "../../../modelo/servico";
import ListaServicos from "../../servico/lista/listaServicos";
import FormularioCadastroServico from "../../servico/forms/formularioCadastroServico";

type props = {
    servicos: Array<Servico>
}

type state = {
    tela: string

}

export default class RoteadorServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            tela: 'Lista'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao
            seletorView={this.selecionarView}
            botoes={['Lista', 'Cadastro']}
            titulo="Serviço"
            />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaServico">
                    {barraNavegacao}
                    <ListaServicos servicos={this.props.servicos} />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroServico">
                    {barraNavegacao}
                    <FormularioCadastroServico servicos={this.props.servicos} />
                </div>
            )
        }
    }
}