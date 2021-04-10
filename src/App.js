import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardColumns, Modal, Button } from 'react-bootstrap';
import config from './config.js';
import ReactCardFlip from 'react-card-flip';
import arrayShuffle from 'array-shuffle';
import currencyFormatter from 'currency-formatter';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './App.css';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

const quantityCards = config.totalCards;
const generateCards = (quantity) => {
  const result = config.gifts.map(element => {
    return {
      value: parseInt(element),
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Salir</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [oportunities, setOportunities] = useState(config.oportunities + 1);
  const [gift, setGift] = useState(0);
  const [isFlipped, setIsFlipped] = useState(Array(10).fill(false, 0, 10));
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalBodyText, setModalBodyText] = useState('');

  useEffect(() => {
    const oportunitiesAux = oportunities;
    setOportunities(oportunitiesAux - 1);
  }, [isFlipped]);

  useEffect(() => {
    console.log(oportunities);
    if (oportunities === 0) {
      if (gift !== 0) {
        setModalHeaderText('Felicidades');
        setModalBodyText('Felicidades');
      } else {
        setModalHeaderText('Ooops :(');
        setModalBodyText(`Lo Siento ${config.name}, espero que el próximo año tengas mejor suerte`);
      }
    }
  }, [oportunities, gift]);

  useEffect(() => {
    if (oportunities === 0) {
      setModalShow(true);
      console.log(config.request);
      axios.post(config.request, {
        gift: gift,
      })
      .then(function (response) {
        console.log('Gift received');
      })
      .catch(function (error) {
        alert('ha ocurrido un error');
      });
    }
  }, [modalHeaderText, modalBodyText]);



  const flipCard = (index, value, isGift) => {
    const isFlippedAux = isFlipped.slice(0);
    isFlippedAux[index] = !isFlippedAux[index];
    setIsFlipped(isFlippedAux);
    if (isGift) {
      setGift(gift + value);
    }
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header={modalHeaderText}
        content={modalBodyText}
      />

      <Container>
        <Row>
          <Col className="text-center">
            <h1> Feliz Cumpleaños <b>{config.name}</b></h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Oportunidades: {oportunities}</p>
            <p>Regalo obtenido:{currencyFormatter.format(gift, { code: 'CLP', precision: 0, })}</p>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
        <Row>
          <Col>
            <CardColumns>
              {cards.map(function (card, index) {
                return <Card key={index}>
                  <Card.Body>
                    <ReactCardFlip isFlipped={!isFlipped[index]} flipDirection="vertical">
                      <div className={'front-card text-center d-flex justify-content-center align-content-center flex-wrap border'}>

                        {card.isGift &&
                          <h2>
                            {currencyFormatter.format(card.value, { code: 'CLP', precision: 0, })}
                          </h2>
                        }
                        {!card.isGift &&
                          <h2>
                            <FontAwesomeIcon icon={card.value} />
                          </h2>
                        }
                      </div>
                      <div className={'back-card text-center d-flex justify-content-center align-content-center flex-wrap border'}>
                        {oportunities > 0 &&
                          < button onClick={() => flipCard(index, card.value, card.isGift)}>
                          </button>
                        }
                      </div>

                    </ReactCardFlip>
                  </Card.Body>
                </Card>
              })}

            </CardColumns>
          </Col>
        </Row>
      </Container >
    </>
  );
}

export default App;
