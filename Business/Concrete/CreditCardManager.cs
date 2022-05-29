using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules;
using Core.Aspects.Autofac.Transaction;
using Core.Aspects.Autofac.Validation.FluentValidation;
using Core.CrossCuttingConrens.Caching;
using Core.Entities.Concrete;
using Core.Utilities;
using Core.Utilities.Business;
using Core.Utilities.IoC;
using DataAccess.Abstract;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CreditCardManager : ICreditCardService
    {
        private ICreditCardDal _creditCardDal;
        private ICustomerService _customerService;

        public CreditCardManager(ICreditCardDal creditCardDal,
            ICustomerService customerService)
        {
            _creditCardDal = creditCardDal;
            _customerService = customerService;
        }

        [ValidationAspect(typeof(CreditCardValidator))]
        [TransactionScopeAspect]
        [SecuredOperation("user")]
        public IResult Add(CreditCard creditCard, int customerId)
        {
            var cacheUserId = HttpContextAccessorManager.GetUserId();
            var customerResult = _customerService.GetByUserId(cacheUserId);
            if (!customerResult.Success)
            {
                return customerResult;
            }

            creditCard.Id = customerResult.Data.CreditCardId;

            if (customerResult.Data.CreditCardId != 0)
            {
                return Update(creditCard);
            }
            _creditCardDal.Add(creditCard);
            customerResult.Data.CreditCardId = creditCard.Id;
            var customerUpdateResult = _customerService.Update(customerResult.Data);
            if (!customerUpdateResult.Success)
            {
                return customerUpdateResult;
            }

            return new SuccessResult(Messages.CreditCardAdded);
        }

        [SecuredOperation("user")]
        [TransactionScopeAspect]
        public IResult Delete(CreditCard creditCard)
        {
            var cacheUserId = HttpContextAccessorManager.GetUserId();
            _creditCardDal.Delete(creditCard);
            var customerResult = _customerService.GetByUserId(cacheUserId);
            customerResult.Data.CreditCardId = 0;
            _customerService.Update(customerResult.Data);
            return new SuccessResult(Messages.CreditCardDeleted);
        }

        public IDataResult<List<CreditCard>> GetAll()
        {
            var result = _creditCardDal.GetAll();
            return new SuccessDataResult<List<CreditCard>>(result, Messages.CreditCardsGot);
        }

        [SecuredOperation("user")]
        public IDataResult<CreditCard> GetById(int id)
        {
            var cacheUserId = HttpContextAccessorManager.GetUserId();
            var customerResult = _customerService.GetByUserId(cacheUserId);
            if (!customerResult.Success)
            {
                return new ErrorDataResult<CreditCard>(customerResult.Message);
            }
            var result = _creditCardDal.Get(c => c.Id == customerResult.Data.CreditCardId);
            if (result == null)
            {
                return new ErrorDataResult<CreditCard>(Messages.CreditCardNotFound);
            }
            return new SuccessDataResult<CreditCard>(result, Messages.CreditCardGotById);
        }

        [SecuredOperation("user")]
        public IDataResult<CreditCard> GetByUserId(int userId)
        {

            var cacheUserId = HttpContextAccessorManager.GetUserId();
            var customerResult = _customerService.GetByUserId(cacheUserId);
            if (!customerResult.Success)
            {
                return new ErrorDataResult<CreditCard>(customerResult.Message);
            }

            var creditCard = _creditCardDal.Get(cc => cc.Id == customerResult.Data.CreditCardId);

            if (creditCard == null)
            {
                return new ErrorDataResult<CreditCard>(Messages.CreditCardNotFound);
            }

            return new SuccessDataResult<CreditCard>(creditCard, Messages.CreditCardGotById);

        }

        [SecuredOperation("user")]
        public IResult Update(CreditCard creditCard)
        {
            var cacheUserId = HttpContextAccessorManager.GetUserId();
            var customerResult = _customerService.GetByUserId(cacheUserId);

            if (!customerResult.Success)
            {
                return new ErrorResult(customerResult.Message);
            }

            if (creditCard.Id == customerResult.Data.CreditCardId)
            {
                _creditCardDal.Update(creditCard);
                return new SuccessResult(Messages.CreditCardUpdated);
            }

            return new ErrorResult(Messages.AuthorizationDenied);
        }
    }
}
