import React, { Component } from "react";
import { FaEdit } from "react-icons/fa"; // Certifique-se de ter react-icons instalado
import axios from "axios";

type Props = {
  tema: string;
};

type State = {
  selectedCliente: any | null;
  showModal: boolean;
  isEditing: boolean;
  nome: string;
  nomeSocial: string;
  email: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
  telefones: Array<{ id: number; ddd: string; numero: string }>;
  ddd: string;
  numeroTelefone: string;
  clientes: Array<{
    id: number;
    nome: string;
    nomeSocial: string;
    email: string;
    endereco: {
      estado: string;
      cidade: string;
      bairro: string;
      rua: string;
      numeroTelefone: string;
      codigoPostal: string;
      informacoesAdicionais: string;
    };
    telefones: Array<{ ddd: string; numero: string }>;
  }>;
};

export default class ListaCliente extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCliente: null,
      showModal: false,
      isEditing: false,
      nome: "",
      nomeSocial: "",
      email: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
      telefones: [],
      ddd: "",
      numeroTelefone: "",
      clientes: [],
    };
  }

  componentDidMount() {
    this.fetchClientes();
  }

  fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:32831/cliente/clientes");
      if (response.ok || response.status === 302) {
        const clientes = await response.json();
        this.setState({ clientes });
      } else {
        const errorText = await response.text();
        console.error("Erro ao buscar clientes:", response.status, errorText);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    }
  };

  handleDetalhes = (cliente: any) => {
    this.setState({
      selectedCliente: cliente,
      showModal: true,
      isEditing: false,
      nome: cliente.nome || "",
      nomeSocial: cliente.nomeSocial || "",
      email: cliente.email || "",
      estado: cliente.endereco.estado || "",
      cidade: cliente.endereco.cidade || "",
      bairro: cliente.endereco.bairro || "",
      rua: cliente.endereco.rua || "",
      numero: cliente.endereco.numero || "",
      codigoPostal: cliente.endereco.codigoPostal || "",
      informacoesAdicionais: cliente.endereco.informacoesAdicionais || "",
      telefones: cliente.telefones || [],
    });
  };

  handleAtualizarCliente = (id: number) => {
    window.location.href = `http://localhost:3000/atualizar/${id}`;
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  handleDeleteCliente = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:32831/cliente/excluir`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log("Cliente excluído com sucesso");
        this.fetchClientes(); // Atualizar a lista de clientes
      } else {
        const errorText = await response.text();
        console.error("Erro ao excluir cliente:", response.status, errorText);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    }
  };

  toggleEdit = () => {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  handleSave = async () => {
    const {
      selectedCliente,
      nome,
      nomeSocial,
      email,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      codigoPostal,
      informacoesAdicionais,
      telefones,
    } = this.state;

    const updatedCliente = {
      id: selectedCliente.id,
      nome,
      nomeSocial,
      email,
      endereco: {
        estado,
        cidade,
        bairro,
        rua,
        numero,
        codigoPostal,
        informacoesAdicionais,
      },
      telefones,
    };

    try {
      const response = await axios.put(
        `http://localhost:32831/cliente/atualizar`,
        updatedCliente
      );
      if (response.status === 200) {
        console.log("Cliente atualizado com sucesso");
        this.fetchClientes(); // Atualizar a lista de clientes
        this.setState({ showModal: false });
      } else {
        console.error("Erro ao atualizar cliente:", response.status, response.data);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    }
  };

  render() {
    const { selectedCliente, showModal, isEditing, clientes } = this.state;
    return (
      <div className="container-fluid">
        <div className="list-group">
          {clientes.map((cliente, index) => (
            <div key={index} className="list-group-item list-group-item-action">
              {cliente.nome}
              <div style={{ float: "right" }}>
                <button
                  style={{ marginRight: '8px' }}
                  className="btn btn-info"
                  onClick={() => this.handleDetalhes(cliente)}
                >
                  Visualizar/Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteCliente(cliente.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        {showModal && selectedCliente && (
          <div
            className="modal"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalhes do Cliente</h5>
                </div>
                <div className="modal-body">
                  <div>
                    <label>
                      <strong>Nome:</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="nome"
                          value={this.state.nome}
                          onChange={this.handleInputChange}
                        />
                      ) : (
                        selectedCliente.nome
                      )}
                      <FaEdit onClick={this.toggleEdit} style={{ cursor: "pointer" }} />
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Nome Social:</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="nomeSocial"
                          value={this.state.nomeSocial}
                          onChange={this.handleInputChange}
                        />
                      ) : (
                        selectedCliente.nomeSocial
                      )}
                      <FaEdit onClick={this.toggleEdit} style={{ cursor: "pointer" }} />
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      ) : (
                        selectedCliente.email
                      )}
                      <FaEdit onClick={this.toggleEdit} style={{ cursor: "pointer" }} />
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Endereço:</strong>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            name="rua"
                            value={this.state.rua}
                            onChange={this.handleInputChange}
                            placeholder="Rua"
                          />
                          <input
                            type="text"
                            name="numero"
                            value={this.state.numero}
                            onChange={this.handleInputChange}
                            placeholder="Número"
                          />
                          <input
                            type="text"
                            name="bairro"
                            value={this.state.bairro}
                            onChange={this.handleInputChange}
                            placeholder="Bairro"
                          />
                          <input
                            type="text"
                            name="cidade"
                            value={this.state.cidade}
                            onChange={this.handleInputChange}
                            placeholder="Cidade"
                          />
                          <input
                            type="text"
                            name="estado"
                            value={this.state.estado}
                            onChange={this.handleInputChange}
                            placeholder="Estado"
                          />
                          <input
                            type="text"
                            name="codigoPostal"
                            value={this.state.codigoPostal}
                            onChange={this.handleInputChange}
                            placeholder="Código Postal"
                          />
                          <input
                            type="text"
                            name="informacoesAdicionais"
                            value={this.state.informacoesAdicionais}
                            onChange={this.handleInputChange}
                            placeholder="Informações Adicionais"
                          />
                        </>
                      ) : (
                        <>
                          {selectedCliente.endereco.rua}, {selectedCliente.endereco.numero}, {selectedCliente.endereco.bairro}, {selectedCliente.endereco.cidade}, {selectedCliente.endereco.estado}, {selectedCliente.endereco.codigoPostal}, {selectedCliente.endereco.informacoesAdicionais}
                        </>
                      )}
                      <FaEdit onClick={this.toggleEdit} style={{ cursor: "pointer" }} />
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Telefones:</strong>
                      {isEditing ? (
                        this.state.telefones.map((telefone, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              name={`telefone-ddd-${index}`}
                              value={telefone.ddd}
                              onChange={(e) => {
                                const telefones = [...this.state.telefones];
                                telefones[index].ddd = e.target.value;
                                this.setState({ telefones });
                              }}
                              placeholder="DDD"
                            />
                            <input
                              type="text"
                              name={`telefone-numero-${index}`}
                              value={telefone.numero}
                              onChange={(e) => {
                                const telefones = [...this.state.telefones];
                                telefones[index].numero = e.target.value;
                                this.setState({ telefones });
                              }}
                              placeholder="Número"
                            />
                          </div>
                        ))
                      ) : (
                        selectedCliente.telefones
                          .map((tel: { ddd: any; numero: any }) => `${tel.ddd} ${tel.numero}`)
                          .join(", ")
                      )}
                      <FaEdit onClick={this.toggleEdit} style={{ cursor: "pointer" }} />
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.handleCloseModal}
                  >
                    Fechar
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleSave}
                    >
                      Salvar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
