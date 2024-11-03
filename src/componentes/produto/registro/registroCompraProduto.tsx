import { Component, ReactNode } from "react";
import Cliente from "../../../modelo/cliente";
import Produto from "../../../modelo/produto";
import "./registroCompraProduto.css"

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

type state = {
    cliente: Cliente | undefined,
    produto: Produto | undefined,
    textoAviso: string
}

export default class RegistroCompraProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            produto: undefined,
            textoAviso: "Selecione um cliente"
        }
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroProduto">

                <div className="containerAvisoRegistroProduto">
                    <p className="textoAvisoRegistroProduto">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroProduto">
                    <table className="tabelaRegistroProdutoClientes">
                        <thead>
                            <tr>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>aa</td>
                            </tr>
                            <tr>
                                <td>aa</td>
                            </tr>
                            <tr>
                                <td>aa</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="tabelaRegistroProdutoProdutos">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>aa</td>
                                <td>aa</td>
                            </tr>
                            <tr>
                                <td>aa</td>
                                <td>aa</td>
                            </tr>
                            <tr>
                                <td>aa</td>
                                <td>aa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}