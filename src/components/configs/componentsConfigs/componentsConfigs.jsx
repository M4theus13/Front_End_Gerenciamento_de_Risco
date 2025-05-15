import React, { useEffect, useRef, useState } from 'react';
import { Users } from '../../../../service/users';
import './componentsConfigs.css'
import api from '../../../../service/api';
import { useNavigate } from 'react-router-dom';
import { Me } from '../../../../service/me';
import UserIcon from '../../../assets/default-avatar-user.jpg'
import ErroImg from '../../../assets/erro-icon.png'
import { jwtDecode } from 'jwt-decode'

function ComponentUpdateAvatar() {
  const userIcon = UserIcon
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info

  const [token, setToken] = useState(null); // Estado para o token

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp === undefined) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return true; 
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado!');
          setToken(null); 
          navigate('/login')
          return
        } 
        setToken(storedToken); 
        const data = await Me(storedToken, { signal: controller.signal });
        setUserData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar dados:', error);
          if (localStorage.getItem('token')) {
            console.log('removendo token')
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
    };

    fetchData()

    return () => controller.abort();
  }, [token]); 

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    // const formData = new FormData();
    // formData.append('avatar', file);
    // formData.append('userId', userId);
    navigate('/menu')

    try {
    } catch (error) {
    }
};
  
  return <div className='componentAvatar'>
      <div className='componentAvatarBox'>
        <div className='componentAvatarBoxFotoAtual'>
          <p>Foto Atual</p>
          <img src={userIcon} alt="avatarUser" className='componentAvatarBoxFotoAtualImage'/>  
        </div>

        {preview ?
        <div className='componentAvatarBoxFotoNova'>
          <p>Foto Nova</p>
          {preview && <img src={preview} alt="Preview" className='componentAvatarBoxfotoNovaImage'/>}
        </div>
          : <div></div>}
      </div>

      <div className='componentAvatarInputBox'>
        <input id='image' type="file" onChange={handleFileChange} accept="image/*" className="hidden-input"/>
        <label htmlFor='image' className="custom-button">Escolher o arquivo</label>
      </div>
      
      <button onClick={handleUpload}>Enviar Avatar</button>
  </div>
}

