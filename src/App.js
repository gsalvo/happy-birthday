import { useState } from 'react';
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';
import config from './config.js';
import ReactCardFlip from 'react-card-flip';
import arrayShuffle from 'array-shuffle';
import currencyFormatter from 'currency-formatter';
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './App.css';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

const quantityCards = config.totalCards;
const generateCards = (quantity) => {
  const result = config.gifts.map(element => {
    return {
      value: element,
      isGift: true,
    }
  });
  const maxCards = quantity - result.length;
  for (let i = 0; i < maxCards; i++) {
    result.push({
      value: config.penalty[Math.floor(Math.random() * 10)],
      isGift: false,
    });
  }
  return arrayShuffle(result);
};
const cards = generateCards(quantityCards); 



function App() {
  
  const [oportunities, setOportunities] = useState(config.oportunities);
  const [isFlipped, setIsFlipped] = useState(Array(10).fill(false, 0, 10));
  const [email, setEmail] = useState('');    
  
  

  const flipCard = (index) => {
    const isFlippedAux = isFlipped.slice(0);
    isFlippedAux[index] = !isFlippedAux[index];
    setIsFlipped(isFlippedAux);
    const oportunitiesAux = oportunities;
    setOportunities(oportunitiesAux - 1);
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1> Feliz Cumpleaños <b>{config.name}</b></h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Oportunidades: {oportunities}</p>
        </Col>
      </Row>
      <Row>
        <Col>

        </Col>
      </Row>
      <Row>
        <CardColumns>
          {cards.map(function (card, index) {            
            return <Card>
              <Card.Body>
                <ReactCardFlip isFlipped={!isFlipped[index]} flipDirection="vertical">
                  <div className={'front-card text-center align-middle'}>
                  {card.isGift &&
                    <h2>
                      {currencyFormatter.format(card.value, { 
                        symbol: '$', 
                        decimalDigits: 0,
                        thousand: '.',
                        precision: 0,
                      })}
                    </h2>
                  }
                  {!card.isGift &&
                    <h2>
                      <FontAwesomeIcon icon={card.value} />                      
                    </h2>
                  }          
                  </div>
                  <div className={'back-card'}>
                    
          <button onClick={() => flipCard(index)}>Click to flip</button>
                  </div>
                </ReactCardFlip>
              </Card.Body>
            </Card>
          })}

        </CardColumns>
      </Row>
    </Container>
  );
}

export default App;
