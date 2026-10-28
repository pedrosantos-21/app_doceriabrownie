/* //NOTA: Linha 2 importa a biblioteca Axios instalada no projeto. Ela fornece funções para fazer requisições HTTP, como get, post, put, patch e delete.*/
import axios from "axios";

//NOTA: Linha 5 em diante. [axios.create(...)] Cria uma instância independente e configurável do Axios. */
//NOTA: [baseURL] Define a URL base para todas as chamdas da instância. O valor vem do [.env] atravéz do [process.env]
export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10_000, //Tempo máximo de espera por uma resposta: 10.000 milissegundos.
    headers: {
        "Content-Type": "application/json", //Define o formato padrão para o cabeçalho HTTP nesse caso, JSON.
    },
});


/* src/services/api.ts: 
    ===========================================================================================================
   1º Configuração única do Axios
   2º Configura o Axios uma única vez: URL base, tempo limite, cabeçalhos e futuramente, token de autenticação.
    ===========================================================================================================
   ________________________________________
  |História/Convenção do diretório Service.|
  
  "Camada de serviços" (service layer) é o motor para toda essa nomemcaltura, muito comumente usada em arquiteturas de sistemas.
   Desde aplicações corporativas e back-ends."

   Services(s) fica no plural, porque é a coleção de serviços. já ".service" no nome do arquivo está no singular, porque cada
   arquivo representa uma unidade: "O serviço de pedidos"

   Esse sufixo não é obrigatório para o TypeScript nem para o Expo. Ele existe simplesmente pelo fato da leitura ser mais di-
   nâmica e organizada.

*/

/*Services/ -> comunicação com o back-end */
