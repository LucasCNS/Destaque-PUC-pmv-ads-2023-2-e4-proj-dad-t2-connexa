import React, { useState, useEffect } from 'react';
import "./styles.css";
import AuthenticationService from "../../services/AuthenticationService";
import CreateUserDto from "../../services/AuthenticationService/dtos/CreateUserDto";
import ProblemDetails from '../../services/shared/models/ProblemDetails';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: 'Amarilda',
    email: 'amarilda@email.com',
    password: '123456'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = 'Por favor, insira seu nome.';
    }

    if (!formData.email) {
      errors.email = 'Por favor, insira seu endereço de e-mail.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Endereço de e-mail inválido.';
    }

    if (!formData.password) {
      errors.password = 'Por favor, insira sua senha.';
    }

    setErrors(errors);

    const valid = Object.keys(errors).length === 0;

    return valid;
  };

  const handleSubmit = async (event) => {
    console.info("Registration.handleSubmit -> Iniciando cadastro do usuário.");
    event.preventDefault();

    if (!validateForm())
      return;

    console.info("Registration.handleSubmit -> Formulário válido, dando sequência no cadastro do usuário.");

    setSubmitting(true);

    try {
      const createUserDto = new CreateUserDto(formData.name, formData.email, formData.password);
      const authenticationService = new AuthenticationService();
      const success = await authenticationService.createUserAsync(createUserDto);

      console.info("Registration.handleSubmit -> Resposta do authenticationService.createUserAsync:", success);

      if (success) {
        setApiResponse({});
        return;
      }

      const problemDetails = new ProblemDetails(null, "Erro ao Criar Usuário", null, "Ocorreu um erro ao salvar o usuário, tente novamente mais tarde.", null);
      setApiResponse({ problemDetails: problemDetails });
      return;

    } catch (error) {

      const problemDetails = new ProblemDetails(null, "Erro ao Criar Usuário", null, "Ocorreu um erro ao salvar o usuário, tente novamente mais tarde.", null);
      setApiResponse({ problemDetails: problemDetails });
      return;

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Senha:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" disabled={submitting}>Enviar</button>
      </form>
      {apiResponse && (
        <div className={apiResponse.problemDetails ? 'error' : 'success'}>
          {apiResponse.problemDetails ? `Título: ${apiResponse.problemDetails.title} | Detalhes: ${apiResponse.problemDetails.detail}` : 'Formulário enviado com sucesso!'}
        </div>
      )}
    </div>
  );
};

export default Registration;
