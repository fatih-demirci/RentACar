using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Transaction;
using Core.CrossCuttingConrens.Caching;
using Core.Entities.Concrete;
using Core.Entities.DTOs;
using Core.Utilities;
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

    public class UserManager : IUserService
    {
        IUserDal _userDal;
        IUserOperationClaimService _userOperationClaimService;
        ICacheManager _cacheManager;

        public UserManager(IUserDal userDal,
            IUserOperationClaimService userOperationClaimService)

        {
            _userDal = userDal;
            _userOperationClaimService = userOperationClaimService;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }

        [TransactionScopeAspect]
        [CacheRemoveAspect("IUserService.Get")]
        public IResult Add(User user)
        {
            user.Id = 0;
            _userDal.Add(user);
            _userOperationClaimService.Add(new UserOperationClaim() { OperationClaimId = 2, UserId = user.Id });
            return new SuccessResult(Messages.UserAdded);
        }

        [CacheRemoveAspect("IUserService.Get")]
        public IResult Delete(User user)
        {
            _userDal.Delete(user);
            return new SuccessResult(Messages.UserDeleted);
        }

        [CacheAspect]
        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll(), Messages.UsersListed);
        }

        [CacheAspect]
        public IDataResult<User> GetById(int id)
        {
            var user = _userDal.Get(u => u.Id == id);
            if (user == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }
            return new SuccessDataResult<User>(user, Messages.UserGotById);
        }

        [SecuredOperation("admin")]
        public IDataResult<UserDto> GetUserDtoByUserId(int userId)
        {
            int cacheUserId = Int32.Parse((string)_cacheManager.Get(CacheKeys.UserIdForClaim));
            var userDto = _userDal.GetUserDtoByUserId(cacheUserId);
            if (userDto == null)
            {
                return new ErrorDataResult<UserDto>(Messages.UserNotFound);
            }
            return new SuccessDataResult<UserDto>(userDto, Messages.UserGotById);
        }

        [CacheAspect]
        public IDataResult<User> GetByMail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Email == email));
        }

        public IDataResult<List<OperationClaim>> GetClaims(User user)
        {
            return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaims(user));
        }

        [CacheRemoveAspect("IUserService.Get")]
        public IResult Update(User user)
        {
            _userDal.Update(user);
            return new SuccessResult(Messages.UserUpdated);
        }
    }
}
