import React, {Component} from 'react';
import Spinner from '../UI/Spinner/Spinner';
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

      countDown = (deadline, finalMessage) => {
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
        let x = <Spinner/>;

        if (this.state.remainTime > 1){
            x = <h3>Faltan {this.state.remainDays} días - {this.state.remainHours} horas - {this.state.remainMinutes} minutos y {this.state.remainSeconds} segundos.</h3>
        } else {
            x = <h3>¡Ya es Navidad!</h3>
        }
        return (
          <div className="containerContador">
            <div>
                <h2>Tiempo que falta para Navidad!</h2>
            </div>
            <div>
                {x}
            </div>
          </div>
        );
      }
}



export default ContadorDeTiempo;