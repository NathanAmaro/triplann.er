// Classe necessária para separar os erros de cliente (não internos do servidor) em uma classe separada.
// Sempre que definir essa classe em um "throw new ClientError" o servidor conseguirá tratar de forma diferente

export class ClientError extends Error {}