using Core.Entities.Concrete;
using Core.Entities.DTOs;
using Core.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        IDataResult<List<User>> GetAll();
        IDataResult<List<OperationClaim>> GetClaims(User user);
        IDataResult<User> GetById(int id);
        IDataResult<UserDto> GetUserDtoByUserId(int userId);
        IDataResult<User> GetByMail(string email);
        IResult Add(User user);
        IResult Update(User user);
        IResult UpdateUserDto(UserDto userDto);
        IResult Delete(User user);
        IResult EmailConfirmed();
    }
}
