import { Component} from "react";
import Cliente from "../../modelo/cliente";

type props = {
    cliente: Cliente
}

type state = {
    cliente: Cliente
}

export default class AlterarCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: props.cliente
        }
    }

    render() {
        return (<div className="informarcoesDeUmClienteNaLista">
            <li>Nome: {this.state.cliente.nome}</li>
            <li>Nome Social: {this.state.cliente.nomeSocial}</li>

            <li>Email: {this.state.cliente.getEmail}</li>

            <li>Valor do CPF: {this.state.cliente.getCpf.getValor}</li>
            <li>Data de emissão do CPF: {this.state.cliente.getCpf.getDataEmissao.toUTCString()}</li>

            <li>Valor do RG: {this.state.cliente.getRgs[0].getValor}</li>
            <li>Data de emissão do RG: {this.state.cliente.getRgs[0].getDataEmissao.toUTCString()}</li>

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
                <button>Adcionar telefone</button>
            }

        </div>)
    }
}