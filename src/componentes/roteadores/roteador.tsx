import { Component } from "react";
import BarraNavegacao from "../barraNavegacao";
import RoteadorCliente from "./roteadorCliente";
import Empresa from "../../modelo/empresa";

type state = {
    tela: string
    empresa: Empresa
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            empresa: new Empresa()
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
            botoes={['Clientes', 'Pets', 'Produtos', 'Serviços']}
            mensagem="PetLovers" />

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorCliente />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <h1>PEIXE</h1>
                </>
            )
        }
    }
}