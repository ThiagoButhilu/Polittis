// import {Product} from '@/app/components/Product'
// Update the import path below to the correct relative path if Product exists elsewhere:
import { Product } from '../../components/Product/Product';


const Banner = () => {
    return (
        <section className="text-center mb-12">
            <h1 className="font-parisienne text-5xl text-custom-black mb-2">The Politti's</h1>
            <p className="text-xl text-custom-black tracking-widest">DOCERIA</p>
        </section>
    )
}


const produto = new Product(
    1,
  'Bolo de Chocolate',
  'Bolo artesanal de chocolate',
    29.90,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvcsMx13GJiMgaMJVO97swRtA2MrGAGmwFiRHmGWfAxcU8X1BjmNNKKZ_s-nYIJGo7uORXWAmerHAFoHXaf_fEkLaoYqXlZ37QxtxgS8f_Dn3zkFPnSvNHmWKFxTz-hmQKpSeaGWd6x6RS-YSxtEBCeP60-lVTNs6PtpyiBdJHZ6qc_5OII0JRczpz-DrYIR8A5uYhrAWtqhxCUaYb8K6hfLUwxZMsPVaVvv8-tnNG4NVcoPOMsEbeGGGgAdIJRb2rt5Hdh2ykUp4'
);


const index = () => {
    return (
      <div>Teste</div>
    )
};

export default index;