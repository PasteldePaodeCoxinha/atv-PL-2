import { Component } from "react";
import BarraNavegacao from "../barraNavegacao";
import ListaCliente from "../cliente/listaClientes";
import FormularioCadastroCliente from "../cliente/formularioCadastroCliente";
import Cliente from "../../modelo/cliente";

type props = {
    clientes: Array<Cliente>
}

type state = {
    tela: string

}

export default class RoteadorCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            tela: 'Cadastro'
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
            botoes={['Lista', 'Cadastro', 'Atualizar']}
            mensagem="Cliente" />
        if (this.state.tela === 'Lista') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente/>
                </>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente clientes={this.props.clientes} />
                </>
            )
        }
    }
}