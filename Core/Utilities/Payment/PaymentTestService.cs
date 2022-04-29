using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Payment
{
    public class PaymentTestService : IPaymentService
    {
        
        public Result Pay(PaymentInformation paymentInformation)
        {
            bool success = true;
            string errorMessages = "";

            if (paymentInformation.CreditCardNumber.Length!=16)
            {
                success = false;
                errorMessages += " Geçersiz kredi kartı numarası";
            }
            if (paymentInformation.ExpiryDate.Length!=7)
            {
                success = false;
                errorMessages += " Geçersiz son kullanım tarihi";
            }
            if (paymentInformation.Name.Length<4)
            {
                success = false;
                errorMessages += " Geçersiz ad soyad";
            }
            if (paymentInformation.Cvv.Length!=3)
            {
                success = false;
                errorMessages += " Geçersiz cvv numarası";
            }

            if (success)
            {
                return new SuccessResult("Ödeme başarılı "+ paymentInformation.Total);
            }
            else
            {
                errorMessages = errorMessages.Trim();
                return new ErrorResult(errorMessages);
            }
        }
    }
}
