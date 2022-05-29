using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.Aspects.Autofac.Transaction;
using Core.CrossCuttingConrens.Caching;
using Core.Entities.Concrete;
using Core.Utilities;
using Core.Utilities.Business;
using Core.Utilities.IoC;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.JWT;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private IUserService _userService;
        private ITokenHelper _tokenHelper;
        private ICustomerService _customerService;
        private ICacheManager _cacheManager;

        public AuthManager(IUserService userService, ITokenHelper tokenHelper, ICustomerService customerService)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
            _customerService = customerService;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }

        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto)
        {
            var userExists = UserExists(userForRegisterDto.Email);
            if (!userExists.Success)
            {
                return new ErrorDataResult<User>(userExists.Message);
            }

            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(userForRegisterDto.Password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };
            _userService.Add(user);
            return new SuccessDataResult<User>(user, Messages.UserRegistered);
        }

        [TransactionScopeAspect]
        public IDataResult<User> RegisterForCustomer(CustomerForRegisterDto customerForRegisterDto)
        {

            var registerResult = Register(new UserForRegisterDto() { Email = customerForRegisterDto.Email, FirstName = customerForRegisterDto.FirstName, LastName = customerForRegisterDto.LastName, Password = customerForRegisterDto.Password });
            if (!registerResult.Success)
            {
                return registerResult;
            }
            _customerService.Add(new Customer() { Id = 0, CompanyName = customerForRegisterDto.CompanyName, UserId = registerResult.Data.Id });
            return new SuccessDataResult<User>(registerResult.Data, Messages.UserRegistered);
        }

        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            var userToCheck = _userService.GetByMail(userForLoginDto.Email);
            if (userToCheck.Data == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }

            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password, userToCheck.Data.PasswordHash, userToCheck.Data.PasswordSalt))
            {
                return new ErrorDataResult<User>(Messages.PasswordError);
            }

            return new SuccessDataResult<User>(userToCheck.Data, Messages.SuccessfulLogin);
        }

        [SecuredOperation("admin,user")]
        public IResult ChangePassword(string oldPassword, string newPassword)
        {
            var cacheUserId = HttpContextAccessorManager.GetUserId();
            var userResult = _userService.GetById(cacheUserId);

            if (!userResult.Success)
            {
                return new ErrorResult(userResult.Message);
            }

            if (!HashingHelper.VerifyPasswordHash(oldPassword, userResult.Data.PasswordHash, userResult.Data.PasswordSalt))
            {
                return new ErrorResult(Messages.PasswordError);
            }

            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(newPassword, out passwordHash, out passwordSalt);

            userResult.Data.PasswordHash = passwordHash;
            userResult.Data.PasswordSalt = passwordSalt;

            var userUpdateResult = _userService.Update(userResult.Data);

            if (!userUpdateResult.Success)
            {
                return userUpdateResult;
            }

            return new SuccessResult(Messages.PasswordChanged);
        }

        public IResult UserExists(string email)
        {
            if (_userService.GetByMail(email).Data != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }

        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaims(user);
            var accessToken = _tokenHelper.CreateToken(user, claims.Data);
            return new SuccessDataResult<AccessToken>(accessToken, Messages.AccessTokenCreated);
        }

        [SecuredOperation("admin")]
        public IResult IsAuthorizedAdmin()
        {
            return new SuccessResult();
        }

        [SecuredOperation("user")]
        public IResult IsAuthorizedUser()
        {
            return new SuccessResult();
        }

        [SecuredOperation("admin,user")]
        public IResult IsAuthenticated()
        {
            return new SuccessResult();
        }
    }
}
