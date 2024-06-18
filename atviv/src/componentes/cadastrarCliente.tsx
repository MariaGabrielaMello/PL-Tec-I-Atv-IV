import { Component } from "react";

type props = {
    tema: string
}

type state = {
    nome: string,
    nomeSocial: string,
    email: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    codigoPostal: string,
    informacoesAdicionais: string,
    ddd: string,
    numero: string,
}

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: '',
            nomeSocial: '',
            email: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            codigoPostal: '',
            informacoesAdicionais: '',
            ddd: '',
            numero: '',
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<state, keyof state>);
    }

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { nome, nomeSocial, email, estado, cidade, bairro, rua, codigoPostal, informacoesAdicionais, ddd, numero } = this.state;

        const novoCliente = {
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            endereco: {
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                codigoPostal: codigoPostal,
                informacoesAdicionais: informacoesAdicionais
            },
            telefones: [{ ddd: ddd, numero: numero }]
        };

        try {
            const response = await fetch('http://localhost:32831/cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoCliente)
            });

            if (response.ok) {
                console.log('Cliente cadastrado com sucesso');
                this.setState({
                    nome: '',
                    nomeSocial: '',
                    email: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    codigoPostal: '',
                    informacoesAdicionais: '',
                    ddd: '',
                    numero: ''
                });
            } else {
                const errorText = await response.text();
                console.error('Erro ao cadastrar cliente:', response.status, errorText);
            }
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
        }
    }

    render() {
        let { nome, nomeSocial, email, estado, cidade, bairro, rua, codigoPostal, informacoesAdicionais, ddd, numero } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h4>Cadastrar Cliente</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" name="nome" value={nome} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" name="nomeSocial" value={nomeSocial} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" name="email" value={email} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Estado" aria-label="Estado" name="estado" value={estado} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Cidade" aria-label="Cidade" name="cidade" value={cidade} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Bairro" aria-label="Bairro" name="bairro" value={bairro} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Rua" aria-label="Rua" name="rua" value={rua} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Código Postal" aria-label="Código Postal" name="codigoPostal" value={codigoPostal} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Informações Adicionais" aria-label="Informações Adicionais" name="informacoesAdicionais" value={informacoesAdicionais} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="DDD" aria-label="DDD" name="ddd" value={ddd} onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Número de Telefone" aria-label="Número de Telefone" name="numero" value={numero} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-secondary" type="submit" style={{ background: '#4CAF50' }}>Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
