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
    }

    adicionarTelefone() {
        this.state.cliente.getTelefones.push(new Telefone(this.state.novoDdd, this.state.novoTel))
        this.setState({
            menuTel: !this.state.menuTel
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
        return (<div className="informarcoesDeUmClienteNaLista">
            <ul>
                <li> <label htmlFor="">Nome:</label> <input type="text" value={this.state.cliente.nome} /></li>
                <li><label htmlFor="">Nome Social:</label> <input type="text" value={this.state.cliente.nomeSocial} /> </li>

                <li><label htmlFor="">Email:</label> <input type="text" value={this.state.cliente.getEmail} /> </li>

                <li><label htmlFor="">Valor do CPF:</label> <input type="text" value={this.state.cliente.getCpf.getValor} /></li>
                <li><label htmlFor="">Data de emissão do CPF:</label> <input type="text" value={this.state.cliente.getCpf.getDataEmissao.toISOString().substring(0, 10)} /></li>

                <li> <label htmlFor="">Valor do RG:</label> <input type="text" value={this.state.cliente.getRgs[0].getValor} /></li>
                <li> <label htmlFor="">Data de emissão do RG:</label> <input type="text" value={this.state.cliente.getRgs[0].getDataEmissao.toISOString().substring(0, 10)} /></li>

                <li>
                    <div>
                        <span>1º Telefone: +{this.state.cliente.getTelefones[0].getDdd} {this.state.cliente.getTelefones[0].getNumero}</span>
                        {this.state.cliente.getTelefones.length > 1 ? <button>Deletar telefone</button> : <></>}
                    </div>
                </li>

                {this.state.cliente.getTelefones[1] ?
                    <li>
                        <div>
                            <span>2º Telefone: +{this.state.cliente.getTelefones[1].getDdd} {this.state.cliente.getTelefones[1].getNumero}</span>
                            <button>Deletar telefone</button>
                        </div>
                    </li>
                    :
                    this.state.menuTel ?
                        this.menuAdicionarTelefone()
                        :
                        <button className="botaoAddTel" onClick={() => this.setState({ menuTel: !this.state.menuTel })}>Adicionar telefone</button>
                }
            </ul>
        </div>)
    }
}