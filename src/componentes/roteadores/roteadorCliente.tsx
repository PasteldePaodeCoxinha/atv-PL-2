import { Component } from "react";
import BarraNavegacao from "../barraNavegacao";
import ListaCliente from "../cliente/listaClientes";
import FormularioCadastroCliente from "../cliente/formularioCadastroCliente";
import Empresa from "../../modelo/empresa";

type state = {
    tela: string
    empresa: Empresa
}

export default class RoteadorCliente extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Lista',
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
            botoes={['Lista', 'Cadastro', 'Atualizar']}
            mensagem="Cliente" />
        if (this.state.tela === 'Lista') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente />
                </>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente clientes={this.state.empresa.getClientes} />
                </>
            )
        }
    }
}