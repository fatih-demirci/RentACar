using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.CrossCuttingConrens.Caching;
using Core.Entities.Concrete;
using Core.Utilities;
using Core.Utilities.IoC;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        ICustomerDal _customerDal;
        IUserService _userService;
        ICacheManager _cacheManager;

        public CustomerManager(ICustomerDal customerDal,
            IUserService userService)
        {
            _customerDal = customerDal;
            _userService = userService;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }

        public IResult Add(Customer customer)
        {
            _customerDal.Add(customer);
            return new SuccessResult(Messages.CustomerAdded);
        }

        public IResult Delete(Customer customer)
        {
            _customerDal.Delete(customer);
            return new SuccessResult(Messages.CustomerDeleted);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            return new SuccessDataResult<List<Customer>>(_customerDal.GetAll(), Messages.CustomersListed);
        }

        public IDataResult<Customer> GetById(int id)
        {
            var customer = _customerDal.Get(c => c.Id == id);
            if (customer == null)
            {
                return new ErrorDataResult<Customer>(Messages.UserNotFound);
            }
            return new SuccessDataResult<Customer>(customer, Messages.CustomerGot);
        }

        [SecuredOperation("user")]
        public IDataResult<Customer> GetByUserId(int userId)
        {
            var cacheId = Convert.ToInt32(_cacheManager.Get(CacheKeys.UserIdForClaim));
            var userResult = _userService.GetById(cacheId);
            if (!userResult.Success)
            {
                return new ErrorDataResult<Customer>(Messages.UserNotFound);
            }
            var customer = _customerDal.Get(c => c.UserId == cacheId);
            if (customer == null)
            {
                return new ErrorDataResult<Customer>(Messages.UserNotFound);
            }
            return new SuccessDataResult<Customer>(customer);
        }

        [SecuredOperation("user")]
        public IDataResult<CustomerDto> GetCustomerDtoByUserId(int userId)
        {
            int cacheUserId = Int32.Parse((string)_cacheManager.Get(CacheKeys.UserIdForClaim));
            var customerDto = _customerDal.GetCustomerDtoByUserId(cacheUserId);
            if (customerDto == null)
            {
                return new ErrorDataResult<CustomerDto>(Messages.UserNotFound);
            }
            return new SuccessDataResult<CustomerDto>(customerDto, Messages.CustomerGot);
        }

        [SecuredOperation("user")]
        public IResult Update(Customer customer)
        {
            var cacheUserId = Convert.ToInt32(_cacheManager.Get(CacheKeys.UserIdForClaim));
            var customerResult = GetByUserId(cacheUserId);

            customer.Id = customerResult.Data.Id;
            customer.UserId = customerResult.Data.UserId;
            customer.CreditCardId = customerResult.Data.CreditCardId;

            _customerDal.Update(customer);
            return new SuccessResult(Messages.CustomerUpdated);
        }
    }
}
