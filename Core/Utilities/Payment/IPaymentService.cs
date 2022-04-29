using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Payment
{
    public interface IPaymentService
    {
        Result Pay(PaymentInformation paymentInformation);
    }
}
