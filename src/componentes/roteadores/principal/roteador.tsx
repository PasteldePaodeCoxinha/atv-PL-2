import { Component } from "react";
import Empresa from "../../../modelo/empresa";
import Cliente from "../../../modelo/cliente";
import CPF from "../../../modelo/cpf";
import RG from "../../../modelo/rg";
import Telefone from "../../../modelo/telefone";
import BarraNavegacao from "../../barraNavegacao";
import RoteadorCliente from "../cliente/roteadorCliente";
import RoteadorPet from "../pet/roteadorPet";

type state = {
    tela: string
    empresa: Empresa
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Pets',
            empresa: new Empresa()
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    componentDidMount(): void {
        document.body.style.backgroundColor = "#2513EB"
        const empresaAtual = new Empresa()

        const clientes = (
        [new Cliente("a", "a", "a@email.com", new CPF("123", new Date()), [new RG("147", new Date())], [new Telefone("12", "159")]),
        new Cliente("b", "b", "b@email.com", new CPF("456", new Date()), [new RG("258", new Date())], [new Telefone("12", "348")]),
        new Cliente("c", "c", "c@email.com", new CPF("789", new Date()), [new RG("369", new Date())], [new Telefone("12", "267")])])

        empresaAtual.setClientes = clientes

        this.setState({
            empresa: empresaAtual
        })
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
            botoes={['Clientes', 'Pets', 'Produtos', 'Serviços']} />

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorCliente clientes={this.state.empresa.getClientes} />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorPet clientes={this.state.empresa.getClientes} />
                </>
            )
        }
    }
}