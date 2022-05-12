using Core.Entities.Concrete;
using Core.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICreditCardService
    {
        IDataResult<List<CreditCard>> GetAll();
        IDataResult<CreditCard> GetById(int id);
        IDataResult<CreditCard> GetByUserId(int userId);
        IResult Add(CreditCard creditCard, int customerId);
        IResult Update(CreditCard creditCard);
        IResult Delete(CreditCard creditCard);
    }
}
