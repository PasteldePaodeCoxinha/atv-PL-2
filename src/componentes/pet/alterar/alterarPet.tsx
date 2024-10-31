import { Component } from "react";
import "./alterarPet.css"
import Pet from "../../../modelo/pet";

type props = {
    pet: Pet
}

type state = {
    pet: Pet
}

export default class AlterarPet extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            pet: props.pet
        }
    }

    render() {
        return (<div className="informarcoesDeUmPetNaLista">
            <ul>
                <li> <label htmlFor="">Nome:</label> <input type="text" value={this.state.pet.getNome} /></li>
                <li><label htmlFor="">Genêro:</label> <input type="text" value={this.state.pet.getGenero} /> </li>

                <li><label htmlFor="">Tipo:</label> <input type="text" value={this.state.pet.getTipo} /> </li>
                <li><label htmlFor="">Raça:</label> <input type="text" value={this.state.pet.getRaca} /></li>

                <li><label htmlFor="">Tamanho:</label> <input type="text" value={this.state.pet.getTamanho} /></li>

            </ul>
        </div>)
    }
}