using Core.Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules
{
    public class CreditCardValidator : AbstractValidator<CreditCard>
    {
        public CreditCardValidator()
        {
            RuleFor(cc => cc.CreditCardNumber).Length(16);
            RuleFor(cc => cc.Cvv).MinimumLength(3).MaximumLength(4);
            RuleFor(cc => cc.Name).MinimumLength(4);
            RuleFor(cc => cc.ExpiryDate).Length(7);
        }
    }
}
