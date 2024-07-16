import { React, useState, useEffect } from 'react';
import UserHeader from './UserHeader';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//import '../../styles/Login.css'
import '../../styles/Common.css'
import Footer from '../../common/Footer';
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
function BookingPage() {

    const { movieName, theatreName, noOfTicketsAvailable } = useParams();
    const [bookedSeats, setBookedSeats] = useState([]);
    const [loginId, setLoginId] = useState('');
    const [movieNames, setMovieNames] = useState({ movieName });
    const [theatreNames, setTheatreNames] = useState({ theatreName });
    const [noOfTickets, setNoOfTickets] = useState();
    const [seatNumbers, setSeatNumbers] = useState([]);
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { value } = event.target;
        const numbers = value.split(',').map(number => number.trim());
        setSeatNumbers(numbers);
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        if (noOfTicketsAvailable.toString() === '0') {
            alert("All Tickets Sold Out")
            navigate('/userHome')
        }
        else {
            if (noOfTickets.toString() > noOfTicketsAvailable.toString()) {
                alert(`Only ${noOfTicketsAvailable.toString()} seats available`)
            } else {
                if (noOfTickets === seatNumbers.length) {
                    if (bookedSeats.includes(seatNumbers)) {
                        alert("seat already booked")
                    } else {
                        axios.post(`http://localhost:8080/api/v1.0/moviebooking/${movieName}/add`, {
                            loginId: localStorage.getItem('loginId'),
                            movieName: movieName,
                            theatreName: theatreName,
                            noOfTickets: noOfTickets,
                            seatNumber: seatNumbers
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        }
                        )
                            .then((response) => {
                                console.log(response.data);
                                alert("Ticket Booked")
                                navigate('/userHome')
                            })
                            .catch((error) => {
                                console.error("Error Booking Tickets:", error);
                            });
                    }
                } else {
                    alert("Number of Seats Booked is not equal to Number of Tickets selected")
                }
            }
        }
    }



    const fetchBookedTickets = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1.0/moviebooking/getallbookedtickets/${movieName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = response.data;
            const seats = data.flatMap((ticket) => ticket.seatNumber);
            setBookedSeats(seats.toString());
            console.log(seats.toString());

        } catch (error) {
            console.log("Error in fetching tickets", error)
        }
    }

    useEffect(() => {
        fetchBookedTickets();
    }, []);
    return (
        <>
            <main>
                <UserHeader />
                <div className='container-fluid'>
                    <h1 className='headings'> Book Ticket</h1>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col className='md-6'>
                                <form className="centered-form border" onSubmit={handleSubmit}>
                                    <div className='form-group md-6'>
                                        <label className='label-form' htmlFor='loginId'>Login ID:</label>
                                        <span className='space'></span>
                                        <input
                                            className="form-control"
                                            id='loginId'
                                            name='loginId'
                                            value={localStorage.getItem('loginId')}
                                            onChange={(event) => {
                                                setLoginId(event.target.value);
                                            }}
                                            readOnly />
                                    </div>
                                    <div className='form-group'>
                                        <label className='label-form' htmlFor='movieNames'>Movie Name:</label>
                                        <span className='space'></span>
                                        <input
                                            className="form-control"
                                            id='movieNames'
                                            name='movieNames'
                                            value={movieName}
                                            onChange={(event) => {
                                                setMovieNames(event.target.value);
                                            }}
                                            readOnly />
                                    </div>
                                    <div className='form-group'>
                                        <label className='label-form' htmlFor='theatreNames'>Theatre Name:</label>
                                        <span className='space'></span>
                                        <input
                                            className="form-control"
                                            id='theatreNames'
                                            name='theatreNames'
                                            value={theatreName}
                                            onChange={(event) => {
                                                setTheatreNames(event.target.value);
                                            }}
                                            readOnly />
                                    </div>
                                    <div className='form-group'>
                                        <label className='label-form' htmlFor='noOfTickets'>Number Of Tickets:</label>
                                        <span className='space'></span>
                                        <input
                                            type='number'
                                            className="form-control"
                                            id='noOfTickets'
                                            name='noOfTickets'
                                            value={noOfTickets}
                                            onChange={(event) => {
                                                const { value } = event.target;
                                                setNoOfTickets(Number(value));
                                            }}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label className='label-form' htmlFor='seatNumbers'>Seat Numbers:</label>
                                        <span className='space'></span>
                                        <input
                                            type='text'
                                            className="form-control"
                                            id='seatNumbers'
                                            name='seatNumbers'
                                            value={seatNumbers.join(',')}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='text-center booked'>
                                    <button  type='submit' className='button-book'>Book Ticket</button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </main>
            <Footer />

        </>
    );
};

export default BookingPage;