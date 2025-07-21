const {Booking} = require('../models/index');
const {AppError, ValidationError} = require('../utils/errors/index');
const {StatusCodes} = require('http-status-codes');

class BookingRepository {
    async create(data){
        try {
             const booking = await Booking.create(data);
             return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            // console.log('Something went wrong in Repository Layer.');
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue in creating the Booking, please try again later.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // async update(bookingId, data){
    //     try {
    //         // await Booking.update(data,{
    //         //     where:{
    //         //         id:bookingId
    //         //     }
    //         // });
    //         // return true;

    //         const booking = await Booking.findByPk(bookingId);
    //         if(data.status){
    //             booking.status = data.status;
    //         }
    //         if(data.flightId){
    //             booking.flightId = data.flightId;
    //         }
    //         await booking.save();
    //         return booking;
    //     } catch (error) {
    //         throw new AppError(
    //             'RepositoryError',
    //             'Cannot update the  Booking',
    //             'There was some issue in updating the Booking, please try again later.',
    //             StatusCodes.INTERNAL_SERVER_ERROR
    //         );
    //     }

    // }
}

module.exports = BookingRepository;