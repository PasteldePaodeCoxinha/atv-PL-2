import { Component, ReactNode } from "react";
import Cliente from "../../../modelo/cliente";
import Servico from "../../../modelo/servico";
import "./registroCompraServico.css"

type props = {
    clientes: Cliente[],
    servicos: Servico[]
}

type state = {
    cliente: Cliente | undefined,
    servico: Servico | undefined,
    textoAviso: string,
    qtdServicos: number
}

export default class RegistroCompraServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            servico: undefined,
            textoAviso: "Selecione um cliente!",
            qtdServicos: 0
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.registrarCompra = this.registrarCompra.bind(this)
    }

    selecionarCliente(n: string) {
        const cliente = this.props.clientes.find(c => c.nome === n)
        if (cliente) {
            this.setState({
                cliente: cliente,
                textoAviso: "Selecione um serviço!"
            })
        }
    }

    registrarCompra() {
        if (this.state.cliente && this.state.servico) {
            for (let i = 0; i < this.state.qtdServicos; i++) {
                this.state.cliente.getServicosConsumidos.push(this.state.servico)
            }
        }

        this.setState({
            textoAviso: "Compra registrada!"
        })

        setTimeout(() => {
            this.setState({
                textoAviso: "Selecione um serviço!"
            })
        }, 1500)
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroServico">

                <div className="containerAvisoRegistroServico">
                    <p className="textoAvisoRegistroServico">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroServico">
                    {!this.state.cliente ? (
                        <table className="tabelaRegistroServicoClientes">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clientes.map((c, i) => {
                                    return (
                                        <tr className={c.nome === this.state.cliente?.nome ? "linhaSelecionadaRegistroServico" : ""}
                                            key={i}
                                            onClick={() => this.selecionarCliente(c.nome)}>
                                            <td>{c.nome}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="menuRegistroCompraServico">
                            <button className="botaVoltarRegistroServico" onClick={() => { this.setState({ cliente: undefined }) }}>
                                Voltar
                            </button>

                            <div className="containerSeletorServico">
                                <select className="seletorServico"
                                    onChange={e => this.setState({ servico: this.props.servicos.find(p => p.nome === e.target.value) })}
                                    value={this.state.servico?.nome}>
                                    <option value="" disabled>Selecione o servico</option>
                                    {this.props.servicos.map((p, i) => {
                                        return (
                                            <option
                                                value={p.nome}
                                                key={i}>
                                                {p.nome}
                                            </option>
                                        )
                                    })}
                                </select>

                                <input type="number"
                                    className="qtdServicosEscolher"
                                    value={this.state.qtdServicos}
                                    onChange={e => {
                                        this.setState({
                                            qtdServicos: Number(e.target.value).valueOf()
                                        })
                                    }}
                                />
                            </div>

                            <button className="botaResgitrarCompraServico"
                                onClick={() => this.registrarCompra()}
                            >
                                <p>
                                    Registrar
                                </p>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}