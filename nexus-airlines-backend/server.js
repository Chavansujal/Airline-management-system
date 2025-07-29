const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nexus-airlines')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    address: String,
    dob: String,
    departureCity: String,
    destinationCity: String,
    departureDate: String,
    returnDate: String,
    passengers: Number,
    amount: Number,
    email: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Email Transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sujalchavan103@gmail.com',
        pass: 'henb ngvu iztq kvli',
    },
    tls: { rejectUnauthorized: false },
});

// Send General Email
app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: 'sujalchavan103@gmail.com',
        to: email,
        subject: 'Welcome to Nexus Airlines!',
        html: `<pre>${message}</pre>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).send('Error sending email');
    }
});

// Booking Confirmation
app.post('/send-confirmation-email', async (req, res) => {
    const { email, bookingDetails } = req.body;

    if (!email) return res.status(400).send('Email is required');

    const message = `
        Thank you for your booking! Here are your details:
        Name: ${bookingDetails.name}
        Mobile: ${bookingDetails.mobile}
        Address: ${bookingDetails.address}
        DOB: ${bookingDetails.dob}
        From: ${bookingDetails.departureCity}
        To: ${bookingDetails.destinationCity}
        Departure: ${bookingDetails.departureDate}
        Return: ${bookingDetails.returnDate}
        Passengers: ${bookingDetails.passengers}
        Amount Paid: Rs ${bookingDetails.paymentAmount}
    `;

    const mailOptions = {
        from: 'sujalchavan103@gmail.com',
        to: email,
        subject: 'Booking Confirmation - Nexus Airlines',
        html: `<pre>${message}</pre>`,
    };

    const booking = new Booking({ ...bookingDetails, amount: bookingDetails.paymentAmount, email });

    try {
        await booking.save();
        await transporter.sendMail(mailOptions);
        res.status(200).send('Confirmation email sent successfully');
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).send('Error processing booking');
    }
});

// Booking History
app.get('/booking-history', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving booking history');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
