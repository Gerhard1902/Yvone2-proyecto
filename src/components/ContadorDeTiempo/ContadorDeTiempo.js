import React, {Component} from 'react';
import './ContadorDeTiempo.css';

class ContadorDeTiempo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            remainTime: null,
            remainSeconds: null,
            remainMinutes: null,
            remainHours: null,
            remainDays: null,
        };
      }
    
      componentDidMount() {
          this.countDown('Dec 25 2019 00:00:00 GMT-0600');
      }

      getRemainTime = deadline => {
        let now = new Date(); 
        let remainTime = (new Date(deadline) - now + 1000 )/1000;
        let remainSeconds =  ('0' + Math.floor(remainTime % 60)).slice(-2);
        let remainMinutes =  ('0' + Math.floor((remainTime / 60) % 60)).slice(-2);
        let remainHours =  ('0' + Math.floor((remainTime / 3600) % 24)).slice(-2);
        let remainDays =  Math.floor(remainTime / (3600 * 24));

        return {
            remainTime,
            remainSeconds,
            remainMinutes,
            remainHours,
            remainDays
        }
      }

      countDown = (deadline) => {
          let timeUpdate = setInterval( () => {
              let t = this.getRemainTime(deadline);
              this.setState({
                remainTime: t.remainTime,
                remainSeconds: t.remainSeconds,
                remainMinutes: t.remainMinutes,
                remainHours: t.remainHours,
                remainDays: t.remainDays,
              });
          }, 1000 );
      }
    
      render() {
        return (
          <div className="containerContador">
            <div>
                <h2>Faltan</h2>
            </div>
            <div className="tiempoRestante">
                <div className="unidades">
                    <h2>Días</h2>
                    <h2>Horas</h2>
                    <h2>Minutos</h2>
                    <h2>Segundos</h2>
                </div>
                <div className="unidades">
                    <h2 className="numero">{this.state.remainDays}</h2>
                    <h2 className="numero">{this.state.remainHours}</h2>
                    <h2 className="numero">{this.state.remainMinutes}</h2>
                    <h2 className="numero">{this.state.remainSeconds}</h2>
                </div>
            </div>
            <div>
                <h2>Para Navidad</h2>
            </div>
          </div>
        );
      }
}

export default ContadorDeTiempo;