import { Component } from "react";
import "./roteadorCliente.css"
import BarraNavegacao from "../../barraNavegacao";
import FormularioCadastroCliente from "../../cliente/forms/formularioCadastroCliente";
import Cliente from "../../../modelo/cliente";
import ListaCliente from "../../cliente/lista/listaClientes";

type props = {
    clientes: Array<Cliente>
}

type state = {
    tela: string

}

export default class RoteadorPet extends Component<props, state> {
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
            botoes={['Lista', 'Cadastro']} />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaPet">
                    {barraNavegacao}
                    <ListaCliente />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroPet">
                    {barraNavegacao}
                    <FormularioCadastroCliente clientes={this.props.clientes} />
                </div>
            )
        }
    }
}