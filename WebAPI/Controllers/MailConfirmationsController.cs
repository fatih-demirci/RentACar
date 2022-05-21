using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailConfirmationsController : ControllerBase
    {
        IMailConfirmationService _mailConfirmationService;
        public MailConfirmationsController(IMailConfirmationService mailConfirmationService)
        {
            _mailConfirmationService = mailConfirmationService;
        }

        [HttpGet("SendConfirmationMail")]
        public IActionResult SendConfirmationMail()
        {
            var result = _mailConfirmationService.SendConfirmationMail();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("ConfirmMail")]
        public IActionResult ConfirmMail(string number)
        {
            var result = _mailConfirmationService.ConfirmMail(number);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
