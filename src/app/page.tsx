'use client';
import { Carousel } from '@/components/Home/carousel';
import { Product } from '@/components/Product/Product';
import { Category } from '@/components/Product/Category';
import { Galery } from '@/components/Home/galery';
import { ChefHat, Award, Users, Star, Heart } from 'lucide-react';


import sweet from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.03 (1).jpeg'
import doce from '@/../public/ensaios/galery/WhatsApp Image 2025-06-23 at 18.48.45 (1).jpeg'
import especial from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.51.48.jpeg'

import profile from '@/../public/profile.jpg'

const AboutMe = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white/80 to-sky-50/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Sobre mim</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conheça a história por trás de cada doce especial
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-2xl shadow-xl flex items-center overflow-hidden justify-center">
                  <div className="text-center">
                    <img src={profile.src}/>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-600/10 rounded-full blur-xl"></div>
              </div>
            </div>
            {/* Story content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-slate-800 mb-4">Minha Jornada Doce</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Olá! Sou a Chef Politti, e minha paixão pela confeitaria começou ainda na infância, 
                    observando minha avó preparar doces tradicionais na cozinha de casa. O que começou 
                    como curiosidade se transformou em uma verdadeira vocação.
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 leading-relaxed">
                    Há mais de 10 anos me dedico à arte da confeitaria artesanal, combinando receitas 
                    familiares tradicionais com técnicas modernas e ingredientes selecionados. Cada doce 
                    que sai da minha cozinha carrega não apenas sabor, mas também história e carinho.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">+10 Anos</h4>
                      <p className="text-sm text-slate-600">de experiência em confeitaria artesanal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">+500 Clientes</h4>
                      <p className="text-sm text-slate-600">felizes com momentos adoçados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Test = () => {
  return (
    <section style={{backgroundColor: '#e5e7eb'}} className="py-20 bg-white/50 backdrop-blur-sm">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif text-slate-800 mb-4">Por que escolher The Politti's?</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Cada doce é uma obra de arte, feito com ingredientes selecionados e muito carinho
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
         
            <Heart className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Feito com Amor</h3>
          <p className="text-slate-600">
            Cada receita é preparada com ingredientes frescos e o carinho de uma tradição familiar
          </p>
        </div>
      </div>
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
           
           <Star className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Qualidade Premium</h3>
          <p className="text-slate-600">
            Utilizamos apenas os melhores ingredientes para garantir sabor e qualidade únicos
          </p>
        </div>
      </div>
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
           
           <ChefHat className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Tradição Artesanal</h3>
          <p className="text-slate-600">
            Técnicas tradicionais combinadas com criatividade moderna para criar doces únicos
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}


const Location = () => {

  return (
    <section className="container mx-auto mb-12 px-4 py-8">
      <h2 className="text-2xl font-semibold text-custom-black mt-10 mb-10 text-center">Nossa localização</h2>
      <div className="w-full rounded-none overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16873.929268997734!2d-51.398757632583596!3d-22.12413623033236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9493f4fbf6bb24b1%3A0xd4d0285217fd07e1!2sCentro%2C%20Pres.%20Prudente%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1750714066274!5m2!1spt-BR!2sbr"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Politti"
        />
      </div>
    </section>
  )
}


const MenuSession = () => {

  return(
    <section className="py-20 bg-white/50 backdrop-blur-sm">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif text-slate-800 mb-4">Nossas Especialidades</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Descubra nossa variedade de doces artesanais, cada um feito com carinho e ingredientes especiais
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
          <img
            src={sweet.src}
            className="w-full h-full object-cover"
            alt="Bolo artesanal"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Bolos Artesanais</h3>
          <p className="text-slate-600 mb-4">
            Bolos únicos e personalizados para ocasiões especiais. Desde sabores clássicos até criações exclusivas.
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Bolo de Chocolate Belga</li>
            <li>• Red Velvet Gourmet</li>
            <li>• Naked Cake com Frutas</li>
            <li>• Bolo de Cenoura Premium</li>
          </ul>
        </div>
      </div>
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
          <img
            src={doce.src}
            className="w-full h-full object-cover"
            alt="Bolo artesanal"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Doces Finos</h3>
          <p className="text-slate-600 mb-4">
            Pequenas delícias que despertam grandes sorrisos. Perfeitos para presentear ou saborear.
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Brigadeiros Gourmet</li>
            <li>• Macarons Franceses</li>
            <li>• Trufas Artesanais</li>
            <li>• Beijinhos Premium</li>
          </ul>
        </div>
      </div>
      <div className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sky-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
          <img
            src={especial.src}
            className="w-full h-full object-cover"
            alt="Bolo artesanal"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Sobremesas Especiais</h3>
          <p className="text-slate-600 mb-4">
            Criações únicas que combinam tradição e inovação para momentos verdadeiramente especiais.
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Pavê de Chocolate</li>
            <li>• Cheesecake Artesanal</li>
            <li>• Torta de Limão Siciliano</li>
            <li>• Mousse de Maracujá</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center mt-12">
      <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" type="button">
        Ver Cardápio Completo
      </button>
    </div>
  </div>
</section>

  )
}

export default function Home() {
  return (
    <main className='w-100% mx-auto px-0'>
      <Carousel/>
      <div className='bg-white mb-12 py-8'>
        <Test/>
        <AboutMe/>
        <MenuSession/>
        <Galery/>
       {/* <Destaque prod={gridProd}/> */}
        <Location/>
      </div>
    </main>
  );
}
