import { CheckCircle, Gift } from "lucide-react";
import Image from "next/image";

export class Kit {
constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: string,
    public image: string,
    public category: string,
    public items: string[],
    public serves: string,
){}

  renderCard() {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100 overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-sky-100 to-indigo-100">
          <Image
            width={200}
            height={300} 
            src={this.image} 
            alt={this.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-sm font-semibold text-slate-700">{this.category}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {this.serves}
        </div>
      </div>
      
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between">
          <span className="ont-semibold leading-none tracking-tight text-xl text-slate-800 group-hover:text-sky-600 transition-colors">
            {this.name}
          </span>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
          {this.description}
        </p>
        
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">Itens inclusos:</p>
          <div className="space-y-1">
            {this.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-800">{this.price}</span>
            <span className="text-sm text-slate-600 ml-1">por kit</span>
          </div>
          
          <div 
            className="gap-2 rounded-md p-2 items-center flex bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Gift className="w-4 h-4 mr-2" />
            Encomendar
          </div>
        </div>
      </div>
    </div>
    );
  };
};
