/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "./listaClientes.css"

type props = {
}

export default class ListaCliente extends Component<props> {
    render() {
        return (
            <div className="clientesCadastrados">
                <ul className="listaDeClientes">
                    <li className="informacaoCliente1">Cliente 1</li>
                    <li className="informacaoCliente2">Cliente 2</li>
                    <li className="informacaoCliente3">Cliente 3</li>
                    <li className="informacaoCliente4">Cliente 4</li>
                </ul>
            </div>
        )
    }
}