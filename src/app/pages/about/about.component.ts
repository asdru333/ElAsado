import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/content';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  index: number;
  aboutList: Content[];
  content: Content;

  text1 : string = 'En nuestro restaurante, la carne es la estrella indiscutible y nos enorgullecemos de servir cortes selectos y de la más alta calidad, ' +
  'provenientes de fuentes responsables y cuidadosamente seleccionadas. Nuestra dedicación a la carne va más allá de la cocina, ya que trabajamos ' +
  'estrechamente con productores locales para asegurar la frescura y sostenibilidad de nuestros ingredientes.\n\n' +
  'Nuestra carta ofrece una amplia variedad de carnes para todos los gustos: desde cortes clásicos que nunca pasan de moda hasta opciones innovadoras que ' +
  'desafían los límites de la creatividad culinaria. Además, pensando en la satisfacción de todos nuestros comensales, también ofrecemos opciones vegetarianas ' +
  'y deliciosos platos acompañantes para complementar la experiencia culinaria.\n\n' +
  'Nos apasiona brindar momentos inolvidables a nuestros clientes, ya sea que estés celebrando una ocasión especial, compartiendo una velada romántica o simplemente ' +
  'disfrutando de una comida con amigos y familiares.'

  text2: string = 'La historia de nuestro restaurante de carnes es una emocionante travesía llena de pasión, dedicación y sueños hechos realidad. '+
  'Todo comenzó hace más de una década cuando dos amigos, amantes de la gastronomía y apasionados por la carne, decidieron unir fuerzas para crear algo extraordinario.\n\n'+
  'Con una visión clara en mente, se embarcaron en un viaje para ofrecer a los comensales una experiencia culinaria única centrada en la carne de la más alta calidad y en ' +
  'técnicas de preparación excepcionales. Así, tras meses de planificación y búsqueda de la ubicación perfecta, finalmente abrieron las puertas de nuestro restaurante.\n\n' +
  'En sus comienzos, el restaurante era modesto, pero con cada plato que servían, su reputación creció rápidamente. Los clientes quedaban maravillados con la calidad de ' +
  'las carnes, la atención al detalle y la pasión que los chefs y el personal transmitían en cada comida.'

  text3: string = 'En nuestro restaurante de carnes, nuestros valores son la columna vertebral que sostiene cada plato que servimos y cada sonrisa que recibimos. ' +
  'Nos guiamos por la pasión, el respeto y la excelencia en cada aspecto de nuestra labor culinaria.\n\n' +
  'La pasión es el fuego que enciende nuestras cocinas. Nos apasiona la carne y la cocina, y eso se traduce en cada preparación que realizamos. Cada corte es tratado ' +
  'con devoción y cada plato es concebido con un amor genuino por los sabores y las texturas que deleitarán a nuestros comensales.\n\n' +
  'El respeto es el pilar de nuestras relaciones con los productores, los clientes y nuestro equipo. Valoramos la calidad y la sostenibilidad de nuestros ingredientes, ' +
  'trabajando en colaboración con productores locales que comparten nuestra visión. También apreciamos a nuestros clientes, sus gustos y necesidades, brindándoles un ' +
  'servicio atento y cálido que los haga sentir bienvenidos.\n\n' +
  'La excelencia es nuestro norte en todo lo que hacemos. Desde la selección de las mejores carnes hasta la creatividad en cada receta, nos esforzamos por superar las ' +
  'expectativas y alcanzar la perfección en cada plato. Nuestros chefs son maestros de su oficio, y cada miembro del equipo se esfuerza por ofrecer una experiencia ' +
  'gastronómica inigualable.'

  text4: string = 'La misión de nuestro restaurante de carnes es deleitar a nuestros comensales con una experiencia culinaria excepcional, donde la pasión por la carne ' +
  'y la excelencia gastronómica se unen en cada plato. Nos esforzamos por ser un referente en la industria, ofreciendo cortes de carne selectos y de la más alta calidad, ' +
  'preparados con maestría por nuestro equipo de chefs apasionados.\n\n' +
  'Buscamos honrar la esencia de cada ingrediente, trabajando de la mano con productores locales y promoviendo prácticas sostenibles en nuestra cocina. Deseamos que ' +
  'nuestros clientes sientan el cariño y respeto que ponemos en cada preparación, haciéndolos parte de nuestra familia desde el momento en que cruzan nuestras puertas.\n\n' +
  'Nuestra misión va más allá de la cocina; queremos crear momentos inolvidables para nuestros comensales, celebrando ocasiones especiales y siendo cómplices de recuerdos ' +
  'compartidos. Nos enorgullece ser un lugar donde las emociones y sabores se entrelazan para brindar una experiencia única y auténtica.'

  constructor() {
    this.index = 0;
    this.aboutList = [{img: 'https://1201atl.com/wp-content/uploads/elementor/thumbs/AdobeStock_203398434-scaled-pvcyy6h3v4awqst3u1zdfen9l84qrx3hsxkln04d1s.jpeg',
    text: this.text1}, {img: 'https://img.freepik.com/foto-gratis/hombre-cocinar-carne-cocina_155003-2701.jpg', text: this.text2},
    {img: 'https://media.istockphoto.com/id/178075550/photo/waiter-and-chef-discussing-the-menu.jpg?s=612x612&w=0&k=20&c=4y4pF6-RXP0EYUVbKf9JUIW_InO_JO99b_Os4goyXE4=',
    text: this.text3}, {img: 'https://i.insider.com/51759c4decad04a93100000a?width=1000&format=jpeg&auto=webp', text: this.text4}];
    this.content = this.aboutList[this.index];
  }

  changeIndex(newIndex: number) {
    this.index = newIndex;
    if (this.index < this.aboutList.length) {
      this.content = this.aboutList[this.index];
    }
  }
}
