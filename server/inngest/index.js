import { Inngest } from "inngest";
import User from "../models/User.js"
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import sendEmail from "../configs/nodeMailer.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest funtion to save user data to database
const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk"},
    { event: "clerk/user.created"},
    async ( { event } ) =>{
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData ={
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            image: image_url,
        }

        await User.create(userData);

    }
)

//Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk"},
    { event: "clerk/user.deleted"},
    async ( { event } ) =>{
        const { id } = event.data
        await User.findByIdAndDelete(id);
    }
)

//Inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk"},
    { event: "clerk/user.updated"},
    async ( { event } ) =>{
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData ={
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            image: image_url

        }
        await User.findByIdAndUpdate(id, userData);
    }
)


// Inngest funtion to cancel bookings and release the seats of show after 10 mins fo booking crated if payment is not made

const releaseSeatsAndDeleteBooking = inngest.createFunction(
    { id: "release-seats-delete-booking"},
    { event: "app/checkpayment"},
    async ( { event, step }) =>{
        const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

        await step.run('check-payment-status', async () =>{
            const bookingId = event.data.bookingId;

            const booking = await Booking.findById(bookingId);

            // If booking doesn't exist (already deleted or paid), skip
            if (!booking) {
                return;
            }

            //if payment is not made, release the seats and delete the booking
            if(!booking.isPaid){
                //delete the booking and release the seats
                const show = await Show.findById(booking.show);
                booking.bookedSeats.forEach((seat)=>{
                    delete show.occupiedSeats[seat];
                })
                show.markModified('occupiedSeats');
                await show.save();
                await Booking.findByIdAndDelete(booking._id);
            }
        })

    }
)

// Inngest function to send email to user after booking is created

const sendBookingConfirmationEmail = inngest.createFunction(
    {
        id: "send-booking-confirmation-email"},
        {event: "app/show.booked"},
    async ( { event, step } ) =>{
        const {bookingId} = event.data;

        const booking = await step.run('fetch-booking', async () => {
            const bookingData = await Booking.findById(bookingId).populate({path: 'show', populate: {path: 'movie', model: 'Movie'}}).populate('user');
            
            if (!bookingData) {
                throw new Error(`Booking not found for bookingId: ${bookingId}`);
            }
            if (!bookingData.user) {
                throw new Error(`User not found for bookingId: ${bookingId}`);
            }
            
            // Return serializable data for next step
            return {
                userEmail: bookingData.user.email,
                userName: bookingData.user.name,
                movieTitle: bookingData.show.movie.title,
                showDateTime: bookingData.show.showDateTime
            };
        });

        await step.run('send-email', async () => {
            console.log(`Sending booking confirmation email to ${booking.userEmail} for booking ${bookingId}`);
            
            const result = await sendEmail({ 
                to: booking.userEmail,
                subject: `Payment Confirmation: "${booking.movieTitle}" booked!`,
                body: `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Hi ${booking.userName},</h2>
        <p>Your booking for <strong style="color: #F84565;">"${booking.movieTitle}"</strong> is confirmed.</p>
        <p>
            <strong>Date:</strong> ${new Date(booking.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}<br/>
            <strong>Time:</strong> ${new Date(booking.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
        </p>
        <p>Enjoy the show! 🍿</p>
        <p>Thanks for booking with us!<br/>— QuickShow Team</p>
    </div>`
            });
            
            console.log(`Email sent successfully to ${booking.userEmail}, messageId: ${result.messageId}`);
            return result;
        });
    }
)


export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatsAndDeleteBooking, sendBookingConfirmationEmail];