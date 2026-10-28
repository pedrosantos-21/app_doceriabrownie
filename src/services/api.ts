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
