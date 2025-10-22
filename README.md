# Sumé App - React Native

O Sumé App é um aplicativo desenvolvido com React Native, que visa enfatizar a disponibilização de informações sobre a legislação brasileira para a população. Seu conceito é ser uma IA, para tal, implementamos a API do Gemini no app.

## 📥 Clonando o projeto

Clone o repositório no seu computador:
```bash
git clone https://github.com/beatrizac03/sume-app.git
cd sume-app
```

Instale todas as dependências do projeto
```bash
npm install
```

Inicie o servidor do Expo
```bash
npm expo start
```

Ao iniciar o servidor, o terminal irá logar um QR Code, scaneie com o app Expo GO no Iphone ou Android, ou pressione w para abrir no navegador

O app irá rodar localmente e atualizar automaticamente quando você fizer alterações.

## 🔐 Variáveis de ambiente

1. Crie um arquivo .env na raiz do projeto
```bash
GEMINI_KEY=suachavegemini
```

2. Instale a biblioteca react-native-dotenv:
```bash
npm install react-native-dotenv
```
