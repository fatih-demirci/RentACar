using Business.Abstract;
using Business.Constants;
using Core.Aspects.Autofac.Transaction;
using Core.Entities.Concrete;
using Core.Utilities;
using Core.Utilities.Date;
using Core.Utilities.Payment;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        IRentalDal _rentalDal;
        IPaymentService _paymentService;
        ICarService _carService;

        public RentalManager(IRentalDal rentalDal, IPaymentService paymentService, ICarService carService)
        {
            _rentalDal = rentalDal;
            _paymentService = paymentService;
            _carService = carService;
        }

        [TransactionScopeAspect]
        public IResult Add(Rental rental, PaymentInformation paymentInformation)
        {
            rental.ReturnDate = DateTime.MinValue;
            if (rental.RentDate < DateTime.Now)
            {
                rental.RentDate = DateTime.Now;
            }
            rental.RequiredReturnDate = rental.RentDate.AddDays(paymentInformation.Total / _carService.GetCarDetailsById(rental.CarId).Data.DailyPrice);
            Console.WriteLine(rental.CarId);
            if (_rentalDal.Get(r => r.CarId == rental.CarId && r.ReturnDate == DateTime.MinValue && (
            (r.RentDate.CompareTo(rental.RentDate) <= 0 && r.RequiredReturnDate.CompareTo(rental.RentDate) >= 0) || (r.RentDate.CompareTo(rental.RequiredReturnDate) <= 0 && r.RequiredReturnDate.CompareTo(rental.RequiredReturnDate) >= 0)
        || ((rental.RentDate.CompareTo(r.RentDate) <= 0 && rental.RequiredReturnDate.CompareTo(r.RentDate) >= 0) || (rental.RentDate.CompareTo(r.RequiredReturnDate) <= 0 && rental.RequiredReturnDate.CompareTo(r.RequiredReturnDate) >= 0))
                                                                                                    )) != null)
            {
                return new ErrorResult(Messages.RentalCarAlreadyRented);
            }
            var paymentResult = _paymentService.Pay(paymentInformation);
            if (paymentResult.Success)
            {
                
                _rentalDal.Add(rental);
                return new SuccessResult(Messages.RentalAdded);
            }
            else
            {
                return new ErrorResult(Messages.PayError + " " + paymentResult.Message);
            }

        }

        public IResult Delete(Rental rental)
        {
            _rentalDal.Delete(rental);
            return new SuccessResult(Messages.RentalDeleted);
        }

        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.RentalsListed);
        }

        public IDataResult<Rental> GetById(int id)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r => r.Id == id), Messages.RentalGot);
        }

        public IResult Update(Rental rental)
        {
            _rentalDal.Update(rental);
            return new SuccessResult(Messages.RentalUpdated);
        }

        public IDataResult<List<RentalDetailDto>> GetRentalDetails()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetRentalDetails());
        }
    }
}
