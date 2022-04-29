using Core.Entities.Concrete;
using Core.Utilities.Payment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("Pay")]
        public ActionResult Pay(PaymentInformation paymentInformation)
        {
            var result = _paymentService.Pay(paymentInformation);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
            
        }
    }
}
