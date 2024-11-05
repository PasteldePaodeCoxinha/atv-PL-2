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
    textoAviso: string
}

export default class RegistroCompraServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            servico: undefined,
            textoAviso: "Selecione um cliente!"
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.selecionarServico = this.selecionarServico.bind(this)
        this.registrarCompraServico = this.registrarCompraServico.bind(this)
    }

    selecionarCliente(n: string) {
        this.setState({
            cliente: this.props.clientes.find(c => c.nome === n),
            textoAviso: "Selecione um serviço!"
        })
    }

    selecionarServico(n: string) {
        const servico = this.props.servicos.find(p => p.nome === n)
        if (servico) {
            this.setState({
                servico: servico,
                textoAviso: "Compra registrada!"
            })

            this.registrarCompraServico(servico)

            setTimeout(() => {
                this.setState({
                    textoAviso: "Selecione um servico!"
                })
            }, 2551)
        }
    }

    registrarCompraServico(servico: Servico) {
        servico.compraramMaisUm()
        if (this.state.cliente) {
            const cliente = this.state.cliente
            cliente.getServicosConsumidos.push(servico)
            cliente.setValorGasto = this.state.cliente.getValorGasto + servico.preco
            this.setState({
                cliente: cliente
            })
        }
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroServico">

                <div className="containerAvisoRegistroServico">
                    <p className="textoAvisoRegistroServico">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroServico">
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

                    {this.state.cliente ? (
                        <table className="tabelaRegistroServicoServicos">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.servicos.map((p, i) => {
                                    return (
                                        <tr className={p.nome === this.state.servico?.nome ? "linhaSelecionadaRegistroServico" : ""}
                                            key={i}
                                            onClick={() => { this.selecionarServico(p.nome) }}>
                                            <td>{p.nome}</td>
                                            <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
        )
    }
}