//NOME
function ComponentName() {
  let hasErrorName = false
  
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
    const [token, setToken] = useState(null); // Estado para o token
  
    function isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp === undefined) {
          return false;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; 
      }
    }
  
    useEffect(() => {
      const controller = new AbortController();
  
      const fetchData = async () => {
        try {
          const storedToken = localStorage.getItem('token');
          if (!storedToken || isTokenExpired(storedToken)) {
            console.log('Token inválido ou expirado!');
            setToken(null); 
            navigate('/login')
            return
          } 
          setToken(storedToken); 
          const data = await Me(storedToken, { signal: controller.signal });
          setUserData(data);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Erro ao buscar dados:', error);
            if (localStorage.getItem('token')) {
              console.log('removendo token')
              localStorage.removeItem('token');
              setToken(null);
            }
          }
        }
      };
  
      fetchData()

      return () => controller.abort();
    }, [token]); 

  useEffect(() => {
    const removeErrorInput = (event) => {
      event.target.classList.remove('error');
      event.target.placeholder = ''
    };

    const removeErrorLegend = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.innerText = ''
      }
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorLegend);
    })
  }, [])

  const legendNewName = useRef()
  const inputNewName = useRef()

  const inputs = [
    {ref: inputNewName, textRef: legendNewName},
  ]

    async function alterarNome() {
      hasErrorName = false
      inputs.forEach((input) => {
      if (inputNewName.current?.value.trim() === '') {
          input.ref.current.classList.add('error')
          input.textRef.current.innerText = 'Campo obrigatório'
          hasErrorName = true
        } else {
          hasErrorName = false
        }
      })

      if (!hasErrorName) {

        await api.put(`/edit-name-user/${userData.id}`, {
          name: inputNewName.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
    
        navigate('/menu')

      } else {
        console.log('erro')
      }
    }

  return <div className='componentName'>
    <div className='componentName-current-name'>
      <div className='componentName-current-name-legend-box'>
        <legend>Nome Atual:</legend>
      </div>

      <div className='componentName-current-name-input-box'>
        <input type="text" value={userData?.name || ''} readOnly/>
      </div>
    </div>

    <div className='componentName-new-name'>
      <div className='componentName-new-name-legend-box'>
        <legend>Nome:</legend>
      </div>

      <div className='componentName-new-name-input-box'>
        <p className='componentName-new-name-text' ref={legendNewName}></p>
        <input type="text" ref={inputNewName}/>
      </div>
    </div>

    <button onClick={alterarNome}>Enviar</button>
  </div>;
}

//EMAIL
function ComponentEmail() {

  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp === undefined) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return true; 
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado!');
          setToken(null); 
          navigate('/login')
          return
        } 
        setToken(storedToken); 
        const data = await Me(storedToken, { signal: controller.signal });
        setUserData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar dados:', error);
          if (localStorage.getItem('token')) {
            console.log('removendo token')
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
    };

    fetchData()

    return () => controller.abort();
  }, [token]); 

  useEffect(() => {
    
    const removeErrorInput = (event) => {
      event.target.classList.remove('error');
      event.target.placeholder = ''
    };

    const removeErrorLegend = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.innerText = ''
      }
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorLegend);
    })
  }, [])

  const inputEmail = useRef()
  const inputNewEmail = useRef()

  const legendEmail = useRef()
  const legendNewEmail = useRef()

  const inputs = [
    {ref: inputEmail, textRef: legendEmail},
    {ref: inputNewEmail, textRef: legendNewEmail},
  ]

  let hasErrorEmail = false
  async function alterarEmail() {
    hasErrorEmail = false
    //validação se o campo do email atual esta vazio
    if (inputEmail.current?.value.trim() === '') {
      inputEmail.current.classList.add('error')
      legendEmail.current.innerText = 'Campo obrigatório'
    } 
    //validação se o campo do email novo esta vazio
    if (inputNewEmail.current?.value.trim() === '') {
      inputNewEmail.current.classList.add('error')
      legendNewEmail.current.innerText = 'Campo obrigatório'
    } 
    //validação se o campo do email atual e novo email estao vazios para nao fazer a requisição
    if (inputEmail.current?.value.trim() === '' || inputNewEmail.current?.value.trim() === '') {
      hasErrorEmail = true 
      return
    }

    //validação se o email novo tem @ e .com
    if  (!inputNewEmail.current?.value.includes('@') || !inputNewEmail.current?.value.includes('.com')) {
      inputNewEmail.current.classList.add('error')
      legendNewEmail.current.innerText = 'Email deve conter @ e .com'
      hasErrorEmail = true
    }

    if (!hasErrorEmail){
      //validação se o email atual é correspondente ao email do usuario
      try  {
        const verificaEmail = await api.post(`/verify-email/${userData?.id}`, {
          email: inputEmail.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
        if (verificaEmail.status === 201) {
          inputEmail.current.classList.add('error')
          legendEmail.current.innerText = 'Email incorreto'
          hasErrorEmail = true
        } 

      } catch (err) {
        console.log(err)
      }
    }
    if (!hasErrorEmail) {
      //verifica se o novo email ja esta cadastrado
      try {
        const verifyNewEmail = await api.post(`/verify-new-email`, {
          emailNew: inputNewEmail.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
        if (verifyNewEmail.status === 201) {
          inputNewEmail.current.classList.add('error')
          legendNewEmail.current.innerText = 'Email já em uso'
          hasErrorEmail = true
        }
      } catch (err) {
        console.log(err)
      }

      if (inputEmail.current.value === inputNewEmail.current.value) {
        inputEmail.current.classList.add('error')
        inputNewEmail.current.classList.add('error')
        legendNewEmail.current.innerText = 'Email atual e novo email são iguais'
        hasErrorEmail = true
      }
    }

    if (!hasErrorEmail) {
      updateEmail()
      navigate('/menu')
    }

    async function updateEmail() {
      try {
        await api.put(`/edit-email-user/${userData.id}`, {
          newEmail: inputNewEmail.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
      } catch(err) {
        console.log(err)
      }
    }

  }

  return <div className='componentEmail'>
    <div className='componentEmail-current-email'>
      <div className='componentEmail-legend-box'>
        <legend>Email Atual</legend>
      </div>
      <div className='componentEmail-input-box'>
        <p className='componentEmail-text' ref={legendEmail}></p>
        <input type="text" ref={inputEmail}/>
      </div>
    </div>

    <div className='componentEmail-new-email'>
      <div className='componentEmail-legend-box'>
        <legend>Novo Email</legend>
      </div>
      <div className='componentEmail-input-box'>
        <p className='componentEmail-text' ref={legendNewEmail}></p>
        <input type="text" ref={inputNewEmail}/>
      </div>
    </div>

    <button onClick={alterarEmail}>Alterar</button>
  </div>;

}

//SENHA
function ComponentPassword() {

  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp === undefined) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return true; 
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado!');
          setToken(null); 
          navigate('/login')
          return
        } 
        setToken(storedToken); 
        const data = await Me(storedToken, { signal: controller.signal });
        setUserData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar dados:', error);
          if (localStorage.getItem('token')) {
            console.log('removendo token')
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
    };

    fetchData()

    return () => controller.abort();
  }, [token]); 

  useEffect(() => {

    const removeErrorInput = (event) => {
      event.target.classList.remove('error');
      event.target.placeholder = ''
    };

    const removeErrorLegend = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.innerText = ''
      }

    inputPassword.current.addEventListener('focus', removeErrorInput)
    inputNewPassword.current.addEventListener('focus', removeErrorInput)
    inputConfirmNewPassword.current.addEventListener('focus', removeErrorInput)
  
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorLegend);
    })

  }, [])

  let hasErrorPassword = false

  const inputPassword = useRef()
  const inputNewPassword = useRef()
  const inputConfirmNewPassword = useRef()
  
  const legendPassword = useRef()
  const legendNewPassword = useRef()
  const legendConfirmNewPassword = useRef()

  const inputs = [
    {ref: inputPassword, textRef: legendPassword},
    {ref: inputNewPassword, textRef: legendNewPassword},
    {ref: inputConfirmNewPassword, textRef: legendConfirmNewPassword},
  ]

  async function updatePassword() {
    hasErrorPassword = false
    //validacao se campo de senha esta vazio
    if (inputPassword.current?.value.trim() === '') {
      inputPassword.current.classList.add('error')
      legendPassword.current.innerText = 'Campo obrigatório'
    }
    //validacao se campo de nova senha esta vazio
    if (inputNewPassword.current?.value.trim() === '') {
      inputNewPassword.current.classList.add('error')
      legendNewPassword.current.innerText = 'Campo obrigatório'

    }
    //validacao se campo de confirmar senha esta vazio
    if (inputConfirmNewPassword.current?.value.trim() === '') {
      inputConfirmNewPassword.current.classList.add('error')
      legendConfirmNewPassword.current.innerText = 'Campo obrigatório'

    }

    //verifica se algum campo esta vazio e retorna erro
    if (inputPassword.current?.value.trim() === '' || inputNewPassword.current?.value.trim() === '' || inputConfirmNewPassword.current?.value.trim() === '') {
      hasErrorPassword = true
      return
    }

    //verifica se a nova senha é igual a senha de confirmação
    if (inputNewPassword.current?.value !== inputConfirmNewPassword.current?.value) {
      inputNewPassword.current.classList.add('error')
      inputConfirmNewPassword.current.classList.add('error')

      legendNewPassword.current.innerText = 'Senhas não correspondem'
      legendConfirmNewPassword.current.innerText = 'Senhas não correspondem'

      hasErrorPassword = true
    } 

    if (!hasErrorPassword) {
      try {
        const userPassword = await api.post(`/verify-password/${userData.id}`, {
          password: inputPassword.current.value
        },{
          headers: {Authorization : `Bearer ${token}`}
        })
        console.log(userPassword)
      if (userPassword.status === 200) {
        console.log('senha correta')
      } else {
        inputPassword.current.classList.add('error')
        legendPassword.current.innerText = 'Senha Incorreta'
        hasErrorPassword = true
      }
  
      } catch (err) {
        console.log(err)
      }
    }

    if (!hasErrorPassword) {
      try {
        await api.put(`/edit-password-user/${userData.id}`, {
          newPassword: inputNewPassword.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
      } catch(err) {
        console.log(err)
      }
      navigate('/menu')
    }
  }

  return <div className='componentPassword'>
    <div className='componentPassword-current-password'>
      <div className='componentPassword-current-password-legend-box'>
        <legend>Senha Atual: </legend>
      </div>
      <div className='componentPassword-current-password-input-box'>
        <p className='componentPassword-errorText' ref={legendPassword}></p>
        <input type="text" ref={inputPassword}/>
      </div>
    </div>

    <div className='componentPassword-new-password'>
      <div className='componentPassword-new-password-legend-box'>
        <legend >Nova Senha: </legend>
      </div>
      <div className='componentPassword-new-password-input-box'>
        <p className='componentPassword-errorText' ref={legendNewPassword}></p>
       <input type="text" ref={inputNewPassword}/>
      </div>
    </div>

    <div className='componentPassword-confirm-new-password'>
      <div className='componentPassword-confirm-new-password-legend-box'>
        <legend>Confirmar Nova Senha: </legend>
      </div>
      <div className='componentPassword-confirm-new-password-input-box'>
        <p className='componentPassword-errorText' ref={legendConfirmNewPassword}></p>
        <input type="text" ref={inputConfirmNewPassword}/>
      </div>
    </div>
    <button onClick={updatePassword}>Enviar</button>
  </div>;
}

//EXCLUIR CONTA
function ComponentDeleteAccount() {
  const erroIcon = ErroImg
  
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp === undefined) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return true; 
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado!');
          setToken(null); 
          navigate('/login')
          return
        } 
        setToken(storedToken); 
        const data = await Me(storedToken, { signal: controller.signal });
        setUserData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar dados:', error);
          if (localStorage.getItem('token')) {
            console.log('removendo token')
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
    };

    fetchData()

    return () => controller.abort();
  }, [token]); 

  async function deleteAccount() {
    try {
      await api.delete(`/edit-delete-user/${userData.id}`, {
        headers: {Authorization : `Bearer ${token}`}
      })
    } catch (err) {
      console.log(err)
    }
    navigate('/')
    localStorage.removeItem('token')
  
  }

  return <div className='componentDeleteAccount'>
    <img src={erroIcon} alt="error-icon" />
    <p>Deseja excluir sua conta?</p>
    <button onClick={deleteAccount}>Excluir</button>
  </div>;
}

export { ComponentUpdateAvatar, ComponentName, ComponentEmail, ComponentPassword, ComponentDeleteAccount };
