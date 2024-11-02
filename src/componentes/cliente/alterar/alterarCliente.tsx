import { Component } from "react";
import Cliente from "../../../modelo/cliente";
import "./alterarCliente.css"
import Telefone from "../../../modelo/telefone";

type props = {
    cliente: Cliente
}

type state = {
    cliente: Cliente
    menuTel: Boolean
    novoDdd: string
    novoTel: string
}

export default class AlterarCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: props.cliente,
            menuTel: false,
            novoDdd: "",
            novoTel: ""
        }
        this.menuAdicionarTelefone = this.menuAdicionarTelefone.bind(this)
        this.adicionarTelefone = this.adicionarTelefone.bind(this)
        this.deletarTelefone = this.deletarTelefone.bind(this)

        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorNomeSocial = this.mudarValorNomeSocial.bind(this)

        this.mudarValorEmail = this.mudarValorEmail.bind(this)
    }

    adicionarTelefone() {
        this.state.cliente.getTelefones.push(new Telefone(this.state.novoDdd, this.state.novoTel))
        this.setState({
            menuTel: !this.state.menuTel
        })
    }

    deletarTelefone(numero: string) {
        this.state.cliente.getTelefones.splice((this.state.cliente.getTelefones.findIndex(t => t.getNumero === numero)), 1)
        this.setState({
            cliente: this.state.cliente
        })
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.nome = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    mudarValorNomeSocial(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.nomeSocial = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    mudarValorEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.setEmail = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    menuAdicionarTelefone() {
        return (
            <div className="menuAddTel">
                <input type="text" placeholder="DDD" className="inputAddNovoTelDDD" onChange={e => this.setState({ novoDdd: e.target.value })} />
                <input type="text" placeholder="Telefone" className="inputAddNovoTelNum" onChange={e => this.setState({ novoTel: e.target.value })} />
                <button className="botaoConfirmarTel" onClick={this.adicionarTelefone}>Confirmar</button>
            </div>
        )
    }

    render() {
        return (
            <div className="containerInformacoesCliente">
            </div>)
    }
}