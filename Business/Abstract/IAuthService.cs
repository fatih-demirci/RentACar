using Core.Entities.Concrete;
using Core.Utilities;
using Core.Utilities.Security.JWT;
using Entities.DTOs;

namespace Business.Abstract
{
    public interface IAuthService
    {
        IDataResult<User> Register(UserForRegisterDto userForRegisterDto);
        IDataResult<User> RegisterForCustomer(CustomerForRegisterDto customerForRegisterDto);
        IDataResult<User> Login(UserForLoginDto userForLoginDto);
        IResult ChangePassword(string oldPassword, string newPassword);
        IResult UserExists(string email);
        IDataResult<AccessToken> CreateAccessToken(User user);
        IResult IsAuthorizedAdmin();
        IResult IsAuthorizedUser();
        IResult IsAuthenticated();
    }
}
