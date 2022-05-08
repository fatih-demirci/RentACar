using Core.DataAccess;
using Core.Entities.Concrete;
using Core.Entities.DTOs;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IUserDal:IEntityRepository<User>
    {
        List<OperationClaim> GetClaims(User user);
        UserDto GetUserDtoByUserId(int userId);
    }
}
