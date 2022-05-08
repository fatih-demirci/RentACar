using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, RentACarContext>, ICustomerDal
    {
        public CustomerDto GetCustomerDtoByUserId(int userId)
        {
            using (RentACarContext context = new RentACarContext())
            {
                var result = from user in context.Users
                             join customer in context.Customers
                             on user.Id equals customer.UserId
                             where customer.UserId == userId
                             select new CustomerDto()
                             {
                                 CustomerId = customer.Id,
                                 UserId = user.Id,
                                 CompanyName = customer.CompanyName,
                                 Email = user.Email,
                                 FirstName = user.FirstName,
                                 LastName = user.LastName,
                             };
                return result.FirstOrDefault();
            }
        }
    }
}
