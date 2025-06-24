export class Product {
  constructor(
    public id: number,
    public nome: string,
    public descricao: string,
    public preco: number,
    public imagem: string,
    public category?: string
  ) {}

  renderCard() {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          alt="Cupcakes Variados" 
          className="w-full h-48 object-cover" 
          src={this.imagem}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-custom-black mb-1">
            {this.nome}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {this.descricao}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-pink-500">
              R$ {this.preco.toFixed(2).replace('.', ',')}
            </span>
            <button className="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-custom-blue-darker hover:text-custom-black transition-colors text-sm flex items-center">
              <span className="material-icons text-sm mr-1"></span>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
}

