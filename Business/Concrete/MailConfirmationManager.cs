using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.Aspects.Autofac.Transaction;
using Core.CrossCuttingConrens.Caching;
using Core.Utilities;
using Core.Utilities.IoC;
using Core.Utilities.Mail;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class MailConfirmationManager : IMailConfirmationService
    {
        ICacheManager _cacheManager;
        IUserService _userService;
        IMailService _mailService;

        public MailConfirmationManager(ICacheManager cacheManager, IUserService userService,IMailService mailService)
        {
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
            _userService = userService;
            _mailService = mailService;
        }

        [SecuredOperation("admin,user")]
        [TransactionScopeAspect]
        public IResult SendConfirmationMail()
        {
            var cacheUserId = Convert.ToInt32(_cacheManager.Get(CacheKeys.UserIdForClaim));
            var userResult = _userService.GetById(cacheUserId);
            if (!userResult.Success)
            {
                return new ErrorResult(userResult.Message);
            }
            if (userResult.Data.ConfirmedEmail)
            {
                return new ErrorResult(Messages.MailAlreadyConfirmed);
            }

            EmailMessage emailMessage = new EmailMessage();
            var to = new EmailAddress() { Address = userResult.Data.Email, Name = "RentACarCustomer" };

            emailMessage.ToAddresses.Add(to);
            var random = new Random();
            var confirmationNumber = random.Next(100000, 999999).ToString();
            emailMessage.Content = confirmationNumber;
            emailMessage.Subject = "Email Confirmation mail for rent a car";
            _cacheManager.Add((CacheKeys.ConfirmationMail + userResult.Data.Id.ToString()), confirmationNumber,30);
            _mailService.Send(emailMessage);
            return new SuccessResult(Messages.MailConfirmationSended);
        }

        [SecuredOperation("admin,user")]
        public IResult ConfirmMail(string number)
        {
            var cacheUserId = Convert.ToInt32(_cacheManager.Get(CacheKeys.UserIdForClaim));
            var userResult = _userService.GetById(cacheUserId);
            if (!userResult.Success)
            {
                return new ErrorResult(userResult.Message);
            }
            if (userResult.Data.ConfirmedEmail)
            {
                return new ErrorResult(Messages.MailAlreadyConfirmed);
            }
            string confirmationNumber = _cacheManager.Get(CacheKeys.ConfirmationMail + userResult.Data.Id).ToString();
            if (confirmationNumber.Length<1)
            {
                return new ErrorResult(Messages.MailConfirmationNotFound);
            }
            if (number.Equals(confirmationNumber))
            {
                userResult.Data.ConfirmedEmail = true;
                var userUpdateResult =_userService.Update(userResult.Data);
                if (!userUpdateResult.Success)
                {
                    return userUpdateResult;
                }
                return new SuccessResult(Messages.MailConfirmed);
            }
            return new ErrorResult(Messages.ConfirmationNumberNotValid);
        }
    }
}
