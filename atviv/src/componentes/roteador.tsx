import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./cadastrarCliente";
import DetalhesCliente from "./detalhesCliente"
import Home from "./Home";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
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
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Home', 'Cadastrar', 'Ações']} />
        if (this.state.tela === 'Cadastrar') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="#e3f2fd" />
                </>
            )

        } else if (this.state.tela === 'Ações') {
            return (
                <>
                    {barraNavegacao}
                    <DetalhesCliente tema="#e3f2fd" />
                </>
            )

        } else if (this.state.tela === 'Home') {
            return (
                <>
                    {barraNavegacao}
                    <Home />
                </>
            )

        } else {
            return (
                <>
                    {barraNavegacao}
                    <Home/>
                </>
            )
        }
    }
}