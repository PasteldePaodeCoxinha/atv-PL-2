import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private valorGasto: number
    private pets: Array<Pet>
    constructor(nome: string, nomeSocial: string, cpf: CPF, rgs: Array<RG>, telefones: Array<Telefone>) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = rgs
        this.dataCadastro = new Date()
        this.telefones = telefones
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.valorGasto = 0
        this.pets = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public set setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones
    }

    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public get getPets(): Array<Pet> {
        return this.pets
    }
    public set setPets(pets: Array<Pet>) {
        this.pets = pets
    }

    public get getValorGasto(): number {
        return this.valorGasto
    }
    public set setValorGasto(ValorGasto: number) {
        this.valorGasto = Math.floor(ValorGasto * 100) * 0.01
    }
}