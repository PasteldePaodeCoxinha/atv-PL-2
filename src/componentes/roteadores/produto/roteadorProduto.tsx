import { Component } from "react";
import "./roteadorProduto.css"
import BarraNavegacao from "../../barraNavegacao";
import Produto from "../../../modelo/produto";

type props = {
    produtos: Array<Produto>
}

type state = {
    tela: string

}

export default class RoteadorProduto extends Component<props, state> {
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
            botoes={['Lista', 'Cadastro']} />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaProduto">
                    {barraNavegacao}
                    {/* <ListaProduto produtos={this.props.produtos} /> */}
                    <h1>aaaaaaaaaaaaaaaaaa</h1>
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroProduto">
                    {barraNavegacao}
                    {/* <FormularioCadastroProduto produtos={this.props.produtos} /> */}
                    <h1>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h1>
                </div>
            )
        }
    }
}